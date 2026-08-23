import { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { AnimatedLink } from '@/components/ui/animated-link';
import { COLORS, hexToHsv, hsvToRgbString, interpolateHsv } from '@/lib/theme';

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

// Per-stage lead color — Regionals and World Finals lime, Nationals cyan.
const STAGE_ACCENTS = [COLORS.lime, COLORS.cyan, COLORS.lime];

/** Live HSV-interpolated color that eases toward `targetHex` whenever it
 *  changes, rather than snapping — same shortest-arc-hue approach used by
 *  the generative background, so the fade never sweeps through grey. */
function useSmoothColor(targetHex: string, durationMs = 700) {
  const initial = hsvToRgbString(...hexToHsv(targetHex));
  const [color, setColor] = useState(initial);
  const colorRef = useRef(initial);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from = colorRef.current;
    const to = targetHex;
    const start = performance.now();

    function frame(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const next = interpolateHsv(from, to, t);
      colorRef.current = next;
      setColor(next);
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetHex, durationMs]);

  return color;
}

function withAlpha(rgb: string, alpha: number) {
  const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return rgb;
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
}

export function CompetitionTimeline() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const stageColor = useSmoothColor(STAGE_ACCENTS[active]);

  return (
    <Section id="timeline" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedLink color="lime" className="label-mono mb-6 text-lime">
          03 — Competition Timeline
        </AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink color="lime">
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
            style={{
              left: `calc(${(active / (STAGES.length - 1)) * 100}% - ${(active / (STAGES.length - 1)) * 34}px)`,
              backgroundColor: stageColor,
            }}
          />
          <div className="mt-3 flex justify-between">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                style={i === active ? { color: stageColor } : undefined}
                className={`label-mono text-[11px] transition-colors duration-300 ${
                  i === active ? '' : 'text-paper/40 hover:text-paper/70'
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
                className="absolute left-0 top-0 h-full w-2"
                style={{ backgroundColor: stageColor, clipPath: 'polygon(0 0, 100% 0, 100% 82%, 45% 100%, 0 100%)' }}
              />
              <div className="pl-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono" style={{ color: stageColor }}>
                    Stage {String(active + 1).padStart(2, '0')} / 03
                  </span>
                  <span
                    className={`label-mono shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] ${
                      stage.status === 'upcoming' ? 'border-paper/25 text-paper/50' : ''
                    }`}
                    style={
                      stage.status === 'upcoming'
                        ? undefined
                        : { borderColor: withAlpha(stageColor, 0.5), color: stageColor }
                    }
                  >
                    {stage.status === 'upcoming' ? 'Upcoming' : 'Complete'}
                  </span>
                </div>
                <h3 className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-paper md:text-5xl">
                  <AnimatedLink accentColor={stageColor}>{stage.label}</AnimatedLink>
                </h3>
                <AnimatedLink accentColor={stageColor} className="label-mono mt-3" style={{ color: stageColor }}>
                  {stage.month}
                </AnimatedLink>
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
