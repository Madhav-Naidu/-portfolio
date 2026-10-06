import { useEffect, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}