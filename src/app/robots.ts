import type { MetadataRoute } from "next";

import { UNINDEXED_PATHS } from "@core/constants/unindexed-paths";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...UNINDEXED_PATHS],
    },
  };
};

export default robots;
