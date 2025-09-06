/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Ensure assetPrefix always has a trailing slash if basePath exists
const assetPrefix = isProd && basePath ? `${basePath}/` : "";

const nextConfig = {
  output: "export",
  basePath: isProd ? basePath : "",
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
