'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function FloatingShape({ shape = 'box', color = '#3b82f6', position = [0, 0, 0], rotationSpeed = 0.5 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const getShape = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.8, 0.2, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position as [number, number, number]}>
      {getShape()}
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.2}
        transparent 
        opacity={0.6} 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingShape shape="torus" color="#3b82f6" position={[-3, 1, -5]} rotationSpeed={0.3} />
      <FloatingShape shape="sphere" color="#8b5cf6" position={[3, -1, -8]} rotationSpeed={0.2} />
      <FloatingShape shape="octahedron" color="#ec4899" position={[0, 2, -10]} rotationSpeed={0.4} />
    </>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
