const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath = basePath === "/" ? "" : basePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath || undefined,
};

module.exports = nextConfig;
