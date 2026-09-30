"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -10]}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial color="#ff2a85" attach="material" distort={0.5} speed={2} roughness={0} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[5, -2, -8]}>
        <Sphere args={[1.5, 32, 32]}>
          <MeshDistortMaterial color="#00f0ff" attach="material" distort={0.3} speed={1.5} roughness={0} />
        </Sphere>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={1} position={[0, -5, -15]}>
        <Sphere args={[2, 32, 32]}>
          <MeshDistortMaterial color="#4a00e0" attach="material" distort={0.4} speed={3} roughness={0.2} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
