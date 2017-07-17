const webpackConstant = require('./webpack.constant');
const WebpackMerge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const DefinePlugin = webpack.DefinePlugin;

const WebpackCommon = require('./webpack.base');

module.exports = WebpackMerge(WebpackCommon, {
    devServer: {
        contentBase: [path.join(__dirname, webpackConstant.OutputPath)],
        compress: true,
        https: true,
        host: '0.0.0.0',
        port: 8080,
        hot: true, //启用热替换时必须加上new webpack.HotModuleReplacementPlugin()
        historyApiFallback: {
            rewrites: [
                { from: /./, to: 'dist/404.html' }
            ]
        },
        proxy: {
            "/api": {
                target: "",
                secure: false,
                pathRewrite: {
                    "^/api": ""
                },
                bypass: (req, res, proxyOptions) => {
                    // 在函数中你可以访问请求体、响应体和代理选项。必须返回 false 或路径，来跳过代理请求。
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browser request.");
                        return "/index.html";
                    }
                }
            }
        },
        stats: {
            assets: true,
            colors: true,
            errors: true,
            errorDetails: true,
            performance: true,
            // reasons: true, //模块被引入的原因
            timings: true,
            warnings: true,
        },
        // stats预置指令
        // "errors-only" //只在发生错误时输出
        // "minimal" // 只在发生错误 或是 新的编译时输出
        // "none" // 没有输出
        // "normal" // 标准输出
        // "detailed" // 详细输出（从 webpack 3.0.0 开始）
        // "verbose" // 全部输出
        watchContentBase: true,
        watchOptions: {
            aggregateTimeout: 1000,
            poll: 1000,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
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
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
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
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': '"develop"'
            }
        }),
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // devtool: 'source-map'
    // cheap-module-eval-source-map能在Chrome/Firefox中显示源代码文件
    devtool: 'cheap-module-eval-source-map'
});