<template>
  <div class="recruit-container">
    <header class="recruit-header other-header clearfix">
      <a class="back-icon" @click="$router.go(-1)" style=" z-index: 10000001;">
        <img src="../../assets/images/white-back-icon.png" alt="">
      </a>
      <span>主播招募</span>
    </header>
    <div class="recruit-content">
      <!--<p class="p-tip">如果您有意向，请准备好</p>-->
      <!--<p class="p-tip">简历照片和特长发送至我们的邮箱。</p>-->
      <div class="our-email">邮箱地址：legoulive@gmail.com</div>
      <p class="copy">此活动最终解释权归乐购传媒所有</p>
    </div>
  </div>
</template>

<script>
//import myScroll from "../../components/myScroll.vue";
export default {
  name: "recruit",
//  components: { myScroll },

  mounted() {
//    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
//    this.$refs.scrollWrapper.enable(); //启动滚动条
//    this.$refs.scrollWrapper.disable(); //禁止滚动条
  }
};
</script>

<style scoped lang="less">
  .recruit-container{
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/hostAd-min.jpg") no-repeat center;
    background-size: 100% 100%;
.back-icon{
  height: 1.2rem;
  width: 1rem;
  text-align: left;
  img{
    width: 35%;

  }
}
    .recruit-content{
      position: absolute;
      bottom: 1.25rem;
      width: 100%;
      /*text-align: center;*/
      .p-tip{
        font-size: .32rem;
        color: #2b1295;
        font-weight: bold;
        line-height: .45rem;
      }
      .our-email{
        font-size: .43rem;
        color: #f2d8ff;
        /*background: #543ac0;*/
        border-radius: 50px;
        padding: .1rem .5rem;
        display: inline-block;
        margin: .25rem 0 .2rem 0;
      }
      .copy{
        text-align: center;
        font-size: .36rem;
        color: #ffff00;
        font-weight: 500;
        margin-top: 1.2rem;
      }
    }
  }
  @media screen and(min-width: 414px) {
    .recruit-container .recruit-content{
      bottom: .8rem;
    }
  }
</style>