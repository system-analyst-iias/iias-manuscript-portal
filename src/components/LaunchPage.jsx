import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function LaunchPage({ onLaunch }) {
  const [launched, setLaunched] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const fireConfetti = useCallback(() => {
    if (launched) return;
    setLaunched(true);

    // Cascading celebratory confetti showers
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.2, y: -0.05 },
      colors: ['#c99a2c', '#dfb74d', '#7c1c1c', '#9b2222', '#2c1810', '#ffffff'],
      gravity: 0.75,
      ticks: 350,
      scalar: 1.15,
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.8, y: -0.05 },
      colors: ['#c99a2c', '#dfb74d', '#7c1c1c', '#9b2222', '#2c1810', '#ffffff'],
      gravity: 0.75,
      ticks: 350,
      scalar: 1.15,
    });

    setTimeout(() => {
      confetti({
        particleCount: 220,
        spread: 140,
        origin: { x: 0.5, y: -0.05 },
        colors: ['#f5e0aa', '#c99a2c', '#8a6218', '#7c1c1c', '#4a0e0e', '#ffffff'],
        gravity: 0.8,
        ticks: 400,
        scalar: 1.25,
      });
    }, 280);

    const interval = setInterval(() => {
      confetti({
        particleCount: 35,
        spread: 90,
        origin: { x: 0.15 + Math.random() * 0.7, y: -0.05 },
        colors: ['#c99a2c', '#dfb74d', '#7c1c1c', '#f5ebd2'],
        gravity: 0.9,
        ticks: 240,
        scalar: 1,
      });
    }, 350);

    setTimeout(() => {
      clearInterval(interval);
      setCountdown(3);
    }, 3200);
  }, [launched]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      if (onLaunch) onLaunch();
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, onLaunch]);

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col items-center justify-between select-none bg-[#f7f5f0]">
      {/* Background Building Image - Light & Softly Faded */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}building.jpg`}
          alt="IIAS Rashtrapati Nivas Shimla"
          className="w-full h-full object-cover opacity-25 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f5f0]/85 via-[#f7f5f0]/60 to-[#f7f5f0]/85" />
      </div>

      {/* Left Theatre Side Drape */}
      <div
        className="hidden md:block absolute top-0 left-0 bottom-0 w-24 lg:w-36 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #1c0404 0%, #3a0808 60%, #4a0e0e 85%, transparent 100%)',
          boxShadow: 'inset -15px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="w-full h-full opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 15px, rgba(0,0,0,0.4) 15px, rgba(0,0,0,0.4) 22px)',
          }}
        />
        <div className="absolute top-1/2 left-0 w-20 h-6 border-b-2 border-gold-400/60 rounded-r-full shadow" />
      </div>

      {/* Right Theatre Side Drape */}
      <div
        className="hidden md:block absolute top-0 right-0 bottom-0 w-24 lg:w-36 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(-90deg, #1c0404 0%, #3a0808 60%, #4a0e0e 85%, transparent 100%)',
          boxShadow: 'inset 15px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="w-full h-full opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-90deg, transparent 0px, transparent 15px, rgba(0,0,0,0.4) 15px, rgba(0,0,0,0.4) 22px)',
          }}
        />
        <div className="absolute top-1/2 right-0 w-20 h-6 border-b-2 border-gold-400/60 rounded-l-full shadow" />
      </div>

      {/* Main Content Area - Covers ~70% screen width, cleanly centered and non-scrollable */}
      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl px-4 sm:px-8 py-3 sm:py-4 my-auto flex flex-col items-center justify-between h-full max-h-[720px]">
        
        {/* 1. Top of the page: Institute Logo + Institute's Name */}
        <div className="flex flex-col items-center text-center mt-0.5">
          <div className="mb-1.5 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}iias-logo.png`}
              alt="Indian Institute of Advanced Study"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain drop-shadow-sm"
            />
          </div>

          {/* Institute Name: Bold, same size as event title, same deep imperial maroon color */}
          <h1
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#5c1010] tracking-tight leading-tight uppercase"
            style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
          >
            Indian Institute of Advanced Study
          </h1>
          <p
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-stone-600 font-semibold mt-0.5"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Rashtrapati Nivas, Shimla
          </p>
        </div>

        {/* 2. Event Name */}
        <div className="text-center my-1">
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#5c1010] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
          >
            Launch of the IIAS Digitised Rare Manuscript Library Portal
          </h2>
        </div>

        {/* 3. Inaugurated By: Photo & Details of Prof. Reicha Tanwar */}
        <div className="flex flex-col items-center text-center my-1 max-w-2xl">
          <p
            className="text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-950 font-bold mb-1.5"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Inaugurated By
          </p>

          {/* Photo of Prof. Reicha Tanwar */}
          <div className="w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] md:w-[125px] md:h-[125px] rounded-full overflow-hidden border-[2.5px] border-amber-600/60 shadow-lg bg-stone-200 shrink-0 mb-2">
            <img
              src={`${import.meta.env.BASE_URL}prof-richa.png`}
              alt="Prof. Reicha Tanwar"
              className="w-full h-full object-cover object-[center_18%]"
            />
          </div>

          <h3
            className="text-base sm:text-xl md:text-2xl font-extrabold text-[#5c1010] tracking-wide leading-tight"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Prof. Reicha Tanwar
          </h3>
          <p
            className="text-xs sm:text-sm md:text-base text-stone-800 leading-snug font-semibold mt-1 max-w-xl"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Professor of Women’s Studies and the former Director of the Women’s Studies Research Centre
            <br />
            Kurukshetra University, Kurukshetra
          </p>
        </div>

        {/* 4. In the presence of Director: Prof. Himanshu Kumar Chaturvedi */}
        <div className="flex flex-col items-center text-center my-1">
          <p
            className="text-xs sm:text-sm tracking-[0.25em] uppercase text-amber-950 font-bold mb-1"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            In the presence of
          </p>
          <p
            className="text-sm sm:text-lg md:text-xl font-extrabold text-stone-900 leading-tight"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Prof. Himanshu Kumar Chaturvedi
          </p>
          <p
            className="text-xs sm:text-sm md:text-base text-stone-800 font-semibold mt-0.5"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Director, Indian Institute of Advanced Study
          </p>
        </div>

        {/* 5. Event Details (Date, Time, Venue) - Labels and values equal in font size */}
        <div className="w-full max-w-4xl rounded-2xl bg-white/95 backdrop-blur-md border border-stone-300/80 shadow-md py-2.5 px-5 sm:px-8 my-1.5 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 text-stone-900">
            <div className="flex items-center justify-center gap-1.5">
              <span
                className="text-xs sm:text-sm md:text-[14px] uppercase tracking-wider text-amber-900 font-extrabold shrink-0"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Date:
              </span>
              <span
                className="text-xs sm:text-sm md:text-[14px] text-stone-900 font-bold tracking-wide"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                11th October 2026
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-stone-300" />

            <div className="flex items-center justify-center gap-1.5">
              <span
                className="text-xs sm:text-sm md:text-[14px] uppercase tracking-wider text-amber-900 font-extrabold shrink-0"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Time:
              </span>
              <span
                className="text-xs sm:text-sm md:text-[14px] text-stone-900 font-bold tracking-wide"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                04:00 PM
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-stone-300" />

            <div className="flex items-center justify-center gap-1.5">
              <span
                className="text-xs sm:text-sm md:text-[14px] uppercase tracking-wider text-amber-900 font-extrabold shrink-0"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Venue:
              </span>
              <span
                className="text-xs sm:text-sm md:text-[14px] text-stone-900 font-bold tracking-wide"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Seminar Room (Ground Floor), Main Building
              </span>
            </div>
          </div>
        </div>

        {/* 6. Launch Button with Generous Spacing */}
        <div className="w-full flex justify-center my-1 mb-1.5">
          <AnimatePresence mode="wait">
            {!launched ? (
              <motion.button
                key="launch-btn"
                onClick={fireConfetti}
                className="px-10 py-3 sm:px-14 sm:py-3.5 rounded-2xl bg-[#5c1010] hover:bg-[#7a1616] text-white text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-[#7a1616] flex items-center justify-center min-w-[280px] sm:min-w-[340px]"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                <span className="px-2">Launch the Portal</span>
              </motion.button>
            ) : (
              <motion.div
                key="launched-indicator"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/95 border-2 border-amber-800/30 shadow-md text-center"
              >
                <p
                  className="text-sm sm:text-base md:text-lg font-extrabold text-[#5c1010] tracking-wide"
                  style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
                >
                  🎉 Portal Officially Launched! 🎉
                </p>
                <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
                  Opening the Rare Digital Manuscripts Archive...
                  {countdown !== null && (
                    <span className="ml-1.5 font-bold text-[#5c1010]">({countdown}s)</span>
                  )}
                </p>
                <button
                  onClick={() => onLaunch && onLaunch()}
                  className="mt-2 px-6 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#5c1010] hover:bg-[#7a1616] rounded-full transition-all cursor-pointer shadow flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  <span>Enter Digital Library Now</span>
                  <span>→</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Note */}
        <div className="text-center pb-1">
          <p
            className="text-[9px] sm:text-[10px] text-stone-500 tracking-wider"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            © 2026 Indian Institute of Advanced Study • Rashtrapati Nivas, Shimla
          </p>
        </div>
      </div>
    </div>
  );
}
