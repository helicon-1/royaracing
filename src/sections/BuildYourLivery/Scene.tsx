import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Car } from './Car';
import type { ZoneId } from './store';

/** Generates a studio-style env map locally (no external HDRI fetch needed) for real reflections. */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new RoomEnvironment();
    const rt = pmrem.fromScene(envScene, 0.04);
    scene.environment = rt.texture;
    pmrem.dispose();
    return () => {
      rt.texture.dispose();
    };
  }, [gl, scene]);
  return null;
}

export function Scene({
  onSelectZone,
  resetSignal,
}: {
  onSelectZone: (z: ZoneId) => void;
  resetSignal: number;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    controlsRef.current?.reset();
  }, [resetSignal]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.6, 1.6, 3.6], fov: 32 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#10173d']} />
      <Suspense fallback={null}>
        <StudioEnvironment />
        <hemisphereLight args={['#8fa5ff', '#0a0a12', 0.35]} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#26b7bd" />

        <group position={[0, -0.02, 0]}>
          <Car onSelectZone={onSelectZone} />
          <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={8} blur={2.2} far={2} />
        </group>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={2.6}
          maxDistance={6.5}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.49}
          target={[0, 0.32, 0]}
          enableDamping
          dampingFactor={0.08}
        />
      </Suspense>
    </Canvas>
  );
}
