const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader', // need this for the options
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  },
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000/'
    },
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}