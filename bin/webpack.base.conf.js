"use strict";
const utils = require('./utils');
module.exports = {
    entry: [
        utils.path.join(__dirname, '..', 'src/app.js')
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.css', '.scss'],
        alias: {
            src: utils.path.join(__dirname, '..', 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.t(s|sx)$/,
                include: /src/,
                use: ['ts-loader']
            }
        ]
    }
}
