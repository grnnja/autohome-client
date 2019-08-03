const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');


module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    const output = prev;
    output[`process.env.${next}`] = JSON.stringify(env[next]);
    return output;
  }, {});

  return ({
    entry: ['./src/index.jsx'],
    output: {
      path: path.resolve(__dirname, '/dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin(),
      new ErrorOverlayPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      // make sure this ip address is right otherwise npm start throws EADDRNOTAVAIL
      host: '192.168.1.83',
      port: 1234,
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
