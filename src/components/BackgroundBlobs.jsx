import { motion } from 'framer-motion';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Blob 1 — cyan top-left */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #00f5ff, transparent 70%)' }}
      />

      {/* Blob 2 — purple top-right */}
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #bf00ff, transparent 70%)' }}
      />

      {/* Blob 3 — green mid-left */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut' }}
        className="absolute top-1/2 -left-60 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #39ff14, transparent 70%)' }}
      />

      {/* Blob 4 — cyan bottom-right */}
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        className="absolute bottom-0 -right-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #00f5ff, transparent 70%)' }}
      />

      {/* Blob 5 — purple bottom-left */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        className="absolute -bottom-40 -left-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #bf00ff, transparent 70%)' }}
      />
    </div>
  );
}
