<template>
    <div class="loginConfirm" :class="$st.state.skin==5?'saoma-golden':''">
         <x-header
              style=""
              title="银行卡转账"
              :left-options="{showBack: false}"
              class="x-header"
            >
              <span style="">{{$t('loginConfirm.text[0]')}}</span>
              <i class="black-back"></i>
              <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.push('/member')"></div>
         </x-header>
         <div class="content">
             <div class="logo">
                 <img v-if="$st.state.skin!=5" src="../../assets/images/login/login-logo2.png" alt="">
                 <img v-if="$st.state.skin==5" src="../../assets/images/login/login-logo2-golden.png" alt="">
             </div>
             <div class="login-text" :class="skin==5?'golden-color':''">
                 <h2 >{{$t('loginConfirm.text[1]')}}</h2>
                 <p>{{codeData}}</p>
             </div>
             <div class="login-btn">
                <div class="confirm" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]" @click="confirmLogin"><span>{{$t('loginConfirm.text[2]')}}</span></div>
                <div  @click="$router.push('/member')" :class="skin==5?'golden-text-color':''"><span>{{$t('loginConfirm.text[3]')}}</span></div>
             </div>
         </div>
         <div class="sm-box" v-show="showSm">
             <div style="position: absolute;padding: 4px 8px;top: 0.3rem;left: 0.1rem;z-index:999" @click="$router.push('/member')"> <i class="back"></i> </div>
             <div class="sm-describe">
                 <p>{{$t('loginConfirm.text[4]')}}</p>
                 <p style="font-size:0.5rem;color:#FF3131">{{smUrl}}</p>
                 <p>{{$t('loginConfirm.text[5]')}}</p>
             </div>
             <div style="height:100%">
                  <qrcode-stream v-if="isqrcode" @decode="onDecode" @init="onInit" style="height:6rem;width:6rem;position: absolute;left:50%;top:50%;transform: translate(-50%, -50%);" />
             </div>
         </div>
         <div class="guoqi" v-show="tsShow">
             <div class="ts-close" @click="tsShow=false;isqrcode=true"><img src="../../assets/images/down-close.png" alt="" style="width:0.32rem"></div>
             <img src="../../assets/images/login/sm_ts.png" alt="" style="width:2.66rem">
             <div class="ts-text">
                 <p>{{$t('loginConfirm.text[6]')}} <span style="color:#FF3131">{{$t('loginConfirm.text[7]')}}</span> {{$t('loginConfirm.text[8]')}}</p>
             </div>
         </div>
    </div>
</template>
<script>
 import { QrcodeStream } from 'vue-qrcode-reader';
 import { mapState, mapMutations } from "vuex";
export default {
    name:'loginConfirm',
    data(){
        return{
            result: '11111111',//扫码结果信息
            error: '',//错误信息,
            isqrcode:false,
            showSm:true,
            codeData:'',
            tsShow:false,
            smUrl:''
        }
    },
    components: { QrcodeStream },
    computed: {
    ...mapState(["webInitData","lanCode","skin"])
    },
    created(){
          this.smUrl = JSON.parse(this.$store.state.webInitData).qr_url
    },
    mounted(){
          setTimeout(()=>{
            this.isqrcode=true
          },1000)
         
         
        },
    methods:{
        confirmLogin(){
             let d = this.globalPpproach.checkIsEncrypt({
                qrid:this.result
            })
              this.$http.post('/api/user/scan',d).then(res=>{
                    if(res&&res.data.code==1){
                        this.$vux.toast.text(res.data.msg, 'middle')
                        this.$router.push('/member')
                        // this.codeData=res
                    }
                    else{
                        this.$vux.toast.text(res.data.msg, 'middle')
                    }
                })
        },
         onDecode (result) {
             if(result){
                this.result = result.substring(result.lastIndexOf("\=")+1,result.length)
                // this.result=result
                this.getPolling()
             }
        },
        getPolling(){
				this.$http.get('/api/user/polling?qrid='+this.result).then(res=>{
					if(res&&res.data.code!=0){
                            this.tsShow=true
                            this.isqrcode=false
					}else{
                        this.showSm=false
                    }
				})
			},
            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    if(this.lanCode==2||this.lanCode==5){
                        alert('Your browser does not support this operation, please use the browser that came with your phone to try again.')
                    }else if(this.lanCode==1){
                        alert('Trình duyệt của bạn không hỗ trợ thao tác này, vui lòng sử dụng trình duyệt đi kèm với điện thoại của bạn để thao tác lại')
                    }
                    
                   
                }
            },
    }
}
</script>
<style lang="less" scoped>
.loginConfirm{
    .guoqi{
        width: 7.33rem;
        height:5.6rem ;
        background:#FFFFFF;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 100;
        border-radius: 0.2rem;
        text-align: center;
        >img{margin-top: 0.8rem;}
        .ts-text{font-size:0.42rem;margin-top: 0.5rem;}
        .ts-close{
            position: absolute;
            padding: 0.1rem 0.15rem;
            top: 0.2rem;
            right: 0.2rem;
        }
    }
    .sm-box{
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    background: #1d1c1c;
    z-index: 99;
    .back{
    display: block;
    width: 12px;
    height: 20px;
    background: url('../../assets/images/white-back-icon.png') no-repeat;
    background-size: 100% 100%;
    }
    .sm-describe{
        padding-top: 1rem;
        text-align: center;
        color: #fff;
        font-size: 0.42rem;
        p{
            line-height: 0.62rem;
        }
    }
    }
    .black-back {
    display: block;
    width: 12px;
    height: 20px;
    position: absolute;
    background: #ccc;
    top: 12px;
    left: 12px;
    background:  url('../../assets/images/withdrawals/fanhui.png') no-repeat;
    background-size: 100% 100%;
}
    .content{
         text-align: center;
        .logo{
            text-align: center;
            img{width: 4.8rem;}
            margin: 2.2rem 0 1.8rem 0;
        }
        .login-text{
            margin-bottom: 1.8rem;
            h2{
                letter-spacing:1px
            }
        }
        .login-btn{
            font-size: 0.32rem;
            color: #666666;
            padding: 0 0.84rem;
            div{
                height: 1.06rem;line-height: 1.06rem;text-align: center;
            }
            .confirm{background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);border-radius: 0.5rem;color: #FFFFFF;margin-bottom: 0.2rem;}
        }
    }
    .x-header{
      background-color:transparent;z-index: 9;color:#000;
      span{
        color:#333333
      }
    }
}
.saoma-golden{
    background: #464B53!important;
    padding-bottom: 10rem!important;
    .x-header{
        background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%)!important;
        .black-back{
            background:  url('../../assets/images/skin/golden/goBack.png') no-repeat!important;
            background-size: 100% 100%!important;
        }
        span{
          color: #E3CF95!important;
        }
    }
}
</style>