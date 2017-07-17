const webpackConstant = require('./webpack.constant');
const path = require('path');
const webpack = require('webpack');
const ProvidePlugin = webpack.ProvidePlugin;
const DllReferencePlugin = webpack.DllReferencePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
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
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, webpackConstant.SrcPublicJsPath, 'webpack-dll'),
                to: path.join(__dirname, webpackConstant.OutputPath, webpackConstant.OutputPublicJsPath, 'webpack-dll')
            }
        ]),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.resolve('./src/index.html'),
            favicon: path.resolve('./src/favicon_16X16.ico'),
            inject: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                path.join(webpackConstant.OutputPublicJsPath, 'webpack-dll', 'vendor.dll.js'),
                // 如果有第三方css的话，可以继续加入 ↓
                // path.join(webpackConstant.OutputPublicCssPath, 'some/path/of/vendor/*.css')
            ],
            files: ['index.html'],
            append: false,
            hash: true
        }),
        new CommonsChunkPlugin({
            name: ['commons', 'manifest'],
            filename: '[name].commons.[hash].js',
            children: true,
            /*
            You can not specify a filename if you use the "async" option.
            当你使用async选项是不能指定filename。
            
            async: true
            */
        })
    ]
};