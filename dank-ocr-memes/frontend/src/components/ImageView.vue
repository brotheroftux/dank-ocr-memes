<template>
    <div class='image-box'>
        <img v-for='(url, index) in imageUrls' :src='url' :key='index'>
    </div>
</template>

<script>

export default {
    props: ['imageUrls']
}
</script>

<style lang='sass' scoped>
    @import '~@/global-styles/vars.sass'

    .image-box
        display: flex
        flex-direction: column
        align-items: center
        max-width: 100%

    .image-box img
        width: 100%
</style>

