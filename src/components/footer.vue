<template>
  <div>
  <div class="main-footer" :style="skin==5?'background:#1A1A1A;box-shadow:none;border-radius:0':''">
    <ul>
      <li @click="getClick('首页',0)"  :class="'padNone'+skin" class="padNoneli">
        <router-link to="/" v-if="homeNewShow==-1">
          <i v-if="skin==0" class="icon icon-home icon-home-active"></i>
          <i v-if="skin==1" class="icon home-pink"></i>
          <i v-if="skin==2" class="icon home-blue"></i>
          <i v-if="skin==3" class="icon home-green"></i>
          <i v-if="skin==4" class="icon home-maingreen"></i>
          <i v-if="skin==5" class="icon home-golden"></i>
          <p class="active-p">{{$t('home.footer[0]')}}</p>
        </router-link>
         <router-link to="/" v-else>
          <i v-if="skin==0" class="icon icon-home"></i>
          <i v-if="skin==1" class="icon home-pink2"></i>
          <i v-if="skin==2" class="icon home-blue2"></i>
          <i v-if="skin==3" class="icon home-green2"></i>
          <i v-if="skin==4" class="icon home-maingreen2"></i>
          <i v-if="skin==5" class="icon home-golden2"></i>
          <p class="active-p-a">{{$t('home.footer[0]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('体育',1)" :class="'padNone'+skin" class="padNoneli">
        <!-- <router-link  to="/toGame/ibc_sport/sport/-1"> -->
          <a :class="{'router-link-exact-active':isactive2}">
          <i v-if="skin==0" class="icon icon-ty icon-ty-active"></i>
          <i v-if="skin==1" class="icon ty-pink"></i>
          <i v-if="skin==2" class="icon ty-blue"></i>
          <i v-if="skin==3" class="icon ty-green"></i>
          <i v-if="skin==4" class="icon ty-maingreen"></i>
          <i v-if="skin==5" class="icon ty-golden"></i>
          <p  class="active-p" >{{$t('home.footer[7]')}}</p>
          </a>
        <!-- </router-link> -->
      </li>
      <li @click="getClick('充值',2)" :class="'padNone'+skin" class="cz-ft padNoneli">
        <!-- <router-link to="/" > -->
          <a :class="{'router-link-exact-active':isactive}">
          <i v-if="skin==0" class="icon icon-cz icon-cz-active"></i>
          <i v-if="skin==1" class="icon cz-pink"></i>
          <i v-if="skin==2" class="icon cz-blue"></i>
          <i v-if="skin==3" class="icon cz-green"></i>
          <i v-if="skin==4" class="icon cz-maingreen"></i>
          <i v-if="skin==5" class="icon cz-golden"></i>
          <p  class="active-p">{{$t('home.footer[6]')}}</p>
          </a>
        
        <!-- </router-link> -->
      </li>
      
         <li @click="getClick('优惠',3)" :class="'padNone'+skin"  class="padNoneli">
        <router-link to="/Activities" >
          <i v-if="skin==0" class="icon icon-Discount icon-Discount-active"></i>
          <i v-if="skin==1" class="icon yh-pink"></i>
          <i v-if="skin==2" class="icon yh-blue"></i>
          <i v-if="skin==3" class="icon yh-green"></i>
          <i v-if="skin==4" class="icon yh-maingreen"></i>
          <i v-if="skin==5" class="icon yh-golden"></i>
         
          <p  class="active-p">{{$t('home.footer[2]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('客服',4)" :class="'padNone'+skin"  class="padNoneli">
        <router-link to="/service" >
          <i v-if="skin==0" class="icon icon-guess icon-guess-active"></i>
          <i v-if="skin==1" class="icon kf-pink"></i>
          <i v-if="skin==2" class="icon kf-blue"></i>
          <i v-if="skin==3" class="icon kf-green"></i>
          <i v-if="skin==4" class="icon kf-maingreen"></i>
          <i v-if="skin==5" class="icon kf-golden"></i>
        
          <p  class="active-p" :style="lanCode==5||lanCode==2?'line-height:.25rem':''">{{$t('home.footer[3]')}}</p>
        </router-link>
      </li>
    
      <!-- <li @click="getClick('聊天室');changeChat()" :class="'padNone'+skin" v-if="lanCode!=2">
       <a >
          <i v-if="skin==0" class="icon icon-chat icon-chat-active"></i>
          <i v-if="skin==1" class="icon chat-pink"></i>
          <i v-if="skin==2" class="icon chat-blue"></i>
          <i v-if="skin==3" class="icon chat-green"></i>
          <i v-if="skin==4" class="icon chat-maingreen"></i>
          <i v-if="skin==5" class="icon chat-golden"></i>
         <span class="msg-point" v-if="msgPoint"></span>
          <p  class="active-p">{{$t('home.footer[5]')}}</p>
        </a>
       
      </li> -->
      <li @click="getClick('我的',5)" :class="'padNone'+skin" class="padNoneli">
        <router-link to="/member" >
          <i v-if="skin==0" class="icon icon-member icon-member-active"></i>
          <i v-if="skin==1" class="icon user-pink"></i>
          <i v-if="skin==2" class="icon user-blue"></i>
          <i v-if="skin==3" class="icon user-green"></i>
          <i v-if="skin==4" class="icon user-maingreen"></i>
          <i v-if="skin==5" class="icon user-golden"></i>
         
          <p  class="active-p">{{$t('home.footer[4]')}}</p>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="trade-box" :class="'tradedkin'+skin" v-show="isactive">
          <div @click="$router.push('recharge')" >
           <img v-if="skin==0" src="../assets/images/newHome/Frame22.png" alt="" srcset="" >
           <img v-if="skin==1" src="../assets/images/skin/pink/Frame22.png" alt="" srcset="" >
           <img v-if="skin==2" src="../assets/images/skin/blue/Frame22.png" alt="" srcset="" >
           <img v-if="skin==3" src="../assets/images/skin/green/Frame22.png" alt="" srcset="" >
           <img v-if="skin==4" src="../assets/images/skin/maingreen/Frame22.png" alt="" srcset="" >
           <img v-if="skin==5" src="../assets/images/skin/golden/Frame22.png" alt="" srcset="" >
           <p>{{$t('recharge.text[0]')}}</p>
          </div>
          <div @click="$router.push('tx')" class="tradetx">
            <img v-if="skin==0" src="../assets/images/newHome/Frame23.png" srcset="">
            <img v-if="skin==1" src="../assets/images/skin/pink/Frame23.png" srcset="">
            <img v-if="skin==2" src="../assets/images/skin/blue/Frame23.png" srcset="">
            <img v-if="skin==3" src="../assets/images/skin/green/Frame23.png" srcset="">
            <img v-if="skin==4" src="../assets/images/skin/maingreen/Frame23.png" srcset="">
            <img v-if="skin==5" src="../assets/images/skin/golden/Frame23.png" srcset="">
            <p>{{$t('newHome[13]')}}</p>
          </div>
      </div>
      <div class="trade-box" style="left:0.9rem" :class="'tradedkin'+skin" v-show="isactive2">
          <div @click="$router.push('/toGame/cmd_sport/sport/-1')" class="tradecz">
           <img v-if="skin==0" src="../assets/images/newHome/Frame24.png" alt="" srcset="" >
           <img v-if="skin==1" src="../assets/images/skin/pink/Frame24.png" alt="" srcset="" >
           <img v-if="skin==2" src="../assets/images/skin/blue/Frame24.png" alt="" srcset="" >
           <img v-if="skin==3" src="../assets/images/skin/green/Frame24.png" alt="" srcset="" >
           <img v-if="skin==4" src="../assets/images/skin/maingreen/Frame24.png" alt="" srcset="" >
           <img v-if="skin==5" src="../assets/images/skin/golden/Frame24.png" alt="" srcset="" >
           <p>CMD</p>
          </div>
          <div @click="$router.push('/toGame/ibc_sport/sport/-1')" class="tradetx">
            <img v-if="skin==0" src="../assets/images/newHome/Frame25.png" srcset="">
            <img v-if="skin==1" src="../assets/images/skin/pink/Frame25.png" srcset="">
            <img v-if="skin==2" src="../assets/images/skin/blue/Frame25.png" srcset="">
            <img v-if="skin==3" src="../assets/images/skin/green/Frame25.png" srcset="">
            <img v-if="skin==4" src="../assets/images/skin/maingreen/Frame25.png" srcset="">
            <img v-if="skin==5" src="../assets/images/skin/golden/Frame25.png" srcset="">
            <p>SABA</p>
          </div>
      </div>
  </div>
</template>

<script>
import { getClickTimes ,removeAllactive} from '../assets/js/public'
import { mapState,mapMutations } from "vuex";
export default {
  name: "foot",
  data() {
    return {
      bet:'',
      gameBox:false,
      chessArr:'',
      isactive:false,
      isactive2:false
    };
  },
  computed: {
    ...mapState(["skin","isBb","homeNewShow","chatShow","codeToken","msgPoint","lanCode"])
  },
  created() {
  
  },
  watch:{
    $route:function () {
      // console.log(this.$route.path)
    },
    msgPoint:function(i){
      console.log(i)
    }
  },
  methods: {
     ...mapMutations(["SETNEWSHOW","SETCHAT","SETTYSHOW"]),
    getClick(type,index){
      if(type=='充值'){
      if(!this.isactive){
        document.querySelectorAll('.padNoneli>a').forEach((res,id)=>{
        res.classList.remove('router-link-exact-active')
        })
      }
       this.isactive=!this.isactive;
      }else{
        this.isactive=false;
        document.querySelectorAll('.padNoneli>a')[index].classList.add('router-link-exact-active')
      }
      if(type=='体育'){
      if(!this.isactive2){
        document.querySelectorAll('.padNoneli>a').forEach((res,id)=>{
        res.classList.remove('router-link-exact-active')
        })
      }
       this.isactive2=!this.isactive2;
      }else{
        this.isactive2=false;
        document.querySelectorAll('.padNoneli>a')[index].classList.add('router-link-exact-active')
      }
      if(type=='首页'){
        this.SETTYSHOW(false)
        this.SETNEWSHOW(-1)
      }
      getClickTimes(type);
    },
    alertLL(url, title) {
      android.show(url, title);
    },
    changeChat(){
      if(!this.codeToken) return this.$popup();
        if(this.$store.state.userinfo.user_id<0){
            this.$swBox({
                title: this.$t('tsTitle'),
                content: this.$t('swTip'),
                leftBtn: this.$t('loginText'),
                rightBtn:this.$t('registerText'),
                clickL: () => {
                    this.SETUSERTOKEN('')
                    this.$router.push('/login');
                },
                clickR: () => {
                    this.SETUSERTOKEN('')
                    if(this.noticeType==1){
                        this.$router.push('/register');
                        
                    }else{
                        this.$router.push('/RegisterDl');
                        
                    }
                }
            });
            return;
        }
     if(this.chatShow){
        this.SETCHAT(false)
     }else{
        this.SETCHAT(true)
     }
   

    },

  },
  mounted() {}
};
</script>

<style scoped lang="less">



















.rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
.trade-box{
  position: fixed;
    bottom: 1.5rem;
    left: 2.55rem;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 3.2rem;
    height: 52px;
    border-radius: 5px;
    // box-shadow: 0 1px 3px #fff;
    font-size: 0.24rem;
    --tw-text-opacity: 1;
    // color: #CECECE;
    // background: linear-gradient(325deg,#303030,#444241,#000000);
    background-size: 400% 400%;
    animation: gradient 2s ease infinite;
    text-align: center;
    font-weight: bold;
    .tradecz{
     img{
      // margin-top: 0.05rem;
      width: 0.9rem;
     }
    }
    .tradetx{
      img{
        width: 0.5rem;
      }
    }
    &.tradedkin0{
      color: #929BBC;
      background: #FFFFFF;
      border: 0.5px solid #929BBC;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:after{
      border-color: #929BBC transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
    }
    }
    &.tradedkin1{
      color: #DD8080;
      background: #FFFFFF;
      border: 0.5px solid #DD8080;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:after{
      border-color: #DD8080 transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
      }
    }
    &.tradedkin2{
      color: #72A5C1;
      background: #FFFFFF;
      border: 0.5px solid #72A5C1;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:after{
      border-color: #72A5C1 transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
      }
    }
    &.tradedkin3{
      color: #92BCB2;
      background: #FFFFFF;
      border: 0.5px solid #92BCB2;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:after{
      border-color: #92BCB2 transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
    }
    }
    &.tradedkin4{
      background: #FFFFFF;
      border: 0.5px solid #72C1A5;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      color: #72C1A5;
      &:after{
      border-color: #72C1A5 transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
    }
    }
    &.tradedkin5{
      color: #928151;
      background: #1A1A1A;
      border: 0.5px solid #928151;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      &:after{
      border-color: #928151 transparent transparent;
      border-style: solid;
      border-width: 10px 10px 0;
      bottom: -10px;
      content: "";
      height: 0;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
      width: 0;
    }
    }
    img{
      width: 0.6rem;
    }
    &:after{
      border-color: #464646 transparent transparent;
    border-style: solid;
    border-width: 10px 10px 0;
    bottom: -10px;
    content: "";
    height: 0;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    width: 0;
    }
}
.main-footer {
  border-radius: .4rem .4rem 0 0 ;
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
   
    .cz-ft{
      i{
        background-position-y: 2px !important;
        background-size: 100% !important;
      }
    }
     overflow: hidden;
     li{
     
       position: relative;
        overflow: hidden;
        .msg-point{
         position: absolute;
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: red;
          right: 0.48rem;
          top: 0.1rem;
        }
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
      &.padNone5{
        p{
          color: #928151;
        }
        a.router-link-exact-active{
          .active-p{
            color: #AB9B62;
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
        .rem(font-size,18);
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
             background-size: contain;
        }
        .icon-chat{
          background: url(../assets/images/newfooter/chat-2.png) no-repeat;
             background-size: contain;
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
        .home-pink2{
          background:  url(../assets/images/skin/pink/home.png) no-repeat;
          background-size:  contain;
        }
         .home-blue{
          background:  url(../assets/images/skin/blue/home.png) no-repeat;
          background-size:  contain;
        }
         .home-blue2{
          background:  url(../assets/images/skin/blue/home.png) no-repeat;
          background-size:  contain;
        }
         .home-green{
          background:  url(../assets/images/skin/green/home.png) no-repeat;
          background-size:  contain;
        }
        .home-green2{
          background:  url(../assets/images/skin/green/home.png) no-repeat;
          background-size:  contain;
        }
         .home-maingreen{
          background:  url(../assets/images/skin/maingreen/home.png) no-repeat;
          background-size:  contain;
        }
        .home-golden{
          background:  url(../assets/images/skin/golden/home.png) no-repeat;
          background-size:  contain;
        }
        .home-golden2{
          background:  url(../assets/images/skin/golden/home.png) no-repeat;
          background-size:  contain;
        }
         .home-maingreen2{
          background:  url(../assets/images/skin/maingreen/home.png) no-repeat;
          background-size:  contain;
        }
        .chat-green{
          background: url(../assets/images/skin/green/chat-2.png) no-repeat;
          background-size: contain;
        }
        .chat-maingreen{
          background: url(../assets/images/skin/green/chat-2.png) no-repeat;
          background-size: contain;
        }
        .chat-golden{
          background: url(../assets/images/skin/golden/chat-2.png) no-repeat;
          background-size: contain;
        }
        .chat-blue{
          background: url(../assets/images/skin/blue/chat-2.png) no-repeat;
          background-size: contain;
        }
        .chat-pink{
          background: url(../assets/images/skin/pink/chat-2.png) no-repeat;
          background-size: contain;
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
        .live-maingreen{
          background:  url(../assets/images/skin/maingreen/live.png) no-repeat;
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
          .yh-maingreen{
           background:  url(../assets/images/skin/maingreen/hd.png) no-repeat;
          background-size:  contain;
        }
          .yh-golden{
           background:  url(../assets/images/skin/golden/hd.png) no-repeat;
          background-size:  contain;
        }
        .cz-pink{
           background:  url(../assets/images/skin/pink/cz.png) no-repeat;
          background-size:  contain;
        }
        .cz-blue{
           background:  url(../assets/images/skin/blue/cz.png) no-repeat;
          background-size:  contain;
        }
          .cz-green{
           background:  url(../assets/images/skin/green/cz.png) no-repeat;
          background-size:  contain;
        }
          .cz-maingreen{
           background:  url(../assets/images/skin/maingreen/cz.png) no-repeat;
          background-size:  contain;
        }
        .cz-golden{
          background:  url(../assets/images/skin/golden/cz.png) no-repeat;
          background-size:  contain;
        }
        .ty-pink{
          background:  url(../assets/images/skin/pink/ty.png) no-repeat;
          background-size:  contain;
        }
        .ty-blue{
          background:  url(../assets/images/skin/blue/ty.png) no-repeat;
          background-size:  contain;
        }
        .ty-green{
          background:  url(../assets/images/skin/green/ty.png) no-repeat;
          background-size:  contain;
        }
        .ty-maingreen{
          background:  url(../assets/images/skin/maingreen/ty.png) no-repeat;
          background-size:  contain;
        }
        .ty-golden{
          background:  url(../assets/images/skin/golden/ty.png) no-repeat;
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
        .kf-maingreen{
          background:  url(../assets/images/skin/maingreen/kf.png) no-repeat;
          background-size:  contain;
        }
        .kf-golden{
          background:  url(../assets/images/skin/golden/kf.png) no-repeat;
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
         .user-maingreen{
          background:  url(../assets/images/skin/maingreen/user.png) no-repeat;
          background-size:  contain;
        }
         .user-golden{
          background:  url(../assets/images/skin/golden/user.png) no-repeat;
          background-size:  contain;
        }






        .icon-guess {
          //  width: 0.74rem;
          // height: 0.64rem;
          background: url(../assets/images/newfooter/kf.png) no-repeat;
            background-size: contain;
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
        .icon-cz{
          background: url(../assets/images/newfooter/cz.png) no-repeat;
          background-size: contain;
        }
        .icon-ty{
          background: url(../assets/images/newfooter/ty.png) no-repeat;
          background-size: contain;
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
          .home-maingreen{
            background: url(../assets/images/skin/maingreen/home_on.png) no-repeat;
            background-size: contain;
          }
          .home-golden{
            background: url(../assets/images/skin/golden/home_on.png) no-repeat;
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
          .live-maingreen{
            background: url(../assets/images/skin/maingreen/live_on.png) no-repeat;
            background-size: contain;
          }
          // .live-golden{
          //   background: url(../assets/images/skin/golden/live_on.png) no-repeat;
          //   background-size: contain;
          // }
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
          .yh-maingreen{
            background: url(../assets/images/skin/maingreen/hd_on.png) no-repeat;
            background-size: contain;
          }
          .yh-golden{
            background: url(../assets/images/skin/golden/hd_on.png) no-repeat;
            background-size: contain;
          }
          .cz-pink{
            background: url(../assets/images/skin/pink/cz_on.png) no-repeat;
            background-size: contain;
          }
          .cz-blue{
            background: url(../assets/images/skin/blue/cz_on.png) no-repeat;
            background-size: contain;
          }
          .cz-green{
            background: url(../assets/images/skin/green/cz_on.png) no-repeat;
            background-size: contain;
          }
          .cz-maingreen{
            background: url(../assets/images/skin/maingreen/cz_on.png) no-repeat;
            background-size: contain;
          }
          .cz-golden{
            background: url(../assets/images/skin/golden/cz_on.png) no-repeat;
            background-size: contain;
          }
          .ty-pink{
          background:  url(../assets/images/skin/pink/ty_on.png) no-repeat;
          background-size:  contain;
        }
        .ty-blue{
          background:  url(../assets/images/skin/blue/ty_on.png) no-repeat;
          background-size:  contain;
        }
        .ty-green{
          background:  url(../assets/images/skin/green/ty_on.png) no-repeat;
          background-size:  contain;
        }
        .ty-maingreen{
          background:  url(../assets/images/skin/maingreen/ty_on.png) no-repeat;
          background-size:  contain;
        }
        .ty-golden{
          background:  url(../assets/images/skin/golden/ty_on.png) no-repeat;
          background-size:  contain;
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
            .kf-maingreen{
            background: url(../assets/images/skin/maingreen/kf_on.png) no-repeat;
            background-size: contain;
          }
            .kf-golden{
            background: url(../assets/images/skin/golden/kf_on.png) no-repeat;
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
          .user-maingreen{
            background: url(../assets/images/skin/maingreen/user_on.png) no-repeat;
            background-size: contain;
          }
          .user-golden{
            background: url(../assets/images/skin/golden/user_on.png) no-repeat;
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
          .icon-cz-active{
            background: url(../assets/images/newfooter/cz_on.png) no-repeat;
            background-size: contain;
          }
          .icon-ty-active{
            background: url(../assets/images/newfooter/ty_on.png) no-repeat;
            background-size: contain;
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