<template>
  <div class="Notescontact">
    <!-- <div class="tit clearfix">
      <a @click="$router.go(-1)">
        
         
      </a>
      <h3>liên hệ với dịch vụ khách hàng</h3>
    </div> -->
    <div class="head">
      <div @click="$router.push('/withdrawalTopUp/1')" class="back-icon" style=" z-index: 10000001;">
         <img style="width: 0.25rem; z-index: 10000001;" src="../../assets/images/gray-back-icon.png" alt="">
      </div>
      <div class="headZl">在线充值</div>
    </div>
    <div v-html="src"></div>
    <myScroll :bottom="0" id="Notescontact" ref="scrollWrapper">
      <iframe v-if="urls" :src="urls" id="myiframe" scrolling="no" frameborder="0"></iframe>
    </myScroll>
  </div>
</template>

<script>
//import { XHeader } from "vux";
import myScroll from "../../components/myScroll.vue";
export default {
  name: "rechargePage",
  data(){
    return{
      src:"",
      type:'',
      urls:''
    }
  },
  created(){
//    this.$vux.loading.show();
//    console.log(this.$route.params.url)
    this.src = this.$route.params.url;
    this.urls = this.$route.params.urls;
//    this.type = this.$route.params.type;
//    if(this.type=='ali'){
//      window.location.href = this.src;
//    }
  },
  components: { myScroll },
  mounted(){
//    console.log(document.querySelector('#Notescontact div .content').clientHeight)
//    if(document.querySelector('#Notescontact div .content').clientHeight>100){
//      this.$vux.loading.hide();
//    }
//    document.body.addEventListener(
//      "touchmove",
//      function(e) {
//        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
//      },
//      { passive: false }
//    );
    this.$refs.scrollWrapper.refresh()  //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.enable()  //启动滚动条
    this.$refs.scrollWrapper.disable()  //禁止滚动条
  }
};
</script>

<style scoped lang="less">
.Notescontact {
  color: #445779;
  font-family: PingFang-SC-Medium !important;
  // font-size: .3rem;
  letter-spacing: 2px;
  h2 {
    font-weight: 600;
  }
  .num {
    border-bottom: 1px solid #f5f5f5;
    padding: 4.6% 5.4% 4.6% 5%;
    font-size: 0.4rem;
    
    .text {
      color: #999999;
      letter-spacing: 0px;
    }
  }
}

#myiframe {
  width: 100%;
  height: 100%;
}

  .head {
  width: 100%;
  height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;

  /* border-bottom: solid 1px #ccc; */
}
  .headZl{
    font-size: .45rem;
    font-weight: bold;
  }
.head div.back-icon {
  /*float: left;*/
  position: absolute;
  left: 0;
  top:0;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  /* line-height: 4em  */
}
.head div.back-icon img{
  /*margin-top: .4rem;*/
}
</style>
