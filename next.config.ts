import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Only match UUID-like publicIds so we don't mess with /login, /profile, etc.
      {
        source: "/:publicId([0-9a-fA-F-]{36})",
        destination: "/e/:publicId",
      },
    ];
  },
};

export default nextConfig;
