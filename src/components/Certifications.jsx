import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, Shield, Container, GraduationCap, CheckCircle2 } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'BSc. Mathematics & Computer Science',
    institution: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    period: '2020 — 2024',
    color: '#00f5ff',
    icon: GraduationCap,
    type: 'Degree',
    highlights: [
      'Calculus, Linear Algebra, Probability & Statistics',
      'Data Structures & Algorithms, Operating Systems',
      'Numerical Analysis, Mathematical Modelling',
      'Database Systems, Software Engineering',
    ],
  },
];

const CERTIFICATIONS = [
  {
    name: 'MERN Stack Web Development',
    issuer: 'Power Learn Project (PLP)',
    year: '2023',
    color: '#39ff14',
    icon: BookOpen,
    category: 'Full-Stack',
    description: 'Intensive programme covering MongoDB, Express, React, and Node.js with live project delivery.',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'JWT Auth'],
  },
  {
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2023',
    color: '#ff6b35',
    icon: Shield,
    category: 'Security',
    description: 'Core security concepts including network defence, cryptography, and vulnerability assessment.',
    skills: ['Network Security', 'Cryptography', 'Vulnerability Scan', 'Threat Analysis'],
  },
  {
    name: 'Docker & Kubernetes Fundamentals',
    issuer: 'KodeKloud',
    year: '2024',
    color: '#bf00ff',
    icon: Container,
    category: 'DevOps',
    description: 'Container orchestration from Dockerfile authoring through multi-service Compose and K8s basics.',
    skills: ['Docker', 'Docker Compose', 'Kubernetes', 'CI/CD', 'Container Security'],
  },
  {
    name: 'Introduction to AI & Machine Learning',
    issuer: 'Google via Coursera',
    year: '2024',
    color: '#00f5ff',
    icon: Award,
    category: 'AI / ML',
    description: 'Foundational ML concepts, supervised/unsupervised learning, and neural network basics.',
    skills: ['ML Fundamentals', 'Neural Networks', 'Python / NumPy', 'TensorFlow'],
  },
];

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = cert.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: `0 12px 40px ${cert.color}18` }}
      className="glass rounded-2xl p-6 flex flex-col gap-4 group cursor-default"
      style={{ border: `1px solid ${cert.color}18`, transition: 'all 0.3s ease' }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${cert.color}15`,
            border: `1px solid ${cert.color}40`,
            boxShadow: `0 0 16px ${cert.color}20`,
          }}
        >
          <Icon size={20} style={{ color: cert.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}25` }}
            >
              {cert.category}
            </span>
            <span className="text-xs text-white/30 font-mono">{cert.year}</span>
          </div>
          <h3 className="font-bold text-white text-sm leading-snug">{cert.name}</h3>
          <p className="text-xs mt-1" style={{ color: cert.color }}>{cert.issuer}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-white/45 leading-relaxed">{cert.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
        {cert.skills.map(skill => (
          <span
            key={skill}
            className="text-xs px-2.5 py-1 rounded-full font-mono"
            style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}25` }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Verified badge */}
      <div className="flex items-center gap-1.5 text-xs text-white/30 mt-auto">
        <CheckCircle2 size={12} style={{ color: cert.color }} />
        <span>Verified Certificate</span>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const eduRef = useRef(null);
  const eduInView = useInView(eduRef, { once: true, margin: '-60px' });

  const edu = EDUCATION[0];
  const EduIcon = edu.icon;

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#ff6b35' }}>
            {'// 04. CREDENTIALS'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
            Education &{' '}
            <span style={{ color: '#00f5ff' }}>Certifications</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Formal education meets industry-recognised credentials — a well-rounded foundation for complex engineering challenges.
          </p>
        </motion.div>

        {/* Education card — full width */}
        <motion.div
          ref={eduRef}
          initial={{ opacity: 0, y: 40 }}
          animate={eduInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-8 mb-12"
          style={{
            border: `1px solid ${edu.color}30`,
            background: `linear-gradient(135deg, ${edu.color}06 0%, rgba(255,255,255,0.02) 100%)`,
          }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${edu.color}15`,
                border: `2px solid ${edu.color}50`,
                boxShadow: `0 0 30px ${edu.color}25`,
              }}
            >
              <EduIcon size={28} style={{ color: edu.color }} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                >
                  {edu.type}
                </span>
                <span className="text-sm text-white/40 font-mono">{edu.period}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1">{edu.degree}</h3>
              <p className="text-base font-semibold mb-5" style={{ color: edu.color }}>{edu.institution}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {edu.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2 text-sm text-white/50">
                    <CheckCircle2 size={13} style={{ color: edu.color }} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certs grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>

        {/* Skills bar summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <h3 className="text-lg font-bold text-white mb-6 text-center">Proficiency Overview</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: 'React / Next.js',  level: 90, color: '#00f5ff' },
              { label: 'Node.js / Express', level: 88, color: '#00f5ff' },
              { label: 'Python / FastAPI',  level: 85, color: '#bf00ff' },
              { label: 'MongoDB / SQL',     level: 82, color: '#bf00ff' },
              { label: 'Docker / DevOps',  level: 75, color: '#39ff14' },
              { label: 'NLP / AI Systems', level: 78, color: '#39ff14' },
              { label: 'Mathematics',       level: 92, color: '#ff6b35' },
              { label: 'Team Leadership',   level: 87, color: '#ff6b35' },
            ].map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/60">{skill.label}</span>
                  <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.07, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      boxShadow: `0 0 8px ${skill.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
