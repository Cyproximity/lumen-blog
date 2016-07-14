const path = require("path"),
			webpack = require("webpack"),
			libPath = path.join(__dirname, 'src');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	}, 
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.jade$/, loader: "jade" },
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(libPath, 'index.html'),
			filename: 'index.html',
		}),
	]
}

// console.log(path, webpack);