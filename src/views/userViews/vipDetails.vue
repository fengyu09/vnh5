<template>
  <div class="vip-details">
     <header class="home-header clearfix">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>{{$t('vip.text[1]')}}</span>

    </header>
    <myScroll :top="1.18" :bottom="0" :data="playList" ref="scrollWrapper">
      <div class="vip-detail-img">
        <div class="bt-title">{{$t('vip.text[0]')}}</div>
        <div class="vip-fl">
      <!-- <img class="title-pic" src="../../assets/images/vipRanking/title1.png" alt=""> -->
      <img class="title-pic" src="../../assets/images/vipRanking/vipwelfare 1.png" alt="">
      <div class="title1">{{$t('vip.text[13]')}}</div>
     
      <ul class="level-list clearfix">
        <li  v-for="(vv,index1) in vipDetailList" :key="index1" @click="changeVip($event,index1)" :class="'level-'+(index1+1)">
         
        </li>
      </ul>
      <div class="vip-content">
        <table class="vip-tj"  border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th colspan="2">{{$t('vip.text[2]')}}</th>
        </tr>
        <tr>
          <td style="width: 50%">{{$t('vip.text[11]')}}</td>
          <!-- filterOnlineNum -->
          <td>{{$t('vip.text[3]')}}：<font style="color: red">{{CurrvipDetail.total_recharge }}</font> <br>
            -
            <br>
            {{$t('vip.text[4]')}}：<font style="color: red">{{CurrvipDetail.total_flow}}</font>
          </td>
        </tr>
        <tr>
          <td>{{$t('vip.text[5]')}}</td>
          <td>{{$t('vip.text[6]')}}：<font style="color: red">{{CurrvipDetail.rg_flow}}</font></td>
        </tr>
      </table>
      <table class="vip-jl" border="0" cellspacing="0" cellpadding="0">
          <tr>
          <th colspan="3">{{$t('vip.text[12]')}} </th>
        </tr>
        <tr>
          <td style="width: 50%;">{{$t('vip.text[7]')}}</td>
          <td v-if="CurrvipDetail.upgrade_bonus<=0"><img src="../../assets/images/vipRanking/cha.png" alt=""></td>
          <td v-else>{{CurrvipDetail.upgrade_bonus}}</td>
        </tr>
        <tr>
          <td>{{$t('vip.text[8]')}}</td>
          <td v-if="CurrvipDetail.birthday_gift<=0"><img src="../../assets/images/vipRanking/cha.png" alt=""></td>
          <td v-else>{{CurrvipDetail.birthday_gift}}</td>
        </tr>
        <!-- <tr>
          <td style="line-height: 0.3rem;">{{$t('vip.text[9]')}}</td>
          <td v-if="CurrvipDetail.month_hb<=0"><img width=".3rem" src="../../assets/images/vipRanking/cha.png" alt=""></td>
          <td v-else>{{CurrvipDetail.month_hb}}</td>
        </tr> -->
        <tr>
          <td>{{$t('vip.text[10]')}}</td>
          <td v-if="!CurrvipDetail.customer_service"><img src="../../assets/images/vipRanking/gou.png" alt=""></td>
          <td v-else><img src="../../assets/images/vipRanking/cha.png" alt=""></td>
        </tr>
      </table>
      <div class="gift-box">
       
        <ul  class="pic-list">
          <li v-for="(v,index) in giftList" :key="index">
           
            <div class="swiper-container" :id="'swiperBanner'+(index-0)" v-if="v.list.length >= 2">
              <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="(vv,index4) in v.list" :key="index4">
                  <div class="vip-gift-box"><img :src="vv.icon" alt=""></div>
                  <p class="text">{{vv.name}}</p>
                </div>
              </div>
            </div>
            <div class="swiper-container"  v-if="v.list.length <= 1">
              <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="(vv,index4) in v.list" :key="index4">
                  <div class="vip-gift-box"><img :src="vv.icon" alt=""></div>
                  <p class="text">{{vv.name}}</p>
                </div>
              </div>
              <div class="swiper-pagination"   style="bottom:17px"></div>
            </div>
            <p class="title">{{v.name}}</p>
          </li>
        </ul>
      </div>
     
      </div>
      <img class="lianjie" src="../../assets/images/vipRanking/lianjie.png" alt="">
    </div>
    <div class="vip-ts">
      <!-- <img class="title-pic" src="../../assets/images/vipRanking/title2.png" alt=""> -->
      <img class="title-pic" src="../../assets/images/vipRanking/Warmreminder22 1.png" alt="">
      <div class="title1">{{$t('vip.text[14]')}}</div>
      <ul>
        <li v-for="(v,index) in tip" :key="index">
          <span class="icon">{{index+1}}</span>
          <p>{{v}} </p>
        </li>
      </ul>
    </div>
      </div>
    
    </myScroll>
  </div>
</template>

<script>
import {removeAllactive,getSiblings} from '../../assets/js/public';
import swiper from "swiper";
export default {
  data(){
    return{
      CurrvipDetail:{},//当前vip数据
      vipDetailList:[],//'VIP列表数组
      tip:[],//温馨提示内容数组
      giftList:[],//会员专属礼包数组
      currVip:this.$store.state.userinfo.vip||0,//当前vip等级
      playList:{}
    }
  },
  created(){
      this.getVipDetail();
  },
  watch:{
    vipDetailList:function(){
      this.$nextTick(() => {
        document.querySelector('.level-list .level-'+(this.currVip==0?'1':this.currVip)).classList.add('active');
      });
    }
  },
  methods:{
    changeVip(e,index){
      let curr = e.currentTarget;
      removeAllactive(getSiblings(curr));
      curr.classList.add('active');
      this.CurrvipDetail = this.vipDetailList[index]; 
    },
    async getVipDetail(){
      let res = await this.$http.get('/api/common/viplist');
      if(res && res.data.code==1){
          this.CurrvipDetail = res.data.vip_list[this.currVip==0?0:this.currVip-1];
          this.vipDetailList = res.data.vip_list;
          this.tip = res.data.tips;
          this.giftList= res.data.gift_list;
           this.playList.giftList = this.giftList;
           this.playList.tip = this.tip;
            this.playList.vipDetailList = this.vipDetailList;
            this.playList.CurrvipDetail = this.CurrvipDetail;
           setTimeout(() => {
                this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
            }, 50);
          this.$nextTick(() => { // 下一个UI帧再初始化swiper
            this.initSwiper();  
          });
      }else{
          this.$vux.toast.text(res.data.msg, 'middle');
      }
    },
    initSwiper(){
      var mySwiper1 = new swiper("#swiperBanner0", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination0"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper1 = new swiper("#swiperBanner1", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination1"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper2 = new swiper("#swiperBanner2", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination2"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper3 = new swiper("#swiperBanner3", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination3"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper3 = new swiper("#swiperBanner4", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination4"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper3 = new swiper("#swiperBanner5", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination5"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      var mySwiper3 = new swiper("#swiperBanner6", {
        autoplay: {
          delay: 3000 // 5秒切换一次
        },
        loop: true, //循环
        autoplay:true,
        pagination: {
          el: "#bannerPagination6"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    }
  },
  mounted(){
   
  }

}
</script>

<style lang="less" scoped>
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.home-header {
        .rem(font-size,32);
        font-weight: 500;
        line-height: 1.2rem;
        color:#fff;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        z-index: 111111;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/white-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }
.vip-details{
  
  .home-header{
    background: #060606;
  }
  
  // background: url("../../assets/images/vipRanking/bj.png") top  no-repeat;
  
  // background-size: 100% 100%;
  // padding-top: 6rem;
  // padding-bottom: 1.5rem;
  .head-box {
    .rem(font-size, 32);
    line-height: 1.2rem;
    background: linear-gradient(0deg, #0A0A0A, #555555);
    overflow: hidden;
    color: #fff;
    .rem(margin-bottom,366);
    .infoHead {
      overflow: hidden;
      img {
        .rem(width, 23);
      }
      .head {
        height: 1.2rem;
        line-height: 1.2rem;
      }
    }
  }
  .vip-fl{
    .rem(width,680);
    // .rem(height,1731);
    
    background: url("../../assets/images/vipRanking/fl_bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto 0;
    position: relative;
    padding-bottom: .5rem;
    .title-pic{
      display: block;
      .rem(width,284);
      margin-left: 50%;
      transform: translate(-50%,-5%);
      padding-top: .3rem;
    }
    .level-list{
      .rem(padding-left,15);
      .rem(padding-bottom,26);
      // li{
      //   width: 25%;
      //   .rem(height,120);
      //   text-align: center;
      //   float: left;
      //   &.level-1{
      //     background: url("../../assets/images/vipRanking/1.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/1.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-2{
      //     background: url("../../assets/images/vipRanking/2.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/2.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-3{
      //     background: url("../../assets/images/vipRanking/3.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/3.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-4{
      //     background: url("../../assets/images/vipRanking/4.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/4.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-5{
      //     background: url("../../assets/images/vipRanking/5.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/5.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-6{
      //     background: url("../../assets/images/vipRanking/6.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/6.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-7{
      //     background: url("../../assets/images/vipRanking/7.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/7.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      //   &.level-8{
      //     background: url("../../assets/images/vipRanking/8.png") no-repeat center bottom ;
      //     background-size: 70%;
      //     &.active{
      //       background: url("../../assets/images/vipRanking/8.png") no-repeat;
      //       background-size: 100% 100%;
      //     }
      //   }
      // }
      li{
        width: 25%;
        .rem(height,120);
        text-align: center;
        float: left;
         &.level-1{
          background: url("../../assets/images/vipRanking/-s-xvip1@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
          height: 1.6rem;
            background: url("../../assets/images/vipRanking/1.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0rem;
          }
        }
        &.level-2{
          background: url("../../assets/images/vipRanking/-s-xvip2@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
            width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/2.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top:0rem;
          }
        }
        &.level-3{
          background: url("../../assets/images/vipRanking/-s-xvip3@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/3.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0rem;
          }
        }
        &.level-4{
          background: url("../../assets/images/vipRanking/-s-xvip4@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/4.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0rem;
          }
        }
        &.level-5{
          background: url("../../assets/images/vipRanking/-s-xvip5@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
            width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/5.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0rem;
          }
        }
        &.level-6{
          background: url("../../assets/images/vipRanking/-s-xvip6@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/6.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top:0rem;
          }
        }
        &.level-7{
          background: url("../../assets/images/vipRanking/-s-xvip7@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/7.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top:0rem;
          }
        }
        &.level-8{
          background: url("../../assets/images/vipRanking/-s-xvip8@2x.png") no-repeat center bottom ;
          background-size: 45%;
          &.active{
           width: 25%;
    height: 1.6rem;
            background: url("../../assets/images/vipRanking/8.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0rem;
          }
        }
        span{
          display: inline-block;
          width: 80%;
          height: 80%;
       
        }
      }
    }
    .vip-tj{
      .rem(width,640);
      .rem(height,242);
      .rem(font-size,24);
      color: #725431;
      // background: url("../../assets/images/vipRanking/tj.png") no-repeat top center;
      // background-size: 100% 100%;
      margin: 0 auto;
      // .rem(padding-top,60);
       border-radius: 10px;
       overflow: hidden;
       border-collapse:separate;
      th{
        background: linear-gradient(180deg, #D9A678 0%, #EDCBAA 100%);
        color:#fff;
        .rem(height,52);
        .rem(line-height,52);
        font-size: .4rem;
      }
      td{
        text-align: center;
        border: 1px solid #EFD08C;
        border-top: none;
        &:nth-child(1){
          border-right: none;
        }

      }
      tr{
        &:nth-last-child(1){
          td{
              &:nth-child(1){
                border-radius: 0 0 0 10px;
              }
              &:nth-child(2){
                border-radius: 0 0 10px 0;
              }
          }
        }
      }
    }
    .vip-jl{
      .rem(width,640);
      .rem(height,301);
      .rem(font-size,24);
      color: #725431;
      // background: url("../../assets/images/vipRanking/jl.png") no-repeat top center;
      // background-size: 100% 100%;
      margin: 0 auto;
      .rem(margin-top,39);
      border-radius: 10px;
      // .rem(padding-top,60);
      overflow: hidden;
      border-collapse:separate;
      th{
        background: linear-gradient(180deg, #D9A678 0%, #EDCBAA 100%);
        color:#fff;
        .rem(height,52);
        .rem(line-height,52);
        font-size: .4rem;
      }
      td{
        .rem(line-height,60);
        text-align: center;
        img{
          display: inline-block;
          .rem(width,15);
        }
        border: 1px solid #EFD08C;
        border-top: none;
        &:nth-child(1){
          border-right: none;
        }
      }
      tr{
        &:nth-last-child(1){
          td{
              &:nth-child(1){
                border-radius: 0 0 0 10px;
              }
              &:nth-child(2){
                border-radius: 0 0 10px 0;
              }
          }
        }
      }
      
    }
    .gift-box{
      overflow: hidden;
    }
    .pic-list{
      float: left;
      // .rem(padding-left,50);
      overflow: hidden;
      margin: .3rem 0;
      li{
        // .rem(width,288);
        width: 50%;
        float: left;
        margin-bottom: 0.3rem;
        position: relative;
        .text{
          width: 100%;
          .rem(font-size,24);
          color: #445779;
          text-align: center;
        }
        .title{
          font-family: 'PingFang-SC-Medium';
          .rem(font-size,24);
          color: #FF0000;
          text-align: center;
          .rem(margin-top,15);
        }
        .vip-gift-box{
          width: 50%;
          margin: 0 auto;
        }
      }
    }
    .lianjie{
      position: absolute;
      left: 0;
      .rem(bottom,-43);
      z-index: 1;
    }
  }
  .vip-ts{
    .rem(width,680);
    background: url("../../assets/images/vipRanking/ts_bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    .rem(margin-top,20);
    .rem(padding-top,42);
    .rem(padding-bottom,42);
    position: relative;
    .title-pic{
      display: block;
      .rem(width,355);
      margin-left: 50%;
      transform: translatex(-50%);
    }
    ul{
      .rem(padding-left,30);
      .rem(padding-right,30);
      li{
        .rem(font-size,24);
        color: #6C4820;
        .rem(margin-bottom,30);
        overflow: hidden;
        .icon{
          display: inline-block;
          .rem(width,25);
          .rem(height,25);
          .rem(line-height,25);
          .rem(font-size,18);
          color: #fff;
          text-align: center;
          background: linear-gradient(47deg, #FF9249, #FFC97B);
          border-radius: 50%;
          .rem(margin-right,10);
          .rem(margin-top,5);
          float: left;
        }
        p{
          .rem(width,584);
          float: left;
        }
      }
    }
  }
}
.vip-detail-img{
   background: url("../../assets/images/vipRanking/bj2.png") #000 top  no-repeat;
  background-size: 100% 100%;
  // padding-top: 5rem;
  padding-top: 5.3rem;
  padding-bottom: 1.5rem;
  min-height: 46rem;
  position: relative;
  .bt-title{
    position: absolute;
    color: #fff;
    z-index: 1;
    top: 3.2rem;
    left: 38%;
    width: 60%;
    font-size: 0.4rem;
    line-height: 0.6rem;

  }
}
.title1{
         color: #B97C22;
    font-size: 0.4rem;
    line-height: 0.5rem;
    -webkit-mask: -webkit-gradient(linear, right top, left top, from(#B97C22), to(transparent));
    -webkit-mask: linear-gradient(to left, #B97C22, transparent);
    position: relative;
    text-align: center;
        margin: 0.1rem 0;
       &:before{
           
          content: '';
          position: absolute;
          right:  20%;
          top: 7px;
          width: 1.2rem;
          height: 3px;
          /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
          background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0)));
          background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
          // -webkit-transform: matrix(-1, 0, 0, 1, 0, 0);
          // transform: matrix(-1, 0, 0, 1, 0, 0);
       }
       &:after{
         
          content: '';
          position: absolute;
          left: 20%;
          top: 7px;
          width: 1.2rem;
          height: 3px;
          /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
          background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0)));
          background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
          -webkit-transform: matrix(-1, 0, 0, 1, 0, 0);
          transform: matrix(-1, 0, 0, 1, 0, 0);
            //  content: '';
            // position: absolute;
            // left: 400px;
            // top: 23px;
            // width: 94px;
            // height: 4px;
            // /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
            // background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
            // transform: matrix(-1, 0, 0, 1, 0, 0);
       }
    }

</style>