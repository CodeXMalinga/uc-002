import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all domains. In production, you should specify exact domains
      },
    ],
  },
};

export default nextConfig;
