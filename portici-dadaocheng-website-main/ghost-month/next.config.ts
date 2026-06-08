import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  basePath: "/ghost-month",
  // Custom Express handler: default image optimizer receives `/images/...` and
  // returns 400; serve public files directly instead.
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
