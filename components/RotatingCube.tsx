"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { useRef } from "react";

const MinimalCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    cubeRef.current.rotation.x += 0.004;
    cubeRef.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial
        color="#7738E0"
        metalness={0.9}
        roughness={0.15}
        emissive="#7738E0"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};


const CubeScene = () => {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 5, 5]} angle={0.4} intensity={2} color="#7738E0" />
        <MinimalCube />
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={2} />
        <Environment preset="city" background={false} />
      </Canvas>
    </div>
  );
};

export default CubeScene;
