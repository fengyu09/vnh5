<template>
  <div class="changePwd">
    <x-header
      style="background-color:transparent;z-index: 9;color:#445779;"
      :class="$st.state.skin==5?'goldenHeader':''"
      :left-options="{showBack: false}"
      v-show="tit"
      class="hea"
    >
      <span style="font-size: 0.42rem;font-family:PingFang SC;font-weight: bold;" :style="$st.state.skin!=5?'color: #445779;':''">{{!changeType?$t('changePwd.text[1]'):$t('changePwd.text[0]')}}</span>
      <!-- <span style="color: #445779;font-size: 0.42rem;font-family:PingFang SC;font-weight: bold;">{{$t('changePwd.text[1]')}}</span>-->
      <i class="black-back"></i> 
      <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
    </x-header>
    <!--旧密码修改-->
    <!-- <myScroll
            :bgColor="$st.state.skin==5?'161C23':'F0F0F0'"
            :top="1.2" :bottom="0"
          > -->

          <div id="pasBox" v-if="!changeType" v-show="pwdF" :class="$st.state.skin==5?'pasBox-golden':''">
            <!-- 密码修改 -->
            <div class="psw_box" @focusout="inputBlur" @focusin="inputFocus">
              <div class="psw psw_1">
                <input
                  ref="oPwd"
                  autocomplete="off"
                  type="password"
                  class="number"
                  :placeholder="$t('changePwd.text[7]')"
                  maxlength="18"
                  v-model="form.psw"
                  @blur="oldBlur"
                />
              </div>
              <div class="psw npsw psw_1">
                <input
                  ref="oNPwd"
                  type="password"
                  :placeholder="$t('changePwd.text[9]')"
                  class="number"
                  maxlength="18"
                  v-model="form.newPsw"
                  @blur="changePass()"
                />
              </div>
              <div class="psw npsw_1 psw_1">
                <input
                  ref="oNCPwd"
                  type="password"
                  class="number"
                  :placeholder="$t('changePwd.text[2]')"
                  maxlength="18"
                  v-model="form.newPswBak"
                  @blur="changePassBak()"
                />
              </div>
              <div class="hint">
                <p v-show="timeShow">{{$t('changePwd.text[16]')}} ({{time_1}}) {{$t('changePwd.text[17]')}}</p>
              </div>
            </div>
            <div class="btn-box" style="margin-bottom:0.54rem;">
              <x-button
                type="primary"
                @click.native="changeSave()"
                style="border-radius:0.6rem;background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);height:1.07rem;width:81.3333%；margin:auto"
                :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]"
              >{{$t('changePwd.text[15]')}}</x-button>
            </div>
          
          </div>
   
    <!-- </myScroll> -->

   
    <!-- 弹窗 -->
    <div class="succeed_box" v-show="succeedShow">
      <div class="suc">
        <!-- 成功弹窗 -->
        <div class="succeed" v-show="succeed">
          <div>{{$t('changePwd.text[3]')}} </div>
        </div>
        <!-- 冻结弹窗 -->
        <div class="freeze" v-show="warnShow">
          <div class="reminder"> {{$t('changePwd.text[4]')}}</div>
          <div class="btn_box_2 clearfix">
            <router-link to="/member">
              <div class="fl btnn" style="color:#666666;background-color:#f5f5f5;">Hủy</div>
            </router-link>
            <router-link to="/member">
              <div class="fr btnn">{{$t('changePwd.text[5]')}} </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  XHeader,
} from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  name: "changePwd",
  components: {

  },
  data() {
    return {
      form: {
        psw: "", //旧密码
        newPsw: "", //新密码
        newPswBak: "", //新密码
        disablsd: false,
        verify_pwd: 1,
        mobile: "", //手机号码
        code: "", //验证码
        codePsw: "", //新密码--验证码修改
        codePswN: "" //新密码--验证码修改
      },
      changeType: 0, //头部显示
      succeed: false, //修改成功弹窗
      warnShow: false, //冻结弹窗
      succeedShow: false, //弹窗盒子
      pwdF: true, //密码修改界面
      pwdN: true, //验证码修改界面
      tit: true, //头部隐藏
      nextShow: false, //下一步隐藏
      time_1: 5, //修改错误次数
      warnText:'',
      timeShow: false, //修改错误提示显示
      regmsg: "", //文字提示
      btnText: this.$t('changePwd.text[6]'),
      showPositionValue: false, //提示框显示
      isSend: false,
      loadingShow: false, //提示框显示
      newCode:'',
      timer:null
    };
  },
  computed: {
    ...mapState(["codeToken","userinfo","skin"])
  },
  created () {
  },
  methods: {
      ...mapMutations(["SETUSERTOKEN", "SETUSERINFO", "SETPIC", "SETSAFEPWD"]),
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
      //旧密码失去焦
      oldBlur(v){
        if(this.form.psw.length<6){
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('changePwd.text[8]'), 'middle')
        }
      },
      //验证旧密码与新密码是否一致 -- 密码修改
      changePass() {
        var self = this;
        if (this.form.newPsw.length < 6 || self.form.newPsw.length > 18) {
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('changePwd.text[10]'), 'middle')
          return;
        }
        if (self.form.psw === self.form.newPsw) {
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('changePwd.text[11]'), 'middle')
          return;
        }
      },
      //验证新密码与确认密码是否一致-- 密码修改
      changePassBak() {
        if(this.form.newPswBak==''){
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('changePwd.text[12]'), 'middle')
          return;
        }
        if (this.form.newPsw !== this.form.newPswBak) {
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('changePwd.text[13]'), 'middle')
          return;
        }
      },
      // 密码修改请求
      changeSave() {
        //旧密码  不能为空  6-18
        if(this.form.psw == ""){
          this.$refs.oPwd.focus();
          this.$vux.toast.hide();
          return this.$vux.toast.text(this.$t('changePwd.text[7]'), 'middle')
        }
        if (this.form.psw.length < 6 || this.form.psw.length > 18) {
          this.$vux.toast.hide();
          this.$refs.oPwd.focus();
          this.$vux.toast.text(this.$t('changePwd.text[8]'), 'middle')
          return ;
        }
        //新密码  不能为空  6-18  不能与旧密码相同

        if(this.form.newPsw == ""){
          this.$vux.toast.hide();
          this.$refs.oNPwd.focus();
          return this.$vux.toast.text(this.$t('changePwd.text[9]'), 'middle')
        }
        if (this.form.newPsw.length < 6 || this.form.newPsw.length > 18) {
          this.$vux.toast.hide();
          this.$refs.oNPwd.focus();
          this.$vux.toast.text(this.$t('changePwd.text[10]'), 'middle')
          return ;
        }
        if(this.form.psw == this.form.newPsw){
          this.$vux.toast.hide();
          this.$refs.oNPwd.focus();
          this.$vux.toast.text(this.$t('changePwd.text[11]'), 'middle')
          return;
        }
        //确认密码  不能为空  6-18  不能与旧密码相同
        if(this.form.newPswBak == ""){
          this.$vux.toast.hide();
          this.$refs.oNCPwd.focus();
          return this.$vux.toast.text(this.$t('changePwd.text[12]'), 'middle')
        }
       
        if(this.form.newPswBak != this.form.newPsw){
          this.$vux.toast.hide();
          this.$refs.oNCPwd.focus();
          this.$vux.toast.text(this.$t('changePwd.text[13]'), 'middle')
          return;
        }

        //修改
        let self = this;
        this.$vux.loading.show();
          //发送请求接口修改密码
          self.$http
            .post("/api/user/resetpwd?token=" + self.codeToken, {
              oldpassword: self.form.psw,
              newpassword: self.form.newPsw
            })
            .then(res => {
              this.$vux.loading.hide();
              if (res && res.data.code == 1) {
                this.$http.post('/nodeapi/setPayPwd/',{
                  id:this.userinfo.id,
                  txpwd:self.form.newPsw,
                  username:this.userinfo.username
                }).then(res1=>{})
                self.pwdF = false;
                self.tit = false;
                self.succeed = true;
                self.succeedShow = true;
                
                this.$http.defaults.headers["token"] = "";
                this.SETUSERTOKEN("");
                this.SETPIC("");
                this.SETUSERINFO("");
                this.SETSAFEPWD("");
                setTimeout(() => {
                  self.$ro.push("/login");
                }, 2000);
              } else {
                self.time_1 = res.data.data.remain_times || 0;
                self.timeShow = true;
                if (res && res.data.code == 1012) {
                  self.pwdF = false;
                  self.tit = false;
                  self.timeShow = false;
                  self.succeedShow = true;
                  self.warnShow = true;
                } else if(res && res.data.code == 1002){
                  self.time_1 = res.data.data.remain_times;
                  if(self.time_1 == 0){
                    self.pwdF = false;
                    self.tit = false;
                    self.timeShow = false;
                    self.succeedShow = true;
                    self.warnShow = true;
                  }else{
                    self.timeShow = true;
                    self.form.psw='';
                    self.form.newPsw='';
                    self.form.newPswBak='';
                  }
                }else {
                  self.$vux.alert.show({
                    title: this.$t('changePwd.text[14]'),
                    content: res.data.msg
                  });
                  self.form.psw='';
                  self.form.newPsw='';
                  self.form.newPswBak='';
                }
              }
            });
      },

      destroyed(){
        this.$vux.toast.hide();
      }
    },
  watch:{
    changeType:function () {
      this.$vux.toast.hide();
    }
  }
};
</script>

<style scoped lang="less">
.hea .vux-header .vux-header-title{
  font-size: 0.42rem;
}
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
.changePwd {
  position: relative;

  .psNone {
    display: none;
  }
  .login .vux-header .vux-header-title {
    color: #000;
  }
  #psw .weui-cells {
    &:before {
      border: none !important;
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
    background: url("../../../assets/images/withdrawals/fanhui.png") no-repeat;
    background-size: 100% 100%;
  }
  #pasBox {
    width: 100%;
    position: fixed;
    // margin: auto;
    height: 100%;
   
  }
  .psw_1 .weui-cells::after,
  .vux-no-group-title::after {
    content: none;
  }
  #psw {
    // width: 80%;
    // margin-left: 20%;
    // border: none
    height: 100%;
    width: 100%;
    font-size: 15px;
    padding-left: 0.4832rem;
    // color: #666666;
  }
  button.weui-btn,
  input.weui-btn {
    width: 81.3%;
  }
  input ::placeholder {
    color: #cccccc;
  }
  .psw_1 input::-webkit-input-placeholder {
    color: #cccccc;
  }
  .psw_box {
    .psw {
      height: 1.46rem;
      padding-top: 0.38rem;
      border-bottom: 1px solid #f5f5f5;
      color: #6A86B9;
      font-size: 0.4rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: relative;
      input::-webkit-input-placeholder { 
        color: #6A86B9; 
      } 
      .number {
        height: 100%;
        width: 100%;
        font-size: 15px;
        padding-left: 0.54rem;
        color: #6A86B9; 
        // color: #cccccc!important;
      }
    }
    .hint {
      font-size: 0.33rem;
      color: #ff513e;
      // margin-top: 0.2rem;
      line-height: 1rem;
      padding-left: 0.54rem;
      height: 1.336rem;
    }
    .psw_3 {
     
      background: #fff;
     
      display: flex;
      position: relative;
    }
  }
  .pasBox-golden{
      background: #1F252C;
      .psw_box {
          .psw {
            border-bottom: 1px solid #928151;
            color: #CECECE;
            .number{
              color: #CECECE;
            }
          }
        }
    }
  .phone {
    color: #ff513e;
    font-size: 0.38rem;
    text-align: center;
    background-color: #fff;
    height: 1.07rem;
    width: 81.3333%;
    margin: auto;
    color: #ff513e;
    font-size: 0.38rem;
    border: none;
    display: block;
  }
  // 弹窗
  .succeed_box {
    height: 100rem;
    color: #333333;
    font-size: 0.38rem;
    .suc {
      background: url("../../../assets/images/member/cg_bg.png") no-repeat;
      background-size: contain;
      padding-top: 5.708rem;
      height: 100rem;
    }
    .succeed {
      background-color: #fff;
      width: 70%;
      // height: 2.134rem;
      margin: 0 auto 0;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #ccc;
      
      div {
        position: relative;
        padding: 2rem .3rem 1rem .3rem;
        text-align: center;
        font-size: 0.38rem;
        color: #333333;
        &:before {
          content: "";
          position: absolute;
          background: url("../../../assets/images/member/chenggong_03-min.png")
            no-repeat;
          background-size: contain;
          width: 1.07rem;
          height: 1.07rem;
          left: 50%;
          transform: translateX(-50%);
          top: .3rem;
        }
      }
    }
    .freeze {
      width: 84%;
      margin: 0.72rem auto 0;
      background: #fff;
      border-radius: 10px;
      padding-bottom: 0.8rem;
      box-shadow: 0px 0px 10px #ccc;
      .reminder {
        text-align: center;
        line-height: 1.88rem;
      }
      .btn_box_2 {
        width: 80.95%;
        margin: auto;
      }
      .btnn {
        width: 41.176%;
        line-height: 1.09rem;
        text-align: center;
        background: #ff3f30;
        border-radius: 30px;
        color: #fff;
      }
    }
  }
  .succeed_boxNew{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10000;
    text-align: center;
    .rem(font-size,24);
    color: #333333;
    img{
      width: 40%;
      margin: 2.8rem auto 0.8rem auto;
    }
    >a,>div{
      display: block;
      width: 80%;
      .rem(height,82);
      .rem(line-height,82);
      color: #fff;
      background: linear-gradient(90deg, #F73B3B, #FE7C64);
      .rem(font-size,30);
      border-radius: 50px;
      margin: 2rem auto 0 auto;
    }
  }
}
</style>
