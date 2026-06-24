import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import kelvinPhoto from '../assets/kelvin.jpg';

const TYPED_WORDS = [
  'Full-Stack Engineer',
  'AI Project Lead',
  'Mathematics Graduate',
  'Team Leader',
];

function useTypingEffect(words) {
  const [display,  setDisplay]  = useState('');
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 80);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 45);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return display;
}

// Deterministic particles — no Math.random() to avoid hydration jitter
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  w:     2 + (i % 3),
  left:  `${(i * 5.55) % 100}%`,
  top:   `${(i * 7.77) % 100}%`,
  color: i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#bf00ff' : '#39ff14',
  dur:   3 + (i % 4),
  delay: (i * 0.17) % 3,
}));

export default function Hero() {
  const typed    = useTypingEffect(TYPED_WORDS);
  const heroRef  = useRef(null);

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.13 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16"
    >
      {/* Background particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: p.w, height: p.w, left: p.left, top: p.top, background: p.color, opacity: 0.35 }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Two-column layout ── */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* ── LEFT — text content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono glass neon-border-cyan">
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#39ff14', boxShadow: '0 0 8px #39ff14' }}
              />
              <span style={{ color: '#39ff14' }}>Available for hire</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl xl:text-6xl font-black leading-tight mb-3 tracking-tight"
          >
            <span className="text-white/70 font-medium text-2xl sm:text-3xl block mb-1">Hi, I'm</span>
            <span className="text-white">Kelvin Njoroge</span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            variants={itemVariants}
            className="text-xl sm:text-2xl font-bold mb-5 h-9 flex items-center"
          >
            <span className="text-white/50 mr-2">A</span>
            <span style={{ color: '#00f5ff', textShadow: '0 0 18px #00f5ff60' }}>{typed}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ color: '#00f5ff' }}
            >|</motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/50 max-w-xl mb-9 leading-relaxed"
          >
            Bridging <span style={{ color: '#00f5ff' }}>algorithmic logic</span> with{' '}
            <span style={{ color: '#00f5ff' }}>full-stack engineering</span> to ship
            intelligent, high-performance products — from disease simulation models to
            conversational AI healthcare systems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
            <motion.a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px #00f5ff55' }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 animate-neon-pulse"
              style={{
                background: 'rgba(0,245,255,0.07)',
                border: '1px solid #00f5ff',
                color: '#00f5ff',
              }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px #7c3aed55' }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: '#7c3aed',
                color: '#fff',
                boxShadow: '0 0 16px #7c3aed35',
              }}
            >
              Let's Connect
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
            {[
              { icon: GithubIcon,   href: 'https://github.com/Vokeh254',                             label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/kelvin-njoroge-037719271',    label: 'LinkedIn' },
              { icon: YoutubeIcon,  href: 'https://www.youtube.com/@TruCoder_1ob',                        label: 'YouTube' },
              { icon: Mail,         href: 'mailto:njorogekelvin2022@gmail.com',                      label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, color: '#00f5ff' }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300"
                style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label={label}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>

          {/* Tech stack pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'NLP / AI', 'Express'].map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono glass"
                style={{ border: '1px solid rgba(0,245,255,0.14)', color: 'rgba(255,255,255,0.45)' }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT — photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative animate-float">

            {/* Outer ambient glow */}
            <div
              className="absolute -inset-6 rounded-3xl blur-2xl opacity-25 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)' }}
            />

            {/* Corner accent lines */}
            {/* Top-left */}
            <div className="absolute -top-3 -left-3 w-8 h-8 pointer-events-none"
              style={{ borderTop: '2px solid #00f5ff', borderLeft: '2px solid #00f5ff', borderRadius: '4px 0 0 0' }} />
            {/* Top-right */}
            <div className="absolute -top-3 -right-3 w-8 h-8 pointer-events-none"
              style={{ borderTop: '2px solid #00f5ff', borderRight: '2px solid #00f5ff', borderRadius: '0 4px 0 0' }} />
            {/* Bottom-left */}
            <div className="absolute -bottom-3 -left-3 w-8 h-8 pointer-events-none"
              style={{ borderBottom: '2px solid #00f5ff', borderLeft: '2px solid #00f5ff', borderRadius: '0 0 0 4px' }} />
            {/* Bottom-right */}
            <div className="absolute -bottom-3 -right-3 w-8 h-8 pointer-events-none"
              style={{ borderBottom: '2px solid #00f5ff', borderRight: '2px solid #00f5ff', borderRadius: '0 0 4px 0' }} />

            {/* Photo frame */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: 'clamp(260px, 30vw, 380px)',
                aspectRatio: '3 / 4',
                border: '1px solid rgba(0,245,255,0.25)',
                boxShadow: '0 0 50px rgba(0,245,255,0.12), 0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={kelvinPhoto}
                alt="Kelvin Njoroge — Full-Stack Developer & AI Project Lead"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />

              {/* Subtle dark vignette at bottom for readability */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.6), transparent)' }}
              />
            </div>

            {/* Floating badge — role */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-5 glass rounded-xl px-4 py-2.5 flex items-center gap-2.5"
              style={{
                border: '1px solid rgba(0,245,255,0.3)',
                boxShadow: '0 0 20px rgba(0,245,255,0.12)',
              }}
            >
              <span className="text-base">🤖</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">AI Project Lead</p>
                <p className="text-[10px] text-white/40 font-mono">JHub Africa</p>
              </div>
            </motion.div>

            {/* Floating badge — education */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-5 -right-5 glass rounded-xl px-4 py-2.5 flex items-center gap-2.5"
              style={{
                border: '1px solid rgba(124,58,237,0.35)',
                boxShadow: '0 0 20px rgba(124,58,237,0.12)',
              }}
            >
              <span className="text-base">📐</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">BSc. Math & CS</p>
                <p className="text-[10px] text-white/40 font-mono">JKUAT</p>
              </div>
            </motion.div>

            {/* Live indicator */}
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(5,8,22,0.75)', border: '1px solid rgba(57,255,20,0.3)' }}
            >
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#39ff14', boxShadow: '0 0 6px #39ff14' }}
              />
              <span className="text-[10px] font-mono" style={{ color: '#39ff14' }}>AVAILABLE</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: 'rgba(255,255,255,0.25)' }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
        <ArrowDown size={15} />
      </motion.button>
    </section>
  );
}
