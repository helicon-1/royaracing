import { useMemo } from 'react';
import * as THREE from 'three';
import { TRACK_CURVE, TRACK_WIDTH } from './track';

const SEGMENTS = 240;
const UP = new THREE.Vector3(0, 1, 0);

function buildRibbon(offset: number, width: number, y: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const half = width / 2;

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = (i / SEGMENTS) % 1;
    const point = TRACK_CURVE.getPointAt(t);
    const tangent = TRACK_CURVE.getTangentAt(t);
    const side = new THREE.Vector3().crossVectors(tangent, UP).normalize();
    const center = point.clone().addScaledVector(side, offset);
    const left = center.clone().addScaledVector(side, half);
    const right = center.clone().addScaledVector(side, -half);
    positions.push(left.x, y, left.z, right.x, y, right.z);
    uvs.push(0, i, 1, i);
    if (i < SEGMENTS) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function TrackMesh() {
  const road = useMemo(() => buildRibbon(0, TRACK_WIDTH, 0.01), []);
  const edgeL = useMemo(() => buildRibbon(TRACK_WIDTH / 2 + 0.14, 0.22, 0.03), []);
  const edgeR = useMemo(() => buildRibbon(-TRACK_WIDTH / 2 - 0.14, 0.22, 0.03), []);

  return (
    <group>
      <mesh geometry={road} receiveShadow>
        <meshStandardMaterial color="#1a1f33" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh geometry={edgeL}>
        <meshStandardMaterial color="#d2d831" emissive="#d2d831" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh geometry={edgeR}>
        <meshStandardMaterial color="#d2d831" emissive="#d2d831" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0a0e24" roughness={1} />
      </mesh>
    </group>
  );
}
