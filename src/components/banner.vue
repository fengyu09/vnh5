<template>
  <!--轮播图-->
    <div :class="[{'banner': $store.state.skin==0},
                  {'bannerBG': $store.state.skin==1},
                  {'banner-dw-home': $store.state.skin==2},
                  {'banner-qrj-home': $store.state.skin==3},
                  {'banner-gq-home': $store.state.skin==4},
                  {'banner-sdj-home': $store.state.skin==5},
                  {'banner-ox-home': $store.state.skin==6},
                  {'banner-uefa-home': $store.state.skin==7},
                  ]">
        <div class="" id="swiperBanner" v-show="bannerList.length" style="position: relative;">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(v,index) in bannerList" :key="index">
                    <div class="lottery-item clearfix">
                        <a href="javascript:;" v-if="v.url" @click="goUrl(v.url,v.title)">
                            
                            <div class="banner-img">
                                <img :src="v.image_url" alt />
                            </div>
                        </a>
                        <a href="javascript:;" v-else>
                          
                            <div class="banner-img">
                                <img :src="v.image_url" alt />
                                <!--<img v-lazy="v.image_url" alt="">-->
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination" id="bannerPagination" style="bottom:17px"></div>
            <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
        </div>
        <div class="no-banner" v-if="!bannerList.length"></div>
    </div>
</template>

<script>
import swiper from "swiper";
export default {
  name: 'noData',
  data(){
      return{
        bannerList:[]
      }
  },
  props:{
    banner:{
      typeof:Array,
      default:[]
    }
  },
  created(){
    this.bannerList = this.banner;
    // console.log(34444333,this.bannerList)
  },
  methods:{
    initSwiper(){
      let mySwiper1 = new swiper("#swiperBanner", {
      autoplay: {
          delay: 3000 // 5秒切换一次
      },
      loop: true, //循环
      autoplay:true,
      pagination: {
          el: "#bannerPagination"
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
  },
  mounted(){
    this.initSwiper();
  }

}
</script>

<style scoped lang="less">

     .banner {
        text-align: center;
        a {
            display: block;
            // padding-bottom: 0.1rem;
            // height: 4.4rem;
            > div {
                background: #f3f3f3;
                height: 100%;
                border-radius: 5px;
                overflow: hidden;
                width: 94.6%;
                box-shadow: 0px 1px 10px #ececec;
                display: inline-block;
                img {
                    /*height: 100%;*/
                    border-radius: 5px;
                }
            }
        }
    }
    .bannerBG,.banner-dw-home,.banner-qrj-home,.banner-gq-home,.banner-sdj-home,.banner-ox-home,.banner-uefa-home {
        text-align: center;
        background: url('../assets/images/newyear/top.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -1.5rem;
        a {
            display: block;
            padding-bottom: 0.4rem;
            height: 4.4rem;
            > div {
                // background: #f3f3f3;
                height: 100%;
                border-radius: 5px;
                overflow: hidden;
                width: 94.6%;
                // box-shadow: 0px 5px 20px #ececec;
                display: inline-block;
                img {
                    /*height: 100%;*/
                    border-radius: 5px;
                }
            }
        }
    }
    .banner-qrj-home{
        background: url('../assets/images/ValentineDay/he1.png') no-repeat bottom;
        background-size: cover;
        background-position-y: -1.5rem;
    }
    .banner-dw-home{
        background: url('../assets/images/dw/WDL.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -1.5rem;
    }
    .banner-gq-home{
        background: url('../assets/images/National Day/dbbj.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -1.5rem;
    }
    .banner-sdj-home{
        background: url('../assets/images/Christmas/title1.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -2.4rem;
    }
    .banner-ox-home{
        background: url('../assets/images/oxYear/bg.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -2.4rem;
    }
    .banner-uefa-home{
        background: url('../assets/images/UEFA/bg.png') no-repeat bottom;
        background-size: 100% 100%;
        background-position-y: -2.4rem;
    }

    .no-banner {
        height: 4.2rem;
        background: #ededed;
        width: 94.6%;
        margin: 0 auto;
        border-radius: 5px;
        margin-bottom: 0.4rem;
    }
</style>
