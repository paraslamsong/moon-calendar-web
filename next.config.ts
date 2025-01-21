import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: "/moon-calendar-web/",
  reactStrictMode: true,
};

export default nextConfig;
