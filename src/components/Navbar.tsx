'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { clsx } from 'clsx';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#07070f]/80 backdrop-blur-md border-b border-[#7c5cff]/20'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-white font-heading"
            aria-label="KMN - Home"
          >
            KMN.
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#00e0c6] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:origin-bottom-right after:scale-x-0 after:bg-gradient-to-r after:from-[#7c5cff] after:to-[#00e0c6] hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden overflow-hidden bg-[#07070f]/95 backdrop-blur-md border-t border-[#7c5cff]/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="py-4 space-y-2 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-base font-medium text-gray-300 hover:text-[#00e0c6] transition-colors duration-200 border-b border-[#7c5cff]/10 last:border-0"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7c5cff] to-[#00e0c6]"
        style={{ scaleX: scrollProgress, transformOrigin: '0% 50%' }}
        aria-hidden="true"
      />
    </motion.nav>
  );
}