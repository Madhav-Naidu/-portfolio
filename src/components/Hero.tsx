'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { hero } from '../data/portfolio';
import { clsx } from 'clsx';

export function Hero() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const profile = profileRef.current;
    if (!profile || prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = profile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8 * -1;
      setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = (): void => {
      setTilt({ x: 0, y: 0 });
    };

    profile.addEventListener('mousemove', handleMouseMove);
    profile.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      profile.removeEventListener('mousemove', handleMouseMove);
      profile.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, isMobile]);

  const transform = prefersReducedMotion || isMobile
    ? 'none'
    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/30 text-[#00e0c6] text-sm font-medium tracking-wider uppercase mb-6"
            >
              Java Full Stack Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {hero.name.split(' ').map((word, i) => (
                <span key={i} className="inline-block">
                  {word}{i < hero.name.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              className="text-xl md:text-2xl text-[#7c5cff] font-medium mb-8"
            >
              {hero.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center sm:items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7c5cff] to-[#00e0c6] text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(124,92,255,0.4)] transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#00e0c6] to-[#7c5cff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-xl border border-[#7c5cff]/30 text-white font-semibold text-base hover:border-[#7c5cff]/60 hover:bg-[#7c5cff]/10 transition-all duration-300"
              >
                Contact Me
              </a>
              <a
                href={hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl border border-gray-700 text-gray-300 font-semibold text-base hover:border-gray-500 hover:text-white hover:bg-gray-900/50 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div
              ref={profileRef}
              className={clsx(
                'relative w-64 h-64 md:w-80 md:h-80 mx-auto',
                'rounded-2xl overflow-hidden',
                'bg-gradient-to-br from-[#7c5cff] via-[#7c5cff]/50 to-[#00e0c6] p-[3px]',
                'shadow-[0_0_60px_rgba(124,92,255,0.3)]'
              )}
              style={{ transform, transformStyle: 'preserve-3d', willChange: 'transform' }}
              aria-label="Profile photo of Kenguva Madhav Naidu"
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0f0f19]">
                <img
                  src="/profile.jpg"
                  alt="Kenguva Madhav Naidu - Java Full Stack Developer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070f]/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#0f0f19]/70 backdrop-blur-md border border-[#7c5cff]/30 flex items-center justify-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#00e0c6] flex items-center justify-center">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
              className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#0f0f19]/70 backdrop-blur-md border border-[#00e0c6]/30 flex items-center justify-center"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#00e0c6] to-[#7c5cff] flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}