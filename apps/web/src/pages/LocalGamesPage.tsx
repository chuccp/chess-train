import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const games = [
  {
    to: '/local/gomoku',
    title: '五子棋',
    subtitle: '15 × 15 · 五子连珠',
    description: '横、竖、斜任意方向连成五子。可选人机对战或本地双人。',
    tone: 'green',
  },
  {
    to: '/local/jungle',
    title: '斗兽棋',
    subtitle: '象狮虎豹 · 鼠可吃象',
    description: '过河、跳河、陷阱和兽穴，一盘几分钟的轻量对弈。',
    tone: 'red',
  },
  {
    to: '/local/checkers',
    title: '跳棋',
    subtitle: '121 孔 · 十子归营',
    description: '连跳、借桥、把十枚棋子全部送进对面的家。',
    tone: 'gold',
  },
  {
    to: '/local/connect4',
    title: '四子棋',
    subtitle: '7 × 6 · 重力落子',
    description: '选一列放棋子，先连成四子的一方赢。',
    tone: 'green',
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
        <span className="eyebrow">其它棋类</span>
        <h1>
          换个玩法，
          <span className="text-red">轻松一盘</span>
        </h1>
        <p>每种棋都可以选人机对战或双人同屏。象棋请到「人机对战」。</p>
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

      <p className="local-games-note">
        <ShieldCheck size={15} aria-hidden="true" />
        棋局只保存在本机。
      </p>
    </div>
  );
}
