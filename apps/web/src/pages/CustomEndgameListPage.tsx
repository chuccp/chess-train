import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Check, ClipboardPaste, Copy, Crown, Pencil, Plus, Swords, Trash2, Users } from 'lucide-react';
import type { Color } from '@qilian/xiangqi';
import { Dialog } from '../components/Dialog';
import { copyText } from '../lib/clipboard';
import { endgameTurn, endgameTurnLabel, parseCustomFen } from '../lib/customEndgame';
import { deleteCustomEndgame, listCustomEndgames } from '../lib/storage';
import { formatDateTime } from '../lib/format';
import { useEngineStore } from '../stores/engine';
import { useGameStore } from '../stores/game';
import { useSettingsStore } from '../stores/settings';
import type { CustomEndgame } from '../types';

export function CustomEndgameListPage() {
  const navigate = useNavigate();
  const engineReady = useEngineStore((state) => state.engineReady);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const settings = useSettingsStore();
  const [endgames, setEndgames] = useState<CustomEndgame[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pending, setPending] = useState<CustomEndgame | null>(null);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [fenDraft, setFenDraft] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void listCustomEndgames().then((items) => {
      if (!alive) return;
      setEndgames(items);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function remove(id: string) {
    if (!window.confirm('删除这个自定义残局？此操作不可恢复。')) return;
    setDeleting(id);
    await deleteCustomEndgame(id);
    setEndgames((items) => items.filter((item) => item.id !== id));
    setDeleting(null);
  }

  async function copyFen(endgame: CustomEndgame) {
    if (await copyText(endgame.fen)) {
      setCopiedId(endgame.id);
      window.setTimeout(() => setCopiedId((current) => (current === endgame.id ? null : current)), 2000);
    }
  }

  async function startHuman(endgame: CustomEndgame) {
    setStarting(true);
    const ok = await startNewGame(
      endgameTurn(endgame.fen) ?? 'r',
      settings.preferredLevel,
      'human',
      endgame.fen,
    );
    setStarting(false);
    if (ok) navigate('/play');
  }

  async function startAi(endgame: CustomEndgame, color: Color) {
    if (!engineReady) {
      setStartError('AI 还在准备中，请稍后再试');
      return;
    }
    setStarting(true);
    setStartError(null);
    const ok = await startNewGame(color, settings.preferredLevel, 'ai', endgame.fen);
    setStarting(false);
    if (ok) {
      setPending(null);
      navigate('/play');
    } else {
      setStartError(useGameStore.getState().error ?? '开局失败，请重试');
    }
  }

  function openImport() {
    setFenDraft('');
    setImportError(null);
    setImportOpen(true);
  }

  function confirmImport() {
    const result = parseCustomFen(fenDraft);
    if (!result.ok) {
      setImportError(result.error);
      return;
    }
    setImportOpen(false);
    navigate(`/endgames/edit?fen=${encodeURIComponent(result.fen)}`);
  }

  return (
    <div className="page endgame-list-page">
      <div className="page-heading">
        <div className="eyebrow">
          <Crown size={15} aria-hidden="true" />
          自定义残局
        </div>
        <h1>自己摆的残局</h1>
        <p>棋子只存在本机。复制 FEN 发给朋友，对方可在编辑器里导入同一局面。</p>
      </div>

      {!loading && endgames.length > 0 && (
        <div className="endgame-list-toolbar">
          <span className="muted small">{endgames.length} 个残局</span>
          <div className="endgame-list-actions">
            <button type="button" className="btn btn-ghost btn-small" onClick={openImport}>
              <ClipboardPaste size={15} aria-hidden="true" />
              导入 FEN
            </button>
            <Link to="/endgames/edit" className="btn btn-primary btn-small">
              <Plus size={15} aria-hidden="true" />
              新建残局
            </Link>
          </div>
        </div>
      )}

      {loading ? (
        <p className="muted">读取残局…</p>
      ) : endgames.length === 0 ? (
        <div className="empty-state panel">
          <Crown size={34} aria-hidden="true" />
          <h2>还没有自定义残局</h2>
          <p>从只有双方将帅的棋盘开始摆子，保存后就能人机或双人对弈。</p>
          <div className="endgame-list-actions">
            <Link to="/endgames/edit" className="btn btn-primary">
              摆一个残局
              <Plus size={16} aria-hidden="true" />
            </Link>
            <button type="button" className="btn btn-ghost" onClick={openImport}>
              <ClipboardPaste size={16} aria-hidden="true" />
              导入 FEN
            </button>
          </div>
        </div>
      ) : (
        <div className="endgame-list">
          {endgames.map((endgame) => (
            <article className="endgame-row" key={endgame.id}>
              <div className="endgame-row-main">
                <strong>{endgame.name}</strong>
                <span className="endgame-row-meta">
                  {endgameTurnLabel(endgame.fen)} · 更新于 {formatDateTime(endgame.updatedAt)}
                </span>
              </div>
              <div className="endgame-row-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  disabled={starting}
                  onClick={() => void startHuman(endgame)}
                >
                  <Users size={15} aria-hidden="true" />
                  双人对弈
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-small"
                  disabled={starting}
                  onClick={() => {
                    setStartError(null);
                    setPending(endgame);
                  }}
                >
                  <Bot size={15} aria-hidden="true" />
                  人机对弈
                </button>
                <button
                  type="button"
                  className={`icon-button${copiedId === endgame.id ? ' is-copied' : ''}`}
                  aria-label={copiedId === endgame.id ? '已复制 FEN' : '复制 FEN'}
                  title="复制 FEN"
                  onClick={() => void copyFen(endgame)}
                >
                  {copiedId === endgame.id ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                </button>
                <Link
                  to={`/endgames/edit?id=${endgame.id}`}
                  className="icon-button"
                  aria-label="编辑残局"
                  title="编辑"
                >
                  <Pencil size={16} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`删除残局 ${endgame.name}`}
                  disabled={deleting === endgame.id}
                  onClick={() => void remove(endgame.id)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog
        open={Boolean(pending)}
        title="人机对弈，你执哪一方？"
        onClose={() => {
          setPending(null);
          setStartError(null);
        }}
        footer={
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setPending(null);
              setStartError(null);
            }}
          >
            取消
          </button>
        }
      >
        <p>如果这一方不是残局的先手，AI 会先走第一步。</p>
        <div className="endgame-color-choice">
          <button
            type="button"
            className="btn btn-primary"
            disabled={starting || !engineReady}
            onClick={() => pending && void startAi(pending, 'r')}
          >
            <Swords size={16} aria-hidden="true" />
            执红
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={starting || !engineReady}
            onClick={() => pending && void startAi(pending, 'b')}
          >
            <Swords size={16} aria-hidden="true" />
            执黑
          </button>
        </div>
        {!engineReady && <p className="form-error">AI 还在准备中，请稍后再试。</p>}
        {startError && (
          <p className="form-error" role="alert">
            {startError}
          </p>
        )}
      </Dialog>

      <Dialog
        open={importOpen}
        title="导入残局 FEN"
        onClose={() => setImportOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setImportOpen(false)}>
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!fenDraft.trim()}
              onClick={confirmImport}
            >
              导入并编辑
            </button>
          </>
        }
      >
        <p>粘贴别人分享的 FEN，确认后会打开编辑器，可继续调整或保存到本机。</p>
        <textarea
          className="endgame-fen-input"
          rows={4}
          value={fenDraft}
          placeholder="例如 4k4/9/9/9/9/4P4/9/9/9/4K4 w - - 0 1"
          onChange={(event) => {
            setFenDraft(event.target.value);
            setImportError(null);
          }}
        />
        {importError && (
          <p className="form-error" role="alert">
            {importError}
          </p>
        )}
      </Dialog>
    </div>
  );
}
