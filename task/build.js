const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');
const common = require('./common');

const distDir = path.join(__dirname, '../dist');
common.clearDir(distDir);

const config = merge(baseConfig, {
	mode: 'production',
	devtool: 'none'
});

const compiler = webpack(config);

compiler.run((err, stat) => {
	if (err) {
		console.error(chalk.red(err));
	} else {
		console.info(chalk.cyan(stat.toString({
			chunks: false,
			colors: true
		})));
	}
});
