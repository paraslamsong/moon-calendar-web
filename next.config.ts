import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out",
  images: {
    unoptimized: true, // This allows image optimization in production on Netlify.
  },
};

export default nextConfig;
