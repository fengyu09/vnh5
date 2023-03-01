<template>
  <div>
    <flexbox class="infoHead" :class="skin==5?'goldenHeader':''">
      <flexbox-item :span="1/10">
        <div
          @click="$router.go(-1)"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img v-if="skin!=5" src="../../assets/images/gray-back-icon.png" alt />
          <img v-if="skin==5" src="../../assets/images/skin/golden/goBack.png" alt />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo tickling">{{$t('ERecord.text[0]')}}</div>
      </flexbox-item>
      <flexbox-item :span="1/10">
        <div class="flex-demo"></div>
      </flexbox-item>
    </flexbox>
    <div class="tab" v-if="lanCode!=2" :class="skin==5?'tab-golden':''">
      <ul>
        <!-- :class="nowIndex==0?'active':''"  -->
        <li @click="toggleTabs(0)" 
        
         :class="[
        {'active':nowIndex==0&&skin ==0},
        {'skin-bb-pink':nowIndex==0&&skin ==1},
        {'skin-bb-blue':nowIndex==0&&skin ==2},
        {'skin-bb-green':nowIndex==0&&skin ==3},
        {'skin-bb-maingreen':nowIndex==0&&skin ==4},
        {'skin-bb-golden':nowIndex==0&&skin ==5}]"
        style="width:50%">
          <a>{{$t('ERecord.text[1]')}}</a>
        </li>
        <li @click="toggleTabs(1)" :class="[
        {'active':nowIndex==1&&skin ==0},
        {'skin-bb-pink':nowIndex==1&&skin ==1},
        {'skin-bb-blue':nowIndex==1&&skin ==2},
        {'skin-bb-green':nowIndex==1&&skin ==3},
         {'skin-bb-maingreen':nowIndex==1&&skin ==4},
         {'skin-bb-golden':nowIndex==1&&skin ==5}]" style="width:50%">
          <a>{{$t('ERecord.text[2]')}} </a>
        </li>
      </ul>
    </div>
    <div class="divTab" :class="skin==5?'divTab-golden':''" v-show="nowIndex==0">
      <myScroll :isDown="false"
                :bgColor="skin==5?'1F252C':''"
                :isLoad="isL"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :bottom="0"
                :top="lanCode==2?1.2:2.4"
                ref="scrollWrapper1"
                :data="playList"
                v-on:func="reLoad"
                >
        <div v-for="(item,index1) in rechargelist" :key="index1">
          <p class="time">{{index1}}</p>
          <ul class="consumptionList">
            <li v-for="(v,index2) in item" :key="index2" @touchstart="handlerTouchstart(v)" @touchmove="handlerTouchmove" @touchend="handlerTouchend(v)">
              <div class="fl">
                <dl>
                  <dt>
                    <img v-if="v.type==1000||v.type==1026" src="../../assets/images/member/ck.png" alt />
                    <img v-if="v.type==2000||v.type==1023" src="../../assets/images/member/qk.png" alt />
                    <img v-if="v.type==1001" src="../../assets/images/member/qhb.png" alt />
                    <img v-if="v.type==1004" src="../../assets/images/member/fangyon_7_9_3@3x-min.png" alt />
                    <img v-if="v.type==1003||v.type==1037" src="../../assets/images/member/fangyon_7_9_2@3x-min.png" alt />
                    <img v-if="v.type==1024" src="../../assets/images/member/fangyon_7_9_1@3x-min.png" alt />
                    <img v-if="v.type==1002" src="../../assets/images/member/caijin.png" alt />
                    <img v-if="v.type==1010" src="../../assets/images/fshui.png" alt />
                    <!-- 1010第三方游戏返水 -->
                    <img src="../../assets/images/member/USDT@2x (1).png" alt v-if="v.type == 1022" />
                    <img src="../../assets/images/member/USDT@2x (1).png" alt v-if="v.type == 2019" />
                    <img src="../../assets/images/member/txfwf.png" alt v-if="v.type == 2017||v.type==2018" />
                    <img v-if="v.type==1006" src="../../assets/images/member/viptype.png" alt />
                    <img v-if="v.type==1011" src="../../assets/images/member/hb.png" alt />
                    <img v-if="v.type==2002" src="../../assets/images/member/xz.png" alt />
                    <img v-if="v.type==2003" src="../../assets/images/member/video.png" alt />
                    <img v-if="v.type==1005||v.type==1032||v.type==1036" src="../../assets/images/member/icon_zhonjiang_4_29@2x.png" alt  />
                    <img v-if="v.type==2004||v.type==2005||v.type==2006||v.type==2007||v.type==2008||v.type==2009||v.type==2010||v.type==2012||v.type==2011||v.type==2013||v.type==2014||v.type==2015||v.type==2016||v.type==2026||v.type==2004||v.type==2025||v.type==2021||v.type==2027||v.type==2023||v.type==2024||v.type==2028||v.type==2029"  src="../../assets/images/member/sf.png" alt />

                    <img v-if="v.type==1007||v.type==1008||v.type==1009||v.type==1012||v.type==1013||v.type==1014||v.type==1015||v.type==1016||v.type==1017||v.type==1018||v.type==1019||v.type==1020||v.type==1021||v.type==1034||v.type==1033||v.type==1028||v.type==1030||v.type==1031||v.type==1035||v.type==1038||v.type==1039" src="../../assets/images/member/sxf.png" alt />
                  </dt>
                  <dd>
                   
                    <span class="tit">{{v.title}}</span>
                    <span class="second">{{v.time}}</span>
                  </dd>
                </dl>
              </div>
              
                 <div class="fr amount" :class="v.money-0>0?'jiaColor':''">
                <span v-if="v.money-0>0">+</span>{{v.money}}
                <a>{{$t('moneyDw')}}</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="zwjl" v-if="allSize<=0&&!isLoading">
          <img src="../../assets/images/member/zanwudashang.png" alt="">
          <p>no data</p>
        </div>
        <p class="loading-text" v-if="isLoading">{{$t('ERecord.text[3]')}} </p>
        <p class="no-data-tip" v-if="deadline&&!isLoading&&allSize">{{$t('ERecord.text[4]')}} </p>
      </myScroll>
    </div>
    <div class="divTab" :class="skin==5?'divTab-golden':''" v-show="nowIndex==1">
      <myScroll
              :isDown="false"
              :bgColor="skin==5?'1F252C':''"
                :isLoad="isL"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :bottom="0"
                :top="2.4"
              :data="playList"
              v-on:func="reLoad"
              ref="scrollWrapper2"
              v-if="typeIndex =='1'"
      >
        <div v-for="(item,index7) in tzRecordData" :key="index7">
          <p class="time">{{index7}}</p>
          <ul class="consumptionList">
            <li v-for="(v,index8) in item" :key="index8"  @touchstart="handlerTouchstart(v)" @touchmove="handlerTouchmove" @touchend="handlerTouchend(v)">
              <div class="fl">
                <dl>
                  <dt>
                    <img src="../../assets/images/member/icon_zhonjiang_4_29@2x.png" alt  v-if="v.type=='win'"/>
                    <img src="../../assets/images/member/xz.png" alt  v-else/>
                  </dt>
                  <dd>
                    <span class="tit">{{v.lottery_name}}</span>
                    <span class="second">{{v.issue}}&nbsp;&nbsp;&nbsp;{{v.time}}</span>
                  </dd>
                </dl>
              </div>
              <div class="fr nameAndAmount" >
                <span class="gifs">{{v.method_name}}&nbsp;&nbsp;&nbsp;{{v.item_name}}&nbsp;&nbsp;&nbsp;{{v.play_name}}</span>
                <span class="gifsAmou" >
                  <span :class="v.amount>0?'jiaColor':''" style="display: inline-block">{{v.amount}}</span>
                  <!-- <i>余额</i> -->
                </span>
              </div>
              
            </li>
          </ul>
        </div>

        <div class="zwjl" v-if="!isLoading&&allSize<=0">
          <img src="../../assets/images/member/zanwudashang.png" alt="">
          <p>no data</p>
        </div>

        <p class="loading-text" v-if="isLoading">{{$t('ERecord.text[3]')}}</p>
        <p class="no-data-tip" v-if="deadline&&!isLoading&&allSize">{{$t('ERecord.text[4]')}}</p>
      </myScroll>
    </div>

  </div>
</template>


<script>
import {
  Flexbox,
  FlexboxItem
} from "vux";
import { mapState } from "vuex";
export default {
  name: "eRecord",
  components: {
    Flexbox,
    FlexboxItem,
  },
      computed: {
    ...mapState(["skin","lanCode"])
  },
  data() {
    return {
      isload: false,
      isLup: false, //是否显示 上拉加载更多的组件
      isUpFlag: true, //是否开启上拉加载更多 默认不开启
      isL: false, //是否显示 下拉刷新的组件
      rechargelist: [],
      diamondList: {},
      rewardList: {},
      page: 1,
      limit:20,
      tzRecordData:{},
      playList:{},
      isLoading:false,
      deadline:false,
      isMorePage:false,
      api:this.versionLive2 + "Recharge/accountChange",
      nowIndex: 0,
      allSize:0,
      // typeIndex:this.$store.state.isPure==0?0:1
      typeIndex:1,
      shareOrderno:'',
      loop: 0,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false }
    );
  },
  methods: {
    init() {
      this.nowIndex = this.$route.query.type || 0;
      if(this.nowIndex==1){
         this.page = 1;
        this.allSize = 0;
        this.api = "/api/guess/moneylog";
        this.getTzRecord(true,0);
      }else{
        this.getTzRecord();
      }
      
    },
     handlerTouchstart(item) {
      this.loop = setTimeout(() => {
        this.loop = 0
        this.$publicPop({
                    title: "tip",
                    content: 'Chia sẻ một cuộc cá cược?',
                    clickConfirm: () => {
                      this.shareOrderno=item.order_no
                      this.goShare()
                    }
                });
      }, 800) // 定时的时间
      return false
    },
    handlerTouchmove () {
      // 清除定时器
      clearTimeout(this.loop)
      this.loop = 0
    },
    handlerTouchend () {
      // 清除定时器
      clearTimeout(this.loop)
    },
   goShare(){
     
       let c={
              order_no:this.shareOrderno
            }
        let d = this.globalPpproach.checkIsEncrypt(c)
       this.$http.post('/api/chatroom/shareprofit', d).then(res=>{
         if(res.data.code==1){
         this.$vux.toast.text(res.data.msg,'middle');
         }else{
             this.$vux.toast.text(res.data.msg,'middle');
         }
       })
    },  
    toggleTabs: function(index) {
      this.nowIndex = index;
      this.isLup=false;
      this.isUpFlag= false;
         this.$refs.scrollWrapper1.Myscroll.scrollTo(0, 0);

       this.$refs.scrollWrapper2.Myscroll.scrollTo(0, 0);
      if(this.nowIndex==0){
        this.api = this.versionLive2 + "Recharge/accountChange";
      }else if(this.nowIndex==1){
        this.api = "/api/guess/moneylog";
      }else if(this.nowIndex==3){
        this.api = this.versionLive2 + "user/diamond_list";
      }else if(this.nowIndex==2){
        this.api = this.versionLive2 + "user/user_reward_list";
      }
      
      this.page = 1;
      this.allSize = 0;
      this.getTzRecord(true,0);
      
    },
    reLoad(data) {
      if (data == "down") {
        this.getTzRecord(true);
      } else if (data == "up") {
        // console.log(999);
        this.loadMore();
      }
    },
    async loadMore() {
      // console.log(9);
      //判断是否有下一页
      if (!this.isMorePage) return;
      //判断节流阀
      if (!this.isUpFlag) return;
      this.isLup = true;
      this.page++;
      // let para = this.nowIndex==1?{ page:this.page,limit:this.limit}:
      //         { page:this.page,limit:this.limit,user_id: this.$store.state.userinfo.user_id}

      // let para = this.nowIndex==1?{ page:this.page,limit:this.limit,is_bl_play: (this.$store.state.isPure==0?0:1) || this.typeIndex}:
      //         { page:this.page,limit:this.limit,is_bl_play: (this.$store.state.isPure==0?0:1),user_id: this.$store.state.userinfo.user_id}
      let para = this.nowIndex==1?{ page:this.page,limit:this.limit,is_bl_play:this.typeIndex}:
              { page:this.page,limit:this.limit,is_bl_play:this.typeIndex,user_id: this.$store.state.userinfo.user_id}


      let res = await this.$http.get(this.api, {
        params: para
      });
      this.isLup = false;
      if (res && res.data.code == 1) {
        this.allSize = this.checkSize(res.data.data || {});
        if (this.allSize >= this.limit) {
          this.isMorePage = true;
          this.isUpFlag = true;
          this.deadline = false;
        } else {
          this.isMorePage = false;
          this.isUpFlag = false;
          this.deadline = true;
        }
        let obj = res.data.data || {};
        let key1;
        // let key2 = Object.keys(obj)[0];
        let obj2 = {};
        if(this.nowIndex==0){
           key1 = Object.keys(this.rechargelist)[Object.keys(this.rechargelist).length-1];
           obj2 = this.rechargelist;
        }else if(this.nowIndex==1){
          key1 = Object.keys(this.tzRecordData)[Object.keys(this.tzRecordData).length-1];
          obj2 = this.tzRecordData;
        }else if(this.nowIndex==3){
          key1 = Object.keys(this.diamondList)[Object.keys(this.diamondList).length-1];
          obj2 = this.diamondList;
        }else if(this.nowIndex==2){
          key1 = Object.keys(this.rewardList)[Object.keys(this.rewardList).length-1];
          obj2 = this.rewardList;
        }

        for(let k in obj){
          //判断日期是否有相同 第一个跟最后一个key对比 push
          if(key1==k){
            obj2[key1] = obj2[key1].concat(obj[key1])
          }else{
            obj2[k] = obj[k];
          }
        }

        if(this.nowIndex==0){
          this.rechargelist = obj2;
          this.playList.rechargelist = this.rechargelist;
        }else if(this.nowIndex==1){
          this.tzRecordData = obj2;
          this.playList.tzRecordData = this.tzRecordData;
        }else if(this.nowIndex==3){
          this.diamondList = obj2;
          this.playList.diamondList = this.diamondList;
        }else if(this.nowIndex==2){
          this.rewardList = obj2;
          this.playList.rewardList = this.rewardList;
        }

        setTimeout(()=>{
          this.$refs.scrollWrapper1.refresh(); //重新计算高度，刷新滚动条
          this.$refs.scrollWrapper2.refresh(); //重新计算高度，刷新滚动条
        },20)

      }else if(res && res.data.code==-1){
        this.isMorePage = false;
        this.isUpFlag = false;
        this.deadline = true;
      }
    },
    async getTzRecord(flag,ye){
      this.isLoading = true;
      if(!flag){
        this.tzRecordData = {};
        this.rechargelist = [];
        this.diamondList = {};
        this.rewardList = {};
      }
      if(flag){
        this.page = 1;
        this.isL = true;
      }
      let para = this.nowIndex==1?{ page:this.page,limit:this.limit,is_bl_play:this.typeIndex,user_id: this.$store.state.userinfo.user_id}:
              { page:this.page,limit:this.limit,is_bl_play: this.typeIndex,user_id: this.$store.state.userinfo.user_id}
      let res = await this.$http.get(this.api,{
        params:para
      });
      this.allSize = this.checkSize((res&&res.data.data) || {});
      if (this.allSize >= this.limit) {
        this.isMorePage = true;
        this.isUpFlag = true;
        this.deadline = false;
      } else {
        this.isMorePage = false;
        this.isUpFlag = false;
        this.deadline = true;
      }
      this.isLoading = false;
      this.isL = false;
      if(res && res.data.code==1){
        if(this.nowIndex==0){
          this.rechargelist = res.data.data;
          this.playList.rechargelist = this.rechargelist;
        }else if(this.nowIndex==1){
          this.tzRecordData = res.data.data;
          this.playList.tzRecordData = this.tzRecordData;
          // console.log(this.tzRecordData)
        }else if(this.nowIndex==3){
          this.diamondList = res.data.data;
          this.playList.diamondList = this.diamondList;
        }else if(this.nowIndex==2){
          this.rewardList = res.data.data;
          this.playList.rewardList = this.rewardList;
        }
      }
    },
    checkSize(obj) {
      let size = 0, key;
      for (key in obj) {
        size+=obj[key].length;
      }
      return size;
    },
    changeType(index){
      this.typeIndex = index;
      this.tzRecordData = {};
      this.getTzRecord(true,index);
    }
  },
  watch:{
  
  }
};
</script>


<style scoped lang="less">

.rem(@name,@px){
        @{name}:unit(@px/75,rem)
}
.teach-box {
  position: fixed;
  width: 100%;
  height: 100%;
  min-width: 320px;
  max-width: 750px;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 1000;
  > div {
    position: absolute;
  }
  .teach-one {
    width: 40%;
    top: 7rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .teach-two {
    width: 42%;
    top: 5.9rem;
    right: 6%;
  }
  .teach-three {
    width: 29.3%;
    top: 12rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
.infoHead {
  height: 1.2rem;
  line-height: 1.2rem;
}

.tab {
  height: 1.2rem;
  overflow: hidden;
  ul {
    width: 100%;
    li {
      width: 25%;
      /*width: 33.33%;*/
      float: left;
      text-align: center;
      line-height: 1.2rem;
      a {
        color: #6A86B9;
        font-size: 0.37rem;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 0.7rem;
          height: 0.1rem;
          border-radius: 20px;

          bottom: -0.25rem;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    li.active {
      a {
        color: #1486FF;
        font-weight: bold;
        &:before {
          background: #1486FF;
        }
      }
    }
    li.skin-bb-pink{
        a {
        color: #FB796B;
        font-weight: bold;
        &:before {
          background: #FB796B;
        }
      }
    }
    li.skin-bb-blue{
        a {
        color: #0CB6D9;
        font-weight: bold;
        &:before {
          background: #0CB6D9;
        }
      }
    }
    li.skin-bb-green{
        a {
        color: #0B9B71;
        font-weight: bold;
        &:before {
          background: #0B9B71;
        }
      }
    }
    li.skin-bb-maingreen{
        a {
        color: #01BE79;
        font-weight: bold;
        &:before {
          background: #01BE79;
        }
      }
    }
    li.skin-bb-golden{
        a {
        color: #E3CF95;;
        font-weight: bold;
        &:before {
          background: #E3CF95;
        }
      }
    }
 
  }
  &.tab-golden{
    background: #161C23;
    ul{
      
      li{
        a{
          color: #928151;
        }
      }
    }
  }
}
.type-title{
    background: #fff;
    text-align: center;
    overflow: hidden;
    .rem(padding-left,190);
    >span{
        display: inline-block;
        .rem(width,190);
        .rem(height,64);
        .rem(line-height,64);
        .rem(font-size,32);
        text-align: center;
        
        border:1px solid #FF3232;
        float: left;
        &:first-of-type{
            -webkit-border-radius: 0.1rem 0 0 0.1rem;
            -moz-border-radius: 0.1rem 0 0 0.1rem;
            border-radius: 0.1rem 0 0 0.1rem;
            border-right:0;
            &.active{
                color: #fff;
                background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                border-radius: 0.1rem 0 0 0.1rem;
            }
        }
        &:last-of-type{
            -webkit-border-radius: 0 0.1rem 0.1rem 0;
            -moz-border-radius: 0 0.1rem 0.1rem 0;
            border-radius: 0 0.1rem 0.1rem 0;
            border-left:0;
            &.active{
                color: #fff;
                background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                border-radius: 0 0.1rem 0.1rem 0;
            }
        }

    }
}
.divTab {
  .time {
    height: 1rem;
    line-height: 1rem;
    background: #f5f7fa;
    // color: #c7c8c9;
    color: #6A86B9;
    padding-left: 4%;
    font-size: 0.35rem;
  }
  .consumptionList {
    width: 100%;
    padding: 0 2%;
    li {
      border-bottom: solid 1px #eeeeee;
      overflow: hidden;
      padding: 0.3rem 0;
      div {
        &.gd{
          padding-top: 0.4rem;
        }
        dl {
          dt {
            width: 1.3rem;
            float: left;
            img {
              width: 1.3rem;
              height: 1.3rem;
              border-radius: 50%;
            }
          }
          dd {
            float: left;
            span {
              display: block;
              margin-left: 0.2rem;
            }
            .tit {
              // color: #445779;
              color: #445779;
              font-size: 0.35rem;
              padding-top: 0.15rem;
              padding-bottom: 0.1rem;
            }
            .second {
              // color: #999999;
              color: #6A86B9;
              font-size: 0.3rem;
            }
          }
        }
      }
      .amount {
        line-height: 1.3rem;
        // color: #445779;
        color: #6A86B9;
        font-size: 0.5rem;
        font-weight: 600;
        i {
          font-weight: normal;
          font-size: 0.32rem;
        }
        a {
          font-weight: normal;
          font-size: 0.3rem;
        }
      }
      .nameAndAmount {
        .zxList{
          max-width: 2rem;
          word-break: break-word;
          margin-right: 0.3rem;
          text-align: center;
          // 
          color: #6A86B9;
          padding-top:.2rem;
        }

        span {
          display: block;
        }
        .gifs {
          // 
          color: #6A86B9;
          font-size: 0.3rem;
          padding-top: 0.15rem;
          text-align: right;
          width: 4.7rem;
          word-break: break-all;
        }
        .gifsAmou {
          color: #6A86B9;
          font-size: 0.5rem;
          font-weight: 600;
          text-align: right;
          i {
            font-weight: normal;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  &.divTab-golden{
    .time{
      background: #252A31;
      color: #928151;
    }
    .consumptionList {

      li{
        border-bottom: solid 1px #5C564D;
        div{
          dl{
            dd{
              .tit{
                color: #CECECE;
              }
              .second{
                color: #928151;
              }
            }
          }
        }
        .gifs{
          color: #CECECE;
        }
        .amount ,.gifsAmou{
          color: #928151;
          a{
            color: #CECECE;
          }
        }
      }
    }
  }
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

.zanwu {
  text-align: center;
  .zanwuImg {
    margin-top: 3rem;
    img {
      width: 5.3rem;
    }
  }
  .zanwuPep {
    margin-top: 0.2rem;
    color: #666666;
    font-size: 0.37rem;
  }
}

.bottom-line {
  text-align: center;
  font-size: 0.3rem;
  color: #ccc;
  padding: 0.4rem 0;
}

.list-item {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  .delete {
    width: 1.9rem;
    height: 2.3rem;
    line-height: 2.3rem;
    background: #ff513e;
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 0;
    right: -1.95rem;
    img {
      width: 0.6rem;
      vertical-align: middle;
    }
  }
}
.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type="1"] {
  transform: translate3d(-1.9rem, 0, 0);
}
.list-box {
  padding-left: 0.4rem;
  background: #fff;
  .details {
    position: relative;
    height: 2.3rem;
    .det {
      width: 1.9rem;
      height: 2.3rem;
      float: left;
      padding-top: 0.4rem;
      border-bottom: 1px solid #fff;
      .detImg {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: auto;
          height: 100%;
          -webkit-touch-callout: inherit !important;
          pointer-events: inherit !important;
        }
      }
    }
    .info {
      border-bottom: 1px solid #f5f5f5;
      height: 2.3rem;
      .name {
        color: #333333;
        padding-top: 0.5rem;
        font-size: 0.4rem;
        font-weight: bold;
        span {
          vertical-align: middle;
        }
        .num {
          letter-spacing: 0;
          font-weight: normal;
          float: right;
          font-size: 0.36rem;
          width: 3rem;
          color: #333333;
          display: flex;
          flex-direction: row-reverse;
        }
      }
      .txt {
        font-size: 0.35rem;
        color: #999999;
        padding-top: 0.2rem;
        span {
          vertical-align: middle;
        }
        .num {
          float: right;
          font-size: 0.36rem;
          width: 3rem;
          color: #333333;
          display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }
}

//数据还在加载时的样式
.ercoord-null {
  .list-box {
    padding-left: 0.4rem;
    background: #fff;
    height: 2.3rem;
    width: 100%;
    .details {
      position: relative;
      height: 2.3rem;
      .det {
        width: 1.9rem;
        height: 2.3rem;
        float: left;
        border-bottom: 1px solid #fff;
        background: #fff;
        .detImg {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          background: #ededed;
        }
      }
      .info {
        border-bottom: 1px solid #f5f5f5;
        height: 2.3rem;
        margin-left: 1.9rem;
        margin-right: 0.3rem;
        .name1 {
          height: 0.15rem;
        }
        .name {
          height: 0.5rem;
          .nameOne {
            float: left;
            height: 0.4rem;
            background: #ededed;
            border-radius: 4px;
            width: 1.6rem;
          }
          .nameTwo {
            float: right;
            height: 0.4rem;
            background: #ededed;
            border-radius: 4px;
            width: 1.6rem;
          }
        }
        .txt {
          margin-top: 0.3rem;
          height: 0.4rem;
          .nameOne {
            margin-top: 0.2rem;
            float: left;
            height: 0.4rem;
            background: #ededed;
            border-radius: 4px;
            width: 3.5rem;
          }
          .nameTwo {
            margin-top: 0.2rem;
            float: right;
            height: 0.4rem;
            border-radius: 4px;
            background: #ededed;
            width: 0.7rem;
          }
        }
      }
    }
  }
}

.zwjl{
  width: 100%;
  text-align: center;
  color:#6A86B9;
  img{
    width: 50%;
    margin-top: 3rem;
  }
}

.loading-text{
  font-size: .35rem;
  text-align: center;
  margin-top: 1rem;
}
.no-data-tip {
  text-align: center;
  font-size: 0.33rem;
  padding: 0.4rem 0 .8rem 0;
  color: #666;
}
  .jiaColor{
    // color: #ff513e!important;
    color: #FF6562!important;
    i{
      font-size: .5rem!important;
    }
  }
  .jianColor{
    color: #6A86B9!important;
    // color: #333!important;
  }
</style>
