import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D component and disable SSR (only rendered on the client side)
const ThreeDPage = dynamic(() => import("./moon-model"), { ssr: true });

const Page = () => {
  return (
    <div>
      <ThreeDPage />
    </div>
  );
};

export default Page;
