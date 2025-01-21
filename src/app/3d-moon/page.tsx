"use client";
import React from "react";
import dynamic from "next/dynamic";

const ThreeDPage = dynamic(() => import("../3d-moon/moon-model"), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      <ThreeDPage />
    </div>
  );
};

export default Page;
