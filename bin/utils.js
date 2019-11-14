"use strict";

module.exports = {
    path: require('path'),
    fs: require('fs'),
    webpack: require('webpack'),
    merge: require('webpack-merge'),
    dev: {
        host: 'localhost',
        port: '4300',
        publicPath: '/',
        filePath: 'public/',
        buildPath: 'dist',
        proxy: {
            '/bank/': {
                target: 'http://apitikudemo.zbgedu.com',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/bank/': '/'
                }
            },
        }
    },
    prod: {
        publicPath: '/',
        filePath: 'public/',
        buildPath: 'tiku.zbgedu.com-v',
        proxy: {
            '/bank/': {
                target: 'http://apitikudemo.zbgedu.com',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/bank/': '/'
                }
            },
        }
    }
}
