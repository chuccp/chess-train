import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clock3, History, Swords, Trash2 } from 'lucide-react';
import { deleteFinishedGame, listFinishedGames } from '../lib/storage';
import { formatDate, formatDuration } from '../lib/format';
import { levelLabel, resultLabel } from '../stores/game';
import type { FinishedGame } from '../types';

export function HistoryPage() {
  const [games, setGames] = useState<FinishedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void listFinishedGames().then((items) => {
      if (!alive) return;
      setGames(items);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function remove(id: string) {
    if (!window.confirm('删除这局棋谱？此操作不可恢复。')) return;
    setDeleting(id);
    await deleteFinishedGame(id);
    setGames((items) => items.filter((game) => game.id !== id));
    setDeleting(null);
  }

  const wins = games.filter(
    (game) => game.result.status === 'win' && game.result.winner === game.playerColor,
  ).length;

  return (
    <div className="page history-page">
      <div className="page-heading">
        <div className="eyebrow">
          <History size={15} aria-hidden="true" />
          棋谱
        </div>
        <h1>下过的棋，都留在这里</h1>
        <p>棋谱只保存在本机。可以随时打开回放，也可以删除。</p>
      </div>

      <div className="history-summary">
        <span><strong>{games.length}</strong> 局已保存</span>
        <span><strong>{wins}</strong> 局获胜</span>
        <span><strong>{games.reduce((sum, game) => sum + game.moves.length, 0)}</strong> 手棋</span>
      </div>

      {loading ? (
        <p className="muted">读取棋谱…</p>
      ) : games.length === 0 ? (
        <div className="empty-state panel">
          <Swords size={34} aria-hidden="true" />
          <h2>还没有下完的棋</h2>
          <p>完成一局人机对弈后，它会自动出现在这里。</p>
          <Link to="/play" className="btn btn-primary">
            和 AI 下一盘
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="history-list">
          {games.map((game) => {
            const playerWin = game.result.status === 'win' && game.result.winner === game.playerColor;
            return (
              <article className="history-row" key={game.id}>
                <Link to={`/review/${game.id}`} className="history-main">
                  <span className={`history-result ${playerWin ? 'win' : game.result.status === 'draw' ? 'draw' : 'loss'}`}>
                    {playerWin ? '胜' : game.result.status === 'draw' ? '和' : '负'}
                  </span>
                  <span className="history-copy">
                    <strong>{resultLabel(game.result, game.playerColor)}</strong>
                    <span className="history-meta">
                      <span><CalendarDays size={13} aria-hidden="true" /> {formatDate(game.endedAt)}</span>
                      <span><Clock3 size={13} aria-hidden="true" /> {formatDuration(game.elapsedMs)}</span>
                      <span>{levelLabel(game.level)} · {game.moves.length} 手</span>
                    </span>
                  </span>
                  <ChevronRight size={18} className="history-chevron" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="icon-button history-delete"
                  aria-label="删除这局棋谱"
                  disabled={deleting === game.id}
                  onClick={() => void remove(game.id)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}
