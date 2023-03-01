<template >
  <div class="system">
    <flexbox class="infoHead" >
      <flexbox-item :span="1 / 10">
        <div
          @click="$router.go(-1)"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img src="../../assets/images/gray-back-icon.png" alt />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo tickling">互动消息</div>
      </flexbox-item>
      <flexbox-item :span="1 / 10">
        <div class="flex-demo"></div>
      </flexbox-item>
    </flexbox>
    <myScroll
      ref="scrollWrapper"
      :top="1.2"
      :bottom="0"
      :left="0"
      :bgColor="'f5f7fa'"
    >
      <div class="hudong">
        <ul>
          <li v-for="(item,index) in noticeList" :key="index" @click="toDis(item)" >
            <div class="clearfix hudong-one">
              <div class="fl hudong-tou">
                <img v-lazy="item.avatar" alt />
              </div>
              <div class="pl-box fl">
                <div class="clearfix">
                  <span class="fl hudong-nickname">{{item.nickname}}</span>
                  <span class="fl">回复了你</span>
                  <span class="fr hudong-time">{{item.create_time | filterTime}}</span>
                </div>
                <div class="hudong-pj" v-html="item.content"></div>
              </div>
              <div class="fr hudong-img">
                <img v-lazy="item.media" alt />
              </div>
            </div>
          </li>
        </ul>
      </div>



      <div class="no-data-tidiv zanwu" v-if="!noticeList.length">
          <div class="zanwuImg"><img src="../../assets/images/member/zanwuiguanzhu.png" alt=""></div>
          <div class="zanwuPep">当前暂无任何互动消息哦~</div>
      </div>
    </myScroll>
      <keep-alive >
            <!-- &&isShowKey -->
            <vme ref="vmeChild"  style="bottom:0;display:none" ></vme>
            <!-- <vme  ref="vmeChild"></vme> -->
        </keep-alive>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { mapState, mapMutations } from "vuex";
 import vme from '../../components/vue-mobile-emoji/vme.vue';
import myScroll from "../../components/myScroll.vue";
export default {
  name: "system",
  components: {
    Flexbox,
    FlexboxItem,
    myScroll,
    vme
  },
  data() {
    return {
      noticeList:[],
      showEmj:false
    };
  },
  created() { },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState([
      "interactdata",
    ])
  },
  methods: {
    ...mapMutations(["SETHDNOTICES"]),
      init(){
          this.getNoticeList();
          this.SETHDNOTICES('non')
      },
      getNoticeList(){
        this.noticeList = JSON.parse(this.interactdata);
        this.flitImg(this.noticeList)
    },

     flitImg(data) {
      let len = this.$refs.vmeChild.emojis.length;
      let fhbq = this.$refs.vmeChild.fhbqList;
      let dL = data.length;
      for (let o = 0; o < dL; o++) {
        for (let i = 0; i < len; i++) {
          if (data[o].content.indexOf(this.$refs.vmeChild.emojis[i]) > -1) {
            let len = data[o].content.length;
            for (let j = 0; j < len; j++) {
              this.noticeList[o].content = this.noticeList[o].content.replace(
                this.$refs.vmeChild.emojis[i],
                '<img src="../static/images/chat/emoji/' +
                  this.$refs.vmeChild._emojiName(
                    this.$refs.vmeChild.emojis[i]
                  ) +
                  '" style="width: 0.5rem;vertical-align: text-bottom;">'
              );
            }
          }
        }

        fhbq.forEach((item, i) => {
          // if (data[o].type == "publish") {
            if (data[o].content.indexOf(item.flag) > -1) {
              let len = data[o].content.length;
              for (let j = 0; j < len; j++) {
                this.noticeList[o].content = this.noticeList[o].content.replace(
                  item.flag,
                  '<img src="' +
                    item.imgSrc +
                    '" style="width:0.46rem;vertical-align: text-bottom;">'
                );
              }
            }
          // }
        });

      }
    },
    toDis(i){
      console.log(i);
      if(i.apiType ==1){
        this.$router.push('/discussZb');
      } else {
        this.$router.push('/discuss');
      }
      // this.$router.push('/discussZb');
      localStorage.setItem('zbpl',JSON.stringify(i));
    },
  }
};
</script>
<style lang="less">
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
.zanwu{
    text-align: center;
    z-index: 100;
    .zanwuImg{
        margin-top: 3rem;
        img{
            width: 5.3rem;
        }
    }
    .zanwuPep{
        margin-top: .2rem;
        color:#666666;
        font-size: .37rem;
    }
}
.no-data-tip{
  text-align: center;
  
  padding-top: 2rem;
  font-size: .36rem;
}
.infoHead {
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
}
.flex-demo {
  text-align: center;
  img {
    width: 0.25rem;
  }
}
.tickling {
  font-weight: 550;
  font-size: 0.45rem;
}
.hudong {
  // background: #fff;
  .hudong-one {
    width: 92%;
    margin: 0 auto;
  }
  .hudong-tou {
    width: 40px;
    height: 40px;
    margin-right: 2.9%;
    margin-top: 0.1333rem;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%
    }
  }
  .pl-box {
    width: 56.8%;
    //   width: 60.8%;
    margin-top: 0.1333rem;
    //   margin-bottom: 0.5rem;
    span {
      color: #999999;
      font-size: 0.34rem;
    }
    .hudong-time {
      font-size: 0.3rem;
      //   color: #999999;
    }
    .hudong-nickname {
      color: #445779;
      margin-right: 2.5%;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .hudong-img {
    width: 75px;
    height: 50px;
    overflow: hidden;
  }
  ul {
    //   width: 92%;
    //   margin: 0 auto;
    li {
      height: 2.138rem;
      padding-top: 0.4rem;
      margin-bottom: 0.268rem;
      background: #fff;
    }
  }
  .hudong-pj {
    width: 100%;
    font-size: 0.38rem;
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>