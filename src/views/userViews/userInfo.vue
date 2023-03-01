<template>
	<div id='userInfo'>
    <myScroll ref="scrollWrapper" :bottom='0' :top='0'>
      <div class="head">
        <div class='userHead'>
          <div style='width: 92%;margin:0 auto;'>
                <p class='userBack'><span @click="$router.go(-1)"><img src="../../assets/images/white-back-icon.png" alt=""></span></p>
                <p class='userName' style='color:#fff;font-size:.55rem;margin-top: 0.6rem;margin-left: 0.2rem;'>
                  <span class="userN text-overflow">{{message.nickname}}</span>
                  <!-- 性别icon-->
                  <span class="sex-icon" v-show="userinfo.gender" :class="userinfo.gender==2?'female-icon':'male-icon'"></span>
                  
                  <span class='userV' v-if="message.vip==1" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip1.png" alt=""></span>
                  <span class='userV' v-if="message.vip==2" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip2.png" alt=""></span>
                  <span class='userV' v-if="message.vip==3" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip3.png" alt=""></span>
                  <span class='userV' v-if="message.vip==4" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip4.png" alt=""></span>
                  <span class='userV' v-if="message.vip==5" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip5.png" alt=""></span>
                  <span class='userV' v-if="message.vip==6" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip6.png" alt=""></span>
                  <span class='userV' v-if="message.vip==7" style='color:#ffe1ac;'><img src="../../assets/images/ranking/vip7.png" alt=""></span>
                  <span class="grade-icon" :class="'grade-icon'+$store.state.userinfo.vip" v-show="$store.state.userinfo.vip>0"></span>
                </p>
                <p class='text-overflow' style='color:#fff;font-size:.33rem;font-weight:500;margin-top: 0.1rem;margin-left: 0.2rem;max-width:8.5rem;'>{{message.profile}}</p>
          </div>
          <div class="headImg"><img v-lazy="avatar" alt=""></div>
        </div>
        
        <div class='userNum'>
          <div style='width: 92%;margin:0 auto;'>
              <span>关注<i>{{message.follow}}</i></span><span>粉丝<i>{{message.fans}}</i></span><span>获赞<i>{{message.zan}}</i></span>
          </div>
        </div>
    </div>

    <div class="hui"></div>

    <div class="userMsg" style='width: 92%;margin:0 auto;'>
      <div><span><img src="../../assets/images/userinfo/msg-min.png" alt=""></span><i>个人信息</i></div>
      <p><span><i>乐</i><i>购ID:</i></span><i>{{message.unique_id}}</i></p>
      <p><span><i>性</i><i>别:</i></span><i v-if="message.gender==0">未知</i><i v-if="message.gender==1">男</i><i v-if="message.gender==2">女</i></p>
      <p><span class="ar"><i>加</i><i>入</i><i>时</i><i>间:</i></span><i>{{timeStampTurnTime(message.created)}}</i></p>
    </div>

     <div class="userGift" style='width: 92%;margin:0 auto;' v-if="$store.state.isPure!=1">
        <div class="sendGift" >
          <p><span><img src="../../assets/images/userinfo/gift-min.png" alt=""></span><i>送出礼物</i></p>
          <p>共<span>{{message.all_gift}}</span>件</p>
        </div>
        
        <div class="nogift" v-if="message.gift!==undefined&&message.gift.length==0">您还未送过礼物哦~</div>
        <div class="gift" v-if="message.gift!==undefined&&message.gift.length!==0">
            <myScrollX  v-if="message.gift.length">
                <div class="clearfix" ref="personTab">
                  <div v-for="(item,i) in message.gift" :key="i" :class="color[i%4]" class="type">
                      <span>{{item.gift_name}}</span><i class="list">x{{item.num}}</i>
                  </div>
                </div>
            </myScrollX>
        </div>
        <!-- <div class="attention">+ 关注</div> -->
    </div>

   </myScroll>
    <div class="guanzhu attention" @click='guan' v-if="!message.is_follow&&ziji" style='color:#fff;background: linear-gradient(top left,#1486FF,#4BA1FF);'><span><img src="../../assets/images/anchorP/follow-1.1_03-min.png" alt=""></span><span>关注</span></div>
    <div class="guanzhu" @click='guan' v-if="message.is_follow&&ziji" style='color:#999;background:linear-gradient(to right,#F5F5F5,#EEEEEE);'><span><img src="../../assets/images/anchorP/yiguanzhu@2x-min.png" alt=""></span><span>已关注</span></div>

   </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import myScrollX from "../../components/myScrollX.vue";     //横向滚动
import myScroll from "../../components/myScroll.vue";
	export default {
    name:"userInfo",
    components: {myScrollX,myScroll},
     data(){
      return{
        guanzhu:true,
        message:[],       // 用户个人信息
        time:'',
        avatar:'',
        color: ["c1","c2","c3","c4",],
        ziji:false,
      }
  },
  computed: {...mapState(["codeToken","userinfo"])},
  created(){
    this.getMessage(); 
  },
  mounted(){
    if(this.$route.query.id==this.$store.state.userinfo.user_id){
         this.ziji=false
         this.avatar=window.localStorage.avatar   //获取用户头像
    }else{
         this.avatar=this.$route.query.avatar
         this.ziji=true
    }

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
  watch:{
     message(){       //监听message  数据来了之后执行滚动条
        setTimeout(() => {
              this.$refs.scrollWrapper.refresh();  //下拉加载数据之后重新计算高度，刷新滚动条
          }, 20);
        if(this.message.gift!==undefined&&this.message.gift.length!==0){
              this.$nextTick(() => {
                this.ScrollX();
            });
        }
    },
  },
  methods:{
    ScrollX() {
      let width = this.message.gift.length * 3;
      this.$refs.personTab.style.width = width + "rem";
    },
     //  获取用户个人信息
     getMessage(){
          this.$http.get(this.versionLive2+'user/user_owner/', {
                  params:{
                  user_id:this.$store.state.userinfo.user_id,   //用户本人的id
                  follow_user_id:this.$route.query.id,     //查看当前用户的id
                }    
              }).then(res => {
                if (res && res.data.code == 1){
                this.message=res.data.data || []

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
          return y + "-" + m + "-" + d; 
          // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;    //返回的时间 
        } else {
          return "";
        }
      },

      //点击关注
      guan(){
         this.$http.post(this.versionLive2+'live/follow/', {
                  user_id:this.$store.state.userinfo.user_id,
                  follow_id:this.$route.query.id
              }).then(res => {
                if (res && res.data.code == 1){
                // console.log(res)    
                if(this.message.is_follow==true){
                    this.message.fans-=1
                    this.message.is_follow=!this.message.is_follow;
                }else{
                    this.message.fans+=1
                    this.message.is_follow=!this.message.is_follow;
                }
                
            }  
          })       
      },
    },
    
	}
</script>
<style lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
  .c1{
    background:#ffefed;
  }
  .c2{
    background:#fff4e3;
  }
  .c3{
    background:#ffece0;
  }
  .c4{
    background:#e9f8ff;
  }
#userInfo{
  // position: relative;
  // min-height:100vh;
  // display:flex;
  // flex-direction:column; 
  .head{
    width: 100%;
    height: 6.31rem;
  .userHead{
    background: url("../../assets/images/userinfo/head-min.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height:5.04rem;
    position: relative;
    .userBack{
      width: 100%;
      height: 1.2rem;
      span{
        display: inline-block;
        height: 1.2rem;
        display: flex;
        align-items: center;
        width: .5rem;
      }
      img{
        width: .3rem;
      }
    }
    .userName{
      display: flex;
      align-items: center;
      .userN{
        display: inline-block;
        max-width: 7rem;
        font-weight: bold;
      }
      .sex-icon{
            vertical-align: text-top;
            .rem(height,30);
            .rem(width,30);
            .rem(margin-left,15);
            display: inline-block;
          &.female-icon{
              background: url("../../assets/images/newMine/female_icon.png") no-repeat;
              background-size: contain;
          }
          &.male-icon{
            background: url("../../assets/images/chat/gender-man-min (1).png") no-repeat center;
            background-size: contain;
          }
        }
      .userV{
        display: inline-block;
        margin-left: 0.3rem;
        margin-top: 0.2rem;
        img{
          width: 1.5rem;
        }
      }
      .grade-icon{
          color: #fff;
          .rem(padding-left,37);
          font-weight: bold;
          display: inline-block;
          .rem(width,64);
          .rem(height,55);
          .rem(line-height,31);
          .rem(margin-left,15);
          vertical-align: text-bottom;
      }
      .grade-icon1{
          background: url("../../assets/images/newMine/vip1.png") no-repeat;
          background-size: contain;
      }
        .grade-icon2{
          background: url("../../assets/images/newMine/vip2.png") no-repeat;
          background-size: contain;
      }
        .grade-icon3{
          background: url("../../assets/images/newMine/vip3.png") no-repeat;
          background-size: contain;
      }
        .grade-icon4{
          background: url("../../assets/images/newMine/vip4.png") no-repeat;
          background-size: contain;
      }
        .grade-icon5{
          background: url("../../assets/images/newMine/vip5.png") no-repeat;
          background-size: contain;
      }
        .grade-icon6{
          background: url("../../assets/images/newMine/vip6.png") no-repeat;
          background-size: contain;
      }
        .grade-icon7{
          background: url("../../assets/images/newMine/vip7.png") no-repeat;
          background-size: contain;
      }
        .grade-icon8{
          background: url("../../assets/images/newMine/vip8.png") no-repeat;
          background-size: contain;
      }
     }
    .headImg{
      position: absolute;
      right:.6rem;
      top:3.75rem;
      width: 2rem;
      height: 2rem;
      border:0.07rem solid #fff;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      img{
        height:100%;
        width:100%;
      }
    }
  }
    .userNum{
      margin-top: 0.1rem;
      color:333;
      font-size: 0.32rem;
      vertical-align: bottom;
      span{
        display: inline-block;
        margin-right: 0.35rem;
        color: #445779;
      i{
          font-weight: bold;
          font-size: 0.53rem;
          display: inline-block;
          margin-left: 0.1rem;
          font-family: number1;
      }
    }
  }
}
 .hui{      //灰色的分隔线
    width: 100%;
    height: 0.27rem;
    background: #f5f7fa;
  }

  .userMsg{
    height: 4.4rem;
    border-bottom:1px solid #eee;
    div{
      margin-top: 0.1rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        margin-top: 0.1rem;
        margin-right: 0.3rem;
         img{
          width: 0.53rem;
        }
      }
      i{
        font-size: 0.37rem;
        font-weight: bold;
        color: #445779;
      }
    }
    p{
      height: .9rem;
      line-height: .9rem;
      .rem(font-size,26);
      overflow: hidden;
      .ar{
        justify-content: space-around;
      }
      span{
        font-family: 'PingFang SC';
        width: 1.6rem;
        display: flex;
        justify-content: space-between;
        float: left;
        margin-right: 0.2rem;
        font-weight: 500;
        i{
          color:#6A86B9;
        }
      }
      >i{
        color:#445779;
        float: left;
        font-weight: 500;
        .rem(margin-top,1);
      }
    }
  }

  .userGift{
    // position: relative;
    // flex:1;
    height: 8rem;
    width: 100%;
    .sendGift{
      margin-top: 0.1rem;
      height: 1.5rem;
      p:nth-child(1){
         height: 1.5rem;
         display: flex;
         align-items: center;
         float: left;
         color: #445779;
        span{
          display: inline-block;
          margin-top: 0.1rem;
          margin-right: 0.3rem;
            img{
            width: 0.53rem;
          }
        }
      i{
        font-size: 0.37rem;
        font-weight: bold;
      }
      }
      p:nth-child(2){
         height: 1.5rem;
         display: flex;
         align-items: center;
         float: right;
         font-size: 0.32rem;
         color:#6A86B9;
         span{
           padding:0 0.08rem;
           margin-top: 2px;
         }
      }
    }
    .gift{
      overflow: hidden;
      height: .85rem;
      .type{
        display: inline-block;
        text-align: center;
        padding: 0 0.27rem;
        margin-right: 0.32rem;
        margin-bottom: 0.2rem;
        color: #445779;
        font-size: 0.33rem;
        height: 0.67rem;
        line-height: 0.67rem;
        border-radius:0.335rem;
        .list{
          font-style:italic!important;
          font-family: number2!important;
          color: #1486FF;
          margin-left: 3px;
        }
      }
   }
  }

  .guanzhu{
     width:8.13rem;
     height: 1.2rem;
     text-align: center;
     border-radius: .6rem;
     position: fixed;
    //  bottom: 0.67rem;
     bottom: 1rem;
     left: 50%;
     transform: translateX(-50%);
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 100;
     span{
        display: flex;
        align-items: center;
        justify-content: center;
        margin:0 0.085rem;
        font-weight: bold;
        font-size:.43rem;
      img{
        width: .32rem;
      }
     }

  }
  .attention{
    // .rem(width,610);
    // .rem(height,90);
    // .rem(line-height,90);
    // .rem(border-radius,122);
    // .rem(font-size,38);
    color: #fff;
    text-align: center;
    background: linear-gradient(top left,#1486FF,#4BA1FF)!important;
    // margin: 0 auto;
    // .rem(margin-top,100);
  }
}



</style>