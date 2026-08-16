import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Car } from './Car';
import { TrackMesh } from './TrackMesh';
import { closestT, distanceFromCenterline, pointAt, tangentAt, TRACK_WIDTH, TRACK_CURVE } from './track';
import { useKeyControls } from './useKeyControls';
import { useRaceStore } from './raceStore';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const MAX_SPEED = 13;
const ACCEL = 10;
const BRAKE_ACCEL = 17;
const FRICTION = 6;
const TURN_RATE = 2.4;
const OFF_TRACK_MULT = 0.45;

const START = pointAt(0);
const START_TANGENT = tangentAt(0);
const START_HEADING = Math.atan2(-START_TANGENT.z, START_TANGENT.x);

const AI_LAP_SECONDS = 15.5;
const AI_SPEED = TRACK_CURVE.getLength() / AI_LAP_SECONDS;

function noop() {}

function PlayerCar({ keys }: { keys: React.RefObject<{ up: boolean; down: boolean; left: boolean; right: boolean }> }) {
  const group = useRef<THREE.Group>(null);
  const physics = useRef({
    x: START.x - 2,
    z: START.z,
    heading: START_HEADING,
    speed: 0,
    lap: 1,
    lastT: 0,
    unwrappedProgress: 0,
  });

  useFrame((state, dt) => {
    const status = useRaceStore.getState().status;
    if (status !== 'racing') return;
    const k = keys.current;
    const p = physics.current;
    const dtc = Math.min(dt, 0.05);

    const offTrack = distanceFromCenterline(new THREE.Vector3(p.x, 0, p.z)) > TRACK_WIDTH / 2;
    const effMax = offTrack ? MAX_SPEED * OFF_TRACK_MULT : MAX_SPEED;

    if (k.up) p.speed += ACCEL * dtc;
    else if (k.down) p.speed -= BRAKE_ACCEL * dtc;
    else p.speed -= Math.sign(p.speed) * FRICTION * dtc;

    p.speed = THREE.MathUtils.clamp(p.speed, -MAX_SPEED * 0.4, effMax);
    if (Math.abs(p.speed) < 0.03) p.speed = 0;

    if (Math.abs(p.speed) > 0.15) {
      const turn = (k.left ? 1 : 0) - (k.right ? 1 : 0);
      const dirMult = p.speed >= 0 ? 1 : -1;
      p.heading += turn * TURN_RATE * dtc * dirMult;
    }

    const dir = new THREE.Vector3(Math.cos(p.heading), 0, -Math.sin(p.heading));
    p.x += dir.x * p.speed * dtc;
    p.z += dir.z * p.speed * dtc;

    if (group.current) {
      group.current.position.set(p.x, 0, p.z);
      group.current.rotation.y = p.heading;
    }

    // Lap tracking via progress along the track centerline
    const t = closestT(new THREE.Vector3(p.x, 0, p.z));
    let delta = t - p.lastT;
    if (delta > 0.5) delta -= 1;
    if (delta < -0.5) delta += 1;
    p.unwrappedProgress += delta;
    p.lastT = t;
    const lap = Math.max(1, Math.floor(p.unwrappedProgress) + 1);
    if (lap !== p.lap) {
      p.lap = lap;
      const totalLaps = useRaceStore.getState().totalLaps;
      useRaceStore.getState().setLaps(Math.min(lap, totalLaps), useRaceStore.getState().aiLap);
      if (lap > totalLaps && useRaceStore.getState().status === 'racing') {
        useRaceStore.getState().finish('player');
      }
    }

    // Chase camera
    const camTarget = new THREE.Vector3(p.x - dir.x * 5.2, 2.4, p.z - dir.z * 5.2);
    state.camera.position.lerp(camTarget, 1 - Math.pow(0.001, dtc));
    const lookTarget = new THREE.Vector3(p.x + dir.x * 3, 0.6, p.z + dir.z * 3);
    state.camera.lookAt(lookTarget);
  });

  return (
    <group ref={group}>
      <Car onSelectZone={noop} />
    </group>
  );
}

function AICar() {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0.06);
  const lapRef = useRef(1);

  useFrame((_, dt) => {
    const status = useRaceStore.getState().status;
    if (status !== 'racing') return;
    const dtc = Math.min(dt, 0.05);
    t.current += (AI_SPEED * dtc) / TRACK_CURVE.getLength();

    const lap = Math.floor(t.current) + 1;
    if (lap !== lapRef.current) {
      lapRef.current = lap;
      const totalLaps = useRaceStore.getState().totalLaps;
      useRaceStore.getState().setLaps(useRaceStore.getState().playerLap, Math.min(lap, totalLaps));
      if (lap > totalLaps && useRaceStore.getState().status === 'racing') {
        useRaceStore.getState().finish('ai');
      }
    }

    const point = pointAt(t.current);
    const tangent = tangentAt(t.current);
    if (group.current) {
      group.current.position.set(point.x, 0, point.z);
      group.current.rotation.y = Math.atan2(-tangent.z, tangent.x);
    }
  });

  return (
    <group ref={group} scale={0.98}>
      <Car onSelectZone={noop} />
    </group>
  );
}

function PositionTracker() {
  useFrame(() => {
    const s = useRaceStore.getState();
    if (s.status !== 'racing') return;
    // Rough relative-position estimate from lap counts alone (adequate for a 3-lap sprint)
    const position = s.playerLap >= s.aiLap ? 1 : 2;
    if (position !== s.position) s.setPosition(position);
  });
  return null;
}

function RaceClock() {
  const startRef = useRef<number | null>(null);
  useFrame(() => {
    const s = useRaceStore.getState();
    if (s.status !== 'racing') {
      startRef.current = null;
      return;
    }
    if (startRef.current === null) startRef.current = performance.now();
    s.tick(performance.now() - startRef.current);
  });
  return null;
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(START.x - 6, 3, START.z);
  }, [camera]);
  return null;
}

function formatTime(ms: number) {
  const totalSec = ms / 1000;
  const m = Math.floor(totalSec / 60);
  const s = (totalSec % 60).toFixed(2).padStart(5, '0');
  return `${m}:${s}`;
}

export function RaceMode() {
  const status = useRaceStore((s) => s.status);
  const playerLap = useRaceStore((s) => s.playerLap);
  const totalLaps = useRaceStore((s) => s.totalLaps);
  const elapsedMs = useRaceStore((s) => s.elapsedMs);
  const position = useRaceStore((s) => s.position);
  const winner = useRaceStore((s) => s.winner);
  const start = useRaceStore((s) => s.start);
  const reset = useRaceStore((s) => s.reset);
  const [countdown, setCountdown] = useState(3);
  const reducedMotion = usePrefersReducedMotion();
  const keys = useKeyControls(status === 'racing');

  useEffect(() => {
    if (status !== 'countdown') return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          useRaceStore.setState({ status: 'racing' });
          return 0;
        }
        return c - 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border border-paper/10 bg-[#0a0e24]">
      <Canvas shadows={!reducedMotion} dpr={[1, 1.5]} camera={{ fov: 55 }}>
        <color attach="background" args={['#0a0e24']} />
        <hemisphereLight args={['#8fa5ff', '#04050c', 0.5]} />
        <directionalLight position={[10, 14, 6]} intensity={2} castShadow={!reducedMotion} />
        <fog attach="fog" args={['#0a0e24', 20, 55]} />
        <CameraRig />
        <TrackMesh />
        <PlayerCar keys={keys} />
        <AICar />
        <PositionTracker />
        <RaceClock />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <div className="label-mono rounded bg-ink/60 px-3 py-2 text-[11px] text-paper backdrop-blur-sm">
          LAP {Math.min(playerLap, totalLaps)}/{totalLaps}
        </div>
        <div className="label-mono rounded bg-ink/60 px-3 py-2 text-[11px] text-paper backdrop-blur-sm">
          {formatTime(elapsedMs)}
        </div>
        <div className="label-mono rounded bg-ink/60 px-3 py-2 text-[11px] text-lime backdrop-blur-sm">
          {position === 1 ? '1ST' : '2ND'}
        </div>
      </div>

      {status === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/70 text-center">
          <p className="label-mono text-paper/60">WASD / Arrow keys to drive</p>
          <button
            type="button"
            onClick={start}
            className="label-mono border border-lime px-8 py-3 text-sm text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
          >
            Start Race
          </button>
        </div>
      )}

      {status === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
          <p className="text-7xl font-bold text-lime">{countdown}</p>
        </div>
      )}

      {status === 'finished' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/80 text-center">
          <p className="label-mono text-paper/50">Race finished</p>
          <p className="text-4xl font-bold text-paper">
            {winner === 'player' ? "You won!" : 'The CPU won this one.'}
          </p>
          <p className="label-mono text-paper/50">Time {formatTime(elapsedMs)}</p>
          <button
            type="button"
            onClick={reset}
            className="label-mono mt-2 border border-lime px-8 py-3 text-sm text-lime transition-colors duration-300 hover:bg-lime hover:text-navy"
          >
            Race Again
          </button>
        </div>
      )}
    </div>
  );
}
