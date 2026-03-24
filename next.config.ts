// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any hostname
      },
    ],
  },
};

export default nextConfig;