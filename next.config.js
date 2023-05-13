/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  // images: {
  //   loader: 'cloudinary',
  //   path: 'https://res.cloudinary.com/dvxn9nvjs'
  // },
  images: {
    domains: ['res.cloudinary.com']
  },
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx', '.scss');
    return config;
  }
}

module.exports = nextConfig;