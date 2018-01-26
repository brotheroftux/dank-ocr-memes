import postJSON from '@/util/postJSON'
import api from '@/util/api'

let postEntities = []

function provideData (query) {
    return postJSON(api.twitterSearchAPI, {
        q: `${query} filter:images`,
        count: 100
    })
        .then(response => response.json())
        .then(data => data.statuses)
        .then(statuses => statuses.map(currentStatus => {
            if (currentStatus && currentStatus.entities.media) {
                const { media: iterable } = currentStatus.extended_entities
                    || currentStatus.entities
                return iterable.map(media => media.media_url)
            } else {
                return []
            }
        }))
        .then(mappedStatuses => postEntities = mappedStatuses)
        .then(() => postEntities)
}

export default { postEntities, provideData }