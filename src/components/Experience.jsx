import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';

const TIMELINE = [
  {
    role: 'Software Engineer & Team Lead',
    company: 'JHub Africa',
    location: 'Nairobi, Kenya',
    period: 'June 2025 — September 2025',
    color: '#00f5ff',
    type: 'Full-time',
    description:
      'Served as the technical Team Lead for "Epigent," directing an agile engineering team through the architecture and implementation of specialized disease modeling and agent-based simulation software.',
    highlights: [
      'Directed agile engineering team through architecture & implementation of Epigent',
      'Engineered highly responsive web features using JavaScript, modern frameworks & CSS',
      'Spearheaded debugging sprints and comprehensive code reviews',
      'Drastically accelerated feature implementation and minimised deployment errors',
    ],
    stack: ['Agile Leadership', 'Full-Stack Development', 'JavaScript', 'Software Architecture', 'CSS'],
  },
  {
    role: 'AI Project Lead',
    company: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    location: 'Nairobi, Kenya',
    period: 'Academic Year 2025 / 2026',
    color: '#bf00ff',
    type: 'Final Year Project',
    description:
      'Directed end-to-end development of an AI-powered conversational appointment and booking agent designed to conduct fluid, natural language interactions with patients.',
    highlights: [
      'Led concept-to-production build of an NLP-driven healthcare booking agent',
      'Navigated ambiguous technical roadmap through deep NLP & integration research',
      'Managed project execution, timeline tracking, and rigorous system testing',
      'Ensured secure, production-ready user experience throughout',
    ],
    stack: ['Generative AI', 'Natural Language Processing (NLP)', 'Project Management', 'Research & Development'],
  },
  {
    role: 'Web Developer',
    company: 'Homesage Africa',
    location: 'Nairobi, Kenya',
    period: 'April 2024 — September 2024',
    color: '#39ff14',
    type: 'Contract',
    description:
      'Designed, developed, and maintained responsive, high-performance websites and collaborated directly with UI/UX designers to translate wireframes into pixel-perfect production code.',
    highlights: [
      'Built responsive websites with HTML, CSS, JavaScript, PHP & WordPress',
      'Translated UI/UX wireframes & prototypes into clean production code',
      'Managed client platforms end-to-end including cloud hosting configurations',
      'Scheduled updates and implemented critical security patches',
    ],
    stack: ['Web Development', 'WordPress', 'PHP', 'JavaScript', 'UI/UX Integration', 'Web Hosting'],
  },
  {
    role: 'ICT Personnel',
    company: 'Global College',
    location: 'Nairobi, Kenya',
    period: 'June 2024 — August 2024',
    color: '#ff6b35',
    type: 'Internship',
    description:
      'Delivered tier-1 and tier-2 technical support and designed onboarding training sessions for staff and students to streamline proficiency with ICT tools and campus systems.',
    highlights: [
      'Resolved hardware, software & local network infrastructure issues promptly',
      'Designed and conducted onboarding training for staff and students',
      'Administered secure data clearance & wiping protocols for compliance',
      'Maintained absolute data privacy across all hardware devices',
    ],
    stack: ['Technical Support', 'Network Troubleshooting', 'Data Security', 'IT Training'],
  },
  {
    role: 'Founder & Lead Tutor',
    company: 'Bennittoh Tutors',
    location: 'Remote',
    period: 'January 2024 — April 2024',
    color: '#00f5ff',
    type: 'Founder',
    description:
      'Founded and managed a remote academic support initiative, designing personalised, metrics-driven instruction to strengthen student core weaknesses.',
    highlights: [
      'Founded and managed a remote academic support business from scratch',
      'Designed personalised, metrics-driven instruction lines per student',
      'Handled scheduling pipelines and client communications independently',
      'Ensured seamless virtual delivery across all sessions',
    ],
    stack: ['Entrepreneurship', 'Remote Communication', 'Instructional Delivery', 'Problem Solving'],
  },
];

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{
            background: `${item.color}15`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 20px ${item.color}50`,
          }}
        >
          <Briefcase size={18} style={{ color: item.color }} />
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${item.color}` }}
          />
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
            className="w-px flex-1 mt-2 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${item.color}50, transparent)`,
              minHeight: '60px',
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-12">
        <motion.div
          whileHover={{ y: -4, boxShadow: `0 8px 40px ${item.color}20` }}
          transition={{ duration: 0.25 }}
          className="glass rounded-2xl p-6 cursor-default"
          style={{ border: `1px solid ${item.color}20` }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{item.role}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.company}
                </span>
                <span className="text-white/30">·</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                >
                  {item.type}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {item.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> {item.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/55 text-sm leading-relaxed mb-5">{item.description}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-5">
            {item.highlights.map(h => (
              <li key={h} className="flex items-start gap-2 text-sm text-white/60">
                <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {item.stack.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}25`,
                  color: item.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#bf00ff' }}>
            {'// 02. EXPERIENCE'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
            Career{' '}
            <span style={{ color: '#00f5ff' }}>Timeline</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Building real-world products that sit at the intersection of AI research and software engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {TIMELINE.map((item, i) => (
            <TimelineItem
              key={item.role + item.period}
              item={item}
              index={i}
              isLast={i === TIMELINE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
