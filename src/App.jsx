import { useState } from 'react';
import Curtain from './components/Curtain';
import LaunchPage from './components/LaunchPage';
import DigitalBooksPage from './components/DigitalBooksPage';
import FloatingParticles from './components/FloatingParticles';

export default function App() {
  const [currentPage, setCurrentPage] = useState('launch'); // 'launch' | 'books'
  const [curtainOpened, setCurtainOpened] = useState(false);

  const handleLaunch = () => {
    setCurrentPage('books');
  };

  const handleBackToLaunch = () => {
    setCurrentPage('launch');
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center overflow-x-hidden ${currentPage === 'launch' ? 'bg-heritage-bg' : 'bg-[#faf8f5]'}`}>
      {/* Background Floating Golden Particles */}
      <FloatingParticles count={25} />

      {/* Main Pages */}
      {currentPage === 'launch' ? (
        <>
          {/* Theatre Curtain Overlay (only when curtain not yet opened) */}
          {!curtainOpened && (
            <Curtain onOpen={() => setCurtainOpened(true)} />
          )}

          {/* Launch Page Content */}
          <LaunchPage onLaunch={handleLaunch} />
        </>
      ) : (
        <DigitalBooksPage onBackToLaunch={handleBackToLaunch} />
      )}
    </div>
  );
}
