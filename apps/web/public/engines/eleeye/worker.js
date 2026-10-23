let modulePromise = null;
let pendingSearch = null;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

function parseInfo(line) {
  const result = {};
  const tokens = line.split(/\s+/);
  for (let index = 1; index < tokens.length - 1; index += 1) {
    const key = tokens[index];
    const value = Number(tokens[index + 1]);
    if (!Number.isFinite(value)) continue;
    if (key === 'depth') result.depth = value;
    if (key === 'nodes') result.nodes = value;
    if (key === 'time') result.timeMs = value;
    if (key === 'score') result.score = value;
  }
  return Object.keys(result).length > 0 ? result : null;
}

function sendCommand(command) {
  const module = pendingSearch?.module;
  if (!module) return;
  module.ccall('execute_ucci_command', null, ['string'], [command]);
}

function runSearch(request) {
  if (!request) return;
  const depth = Math.max(1, Math.min(8, Number(request.depth) || 4));
  try {
    post('SEARCH_START', { requestId: request.requestId });
    sendCommand(`position fen ${request.fen}`);
    sendCommand(`go depth ${depth}`);
  } catch (error) {
    post('ERROR', {
      requestId: request.requestId,
      message: error instanceof Error ? error.message : String(error),
    });
    pendingSearch = null;
  }
}

function handleStdout(line) {
  if (!line) return;
  const text = String(line).trim();
  if (text.startsWith('info')) {
    const info = parseInfo(text);
    if (info) post('INFO', { requestId: pendingSearch?.requestId, info });
    return;
  }
  if (!text.startsWith('bestmove')) return;

  const request = pendingSearch;
  pendingSearch = null;
  const move = text.split(/\s+/)[1];
  if (!request) return;
  if (!move || move === 'nobestmove') {
    post('ERROR', { requestId: request.requestId, message: 'ElephantEye 未返回可用着法' });
    return;
  }
  post('BEST_MOVE', { requestId: request.requestId, move });
}

function initialize() {
  if (modulePromise) return modulePromise;
  modulePromise = importScripts('eleeye.js');
  modulePromise = createEleeyeModule({
    noInitialRun: true,
    print: handleStdout,
    printErr: () => {},
  }).then((module) => {
    module.ccall('init_eleeye_engine', null, [], []);
    module.ccall('execute_ucci_command', null, ['string'], ['isready']);
    post('READY');
    const request = pendingSearch;
    if (request) {
      request.module = module;
      runSearch(request);
    }
    return module;
  }).catch((error) => {
    post('ERROR', { message: error instanceof Error ? error.message : String(error) });
    throw error;
  });
  return modulePromise;
}

self.onmessage = (event) => {
  const data = event.data || {};
  if (data.type !== 'SEARCH' || !data.fen) return;
  const request = {
    requestId: data.requestId,
    fen: data.fen,
    depth: data.depth,
    module: null,
  };

  if (!modulePromise) {
    pendingSearch = request;
    void initialize();
    return;
  }

  void modulePromise.then((module) => {
    request.module = module;
    pendingSearch = request;
    runSearch(request);
  }).catch(() => {
    // The module-level error is posted by initialize().
  });
};

void initialize();
