"use strict";

const utils = require('./utils');


module.exports = {
    entry: {
        app: utils.path.join(__dirname, '..', 'src/app.jsx'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
        alias: {
            'src': utils.path.resolve(__dirname, '..', 'src'),
            'assets': utils.path.resolve(__dirname, '..', 'src/assets'),
            'page': utils.path.resolve(__dirname, '..', 'src/components'),
            'themes': utils.path.resolve(__dirname, '..', 'src/themes'),
            'router': utils.path.resolve(__dirname, '..', 'src/router'),
            'ui': utils.path.resolve(__dirname, '..', 'src/UI')
        }
    },
    externals: {
       'Aliplayer': 'aliplayer-min'
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
