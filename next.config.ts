import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Many crawlers request /favicon.ico; serve the same asset as file-based app/icon.png
      { source: "/favicon.ico", destination: "/icon.png" },
    ];
  },
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
