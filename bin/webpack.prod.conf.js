"use strict";
const rmdir = require('rmdir');
const utils = require('./utils');
const BaseConfig = require('./webpack.base.conf');
const date = new Date();
let arr = [date.getFullYear()];
arr[1] = date.getMonth() + 1;
arr[1] = arr[1] < 10 ? '0' + arr[1] : arr[1];
arr[2] = date.getDate();
arr[2] = arr[2] < 10 ? '0' + arr[2] : arr[2];
let times = [date.getHours()];
times[0] = times[0] < 10 ? '0' + times[0] : times[0];
times[1] = date.getMinutes();
times[1] = times[1] < 10 ? '0' + times[1] : times[1];
const filePath = utils.path.join(__dirname, '..', './')
let files = utils.fs.readdirSync(filePath);
let isFile = utils.prod.filePath + arr.join('.') + '-' + times.join('.');
files.filter((item) => {
    if (item.match(utils.prod.filePath)) {
        rmdir(utils.path.join(__dirname, '..', item), function(err, dirs, files) {});
        rmdir(utils.path.join(__dirname, '..', item + '.zip'), function(err, dirs, files) {});
    }
})

module.exports = utils.merge(BaseConfig, {
    mode: "production",
    devtool: 'source-map',
    output: {
        filename: utils.prod.filePath + 'js/[name].[Hash:9].js',
        path: utils.path.join(__dirname, '..', utils.prod.buildPath),
        publicPath: utils.prod.publicPath
    }
})
