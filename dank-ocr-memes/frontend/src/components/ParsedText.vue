<template>
    <pre>{{ text }}</pre>
</template>

<script>
import noindent from '@/util/noindentTag'
import postJSON from '@/util/postJSON'

import api from '@/util/api'

const defaultText = 'Images not found in tweet.'

export default {
    props: ['imageUrls'],
    data: function () {
        return {
            text: defaultText,
        }
    },
    watch: {
        imageUrls: function () {
            const textPromises = this.imageUrls.map(this.parseImageBlob)

            Promise.all(textPromises)
            .then(values => values.join('\n'))
            .then(text => this.text = text.length ? text : defaultText)
        }
    },
    methods: {
        parseImageBlob: function (url) {
            this.text = 'Image(s) found, parsing...'

            return new Promise((resolve, reject) => {
                postJSON(api.parseAPI, { url })
                .then(response => response.json())
                .then(({ result }) => resolve(result))
                .catch(error => reject(error))
            })
        }
    }
}
</script>

<style lang='sass' scoped>
    @import '~@/global-styles/vars.sass'

    pre
        min-height: $parsed-min-height
        width: 100%
        padding: $parsed-padding

        border-radius: $parsed-border-radius
        background-color: $parsed-background

        font-family: $parsed-font
</style>
