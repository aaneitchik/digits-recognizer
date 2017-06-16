const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
	hot: true,
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	stats: {
		color: true
	},
	historyApiFallback: true
});

server.listen(3000, 'localhost', () => {});
