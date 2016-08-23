// node environment
const env = process.env.npm_lifecycle_event;

const path = require('path'),
      webpack = require('webpack'),
      merge   = require('webpack-merge'),
      libPath = path.join(__dirname),
      srcPath = path.join(__dirname, 'src'),
      pubPath = path.join(__dirname, 'build'),
      bowPath = path.join(__dirname, 'bower_components'),
      nodPath = path.join(__dirname, 'node_modules');


//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

//3rd parties
const precss = require('precss'),
      autoprefixer = require('autoprefixer'),
      postcss = function () {
        return { default: [precss, autoprefixer]};
      };

const config = {
  entry: './src/app.js',
  output: {
    path: pubPath,
    publicPath: '/',
    filename: 'app.[id]-[hash].js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [ 'bower_components', 'node_modules', srcPath ]
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'stage-2', 'react'] }
      },
      {
        test: /\.jade$/,
        loader: 'raw!html!jade!pug'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['style','css', 'sass', 'postcss']
        })
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      }
    ]
  },
  sassLoader: {
    includePaths: [ bowPath, nodPath, path.resolve(srcPath, 'stylesheets') ]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: libPath,
      verbose: true,
      dry: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: 'styles.[id]-[name].css',
      allChunks: false
    }),
    new CopyWebpackPlugin([
      { from: path.join(srcPath, 'images'), to: path.join(pubPath, 'images') }
    ]),

  ]
};

const devConfig = {
  hot: true,
  contentBase: pubPath,
  outputPath: pubPath,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false
    }
  },
}

// TODO: image-loader or image min

if(env === 'start') {
  module.exports = merge(config, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if(env === 'dev') {
  module.exports = merge(config, {
    devServer: devConfig,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
