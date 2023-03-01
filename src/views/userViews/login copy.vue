<template>
  <div class="login">
      <!-- app下载弹窗 -->
      <div class="download-box" v-if="isDLoad">
          <div class="download">
              <p>升级VIP会员，下载超级签app，更多惊喜等你来发现！</p>
              <p style="text-align: right;">
                  <span @click="cancelcjq">取消</span>
                  <span @click="isDL">确认</span>
              </p>
          </div>
      </div>
    
    <div class="logo-box">
      <div class="logo fl"  @click="$router.push('/')"></div>
        <div class="fr toRegister" v-if="noticeType==1" @click="$router.push('/register')" >Đăng ký ngay</div>
        <div class="fr toRegister" v-if="noticeType==2" @click="$router.push('/RegisterDl')" >Đăng ký ngay</div>
      <div class="logoLogin"> 
        <img  v-if="noticeType == 1&& skin ==0" src="../../assets/images/login/logo2.png" alt="">
        <img  v-if="noticeType == 1&& skin ==1" src="../../assets/images/login/logo2-pink.png" alt="">
        <img  v-if="noticeType == 1&& skin ==2" src="../../assets/images/login/logo2-blue.png" alt="">
        <img  v-if="noticeType == 1&& skin ==3" src="../../assets/images/login/logo2-green.png" alt="">
        <img  v-if="noticeType == 2&&skin==0" src="../../assets/images/login/logo1.png" alt="">
        <img  v-if="noticeType == 2&&skin==1" src="../../assets/images/login/logo1-pink.png" alt="">
        <img  v-if="noticeType == 2&&skin==2" src="../../assets/images/login/logo1-blue.png" alt="">
        <img  v-if="noticeType == 2&&skin==3" src="../../assets/images/login/logo1-green.png" alt="">
        </div>
     
    </div>
    
     <div class="form-box" style="position:relative" @focusout="inputBlur" @focusin="inputFocus">
      <!-- 解决密码自动填充 -->
       <input type="text"  placeholder="Vui lòng nhập số điện thoại"  style="position: absolute;top: 0.8rem;left: 1.8rem;z-index: -9;">
       <input type="text"  placeholder="Xin vui lòng nhập mật khẩu" style="position: absolute;top: 0.8rem;left: 1.8rem;z-index: -9;" >
        <!-- 解决密码自动填充 -->
      <div class="iphreg" v-if="loginType">
        <div class="inp-box phone">
          <img src="../../assets/images/login/username_icon.png" alt="" srcset="">
          <input type="text" ref="iphregTel" v-model="loginForm.mobile"  placeholder="Vui lòng nhập Tên người dùng">
        </div>
      
          <div class="inp-box safe" style="position: relative;">
             <img src="../../assets/images/login/yzm_icon.png" alt="" srcset="">
              <input type="text" ref="iphregYzm" v-model="loginForm.code" placeholder="Xin vui lòng nhập mật khẩu"  >
               <x-button  type="warn" plain :disabled="isSend" style="width:auto;padding:0;height:1.06rem;margin:0;border:none;position: absolute;right: 0.2rem;top:119%;" @click.native="sendCode"><span style="font-size:15px;color:#1A88FF">{{btnText}}</span></x-button>
          </div>
       
      </div>
      <div class="account" v-else >
          <div class="inp-box phone">
            <img src="../../assets/images/login/username_icon.png" alt="" srcset="">
            <input type="text" ref="TelInput" v-model="loginForm.mobile"  placeholder="Vui lòng nhập Tên người dùng">
          </div>
         <div class="inp-box lock">
           <img src="../../assets/images/login/pwd_icon.png" alt="" srcset="">
          <input type="password"   ref="PwdInput" v-model="loginForm.password"  placeholder="Xin vui lòng nhập mật khẩu"  style="padding-right:1.5rem">
         

           <x-button  type="warn" plain :disabled="isSend" style="width:auto;padding:0;height:1.06rem;margin:0;border:none;position: absolute;right: 0.2rem;top:119%;" @click.native="openServe()"><span :class="[{'pink-color':skin==1},{'green-color':skin==3},{'blue-color':skin==2}]" style="font-size:14px;color:#1A88FF">quên mật khẩu？</span></x-button>
         </div>
      </div>
       <div class="RememberPSW clearfix">
         <i class="fl" :class="remember == true ?'active':''" @click="remember = !remember"> <img v-if="remember" src="../../assets/images/login/jzmm.png" alt="" srcset=""> </i>
         <span class="fl">Ghi nhớ tài khoản</span>
       </div>
       <div class="btn-box" style="margin-top:0.5rem">
          <x-button :class="[{'skin-btn-blue':skin==2},{'skin-btn-green':skin==3},{'skin-btn-pink':skin==1}]"  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#1486FF), to(#4BA1FF));background: linear-gradient(to right, #1486FF, #4BA1FF);height:1.07rem" @click.native="doLogin">Đăng nhập</x-button>
          <x-button  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#ff3231), to(#ff7f67));background: #eee;height:1.07rem;border:none;color:#7787A5;" @click.native="doPlay">Chơi thử</x-button>
          
       </div>
       <div class="change-box">
        
        
       </div>
    </div>
    


<div class="foot" v-show="footShow">
      <p> <a :class="[{'pink-color':skin==1},{'green-color':skin==3},{'blue-color':skin==2}]" @click="$router.push('userAgreement')">Đăng nhập và thỏa thuận đăng ký</a></p>
    </div>
  </div>
</template>

<script>
import {
} from "vux";
import { mapMutations, mapState } from "vuex";
import {getToken} from '../../store/cookie'
export default {
  name: "login",
  components: {
  },
  created() {
        this.SETUSERNAME("");
        this.SETUSERTOKEN("");
        this.SETPIC("");
        this.SETUSERINFO("");
        this.SETUSER_TYPE("");
        this.SETISDECIPHER("");
        if(this.remPSW){
          this.loginForm.mobile = this.remPSW.mobile;
          this.loginForm.password = this.remPSW.password;
          this.remember = true;
        }
        // console.log(this.remPSW)
  },
  data: function() {
    return {
      // 登录表单
      loginForm: {
        username: "",
        password: "",
        mobile: "",
        code: "",
        email: ""
      },
      loginType:0,
      mode: "1",// 登录方式
      isSend: false,// 验证码发送
      btnText: "lấy mã xác minh",
      modeData: [
        {
          key: "1",
          value: "账号密码"
        },
        {
          key: "2",
          value: "邮箱"
        },
        {
          key: "3",
          value: "手机号"
        }
      ],
      showPositionValue: false,
      regmsg: "登录成功",
      loadingShow:false,
      timer:null,
      footShow:true,
      domHeight:window.innerHeight,
        lastRoute:'',
        isDLoad:false,
        vipDj:'',
        isGf:false,
        remember:false
    };
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
  beforeRouteEnter(to, from, next) {
        next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
//                console.log(to)
//                console.log(from)
            vm.lastRoute = from.name;
        })
    },
  computed: {
    ...mapState(["skin","remPSW","customer"])  
  },
  methods: {
    ...mapMutations(["SETUSERNAME", "SETUSERTOKEN", "SETPIC","SETUSERINFO","SETUSER_TYPE","SETISDECIPHER","SETISTYPE","GETISYUE","SETWEBDATA","SETHOMENAV","SETDIAMOND","SETSKINDATA","SETREMPSW","SETISNOTICE"]),
    openServe(){
      window.open(this.customer)
    },
     
      cancelcjq(){
          this.isDLoad = false;
          this.goLast();
      },
      goLast(){
          setTimeout(()=>{
              this.$router.go(-1);
          },500)
      },
      //是否安卓
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
      isDL(){
          //判断是否是代理还是官方
          if(this.$store.state.userinfo.vip>0||this.$store.state.userinfo.noble>0){
              if(this.isGf==0){
                  //会员 官方
                  location.href = getToken('loadUriIosCjqVip');
              }else{
                  //会员 非官方
                  window.open(getToken('loadUriIosDl'));
                  location.href = getToken('loadUriIosDl');
              }
          }else {
              //非会员
              location.href = getToken('loadUriH5');
          }
          this.goLast();
      },
      //试玩
      doPlay(){
        this.$vux.loading.show();
        let d = this.globalPpproach.checkIsEncrypt({
            client_type:'1',
              ip:window.sessionStorage.getItem('ip')
             })
              // {
            // datas:this.encrypt({ 
            //   client_type:'1',
            //   ip:window.sessionStorage.getItem('ip'),},true)
            // }
        this.$http.post("/api/user/guestlogin", d)
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.code == 1) {
              this.SETUSERINFO(res.data.data);
              this.SETUSERNAME(res.data.data.nickname);
              this.SETPIC(res.data.data.avatar);
              let decryptData= this.decrypt(res.data.encryption,false)
              this.setInfo(res,decryptData,true);
              this.$router.push('/')
            } else {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
          });
      },
    doLogincss(){
      let res={data:{
  "code": 1,
  "msg": "Đăng nhập thành công",
  "time": "1641392399",
  "data": {
    "id": 8,
    "username": "aaoz",
    "nickname": "aaoz",
    "mobile": "13234567891",
    "avatar": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxMDAiIHdpZHRoPSIxMDAiPjxyZWN0IGZpbGw9InJnYigyMjksMjI5LDE2MCkiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48L3JlY3Q+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjUwIiB0ZXh0LWNvcHk9ImZhc3QiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHRleHQtcmlnaHRzPSJhZG1pbiIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiPkE8L3RleHQ+PC9zdmc+",
    "vip": 0,
    "gender": 0,
    "bio": "",
    "user_type": 0,
    "user_id": 8,
    "language": "vi-vn",
    "client_type": 4,
    "ip": "182.146.242.34",
    "status": 10,
    "createtime": 1641392405,
    "expiretime": 1643984405,
    "expires_in": 2591999,
    "unique_id": 100008,
    "watch_nums": 3,
    "win_rate": 0
  },
  "encryption": "CojmO5Mzsh/HO3foJRFr2b2r5jVXsoDKYMwF7ii+vNIDEq1oIq9c/EDSa3IohOQQtdHXRITwKA4OlRe8tCuvRAa0dNUrW30Sa9GCCJFXf14="
}}
      let decryptData= this.decrypt(res.data.encryption,false)
              this.setInfo(res,decryptData)
      this.setInfo()
    },
    doLogin() {
        this.$vux.loading.show();
        this.$vux.loading.hide();
       if(!this.loginForm.mobile){

            this.$vux.toast.hide();
            this.$vux.toast.text('Vui lòng nhập Tên người dùng', 'middle')
            this.$refs.TelInput.focus();
            this.$refs.iphregTel.focus();
            return
         }
      // 账号密码登录
      if (this.loginType == 0) {
         if(!this.loginForm.password){
           this.$vux.toast.hide();
           this.$vux.toast.text('Xin vui lòng nhập mật khẩu', 'middle')
            this.$refs.PwdInput.focus();
            return
          }
         this.$vux.loading.show();
            // datas:this.encrypt({
            //   account: this.loginForm.mobile,
            //   password: this.loginForm.password,
            //   mode:'1',
            //   client_type:'1',
            //   login_type:0,
            //   is_encrypt:0,
            //   ip:window.sessionStorage.getItem('ip'),
            //   },true)
            // console.log(89)
             let d = this.globalPpproach.checkIsEncrypt({
                account: this.loginForm.mobile,
                password: this.loginForm.password,
                mode:'1',
                client_type:'1',
                login_type:0,
                is_encrypt:0,
                ip:window.sessionStorage.getItem('ip'),
             })
            //  console.log(window.sessionStorage.getItem('ip'))
         this.$http
          .post("/api/user/login", d)
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.code == 1) {
              let decryptData= this.decrypt(res.data.encryption)
              this.setInfo(res,decryptData)
              if(this.remember){
                let obj = {}
                obj.mobile = this.loginForm.mobile;
                obj.password = this.loginForm.password;
                this.SETREMPSW(obj);
              }else{
                this.SETREMPSW('')
              }
            } else {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
          });
      } else if (this.loginType == 1) { // 手机验证码登录
       if(!/^[0-9][0-9]{3}$/.test(this.loginForm.code)){
         this.$vux.toast.hide();
         this.$vux.toast.text('验证码是4位数字', 'middle')
         this.$refs.iphregYzm.focus();
        return
       }
        this.$vux.loading.show();
        let d = this.globalPpproach.checkIsEncrypt({
            mobile: this.loginForm.mobile,
						captcha: this.loginForm.code,
						client_type: '3',
						ip:window.sessionStorage.getItem('ip'),
             })
        this.$http.post("/api/user/mobilelogin", d)
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.code == 1) {
              this.SETUSERINFO(res.data.data);
              this.SETUSERNAME(res.data.data.nickname);
              this.SETPIC(res.data.data.avatar);
              let decryptData= this.decrypt(res.data.encryption,false)
              this.setInfo(res,decryptData)
            } else {
              this.$vux.toast.text(res.data.msg, 'middle')
            }
          });
      }
    },
    sendCode() {
      let d = this.globalPpproach.checkIsEncrypt({
						mode: '3',
						mobile: this.loginForm.mobile,
						event:'mobilelogin'
					})
         
         this.isSend = true;
          this.$http.post('/api/validate/check_mobile_exist',d).then(res=>{
//            console.log(res)
            if(res.data.code==1){
//             this.loadingShow=true;
              this.$vux.loading.show();
               this.$http.post("/api/sms/send", d)
          .then(res1 => {
//            console.log(res);
//            this.loadingShow=false;
            this.$vux.loading.hide();
            if (res.data.code == 1) {
              this.$vux.toast.hide();
              this.$vux.toast.text(res1.data.msg, 'middle')
//              this.regmsg = '验证码已发送' ;
//              this.showPositionValue = true
              let time = 120;
              this.isSend = true;
              var codeTimer = setInterval(() => {
                this.btnText ="Gửi lại("+time--+")";
                if (!time) {
                  this.isSend = false;
                  clearInterval(codeTimer);
                  this.btnText = "Gửi lại";
                }
              }, 1000);
            }else{
               this.isSend = false;
               this.$vux.toast.text(res.data.msg, 'middle')
//               this.regmsg = res.data.msg ;
//              this.showPositionValue = true
            }
          }).catch(err=>{
//            console.log(err)
          });
            }else{
               this.isSend = false;
//               this.regmsg ='该手机号还没有Đăng ký';
//              this.showPositionValue = true
              this.$vux.toast.text('该手机号还没有Đăng ký', 'middle')
              this.$refs.iphregTel.focus();
            }
          }).catch(err=>{
//            console.log(err)
          })
    },
    // 登录成功处理
    setInfo(res,decryptData,flag) {
        this.$vux.toast.hide();
        this.$vux.toast.text(res.data.msg, 'middle');
         this.SETUSERINFO(res.data.data);
        this.SETUSERNAME(res.data.data.nickname);
        this.SETPIC(res.data.data.avatar);
        this.SETUSERTOKEN(decryptData.token);
        this.SETISDECIPHER(decryptData.aes_salt);
        this.$http.defaults.headers["token"] = decryptData.token;
        this.SETISNOTICE("yes");
        this.goLast();//返回
        
       
    },
    async getDiamond(uid){
        let res = await this.$http.get(this.versionLive2+"user/diamond_now/?user_id=" + uid);
        if (res && res.data.code == 1){
          this.SETDIAMOND(res.data.data.diamond)
        }else{
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        
    },
    async getInit(){
                let res = await this.$http.get('/api/common/siteConfig',{
                    params:{
                        client:1,
                        version:'3.2.1'
                    }
                });
               
                if(res){
                    this.SETWEBDATA(JSON.stringify(res.data.data));
                    this.SETHOMENAV(res.data.data.index_nav);
                    let skin = (res.data.data.default_skin.id)-0-1;
                    if(this.$store.state.skinBs != 1){
                      this.SETSKINDATA(skin);
                    }
                }
     },
      // getLoadApi(){
      //   this.$http.post('/getapi').then(res=>{
      //       localStorage.setItem('loadUri',res.data.uri)
      //   })
      // },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
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

  }
};
</script>

<style  lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
    .btn-box{
      .weui-btn:after{
        border: none;
      }
    }
    .login .vux-header .vux-header-title{color: #000}
    .black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
     .form-box{
       background: #fff;
        .rem(padding-left,75);.rem(padding-right,75);.rem(padding-top,30);
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
      .login{
         .logo-box{
        text-align: left;    margin-left: 5.6%; margin-right: 5.6%;
        .rem(margin-top,24);.rem(margin-bottom,20);
        .logo{.rem(width,40);.rem(height,54); background: url('../../assets/images/login/backHome.png')  no-repeat;background-size: 59%;display: inline-block;}
      }
      }
     
    .logoLogin{
      clear: both;
      text-align: center;
      .rem(padding-top,105);
      .rem(padding-bottom,20);
      img{
        .rem(width,220*2);
      }
    }
    .toRegister{
      .rem(font-size,32);
      font-weight: bold;
    }
  .toRegist{
    .rem(font-size,32);color: #999999; margin-left: 2.6%;
  }
      .change-box{
        display: flex;justify-content: space-between;margin-top:0;
        i{display: inline-block;width: 0.45rem;height: 0.45rem;border-radius: 50%;background: rgba(119, 135, 165, 0.2);position: relative;top: 0.08rem;
        img{width: 0.3rem;
    position: absolute;
    left: 0.08rem;
    top: 0.1rem;}
        }
      }
//       .inp-box::after{content: '';display: block; height: 70%;border-left: 1px solid #cccccc;position: absolute;top: 0.17rem;.rem(left,84)}
// 	  .inp-box::before{content: '';display: block;.rem(width,31);.rem(height,36);position: absolute;top: 0.25rem;left: 0.34rem;}
// 	  .inp-box.phone::before {
//   // .rem(width,29);.rem(height,40);background: url('../../assets/images/login/phone.png') no-repeat;background-size: 100% 100%;
//   width: 0.54rem;
//   height: 0.54rem;
//   background: url(../../assets/images/icon.png);
//   background-position: 0.8rem -3.26rem;
//   background-size: 1.9rem;
// }
// .inp-box.lock::before {
//   // background: url('../../assets/images/login/lock.png') no-repeat;background-size: 100% 100%;
//   width: 0.54rem;
//   height: 0.54rem;
//   background: url("../../assets/images/icon.png");
//   background-position: 0.8rem -2.1rem;
//   background-size: 1.89rem;
// }
// .inp-box.safe::before {
//   // background: url('../../assets/images/login/safe.png') no-repeat;background-size: 100% 100%;
//   width: 0.54rem;
//   height: 0.54rem;
//   background: url(../../assets/images/icon.png);
//   background-position: 0.8rem -3.9rem;
//   background-size: 1.9rem;
// }
     .foot{
   position: fixed;
   bottom: 15px;
   width: 100%;
   text-align: center;
  color:#7787A5;
   font-size: 0.4rem;
   a{
font-size: 0.4rem;
color: #1A88FF;
   }
 }
.download-box
{
    position: fixed;
    width: 100%;
    max-width: 750px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    z-index:99999;
    .download{
        width: 86%;
        background: #fff;
        position: relative;
        top: 50%;
        margin-top: -25%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 6px;
        .rem(font-size,26);
        padding: 0.2rem;
        p{
            height: 0.8rem;
            line-height: 0.8rem;

            color: #000;
            >span{
                margin-right: 0.2rem;
                // color: #ff1c30;
                color: #1486FF;
                display: inline-block;
                cursor: pointer;
            }
        }
        a{
            display: block;
            width: 100%;
            height: 100%;
            color: #1486FF;
            // color: #ff1c30;
        }
    }
}
.RememberPSW{
  color: #9AAFD6;
  .rem(font-size,24);
  margin-top: 0.5rem;
  span{
    display: block;
  }
  i{
    margin-top: 0.04rem;
    display: block;
    .rem(width,28);
    .rem(height,28);
    margin-right: 2%;
    background: #445779;
    border-radius: 2px;
    img{
      width: 80%;
    margin-left: 4%;
    margin-top: 0.1rem;
    vertical-align: super;
    }
    // &.active{
    //   background: url('../../assets/images/login/xz.png')no-repeat;
    //   background-size: contain;
    // }
  }
}
</style>