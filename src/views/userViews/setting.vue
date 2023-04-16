
<template>
  <div class="allInfo">
    <div class="head" :class="$st.state.skin==5?'goldenHeader':''">
      <div @click="goback" style="z-index: 10000001;" >
         <img style="width: 0.31rem;margin-top: .3rem" v-if="$st.state.skin!=5" src="../../assets/images/gray-back-icon.png" alt="">
          <img style="width: 0.31rem;margin-top: .3rem" v-if="$st.state.skin==5" src="../../assets/images/skin/golden/goBack.png" alt="">
      </div>
      <span>{{$t('setting.text[0]')}}</span>
    </div>
    <myScroll
            :bgColor="$st.state.skin==5?'161C23':'F0F0F0'"
            :top="1.2" :bottom="0"
          >
          <div id="borderGroup" class="borderGroup" :class="$st.state.skin==5?'borderGroup-golden':''">
          <group>
            <router-link class="link bot" to="/changePwd">
              <cell-box is-link  style="font-size: .38rem;padding: .44rem 5.3%;">{{$t('setting.text[1]')}}</cell-box>
              <img src="../../assets/images/enter-seeding.png" alt />
            </router-link>
            <a class="link  bot" href="javascript:;" @click="goPayW">
              <cell :title="$t('setting.text[2]')" :value="payValue"  style="font-size: .38rem;padding: .44rem 5.3%;" is-link></cell>
              <img src="../../assets/images/enter-seeding.png" alt />
            </a>
        </group>
    </div>
    <div class="logout">
      <x-button @click.native="logout" class="btn" type="primary" button-global-border-radius style="height:1.2rem;font-size: .38rem;color:#666" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('setting.text[3]')}}</x-button>
    </div>
          </myScroll>
    
  </div>
</template>
  
<script>
import {  Cell, CellBox } from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  name: "setting",
  components: {
    Cell,
    CellBox,
  },
  computed: {
    ...mapState(["safePwd","suspension","skin","webInitData","userinfo"])
  },
  data() {
    return {
        payValue:"",
        isSet:'',
        linkUrl:'/setPayPwd',
        active:true,
        active1:false,
    };
  },
  created() {
    this.checkPay();
   if(this.suspension==1){
     this.active=true;
     this.active1=false;
   } else if(this.suspension==0){
     

     this.active=false;
     this.active1=true;
   }
  },
  methods: {
    ...mapMutations(["SETUSERTOKEN", "SETUSERINFO", "SETPIC","SETSAFEPWD","SETUSERVIP","SETHDNOTICESCONTENT","SETSUSPENSION","SETUSERNAME","SETUSER_TYPE","SETISDECIPHER","SETRAIN","SETHOMENAV","SETDIAMOND","SETUSDTLIST","SETSDTYPE","SETSDADR"]),
    goback() {
      this.$router.push('/member');
    },
    //退出
    logout: function() {
      
      this.$publicPop({
          title: "",
          content: this.$t('setting.text[4]'),
          clickCancel: () => {
            
          },
          clickConfirm: () => {
              this.$http.post("/api/user/logout").then(res => {
                if (res && res.data.code == 1) {
                  this.$http.post('/nodeapi/setOnline/',{id:this.userinfo.id,onLine:0}).then(res=>{});
                  this.$vux.toast.show({ text:res.data.msg });
                  this.$http.defaults.headers['token'] = '';
                  this.SETUSERTOKEN("");
                  this.SETPIC("");
                  this.SETUSERINFO("");
                  this.SETSAFEPWD("");
                  this.SETUSERVIP("");
                  this.SETHDNOTICESCONTENT("");
                  this.$ro.push("/member");
                  localStorage.setItem('currCommonCard','')
                  this.SETUSERNAME("");
                  this.SETUSER_TYPE("");
                  this.SETISDECIPHER("");
                  this.SETRAIN(false);
                  localStorage.setItem('home_tab_nav','');
                  localStorage.setItem('vtList',{});
                  this.SETHOMENAV('')
                  this.SETDIAMOND('');
                  this.SETUSDTLIST([]);
                  this.SETSDADR('');
                  this.SETSDTYPE();
                }
              });
  
          }
      });


     
    },
    toSelect(){
     
      if(this.active==true && this.active1==false){
        this.active=false;
        this.active1 = true
       this.SETSUSPENSION(0)
      } else if(this.active==false && this.active1==true) {
         this.active=true;
         this.active1=false;
        this.SETSUSPENSION(1)
      }
    },
    //点击
    goPayW(){
      if(this.$store.state.userinfo.user_id<0){
      
          this.$swBox({
             title: this.$t('tsTitle'),
            content: this.$t('swTip'),
            leftBtn: this.$t('loginText'),
            rightBtn:this.$t('registerText'),
            clickL: () => {
                this.SETUSERTOKEN('')
                this.$router.push('/login');
            },
            clickR: () => {
                this.SETUSERTOKEN('')
                if(this.noticeType==1){
                    this.$router.push('/register');
                    
                }else{
                    this.$router.push('/RegisterDl');
                    
                }
            }
        });
        return
      }
      if(this.safePwd== 10){
        this.isSet = this.$t('setting.text[5]');

        this.$publicPop({
          title: this.$t('setting.text[6]'),
          content: this.$t('setting.text[7]'),
          confirmText:this.$t('setting.text[8]'),
          clickCancel: () => {
            
          },
          clickConfirm: () => {
              this.goOnline();
          }
      });  



      
      }else {
        this.$router.push(this.linkUrl);
      }
    },
    //检测是否设置过支付密码
    async checkPay(){
      if(this.$store.state.userinfo.user_id<0) return
        //缓存
        if(this.safePwd==1 || this.safePwd==2 || this.safePwd== 10){
          if(this.safePwd==1 || this.safePwd== 10){
            this.payValue = "";
            this.isSet = this.$t('setting.text[5]');
            this.linkUrl='/changePayPwd';
          }else if(this.safePwd==2){
            this.payValue=this.$t('setting.text[9]');
            this.isSet = this.$t('setting.text[10]');
            this.linkUrl='/setPayPwd';
          }
          return
        }
        this.$vux.loading.show({text:this.$t('setting.text[11]')});
        let res = await this.$http.get('/api/user/chkexistsfundpwd');
        this.$vux.loading.hide();
        if(res && res.data.code==1){
          //已经设置
          this.payValue = "";
          this.isSet = this.$t('setting.text[5]');
          this.linkUrl='/changePayPwd';
          this.SETSAFEPWD(1)
        }else if(res && res.data.code==2){
          //未设置
          this.payValue=this.$t('setting.text[9]');
          this.isSet = this.$t('setting.text[10]');
          this.linkUrl='/setPayPwd';
          this.SETSAFEPWD(2)
        }else if(res && res.data.code==10){
          this.SETSAFEPWD(10)
        }
         this.SETSUSPENSION(1)
    },
    alertLL(url,title){
      android.show(url,title)
    },
    goOnline(){
     
      window.open(JSON.parse(this.webInitData).customer)
    },

  }
};
</script>
  
<style scoped lang="less">
.head {
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  position: relative;
  font-size: 0.42rem;
  font-weight: bold;
  /* border-bottom: solid 1px #ccc; */
}
.headZl {
  text-align: center;
  font-size: 1.3em !important;
  font-weight: bold;
  line-height: 3em;
}
.head>div {
  position: absolute;
  top: 0rem;
  left: .35rem;
  width: 1rem;
  height: 100%;
  text-align: left;
  /*float: left;*/
  /*width: 33%;*/
  /* line-height: 4em  */
}

.logout {
  width: 81.33%;
  /*height: 3.1em;*/
  margin: 0.8rem auto 0;

  line-height: 3em;
  text-align: center;

  font-size: 0.35rem;
  position: relative;
  // top: -5em;
  .btn {
    color: #fff !important;
    // background: linear-gradient(to right, rgb(255, 50, 49), rgb(255, 127, 103));
    background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    border-radius: 99px;
    border: 0;
  }
  .skin-btn-golden{
  color: #A85100 !important;
}
  .btn:after {
    border: 0;
  }
}

.changeColo{
  .select{
    width: 1rem;
  }
}

.link{
    display: block;
    overflow: hidden;
    position: relative;
}
.link img{
      width: 1em;
    position: absolute;
    top: 14px;
    right: 16px;
}
.bot{
    border-bottom:solid 1px #f5f5f5;
}
.weui-cells:before{
    border-top: 0!important;
}
.borderGroup-golden{
  .weui-cells{
    background-color: #1F252C;
  }
  
}

</style>