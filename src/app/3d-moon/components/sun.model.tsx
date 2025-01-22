import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// Starburst Rays component
export const StarburstRays = () => {
  const raysRef = useRef<THREE.Points>(null);

  // Number of rays in the starburst effect
  const numRays = 100;

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numRays * 3);

    // Create rays starting from the center (0, 0, 0)
    for (let i = 0; i < numRays; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3 + 1;
      const x = 0 + radius * Math.cos(angle);
      const y = 0.5 + radius * Math.sin(angle);
      const z = 100 + Math.random() * 2 - 1;
      positions.set([x, y, z], i * 3);
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    if (raysRef.current) {
      raysRef.current.geometry = geometry;
      raysRef.current.material = material;
    }
  }, []);

  return <points ref={raysRef} />;
};

// Sun component with lens flare
export const Sun = () => {
  const sunTexture = useLoader(
    TextureLoader,
    "/assets/3d-moon/sun-texture.jpg"
  );

  const meshRef = useRef<THREE.Mesh>(null);

  // Auto-rotate the mesh
  useFrame(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.00004;
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} scale={20} position={[0, 0, 500]}>
        <sphereGeometry args={[1, 600, 600]} />
        <meshBasicMaterial
          map={sunTexture}
          color={0xffffffff}
          transparent={true}
        />
      </mesh>
    </Suspense>
  );
};
