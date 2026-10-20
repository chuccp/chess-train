import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const games = [
  {
    to: '/local/chess',
    title: '中国象棋',
    subtitle: '完整规则 · 红先',
    description: '两个人轮流走，支持悔棋、翻转、认输和棋谱记录。',
    tone: 'red',
  },
  {
    to: '/local/jungle',
    title: '斗兽棋',
    subtitle: '象狮虎豹 · 鼠可吃象',
    description: '过河、跳河、陷阱和兽穴，一盘几分钟的轻量对弈。',
    tone: 'green',
  },
  {
    to: '/local/checkers',
    title: '跳棋',
    subtitle: '121 孔 · 十子归营',
    description: '连跳、借桥、把十枚棋子全部送进对面的家。',
    tone: 'gold',
  },
];

export function LocalGamesPage() {
  return (
    <div className="page local-games-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        返回首页
      </Link>

      <div className="local-games-heading">
        <span className="eyebrow">线下棋桌</span>
        <h1>
          两个人，
          <span className="text-red">一台设备</span>
        </h1>
        <p>不用实体棋盘，也不用两台手机。选一个，轮流落子。</p>
      </div>

      <div className="local-games-grid">
        {games.map((game) => {
          return (
            <Link to={game.to} className={`local-game-card local-game-${game.tone}`} key={game.to}>
              <div>
                <span className="local-game-kicker">{game.subtitle}</span>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
              </div>
              <span className="local-game-action">
                开始
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="local-games-note">
        <ShieldCheck size={16} aria-hidden="true" />
        所有对局都在本机进行，不需要登录，也不需要等引擎。
      </div>
    </div>
  );
}
