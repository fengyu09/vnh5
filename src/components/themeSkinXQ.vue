<template>
  <div class="themeSkin" id="themeSkinXQ">
    <!-- <flexbox class="infoHead">
      <flexbox-item :span="1 / 10"
        ><div
          @click="fanhui()"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img src="../assets/images/gray-back-icon.png" alt="" />
          </div
      ></flexbox-item>
      <flexbox-item
        ><div class="flex-demo  tickling">主题皮肤</div></flexbox-item
      >
      <flexbox-item :span="1 / 10"><div class="flex-demo"></div></flexbox-item>
    </flexbox> -->
    <!-- <myScroll> -->
    <div class="skin-head " :style="'background: url('+imgBg+') no-repeat bottom;background-size: cover;'">
      
      <div class="fanhui flex-demo " style="z-index: 10000001;" @click="fanhui()">
        <img src="../assets/images/white-back-icon.png" alt="" />
      </div>
      <div class="skin-title  tickling">{{skinList.name}}</div>
      <div class="swiper-container swiper-skin" id="swiperSkin">
        <div class="swiper-wrapper">
          <div class="swiper-slide clearfix" v-for="(v,index) in skinList.images" :key="index" data-history='slide' >
            <div class="lunbo fl">
              <img v-lazy='v' alt="" />
            </div>
          </div>
        </div>
        <div
          class="swiper-pagination"
          id="SkinPagination"
          style="bottom:-0px;width:10rem"
        ></div>
        <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
      </div>
     
    </div>
    <!-- </myScroll> -->
    <div  :class="btnText == '正在使用' ? 'btn1':'btn'" @click="changeSkin()">{{btnText}}</div>
     
  </div>
</template>

<script>
// import { Flexbox, FlexboxItem } from "vux";
// import myScroll from "../components/myScroll";
import { mapState, mapMutations } from "vuex";
import myScroll from "../components/myScroll.vue"; //纵向滚动
import swiper from "swiper";
// import { Swiper, SwiperItem } from "vux";
export default {
  name: "themeSkinXQ",
  components: {
    // Flexbox,
    // FlexboxItem,
    // swiper,
    // SwiperItem
    myScroll
  },

  data() {
    return {
      select: 0,
      select1: false,
      index1: 0,
      skinList: [],
      skinId: "",
      btnText:'立即使用',
      sid:0 ,//默认为默认皮肤
      winWidth:0,
      imgBg:''
    };
  },
  computed: {
    ...mapState(["skin","skinData"])
  },
  mounted() {
      
    this.getAllSkin();
    
    if(window.innerWidth==414){
       this.winWidth = 5
    }
    if(window.innerWidth==375 || window.innerWidth==360){
        this.winWidth = 15
    }
    if(window.innerWidth == 411){
        this.winWidth = 10
    }
    // if(window.innerWidth > 411){
    //     this.winWidth = 1
    // }

    var mySwiper1 = new swiper("#swiperSkin", {
      autoplay: false,
      loop: false, //循环
      pagination: {
        el: "#SkinPagination"
      },
    //   width:"270",       //宽度
      width : window.innerWidth-105,
      spaceBetween:this.winWidth, //slide距离
      initialSlide :2, //初始页索引
      centeredSlides: true,
    //   slidesPerView : 3,
    //   history: 'slide',
      slideToClickedSlide: true,
      nextButton: '#swiper-button-next',
      prevButton: '#swiper-button-prev',
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    // console.log(window.innerWidth)
    // console.log(mySwiper1.passedParams.spaceBetween)
  },
  created() {
    // console.log(this.skin)
    this.index1 = this.skin;
    if(this.index1 == (parseInt(this.$route.params.id) + 0 - 1)){
        this.btnText = '正在使用'
        
    }
    // if(window.innerWidth)
    // console.log(mySwiper1.passedParams.spaceBetween)
    // console.log(JSON.parse(this.$store.state.webInitData).default_skin)
    
  },
  methods: {
    ...mapMutations(["SETSKINDATA","SETSKINBS"]),
    getAllSkin() {
    
      this.$http
        .get("/api/common/get_skin_list/", {
          params: {
              id:this.$route.params.id || 1
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.skinList = res.data.data;
            this.imgBg =  res.data.data.bg_image;
          }
        })
        .catch(err => {});
    },
    fanhui() {
      this.$router.push("/themeSkin");
      //  window.location.reload();//刷新当前页面
      //   this.$router.go(-1)//返回上一页
    },
    changeSkin(){
      if(this.btnText=='正在使用') return;
        this.sid = parseInt(this.$route.params.id) + 0 - 1
        this.SETSKINDATA(this.sid);
        // console.log(this.sid);
        this.btnText = '正在使用';
        this.SETSKINBS(1);
        this.$router.push('/themeSkin');
    }
  }
};
</script>

<style scoped lang="less">
#swiper-button-prev,#swiper-button-next{
    transform: scale(0.9);
}
.themeSkin {
  background-color: #f5f7fa;
  height: 100vh;
}
.flex-demo {
  text-align: center;
  position: absolute;
  left: 0.4rem;
  top: 0.334rem;
  img {
    width: 0.25rem;
  }
}
.tickling {
  text-align: center;
  width: 100%;
  font-weight: 550;
  font-size: 0.45rem;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #fff;
}
.skin-head {
  position: relative;
  height: 8.67rem;
  // background: url("../assets/images/member/1_02-min.png") no-repeat bottom;
  background-size: cover!important;
}
.swiper-skin {
  position: absolute;
  top: 1.428rem;
  left: 0;
  z-index: 1000;
  .lunbo {
    width: 7.2rem;
    margin: 0 0.32rem;
    // height: 11.71rem;
    // margin: 0 auto;
  }
}
.swiper-container {
  --swiper-pagination-color: #ff513e; /* 两种都可以 */
  padding-bottom: 30px;
}
.btn{
    width: 81.3333%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    font-family: "PingFang-SC-Bold";
    font-weight: bold;
    font-size: 0.36rem;
    border-radius: 100px;
    // background: linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
    background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    // position: fixed;
    position: fixed;
    // bottom: 1.428rem;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100000;
}
.btn1{
    width: 81.3333%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ccc;
    font-family: "PingFang-SC-Bold";
    font-weight: bold;
    font-size: 0.36rem;
    border-radius: 100px;
    background:#fff;
    // position: fixed;
    position: fixed;
    // bottom: 1.428rem;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
}
.swiper-slide{
    // width: 270px!important;
    // margin: 0 0.32rem!important;
    transform: scale(0.92)!important;
    transition: all .1s ease-out;
}
</style>
