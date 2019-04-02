"use strict";

const path = require('path');
const config = require('../config');


module.exports = {
    entry: {
        app: path.join(__dirname, '..', 'src/app.js'),
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
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-withimg-loader']
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