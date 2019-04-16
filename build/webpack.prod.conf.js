"use strict";

const utils = require('./utils');
const WebpackBaseConf = require('./webpack.base.conf');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = utils.merge(WebpackBaseConf, {
    mode: 'production',
    output: {
        path: utils.path.join(__dirname, '..', utils.build.assetsBuild),
        filename: utils.build.assetsPath + "js/[name].[Hash:5].js",
        publicPath: utils.build.publicPath
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
                            outputPath: utils.build.assetsPath + 'images/'
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
                            outputPath: utils.build.assetsPath + 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new utils.clean({
            root: utils.path.join(__dirname, '..', utils.build.assetsBuild)
        }),
        new utils.render({
            template: utils.path.join(__dirname, '..', 'index.html'),
            filename: "index.html",
            publicPath: utils.build.publicPath,
            favicon: utils.favicon
        }),
        new utils.miniCss({
            filename: utils.build.assetsPath + 'css/[name].[Hash:6].css',
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCssAssetsPlugin()
    ]
});