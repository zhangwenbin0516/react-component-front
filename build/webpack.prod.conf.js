"use strict";

const path = require('path');
const utils = require('./utils');
const WebpackBaseConf = require('./webpack.base.conf');
const config = require('../config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = utils.merge(WebpackBaseConf, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '..', config.build.assetsBuild),
        filename: config.build.assetsPath + "js/[name].[Hash:5].js",
        publicPath: config.build.publicPath
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include: /src/,
                use: [
                    {
                        loader: utils.miniCss.loader
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
                            name: '[name].[Hash:6].[ext]',
                            limit: 8192,
                            outputPath: config.build.assetsPath + 'images/'
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
                            name: 'font/[name].[Hash:6].[ext]',
                            outputPath: config.build.assetsPath + 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new utils.clean({
            root: path.join(__dirname, '..', config.build.assetsBuild)
        }),
        new utils.render({
            template: path.join(__dirname, '..', 'index.html'),
            filename: "index.html",
            publicPath: config.build.publicPath,
            favicon: utils.favicon
        }),
        new utils.miniCss({
            filename: config.build.assetsPath + 'css/[name].[Hash:6].css',
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin()
    ]
});