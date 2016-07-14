const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      libPath = path.join(__dirname, 'src');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './build',
    filename: 'bundle.[id]-[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|node_modules)/, loader: 'babel-loader' },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules']
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(libPath, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
    // new webpack.NoErrorsPlugin()
  ]
}
