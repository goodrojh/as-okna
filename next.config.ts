import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/as-okna" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
