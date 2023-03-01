<template>
  <div class="vip-ranking" id="vip-ranking">
     <myScroll :top="0" :bottom="0">
    <div class="head-box">
      <div class="infoHead">
        <span class="fl" style='margin-left: 8px; flex: 0 0 10%;' @click="$router.go(-1)"><img src="../../assets/images/vip/back-icon.png" alt=""></span>
        <span class="" style='color:#fff;font-size:0.48rem;display:flex;justify-content:center;'>{{$t('vipRanking.text[0]')}}</span>
        <span class="fr vip-detail"><a style="color:#fff;" href="/vip">{{$t('vipRanking.text[1]')}}
</a></span>
      </div>
      <div class="vip-info clearfix">
        <img class="user-pic fl" v-lazy="userGrowth.avatar" alt="">
        <span class="user-name fl">{{userGrowth.nickname}}</span>
        <span class="level">{{userGrowth.vip}}</span>
        <span class="level-r fr" :class="'level'+userGrowth.vip"></span>
      </div>
       <div class="bar clearfix" v-if="isLoading">
         <span class="txt-l fl" :class="userGrowth.vip|filterVipGrade"></span>
         <span class="bar-jdt fl"><i class="bar-jdtbj bg1" :style="'width:'+currWz +'%'"></i></span>
         <span class="txt-r fl" v-if="userGrowth.vip<8" :class="userGrowth.next_vip|filterVipGrade"></span>
         <span v-if="userGrowth.vip>=8" style="position: absolute;top: 3.95rem;color: #e0bb75;font-weight: bold;">MAX</span>
       </div>
       <div class="info clearfix">
         <!-- filterOnlineNum(1) -->
         <p class="fl"><span class="icon fl"></span>{{$t('vipRanking.text[2]')}}（{{$t('moneyDw')}}）：{{userGrowth.total_recharge}} <em>（{{userGrowth.total_recharge}}/{{userGrowth.next_total_recharge}}）</em></p>
         <p class="fl"><span class="icon fl"></span>{{$t('vipRanking.text[3]')}}（{{$t('moneyDw')}}）：{{userGrowth.total_flow }} <em>（{{userGrowth.total_flow}}/{{userGrowth.next_total_flow}}）</em></p>
       </div>
    </div>
    <div class="card-box">
      <div class="swiper-container" id="swiperBanner1"  ref="mySwiper" >
        <div class="swiper-wrapper">
          <div class="swiper-slide"   v-for="(item,index) in vipList" :key="index" @change="changeVipDj(index)">
              <div class="card-pic " :class="item.code<=userGrowth.vip?'active':''" ref="card">
                <h5 :class="'yxVip'+item.code"></h5>
                <span class="level-r fr" :class="'level'+item.vip_id"></span>
                <div class="tj clearfix">
                    <div class="fl">
                      {{item.total_recharge}}
                      <span>{{$t('vipRanking.text[4]')}}</span>
                    </div>
                    <div class="fl">
                      {{item.total_flow}}
                      <span>{{$t('vipRanking.text[5]')}}</span>
                    </div>
                    <div class="fl">
                      {{item.rg_flow}}
                      <span>{{$t('vipRanking.text[6]')}}</span>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
     

      <div class="swiper-pagination" >
          <span  class="swiperPag">
            <span class="swiper-pagination-customs" :class="currIndex == index ?'swiper-pagination-customs-active':''"  ref="personTab" v-for="(item,index) in vipList" :key="index"  @click="handleClickSlide(index)" >
              VIP{{index+1}}
            </span>
          </span>
      </div>
      <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
    <dl class="privilege" v-if="vipList.length">
      <dt class="title" v-show="vipList.length"><img src="../../assets/images/vipRanking/line.png" alt="">{{$t('vipRanking.text[7]')}}</dt>
      <dd v-show="selectVip.upgrade_bonus+''.replace(/，/,',').split(',').map(item=>item.trim()).join('')>0"><span class="icon icon1"></span>{{$t('vipRanking.text[8]')}}</dd>
      <dd v-show="selectVip.birthday_gift+''.replace(/，/,',').split(',').map(item=>item.trim()).join('')>0"><span class="icon icon2"></span>{{$t('vipRanking.text[9]')}}</dd>
      <dd v-show="selectVip.month_hb+''.replace(/，/,',').split(',').map(item=>item.trim()).join('')>0"><span class="icon icon3"></span> {{$t('vipRanking.text[10]')}}</dd>
      <dd v-show="selectVip.customer_service"><span class="icon icon4"></span>{{$t('vipRanking.text[11]')}}</dd>
      <dd v-if="selectVip.receive_in_kind != 0">
        <span class="icon icon5"></span>
        <span class="lq-btn qlq" v-if="selectVip.receive_in_kind == 2" @click="receive()">{{$t('vipRanking.text[12]')}}</span>
        <span class="lq-btn" v-if="selectVip.receive_in_kind == 1">{{$t('vipRanking.text[13]')}}</span>
        <span style="display: block;">{{$t('vipRanking.text[14]')}}</span> 
      </dd>
    </dl>
   
     </myScroll>
  </div>
</template>

<script>

import swiper from "swiper";
import "../../../node_modules/swiper/css/swiper.min.css";
import {Swiper, SwiperItem} from "vux";
let vm = null;
export default {
  data(){
    return{
        userGrowth:{
          vip:0
        },
        vipList:[],
        selectVip:{upgrade_bonus:0},//选中的vip数据
        currWz:'',
        isLoading:false,
        currIndex:0,
        add:{
          tel:'',
          name:'',
          address:''
        },
        isReceive:false,//地址弹窗
    }
  },
  created(){
    this.getVipMess();
    vm = this;
  },
  mounted(){
    this.initSwiper();
    this.swiper.slideTo(vm.currIndex, 1000, false)

  },
  watch: {

  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  filters:{
    filterVipGrade(n){
      let grade = 'max';
      switch(n-0){
          case 0:
            grade = "vipGarde0";
            break;
          case 1:
            grade = "vipGarde1";
            break;
            case 2:
            grade = "vipGarde2";
            break;
            case 3:
            grade = "vipGarde3";
            break;
            case 4:
            grade = "vipGarde4";
            break;
            case 5:
            grade = "vipGarde5";
            break;
            case 6:
            grade = "vipGarde6";
            break;
            case 7:
            grade = "vipGarde7";
            break;
            case 8:
            grade = "vipGarde8";
            break;
             default:
             break
      }
      return grade;
    }
  },
  methods:{
    receive(){
       this.$router.push('/memberPackage')
    },
    handleClickSlide(index) {
      vm.currIndex = index;
      this.activeIndex = index;
       this.selectVip = this.vipList[this.activeIndex];
      const self = this
      switch (index) {
        case 0:
          self.swiper.slideTo(0, 1000, false)
          break;
        case 1:
          self.swiper.slideTo(1, 1000, false)
          break;
        case 2:
          self.swiper.slideTo(2, 1000, false)
          break;
        case 3:
          self.swiper.slideTo(3, 1000, false)
          break;
        case 4:
          self.swiper.slideTo(4, 1000, false)
          break;
        case 5:
          self.swiper.slideTo(5, 1000, false)
          break;
        case 6:
          self.swiper.slideTo(6, 1000, false)
          break;
        case 7:
          self.swiper.slideTo(7, 1000, false)
          break;
      }

    },
    changeVipDj(currentIndex){
        //console.log('---'+currentIndex)
    },
    async getVipMess(){
        this.isLoading = false;
        let res = await this.$http.get('/api/user/vipinfo');
        if(res && res.data.code==1){
          // console.log(res)
           this.isLoading = true;
            this.userGrowth = res.data.info;
            this.vipList = res.data.vip_list;
            this.selectVip = this.vipList[this.userGrowth.vip>0?this.userGrowth.vip-1:this.userGrowth.vip];
            let i = this.userGrowth.vip>0?this.userGrowth.vip-1:this.userGrowth.vip;
            let total_recharge =  (this.userGrowth.total_recharge+''.replace(/，/,',').split(',').map(item=>item.trim()).join(''))-0;
            let next_total_recharge =  (this.userGrowth.next_total_recharge+''.replace(/，/,',').split(',').map(item=>item.trim()).join(''))-0;
            let total_flow =  (this.userGrowth.total_flow+''.replace(/，/,',').split(',').map(item=>item.trim()).join(''))-0;
            let next_total_flow =  (this.userGrowth.next_total_flow+''.replace(/，/,',').split(',').map(item=>item.trim()).join(''))-0;
            let re = total_recharge/next_total_recharge*100/2;
            let ls = total_flow/next_total_flow*100/2;
            this.currWz = (re>=50?50:re) + ((ls>=50)?50:ls);
            // console.log(this.currWz)
        }else{
             this.$vux.toast.text(res.data.msg, 'middle');
        }
    },
    initSwiper() {
      let _this = this;
      var mySwiper1 = new swiper("#swiperBanner1", {
        direction: "horizontal",
          autoplay: false,
          initialSlide:_this.$store.state.userinfo.vip>0?_this.$store.state.userinfo.vip-1:_this.$store.state.userinfo.vip,
          loop: false, //循环
          centeredSlides: true,
          on:{
            slideChangeTransitionEnd: function(){
              //_this.selectVip = _this.vipList[this.activeIndex];
              _this.selectVip = _this.vipList[this.activeIndex];
              vm.currIndex = this.activeIndex;
              //console.log('+++'+vm.currIndex);
            },
          },
          pagination: {
          el: "#bannerPagination1",
          clickable:true,
          type: "custom",
          //element : 'div',
          renderCustom: function(swiper, current, total) {
            var customPaginationHtml = "";
            for (var i = 0; i < total; i++) {
              if(i == current - 1){
                customPaginationHtml +=
                    '<span class="swiper-pagination-customs swiper-pagination-customs-active">VIP'+ (i+1)+'</span>';
              }else{
                customPaginationHtml +=
                    '<span class="swiper-pagination-customs">VIP'+ (i+1)+'</span>';
              }
            }
            return '<span class="swiperPag">'+customPaginationHtml+'</span>';
          },
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
        
      });
    },

  },
  components: {
    
    Swiper,
  },
}
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
  .head-box {
    .rem(font-size, 32);
    line-height: 1.2rem;
    background: linear-gradient(0deg,#0A0A0A,#555555);
    overflow: hidden;
    color: #fff;
    .infoHead {
      overflow: hidden;
      text-align: center;
      img {
        .rem(width, 23);
      }
      .head {
        height: 1.2rem;
        line-height: 1.2rem;
      }
      .vip-detail{
      
        .rem(width, 140);
        .rem(line-height, 40);
        .rem(font-size, 24);
        text-align: center;
        background: url("../../assets/images/vipRanking/top_detail.png");
        background-size: 100% 100%;
        // .rem(margin-top, 20);
        position: absolute;
        top:.3rem;
        right: 0;
      }
    }
    .vip-info{
      .rem(padding-top,42);
      .rem(padding-left, 30);
      .rem(padding-right, 30);
      .user-pic{
        .rem(width, 140);
        .rem(height, 140);
        border-radius: 50%;
      }
      .user-name{
        .rem(margin-left,41);
        .rem(margin-right,11);
      }
      .level{
        display: inline-block;
        .rem(width, 64);
        .rem(line-height, 31);
        .rem(font-size, 22);
        .rem(padding-left, 38);
        background: url("../../assets/images/vipRanking/level.png") no-repeat;
        background-size: 100% 100%;
      }
      .level-r{
        .rem(width, 150);
        .rem(height, 120);
        &.level0{
          background: url("../../assets/images/vipRanking/0.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level1{
          background: url("../../assets/images/vipRanking/1.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level2{
          background: url("../../assets/images/vipRanking/2.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level3{
          background: url("../../assets/images/vipRanking/3.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level4{
          background: url("../../assets/images/vipRanking/4.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level5{
          background: url("../../assets/images/vipRanking/5.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level6{
          background: url("../../assets/images/vipRanking/6.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level7{
          background: url("../../assets/images/vipRanking/7.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level8{
          background: url("../../assets/images/vipRanking/8.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .bar{
      width: 100%;
      .rem(margin-top,55);
      .rem(margin-bottom,50);
      .rem(padding-left, 25);
      //.rem(padding-right, 30);
      overflow: hidden;
      .bar-jdt{
        display: block;
        .rem(width,500);
        .rem(height,12);
        background: #666;
        border-radius: 6px;
        position: relative;
        .rem(margin-top,10);
        .rem(margin-left,29);
        .rem(margin-right,29);
        .bar-jdtbj{
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 6px;
          width: 0%;
          .rem(height,12);
          z-index: 1;
          background: linear-gradient(270deg, #FFA74E, #FFDCA9);
        }
      }
      .txt-l,.txt-r{
        .rem(height,24);
        .rem(width,72);
        font-family: 'Impact';
        font-weight: normal;
        .rem(font-size,30);
        color: #FFC27D;
        letter-spacing: 1px;
        display: inline-block;
        &.vipGarde1{
          background: url("../../assets/images/vipRanking/vip1.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde0{
          background: url("../../assets/images/vipRanking/vip0.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde2{
          background: url("../../assets/images/vipRanking/vip2.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde3{
          background: url("../../assets/images/vipRanking/vip3.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde4{
          background: url("../../assets/images/vipRanking/vip4.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde5{
          background: url("../../assets/images/vipRanking/vip5.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde6{
          background: url("../../assets/images/vipRanking/vip6.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde7{
          background: url("../../assets/images/vipRanking/vip7.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGarde8{
          background: url("../../assets/images/vipRanking/vip8.png") no-repeat;
          background-size: 100% 100%;   
        }
         &.vipGardemax{
          background: url("../../assets/images/vipRanking/max.png") no-repeat;
          background-size: 100% 100%;   
        }
      }
    }
    .info{
      .rem(line-height,24);
      .rem(font-size,24);
      color: #FFC27D;;
      .rem(padding-left, 30);
      p{
        .rem(margin-bottom,24);
      }
      .icon{
        .rem(width,30);
        .rem(height,30);
        background: url("../../assets/images/vipRanking/top_icon.png") no-repeat;
        background-size: 100% 100%;
        .rem(margin-right,23);
      }
      em{
        .rem(font-size,18);
        color: #666;;
      }
    }
  }
  .card-box{
    .rem(height,390);
    .rem(margin-top,20);
    .rem(padding-left,30);
    overflow: hidden;
    position: relative;
    .card-pic{
      .rem(width,690);
      .rem(height,300);
      .rem(padding-top,54);
      background: url("../../assets/images/vipRanking/mVIP2@2x.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      color: #fff;
      &.active{
        background: url("../../assets/images/vipRanking/xVIP2@2x.png") no-repeat center;
        background-size: 100% 100%;
        color: #FFC27D;
        h5{
          &.yxVip1{
          background: url(../../assets/images/vipRanking/1@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip2{
          background: url(../../assets/images/vipRanking/2@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip3{
          background: url(../../assets/images/vipRanking/3@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip4{
          background: url(../../assets/images/vipRanking/4@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip5{
          background: url(../../assets/images/vipRanking/5@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip6{
          background: url(../../assets/images/vipRanking/6@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip7{
          background: url(../../assets/images/vipRanking/7@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip8{
          background: url(../../assets/images/vipRanking/8@2x.png) no-repeat;
          background-size: contain;
        }
        }
        .tj{
        
            color: #fff;
        }
        .level-r{
          filter:none;
        }
      }
      h5{
        font-family: 'Impact';
        .rem(font-size,58);
        letter-spacing:3px;
        .rem(margin-bottom,80);
        .rem(margin-left,42);
        .rem(height,48);
        .rem(width,151);
        &.yxVip1{
          background: url(../../assets/images/vipRanking/vip1@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip2{
          background: url(../../assets/images/vipRanking/vip2@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip3{
          background: url(../../assets/images/vipRanking/vip3@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip4{
          background: url(../../assets/images/vipRanking/vip4@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip5{
          background: url(../../assets/images/vipRanking/vip5@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip6{
          background: url(../../assets/images/vipRanking/vip6@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip7{
          background: url(../../assets/images/vipRanking/vip7@2x.png) no-repeat;
          background-size: contain;
        }
        &.yxVip8{
          background: url(../../assets/images/vipRanking/vip8@2x.png) no-repeat;
          background-size: contain;
        }
      }
      .tj{
        .rem(font-size,24);
          display: flex;
          align-items: center;
          justify-content: space-around;
        >div{
          // width: 33.333%;
          text-align: center;
          //.rem(margin-right,80);
          &:last-of-type{
            margin-right: 0;
          }
          span{
            display: block;
          }
        }
      }
      .level-r{
        .rem(width, 150);
        .rem(height, 120);
        position: absolute;
        .rem(top,29);
        .rem(right,29);
        filter:  grayscale(100%) ;
        &.level0{
          background: url("../../assets/images/vipRanking/0.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level1{
          background: url("../../assets/images/vipRanking/1.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level2{
          background: url("../../assets/images/vipRanking/2.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level3{
          background: url("../../assets/images/vipRanking/3.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level4{
          background: url("../../assets/images/vipRanking/4.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level5{
          background: url("../../assets/images/vipRanking/5.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level6{
          background: url("../../assets/images/vipRanking/6.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level7{
          background: url("../../assets/images/vipRanking/7.png") no-repeat;
          background-size: 100% 100%;
        }
        &.level8{
          background: url("../../assets/images/vipRanking/8.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .swiper-pagination{
      .rem(width,690) !important;
      color: #666;
      background: url("../../assets/images/vipRanking/page_bg.png") center left no-repeat;
      transition: none;
      transform: none;
      bottom: 0 !important;
      .rem(left,30);
      overflow-x: scroll;
     &::-webkit-scrollbar {
       display: none;
     }
    }
  }
  .privilege{
    .rem(padding-left,30);
    padding-bottom:.3rem;
    overflow: hidden;
    .title{
      font-weight: bold;
      .rem(line-height,40);
      .rem(font-size,28);
      color: #C28B34;
      .rem(margin-top,59);
      .rem(margin-bottom,41);
      img{
        .rem(width,6);
        float: left;
        .rem(margin-right,14);
      }
    }
    dd{
      width: 50%;
      .rem(line-height,80);
      .rem(font-size,20);
      color: #696D84;
      float: left;
      .rem(margin-bottom,56);
      &:last-child{
        .rem(line-height,35);
      }
      .icon{
        .rem(width,80);
        .rem(height,80);
        float: left;
        .rem(margin-right,41);
        &.icon1{
          background: url("../../assets/images/vipRanking/icon_1.png") no-repeat;
          background-size: 100% 100%;
        }
        &.icon2{
          background: url("../../assets/images/vipRanking/icon_2.png") no-repeat;
          background-size: 100% 100%;
        }
        &.icon3{
          background: url("../../assets/images/vipRanking/icon_3.png") no-repeat;
          background-size: 100% 100%;
        }
        &.icon4{
          background: url("../../assets/images/vipRanking/icon_4.png") no-repeat;
          background-size: 100% 100%;
        }
        &.icon5{
          background: url("../../assets/images/vipRanking/icon_5.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .lq-btn{
        display:inline-block;
        .rem(line-height,35);
        .rem(border-radius,90);
        text-align: center;
        color: #71819D;
        background: #DEDEDE;
        .rem(padding-left,10);
        .rem(padding-right,10);
        .rem(margin-top,10);
        &.qlq{
          color: #fff;
          background: linear-gradient(90deg, #FFD5A4 0%, #FFB35C 100%) !important;
        }
      }
    }
  }
  .address-box{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    .add-content{
      background: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 2rem;
      width: 85.7%;
      border-radius: 10px;
      padding: 0 0.666rem;
      .close-icon{
        position: absolute;
        .rem(width,70);
        .rem(height, 70);
        bottom: -2rem;
        left: 50%;
        transform: translateX(-50%);
        background: url('../../assets/images/close-zc.png')no-repeat;
        background-size: contain;
      }
      h3{
        font-weight: bold;
        text-align: center;
        .rem(font-size,32);
        .rem(margin-top,40);
        .rem(margin-bottom,47);
      }
      p{
        color: #FF3131;
        .rem(font-size,16);
        .rem(margin-top,57);
      }
      >div{
        .rem(margin-bottom,22);
        .rem(line-height,58);
        color:#333;
        span{
          float: left;
          .rem(font-size,24);
          display: block;
        }
        input{
          float: right;
          background: #F5F6F9;
          .rem(height,58);
          .rem(font-size,14);
          padding-left: 0.2rem;
          border-radius: 3px;
          .rem(width,380);
        }
      }
      .submit-btn{
        .rem(width,540);
        .rem(height, 88);
        .rem(line-height,88);
        text-align: center;
        margin: 0 auto;
        border-radius: 100px;
        background: #eee;
        color:#999;
        .rem(font-size,36);
        .rem(margin-top,51);
        .rem(margin-bottom,85);
      }
    }
  }
</style>