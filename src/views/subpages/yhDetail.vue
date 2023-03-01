<template>
    <div class="yhDetail">
    <div class="header" :class="$st.state.skin==5?'goldenHeader':''">
      <div @click="$router.go(-1)" style="padding: 0.1rem 0.2rem;margin-left: -0.2rem;">
        <i class="go-back"></i>
      </div>
      <div>
        <h3 v-if="$st.state.defalutLan=='vi-vn'">Chi tiết khuyến mãi</h3>
        <h3 v-else>Promotion details</h3>
      </div>
    </div>
     <myScroll
      ref="scrollWrapper"
      :probeType="2"
      :top="1.2"
      :left="0"
      :bottom="0"
      :bgColor="$st.state.skin==5?'1F252C':'f7f7f7'"
    >
    <div>
      <div v-html="detailContent.content"></div>
    </div>
     </myScroll>
    </div>
</template>
<script>
import myScroll from "../../components/myScroll.vue";
export default {
    name:'yhDetail',
    data(){
      return{
        detailContent:''
      }
    },
     components:{
        myScroll,
    },
    created(){
     this.detailContent=JSON.parse(window.localStorage.getItem('yhDetail'))
    }
}
</script>
<style lang="less" >
.yhDetail{
    .header {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.346rem;
    .go-back {
      display: block;
      width: 0.26rem;
      height: 0.48rem;
      background: url("../../assets/images/gray-back-icon.png") no-repeat;
      background-size: cover;
    }
    h3 {
      font-weight: 550;
      font-size: 0.45rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>