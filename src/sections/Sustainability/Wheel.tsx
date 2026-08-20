import { useMemo } from 'react';
import { useEasedValue } from '@/hooks/useEasedValue';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { interpolateHsv } from '@/lib/theme';
import { PILLAR_TINTS, type Pillar, type PillarId } from './data';

const CENTER = 180;
const RADIUS_OUTER = 160;
const RADIUS_INNER = 96;

const ORDER: PillarId[] = ['economic', 'social', 'environmental'];
// Angle in degrees (0 = 12 o'clock, clockwise) at the midpoint of each
// pillar's 120° arc — matches the conic-gradient's own angle convention.
const MID_ANGLE: Record<PillarId, number> = { economic: 60, social: 180, environmental: 300 };

function sectorPath(startDeg: number, endDeg: number) {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const pt = (r: number, deg: number): [number, number] => [
    CENTER + r * Math.cos(toRad(deg)),
    CENTER + r * Math.sin(toRad(deg)),
  ];
  const [x1, y1] = pt(RADIUS_OUTER, startDeg);
  const [x2, y2] = pt(RADIUS_OUTER, endDeg);
  const [x3, y3] = pt(RADIUS_INNER, endDeg);
  const [x4, y4] = pt(RADIUS_INNER, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${RADIUS_INNER} ${RADIUS_INNER} 0 ${large} 0 ${x4} ${y4} Z`;
}

export function Wheel({
  pillars,
  active,
  hovered,
  onSelect,
  onHover,
}: {
  pillars: Pillar[];
  active: PillarId;
  hovered: PillarId | null;
  onSelect: (id: PillarId) => void;
  onHover: (id: PillarId | null) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  // One eased activation value per pillar (fixed count, called
  // unconditionally — not a loop) drives a smooth transition of the whole
  // arc's tone between its resting and active colors.
  const ecoActivation = useEasedValue(active === 'economic' || hovered === 'economic' ? 1 : 0, 0.12);
  const socActivation = useEasedValue(active === 'social' || hovered === 'social' ? 1 : 0, 0.12);
  const envActivation = useEasedValue(active === 'environmental' || hovered === 'environmental' ? 1 : 0, 0.12);

  const gradient = useMemo(() => {
    const eco = interpolateHsv(PILLAR_TINTS.economic.base, PILLAR_TINTS.economic.active, ecoActivation);
    const soc = interpolateHsv(PILLAR_TINTS.social.base, PILLAR_TINTS.social.active, socActivation);
    const env = interpolateHsv(PILLAR_TINTS.environmental.base, PILLAR_TINTS.environmental.active, envActivation);
    // Wide solid zones (90° each) with soft 30° blends between them, so the
    // ring reads as one continuous flowing gradient rather than three hard
    // wedges — the three colors are still clearly legible as three zones.
    return `conic-gradient(from 0deg, ${eco} 0deg, ${eco} 90deg, ${soc} 150deg, ${soc} 210deg, ${env} 270deg, ${env} 330deg, ${eco} 360deg)`;
  }, [ecoActivation, socActivation, envActivation]);

  const shown = pillars.find((p) => p.id === (hovered ?? active))!;
  const shownTint = PILLAR_TINTS[shown.id];
  const markerAngle = MID_ANGLE[hovered ?? active];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      {/* Soft blurred halo behind the ring for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-14%] rounded-full opacity-25 blur-3xl"
        style={{ background: gradient }}
      />

      {/* The ring: one continuous, smoothly-blended conic gradient masked
          into a donut — no SVG segment seams or gaps. A very slow ambient
          rotation keeps it feeling alive without being distracting. */}
      <div
        aria-hidden="true"
        className={
          reducedMotion
            ? 'pointer-events-none absolute inset-0 rounded-full'
            : 'pointer-events-none absolute inset-0 rounded-full [animation:wheel-spin_60s_linear_infinite]'
        }
        style={{
          background: gradient,
          WebkitMaskImage: 'radial-gradient(circle closest-side at center, transparent 0 58%, black 62% 100%)',
          maskImage: 'radial-gradient(circle closest-side at center, transparent 0 58%, black 62% 100%)',
        }}
      />

      {/* Glow marker: rides smoothly to whichever pillar is active/hovered */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          transform: `rotate(${markerAngle}deg)`,
          transition: 'transform 550ms var(--ease-roya)',
        }}
      >
        <div
          className="absolute left-1/2 top-[3%] h-[22%] w-[22%] -translate-x-1/2 rounded-full blur-lg transition-colors duration-300"
          style={{ background: shownTint.active, opacity: 0.85 }}
          aria-hidden="true"
        />
      </div>

      {/* Transparent hit-areas for click/hover/keyboard — all visuals come
          from the CSS layers above; this SVG exists purely for interaction
          and accessibility. */}
      <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
        {ORDER.map((id, i) => {
          const pillar = pillars.find((p) => p.id === id)!;
          const start = i * 120;
          const end = (i + 1) * 120;
          return (
            <path
              key={id}
              role="button"
              tabIndex={0}
              aria-pressed={active === id}
              aria-label={`${pillar.label} pillar`}
              d={sectorPath(start, end)}
              fill="transparent"
              className="cursor-pointer outline-none"
              onClick={() => onSelect(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(id);
                }
              }}
              onPointerEnter={() => onHover(id)}
              onPointerLeave={() => onHover(null)}
              onFocus={() => onHover(id)}
              onBlur={() => onHover(null)}
            />
          );
        })}
      </svg>

      {/* Text box is sized to the square inscribed inside the inner radius
          (96 * sqrt(2) ≈ 136px) so it can never spill past the ring,
          however long a pillar's definition runs. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex w-[128px] flex-col items-center text-center">
          <p className="label-mono text-[10px] transition-colors duration-300" style={{ color: shownTint.active }}>
            {shown.label}
          </p>
          <p
            className="mt-2 text-[11px] leading-snug text-paper/75"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {shown.definition}
          </p>
        </div>
      </div>
    </div>
  );
}
