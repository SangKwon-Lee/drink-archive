/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')],
    // prependData: `@import "./_variables.scss";
    //             @import "./_mixin.scss";
    //             `
  },
  assetPrefix: '',
  compiler: {
    styledComponents: true,
    ssr: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\\.svg$/,
      issuer: /\\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });
    // scss import alias
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@assets': path.resolve(__dirname, 'static/assets')
    // };
    return config;
  }
};

module.exports = nextConfig;
