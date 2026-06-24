import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';
import emailjs from '@emailjs/browser';

// ── EmailJS config ────────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail) → copy the Service ID below
// 3. Create a Template with these variables:
//      {{from_name}}  {{from_email}}  {{subject}}  {{message}}  {{to_email}}
//    Copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID  = 'service_7r7vs6p';   // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_jg4w2l9';  // e.g. 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY  = 'bJp6g0tr_VKlF91hc';   // e.g. 'abcXXXXXXXXXXXXXX'
const TO_EMAIL            = 'njorogekelvin2022@gmail.com';
// ─────────────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/Vokeh254',                          color: '#e2e8f0' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kelvin-njoroge-037719271', color: '#0a66c2' },
  { icon: TwitterIcon,  label: 'Twitter',  href: 'https://x.com/Kelvin-njoroge',                         color: '#e2e8f0' },
  { icon: YoutubeIcon,  label: 'YouTube',  href: 'https://www.youtube.com/@TruCoder_1ob',                color: '#ff0000' },
  { icon: Mail,         label: 'Email',    href: 'mailto:njorogekelvin2022@gmail.com',                   color: '#00f5ff' },
];

export default function Contact() {
  const headerRef = useRef(null);
  const formRef   = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: '-80px' });

  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState('');

  const handleChange = e => {
    setError('');
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      subject:    form.subject,
      message:    form.message,
      to_email:   TO_EMAIL,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try emailing me directly at njorogekelvin2022@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono mb-3" style={{ color: '#00f5ff' }}>
            {'// 06. CONTACT'}
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-5">
            Let's Build{' '}
            <span style={{ color: '#00f5ff' }}>Something</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Whether it's a new project, collaboration, or just a chat about tech — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact info cards */}
            {[
              { icon: Mail,    label: 'Email',    value: 'njorogekelvin2022@gmail.com', color: '#00f5ff' },
              { icon: MapPin,  label: 'Location', value: 'Nairobi, Kenya',         color: '#bf00ff' },
              { icon: MessageSquare, label: 'Response', value: 'Within 24 hours', color: '#39ff14' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 flex items-center gap-4"
                style={{ border: `1px solid ${color}20` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-mono">{label}</p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-5"
              style={{ border: '1px solid rgba(57,255,20,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: '#39ff14', boxShadow: '0 0 8px #39ff14' }}
                />
                <span className="text-sm font-semibold" style={{ color: '#39ff14' }}>Open to Opportunities</span>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                Currently open to full-time, contract, or freelance roles in Full-Stack or AI/ML engineering.
              </p>
            </motion.div>

            {/* Socials */}
            <div>
              <p className="text-xs font-mono text-white/30 mb-3">FIND ME ONLINE</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${color}50` }}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center transition-all duration-300"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8" style={{ border: '1px solid rgba(0,245,255,0.15)' }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="text-5xl">🚀</div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-white/50">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <motion.button
                    onClick={() => setSent(false)}
                    whileHover={{ scale: 1.05 }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      background: 'rgba(0,245,255,0.1)',
                      border: '1px solid rgba(0,245,255,0.3)',
                      color: '#00f5ff',
                    }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2">YOUR NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-cyan-400/50"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2">SUBJECT</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry / Collaboration"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2">MESSAGE</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-300 resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 px-1"
                    >
                      ⚠ {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px #00f5ff40' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: sending
                        ? 'rgba(0,245,255,0.08)'
                        : 'rgba(0,245,255,0.08)',
                      border: '1px solid rgba(0,245,255,0.4)',
                      color: '#00f5ff',
                    }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
