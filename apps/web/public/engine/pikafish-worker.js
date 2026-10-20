/*
 * Pikafish classic Web Worker adapter.
 *
 * The official web build expects to be loaded with importScripts() and exposes
 * Module.send_command(text) plus Module.read_stdout(line). The engine search is
 * synchronous inside the WASM; requests are serialized and stale results are
 * ignored by the UI. A stop command is still forwarded when possible.
 */

// eslint-disable-next-line no-undef
let engine = null;
let busy = false;
let activeRequestId = null;
let cancelledRequestId = null;
let optionsSeen = {};
const lineWaiters = new Set();

function emit(line) {
  for (const waiter of [...lineWaiters]) {
    try {
      waiter.onLine(line);
    } catch (_) {
      // a listener error must not break engine output parsing
    }
  }
}

function waitForLine(predicate, timeoutMs, onTimeoutMessage) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      lineWaiters.delete(waiter);
      reject(new Error(onTimeoutMessage || 'engine timeout'));
    }, timeoutMs);
    const waiter = {
      onLine(line) {
        if (!predicate(line)) return;
        clearTimeout(timer);
        lineWaiters.delete(waiter);
        resolve(line);
      },
    };
    lineWaiters.add(waiter);
  });
}

function send(command) {
  if (!engine) throw new Error('engine not initialized');
  engine.send_command(command);
}

function post(message) {
  self.postMessage(message);
}

function configureLevel(level) {
  const settings =
    level === 1
      ? { limit: 'true', elo: 1280, moveTime: 250 }
      : level === 2
        ? { limit: 'true', elo: 1800, moveTime: 600 }
        : { limit: 'false', elo: null, moveTime: 1200 };

  send(`setoption name UCI_LimitStrength value ${settings.limit}`);
  if (settings.elo !== null) send(`setoption name UCI_Elo value ${settings.elo}`);
  send('setoption name MultiPV value 1');
  return settings.moveTime;
}

async function init(data) {
  try {
    if (engine) {
      post({ type: 'ready', version: data.version, options: optionsSeen });
      return;
    }
    // Classic Worker: the engine glue is a UMD/IIFE script.
    // eslint-disable-next-line no-undef
    importScripts(data.jsUrl);
    if (typeof self.Pikafish !== 'function') {
      throw new Error('Pikafish glue did not expose a factory');
    }

    const base = new URL(data.jsUrl, self.location.href).toString();
    const module = await self.Pikafish({
      locateFile(path) {
        if (path === 'pikafish.wasm') return data.wasmUrl;
        if (path === 'pikafish.data') return data.dataUrl;
        return new URL(path, base).toString();
      },
      read_stdout(line) {
        emit(line);
      },
      print(line) {
        emit(line);
      },
      printErr(line) {
        emit(`error: ${line}`);
      },
      onAbort(reason) {
        post({ type: 'fatal', message: String(reason) });
      },
    });

    engine = module;
    const optionLines = [];
    const collect = (line) => {
      if (line.startsWith('option ')) {
        const match = /^option name (.+?) type (\S+)(?: default (\S+))?/.exec(line);
        if (match) optionsSeen[match[1]] = match[3] ?? true;
        optionLines.push(line);
      }
    };
    lineWaiters.add({ onLine: collect });
    const uciDone = waitForLine((line) => line === 'uciok', 10000, 'UCI handshake timed out');
    send('uci');
    await uciDone;
    for (const waiter of [...lineWaiters]) {
      if (waiter.onLine === collect) lineWaiters.delete(waiter);
    }

    send('setoption name Threads value 1');
    send('setoption name Hash value 32');
    send('setoption name Ponder value false');
    send('setoption name MultiPV value 1');
    send('setoption name Sixty Move Rule value true');
    send('setoption name Rule60MaxPly value 120');
    send('setoption name Repetition Rule value NoJudgement');

    const readyDone = waitForLine((line) => line === 'readyok', 10000, 'engine ready timeout');
    send('isready');
    await readyDone;

    post({ type: 'ready', version: data.version, options: optionsSeen });
  } catch (error) {
    post({ type: 'fatal', message: error instanceof Error ? error.message : String(error) });
  }
}

async function search(data) {
  if (!engine) {
    post({ type: 'error', requestId: data.requestId, code: 'ENGINE_CRASH', message: 'engine is not ready' });
    return;
  }
  if (busy) {
    post({ type: 'error', requestId: data.requestId, code: 'ENGINE_BUSY', message: 'engine is busy' });
    return;
  }

  busy = true;
  activeRequestId = data.requestId;
  cancelledRequestId = null;

  try {
    const moveTime = configureLevel(data.level);
    const moves = Array.isArray(data.movesUcci) && data.movesUcci.length > 0 ? ` moves ${data.movesUcci.join(' ')}` : '';
    const bestMove = waitForLine(
      (line) => line.startsWith('bestmove '),
      Math.max(5000, data.timeLimitMs + 5000),
      'search timed out',
    );

    send(`position fen ${data.initialFen}${moves}`);
    send(`go movetime ${data.timeLimitMs || moveTime}`);
    const line = await bestMove;
    const ucci = line.split(/\s+/)[1];
    if (activeRequestId === data.requestId && cancelledRequestId !== data.requestId && ucci && ucci !== '(none)') {
      post({ type: 'bestmove', requestId: data.requestId, ucci });
    }
  } catch (error) {
    post({
      type: 'error',
      requestId: data.requestId,
      code: 'ENGINE_TIMEOUT',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (activeRequestId === data.requestId) {
      activeRequestId = null;
      busy = false;
    }
  }
}

self.onmessage = (event) => {
  const data = event.data;
  if (!data || typeof data.type !== 'string') return;
  if (data.type === 'init') {
    void init(data);
    return;
  }
  if (data.type === 'search') {
    void search(data);
    return;
  }
  if (data.type === 'stop') {
    cancelledRequestId = data.requestId ?? activeRequestId;
    if (engine && activeRequestId !== null) {
      try {
        send('stop');
      } catch {
        // search already ended
      }
    }
  }
};
