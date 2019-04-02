"use strict";

module.exports = {
    dev: {
        publicPath: '/', //静态文件访问路径
        assetsPath: 'public/', //公有静态资源路径
        assetsBuild: 'dist' //压缩生产文件存储
    },
    build: {
        publicPath: './',
        assetsPath: 'public/',
        assetsBuild: 'dist'
    }
}