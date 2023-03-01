<template>
  <!--预告-->
  <div class="preview-container">
    <p class="loading-tip" v-if="loading">Đang nhận...</p>
    <div class="one-item" v-for="(v,k) in LivePreview" :key="k">
      <h4>
        <i>{{k}}</i>
      </h4>
      <ul class="preview-list-box clearfix">
        <li v-for="(item,index) in v" :key="index">
          <dl class="clearfix">
            <dt class="host-img fl" @click="toZbj(item)">
              <!-- <img v-lazy="item.avatar" @click="toZbj(item)" alt /> -->
              <div class="host-img-new"><img v-lazy="item.avatar" @click="toZbj(item)" alt /></div>
              <div :class="item.livestatus == 1 ? 'circle' : ''"></div>
              <div :class="item.livestatus == 1 ? 'circle' : ''"></div>
              <div :class="item.livestatus == 1 ? 'circle' : ''"></div>

            </dt>
            <dd class="fl">
              <h4 class="host-name">{{item.nickname}}</h4>
              <span class="lottery-name">{{item.name}}</span>
              <p class="play-time">{{item.starttime}}-{{item.endtime}}</p>
            </dd>
            <dd
              class="focus-btn"
              @click="followAnchor($event,item)"
              :class="item.isFollow?'focus':'no-focus'"
            ></dd>
          </dl>
          <!-- :class="'hot-icon'+(index+1)" -->
          <div class="hot-icon" v-if="index<3" ></div>
        </li>
      </ul>
    </div>
    <p class="no-data" v-if="!loading && LivePreview.length<1">该彩种暂无预告</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "preview",
  data() {
    return {
      LivePreview: [], //直播预告
      loading: true
    };
  },
  props: {
    typeId: {
      typeId: String,
      default: ""
    }
  },
  watch: {
    typeId: function(n, o) {
      this.getPreview(n);
    }
  },
  created() {
    // this.getPreview();
  },
  methods: {
    //获取直播预告
    async getPreview(n) {
    //   if (n == "全部") n = "";
      this.LivePreview = [];
      this.loading = true;
      this.typeLotter = n
      let res = await this.$http.get(this.versionLive2+"/user/anchor_advance/", {
        params: {
          user_id: this.$store.state.userinfo.user_id,
          type: n || ""
        }
      });
      this.loading = false;
      if (res && res.data.code == 1) {
        this.LivePreview = res.data.data || [];
      }
    },
    toZbj(item) {
      //进入用户   主播个人页
      if (item.livestatus == 1) {
        this.$router.push("/chat/" + item.aid);
        window.location.reload();
      } else {
        this.$router.push("/anchorProfile/" + item.aid);
      }
    },
    async followAnchor(e, v) {
      //是否登录
      if (!this.userinfo.user_id) {
        this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
        return 
      }
      //已经登录
      let res = await this.$http.post(this.versionLive2+"live/follow", {
        anchor_id: v.aid,
        user_id: this.userinfo.user_id
      });
      if (res && res.data.code == 1) {
        if (v.isFollow == true) {
          v.isFollow = false;
        } else {
          v.isFollow = true;
        }
         this.getPreview(this.typeLotter)
      }
    }
  },
  computed: {
    ...mapState(["userinfo"])
  },
  mounted() {}
};
</script>

<style scoped lang="less">
/*直播预告*/
.preview-container {
  // padding-top: 0.25rem;
  .loading-tip,
  .no-data {
    font-size: 0.35rem;
    
    text-align: center;
    padding-top: 0.3rem;
  }
  .no-data {
    padding-top: 2rem;
  }
  margin: 0 2.6%;
  .one-item {
    > h4 {
      // margin-top: .25rem;
      padding-top: 0.25rem;
      
      font-size: 0.35rem;
      i {
        letter-spacing: 2px;
      }
    }
    .preview-list-box {
      li {
        float: left;
        width: 48.7%;
        background: #fff;
        border-radius: 5px;
        padding: 0.25rem 0.5rem;
        margin: 0.25rem 2.6% 0 0;
        position: relative;
        .hot-icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 1.05rem;
          height: 0.5rem;
        }
        .hot-icon1 {
          background: url("../assets/images/main/No.1.png") no-repeat;
          background-size: contain;
        }
        .hot-icon2 {
          background: url("../assets/images/main/No.2.png") no-repeat;
          background-size: contain;
        }
        .hot-icon3 {
          background: url("../assets/images/main/No.3.png") no-repeat;
          background-size: contain;
        }
        &:nth-of-type(2n) {
          margin: 0.25rem 0 0 0;
        }
        .host-img {
          width: 1.1rem;
          height: 1.1rem;
          margin-right: 0.25rem;
          margin-top: 0.15rem;
          position: relative;
          .host-img-new{
            width: 1.1rem;
            height: 1.1rem;
            position: relative;
            z-index: 50;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            // margin-top: 0.15rem;
          }
        }
        .host-name {
         font-size: 0.35rem;
          font-weight: bold;
          max-width: 1.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .lottery-name {
          font-size: 0.35rem;
          
        }
        .play-time {
          font-size: 0.35rem;
          font-weight: bold;
        }
        .focus-btn {
          position: absolute;
          width: 0.65rem;
          height: 0.45rem;
          right: 0.2rem;
          top: 0.2rem;
          border-radius: 20px;
          &.no-focus {
            background: url("../assets/images/chat/add.png") #ff513e center
              no-repeat;
            background-size: 50%;
          }
          &.focus {
            background: url("../assets/images/chat/yiguanzhu@2x-min (1).png") #eee center
              no-repeat;
            background-size: 100%;
          }
        }
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
    display: block;
    background: #ff2727;
    // opacity: 0.3;
    // right: 0.75rem;
    // text-align: center;
    // top: 3.18rem;
    // width: calc(100% - 6px);
    // height: calc(100% - 6px);
    // border-color:#ff2727; 
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

    @keyframes circle-opacity {
      from {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-o-keyframes circle-opacity {
      from  {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
     to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-moz-keyframes circle-opacity {
      from  {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-webkit-keyframes circle-opacity {
      from {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
  }
</style>
