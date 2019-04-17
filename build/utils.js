const path = require('path')

module.exports = {
    favicon: path.resolve(__dirname, '..', 'src/assets/images/facicon.png'),
    path: require('path'),
    merge: require('webpack-merge'),
    clean: require('clean-webpack-plugin'),
    miniCss: require('mini-css-extract-plugin'),
    render: require('html-webpack-plugin'),
    dev: {
        publicPath: '/', //静态文件访问路径
        assetsPath: 'public/', //公有静态资源路径
        assetsBuild: 'dist', //压缩生产文件存储
    },
    build: {
        publicPath: '/',
        assetsPath: 'public/',
        assetsBuild: 'dist'
    }
}
