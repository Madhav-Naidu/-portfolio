'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={clsx('text-center max-w-3xl mx-auto mb-16 md:mb-20', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#00e0c6] text-sm font-medium tracking-wider uppercase">
          {title}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="inline-block">
            {word}{i < title.split(' ').length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}