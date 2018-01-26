const headers = {
    'Content-Type': 'application/json'
}

export default function postJSON (url, body) {
    const json = JSON.stringify(body)
    return fetch(url, {
        method: 'POST',
        headers,
        body: json
    })
}