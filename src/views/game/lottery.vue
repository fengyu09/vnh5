<template>
    <div class="lottery-container"></div>
</template>

<script>
    export default {
        name: "lottery"
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
</style>