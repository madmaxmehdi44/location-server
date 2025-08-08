/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};
module.exports = nextConfig;

import path from 'path';

module.exports = {
  webpack: (config, { isServer }) => {
    // مثال: اضافه کردن alias
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    // مثال: اضافه کردن loader سفارشی
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};