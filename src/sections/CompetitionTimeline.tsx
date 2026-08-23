import { useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { AnimatedLink } from '@/components/ui/animated-link';

interface Stage {
  label: string;
  month: string;
  status: 'complete' | 'upcoming';
  blurb: string;
}

const STAGES: Stage[] = [
  {
    label: 'Regionals',
    month: 'April',
    status: 'complete',
    blurb: 'Riyadh regional qualifier. Recap and results to be added.',
  },
  {
    label: 'Nationals',
    month: 'June',
    status: 'complete',
    blurb: 'National qualifier. Recap and results to be added.',
  },
  {
    label: 'World Finals',
    month: 'October',
    status: 'upcoming',
    blurb: 'Not yet reached. This is the stage Roya Racing is building toward.',
  },
];

export function CompetitionTimeline() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <Section id="timeline" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedLink color="white" className="label-mono mb-6 text-white">
          03 — Competition Timeline
        </AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink color="white">
            <RevealText as="span" text="Three stages to the World Finals." />
          </AnimatedLink>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Regionals, then Nationals, then the World Finals — where Roya is headed next.
        </p>

        {/* Stage selector — native range input, so click, drag and arrow
            keys all move the selection (the old custom slider only
            responded to drag) — stretched the full width of the section.
            The native thumb is invisible; a separately animated car marker
            drives smoothly to the new position instead of teleporting,
            however the change was triggered. */}
        <div className="relative mt-16 w-full">
          <input
            type="range"
            min={0}
            max={STAGES.length - 1}
            step={1}
            value={active}
            onChange={(e) => setActive(Number(e.target.value))}
            aria-label="Select competition stage"
            className="range-car relative z-10 w-full"
          />
          <div
            aria-hidden="true"
            className="car-marker pointer-events-none absolute top-1/2 -translate-y-1/2 transition-[left] duration-700 ease-[var(--ease-roya)]"
            style={{ left: `calc(${(active / (STAGES.length - 1)) * 100}% - ${(active / (STAGES.length - 1)) * 34}px)` }}
          />
          <div className="mt-3 flex justify-between">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                className={`label-mono text-[11px] transition-colors duration-300 ${
                  i === active ? 'text-cyan' : 'text-paper/40 hover:text-paper/70'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Single F1-telemetry-style display panel — fixed size regardless
            of which stage is selected, so it can never look inconsistent. */}
        <Reveal key={stage.label} className="mx-auto mt-12 max-w-4xl">
          <div className="grid min-h-[420px] overflow-hidden bg-ink/60 md:grid-cols-[1.1fr_1fr]">
            <div className="relative flex flex-col justify-center p-8 md:p-12">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-2 bg-cyan"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 45% 100%, 0 100%)' }}
              />
              <div className="pl-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono text-cyan">Stage {String(active + 1).padStart(2, '0')} / 03</span>
                  <span
                    className={`label-mono shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] ${
                      stage.status === 'upcoming'
                        ? 'border-paper/25 text-paper/50'
                        : 'border-cyan/50 text-cyan'
                    }`}
                  >
                    {stage.status === 'upcoming' ? 'Upcoming' : 'Complete'}
                  </span>
                </div>
                <h3 className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-paper md:text-5xl">
                  <AnimatedLink>{stage.label}</AnimatedLink>
                </h3>
                <AnimatedLink className="label-mono mt-3 text-cyan">{stage.month}</AnimatedLink>
                <p className="mt-6 max-w-sm text-paper/70">{stage.blurb}</p>
              </div>
            </div>
            <PhotoPlaceholder label={`Photo pending — ${stage.label}`} className="h-full min-h-64 w-full" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
