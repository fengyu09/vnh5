<template>
  <div id="MessageCenter" >
    <flexbox class="infoHead" v-if="index == 0" :class="skin==5?'goldenHeader':''">
      <flexbox-item :span="1 / 10">
        <div
          @click="$router.go(-1)"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img v-if="skin==5" src="../../assets/images/skin/golden/goBack.png" alt />
          <img v-else src="../../assets/images/gray-back-icon.png" alt />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo tickling">{{$t('messageCenter.text[0]')}}</div>
      </flexbox-item>
      <flexbox-item :span="1 / 10">
        <div class="flex-demo"></div>
      </flexbox-item>
    </flexbox>
    <!--内容 -->
    <div class="msg-menu" v-if="typeList" :class="skin==5?'msg-menu-golden':''">
      <ul>
        <li v-for="(item,index) in typeList" 
        :class="[
        {'active':item.code==menuActive&&skin ==0},
        {'skin-bb-pink':item.code==menuActive&&skin ==1},
        {'skin-bb-blue':item.code==menuActive&&skin ==2},
        {'skin-bb-green':item.code==menuActive&&skin ==3},
        {'skin-bb-maingreen':item.code==menuActive&&skin ==4},
        {'skin-bb-golden':item.code==menuActive&&skin ==5}]"
         @click="menuActive=item.code" v-if="item.code!=2" :key="index"><i class="msgNum" v-if="msgNum[item.code]>0">{{msgNum[item.code]}}</i><span>{{item.name}}</span></li>
      </ul>
    </div>
     <myScroll
      ref="scrollWrapper"
      :bgColor="skin==5?'1F252C':''"
      :probeType="2"
      :top="2"
      :left="0"
      :isUp="true"
      :bottom="0"
       v-on:func="reLoad"
    >
    <div class="msg-content" :class="skin==5?'msg-content-golden':''">
     
       <swipeout v-if="msgList.length">
          <swipeout-item :threshold=".5" underlay-color="#ccc" v-for="(item,index) in msgList"  ref="swipeoutItem" :key="index">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick(item.msg_id)" background-color="#D23934">Xóa</swipeout-button>
        </div>
        <div slot="content">
          <div class="swipeout-content" @click="toDetail(item)">
            <div :class="{noread:item.readflag==0}">
            <img  :src="item.avatar" alt="" style="width:0.8rem;height:0.8rem" v-if="item.nickname">
            <img  :src="item.icon" alt="" style="width:0.8rem;height:0.8rem" v-else>
          </div>
          <div class="msg-info">
            <p>{{item.title?item.title:item.nickname}}<span>{{item.createtime_txt}}</span></p>
            <span>{{item.content}}</span>
          </div>
          </div>
        </div>
      </swipeout-item>
       </swipeout>
       <div style="text-align: center;padding-top: 2rem;" v-if="!msgList.length&&!isLoading">
         <h3 style="color:#000">no data~</h3>
       </div>
        <div style="text-align: center;padding-top: 0.2rem;" v-if="noMore">
         <h3 style="color:#000">no more data~</h3>
       </div>
    </div>
     </myScroll>
   
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Swipeout, SwipeoutItem, SwipeoutButton } from "vux";

import { mapState, mapMutations } from "vuex";
export default {
  name: "MessageCenter",
  components: {
    Flexbox,
    FlexboxItem,
    Swipeout, 
    SwipeoutItem, 
    SwipeoutButton
  },
  data() {
    return {
      index: 0,
      isL: false, //是否显示 下拉刷新的组件
      hdnoticesContent: {},
      authortyList: {},
      xtnoticeList: {},
      isload: false,
      isShowXt: false,
      isShowGf: false,
      isShowHd: false,
      interNum: 0,
      authoNum: 0,
      systeNum: 0,
      menuActive:this.$store.state.messStatus.messId||5,
      typeList:'',
      msgList:[],
      msgNum:'',
      pageNum:1,
      noMore:false,
      isLoading:false
    };
  },

  created() {
    this.init();
   
  },
  watch:{
    menuActive(i){
      this.$store.commit('SETMESSSTATUS',{key:'messId',val:i+''})
      // this.hotHost=this.sxData(type);
      this.msgList=[]
      this.noMore=false
      this.pageNum=1
      this.getMsgList(i)
      if( this.$refs.swipeoutItem){
        this.$refs.swipeoutItem.forEach(res=>{
        res.close()
      })
      }
    },
    msgList(){
      this.$nextTick(()=>{
          setTimeout(()=>{
              this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
          },20)

      })
    }
  },
  computed: {
    ...mapState([
    
      "skin"
    ])
  },
  methods: {
    ...mapMutations([
      "SETINTRACTDATA"
    ]),
    init() {
      this.getNewMsgNum()
      this.getMsgList()
      this.getHdMsgList()
     
    },
     reLoad(data,obj) {
      if (data == "up") {
        if(this.noMore){
          return
        }
      this.pageNum++
      this.getMsgList(data)
      } else if (data == "down") {
        // this.renovate();
      } else if(data=='end'){
         obj.name = this.$route.name;
         this.$store.commit('SETPOSITIONY',obj)
      }
    },

    getNewMsgNum(){
       if(!this.$store.state.codeToken) return;
       this.$http
          .get("/api/live/sport/get_message_count/", {
            params: {
              client_type:3,
              api:this.noticeType==1?1:5
            }
          }).then(res=>{
            if(res&&res.data.code==1){
              this.msgNum= res.data.data.countList
            }
          })
    },
    getMsgList(i){
      this.$vux.loading.show();
      this.isLoading =true;
       this.$http
          .get("/api/live/sport/get_message_list/", {
            params: {
              client_type:3,
              api:this.noticeType==1?1:5,
              msg_type:this.menuActive,
              limit:20,
              page:this.pageNum
            }
          }).then(res=>{
            if(res.data.data.length==0&&this.msgList.length>0){
              this.noMore=true
            }
            this.msgList=this.msgList.concat(res.data.data)
            setTimeout(() => {
            this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
          }, 20);
            this.$vux.loading.hide();
            this.isLoading =false;
           if(i==undefined){
              this.typeList=res.data.typeList
           }
          })
    },
    getHdMsgList(){
       this.$http
          .get("/api/live/sport/get_message_list/", {
            params: {
              client_type:3,
              api:this.noticeType==1?1:5,
              msg_type:2,
              limit:20,
            }
          }).then(res=>{
           this.SETINTRACTDATA(JSON.stringify(res.data.data));
          })
    },
    toDetail(item){
      if(item.nickname){
        if(item.apiType ==1){
        this.$router.push('/discussZb');
      } else {
        this.$router.push('/discuss');
      }
      localStorage.setItem('zbpl',JSON.stringify(item));
      }else{
         this.$router.push({ path: '/msgDetail', query: { msg_id: item.msg_id }})
      }
     
    },
    onButtonClick(i){
      this.$http
          .get("/api/live/sport/get_message/", {
            params: {
             msg_id:i,
             del:1
            }
          }).then(res=>{
              if(res&&res.data.code==1){
                this.msgList.splice(this.msgList.findIndex((item)=>item.msg_id==i),1);
                 this.$vux.toast.text(res.data.msg, 'middle')
                 this.getNewMsgNum()
              }
          })
    },

    hudong() {
      this.index = 1;
    }
   
  }
};
</script>

<style scoped lang="less">
 .vux-swipeout-button{
      outline:none;
    }
#MessageCenter {
  background: #f5f7fa;
  //   height: 10000rem;
  .msg-menu{
    background: #fff;
    ul{
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #EEEEEE;
      li{
        font-size: 0.42rem;
        color: #6A86B9;
        padding: 0.15rem 0.2rem;
        position: relative;
        .msgNum{
          display: block;
          width:0.42rem ;
          height: 0.3rem;
          background: url('../../assets/images/member/msg_bg.png') no-repeat;background-size: 100% 100%;
          position: absolute;
          font-size: 0.2rem;
          color: #fff;
          text-align: center;
          line-height: 0.3rem;
          right: -0.2rem;
        }
        &:before{
          content: '';
          width: 82%;
          height: 0.08rem;

          position: absolute;
          bottom: -1px;
          border-radius: 0.08rem;
          left: 9%;
        }
      }
      .active{
        color: #1486FF;
        &:before{
         
          background: #1486FF;

        }
      }
      .skin-bb-pink{
         &:before{
           background: #FB796B ;
         }
        
        color: #FB796B ;
      }
      .skin-bb-green{
        color: #0B9B71 ;
          &:before{
           background: #0B9B71 ;
         }
      }
      .skin-bb-maingreen{
        color: #01BE79 ;
          &:before{
           background: #01BE79;
         }
      }
      .skin-bb-golden{
        color: #E3CF95 ;
          &:before{
           background: #E3CF95;
         }
      }
      .skin-bb-blue{
        color: #0CB6D9 ;
          &:before{
           background: #0CB6D9 ;
         }
      }
    }
    &.msg-menu-golden{
      background: #161C23;
      ul{
        border-bottom: 1px solid #161C23;
        li{
          color: #AB9B62;
        }
      }
    }
  }
  .msg-content{
    background: #fff;
    padding: 0 0.3rem;
    ul{
      li{
        display: flex;
        align-items: center;
        padding: 0.3rem 0;
        border-bottom: 1px solid #EEEEEE;
        p{font-size: 0.37rem;color: #000;font-weight: bold;margin-bottom: 0.15rem;}
        .msg-info{
          width: 100%;
          margin-left: 0.2rem;
          >span{font-size: 0.32rem; width: 7rem;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
          p{
            span{font-size: 0.26rem;font-weight: normal;float: right; }
          }
        }
        .noread{
          position: relative;
          &:before{
            content: '';
            display: block;
            width:0.2rem;
            height: 0.2rem;
            background:#FF3131;
            border-radius: 50%;
            position: absolute;
            right: 0;

          }
        }
      }
    }
    .swipeout-content{
       display: flex;
        align-items: center;
        padding: 0.3rem 0;
        border-bottom: 1px solid #EEEEEE;
        p{font-size: 0.37rem;font-weight: bold;margin-bottom: 0.15rem;}
        .msg-info{
          width: 100%;
          margin-left: 0.2rem;
          >span{font-size: 0.32rem; width: 7rem;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
          p{
            span{font-size: 0.26rem;font-weight: normal;float: right; }
          }
        }
        .noread{
          position: relative;
          &:before{
            content: '';
            display: block;
            width:0.2rem;
            height: 0.2rem;
            background:#FF3131;
            border-radius: 50%;
            position: absolute;
            right: 0;

          }
        }
    }
    &.msg-content-golden{
      background: #1F252C;
      .vux-swipeout-content{
        background: #1F252C !important;
      }
      
      .swipeout-content{
        border-bottom: 1px solid #5C564D; 
        .msg-info{
          color: #928151;
        }
      }
    }
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
  .mess-box {
    width: 100%;
    background-color: #fff;
    ul {
      width: 92%;
      margin: 0 auto;
      li {
        height: 1.87rem;
        border-bottom: 1px solid #f5f7fa;
        padding-top: 0.4rem;
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
    .mess-img {
      // width: 40px;
      // height: 40px;
      margin-right: 2.9%;
      // overflow: hidden;
      position: relative;
      .mess-img2 {
        width: 40px;
        height: 40px;
      }
      .mess-img1 {
        line-height: 0.38rem;
        position: absolute;
        background-color: #ff513e;
        padding: 0 0.16rem;
        top: -5px;
        right: -10px;
        color: #fff;
        border-radius: 15px 15px 15px 5px;
        border: 1px solid #fff;
      }
    }
    .mess-tit {
      width: 83.5%;
      
      font-size: 0.3rem;
      .mess-tit1 {
        font-size: 0.38rem;
        font-weight: bold;
        color: #445779;
        margin-bottom: 0.1rem;
      }
    }
    .mess-text {
      width: 92.8%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      height: 0.5rem;
      > p {
        width: 98%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
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
  .gfHD {
    width: 92%;
    margin: 0 auto;
  }
  .hd-box {
    width: 92%;
    margin: 0 auto;
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
  .gf-mess {
  }
  .gf-nr {
    line-height: 0.58rem;
    font-size: 0.32rem;
    // width: 85.5%;
    width: 83.5%;
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
}
.isload {
  text-align: center;
  line-height: 2rem;
}
</style>
