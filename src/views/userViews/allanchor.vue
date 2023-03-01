<template>
  <div class='allanchor'>
    <flexbox class="infoHead">
      <flexbox-item :span="1/10">
        <div
                @click="$router.go(-1)"
                class="flex-demo"
                style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img src="../../assets/images/gray-back-icon.png" alt />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo tickling">全部主播</div>
      </flexbox-item>
      <flexbox-item :span="1/10">
        <div class="flex-demo"></div>
      </flexbox-item>
    </flexbox>

      <!--彩种类型  -->
      <div class="lotteryType">
        <myScrollX v-if="lotteryType.length">
          <div class="clearfix preview-list" ref="personTab">
            <div
              v-for="(v, index) in lotteryType"
              :key="index"
              class="lottery-item"
              :class="{active:v.type==nowIndex}"
              @click="changeLottery(index,v.type)"
            >
              <span class="preview">{{ v.name }}</span>
            </div>
          </div>
        </myScrollX>
        

        <div class="no-lottery" v-else>
          <dl>
            <dt></dt>
          </dl>
          <dl>
            <dt></dt>
          </dl>
          <dl>
            <dt></dt>
          </dl>
          <dl>
            <dt></dt>
          </dl>
        </div>
      </div>

   <div class="all">
    <myScroll
            ref="scrollWrapper"
            :isDown="true"
            :isLoad="isL"
            :bottom="0"
            :top="2.4"
            v-on:func="reLoad"
            :isUp="isUpFlag"
            :isloadUp="isLup"
            :uptipBottom=0.5
            :bgColor="'f5f7fa'"
    >
      <!-- 热门讨论 -->
      <div class="hot-host section">
        <ul v-if="hotHost.length" class="clearfix hot hot-box">
          <li v-for="(v,index) in hotHost" :key="index">
            <a href="javascript:;" @click="goChat(v.anchor_id)">
              <div class="lottery-type" :style="'background:url('+v.background+');background-size:cover'">{{v.name}}</div>
              <!--<div class="img-box" :style="'background:url('+v.avatar+');background-size:cover'" v-if="v.avatar">-->
              <div class="img-box" v-if="v.avatar" :key="v.avatar">
                <img v-lazy="v.avatar" alt />
              </div>
              <div class="img-box img-box-noHot" v-else>
                <img src="../../assets/images/main/web_11.png" alt />
              </div>
              <div class="clearfix section-mes">
                <p class="nickname-box fl">
                  {{v.nickname}}
                  <i class="online" v-if="v.live_status"></i>
                </p>
                <!--<p class="fr host-type" v-for="(vv,index2) in v.tags" :key="index2">-->
                <!--<i class="hot-type" :style="'background:url('+vv.icon+') center no-repeat;background-size: contain'"></i><span >{{vv.title}}</span>-->
                <!--</p>-->
                <p class="fr host-type" v-if="v.tags.length">
                  <img v-lazy="v.tags[0].icon" alt class="hot-type" />
                  <!--<i class="hot-type" :style="'background:url('+v.tags[0].icon+') center no-repeat;background-size: 100%'"></i>-->
                  <span>{{v.tags[0].title}}</span>
                </p>
              </div>
              <p class="hot-mes clearfix">
                <span class="fl intro text-overflow">{{v.live_intro}}</span>
                <span class="fr online-num">{{v.online | filterOnlineNum}}</span>
              </p>
              <!-- <div class="red-pack" v-if="v.red_paper_num>0"></div> -->
              <div class="red-pack" v-if="v.red_paper_num>0" :class="v.ext_img?'hasTz':''"></div>
              <div class="cr-living" v-if="v.ext_img"><img :src="v.ext_img"/></div>
            </a>
          </li>
        </ul>
        <p v-if="code==false&&hotHost.length==0" class="zanwu">当前彩种暂无主播哦~</p>
        <ul v-if="code!=false&&!hotHost.length" class="no-host">
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
          <li>
            <div class="no-img"></div>
            <div class="no-name"></div>
          </li>
        </ul>
      </div>
      <p class="no-data-tip" v-if="deadline">Tôi cũng có giới hạn đó~</p>
    </myScroll>
    </div>
  </div>
</template>

<script>
  import myScroll from "../../components/myScroll.vue";
  import myScrollX from "../../components/myScrollX.vue"; //横向滚动
  import {
    //  Loading,
    //  ToastPlugin,
    Flexbox,
    FlexboxItem,
    TransferDom
  } from "vux";
  import { mapState } from "vuex";
  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      FlexboxItem,
      myScroll,
      myScrollX,
    },

    name: "allanchor",
    data() {
      return {
        hotHost: [], //热门主播
        yhListData:[],
        playList: {},
        isL: false, //是否显示 下拉刷新的组件
        isLup: false, //是否显示 上拉加载更多的组件
        page: 1, //页码
        limit: 10000, //每页多少条
        isUpFlag: true, //是否开启上拉加载更多
        isMorePage: true, //判断是否有下一页
        user_id: "",
        deadline: false, //显示我是有底线的
        pullUp: true ,//上拉组件提示
        lotteryType:[],
        nowIndex:'',
        type:'',
        code:true,   //暂无主播的显示隐藏
      };
    },
    created() {
      this.convert();
    },
    mounted() {
      document.body.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
        },
        { passive: false }
      );
      this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
      this.$refs.scrollWrapper.enable(); //启动滚动条
      this.$refs.scrollWrapper.disable(); //禁止滚动条

//      console.log(this.$refs.scrollWrapper.startY)
    },


    computed: {
      ...mapState(["username", "codeToken", "userinfo"])
    },
    filters: {
      filterOnlineNum(n) {
        if (n > 10000) {
          return n / 10000 + "万";
        }
        return n;
      }
    },
    watch: {
    lotteryType: function() {
      this.$nextTick(() => {
        this.ScrollX();
      });
     },
     yhListData:function(){
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
            },20)

        })
      },
      nowIndex:function(type){
        // console.log(type)
         if(type==0) return this.hotHost = this.yhListData
          let arr = [];
          for(let i=0,len=this.yhListData.length;i<len;i++){
                if(this.yhListData[i].r_id==type){
                    arr.push(this.yhListData[i])
                }   
          }
          this.hotHost=arr;
          // console.log(this.hotHost)
      }
    },
    methods: {
       getlotteryType(){
        this.$http.get(this.versionLive2+"live/get_all_list/", {
            params: {
              limit: this.limit,
              page: 1
            }
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.lotteryType = res.data.typeList || [];
            }
          });
      },
       ScrollX() {
        let width = this.lotteryType.length * 2.554;
        this.$refs.personTab.style.width = width + "rem";
      },
       changeLottery(index,type){       //点击切换
        // this.nowIndex = index;
        this.nowIndex = type;
        this.type = type;
        this.code=true
        // this.$http.get(this.versionLive2+"live/get_all_list/", {
        //     params: {
        //       limit: this.limit,
        //       page: 1,
        //       type:type
        //     }
        //   })
        //   .then(res => {
        //     if (res && res.data.code == 1) {
        //       this.hotHost = res.data.data || [];
        //       this.yhListData = this.hotHost;
        //       this.code=false
        //       // console.log(this.hotHost); 
        //     }
        //   });
      },
      goChat(id){
        if(!this.userinfo.user_id&&id==1111111111){
          return this.$vux.confirm.show({
            title: "",
            content: "互动秀直播间需要进行登录哦~",
            onCancel: () => {
//            console.log(this); //当前 vm
            },
            onConfirm: () => {
              this.$router.push({ name: "login" });
            }
          });
        }else{
          this.$router.push('/chat/'+id)
        }
      },
      reLoad(data,obj) {
        // 判断是否上拉事件
        if (data == "down") {
          this.isL = true;
          this.$http
            .get(this.versionLive2+"live/get_all_list/", {
              params: {
                limit: this.limit,
                page: 1,
                type:this.type
              }
            })
            .then(res => {
              if (res && res.data.code == 1) {
                //            this.artList = res.data.data || [];
                this.hotHost = res.data.data || [];
                this.yhListData = this.hotHost;
                this.isL = false;
                this.page = 1;
                this.isMorePage = true;
                this.isUpFlag = true;
                this.deadline = false;
              }
            });
          this.isMorePage = true;
        } else if (data == "up") {
          // 如果是执行分页事件
          this.loadMore();
        }else if(data=='end'){
            obj.name = this.$route.name;
            this.$store.commit('SETPOSITIONY',obj)
        }
      },
      async loadMore(id) {
        this.gray = false;
        if (!this.isMorePage) return; //判断是否有更多数据如果没有直接返回
        this.isLup = true;
        this.page++;
        // 请求分页接口页数比之前加一
        let res = await this.$http.get(this.versionLive2+"live/get_all_list/", {
          params: {
            limit: this.limit,
            page: this.page,
            type:this.type
          }
        });
        this.isLup = false;
        if (res && res.data.code == 1) {
          if (res.data.data.length > 0 ) {
            // 如果有分页显示
            this.isL = false;
            this.isMorePage = true;
            this.isUpFlag = true;
            this.deadline = false;
          } else if(res.data.data.length <= 0){
            // 如果没有分页显示
            this.isMorePage = false;
            this.isUpFlag = false;
            this.deadline = true;
            this.deadline = true;
          }
          this.hotHost = this.hotHost.concat(res.data.data); // 合并现在请求的
          this.playList.hotHost = this.hotHost;
          this.yhListData = this.hotHost;
          setTimeout(()=>{
            this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
          },20)

        }
      },
      refreshData(data) {
        //模拟数据请求
        this.isL = true;
        setTimeout(() => {
          this.page = 1;
          this.isL = false;
        }, 2000);
      },
      convert() {
        //文章列表
        this.getHost();
        // this.getlotteryType();
      },
      getHost() {
        this.$http
          .get(this.versionLive2+"live/get_all_list/", {
            params: {
              limit: this.limit,
              page: 1
            }
          })
          .then(res => {
            if (res && res.data.code == 1) {
              //            this.artList = res.data.data || [];
              this.hotHost = res.data.data || [];
              this.lotteryType = res.data.typeList || [];
              this.yhListData = this.hotHost;
              this.isL = false;
              this.page = 1;
              this.isMorePage = true;
              this.isUpFlag = true;
              this.deadline = false;
            }
          });
      }
    }
  };
</script>

<style scoped lang="less">
  .infoHead {
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .flex-demo {
    text-align: center;
    img {
      width: 0.25rem;
    }
  }
  .tickling {
    font-weight: bold;
    font-size: 0.45rem;
  }
  
  .zanwu{
    width: 110%;
    text-align: center;
    margin-top: 1.2rem;
    // background: #fff;
    margin-left: -5%;
  }

//  .all{
//     min-height:100vh;
//     display:flex
//   }
  .section{       //剩下的空间填充整个盒子
    //min-height:100vh;
    // height: 100%;
    // display:flex;
    // flex:1;
    background: #f5f7fa!important;
    width: 100%;
    padding: 0 2.7%;
    font-size: 0.33rem;
  }

  /*当前彩种*/
  .lotteryType {
    overflow: hidden;
    // padding-bottom: 0.3rem;
    background: #fff;
    z-index: 100;
    .lottery-item {
      display: inline-block;
      padding: 0 0.137rem;
      text-align: center;
      font-size: 0.35rem;
      
      &.active {
        span {
          color: #fff;
          font-weight: bold;
          background: linear-gradient(90deg, rgba(255, 49, 49, 1),rgba(255, 128, 103, 1));
        }
      }
    .preview {
      display: block;
      background: #f5f7fa;
      height: 0.855rem;
      width: 2.13rem;
      line-height: 0.855rem;
      color: #445779;
      border-radius: 0.855rem;
    }
    }
    .no-lottery {
      overflow: hidden;
      dl {
        display: inline-block;
        width: 25%;
        text-align: center;
        float: left;
        dt {
          display: inline-block;
          width: 2rem;
          height:0.855rem;
          border-radius: 0.855rem;
          background: #ededed;
        }
      }
    }
  }


  .section {
    ul.hot {
      padding-top: 0.27rem;
      li {
        box-shadow: 0 0.3rem 20px #f8f8f8;
        border-radius: 5px;
        overflow: hidden;
        .img-box {
          border-radius: 5px 5px 0 0;
          overflow: hidden;
          height: 3.15rem;
          background: #f3f3f3;
        }
        a {
          position: relative;
          .hot-mes {
            position: absolute;
            color: #fff;
            bottom: 0.9rem;
            left: 3%;
            width: 92%;
            line-height: 0.5rem;
            .online-num {
              font-family: number2;
            }
            .intro {
              display: inline-block;
              width: 55%;
            }
          }
          img {
            display: block;
            height: 100%;
            width: 100%;
            /*height: 3.15rem;*/
          }
          .section-mes {
            padding: 0.2rem;
            background: #fff;
            .nickname-box {
              font-weight: bold;
            }
            .host-type {
              margin-left: 0.05rem;
              span {
                vertical-align: middle;
                
              }
            }
            .nickname-overflow {
              width: 0.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .hot-type {
              display: inline-block;
              width: 0.37rem;
              height: 0.38rem;
              vertical-align: sub;
              margin-right: 0.05rem;
            }
            .hot-type-qc {
              background: url("../../assets/images/main/web_49.png") no-repeat
              right center;
              background-size: contain;
            }
          }
        }
      }
      .online {
        display: inline-block!important;
        width: 0.35rem!important;
        height: 0.3rem!important;
        background: url("../../assets/images/member/a1.gif") no-repeat right bottom !important;
        background-size: contain!important;
      }
    }
    ul.hot-box {
      li {
        width: 48.5%;
        margin: 0 3% 0.4rem 0;
        float: left;
        a {
          position: relative;
          display: block;
          font-size: 0.33rem;
          > .lottery-type {
            font-size: 0.3rem;
            padding: 0.05rem 0.12rem;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 5px 0 10px 0;
            background: -webkit-linear-gradient(
                    left,
                    #ff4444,
                    #ffc37d
            ); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(
                    right,
                    #ff4444,
                    #ffc37d
            ); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(
                    right,
                    #ff4444,
                    #ffc37d
            ); /* Firefox 3.6 - 15 */
            background: linear-gradient(
                    to right,
                    #ff4444,
                    #ffc37d
            ); /* 标准的语法 */
            color: #fff;
          }
        }
      }
      li:nth-of-type(2n) {
        margin: 0 0 0.4rem 0;
      }
      // .red-pack {
      //       position: absolute;
      //       right: 0.2rem;
      //       top: 1.7rem;
      //       width: 0.55rem;
      //       height: 0.65rem;
      //       background: url("../../assets/images/main/home_icon_14.png")
      //         no-repeat;
      //       background-size: contain;
      //     }
          .red-pack {
            position: absolute;
            right: 0.2rem;
            top: 1.7rem;
            width: 0.55rem;
            height: 0.65rem;
            background: url("../../assets/images/main/home_icon_14.png")
            no-repeat;
            background-size: contain;
            &.hasTz{
                top: 1.2rem!important;
            }
        }
        .cr-living{
            position: absolute;
            right: 0.2rem;
            top: 2.1rem;
            img{
                width:70%;
                float:right;
            }
        }
    }
  }

  .no-host {
    overflow: hidden;
    padding-top: 0.27rem;
    > li {
      float: left;
      width: 48.5%;
      margin: 0 3% 0.4rem 0;
      .no-img {
        height: 3.15rem;
        background: #ededed;
        border-radius: 5px 5px 0 0;
      }
      .no-name {
        margin-top: 0.2rem;
        height: 0.7rem;
        background: #ededed;
      }
    }
    li:nth-of-type(2n) {
      margin: 0 0 0.4rem 0;
    }
  }

  .no-data-tip {
    text-align: center;
    font-size: 0.33rem;
    padding: 0.4rem 0 0.8rem 0;
    color: #666;
  }
</style>
  