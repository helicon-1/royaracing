import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
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
    return createElement(
      Tag,
      {
        ref,
        className: `${className} transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`,
      },
      text,
    );
  }

  const units = splitBy === 'word' ? text.split(' ') : text.split('');

  // The trailing space of a word is rendered as a separate sibling text
  // node, outside the overflow-hidden/transform wrapper — a space living
  // inside an inline-block's own text content gets collapsed as trailing
  // whitespace by the browser, which silently ate word gaps.
  const nodes: ReactNode[] = [];
  units.forEach((unit, i) => {
    nodes.push(
      <span
        key={`w${i}`}
        className="inline-block overflow-hidden"
        style={{ verticalAlign: 'top', lineHeight: 1.25 }}
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
        </span>
      </span>,
    );
    if (splitBy === 'word' && i < units.length - 1) nodes.push(' ');
  });

  return createElement(Tag, { ref, className }, nodes);
}
