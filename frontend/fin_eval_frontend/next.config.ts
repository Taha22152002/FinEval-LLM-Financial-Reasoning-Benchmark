import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/gemini3',
        destination: `${backendUrl}/api/gemini3`,
      },
      {
        source: '/api/fin-o1',
        destination: `${backendUrl}/api/fino1`,
      },
      {
        source: '/api/judge',
        destination: `${backendUrl}/api/judge`,
      },
    ];
  },
};

export default nextConfig;
