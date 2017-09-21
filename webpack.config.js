module.exports = {
	context: __dirname + "/src/js",
	entry: __dirname + '/src/js/app.js',
	output: {
		path: __dirname + '/dist', 
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env']
			}
		}]
	}
}