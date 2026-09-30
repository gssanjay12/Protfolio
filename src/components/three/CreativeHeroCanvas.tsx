import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Neural Particle Constellation
const ParticleSwarm: React.FC<{ count?: number }> = ({ count = 80 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#FF4D30'); // Coral
    const colorB = new THREE.Color('#8B5CF6'); // Violet
    const colorC = new THREE.Color('#CCFF00'); // Lime

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? colorA : Math.random() > 0.3 ? colorB : colorC;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Central Generative Sculpture
const NeuralSculpture: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth inertia tilt following mouse pointer
    const targetX = state.pointer.y * 0.45;
    const targetY = state.pointer.x * 0.6;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 3.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 3.5, delta);

    // Continuous core rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (hovered ? 0.7 : 0.28);
      coreRef.current.rotation.z += delta * 0.15;
    }

    // Outer gimbal rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.18;
      ring3Ref.current.rotation.x -= delta * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {/* Chrome Core Polyhedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color={hovered ? '#FFFFFF' : '#E0E0E6'}
          metalness={0.92}
          roughness={0.18}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Internal Wireframe Neural Lattice */}
      <mesh scale={1.38}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial
          color={hovered ? '#CCFF00' : '#8B5CF6'}
          wireframe={true}
          transparent={true}
          opacity={hovered ? 0.65 : 0.3}
        />
      </mesh>

      {/* Primary Equatorial Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.02, 16, 96]} />
        <meshStandardMaterial
          color="#FF4D30"
          emissive="#FF4D30"
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary Tilted Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[2.25, 0.018, 16, 96]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Cyan Ring */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, -0.4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 96]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.2}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Ambient Neural Nodes */}
      <ParticleSwarm count={90} />
    </group>
  );
};

export const CreativeHeroCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.45} />
        {/* Dynamic Studio Key & Rim Lights */}
        <directionalLight position={[6, 8, 5]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#A855F7" />
        <pointLight position={[2, -2, 2]} intensity={1.4} color="#FF4D30" distance={8} />
        <pointLight position={[-2, 3, 1]} intensity={1.2} color="#CCFF00" distance={8} />

        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.4}>
          <NeuralSculpture />
        </Float>
      </Canvas>
    </div>
  );
};
