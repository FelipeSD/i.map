const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  loaders: [
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.s[a|c]ss$/,
      loader: 'style!css!sass'
    }
  ],
  vue: {
    loaders: {
      scss: 'style!css!sass'
    },
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}