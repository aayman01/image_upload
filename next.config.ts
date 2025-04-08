/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  webpack(config : any) {
    config.resolve.alias["@"] = path.resolve("src");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
  },
};

export default nextConfig;