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
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|node_modules)/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jade$/, loader: "jade" },
    ]
  },
  resolve: {
    root: libPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'bower_components', libPath]
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
