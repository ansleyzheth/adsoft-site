import type { NextConfig } from "next";

const basePath =
  process.env.BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/adsoft-site" : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;