import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── One burst sparkle emitted on click ───────────────────────────────────────
function Sparkle({ x, y, id, onDone }) {
  // 8 rays fanning out in all directions
  const RAYS = Array.from({ length: 8 }, (_, i) => {
    const angle  = (i / 8) * Math.PI * 2;
    const dist   = 28 + Math.random() * 22;
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      size: 3 + Math.random() * 3,
      delay: Math.random() * 0.06,
    };
  });

  return (
    <div
      className="fixed pointer-events-none z-[9997]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      {/* Central flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.8, 0], opacity: [1, 0.8, 0] }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        onAnimationComplete={onDone}
        className="absolute rounded-full"
        style={{
          width: 12,
          height: 12,
          left: -6,
          top: -6,
          background: '#fff',
          boxShadow: '0 0 14px 6px #00f5ff, 0 0 30px 10px #00f5ff80',
        }}
      />

      {/* 4-point star cross arms */}
      {[0, 90, 45, 135].map((deg, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 0], opacity: [1, 0.9, 0] }}
          transition={{ duration: 0.35, delay: i * 0.02, ease: 'easeOut' }}
          className="absolute origin-left rounded-full"
          style={{
            width: 18,
            height: 2,
            left: 0,
            top: -1,
            background: 'linear-gradient(90deg, #fff, #00f5ff00)',
            boxShadow: '0 0 6px #00f5ff',
            transform: `rotate(${deg}deg)`,
          }}
        />
      ))}

      {/* Ray particles */}
      {RAYS.map((r, i) => (
        <motion.div
          key={i + 10}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: r.dx, y: r.dy, opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 + r.delay, delay: r.delay, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            width: r.size,
            height: r.size,
            left: -r.size / 2,
            top: -r.size / 2,
            background: i % 2 === 0 ? '#00f5ff' : '#fff',
            boxShadow: `0 0 6px ${i % 2 === 0 ? '#00f5ff' : '#bf00ff'}`,
          }}
        />
      ))}
    </div>
  );
}

// ── Trailing comet dots ───────────────────────────────────────────────────────
const TRAIL_LENGTH = 10;

export default function CursorStar() {
  const posRef      = useRef({ x: -200, y: -200 });
  const starRef     = useRef(null);
  const trailRefs   = useRef([]);
  const trailPos    = useRef(Array(TRAIL_LENGTH).fill({ x: -200, y: -200 }));
  const rafRef      = useRef(null);
  const [sparkles, setSparkles] = useState([]);  // [{id,x,y}]
  const [visible,  setVisible]  = useState(false);

  // ── Track raw mouse position ──
  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  // ── rAF loop: smoothly interpolate star + trail ──
  useEffect(() => {
    let starX = -200, starY = -200;

    const loop = () => {
      const target = posRef.current;

      // Smooth follow — easing factor
      starX += (target.x - starX) * 0.18;
      starY += (target.y - starY) * 0.18;

      // Move main star
      if (starRef.current) {
        starRef.current.style.transform =
          `translate(${starX - 10}px, ${starY - 10}px)`;
      }

      // Shift trail positions
      trailPos.current = [
        { x: starX, y: starY },
        ...trailPos.current.slice(0, TRAIL_LENGTH - 1),
      ];

      // Update trail DOM nodes
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const p    = trailPos.current[i];
        const size = Math.max(2, 8 - i * 0.7);
        const op   = Math.max(0, 0.55 - i * 0.055);
        el.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`;
        el.style.width     = `${size}px`;
        el.style.height    = `${size}px`;
        el.style.opacity   = op;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Click → emit sparkle burst ──
  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random();
      setSparkles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const removeSparkle = (id) =>
    setSparkles(prev => prev.filter(s => s.id !== id));

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* ── Trail dots ── */}
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9995]"
          style={{
            background: i % 2 === 0 ? '#00f5ff' : '#bf00ff',
            boxShadow: `0 0 6px ${i % 2 === 0 ? '#00f5ff' : '#bf00ff'}`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* ── Main star cursor ── */}
      <div
        ref={starRef}
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          width: 20,
          height: 20,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
            transform: 'scale(2.5)',
          }}
        />

        {/* ★ Four-point star SVG */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          style={{ filter: 'drop-shadow(0 0 5px #00f5ff) drop-shadow(0 0 10px #00f5ffaa)' }}
        >
          <path
            d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
            fill="white"
          />
        </motion.svg>
      </div>

      {/* ── Click sparkle bursts ── */}
      <AnimatePresence>
        {sparkles.map(s => (
          <Sparkle
            key={s.id}
            id={s.id}
            x={s.x}
            y={s.y}
            onDone={() => removeSparkle(s.id)}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
