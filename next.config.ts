import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://inventory-api-e94z.onrender.com:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
