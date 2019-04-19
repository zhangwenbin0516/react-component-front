"use strict";

const utils = require('./utils');
const WebpackBaseConf = require('./webpack.base.conf');
const Webpack = require('webpack');

module.exports = utils.merge(WebpackBaseConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: utils.path.join(__dirname, '..', utils.dev.assetsBuild),
        inline: true,
        host: 'localhost',
        port: '3500',
        historyApiFallback: true,
        progress: true,
        open: true,
        proxy: {
            '/api/': {
                target: 'https://api.zbgedu.com',
                changeOrigin: true,
                secure: false
            },
            '/apiDemo/': {
                target: 'https://apiDemo.zbgedu.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/apiDemo/': '/api/'
                }
            }
        }
    },
    output: {
        path: utils.path.join(__dirname, '..', utils.dev.assetsBuild),
        filename: utils.dev.assetsPath + "js/[name].js",
        publicPath: utils.dev.publicPath
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
                            outputPath: utils.dev.assetsPath + 'images/'
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
                            outputPath: utils.dev.assetsPath + 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new utils.clean({
            root: utils.path.join(__dirname, '..', utils.dev.assetsBuild)
        }),
        new Webpack.NamedModulesPlugin(),
        new Webpack.HotModuleReplacementPlugin({
            multiple: true
        }),
        new utils.render({
            template: utils.path.join(__dirname, '..', 'index.html'),
            filename: "index.html",
            publicPath: utils.dev.publicPath,
            favicon: utils.favicon
        }),
        new utils.miniCss({
            filename: utils.build.assetsPath + 'css/[name].css',
            chunkFilename: '[id].css'
        }),
    ]
})
