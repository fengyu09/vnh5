<template>
	<div id='userInfo'>
    <myScroll ref="scrollWrapper" :bottom='0' :top='0'>
      <div class="head">
        <div class='userHead'>
          <div style='width: 92%;margin:0 auto;'>
                <p class='userBack'><span @click="$router.go(-1)"><img src="../../assets/images/white-back-icon.png" alt=""></span></p>
                <div class="name-box">
                  <div class="user-img"  @click="$router.push('/UpdateInforNew')">
                    <div class="headImg">
                      <img v-lazy="avatar" alt="">
                    </div>
                    <span class="edit-box">Biên tập tư liệu<i></i></span>
                  </div>
                  <span class="name">{{message.nickname}}</span>
                  <p class="sex fl" >
                    <!-- 差个性别icon 2女  1 男 0未知不显示-->
                    <i class="sex-icon" v-show="message.gender" :class="message.gender==2?'female-icon':'male-icon'"></i>
                    <span class="level">{{message.vip}}</span>
                  </p>

                </div>
          </div>
        </div>
        
        <div class='userNum'>
          <div style='width: 92%;margin:0 auto;'>
              <span>关注<i>{{message.follow}}</i></span><span>粉丝<i>{{message.fans}}</i></span><span>获赞<i>{{message.zan}}</i></span>
          </div>
        </div>
    </div>
    <div class="userMsg">
      <div><span><img src="../../assets/images/userinfo/msg-min-1.png" alt=""></span><i>个人信息</i></div>
      <p><span><i>乐&nbsp;购&nbsp;I&nbsp;D:</i></span><i>{{message.unique_id}}</i></p>
      <p><span><i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</i></span><i v-if="message.gender==0">未知</i><i v-if="message.gender==1">男</i><i v-if="message.gender==2">女</i></p>
      <p><span><i>加入时间:</i></span><i>{{timeStampTurnTime(message.created)}}</i></p>
    </div>

     <div class="userGift" v-if="$store.state.isPure!=1">
        <div class="sendGift" >
          <p><span><img src="../../assets/images/userinfo/gift-min-1.png" alt=""></span><i>送出礼物</i></p>
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
    </div>

   </myScroll>
    <div class="guanzhu" @click='guan' v-if="!message.is_follow&&ziji" style='color:#fff;background:linear-gradient(to right,#FF3131,#FF8067);'><span><img src="../../assets/images/anchorP/follow-1.1_03-min.png" alt=""></span><span>关注</span></div>
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
                  //console.log(res.data.data);
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
.content{
  background: #F1F0F6;
  padding-bottom:3rem;
}
  .head{
    width: 100%;
    height: 6.31rem;
    background: #fff;
  .userHead{
    background: url("../../assets/images/userinfo/head-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    .rem(height,380);
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
    .name-box{
      width: 100%;
      position: absolute;
      .rem(left,0);
      .rem(top,237);
      .rem(padding-left,39);
      .user-img{
        position: relative;
        .headImg{
          .rem(width,134);
          .rem(height,134);
          border:0.07rem solid #fff;
          border-radius: 50%;
          background: #fff;
          overflow: hidden;
          float: left;
          .rem(margin-right,28);
          img{
            height:100%;
            width:100%;
          }
        }
        .edit-box{
          position: absolute;
          .rem(left,62);
          .rem(top,102);
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          color: #fff;
          .rem(width,110);
          .rem(height,28);
          .rem(line-height,28);
          .rem(font-size,18);
          border-radius: 30px;
          background: #4C4C4C;
          text-align: center;
          i{
            .rem(width,14);
            .rem(height,14);
            display: inline-block;
            background: url(../../assets/images/newMine/edit_icon.png);
            background-size: contain;
          }

        }

      }
      .name{
        display: block;
        font-weight: bold;
        .rem(font-size,32);
        .rem(padding-top,60);
        float: left;
      }
      .sex{
        width: 70%;
        .sex-icon{
          vertical-align: text-top;
          .rem(height,30);
          .rem(width,30);
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
        .level{
          display: inline-block;
          .rem(width,56);
          .rem(height,30);
          .rem(line-height,30);
          .rem(font-size,24);
          .rem(padding-right,10);
          color: #FFFEFE;
          text-align: right;
          background: url("../../assets/images/ranking/level.png") no-repeat;
          background-size: 100% 100%;
        }
      }

    }

  }
    .userNum{
      .rem(margin-top,20);
      color:#999;
      .rem(font-size,22);
      vertical-align: bottom;
      span{
        display: inline-block;
        margin-right: 0.35rem;
      i{
          font-weight: bold;
          .rem(font-size,32);
          display: inline-block;
          margin-left: 0.1rem;
          font-family: MicrosoftYaHeiUI-Bold;
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
    .rem(width,710);
    .rem(height,336);
    .rem(border-radius,20);
    margin: 0 auto 20px;
    .rem(margin-top,20);
    .rem(padding,20);
    background: #fff;
    div{
      height: 1.1rem;
      display: flex;
      align-items: center;
      .rem(padding-bottom,10);
      span{
        display: inline-block;
        margin-top: 0.1rem;
        margin-right: 0.3rem;
         img{
           .rem(width,32);
        }
      }
      i{
        .rem(font-size,28);
        color: #666;
      }
    }
    p{
      height: 1rem;
      .rem(font-size,26);
      span{
        width: 1.6rem;
        color:#999;
        display: flex;
        justify-content: space-between;
        float: left;
        margin-right: 0.2rem;
        font-weight: 500;
        float: left;
        .rem(margin-right,30);
        i{
          color:#999;
        }
      }
      i{
        color:#666;
        float: left;
        font-weight: 500;
      }
    }
  }

  .userGift{
    .rem(width,710) !important;
    .rem(height,240);
    background: #fff;
    .rem(border-radius,20);
    .rem(padding,20);
    padding-top: 0;
    margin: 0 auto;
    .sendGift{
      height: 1.5rem;
      p:nth-child(1){
         height: 1.5rem;
         display: flex;
         align-items: center;
         float: left;
          color: #666;
        span{
          display: inline-block;
          margin-top: 0.1rem;
          margin-right: 0.3rem;
            img{
            width: 0.53rem;
          }
        }
      i{
        .rem(font-size,28);
      }
      }
      p:nth-child(2){
         height: 1.5rem;
         display: flex;
         align-items: center;
         float: right;
         font-size: 0.32rem;
         color:#999;
         span{
           padding:0 0.08rem;
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
          color: #ff513e;
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
     bottom: 0.67rem;
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
}



</style>