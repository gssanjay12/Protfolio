import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

interface IntroSceneProps {
  onComplete: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scanStatusText, setScanStatusText] = useState('INITIALIZING ENVIRONMENT');
  const [verifiedStage, setVerifiedStage] = useState(false);
  const [isWebGlAvailable, setIsWebGlAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsWebGlAvailable(false);
    } catch {
      setIsWebGlAvailable(false);
    }
  }, []);

  // Keyboard controls: Enter / Space / Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        sound.playClick();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // Three.js architectural sculpture intro
  useEffect(() => {
    if (!containerRef.current || !isWebGlAvailable) return;

    let animationFrameId: number;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0e0e10, 1);
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8c8c93, 0.8);
    rimLight.position.set(-5, -4, -3);
    scene.add(rimLight);

    // Sculptural Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Precision Metallic Icosahedral Core
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xdedee3,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Geometric Wireframe Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3e3e44,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // 3. Precision Orbital Ring
    const ringGeo = new THREE.TorusGeometry(1.95, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x8c8c93,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    group.add(ringMesh);

    // 4. Subtle Green Scanning Laser Beam
    const scanLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.8, 0, 0),
      new THREE.Vector3(3.8, 0, 0),
    ]);
    const scanLineMat = new THREE.LineBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.0,
      linewidth: 2,
    });
    const scanLine = new THREE.Line(scanLineGeo, scanLineMat);
    scene.add(scanLine);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    const duration = 2900; // ~2.9s sequence

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1.0);

      // Smooth Fly-in & Rotation
      const flyInZ = THREE.MathUtils.lerp(12, 5.2, Math.min(t * 1.5, 1.0));
      camera.position.z = flyInZ;

      group.rotation.x += 0.007;
      group.rotation.y += 0.01;
      ringMesh.rotation.z -= 0.015;

      // Laser sweep from t: 0.25 to 0.70
      if (t >= 0.25 && t <= 0.7) {
        const scanProgress = (t - 0.25) / 0.45;
        scanLine.position.y = 2.4 - scanProgress * 4.8;
        scanLineMat.opacity = Math.sin(scanProgress * Math.PI) * 0.9;
        setScanStatusText('SCANNING IDENTIFIER CORRIDOR...');
      } else if (t > 0.7) {
        scanLineMat.opacity = 0;
        setVerifiedStage(true);
        setScanStatusText('IDENTITY VERIFIED');
      }

      renderer.render(scene, camera);

      if (t >= 1.0) {
        cancelAnimationFrame(animationFrameId);
        onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isWebGlAvailable, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0E0E10] flex flex-col justify-between items-center overflow-hidden cursor-pointer select-none font-mono"
      onClick={() => {
        sound.playClick();
        onComplete();
      }}
    >
      {/* Top Application Header */}
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-[#8C8C93] border-b border-[#26262B]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span className="text-[#EDEDED] font-semibold">SANJAY G S</span>
          <span className="text-[#5C5C64]">//</span>
          <span className="text-[#8C8C93] text-[11px]">{scanStatusText}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onComplete();
          }}
          className="px-3 py-1 rounded-xs border border-[#26262B] hover:border-[#3E3E44] text-xs text-[#8C8C93] hover:text-[#EDEDED] transition-colors"
        >
          ENTER WORKSPACE ↵
        </button>
      </div>

      {/* Center Cinematic Typography Reveal */}
      <div className="relative z-10 text-center pointer-events-none px-4">
        {verifiedStage && (
          <div className="space-y-2 animate-fade-in">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight text-[#EDEDED] leading-none">
                SANJAY G S
              </h1>
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#8C8C93] tracking-widest uppercase">
              AI &amp; DATA SCIENCE ENGINEER
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-[11px] text-[#5C5C64] border-t border-[#26262B]">
        <span>PRECISION GEOMETRIC SYSTEM</span>
        <span>TAP ANYWHERE OR PRESS ESC TO PROCEED</span>
      </div>
    </div>
  );
};
