<template>
    <div>
         <flexbox class="infoHead">
          <flexbox-item :span="1/10"><div @click="$router.go(-1)" class="flex-demo" style="padding-top: 0.7em; z-index: 10000001;"><img src="../../assets/images/gray-back-icon.png" alt=""></div></flexbox-item>
          <flexbox-item ><div class="flex-demo  tickling">Nhận xét</div></flexbox-item>
          <flexbox-item :span="1/10"><div class="flex-demo"></div></flexbox-item>
      </flexbox>
      <div style="height:5rem;text-align: center;padding:.5rem 0" v-html="htmlURl"></div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                htmlURl:''
            }
        },
        created(){
          this.htmlURl=localStorage.getItem('bodyHtml')
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