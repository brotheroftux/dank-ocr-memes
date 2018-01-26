const util = require('./util')
const isProduction = process.argv.includes('--env.prod')

module.exports =  {
    loaders: util.cssLoaders({
        minimize: isProduction,
        sourceMap: isProduction,
        extract: true
    })
}