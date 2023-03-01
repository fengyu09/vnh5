<template>
    <div class="video-home">
          <div class="look-num clearfix" :class="[{'look-num-pink':skin==1},{'look-num-blue':skin==2},{'look-num-green':skin==3},{'look-num-maingreen':skin==4},{'look-num-golden':skin==5}]">
            
           
            <router-link to="/invite"  class="fr look-share "></router-link>
            <router-link to="/myVideo?type=2" class="fr look-cart" ></router-link>
          </div>         
        <div class="video-menu" v-if="isFl" :class="[{'pink-video-menu':skin==1},{'blue-video-menu':skin==2},{'green-video-menu':skin==3},{'maingreen-video-menu':skin==4},{'golden-video-menu':skin==5}]">
            <span :class="{active:menuActive==item.typeId}" v-for="(item,index) in videoTopMenu" :key="index" v-show="index<videoTopMenu.length-1" @click="changeMenu(item,index)">{{item.name}}</span>
            <i  @click="moreActive=!moreActive;openMenu=!openMenu"></i>
        </div>

         <myScroll
                ref="scrollWrapper"
                :top="3"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                 v-on:func="reLoad"
                 :isDown="false"
                :isLoad="isL"
                :bgColor="$st.state.skin==5?'1F252C':''"
              >
            <!--        精品轮播-->
           <div class="banner-box">
                <div class="video-header-bg" ></div>
                <!--<div class="banner-box1" v-if="bannerList.length"> -->
                  <div class="banner-box1">
                    
                    <div class="swiper-container" id="swiperBanner" v-show="menuActive==36">
                        <div class="swiper-wrapper">
                              <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index" @click="toBannerUtl(item.url)">
                              <img v-lazy="item.image_url" alt="" srcset="">
                              </div>

                        </div>
                        <div class="swiper-pagination" id="bannerPagination" style="bottom:17px"></div>
                    </div>
                      <!-- 其他分类推广图-->
                    <div v-if="menuActive!=36">
                      <!-- {{menuActive}} -->
                        <img   v-lazy="bannerOther['banner_movie_type_'+menuActive].image_url" alt="">
                        <!-- <img   v-lazy="bannerOther['banner_movie_type_64'].image_url" alt=""> -->
                    </div>
                </div>
           </div>
           
           <div class="video-main" >
            <div class="video-box"  v-for="(item,index) in videoList" :key="index" >
                <div class="list-title" v-if="item.list.length">
                    <div class="list-name" :class="[{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3},{'maingreen-active':skin==4},{'golden-active':skin==5}]">{{item.name}}</div>
                    <i class="lits-more" @click="goMore(item.pid,item.id)">{{$t('videoCenter[0]')}}></i>
                </div>
                <div class="video-list">
                    <div class="list-item" v-for="(item2,index2) in item.list" :key="index2" v-if="index2<6" @click="goPlay(item2,item)">
                        <div class="item-img">
                            <div class="img-box" style="background:#f5f5f5">
                                <img v-lazy="item2.cover" alt="">
                            </div>
                            <div class="video-describe">
                                <div>
                                    <i><img src="../../assets/images/video/bf-icon.png" alt="" srcset=""></i> <span>{{item2.reads | filterOnlineNum}}</span>
                                </div>
                                <div>
                                    <span>{{item2.play_time | filterSecond}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-name">
                            <span>{{item2.title}}</span>
                        </div>
                    </div>
                     <div class="list-item" v-if="item.list.length%3==2&&item.list.length<6" style="opacity: 0;">
                     </div>
                </div>
                <div class="change-list" v-if="item.list.length==6">
                    <span @click="changeOne(item.id,item.pid,index)">{{$t('videoCenter[1]')}}</span>
                </div>
            <div style="margin-top: .3rem;max-height:2rem;overflow:hidden" v-if="index==1&&bannerZm.length&&item.list.length" @click="toBannerUtl(bannerZm[0].url)">
                <img v-lazy="bannerZm[0].image_url" alt="" srcset="" width="100%" >
            </div>
            </div>


               <div v-if="!littleData.length&&!isloadingMovie" class="no-video-tip">
                   <img src="../../assets/images/video/no_video_icon.png" alt="">
                   <p style="text-align: center">{{$t('videoCenter[2]')}}！</p>
               </div>
              <div v-if="videoList.length ==0" class="no-video-tip">
                  <img src="../../assets/images/video/no_video_icon.png" alt="">
                  <p style="text-align: center">{{$t('videoCenter[3]')}}！</p>
              </div>
           </div>
         </myScroll>
         <myScroll
                ref="scrollWrapper2"
                :top="2.9"
                :bottom="1.4"
               v-show="openMenu"
               :bgColor="$st.state.skin==5?'1F252C':''"
              >
                <div class="more-menu"  :class="skin==5?'more-menu-golden':''">
                   <div class="menu-gc" v-for="(item,key) in videoMenu" :key="key" >
                     <div class="list-title"> <i :class="[{'blue-bg':skin==2},{'green-bg':skin==3},{'maingreen-bg':skin==4},{'pink-bg':skin==1},{'golden-bg':skin==5}]"></i> {{item.name}}</div>
                     <div class="menu-list">
<!--                       <span v-for="(v,index) in item.children" :key="index" @click="changeType($event,item,v)">{{v.name}}</span>-->
                       <span :class="[{'skin-border-blue':skin==2},{'skin-border-green':skin==3},{'skin-border-maingreen':skin==4},{'skin-border-pink':skin==1},{'skin-border-golden':skin==5}]" v-for="(v,index) in item.children" :key="index" @click="goMore(item.id,v.id)">{{v.name}}</span>
                     </div>
                   </div> 

                </div>
          </myScroll>
 

        <div class="look-remind" v-show="showRemind">
            <div class="remind-box">
                <div class="title">登录提示</div>
                <div class="confirm-btn" @click="$router.push('/login')">登录观看完整版本</div>
                <div class="cancel-btn" @click="testLook()">试看</div>
                <div class="closeBtn" @click="showRemind=false"></div>
            </div>
        </div>

        
</div>
    
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {removeAllactive} from '../../assets/js/public.js'
import swiper from "swiper";
import { setToken,getToken } from '../../store/cookie';
import "../../../node_modules/swiper/css/swiper.min.css";

import qs from 'qs'
export default {
    name:'videoHome',
    data(){
        return{
            // isNew:0,//,
            nNum: 0,
            moreActive:false,
            videoMenu:{},//分类
            videoTopMenu:[],//大分类
            isFl:false,
            videoList:[],//列表
            videoList2:[],//列表2
            menuActive:'',
            openMenu:false,
            changeLoading:false,
            postData:{
                cid:'',
                typeId:1,
                limit:6,
                //isMore:true,
                page:1,
                code:this.defalutLan
            },
            isUpFlag:true,
            isLup:false,
            isL: false, //是否显示 下拉刷新的组件
            defaultShowlist:1,
            isNotMore:false,
            bannerList:[],//精品轮播
            bannerOther:{},//其他类型推广图
            bannerZm:[],//主播招募图
            isloadingMovie:true,
            littleData:[],
            isShowNewDot:false,
            showRemind:false,
            currClick:{},
            freeNum:0
            
        }
    },
    filters:{
        filterMenuClass(n){
            let c = "";
            switch (n) {
                case "国产":
                    c="menu-gc";
                    break;
                case "三级":
                    c="menu-sj";
                    break;
                case "欧美":
                    c="menu-om";
                    break;
                case "日韩":
                    c="menu-rh";
                    break;
                case "动漫":
                    c="menu-dm";
                    break;
                default:
                break;
            }
            return c;
        },
    },
    components:{
        swiper,
      
    },
    computed: {
    ...mapState([
      "codeToken",
      "diamond",
      "hcData",
      "userinfo",
      "skin",
      'defalutLan'
    ])
  },
  created(){
       this.getFl();//分类
       this.getBanner();
       
    
  },
  mounted(){
       document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false }
    );
    var mySwiper1 = new swiper("#swiperBanner", {
      autoplay: {
        delay: 3000 
      },
      loop: true,
      pagination: {
        el: "#bannerPagination"
      },
      observer: true, 
      observeParents: true 
    });
    
  },
  watch:{
    menuActive:function(i){
        this.defaultShowlist=1;
        this.isNotMore=false;
        this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
    },
    videoList:function(){
      this.$nextTick(()=>{
              setTimeout(()=>{
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
              },20)

           })
    },
    
  },
  methods:{
          ...mapMutations(["SETPOSITIONY","SETHCDATA"]), 
          goMore(item_id,v_id){
            // alert(this.codeToken)
            if (!this.codeToken) {
                 this.$popup();
            }else{
                 this.$router.push('/videoMore/'+item_id+'/'+v_id)
            }
           
          },
     async getPlayNum(){
           let res = await this.$http.get('/api/live/movie/getLastNum/',{params:{language:this.defalutLan}});
          if(res && res.data.code==1){
            this.freeNum = res.data.data.free_watch_nums;
          }
      },
     
        goPlay(v,item){

            if (!this.codeToken) {
                // this.showRemind=true;
                this.currClick = v;
                 this.$popup();

            }else{
                this.$router.push('/videoPlay/' + v.id);
            }
        },
        
      async getBanner(){
            let res = await this.$http.get('/api/live/movie/get_movie_banner/');
            if (res && res.data.code == 1) {
              //console.log(res.data.data)
              this.bannerList=res.data.data.banner_movie_home|| [];
              this.bannerZm = res.data.data.banner_movie_list || [];
              this.bannerOther = res.data.data.banner_movie_type_list || [];
              // console.log(this.bannerOther)
              if(res.data.data.banner_movie_play) localStorage.setItem('banner_movie_play',JSON.stringify(res.data.data.banner_movie_play))
                else localStorage.setItem('banner_movie_play',JSON.stringify([]))
            }
       },
        //换一批
      async changeOne(cid,pid,i){
          this.isloadingMovie = true;
          this.postData.cid=cid;
          this.postData.typeId=pid;
          this.postData.page++;
          this.changeLoading = true;
          let d = this.globalPpproach.checkIsEncrypt(this.postData)
          let res = await this.$http.post('/api/live/movie/domestic',this.postData);
          this.changeLoading = false;
          if(res && res.data.code==1){
            this.videoList[i].list=res.data.data;
            // if(res.data.data.length<6) this.$vux.toast.text("当前分类已经没有了，请查看其他分类吧",'middle');
          }else {
              this.$vux.toast.text(res.data.msg, 'middle');
          }
      },

      changeMenu(item,index){
          removeAllactive(document.querySelectorAll('.menu-list>span'));
          this.menuActive=item.typeId;
          this.defaultShowlist = 1;
          this.openMenu = false;
          this.moreActive = false;
          this.postData.page = 1;
          this.getVideoList(false,item.typeId);
      },
      async changeType(e,item,v){
          if(this.changeLoading) return;
         let obj = {};
         //改变样式
          let curr = e.currentTarget;
          removeAllactive(document.querySelectorAll('.menu-list>span'));
          curr.classList.add('active');
          this.moreActive=!this.moreActive;
          this.openMenu=!this.openMenu;
          this.menuActive = -1;
         //重新请求数据
          this.postData.cid=v.id;
          this.postData.typeId=item.id;
          this.postData.page = 1;
          this.menuActive = item.id;
          // let res = await this.$http.post('/video/domestic',this.postData);
          let d = this.globalPpproach.checkIsEncrypt(this.postData)
          let res = await this.$http.post('/api/live/movie/domestic/',this.postData);
          this.isloadingMovie = false;
          if(res && res.data.code==1){
              obj.name = v.name;
              obj.id = v.id;
              obj.pid = item.id;
              obj.list = res.data.data;
              this.littleData = res.data.data;
              this.videoList = [obj];
          }else{
              this.$vux.toast.text(res.data.msg, 'middle');
          }
      },
      //请求首页列表
      async getVideoList(flag,id){
          if(id){
             setToken('videoCurrType',id);
          }
          //  id = id || getToken('videoCurrType');
          let index = this.videoTopMenu.findIndex(v=>{
                return getToken('videoCurrType') == v.typeId
          })
          if(index>-1){
            id=getToken('videoCurrType');
            
          }else{
            if(this.defalutLan=='vi-vn'){
              id=31;
            }else{
              id=61;
            }
          }
           console.log(202020,id)
           if(flag) this.isL=true;

           if(this.hcData[id]&&this.hcData[id].length){
              this.isL=false;
              this.videoList = this.hcData[id];
              setTimeout(() => {
                this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                this.isLup=false
              }, 200);
              return 
           } 
           console.log(8989);
           let res = await this.$http.post('/api/live/movie/get_movie_list/',{cid:this.menuActive,limit:6,page:1,code:this.defalutLan});
            this.isL=false;
            if(res && res.data.code==1 && res.data.data){
              this.videoList=res.data.data||[];
              this.SETHCDATA({name:id,data:this.videoList})
            }else {
                this.$vux.toast.text(res.data.msg, 'middle');
            }
            setTimeout(() => {
              this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
              this.isLup=false
            }, 200);

           





           
          
          
           
      },
      async getFl(){
          if(this.hcData.videoMenu&&this.hcData.videoMenu.length){
            this.isFl = true;
            this.videoMenu = this.hcData.videoMenu;
            for(let k in this.videoMenu){
                  this.videoTopMenu.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id});
              }
            return
          }
          let res = await this.$http.get('/api/live/movie/get_movie_sort/',{params:{code:this.defalutLan}}) ;
          if(res && res.data.code==1){
              this.isFl = true;
              this.videoMenu = res.data.data;
              this.SETHCDATA({name:'videoMenu',data:this.videoMenu})
              for(let k in this.videoMenu){
                  this.videoTopMenu.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id});
              }
              let index = this.videoTopMenu.findIndex(v=>{
                return getToken('videoCurrType') == v.typeId
              })
              if(index>-1){
                this.menuActive=getToken('videoCurrType');
                
              }else{
                if(this.defalutLan=='vi-vn'){
                  this.menuActive=31;
                }else{
                  this.menuActive=61;
                }
              }
              this.getVideoList();//列表
          }
        },
      tomsg() {
      if (!this.codeToken) {
        this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
      } else {
        //是否冻结 或者是否设置支付密码
        this.$router.push("/messageCenter");
      }
    },
     goUser() {
      if (this.codeToken) {
        this.$router.push("/member");
      } else {
        //登录弹窗
        this.$router.push("/login");
      }
    },
    reLoad(data,obj) {
      if (data == "down") {
        this.defaultShowlist=1;
        this.videoList=[];
        removeAllactive(document.querySelectorAll('.menu-list>span'));
        this.isloadingMovie = true;
        this.getVideoList(true);
        localStorage.setItem('videoList','');
      } else if (data == "up") {
 
      }else if(data=='end'){
        obj.name = this.$route.name;
        this.SETPOSITIONY(obj)
        
      }
    },
    toBannerUtl(u){
      if(u)  window.open(u)
    },
        goCZ(){
      if (!this.codeToken) {
        this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
      }else{
        this.$router.push('/withdrawalTopUp/1')
      }
    }

  }
}
</script>
<style lang="less" scoped>
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }

    .video-menu{
        position: absolute;
        top:2rem;
        // top:1rem;
        z-index: 10;
        height: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        span{color: #000;display: inline-block;padding: 0 0.1rem;position: relative;font-size: .33rem;height: .8rem}
        i{display: inline-block; width: 0.5rem;height: 0.32rem; background: url("../../assets/images/video/more1.png") no-repeat ;
        background-size: 100% 100%;margin-bottom: .28rem;}
        .active{
            color: #1486FF;
            font-weight: bold;
            &:before{
                content: '';
                display: block;
                width: 45%;
                height: 4px;
                background: #1486FF;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0rem;
                border-radius: 4px;
            }
        }
        i.moreActive{background: url("../../assets/images/video/more2.png") no-repeat ;background-size: 100% 100%;}
    }
  .pink-video-menu{
     .active{
            color: #FB796B;
            &:before{
                background: #FB796B;
            }
        }
  }
  .green-video-menu{
     .active{
            color: #0B9B71;
            &:before{
                background: #0B9B71;
            }
        }
  }
    .maingreen-video-menu{
     .active{
            color: #01BE79;
            &:before{
                background: #01BE79;
            }
        }
  }
  .golden-video-menu{
    background: #252A31;
    span{
      color:#928151;
    }
     .active{
            color: #E3CF95;
            &:before{
                background: #E3CF95;
            }
        }
        i{background: url("../../assets/images/skin/golden/more.png") no-repeat !important;background-size: 100% 100% !important;}
  }
  .blue-video-menu{
     .active{
            color: #0CB6D9;
            &:before{
                background: #0CB6D9;
            }
        }
  }
  .look-num{
      position: absolute;
      z-index: 10;
      // width: 76%;
      width: 100%;
      top:1.2rem;
      // top:4.8rem;
      padding:0 0.5rem;
      // margin-left: 0.5rem;
      i{
          font-weight: bold;
          .rem(font-size,24);
          // color:#EE3C1A;
          color:#1486FF;
      }
      a{
        display: block;
        .rem(height,48);
        .rem(width,48);
        background: url('../../assets/images/video/buyCart.png')no-repeat;
        background-size: contain;
        &.look-share{
          background: url('../../assets/images/video/Vector.png')no-repeat;
          background-size: contain;
          margin-left: 0.2rem;
        }
        
       
      }
      &.look-num-pink{
        a{
           background: url('../../assets/images/skin/pink/buyCart.png')no-repeat;
            background-size: contain;
            &.look-share{
              background: url('../../assets/images/skin/pink/share.png')no-repeat;
              // background-size: contain;
              background-size: 80% 80%;
              margin-top: 0.05rem;
            }
        }
      }
      &.look-num-blue{
        a{
           background: url('../../assets/images/skin/blue/buyCart.png')no-repeat;
            background-size: contain;
            &.look-share{
              background: url('../../assets/images/skin/blue/share.png')no-repeat;
              // background-size: contain;
              background-size: 80% 80%;
              margin-top: 0.05rem;
            }
        }
      }
      &.look-num-green{
        a{
           background: url('../../assets/images/skin/green/buyCart.png')no-repeat;
            background-size: contain;
            &.look-share{
              background: url('../../assets/images/skin/green/share.png')no-repeat;
              // background-size: contain;
              background-size: 80% 80%;
              margin-top: 0.05rem;
            }
        }
      }
       &.look-num-maingreen{
        a{
           background: url('../../assets/images/skin/maingreen/buyCart.png')no-repeat;
            background-size: contain;
            &.look-share{
              background: url('../../assets/images/skin/maingreen/share.png')no-repeat;
              // background-size: contain;
              background-size: 80% 80%;
              margin-top: 0.05rem;
            }
        }
      }
      &.look-num-golden{
        background: #252A31;
        top: 1rem;
        padding: .2rem;
        a{
           background: url('../../assets/images/skin/golden/buyCart.png')no-repeat;
            background-size: contain;
            &.look-share{
              background: url('../../assets/images/skin/golden/share.png')no-repeat;
              // background-size: contain;
              background-size: 80% 80%;
              margin-top: 0.05rem;
            }
        }
      }
  }
  .other-look{
    i{
      color: #fff;
    }
  }
.video-home{
    .video-navigation{
        position: relative;
        color: #fff;
        text-align: left;
        padding-left: 0.5rem;
        span{
            position: relative;
            display: inline-block;
            margin-right: 0.2rem;
            font-size: .38rem;
        }
        span.active{
            font-size: 0.45rem;
            &:before{
                content: '';
                display: block;
                width: 45%;
                height: 4px;
                background: #fff;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                border-radius: 4px;
            }
        }
    }

     .banner-box{
            position: relative;
            // width: 97%;
            z-index: 2;
            // margin: 0 auto;
            // margin-top: 3.8rem;
            height: 4.533rem;
            // background: url("../../assets/images/video/banner.png") no-repeat ;background-size: 100% 100%;
            img{
              width: 100%;
              height: 4.533rem;
              border-radius: 0.2rem;
            }
            .banner-box1{
              width: 97%;
              margin: 0 auto;
              position: relative;
              z-index: 2;
            }
            .video-header-bg{
              width: 100%;
              position: absolute;
              left: 0;
              top: -0.02rem;
              height: 1.655rem;
              z-index: 1;
              // background: url("../../assets/images/video/video-bg.png") no-repeat bottom;
              background-size: 100%;
            }
            .video-header-dw{
                background: url('../../assets/images/dw/WDL.png') no-repeat bottom!important;
                background-size: 100%!important;
            }
            .video-header-new{
                background: url('../../assets/images/newyear/top.png') no-repeat bottom!important;
                background-size: 100%!important;
            }
            .video-header-qrj{
              background: url('../../assets/images/ValentineDay/header-min.png') no-repeat bottom!important;
              background-size: 100%!important;
            }
            .video-header-gq{
              background: url('../../assets/images/National Day/dbbj.png') no-repeat bottom!important;
              background-size: 100%!important;
            }
            .video-header-sdj{
              background: url('../../assets/images/Christmas/title1.png') no-repeat bottom!important;
              background-size: 100%!important;
            }
            .video-header-ox{
              background: url('../../assets/images/oxYear/bg.png') no-repeat bottom!important;
              background-size: 100%!important;
            }
            .video-header-uefa{
              background: url('../../assets/images/UEFA/bg.png') no-repeat bottom!important;
              background-size: 100%!important;
            }

        }
    .video-main{
        padding: 0 0.266rem 1rem .266rem;
        // padding: 0.8rem 0.266rem 1rem .266rem;
        // background: #F5F7FA;
        .video-box2{
            padding-bottom: 1rem;
        }
        .video-box{
            .list-title{
                font-size: 0.38rem;
                position: relative;
                margin: 0.26rem 0;
                .list-name{
                     padding-left: 0.2rem;
                    position: relative;
                    &:before{
                        content: '';
                        display: block;
                        width: 0.08rem;
                        height: 0.4rem;
                        position: absolute;
                        // background-color: #FD614B;
                        background-color:#1486FF;
                        left: 0;
                        top: 0.09rem;
                    }
                }
                .lits-more{color: #999999;position: absolute;right: 0;top: 0.04rem;}
            }
            .video-list{
                display: flex;
                justify-content: space-between;
                flex-wrap:wrap;
                .list-item{
                    background:rgba(255,255,255,1);
                    box-shadow:0px 5px 5px 0px rgba(102,102,102,0.05);
                    border-radius:6px 6px 0px 0px;
                    overflow: hidden;
                margin-bottom: 0.35rem;
                    width: 2.93333333rem;
                .item-name{
                    .rem(font-size,24);
                    padding: 0.1rem 0;
                     background: #fff;
                    span{
                        display: inline-block;
                        width: 95%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .item-img{
                    position: relative;
                    .img-box{
                        position: relative;
                        .rem(height,300);
                        .rem(width,220);
                        overflow: hidden;
                        text-align: center;
                        img{
                            height: 130%;
                            width: auto;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                    .video-describe{
                        display: flex;
                        width: 100%;
                        position: absolute;
                        bottom: 0.1rem;
                        justify-content: space-between;
                        padding: 0 0.15rem;
                        color: #fff;
                        .rem(font-size,18);
                        img{
                            .rem(height,22);
                            .rem(width,22);
                            vertical-align: bottom;
                        }
                    }
                }
                }

            }
            .change-list{
                text-align: center;
                color: #666666;
                font-size: 0.38rem;
                span{
                    padding: 0.1rem;
                }
                }
        }
    }
    .more-menu{
      background: #fff;
      font-size: 0.42rem;
      padding:.1rem .2rem 1rem 0.2rem;
      box-sizing: border-box;
      i{ 
        display: inline-block;
        width: 0.1rem;
        height: 0.4rem;
        background-color: #1486FF;
        float: left;
        margin-top: 0;
        margin-right: 0.1rem;
        border-radius: 0.1rem;
      }
      // .list-name{}
      .list-title{margin: 0.4rem 0;.rem(font-size,28)}
      .menu-list{
        /*display: flex; flex-wrap:wrap;justify-content: space-between;*/
        span{padding: 0.06rem 0.2rem; text-align: center;.rem(font-size,24);border: 1px solid #1486FF;color: #666666;
            border-radius: 0.32rem;margin: 0.35em .2rem .1rem 0;display: inline-block}
        .active{background: #1486FF;color: #fff;}
      }
      .menu-sj{
        i{background-color: #0048FF;}
        .menu-list{
          span{border-color: #0048FF;}
          .active{background: #0048FF;color: #fff;}
        }
      }
      .menu-om{
         i{background-color: #C100D8;}
        .menu-list{
          span{border-color: #C100D8;}
          .active{background: #C100D8;color: #fff;}
        }
      }
      .menu-rh{
         i{background-color: #FADA00;}
        .menu-list{
          span{border-color: #FADA00;}
          .active{background: #FADA00;color: #fff;}
        }
      }
        .menu-dm{
            i {
                background-color: #FADA00;
            }

            .menu-list {
                span {
                    border-color: #05D700;
                }

                .active {
                    background: #05D700;
                    color: #fff;
                }
            }
        }
        &.more-menu-golden{
          background: #1F252C;
          .list-title{
            color: #CECECE;
          }
          span{
            color: #CECECE !important;
            background: #464B53 !important;
            border: 1px solid #464B53 !important;
          }
        }
    }
}
.no-video-tip{
        text-align: center;
        margin: 0 auto;
        img{
            .rem(width,340);
            .rem(height,234);
            margin: 1rem auto;
        }
        p{
            .rem(font-size,24);
            
        }
    }

    .time-out-tip{
         .remind-box{
             width: 90%;
             .confirm-btn,.cancel-btn{
                width: 40%;
                display: inline-block;
                margin:.3rem 0 0 0;
            }
            .cancel-btn{
                color: #666;
                border:1px solid #999;
            }
        p{
            color: #666;
            padding: .5rem 1rem;

        }
         }
        
    }
</style>