import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Design',         href: '#design' },
  { label: 'Contact',        href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: scrolled ? 'rgba(5,8,22,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black"
              style={{
                background: 'rgba(0,245,255,0.1)',
                border: '1px solid rgba(0,245,255,0.4)',
                color: '#00f5ff',
                textShadow: '0 0 10px #00f5ff',
              }}
            >
              KN
            </div>
            <span className="font-bold text-white hidden sm:block">
              Kelvin<span style={{ color: '#00f5ff' }}>.</span>dev
            </span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                    style={{
                      color: isActive ? '#00f5ff' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={e => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #00f5ff22, #bf00ff22)',
                border: '1px solid rgba(0,245,255,0.4)',
                color: '#00f5ff',
              }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#00f5ff' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-40 flex flex-col pt-24 pb-8 px-6"
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(0,245,255,0.1)',
            }}
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="block px-4 py-3 rounded-xl text-base font-medium transition-all"
                    style={{
                      color: activeSection === href.replace('#', '') ? '#00f5ff' : 'rgba(255,255,255,0.7)',
                      background: activeSection === href.replace('#', '') ? 'rgba(0,245,255,0.08)' : 'transparent',
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
