import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  reactStrictMode: false,

  webpack: (config, { isServer }) => {
    // Add a rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // Prevent `ssh2` from being bundled in the frontend
    if (!isServer) {
      config.externals = {
        ...config.externals,
        ssh2: "ssh2",
      };
    }

    return config;
  },
};

export default nextConfig;
