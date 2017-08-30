const webpackConstant = require('./webpack.constant');
const WebpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;
const NamedModulesPlugin = webpack.NamedModulesPlugin;

const WebpackCommon = require('./webpack.base');

module.exports = WebpackMerge(WebpackCommon, {
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
                            useBabel: false,
                            useCache: false,    //使用babel时打开可减少编译时间
                            babelCore: undefined,   //babel-core不在node_modules中时设置，undefined时默认在node_modules中查找babel-core
                            configFileName: path.join(__dirname, 'tsconfig.dev.json')
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
                            minimize: false
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
        new CleanWebpackPlugin(['dist/**', 'declaration/**'], {
            root: __dirname,
            verbose: true,
            dry: false,
            watch: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, webpackConstant.SrcPublicJsPath, 'webpack-dll'),
                to: path.join(__dirname, webpackConstant.OutputDistPath, webpackConstant.OutputPublicJsPath, 'webpack-dll')
            }
        ]),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: path.join(webpackConstant.OutputPublicCssPath, '[name].[hash].css')
        }),
        // new UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: true,
        //         screw_ie8: true,
        //         unsafe: true
        //     },
        //     beautify: true,
        //     mangle: {
        //         screw_ie8: true,
        //         keep_fnames: true
        //     },
        //     comments: false
        // })
    ],
    devtool: 'cheap-module-eval-source-map'
});