'use client';

import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';
import { TiltCard } from './TiltCard';
import { SectionHeading } from './SectionHeading';
import { clsx } from 'clsx';

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with to build robust applications"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((category, categoryIndex) => (
            <TiltCard
              key={category.name}
              className="h-full"
              style={{ transitionDelay: `${categoryIndex * 50}ms` }}
            >
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#00e0c6]" aria-hidden="true" />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                    className={clsx(
                      'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
                      'bg-[#0f0f19]/70 backdrop-blur-md border border-[#7c5cff]/20 text-gray-300',
                      'hover:border-[#7c5cff]/50 hover:text-[#00e0c6] hover:bg-[#7c5cff]/10'
                    )}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}