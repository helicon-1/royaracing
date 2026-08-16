import { useEasedValue } from '@/hooks/useEasedValue';
import { interpolateHsv } from '@/lib/theme';
import type { Pillar, PillarId } from './data';

const RADIUS_OUTER = 160;
const RADIUS_INNER = 96;
const CENTER = 180;
const GAP_DEG = 3;

function ringPath(startDeg: number, endDeg: number, rOuter: number, rInner: number) {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const pt = (r: number, deg: number): [number, number] => [
    CENTER + r * Math.cos(toRad(deg)),
    CENTER + r * Math.sin(toRad(deg)),
  ];
  const [x1, y1] = pt(rOuter, startDeg);
  const [x2, y2] = pt(rOuter, endDeg);
  const [x3, y3] = pt(rInner, endDeg);
  const [x4, y4] = pt(rInner, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
}

const BASE_TINT = '#3f6f2e'; // muted, low-key green
const ACTIVE_TINT = '#8fd459'; // bright highlighted green — both within the green family (HSV-interpolated between the two, never crossing into another section's accent)

function WheelSegment({
  pillar,
  index,
  isActive,
  isHovered,
  onSelect,
  onHover,
}: {
  pillar: Pillar;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const activation = useEasedValue(isActive || isHovered ? 1 : 0, 0.1);
  const fill = interpolateHsv(BASE_TINT, ACTIVE_TINT, activation);
  const start = index * 120 + GAP_DEG / 2;
  const end = (index + 1) * 120 - GAP_DEG / 2;
  const midDeg = (start + end) / 2;
  const pop = 1 + activation * 0.045;
  const rad = ((midDeg - 90) * Math.PI) / 180;
  const tx = Math.cos(rad) * activation * 6;
  const ty = Math.sin(rad) * activation * 6;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${pillar.label} pillar`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className="cursor-pointer outline-none"
      style={{
        transform: `translate(${tx}px, ${ty}px) scale(${pop})`,
        transformOrigin: `${CENTER}px ${CENTER}px`,
        transition: 'transform 300ms var(--ease-roya)',
      }}
    >
      <path d={ringPath(start, end, RADIUS_OUTER, RADIUS_INNER)} fill={fill} />
    </g>
  );
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
  const shown = pillars.find((p) => p.id === (hovered ?? active))!;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <svg viewBox="0 0 360 360" className="h-full w-full">
        {pillars.map((pillar, i) => (
          <WheelSegment
            key={pillar.id}
            pillar={pillar}
            index={i}
            isActive={active === pillar.id}
            isHovered={hovered === pillar.id}
            onSelect={() => onSelect(pillar.id)}
            onHover={(v) => onHover(v ? pillar.id : null)}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-14 text-center">
        <p className="label-mono text-[11px] text-green">{shown.label}</p>
        <p className="mt-2 text-sm leading-snug text-paper/75">{shown.definition}</p>
      </div>
    </div>
  );
}
