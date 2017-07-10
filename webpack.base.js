const webpackConstant = require('./webpack.constant');
const path = require('path');
const webpack = require('webpack');
const ProvidePlugin = webpack.ProvidePlugin;
const DllReferencePlugin = webpack.DllReferencePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;

module.exports = {
    entry: {
        index: './src/app/index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'public/fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: 'public/images/[name].[ext]',
                            limit: 1000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, webpackConstant.SrcPublicJsPath, 'webpack-dll', 'vendor-manifest.json'))
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.resolve('./src/index.html'),
            favicon: path.resolve('./src/favicon_16X16.ico')
        }),
        new CommonsChunkPlugin({
            name: ['commons', 'manifest'],
            filename: '[name].commons.js',
            // children: true,
            // async: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, webpackConstant.SrcPublicJsPath, 'webpack-dll'),
                to: path.join(__dirname, webpackConstant.OutputPath, webpackConstant.OutputPublicJsPath, 'webpack-dll')
            }
        ])
    ]
};