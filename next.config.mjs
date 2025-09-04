/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/anthony-baker-portfolio",
  assetPrefix: "/anthony-baker-portfolio/",
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
