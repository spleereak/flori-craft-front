import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
