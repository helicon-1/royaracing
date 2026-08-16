// Minimal deterministic 2D value-noise implementation — no external deps.
// Used for the generative background's layered / domain-warped noise field.

const PERM_SIZE = 256;
const perm = new Uint8Array(PERM_SIZE * 2);

(function seed() {
  const table = new Uint8Array(PERM_SIZE);
  for (let i = 0; i < PERM_SIZE; i++) table[i] = i;
  // xorshift-based deterministic shuffle so the field is stable across reloads
  let s = 1337;
  const rand = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s |= 0;
    return ((s >>> 0) % 100000) / 100000;
  };
  for (let i = PERM_SIZE - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [table[i], table[j]] = [table[j], table[i]];
  }
  for (let i = 0; i < PERM_SIZE * 2; i++) perm[i] = table[i & 255];
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 7;
  const u = h < 4 ? x : y;
  const v = h < 4 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

/** 2D Perlin-style gradient noise, roughly in [-1, 1]. */
export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);

  const aa = perm[perm[X] + Y];
  const ab = perm[perm[X] + Y + 1];
  const ba = perm[perm[X + 1] + Y];
  const bb = perm[perm[X + 1] + Y + 1];

  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);
  return lerp(x1, x2, v) * 1.4;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Fractal brownian motion: layered octaves of noise2D. */
export function fbm(x: number, y: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    value += noise2D(x * frequency, y * frequency) * amplitude;
    max += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / max;
}

/** Domain-warped fbm: warp the sample coordinate through a second noise field. */
export function warpedNoise(x: number, y: number, warp = 0.6): number {
  const wx = x + fbm(x + 5.2, y + 1.3, 3) * warp;
  const wy = y + fbm(x + 0.7, y + 9.1, 3) * warp;
  return fbm(wx, wy, 4);
}
