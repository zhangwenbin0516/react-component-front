"use strict";

const path = require('path');
const utils = require('./utils');
const WebpackBaseConf = require('./webpack.base.conf');
const config = require('../config');
const Webpack = require('webpack');

module.exports = utils.merge(WebpackBaseConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '..', config.dev.assetsBuild),
        inline: true,
        host: 'exvideo.zbgedu.com',
        port: '3500',
        historyApiFallback: true,
        progress: true,
        proxy: {
            '/api/': {
                target: 'https://apiDemo.zbgedu.com',
                changeOrigin: true,
                secure: false
            },
            '/video/': {
                target: 'https://exvideo.zbgedu.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/video/': '/'
                }
            }
        }
    },
    output: {
        path: path.join(__dirname, '..', config.dev.assetsBuild),
        filename: config.dev.assetsPath + "js/[name].js",
        publicPath: config.dev.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                include: /src/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: /src/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 8192,
                            outputPath: config.dev.assetsPath + 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'font/[name].[ext]',
                            outputPath: config.dev.assetsPath + 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new utils.clean({
            root: path.join(__dirname, '..', config.dev.assetsBuild)
        }),
        new Webpack.NamedModulesPlugin(),
        new Webpack.HotModuleReplacementPlugin({
            multiple: true
        }),
        new utils.render({
            template: path.join(__dirname, '..', 'index.html'),
            filename: "index.html",
            publicPath: config.dev.publicPath,
            favicon: utils.favicon
        }),
        new utils.miniCss({
            filename: config.build.assetsPath + 'css/[name].css',
            chunkFilename: '[id].css'
        }),
    ]
})