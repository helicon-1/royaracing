import { useState, type ReactElement } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { AnimatedLink } from '@/components/ui/animated-link';
import { BudgetAllocator } from './BudgetAllocator';
import { DetailPanel } from './DetailPanel';
import { PILLARS, PILLAR_TINTS, type Pillar, type PillarId } from './data';

const PILLAR_ICONS: Record<PillarId, (props: { className?: string }) => ReactElement> = {
  economic: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5v9M14.5 9.7c0-1-1-1.7-2.5-1.7s-2.5.7-2.5 1.7c0 2.3 5 1 5 3.3 0 1-1 1.7-2.5 1.7s-2.5-.7-2.5-1.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  social: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8.5" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 18.5c.6-2.9 2.6-4.5 5-4.5s4.4 1.6 5 4.5M14 15c1.9 0 3.5 1.3 4 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  environmental: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 19c-1.5-6 2-13 12-14 1 8-4.5 13-12 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 18c2-3 4.5-6 9-10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

function PillarCard({
  pillar,
  isOpen,
  onToggle,
}: {
  pillar: Pillar;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const color = PILLAR_TINTS[pillar.id];
  const Icon = PILLAR_ICONS[pillar.id];

  return (
    <div
      className="flex h-full flex-col border-t-4 p-6 transition-colors duration-300 md:p-8"
      style={{ borderColor: color, backgroundColor: `${color}0d` }}
    >
      <div className="flex items-center gap-3" style={{ color }}>
        <Icon className="h-7 w-7 shrink-0" />
        <AnimatedLink className="text-xl font-bold md:text-2xl" style={{ color }}>
          {pillar.label}
        </AnimatedLink>
      </div>
      <p className="mt-4 text-paper/80">{pillar.definition}</p>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="label-mono mt-6 inline-flex items-center gap-2 text-[11px] transition-colors duration-300"
        style={{ color }}
      >
        {isOpen ? 'Close' : 'See what we did'}
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-[var(--ease-roya)] ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className="mt-6 border-t pt-6" style={{ borderColor: `${color}33` }}>
          <p className="text-paper/70">{pillar.practice}</p>
          <div className="mt-6">
            <DetailPanel id={pillar.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sustainability() {
  const [openId, setOpenId] = useState<PillarId | null>(null);

  return (
    <Section id="sustainability" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedLink className="label-mono mb-6 text-green">04 — Sustainability</AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink>
            <RevealText as="span" text="Three pillars, one program." />
          </AnimatedLink>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Three things have to hold at once for Roya to last beyond one season: the budget
          staying solvent, the people the program brings along, and the footprint it leaves
          behind. Click a pillar below to see exactly what Roya does about each.
        </p>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.id} delay={i * 100} className="h-full">
              <PillarCard
                pillar={pillar}
                isOpen={openId === pillar.id}
                onToggle={() => setOpenId(openId === pillar.id ? null : pillar.id)}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <AnimatedLink className="label-mono text-green">Your allocation</AnimatedLink>
          <h3 className="mt-3 max-w-2xl text-2xl font-bold text-paper">
            <AnimatedLink>
              If you ran Roya's sustainability budget, where would the points go?
            </AnimatedLink>
          </h3>
          <p className="mt-3 max-w-xl text-paper/60">
            You have 100 points to split across the three pillars above. Move the sliders to
            match how you'd prioritize them, then compare your split with Roya's own.
          </p>
          <BudgetAllocator />
        </div>
      </div>
    </Section>
  );
}
