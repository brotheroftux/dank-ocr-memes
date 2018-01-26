const parser = require('./parser')
const upscaler = require('./upscaler')

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request-promise-native')

async function parse (buffer, scaleFactor = 3) {
    const grayscale = await upscaler.upscale(buffer, scaleFactor)
    const result = await parser.parse(grayscale)

    return result
}

module.exports.init = function init () {
    const app = express()

    // MARK: Middleware

    app.use('/parse-blob', bodyParser.raw())
    app.use('/parse-url', bodyParser.json())

    // MARK: Routes

    app.post('/parse-blob', async (req, res) => {
        const image = new Buffer(req.body)

        const result = await parse(image)

        res.send({ result })
    })

    app.post('/parse-url', async (req, res) => {
        const url = req.body.url
        const factor = req.body.factor || 2

        const imageData = await request({
            url,
            encoding: null
        })

        const result = await parse(imageData, factor)

        res.send({ result })
    })

    app.listen(7335)
}
