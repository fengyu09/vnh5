<template>
  <div class="virtualTopUp" >
     <header class="home-header clearfix">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>{{$route.meta.title}}</span>
    </header>
    <myScroll :top="1.2" class="gd" ref="scrollWrapper" :bottom="0">
       <img src="../../../assets/images/\rechargeTutorial/ljxnb.png" alt="">
       <div class="xn-content">
         <router-link to='rechargeTtorial?type=1'>Hướng dẫn mua tiền kỹ thuật số</router-link>
        <ul>
          <li @click="goUrl(1)">
            <img src="../../../assets/images/\rechargeTutorial/bh.png" alt="">
          </li>
          <li @click="goUrl(2)">
            <img src="../../../assets/images/\rechargeTutorial/hb.png" alt="">
          </li>
          <li @click="goUrl(3)">
            <img src="../../../assets/images/\rechargeTutorial/ba.png" alt="">
          </li>
        </ul>
        <p>*Bạn cũng có thể chọn các nền tảng giao dịch tiền kỹ thuật số khác để mua và bán các loại tiền kỹ thuật số</p>
       </div>
    </myScroll>



  </div>
</template>

<script>
import {
//  Checker,
//  CheckerItem,
//  Divider,
//  XDialog,
//  XTable,
  Confirm} from 'vux'
import myScroll from '../../../components/myScroll.vue'
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "virtualTopUp",
  components:{
    Confirm,
    myScroll},
  data:function(){
    return{

    }
  },
  created() {
      
  },
  mounted() {
      setTimeout(() => {
                this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
       }, 20);

  },

  methods: {

      navigate:function (index) {
            this.navIndex = index;
        },
      goUrl(n){
        let url=''
        if(n==1){
            url = 'https://www.coinhui.net/';
        }else if(n==2){
            url = 'https://www.huobi.com/zh-cn/';
        }else if(n==3){
            url = 'https://www.binance.com/zh-CN';
        }
        location.href = url;
    }
        

  },
};
</script>

<style  lang="less">
.rem(@name,@px){
  @{name}:unit(@px/75,rem)
}
.home-header {
    .rem(font-size,32);
    font-weight: 500;
    line-height: 1.2rem;
    // color:#fff;
    // position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 111111;
    background: #fff;
    font-weight: bold;
    .back-icon{
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        z-index: 2000001;
        left: .3rem;
        background: url("../../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }
}
.gd{
  .go-shuzi{
    position: absolute;
    bottom: 14.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 0.8rem;
    // background: red;
    z-index: 100;
  }
}
.xn-content{
  text-align: center;
  a{
    color: #448aff;
    font-weight: bold;
    padding: .2rem 0;
    display: inline-block;
  }
  ul{
    overflow: hidden;
    li{
      // display: inline-block;
      width: 50%;
      float: left;
    }
  }
  p{
    color: #ff3131;
    font-weight: 500;
    text-align: left;
    padding: .3rem .2rem;
  }
}



</style>
