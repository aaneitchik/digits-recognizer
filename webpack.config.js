const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const PRODUCTION = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
	filename: 'styles.[contenthash].css',
	disable: !PRODUCTION
});

const commonPlugins = [
	new HTMLWebpackPlugin({
		template: 'index-template.ejs',
		inject: false,
		favicon: './client/assets/images/favicon.png'
	}),
	extractSass
];

const plugins = PRODUCTION
	? [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true
				},
				output: {
					comments: false
				},
				exclude: /mnist/
			}),
			...commonPlugins,
			// new BundleAnalyzerPlugin()
		]
	: [...commonPlugins];

module.exports = {
	entry: {
		mnist: './bower_components/mnist/dist/mnist.js',
		bundle: './client/src/index.jsx'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '',
		filename: '[name].[hash].js'
	},
	devtool: PRODUCTION ? false : 'source-map',
	plugins,
	module: {
		noParse: /mnist/,
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules|mnist/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
