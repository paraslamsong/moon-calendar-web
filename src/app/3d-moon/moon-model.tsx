"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Sun } from "./components/sun.model";
import { Earth } from "./components/earth.model";

const Page: React.FC = () => {
  const moonTexture = useLoader(
    TextureLoader,
    "/assets/3d-moon/texture-8k.jpg"
  );
  const moonRoughnessTexture = useLoader(
    TextureLoader,
    "/assets/3d-moon/bumpmap.webp"
  );
  const starryTexture = useLoader(
    TextureLoader,
    "/assets/3d-moon/sky-texture.jpg"
  );

  return (
    <div style={{ height: "100vh" }}>
      <Canvas shadows>
        <ambientLight intensity={0.2} />
        {/* <ambientLight intensity={2} /> */}
        <directionalLight
          position={[0, -0.5, 100]}
          intensity={6}
          color={"white"}
        />
        <CameraController />
        {/* SUN START */}
        <Sun />
        {/* SUN END */}
        <Earth />

        {/* MOON START */}
        <Suspense fallback={null}>
          <mesh scale={1.8} rotation={[0, -((40 / 90) * Math.PI), 0]}>
            <sphereGeometry args={[1, 50, 50]} />
            <meshStandardMaterial
              map={moonTexture}
              // roughnessMap={moonRoughnessTexture}
              roughness={1}
              metalness={0}
              bumpMap={moonRoughnessTexture}
              bumpScale={0.8}
            />
          </mesh>
          <mesh scale={500} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshBasicMaterial
              map={starryTexture}
              lightMapIntensity={1}
              side={THREE.BackSide}
              // toneMapped={false}
              transparent
              opacity={1}
            />
          </mesh>
          {/* MOON END */}
        </Suspense>
        <OrbitControls
          maxZoom={1.2}
          minZoom={0.8}
          autoRotate
          autoRotateSpeed={-0.2}
          enableZoom={true} // Allow zooming in/out
          enablePan={true} // Disable panning
          enableRotate={true} // Enable rotation
        />
      </Canvas>
    </div>
  );
};

export default Page;

const CameraController = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  // const velocity = useRef(new THREE.Vector3()); // Used for camera movement speed

  useEffect(() => {
    // Add event listeners for arrow keys to move the camera
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!cameraRef.current) return;

      const speed = 500; // Movement speed for camera

      switch (event.key) {
        case "ArrowUp":
          cameraRef.current.position.z -= speed; // Move forward (toward the center of the scene)
          break;
        case "ArrowDown":
          cameraRef.current.position.z += speed; // Move backward
          break;
        case "ArrowLeft":
          cameraRef.current.position.x -= speed; // Move left
          break;
        case "ArrowRight":
          cameraRef.current.position.x += speed; // Move right
          break;
        default:
          break;
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Optionally, update camera rotation or position here
  useFrame(() => {
    const camera = cameraRef.current;
    if (camera) {
      // You can rotate the camera or do other things if needed
      camera.lookAt(0, 0, 0); // Make the camera always look at the center of the scene
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} />;
};
