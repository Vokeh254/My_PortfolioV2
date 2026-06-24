import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// ── Design work imports ───────────────────────────────────────────────────────
import d1 from '../assets/Designworks/367d6446-6ac3-46f1-9c2b-b67d07eb92bd.jpg';
import d2 from '../assets/Designworks/716e385e-0ad4-4246-8be7-db0e9db423a0.jpg';
import d3 from '../assets/Designworks/b95d8e9c-58cc-4d6a-af79-44dabc1afe56.jpg';
import d4 from '../assets/Designworks/eid-al-fitr-post.png';
import d5 from '../assets/Designworks/food-menu-template.png';
import d6 from '../assets/Designworks/stephanie-del.png';
import d7 from '../assets/Designworks/yt-thumb.png';

const WORKS = [
  { src: d1, title: 'Brand Visual',        category: 'Branding' },
  { src: d2, title: 'Social Media Post',   category: 'Social Media' },
  { src: d3, title: 'Graphic Composition', category: 'Illustration' },
  { src: d4, title: 'Eid Al-Fitr Post',    category: 'Social Media' },
  { src: d5, title: 'Food Menu Template',  category: 'Print / Digital' },
  { src: d6, title: 'Stephanie Del',       category: 'Portrait Design' },
  { src: d7, title: 'YouTube Thumbnail',   category: 'Content Creation' },
];

// Duplicate the array so the loop looks seamless
const LOOP = [...WORKS, ...WORKS, ...WORKS];

// ── Infinite marquee strip ────────────────────────────────────────────────────
function Marquee({ onOpen }) {
  const trackRef  = useRef(null);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);          // current x offset (px)
  const pausedRef = useRef(false);
  const SPEED     = 0.55;               // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // We only need to loop by one "set" worth of width (1/3 of total)
    const singleSetWidth = track.scrollWidth / 3;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= SPEED;
        // Reset when we've scrolled one full set
        if (Math.abs(posRef.current) >= singleSetWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
    >
      {/* Moving track */}
      <div ref={trackRef} className="flex gap-5 will-change-transform" style={{ width: 'max-content' }}>
        {LOOP.map((work, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ duration: 0.22 }}
            onClick={() => onOpen(i % WORKS.length)}
            className="relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
            style={{
              width:  240,
              height: 160,
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <img
              src={work.src}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
              style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.88) 0%, transparent 55%)' }}
            >
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full self-start mb-1"
                style={{
                  background: 'rgba(0,245,255,0.15)',
                  border: '1px solid rgba(0,245,255,0.3)',
                  color: '#00f5ff',
                }}
              >
                {work.category}
              </span>
              <p className="text-xs font-semibold text-white leading-tight">{work.title}</p>
            </div>

            {/* Expand icon */}
            <div
              className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: 'rgba(5,8,22,0.75)',
                border: '1px solid rgba(0,245,255,0.25)',
                color: '#00f5ff',
              }}
            >
              <Maximize2 size={12} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const total = WORKS.length;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,8,22,0.96)', backdropFilter: 'blur(18px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.92,    opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="relative max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={WORKS[index].src}
          alt={WORKS[index].title}
          className="w-full max-h-[80vh] object-contain rounded-xl"
          style={{ border: '1px solid rgba(0,245,255,0.15)' }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(5,8,22,0.9)', border: '1px solid rgba(0,245,255,0.3)', color: '#00f5ff' }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(5,8,22,0.8)', border: '1px solid rgba(0,245,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(5,8,22,0.8)', border: '1px solid rgba(0,245,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        {/* Caption */}
        <div className="text-center mt-4 flex items-center justify-center gap-3">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)', color: '#00f5ff' }}
          >
            {WORKS[index].category}
          </span>
          <span className="text-sm text-white/70">{WORKS[index].title}</span>
          <span className="text-xs text-white/30 font-mono">{index + 1} / {total}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function DesignWork() {
  const headerRef  = useRef(null);
  const inView     = useInView(headerRef, { once: true, margin: '-80px' });
  const [lightbox, setLightbox] = useState(null);

  const openLightbox  = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevLightbox  = () => setLightbox(i => (i - 1 + WORKS.length) % WORKS.length);
  const nextLightbox  = () => setLightbox(i => (i + 1) % WORKS.length);

  return (
    <>
      <section id="design" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-mono mb-3" style={{ color: '#bf00ff' }}>
              {'// 05. DESIGN'}
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Graphic{' '}
              <span style={{ color: '#00f5ff' }}>Design Work</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Beyond code — visual design spanning social media, branding, and content creation.
              Click any piece to view it full size.
            </p>
          </motion.div>
        </div>

        {/* Full-width marquee — intentionally outside px-6 container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Marquee onOpen={openLightbox} />
        </motion.div>

        {/* Work count + hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-8 px-6"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <span className="text-xs font-mono text-white/30 tracking-widest">
            {WORKS.length} PIECES · HOVER TO PAUSE · CLICK TO EXPAND
          </span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            index={lightbox}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
