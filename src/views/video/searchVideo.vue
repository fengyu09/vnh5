<template>
  <div class="main-search">

    <div class="search-box clearfix" :class="skin==5?'search-box-golden':''">
      <div class="fl search-input clearfix">
        <div class="search-icon fl" @click="search"></div>
        <input :placeholder="$t('searchVideo.text[7]')" v-model="searchContent" type="text" class="fl" maxlength="50">
      </div>
      <a @click="back" v-if="!isSearch" class="fr cancel-btn">{{$t('searchVideo.text[0]')}}</a>
      <a @click="search" v-if="isSearch" class="fr cancel-btn">{{$t('searchVideo.text[1]')}}</a>

    
    </div>
    <myScroll
            :isDown="true"
            :bottom="0"
            :top="1.3"
            :bgColor="$st.state.skin==5?'1F252C':'fff'"
            v-on:func="reLoad"
            ref="scrollWrapper"
            :data="playList"
    >
    <div class="history-box" v-if="historyList.length&&!hotHost.length">
      <h4>{{$t('searchVideo.text[2]')}} <i class="clear-btn" @click="clearHistory"></i></h4>
      <ul class="search-list">
        <li v-for="(v,index) in historyList" :key="index" @click="changeSearch(v)">#{{v}}#</li>
      </ul>
    </div>
    

    <div class="search-result">
        <ul class="guess-like-all" v-if="hotHost.length">
          <li class="like-item" v-for="(v,index) in hotHost" :key="index" @click="goPlay(v)">
            <div class="like-img"><img v-lazy="v.cover" alt=""></div>
            <div class="like-msg">
              <p class="like-title">
               {{v.title | filterTitle}}
              </p>
              <p class="play-tag">{{$t('searchVideo.text[3]')}} <i v-if="v.tag.length" v-for="(item,i) in v.tag.split(',')" :key="i">{{item}}</i></p>
              <p><i class="play-icon"></i>{{v.reads | filterOnlineNum}}{{$t('searchVideo.text[4]')}}</p>
            </div>
          </li>
        </ul>
       <p class="no-search" v-if="isLoading&&hotHost.length<=0">{{$t('searchVideo.text[5]')}}</p>

      <h4 class="hot-title" v-if="!hotHost.length&&moreList.length">{{$t('searchVideo.text[6]')}}</h4>
      <div class="video-main" v-if="!hotHost.length&&moreList.length">
        <div class="video-box">
          <div class="video-list">
            <div class="list-item" v-for="(v,index) in moreList" :key="index" @click="goPlay(v)">
              <div class="item-img">
                <div class="img-box">
                  <img v-lazy="v.cover" alt="">
                </div>
                <div class="video-describe">
                  <div>
                    <i><img src="../../assets/images/video/bf-icon.png" alt="" srcset="" /></i> <span>{{v.reads | filterOnlineNum}}</span>
                  </div>
                  <div>
                    <span>{{v.play_time | filterSecond}}</span>
                  </div>
                </div>
              </div>
              <div class="item-name">
                <span>{{v.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </myScroll>

  </div>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: "search",
  data() {
    return {
      searchContent:'',//搜索内容
      hotHost:[],
      isload: false,
      isL: false, //是否显示 下拉刷新的组件
      tuiJianList:[],//热门
      historyList: [],
      isSend:false,
      isLoading:false,
      moreList:[],
      isHot:true,
      playList:{},
      postData:{
        cid:1,
        typeId:8,
        num:0,
        isMore:false,
        page:1,
      },
      moreData:{
        column:'praise',
        tag:'',
        typeId:null,
        page:1,
        perPage:6,
        cid:null
      },
      isSearch:false
    }
  },
  created() {
   
    this.getMoreList();
     if(!localStorage.getItem('historySearch')||localStorage.getItem('historySearch')=='undefined'||localStorage.getItem('historySearch')=='null'){
       this.historyList = [];
      }else{
       this.historyList = JSON.parse(localStorage.getItem('historySearch'));
      }

  },
  computed: {
    ...mapState(["userinfo","skin"])
  },
  watch:{
    "searchContent":function (n,o) {
      if(!n) return this.isSearch = false;
      this.isSearch = true;
    }
  },
  filters:{
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "万";
      }
      return n;
    },
    filterTitle(n){
      if(n.length>35){
      return n.substring(0,35)+'...'
      }else{
        return n
      }
    }
  },
  methods: {
    back(){ //返回上一页
       //  @click="$router.history.go(-1)"
        this.$router.go(-1)
        localStorage.setItem('currType',1)
    },
    //获取热门
    async getMoreList(){
       let d = this.globalPpproach.checkIsEncrypt(this.moreData)
      let res = await this.$http.post('/api/live/movie/MostSeries/',this.moreData);
      if(res && res.data.code==1){
        this.moreList = res.data.data.list || [];
        this.playList.moreList = this.moreList;
      }
    },
    clearHistory(){
      this.historyList = [];
      localStorage.setItem('historySearch','');
    },
    goPlay(v){
      this.$router.push('/videoPlay/'+v.id);
      // localStorage.setItem('vMess',JSON.stringify(v));
    },
    async search(f){
      if(!this.searchContent) return this.$vux.toast.text("请输入搜索内容",'middle');
      this.isSearch = false;
      this.hotHost = [];
      //搜索中
      this.isLoading = false;
      this.$vux.loading.show({ text: "loading..." });
      let name =this.searchContent;
      let res = await this.$http.post('/api/live/movie/findVideo/',{
        name:name
      });
      // this.isSend = true;
        this.isSearch = false;
      this.isLoading = true;
      this.$vux.loading.hide();
      //把搜索的词存起来
      let c =this.historyList.findIndex((item,index)=>{
        return item==name
      });
      if(c<0){
        //只放8个最近搜索
        if(this.historyList.length<=7){
          this.historyList.unshift(name);
        }else{
          this.historyList.unshift(name);
          this.historyList.pop(name);
        }
        localStorage.setItem('historySearch',JSON.stringify(this.historyList));
      }

      if(res && res.data.code==1){
        this.hotHost = res.data.data || [];
      }
     
    },
    //请求热门推荐列表
    async getVideoList(){
      // let res = await this.$http.post('/video/domestic',this.postData);
      let res = await this.$http.post('/api/live/movie/domestic/',this.postData);
      if(res && res.data.code==1){
        this.tuiJianList = res.data.data;
      }
    },
    changeSearch(v){
      this.searchContent = v;
      this.search(true);
    },
    reLoad() {
      //下拉重新请求数据
    },
  },
  mounted() {}
};
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
.main-search{
  // padding: 0 2%;
  .search-box{
    position: relative;
    padding: 0 1% 0 2%;
    .search-input{
      background: #F5F7FA;
      border-radius: 20px;
      width: 83%;
      margin-right: 0.5%;
    }
    .back-btn{
      position: absolute;
      .rem(width, 23);
      .rem(height, 42);
      background: url("../../assets/images/gray-back-icon.png") no-repeat center;
      background-size: contain;
      top: .15rem;
      left: .3rem;
    }
    margin: .2rem 0;
    input{
      font-size: .35rem;
      line-height: .9rem;
      width:6rem;
    }
    .search-icon{
      display: inline-block;
      background: url("../../assets/images/video/search-btn.png") center no-repeat;
      background-size: 45%;
      width: 1rem;
      height: .9rem;
      margin-left: .1rem;
    }
    .cancel-btn{
      font-size: .38rem;
      font-weight: 500;
      line-height: .9rem;
    }
    &.search-box-golden{
      background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%);
      margin: 0;
      padding: .2rem 1% .2rem 2%;
      .cancel-btn{
        color: #E3CF95;
      }
    }
  }
  .history-box{
    /*background: rgb(245, 247, 250);*/
    background: #fff;
    padding: 0 2%;
    margin-top: .3rem;
    position: relative;
    h4{
      
      font-size: .35rem;
      margin-bottom: .4rem;
      .clear-btn{
        position: absolute;
        right: .3rem;
        .rem(height,30);
        .rem(width,30);
        background: url("../../assets/images/video/clear-btn.png") center center no-repeat;
        background-size: 80%;

      }
    }
    .search-list{
      li{
        color: #445779;
        /*background: #f5f5f5;*/
        margin: 0 .2rem .2rem 0;
        display: inline-block;
        padding: .15rem .3rem;
        border-radius: 14px;
        font-weight: 500;
        word-break: break-all;
      }
    }
  }


  .video-main{
    padding: 0 0.266rem;
    // background: #F5F7FA;
    .video-box2{
      padding-bottom: 1rem;
    }
    .video-box{
      .list-title{
        font-size: 0.38rem;
        position: relative;
        margin: 0.26rem 0;
        .list-name{
          padding-left: 0.2rem;
          position: relative;
          &:before{
            content: '';
            display: block;
            width: 0.08rem;
            height: 0.4rem;
            position: absolute;
            background-color: #FD614B;
            left: 0;
            top: 0.09rem;
          }
        }
        .lits-more{color: #999999;position: absolute;right: 0;top: 0.04rem;}
      }
      .video-list{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .list-item{
          background:rgba(255,255,255,1);
          box-shadow:0px 5px 5px 0px rgba(102,102,102,0.05);
          border-radius:6px 6px 0px 0px;
          overflow: hidden;
          margin-bottom: 0.35rem;
          width: 2.93333333rem;
          .item-name{
            .rem(font-size,24);
            padding: 0.1rem 0;
            background: #fff;
            span{
              display: inline-block;
              width: 95%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .item-img{
            position: relative;
            .img-box{
              .rem(height,300);
                position: relative;
              .rem(width,220);
              overflow: hidden;
              text-align: center;
              img{
                  height: 130%;
                  width: auto;
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
              }
            }
            .video-describe{
              display: flex;
              width: 100%;
              position: absolute;
              bottom: 0.1rem;
              justify-content: space-between;
              padding: 0 0.15rem;
              color: #fff;
              .rem(font-size,18);
              img{
                .rem(height,22);
                .rem(width,22);
                vertical-align: bottom;
              }
            }
          }
        }

      }
      .change-list{
        text-align: center;
        color: #666666;
        font-size: 0.38rem;
        span{
          padding: 0.1rem;
        }
      }
    }
  }


  .guess-like-all{
    padding: 0 .3rem;
    padding-bottom: 20px;
    >li{
      display: -webkit-box;
      box-align: center;
      .rem(margin-top,20);
      .like-img{
        .rem(width,240px);
        .rem(height,140px);
        background: #eee;
        .rem(border-radius,6);
        overflow: hidden;
      }
      .like-msg{
        box-flex: 1;
        flex: 1;
        .rem(margin-left,20);
        >p{
          
          .rem(font-size,18);
        }
        .like-title{
          .rem(font-size,24);
          color: #445779;
          .rem(line-height,30);
        }
        .play-tag{
          .rem(font-size,18);
          
          padding: .2rem 0 .2rem 0;
          >i{
            border:1px solid rgba(153,153,153,1);
            border-radius:3px;
            padding: .01rem .1rem;
            margin-left: .1rem;
          }
        }
        .play-icon{
          display: inline-block;
          .rem(width,20);
          .rem(height,20);
          background: url("../../assets/images/video/play_icon.png") no-repeat;
          background-size: contain;
          margin-right: .1rem;
          vertical-align: middle;
        }
      }
    }
  }

  .no-search{
    text-align: center;
    color: #666;
    padding: 1rem 0;
  }
  .hot-title{
    .rem(font-size,32);
    padding-left: .3rem;
    padding-bottom: .2rem;
  }
}
  .search-result{
    padding-top: .3rem;
  }
</style>
