<template>
    <div class="introduce">
        <div class="load-app" @click="download"></div>
<!--        <div class="gw-h" @click="goHome"></div>-->
        <div class="load-app2" @click="download"></div>
        <div class="gw-h2" @click="goRegister"></div>
        <div class="load-jc" @click="goJc"></div>
        <div class="contact-us" @click="goLine"></div>
    </div>
</template>

<script>
import {getToken} from '../../store/cookie'
    export default {
        name: "introduce",
        data(){
            return{
                customer:'',
                code:''
            }
        },
        created(){
            // this.getOutLine();
            this.customer = JSON.parse(this.$store.state.webInitData).customer;
            // if(this.$store.state.codeToken){
            //     this.getVip();
            // }
        },
        methods:{
            async getInit(){
                let res = await this.$http.get('/api/common/siteConfig',{
                    params:{
                        client:1,
                        version:'3.2.1'
                    }
                });
                if(res){
                    this.customer =res.data.data.customer;
                }
            },
            goHome(){
              this.$router.push('/');
            },
            goLoadApp(){
                this.$router.push('/download');
            },
            goRegister(){
                if(this.noticeType==1){
                    this.$router.push('/register?c='+this.$route.query.market_code)
                }else{
                    this.$router.push('/RegisterDl?c='+this.$route.query.market_code)
                }

            },
            goLine(){
                window.location.href =this.customer;
            },
            goJc(){
                window.open(getToken('loadUriAgent'))
            },
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
                            if(this.$store.state.userinfo.referrer_id==0){
                                // window.open(localStorage.getItem('loadUriIosCjqVip'))
                                window.open(getToken('loadUriIosCjqVip'))
                            }else{
                                // window.open(localStorage.getItem('loadUriIosDl'))
                                window.open(getToken('loadUriIosDl'))
                            }
                            
                        }else{
                            //壳子打包的  需要必填 还得加一个包 现在的都是选填
                             if(this.$store.state.userinfo.referrer_id==0){
                                 window.open(getToken('loadUriH5'))
                            }else{
                                 window.open(getToken('loadUriH5Dl'))
                            }
                           
                        }
                    }else if(this.isPhoneAgent()=='android'){
                       
                        if(this.$store.state.userinfo.referrer_id==0){
                            // window.open(localStorage.getItem('loadUriAndroidGf'));
                             window.open(getToken('loadUriAndroidGf'));
                        }else{
                            // window.open(localStorage.getItem('loadUriAndroidDl'));
                             window.open(getToken('loadUriAndroidDl'));
                        }
                        // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');

                    }
                }else{
                    if(this.isPhoneAgent()=='ios'){
                        window.open(getToken('loadUriH5Dl'))
                    }else if(this.isPhoneAgent()=='android'){
                        // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');
                        window.open(getToken('loadUriAndroidDl'));
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
            async getVip(){
                let res = await this.$http.get(this.versionLive2+"user/VIP_now/", {
                    params: {
                        user_id: this.userinfo.user_id
                    }
                });
                this.$vux.loading.hide();
                if(res.data.data.vip) this.vipDj = res.data.data.vip
            },
            async getOutLine(){
                let res = await this.$http.get(this.versionLive2+'user/jump_to/');
                if(res && res.data.code==1){
                    this.customer = res.data.data.customer;
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .introduce{
        position: fixed;
        width: 100%;
        height: 100%;
        max-width: 750px;
        /*background: url("../../assets/images/register/in_bg.jpg") no-repeat;*/
        background: url("../../assets/images/register/in_bg_dlnew.jpg") no-repeat;
        background-size: cover;
        >div{
            position: absolute;
        }
        .load-app{
            .rem(top,15);
            background: url("../../assets/images/register/load_icon.png") no-repeat;
            background-size: contain;
            .rem(width,140);
            .rem(height,52);
            //.rem(right,150);
            .rem(right,10);
        }
        .gw-h{
            .rem(top,15);
            background: url("../../assets/images/register/home_icon.png") no-repeat;
            background-size: contain;
            .rem(width,128);
            .rem(height,52);
            .rem(right,10);
        }
        .load-app2{
            .rem(top,880);
            background: url("../../assets/images/register/load_1_icon.png") no-repeat;
            background-size: contain;
            .rem(width,315);
            .rem(height,149);
            .rem(left,0);
        }
        .gw-h2{
            .rem(top,880);
            background: url("../../assets/images/register/now_icon.png") no-repeat;
            background-size: contain;
            .rem(width,315);
            .rem(height,149);
            .rem(right,0);
        }
        .load-jc{
            .rem(bottom,130);
            background: url("../../assets/images/register/load_jc_icon.png") no-repeat;
            background-size: contain;
            .rem(width,256);
            .rem(height,75);
            left: 50%;
            transform: translateX(-50%);
        }
        .contact-us{
            .rem(bottom,30);
            background: url("../../assets/images/register/contact_icon.png") no-repeat;
            background-size: contain;
            .rem(width,256);
            .rem(height,75);
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>