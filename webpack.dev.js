const merge = require('webpack-merge');
const Webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },  
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: {
      index: '/'
    },
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
});