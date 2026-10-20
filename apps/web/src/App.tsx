import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PlayPage } from './pages/PlayPage';
import { TrainHomePage } from './pages/TrainHomePage';
import { TacticsListPage } from './pages/TacticsListPage';
import { TacticsPlayPage } from './pages/TacticsPlayPage';
import { LessonListPage } from './pages/LessonListPage';
import { LessonPlayPage } from './pages/LessonPlayPage';
import { HistoryPage } from './pages/HistoryPage';
import { ReviewPage } from './pages/ReviewPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useEngineStore } from './stores/engine';
import { useGameStore } from './stores/game';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export default function App() {
  const bootstrap = useEngineStore((state) => state.bootstrap);
  const engineReady = useEngineStore((state) => state.engineReady);
  const hydrate = useGameStore((state) => state.hydrate);
  const current = useGameStore((state) => state.current);
  const aiInFlight = useGameStore((state) => state.aiInFlight);
  const aiError = useGameStore((state) => state.aiError);
  const requestAi = useGameStore((state) => state.requestAi);

  useEffect(() => {
    void hydrate();
    void bootstrap();
  }, [bootstrap, hydrate]);

  useEffect(() => {
    if (!engineReady) return;
    if (!current || current.phase !== 'ai_thinking') return;
    if (aiInFlight || aiError) return;
    void requestAi();
  }, [aiError, aiInFlight, current, engineReady, requestAi]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="play" element={<PlayPage />} />
          <Route path="train" element={<TrainHomePage />} />
          <Route path="train/tactics" element={<TacticsListPage />} />
          <Route path="train/tactics/:id" element={<TacticsPlayPage />} />
          <Route path="train/endgame" element={<LessonListPage kind="endgame" />} />
          <Route path="train/endgame/:id" element={<LessonPlayPage kind="endgame" />} />
          <Route path="train/opening" element={<LessonListPage kind="opening" />} />
          <Route path="train/opening/:id" element={<LessonPlayPage kind="opening" />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="review/:id" element={<ReviewPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
