import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Favicons change rarely but search engines/CDNs cache them very long; force revalidation
      // so crawlers (Yandex, Google) pick up new files after deploy without stale edge bytes.
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/apple-icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
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
