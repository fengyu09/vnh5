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
    <ul class="talkAbout_1">
      <li v-for="(item, index) in dataList" :key="index">
        <!-- <div class="head" style="position: relative;"  @click='getInfo(item.id,item.avatar)'>
				<img v-lazy="item.avatar"  @load="imgLoad" alt />
				<span class="name" style="top: -26px;font-size: 1.1em;">{{item.nickname}}</span>
				<span class="agoTime" style="position: absolute;top: 0.4rem;left: 1.55rem;">{{item.created | formatDate1}}</span>
				<span style="display:none">{{item.id}}</span>
			</div> -->
        <div>
          <div class="head clearfix" >
            <div class="img fl" @click="getInfo(item.user_id, item.avatar)" v-if="item.is_promote==0">
              <img v-lazy="item.avatar" @load="imgLoad" alt />
            </div>
            <div class="img fl"  v-if="item.is_promote==1">
              <img v-lazy="item.avatar" @load="imgLoad" alt />
            </div>
            <div class="fl timeBox " v-if="item.is_promote==1">
              <div class="icon-box clearfix">
                <span class="name fl">{{ item.nickname }}</span>
                <span class="gf-icon fl "><img src="../assets/images/guanfangzhanghao.png" alt=""></span>
              </div>
              <span class="agoTime">{{ item.created | formatDate1 }}</span>
            </div>
            <div class="fl timeBox" v-if="item.is_promote==0">
              <span class="name">
                 <i>{{ item.nickname }}</i>
                 <i class="gender-icon" :class="[{'gender-icon-woman':item.gender == 2},{'gender-icon-man':item.gender == 1}]"></i>
              </span>
              <span class="agoTime">{{ item.created | formatDate1 }}</span>
            </div>
          </div>
          <p class="pl" @click="openLink(item)">{{ item.title }}</p>
          <ul class="plt clearfix" v-if="item.is_promote==0">
            <li
              v-for="(m, i) in item.images"
              :key="i"
              class="previewer-demo-img"
            >
              <img v-lazy="m" :preview="index" alt />
            </li>
          </ul>
          <ul v-if="item.is_promote==1" class="pltt">
             <li
              v-for="(m, i) in item.images"
              :key="i"
               @click="openLink(item)"
            >
              <img v-lazy="m" alt />
            </li>
          </ul>
          <div class="bottom" style="position: relative;" v-if="item.is_promote!=1">
            <!--<span class="cz">{{item.lottery_name}}</span>-->
            <!--<span style="color: #ccc;">{{item.issue}}</span>-->
            <!-- {{item.is_like}} -->
            <div v-if="!wdl" class="article_likes" @click="dolikes1(index)">
              <span
               v-bind:class="[
                  item.is_like == 0 ? 'likesbefore' : 'likesafter'
                ]"
              ></span>
              <span
                class="likes"
                v-bind:class="[item.is_like == 0 ? 'gray' : 'pink']"
                >{{ item.like }}</span
              >
            </div>
            <div
              class="pl-box"
              @click="goDiscuss(item)"
            >
              <span class="pl-icon"></span>
              <span
                style="float: right;margin-left: 0.15rem;margin-top: 0.02rem;"
                >{{ item.comment_nums }}</span
              >
            </div>

            <div v-if="wdl" class="article_likes" @click="dolikes1(index)">
              <span class="likesbefore"></span>
              <span class="likes gray">{{ item.like }}</span>
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
  name: "trends",
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
    },
    mode: {
      type: Number,
      default: 1
    },
    isLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {},
  computed: {
    ...mapState(["username", "codeToken", "userinfo"])
  },
  methods: {
    // islogin() {
    //   if (!this.codeToken) {
    //     this.wdl = true;
    //   } else {
    //     this.wdl = false;
    //   }
    // },
    getInfo(id, avatar) {
// this.$router.push({name:'userInfo',params:{id:id,avatar:avatar}})
       this.$router.push({ name: "userInfo", query: { id,avatar } }); //进入用户个人页
      // if (this.mode == 1) {
      //   // this.$router.push("/userInfo/");
       
      // } else {
      //   this.$router.push("/anchorProfile/" + id); //进入主播个人页
      // }
    },
    openLink(i){
      if(i.is_promote==1){
         window.open(i.url)
      }
       
    },
    goDiscuss(i) {
      this.$router.push({ name: "discuss", query: { mode: this.mode } });
      // if(this.mode ==1){
      // 	this.$router.push({name:'discuss',query:{mode:this.mode}});
      // } else {
      // 	this.$router.push({name:'discussZb',query:{mode:this.mode}});
      // }
      localStorage.setItem("guessInfo", JSON.stringify(i));
    },
    dolikes1(index) {
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
          }
        });
      } else {
        // 如果登录执行点赞接口
        this.$http
          .post("/forum/article/like", {
            article_id: this.dataList[index].id,
            user_id: this.$store.state.userinfo.user_id
          })
          .then(res => {
            if (res && res.data.code == 1) {
              // 判断是否点赞成功，如果成功，like加1，样式改变
              this.dataList[index].like =
                parseInt(this.dataList[index].like) + 1;
              this.dataList[index].is_like = 1;
            } else if (res && res.data.code == 0) {
              //取消点赞
              this.dataList[index].like =
                parseInt(this.dataList[index].like) - 1;
              this.dataList[index].is_like = 0;

              // this.showPositionValue1 = true;
              //              this.$vux.toast.text('你已经点赞过了', 'middle')//  如果已经点赞了，提示已经点赞过
            }
          });
      }
    },
    imgLoad() {}
  },
  updated() {
    this.$previewRefresh();
  }
};
</script>

<style lang="less">
.talkAbout_1 {
  width: 100%;
  background: #fdfdfd;
  overflow: hidden;
  li {
    background: #ffff;
    // width: 94.6%;
    // margin: 0.3rem auto 0;
    padding: 0.4rem 0;
    // padding: 0.3rem;
    overflow: hidden;
    border-bottom: 10px solid #f5f7fa;
    &:nth-last-child(1) {
      border-bottom: none;
    }
    > div {
      width: 92%;
      margin: 0 auto;
    }
    .head {
      .timeBox {
        margin-left: 0.27rem;
        max-width: 70%;
      }
      .img {
        width: 1.08rem;
        height: 1.08rem;
        // display: inline-block;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        display: block;
        color: #343434;
        font-size: 1.3em;
        // position: relative;
        top: -16px;
        padding-bottom: 0.16rem;
        // max-width: 70%;
        max-width:100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // padding-left: 10px;
        i{
          display: inline-block;
          &.gender-icon{
            width: 0.32rem;
            height: 0.32rem;
            vertical-align: middle;
            // background: url('../assets/images/anchorP/gender-man-min.png') no-repeat;
            background-size: contain;
          }
          &.gender-icon-man{
            background: url('../assets/images/anchorP/gender-man-min.png') no-repeat;
            background-size: contain;
          }
          &.gender-icon-woman{
            background: url('../assets/images/anchorP/gender-woman-min.png') no-repeat;
            background-size: contain;
          }
        }
      }
      .agoTime {
        // float: right;
        // line-height: 50px;
        display: block;
        color: #cccccc;
      }
      .gf-icon{
        width: 17px;
        height: 14px;
        display: block;
        padding-top: 0.1rem;
        margin-left: 0.1rem;
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
      li {
        display: block;
        width: 31%;
        float: left;
        padding: 0 !important;
        margin: 0.3em;
        height: 8.3em;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          min-height: 8.3em;
        }
        img {
          -webkit-touch-callout: unset;
          pointer-events: unset;
        }
      }
    }
    .pltt {
      width: 100%;
      overflow: hidden;
      margin: 0 auto;
      
      li {
        display: block;
        width: 100%;
        float: left;
        padding: 0 !important;
        // margin: 0.3em;
        // height: 8.3em;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 auto;
        img {
          width: 100%;
          height: auto;
          min-height: 8.3em;
        }
        img {
          -webkit-touch-callout: unset;
          pointer-events: unset;
        }
      }
    }

    .bottom {
      clear: both;
      padding-top: 0.7em;
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
        .likesbefore {
          display: inline-block;
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
    // padding: 0.3rem;
    padding-bottom: 0.377rem;
    padding-top: 0.4rem;
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
</style>
