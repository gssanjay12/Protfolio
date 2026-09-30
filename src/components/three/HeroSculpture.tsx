import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GeometricSculpture: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth cursor tracking tilt
    const targetRotX = state.pointer.y * 0.4;
    const targetRotY = state.pointer.x * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta);

    // Continuous idle rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (hovered ? 0.6 : 0.25);
      coreRef.current.rotation.x += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * 0.2;
      ring1Ref.current.rotation.x += delta * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3;
      ring2Ref.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group
      ref={meshRef}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={clicked ? 1.08 : 1}
    >
      {/* Central Precision Polyhedral Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial
          color={hovered ? '#EDEDED' : '#B0B0B8'}
          metalness={0.88}
          roughness={0.22}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Internal Geometry Wireframe Lattice */}
      <mesh scale={1.27}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color={hovered ? '#22C55E' : '#4E4E56'}
          wireframe={true}
          transparent={true}
          opacity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* Primary Architectural Gimbal Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#8C8C93"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Secondary Outer Gimbal Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.05, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#5C5C64"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Subtle Precision Axis Marker */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 3.2, 8]} />
        <meshBasicMaterial color="#3E3E44" />
      </mesh>
    </group>
  );
};

export const HeroSculpture: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 8, 5]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -3]} intensity={0.5} color="#8C8C93" />
        <pointLight position={[0, -2, 2]} intensity={0.8} color="#22C55E" distance={6} />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <GeometricSculpture />
        </Float>
      </Canvas>
    </div>
  );
};
