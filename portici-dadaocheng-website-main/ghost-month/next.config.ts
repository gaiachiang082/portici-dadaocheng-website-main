import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  basePath: "/ghost-month",
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
