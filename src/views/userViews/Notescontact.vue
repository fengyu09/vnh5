<template>
  <div class="Notescontact">
    <!-- <div class="tit clearfix">
      <a @click="$router.go(-1)">
        
         
      </a>
      <h3>liên hệ với dịch vụ khách hàng</h3>
    </div> -->
    <div class="head">
      <div @click="$router.go(-1)" class="back-icon">
         <img style="width: 0.25rem; z-index: 10000001;" src="../../assets/images/gray-back-icon.png" alt="">
      </div>
      <div class="headZl">liên hệ với dịch vụ khách hàng</div>
    </div>
    <myScroll :bottom="0" id="Notescontact">
      <iframe :src="src" id="myiframe" scrolling="no" frameborder="0"></iframe>
    </myScroll>
    <!-- <div class="num clearfix">
      <span class="fl">联系电话</span>
      <span class="text fr">0513-45204763</span>
    </div>
    <div class="num clearfix">
      <span class="fl">QQ</span>
      <span class="text fr">82114785</span>
    </div>
    <div class="num clearfix">
      <span class="fl">微信</span>
      <span class="text fr">4742114545</span>
    </div> -->
  </div>
</template>

<script>
//import { XHeader } from "vux";
import myScroll from "../../components/myScroll.vue";
export default {
  name: "Notescontact",
  data(){
    return{
      src:"https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97"
    }
  },
  components: {
//    XHeader,
    myScroll }
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
   z-index: 10000001;
  /* line-height: 4em  */
}
.head div.back-icon img{
  margin-top: .4rem;
}
</style>
