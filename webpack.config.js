const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: './src/script.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[hash][ext][query]'
	},
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    liveReload: true,
    watchFiles: ['./dist/*', './src/index.html'],
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
        {
            test: /\.(ico|svg|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, 
            "css-loader", 
            { loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader'],
        },
    ],
},
};