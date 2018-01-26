<template>
    <div class='navigation' @click='emitNavigation'>
        {{ content }}
    </div>
</template>

<script>
export default {
    props: ['type'],
    computed: {
        content: function () {
            return this.type === 'back' ? '<' : '>'
        }
    },
    methods: {
        emitNavigation () {
            if (this.type === 'back')
                this.$emit('back')
            else
                this.$emit('forward')
        }
    }
}
</script>

<style lang='sass' scoped>
    @import '~@/global-styles/vars.sass'

    .navigation
        font-size: $navigation-font-size
        font-weight: $navigation-font-weight
        color: $navigation-font-color

        padding: $navigation-padding
        margin: 0 $navigation-margin-sides
        
        height: 100%
    
    .navigation:hover
        background-color: $navigation-hover-background
</style>
