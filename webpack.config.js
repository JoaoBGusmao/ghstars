const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname + "/src/",
	entry: __dirname + '/src/js/app.js',
	output: {
		path: __dirname + '/dist', 
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					use: ['css-loader','sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css"),
	]
}