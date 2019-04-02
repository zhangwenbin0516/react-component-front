"use strict";

const path = require('path');
const config = require('../config');


module.exports = {
    entry: {
        app: path.join(__dirname, '..', 'src/app.jsx'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
        alias: {
            'src': path.resolve(__dirname, '..', 'src'),
            'assets': path.resolve(__dirname, '..', 'src/assets'),
            'page': path.resolve(__dirname, '..', 'src/components'),
            'themes': path.resolve(__dirname, '..', 'src/themes'),
            'ui': path.resolve(__dirname, '..', 'src/UI')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
}