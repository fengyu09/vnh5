<template>
    <div>
        <myScroll :bottom="0" id="con" :top="0">
            <iframe :src="src" id="myiframe" scrolling="no" frameborder="0"></iframe>
        </myScroll>
        <!-- <iframe :src="src" id="myiframe" scrolling="no" frameborder="0"></iframe> -->
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                src:''
            }
        },
        created(){
          this.src = localStorage.getItem('rUrl')
          // console.log(this.src)
        },
        methods: {
          
        },
    }
</script>

<style scoped lang="less">
#myiframe {
  width: 100%;
  height: 100%;
//   position: absolute;
}
#con {
  div {
    .content {
      height: 100% !important;
    }
  }
}
</style>