import * as THREE from 'three';

// Closed-loop track centerline — a short, F1-style circuit with a chicane,
// not an open plane. Points in the XZ ground plane.
const CONTROL_POINTS: [number, number][] = [
  [0, -18],
  [11, -16],
  [16, -8],
  [14, -1],
  [7, -2],
  [5, 4],
  [12, 9],
  [15, 16],
  [6, 20],
  [-6, 19],
  [-15, 12],
  [-16, 2],
  [-9, -3],
  [-14, -11],
  [-9, -18],
];

export const TRACK_CURVE = new THREE.CatmullRomCurve3(
  CONTROL_POINTS.map(([x, z]) => new THREE.Vector3(x, 0, z)),
  true,
  'catmullrom',
  0.5,
);

export const TRACK_WIDTH = 5.2;

const SAMPLE_COUNT = 800;
const SAMPLES = TRACK_CURVE.getSpacedPoints(SAMPLE_COUNT);

/** Finds the curve parameter t (0..1) closest to a world position, by sampling. */
export function closestT(position: THREE.Vector3): number {
  let bestDist = Infinity;
  let bestI = 0;
  for (let i = 0; i < SAMPLES.length; i++) {
    const d = SAMPLES[i].distanceToSquared(position);
    if (d < bestDist) {
      bestDist = d;
      bestI = i;
    }
  }
  return bestI / SAMPLES.length;
}

export function distanceFromCenterline(position: THREE.Vector3): number {
  const t = closestT(position);
  const point = TRACK_CURVE.getPointAt(t);
  return position.distanceTo(point);
}

export function pointAt(t: number): THREE.Vector3 {
  return TRACK_CURVE.getPointAt(((t % 1) + 1) % 1);
}

export function tangentAt(t: number): THREE.Vector3 {
  return TRACK_CURVE.getTangentAt(((t % 1) + 1) % 1);
}
