import querystring from 'querystring'

import signTwitterRequest from '@/util/signRequest'
import fetchJsonp from 'fetch-jsonp'

const searchAPI = 'https://api.twitter.com/1.1/search/tweets.json'

function generateCallbackName () {
    return `__callback_${Date.now()}`
}

export default function twitterSearch (options) {
    const callback = generateCallbackName()
    options.callback = callback

    const signedOptions = signTwitterRequest(searchAPI, options)
    delete signedOptions.callback

    const signedRequestUrl = `${searchAPI}?${querystring.stringify(signedOptions)}`

    return new Promise((resolve, reject) => {
        fetchJsonp(signedRequestUrl, {
            jsonpCallbackFunction: callback
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    })
}