const webpack = require('webpack')
const util = require('./util')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const productionConfig = {
    module: {
        rules: util.styleLoaders({
            extract: true,
            minimize: true,
            sourceMap: true
        })
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin('styles.css'),
    ]
}

if (process.argv.includes('--env.analyze')) {
    productionConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        })
    )
}

module.exports = productionConfig