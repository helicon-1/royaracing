import { useEffect, useRef, useState, type ElementType } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  splitBy?: 'word' | 'char';
  /** stagger step in seconds */
  stagger?: number;
}

/** Headlines reveal word-by-word (or char-by-char) as they scroll into view. */
export function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  splitBy = 'word',
  stagger = 0.045,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return (
      <Tag
        ref={ref as never}
        className={`${className} transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {text}
      </Tag>
    );
  }

  const units = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <Tag ref={ref as never} className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'top' }}
        >
          <span
            className="inline-block transition-[transform,opacity] ease-[var(--ease-roya)]"
            style={{
              transitionDuration: '700ms',
              transitionDelay: `${i * stagger}s`,
              transform: visible ? 'translateY(0%)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
            }}
          >
            {unit}
            {splitBy === 'word' && i < units.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
