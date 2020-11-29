const SizePlugin = require('size-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var glob = require("glob");

module.exports = {
	devtool: 'source-map',
    stats: 'errors-only',
	entry: {
        background: glob.sync('./src/background/*.js'),
        //options: glob.sync('./src/options/*.js'),
        index: './src/index.js'
    },
	output: {
		path: path.join(__dirname, './dist'),
        filename: '[name].js'
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: 'src',
                    filter: (path) => !path.endsWith('.js')
                },
                {
                    from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js'
                }
            ]
        })
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
                    compress: false,
                    /*
					output: {
						beautify: true,
						indent_level: 2 // eslint-disable-line camelcase
                    }
                    */
				}
			})
		]
	}
};