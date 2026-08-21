import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { BudgetAllocator } from './BudgetAllocator';
import { DetailPanel } from './DetailPanel';
import { PILLARS, PILLAR_TINTS, type Pillar, type PillarId } from './data';

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

  return (
    <div
      className="flex h-full flex-col border-t-4 p-6 transition-colors duration-300 md:p-8"
      style={{ borderColor: color, backgroundColor: `${color}0d` }}
    >
      <p className="label-mono text-[11px]" style={{ color }}>
        {pillar.label}
      </p>
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
        <p className="label-mono mb-6 text-green">04 — Sustainability</p>
        <RevealText
          as="h2"
          text="Three pillars, one program."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Sustainability here means more than the environment — it's whether the program can
          keep running, who it brings along, and what it leaves behind. Click a section below
          to see what Roya does about it.
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
          <p className="label-mono text-green">Your allocation</p>
          <h3 className="mt-3 max-w-2xl text-2xl font-bold text-paper">
            If you ran Roya's sustainability budget, where would the points go?
          </h3>
          <BudgetAllocator />
        </div>
      </div>
    </Section>
  );
}
