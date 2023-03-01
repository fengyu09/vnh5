<template>
  <div class="main-search">
    <div class="search-box clearfix">
      <div class="fl search-input clearfix">
        <div class="search-icon fl" @click="search"></div>
        <input placeholder="Vui lòng nhập biệt hiệu và số phòng của chủ nhà để tìm kiếm" v-model="searchContent" type="text" class="fl">
      </div>
      <router-link to="/live" class="fr cancel-btn">Hủy</router-link>

    </div>
    <div class="history-box" v-if="!isSend">
      <h4> Mọi người đang tìm kiếm</h4>
      <p v-if="isLoading">Đang nhận...</p>
      <ul class="search-list">
        <li v-for="(v,index) in historyList" :key="index" @click="changeSearch(v.id)">{{v.nickname}}</li>
      </ul>
    </div>
    
    <myScroll
        :isDown="true"
        :bottom="0"
        :top="1.3"
        :bgColor="'f5f7fa'"
        v-if="isSend"
        v-on:func="reLoad"
        ref="scrollWrapper"
      >
    <div class="search-result" >
      <h4 v-if="hotHost.length">Kết quả tìm kiếm</h4>
      <ul class="clearfix hot hot-box" v-if="hotHost.length">
        <li v-for="(v,index) in hotHost" :key="index">
          <a href="javascript:;" @click="goChat(v.anchor_id,v.is_sport)">
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

              <p class="fr host-type" v-if="v.tags.length">
                <img v-lazy="v.tags[0].icon" alt class="hot-type" />
                <span>{{v.tags[0].title}}</span>
              </p>
            </div>
            <p class="hot-mes clearfix">
              <span class="fl intro text-overflow">{{v.live_intro}}</span>
              <span class="fr online-num">{{v.online | filterOnlineNum}}</span>
            </p>
            <!-- <div class="red-pack"></div> -->
            <div class="red-pack" v-if="v.red_paper_num>0" :class="v.ext_img?'hasTz':''"></div>
            <div class="cr-living" v-if="v.ext_img"><img :src="v.ext_img"/></div>
          </a>
        </li>
      </ul>
       <p class="no-search" v-if="hotHost.length<=0">Không tìm kiếm thông tin liên quan</p>

      <h4 v-if="tuiJianList.length">Gợi ý liên quan</h4>
      <ul class="clearfix hot hot-box" v-if="tuiJianList.length">
        <li v-for="(v,index) in tuiJianList" :key="index">
          <a href="javascript:;" @click="goChat(v.anchor_id,v.is_sport)">
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

              <p class="fr host-type" v-if="v.tags.length">
                <img v-lazy="v.tags[0].icon" alt class="hot-type" />
                <span>{{v.tags[0].title}}</span>
              </p>
            </div>
            <p class="hot-mes clearfix">
              <span class="fl intro text-overflow">{{v.live_intro}}</span>
              <span class="fr online-num">{{v.online | filterOnlineNum}}</span>
            </p>
            <!-- <div class="red-pack"></div> -->
            <div class="red-pack" v-if="v.red_paper_num>0" :class="v.ext_img?'hasTz':''"></div>
            <div class="cr-living" v-if="v.ext_img"><img :src="v.ext_img"/></div>
          </a>
        </li>
      </ul>
    </div>
  </myScroll>

  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
import { mapState } from "vuex";
export default {
  name: "search",
  components: { myScroll },
  data() {
    return {
      searchContent:'',//搜索内容
      hotHost:[],
      isload: false,
      isL: false, //是否显示 下拉刷新的组件
      tuiJianList:[],
      historyList:[],
      isSend:false,
      isLoading:true
    }
  },
  created() {
      this.cySearch();
  },
  computed: {
    // myScroll,
    ...mapState(["userinfo"])
  },
  watch:{
    "searchContent":function (n,o) {
      if(!n){
        this.hotHost = [];
        this.isSend = false;
        return
      }
       this.search();
    }
  },
  filters:{
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "万";
      }
      return n;
    }
  },
  methods: {
    async search(){
      this.hotHost = [];
      this.tuiJianList = [];
      //搜索中
      this.$vux.loading.show({ text: "Đang nhận..." });
      let res = await this.$http.get(this.versionLive2+'live/search/',{
        params:{
          search_content:this.searchContent
        }
      })
      this.isSend = true;
      this.$vux.loading.hide();
      if(res && res.data.code==1){
        //搜索完 有数据
        // debugger;
        this.hotHost = res.data.data.result || [];
        this.tuiJianList = res.data.data.related || [];
        //没有数据
      }
    },
    async cySearch(){
      let res = await  this.$http.get(this.versionLive2+'live/pop_search/',{
        params:{
          limit:10
        }
      });
      this.isLoading = false;
      if(res && res.data.code==1){
        this.historyList = res.data.data;
      }
    },
    changeSearch(id){
      this.$router.push("/chat/"+id)
    },
    goChat(id,type){
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
        if(type==1){
          this.$router.push('/ChatSport/'+id)
        }else{
          this.$router.push('/chat/'+id)
        }
        
      }
    },
       reLoad() {
      //下拉重新请求数据
      // this.getErcord();
    },
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.main-search{
  // padding: 0 2%;
  .search-box{
    padding: 0 2%;
    .search-input{
      background: #F5F7FA;
      border-radius: 20px;
      width: 89%;
    }
    margin: .2rem 0;
    input{
      font-size: .35rem;
      line-height: .9rem;
      width:5rem;
    }
    .search-icon{
      display: inline-block;
      background: url("../../assets/images/chat/search-icon.png") center no-repeat;
      background-size: 45%;
      width: 1rem;
      height: .9rem;
      margin-left: .1rem;
    }
    .cancel-btn{
      font-size: .38rem;
      font-weight: bold;
      line-height: .9rem;
    }
  }
  .history-box{
    padding: 0 2%;
    margin-top: .6rem;
    h4{
      
      font-size: .35rem;
      margin-bottom: .4rem;
    }
    .search-list{
      li{
        color: #445779;
        background: #f5f5f5;
        margin: 0 .2rem .2rem 0;
        display: inline-block;
        padding: .15rem .3rem;
        border-radius: 14px;
        font-weight: 500;
      }
    }
  }
  .search-result{
    background: #F5F7FA;
    // position: absolute;
    // top:1rem;
    
    bottom: 0;
    left: 0;
    max-width: 750px;
    min-width: 320px;
    -webkit-overflow-scrolling:touch;
    overflow-y: auto;
    width: 100%;
      /*background: #f5f7fa;*/
      margin: 0.4rem auto 0 auto;
      padding: .4rem 2.7% 0 2.7%;
      font-size: 0.33rem;
      h4{
        color: #445779;
        font-size: 0.4rem;
        margin-bottom: 0.4rem;
        font-weight: bold;
      }
      ul.hot {
        li {
          box-shadow: 0 0.3rem 20px #f8f8f8;
          background: #fff;
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
              /*height: 3.15rem;*/
            }
            .section-mes {
              padding: 0.2rem;
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

    .no-host {
      overflow: hidden;
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
    .no-search{
      text-align: center;
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      font-size: .36rem;
      
    }
  }

}
</style>
