import { NextConfig } from "next";

import { UNINDEXED_PATHS } from "./src/core/constants/unindexed-paths";

// Attention demo (Introspecção IA workshop) lives in its own Vercel project and
// is served under kickops.academy/attention-demo through this rewrite.
const ATTENTION_DEMO_ORIGIN = "https://academy-vite-attention-kickops.vercel.app";
// ELIZA and the Minimax tic-tac-toe (same workshop) live in the academy-static-demos project.
const STATIC_DEMOS_ORIGIN = "https://academy-static-demos-kickops.vercel.app";

const TRAINING_SLUG_REDIRECTS = [
  ["trabalho-remoto-alta-performance", "remoto-de-verdade"],
  ["gestao-na-era-da-ia", "metodo-kickops"],
  ["arquitetura-desenvolvimento-era-da-ia", "engenharia-de-ia"],
  ["manual-vira-especialista-rags", "seu-agente-especialista"],
  ["design-produto-agentes-codigo", "design-com-alma"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/treinamentos",
        destination: "/",
        permanent: true,
      },
      ...TRAINING_SLUG_REDIRECTS.map(([source, destination]) => ({
        source: `/treinamentos/${source}`,
        destination: `/treinamentos/${destination}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return UNINDEXED_PATHS.flatMap((path) =>
      [path, `${path}/:path*`].map((source) => ({
        source,
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),
    );
  },
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
        {
          source: "/eliza-demo",
          destination: `${STATIC_DEMOS_ORIGIN}/eliza-demo/`,
        },
        {
          source: "/eliza-demo/:path*",
          destination: `${STATIC_DEMOS_ORIGIN}/eliza-demo/:path*`,
        },
        {
          source: "/jogo-da-velha-demo",
          destination: `${STATIC_DEMOS_ORIGIN}/jogo-da-velha-demo/`,
        },
        {
          source: "/jogo-da-velha-demo/:path*",
          destination: `${STATIC_DEMOS_ORIGIN}/jogo-da-velha-demo/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
