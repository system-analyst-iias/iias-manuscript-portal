import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { manuscripts } from '../data/books';

export default function DigitalBooksPage({ onBackToLaunch }) {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef(null);

  const activeBook = manuscripts[selectedBookIndex] || manuscripts[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedBookIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFolio = (index) => {
    const el = document.getElementById(`folio-card-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col items-center relative selection:bg-amber-800 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img
          src={`${import.meta.env.BASE_URL}building.jpg`}
          alt="IIAS Shimla"
          className="w-full h-full object-cover opacity-8 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-[#faf8f5]/92" />
      </div>

      {/* Main Full-Width Centered Container */}
      <div className="w-full flex flex-col items-center relative z-10 flex-1">
        {/* Top Header - Truly Centered across screen */}
        <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 py-3.5 px-4 sm:px-8 shadow-sm flex justify-center">
          <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Back Button */}
            {onBackToLaunch && (
              <button
                onClick={onBackToLaunch}
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-stone-100 hover:bg-[#5c1010] text-stone-700 hover:text-white border-2 border-stone-300 hover:border-[#5c1010] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-2 shrink-0"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                <span>←</span>
                <span>Launch Ceremony</span>
              </button>
            )}

            {/* Institution Header in Center */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center gap-2.5 mb-1">
                <img
                  src={`${import.meta.env.BASE_URL}iias-logo.png`}
                  alt="IIAS Official Logo"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <h1
                  className="text-xs sm:text-sm font-bold tracking-widest uppercase text-stone-900"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  Indian Institute of Advanced Study
                </h1>
              </div>
              <p
                className="text-[10px] sm:text-[11px] text-amber-800 font-semibold tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Digital Library & Manuscript Archive • Rashtrapati Nivas, Shimla
              </p>
            </div>

            {/* Folio Counter Badge */}
            <div className="shrink-0 text-right hidden sm:block">
              <span
                className="text-xs font-semibold text-stone-600 tracking-wider"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                {activeBook.pageUrls.length} Folios Digitized
              </span>
            </div>
          </div>
        </header>

        {/* Manuscript Volumes Selection - Centered & Highly Interactive */}
        <div className="w-full bg-stone-100/90 border-b border-stone-200/80 py-4 px-4 flex justify-center">
          <div className="w-full max-w-5xl flex flex-col items-center text-center">
            <span
              className="text-[11px] uppercase tracking-[0.25em] text-amber-900 font-bold mb-3"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Select Manuscript Volume
            </span>

            {/* User-Friendly, Visible & Interactive Volume Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {manuscripts.map((book, idx) => {
                const isActive = idx === selectedBookIndex;
                return (
                  <button
                    key={book.id}
                    onClick={() => setSelectedBookIndex(idx)}
                    className={`px-6 py-3 sm:px-8 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-3 border-2 ${
                      isActive
                        ? 'bg-[#5c1010] text-white border-[#5c1010] shadow-lg scale-105'
                        : 'bg-white text-stone-700 hover:text-[#5c1010] border-stone-300 hover:border-[#5c1010] hover:bg-stone-50 shadow-sm hover:shadow-md'
                    }`}
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    <span
                      className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {book.code}
                    </span>
                    <span>{book.parba}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Volume Overview Card - Fully Centered */}
        <section className="w-full max-w-4xl px-4 pt-6 pb-2 flex flex-col items-center text-center">
          <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200/80 flex flex-col items-center text-center">
            {/* Metadata Line (NO awkward borders around text) */}
            <p
              className="text-xs text-amber-800 font-semibold tracking-wider uppercase mb-1.5"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              {activeBook.code} • {activeBook.era} • {activeBook.pageUrls.length} Palm-Leaf Folios • {activeBook.script}
            </p>

            {/* Volume Title */}
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-[#5c1010] tracking-wide mb-2"
              style={{ fontFamily: 'var(--font-cinzel-decorative)' }}
            >
              {activeBook.title} — {activeBook.parba}
            </h2>

            {/* Subtle Divider */}
            <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-amber-700/40 to-transparent my-2" />

            {/* Description */}
            <p
              className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mt-1"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {activeBook.description}
            </p>

            {/* Quick Navigation Anchor Bar */}
            <div className="mt-5 pt-3 border-t border-stone-100 w-full flex flex-wrap items-center justify-center gap-2">
              <span
                className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mr-1"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Quick Jump:
              </span>
              {[1, 10, 20, 30, 40, 50, activeBook.pageUrls.length].map((pageNum) => (
                <button
                  key={`jump-${pageNum}`}
                  onClick={() => scrollToFolio(pageNum - 1)}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-[#5c1010] text-stone-700 hover:text-white border-2 border-stone-300 hover:border-[#5c1010] transition-all cursor-pointer shadow-sm"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  Folio {pageNum}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ──────── CONTINUOUS SCROLL VIEW ONLY (FULLY CENTERED) ──────── */}
        <section className="w-full max-w-4xl px-4 py-6 pb-24 flex flex-col items-center text-center">
          <p
            className="text-xs text-stone-500 mb-6 tracking-wide text-center"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Scroll down to view all {activeBook.pageUrls.length} palm-leaf folios in sequence • Click any folio to view in full resolution
          </p>

          {/* Vertical Stack of all 55 Folios */}
          <div className="w-full space-y-8 flex flex-col items-center" ref={scrollContainerRef}>
            {activeBook.pageUrls.map((url, idx) => (
              <motion.div
                id={`folio-card-${idx}`}
                key={`${activeBook.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white rounded-2xl shadow-md border border-stone-200/80 p-5 sm:p-7 flex flex-col items-center text-center transition-all hover:shadow-lg"
              >
                {/* Centered Folio Header */}
                <div className="mb-3 text-center">
                  <p
                    className="text-sm sm:text-base font-bold text-[#5c1010] tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    Folio {String(idx + 1).padStart(2, '0')} of {activeBook.pageUrls.length}
                  </p>
                  <p
                    className="text-xs text-amber-800 font-semibold tracking-wide mt-0.5"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    {activeBook.title} • {activeBook.parba}
                  </p>
                </div>

                {/* Palm-Leaf Folio Display on Museum Mount */}
                <div
                  className="w-full rounded-xl bg-[#1c1917] p-3 sm:p-5 shadow-inner cursor-pointer flex items-center justify-center overflow-hidden group my-1"
                  onClick={() => setLightboxImage({ url, folio: idx + 1 })}
                >
                  <img
                    src={url}
                    alt={`${activeBook.title} Folio ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-auto max-h-[480px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Bottom Action Bar - Centered & Interactive */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full pt-3 border-t border-stone-100 gap-3">
                  <span className="text-xs text-stone-500 font-medium">
                    {activeBook.code} • {activeBook.script} • IIAS Collection
                  </span>

                  {/* Clear Interactive Button */}
                  <button
                    onClick={() => setLightboxImage({ url, folio: idx + 1 })}
                    className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#5c1010] hover:bg-[#7a1616] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2.5"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    <span>View Full Resolution</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Centered Modern Heritage Footer */}
        <footer className="w-full border-t border-stone-200/80 bg-white py-8 px-4 flex justify-center text-center mt-auto">
          <div className="w-full max-w-3xl flex flex-col items-center text-center">
            <p
              className="text-xs font-bold text-stone-900 tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Indian Institute of Advanced Study • Rashtrapati Nivas, Shimla
            </p>
            <p
              className="text-xs text-stone-600 mt-1 max-w-xl"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Preserved & Digitized under the patronage of Prof. Himanshu Kumar Chaturvedi, Hon'ble Director
              <br />
              Digital Library & Manuscript Archive Coordination: Dr. Rajeev Kumar Mishra, Librarian
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full bg-[#5c1010] text-white shadow-xl cursor-pointer hover:bg-[#7a1616] transition-all text-xs sm:text-sm font-bold flex items-center gap-2"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            <span>↑</span>
            <span>Back to Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/94 flex flex-col items-center justify-between p-4 backdrop-blur-sm"
          >
            {/* Lightbox Header */}
            <div className="w-full max-w-5xl flex items-center justify-between py-2.5 border-b border-stone-800">
              <div className="text-left">
                <h3
                  className="text-sm sm:text-base font-bold text-stone-100"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {activeBook.title} — {activeBook.parba} • Folio {lightboxImage.folio}
                </h3>
                <p className="text-xs text-amber-400">{activeBook.script} • IIAS Shimla Collection</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.5))}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer transition-colors"
                >
                  Zoom In (+)
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.8))}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer transition-colors"
                >
                  Zoom Out (-)
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setLightboxImage(null);
                    setZoomLevel(1);
                  }}
                  className="px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-[#5c1010] hover:bg-[#7a1616] text-white cursor-pointer ml-2 transition-colors shadow"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Lightbox Image Stage with Zoom */}
            <div className="flex-1 w-full max-w-5xl overflow-auto flex items-center justify-center p-4">
              <img
                src={lightboxImage.url}
                alt="High Resolution Folio"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Lightbox Footer Navigation */}
            <div className="w-full max-w-md flex items-center justify-between py-3 text-xs sm:text-sm text-stone-300">
              <button
                onClick={() => {
                  const prevIdx = lightboxImage.folio - 2;
                  if (prevIdx >= 0) {
                    setLightboxImage({
                      url: activeBook.pageUrls[prevIdx],
                      folio: prevIdx + 1,
                    });
                  }
                }}
                disabled={lightboxImage.folio <= 1}
                className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-30 cursor-pointer font-semibold transition-colors"
              >
                Previous Folio
              </button>
              <span className="font-semibold text-stone-200">
                Folio {lightboxImage.folio} of {activeBook.pageUrls.length}
              </span>
              <button
                onClick={() => {
                  const nextIdx = lightboxImage.folio;
                  if (nextIdx < activeBook.pageUrls.length) {
                    setLightboxImage({
                      url: activeBook.pageUrls[nextIdx],
                      folio: nextIdx + 1,
                    });
                  }
                }}
                disabled={lightboxImage.folio >= activeBook.pageUrls.length}
                className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-30 cursor-pointer font-semibold transition-colors"
              >
                Next Folio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
