const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['react-hot-loader/webpack', 'babel-loader']
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: 'file-loader'
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }      

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SmartTrack',
      template: 'src/my-index.ejs'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }  
};