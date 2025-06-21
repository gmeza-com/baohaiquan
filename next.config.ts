import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["knex", "mysql2"],
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json", ".css"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/trang-chu",
      },
    ];
  },
};

export default nextConfig;
