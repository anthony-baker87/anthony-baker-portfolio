/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com"],
  },
  basePath: isProd ? "/anthony-baker-portfolio" : "",
  assetPrefix: isProd ? "/anthony-baker-portfolio/" : "",
};

export default nextConfig;
