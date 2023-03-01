<template>
    <div class="rechargeTtorial">
        <x-header style="z-index: 1001;color:#333;background: #fff;" :title="$t('rechargeTtorial[0]')"  :left-options="{showBack: false}">
        <span style="color:#333">{{$t('rechargeTtorial[0]')}}</span>
        <i class="gray-back"></i>
        <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="goBack"></div>
        </x-header>
        <div class="title2" @click="showDetail=true" v-if="playList.length">
            <img class="icon-l " :src="titleIcon" alt="">
            {{title}}
            <img class="icon-r fr" src="../../../assets/images/jt_right.png" alt="">
        </div>
        <myScroll
            ref="scrollWrapperH"
            :bottom="0"
            :isLoad="isL"
            :data="playList"
            :bgColor="'f1f0f6'"
            :top="2.5">
            <div class="main">
                <div v-show="currentId==item.id" v-for="(item,index) in playList" :key="index">
                    <img :src="item.images" alt="">
                </div>
            </div>
            
        </myScroll>
        
        <!-- 底部弹窗 -->
        <div class="overlayer" @touchmove.prevent v-show="showDetail" @click="showDetail=false"></div>
            <popup v-model="showDetail" show-bottom-border="true" position="bottom" height="50%" should-rerender-on-show :show-mask="false">
                <div class="popup-title">
                    <span class="cancel" @click="showDetail=false">{{$t('qxText')}}</span>
                    <span>{{$t('rechargeTtorial[1]')}}</span>
                </div>
                <ul class="popup-style">
                    <myScroll
                ref="scrollWrapper"
                :bottom="0"
                :isLoad="isL"
                :data="playList"
                :bgColor="'#fff'"
                :top="1.2">
                        <li :class="currentId== item.id?'active':''" v-for="(item,index) in playList" :key="index" @click="tutorial(item)">
                            <!-- <span class="icon-l icon-1"></span> -->
                            <img class="icon-l " :src="item.icon" alt="">
                            {{item.title}}
                        </li>
                    </myScroll>
                </ul>
            </popup>
    </div>
</template>
<script>

 import myScroll from "../../../components/myScroll.vue"; //纵向滚动
 import { Popup } from 'vux'
export default {
    data(){
        return{
            playList:[],
            isL:false,
            showDetail: false,
            currentId:1,
            title:'',
            titleIcon:''
        }
    },
    watch:{
        currentId:function(n){
            setTimeout(() => {
                this.$refs.scrollWrapperH.refresh(); //重新计算高度，刷新滚动条
            }, 20);
        }
    },
    created(){
          if(this.$route.query.type==1){
            this.currentId = 10;
            this.title = 'USDT'
        }
        this.getTeachList();
    },
    methods: {
        goBack(){
            // console.log(80);
            this.$router.go(-1);//返回上一层
        },
        getTeachList(){
            this.$http.get(this.versionLive2+"/Recharge/get_teach_list", {
              params:{client_type: "3"}
            }).then(res => {
                if(res.data.code==1){
                    this.playList = res.data.data.reverse()
                   
                    let name = this.playList[0]
                    this.tutorial(name)
                    //console.log(this.playList);
                }else{
                 this.$vux.toast.text(res.data.msg, 'middle')
               }
            })
            
        },
        tutorial(item){
            this.currentId = item.id;
            this.title = item.title;
            this.titleIcon = item.icon;
            this.showDetail = false;    
            this.$refs.scrollWrapperH.Myscroll.scrollTo(0,0); 
        }
    },
    components: {
      myScroll,
      Popup
    },
}
</script>
<style lang="less">
.rem(@name,@px){
  @{name}:unit(@px/75,rem)
}

.infoHead {
  height: 1.2rem;
  line-height: 1.2rem;
  
}
.gray-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../../assets/images/gray-back-icon.png') no-repeat;background-size: 100% 100%}
.title2{
    .rem(height,90);
    .rem(line-height,90);
    .rem(font-size,28);
    .rem(padding-left,35);
    .rem(padding-right,35);
    color: #445779;
    border-top: 1px solid #f0f0f2;
    background: #fff;
    
    .icon-r{
        .rem(width,16);
        .rem(height,29);
        vertical-align: middle;
        .rem(margin-top,35);
    }
}
.icon-l{
    .rem(width,300);
    // .rem(height,46);
    vertical-align: middle;
    float: left;
    .rem(margin-top,21);
    .rem(margin-right,20);
   
}
.main{
    .rem( padding-top,56px);
    img{
        display: block;
        .rem(width,420);
        margin: 0 auto;
    }
}
.overlayer{
     position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index: 500;
  background-color: #000;
  opacity: .5;
}
.popup-title{
    .rem(height,88);
    .rem(line-height,88);
    .rem(font-size,30);
    .rem(padding-left,30);
    color: #445779;
    background: #fff;
    .cancel{
        color: #aaa;
        float: left;
        .rem(margin-right,199);
    }
}
.popup-style{
    background: #fff;
    li{
        .rem(line-height,87);
        border-top: 1px solid #EEE;
        .rem(font-size,24);
        color: #445779;
        .rem(padding-left,30);
        .rem(padding-right,30);
        background: #fff  !important;
        position: relative;
        &.active{
            &::before{
                content: '';
                .rem(width,28);
                .rem(height,23);
                background: url(../../../assets/images/rechargeTutorial/gou.png) no-repeat ;
                background-size: 100% 100%;
                position: absolute;
                .rem(right,30);
                .rem(top,25);
            }
            
        }
    }
    
}
</style>