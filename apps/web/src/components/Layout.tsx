import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, History, Home, Settings, Swords, Users } from 'lucide-react';
import { EngineBadge } from './EngineBadge';

const desktopNav = [
  { to: '/', label: '练习', icon: Home, end: true },
  { to: '/local', label: '双人', icon: Users },
  { to: '/train', label: '训练', icon: GraduationCap },
  { to: '/history', label: '棋谱', icon: History },
  { to: '/settings', label: '设置', icon: Settings },
];

const mobileNav = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/play', label: '对弈', icon: Swords },
  { to: '/train', label: '训练', icon: GraduationCap },
  { to: '/history', label: '棋谱', icon: History },
  { to: '/settings', label: '设置', icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isGameRoute =
    location.pathname === '/play' ||
    location.pathname.startsWith('/play/') ||
    location.pathname.startsWith('/local/');
  const isTrainingPlay = /^\/train\/(?:tactics|endgame|opening)\/[^/]+/.test(location.pathname);
  const hideMobileNav =
    location.pathname === '/play' ||
    location.pathname.startsWith('/play/') ||
    location.pathname.startsWith('/local/') ||
    location.pathname.startsWith('/train/tactics/') ||
    location.pathname.startsWith('/train/endgame/') ||
    location.pathname.startsWith('/train/opening/') ||
    location.pathname.startsWith('/review/');

  return (
    <div className={`app-shell${isGameRoute ? ' is-game-route' : ''}${isTrainingPlay ? ' is-training-play' : ''}${isHome ? ' is-home' : ''}`}>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" aria-label="棋练首页">
            <span className="brand-seal" aria-hidden="true">
              棋
            </span>
            <span className="brand-word">
              棋练
              <small>中国象棋练习场</small>
            </span>
          </NavLink>

          <nav className="desktop-nav" aria-label="主导航">
            {desktopNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <EngineBadge />
        </div>
      </header>

      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      <nav className={`bottom-nav${hideMobileNav ? ' is-suppressed' : ''}`} aria-label="移动端主导航">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bottom-link${isActive ? ' is-active' : ''}`}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <footer className="site-footer">
        <span>棋练 · 单机练习版</span>
        <span className="footer-sep">·</span>
        <span>本地运行，不上传棋谱</span>
        <span className="footer-sep">·</span>
        <NavLink to="/about">关于与许可</NavLink>
        <span className="footer-sep">·</span>
        <span className="footer-license">GPL-3.0</span>
      </footer>
    </div>
  );
}
