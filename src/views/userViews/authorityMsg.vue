<template >
  <div class="system">
      <flexbox class="infoHead">
      <flexbox-item :span="1 / 10"
        ><div
          @click="$router.go(-1)"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img src="../../assets/images/gray-back-icon.png" alt="" />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo  tickling">活动消息</div>
      </flexbox-item>
      <flexbox-item :span="1 / 10"><div class="flex-demo"></div></flexbox-item>
    </flexbox>
     <myScroll
            ref="scrollWrapper"
            :probeType="2"
            :top="1.2"
            :bottom="0"
            :left="0"
            :bgColor="'f5f7fa'"
          >
      <div style="margin: 0 4%;">
  
        <ul>
             <!-- v-for="(item,index) in planHistoryList" :key="index" -->
          <li v-for="(item,index) in noticeList" :key="index" >
            <div class="gf-time"><span>{{item.create_time | formatDate1}}</span></div>
            <div class="clearfix">
              <div class="gf-img fl">
                <img
                  src="../../assets/images/member/messGF-min.png"
                  alt=""
                />
              </div>
              <div class="fl gf-nr">
                <div class="gf-tit" v-html="item.content">
                </div>
              </div>
            </div>
          </li>
        </ul>

      </div>
       <div class="no-data-tidiv zanwu" v-if="!noticeList.length">
          <div class="zanwuImg"><img src="../../assets/images/member/zanwuiguanzhu.png" alt=""></div>
          <div class="zanwuPep">no data~</div>
      </div>
     </myScroll>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { mapState, mapMutations } from "vuex";
import myScroll from "../../components/myScroll.vue";
export default {
  name: "system",
  components: {
    Flexbox,
    FlexboxItem,
    myScroll
  },
  data() {
    return {
        noticeList:[]
    };
  },
  created(){
    this.init();
  },
  computed: {
    ...mapState([
      "authortyData"
    ])
  },
  methods: {
        ...mapMutations(["SETGFNOTICES"]),
      init(){
          this.getNoticeList();
          this.SETGFNOTICES("non");
      },
      getNoticeList(){
        this.noticeList = JSON.parse(this.authortyData);
    },

  }
};
</script>
<style lang="less">
    .rem(@name,@px){
    @{name}:unit(@px/75,rem)
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
  .gf-img {
      width: 40px;
      height: 40px;
    }
.gf-time {
      width: 100%;
      color: #999999;
      height: 0.77777rem;
      line-height: 0.77777rem;
      text-align: center;
    }
        .gf-nr {
      line-height: 0.58rem;
      font-size: 0.32rem;
      // width: 85.5%;
      width: 84.5%;
      background-color: #fff;
      border-radius: 10px;
      margin-left: 2.9%;
      .gf-tit {
        margin-top: 0.4rem;
        // margin-left: 5.2%;
        margin-left: 4.2%;
        padding-bottom: 0.4rem;
        .gf-tit-1 {
          font-size: 0.4rem;
          font-weight: bold;
          margin-bottom: 0.2rem;
        }
      }
    }
</style>