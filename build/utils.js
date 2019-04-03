const path = require('path')

module.exports = {
    favicon: path.resolve(__dirname, '..', 'src/assets/images/icon-evnling.png'),
    merge: require('webpack-merge'),
    clean: require('clean-webpack-plugin'),
    miniCss: require('mini-css-extract-plugin'),
    render: require('html-webpack-plugin')
}