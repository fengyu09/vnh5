<template>
    <div>
        <flexbox class="infoHead">
            <flexbox-item :span="1/10"><div @click="$router.go(-1)" class="flex-demo" style="padding-top: 0.7em; z-index: 10000001;"><img src="../../assets/images/gray-back-icon.png" alt=""></div></flexbox-item>
            <flexbox-item ><div class="flex-demo   tickling">我的关注</div></flexbox-item>
            <flexbox-item :span="1/10"><div class="flex-demo"></div></flexbox-item>
        </flexbox>

        <div class="tab">
            <ul>
                <li
                v-for="(item,index) in tabsParam"
                @click="toggleTabs(index,item.type,item.text)"
                :class="{active:index==nowIndex}"
                :key="index"
                >
                <a>{{item.text}}</a>
                </li>
            </ul>
        </div>

        <div class="zanwu" v-if="show2">
            <div class="zanwuImg"><img src="../../assets/images/member/zanwuiguanzhu1.png" alt=""></div>
            <div class="zanwuPep">您还没有关注任何<span>{{name}}</span>哦~</div>
        </div>

      <!-- 主播 -->
     <div class="tabcon" v-show="this.type==0&&this.list.length>0">
        <myScroll  :isLoad="isL" v-on:func="reLoad" ref="scrollWrapper1" :top="2.4" :bottom='0'>
              <div v-if="list.length" class="list-item" v-for="(item,index) in list" :key="index"  data-type="0" >
                  <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                      <div class="details">
                          <div class="det">
                            <router-link :to="'/anchorProfile/'+item.anchor_id">
                              <div class="detImg">
                                 <img v-lazy="item.avatar" alt="">
                                 <!-- <div class="badge">主播</div> -->
                              </div>
                              <div :class="item.live_status==1 ? 'circle' : ''"></div>
                              <div :class="item.live_status==1 ? 'circle' : ''"></div>
                              <div :class="item.live_status==1 ? 'circle' : ''"></div>
                            </router-link>
                          </div>
                          <div class="info">
                              <p class="name">
                                  <span class="nick text-overflow">{{item.nickname}}</span>
                              </p>
                              <p class="txt text-overflow">{{item.sign}}</p>
                          </div>
                          <div class="enter"><router-link :to="'/chat/'+item.anchor_id">
                              <span class="enterIcon">进入直播间</span>
                              <span><img src="../../assets/images/enter-seeding.png" alt=""></span>
                          </router-link></div>
                          <div class="delete" @click="deleteItem" :data-index="index"><p class="deleteMenu">取消</p><p>关注</p></div>
                      </div>
                  </div>
              </div>
              <p class="bottom-line" v-if="this.list.length>10?true:false">Tôi cũng có giới hạn đó~~</p>
        </myScroll>
    </div>

    <!-- 用户 -->
     <div class="tabcon" v-show="this.type==1&&this.list.length>0">
        <myScroll :isLoad="isL" v-on:func="reLoad" ref="scrollWrapper" :top="2.4" :bottom='0'>
              <div v-if="list.length" class="list-item" v-for="(item,index) in list" :key="index"  data-type="0" >
                  <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                      <div class="details">
                          <div class="det">
                              <div class="detImg" @click="getInfo(item.user_id, item.avatar)">
                                  <img v-lazy="item.avatar" alt="">
                              </div>
                          </div>
                          <div class="info">
                              <p class="name">
                                  <span class="nick text-overflow">{{item.nickname}}</span>
                              </p>
                              <p class="txt text-overflow">{{item.sign}}</p>
                          </div>
                          <div class="delete" @click="deleteItem" :data-index="index"><p class="deleteMenu">取消</p><p>关注</p></div>
                      </div>
                  </div>
              </div>
              <p class="bottom-line" v-if="this.list.length>10?true:false">Tôi cũng có giới hạn đó~~</p>
        </myScroll>
    </div>

      <!-- 专家 -->
    <div class="tabcon" v-show="this.type==2&&this.list.length>0">
        <myScroll  :isLoad="isL" v-on:func="reLoad" ref="scrollWrapper" :top="2.4" :bottom='0'>
              <div v-if="list.length" class="list-item" v-for="(item,index) in list" :key="index"  data-type="0" >
                  <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                      <div class="details">
                          <div class="det">
                              <div class="detImg">
                                  <router-link :to="'/expertCenter/'+item.expert_id">
                                    <img v-lazy="item.avatar" alt="">
                                  </router-link>
                              </div>
                          </div>
                          <div class="info">
                              <p class="name">
                                  <span class="nick text-overflow">{{item.nickname}}</span>
                              </p>
                              <p class="txt text-overflow">{{item.profile}}</p>
                              <!-- <p class="txt text-overflow" v-html='getIntro(item.intro)'></p> -->
                          </div>
                          <div class="delete" @click="deleteItem" :data-index="index"><p class="deleteMenu">取消</p><p>关注</p></div>
                      </div>
                  </div>
              </div>
               <p class="bottom-line" v-if="this.list.length>10?true:false">Tôi cũng có giới hạn đó~~</p>
        </myScroll>
    </div>
   


      <!-- 数据还在请求时的样式 -->
      <div class="concern-null" v-if="show1==false">
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
            <div class="details" >
                <div class="det"> <div class="detImg"></div> </div>
                <div class="info"><p class="name"></p><p class="txt"></p></div>
                <div class="enter"> <p class="enterIcon"></p></div>
            </div>
      </div>

        <!--gz-min-->
        <div class="teach-box" v-if="list.length && isteachgz">
            <div class="teach-one">
                <img src="../../assets/images/teach/gz-min.png" alt="">
            </div>
            <div class="teach-three" @click="know">
                <img src="../../assets/images/teach/konw-min.png" alt="">
            </div>
        </div>

    </div>
</template>


<script>
import {
  Flexbox,
  FlexboxItem,
//  Loading,
//  InlineLoading
} from 'vux'
import myScroll from '../../components/myScroll.vue'
import { getToken, setToken } from '../../store/cookie'
    export default {
        name: 'eRecord',
        components: {
        Flexbox,
        FlexboxItem,
        myScroll,
//        Loading,
//        InlineLoading,
      },
        data(){
            return {
                list : [],
                startX : 0 ,
                endX : 0 ,
                show1: false,
                show2:false,
                isL:false,      //是否显示 下拉刷新的组件
                isteachgz:'',
                tabsParam: [
                  {type:0,text:"主播"},
                  {type:1,text:"用户"},
                  {type:2,text:"专家"}
                ],
                nowIndex:0,
                type:-1,
                name:'',
            }
        },
       created(){
            this.type=0
            this.getConcern();
            this.isteachgz=getToken('isteachgz')=='no'?false:true;
       },
        mounted(){   
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
        watch:{
             'list':function(){
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.$refs.scrollWrapper1.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)

                })
            }
        },
        methods:{
           know(){
            this.isteachgz = false;
            setToken('isteachgz','no')
           },
          toggleTabs(index,type,text){    //点击切换
              this.nowIndex = index;
              this.name=text
              this.type=type
              this.show1=false
              this.show2=false
              this.list.length=0
              if(this.type==0||this.type==1){
                 this.getConcern();
              }else{
                  this.$http.get('/forum/plan/follow-list', {   //专家关注列表
                      params:{
                      user_id:this.$store.state.userinfo.user_id,
                    }    
                  }).then(res => {
                  if (res && res.data.code == 1) {
                      this.list=res.data.data
                      this.show1=true
                        if(this.list.length==0){
                          this.show2=true     //没有关注  立刻显示缺省页
                      }
                  }
                });
              }
            
            },
            getConcern(){
                this.isL = true;
                this.$http.get(this.versionLive2+'user/User_follow_list', {
                        params:{
                        user_id:this.$store.state.userinfo.user_id,
                        type:this.type>0?this.type:0
                      }    
                    }).then(res => {
                        this.isL = false
                        this.list=res.data.data;
                        this.show1=true
                        if(this.list.length>0){
                            for(var i=0;i<this.list.length;i++){      
                                var intro=this.list[i].sign;   //主播简介
                                var live_status=this.list[i].live_status;         //判断直播状态
                            }
                        }else{
                            this.show2=true
                        }
                })                
            },
             getInfo(id, avatar) {
                this.$router.push({ name: "userInfo", query: { id, avatar } });  
            },
             reLoad(data,obj) {   //下拉重新请求数据
                 if(data=='end'){
                    obj.name = this.$route.name;
                    this.$store.commit('SETPOSITIONY',obj);
                  }
            },
            getIntro(intro){  //获取个性签名
                   return intro
            },
            getStatus(live_status){  //获取直播状态
                   return live_status
            },

             //左滑删除
            calc(item, minusOrPlus,index) {
                if (minusOrPlus === 1) {
                    item.num++;
                } else if (minusOrPlus === 0) {
                    item.num--;
                }
            },
            skip(){
                if( this.checkSlide() ){
                    this.restSlide();
                }
            },
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 50 ){
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -50 ){
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
                let listItems = document.querySelectorAll('.list-item');
                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            //取消关注
            deleteItem(e){
                // 当前索引
                let index = e.currentTarget.dataset.index;
                // 复位
                this.restSlide();

                // 取消后台的
                var arr=this.list[index]
   
                if(this.type==0){          //取消关注
                    this.$http.post(this.versionLive2+'live/follow' ,{anchor_id:arr.anchor_id,user_id:this.$store.state.userinfo.user_id,})
                }else if(this.type==1){
                    this.$http.post(this.versionLive2+'live/follow' ,{follow_id:arr.user_id,user_id:this.$store.state.userinfo.user_id,})
                }else{
                    this.$http.post("/forum/plan/follow", {expert_id:arr.expert_id.toString(),user_id: this.$store.state.userinfo.user_id})
                }

                //取消本地的  
                this.list.splice(index,1);  

                if(this.list.length==0){
                    this.show2=true  //没有关注  立刻显示缺省页
                }
            }
        }
    }
</script>


<style scoped lang="less">
.tab {
  height: 1.2rem;
  overflow: hidden;
  border-bottom:1px solid #eee;
  ul {
    width: 100%;
    font-size: 0.43rem;
    li {
      width: 33.33%;
      float: left;
      text-align: center;
      line-height: 1.2rem;
      a {
        // color: #999999;
        color: #6A86B9;
      }
    }
    li.active {
      a {
        // color: #333333;
        color: #1486FF;
        position: relative;
        font-weight: bold;
        &:before {
          content: "";
          position: absolute;
          width: 0.53rem;
          height: 0.08rem;
          border-radius: 0.04rem;
        //   background: #ff513e;
          background: #1486FF;
          bottom: -0.3rem;
          left: 0.2rem;
        }
      }
    }
  }
}

.teach-box{
        position: fixed;
        width: 100%;
        height: 100%;
        min-width: 320px;
        max-width: 750px;
        background: rgba(0,0,0,.5);
        left: 0;
        top: 0;
        z-index: 1000;
        >div{
            position: absolute;
        }
        .teach-one{
            width: 40%;
            top: 7rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .teach-two{
            width: 42%;
            top:5.9rem;
            right: 6%;

        }
        .teach-three{
            width: 29.3%;
            top: 12rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
.infoHead{
  height: 1.2rem;
  line-height: 1.2rem;
}
.flex-demo {
  text-align: center;
  img{
      width: .25rem;
  }
}
.tickling{
  font-weight: bold;
  font-size: .45rem;
}

.zanwu{
    text-align: center;
    z-index: 100;
    .zanwuImg{
        margin-top: 3rem;
        img{
            width: 5.3rem;
        }
    }
    .zanwuPep{
        margin-top: .2rem;
        color:#6A86B9;
        font-size: .37rem;
    }
}

.bottom-line{
    text-align: center;
    font-size: .3rem;
    color: #ccc;
    padding: .4rem 0;
}

    .list-item{
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        .delete{
            width: 1.9rem;
            height: 2.3rem;
            background: #ff513e;
            font-size: .4rem;
            color: #fff;
            text-align: center;
            position: absolute;
            top:0;
            right: -1.95rem;
            .deleteMenu{
                padding-top:0.55rem;
            }
        }
    }
    .list-item[data-type="0"]{
        transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
        transform: translate3d(-1.9rem,0,0);
    }
    .list-box{
        background: #fff;
        .details{
            position:relative;
            height: 2.3rem;
            border-bottom: 1px solid #f5f5f5;
            .det{
                width: 2.2rem;
                height: 2.3rem;
                float: left;
                padding-top:0.4rem;
                padding-left:0.3rem;
                border-bottom: 1px solid white;
                position: relative;
                .detImg{
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius:50%;
                    overflow: hidden;
                    position: relative;
                    z-index: 100;
                    img{
                        width: 100%;
                        height: 100%;
                        -webkit-touch-callout: inherit!important;
                        pointer-events: inherit!important;
                    }
                    .badge{
                        position: absolute;
                        left:.93rem;
                        bottom:.38rem;
                        width: .9rem;
                        height: .4rem;
                        line-height: .4rem;
                        background-color: #ff513e;
                        color:#fff;
                        text-align: center;
                        border-radius:.2rem 0 .2rem 0;
                        z-index: 2;
                    }
                 }
                }
            .info{
                float: left;
                height: 2.3rem;
                .name{
                    font-size: .4rem;
                    color: #333333;
                    margin-top: 0.5rem;
                    .nick{
                        font-weight: bold;
                        display: inline-block;
                        vertical-align: middle;
                        max-width:4rem; 
                        margin-right: .1rem;
                    }
                    img{
                         height: .3rem;
                         width: .4rem;
                         vertical-align: middle;
                    }
                }
                .txt{
                    font-size: .33rem;
                    color: #999999;
                    margin-top: .2rem;
                    max-width:4.8rem;
                }
            }
            .enter{
                float: right;
                height: 2.3rem;
                line-height: 2.3rem;
                width: 2.6rem;
                text-align: center;
                font-size: .36rem;
                   .enterIcon{
                    vertical-align: middle;
                    margin-right:-0.1rem;
                   }
                 img{
                     width:.4rem;
                     vertical-align: middle;
                 }
            }
            
        }
    }



//数据还在加载时的样式
.concern-null{
    .details{
            position:relative;
            height: 2.3rem;
            border-bottom: 1px solid #f5f5f5;
            .det{
                width: 2.2rem;
                height: 2.3rem;
                float: left;
                padding-top:0.4rem;
                padding-left:0.3rem;
                border-bottom: 1px solid white;
                .detImg{
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius:50%;
                    overflow: hidden;
                    background: #ededed;
                    position: relative;
                    z-index: 100;
                    .badge{
                        position: absolute;
                        left:.93rem;
                        bottom:.38rem;
                        width: .9rem;
                        height: .4rem;
                        line-height: .4rem;
                        background: #ededed;
                        color:#fff;
                        text-align: center;
                        border-radius:.2rem 0 .2rem 0;
                    }
                 }
                }
            .info{
                float: left;
                height: 2.3rem;
                .name{
                    width: 1.5rem;
                    height: 0.5rem;
                    margin-top: 0.5rem;
                    background: #ededed;
                }
                .txt{
                    margin-top: .2rem;
                    width:2rem;
                    height: 0.5rem;
                    background: #ededed;
                }
            }
            .enter{
                float: right;
                height: 2.3rem;
                width: 2.4rem;
                display: flex;
                align-items: center;
                   .enterIcon{
                        margin-right:.3rem;
                        background: #ededed;
                        width: 3rem;
                        height: 0.5rem;
                   }
            }
            
        }
}

.circle {
    // position: absolute;
    // left: 0;
    // top: 0;
    // border-radius: 50%;
    // // border: 6px solid #ff2727;
    // width: 1.5rem;
    // height: 1.5rem;
    // overflow: hidden;
    position: absolute;
    left: 0.3rem;
    top: 0.4rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    z-index: 1;
    background: #ff2727;
    &:nth-child(1) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
    }
    &:nth-child(2) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.9s;
      -webkit-animation-delay: 0.9s;
      -o-animation-delay: 0.9s;
      -moz-animation-delay: 0.9s;
      -ms-animation-delay: 0.9s;
    }
    &:nth-child(3) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.6s;
      -webkit-animation-delay: 0.6s;
      -o-animation-delay: 0.6s;
      -moz-animation-delay: 0.6s;
      -ms-animation-delay: 0.6s;
    }

    @keyframes circle-opacity {
      0% {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      100% {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-o-keyframes circle-opacity {
      0% {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      100% {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-moz-keyframes circle-opacity {
      0% {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      100% {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-webkit-keyframes circle-opacity {
      0% {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      100% {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
}
@keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-o-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-moz-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity: 0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@-webkit-keyframes circle-opacity {
  0% {
    border: 1.5px solid #ff2727;
    opacity:0.6;
    -webkit-transform: scale(1.08);
    -o-transform: scale(1.08);
    -moz-transform: scale(1.08);
    transform: scale(1.08);
    // border-width:5px;
  }
  100% {
    border: 1.5px solid #ff2727;
    opacity: 0;
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    -moz-transform: scale(1.3);
    transform: scale(1.3);
  }
}

</style>

