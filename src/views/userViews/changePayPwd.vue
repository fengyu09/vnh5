<template>
    <div class="setPay-container" :class="$st.state.skin==5?'paypwd-golden':''">
        <header class="other-header setPay-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
            <a class="back-icon" @click="$router.go(-1)" style="z-index: 10000001;">
                <img v-if="skin!=5" src="../../assets/images/gray-back-icon.png" alt="">
                <img v-if="skin==5" src="../../assets/images/skin/golden/goBack.png" alt="">
            </a>
            <span> {{$t('changePayPwd.text[0]')}}</span>
        </header>
        <div class="setPay-content">
            <h3 :class="$st.state.skin==5?'golden-color':''">{{tipText}}</h3>

            <div class="pwd-box" v-show="isComfirm==1">
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
            </div>

            <div class="pwd-box pwd-re-box" v-show="isComfirm==2">
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
            </div>

            <div class="pwd-box pwd-comfirm-box"  v-show="isComfirm==3">
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
                <span><i></i></span>
            </div>

            <!--验证提示-->
            <p class="error-tip" v-if="showTimeTip">{{$t('changePayPwd.text[1]')}} ({{changeTime}}) {{$t('changePayPwd.text[2]')}}</p>
            <p class="error-tip" v-if="showTip2">{{$t('changePayPwd.text[3]')}}</p>
            <p class="error-tip" v-if="showTip">{{$t('changePayPwd.text[4]')}} </p>

        </div>

        <!--修改成功-->
        <div class="success-box-container" v-if="isSuccess">
            <div class="success-box">
                <img src="../../assets/images/member/tick-icon.png" alt="">
                <span>{{$t('changePayPwd.text[5]')}}！</span>
            </div>
        </div>



        <!--键盘-->
        <div class="key-box">
            <div class="key-item">
                <span class="num" @click="changeNum(1)">1</span>
                <span class="num" @click="changeNum(2)">2</span>
                <span class="num" @click="changeNum(3)">3</span>
            </div>
            <div class="key-item">
                <span class="num" @click="changeNum(4)">4</span>
                <span class="num" @click="changeNum(5)">5</span>
                <span class="num" @click="changeNum(6)">6</span>
            </div>
            <div class="key-item">
                <span class="num" @click="changeNum(7)">7</span>
                <span class="num" @click="changeNum(8)">8</span>
                <span class="num" @click="changeNum(9)">9</span>
            </div>
            <div class="key-item">
                <span class="num zoro" @click="changeNum(0)">0</span>
                <span class="delete-icon" @click="deleteNum">
                <img v-if="skin!=5" src="../../assets/images/delete.png" alt="">
                <img v-if="skin==5" src="../../assets/images/skin/golden/delete.png" alt="">
                </span>
            </div>
        </div>





    </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    name: 'changePayPwd',
    data(){
      return{
        payPwd:'',//旧密码
        payRePwd:'',//新密码
        payConfirmPwd:'',//确认新密码
        tipText:this.$t('changePayPwd.text[6]'),
        isComfirm:1,// 显示输入密码1  显示确认密码2
        showTip:false,//验证错误提示
        showTip2:false,//新密码与旧密码不能一样
        isSuccess:false,
        showTimeTip:false,//输入的次数  如果第一次输入失败  那么就提示还有多少次机会  一共4次机会
        changeTime:'',
      }
    },
    computed: {
    ...mapState(["webInitData","skin","userinfo"])
  },
    watch:{
      payPwd:function (n,o) {
        if((n+'').length==7){
          this.payPwd = o;
        }else if(n.length<7){
          if(n.length>o.length){
            if(document.querySelectorAll('.pwd-box i')[n.length-1]) document.querySelectorAll('.pwd-box i')[n.length-1].classList.add('active');
          }else{
            if(document.querySelectorAll('.pwd-box i')[n.length]) document.querySelectorAll('.pwd-box i')[n.length].classList.remove('active');
          }
          if(n.length==6){
            setTimeout(()=>{
              //验证是否密码是否正确
              this.checkOldPwd();
              return
            },50)
          }
        }
      },
      payRePwd:function (n,o) {
        if((n+'').length==7){
          this.payRePwd = o;
        }else if(n.length<7){
          if(n.length>o.length){
            if(document.querySelectorAll('.pwd-re-box i')[n.length-1]) document.querySelectorAll('.pwd-re-box i')[n.length-1].classList.add('active');
          }else{
            if(document.querySelectorAll('.pwd-re-box i')[n.length]) document.querySelectorAll('.pwd-re-box i')[n.length].classList.remove('active');
          }
          if(n.length==6){
            //检测旧密码与新密码是否一致
            if(this.payPwd == n){
              setTimeout(()=>{
                this.showTip2 = true;
                //清空
                this.payRePwd = "";
                this.clearActive();
              },50)

            }else{
              setTimeout(()=>{
                this.showTip2 = false;
                this.tipText=this.$t('changePayPwd.text[7]');
                this.isComfirm = 3;
              },50)
            }

          }
        }
      },
      payConfirmPwd:function (n,o) {
        if((n+'').length==7){
          this.payConfirmPwd = o;
        }else if(n.length<7){
          if(n.length>o.length){
            if(document.querySelectorAll('.pwd-comfirm-box i')[n.length-1]) document.querySelectorAll('.pwd-comfirm-box i')[n.length-1].classList.add('active');
          }else{
            if(document.querySelectorAll('.pwd-comfirm-box i')[n.length]) document.querySelectorAll('.pwd-comfirm-box i')[n.length].classList.remove('active');
          }
          if(n.length==6){
            //验证两次密码是否正确
            if(this.payRePwd != n) {
              setTimeout(()=> {
                this.showTip = true;
                this.payConfirmPwd = "";
                this.clearActive();
              },50)
            }else{
              //修改
              this.showTip = false;
              this.updatePwd();
            }

          }
        }
      }
    },
    mounted(){
//      this.$refs.passwordBox.focus();
    },
    methods:{
      ...mapMutations(["SETSAFEPWD"]),
      async updatePwd(){
        this.$vux.loading.show({text:'Đang nhận...'});
         let d = this.globalPpproach.checkIsEncrypt({oldpassword:this.payPwd,newpassword:this.payRePwd})
        let res = await this.$http.post("/api/user/resetfundpwd",d);
        this.$vux.loading.hide();
        if(res && res.data.code==1){
          this.$http.post('/nodeapi/setPayPwd/',{
                  id:this.userinfo.id,
                  txpwd:this.payRePwd,
                  username:this.userinfo.username
                }).then(res1=>{})
          //修改成功
          this.isSuccess = true;
          setTimeout(()=>{
            this.$router.push('/setting')
          },2000)
        }else if(res && res.data.code==1013){
          this.$publicPop({
              title: "",
              content: this.$t('changePayPwd.text[8]'),
              confirmText: this.$t('changePayPwd.text[9]'),
              clickCancel: () => {
                 this.$router.push({name:'setting'});
              },
              clickConfirm: () => {
                   this.clearActive();
                  this.isComfirm = 2;
                  this.tipText = this.$t('changePayPwd.text[10]');
                  this.payRePwd="";
                  this.payConfirmPwd="";
              }
          });
         
        }else if(res &&res.data.code==1012){
          this.SETSAFEPWD(10);
          //冻结账户判断
          this.$publicPop({
              title:  this.$t('changePayPwd.text[11]'),
              content:  this.$t('changePayPwd.text[12]'),
              confirmText:this.$t('changePayPwd.text[13]'),
              clickCancel: () => {
                 this.$router.push({name:'setting'});
              },
              clickConfirm: () => {
                   this.goOnline();
              }
          });
         
        }else if(res){ //其他错误

          this.$publicPop({
              title: "",
              content: res.data.msg,
              clickCancel: () => {
                 this.$router.push({name:'setting'});
              },
              clickConfirm: () => {
                 this.$router.push('/setting')
              }
          });



        }
      },
      alertLL(url,title){
        android.show(url,title)
      },
      goOnline(){
       
        window.open(JSON.parse(this.webInitData).customer)
      },
      clearActive(){
        let allA = document.querySelectorAll('.pwd-box i');
        for(let i=0,len=allA.length;i<len;i++){
          allA[i].classList.remove('active')
        }
      },
      //检查旧密码
      async checkOldPwd(){
        this.$vux.loading.show({text:'Đang xác minh...'});
        let d = this.globalPpproach.checkIsEncrypt({password:this.payPwd})
        let res = await this.$http.post('/api/user/chkfundpwd',d);
        this.$vux.loading.hide();
        if(res && res.data.code==1){
          //输入新密码
          this.tipText=this.$t('changePayPwd.text[10]');
          this.isComfirm = 2;
          this.showTimeTip = false;
        }else if(res && res.data.code==1002){
            this.changeTime = res.data.data.remain_times;
            if(this.changeTime==0){
              this.showTimeTip = false;
              this.SETSAFEPWD(10);
              //冻结账户判断
              this.$publicPop({
                title: this.$t('changePayPwd.text[11]'),
                content: this.$t('changePayPwd.text[12]'),
                confirmText:this.$t('changePayPwd.text[13]'),
                clickCancel: () => {
                  this.isKey = false;
                  this.payPwd = "";
                  this.clearActive();
                  this.zsMoney = "";
                },
                clickConfirm: () => {
                  this.goOnline();
                }
            });


            }else{
              //提示剩下的机会
              this.showTimeTip = true;
            }
           this.payPwd = "";//错误清空
           this.clearActive();//错误清空
        }else if(res &&res.data.code==1012){
          this.SETSAFEPWD(10);
          //冻结账户判断

          this.$publicPop({
                title:  this.$t('changePayPwd.text[11]'),
                content: this.$t('changePayPwd.text[12]'),
                confirmText:this.$t('changePayPwd.text[13]'),
                clickCancel: () => {
                  this.$router.push({name:'setting'});
                },
                clickConfirm: () => {
                  this.goOnline();
                }
            });



        }else if(res && res.data.code==1003){
          //新旧密码不能一致
           this.$publicPop({
                title: "",
                content: this.$t('changePayPwd.text[3]'),
                confirmText:this.$t('changePayPwd.text[9]'),
                clickCancel: () => {
                  this.$router.push({name:'setting'});
                },
                clickConfirm: () => {
                   this.clearActive();
                  this.isComfirm = 2;
                  this.tipText = this.$t('changePayPwd.text[10]');
                  this.payRePwd="";
                }
            });

         
        }else{
          this.$vux.toast.text(res.data.msg, 'middle');
        }
      },
      changeNum(n){
        //先判断几个 长度大于6 return
        if(this.isComfirm==1){ //旧密码
          if(this.payPwd.length>6) return;
          this.payPwd+=n;
        }else if(this.isComfirm==2){ //新密码
          if(this.payRePwd.length>6) return;
          this.payRePwd+=n;
        }else if(this.isComfirm==3){ //确认新密码
          if(this.payConfirmPwd.length>6) return;
          this.payConfirmPwd+=n;
        }
      },
      deleteNum(){
        if(this.isComfirm==1){ //旧密码
          this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
        }else if(this.isComfirm==2){ //新密码
//          console.log(23)
          this.payRePwd = this.payRePwd.substring(0, this.payRePwd.length - 1);
        }else if(this.isComfirm==3){ //确认新密码
          this.payConfirmPwd = this.payConfirmPwd.substring(0, this.payConfirmPwd.length - 1);
        }
      }
    }
  }
</script>

<style scoped lang="less">
    .setPay-header{
        color: #445779;
    }
    .setPay-content{
        >h3{
            font-size: .42rem;
            text-align: center;
            font-weight: bold;
            padding:2.4rem 0 1.35rem 0;
        }
        .pwd-box,.pwd-re-box,.pwd-comfirm-box{
            text-align: center;
            >span{
                display: inline-block;
                border-radius: 5px;
                width: 1rem;
                height: 1rem;
                background: #f5f5f5;
                margin-right: .4rem;
                i{
                    width: .26rem;
                    height: .26rem;
                    background: #f5f5f5;
                    border-radius: 60%;
                    display: inline-block;
                    margin-top: .35rem;
                }
                i.active{
                    background: #666;
                }
                &:last-of-type{
                    margin: 0;
                }
            }
        }
        .error-tip{
            color: #FF513E;
            font-weight: 500;
            font-size: .3rem;
            padding: 0.65rem .8rem;;
        }
        .pwd-input{
            color: #fff;
        }
    }
    .success-box-container{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
        left: 0;
        top: 0;
        z-index: 5;
        .success-box{
            background: #fff;
            border-radius: 10px;
            margin: 60% auto 0;
            text-align: center;
            font-size: .38rem;
            font-weight: bold;
            width: 59.2%;
            padding: .5rem 0;
            img{
                width: 1.05rem;
                height: 1.05rem;
                vertical-align: middle;
                margin: 0 .1rem;
            }
        }
    }
    .paypwd-golden{
      background: #161C23!important;
      padding-bottom: 10rem!important;
      .pwd-box>span{
        background: #464B53!important;
        i{
          background: #464B53!important;
          &.active{
            background: #f5f5f5!important;
          }
        }
      }
      .key-box{
        background: #161C23!important;
        .num{
          background: #D9D9D9!important;
        }
      }
      
    }

</style>
