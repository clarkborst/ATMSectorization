const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: './src/newmain.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'voronoi.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  watch: true,
  // To trace the error
  devtool: 'source-map'
};