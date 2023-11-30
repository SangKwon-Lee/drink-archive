/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  assetPrefix: '',
  compiler: {
    styledComponents: true
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      issuer: /\\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'port-0-drink-archive-api-dnr9tu2allvym80u.sel4.cloudtype.app',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
