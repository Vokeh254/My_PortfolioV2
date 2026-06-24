import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Users, Calculator } from 'lucide-react';
import pillarsImg from '../assets/pillars.jpg';

const PILLARS = [
  {
    icon: Calculator,
    title: 'Advanced Mathematics',
    color: '#00f5ff',
    description:
      'BSc. Mathematics & Computer Science graduate from JKUAT. Deep expertise in calculus, linear algebra, probability theory, and discrete mathematics powering algorithmic problem-solving.',
    tags: ['Linear Algebra', 'Probability', 'Calculus', 'Graph Theory'],
  },
  {
    icon: Code2,
    title: 'Full-Stack Engineering',
    color: '#bf00ff',
    description:
      'End-to-end product builder with the MERN stack, Python backends, and containerised deployments. From database schema to pixel-perfect UIs, I own the entire vertical.',
    tags: ['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'Express'],
  },
  {
    icon: Brain,
    title: 'AI & NLP Systems',
    color: '#39ff14',
    description:
      'Architecting and deploying conversational AI and machine-learning solutions — including a healthcare booking agent and epidemiological simulation models using real-world data.',
    tags: ['NLP', 'LLMs', 'Simulation', 'Healthcare AI', 'Data Science'],
  },
  {
    icon: Users,
    title: 'Technical Leadership',
    color: '#ff6b35',
    description:
      'Leading engineering teams at JHub Africa, coordinating cross-functional sprints, mentoring junior developers, and delivering high-impact projects on schedule.',
    tags: ['Team Lead', 'Agile', 'Mentorship', 'Project Planning'],
  },
];

function PillarCard({ pillar, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = pillar.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 cursor-default group"
      style={{ border: `1px solid ${pillar.color}22` }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${pillar.color}15`,
          border: `1px solid ${pillar.color}40`,
          boxShadow: `0 0 20px ${pillar.color}20`,
        }}
      >
        <Icon size={22} style={{ color: pillar.color }} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white">{pillar.title}</h3>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed">{pillar.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {pillar.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-mono"
            style={{
              background: `${pillar.color}12`,
              border: `1px solid ${pillar.color}30`,
              color: pillar.color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#00f5ff' }}>
            {'// 01. WHO AM I'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
            Core{' '}
            <span style={{ color: '#00f5ff' }}>Pillars</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            My work lives at the intersection of mathematics, software engineering, and artificial intelligence ,
            bringing a rare hybrid skill set to every product I build.
          </p>
        </motion.div>

        {/* Bio + photo row */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Text bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              A developer who thinks in equations &amp; ships in code.
            </h3>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Kelvin Njoroge</span> — a Full-Stack Software Developer
                and AI Project Lead based in Nairobi, Kenya. My background in Mathematics & Computer Science
                gives me a precise, analytical lens through which I architect robust software systems.
              </p>
              <p>
                At <span style={{ color: '#00f5ff' }}>JHub Africa</span>, I lead teams building data-driven applications,
                including an <span style={{ color: '#00f5ff' }}>epidemiological simulation model</span> and a{' '}
                <span style={{ color: '#00f5ff' }}>conversational AI healthcare booking agent</span> — real-world
                solutions that merge domain science with modern engineering.
              </p>
              <p>
                I believe great software is equal parts art and science , methodical design powered by creative thinking.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Shipped' },
                { value: '2', label: 'AI Systems Built' },
              ].map(stat => (
                <div key={stat.label} className="text-center glass rounded-xl p-4">
                  <div className="text-2xl font-black" style={{ color: '#00f5ff' }}>{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative animate-float">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full opacity-20 blur-xl"
                style={{ background: '#00f5ff' }}
              />
              {/* Avatar container */}
              <div
                className="relative w-64 h-64 rounded-3xl overflow-hidden"
                style={{
                  border: '2px solid rgba(0,245,255,0.3)',
                  boxShadow: '0 0 40px rgba(0,245,255,0.15)',
                }}
              >
                <img
                  src={pillarsImg}
                  alt="Kelvin Njoroge"
                  className="w-full h-full object-cover object-center"
                />
                {/* Bottom vignette */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.6), transparent)' }}
                />
              </div>

              {/* Floating badge — bottom right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 text-sm font-semibold neon-border-cyan"
                style={{ color: '#00f5ff' }}
              >
                🤖 AI + MERN
              </motion.div>

              {/* Floating badge — top left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -left-4 glass rounded-xl px-4 py-2 text-sm font-semibold"
                style={{ border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' }}
              >
                📐 BSc. Math & CS
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
