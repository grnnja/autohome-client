const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  // to enable webpack analyzer set mode to server
  return ({
    entry: ['./src/index.jsx'],
    output: {
      path: path.resolve(__dirname, '/dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new Dotenv(),
      new webpack.HotModuleReplacementPlugin(),
      new ErrorOverlayPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './dist/index.html',
        title: 'autohome',
      }),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      // make sure this ip address is right otherwise npm start throws EADDRNOTAVAIL
      // host: '192.168.1.83',
      // setting it to 0.0.0.0 uses the current ip address
      host: '0.0.0.0',
      port: 1234,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    node: {
      fs: 'empty',
    },
  });
};
