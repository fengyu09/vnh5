<template>
  <div class="searchReport">
    <div class="search-box clearfix">
      <div class="fl search-input clearfix" @focusout="inputBlur" @focusin="inputFocus">
        <div class="search-icon fl"></div>
        <input :placeholder="$t('searchReport[0]')" v-model="searchContent" type="text" class="fl">
      </div>
      <div class="fr cancel-btn" @click="$router.go(-1)">{{$t('qxText')}}</div>
    </div>
    
    <myScroll :bgColor="'f5f7fa'" :bottom="0" :top="1.3" ref="scrollWrapper">
      <!-- 搜索内容显示-成功 -->
      <div class="re-content" v-show="reportList.length">
        <ul>

          <li v-for="(v,index) in reportList" :key="index">
            <div class="clearfix re-info">
              <span class="re-avatar"><img v-lazy="v.avatar" alt=""></span>
              <span class="re-name">
                   <i>{{v.nickname}}</i>
                   
                 </span>
              <span class="fr">
                   <i class="huiColor">{{$t('searchReport[1]')}}</i>
                   <i class="re-data">{{v.createtime | formatDate2}}</i>
                 </span>
            </div>
            <div class="clearfix num-cont">
                 <span>
                   <i class="huiColor">{{$t('searchReport[2]')}} </i>
                   <i class="re-shuliang1">{{v.recharge}}</i>
                 </span>
              
              <span>
                   <i class="huiColor">{{$t('searchReport[3]')}}</i>
                   <i class="re-shuliang1" style="color:#FF513E">{{v.brokerage}}</i>
                 </span>
            </div>
          </li>
        </ul>
      </div>
      <p v-if="isLoading" style="text-align: center">{{$t('searchReport[4]')}}</p>
        <!-- 搜索内容显示-失败 -->
      <div class="search-failed" v-show="searching && !isLoading && !reportList.length">
        <p>failed</p>
        <p class="huiColor">no data</p>
      </div>
    </myScroll>
  </div>
</template>

<script>
import myScroll from "../../components/myScroll";
export default {
  name: "searchReport",
  data() {
    return {
      searchContent:'',//搜索内容
      searching:false,//搜索中
      isLoading:false,
      reportList:[],
      page:1,
      limit: 30

    };
  },
  components: {
    myScroll
  },
  watch:{
    "searchContent":function (n,o) {
      if(!n){
        this.searching = true;
        return;
      }
      this.getList();
    }
  },
  methods:{
    async getList(){
      this.isLoading = true;
      let res = await this.$http.get('/api/market/membercount',{
        params:{
          page:this.page,
          limit:this.limit,
          sub_nickname:this.searchContent
        }
      });
      this.isLoading = false;
      this.searching = true;
      if(res && res.data.code == 1){
        this.reportList= res.data.data;
      }
    },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
          window.scrollTo(0,0);
        }, 0)
      }
    },
    inputFocus(e) {
      // 如果focus，则移除上一个输入框的timer
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
        clearTimeout(this.timer);
      }
    },
  }

 
  

};
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.searchReport{
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
      font-size: .3rem;
      font-weight: bold;
      line-height: .9rem;
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
      display: block;
    }
    .re-info{
      width: 91.55%;
      margin: 0 auto;
      border-bottom: 1px dashed #eeeeee;
      padding:0.4rem 0 0.26666rem 0;
      >span{
         float: left;
         &:nth-last-child(1){
           text-align: right;
           padding-top: 0.2rem;
         }
      }
      .re-avatar{
        width: 1.33333rem;
        height: 1.33333rem;
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
        .dw-icon{
          width: 1.2rem;
          padding-top: 0.25rem;
        }
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
      font-weight: bold;
      .rem(font-size,28);
      padding-top: 0.26rem;
    }
  }
  .search-failed{
    text-align: center;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    margin-top: -25%;
    p{
      &:nth-child(1){
        font-weight: bold;
        .rem(font-size,36);
        margin-bottom: 0.266666rem;
      }
      &:nth-last-child(1){
        .rem(font-size,24);
      }
    }
  }
}
</style>
