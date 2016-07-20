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
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      { test: /\.scss$/, loader: 'sass' },
      { test: /\.jade$/, loader: 'jade' },
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './')]
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules']
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(libPath, 'index.html'),
      filename: 'index.html',
    }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
    // new webpack.NoErrorsPlugin()
  ]
}
