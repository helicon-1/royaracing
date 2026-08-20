import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Wheel } from './Wheel';
import { BudgetAllocator } from './BudgetAllocator';
import { DetailPanel } from './DetailPanel';
import { PILLARS, PILLAR_TINTS, type PillarId } from './data';

export function Sustainability() {
  const [active, setActive] = useState<PillarId>('economic');
  const [hovered, setHovered] = useState<PillarId | null>(null);

  const activePillar = PILLARS.find((p) => p.id === active)!;

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
          keep running, who it brings along, and what it leaves behind. Select a pillar to
          read more.
        </p>

        <div className="mt-20 grid gap-16 lg:grid-cols-[380px_1fr]">
          <div>
            <Wheel
              pillars={PILLARS}
              active={active}
              hovered={hovered}
              onSelect={setActive}
              onHover={setHovered}
            />
            <div className="mx-auto mt-8 flex max-w-[360px] justify-center gap-6">
              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p.id)}
                  onPointerEnter={() => setHovered(p.id)}
                  onPointerLeave={() => setHovered(null)}
                  className={`label-mono text-[11px] transition-colors duration-300 ${
                    active === p.id ? '' : 'text-paper/40 hover:text-paper/70'
                  }`}
                  style={active === p.id ? { color: PILLAR_TINTS[p.id].active } : undefined}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label-mono" style={{ color: PILLAR_TINTS[active].active }}>
              {activePillar.label}
            </p>
            <p className="mt-3 max-w-xl text-paper/70">{activePillar.practice}</p>
            <div className="mt-8">
              <DetailPanel id={active} />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-2xl">
          <p className="label-mono text-green">Your allocation</p>
          <h3 className="mt-3 text-2xl font-bold text-paper">
            If you ran Roya's sustainability budget, where would the points go?
          </h3>
          <BudgetAllocator />
        </div>
      </div>
    </Section>
  );
}
