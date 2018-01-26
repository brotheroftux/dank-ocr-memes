const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options = {}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: options.minimize,
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders (loader, loaderOptions) {
        let loaders = [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: loaderOptions
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        js: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    }
}

exports.styleLoaders = function (options) {
    let output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }

    return output
}