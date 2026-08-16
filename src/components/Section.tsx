import { useEffect, useRef, type ReactNode } from 'react';
import type { SectionId } from '@/lib/theme';
import { useAppStore } from '@/store/useAppStore';

interface SectionProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
}

/** Registers itself as the active section (for nav + background accent) whenever it crosses viewport center. */
export function Section({ id, className = '', children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, setActiveSection]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}
