import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';

const LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Design',         href: '#design' },
  { label: 'Contact',        href: '#contact' },
];

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/Vokeh254',                          label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/kelvin-njoroge-037719271', label: 'LinkedIn' },
  { icon: TwitterIcon,  href: 'https://x.com/ke48247',                         label: 'Twitter' },
  { icon: YoutubeIcon,  href: 'https://www.youtube.com/@TruCoder_1ob',                     label: 'YouTube' },
  { icon: Mail,         href: 'mailto:njorogekelvin2022@gmail.com',                   label: 'Email' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                style={{
                  background: 'rgba(0,245,255,0.1)',
                  border: '1px solid rgba(0,245,255,0.3)',
                  color: '#00f5ff',
                }}
              >
                KN
              </div>
              <span className="font-bold text-white">
                Kelvin<span style={{ color: '#00f5ff' }}>.</span>dev
              </span>
            </div>
            <p className="text-xs text-white/30 text-center md:text-left">
              Full-Stack Engineer · AI Project Lead · Nairobi, Kenya
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#00f5ff' }}
                className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                aria-label={label}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {new Date().getFullYear()} Kelvin Njoroge. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={11} fill="#bf00ff" style={{ color: '#bf00ff' }} /> using React, Tailwind &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
