'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { about, stats, interests } from '../data/portfolio';
import { TiltCard } from './TiltCard';
import { SectionHeading } from './SectionHeading';
import { clsx } from 'clsx';

function CountUp({ value, suffix = '', className = '' }: { value: number; suffix?: string | undefined; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(value * eased));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(value);
              }
            };
            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={clsx('font-heading text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] bg-clip-text text-transparent', className)}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About"
          subtitle="Full-stack developer who ships complete applications end-to-end"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          <TiltCard className="h-full">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {about}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center"
                >
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 text-sm mt-1 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </TiltCard>

          <TiltCard className="h-full">
            <h3 className="font-heading text-2xl font-bold text-white mb-6">Interests</h3>
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#7c5cff]/5 border border-[#7c5cff]/10 hover:border-[#7c5cff]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#00e0c6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-gray-200 text-lg font-medium">{interest.label}</span>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}