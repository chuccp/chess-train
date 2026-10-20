import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="page empty-state not-found">
      <span className="not-found-mark">空</span>
      <h1>这里没有棋</h1>
      <p>地址可能写错了，或者这盘棋已经不在本机。</p>
      <Link to="/" className="btn btn-primary">回到棋桌</Link>
    </div>
  );
}
