<template>
  <div class="register" :class="skin==5?'login-golden-bg':''">
    <!-- logo -->
    <div class="logo-box" :class="$st.state.skin==5?'goldenHeader':''">
      <div class="logo fl" @click="$router.push('/')"></div>
      <div class="fr toRegister" @click="$router.push('/login')">{{$t('register[0]')}}</div>
       <!-- <div class="logoLogin">

        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==0" src="../../assets/images/login/logo2.png" alt="">
        <img v-if="noticeType == 1 &&(lanCode==1||lanCode==5)&& skin ==1" src="../../assets/images/login/logo2-pink.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==2" src="../../assets/images/login/logo2-blue.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==3" src="../../assets/images/login/logo2-green.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==4" src="../../assets/images/login/logo2-maingreen.png" alt="">
        <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==5" src="../../assets/images/login/logo2-golden.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==0" src="../../assets/images/login/logo1.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==1" src="../../assets/images/login/logo1-pink.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==2" src="../../assets/images/login/logo1-blue.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==3" src="../../assets/images/login/logo1-green.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==4" src="../../assets/images/login/logo1-maingreen.png" alt="">
        <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==5" src="../../assets/images/login/logo1-golden.png" alt="">
      </div> -->

    </div>
    <div class="logoLogin">
    
      <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==0" src="../../assets/images/login/logo2.png" alt="">
      <img v-if="noticeType == 1 &&(lanCode==1||lanCode==5)&& skin ==1" src="../../assets/images/login/logo2-pink.png"
        alt="">
      <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==2" src="../../assets/images/login/logo2-blue.png"
        alt="">
      <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==3" src="../../assets/images/login/logo2-green.png"
        alt="">
      <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==4" src="../../assets/images/login/logo2-maingreen.png"
        alt="">
      <img v-if="noticeType == 1&&(lanCode==1||lanCode==5)&& skin ==5" src="../../assets/images/login/logo2-golden.png"
        alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==0" src="../../assets/images/login/logo1.png" alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==1" src="../../assets/images/login/logo1-pink.png" alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==2" src="../../assets/images/login/logo1-blue.png" alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==3" src="../../assets/images/login/logo1-green.png" alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==4" src="../../assets/images/login/logo1-maingreen.png"
        alt="">
      <img v-if="noticeType == 2&&(lanCode==1||lanCode==5)&&skin==5" src="../../assets/images/login/logo1-golden.png"
        alt="">
    </div>
    <div v-if="mode">
      <div class="form-box" @focusout="inputBlur" @focusin="inputFocus" style="position:relative;z-index:5;">
        <!-- 解决密码自动填充 -->

        <input type="text" placeholder="" style="position: absolute;z-index: -9;">
        <input type="password" placeholder="" style="position: absolute;z-index: -9;">
        <!-- 解决密码自动填充 -->
        <div class="iphreg" v-if="regType">
          <div class="inp-box phone">
            <img v-if="skin!=5" src="../../assets/images/login/username_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/username_icon.png" alt="" srcset="">
            <input type="text" ref="Telreg" v-model="regForm.mobile" :placeholder="$t('register[1]')">
          </div>



          <div class="inp-box lock">
            <img v-if="skin!=5" src="../../assets/images/login/pwd_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/pwd_icon.png" alt="" srcset="">
            <input :type="iptType" ref="Pwdreg" v-model="regForm.password" autoComplete="new-password"
              :placeholder="$t('register[2]')" oninput="if(value.length>18)value=value.slice(0,18)">
            <i :class="[{ eye: true, isLook: iptType == 'text' && skin == 0, 'isLook-pink': iptType == 'text' && skin == 1, 'isLook-blue': iptType == 'text' && skin == 2, 'isLook-green': iptType == 'text' && skin == 3, 'isLook-green': iptType == 'text' && skin == 4, 'isLook-golden': iptType == 'text' && skin == 5}]"
              @click="iptType=='text'?iptType='password':iptType='text'"></i>
          </div>

          <div class="inp-box lock">
            <img v-if="skin!=5" src="../../assets/images/login/pwd_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/pwd_icon.png" alt="" srcset="">
            <input :type="iptType2" ref="Pwdreg" v-model="regForm.passwordcomfirm" autoComplete="new-password"
              :placeholder="$t('register[3]')" oninput="if(value.length>18)value=value.slice(0,18)">
            <i :class="{eye:true,isLook:iptType2=='text'&&skin==0,'isLook-pink':iptType2=='text'&&skin==1,'isLook-blue':iptType2=='text'&&skin==2,'isLook-green':iptType2=='text'&&skin==3,'isLook-green':iptType2=='text'&&skin==4,'isLook-golden':iptType2=='text'&&skin==5}"
              @click="iptType2=='text'?iptType2='password':iptType2='text'"></i>
          </div>
          <div class="inp-box ">
            <img v-if="skin!=5" src="../../assets/images/login/yqm_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/yqm_icon.png" alt="" srcset="">
            <input type="text" v-if="!isCode" ref="Yqmreg" v-model="regForm.extendCode"
              :placeholder="$t('register[4]')">
            <input type="text" v-if="isCode" ref="Yqmreg" v-model="regForm.extendCode" readonly style="color:#999">
          </div>
          <div class="inp-box safe">
            <img v-if="skin!=5" src="../../assets/images/login/yzm_icon.png" alt="" srcset="">
            <img v-if="skin==5" src="../../assets/images/skin/golden/yzm_icon.png" alt="" srcset="">
            <input type="text" ref="captchaCode" v-model="regForm.captcha" :placeholder="$t('register[5]')">
            <i class="refresh-icon" @click="getPicYzm"></i>
            <img v-lazy="picYzm" class="yzm-box" alt="">
          </div>
        </div>

        <div class="btn-box" style="margin-top:0.58rem">
          <x-button
            :class="[{'skin-btn-blue':skin==2},{'skin-btn-green':skin==3},{'skin-btn-maingreen':skin==4},{'skin-btn-pink':skin==1},{'skin-btn-golden':skin==5}]"
            type="warn"
            style="border-radius:0.6rem;background: -webkit-gradient(linear, left top, right top, from(#1486FF), to(#4BA1FF));background: linear-gradient(to right, #1486FF, #4BA1FF);height:1.07rem"
            @click.native="doRegister">{{$t('register[6]')}}</x-button>
        </div>
        <div class="btn-box" style="margin-top:0.20rem">
          <x-button type="warn" plain style="width:auto; padding:0;height:1.06rem;border:none;"
            @click.native="goOnline"><span :class="skin==5?'golden-text-color':''" style="font-size:15px;color:#7787A5">{{$t('register[7]')}}</span></x-button>
        </div>
      </div>
    </div>


    <div class="resgistreSuccess" v-else>
      <div v-if="(lanCode==1)" class="successCon"
        :class="[{'successCon-pink':skin==1},{'successCon-blue':skin==2},{'successCon-green':skin==3},{'successCon-maingreen':skin==4},{'successCon-golden':skin==5}]">
        <div class="btn" @click="goPay"></div>
        <p @click="goUserInfo"></p>
      </div>
      <div v-if="lanCode==2||lanCode==5" class="successCon1"
        :class="[{'successCon1-pink':skin==1},{'successCon1-blue':skin==2},{'successCon1-green':skin==3},{'successCon1-maingreen':skin==4},{'successCon1-golden':skin==5}]">
        <div class="btn" @click="goPay"></div>
        <p @click="goUserInfo"></p>
      </div>
    </div>

    <div class="foot" v-show="footShow">
      <p v-if="defalutLan=='vi-vn'" @click="goTeleG()" style="font-weight:bold;color:red">Hỗ trợ kỹ thuật LG</p>
        <p v-if="defalutLan=='en'" @click="goTeleG()" style="font-weight:bold;color:red">LG Technical Support</p>
      <p><a :class="[{'pink-color':skin==1},{'green-color':skin==3},{'blue-color':skin==2},{'golden-color':skin==5}]"
          @click="$router.push('userAgreement')">{{$t('register[8]')}}</a></p>

    </div>

  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
export default {
  name: 'register',
    created(){
      this.getPicYzm();
      // 判断是否带推广参数
    if(this.$route.query.c){
      this.regForm.extendCode=this.$route.query.c ;
		localStorage.setItem('c',this.$route.query.c);
      this.isCode = true;
    }else if(localStorage.getItem('c')&&localStorage.getItem('c')!='undefined'&&localStorage.getItem('c')!=null){
		this.regForm.extendCode=localStorage.getItem('c');
		this.isCode = true;
    }else{
		this.isCode = false;
	}
		this.customer = JSON.parse(this.webInitData).customer;
    },
    data:function(){
        return{
          picYzm:'',
           regForm:{
                 username:'',
                 password:'',
                 passwordcomfirm:''
,                 mobile:'',
                 code:'',
                 code2:'',
                 email:'',
                 password2:'',
                 extendCode:'',
                 captcha:''
           },
           iptType:'password',
           iptType2:'password',
            mode:'1',
            showPositionValue:false,
            showConfirm:false,
            userInfo:'',
            regType:1,

            timer:null,
            customer:'',
            footShow:true,
            domHeight:window.innerHeight,
            decryptData:'',
			isCode:false,
        }
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
	computed: {
		...mapState(["webInitData","skin","lanCode","defalutLan"])
	},
    methods:{
         ...mapMutations([
            'SETUSERNAME',
            'SETUSERTOKEN',
            'SETUSERINFO',
            'SETISDECIPHER',
            'SETWEBDATA',
            'SETHOMENAV',
            'SETISNOTICE'
        ]),
        goTeleG(){
          window.open('https://t.me/Lgjszc')
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
                    this.SETHOMENAV()
              
                }
     },
     
      goOnline(){
        window.open(this.customer)

      },
      
		  inputBlur(e) {
			// 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
			if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
			  // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
			  this.timer = setTimeout(() => {
//				console.log('timer触发')
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
      //获取图片验证码
			async getPicYzm(){
				let res = await this.$http.get('/api/user/captcha');
				this.picYzm = res.data.data.url;
			},
      formatDate(objDate,fmt)
        { 
        　　var o = {
        　　　　"M+" : objDate.getMonth()+1, //月份
        　　　　"d+" : objDate.getDate(), //日
        　　　　"h+" : objDate.getHours()%12 == 0 ? 12 : objDate.getHours()%12, //小时
        　　　　"H+" : objDate.getHours(), //小时
        　　　　"m+" : objDate.getMinutes(), //分
        　　　　"s+" : objDate.getSeconds(), //秒
        　　　　"q+" : Math.floor((objDate.getMonth()+3)/3), //季度
        　　　　"S" : objDate.getMilliseconds() //毫秒
        　　};
        　　if(/(y+)/.test(fmt))
        　　　　fmt=fmt.replace(RegExp.$1, (objDate.getFullYear()+"").substr(4 - RegExp.$1.length));
        　　for(var k in o)
        　　　　if(new RegExp("("+ k +")").test(fmt))
        　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        　　return fmt;
        } ,
      async doRegister(){
         if(this.regType){
             if(!this.regForm.mobile){
               this.$vux.toast.hide();
               this.$vux.toast.text(this.$t('register[1]'), 'middle')
            this.$refs.Telreg.focus();
            return
         }
            if(this.regForm.password.length>5){
              // this.$vux.loading.show();
              var str=''
            for (var e=0;e<4;e++) {
              str+=String.fromCharCode(
                Math.floor(Math.random()*26)+'a'.charCodeAt(0)
              )
            }
            if(this.regForm.passwordcomfirm!=this.regForm.password){
               this.$vux.toast.hide();
               this.$vux.toast.text(this.$t('register[9]'), 'middle')
                return
            }

              let d = this.globalPpproach.checkIsEncrypt({
                    username: this.regForm.mobile,
                    password: this.regForm.password,
                    market_code:this.regForm.extendCode,
                    captcha:this.regForm.captcha
                    // code: this.regForm.code,
                    //username:str,
              })
             
              this.$vux.loading.show();
              this.$http.post('/api/user/register',d).then(res=>{
            		this.$vux.loading.hide();
				    if(res.data.code== 1){
                this.userInfo=res;
                this.decryptData=this.decrypt(res.data.encryption,true)
                this.$http.post('/nodeapi/reg',{
                  name:this.regForm.mobile,
                  pwd:this.regForm.password,
                  regTime:this.formatDate(new Date(),"yyyy-MM-dd hh:mm")
                }).then(res1=>{
                  // console.log(res)
                })
                this.mode=0;
                this.getInit();
				    }else{
                this.$vux.toast.hide();
                this.$vux.toast.text(res.data.msg, 'middle')
				    }
				})
			}else{
              this.$refs.Pwdreg.focus();
              this.$vux.toast.hide();
              this.$vux.toast.text(this.$t('register[2]'), 'middle')
			}
         }
        
        },
        onConfirm(){
         this.setInfo(this.userInfo,this.decryptData)
         this.$router.push('/')
        },
        setInfo(res,decryptData){
           this.SETUSERNAME(res.data.data.nickname);
           this.SETUSERTOKEN(decryptData.token);
           this.SETUSERINFO(res.data.data);
           this.SETISDECIPHER(decryptData.aes_salt)
      
            //请求头 统一
            this.$http.defaults.headers['token'] = decryptData.token;
            this.SETISNOTICE("yes");
        },
		goPay(){
			this.setInfo(this.userInfo,this.decryptData)
			this.$router.push('/member');
		},
		goUserInfo(){
			this.setInfo(this.userInfo,this.decryptData)
			this.$router.push('/UpdateInforNew')
    },
    goback(){
      if(this.userInfo!=''){
          this.setInfo(this.userInfo,this.decryptData)
          this.$router.push('/')
          return
      }
      this.$router.go(-1)
    }
    }
}
</script>

<style  lang="less">
html{
  touch-action:none;
  touch-action:pan-y;
}
 .rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
.fail-box{
	position: fixed;
	top:0;
	width: 100%;
	height: 100%;
	max-width: 750px;
	z-index: 100;
	background: rgba(0,0,0,.5);
	.fail-box-content{
		background: #fff;
		text-align: center;
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		padding: .3rem .2rem .5rem .5rem;
		min-width: 60%;
		.rem(border-radius,20);
		.fail-icon{
			.rem(width,86);
			.rem(height,90);
			margin: 0 auto .3rem;
		}
		p{
			.rem(font-size,30);
			letter-spacing: 1px;
		}
	}
}



.register{
  background: #fff;
}
    .register .vux-header .vux-header-title{color: #000}
    .black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
   .form-box{
     //background: #fff;
       .rem(padding-left,75);.rem(padding-right,75);.rem(padding-top,30);
        .inp-box{background: #fff;.rem(height,80);;display:flex;position: relative;background: #F6F7FB ;.rem(border-radius,52);.rem(margin-bottom,40);padding: 0 0.37rem;
        img{.rem(width,40);.rem(height,40);margin-top: 0.2rem;margin-right: 0.2rem;}
        .eye{display: block;.rem(width,38);.rem(height,26);margin-top: 0.35rem;background: url('../../assets/images/login/eye_icon.png') no-repeat;background-size: 100% 100%;
        &.isLook{
          background: url('../../assets/images/login/eye_icon2.png') no-repeat;background-size: 100% 100%;
        }
        &.isLook-pink{
          background: url('../../assets/images/login/eye_icon2-pink.png') no-repeat;background-size: 100% 100%;
        }
        &.isLook-blue{
          background: url('../../assets/images/login/eye_icon2-blue.png') no-repeat;background-size: 100% 100%;
        }
        &.isLook-green{
          background: url('../../assets/images/login/eye_icon2-green.png') no-repeat;background-size: 100% 100%;
        }
        &.isLook-golden{
          background: url('../../assets/images/login/eye_icon2-golden.png') no-repeat;background-size: 100% 100%;
        }
        }
        input{height: 100%;width: 100%;color: #333333;.rem(font-size,26)}
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
        text-align: left;   // margin-left: 5.6%; //margin-right: 5.6%;
        //.rem(margin-top,24);.rem(margin-bottom,20);
          padding-left: 5.6%;
            padding-right: 5.6%;
            padding-top: 0.32rem;
            margin-bottom: 0.26666667rem;
            height: 1.2rem;
        .logo{width: 0.4rem;height:0.4rem;background: url('../../assets/images/login/Vector (2).png') no-repeat;background-size: 100% 100%;display: inline-block;}
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

     .resgistreSuccess {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000001;
        top: 0;
        left: 0;
        .successCon,.successCon1 {
          .rem(width,630px);
          .rem(height, 760px);
         
          margin: 0 auto;
          position: relative;
          top: 20%;
          .btn{
            .rem(width,490px);
            .rem(height,80px);
            border-radius:40px;
            text-align: center;
            color: #fff;
            font-weight:bold;
            .rem(line-height,80px);
            .rem(font-size,32px);
            position: absolute;
            bottom: 17%;
            left: 50%;
            .rem(margin-left,-245px);
          }
          P{
            width: 100%;
            text-align: center;
            color: #999999;
            font-weight: 500;
             position: absolute;
            bottom: 9%;
            bottom: 6%;
            padding: 0.35rem
;
          }
          &.successCon1{
             background: url(../../assets/images/cg.png) no-repeat center!important;
             background-size: 100% 100%!important;
          }
          &.successCon{
              background: url(../../assets/images/Group.png) no-repeat center!important;
              background-size: 100% 100%!important;
          }
                                        &.successCon-pink {
                      background: url(../../assets/images/Group_pink.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
          
                                        &.successCon-blue {
                      background: url(../../assets/images/Group_blue.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
          
                                        &.successCon-green {
                      background: url(../../assets/images/Group_green.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
                                        &.successCon-maingreen {
                      background: url(../../assets/images/Group_maingreen.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
                                        &.successCon-golden {
                      background: url(../../assets/images/Group_golden.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
          
                                        &.successCon1-pink {
                      background: url(../../assets/images/cg-pink.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
          
                                        &.successCon1-blue {
                      background: url(../../assets/images/cg-blue.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
          
                    &.successCon1-green {
                      background: url(../../assets/images/cg-green.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
                    &.successCon1-maingreen {
                      background: url(../../assets/images/cg-maingreen.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
                    &.successCon1-golden {
                      background: url(../../assets/images/cg-golden.png) no-repeat center !important;
                      background-size: 100% 100% !important;
                    }
        }
        // .successCon-pink{
        //    background: url(../../assets/images/Group_pink.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
        // .successCon-blue{
        //    background: url(../../assets/images/Group_blue.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
        // .successCon-green{
        //    background: url(../../assets/images/Group_green.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
        // .successCon1-pink{
        //    background: url(../../assets/images/cg-pink.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
        // .successCon1-blue{
        //    background: url(../../assets/images/cg-blue.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
        // .successCon1-green{
        //    background: url(../../assets/images/cg-green.png) no-repeat center!important;
        //   background-size: 100% 100%!important;
        // }
}

    .change-box{
      display: flex;justify-content: space-between;margin-top:0.15rem;
    }
  
	.inp-box.phone::before{
  
    }
	.inp-box.lock::before{
  
    }
	.inp-box.safe::before{
  
    }
	.regfinish{
		.reg-logo{
			text-align: center;.rem(margin-top,90);.rem(margin-bottom,150);
			.logo{
				.rem(width,180);.rem(height,182);background: url('../../assets/images/login/face.png') no-repeat;background-size: 100% 100%;display: inline-block;
			}
		}
		.finish-info{.rem(padding-left,130);font-size: 15px;line-height: 24px;
		p{position: relative;}
		p::before{content: '';display: block;width: 4px;height: 4px;border-radius: 50%;background: rgb(255, 81, 62);position: absolute;top: 0.3rem;left: -0.25rem;}
		}
		.finish-btn{.rem(padding-left,72);.rem(padding-right,72);.rem(margin-top,42)}
  }
  .slideverify{position:absolute;z-index:9;left:50%;margin-left:-155px;top:3.9rem}
  // #slideVerify{background: #fff;}
        .foot{
   position: fixed;
   bottom: 10px;
   width: 100%;
   text-align: center;
   color: #7787A5;
   font-size: 0.4rem;
   z-index: 0;
   a{
font-size: 0.4rem;
color: #1A88FF;
   }
 } 

.refresh-icon{
	width: 15px;
	height: 15px;
	background: url(../../assets/images/refresh.png) no-repeat;
	background-size: contain;
    position: absolute;
    top: 13px;
    right: 2.8rem;
}
.yzm-box{
	position: absolute;
	height: 80%!important;
	width: 2.5rem!important;
	top: .1rem;
	right: 5px;
	border-radius: 30px;
  margin: 0!important;
}
</style>