module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js'
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
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	}
};