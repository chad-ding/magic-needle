const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');
const common = require('./common');

const distDir = path.join(__dirname, '../dist');
common.clearDir(distDir);

const config = merge(baseConfig, {
	mode: 'development',
	devtool: 'source-map'
});

const compiler = webpack(config);

compiler.watch({
	aggregateTimeout: 2000,
	poll: 1000,
	ignored: /node_modules/
}, (err, stat) => {
	if (err) {
		console.error(chalk.red(err));
	} else {
		console.info(chalk.cyan(stat.toString({
			chunks: false,
			colors: true
		})));
	}
});
