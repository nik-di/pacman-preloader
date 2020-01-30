const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/${isDev ? '[name].[chunkhash].js' : '[name].[hash].js'}`,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/gi,
        exclude: /node_modules/,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'postcss-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
  ]
}
