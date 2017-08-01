var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index3.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: "/"
  },

  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },

  devServer: {
    historyApiFallback: true,
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
  new webpack.HotModuleReplacementPlugin() // Enable HMR
  ]
};
