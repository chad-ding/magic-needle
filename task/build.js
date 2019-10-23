const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');

const config = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js'
	},
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