/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr',
  },
}

module.exports = nextConfig
