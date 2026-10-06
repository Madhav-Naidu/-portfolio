'use client';

import { motion } from 'framer-motion';
import { journey } from '../data/portfolio';
import type { JourneyItem } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';
import { clsx } from 'clsx';

type JourneyType = JourneyItem['type'];

const typeIcons: Record<JourneyType, React.ReactNode> = {
  education: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  certification: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  leadership: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const typeColors: Record<JourneyType, { border: string; bg: string; text: string }> = {
  education: { border: 'border-[#7c5cff]/30', bg: 'bg-[#7c5cff]/10', text: 'text-[#7c5cff]' },
  certification: { border: 'border-[#00e0c6]/30', bg: 'bg-[#00e0c6]/10', text: 'text-[#00e0c6]' },
  leadership: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

const typeLabels: Record<JourneyType, string> = {
  education: 'Education',
  certification: 'Certification',
  leadership: 'Leadership',
};

export function Journey() {
  return (
    <section id="journey" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Journey"
          subtitle="Education, certifications, and leadership experience"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7c5cff] to-[#00e0c6] -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-8">
            {journey.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className={clsx(
                  'relative flex items-start gap-6',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                <div className={clsx(
                  'flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center z-10',
                  'border-2',
                  typeColors[item.type].border,
                  typeColors[item.type].bg,
                  typeColors[item.type].text
                )}>
                  {typeIcons[item.type]}
                </div>

                <div className={clsx(
                  'flex-1 max-w-md',
                  index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8'
                )}>
                  <div className={clsx(
                    'bg-[#0f0f19]/70 backdrop-blur-md border rounded-2xl p-6',
                    typeColors[item.type].border
                  )}>
                    <div className="flex items-center gap-2 mb-3 justify-end">
                      <span
                        className={clsx(
                          'px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider',
                          typeColors[item.type].bg,
                          typeColors[item.type].text,
                          'border',
                          typeColors[item.type].border
                        )}
                      >
                        {typeLabels[item.type]}
                      </span>
                      <span className="text-gray-500 text-sm font-mono">{item.year}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 font-medium">{item.organization}</p>
                    {item.details && (
                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">{item.details}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}