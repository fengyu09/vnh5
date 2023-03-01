<template>
  <div class="nextReport" :class="$st.state.skin==5?'report-golden':''">
    <headerExtend/>

    <div class="re-header">
      <i :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':$st.state.skin==4},{'skin-btn-golden':$st.state.skin==5}]">{{$t('nextReport[1]')}}</i>
      <ul class="clearfix">
        <li>
          <span class="re-shuliang">{{lastMsg.invitee_num}}</span>
          <span class="huiColor">{{$t('nextReport[2]')}}</span>
        </li>
        <li>
          <span class="re-shuliang"> {{lastMsg.recharge}}</span>
          <span class="huiColor">{{$t('nextReport[3]')}}</span>
        </li>
        <li>
          <span class="re-shuliang">{{lastMsg.brokerage}}</span>
          <span class="huiColor">{{$t('nextReport[4]')}}</span>
        </li>
      </ul>
    </div>
    <myScroll
            :bgColor="$st.state.skin==5?'161C23':'f5f7fa'"
            :bottom="1.4"
            :top="3.75"
            ref="scrollWrapper"
            :data="playList"
            v-on:func="reLoad"
            :isUp="isUpFlag"
            :isDown="true"
            :isLoad="isL"
            :isloadUp="isLup">
      <div class="re-content">
        <ul v-if="reportList.length>0">
          <li v-for="(v,index) in reportList" :key="index">
            <div class="clearfix re-info">
              <span class="re-avatar"><img v-lazy="v.avatar" alt=""></span>
              <span class="re-name">
                   <i>{{v.nickname}}</i>
                   <!-- <i class="dw-icon level-icon" :class="v.level | filterLevel"></i> -->
                 </span>
            </div>
            <div class="clearfix num-cont">
                 <span>
                   <i class="huiColor">{{$t('nextReport[5]')}}</i>
                   <i class="re-shuliang1">{{v.invitee_num}}</i>
                 </span>
              <!-- <span>
                   <i class="huiColor">Số tiền trao đổi</i>
                   <i class="re-shuliang1">{{v.exchange}}</i>
                 </span>-->
              <span>
                   <i class="huiColor">{{$t('nextReport[6]')}}</i>
                   <i class="re-shuliang1" style="color:#FF513E">{{v.brokerage}}</i>
                 </span>
            </div>
          </li>
        </ul>
        <p class="loading-text" v-if="isLoading">{{$t('regMember[4]')}}</p>
        <p class="no-data-tip" v-if="deadline&&!isLoading&&reportList.length&&reportList.length>limit">{{$t('regMember[3]')}}</p>

      </div>

    </myScroll>
    <footerExtend/>
  </div>
</template>

<script>
  import myScroll from "../../components/myScroll";
  import footerExtend from "../../components/footer_extend";
  import headerExtend from "../../components/header_extend";
export default {
  name: "nextReport",
  data() {
    return {
      lastMsg:{},
      reportList:[],
      limit: 10, //每页多少条
      page:1,
      isLoading:false,
      isLup: false, //是否显示 上拉加载更多的组件
      isL: false, //是否显示 下拉刷新的组件
      isUpFlag: true, //是否开启上拉加载更多 默认不开启
      issueNum: 10,
      playList:{},
      deadline:false,
      isMorePage:false,
    };

  },
  components: {
    myScroll,footerExtend,headerExtend
  },
  created(){
    this.getLast();
    this.getList();
  },
  methods:{
    async getLast(){
      // let res = await this.$http.get('/api2/market/latest-count',{
      let res = await this.$http.get('/api/market/latestcount',{
          params:{
              range:2
          }
      });
      if(res && res.data.code == 1){
        this.lastMsg= res.data.data;
      }
    },
    async getList(flag){
      if(flag) this.isL = true
      else  this.isLoading = true;
      // let res = await this.$http.get('/api2/market/member-count',{
      let res = await this.$http.get('/api/market/membercount',{
        params:{
          page:this.page,
          limit:this.limit,
            // range:2,
            is_sub:1
        }
      });
      this.isL = false;
      this.isLoading = false;
      this.isUpFlag = true;
      if(res && res.data.code == 1){
        this.reportList= res.data.data;
      }
    },
    reLoad(data) {
      if (data == "down") {
        this.page = 1;
        this.getList(true);
        this.getLast();
      } else if (data == "up") {
        this.loadMore();
      }
    },
    async loadMore(id) {
      //判断是否有下一页
      if (this.isMorePage) return;
      //判断节流阀
      if (!this.isUpFlag) return;
      this.isLup = true;
      this.page++;
      // let res = await this.$http.get("/api2/market/member-count", {
      let res = await this.$http.get("/api/market/membercount", {
        params: {
          page:this.page,
          limit:this.limit
        }
      });
      this.isLup = false;
      if (res && res.data.code == 1) {
        if (res.data.data.length >= this.limit) {
          this.isMorePage = true;
          this.isUpFlag = true;
          this.deadline = false;
        } else {
          this.isMorePage = false;
          this.isUpFlag = false;
          this.deadline = true;
        }
        this.reportList = this.reportList.concat(res.data.data);
        this.playList.reportList = this.reportList;
        setTimeout(()=>{
          this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        },20)

      }else if(res && res.data.code==-1){
        this.isMorePage = false;
        this.isUpFlag = false;
        this.deadline = true;
      }
    },
  },
  mounted() {
    //        到时候放App全局
    document.body.addEventListener(
            "touchmove",
            function(e) {
              e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
    );

    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.enable(); //启动滚动条
    this.$refs.scrollWrapper.disable(); //禁止滚动条
  },
  

};
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.nextReport{
  .re-header{
    background: #fff;
    position: relative;
    height: 2.56rem;
    // margin-bottom: 0.26666rem;
    i{
      position: absolute;
      left: 0.133333rem;
      top: 0;
      .rem(width,200);
      height: 0.533333rem;
      color: #fff;
      display: block;
      text-align: center;
      line-height: 0.533333rem;
      border-radius: 5px 5px 5px 0;
      // background: pink;
      .rem(font-size,24);
       border-radius: .1rem .1rem .1rem 0;
      background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
    }
    .re-shuliang{
      .rem(font-size,42);
      font-weight: bold;
    }
    ul{
      width: 92%;
      margin: 0 auto;
      padding-top: 0.7rem;
    }
    li{
      float: left;
      width: 33.333%;
      text-align: center;
      >span{
        display: block;
      }
    }

  }
  .re-content{
    width: 94.666667%;
    margin: 0 auto;
    padding: 0.26666rem 0;
    li{
      background: #fff;
      margin-bottom: 0.26rem;
      border-radius: 5px;
      overflow: hidden;
    }
    i{
      display: inline-block;
    }
    .re-info{
      width: 91.55%;
      margin: 0 auto;
      border-bottom: 1px dashed #eeeeee;
      padding:0.4rem 0 0.26666rem 0;
      >span{
         float: left;
        //  &:nth-last-child(1){
        //    text-align: right;
        //    padding-top: 0.2rem;
        //  }
      }
      .re-avatar{
        // width: 1.33333rem;
        // height: 1.33333rem;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.2666rem;
        img{
          height: 100%;
          width: auto;
        }
      }
      .re-name{
        padding-top: 0.4rem;
        font-weight: bold;
        .rem(font-size,28);
        margin-right: 0.133333rem;
        
      }
      .dw-icon{
        .rem(width,90);
        .rem(height,36);
        margin-top: 0.1rem;
          vertical-align: middle;
        }
     
    }
    .num-cont{
      padding-top: 0.26rem;
      padding-bottom: 0.4rem;
      >span{
        display: block;
        float: left;
        width: 50%;
        text-align: center;
        .re-shuliang1{
          font-weight: bold;
          color: #445779;
          .rem(font-size,32);
        }
      }
    }
    .re-data{
      .rem(font-size,28);
      padding-top: 0.2rem;
    }
  }
}
</style>
