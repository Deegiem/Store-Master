import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Rewrites configuration
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://inventory-sys-6.onrender.com/:path*", // Proxy to backend
      },
    ];
  },
};

export default nextConfig;