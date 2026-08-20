import type { ReactElement } from 'react';

interface Sponsor {
  name: string;
  tier: 'vision' | 'platinum' | 'gold' | 'silver' | 'bronze';
  mark: (props: { className?: string }) => ReactElement;
}

// Placeholder sponsors — fictional names, not real companies or endorsements.
// Roya never appears in its own sponsor strip.
const SPONSORS: Sponsor[] = [
  {
    name: 'Falcon Steel Works',
    tier: 'vision',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 19V5l8 6 8-6v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Nomad Coffee Co.',
    tier: 'platinum',
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
    tier: 'gold',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 16l9 5 9-5M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Circuit & Co.',
    tier: 'silver',
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
    tier: 'bronze',
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

// Vision reads larger than Platinum, down to Bronze — the only signal of
// the 5-tier structure. No labels, no grouping, no borders.
const TIER_SCALE: Record<Sponsor['tier'], number> = {
  vision: 1.5,
  platinum: 1.32,
  gold: 1.18,
  silver: 1.06,
  bronze: 0.94,
};

export function Sponsors() {
  return (
    <div className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-12 text-center text-[10px] text-paper/35">Backed by</p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {SPONSORS.map(({ name, tier, mark: Mark }) => {
            const scale = TIER_SCALE[tier];
            return (
              <div
                key={name}
                className="group flex items-center gap-3 text-paper/65 transition-colors duration-300 hover:text-paper"
                style={{ fontSize: `${scale}rem` }}
              >
                <Mark className="h-[1.7em] w-[1.7em] shrink-0" />
                <span className="label-mono whitespace-nowrap text-[0.78em]">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
