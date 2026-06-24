import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// ─── Timing budget (ms) ───────────────────────────────────────────────────────
// Total visible: 4000ms
// Phase 1 – grid:     800ms
// Phase 2 – typing: 2350ms  (lines + inter-line gaps)
// Phase 3 – exit:    850ms  (framer-motion exit transition)
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_MS        = 4000;
const GRID_MS         = 800;
const EXIT_MS         = 850;
const TYPING_BUDGET   = TOTAL_MS - GRID_MS - EXIT_MS; // 2350ms
const POST_LAST_PAUSE = 200;                           // ms after last line before exit starts

const TERMINAL_LINES = [
  { text: '> Initializing kernel modules...',      color: 'rgba(255,255,255,0.5)' },
  { text: '> Compiling MERN stack environment...', color: 'rgba(255,255,255,0.5)' },
  { text: '> Mounting Docker containers...',        color: '#00f5ff' },
  { text: '> Bootstrapping AI inference engine...', color: '#00f5ff' },
  { text: '> Importing NLP conversation models...', color: '#00f5ff' },
  { text: '> Building disease simulation graph...', color: '#00f5ff' },
  { text: '> Rendering portfolio components...',    color: '#39ff14' },
  { text: '> All systems operational. ✓',          color: '#39ff14' },
];

// ms per character — calculated so all lines finish within TYPING_BUDGET
const INTER_LINE_GAP = 80; // ms pause between finishing one line and starting next
const TOTAL_CHARS    = TERMINAL_LINES.reduce((s, l) => s + l.text.length, 0);
const AVAILABLE_TYPING = TYPING_BUDGET - POST_LAST_PAUSE - INTER_LINE_GAP * TERMINAL_LINES.length;
const CHAR_SPEED     = Math.floor(AVAILABLE_TYPING / TOTAL_CHARS); // ~22ms

// ─── Floating particle ───────────────────────────────────────────────────────
function Particle({ i }) {
  const colors = ['#00f5ff', '#bf00ff', '#39ff14', '#ff6b35'];
  const color  = colors[i % colors.length];
  const size   = 1.5 + (i % 3);
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        left: `${(i * 4.7) % 100}%`,
        top:  `${(i * 7.3) % 100}%`,
        background: color,
        boxShadow: `0 0 6px ${color}`,
      }}
      animate={{ y: [0, -20, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
    />
  );
}

// ─── Grid that assembles during phase 1 ──────────────────────────────────────
function HexGrid({ visible }) {
  const COLS = 12, ROWS = 7;
  const cells = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      cells.push({ r, c, id: r * COLS + c });

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: '4px', width: '95%' }}>
        {cells.map(({ id, r, c }) => {
          const color = (r + c) % 5 === 0 ? '#00f5ff' : (r + c) % 5 === 2 ? '#bf00ff' : 'rgba(255,255,255,0.06)';
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0 }}
              animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.25, delay: (r + c) * 0.03, ease: 'backOut' }}
              style={{
                height: '18px', borderRadius: '3px', background: color,
                boxShadow: (r + c) % 5 === 0 ? '0 0 8px #00f5ff80' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Single line that types character by character ────────────────────────────
function TypedLine({ text, color, speed, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [finished,  setFinished]  = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    setFinished(false);
    const t = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(t);
        setFinished(true);
        setTimeout(onDone, INTER_LINE_GAP);
      }
    }, speed);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div className="leading-7 font-mono text-sm whitespace-pre-wrap break-all" style={{ color }}>
      {displayed}
      {!finished && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="inline-block w-[7px] h-[14px] ml-0.5 align-middle rounded-sm"
          style={{ background: '#00f5ff' }}
        />
      )}
    </div>
  );
}

// ─── Scan ring ────────────────────────────────────────────────────────────────
function ScanRing({ radius, duration, color, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: radius * 2, height: radius * 2,
        border: `1px solid ${color}`,
        top: '50%', left: '50%',
        marginTop: -radius, marginLeft: -radius,
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0.4, 1.1, 1.4] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onComplete }) {
  const [phase,     setPhase]     = useState('grid');
  const [lineIndex, setLineIndex] = useState(0);
  const [doneLines, setDoneLines] = useState([]);
  const [progress,  setProgress]  = useState(0);
  const [exiting,   setExiting]   = useState(false);

  const rawProgress = useMotionValue(0);
  const springProg  = useSpring(rawProgress, { stiffness: 80, damping: 20 });

  // ── Hard 4-second deadline — fires exit at exactly (TOTAL_MS - EXIT_MS) ──
  useEffect(() => {
    const hardDeadline = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, EXIT_MS);
    }, TOTAL_MS - EXIT_MS); // 3150ms
    return () => clearTimeout(hardDeadline);
  }, [onComplete]);

  // ── Phase 1: show grid for GRID_MS, then switch to terminal ──
  useEffect(() => {
    const t = setTimeout(() => setPhase('terminal'), GRID_MS);
    return () => clearTimeout(t);
  }, []);

  // ── Phase 2: advance lines ──
  const handleLineDone = () => {
    const next = lineIndex + 1;
    const pct  = Math.round((next / TERMINAL_LINES.length) * 100);
    setDoneLines(prev => [...prev, lineIndex]);
    rawProgress.set(pct);
    setProgress(pct);
    if (next < TERMINAL_LINES.length) {
      setLineIndex(next);
    }
    // exit is handled by the hard deadline — no need to trigger it here
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#050816' }}
        >
          {/* Dot-matrix background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,245,255,0.18) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.22,
            }}
          />

          <HexGrid visible={phase === 'grid'} />

          <ScanRing radius={180} duration={3.0} color="#00f5ff40" delay={0}   />
          <ScanRing radius={280} duration={3.6} color="#bf00ff30" delay={0.5} />
          <ScanRing radius={380} duration={4.2} color="#39ff1420" delay={1.0} />

          {[...Array(24)].map((_, i) => <Particle key={i} i={i} />)}

          {/* ── Logo ── */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'backOut' }}
            className="relative mb-8 z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.6, 0.25] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 rounded-2xl blur-xl"
              style={{ background: '#00f5ff', zIndex: -1 }}
            />
            <div
              className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-0.5"
              style={{
                background: 'rgba(5,8,22,0.92)',
                border: '2px solid rgba(0,245,255,0.55)',
                boxShadow: '0 0 40px #00f5ff45, inset 0 0 20px #00f5ff08',
              }}
            >
              <span className="text-3xl font-black" style={{ color: '#00f5ff', textShadow: '0 0 18px #00f5ff' }}>
                KN
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/30">DEV</span>
            </div>

            {/* Orbit 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute -inset-4 pointer-events-none"
            >
              <div className="w-3 h-3 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2"
                style={{ background: '#00f5ff', boxShadow: '0 0 10px #00f5ff' }} />
            </motion.div>

            {/* Orbit 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute -inset-7 pointer-events-none"
            >
              <div className="w-2 h-2 rounded-full absolute top-0 right-1"
                style={{ background: '#bf00ff', boxShadow: '0 0 8px #bf00ff' }} />
            </motion.div>
          </motion.div>

          {/* ── Terminal ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 w-full mx-4 rounded-xl overflow-hidden"
            style={{
              maxWidth: '560px',
              background: 'rgba(10,14,26,0.97)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 0 50px rgba(0,245,255,0.1), 0 24px 48px rgba(0,0,0,0.55)',
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-white/20">kelvin@portfolio:~</span>
              </div>
              <div className="w-16" />
            </div>

            {/* Body */}
            <div className="p-5 min-h-[220px]">
              {/* Completed lines */}
              {doneLines.map(i => (
                <div key={i} className="leading-7 font-mono text-sm" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {TERMINAL_LINES[i].text}
                </div>
              ))}

              {/* Active typing line */}
              {phase === 'terminal' && lineIndex < TERMINAL_LINES.length && (
                <TypedLine
                  key={lineIndex}
                  text={TERMINAL_LINES[lineIndex].text}
                  color={TERMINAL_LINES[lineIndex].color}
                  speed={CHAR_SPEED}
                  onDone={handleLineDone}
                />
              )}

              {/* Phase 1 placeholder */}
              {phase === 'grid' && (
                <motion.div
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  className="font-mono text-sm leading-7"
                  style={{ color: '#00f5ff' }}
                >
                  {'> Assembling environment'}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="inline-block w-[7px] h-[14px] ml-1 align-middle rounded-sm"
                    style={{ background: '#00f5ff' }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-5 w-full mx-4"
            style={{ maxWidth: '560px' }}
          >
            <div className="flex justify-between text-xs font-mono text-white/22 mb-2">
              <span className="tracking-widest">LOADING PORTFOLIO</span>
              <span style={{ color: '#00f5ff' }}>{progress}%</span>
            </div>
            <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00f5ff, #00c8d4)',
                  boxShadow: '0 0 10px #00f5ff70',
                  width: springProg,
                }}
              />
              {/* Shimmer sweep */}
              <motion.div
                className="absolute top-0 h-full w-16 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                animate={{ left: ['-15%', '115%'] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] font-mono text-white/18">
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                {phase === 'grid' ? '■ ASSEMBLING...' : progress < 100 ? '■ BOOTING...' : '■ READY'}
              </motion.span>
              <span>{TERMINAL_LINES.length} MODULES</span>
            </div>
          </motion.div>

          {/* ── Footer tag ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-7 left-0 right-0 flex justify-center z-10"
          >
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/18 tracking-widest">
              <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00f5ff35)' }} />
              KELVIN NJOROGE · FULL-STACK & AI ENGINEER · NAIROBI
              <span className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00f5ff35, transparent)' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
