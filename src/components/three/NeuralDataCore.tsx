import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NodeData {
  name: string;
  category: string;
  pos: [number, number, number];
  color: number;
}

const NODES_DATA: NodeData[] = [
  { name: 'AGENTIC_ORCHESTRATOR', category: 'Autonomous Systems', pos: [1.8, 1.2, 0.5], color: 0x00ff66 },
  { name: 'GEOSPATIAL_INDEXER', category: 'Satellite & GIS', pos: [-1.9, 0.8, -0.6], color: 0x00f0ff },
  { name: 'NEURAL_EMBEDDINGS', category: 'Deep Learning', pos: [0.2, -1.8, 1.1], color: 0x00ff66 },
  { name: 'NDVI_SPECTRAL_ENGINE', category: 'Remote Sensing', pos: [-1.4, -1.2, -1.2], color: 0x00f0ff },
  { name: 'EDGE_INFERENCE_CORE', category: 'Systems Optimization', pos: [1.5, -1.1, -0.8], color: 0x00ff66 },
  { name: 'MARITIME_HAZARD_AI', category: 'Predictive Safety', pos: [-0.3, 1.9, 0.9], color: 0x00f0ff },
];

export const NeuralDataCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Central Floating Core Group
    const coreCluster = new THREE.Group();
    scene.add(coreCluster);

    // Inner glowing geometric core
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0a140f,
      emissive: 0x00ff66,
      emissiveIntensity: 0.25,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreCluster.add(innerMesh);

    // Outer wireframe cage
    const outerGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const outerWire = new THREE.LineSegments(outerWireframe, outerMat);
    coreCluster.add(outerWire);

    // Dynamic Nodes & Connecting Synapses
    const nodeMeshes: THREE.Mesh[] = [];
    const nodePoints: THREE.Vector3[] = [];

    NODES_DATA.forEach((n) => {
      const v = new THREE.Vector3(...n.pos);
      nodePoints.push(v);

      const sphereGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: n.color });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.copy(v);
      coreCluster.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Neural Synapse Lines connecting nodes to center and to each other
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.25,
    });

    const linePositions: number[] = [];
    nodePoints.forEach((p) => {
      // Connect each node to center (0,0,0)
      linePositions.push(0, 0, 0);
      linePositions.push(p.x, p.y, p.z);
    });

    // Interconnect neighbouring nodes
    for (let i = 0; i < nodePoints.length; i++) {
      for (let j = i + 1; j < nodePoints.length; j++) {
        if (nodePoints[i].distanceTo(nodePoints[j]) < 2.8) {
          linePositions.push(nodePoints[i].x, nodePoints[i].y, nodePoints[i].z);
          linePositions.push(nodePoints[j].x, nodePoints[j].y, nodePoints[j].z);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const synapseLines = new THREE.LineSegments(lineGeo, lineMat);
    coreCluster.add(synapseLines);

    // Orbiting Data Cloud Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const orbitingCloud = new THREE.Points(particleGeo, particleMat);
    coreCluster.add(orbitingCloud);

    // Orbital ring
    const orbitRingGeo = new THREE.TorusGeometry(2.4, 0.008, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    coreCluster.add(orbitRing);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = y * 1.2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Interactive node cycling for ambient telemetry
    let cycleCounter = 0;
    let lastCycleTime = performance.now();

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      coreCluster.rotation.y += 0.006;
      coreCluster.rotation.x = mouseY * 0.6;
      coreCluster.rotation.z = -mouseX * 0.4;

      innerMesh.rotation.y -= 0.012;
      innerMesh.rotation.x += 0.008;

      outerWire.rotation.y += 0.004;
      orbitRing.rotation.z += 0.005;
      orbitingCloud.rotation.y -= 0.003;

      // Ambient node ping every 3 seconds
      if (timestamp - lastCycleTime > 3000) {
        lastCycleTime = timestamp;
        cycleCounter = (cycleCounter + 1) % NODES_DATA.length;
        setActiveNode(NODES_DATA[cycleCounter]);
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating telemetry HUD elements */}
      <div className="absolute top-3 left-3 bg-[#0D110F]/90 border border-[#1E2822] rounded px-3 py-1.5 text-[11px] font-mono text-command-textMuted pointer-events-none backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-command-green animate-ping" />
          <span className="text-[#E6ECE8] font-semibold">AI_CORE // NEURAL SYNAPSE</span>
        </div>
        <div className="text-[10px] text-command-textDim mt-0.5">
          TOPOLOGY: 6 ACTIVE NODES // TENSORS LOCKED
        </div>
      </div>

      {/* Dynamic Active Node Telemetry Badge */}
      {activeNode && (
        <div className="absolute bottom-4 right-4 max-w-[220px] bg-[#0D110F]/95 border border-command-green/40 rounded-lg p-3 text-[11px] font-mono shadow-lg shadow-command-green/5 backdrop-blur-md pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between text-command-green text-[10px] font-bold mb-1">
            <span>NODE_TELEMETRY</span>
            <span className="text-[9px] bg-command-green/10 px-1 py-0.5 rounded border border-command-green/20">LIVE</span>
          </div>
          <div className="text-[#E6ECE8] font-bold font-sans text-xs truncate">{activeNode.name}</div>
          <div className="text-command-cyan text-[10px]">{activeNode.category}</div>
          <div className="mt-1 text-[9px] text-command-textDim">STATUS: TRANSMITTING VIA WEBSOCKET</div>
        </div>
      )}

      {/* Subtle Coordinate Axis Guide */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] font-mono text-command-textDim pointer-events-none">
        <span>X: [ -1.8 : +1.8 ]</span>
        <span>Y: [ -1.2 : +1.9 ]</span>
        <span className="text-command-green">DIM: 3D_VECTOR</span>
      </div>
    </div>
  );
};
