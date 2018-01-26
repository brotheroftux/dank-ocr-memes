import config from '@/instantiated/config'

import querystring from 'querystring'
import hmacsha1 from 'hmacsha1'

const twitter = config.twitter

function generateNonce (length) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.random() * possible.length | 0)
    }
    return text
}

function generateSigningKey (consumerSecret, accessTokenSecret) {
    return `${consumerSecret}&${accessTokenSecret}`
}

function generateParameterString (query) {
    const queryParameters = []
    for (let key in query) {
        queryParameters.push({
            key,
            value: query[key]
        })
    }

    const lexicographicSort = (a, b) => a.key.localeCompare(b.key)

    queryParameters.sort(lexicographicSort)
    
    let parameterString = ''

    for (let pair of queryParameters)
        parameterString += `${pair.key}=${querystring.escape(pair.value)}&`

    return parameterString.slice(0, -1)
}

export default function signRequest (requestUrl, query, method = 'GET') {
    query.oauth_consumer_key = twitter.consumerKey
    query.oauth_token = twitter.accessToken
    query.oauth_timestamp = Date.now() / 1000 | 0
    query.oauth_nonce = generateNonce(32)
    query.oauth_signature_method = 'HMAC-SHA1'
    query.oauth_version = '1.0'

    const escapedUrl = querystring.escape(requestUrl)
    const parameterString = querystring.escape(generateParameterString(query))

    const signatureBaseString = `${method}&${escapedUrl}&${parameterString}`
    const signingKey = generateSigningKey(twitter.consumerSecret, twitter.accessTokenSecret)

    query.oauth_signature = hmacsha1(signingKey, signatureBaseString)

    return query
}