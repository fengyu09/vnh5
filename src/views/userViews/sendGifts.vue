<template>
 <!-- <div class="bg_big"> -->
  <div class="sendGifts">
    <x-header
      style="background-color:transparent;z-index: 9;color:#000"
      :left-options="{showBack: false}"
    >
      <span style="color: #fff">充值送豪礼</span>
      <i class="black-back"></i>
      <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
    </x-header>
    <div class="contern">
      <div class="cont">
        <img src="../../assets/images/member/sendGifts_rule.png" alt="">
      </div>
      <div class="rule">
        <p>1.银行卡充值送0.5%</p>
        <p>2.此活动最终解释权归乐购娱乐直播所有</p>
      </div>
      <router-link to="/withdrawalTopUp/1">
        <div class="btn">去充值</div>
      </router-link>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
//import { XHeader } from "vux";
export default {
  name: "sendGifts",
//  components: { XHeader }
};
</script>

<style scoped lang="less">
.sendGifts {
  background: url("../../assets/images/member/sendGifts.png") no-repeat center;
    background-size: 100% 100%;
    position: fixed;
    width: 100%;
    height: 100%;
}
.contern{
    // padding-top: 8.67rem;
    // padding-bottom: 1.561rem;
    // width: 81.33%;
    // margin: auto;
    width: 81.33%;
    // margin: auto;
    position: absolute;
    bottom: 1.561rem;
    left: 50%;
    transform: translateX(-50%);
}
.cont{
    width: 57%;
    margin: auto;
}
.rule{
    background-color: #feeac3;
    color: #e9914a;
    font-size: 0.38rem;
    border-radius: 6px;
    overflow: hidden;
    padding-top: 0.61rem;
    padding-bottom: 0.41rem;
    margin-top: 0.485rem;
    margin-bottom: 1.067rem;
    // margin-left: 4.6%;
    p{
        margin-left: 4.6%;
        margin-bottom: 0.314rem;
    }
}
.black-back {
  display: block;
  width: 12px;
  height: 20px;
  position: absolute;
  background: #ccc;
  top: 12px;
  left: 12px;
  background: url("../../assets/images/withdrawals/baise_fanhui.png") no-repeat;
  background-size: 100% 100%;
}
.btn{
    background: #ff282b;
    // padding: 0.5rem 0.5rem;
    width: 100%;
    text-align: center;
    line-height: 1.2rem;
    color: #fff;
    border-radius: 30px;
    font-size: 0.4rem;
    
}
// .bg_big{
//     // background: url('../../assets/images/member/sendGifts_bg.png') repeat bottom;
//     // background-size: contain;
//     // padding-bottom: 100rem;
//     background: url("../../assets/images/member/sendGifts.png") no-repeat;
//     background-size: cover;
// }
</style>
