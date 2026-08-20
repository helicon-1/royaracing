import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger delay in ms — for grids/lists revealing item by item */
  delay?: number;
}

/**
 * Fades and lifts content into place as it scrolls into view. Headlines get
 * this via RevealText's word-by-word reveal; everything else (photos,
 * cards, panels) was popping in instantly with no motion at all, which read
 * as static next to the animated headlines. One shared, restrained motion
 * idea reused everywhere rather than a different effect per section.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '700ms',
        transitionTimingFunction: 'var(--ease-roya)',
        transitionDelay: `${delay}ms`,
        opacity: reducedMotion || visible ? 1 : 0,
        transform: reducedMotion || visible ? 'none' : 'translateY(28px)',
      }}
    >
      {children}
    </Component>
  );
}
