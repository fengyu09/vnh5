<template>
  <div id="guess">
    <!--playList :需要传一个数据进来，因为当数据发生变化时，滚动条也需要refresh刷新 必选-->
    <!--isDown:是否需要下拉刷新 如果为true 那么需要有 isLoad属性 如果为false isLoad不需要-->
    <!--isUp:是否需要上拉加载更多 如果为true 那么需要有 isloadUp属性 如果为false isloadUp不需要-->
    <!--reLoad：回调函数  下拉刷新或者上拉加载更多调用接口-->
    <!-- 标题 -->
    <!--    <div class="gifShow fadeInLeft">-->
    <!--      <span class="tx"><img src="" alt=""></span>-->
    <!--      <dl class="nickAGif">-->
    <!--        <dt>不懂问师叔</dt>-->
    <!--        <dd>送出 <span>兰博基尼</span></dd>-->
    <!--      </dl>-->
    <!--      <div class="gifts"><img src="../../assets/images/lbjn.png" alt=""></div>-->
    <!--      <div class="num"><i>X</i>10</div>-->
    <!--    </div>-->
    <div :class="[{topHead:isNew==0},
                  {topBG:isNew==1},
                  {'header-dw':isNew==2},
                  {'whiteColor':isNew==2 || isNew==3},
                  {'header-qrj':isNew==3}
                  ]" v-if="isIos" @click="goTop">
      友圈
    </div>
    <div class="topHead" v-if="isAndroid" @dblclick="goTop2">
      友圈
    </div>
    <myScroll
      ref="scrollWrapper"
      :isDown="true"
      :isLoad="isL"
      v-on:func="reLoad"
      :isUp="isUpFlag"
      :isloadUp="isLup"
    >
      <!-- 广告图 -->
      <div class="headBan">
        <div class="adBanner-box">
          <!--<img v-if="adBanner" v-lazy="adBanner" />-->
          <!-- <img v-if="adBanner" :src="adBanner" /> -->
          <div  :class="[{'banner': isNew==0}, {'bannerBG': isNew==1},{'banner-dw': isNew==2},{'banner-qrj': isNew==3}]">
            <swiper
              :auto="true"
              :loop="true"
              height="100%"
              :aspect-ratio="300 / 711"
              dots-position="center"
              v-if="bannerList.length"
            >
              <swiper-item
                class="swiper-demo-img"
                v-for="(v, index) in bannerList"
                :key="index"
                v-if="bannerList.length"
              >
                <a
                  href="javascript:;"
                  v-if="v.url"
                  @click="goUrl(v.url, v.title)"
                >
                  <!--<div class="banner-img" :style="'background:url('+v.image_url+') center no-repeat;background-size:cover'" v-if="v.image_url"></div>-->
                  <div class="banner-img">
                    <img :src="v.img" alt />
                  </div>
                </a>
                <a href="javascript:;" v-else>
                  <!--<div class="banner-img" :style="'background:url('+v.image_url+') center no-repeat;background-size:cover'" v-if="v.image_url"></div>-->
                  <div class="banner-img">
                    <img :src="v.img" alt />
                    <!--<img v-lazy="v.image_url" alt="">-->
                  </div>
                </a>
              </swiper-item>
            </swiper>
            <div class="no-banner" v-if="!bannerList.length"></div>
          </div>
        </div>
      </div>
      <!-- 热门讨论 -->
      <div class="hot-host section">
        <!-- <h3 class="title">
          <span>热门讨论</span>
        </h3> -->
        <div class="dt-title" style="display: flex;">
          <div :class="[{ active: mode == 1 && isNew == 1 },{ active: mode == 1 &&  isNew == 0},{ 'active-dw': mode == 1 && isNew == 2},{ 'active-qrj': mode == 1 && isNew == 3}]" @click="showRmtl">热门讨论</div>
          <div :class="[{ active: mode == 2 && isNew == 1 },{ active: mode == 2 &&  isNew == 0},{ 'active-dw': mode == 2 && isNew == 2},{ 'active-qrj': mode == 2 && isNew == 3}]" @click="showZb">主播</div>
          <div :class="[{ active: mode == 3 && isNew == 1 },{ active: mode == 3 &&  isNew == 0},{ 'active-dw': mode == 3 && isNew == 2},{ 'active-qrj': mode == 3 && isNew == 3}]" @click="showJp">精品推荐 <i class="reddot" v-if="isPrompted == 0"></i></div>
        </div>
        <div v-if="mode == 1">
          <Trend :dataList="rmartList" :mode="1"></Trend>
        </div>
        <div v-if="mode == 2">
          <TrendDt :dataList="zbartList" :mode="2"></TrendDt>
        </div>
        <!-- <ul v-if="!gray" class="talkAbout" v-show="mode==1||mode==2">
          <li v-for="(item,index) in artList" :key="index">
            <div class="head" style="position: relative;">
              <img v-lazy="item.avatar" alt />
              <span class="name" style="top: -26px;font-size: 1.1em;">{{item.nickname}}</span>
              <span class="agoTime" style="position: absolute;top: 0.4rem;left: 1.55rem;">{{item.created | formatDate1}}</span>
              <span style="display:none">{{item.id}}</span>
            </div>
            <p class="pl">{{item.title}}</p>
            <ul class="plt">
              <li v-for="(m,i) in item.images" :key="i" class="previewer-demo-img">
                <img v-lazy="m" :preview="index" alt />
              </li>
            </ul>
            <div class="bottom" style="position: relative;">
              <div v-if="!wdl" class="article_likes" @click="dolikes(index)">
                <span v-bind:class="[item.is_like==0? 'likesbefore':'likesafter']"></span>
                <span class="likes" v-bind:class="[item.is_like==0? 'gray':'pink']">{{item.like}}</span>
              </div>
			  <div class="pl-box" style="position: absolute;right: 1.2rem;" @click="goDiscuss(item)">
					  <span class="pl-icon"></span>
					  <span style="color: #c3cbdb;float: right;margin-left: 0.15rem;margin-top: 0.02rem;">2442</span>
			  </div>

              <div v-if="wdl" class="article_likes" @click="dolikes(index)">
                <span class="likesbefore"></span>
                <span class="likes gray">{{item.like}}</span>
              </div> 
            </div>
          </li>
        </ul> -->
        <div class="jp-box" v-show="mode == 3" style="padding: 0 0.2rem;">
          <!-- <div class="jp-list" style="display: flex;flex-wrap:wrap;padding-bottom: 0.39rem;">
            <div v-for="(item, index) in jpappList" :key="index">
              <div>
                <img :src="item.img" alt="" style="width: 1.466rem;" />
              </div>
              <p
                style="text-align: center;font-size: 0.43rem;margin-top: 0.1rem;"
              >
                {{ item.name }}
              </p>
            </div>
          </div> -->
          <div
            class="fh-app"
            style="margin: 0 0.33rem;"
          >
            <div class="fh-app">
              <div
                class="app-item"
                v-for="(i, index) in tuiJian"
                :key="index"
                style="display: flex;align-items: center;justify-content: space-between;padding:0.35rem 0;"
              >
                <div
                  style="width: 1.47rem;height:1.47rem;border-radius: .25rem;overflow:hidden;"
                >
                  <img
                    v-lazy="i.icon"
                    alt=""
                    style="width:1.47rem;height:1.47rem;"
                  />
                </div>
                <div style="width:4.9rem;">
                  <h3
                    style="color: #445779;font-size: 0.43rem;"
                    class="text-overflow"
                  >
                    {{ i.title }}
                  </h3>
                  <p
                    style="font-size: 0.32rem;margin-top:0.05rem;"
                    class="text-overflow"
                  >
                    {{ i.description }}
                  </p>
                </div>
                <div class="download-btn" @click="loading(i.url)">
                  <span>下载</span>
                </div>
              </div>
              <!-- <div class="app-item" style="display: flex;align-items: center;justify-content: space-between;padding:0.3rem 0;">
					<div><img src="../../assets/images/guess/fh-icon.png" alt="" style="width: 1.466rem;"></div>
					<div style="margin-left: -1.9rem;">
						<h3>凤凰彩票</h3>
						<p style="color: #999999;">适合你的自我购彩平台</p>
					</div>
					<div class="download-btn"
					@click="goUrl('','凤凰彩票')"
					>
						<span>下载</span>
					</div>
				</div> -->
              <!-- <div class="app-item" style="display: flex;align-items: center;justify-content: space-between;padding:0.3rem 0;">
					<div><img src="../../assets/images/guess/patato.png" alt="" style="width: 1.466rem;"></div>
					<div style="margin-left: -1.9rem;">
						<h3>patato</h3>
						<p style="color: #999999;">超火爆土豆chat</p>
					</div>
					<div class="download-btn"
					@click="goUrl('','patato')"
					>
						<span>下载</span>
					</div>
				</div> -->
            </div>
          </div>
        </div>
      </div>
      <p class="no-data-tip" v-if="deadline">Tôi cũng có giới hạn đó~</p>
    </myScroll>
    <!--<Loading :show="isToast" />-->
    <Foot />
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
import Foot from "../../components/footer.vue";
import Trend from "../../components/trends.vue";
import TrendDt from "../../components/trendsQZDt.vue";
import { mapState,mapMutations } from "vuex";
import { Swiper, SwiperItem } from "vux";
import swiper from "swiper";
import "../../../node_modules/swiper/css/swiper.min.css";
export default {
  components: {
    myScroll,
    Foot,
    Swiper,
    SwiperItem,
    Trend,
    TrendDt
  },
  filters: {
    formatDate1(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "-" + M + "-" + D + " " + hh + ":" + mm;
    },
    filterTime(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      return h + ":" + min;
    },
    filterTime1(time) {
      if (!time) return;
      let t = new Date(time * 1000);
      let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
      let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
      let hAm = h < 12 ? h + ":" + min + "AM" : h - 12 + ":" + min + "PM";
      return hAm;
    }
  },
  name: "guess",
  data() {
    return {
      isNew:0,
      artList: [],
      imgList: [],
      bannerList: [], //banner图
      position: "middle",
      isL: false, //是否显示 下拉刷新的组件
      isLup: false, //是否显示 上拉加载更多的组件
      page: 1, //页码
      page2: 1,
      limit: 10, //每页多少条
      isUpFlag: true, //是否开启上拉加载更多
      isMorePage: true, //判断是否有下一页
      isMorePage2: true,
      isToast: false,
      avatar: require("../../assets/images/main/heart.png"),
      article_id: "",
      user_id: "",
      bot: false,
      gray: true,
      is_like: 0,
      wdl: false,
      isLoadingHistory: true, //历史数据loading
      deadline: false, //显示我是有底线的
      pullUp: true, //上拉组件提示
      adBanner: "",
      playList: [],
      imgWidth: "375px",
      isAndroid: false,
      isIos: false,
      tuiJian: "", //精品推荐
      mode: 1,
      jpappList: [
        {
          img: require("../../assets/images/guess/app-iocn1.png"),
          name: "好好学习",
          url: ""
        },
        {
          img: require("../../assets/images/guess/app-iocn2.png"),
          name: "搜狐视频",
          url: ""
        },
        {
          img: require("../../assets/images/guess/app-iocn3.png"),
          name: "星空",
          url: ""
        },
        {
          img: require("../../assets/images/guess/app-iocn4.png"),
          name: "微博",
          url: ""
        }
      ],
      zbartList: [],
      rmartList: [],
      reddotShow:true,
      isPrompted:1
    };
  },
  created() {
  //  if(this.$store.state.jptjDot==1){
  //    this.reddotShow=true
  //  }else{
  //     this.reddotShow=false
  //  }
   this.checkNewApp()
    // let aa = localStorage.getItem(isNew);
    // if (aa == null) {
    //   this.isNew = 1;
    // } else {
    //   this.isNew = localStorage.getItem("isNew");
    // }
    this.isNew = this.skin
    this.convert();
    // this.getAdBanner();
    this.islogin();
    this.getBanner();
    this.getJPTJ();
    // http://www.cpbh5.com
    this.$http
      .get(this.versionLive2 + "live/get_dynamic/", {
        params: {
          user_id:this.$store.state.userinfo.user_id,
          limit: 10,
          page: 1
        }
      })
      .then(res => {
        var result = this.formatData(res.data.data);
        this.zbartList = result;

      });
    if (this.$route.query.mode) {
      this.mode = this.$route.query.mode;
    }
    //        模拟数据加载
    //显示loading图标
    // this.isToast = true;
    // setTimeout(() => {
    //   this.playList = this.hotHot;
    //   this.isToast = false;
    // }, 3000);
  },
  mounted() {
    this.imgWidth = parseInt((Number(window.screen.width) - 45) / 3) + "px";
    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.finishPullUp();
    this.$refs.scrollWrapper.enable(); //启动滚动条
    this.$refs.scrollWrapper.disable(); //禁止滚动条
    document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false }
    );
  },

  computed: {
    ...mapState(["username", "codeToken", "userinfo","skin"])
  },
  methods: {
    ...mapMutations(["SETISDOT","SETISAPPARR"]),
    goTop() {
      this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0, 500);
    },
    goTop2() {
      this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0, 500);
    },
    //  获取精品推荐的信息
    showJp() {
      // this.reddotShow=false
      // this.SETISDOT(0)
      this.mode = 3;
      // let tuiJianArr=[]
      //   this.tuiJian.forEach((i,t)=>{
      //   tuiJianArr.push(i.id)
      // })
      // this.SETISAPPARR(JSON.stringify(tuiJianArr)) 
      this.$http.post("/forum/article/recommended-prompt",
       {user_id:this.$store.state.userinfo.user_id || 0})
          .then(res=>{
            if(res && res.data.code == 1 ){
              this.isPrompted = res.data.data.is_prompted || 1 ;
            }else{
              this.$vux.toast.text(res.data.msg, 'middle');
            }
          })

    },
    getJPTJ(){
      this.$http.get("/forum/article/recommended-prompt",
       {
        params: {
          user_id:this.$store.state.userinfo.user_id || 0
        }})
          .then(res=>{
            if(res && res.data.code == 1 ){
              this.isPrompted = res.data.data.is_prompted;
            }
          })
    },
    //   下载
    loading(url) {
      window.location.href = url;
    },

    islogin() {
      if (!this.codeToken) {
        this.wdl = true;
      } else {
        this.wdl = false;
      }
    },

    // 点赞事件触发
    dolikes(index) {
      if (
        // 判断是否登录如果登录
        this.$store.state.userinfo.user_id == "" ||
        this.$store.state.userinfo.user_id == undefined
      ) {
        // 如果没有登录提示请登录
        this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
      } else {
        // 如果登录执行点赞接口
        this.$http
          .post("/forum/article/like", {
            article_id: this.artList[index].id,
            user_id: this.$store.state.userinfo.user_id
          })
          .then(res => {
            if (res && res.data.code == 1) {
              // 判断是否点赞成功，如果成功，like加1，样式改变
              this.artList[index].like = parseInt(this.artList[index].like) + 1;
              this.artList[index].is_like = 1;
            } else if (res && res.data.code == 0) {
              //取消点赞
              this.artList[index].like = parseInt(this.artList[index].like) - 1;
              this.artList[index].is_like = 0;

              // this.showPositionValue1 = true;
              //              this.$vux.toast.text('你已经点赞过了', 'middle')//  如果已经点赞了，提示已经点赞过
            }
          });
      }
    },
    reLoad(data) {
      // 判断是否上拉事件
      if (data == "down") {
        this.isL = true;
        if (this.mode == 1) {
          this.$http
            .get("/forum/article/index", {
              params: {
                limit: 10,
                page: 1,
                user_id: this.$store.state.userinfo.user_id
              }
            })
            .then(res => {
              if (res && res.data.code == 1) {
                this.artList = this.rmartList = res.data.data || [];
                this.artList = res.data.data || [];
                this.imgList = res.data.data[0].images || [];
                this.article_id = res.data.data[0].id;
                this.is_like = res.data.data[0].id;
                this.isL = false;
                this.page = 1;
                this.isMorePage = true;
                this.isUpFlag = true;
                this.deadline = false;
                //              this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
              }
            });
          this.isMorePage = true;
        } else if (this.mode == 2) {
          this.$http
            .get(this.versionLive2 + "live/get_dynamic", {
              params: {
                limit: 10,
                page: 1
              }
            })
            .then(res => {
              var result = this.formatData(res.data.data);

              this.zbartList = result;
              // this.zbartList = res.data.data;
              // console.log(this.zbartList)
              this.isL = false;
              this.page2 = 1;
              this.isMorePage = true;
              this.isUpFlag = true;
              this.deadline = false;
            });
        }
      } else if (data == "up") {
        // alert(this.mode)
        // 如果是执行分页事件
        if (this.mode == 1) {
          this.loadMore();
        } else if (this.mode == 2) {
          this.loadMorezb();
        }
      }
    },
    showRmtl() {
      this.mode = 1;
      // this.artList=this.rmartList;
      if (this.isMorePage) {
        this.isUpFlag = true;
        this.deadline = false;
      } else {
        this.isUpFlag = false;
        this.deadline = true;
      }
    },
    showZb() {
      this.mode = 2;
      // this.artList=this.zbartList
      if (this.isMorePage2) {
        this.isUpFlag = true;
        this.deadline = false;
      } else {
        this.isUpFlag = false;
        this.deadline = true;
      }
    },
    //处理图片
    doImage(data) {
      for (let i = 0, len = data.length; i < len; i++) {
        let arr = [];
        for (let ii = 0, len2 = data[i].images.length; ii < len2; ii++) {
          let item = {};
          item.w = data[i].images.innerWidth; //设置以大图浏览时的宽度
          item.h = data[i].images.innerHeight; //设置以大图浏览时的高度
          item.src = data[i].images[ii]; //大图
          item.msrc = data[i].images[ii]; //小图
          arr.push(item);
        }
        data[i].images = arr;
      }
      return data;
    },
    async loadMore(id) {
      this.gray = false;
      if (!this.isMorePage) return; //判断是否有更多数据如果没有直接返回
      this.isLup = true;
      this.page++;
      // 请求分页接口页数比之前加一
      let res = await this.$http.get("/forum/article/index", {
        params: {
          limit: 10,
          page: this.page,
          user_id: this.$store.state.userinfo.user_id
        }
      });
      this.isLup = false;
      if (res && res.data.code == 1) {
        if (res.data.data.length > 0) {
          // 如果有分页显示
          this.isMorePage = true;
          this.isUpFlag = true;
          this.deadline = false;
        } else if (res.data.data.length <= 0) {
          // 如果没有分页显示
          this.isMorePage = false;
          this.isUpFlag = false;
          this.deadline = true;
        }
        this.rmartList = this.rmartList.concat(res.data.data); // 合并现在请求的
        this.artList = this.rmartList;
        this.playList.artList = this.rmartList;
        setTimeout(() => {
          this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        }, 20);
        this.$previewRefresh();
      }
    },
    loadMorezb() {
      if (!this.isMorePage2) return;
      this.isLup = true;
      this.page2++;
      this.$http
        .get(this.versionLive2 + "live/get_dynamic", {
          params: {
            limit: 10,
            page: this.page2
          }
        })
        .then(res => {
          this.isLup = false;
          if (res && res.data.code == 1) {
            if (res.data.data.length > 0) {
              this.isMorePage2 = true;
              this.isUpFlag = true;
              this.deadline = false;
            } else {
              this.isMorePage2 = false;
              this.isUpFlag = false;
              this.deadline = true;
            }
            let result = this.formatData(res.data.data);
            this.zbartList = this.zbartList.concat(result);
            this.artList = this.zbartList;
            setTimeout(() => {
              this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
            }, 20);
            this.$previewRefresh();
          }
        });
    },
    formatData(res) {
      function formatImg(str) {
        if (str) {
          let imgs = str.split(",");
          return imgs.map(i => {
            return "http://www.cpbh5.com" + i;
          });
        } else {
          return [];
        }
      }
      return res.map(o => {
        return {
          nickname: o.nickname,
          create_time: o.create_time,
          dynamic_id: o.dynamic_id,
          text: o.text,
          media: o.media,
          avatar: o.avatar,
          zans: o.zans,
          pls: o.pls,
          is_like: 0,
          isZan:o.is_zan,
          livestatus:o.live_status,
          anchor_id:o.anchor_id,
          sex:o.sex
          // id:o.user_id
        };
      });
    },
    refreshData(data) {
      //模拟数据请求
      this.isL = true;
      setTimeout(() => {
        this.page = 1;
        this.isL = false;
      }, 2000);
    },
    goAeticle() {
      this.$http
        .get("/forum/article/index", {
          params: {
            limit: 10,
            page: this.page,
            user_id: this.$store.state.userinfo.user_id
          }
        })
        .then(res => {
          // console.log(res);
          if (res && res.data.code == 1) {
            this.artList = this.rmartList = res.data.data || [];
            this.artList = res.data.data || [];
            this.imgList = res.data.data[0].images || [];
            this.article_id = res.data.data[0].id;
            this.is_like = res.data.data[0].id;
            this.isL = false;
            this.$previewRefresh();
          }
        });
    },
    convert() {
      //文章列表
      let ua = navigator.userAgent.toLowerCase();
      //Android终端
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
      if (ua) {
        this.isIos = true;
      } else if (isAndroid) {
        this.isIos = isAndroid;
      }
      this.goAeticle();
    },
    //获取头部宣传图
    // async getAdBanner() {
    //   let res = await this.$http.get("/forum/article/banner");
    //   if (res && res.data.code == 1) {
    //     //          this.adBanner = '';
    //     this.adBanner = res.data.data;
    //   }
    // }
    async getBanner() {
      // if(this.banners.length) this.bannerList = this.banners;
      let res = await this.$http.get("/forum/article/banner");
      if (res && res.data.code == 1) {
        this.bannerList = res.data.data || [];
        // this.SETBANNER_S(this.bannerList);
        this.playList.bannerList = this.bannerList;
      }
    },
    goUrl(url, title) {
      if (window.webkit) {
        window.webkit.messageHandlers.needNav.postMessage({
          url: url,
          name: title,
          backUrl: window.location.href
        });
      } else if (window.android) {
        this.alertLL(url, title);
      } else {
        window.location.href = url;
      }
    },
    alertLL(url, title) {
      android.show(url, title);
    },
    goDiscuss(i) {
      this.$router.push({ name: "discuss", params: i });
    },
    download(i) {
      if (i) {
      } else {
        window.open("http://fhapp7.com/");
      }
    },
    checkNewApp(){
       this.$http.get("/forum/article/recommended").then(res => {
        if (res && res.data.code == 1) {
          this.tuiJian = res.data.data || [];
          let tuiJianArr=this.$store.state.tuiJianArr
          // res.data.data.forEach((i,t)=>{
          // if(tuiJianArr.findIndex(c=>c==i.id)==-1){
          //   this.reddotShow=true
          // }
          //   // i.id
          // })
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.topHead {
  height: 1.2rem;
  line-height: 1.2rem;
  top: 0;
  z-index: 100;
  background: #fff;
  font-size: 0.42rem;
  font-weight: bold;
  min-width: 320px;
  max-width: 750px;
  text-align: center;
  z-index: 1 !important;
}
.topBG{
  height: 1.2rem;
  line-height: 1.2rem;
  top: 0;
  z-index: 100;
  // background: #fff;
  font-size: 0.42rem;
  font-weight: bold;
  min-width: 320px;
  max-width: 750px;
  text-align: center;
  z-index: 1 !important;
  color: #fff;
  background: url(../../assets/images/newyear/headbg.png) no-repeat center;
  background-size: 100% 100%;
}
.headBan {
  width: 100%;
  height: 4.6rem;
  text-align: center;
  .adBanner-box {
    .banner {
      text-align: center;
      a {
        display: block;
        padding-bottom: 0.6rem;
        > div {
          background: #f3f3f3;
          height: 100%;
          border-radius: 5px;
          overflow: hidden;
          width: 94.6%;
          box-shadow: 0px 5px 20px #ececec;
          display: inline-block;
          img {
            /*height: 100%;*/
          }
        }
      }
    }

    .bannerBG,.banner-dw,.banner-qrj{
    text-align: center;
    background: url(../../assets/images/newyear/top.png) no-repeat center;
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
  .banner-dw{
    background: url('../../assets/images/dw/qz-bg.png') no-repeat center;
    background-size: 100% 100%;
    background-position-y: -1.5rem;
  }
  .banner-qrj{
    background: url('../../assets/images/ValentineDay/he1.png') no-repeat center;
    background-size: 100% 100%;
    background-position-y: -1.5rem;
  }

  }
  /*img {*/
  /*width: 94%;*/
  /*border-radius: 7px;*/
  /*}*/
}
.swiper-container {
  --swiper-pagination-color: #ff513e; /* 两种都可以 */
}
.vux-slider {
  height: 4.6rem;
}
.no-banner {
  height: 4.2rem;
  background: #ededed;
  width: 94.6%;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 0.4rem;
}
.section {
  width: 100%;
  font-size: 0.33rem;
  .dt-title {
    font-size: 0.42rem;
    color: #9f9f9f;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.08rem;
    > div {
      padding: 0.2rem;
      width: 28%;
      margin: 0 2.666%;
      text-align: center;
      position: relative;
      .reddot{
        display: block;
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    background: red;
    border-radius: 50%;
    top: 0;
    right: 0.3rem;
      }
    }
    .active,.active-dw,.active-qrj {
      color: #000;
      &:before {
        content: "";
        width: 22%;
        height: 4px;
        background: #ff513e;
        border-radius: 4px;
        position: absolute;
        bottom: -0.1rem;
        z-index: 9;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .active-qrj:before{
      background:linear-gradient(90deg,#7832f6,#ba83ce);
    }
    // .active-dw {
    //   color: #000;
    //   &:before {
    //     content: "";
    //     width: 22%;
    //     height: 4px;
    //     background: #8EB917;
    //     border-radius: 4px;
    //     position: absolute;
    //     bottom: -0.1rem;
    //     z-index: 9;
    //     left: 50%;
    //     transform: translateX(-50%);
    //   }
    // }
  }
  > h3 {
    font-size: 0.42rem;
    position: relative;
    margin-bottom: 0;
    padding-left: 1em;
    span {
      position: relative;
      z-index: 2;
    }
    &:before {
      content: "";
      position: absolute;
      width: 0.5rem;
      height: 0.1rem;
      border-radius: 20px;
      background: #ffd4af;
      bottom: 0.05rem;
      left: 1em;
    }
  }
  // .talkAbout {
  //   width: 100%;
  //   background: #fdfdfd;
  //   overflow: hidden;
  //   li {
  //     background: #ffff;
  //     width: 94.6%;
  //     margin: 0.3rem auto 0;
  //     padding: 0.3rem;
  //     overflow: hidden;
  //     // .head {
  //     //   // img {
  //     //   //   width: 50px;
  //     //   //   height: 50px;
  //     //   //   display: inline-block;
  //     //   //   border-radius: 50%;
  //     //   // }
  //     //   .name {
  //     //     display: inline-block;
  //     //     color: #343434;
  //     //     font-size: 1.3em;
  //     //     position: relative;
  //     //     top: -16px;
  //     //     padding-left: 10px;
  //     //   }
  //     //   .agoTime {
  //     //     // float: right;
  //     //     // line-height: 50px;
  //     //     color: #cccccc;
  //     //   }
  //     // }
  //     .pl {
  //       font-size: 1.2em;
  //       color: #333333;
  //       font-weight: 500;
  //       line-height: 1.5em;
  //     }
  //     .plt {
  //       width: 100%;
  //       overflow: hidden;
  //       margin: 0 auto;
  //       li {
  //         display: block;
  //         width: 31%;
  //         float: left;
  //         padding: 0 !important;
  //         margin: 0.3em;
  //         height: 8.3em;
  //         border-radius: 6px;
  //         overflow: hidden;
  //         img {
  //           width: 100%;
  //           height: auto;
  //           min-height: 8.3em;
  //         }
  //         img {
  //           -webkit-touch-callout: unset;
  //           pointer-events: unset;
  //         }
  //       }
  //     }
  //     .bottom {
  //       clear: both;
  //       padding-top: 0.7em;
  //       .cz {
  //         display: inline-block;
  //         padding: 5px 17px;
  //         text-align: center;
  //         border-radius: 99px;
  //         background: -webkit-gradient(
  //           linear,
  //           left top,
  //           right top,
  //           from(#ff4444),
  //           to(#ffc37d)
  //         );
  //         background: linear-gradient(to right, #ff4444, #ffc37d);
  //         color: #fff;
  //       }
  //       .article_likes {
  //         display: inline-block;
  //         float: right;
  //         .likesbefore {
  //           display: inline-block;
  //           width: 0.54rem;
  //           position: relative;
  //           height: 0.39rem;
  //           top: 4px;
  //           background: url(../../assets/images/allIcon.png);
  //           background-position: 0 3.64rem;
  //           background-size: 1.13rem;
  //         }

  //         .likesafter {
  //           display: inline-block;
  //           width: 0.54rem;
  //           position: relative;
  //           height: 0.39rem;
  //           top: 4px;
  //           background: url(../../assets/images/allIcon.png);
  //           background-position: 0 3.24rem;
  //           background-size: 1.13rem;

  //           // display: inline-block !important;
  //           // width: 20px !important;
  //           // text-align: right !important;
  //           // padding-right: 1em !important;
  //           // color: #c0c6dc !important;
  //           // position: relative !important;
  //           // height: 20px !important;
  //           // background: url(../../assets/images/main/heart-1.png) no-repeat !important;
  //           // background-size: 100% !important;
  //           // top: 6px !important;
  //         }
  //         .gray {
  //           color: #c3cbdb;
  //         }
  //         .pink {
  //           color: #ff513e !important;
  //         }
  //       }
  // 	.pl-box{
  // 		float: right;
  // 		margin-top: 0.08rem;
  // 		margin-right: 0.18rem;
  // 		.pl-icon{
  // 			display: inline-block;
  // 			width: 0.4rem;
  // 			height: 0.4rem;
  // 			background: url('../../assets/images/guess/pl-icon.png') no-repeat;background-size: 100% 100%;
  // 		}
  // 	}
  //     }
  //   }
  // }
}
.no-data-tip {
  text-align: center;
  font-size: 0.33rem;
  padding: 0.4rem 0 0.8rem 0;
  color: #666;
}

/*@media screen and (min-width: 768px) {*/
/*.headBan .adBanner-box{*/
/*height: 5.2rem;*/
/*}*/
/*}*/

.jp-box {
  .jp-list {
    > div {
      width: 20%;
      margin: 0 2.5%;
      text-align: center;
      margin-top: 0.5rem;
    }
  }
  .fh-app {
    .app-item {
      position: relative;
      &:before {
        content: "";
        height: 1px;
        width: 79%;
        background: #eeeeee;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .download-btn {
        height: 0.67rem;
        width: 1.73rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: #eeeeef;
        border-radius: 0.67rem;
        font-size: 0.37rem;
        color: #0064ff;
      }
    }
  }
}
</style>
