import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export const Earth = () => {
  const sunTexture = useLoader(
    TextureLoader,
    "/assets/3d-moon/earth-texture.jpg"
  );

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.000004;
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} scale={1.6} position={[0, 0, 100]}>
        <sphereGeometry args={[1, 600, 600]} />
        <meshPhysicalMaterial map={sunTexture} />
      </mesh>
    </Suspense>
  );
};
