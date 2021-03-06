const webpackConstant = require('./webpack.constant');
const path = require('path');
const webpack = require('webpack');
const ProvidePlugin = webpack.ProvidePlugin;
const DllReferencePlugin = webpack.DllReferencePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;

module.exports = {
    entry: {
        index: './src/app/index.ts',
        splittingCode: './src/app/splitting_code/index.js'
    },
    output: {
        filename: '[name].bundle.[hash].js',
        chunkFilename: '[name].bundle.[hash].js', //如果没有chunkname，代码分割的时候默认为[id]+filename命名格式
        library: '[name]',
        libraryTarget: 'umd' // 'amd' | 'commonjs' | 'umd'
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'] //引入模块时不写后缀，编译时后在此数组中遍历查找相应后缀的文件
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
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