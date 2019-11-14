"use strict";
const utils = require('./utils');
const BaseConfig = require('./webpack.base.conf');

module.exports = utils.merge(BaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: utils.path.join(__dirname, '..', utils.dev.buildPath),
        filePath: utils.dev.filePath + 'js/[name].[Hash:9].js',
        publicPath: utils.dev.publicPath,
    }
})
