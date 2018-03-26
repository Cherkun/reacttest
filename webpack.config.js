const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */
var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: true
});
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index',

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

    devServer: {
        port: 3000,
        historyApiFallback: true,
    },

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015', 'env', 'react']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: [
				    'style-loader',
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
                    {
                        loader: 'sass-loader',

                        options: {
                            sourceMap: true
                        }
                    }
				]
			}
		]
	},

	plugins: [
	    new UglifyJSPlugin(),
        devFlagPlugin
    ]

};
