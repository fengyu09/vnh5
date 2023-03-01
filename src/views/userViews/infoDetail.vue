<template>
  <div class="infoDetail">
      <div class="infoHead">
          <span class="fl" style='width: 5%;' @click="goback()"><img src="../../assets/images/gray-back-icon.png" alt=""></span>
          <span class="fl" style='color:#333;font-size:0.48rem;font-weight:bold;width: 90%;display:flex;justify-content:center;'>最新资讯</span>
          <span class="fr" style='width: 5%;'></span>
      </div>
    
     <myScroll :isDown="true" :isUp="true" ref="scrollWrapper" :bottom='0.2' :top='1.4'>  
        <div class="info">
            <div class="msg-t">{{xqMsg.title}}</div>
            <div class="msg-type">
                <span class="time">{{xqMsg.source}}</span>
                <span class="time">{{xqMsg.timegap}}</span>
                <span class="time">{{timeStampTurnTime(xqMsg.createtime) }}</span>
            </div>
            <div class="detail" v-html='xqMsg.detail'></div>
        </div>
      </myScroll>
      <div class="loadingmore" v-if="xqMsg==''"><img src="../../assets/images/loadingmore.gif" alt=""></div>
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
export default {
  name: 'infoDetail',
  components: {myScroll},
  data(){
    return {
        xqMsg:'',  //资讯详情
    }
  },
  created(){
    this.getxqMsg();
  },
  methods:{
    //   获取资讯详情
    getxqMsg(){
        this.$http.get(this.versionLive2+'info/getInfoDetail', {
            params:{
            info_id:this.$route.params.id
         }
        }).then(res => {
            if (res && res.data.code == 1){
            this.xqMsg=res.data.data[0]
            
        }  
    })                
    },
     timeStampTurnTime(timeStamp) {    
        if (timeStamp > 0) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return h + ":" + minute ; 
        } else {
        return "";
        }
    },
    goback(){
      this.$router.go(-1);
    },
    // beforeRouteLeave(to, from, next){
    //     // console.log(to.options.routes.name)
    //     console.log(to)
    // if(to.options.routes.name == 'information'){
    //     this.$router.push('information');
        
    //     //判断是从哪个路由过来的，如果不是page2过来的需要做什么操作在这里实现
    //     //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    // }
    
    // },
  },
   mounted() {
        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        this.$refs.scrollWrapper.finishPullUp();
        this.$refs.scrollWrapper.enable(); //启动滚动条
        this.$refs.scrollWrapper.disable(); //禁止滚动条
        document.body.addEventListener(
        "touchmove",
            function(e) {
                e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
        );
    },

}
</script>

<style scoped lang="less">
 .infoDetail{
        .loadingmore{  //loading的图标
        position: fixed;
        top:2.8rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
     }

     .infoHead{
        width:92%;height: 1.2rem;
        position: fixed; top:0; left:4%;
        background: #fff;
        span{
        text-align: center;
        height: 1.2rem;
        display: flex;
        align-items: center;
        img{
            width: .29rem;
        }
    }
   }
  
  .info{
      width:9.2rem;
      margin-left: 0.4rem;
     .msg-t{
        font-weight: bold;
        color: #445779;
        font-size: 0.4rem;
    }
     .msg-type{
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;
        .time{
            display: inline-block;
            margin-right: 0.2rem;
            color:#999;
            font-size: 0.27rem;
        }
    }
    .detail{
        color:#333;
        font-size: 0.37rem;
    }
  }


}
</style>