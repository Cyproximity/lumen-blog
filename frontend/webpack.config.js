// node environment
const TARGET = process.env.npm_lifecycle_event;

const path = require('path'),
      webpack = require('webpack'),
      merge   = require('webpack-merge'),
      libPath = path.join(__dirname),
      srcPath = path.join(__dirname, 'src'),
      pubPath = path.join(__dirname, 'build'),
      bowPath = path.join(__dirname, 'bower_components'),
      nodPath = path.join(__dirname, 'node_modules');

//3rd parties
const precss = require('precss'),
      autoprefixer = require('autoprefixer'),
      postcss = function () {
        return { default: [precss, autoprefixer]};
      }; 

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

//instances
const ExtractCSS = new ExtractTextPlugin();

const config = {
  entry: './src/app.js',
  output: {
    path: './build',
    filename: 'bundle.[id]-[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader', query: { presets: ['es2015', 'stage-2'] } },
      { test: /\.scss$/, loader: ExtractCSS.extract(['style','css!sass!postcss']) },
      { test: /\.jade$/, loader: 'raw!html!jade' },
    ]
  },
  sassLoader: {
    includePaths: [ path.resolve(bowPath, 'compass-mixins/lib'), path.resolve(srcPath, 'stylesheets') ]
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules']
  }, 
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    new CleanWebpackPlugin(['build'], {
      root: libPath,
      verbose: true,
      dry: false,
    }),
    ExtractCSS,
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      { 
        from: path.resolve(srcPath, 'images'),
        to: path.resolve(pubPath, 'images') 
      }
    ]),
    new webpack.NoErrorsPlugin()
  ]
};

if(TARGET === 'start') {
  module.exports = merge(config);
}

if(TARGET === 'dev') {
  module.exports = merge(config, {})
}

/// TODO: ` Webpack copy plugin file to build folder