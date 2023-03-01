<template>
  <div>
    <ul v-if="dataList.length == 0" class="grayHide">
      <li>
        <div class="gryhead">
          <a></a>
          <a class="childwid"></a>
          <span></span>
        </div>
        <p class="bgp"></p>
        <div class="imgDIv">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="botDiv">
          <span></span>
        </div>
      </li>
      <li>
        <div class="gryhead">
          <a></a>
          <a class="childwid"></a>
          <span></span>
        </div>
        <p class="bgp"></p>
        <div class="imgDIv">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="botDiv">
          <span></span>
        </div>
      </li>
      <li>
        <div class="gryhead">
          <a></a>
          <a class="childwid"></a>
          <span></span>
        </div>
        <p class="bgp"></p>
        <div class="imgDIv">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="botDiv">
          <span></span>
        </div>
      </li>
    </ul>
    <ul class="talkAbout">
      <li v-for="(item, index) in dataList" :key="index">
        <div>
          <div class="head clearfix" >
            <div class="fl img1" @click="getInfo(item)">
              <div class="img" >
                <img v-lazy="item.avatar" alt />
              </div>
              <!-- <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div> -->
              <div :class="item.livestatus==1 ? 'circle' : ''"></div>
              <div :class="item.livestatus==1 ? 'circle' : ''"></div>
              <div :class="item.livestatus==1 ? 'circle' : ''"></div>
              <!-- {{item.livestatus}} -->
            </div>
            <!-- <img v-lazy="item.avatar" alt /> -->
            <!-- <span class="name" >{{
            item.nickname
          }}</span>
          <span
            class="agoTime"
            
            >{{ item.create_time | formatDate1 }}</span
          >
            <span style="display:none">{{ item.id }}</span>-->
            <div class="fl timeBox">
              <div class="name">
                <span>{{ item.nickname }}</span>
                <span class="gender-icon" :class="item.sex==1 ? 'gender-icon-man':'gender-icon-woman'"></span>
                <!-- <span class="gender-icon" v-if="item.gender">
                  <img src="../assets/images/anchorP/gender-woman-min.png" alt="">
                </span> -->
              </div>
              <div class="agoTime">{{ item.create_time | formatDate1 }}</div>
            </div>
          </div>
          <p class="pl">{{ item.text }}</p>
          <ul class="plt" v-if="item.media.length">
            <li v-for="(m, i) in item.media" :key="i" class="previewer-demo-img">
              <img v-lazy="m" :preview="index" alt />
            </li>
            <!-- <li><img src="../assets/images/code.png" alt="" class="previewer-demo-img"></li>
          <li><img src="../assets/images/code.png" alt="" class="previewer-demo-img"></li>
          <li><img src="../assets/images/code.png" alt="" class="previewer-demo-img"></li>
            <li><img src="../assets/images/code.png" alt="" class="previewer-demo-img"></li>-->
          </ul>
          <div class="bottom" style="position: relative;">
            <!--<span class="cz">{{item.lottery_name}}</span>-->
            <!--<span style="color: #ccc;">{{item.issue}}</span>-->
            <!-- {{item.is_like}} -->
            <div v-if="!wdl" class="article_likes" @click="dolikes(index)">
              <span v-bind:class="[item.isZan == true ? 'likesafter' : 'likesbefore']"></span>
              <span
                class="likes"
                v-bind:class="[item.isZan == true ? 'pink' : 'gray']"
              >{{ item.zans }} </span>
            </div>
            <div class="pl-box" @click="goDiscuss(item)">
              <span class="pl-icon"></span>
              <span style="float: right;margin-left: 0.15rem;margin-top: 0.02rem;">{{item.pls}}</span>
            </div>

            <div v-if="wdl" class="article_likes" @click="dolikes(index)">
              <span class="likesbefore"></span>
              <span class="likes gray">{{ item.zans }}</span>
            </div>
            <!-- <div class="disnzan" :class="{active:index==isShow}" @click="change(index)">
		        <span class="satre"></span>
		        <span class="likeNum">{{item.like}}</span>
            </div>-->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "trendsDt",
  data() {
    return {
      wdl: false
    };
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
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(["username", "codeToken", "userinfo"])
  },
  methods: {
    islogin() {
      if (!this.codeToken) {
        this.wdl = true;
      } else {
        this.wdl = false;
      }
    },

    getInfo(i) {
      //进入用户   主播个人页
      if (i.livestatus == 1) {
        this.$router.push("/chat/" + i.anchor_id);
      } else {
        this.$router.push("/anchorProfile/" + i.anchor_id);
      }
    },
    goDiscuss(i) {
      this.$router.push("/discussZb");
      localStorage.setItem("zbpl", JSON.stringify(i));
    },
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
        // this.$http
        //   .post("/forum/article/like", {
        //     article_id: this.dataList[index].id,
        //     user_id: this.$store.state.userinfo.user_id
        //   })
        //   .then(res => {
        //     if (res && res.data.code == 1) {
        //       // 判断是否点赞成功，如果成功，like加1，样式改变
        //       this.dataList[index].zans =
        //         parseInt(this.dataList[index].zans) + 1;
        //       this.dataList[index].isZan = 1;
        //     } else if (res && res.data.code == 0) {
        //       //取消点赞
        //       this.dataList[index].zans =
        //         parseInt(this.dataList[index].zans) - 1;
        //       this.dataList[index].isZan = 0;

        //       // this.showPositionValue1 = true;
        //       //              this.$vux.toast.text('你已经点赞过了', 'middle')//  如果已经点赞了，提示已经点赞过
        //     }
        //   });
        // debugger
        this.$http
          .post(this.versionLive2+"live/dynamic_like/", {
            // article_id: this.dataList[index].id,
            user_id: this.$store.state.userinfo.user_id,
            like_id: this.dataList[index].dynamic_id,
            type: 1
          })
          .then(res => {
            if (res && res.data.code == 1) {
              // 判断是否点赞成功，如果成功，like加1，样式改变
              if (res.data.data.is_like == true) {
                this.dataList[index].isZan = res.data.data.is_like;
                this.dataList[index].zans = res.data.data.like_num;
                // this.dataList[index].zans + 1;
              } else if (res.data.data.is_like == false) {
                this.dataList[index].isZan = res.data.data.is_like;
                this.dataList[index].zans = res.data.data.like_num;
              }
            }
          });
      }
    }
  }
};
</script>

<style lang="less">
.talkAbout {
  width: 100%;
  background: #fdfdfd;
  overflow: hidden;
  margin: 0 auto;
  li {
    background: #ffff;
    // width: 94.6%;
    // margin: 0.3rem auto 0;
    margin: 0 auto 0;
    // padding: 0.3rem;
    overflow: hidden;
    padding-bottom: 0.377rem;
    padding-top: 0.4rem;
    // border-bottom: 1px solid #eee;
    border-bottom: 10px solid #f5f7fa;
    &:nth-last-child(1) {
      border-bottom: none;
    }
    > div {
      width: 92%;
      margin: 0 auto;
    }
    .head {
      .img1{
         width: 1.08rem;
        height: 1.08rem;
        position: relative;
      }
      .img {
        width: 1.08rem;
        height: 1.08rem;
        // display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        z-index: 100001;
      }
      .timeBox {
        padding-left: 0.27rem;
      }
      .name {
        // display: inline-block;
        color: #343434;
        font-size: 1.3em;
        top: -16px;
        padding-bottom: 0.16rem;
        // padding-left: 10px;
        span{
          display: inline-block;
        }
      }
      .gender-icon{
        // .rem(width,24);
        width: 0.32rem;
        height: 0.32rem;
        // height: 100%;
        vertical-align: middle;
        // background: url('../assets/images/anchorP/gender-woman-min.png') no-repeat;
        background-size: contain;
        &.gender-icon-man{
          background: url('../assets/images/anchorP/gender-man-min.png') no-repeat;
          background-size: contain;
        }
        &.gender-icon-woman{
          background: url('../assets/images/anchorP/gender-woman-min.png') no-repeat;
          background-size: contain;
        }
      }
      .agoTime {
        // line-height: 50px;
        color: #cccccc;
      }
    }
    .pl {
      font-size: 1.2em;
      color: #333333;
      font-weight: 500;
      // line-height: 1.5em;
      padding: 0.4rem 0;
    }
    .plt {
      width: 100%;
      overflow: hidden;
      margin: 0 auto;
      // height: 8.75em;
      li {
        // display: block;
        // width: 32.5%;
        // float: left;
        // padding: 0 !important;
        // margin: 0.3em;
        // // margin-right: 0.08rem;
        // height: 8.75em;
        // border-radius: 6px;
        // overflow: hidden;
        display: block;
        width: 31%;
        float: left;
        padding: 0 !important;
        margin: 0.3em;
        height: 8.3em;
        border-radius: 6px;
        overflow: hidden;
        &:nth-last-child(3) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: auto;
          min-height: 8.3em;
          // height: 8.75em;
        }
        img {
          -webkit-touch-callout: unset;
          pointer-events: unset;
        }
      }
    }
    .bottom {
      clear: both;
      padding-top: 0.27rem;

      .cz {
        display: inline-block;
        padding: 5px 17px;
        text-align: center;
        border-radius: 99px;
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#ff4444),
          to(#ffc37d)
        );
        background: linear-gradient(to right, #ff4444, #ffc37d);
        color: #fff;
      }
      .article_likes {
        display: inline-block;
        float: right;
        margin-top: 0.02rem;
        .likes {
          
        }
        .likesbefore {
          display: inline-block;
          // width: 0.54rem;
          width: 0.46rem;
          position: relative;
          height: 0.4rem;
          top: 4px;
          // background: url(../assets/images/allIcon.png);
          // background-position: 0 3.64rem;
          // background-size: 1.13rem;
          background: url("../assets/images/chat/host_24.png") no-repeat;
          background-size: contain;
        }

        .likesafter {
          display: inline-block;
          width: 0.46rem;
          position: relative;
          height: 0.4rem;
          top: 4px;
          background: url(../assets/images/allIcon.png);
          background-position: 0 3.24rem;
          background-size: 1.13rem;

          // display: inline-block !important;
          // width: 20px !important;
          // text-align: right !important;
          // padding-right: 1em !important;
          // color: #c0c6dc !important;
          // position: relative !important;
          // height: 20px !important;
          // background: url(../../assets/images/main/heart-1.png) no-repeat !important;
          // background-size: 100% !important;
          // top: 6px !important;
        }
        .gray {
          
        }
        .pink {
          color: #ff513e !important;
        }
      }
      .pl-box {
        float: right;
        margin-top: 0.08rem;
        margin-right: 0.67rem;
        .pl-icon {
          display: inline-block;
          width: 0.46rem;
          height: 0.46rem;
          background: url("../assets/images/guess/pl-icon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
.grayHide {
  width: 100%;
  background: #fdfdfd;
  overflow: hidden;
  li {
    background: #ffff;
    width: 94.6%;
    margin: 0.3rem auto 0;
    padding: 0.3rem;
    overflow: hidden;
    .gryhead {
      a:first-child {
        width: 50px;
        height: 50px;
        display: inline-block;
        background: #ededed;
        border-radius: 50%;
      }
      .childwid {
        display: inline-block;
        background: #ededed;
        width: 100px;
        height: 13px;
        border-radius: 3px;
        position: relative;
        top: -18px;
        left: 10px;
      }
      span {
        border-radius: 3px;
        display: inline-block;
        float: right;
        line-height: 50px;
        /* color: #cccccc; */
        width: 80px;
        height: 13px;
        background: #ededed;
        position: relative;
        top: 19px;
      }
    }
    .bgp {
      height: 15px;
      width: 200px;
      background: #ededed;
      margin-top: 10px;
      border-radius: 3px;
    }
    .imgDIv {
      width: 100%;
      margin-top: 15px;
      overflow: hidden;
      span {
        display: block;
        float: left;
        width: 31%;
        height: 100px;
        background: #ededed;
        margin-left: 10px;
        border-radius: 7px;
      }
      span:first-child {
        margin: 0;
      }
    }
    .botDiv {
      width: 100%;
      overflow: hidden;
      margin-top: 15px;

      span {
        display: block;
        width: 100px;
        height: 15px;
        background: #ededed;
        border-radius: 99px;
      }
    }
  }
}
.circle {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    // border: 6px solid #ff2727;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ff2727;
    // opacity: 0.3;
    // right: 0.75rem;
    // text-align: center;
    // top: 3.18rem;
    // width: calc(100% - 6px);
    // height: calc(100% - 6px);
    // &:nth-child(1) {
    //   animation: circle-opacity 0.9s infinite;
    //   -webkit-animation: circle-opacity 0.9s infinite;
    //   -moz-animation: circle-opacity 0.9s infinite;
    //   -o-animation: circle-opacity 0.9s infinite;
    // }
    // &:nth-child(2) {
    //   animation: circle-opacity 0.9s infinite;
    //   -webkit-animation: circle-opacity 0.9s infinite;
    //   -moz-animation: circle-opacity 0.9s infinite;
    //   -o-animation: circle-opacity 0.9s infinite;
    //   animation-delay: 0.3s;
    //   -webkit-animation-delay: 0.3s;
    //   -o-animation-delay: 0.3s;
    //   -moz-animation-delay: 0.3s;
    // }
    // &:nth-child(3) {
    //   animation: circle-opacity 0.9s infinite;
    //   -webkit-animation: circle-opacity 0.8s infinite;
    //   -moz-animation: circle-opacity 0.8s infinite;
    //   -o-animation: circle-opacity 0.8s infinite;
    //   animation-delay: 0.6s;
    //   -webkit-animation-delay: 0.6s;
    //   -o-animation-delay: 0.6s;
    //   -moz-animation-delay: 0.6s;
    // }
     &:nth-child(1) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
    }
    &:nth-child(2) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.9s;
      -webkit-animation-delay: 0.9s;
      -o-animation-delay: 0.9s;
      -moz-animation-delay: 0.9s;
      -ms-animation-delay: 0.9s;
    }
    &:nth-child(3) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.6s;
      -webkit-animation-delay: 0.6s;
      -o-animation-delay: 0.6s;
      -moz-animation-delay: 0.6s;
      -ms-animation-delay: 0.6s;
    }

}
@keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
     opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-o-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
     opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-moz-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-webkit-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
</style>
