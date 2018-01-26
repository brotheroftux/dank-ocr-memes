<template>
    <div class='searchbox-container'>
        <input placeholder='#hashtag or @user' v-model='searchData' @keyup.enter='emitSearch' />
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            searchData: ''
        }
    },
    methods: {
        emitSearch: function () {
            this.$emit('search', this.searchData)
        }
    }
}
</script>

<style lang='sass' scoped>
    @import '~@/global-styles/vars.sass'

    .searchbox-container

    input
        border-style: none
        text-align: center
        font-size: $searchbox-font-size

    input:focus
        outline: none
</style>

