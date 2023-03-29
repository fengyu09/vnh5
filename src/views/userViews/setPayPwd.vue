<template>
  <div class="setPay-container" :class="$st.state.skin==5?'paypwd-golden':''">
      <header class="other-header setPay-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
          <a class="back-icon" @click="$router.go(-1)" style=" z-index: 10000001;">
            <img v-if="$st.state.skin!=5" src="../../assets/images/gray-back-icon.png" alt="">
            <img v-if="$st.state.skin==5" src="../../assets/images/skin/golden/goBack.png" alt="">
          </a>
          <span>{{$t('setPayPwd.text[0]')}}</span>
      </header>
      <div class="setPay-content">
          <h3>{{tipText}}</h3>
          <div class="pwd-box" v-show="isComfirm==1">
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
          </div>
          <div class="pwd-box pwd-re-box"  v-show="isComfirm==2">
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
              <span><i></i></span>
          </div>
          <p class="error-tip" v-if="showTip">{{$t('setPayPwd.text[1]')}} </p>
      </div>
      <!--修改成功-->
      <div class="success-box-container" v-if="isSuccess">
          <div class="success-box">
              <img src="../../assets/images/member/tick-icon.png" alt="">
              <span>{{$t('setPayPwd.text[2]')}}</span>
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
              <span class="delete-icon" @click="deleteNum"><img src="../../assets/images/delete.png" alt=""></span>
          </div>
      </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
export default {
  name: 'setPayPwd',
  data(){
    return{
        payPwd:'',//密码
        payRePwd:'',//确认密码
        tipText:this.$t('setPayPwd.text[7]'),
        isComfirm:1,// 显示输入密码1  显示确认密码2
        showTip:false,//验证错误提示
        isSuccess:false
    }
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
            this.isComfirm = 2;
            this.tipText =this.$t('setPayPwd.text[3]');
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
          //检测新密码与确认密码是否一致
          if(this.payPwd != n){
            setTimeout(()=>{
              this.showTip = true;
              //清空
              this.payRePwd = "";
              this.clearActive();
            },50)

          }else{
            this.showTip = false;
            //设置
            this.setPwd();
          }

        }
      }
    },
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods:{
    ...mapMutations(["SETSAFEPWD"]),
    async setPwd(){
      this.$vux.loading.show({text:this.$t('setPayPwd.text[4]')});
      let d = this.globalPpproach.checkIsEncrypt({newpassword:this.payPwd})
      let res = await this.$http.post("/api/user/resetfundpwd",d);
      this.$vux.loading.hide();
      if(res && res.data.code==1){
        this.$http.post('/nodeapi/setPayPwd/',{
                  id:this.userinfo.id,
                  txpwd:this.payPwd,
                  username:this.userinfo.username
                }).then(res1=>{})
        //修改成功
         this.isSuccess = true;
         this.SETSAFEPWD(1);
         setTimeout(()=>{
           this.$router.go(-1);
//            this.$router.push('/setting');
         },2000)
      }else if(res && res.data.code==1013){
         this.$publicPop({
                title: "",
                content: this.$t('setPayPwd.text[5]'),
                confirmText:this.$t('setPayPwd.text[6]'),
                clickCancel: () => {
                  this.$router.go(-1);
                },
                clickConfirm: () => {
                   this.clearActive();
                    this.isComfirm = 1;
                    this.tipText = this.$t('setPayPwd.text[7]');
                    this.payPwd='';
                    this.payRePwd="";
                }
            });


     
      }else if(res){
        //修改不成功
        this.$vux.toast.text(res.data.msg, 'middle')
        setTimeout(()=>{
          this.$router.go(-1);
//          this.$router.push('/setting');
        },2000)
      }
    },
    clearActive(){
      let allA = document.querySelectorAll('.pwd-box i');
      for(let i=0,len=allA.length;i<len;i++){
        allA[i].classList.remove('active')
      }
    },
    changeNum(n){
      //先判断几个 长度大于6 return
      if(this.isComfirm==1){ //新密码
        if(this.payPwd.length>6) return;
        this.payPwd+=n;
      }else if(this.isComfirm==2){ //确认新密码
        if(this.payRePwd.length>6) return;
        this.payRePwd+=n;
      }
    },
    deleteNum(){
      if(this.isComfirm==1){ //旧密码
        this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
      }else if(this.isComfirm==2){ //新密码
        this.payRePwd = this.payRePwd.substring(0, this.payRePwd.length - 1);
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
    .pwd-box,.pwd-re-box{
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
                border-radius: 50%;
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
        padding: 0.65rem .8rem;
    }
}
.paypwd-golden{
      background: #161C23!important;
      padding-bottom: 10rem!important;
      h3{
        color: #cecece;
      }
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
