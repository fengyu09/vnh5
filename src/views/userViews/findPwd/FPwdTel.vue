<template>
  <div class="findtel">
     <!-- <x-header
      style="background-color:transparent;z-index: 1001;color:#000"
      :left-options="{showBack: false}"
    >
      <span>密码找回</span>
      <i class="black-back"></i>
      <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
    </x-header> -->
    <div class="logo-box">
        <div class="logo fl"  @click="$router.go(-1) "></div> <div class="fr toRegister"  @click="$router.push('/login')" >Đăng nhập ngay bây giờ</div>
         <div class="logoLogin"> <img src="../../../assets/images/login/logo1.png" alt=""></div>
        <!-- <div class="logoLogin" v-if="noticeType==1"> <img src="../../../assets/images/login/login-logo.png" alt=""></div>
        <div class="logoLogin" v-if="noticeType==2"> <img src="../../../assets/images/login/logo_dl.png" alt=""></div> -->
      </div>
    <div class="form-box" @focusout="inputBlur" @focusin="inputFocus" v-if="first" style="background: #fff;">
       <!-- 解决密码自动填充 -->
		   <input type="number"  placeholder="请输入手机号码"   style="position: absolute;z-index: -9;">
		   <input type="password"  placeholder="Xin vui lòng nhập mật khẩu" style="position: absolute;z-index: -9;" >
		    <!-- 解决密码自动填充 -->
         <div class="inp-box">
           <img src="../../../assets/images/login/username_icon.png" alt="" srcset="">
           <input type="number"  ref="telNumber" v-model="findForm.mobile" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="Vui lòng nhập số điện thoại" oninput="if(value.length>11)value=value.slice(0,11)">
		      <!-- <input type="number" ref="telNumber" v-model="findForm.mobile" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号"> -->
		    </div>
		      <div class="inp-box">
             <img src="../../../assets/images/login/yzm_icon.png" alt="" srcset="">
		          <input type="tel" ref="yzmNumber" v-model="findForm.code" onkeyup="value=value.replace(/[^\d]/g,'')" oninput="if(value.length>4)value=value.slice(0,4)" placeholder="Vui lòng nhập mã xác nhận">
				   <x-button  type="warn" plain :disabled="isSend" style="width:auto;padding:0;height:1.06rem;margin:0;border:none;position: absolute;right: 0.2rem;top:119%;" @click.native="sendCode"><span style="font-size:15px;color:#1A88FF">{{btnText}}</span></x-button>
		      </div>
		     
        <div class="btn-box" style="margin-top:1.5rem">
		      <x-button  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#ff3231), to(#ff7f67));background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);height:1.07rem" @click.native="toNext">{{next}}</x-button>
		   </div>
       <div class="btn-box">
		      <x-button  type="warn" plain style="width:auto; padding:0;height:1.06rem;border:none;" @click.native="goOnline"><span style="font-size:15px;color:#7787A5">客服帮助</span></x-button>
		   </div>
    </div>

    <div class="form-box" @focusout="inputBlur" @focusin="inputFocus"  v-if="!first">
      <div class="inp-box">
         <img src="../../../assets/images/login/pwd_icon.png" alt="" srcset="">
		      <input type="password" ref="newPwdNumber" v-model="findForm.password" autoComplete="new-password"  placeholder="Vui lòng nhập mật khẩu mới">
		    </div>
         <div class="inp-box">
            <img src="../../../assets/images/login/pwd_icon.png" alt="" srcset="">
		      <input type="password" ref="comPwdNumber" v-model="findForm.repeatpwd" autoComplete="new-password"  placeholder="Vui lòng xác nhận mật khẩu mới">
		    </div>
         <div class="btn-box" style="margin-top:1.5rem">
		      <x-button  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#ff3231), to(#ff7f67));background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);height:1.07rem" @click.native="revisePwd">确认修改</x-button>
		   </div>
       <div class="btn-box">
		      <x-button  type="warn" plain style="width:auto; padding:0;height:1.06rem;border:none;" @click.native="goOnline"><span style="font-size:15px;color:#7787A5">客服帮助</span></x-button>
		   </div>
    </div>
    <div class="foot" v-show="footShow">
      <p>登录或Đăng ký即表示您同意 <a @click="$router.push('userAgreement')">《乐购协议》</a></p>
    </div>
    <!--<toast v-model="showPositionValue" type="text" :time="1200" is-show-mask :text="regmsg" position="middle" width="5rem" ></toast>-->
    <!--<loading :show="loadingShow" text=""></loading>-->
  </div>
</template>

<script>
    import { mapState } from "vuex";
export default {
  name: 'FPwdTel',
   components:{
   },
    computed: {
        ...mapState(["webInitData"])
    },
   data(){
     return{
       findForm:{
         mobile:'',
         code:'',
         password:'',
         repeatpwd:'',
       },
       next:"下一步",
       first:true,
        isSend:false,
        btnText:"lấy mã xác minh",
        showPositionValue:false,
        regmsg:'Đăng ký成功',
        loadingShow:false,
       timer:null,
       customer:"",
      footShow:true,
       domHeight:window.innerHeight
     }
   },
   created(){
     // this.getOutLine();
       this.customer = JSON.parse(this.webInitData).customer;
   },
    mounted() {
    window.addEventListener('resize',function(){
     if(this.domHeight==window.innerHeight){
       this.footShow=true
     }else{
        this.footShow=false
     }
    }.bind(this))
  },
   methods:{
     inputBlur(e) {
       // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
       if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
         // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
//         console.log('设置timer')
         this.timer = setTimeout(() => {
//           console.log('timer触发')
           window.scrollTo(0,0);
         }, 0)
       }
     },
     inputFocus(e) {
       // 如果focus，则移除上一个输入框的timer
       if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
         clearTimeout(this.timer);
       }
     },
      sendCode(){
        let d = this.globalPpproach.checkIsEncrypt({
						mode: '3',
						mobile: this.findForm.mobile.replace(/\s*/g,""),
						event:'resetpwd'
					})
            this.isSend=true;
             this.$http.post('/api/validate/check_mobile_exist',d).then(res=>{
                if(res.data.code==1){
//                   this.loadingShow=true;
                  this.$vux.loading.show();
//                console.log(this.findForm.mobile)
                this.$http.post('/api/sms/send',d).then(res=>{
//              console.log(res)
//               this.loadingShow=false;
                  this.$vux.loading.hide();
              if(res.data.code== 1){
//                this.regmsg='验证码已发送',
//                 this.showPositionValue=true;
                this.$vux.toast.hide();
                this.$vux.toast.text('验证码已发送', 'middle')
                  let time=120;
            this.isSend=true;
            var codeTimer= setInterval(()=>{
              this.btnText="Gửi lại("+time--+")";
             if(!time){
               this.isSend=false;
               clearInterval(codeTimer)
               this.btnText="Gửi lại"
             }
           },1000)
              }else{
                 this.isSend=false;
//                 this.regmsg=res.data.msg,
//                 this.showPositionValue=true;
                this.$vux.toast.hide();
                this.$vux.toast.text(res.data.msg, 'middle')

              }
            })
                }else{
                this.isSend=false;
                this.$refs.telNumber.focus();
                  this.$vux.toast.hide();
                this.$vux.toast.text('该手机号还没有Đăng ký', 'middle')
//                this.regmsg="该手机号还没有Đăng ký",
//                this.showPositionValue=true;
                }
              })
          
        },
        toNext(){
            var this_=this
            if(this.findForm.mobile ==""){
              this.$vux.toast.text('手机号不能为空', 'middle');
              return
            } else  if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.findForm.mobile)){
//            this.regmsg='请填写正确的手机号',
//			this.showPositionValue=true;
             this.$vux.toast.hide();
             this.$vux.toast.text('请填写正确的手机号', 'middle')
             this.$refs.telNumber.focus();
            return
         }

         if(this.findForm.code ==''){
           this.$vux.toast.text('验证码是4位数字', 'middle')
            return
         } else {
            this.checkYzm();
           
            
         }
          
          
        },
     async checkYzm(){
      this.next = "Đang xác minh...";
      let d = this.globalPpproach.checkIsEncrypt({
        mobile:this.findForm.mobile,
        captcha: this.findForm.code,
        event:'resetpwd'
      })
      // this.$vux.loading.show({text:'Đang xác minh...'});
      let res = await this.$http.post("/api/sms/check",d);
      if(res && res.data.code==1){
        
        this.first = false;
        this.pwdN = false;
      }else{
        this.$vux.toast.text('验证码输入错误或已过期', 'middle')
        this.next = "下一步";
      }
//      return flag;
    },
        revisePwd(){
      
          // if(/^[0-9][0-9]{3}$/.test(this.findForm.code)){
            if(this.findForm.password.length<6){
//            this.regmsg='Xin vui lòng nhập mật khẩu',
//				    this.showPositionValue=true;
              this.$vux.toast.hide();
              this.$vux.toast.text('Xin vui lòng nhập mật khẩu', 'middle')
            this.$refs.newPwdNumber.focus();
            return
          }
          let d = this.globalPpproach.checkIsEncrypt({
                mobile:this.findForm.mobile,
                type:'mobile',
                captcha:this.findForm.code.toString(),
                newpassword:this.findForm.repeatpwd
              })
            if(this.findForm.password==this.findForm.repeatpwd){
              this.$vux.loading.show();
              this.$http.post('/api/user/resetpwd',d).then(res=>{
                this.$vux.loading.hide();
               if(res.data.code==1){
                   this.$vux.confirm.show({
					 title: '修改成功',
					content: '是否去登录?',
					hideOnBlur:true,
					showCancelButton:false,
					onConfirm :() =>  {
					  this.$router.push('/login')
					}
				  })
               }else{
                 this.$vux.toast.hide();
                 this.$vux.toast.text(res.data.msg, 'middle');
//                this.regmsg=res.data.msg,
//                this.showPositionValue=true;
               }
              })
            }else{
              this.$vux.toast.hide();
              this.$vux.toast.text('Hai mật khẩu không đồng nhất', 'middle');
//            this.regmsg="两次输入密码不一致",
//            this.showPositionValue=true;
            this.$refs.comPwdNumber.focus();
            }
          // }else{
//             this.$vux.toast.hide();
//             this.$vux.toast.text('验证码是4位数字', 'middle');
// //             this.regmsg="验证码是4位数字",
// //             this.showPositionValue=true;
//             this.$refs.yzmNumber.focus();
//           }
        },
           async getOutLine(){
        let res = await this.$http.get(this.versionLive2+'user/jump_to/');
        if(res && res.data.code==1){
          this.customer = res.data.data.customer;
        }
      },
         goOnline(){
        // if(window.webkit){
        //   window.webkit.messageHandlers.needNav.postMessage({
        //     url:this.customer,
        //     name: "在线客服",
        //     backUrl: window.location.href
        //   });
        //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
        // }else if(window.android){
        //   this.alertLL(this.customer,'在线客服');
        // }else{
        //   window.location.href =this.customer
        // }
         window.open(this.customer)

      },
   }
}
</script>

<style  lang="less">
 .rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
    .findtel .vux-header .vux-header-title{color: #000}
    .black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
    .findtel .form-box{
       .rem(padding-left,70);.rem(padding-right,70);.rem(padding-top,30);
        .inp-box{background: #fff;.rem(height,80);;display:flex;position: relative;background: #F6F7FB ;.rem(border-radius,52);.rem(margin-bottom,40);padding: 0 0.37rem;
        img{.rem(width,40);.rem(height,40);margin-top: 0.2rem;margin-right: 0.2rem;}
        
        input{height: 100%;width: 100%;color: #333333;.rem(font-size,32)}
        ::-webkit-input-placeholder {
          color: #7787A5;
        }
        :-moz-placeholder {/* Firefox 18- */
           color: #7787A5;
        }
        ::-moz-placeholder{/* Firefox 19+ */
         color: #7787A5;
        }
        :-ms-input-placeholder {
          color: #7787A5;
        }
        }
    }

    .logo-box{
        text-align: left;    margin-left: 5.6%; margin-right: 5.6%;
        .rem(margin-top,24);.rem(margin-bottom,100);
        .logo{.rem(width,40);.rem(height,54); background: url('../../../assets/images/login/backHome.png')  no-repeat;background-size: 59%;display: inline-block;}
      }
   .logoLogin{
      clear: both;
      text-align: center;
      .rem(padding-top,105);
      img{
        .rem(width,158*2);
      }
    }
 .toRegister{
      .rem(font-size,32);
      font-weight: bold;
    }

         .foot{
   position: fixed;
   bottom: 10px;
   width: 100%;
   text-align: center;
   color: #7787A5;
   font-size: 0.4rem;
   a{
font-size: 0.4rem;
color: #1A88FF;
   }
 }  
</style>
