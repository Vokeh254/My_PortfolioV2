import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const PROJECTS = [
  {
    title: 'Healthcare AI Booking Agent',
    description:
      'A conversational NLP agent that enables patients to book, reschedule, and cancel clinic appointments via natural language chat. Integrates intent recognition, entity extraction, and dialogue management with a real clinic booking backend.',
    color: '#00f5ff',
    badge: 'AI / NLP',
    featured: true,
    stack: ['Python', 'Rasa', 'FastAPI', 'MongoDB', 'React', 'Docker', 'WebSockets'],
    metrics: ['~60% booking friction reduction', 'Multi-intent dialogue', 'REST + WebSocket API'],
    github: '#',
    live: '#',
  },
  {
    title: 'Disease Simulation Platform',
    description:
      'Interactive epidemic simulation engine implementing SEIR/SIR compartmental models with real population data. Features a live parameter control dashboard and geo-visualisation of disease spread across Kenyan counties.',
    color: '#bf00ff',
    badge: 'Data Science',
    featured: true,
    stack: ['React', 'Python', 'D3.js', 'Node.js', 'PostgreSQL', 'Docker'],
    metrics: ['SEIR/SIR models', 'Real census data', 'Interactive visualisation'],
    github: '#',
    live: '#',
  },
  {
    title: 'MERN E-Commerce Platform',
    description:
      'Full-stack e-commerce application with JWT authentication, product management, cart, checkout flow, and an admin dashboard. Deployed in Docker containers with Nginx reverse proxy.',
    color: '#39ff14',
    badge: 'Full-Stack',
    featured: false,
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Docker', 'Nginx'],
    metrics: ['Secure auth system', 'Admin dashboard', 'Containerised deploy'],
    github: '#',
    live: '#',
  },
  {
    title: 'Real-Time Collaborative Whiteboard',
    description:
      'Multi-user drawing and brainstorming tool with WebSocket-powered real-time sync, infinite canvas, shape tools, and session sharing via unique room codes.',
    color: '#ff6b35',
    badge: 'Real-Time',
    featured: false,
    stack: ['React', 'Node.js', 'Socket.io', 'Canvas API', 'Redis'],
    metrics: ['Real-time sync', 'Infinite canvas', 'Room-based sessions'],
    github: '#',
    live: '#',
  },
  {
    title: 'Cybersecurity Vulnerability Scanner',
    description:
      'Network reconnaissance and vulnerability assessment tool for local lab environments. Generates structured HTML reports with CVSS severity ratings, built as part of Cisco Cybersecurity training.',
    color: '#ff0080',
    badge: 'Security',
    featured: false,
    stack: ['Python', 'Nmap', 'SQLite', 'HTML/CSS', 'Jinja2'],
    metrics: ['CVSS scoring', 'Port scanning', 'HTML reports'],
    github: '#',
    live: null,
  },
  {
    title: 'DevOps CI/CD Pipeline Template',
    description:
      'Production-ready GitHub Actions + Docker workflow template for Node.js applications. Includes automated testing, image builds, push to Docker Hub, and deploy-to-server stages.',
    color: '#00f5ff',
    badge: 'DevOps',
    featured: false,
    stack: ['Docker', 'GitHub Actions', 'Node.js', 'Shell', 'Nginx'],
    metrics: ['Multi-stage builds', 'Auto-deploy', 'Health checks'],
    github: '#',
    live: null,
  },
];

const FILTERS = ['All', 'AI / NLP', 'Full-Stack', 'Data Science', 'Security', 'DevOps', 'Real-Time'];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass rounded-2xl overflow-hidden flex flex-col group cursor-default"
      style={{
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 8px 40px ${project.color}18` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Card top bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.featured && (
              <Star size={14} fill={project.color} style={{ color: project.color }} />
            )}
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {project.badge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.15, color: '#fff' }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                whileHover={{ scale: 1.15, color: project.color }}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                aria-label="Live demo"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold transition-colors duration-300"
          style={{ color: hovered ? project.color : '#fff' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1">{project.description}</p>

        {/* Metrics */}
        <ul className="space-y-1.5">
          {project.metrics.map(m => (
            <li key={m} className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
              {m}
            </li>
          ))}
        </ul>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.45)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.badge === activeFilter);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#39ff14' }}>
            {'// 03. PROJECTS'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
            Featured{' '}
            <span style={{ color: '#00f5ff' }}>Work</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            A selection of things I've built — from AI agents to full-stack platforms.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300"
              style={{
                background: activeFilter === f ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: activeFilter === f ? '1px solid rgba(0,245,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: activeFilter === f ? '#00f5ff' : 'rgba(255,255,255,0.5)',
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
