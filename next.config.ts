import { NextConfig } from "next";

// Attention demo (Introspecção IA workshop) lives in its own Vercel project and
// is served under kickops.academy/attention-demo through this rewrite.
const ATTENTION_DEMO_ORIGIN = "https://academy-vite-attention-kickops.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/attention-demo",
          destination: `${ATTENTION_DEMO_ORIGIN}/attention-demo/`,
        },
        {
          source: "/attention-demo/:path*",
          destination: `${ATTENTION_DEMO_ORIGIN}/attention-demo/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
