<template>
  <div class="login" :class="skin==5?'login-golden-bg':''">
     <!-- logo -->
    <div class="logo-box" :class="$st.state.skin==5?'goldenHeader':''">
      <div class="logo1 fl"  @click="$router.push('/')" ></div>
        <div class="fr toRegister" v-if="noticeType==1" @click="$router.push('/register')" >{{$t('login[0]')}}</div>
        <div class="fr toRegister" v-if="noticeType==2" @click="$router.push('/RegisterDl')" >{{$t('login[0]')}}</div>
      <!-- <div class="logoLogin"> 
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==0" src="../../assets/images/login/logo2.png" alt="">
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==1" src="../../assets/images/login/logo2-pink.png" alt="">
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==2" src="../../assets/images/login/logo2-blue.png" alt="">
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==3" src="../../assets/images/login/logo2-green.png" alt="">
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==4" src="../../assets/images/login/logo2-maingreen.png" alt="">
        <img  v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==5" src="../../assets/images/login/logo2-golden.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==0" src="../../assets/images/login/logo1.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==1" src="../../assets/images/login/logo1-pink.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==2" src="../../assets/images/login/logo1-blue.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==3" src="../../assets/images/login/logo1-green.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==4" src="../../assets/images/login/logo1-maingreen.png" alt="">
        <img  v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==5" src="../../assets/images/login/logo1-golden.png" alt="">
        <img  v-if="lanCode==2" src="../../assets/images/sfc.png" alt="">
        </div> -->
     
    </div>
      <div class="logoLogin">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==0" src="../../assets/images/login/logo2.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==1" src="../../assets/images/login/logo2-pink.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==2" src="../../assets/images/login/logo2-blue.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==3" src="../../assets/images/login/logo2-green.png"  alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==4" src="../../assets/images/login/logo2-maingreen.png"  alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==5" src="../../assets/images/login/logo2-golden.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==0" src="../../assets/images/login/logo1.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==1" src="../../assets/images/login/logo1-pink.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==2" src="../../assets/images/login/logo1-blue.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==3" src="../../assets/images/login/logo1-green.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==4" src="../../assets/images/login/logo1-maingreen.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==5" src="../../assets/images/login/logo1-golden.png"  alt="">
        <img v-if="lanCode==2" src="../../assets/images/sfc.png" alt="">
      </div>
     <div class="form-box" style="position:relative;z-index:5;" @focusout="inputBlur" @focusin="inputFocus">
      <!-- 解决密码自动填充 -->
       <input type="text"  placeholder=""  style="position: absolute;top: 0.8rem;left: 1.8rem;z-index: -9;">
       <input type="text"  placeholder="" style="position: absolute;top: 0.8rem;left: 1.8rem;z-index: -9;" >
        <!-- 解决密码自动填充 -->
     
      <div class="account">
          <div class="inp-box phone">
            <img v-if="skin!=5" src="../../assets/images/login/username_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/username_icon.png" alt="" srcset="">
            <input type="text" ref="TelInput" v-model="loginForm.mobile"  :placeholder="$t('login[1]')">
          </div>
         <div class="inp-box lock">
           <img v-if="skin!=5" src="../../assets/images/login/pwd_icon.png" alt="" srcset="">
           <img v-if="skin==5" src="../../assets/images/skin/golden/pwd_icon.png" alt="" srcset="">
          <input type="password"   ref="PwdInput" v-model="loginForm.password"  :placeholder="$t('login[2]')"  style="padding-right:1.5rem">
           <x-button  type="warn" plain :disabled="isSend" style="width:auto;padding:0;height:1.06rem;margin:0;border:none;position: absolute;right: 0.2rem;top:119%;" @click.native="openServe()"><span :class="[{'pink-color':skin==1},{'green-color':skin==3},{'maingreen-color':skin==4},,{'golden-color':skin==5},{'blue-color':skin==2}]" style="font-size:14px;color:#1A88FF">{{$t('login[7]')}}？</span></x-button>
         </div>
      </div>
      <!-- 记住账户密码 -->
       <div class="RememberPSW clearfix">
         <i class="fl" :class="remember == true ?'active':''" @click="remember = !remember"> 
          <img v-if="remember && skin !=5" src="../../assets/images/login/jzmm.png" alt="" srcset=""> 
          <img style="width:90%;margin-top:0;" v-if="remember && skin ==5" src="../../assets/images/skin/golden/jzmm.png" alt="" srcset=""> 
          </i>
         <span class="fl" :class="skin==5?'golden-text-color':''">{{$t('login[3]')}}</span>
       </div>
       <!-- 提交按钮 -->
       <div class="btn-box" style="margin-top:0.5rem">
          <x-button :class="[{'skin-btn-blue':skin==2},{'skin-btn-green':skin==3},{'skin-btn-maingreen':skin==4},{'skin-btn-pink':skin==1},{'skin-btn-golden':skin==5}]"  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#1486FF), to(#4BA1FF));background: linear-gradient(to right, #1486FF, #4BA1FF);height:1.07rem" @click.native="doLogin">{{$t('login[5]')}}</x-button>
          <x-button :class="skin==5?'trial-play':''"  type="warn" style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#ff3231), to(#ff7f67));background: #eee;height:1.07rem;border:none;color:#7787A5;" @click.native="doPlay">{{$t('login[4]')}}</x-button>
          
       </div>
    </div>
    


    <div class="foot" v-show="footShow">

        <p v-if="defalutLan=='vi-vn'" @click="goTeleG()" style="font-weight:bold;color:red">Hỗ trợ kỹ thuật LG</p>
        <p v-if="defalutLan=='en'" @click="goTeleG()" style="font-weight:bold;color:red">LG Technical Support</p>
          <p> <a :class="[{'pink-color':skin==1},{'green-color':skin==3},{'blue-color':skin==2},{'golden-color':skin==5},{'maingreen-color':skin==4}]" @click="$router.push('userAgreement')">{{$t('login[6]')}}</a></p>

          

    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "login",
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
      mode: "1",// 登录方式
      isSend: false,// 验证码发送
      timer:null,
      footShow:true,
      domHeight:window.innerHeight,
      lastRoute:'',
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
    ...mapState(["skin","remPSW","customer","webInitData","lanCode","defalutLan"])  
  },
  methods: {
    ...mapMutations(["SETUSERNAME", "SETUSERTOKEN", "SETPIC","SETUSERINFO","SETUSER_TYPE","SETISDECIPHER","SETISTYPE","GETISYUE","SETWEBDATA","SETHOMENAV","SETDIAMOND","SETSKINDATA","SETREMPSW","SETISNOTICE"]),
    goTeleG(){
      window.open('https://t.me/Lgjszc')
    },
    openServe(){
      // window.open(this.customer)
      window.open(JSON.parse(this.webInitData).customer)
    },
    goLast(){
        setTimeout(()=>{
            this.$router.go(-1);
        },500)
    },
    //试玩
    doPlay(){
      this.$vux.loading.show();
      let d = this.globalPpproach.checkIsEncrypt({
          client_type:'1',
            ip:window.sessionStorage.getItem('ip')
            })
            
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
            this.$vux.toast.text(this.$t('login[1]'), 'middle')
            this.$refs.TelInput.focus();
            this.$refs.iphregTel.focus();
            return
         }
      // 账号密码登录
     if(!this.loginForm.password){
           this.$vux.toast.hide();
           this.$vux.toast.text(this.$t('login[2]'), 'middle')
            this.$refs.PwdInput.focus();
            return
          }
         this.$vux.loading.show();
             let d = this.globalPpproach.checkIsEncrypt({
                account: this.loginForm.mobile,
                password: this.loginForm.password,
                mode:'1',
                client_type:'1',
                login_type:0,
                is_encrypt:0,
                ip:window.sessionStorage.getItem('ip'),
             })
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
       //background: #fff;
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
        background: #fff;
         .logo-box{
        text-align: left;    
        //margin-left: 5.6%; 
        //margin-right: 5.6%;
        //.rem(margin-top,24);
        //.rem(margin-bottom,20);
          padding-left: 5.6%;
            padding-right: 5.6%;
            padding-top: 0.32rem;
            margin-bottom: 0.26666667rem;
            height: 1.2rem;
        .logo1{.rem(width,40);.rem(height,54); 
        background: url('../../assets/images/login/backHome.png')  no-repeat;
        background-size: 59%;        
        display: inline-block;
        text-align: left;
  
        }
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

  }
}
</style>