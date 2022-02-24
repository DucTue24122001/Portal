const path = require('path')
const HtmlWebpacklugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv')

module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://127.0.0.1:8112/'
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
        options: {
          name: 'public/icons/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpacklugin({
      template: './index.html',
      base: '/'
    }),
    new ESLintPlugin({
      fix: true,
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js')
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new webpack.HotModuleReplacementPlugin({multistep: true}),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    port: 8112,
    progress: true,
    inline: true,
    hot: true,
    hotOnly: true,
    host: '127.0.0.1',
    watchContentBase: true,
    quiet: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 300,
      ignored: [
        path.resolve(__dirname, 'node_modules')
      ],
    }
  },
  devtool: 'inline-source-map'
}
