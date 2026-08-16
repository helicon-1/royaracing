import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  buildNoseGeometry,
  buildTubGeometry,
  buildSidepodGeometry,
  buildFrontWingGeometry,
  buildFrontWingEndplateGeometry,
  buildRearWingGeometry,
  buildRearWingEndplateGeometry,
  buildStrutGeometry,
  buildEngineCoverGeometry,
  buildWheelGeometry,
  buildRimGeometry,
  WHEEL_POSITIONS,
} from './carGeometry';
import { useLiveryStore, FINISH_PARAMS, type ZoneId } from './store';

function useZoneMaterial(zone: ZoneId) {
  const style = useLiveryStore((s) => s.zones[zone]);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(() => {
    const mat = materialRef.current;
    if (!mat) return;
    const params = FINISH_PARAMS[style.finish];
    if (mat.color.getHexString() !== style.color.replace('#', '')) {
      mat.color.set(style.color);
    }
    mat.roughness = THREE.MathUtils.lerp(mat.roughness, params.roughness, 0.15);
    mat.metalness = THREE.MathUtils.lerp(mat.metalness, params.metalness, 0.15);
    mat.clearcoat = THREE.MathUtils.lerp(mat.clearcoat, params.clearcoat, 0.15);
    mat.clearcoatRoughness = THREE.MathUtils.lerp(mat.clearcoatRoughness, params.clearcoatRoughness, 0.15);
    mat.needsUpdate = true;
  });

  return materialRef;
}

function ZoneMesh({
  zone,
  geometry,
  onSelect,
}: {
  zone: ZoneId;
  geometry: THREE.BufferGeometry;
  onSelect: (z: ZoneId) => void;
}) {
  const ref = useZoneMaterial(zone);
  const style = useLiveryStore((s) => s.zones[zone]);
  return (
    <mesh
      geometry={geometry}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelect(zone);
      }}
    >
      <meshPhysicalMaterial ref={ref} color={style.color} envMapIntensity={1.1} />
    </mesh>
  );
}

const BASE_COLOR = '#111527';
const TIRE_COLOR = '#15161a';
const RIM_COLOR = '#c7c9cf';

export function Car({ onSelectZone }: { onSelectZone: (z: ZoneId) => void }) {
  const nose = useMemo(() => buildNoseGeometry(), []);
  const tub = useMemo(() => buildTubGeometry(), []);
  const sidepodL = useMemo(() => buildSidepodGeometry(1), []);
  const sidepodR = useMemo(() => buildSidepodGeometry(-1), []);
  const frontWing = useMemo(() => buildFrontWingGeometry(), []);
  const frontPlateL = useMemo(() => buildFrontWingEndplateGeometry(1), []);
  const frontPlateR = useMemo(() => buildFrontWingEndplateGeometry(-1), []);
  const rearWing = useMemo(() => buildRearWingGeometry(), []);
  const rearPlateL = useMemo(() => buildRearWingEndplateGeometry(1), []);
  const rearPlateR = useMemo(() => buildRearWingEndplateGeometry(-1), []);
  const strut = useMemo(() => buildStrutGeometry(), []);
  const engineCover = useMemo(() => buildEngineCoverGeometry(), []);
  const wheel = useMemo(() => buildWheelGeometry(), []);
  const rim = useMemo(() => buildRimGeometry(), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Fixed, non-customizable base structure */}
      <mesh geometry={tub} castShadow receiveShadow>
        <meshPhysicalMaterial color={BASE_COLOR} roughness={0.35} metalness={0.4} clearcoat={0.6} clearcoatRoughness={0.2} />
      </mesh>
      <mesh geometry={engineCover} castShadow receiveShadow>
        <meshPhysicalMaterial color={BASE_COLOR} roughness={0.35} metalness={0.4} clearcoat={0.6} clearcoatRoughness={0.2} />
      </mesh>
      <mesh geometry={strut} position={[-1.78, 0.42, 0.35]} castShadow>
        <meshStandardMaterial color="#0a0a0d" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh geometry={strut} position={[-1.78, 0.42, -0.35]} castShadow>
        <meshStandardMaterial color="#0a0a0d" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Customizable zones */}
      <ZoneMesh zone="nose" geometry={nose} onSelect={onSelectZone} />
      <ZoneMesh zone="sidepod" geometry={sidepodL} onSelect={onSelectZone} />
      <ZoneMesh zone="sidepod" geometry={sidepodR} onSelect={onSelectZone} />
      <ZoneMesh zone="frontWing" geometry={frontWing} onSelect={onSelectZone} />
      <ZoneMesh zone="frontWing" geometry={frontPlateL} onSelect={onSelectZone} />
      <ZoneMesh zone="frontWing" geometry={frontPlateR} onSelect={onSelectZone} />
      <ZoneMesh zone="rearWing" geometry={rearWing} onSelect={onSelectZone} />
      <ZoneMesh zone="rearWing" geometry={rearPlateL} onSelect={onSelectZone} />
      <ZoneMesh zone="rearWing" geometry={rearPlateR} onSelect={onSelectZone} />

      {/* Wheels */}
      {WHEEL_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={wheel} castShadow receiveShadow>
            <meshStandardMaterial color={TIRE_COLOR} roughness={0.9} metalness={0.05} />
          </mesh>
          <mesh geometry={rim} castShadow>
            <meshPhysicalMaterial color={RIM_COLOR} roughness={0.25} metalness={0.9} clearcoat={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
