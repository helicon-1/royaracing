import { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/Section';
import { RevealText } from '@/components/RevealText';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';

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

const STOPS = [0, 50, 100];

function nearestStageIndex(pct: number) {
  let closest = 0;
  let closestDist = Infinity;
  STOPS.forEach((s, i) => {
    const d = Math.abs(s - pct);
    if (d < closestDist) {
      closestDist = d;
      closest = i;
    }
  });
  return closest;
}

export function CompetitionTimeline() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragPct, setDragPct] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stops = STOPS;
  const handlePct = dragging && dragPct !== null ? dragPct : stops[active];

  function pctFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: PointerEvent) {
      setDragPct(pctFromClientX(e.clientX));
    }
    function onUp(e: PointerEvent) {
      const pct = pctFromClientX(e.clientX);
      setActive(nearestStageIndex(pct));
      setDragging(false);
      setDragPct(null);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.min(STAGES.length - 1, a + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(STAGES.length - 1);
    }
  }

  const stage = STAGES[active];

  return (
    <Section id="timeline" className="relative px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label-mono mb-6 text-cyan">03 — Competition Timeline</p>
        <RevealText
          as="h2"
          text="Three stages to the World Finals."
          className="max-w-2xl text-4xl font-bold leading-[1.05] text-paper md:text-6xl"
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
          Drag the car along the track — or use the arrow keys — to move between stages.
        </p>

        <div className="mt-24 px-2">
          <div ref={trackRef} className="relative h-px w-full bg-paper/15">
            {stops.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setActive(i)}
                className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
                style={{ left: `${s}%` }}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                    i <= active ? 'bg-cyan' : 'bg-paper/25'
                  }`}
                />
                <span
                  className={`label-mono absolute top-6 whitespace-nowrap text-[11px] transition-colors duration-300 ${
                    i === active ? 'text-cyan' : 'text-paper/40'
                  }`}
                >
                  {STAGES[i].label} — {STAGES[i].month}
                </span>
              </button>
            ))}

            <div
              role="slider"
              tabIndex={0}
              aria-label="Competition stage"
              aria-valuemin={0}
              aria-valuemax={STAGES.length - 1}
              aria-valuenow={active}
              aria-valuetext={`${stage.label}, ${stage.month}`}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                e.preventDefault();
                (e.target as HTMLElement).focus();
                setDragging(true);
                setDragPct(pctFromClientX(e.clientX));
              }}
              className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-cyan text-navy shadow-[0_0_0_4px_rgba(38,183,189,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-paper active:cursor-grabbing"
              style={{
                left: `${handlePct}%`,
                transition: dragging ? 'none' : 'left 400ms var(--ease-roya)',
              }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M3 14.5 5 9h14l2 5.5v3a1 1 0 0 1-1 1h-1.2a1.8 1.8 0 0 1-3.6 0H8.8a1.8 1.8 0 0 1-3.6 0H4a1 1 0 0 1-1-1zM6.5 10.5 5.3 13h13.4l-1.2-2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="label-mono text-cyan">
              {stage.month} — {stage.status === 'upcoming' ? 'Upcoming' : 'Complete'}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-paper">{stage.label}</h3>
            <p className="mt-4 max-w-md text-paper/70">{stage.blurb}</p>
          </div>
          <PhotoPlaceholder
            label={`Photo pending — ${stage.label}`}
            className="aspect-video w-full"
          />
        </div>
      </div>
    </Section>
  );
}
