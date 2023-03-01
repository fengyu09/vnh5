<template>
  <div id='information'>
      <div class="infoHead">
          <span class="fl" style='width: 5%;' @click="$router.go(-1)"><img src="../../assets/images/gray-back-icon.png" alt=""></span>
          <span class="fl" style='color: #445779;font-size:0.48rem;font-weight:bold;width: 90%;display:flex;justify-content:center;'>最新资讯</span>
          <span class="fr" style='width: 5%;'></span>
      </div>

      <div class="msg-title">
        <div :class="{active:msg==1}" @click="msg=1,getMessage()">综合</div>
        <div :class="{active:msg==2}" @click="msg=2,getMessage(1)">直播</div>
        <div :class="{active:msg==3}" @click="msg=3,getMessage(2)">活动</div>
        <div :class="{active:msg==4}" @click="msg=4,getMessage(3)">公告</div>
        <div :class="{active:msg==5}" @click="msg=5,getMessage(4)">资讯</div>
     </div>
     
    <myScroll :isDown="true" :isUp="true" :isloadUp='isUp' v-on:func="reLoad" ref="scrollWrapper" :bottom='0' :top='2.6'>  
        <!-- 综合 -->
        <div class="zonghe" v-show='msg==1' style='width:92%;margin:0 auto;'>
            <div class="msg" v-for="(item,index) in zhuboMsg" :key="index">
                <!--  1   始终上下布局  只显示一张大图  +item.info_id -->
                <router-link :to="'/infoDetail/' +item.info_id">
                    <div class="msg-a" v-if="item.settype=='1'">
                        <div class="msg-t">{{item.title}}</div>
                        <div class="msg-i" v-if='item.cover_img!==undefined'><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                        <div class="msg-type">
                            <span class="type" v-if="item.type=='1'" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='2'" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='3'" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='4'" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                </router-link>
                 <!--  2 3  上下布局  显示多张小图-->
                 <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.cover_img!==undefined&&item.settype=='2'||item.settype=='3'">
                    <div class="msg-t text-overflow">{{item.title}}</div>
                    <div class="msg-i1"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[index]" alt=""></span></div>
                    <div class="msg-type">
                        <span class="type" v-if="item.type=='1'" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span>
                        <span class="type" v-if="item.type=='2'" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span>
                        <span class="type" v-if="item.type=='3'" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span>
                        <span class="type" v-if="item.type=='4'" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span>
                        <span class="time">{{item.timegap}}</span>
                    </div>
                </div>
                </router-link>
                <!--  4    左右布局  只显示一张小图 -->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-b" v-if="item.settype=='4'&&item.cover_img!==undefined">
                    <div class="msg1-t fl">
                        <div class="msg1-title">{{item.title}}</div>
                        <div class="msg1-time"> 
                            <span class="type" v-if="item.type=='1'" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='2'" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='3'" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span>
                            <span class="type" v-if="item.type=='4'" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                    <div class="msg1-i fr"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                </div>
                </router-link>
 
            </div>
        </div>

        <!-- 直播 -->
        <div class="zhibo" v-show='msg==2' style='width:92%;margin:0 auto;'>
            <div class="msg" v-for="(item,index) in zhuboMsg" :key="index">
                <!--  1   始终上下布局  只显示一张大图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.settype=='1'">
                    <div class="msg-t">{{item.title}}</div>
                    <div class="msg-i" v-if='item.cover_img!==undefined'><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                    <div class="msg-type"><span class="type" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span><span class="time">{{item.timegap}}</span></div>
                </div>
                </router-link>
                    <!--  2 3  上下布局  显示多张小图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.cover_img!==undefined&&item.settype=='2'||item.settype=='3'">
                    <div class="msg-t text-overflow">{{item.title}}</div>
                    <div class="msg-i1"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[index]" alt=""></span></div>
                    <div class="msg-type">
                        <span class="type" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span>
                        <span class="time">{{item.timegap}}</span>
                    </div>
                </div>
                </router-link>
                <!--  4    左右布局  只显示一张小图 -->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-b" v-if="item.settype=='4'&&item.cover_img!==undefined">
                    <div class="msg1-t fl">
                        <div class="msg1-title">{{item.title}}</div>
                        <div class="msg1-time"> 
                            <span class="type" style='background: #EDE5F9;color:#D444F3;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                    <div class="msg1-i fr"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                </div>
                </router-link>
            </div>
        </div>

        <!-- 活动 -->
        <div class="msg" v-show='msg==3' style='width:92%;margin:0 auto;'>
           <div class="msg" v-for="(item,index) in zhuboMsg" :key="index">
                <!--  1   始终上下布局  只显示一张大图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.settype=='1'">
                    <div class="msg-t">{{item.title}}</div>
                    <div class="msg-i" v-if='item.cover_img!==undefined'><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                    <div class="msg-type"><span class="type" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span><span class="time">{{item.timegap}}</span></div>
                </div>
                </router-link>
                    <!--  2 3 上下布局  显示多张小图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.cover_img!==undefined&&item.settype=='2'||item.settype=='3'">
                    <div class="msg-t text-overflow">{{item.title}}</div>
                    <div class="msg-i1"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[index]" alt=""></span></div>
                    <div class="msg-type">
                        <span class="type" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span>
                        <span class="time">{{item.timegap}}</span>
                    </div>
                </div>
                </router-link>
                <!--  4    左右布局  只显示一张小图 -->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-b" v-if="item.settype=='4'&&item.cover_img!==undefined">
                    <div class="msg1-t fl">
                        <div class="msg1-title">{{item.title}}</div>
                        <div class="msg1-time"> 
                            <span class="type" style='background: #FFF9E8;color:#FD8208;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                    <div class="msg1-i fr"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                </div>
                </router-link>
            </div>
        </div>

        <!-- 公告 -->
        <div class="msg" v-show='msg==4' style='width:92%;margin:0 auto;'>
           <div class="msg" v-for="(item,index) in zhuboMsg" :key="index">
                <!--  1   始终上下布局  只显示一张大图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.settype=='1'">
                    <div class="msg-t">{{item.title}}</div>
                    <div class="msg-i" v-if='item.cover_img!==undefined'><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                    <div class="msg-type"><span class="type" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span><span class="time">{{item.timegap}}</span></div>
                </div>
                </router-link>
                    <!--  2 3 上下布局  显示多张小图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.cover_img!==undefined&&item.settype=='2'||item.settype=='3'">
                    <div class="msg-t text-overflow">{{item.title}}</div>
                    <div class="msg-i1"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[index]" alt=""></span></div>
                    <div class="msg-type">
                        <span class="type" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span>
                        <span class="time">{{item.timegap}}</span>
                    </div>
                </div>
                </router-link>
                <!--  4    左右布局  只显示一张小图 -->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-b" v-if="item.settype=='4'&&item.cover_img!==undefined">
                    <div class="msg1-t fl">
                        <div class="msg1-title">{{item.title}}</div>
                        <div class="msg1-time"> 
                            <span class="type" style='background: #F5F7FA;color:#79818C;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                    <div class="msg1-i fr"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                </div>
                </router-link>
            </div>
        </div>

        <!-- 资讯 -->
        <div class="msg" v-show='msg==5' style='width:92%;margin:0 auto;'>
           <div class="msg" v-for="(item,index) in zhuboMsg" :key="index">
                <!--  1   始终上下布局  只显示一张大图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.settype=='1'">
                    <div class="msg-t">{{item.title}}</div>
                    <div class="msg-i" v-if='item.cover_img!==undefined'><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                    <div class="msg-type"><span class="type" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span><span class="time">{{item.timegap}}</span></div>
                </div>
                </router-link>
                    <!--  2 3 上下布局  显示多张小图-->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-a" v-if="item.cover_img!==undefined&&item.settype=='2'||item.settype=='3'">
                    <div class="msg-t text-overflow">{{item.title}}</div>
                    <div class="msg-i1"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[index]" alt=""></span></div>
                    <div class="msg-type">
                        <span class="type" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span>
                        <span class="time">{{item.timegap}}</span>
                    </div>
                </div>
                </router-link>
                <!--  4    左右布局  只显示一张小图 -->
                <router-link :to="'/infoDetail/' +item.info_id">
                <div class="msg-b" v-if="item.settype=='4'&&item.cover_img!==undefined">
                    <div class="msg1-t fl">
                        <div class="msg1-title">{{item.title}}</div>
                        <div class="msg1-time"> 
                            <span class="type" style='background: #FFECE8;color:#FF513E;'>{{item.type_txt}}</span>
                            <span class="time">{{item.timegap}}</span>
                        </div>
                    </div>
                    <div class="msg1-i fr"><span v-for="(i,index) in item.cover_img" :key="index"><img v-lazy="item.cover_img[0]" alt=""></span></div>
                </div>
                </router-link>
            </div>
        </div>
   
     <p class="bottom-line" v-if='this.loadingMsg.length==0&&bomLine'>Tôi cũng có giới hạn đó~~</p>
     </myScroll>
    
    <div class="loadingmore" v-if='load'><img src="../../assets/images/loadingmore.gif" alt=""></div>
    <div class="loading" v-if='zanwu'>暂无资讯~</div>
    <div class="shangla" v-if='isUp'>上拉加载更多</div>
    
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
export default {
  name: 'information',
  components: {myScroll},
  data(){
      return{
         msg:1,
         isL:false,    //是否显示下拉刷新的loading
         isUp:false,   //是否显示上拉加载更多的loading
         zhuboMsg:[],  //资讯信息
         loadingMsg:[],    //下拉请求到的资讯信息
         zanwu:false,
         zanwushuju:false,
         load:true,
         limit:10,    // 显示几条
         page:1,
         bomLine:false,
         xiala:true,
     } 
   },
    created(){
        this.getMessage();
    },
    watch:{
      loadingMsg(){
          setTimeout(() => {
              this.$refs.scrollWrapper.refresh();  //下拉加载数据之后重新计算高度，刷新滚动条  免得拉不动
          }, 20);
          if(this.loadingMsg.length==0){
              this.bomLine = true;
              this.xiala=false
          }else{
              this.bomLine = false;
          }
      },
    },
    methods: {
         //   获取资讯信息
        getMessage(type){
            this.$nextTick(() => {
                setTimeout(() => {
                   this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);  //点击切换的时候滚动条在顶部
                }, 20);
            });
            this.page=1
            this.load=true
            this.bomLine = false
            this.xiala=true 
            this.$http.get(this.versionLive2+'info/getInfoList', {
                    params:{
                    type:type,
                    limit:this.limit,
                    page:this.page,
                    }
                }).then(res => {
                    if (res && res.data.code == 1){
                    this.zhuboMsg=res.data.data || []
                    this.load=false
                    if(this.zhuboMsg.length==0){    //没资讯数据的时候
                        this.zanwu=true
                    }else{
                        this.zanwu=false
                    }
                }  
            })                
        },
　　　  reLoad(data) {   
        if (data == "down") {       //下拉刷新
              this.load= true;
            setTimeout(()=>{
              this.load= false;
            },200)
        }else if(data == "up"){    //上拉请求数据
              this.isUp = true
            if(this.loadingMsg.length>0||this.xiala==true){
                 this.$http.get(this.versionLive2+'info/getInfoList', {
                    params:{
                    type:this.msg*1-1,
                    limit:this.limit,
                    page:this.page+=1,
                    }
                }).then(res => {
                    if (res && res.data.code == 1){
                    this.loadingMsg=res.data.data || []
                    this.load=false
                    this.isUp = false
                    for(var i=0;i<this.loadingMsg.length;i++){
                        var arr=this.loadingMsg[i]
                        this.zhuboMsg.push(arr)
　　　　　　　　　　}

                }  
             })               
            }else{
                if(this.loadingMsg.length==0){
                     this.isUp = false;
                }else{
                     this.isUp = true;
                }
            }
        }
     }
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
   #information{
       width: 100%;
       .loading{      //暂无资讯
           position: fixed;
           top:5rem;
           left: 50%;
           transform: translateX(-50%);
           z-index: 10;
           color: #445779;
           font-size: .4rem;
       }
        .loadingmore{  //loading的图标
           position: fixed;
           top:2.8rem;
           left: 50%;
           transform: translateX(-50%);
           z-index: 10;
       }
       .shangla{      //上拉加载更多
           position: fixed;
           bottom:1rem;
           left: 50%;
           transform: translateX(-50%);
           z-index: 10;
           color: #445779;
           font-size: .33rem;
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
    .msg-title{
        background: #fff;
        z-index: 10;
        position: fixed; top:1.2rem; 
        width:100%;
        font-size: 0.43rem;
        
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 0.08rem;
        display: flex;
        >div{
            padding: 0.35rem 0 0.2rem 0;
            width: 20%;
            text-align: center;
            position: relative;
        }
        .active{
            color: #445779;
            font-weight: bold;
            &:before{
                content: '';
                width: .53rem;
                height:0.08rem;
                background: #ff513e;
                border-radius:0.04rem;
                position: absolute;
                bottom: -0.1rem;
                z-index: 9;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }


      //  下面数据的样式
    .msg{
        .msg-a{                         //类型为主播时的样式
            border-bottom: 1px solid #eeeeee;
            padding: 0.4rem 0;
        .msg-t{
            font-weight: bold;
            color: #445779;
            font-size: 0.37rem;
            margin-bottom: 0.37rem;
            overflow:hidden;          //文本超出两行后现实省略号
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; 
        }
        .msg-i{
            width:9.19rem;
            height:4rem;
            border-radius:0.13rem;
            overflow: hidden;
            span{
                img{
                    width:100%;
                    height: auto;
                }
           }
        }
         .msg-i1{
            width:100%;
            height:2.88rem;
           span:nth-child(3n){
            margin-right:0;
           }
            span{
                width:2.88rem;
                height:2.88rem;
                display: inline-block;
                margin-right: 0.28rem;
                border-radius:0.13rem;
                overflow: hidden;
                img{
                    // width: 2.88rem;
                    // height: 100%;
                    width:auto;
                    height: 100%;
                }
           }
        }
        .msg-type{
            margin-top: 0.27rem;
            .type{                    
                display: inline-block;
                width:1.33rem;
                height:0.48rem;
                line-height:0.48rem;
                border-radius: .24rem;
                font-size: 0.32rem;
                text-align: center;
            }
            
            .time{
                display: inline-block;
                margin-left: 0.35rem;
                color:#999;
                font-size: 0.27rem;
                i{
                    margin-left: 0.1rem;
                }
            }
        }
      }
             //类型不是主播时的样式
       .msg-b{                
            width: 100%;
            height:2.43rem;
            border-bottom: 1px solid #eeeeee;
            padding: .4rem 0;
            .msg1-t{
                width: 6.28rem;
                height:1.63rem;
                .msg1-title{  
                    width: 6.28rem;
                    height: 1rem;      
                    margin-top: -0.02rem;
                    font-weight: bold;
                    color: #445779;
                    font-size: 0.37rem;
                    overflow:hidden;          //文本超出两行后现实省略号
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                }
                .msg1-time{
                     margin-top: 0.25rem;
                     .type{                       //综合里面资讯的样式
                        display: inline-block;
                        width:1.33rem;
                        height:0.48rem;
                        line-height:0.48rem;
                        border-radius: .24rem;
                        font-size: 0.32rem;
                        text-align: center;
                    }
                    .time{
                        display: inline-block;
                        margin-left: 0.35rem;
                        color:#999;
                        font-size: 0.27rem;
                        i{
                            margin-left: 0.1rem;
                        }
                    }
                  }
            }
            .msg1-i{
                width:2.53rem;
                height:1.63rem;
                border-radius:0.13rem;
                overflow: hidden;
                img{
                    // width:2.53rem;
                    // height:1.63rem;
                    width:100%;
                    height: auto;
                }
            }
       }
    }
    .bottom-line {
        text-align: center;
        font-size: 0.3rem;
        color: #ccc;
        padding: 0.4rem 0;
    }
 }






</style>
