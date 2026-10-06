'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMousePosition } from '../hooks/useMousePosition';

const CUBE_COUNT = 12;
const CUBE_RADIUS_BASE = 3.5;
const CUBE_RADIUS_VARIANCE = 0.5;
const CUBE_SCALE_BASE = 0.25;
const CUBE_SCALE_VARIANCE = 0.15;

const CUBE_DATA = (() => {
  const cubes: { position: [number, number, number]; rotation: [number, number, number]; scale: number }[] = [];
  for (let i = 0; i < CUBE_COUNT; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / CUBE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const radius = CUBE_RADIUS_BASE + Math.sin(i) * CUBE_RADIUS_VARIANCE;
    cubes.push({
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: CUBE_SCALE_BASE + Math.random() * CUBE_SCALE_VARIANCE,
    });
  }
  return cubes;
})();

function generateStarfieldData(count: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 15 + Math.random() * 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    sizes[i] = Math.random() * 1.5 + 0.5;

    const colorChoice = Math.random();
    if (colorChoice < 0.4) {
      colors[i * 3] = 0.49;
      colors[i * 3 + 1] = 0.36;
      colors[i * 3 + 2] = 1;
    } else if (colorChoice < 0.7) {
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.88;
      colors[i * 3 + 2] = 0.78;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return geom;
}

function IcosahedronCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x7c5cff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
      <primitive object={geometry} />
      <primitive object={material} />
    </mesh>
  );
}

function OrbitingRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.z += delta * 0.03;
    }
  });

  const ringGeometries = useMemo(() => {
    const geoms: THREE.RingGeometry[] = [];
    for (let i = 0; i < 3; i++) {
      geoms.push(new THREE.RingGeometry(2 + i * 0.8, 2.1 + i * 0.8, 64));
    }
    return geoms;
  }, []);

  const materials = useMemo(() => {
    const mats: THREE.MeshBasicMaterial[] = [];
    const colors = [0x7c5cff, 0x00e0c6, 0x7c5cff];
    for (let i = 0; i < 3; i++) {
      mats.push(
        new THREE.MeshBasicMaterial({
          color: colors[i] ?? 0x7c5cff,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        })
      );
    }
    return mats;
  }, []);

  return (
    <group ref={groupRef}>
      {ringGeometries.map((geometry, index) => {
        const mat = materials[index];
        if (!mat) return null;
        return (
          <mesh key={index} rotation={[Math.PI / 2, index * 0.5, 0]}>
            <primitive object={geometry} />
            <primitive object={mat} />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.x += delta * 0.02;
      cubesRef.current.rotation.y += delta * 0.03;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x00e0c6,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  return (
    <group ref={cubesRef}>
      {CUBE_DATA.map((cube, index) => (
        <mesh
          key={index}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <primitive object={geometry} />
          <primitive object={material} />
        </mesh>
      ))}
    </group>
  );
}

function Starfield({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.005;
      pointsRef.current.rotation.x += delta * 0.002;
    }
  });

  const geometry = useMemo(() => generateStarfieldData(count), [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      }),
    []
  );

  return <points ref={pointsRef}><primitive object={geometry} /><primitive object={material} /></points>;
}

function CameraController() {
  const scrollProgress = useScrollProgress();
  const mouse = useMousePosition();

  useFrame(({ camera }) => {
    const targetX = mouse.x * 0.3;
    const targetY = mouse.y * 0.3;
    const targetZ = 8 - scrollProgress * 4;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.02;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene3DContent() {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 600 : 1500;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#07070f']} />
      <fog attach="fog" args={['#07070f', 5, 50]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7]} intensity={0.6} color="#7c5cff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#00e0c6" />

      <IcosahedronCore />
      <OrbitingRings />
      {!prefersReducedMotion && <FloatingCubes />}
      <Starfield count={particleCount} />
      <CameraController />
    </Canvas>
  );
}

export function Scene3D() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#07070f] z-[-1]" aria-hidden="true" />}>
      <Scene3DContent />
    </Suspense>
  );
}