<template>
  <div class="main-footer">
    <ul>
      <li @click="getClick('首页')"  :class="'padNone'+skin">
        <router-link to="/">
          <i v-if="skin==0" class="icon icon-home icon-home-active"></i>
          <i v-if="skin==1" class="icon home-pink"></i>
          <i v-if="skin==2" class="icon home-blue"></i>
          <i v-if="skin==3" class="icon home-green"></i>
          <p class="active-p">{{$t('home.footer[0]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('直播')" :class="'padNone'+skin" v-if="lanCode!=2">
        <router-link to="/live" >
          <i v-if="skin==0" class="icon icon-kj icon-kj-active"></i>
          <i v-if="skin==1" class="icon live-pink"></i>
          <i v-if="skin==2" class="icon live-blue"></i>
          <i v-if="skin==3" class="icon live-green"></i>
         
          <p  class="active-p">{{$t('home.footer[1]')}}</p>

        </router-link>
      </li>
         <li @click="getClick('优惠')" :class="'padNone'+skin" >
        <router-link to="/Activities" >
          <i v-if="skin==0" class="icon icon-Discount icon-Discount-active"></i>
          <i v-if="skin==1" class="icon yh-pink"></i>
          <i v-if="skin==2" class="icon yh-blue"></i>
          <i v-if="skin==3" class="icon yh-green"></i>
         
          <p  class="active-p">{{$t('home.footer[2]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('客服')" :class="'padNone'+skin">
        <router-link to="/service" >
          <i v-if="skin==0" class="icon icon-guess icon-guess-active"></i>
          <i v-if="skin==1" class="icon kf-pink"></i>
          <i v-if="skin==2" class="icon kf-blue"></i>
          <i v-if="skin==3" class="icon kf-green"></i>
        
          <p  class="active-p">{{$t('home.footer[3]')}}</p>
        </router-link>
      </li>
     
      <li @click="getClick('我的')" :class="'padNone'+skin">
        <router-link to="/member" >
          <i v-if="skin==0" class="icon icon-member icon-member-active"></i>
          <i v-if="skin==1" class="icon user-pink"></i>
          <i v-if="skin==2" class="icon user-blue"></i>
          <i v-if="skin==3" class="icon user-green"></i>
         
          <p  class="active-p">{{$t('home.footer[4]')}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getClickTimes } from '../assets/js/public'
import { mapState } from "vuex";
export default {
  name: "foot",
  data() {
    return {
      bet:'',
      gameBox:false,
      chessArr:''
    };
  },
  computed: {
    ...mapState(["skin","isBb","lanCode"])
  },
  created() {
  },
  watch:{
    $route:function () {
      // console.log(this.$route.path)
    }
  },
  methods: {
    getClick(type){
      getClickTimes(type);
    },
    alertLL(url, title) {
      android.show(url, title);
    },

  },
  mounted() {}
};
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
.main-footer {
  max-width: 750px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 1.4rem;
  bottom: 0;
  z-index: 100;
  box-shadow: 0px -2px 5px #f5f5f5;
  background: #fff;
  overflow-x: hidden;
  ul{
     overflow: hidden;
     li{
        overflow: hidden;
     }
  }
  &.main-footer-dw{
    height: 1.7rem!important;
  }
  .lottery-tip {
    position: absolute;
    color: #fff;
    font-size: 0.3rem;
    font-weight: 500;
    text-align: center;
    // background: url("../assets/images/lottery-tip.png") no-repeat center;
    background-size: contain!important;
    width: 41%;
    height: 0.8rem;
    line-height: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2.1rem;
    &.lottery-tip-dw{
      background: url("../assets/images/dw/tis_bj_5_27_3.png") no-repeat center ;
    }
    &.lottery-tip-qrj{
      background: url("../assets/images/ValentineDay/670-min.png") no-repeat center ;
    }
    &.lottery-tip-pt{
      background: url("../assets/images/lottery-tip.png") no-repeat center;
    }
    p {
      padding: 0 0.2rem;
    }
    i {
      float: right;
      display: inline-block;
      width: 0.4rem;
      height: 0.7rem;
      background: url("../assets/images/remove.png") no-repeat center;
      background-size: 60%;
    }
  }
  .game-Box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    >span{
      display: block;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.54rem;
      // text-align: center;
      // padding-top: 0.5rem;
      img{
        width: 0.935rem;
      }
    }
  }
  .gameBox{
    position: fixed;
    // height:5rem;
    .rem(height,432);
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    border-radius: 10px 10px 0 0;
    // >span{
    //   display: block;
    //   text-align: center;
    //   padding-top: 0.5rem;
    //   img{
    //     width: 0.5rem;
    //   }
    // }
    >div{
      width: 50%;
      text-align: center;
      margin-top: 0.935rem;
      p{
        padding-top: 0.2rem;
        color: #445779;
        .rem(font-size,24);
        font-weight: bold;
      }
      img{
        width: 52%;
      }
    }
  }
  ul {
    overflow: hidden;
    display: flex;
    > li {
      flex: 1;
      float: left;
      
      text-align: center;
      overflow: hidden;
      
      &.padNone{
        padding-top: 0!important;

      }
      &.padNone0,&.padNone{
        a.router-link-exact-active{
          .active-p{
            color: #1486FF;
          }
        }
        
      }
      &.padNone1{
        p{
          color: #888;
        }
        a.router-link-exact-active{
          .active-p{
            color: #FB796B;
          }
        }
        
        
      }
       &.padNone2{
        p{
          color: #888;
        }
         a.router-link-exact-active{
           .active-p{
          color: #0CB6D9;
        }
         }
        
        
      }
       &.padNone3{
        p{
          color: #888;
        }
        a.router-link-exact-active{
          .active-p{
          color: #0B9B71;
        }
        }
        
        
      }
      > a {
        display: block;
        .rem(font-size,20);
        padding: 0.2rem 0;
        p {
          font-weight: bold;
        }
        > .icon {
          display: inline-block;
          width: 0.54rem;
          height: 0.54rem;
          //  background: url("../assets/images/icon.png");
        }
        .icon-home {
          // width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/home.png) no-repeat;
            background-size: cover;
        }
        .home{
          width: 0.8rem;
          height: 0.8rem;
          background: url("../assets/images/newyear/home.png") no-repeat center;
          background-size: 120% 120%;
        }
        .icon-kj {
          // width: 0.74rem;
          // height: 0.64rem;
          // background-position: 0 1.15rem;
          // background-size: 1.3rem;
          background: url(../assets/images/newfooter/zb.png) no-repeat;
             background-size: cover;
        }
        // .icon-kj-cj {
        //   width: 0.74rem;
        //   height: 0.64rem;
        //   // background-position: 0 1.15rem;
        //   // background-size: 1.3rem;
        //   background: url(../assets/images/newfooter/game.png) no-repeat;
        //      background-size: contain;
        // }
        // .kj{
        // width: 0.8rem;
        //   height: 0.8rem;
        //   background: url("../assets/images/newyear/kj.png") no-repeat center;
        //   background-size: 120% 120%;
        // }
        .icon-tz {
          position: absolute;
          top: -0.6rem;
          left: 50%;
          transform: translateX(-50%);
          width: 2rem;
          height: 2rem;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0px -4px 5px #f5f5f5;
          img {
            // content: "";
            position: absolute;
            width: 1.35rem;
            height: 1.35rem;
            // background: url("../assets/images/buy-icon.png") center no-repeat;
            // background-size: 100% 100%;
            top: 0.25rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 11;
          }
          &:after {
            content: "";
            position: absolute;
            width: 2.5rem;
            height: 1.4rem;
            background: #fff;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
          }
        }
        .home-pink{
          background:  url(../assets/images/skin/pink/home.png) no-repeat;
          background-size:  contain;
        }
         .home-blue{
          background:  url(../assets/images/skin/blue/home.png) no-repeat;
          background-size:  contain;
        }
         .home-green{
          background:  url(../assets/images/skin/green/home.png) no-repeat;
          background-size:  contain;
        }
        .live-pink{
          background:  url(../assets/images/skin/pink/live.png) no-repeat;
          background-size:  contain;
        }
        .live-blue{
          background:  url(../assets/images/skin/blue/live.png) no-repeat;
          background-size:  contain;
        }
        .live-green{
          background:  url(../assets/images/skin/green/live.png) no-repeat;
          background-size:  contain;
        }
        .yh-pink{
           background:  url(../assets/images/skin/pink/hd.png) no-repeat;
          background-size:  contain;
        }
        .yh-blue{
           background:  url(../assets/images/skin/blue/hd.png) no-repeat;
          background-size:  contain;
        }
          .yh-green{
           background:  url(../assets/images/skin/green/hd.png) no-repeat;
          background-size:  contain;
        }
        .kf-pink{
          background:  url(../assets/images/skin/pink/kf.png) no-repeat;
          background-size:  contain;
        }
        .kf-blue{
          background:  url(../assets/images/skin/blue/kf.png) no-repeat;
          background-size:  contain;
        }
        .kf-green{
          background:  url(../assets/images/skin/green/kf.png) no-repeat;
          background-size:  contain;
        }
        .user-pink{
          background:  url(../assets/images/skin/pink/user.png) no-repeat;
          background-size:  contain;
        }
         .user-blue{
          background:  url(../assets/images/skin/blue/user.png) no-repeat;
          background-size:  contain;
        }
         .user-green{
          background:  url(../assets/images/skin/green/user.png) no-repeat;
          background-size:  contain;
        }






        .icon-guess {
          //  width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/kf.png) no-repeat;
            background-size: cover;
        }
        // .icon-guess-cj {
        //    width: 0.74rem;
        //   height: 0.64rem;
        //   background: url(../assets/images/newfooter/kj.png) no-repeat;
        //     background-size:  contain;
        // }
        .icon-Discount {
          // width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/yh.png) no-repeat;
            background-size: cover;
        }
        // .guess{
        //  width: 0.8rem;
        //   height: 0.8rem;
        //   background: url("../assets/images/newyear/jc.png") no-repeat center;
        //  background-size: 120% 120%;
        // }
        // .dw-icon{
        //   width: 0.933rem;
        //   height: 0.933rem;
        // }
        // .gq-icon{
        //   .rem(width,60);
        //   .rem(height,60);
        // }
        // .guess-dw{ 
        //   background: url("../assets/images/dw/jie.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .member-dw{
        //   background: url("../assets/images/dw/wod_5_25_a.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-dw{
        //   background: url("../assets/images/dw/sou_yeu_5_27_a.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-dw{
        //   background: url("../assets/images/dw/kaij_5_27_a.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .Discount-dw{
        //   background: url("../assets/images/dw/yh5.png") no-repeat center;
        //   background-size: 100% 100%;
        // }

        // .guess-qrj{ 
        //   background: url("../assets/images/ValentineDay/jie.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-qrj{
        //   background: url("../assets/images/ValentineDay/2.png") no-repeat center;
        //   // background: url("../assets/images/ValentineDay/xi-min.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-qrj{
        //   background: url("../assets/images/ValentineDay/1.png") no-repeat center;
        //   // background: url("../assets/images/ValentineDay/7-min.png") no-repeat center;
        //   background-size: 100% 100%;
        // }

        // .Discount-qrj{
        //   background: url("../assets/images/ValentineDay/4.png") no-repeat center;
        //   // background: url("../assets/images/ValentineDay/yh3.png") no-repeat center;
        //   background-size: 100% 100%;
        // }

        // .member-qrj{
        //   background: url("../assets/images/ValentineDay/5.png") no-repeat center;
        //   // background: url("../assets/images/ValentineDay/l-min.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-gq{
        //   background: url("../assets/images/National Day/g.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-gq{ 
        //   background: url("../assets/images/National Day/q.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .guess-gq{
        //   background: url("../assets/images/National Day/q.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .member-gq{
        //   background: url("../assets/images/National Day/qiu.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .Discount-gq{
        //   background: url("../assets/images/National Day/zhong.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-ox{
        //   background: url("../assets/images/oxYear/home.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-ox{ 
        //   background: url("../assets/images/oxYear/game.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .guess-ox{
        //   background: url("../assets/images/oxYear/kj.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .member-ox{
        //   background: url("../assets/images/oxYear/mine.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .Discount-ox{
        //   background: url("../assets/images/oxYear/yh7.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-uefa{
        //   background: url("../assets/images/UEFA/sy.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-uefa{ 
        //   background: url("../assets/images/UEFA/yx.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .guess-uefa{
        //   background: url("../assets/images/UEFA/kj.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .member-uefa{
        //   background: url("../assets/images/UEFA/wd.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .Discount-uefa{
        //   background: url("../assets/images/UEFA/yh.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .home-sdj{
        //   background: url("../assets/images/Christmas/home.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .kj-sdj{ 
        //   background: url("../assets/images/Christmas/game.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .guess-sdj{
        //   background: url("../assets/images/Christmas/oppnkj.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .Discount-sdj{
        //   background: url("../assets/images/Christmas/yh6.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        // .member-sdj{
        //   background: url("../assets/images/Christmas/merber.png") no-repeat center;
        //   background-size: 100% 100%;
        // }
        .icon-member {
          //  width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/wd.png) no-repeat;
            background-size: cover;
        }
        .member{  
          width: 0.8rem;
          height: 0.8rem;
          background: url("../assets/images/newyear/wd.png") no-repeat center;
          background-size: 120% 120%;
        }
 
        &.router-link-exact-active{
          .home-pink{
            background: url(../assets/images/skin/pink/home_on.png) no-repeat;
            background-size: contain;
          }
          .home-blue{
            background: url(../assets/images/skin/blue/home_on.png) no-repeat;
            background-size: contain;
          }
          .home-green{
            background: url(../assets/images/skin/green/home_on.png) no-repeat;
            background-size: contain;
          }
          .live-pink{
            background: url(../assets/images/skin/pink/live_on.png) no-repeat;
            background-size: contain;
          }
          .live-blue{
            background: url(../assets/images/skin/blue/live_on.png) no-repeat;
            background-size: contain;
          }
          .live-green{
            background: url(../assets/images/skin/green/live_on.png) no-repeat;
            background-size: contain;
          }
          .yh-pink{
            background: url(../assets/images/skin/pink/hd_on.png) no-repeat;
            background-size: contain;
          }
          .yh-blue{
            background: url(../assets/images/skin/blue/hd_on.png) no-repeat;
            background-size: contain;
          }
          .yh-green{
            background: url(../assets/images/skin/green/hd_on.png) no-repeat;
            background-size: contain;
          }
           .kf-pink{
            background: url(../assets/images/skin/pink/kf_on.png) no-repeat;
            background-size: contain;
          }
           .kf-blue{
            background: url(../assets/images/skin/blue/kf_on.png) no-repeat;
            background-size: contain;
          }
            .kf-green{
            background: url(../assets/images/skin/green/kf_on.png) no-repeat;
            background-size: contain;
          }
           .user-pink{
            background: url(../assets/images/skin/pink/user_on.png) no-repeat;
            background-size: contain;
          }
          .user-blue{
            background: url(../assets/images/skin/blue/user_on.png) no-repeat;
            background-size: contain;
          }
          .user-green{
            background: url(../assets/images/skin/green/user_on.png) no-repeat;
            background-size: contain;
          }
          
          // .active-p{
          //   color: #1486FF;
          // }
          // .active-dw{
          //   color: #8EB917!important;
          // }
          // .active-qrj{
          //   color: #7E26F2!important;
          // }
          // .active-gq{
          //   color: #e99c00!important;
          // }
          // .active-sdj{
          //   color: #94EFFF!important;
          // }
          // .active-ox{
          //   color: #EE3C1A!important;
          // }
          // .active-uefa{
          //   color: #5284FF!important;
          // }
          .icon-home-active {
            // width: 0.74rem;
            // height: 0.64rem;
            // background-position: 0 -0.6rem;
            // background-size: 1.35rem;
            background: url(../assets/images/newfooter/home_on.png) no-repeat;
            background-size: cover;

          }
          .home-active{
           width: 0.8rem;
           height: 0.8rem;
            background: url("../assets/images/newyear/home2.png") no-repeat center;
            background-size: 128% 138%;
            position: relative;
            // top: -0.3rem;
          }
          // .home-active-uefa{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/UEFA/sy-hover.png") no-repeat center;
          //   background-size: 100% 100%;
          // }
          // .kj-active-uefa{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/UEFA/yx-hover.png") no-repeat center;
          //   background-size: 100% 100%;
          // }
          // .guess-active-uefa{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/UEFA/kj-hover.png") no-repeat center;
          //   background-size: 100% 100%;
          // }
          // .member-active-uefa{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/UEFA/wd-hover.png") no-repeat center;
          //   background-size: 100% 100%;
          // }
          // .Discount-active-uefa{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/UEFA/yh-hover.png") no-repeat center;
          //   background-size: 100% 100%;
          // }
          .icon-kj-active {
            // width: 0.74rem;
            // height: 0.64rem;
            // background-position: 0 0.55rem;
            // background-size: 1.35rem;
            background: url(../assets/images/newfooter/zb_on.png) no-repeat;;
             background-size: cover;
          }
          // .icon-kj-active-cj {
          //   width: 0.74rem;
          //   height: 0.64rem;
          //   // background-position: 0 0.55rem;
          //   // background-size: 1.35rem;
          //   background: url('../assets/images/newfooter/game_on.png') no-repeat;;
          //    background-size: contain;
          // }
          // .kj-active{
          //  width: 0.8rem;
          //   height: 0.8rem;
          //   background: url("../assets/images/newyear/kj2.png") no-repeat center;
          //    background-size: 128% 138%;
          //   position: relative;
          //   // top: -0.3rem;
          // }
          /*.icon-tz-active{*/
          /*background: url("../assets/images/main/tz_xz@3x.png") no-repeat;*/
          /*background-size: contain;*/
          /*}*/
          .icon-guess-active {
            // width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/kf_on.png) no-repeat;
            background-size: cover;
          }
          // .icon-guess-active-cj {
          //   width: 0.74rem;
          // height: 0.64rem;
          // background: url(../assets/images/newfooter/kj_on.png) no-repeat;
          //   background-size: contain;
          // }
          // .guess-active{
          // width: 0.8rem;
          // height: 0.8rem;
          // background: url("../assets/images/newyear/jc2.png") no-repeat center;
          // background-size: 128% 138%;
          //   position: relative;
          //   left: -0.05rem;
          //   // top: -0.3rem;
          // }
          .icon-member-active {
            //  width: 0.74rem;
            // height: 0.64rem;
            background: url(../assets/images/newfooter/wd_on.png) no-repeat;
            background-size: cover;
          }
          .member-active{
            width: 0.8rem;
            height: 0.8rem;
            background: url("../assets/images/newyear/wd2.png") no-repeat center;
            background-size: 128% 138%;
            position: relative;
            // top: -0.3rem;
          }
          .icon-Discount-active {
            // width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/yh_on.png) no-repeat;
            background-size: cover;
          }
          // .Discount-active{
          //   width: 0.8rem;
          //   height: 0.8rem;
          //   // background: url("../assets/images/member/yh-hover.png") no-repeat center!important;
          //   background-size: 128% 138%;
          //   position: relative;
          //   // background-size: contain;
          //   // top: -0.3rem;
          // }
          // &.active-dw{
          //   color: #8EB917!important;
          // }
          // &.active-qrj{
          //   color: #7E26F2!important;
          // }
        }
      }
    }
    i {
      display: inline-block;
      // width: 0.54rem;
      // height: 0.54rem;
     
    }
  }
  ul.pure-footer{
    li{
      width:25%;
    }
  }
}
</style>