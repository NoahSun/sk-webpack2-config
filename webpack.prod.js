const webpackConstant = require('./webpack.constant');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCommon = require('./webpack.base');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-plugin-manifest');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HashedModuleIdsPlugin = webpack.HashedModuleIdsPlugin;

module.exports = webpackMerge(WebpackCommon, {
    output: {
        publicPath: webpackConstant.ProdPublicPath
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: path.join(__dirname, 'tsconfig.json')
                        }
                    }
                ]
            },
            {
                test: /\.html?$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/**'], {
            root: __dirname,
            verbose: true,
            dry: false,
            watch: true
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ManifestPlugin(),
        new HashedModuleIdsPlugin(),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new ExtractTextPlugin({
            filename: path.join(webpackConstant.OutputPublicCssPath, '[name].css')
        }),
        new UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true,
                unsafe: true
            },
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            comments: false
        })
    ]
});