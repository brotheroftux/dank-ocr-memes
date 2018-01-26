<template>
    <div id='app-container'>
        <SearchBox @search='searchTweets'/>
        <div class='main-wrapper'>
            <Navigation type='back' @back='back' />
            <ImageView :imageUrls='imageUrls' />
            <Navigation type='forward' @forward='forward' />
        </div>
        <ParsedText :imageUrls='imageUrls' />
    </div>
</template>

<script>
import ImageView from '@/components/ImageView.vue'
import SearchBox from '@/components/SearchBox.vue'
import Navigation from '@/components/Navigation.vue'
import ParsedText from '@/components/ParsedText.vue'

import generateTweetUrl from '@/util/generateTweetUrl'
import twitterModel from '@/model/twitterModel'
import instagramModel from '@/model/instagramModel'

export default {
    data: function () {
        return {
            model: instagramModel,
            postEntities: [],
            idx: 0
        }
    },
    computed: {
        imageUrls: function () {
            const urlObject = this.postEntities[this.idx]

            if (Array.isArray(urlObject))
                return urlObject
            else
                return [ urlObject ] || undefined
        },
    },
    methods: {
        searchTweets: function (query) {
            this.idx = 0

            this.model.provideData(query)
                .then(entities => this.postEntities = entities)
        },
        back: function () {
            if (this.idx)
                this.idx--
        },
        forward: function () {
            if (this.idx < (this.postEntities.length - 1))
                this.idx++
        }
    },
    components: {
        ImageView,
        SearchBox,
        Navigation,
        ParsedText
    }
}
</script>

<style lang='sass' scoped>
    @import '~@/global-styles/vars.sass'

    #app-container
        max-width: $app-container-width

        margin: auto
        padding: $app-container-padding

        display: flex
        align-items: center
        flex-direction: column
    
    .main-wrapper
        display: flex
        justify-content: center
        align-items: center

        width: 100%
</style>
