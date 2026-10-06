import { useEffect, useState } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}