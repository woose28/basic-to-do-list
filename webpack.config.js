const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: () => `Build Time: ${new Date().toLocaleString()}`,
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      TEST_ENV: JSON.stringify(process.env.TEST_ENV),
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
