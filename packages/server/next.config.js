/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /**
   * @param {import('webpack').Configuration} c
   */
  webpack: (c) => {
    c.module.rules.push({
      issuer: { and: [/\.(js|ts)x?$/] },
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });
    return c;
  },
};

module.exports = nextConfig;
