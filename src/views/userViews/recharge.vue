<template>
  <div v-html="htmlString"></div>
</template>

<script>
export default {
  name: 'recharge',
    data(){
      return{
          htmlString:localStorage.getItem('bodyHtml')
      }
    }
}
</script>

<style scoped lang="less">

</style>
