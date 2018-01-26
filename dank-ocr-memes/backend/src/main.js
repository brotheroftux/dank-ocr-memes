const express = require('express')
const path = require('path')
const proxy = require('express-http-proxy')

const STATIC_SERVE_DIR = path.resolve(__dirname, '../../', 'frontend/build')

const app = express()

const parserServiceProxy = proxy('image-parser:7335', {
    proxyReqPathResolver: () => '/parse-url'
})
const twitterDataProviderServiceProxy = proxy('data-provider:7334', {
    proxyReqPathResolver: () => '/twitter-search'
})
const instagramDataProviderServiceProxy = proxy('data-provider:7334', {
    proxyReqPathResolver: () => '/instagram-search'
})

app.use(express.static(STATIC_SERVE_DIR))

app.use('/parse-image', parserServiceProxy)
app.use('/fetch-tweets', twitterDataProviderServiceProxy)
app.use('/fetch-edges', instagramDataProviderServiceProxy)

app.listen(8080)