"use strict";

const path = require('path');
const WebpackMerge = require('webpack-merge');
const WebpackBaseConf = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const CleanPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = WebpackMerge(WebpackBaseConf, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '..', config.build.assetsBuild),
        filename: config.build.assetsPath + "js/[name].[Hash:5].js",
        publicPath: config.build.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include: /src/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
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
        new CleanPlugin({
            root: path.join(__dirname, '..', config.build.assetsBuild)
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '..', 'index.html'),
            filename: "index.html",
            publicPath: config.build.publicPath
        }),
        new MiniCssExtractPlugin({
            filename: config.build.assetsPath + 'css/[name].[Hash:6].css',
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin()
    ]
});