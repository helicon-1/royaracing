// Single source of truth for brand color tokens, mirrored into the
// Tailwind @theme block in index.css. JS-side copies are needed for the
// generative background / HSV interpolation, which can't read CSS vars
// cheaply on every animation frame.

export const COLORS = {
  navy: '#283679',
  navyLight: '#34449a',
  cyan: '#26b7bd',
  lime: '#d2d831',
  blue: '#2f87c8',
  green: '#71ba43',
  grey: '#b0aeb2',
  slate: '#727981',
  ink: '#0b1030',
  paper: '#f4f4f1',
} as const;

export type SectionId =
  | 'home'
  | 'story'
  | 'team'
  | 'timeline'
  | 'sustainability'
  | 'absolute-roya'
  | 'events'
  | 'press';

// One accent per section — never mixed within a section (brief section 3).
export const SECTION_ACCENT: Record<SectionId, string> = {
  home: COLORS.cyan,
  story: COLORS.cyan,
  team: COLORS.cyan,
  timeline: COLORS.cyan,
  sustainability: COLORS.green,
  'absolute-roya': COLORS.cyan,
  events: COLORS.cyan,
  press: COLORS.cyan,
};

export function hexToHsv(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return [h, s, v];
}

export function hsvToRgbString(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const R = Math.round((r + m) * 255);
  const G = Math.round((g + m) * 255);
  const B = Math.round((b + m) * 255);
  return `rgb(${R}, ${G}, ${B})`;
}

/** Shortest-arc hue lerp so transitions never sweep through muddy grey. */
function lerpHueShortest(a: number, b: number, t: number): number {
  let diff = b - a;
  diff = ((diff + 180) % 360 + 360) % 360 - 180;
  return (a + diff * t + 360) % 360;
}

/** Interpolate between two hex colors the short way around the HSV wheel. */
export function interpolateHsv(hexA: string, hexB: string, t: number): string {
  const [h1, s1, v1] = hexToHsv(hexA);
  const [h2, s2, v2] = hexToHsv(hexB);
  const h = lerpHueShortest(h1, h2, t);
  const s = s1 + (s2 - s1) * t;
  const v = v1 + (v2 - v1) * t;
  return hsvToRgbString(h, s, v);
}
