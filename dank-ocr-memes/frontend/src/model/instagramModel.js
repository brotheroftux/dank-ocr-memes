import postJSON from '@/util/postJSON'
import api from '@/util/api'

let postEntities = []

function provideData (query) {
    return postJSON(api.instagramSearchAPI, {
        tag: query
    })
        .then(response => response.json())
        .then(data => data.graphql.hashtag.edge_hashtag_to_media.edges)
        .then(edges => edges.map(edge => edge.node.display_url))
        .then(urls => postEntities = urls)
        .then(() => postEntities)
}

export default { postEntities, provideData }