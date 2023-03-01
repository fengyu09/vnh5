<template>
  <div id="vipPage">
    <div class="head-box">
        <div class="infoHead" :class="isTop?'active':''">
          <span class="fl" style='margin-left: 8px; flex: 0 0 10%;' @click="$router.go(-1)"><img src="../../assets/images/vip/back-icon.png" alt=""></span>
          <span class="fl" style='color:#fff;font-size:0.48rem;font-weight:bold;width: 90%;display:flex;justify-content:center;'>贵族</span>
          <span class="fr" style='width: 5%;'></span>
        </div>
    </div>

    <myScroll :top="1.2" :bottom="0" :data="playList" ref="scrollWrapper">
      <div class="node-box">
        <div class="clearfix vip-type" ref="personTab">
          <span  class="item"  :class="currType == index ? 'active' : ''" v-for="(item, index) in nobleList" :key="index" @click="selectType(index)">{{ item.name }}</span>
      </div>
      <div class="vip-info" v-if="nobleList.length">
        <span class="user-pic active" :class="'pic'+currType" v-show="nobleList[currType].noble_id<=userGrouth.noble"></span>
        <span class="user-pic" :class="'pic'+currType" v-show="nobleList[currType].noble_id>userGrouth.noble"></span>
        <div class="bar clearfix" v-if='nobleList[currType].noble_id>= userGrouth.noble'>
          <span class="bar-jdt" v-if='userGrouth.noble<1?nobleList[currType].noble_id-1==userGrouth.noble:nobleList[currType].noble_id==userGrouth.noble'>
            <i class="bar-jdtbj bg1" :style="{'width':(userGrouth.exp/nobleList[currType].max_exp*100)>100?'100%':userGrouth.exp/nobleList[currType].max_exp*100 +'%'}"></i>
            </span>
          <i class="bar-bli "> <strong>{{userGrouth.exp}}</strong>/{{nobleList[currType].max_exp}}</i>
        </div>
        <p v-if='nobleList[currType].noble_id<userGrouth.noble' style="color:#eee">当前高于该等级</p>
        <div class="info" v-if='userGrouth.noble<1?nobleList[currType].noble_id-1==userGrouth.noble:nobleList[currType].noble_id==userGrouth.noble'>
            保级条件：<strong>30</strong> 天内消费 <strong>{{nobleList[currType].low_consume|filterOnlineNum }}</strong> 钻石，您当前已消费 <strong>{{userGrouth.keep_consume|filterOnlineNum}}</strong> 钻石
            <span class="icon" @click="tipsShow()" >?</span>
            <span class="text"  v-if="isTips">如未完成保级条件则扣除{{nobleList[currType].loss|filterOnlineNum }}经验</span>
        </div>
      </div>
      </div>
      <!-- 贵族特权 -->
      <div class="content">
        <ul class="member-benefits clearfix" v-for="(v,index2) in nobleList" :key="index2" v-if="currType == index2" >
          <h3 class="title"><span class="line"></span> {{v.name}}会员权益 <span class="line"></span></h3>
          <li>
            <img src="../../assets/images/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/images/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/images/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img v-show="v.noble_id == 1 " src="../../assets/images/vip/qy4_qs.png" alt="">
            <img v-show="v.noble_id == 2 " src="../../assets/images/vip/qy4_nj.png" alt="">
            <img v-show="v.noble_id == 3 " src="../../assets/images/vip/qy4_zj.png" alt="">
            <img v-show="v.noble_id == 4 " src="../../assets/images/vip/qy4_bj.png" alt="">
            <img v-show="v.noble_id == 5 " src="../../assets/images/vip/qy4_hj.png" alt="">
            <img v-show="v.noble_id == 6 " src="../../assets/images/vip/qy4_gj.png" alt="">
            <img v-show="v.noble_id == 7 " src="../../assets/images/vip/qy4_gw.png" alt="">
            <p>影视区{{v.film_discount}}折</p>
          </li>
          <li>
            <img v-show="v.noble_id == 1 " src="../../assets/images/vip/qy5_qs.png" alt="">
            <img v-show="v.noble_id == 2 " src="../../assets/images/vip/qy5_nj.png" alt="">
            <img v-show="v.noble_id == 3 " src="../../assets/images/vip/qy5_zj.png" alt="">
            <img v-show="v.noble_id == 4 " src="../../assets/images/vip/qy5_bj.png" alt="">
            <img v-show="v.noble_id == 5 " src="../../assets/images/vip/qy5_hj.png" alt="">
            <img v-show="v.noble_id == 6 " src="../../assets/images/vip/qy5_gj.png" alt="">
            <img v-show="v.noble_id == 7 " src="../../assets/images/vip/qy5_gw.png" alt="">
            <p v-if="v.noble_id == 7 ">影视区无限制</p>
            <p v-if="v.noble_id != 7 ">每日免费观影{{v.free_watch_nums}}部</p>
          </li>
          <li>
            <img src="../../assets/images/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img v-show="v.noble_id != 1 " src="../../assets/images/vip/qy_7.png" alt="">
            <img v-show="v.noble_id == 1 " src="../../assets/images/vip/qy_7_2.png" alt="">
            <p  v-if="v.noble_id != 1 ">每日抽奖{{v.draws}}次</p>
            <p  v-if="v.noble_id == 1 ">每日抽奖</p>
          </li>
          <li>
            <img v-show="v.noble_id != 1 && v.noble_id != 2  && v.noble_id != 3 " src="../../assets/images/vip/qy_8.png" alt="">
            <img v-show="v.noble_id == 1 || v.noble_id == 2  || v.noble_id == 3 " src="../../assets/images/vip/qy_8_2.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img v-show="v.noble_id == 7 || v.noble_id == 6 || v.noble_id == 5" src="../../assets/images/vip/qy_9.png" alt="">
            <img v-show="v.noble_id != 7 && v.noble_id != 6 && v.noble_id != 5" src="../../assets/images/vip/qy_9_2.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img v-show="v.noble_id == 7 || v.noble_id == 6" src="../../assets/images/vip/qy_10.png" alt="">
            <img v-show="v.noble_id != 7 && v.noble_id != 6" src="../../assets/images/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img v-show="v.noble_id == 7 " src="../../assets/images/vip/qy_11.png" alt="">
            <img v-show="v.noble_id != 7 " src="../../assets/images/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <ul class="gift-pack clearfix" v-if="giftList.length">
          <h3 class="title"><span class="line"></span> 会员专属礼包 <span class="line"></span></h3>
          <li v-for="(v,index3) in giftList" :key="index3" v-if="v.list.length < 2">
            <div class="bg" v-for="(vv,index4) in v.list" :key="index4"> 
              <span class="number">{{vv.price}}</span>
              <img  :src="vv.icon" alt="">
              <span class="zs">{{vv.name}}</span>
            </div>
            <p>{{v.noble_name}}</p>
          </li>
        </ul>
        <div class="gift-pack2 clearfix"> 
          <ul>
            <li v-for="(v,index3) in giftList" :key="index3" v-if="v.list.length >= 2">
              <div class="swiper-container" :id="'swiperBanner'+(index3-0)" >
                <div class="swiper-wrapper">
                  <div class="swiper-slide"  v-for="(vv,index4) in v.list" :key="index4" >
                    <div class="bg"> 
                      <span  v-show="vv.name=='钻石'" class="number">{{vv.price}}</span>
                      <img :src="vv.icon" alt="">
                      <span class="zs" :class="vv.name=='钻石'?'zsColor':''">{{vv.name}}</span>
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination" :id="'bannerPagination'+(index3-0)" style="bottom:17px"></div>
              </div>
              <p>{{v.noble_name}}</p>
            </li>
          </ul>
        </div>
        <dl class="rule-box clearfix" v-if="tips.length">
          <dt><span class="line"></span> 活动规则和条款 <span class="line"></span></dt>
          <dd v-for="(v,index) in tips" :key="index"><span class="icon"></span>
            <p>{{v}}</p>
          </dd>
        </dl>
      </div>
    </myScroll>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from "vux";
import myScroll from "@/components/myScroll";
import myScrollX from "../../components/myScrollX.vue"; //横向滚动
import swiper from "swiper"
import "../../../node_modules/swiper/css/swiper.min.css";
export default {
  name: 'vip',
  data(){
    return{
      currType:1,
      currNoble:0,
      isTips:false,
      tips:[],//底部规则提示数组
      userGrouth:{noble:1},//用户贵族数据对象
      nobleList:[],//贵族列表数组
      giftList:[],//会员专属礼包数组
      isTop:false,
      playList:{}

    }
  },
  created(){
    // this.initSwiper()
    this.getVipMess();
  },
  mounted(){
    this.initSwiper();
    //  window.onscroll = function(){
    //    var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
    //   //  console.log(a)
    //    if(a>50){
    //      document.querySelector('.infoHead').style.background = "#1c1b1f"
    //      console.log(3333);
    //    }else{
    //      document.querySelector('.infoHead').style.background = "none"
    //    }
    //  }
  },
  methods:{
      async getVipMess(){
        this.$vux.loading.show({ text: "获取中..." });
        let res = await this.$http.get(this.versionLive2+'user/get_noble/');
        this.$vux.loading.hide();
        if(res && res.data.code==1){
            this.userGrouth  = res.data.data.user_growth;
            this.tips = res.data.data.tips;
            this.nobleList = res.data.data.noble_list;
            this.giftList = res.data.data.gift_list;
            this.currType =  res.data.data.user_growth.noble>0?this.nobleList.length-res.data.data.user_growth.noble:this.nobleList.length-1;
            this.currNoble = res.data.data.user_growth.noble>0?res.data.data.user_growth.noble-1:res.data.data.user_growth.noble;
            this.playList.nobleList = this.nobleList;
            this.playList.giftList = this.giftList;
            this.playList.tip = this.tip;
           setTimeout(() => {
                this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
            }, 20);
            // console.log(this.currNoble)
            this.$nextTick(() => { // 下一个UI帧再初始化swiper
              this.initSwiper();  
            });
        }else{

        }
    },
    selectType(index){
      // console.log(index);
      this.currType = index;
      this.isTips = false;
    },
    tipsShow(){
      if (this.isTips){
        this.isTips = false
      }else {
        this.isTips = true
      }
    },
    initSwiper(){
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
  components: {
    myScroll,
    myScrollX,
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.head-box{
  // .rem(height,620);
  font-style: 'PingFang-SC-Bold';
  .rem(font-size,36);
  font-weight: bold;
  line-height: 1.2rem;
  background: linear-gradient(to right, #1a191d, #323137);
  background-size: 100% 100%;
  overflow: hidden;
  padding-bottom: 1.2rem;
  .infoHead{
    overflow: hidden;
    position: fixed;
    z-index: 11111111;
    width: 100%;
    &.active{
      background: #000!important;
    }
    img{
      .rem(width,23);
    }
    .head {
      height: 1.2rem;
      line-height: 1.2rem;
    }
  }
}

.node-box{
  background: url("../../assets/images/vip/header-bg.png") no-repeat top center;
  background-size: 100% 100%;
      padding-bottom: .5rem;
 .vip-type{
    .rem(font-size,28);
    
    .rem( padding-left,30);
    padding-top: .2rem;
    .item{
      .rem(margin-right,50);
      padding-bottom: 10px;
      position: relative;
      &:last-of-type{
        margin-right: 0 !important;
      }
      &.active{
        color: #DBB564;
        &:after{
          position: absolute;
          content: '';
          width: 100%;
          .rem(height,6);
          bottom: 0;
          left: 0%;
          border-radius: 3px;
          background: #DBB564;
        }
      }
    }
  }
  .vip-info{
    text-align: center;
    .rem(padding-top,60);
    .user-pic{
      display: block;
      .rem(width,134);
      .rem(height,168);
      background-size: 100% 100% !important;
      margin: 0 auto;
      //国王 
      &.pic0{
        background: url("../../assets/images/vip/lv-0.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-0.2.png") no-repeat center;
        }
      }
      //公爵
      &.pic1{
        background: url("../../assets/images/vip/lv-1.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-1.2.png") no-repeat center;
        }
      }
      //侯爵 
      &.pic2{
        background: url("../../assets/images/vip/lv-2.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-2.2.png") no-repeat center;
        }
      }
      // 伯爵 
      &.pic3{
        background: url("../../assets/images/vip/lv-3.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-3.2.png") no-repeat center;
        }
      }
      //子爵
      &.pic4{
        background: url("../../assets/images/vip/lv-4.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-4.2.png") no-repeat center;
        }
      }
      //男爵
      &.pic5{
        background: url("../../assets/images/vip/lv-5.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-5.2.png") no-repeat center;
        }
      }
      //骑士
      &.pic6{
        background: url("../../assets/images/vip/lv-6.png") no-repeat center;
        &.active{
          background: url("../../assets/images/vip/lv-6.2.png") no-repeat center;
        }
      }
    }
    .bar{
      width: 100%;
      .rem(margin-top,27);
      .bar-jdt{
        display: block;
        .rem(width,358);
        .rem(height,14);
        background: #18171A;
        border-radius: 7px;
        position: relative;
        margin: 0 auto;
        .bar-jdtbj{
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 9px;
          width: 0%;
          .rem(height,14);
          z-index: 1;
          background: #C4C4C4;
          &.bg1{
            background:#91634C;
          }
          &.bg2{
            background:#436B7D;
          }
          &.bg3{
            background:#CA691F;
          }
          &.bg4{
            background:#333399;
          }
          &.bg5{
            background:#2A5EE9;
          }
          &.bg6{
            background:#7312C7;
          }
          &.bg7{
            background:#CE1313;
          }
        }

      }
      .bar-bli{
        display: block;
        .rem(line-height,32);
        .rem(font-size,24);
        color: #fff;
        strong{
          font-weight: normal;
          color: #EDC476;
        }
      }
    }
    .info{
        position: relative;
      .rem(line-height,60);
      .rem(font-size,20);
        color: #DBB564;
        strong{
          font-weight: normal;
          color: #FF0000;
        }
        .icon{
          display: inline-block;
          .rem(width,21);
          .rem(height,21);
          .rem(line-height,21);
          .rem(font-size,16);
          color: #fff;
          background: #DBB564;
          border-radius: 50%;
        }
        .text{
          .rem(height,33);
          .rem(line-height,26);
          .rem(font-size,18);
          color: #445779;
          background: #fff;
          padding: 2px 5px;
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }
    }
  }
}


.content{
  .title{
    .rem(font-size,36);
    color: #445779;
    text-align: center;
      .line{
        display: inline-block;
        .rem(width,167);
        .rem(height,4);
        background: url("../../assets/images/vip/line.png") no-repeat center ;
        vertical-align: middle;
        &:nth-of-type(2){
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); /* Internet Explorer */
          -moz-transform:rotate(180deg); /* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); /* Opera */
        }
      }
  }
  .member-benefits{
    li{
      width: 33.33%;
      text-align: center;
      float: left;
      .rem(margin-top,40);
      img{
        .rem(width,100);
      }
      p{
        .rem(font-size,24);
        color: #445779;
      }
    }
  }
  .gift-pack{
    .title{
      .rem(margin-top,60);
      .rem(margin-bottom,47);
    }
    li{
      .rem(width,310);
      float: left;
      .bg{
        .rem(width,310);
        .rem(height,357);
        background: url("../../assets/images/vip/li_bg.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        .rem(padding-top,50);
        .number{
          .rem(font-size,71);
          color: #666;
        }
      
        img{
          display: block;
          .rem(width,163);
          .rem(width,136);
          margin: 0 auto;
        }
        span{
          display: block;
          .rem(font-size,47);
          color: #245CC8;
        }

      }
      p{
        .rem(line-height,80);
        .rem(font-size,33);
        color: #666;
        text-align: center;
      }
      &:nth-of-type(odd){
        .rem(margin-left,40);
        .rem(margin-right,50);
      }
    }
  }
  .gift-pack2{
    li{
      .rem(width,310);
      float: left;
      .bg{
        .rem(width,310);
        .rem(height,357);
        background: url("../../assets/images/vip/li_bg.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        .rem(padding-top,50);
        .number{
          .rem(font-size,71);
          color: #666;
        }
        // .img{
        //   width: 80%;
        //   margin: 0 auto;
        //   img{
        //     width: 58%;
        //   }
        // }
        img{
          display: block;
          // .rem(width,193);
          width: 60%;
          margin: 0 auto;
          max-height: 2.8rem;
        }
        span{
          display: block;
          .rem(font-size,32);
          color: #445779;
        }
        .zs{
          width: 80%;
          margin: 0 auto;
          position: absolute;
          bottom: 0.4rem;
          left: 50%;
          transform: translateX(-50%);
        }
        .zsColor{
          //  .rem(font-size,47);
          // color: #245CC8;
          margin-top: -0.3rem;
        }
      }
      p{
        .rem(line-height,80);
        .rem(font-size,33);
        color: #666;
        text-align: center;
      }
      &:nth-of-type(odd){
        .rem(margin-left,40);
        .rem(margin-right,50);
      }
    }
    .swiper-container {
      --swiper-pagination-color: #ff513e; /* 两种都可以 */
    }

  }
  .rule-box{
    .rem(padding-bottom,35);
    dt{
      font-weight: bold;
      .rem(font-size,31);
      color: #445779;
      text-align: center;
      .rem(padding-top,40);
      .rem(padding-bottom,35);
      .line{
        display: inline-block;
        .rem(width,60);
        .rem(height,34);
        background: url("../../assets/images/vip/icon_1.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        &:nth-of-type(2){
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); /* Internet Explorer */
          -moz-transform:rotate(180deg); /* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); /* Opera */
        }
      }
    }
    dd{
      .rem(font-size,22);
      color: #445779;
      .rem(padding-left,33);
      .rem(padding-bottom,10);
      overflow: hidden;
      .icon{
        display: inline-block;
        .rem(width,16);
        .rem(height,16);
        background: #7B6D56;
        .rem(margin-right,20);
        .rem(margin-top,10);
        transform: rotate(45deg);
        float: left;
      }
      .title-left{
        float: left;
      }
      p{
        .rem(width,650);
        float: left;
      }
    }
  }
}
</style>
