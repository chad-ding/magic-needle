const path = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'mn.js'
	},
	devtool: 'source-map',
	target: 'node',
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.tsx?$/, use: ['ts-loader'] }
		]
	}
};