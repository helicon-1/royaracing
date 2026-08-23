import type { ReactElement } from 'react';
import { Reveal } from '@/components/Reveal';
import { AnimatedLink } from '@/components/ui/animated-link';

interface Sponsor {
  name: string;
  mark: (props: { className?: string }) => ReactElement;
}

// Placeholder sponsors — fictional names, not real companies or endorsements.
// Roya never appears in its own sponsor strip. All logos render at the same
// size — no tier hierarchy signaled visually.
const SPONSORS: Sponsor[] = [
  {
    name: 'Falcon Steel Works',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 19V5l8 6 8-6v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Nomad Coffee Co.',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M16 10.5h1.5a2.2 2.2 0 0 1 0 4.4H16" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 6.2c0-.9.9-1 .9-1.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Waypoint Logistics',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 16l9 5 9-5M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Circuit & Co.',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 7h5v4H4V7Zm11 6h5v4h-5v-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 9h4a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Riyadh Print House',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6 9V4h12v5M6 17h12v3H6v-3ZM4 9h16v6h-4v-2H8v2H4V9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Sponsors() {
  return (
    <div className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center">
          <AnimatedLink color="lime" className="label-mono text-[10px] text-paper/35">
            Backed by
          </AnimatedLink>
        </div>
        {/* Single row, never wraps — on viewports too narrow to fit all
            five marks, it scrolls horizontally instead. */}
        <div className="flex items-center justify-start gap-x-14 overflow-x-auto px-1 py-1 md:justify-center md:gap-x-20">
          {SPONSORS.map(({ name, mark: Mark }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div className="group flex shrink-0 items-center gap-4 text-paper/65 transition-colors duration-300 hover:text-lime">
                <Mark className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
                <AnimatedLink color="lime" className="label-mono whitespace-nowrap text-base md:text-lg">
                  {name}
                </AnimatedLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
