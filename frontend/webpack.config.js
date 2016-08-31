'use strict';

const DEV_ENV = {
  host: '127.0.0.1',
  port: 3000,
  target: 'http://127.0.0.1:8080'
}

// node environment
const env = process.env.npm_lifecycle_event,
    path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss');

const PATH_DIR = {
  lib: path.join(__dirname),
  src: path.join(__dirname, 'src'),
  pub: path.join(__dirname, 'build'),
  bower_path: path.join(__dirname, 'bower_components'),
  node_Path: path.join(__dirname, 'node_modules')
}

//plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');


//default config
const config = {
  target: 'web',
  context: PATH_DIR.src,
  entry: {
    vendors: path.resolve( PATH_DIR.src, 'vendors.js'),
    app: path.resolve( PATH_DIR.src, 'app.js' )
  },
  output: {
    path: PATH_DIR.pub,
    publicPath: '/',
    filename: 'js/bundle.[name].[id]-[hash].js'
  },
  resolve: {
    root: PATH_DIR.lib,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'bower_components', PATH_DIR.src]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style!css')
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
      },
      {
        test: /\.jade$/,
        loader: 'pug'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'url-loader',
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(PATH_DIR.src)]
  },
  postcss: function () {
    return {
      plugins: [autoprefixer, precss]
    }
  },
  imageWebpackLoader: {
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    svgo:{
      plugins: [
        { removeViewBox: false },
        { removeEmptyAttrs: false }
      ]
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin(['build'], {
      root: PATH_DIR.lib,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: PATH_DIR.src + '/index.html',
      favicon: PATH_DIR.src + '/images/logo-new.png'
    }),
    new ExtractTextPlugin('css/bundle.[name].[id]-[hash].css')
  ]
}

function Devserver(host, port, target) {
  return {
    devTool: 'eval',
    devServer: {
      hot: true,
      inline: true,
      progress: true,
      historyApiFallback: true,
      host: host,
      port: port,
      contentBase: PATH_DIR.pub,
      outputPath: PATH_DIR.pub,
      stats: {
        colors: true
      },
      proxy: {
        '/api/*': {
          target: target,
          changeOrigin: true,
          secure: false
        }
      },
      watchOptions: {
        poll: false
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        { from: path.resolve(PATH_DIR.src, 'images'), to: '/images' }
      ]),
      new OpenBrowserPlugin({url: 'http://'+ host +':'+ port })
    ]
  }
}

// Servers
if(env === 'start'){
  module.exports = merge(config, {});
}

if(env === 'dev'){
  module.exports = merge(config, Devserver(DEV_ENV.host, DEV_ENV.port, DEV_ENV.target));
}

if(env === 'build'){
  module.exports = merge(config, {
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourceMap: false,
        compress: { warnings: false }
      }),
      new CopyWebpackPlugin([
        { from: path.resolve(PATH_DIR.src, 'images'), to:  path.resolve(PATH_DIR.pub, 'images') }
      ])
    ]
  });
}

