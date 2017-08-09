const webpackContant = require('./webpack.constant');
const path = require('path');
const webpack = require('webpack');
const DllPlugin = webpack.DllPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

/**
 * VENDORS: 类库提供者
 */
const VENDORS = [
    // 'jquery/dist/jquery.slim.min.js',   //去除了ajax模块
    'jquery/dist/jquery.min.js',
    'tslib', //typescript的辅助库，会自动使用tslib.es6.js
    // 'tslib/tslib.js' //兼容低版本浏览器
];

module.exports = {
    entry: {
        vendor: VENDORS
    },
    output: {
        path: path.join(__dirname, webpackContant.SrcPublicJsPath, 'webpack-dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new DllPlugin({
            path: path.join(__dirname, webpackContant.SrcPublicJsPath, 'webpack-dll', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new UglifyJsPlugin({
            compress: {
                warnings: true,
                drop_console: true,
                unsafe: true
            },
            comments: false,
            beautify: false
        })
    ]
}