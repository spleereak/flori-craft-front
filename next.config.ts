import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.posiflora.online",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
