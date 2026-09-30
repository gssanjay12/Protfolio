import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const AmbientGeometricLoop: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle cursor parallax
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.2,
        3,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.3,
        3,
        delta
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Precision Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#A0A0A8"
          metalness={0.9}
          roughness={0.25}
          flatShading={true}
        />
      </mesh>

      {/* Wireframe Outline */}
      <mesh scale={1.12}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial
          color="#3A3A40"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#22C55E"
          metalness={0.8}
          roughness={0.2}
          emissive="#22C55E"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
};

export const ContactSculpture: React.FC = () => {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#8C8C93" />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <AmbientGeometricLoop />
        </Float>
      </Canvas>
    </div>
  );
};
