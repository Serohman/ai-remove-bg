import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    basePath: "/ai-remove-bg",
    assetPrefix: "/ai-remove-bg/",
  }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
