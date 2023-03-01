<template>
  <div class="header_download clearfix" v-if="isDown"
    :class="[{'header-download-pink':skin ==1&&lanCode==1},{'header-download-blue':skin ==2&&lanCode==1},{'header-download-green':skin ==3&&lanCode==1},{'header-download-maingreen':skin ==4&&lanCode==1},{'header-download-golden':skin ==5&&lanCode==1},
    {'header-download-pinky':skin ==1&&lanCode!=1},{'header-download-bluey':skin ==2&&lanCode!=1},{'header-download-greeny':skin ==3&&lanCode!=1},{'header-download-maingreeny':skin ==4&&lanCode!=1},{'header-download-goldeny':skin ==5&&lanCode!=1}]">
    <i class="close-icon fl" @click="hideBtn()"></i>
    <div class="down-btn fr" @click="download" :class="[{'down-btn-pink':skin ==1},{'down-btn-blue':skin ==2},{'down-btn-green':skin ==3},{'down-btn-green':skin ==4},{'down-btn-golden':skin ==5}]">{{defalutLan=='en'?'Download':'Tải xuống'}}</div>
  </div>
</template>

<script>
import { getToken } from '../store/cookie';
import { mapState } from "vuex";
    export default {
        name: "header_download",
        data(){
          return{
            isDown:true
          }
        },
         props:{
            // isDownLoad:{
            //     type:Boolean,
            //     default:true
            // }
        },
        created(){
         this.isDown = this.$store.state.isDownLoad;
        },
        methods:{
           hideBtn(){
               this.$store.commit('SETDOWNLOAD',false);
               this.isDown = false;
           },

           download(){
             if(this.lanCode==1||this.lanCode==5){
               if(this.isPhoneAgent()=='ios'){
                // window.open(getToken('gfios'))
                window.open('https://k188.app/k188_v3.mobileconfig')
                // 
                
              }else if(this.isPhoneAgent()=='android'){
                  // window.open(getToken('gfanz'))
                  window.open('https://060a.s3.ap-southeast-1.amazonaws.com/yn/k188.apk')
                  // 
              }
             }else if(this.lanCode==2){
               if(this.isPhoneAgent()=='ios'){
                // window.open(getToken('gfios'))
                window.open('')
                // 
                
              }else if(this.isPhoneAgent()=='android'){
                  // window.open(getToken('gfanz'))
                  window.open('')
                  // 
              }
             }
            

          },
          isPhoneAgent(){
              let u = navigator.userAgent, app = navigator.appVersion;
              let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
              let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              if (isAndroid) {
                  //这个是安卓操作系统
                  return 'android'
              }
              if (isIOS) {
                  //这个是ios操作系统
                  return 'ios'
              }
          },
        },

         computed: {
            ...mapState([
                "skin","lanCode","defalutLan"
            ])
        },
    }
</script>

<style scoped lang="less">

    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
.header_download{
    background: url(../assets/images/logob.png) #fff no-repeat;
    background-size: contain;
    .rem(height,136);
    padding-top: 0.4rem;
    max-width: 750px;
    overflow: hidden;
    &.header-download-pink{
      background: url(../assets/images/skin/pink/logob.png) no-repeat;
      background-size: contain;
    }
    &.header-download-pinky{
      background: url(../assets/images/skin/pink/logoby.png) no-repeat;
      background-size: contain;
    }
     &.header-download-blue{
      background: url(../assets/images/skin/blue/logob.png) no-repeat;
      background-size: contain;
    }
     &.header-download-bluey{
      background: url(../assets/images/skin/blue/logoby.png) no-repeat;
      background-size: contain;
    }
     &.header-download-green{
      background: url(../assets/images/skin/green/logob.png) no-repeat;
      background-size: contain;
    }
     &.header-download-greeny{
      background: url(../assets/images/skin/green/logoby.png) no-repeat;
      background-size: contain;
    }
     &.header-download-maingreen{
      background: url(../assets/images/skin/maingreen/logob.png) no-repeat;
      background-size: contain;
    }
     &.header-download-maingreeny{
      background: url(../assets/images/skin/maingreen/logoby.png) no-repeat;
      background-size: contain;
    }
    &.header-download-golden{
      background: url(../assets/images/skin/golden/logob.png) no-repeat;
      background-size: contain;
    }
    &.header-download-goldeny{
      background: url(../assets/images/skin/golden/logoby.png) no-repeat;
      background-size: contain;
    }
  .close-icon{
      display: block;
      .rem(width,28);
      .rem(height,28);
      background: url('../assets/images/down-close.png')no-repeat;
      background-size: contain;
      .rem(margin-left,22);
      .rem(margin-right,30);
      margin-top: 0.35rem;

  }
  >img{
      width: 56.8%;
  }
  .down-btn{
     display: block;
    .rem(width,150);
    .rem(height,56);
    .rem(line-height,56);
    .rem(margin-right,20);
    //background: url('../assets/images/downBtn.png')no-repeat;
    background: linear-gradient(270deg, #007CFF 0.06%, #4BA1FF 100%);
    background-size: contain;
    margin-top: 0.16rem;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    &.down-btn-pink{
    // background: url('../assets/images/skin/pink/downBtn.png')no-repeat;
      //background-size: contain;
      background: linear-gradient(89.97deg, #FB776B 0.02%, #FFCC67 99.97%);
    }
    &.down-btn-blue{
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%);
      //background: url('../assets/images/skin/blue/downBtn.png')no-repeat;
      //background-size: contain;
    }
    &.down-btn-green{
     // background: url('../assets/images/skin/green/downBtn.png')no-repeat;
      //background-size: contain;
      background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
    }
    &.down-btn-golden{
     // background: url('../assets/images/skin/green/downBtn.png')no-repeat;
      //background-size: contain;
      background: linear-gradient(89.97deg, #ECC965 0.02%, #FFDF91 99.97%);
    }
  }
  
}

</style>