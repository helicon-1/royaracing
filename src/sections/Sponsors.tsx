import { useEffect, useState, type ReactElement } from 'react';
import { Reveal } from '@/components/Reveal';
import { AnimatedLink } from '@/components/ui/animated-link';

interface Sponsor {
  name: string;
  category: string;
  blurb: string;
  mark: (props: { className?: string }) => ReactElement;
}

// Placeholder sponsors — fictional names, not real companies or endorsements.
// Roya never appears in its own sponsor strip. All logos render at the same
// size — no tier hierarchy signaled visually.
const SPONSORS: Sponsor[] = [
  {
    name: 'Falcon Steel Works',
    category: 'Materials Partner',
    blurb:
      'Supplies steel stock and fabrication support used across the build. Full partnership details will be added once confirmed.',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 19V5l8 6 8-6v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Nomad Coffee Co.',
    category: 'Hospitality Partner',
    blurb:
      'Keeps the workshop running through late build nights. Full partnership details will be added once confirmed.',
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
    category: 'Logistics Partner',
    blurb:
      'Handles freight and shipping for parts and travel to competition. Full partnership details will be added once confirmed.',
    mark: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 16l9 5 9-5M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Circuit & Co.',
    category: 'Electronics Partner',
    blurb:
      "Supports the team's electronics and telemetry work. Full partnership details will be added once confirmed.",
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
    category: 'Print & Signage Partner',
    blurb:
      'Produces team signage, banners and printed materials. Full partnership details will be added once confirmed.',
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
  const [active, setActive] = useState<Sponsor | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-paper md:text-7xl">
            <AnimatedLink color="lime" className="justify-center">
              Backed by
            </AnimatedLink>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-paper/60">
            Their support is what turns a first-season plan into a real shot at the podium.
          </p>
        </div>
        {/* Single row, never wraps — on viewports too narrow to fit all
            five marks, it scrolls horizontally instead. */}
        <div className="flex items-center justify-start gap-x-14 overflow-x-auto px-1 py-1 md:justify-center md:gap-x-20">
          {SPONSORS.map((sponsor, i) => {
            const { name, mark: Mark } = sponsor;
            return (
              <Reveal key={name} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => setActive(sponsor)}
                  className="group flex shrink-0 items-center gap-4 text-paper/65 transition-colors duration-300 hover:text-lime"
                >
                  <Mark className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
                  <AnimatedLink color="lime" className="label-mono whitespace-nowrap text-base md:text-lg">
                    {name}
                  </AnimatedLink>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} sponsor information`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 px-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-2xl bg-navy p-8 md:p-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <AnimatedLink color="lime" className="block text-2xl font-bold text-lime">
                  {active.name}
                </AnimatedLink>
                <AnimatedLink color="lime" className="label-mono mt-2 block text-[11px] text-lime">
                  {active.category}
                </AnimatedLink>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="label-mono text-paper/50 transition-colors hover:text-paper"
              >
                CLOSE
              </button>
            </div>
            <p className="editorial mt-6 text-paper/60">{active.blurb}</p>
          </div>
        </div>
      )}
    </div>
  );
}
