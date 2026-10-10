import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Curtain({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onOpen) onOpen();
    }, 2200);
  };

  if (isHidden) return null;

  return (
    <div
      className={`curtain-container ${isHidden ? 'hidden' : ''}`}
      onClick={handleClick}
    >
      {/* Dark background behind curtains */}
      <div className="curtain-bg" />

      {/* Left Curtain */}
      <div className={`curtain-left ${isOpen ? 'open' : ''}`} />

      {/* Right Curtain */}
      <div className={`curtain-right ${isOpen ? 'open' : ''}`} />

      {/* Valance at top */}
      <div className="curtain-valance" />

      {/* Center Plaque / Seal */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none select-none max-w-lg w-full px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Real Official IIAS Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}iias-logo.png`}
                alt="Indian Institute of Advanced Study Official Logo"
                className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* Institution Header */}
            <p
              className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#e6ca85] font-semibold mb-1"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Indian Institute of Advanced Study
            </p>
            <p
              className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-[#c4a25b] mb-3"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Rashtrapati Nivas, Shimla
            </p>

            {/* Event Title */}
            <h1
              className="text-2xl md:text-4xl font-bold mb-3 tracking-wide"
              style={{
                fontFamily: 'var(--font-cinzel-decorative)',
                background: 'linear-gradient(180deg, #fff2d1 0%, #dfb448 50%, #b8860b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
              }}
            >
              Launch of the IIAS Digitised Rare Manuscript Library Portal
            </h1>

            {/* Elegant clean gold line */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <span className="text-[#d4af37] text-xs">✦</span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>

            {/* Unveil Prompt */}
            <motion.p
              className="text-sm md:text-base tracking-[0.28em] uppercase text-[#f3dfa7] font-medium"
              style={{ fontFamily: 'var(--font-cinzel)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Click anywhere to unveil
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
