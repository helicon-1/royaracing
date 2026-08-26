import { useEffect, useRef, useState, type ReactNode } from 'react';
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

// Per-stage lead color — Regionals and World Finals lime, Nationals cyan.
const STAGE_IS_CYAN = [false, true, false];

/** Eases a 0–1 "how cyan" value toward its target over `durationMs`. Every
 *  color-bearing element below crossfades two real lime/cyan layers by this
 *  same value rather than computing one interpolated color — a hue-rotation
 *  path between lime and cyan necessarily sweeps through green (it sits
 *  right between them on the wheel); overlapping two flat-colored layers
 *  and fading their opacity never renders any color other than the two
 *  exact ones. */
function useCrossfade(target: boolean, durationMs = 700) {
  const targetValue = target ? 1 : 0;
  const [value, setValue] = useState(targetValue);
  const valueRef = useRef(targetValue);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from = valueRef.current;
    const to = targetValue;
    if (from === to) return;
    const start = performance.now();

    function frame(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const next = from + (to - from) * t;
      valueRef.current = next;
      setValue(next);
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetValue, durationMs]);

  return value;
}

/** Hard-edged left-to-right wipe between a lime layer and a cyan layer laid
 *  exactly on top of it — clip-path, not opacity. Two overlapping
 *  semi-transparent layers still composite into a blended pixel color
 *  wherever they overlap (that's what made the old HSV hue-rotation look
 *  green, and would do the same here); clipping the top layer's visible
 *  region instead means every rendered pixel is either 100% lime or 100%
 *  cyan, never a mix of the two. */
function wipeClip(cyanT: number) {
  return `inset(0 ${(1 - cyanT) * 100}% 0 0)`;
}

function CrossfadeText({ cyanT, className, children }: { cyanT: number; className?: string; children: ReactNode }) {
  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      <span className="text-lime">{children}</span>
      <span className="absolute inset-0 text-cyan" style={{ clipPath: wipeClip(cyanT) }} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function CompetitionTimeline() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const cyanT = useCrossfade(STAGE_IS_CYAN[active]);
  const accentColor = STAGE_IS_CYAN[active] ? 'var(--color-cyan)' : 'var(--color-lime)';

  return (
    <Section id="timeline" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <AnimatedLink color="lime" className="label-mono mb-6 text-lime">
          03: Competition Timeline
        </AnimatedLink>
        <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl">
          <AnimatedLink color="lime">
            <RevealText as="span" text="Three stages to the World Finals." />
          </AnimatedLink>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Regionals, then Nationals, then the World Finals, where Roya is headed next.
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
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 transition-[left] duration-700 ease-[var(--ease-roya)]"
            style={{
              left: `calc(${(active / (STAGES.length - 1)) * 100}% - ${(active / (STAGES.length - 1)) * 34}px)`,
            }}
          >
            {/* The .car-marker class's own clip-path draws the car
                silhouette; that has to live on the outer (lime) layer so
                the cyan layer nested inside inherits the same silhouette
                via CSS clipping cascading to descendants — putting the
                wipe's clip-path directly on a second `.car-marker` div
                instead overwrote the silhouette clip-path entirely,
                leaving a plain rectangle visible mid-transition. */}
            <div className="car-marker relative" style={{ backgroundColor: 'var(--color-lime)' }}>
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'var(--color-cyan)', clipPath: wipeClip(cyanT) }}
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                className={`label-mono text-[11px] transition-colors duration-300 ${
                  i === active ? '' : 'text-paper/40 hover:text-paper/70'
                }`}
              >
                {i === active ? <CrossfadeText cyanT={cyanT}>{s.label}</CrossfadeText> : s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Single F1-telemetry-style display panel — fixed size regardless
            of which stage is selected, so it can never look inconsistent.
            No `key` here: keying this to the stage used to force a full
            remount on every switch, which retriggered Reveal's own
            opacity/translateY mount animation each time — colliding with
            the color crossfade and making the whole card visibly shift.
            Reveal now only plays once, on first scroll-into-view; stage
            content afterward just updates in place. */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="grid min-h-[420px] overflow-hidden bg-ink/60 md:grid-cols-[1.1fr_1fr]">
            <div className="relative flex flex-col justify-center p-8 md:p-12">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-2"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 45% 100%, 0 100%)' }}
              >
                <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-lime)' }} />
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: 'var(--color-cyan)', clipPath: wipeClip(cyanT) }}
                />
              </div>
              <div className="pl-6">
                <div className="flex items-center justify-between gap-4">
                  <CrossfadeText cyanT={cyanT} className="label-mono">
                    Stage {String(active + 1).padStart(2, '0')} / 03
                  </CrossfadeText>
                  {stage.status === 'upcoming' ? (
                    <span className="label-mono shrink-0 whitespace-nowrap rounded-full border border-paper/25 px-3 py-1 text-[10px] text-paper/50">
                      Upcoming
                    </span>
                  ) : (
                    <span className="relative inline-block shrink-0">
                      <span className="label-mono whitespace-nowrap rounded-full border border-lime/50 px-3 py-1 text-[10px] text-lime">
                        Complete
                      </span>
                      <span
                        aria-hidden="true"
                        className="label-mono absolute inset-0 whitespace-nowrap rounded-full border border-cyan/50 px-3 py-1 text-[10px] text-cyan"
                        style={{ clipPath: wipeClip(cyanT) }}
                      >
                        Complete
                      </span>
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-paper md:text-5xl">
                  <AnimatedLink accentColor={accentColor}>{stage.label}</AnimatedLink>
                </h3>
                <AnimatedLink accentColor={accentColor} className="label-mono mt-3">
                  <CrossfadeText cyanT={cyanT}>{stage.month}</CrossfadeText>
                </AnimatedLink>
                <p className="mt-6 max-w-sm text-paper/70">{stage.blurb}</p>
              </div>
            </div>
            <PhotoPlaceholder label={`Photo pending, ${stage.label}`} className="h-full min-h-64 w-full" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
