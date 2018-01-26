const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfiguration = require('./webpack.dev.config')
const prodConfiguration = require('./webpack.prod.config')
const vueLoaderConfiguration = require('./vue-loader.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfiguration = {
    entry: {
        app: '../src/main.js',
        vendor: ['vue']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: resolve('build')
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js',
            'querystring$': 'querystring-browser'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfiguration
            },

            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            inject: 'body',
            template: '../index.html',
            chunks: ['vendor', 'app']
        })
    ]
}

module.exports = merge(baseConfiguration, (process.argv.includes('--env.prod')
    ? prodConfiguration 
    : devConfiguration))