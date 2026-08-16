import * as THREE from 'three';

/**
 * Custom-built open-wheel race car geometry — shaped (lathe/extrude/loft)
 * construction, not primitive box/sphere/cone stand-ins. This is a
 * placeholder pending a real, properly licensed glTF race car model: none
 * of the sources reachable from this environment (Sketchfab, CGTrader,
 * FetchCFD, Meshy, Poly Haven) were network-accessible, and the one
 * genuinely open-wheel model found on GitHub (rqphy/LightExperience) is a
 * real Ferrari F1-75 under CC-BY-NC — non-commercial and real-team-branded,
 * so wrong on both license and fit for a neutral livery canvas. Swap the
 * loader in Car.tsx for GLTFLoader against a real asset when one is
 * available; the zone material wiring below is written to carry over
 * unchanged (by mesh name) once that happens.
 */

// X = car length (+X front/nose), Y = up, Z = width (left/right)

export function buildNoseGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0.02, 2.15));
  points.push(new THREE.Vector2(0.05, 2.08));
  points.push(new THREE.Vector2(0.09, 1.95));
  points.push(new THREE.Vector2(0.13, 1.78));
  points.push(new THREE.Vector2(0.17, 1.6));
  points.push(new THREE.Vector2(0.19, 1.45));
  points.push(new THREE.Vector2(0.2, 1.3));
  const geo = new THREE.LatheGeometry(points, 20, 0, Math.PI * 2);
  geo.rotateZ(-Math.PI / 2);
  geo.translate(0, 0.28, 0);
  // Flatten slightly for a less perfectly-round nose
  geo.scale(1, 0.82, 1);
  return geo;
}

export function buildTubGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // side profile, XY plane (x = length, y = height)
  shape.moveTo(1.3, 0.32);
  shape.lineTo(0.85, 0.4);
  shape.quadraticCurveTo(0.55, 0.62, 0.15, 0.64);
  shape.lineTo(-0.35, 0.6);
  shape.quadraticCurveTo(-0.85, 0.56, -1.05, 0.38);
  shape.lineTo(-1.05, 0.18);
  shape.lineTo(1.3, 0.18);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.62,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, 0.31);
  return geo;
}

function sidepodShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0.55, 0.5);
  shape.lineTo(0.3, 0.56);
  shape.lineTo(-0.35, 0.5);
  shape.quadraticCurveTo(-0.55, 0.44, -0.55, 0.3);
  shape.lineTo(-0.5, 0.16);
  shape.lineTo(0.5, 0.16);
  shape.quadraticCurveTo(0.58, 0.22, 0.55, 0.5);
  shape.closePath();
  return shape;
}

export function buildSidepodGeometry(side: 1 | -1): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(sidepodShape(), {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 8,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, side * 0.5);
  return geo;
}

function wingProfile(chord: number, thickness: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(chord / 2, 0);
  shape.quadraticCurveTo(0, thickness, -chord / 2, thickness * 0.4);
  shape.quadraticCurveTo(-chord / 2 - 0.02, 0, -chord / 2, -thickness * 0.15);
  shape.quadraticCurveTo(0, -thickness * 0.3, chord / 2, 0);
  return shape;
}

export function buildFrontWingGeometry(): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(wingProfile(0.34, 0.05), {
    depth: 1.62,
    bevelEnabled: false,
    curveSegments: 6,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, -0.81);
  return geo;
}

export function buildFrontWingEndplateGeometry(side: 1 | -1): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.17, -0.02);
  shape.lineTo(0.15, 0.32);
  shape.lineTo(-0.13, 0.34);
  shape.lineTo(-0.17, 0.02);
  shape.lineTo(-0.15, -0.06);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, side * 0.82);
  return geo;
}

export function buildRearWingGeometry(): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(wingProfile(0.32, 0.06), {
    depth: 1.3,
    bevelEnabled: false,
    curveSegments: 6,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, -0.65);
  return geo;
}

export function buildRearWingEndplateGeometry(side: 1 | -1): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.16, -0.16);
  shape.lineTo(0.14, 0.1);
  shape.lineTo(-0.14, 0.1);
  shape.lineTo(-0.16, -0.16);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.015, bevelEnabled: false });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, side * 0.66);
  return geo;
}

export function buildStrutGeometry(): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(0.02, 0.025, 0.3, 8);
  return geo;
}

export function buildEngineCoverGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.0, 0.4);
  shape.quadraticCurveTo(-1.35, 0.42, -1.55, 0.3);
  shape.lineTo(-1.7, 0.18);
  shape.lineTo(-1.0, 0.18);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 8,
  });
  geo.rotateY(Math.PI / 2);
  geo.translate(0, 0, 0.25);
  return geo;
}

export function buildWheelGeometry(): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(0.34, 0.34, 0.26, 24);
  geo.rotateX(Math.PI / 2);
  return geo;
}

export function buildRimGeometry(): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(0.18, 0.18, 0.27, 16);
  geo.rotateX(Math.PI / 2);
  return geo;
}

export const WHEEL_POSITIONS: [number, number, number][] = [
  [1.15, 0.34, 0.79],
  [1.15, 0.34, -0.79],
  [-1.15, 0.34, 0.79],
  [-1.15, 0.34, -0.79],
];
