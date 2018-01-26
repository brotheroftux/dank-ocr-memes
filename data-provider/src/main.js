const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twit')
const request = require('request-promise-native')

const { twitter: twitterConfig, 
        instagram: instagramConfig } = require('./instantiated/config')
const tagHack = 'https://www.instagram.com/explore/tags'

const app = express()
const twitterClient = new Twitter(twitterConfig)

function promisifyTwitterSearch (q) {
    return new Promise((resolve, reject) => {
        twitterClient.get('search/tweets', q, (error, tweets) => {
            if (error) reject(error)
            else resolve(tweets)
        })
    })
}

app.use(bodyParser.json())

app.post('/twitter-search', async (req, res) => {
    const query = req.body

    const tweets = await promisifyTwitterSearch(query)

    console.log(tweets)

    res.send(tweets)
})

app.post('/instagram-search', async (req, res) => {
    const tag = req.body.tag

    const jsonData = await request(`${tagHack}/${encodeURIComponent(tag)}/?__a=1`)

    res.send(jsonData)
})

app.listen(7334)