'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { clsx } from 'clsx';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  scale?: number;
  disableOnMobile?: boolean;
}

export function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 12,
  scale = 1.02,
  disableOnMobile = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion || (disableOnMobile && isMobile)) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt * -1;
      setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = (): void => {
      setTilt({ x: 0, y: 0 });
    };

    const handleMouseEnter = (): void => {
      setIsHovered(true);
    };

    const handleMouseLeaveCard = (): void => {
      setIsHovered(false);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeaveCard);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeaveCard);
    };
  }, [maxTilt, prefersReducedMotion, disableOnMobile, isMobile]);

  const transform = prefersReducedMotion || (disableOnMobile && isMobile)
    ? 'none'
    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? scale : 1})`;

  return (
    <div
      ref={cardRef}
      className={clsx(
        'relative bg-[#0f0f19]/70 backdrop-blur-md border border-[#7c5cff]/20 rounded-2xl p-6 md:p-8 transition-all duration-300 ease-out',
        'hover:border-[#7c5cff]/50 hover:shadow-[0_0_40px_rgba(124,92,255,0.15)]',
        className
      )}
      style={{ transform, transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c5cff]/10 to-[#00e0c6]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}