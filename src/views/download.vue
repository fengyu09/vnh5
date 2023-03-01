<template>
  <div id="download">
          <header class="home-header clearfix">
                <div @click="goback()" class="back-icon"></div>
          </header>
      <div class="download-bg">
          <a v-if="isAn" class="back-icon" @click="$router.go(-1)" style=" z-index: 10000001;">
              <img src="../assets/images/white-back-icon.png" alt="">
          </a>
          <div class="btn-box">
              <img class="btn-download"  @click="download" src="../assets/images/download/download_icon.png" alt="" >
              <span  @click="jcDownload()"> <img class="btn-pic jc" src="../assets/images/download/jc.png" alt=""></span>
              <span @click="goOnline()"> <img class="btn-pic contact"  src="../assets/images/download/contact.png" alt=""></span>
          </div>


      </div>
  </div>
</template>

<script>
    import { mapState } from "vuex";
    import { getToken } from '../store/cookie';
export default {
name:"download",
  data(){
    return{
        isAn:false,
        customer:'',
        vipDj:''
    }
  },
  created(){
    if(window.android) this.isAn = true
    else this.isAn = false,
        // this.getOutLine();
    this.customer = JSON.parse(this.$store.state.webInitData).customer;
    // if(this.$store.state.codeToken){
    //     this.getVip();
    // }
  },
    computed: {
        ...mapState(["userinfo"])
    },
methods:{
    downloadApp(){
          if(window.webkit){
            window.webkit.messageHandlers.needNav.postMessage({
              url:'https://www.lgapp8.com/?isOpen=123',
              name:'App下载',
              backUrl:window.location.href
            });
          }else{
            window.location.href = "https://www.lgapp8.com/";
          }
    },
    downLoadUrl(url){
        android.posturl(url)
    },
    // async getVip(){
    //   let res = await this.$http.get(this.versionLive2+"user/VIP_now/", {
    //             params: {
    //                 user_id: this.userinfo.user_id
    //             }
    //         });
    //         this.$vux.loading.hide();
    //         if(res.data.data.vip) this.vipDj = res.data.data.vip
    // },
    download(){
        if(this.$store.state.codeToken){
            this.$vux.loading.show({text: 'Đang chạy...'});
            // let res = await this.$http.get(this.versionLive2+"user/VIP_now/", {
            //     params: {
            //         user_id: this.userinfo.user_id
            //     }
            // });
            this.$vux.loading.hide();
            // if(res.data.data.vip) this.vipDj = res.data.data.vip
            if(this.isPhoneAgent()=='ios'){
                //判断是否是vip
                if(this.$store.state.userinfo.vip>0||this.$store.state.userinfo.noble>0){
                    if(this.userinfo.referrer_id==0){
                        window.open(getToken('loadUriIosCjqVip'))
                    }else{
                        window.open(getToken('loadUriIosDl'))
                    }
                }else{
                    //壳子打包的
                    if(this.userinfo.referrer_id==0){
                        window.open(getToken('loadUriH5'))
                    }else{
                        window.open(getToken('loadUriH5Dl'))
                    }
                    // window.open(localStorage.getItem('loadUriH5'))
                }
            }else if(this.isPhoneAgent()=='android'){
                if(this.userinfo.referrer_id==0){
                    window.open(getToken('loadUriAndroidGf'));
                }else{
                    window.open(getToken('loadUriAndroidDl'));
                }
                // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');

            }
        }else{
            if(this.isPhoneAgent()=='ios'){
                window.open(getToken('loadUriH5'))
            }else if(this.isPhoneAgent()=='android'){
                // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');
                window.open(getToken('loadUriAndroidGf'));
            }
        }



      // if(window.android){
      //   this.downLoadUrl('https://www.lgapp8.com/assets/lgzb/lgzb.apk');
      // }else{
      //   var u = navigator.userAgent;
      //   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //   if(isiOS){
      //     var number = Math.floor(Math.random()*9);
      //     var url = 'https://gf00'+number+'.lgzbapp0.com/udidget.mobileconfig';
      //     window.location.href = url;
      //   }else if(isAndroid)
      //   {
      //     var url = 'https://www.lgapp8.com/assets/lgzb/lgzb.apk';
      //     window.location.href = url;
      //   }
      // }

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
    jcDownload(){
        if(this.$store.state.codeToken){
            if(this.userinfo.referrer_id==0){
                // console.log(this.userinfo.referrer_id);
                window.open(getToken('loadUriAffical'))
            }else{
                window.open(getToken('loadUriAgent'))
            }
        }else{
            window.open(getToken('loadUriAffical'))
        }
        // window.location.href = 'https://lgapp777.com/';


    },
    async getOutLine() {
        let res = await this.$http.get(this.versionLive2+"user/jump_to/");
        if (res && res.data.code == 1) {
            this.customer = res.data.data.customer;
        }
    },
    goOnline(){
        //console.log(this.customer);
        // if (window.webkit) {
        //     window.webkit.messageHandlers.needNav.postMessage({
        //         url: this.customer,
        //         name: "在线客服",
        //         backUrl: window.location.href
        //     });
        // } else if (window.android) {
        //     this.alertLL(this.customer, "在线客服");
        // } else {
        //     window.location.href = this.customer;
        // }
        window.location.href = this.customer;
    },
    goback(){
        this.$router.go(-1);
    },


}
}
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
#download{
   .download-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 750px;
    left: 50%;
    transform: translateX(-50%);
    background: url('../assets/images/download/bg.jpg') no-repeat center;background-size:cover;
   .btn-box{
       width: 100%;
       text-align: center;
       position: absolute;
       bottom: 6%;
       z-index: 99;
       .btn-download{
           display: inline-block;
           width:62.4%;
           -webkit-touch-callout: inherit!important;
           pointer-events: inherit!important;
           .rem(margin-bottom,79);
       }
        .btn-pic{
            display: block;
            .rem(width,256);
            .rem(height,75);
            margin: 0 auto;
            &.contact{
                .rem(margin-top,33);
            }
        }
   }

   .back-icon{
       width: 1rem;
       display: block;
       margin: .2rem;
       height: 1.2rem;
       display: none;
       img{
           width: 30%;
       }
   }
   }
}
    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        position: relative;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
        .search-icon {
            position: absolute;
            right: .3rem;
            width: 1.2rem;
            height: 1.2rem;
            display: inline-block;
            background: url("../assets/images/main/home_icon_07.png") no-repeat center right;
            background-size: 45%;
        }
    }
</style>