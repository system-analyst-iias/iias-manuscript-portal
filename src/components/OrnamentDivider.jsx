import { motion } from 'framer-motion';

export default function OrnamentDivider({ className = '' }) {
  return (
    <motion.div
      className={`ornament-divider ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="line" />
      <div className="diamond" />
      <div className="diamond" style={{ width: '6px', height: '6px' }} />
      <div className="diamond" />
      <div className="line" />
    </motion.div>
  );
}
