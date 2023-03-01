<template>
  <div class="ranking">
    <div class="header">
      <div @click="$router.go(-1)" style="padding: 0.1rem 0.2rem;margin-left: -0.2rem;">
        <i class="go-back"></i>
      </div>
      <div>
        <h3>排 行</h3>
      </div>
    </div>
    <div class="ranking-menu">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :class="{ active: menuActive == item.index }"
          @click="menuActive = item.index"
          :key="index"
          
        >
          {{ item.name }}
        </li>  
        <!-- v-show="item=='影片榜'?$store.state.userinfo.noble-0:true" -->
      </ul>
    </div>
    <div class="ranking-type">
      <ul>
        <li
          v-for="(item, index) in menuList2[menuActive]"
          :class="{ active: typeActive == index }"
          @click="typeActive = index;typeMode=item.EsName"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="ranking-date">
      <ul v-if="menuActive < 2">
        <li
          v-for="(item, index) in dateList1"
          :class="{ active: dateActive == index }"
          @click="
            dateActive = index;
            dateMode = item.EsName;
          "
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul v-else>
        <li
          v-for="(item, index) in dateList2"
          :class="{ active: dateActive == index }"
          @click="
            dateActive = index;
            dateMode = item.EsName;
          "
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
     <myScroll
      ref="scrollWrapper"
      :probeType="2"
      :top="4.2"
      :left="0"
      :bottom="0"
      :bgColor="'F2F6F7'"
    >
    <div class="ranking-content">
      {{rankData}}
      {{rankData.length}}
      <ul v-if="menuActive == 0&&$store.state.isPure!=1">
        <li v-for="(item, index) in rankData" :key="index" v-show="rankData.length">
          <div class="mingci">
            <img
              src="../../assets/images/ranking/vip1@2x.png"
              alt=""
              srcset=""
              v-if="index == 0"
            />
            <img
              src="../../assets/images/ranking/vip@2x.png"
              alt=""
              srcset=""
              v-if="index == 1"
            />
            <img
              src="../../assets/images/ranking/VIP3@2x.png"
              alt=""
              srcset=""
              v-if="index == 2"
            />
            <span v-if="index > 2">{{ index + 1 }}</span>
          </div>
          <div class="touxiang">
            <img v-if="item.avatar"  v-lazy="item.avatar"  alt="" srcset="" />
            <img
              v-else
              src="../../assets/images/member/bgtoux.png"
              alt=""
              srcset=""
            />
          </div>
          <span class="name">{{ item.nickname }}</span>
          <span class="right-text">
            <i v-if="typeMode =='pop_rank'">{{ item.count }}访问</i>
            <i v-else>{{ item.count }}</i>
          </span>
        </li>
      </ul>
      <ul v-if="menuActive == 1">
        <li v-for="(item, index) in rankData" :key="index" v-show="rankData.length">
          <div class="mingci">
            <img
              src="../../assets/images/ranking/vip1@2x.png"
              alt=""
              srcset=""
              v-if="index == 0"
            />
            <img
              src="../../assets/images/ranking/vip@2x.png"
              alt=""
              srcset=""
              v-if="index == 1"
            />
            <img
              src="../../assets/images/ranking/VIP3@2x.png"
              alt=""
              srcset=""
              v-if="index == 2"
            />
            <span v-if="index > 2">{{ index + 1 }}</span>
          </div>
          <div class="touxiang">
            <img v-if="item.avatar" v-lazy="item.avatar" alt="" srcset="" />
            <img
              v-else
              src="../../assets/images/member/bgtoux.png"
              alt=""
              srcset=""
            />
          </div>
          <span class="name">{{ item.nickname }}</span>
          <div style="margin-left: 0.4rem">
            <img
              v-if="item.noble"
              style="width: 1.2rem; vertical-align: middle"
              :src="vipIcons[item.noble-1]"
              alt=""
              srcset=""
            />
          </div>
          <span class="right-text">
            <!-- <i class="shenglv">99<em>%</em></i> -->
            <i v-if="typeActive == 0">{{ item.num }}人</i>
            <i v-else>{{ item.amount }}</i>
          </span>
        </li>
      </ul>
      <ul v-if="menuActive == 2">
        <li v-for="(item, index) in rankData" :key="index" v-show="rankData.length">
          <div class="mingci">
            <img
              src="../../assets/images/ranking/vip1@2x.png"
              alt=""
              srcset=""
              v-if="index == 0"
            />
            <img
              src="../../assets/images/ranking/vip@2x.png"
              alt=""
              srcset=""
              v-if="index == 1"
            />
            <img
              src="../../assets/images/ranking/VIP3@2x.png"
              alt=""
              srcset=""
              v-if="index == 2"
            />
            <span v-if="index > 2">{{ index + 1 }}</span>
          </div>
          <div class="touxiang">
            <img v-if="item.avatar" v-lazy="item.avatar" alt="" srcset="" />
            <img
              v-else
              src="../../assets/images/member/bgtoux.png"
              alt=""
              srcset=""
            />
          </div>
          <span class="name">{{ item.nickname }}</span>
          <div style="margin-left: 0.4rem">
            <img
              v-if="item.noble"
              style="width: 1.2rem; vertical-align: middle"
              :src="vipIcons[item.noble-1]"
              alt=""
              srcset=""
            />
          </div>
          <span class="right-text">
            <i class="shenglv" v-if="typeActive == 0"
              >{{ parseInt(item.win_rate * 100) }}<em>%</em></i
            >
            <i v-else>{{ item.prize }}</i>
          </span>
        </li>
      </ul>
      <ul class="video-list" v-if="menuActive == 3&&$store.state.isPure!=1">
          <li  v-for="(item, index) in rankData" :key="index" @click="goPlay(item)" v-show="rankData.length">
              <div class="video-img">
                  <img v-lazy="item.cover" alt="">
                  <i v-if="index==0"></i>
                  <i v-if="index==1" class="no2"></i>
                  <i v-if="index==2" class="no3"></i>
              </div>
              <div class="video-info">
                <p class="video-title" v-if="item.title">{{item.title.length>30?item.title.substring(0,32)+'...':item.title}}</p>
                <p class="video-bq" v-if="item.tag"><span>标签: </span> <i v-for="item2 in item.tag.split( ',' )" style="margin:0 0.06rem" :key="item2">{{item2}}</i> </p>
                <p> <img src="../../assets/images/video/play_icon.png" alt="" style="width:0.266rem;"> {{item.play_time}}人播放/{{item.likenum}}人喜欢 </p>
              </div>
          </li>
      </ul>
      <div
        style="font-size: 0.4rem; text-align: center; padding: 1rem 0"
        v-if="rankData.length == 0&&rankData"
      >
        <span>no data~</span>
      </div>
    </div>
     </myScroll>
  </div>
</template>
<script>
export default {
  name: "ranking",
  data() {
    return {
      menuList:[{index:0,name:'直播榜'},{index:1,name:'推广榜'},{index:2,name:'竞猜榜'},{index:3,name:'影片榜'}],
      menuListVip:[{index:0,name:'直播榜'},{index:1,name:'推广榜'},{index:2,name:'竞猜榜'}],
      menuListPure:[{index:1,name:'推广榜'},{index:2,name:'竞猜榜'}],
      // menuList: ["直播榜", "推广榜", "竞猜榜", "影片榜"],
      // menuListPure:["推广榜", "竞猜榜"],
      // menuListVip:["直播榜","推广榜", "竞猜榜"],
      menuList2: [
        [{name:"人气",EsName:'pop_rank'},{name:"收入",EsName:'income_rank'},{name:"贡献",EsName:'devote_rank'}],
        [{name:"邀请人数",EsName:'invitee'}, {name:"返佣",EsName:'brokerage'}],
        [{name:"胜率",EsName:'win'}, {name:"赢取",EsName:'prize'}],
        [{name:"热门",EsName:'hot'}, {name:"好评",EsName:'like'},{name:"收藏",EsName:'collect'}]
      ],
      dateList1: [
        { name: "周榜", EsName: "week" },
        { name: "月榜", EsName: "month" },
        { name: "总榜", EsName: "all" },
      ],
      dateList2: [
        { name: "日榜", EsName: "day" },
        { name: "周榜", EsName: "week" },
        { name: "月榜", EsName: "month" },
      ],
      menuActive: 0,
      typeActive: 0,
      dateActive: 0,
      totolData: [[],[],[],[]],
      rankData: [],
      dateMode: "week",
      typeMode:'pop_rank',
      inviteeData: [[], []],
      guessData: [[], []],
      videoData:[[],[],[]],
      vipIcons:[
      require('../../assets/images/ranking/vip1.png'),
      require('../../assets/images/ranking/vip2.png'),
      require('../../assets/images/ranking/vip3.png'),
      require('../../assets/images/ranking/vip4.png'),
      require('../../assets/images/ranking/vip5.png'),
      require('../../assets/images/ranking/vip6.png'),
      require('../../assets/images/ranking/vip7.png'),
      ]
    };
  },
  watch: {
    menuActive(i) {
      this.typeActive = 0;
      this.dateActive = 0;
      this.typeMode= this.menuList2[i][0].EsName
      if(i<2){
        this.dateMode = "week";
      }else{
        this.dateMode = "day";
      }
       setTimeout(() => {
          this.$refs.scrollWrapper.scrollTo(0,0); 
       }, 20);
    },
    typeMode(i){
     this.rankData =this.totolData[this.menuActive][i][this.dateMode];
      setTimeout(() => {
        this.$refs.scrollWrapper.scrollTo(0,0); 
      }, 20);
    },
    dateMode(i) {
      this.rankData =this.totolData[this.menuActive][this.typeMode][i]
       setTimeout(() => { 
         this.$refs.scrollWrapper.scrollTo(0,0); 
       }, 20);
    },
    "$store.state.isPure":function(){
      if(this.$store.state.codeToken){
         if(this.$store.state.isPure==0&&this.$store.state.userinfo.noble-0<=0){
            this.menuList = this.menuListVip;
          }if(this.$store.state.isPure==0&&this.$store.state.userinfo.noble-0>0){
            this.menuList = [{index:0,name:'直播榜'},{index:1,name:'推广榜'},{index:2,name:'竞猜榜'},{index:3,name:'影片榜'}];
          }else if(this.$store.state.isPure==1){
            this.menuList = this.menuListPure;
          }
      }else{
         if(this.$store.state.isPure==0){
          this.menuList = this.menuListVip;
        }else if(this.$store.state.isPure==1){
          this.menuList = this.menuListPure;
        }
      }
     
      if(this.$store.state.isPure==1){
           this.menuActive = 1;
      }else{
          
      } 
    }
  },
  created() {
     if(this.$store.state.isPure==1){
           this.menuActive = 1;
      }else{
          
      } 
      this.getRankData();
      this.getBanner();
      if(this.$store.state.codeToken){
        if(this.$store.state.isPure==0&&this.$store.state.userinfo.noble-0<=0){
          this.menuList = this.menuListVip;
        }else if(this.$store.state.isPure==1){
          this.menuList = this.menuListPure;
        }
      }else{
        if(this.$store.state.isPure==0){
          this.menuList = this.menuListVip;
        }else if(this.$store.state.isPure==1){
          this.menuList = this.menuListPure;
        }
      }
     
      
  },
  mounted() {},
  methods: {
    getRankData() {
      this.$vux.loading.show();
      
         this.$http.get(this.versionLive2 + "live/anchor_rank/").then((res) => {
          if(res&&res.data.code==1){
          this.totolData[0] =  res.data.data;
           if(this.$store.state.isPure!=1){
              this.rankData = this.totolData[0][this.typeMode][this.dateMode]
            }
          }
          this.$vux.loading.hide();
        });
      
     
      // this.$http.get("/api2/market/rank").then((res) => {
      this.$http.get("/api/market/rank").then((res) => {
         if(res&&res.data.code==1){
           console.log(res.data)
         this.totolData[1] =  res.data;
         if(this.$store.state.isPure==1){
              this.rankData = this.totolData[1][this.typeMode][this.dateMode]
            }
            console.log( this.rankData)

         }
         this.$vux.loading.hide();
      });
    
      // this.$http.get("/forum/guess/rank").then((res) => {
      this.$http.get("/api/guess/rank").then((res) => {
        console.log(res.data)
         if(res&&res.data.code==1){
          this.totolData[2] =  res.data;
          console.log(this.totolData[2])
         }
      });
       this.$http.get("/video/getRankList").then((res) => {
          if(res&&res.data.code==1){
          this.totolData[3] =  res.data.data;
          }
      });
     
    },
    goPlay(v){
      this.$router.push('/videoPlay/' + v.moviesid);
    },
     async getBanner(){
            let res = await this.$http.get(this.versionLive2 + "user/get_movie_banner/");
            if (res && res.data.code == 1) {
              if(res.data.data.banner_movie_play) localStorage.setItem('banner_movie_play',JSON.stringify(res.data.data.banner_movie_play))
                else localStorage.setItem('banner_movie_play',JSON.stringify([]))
            }
       },
  },
};
</script>
<style lang="less" scoped>
.ranking {
  .header {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.346rem;
    .go-back {
      display: block;
      width: 0.26rem;
      height: 0.48rem;
      background: url("../../assets/images/gray-back-icon.png") no-repeat;
      background-size: cover;
    }
    h3 {
      font-weight: 550;
      font-size: 0.45rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .ranking-menu {
    margin-top: 1.2rem;
    border-top: 1px solid #EAF2FF;
    ul {
      justify-content: space-around;
      li {
        padding: 0.2rem 0.4rem;
        font-size: 0.42rem;
        position: relative;
      }
      .active {
        color: #1486FF;
        &:before {
          content: "";
          display: block;
          width: 32%;
          height: 4px;
          background: #1486FF;
          position: absolute;
          left: 34%;
          bottom: 0;
          border-radius: 4px;
        }
      }
    }
  }
  .ranking-date{
    background: #F2F6F7;
  }
  .ranking-type {
    padding: 0.2rem 0 ;
    background: #F2F6F7;
    ul {
      width: 66%;
      margin-left: 17%;
      border-radius: 0.5rem;
      border: 1px solid #65AEFF;
      overflow: hidden;
      li {
        width: 50%;
        text-align: center;
        padding: 0.2rem 0;
        font-size: 0.37rem;
        border-right: 1px solid #65AEFF;
        &:last-child {
          border-right: none;
        }
      }
      .active {
        color: #fff;
        background: linear-gradient(90deg, #007CFF, #65AFFF);
      }
    }
  }
  .ranking-date {
    ul {
      justify-content: center;
      li {
        padding: 0.15rem 0.4rem;
      }
      .active {
        color: #1486FF;
      }
    }
  }
  .ranking-content {
    border-top: 1px solid #fff;
    ul {
      display: block;
      li {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        .mingci {
          width: 16%;
          text-align: center;
          img {
            width: 0.93rem;
          }
          font-size: 0.44rem;
          font-family: "number1";
        }
        .touxiang {
          img {
            width: 1.17rem;
            height: 1.17rem;
            border-radius: 50%;
          }
        }
        .name {
          font-size: 0.37rem;
          color: #445779;
          margin-left: 0.25rem;
        }
        .right-text {
          margin-left: auto;
          margin-right: 0.4rem;
          // color: #999999;
          .shenglv {
            color: #ff403c;
            font-family: "number1";
            font-size: 0.6rem;
            em {
              font-size: 0.28rem;
            }
          }
        }
      }
    }
    .video-list{
      padding: 0 0.3rem;
      li{
        font-size: 0.3rem;
        .video-img{
          position: relative;
          display: flex;
          img{width: 3.2rem;height:1.86rem;border-radius: 0.2rem;}
          i{
            display: block;
            position: absolute;
            top: 0.1rem;
            left: 0.1rem;
            width: 1.17rem;
            height: 0.56rem;
            background: url('../../assets/images/ranking/no1.png') no-repeat;background-size: 100% 100%;
          }
          .no2{
             background: url('../../assets/images/ranking/no2.png') no-repeat;background-size: 100% 100%;
          }
          .no3{
             background: url('../../assets/images/ranking/no3.png') no-repeat;background-size: 100% 100%;
          }
        }
        .video-info{
          margin-left: 0.2rem;
          color: #999999FF;
          .video-title{
            color: #000;
            font-size:0.32rem ;
          }
          .video-bq{
            margin: 0.1rem 0;
            i{
              display: inline-block;
              line-height: 0.46rem;
              padding: 0 0.1rem;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
  ul {
    display: flex;
    li {
      // color: #666666;
    }
  }
}
</style>