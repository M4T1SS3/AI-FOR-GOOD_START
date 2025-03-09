/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add a rule to handle CSV files
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'raw-loader',
    });

    return config;
  },
}

module.exports = nextConfig
