var Webpack = require('Webpack')
var path = require('path')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var buildPath = path.resolve(__dirname, 'public', 'build')
var mainPath = path.resolve(__dirname, 'app', 'main.js')

var config = {
	devTool: 'eval',
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		mainPath
	],
	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',								
				exclude: [nodeModulesPath]
			},
 			{ 
 				test: /\.css$/, 
 				loader: "style!css"
 			},
			// **IMPORTANT** This is needed so that each bootstrap js file required by
			// bootstrap-webpack has access to the jQuery object
			{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },			

			// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{ test: /\.woff(2)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }

		]
	},
	plugins: [new Webpack.HotModuleReplacementPlugin(),
				new Webpack.ProvidePlugin({
					$: "jquery",
					jQuery: "jquery"
				})
    ]
};

module.exports = config;