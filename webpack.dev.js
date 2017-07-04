const WebpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const DefinePlugin = webpack.DefinePlugin;

const WebpackCommon = require('./webpack.base');

module.exports = WebpackMerge(WebpackCommon, {
    devServer: {

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
        new CheckerPlugin()
    ],
    // devtool: 'source-map'
    // cheap-module-eval-source-map能在Chrome/Firefox中显示源代码文件
    devtool: 'cheap-module-eval-source-map'
});