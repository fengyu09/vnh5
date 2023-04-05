<template>
  <div id="app">
    <!-- <router-view :key="keysV"></router-view> -->
    <keep-alive :include="['preferential',]">
       <router-view v-if="['Activities',].includes($route.name)" ></router-view>
       <router-view v-else  :key="keysV"></router-view>
    </keep-alive>
    <lg-preview></lg-preview>


    <!-- 中奖提示 -->
    <div>
      <popup v-model="show10" position="top" :show-mask="false"
        style="width: 90%;background-color: #fff;margin-left:5%;top: 1%;font-size:.4rem;border-radius: 5px;z-index:9999">
        <div class="position-vertical-demo">
          <img src="./assets/images/chat/open_remind.png" alt />

          <span style="line-height: 0.45rem;font-size: 0.3rem;">
            {{lotteryMsg}}
          </span>
        </div>
      </popup>
    </div>
    <!-- 系统公告 -->
    <div class="notice-box-bg" @click="hidenotice" v-if="noticeShow == true&&noticeData!=''&&$store.state.codeToken">
    </div>
    <div class="notice" v-if="noticeShow == true&&noticeData!=''&&$store.state.codeToken">
      <div class="notice-box">
        <span class="notice-img" v-if="$store.state.skin==4">
          <img src="./assets/images/notice-gf-maingreen.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg-maingreen.png" v-else alt />
        </span>
        <span class="notice-img" v-if="$store.state.skin==5">
          <img src="./assets/images/notice-gfbg-golden.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg-golden.png" v-else alt />
        </span>
        <span class="notice-img" v-if="$store.state.skin==3">
          <img src="./assets/images/notice-gfbg-green.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg-green.png" v-else alt />
        </span>
        <span class="notice-img" v-if="$store.state.skin==2">
          <img src="./assets/images/notice-gfbg-blue.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg-blue.png" v-else alt />
        </span>
        <span class="notice-img" v-if="$store.state.skin==1">
          <img src="./assets/images/notice-gfbg-pink.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg-pink.png" v-else alt />
        </span>
        <span class="notice-img"
          v-if="$store.state.skin!=1&&$store.state.skin!=2&&$store.state.skin!=3&&$store.state.skin!=4&&$store.state.skin!=5">
          <img src="./assets/images/notice-gfbg.png" v-if="noticeType==1" alt />
          <img src="./assets/images/notice-dlbg.png" v-else alt />
        </span>
        <span class="notice-title" v-if="noticeType==1">{{$t('gfTitle')}}</span>
        <span class="notice-title" v-if="noticeType==2">{{$t('dlTitle')}}</span>
        <div id="notice">
          <div class="notice-menu">
            <ul>
              <li :key="index"
                :class="[{ active: menuActive == index }, { 'pink-color': skin == 1 && menuActive == index }, { 'blue-color': skin == 2 && menuActive == index }, { 'green-color': skin == 3 && menuActive == index }, { 'maingreen-color': skin == 4 && menuActive == index }, { 'golden-color': skin == 5 && menuActive == index }]"
                v-for="(item,index) in noticeData" @click="menuActive=index"><span>{{item.name}}</span></li>

            </ul>
          </div>
          <div class="notice-content">
            <myScroll :bottom="0" :top="0">
              <div :key='index' class="content-text" v-for="(item,index) in noticeData[menuActive].data">
                <h2 style="text-align: center;margin-bottom: 0.2rem;">{{item.title}}</h2>
                <div v-html="item.content">
                </div>
              </div>
            </myScroll>
          </div>


        </div>

      </div>
      <div class="notice-close" @click="hidenotice">
        x
      </div>
    </div>
    <chatRoom v-if="chatShow" />
    <whPage :msgText="msgText" v-if="showWh" />
    <div class="float-box" ref="floatButton" :style="{'left': left + 'px', 'top': top + 'px'}" v-show="showMenu">
      <ul :class="{'hd-list':true, 'hd-list-left':left<clientWidth/2-itemWidth/2,'show-list':isshowHd}" ref="floatMenu">
        <li @click="goServe()"> <img src="./assets/images/xf_icon10.png" alt="" srcset=""> </li>
        <li @click="changeChat()" v-if="lanCode==1"> <img src="./assets/images/xf_icon9.png" alt="" srcset=""> </li>
        <li @click="changeChat()" v-if="lanCode==2||lanCode==5"> <img src="./assets/images/chat_icon.png" alt=""
            srcset=""> </li>
        <li @click="changeVersion(1)" v-if="currversion==2"> <img src="./assets/images/newHome/ToOld2.png" alt=""
        srcset=""> </li>
        <li @click="changeVersion(2)" v-if="currversion==1"> <img src="./assets/images/newHome/ToNew2.png" alt=""
        srcset=""> </li>
        <li @click="changeMoney(1)" > <img v-if="lanCode==1" src="./assets/images/xf_icon12.png" alt="" srcset=""> <img v-else src="./assets/images/xf_icon11.png" alt="" srcset=""></img> </li>
        <li @click="changeMoney(2)" > <img v-if="lanCode==1"  src="./assets/images/xf_icon14.png" alt="" srcset="">  <img v-else  src="./assets/images/xf_icon13.png" alt="" srcset="">  </li>

      </ul>
      <div @click="isshowHd=!isshowHd" style="text-align: center;position: relative;" v-if="!showHbyDjs">
        <img src="./assets/images/xf_icon.png" alt="" srcset="" :class="{active:activeImg,defaultBtn:true}"
          v-if="!isshowHd">
        <img src="./assets/images/xf_icon2.png" alt="" srcset="" v-if="isshowHd" style="width: 80%;margin-top: 10%;">
      </div>
      <div style="text-align: center;position: relative;" class="hby-djs" v-if="showHbyDjs" @click="goHby2()">
        <img src="./assets/images/xf_icon7.png" alt="" srcset="">
        <i>{{hbyDjs}}</i>
      </div>

    </div>

    <div class="close-float" ref="closeFloat" v-show="showFl">
      <img src="./assets/images/newTask/Group 101.png" alt="" srcset="">
      <p>{{$t('app.text[3]')}}</p>
    </div>
    <div class="float-bg" v-if="isshowHd" @click="isshowHd=false">

    </div>
    <div class="iframe_load" v-if="showiframeLoad">
      <img src="../public/logo2.png" alt="" srcset="">
    </div>
    <iframe v-if="isloadTy" v-show="showtyUrl&&tygameUrl!=''" @load="rameLoad" :src="tygameUrl" id="myiframe" scrolling="yes" frameborder="0"></iframe>
    
  </div>
</template>

<script>
import { Popup } from "vux";
import { setToken } from './store/cookie';
import { mapState, mapMutations } from "vuex";
import chatRoom from "./views/guessing/chatRoom.vue";
import whPage from "./components/wh.vue";

export default {
  name: "app",
  components: { Popup ,chatRoom,whPage},
  data: function() {
    return {
      showMenu:true,
      show10: false,
      noticeShow: false,
      mess: "",
      websock:null,
      socketData:'',
      lotteryMsg:'',
      ServerPushType:null,
      socketSetInterval:'',
      baseOnline:0,
      menuActive:0,
      // noticeData:'',
      zcGif:false,
      zcLQ:false,
      selectIndex:false,
      showZC:false,
      isRed_pop:false,
      isFadein:false,
      isRed:true,
      showFl:false,
      showHb:false,
       clientWidth: 0,
        clientHeight: 0,
        timer: null,
        currentTop: 0,
        left: 0,
        top: 400,
        itemWidth:0,
        itemHeight:0,
        gapWidth:0,
        coefficientHeight:0,
        activeImg:false,
        isshowHd:false,
        floatTimer:null,
        hotMatchList:[],
        hbyDjs:'--:--',
        showHbyDjs:false,
        hbyDjsTime:0,
        hbInterval:null,
        chatSocket:'ws://54.255.11.229:18305/wss',
        showSjb:false,
        showWh:false,
        isloadTy:false,
        loadTyTimeout:null,
        msgText:''
        // isBb:true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{  //  这里的vm指的就是vue实例，可以用来当做this使用
        // console.log(to)
        
        // vm.lastRoute = from.name;
    })
  },
  created() {
    this.loginType()
    clearInterval(this.hbInterval)
    this.hbInterval=setInterval(() => {
      if(this.userinfo.user_id){this.loginType()}
    },240000);
    this.getWhStatus()
    this.getInit();
    this.getLanConfig();
    setTimeout(() => {
      this.openPure2=1
    }, 3000);

  
    this.initWebSocket();
    if(this.$route.query.c&&this.$route.query.c!='undefined') {
      localStorage.setItem('c',this.$route.query.c);
      if(this.noticeType==1){
        this.$router.push('/register?c='+this.$route.query.c)
      }else{
        this.$router.push('/RegisterDl?c='+this.$route.query.c)
      }
    }
    
  },
  
  computed: {
    ...mapState(["isNotice","userinfo","onlinenumber","username","codeToken","webInitData","zcGifShow","skin","UserId","isPure","hotMatch","isBb","skin","historyGame","chatShow","currversion","defalutLan","lanCode",'defalutLan',"noticeData","tygameUrl","showtyUrl","showiframeLoad"]),
    keysV(){
   			return this.$route.path + Math.random()
   		}
	
  },
  
  watch: {
    $route: function(i) {
      this.isFadein = this.$route.meta.isClude;
      this.$vux.toast.hide();
      this.$vux.loading.hide();
      this.$vux.confirm.hide();
      if(this.$route.path!='/toGame/bbin_sport/sport/-1'){
        this.SETTYSHOW(false)
      }
      if (this.$route.path == "/kLottery")
        document.body.style.background = "#f7f7f7";
      else document.body.style.background = "#fff";
      // console.log(this.$route.path)
      if(this.$route.path == "/vipDetailsIos"||this.$route.path == "/userAgreement2"||this.$route.path == "/userAgreement"){
        this.showZC = false;
      }
      

    

      // console.log(i)
      if(i.path=='/'||i.path=='oldHome'){
        if(this.currversion==1){
            this.$router.push('/')
        }else if(this.currversion==2){
            this.$router.push('/oldHome')
        }
      }
      this.getWhStatus()
    },
    isNotice:function(i){
      if(i=='no'){
        this.noticeShow=false
      }
      else{
        this.noticeShow=true
      }
    },
    openPure2:function(i){
       this.$nextTick(() => {
         this.floatIint()
       })
      
      
    },
    mess: function(n, o) {

    },
    'userinfo.user_id':function(i){
    // let loginData={type:'login',client_id:this.socketData.client_id,user_id:i?i:0,client_type:'H5'}
    // this.websocketsend(JSON.stringify(loginData))
    //暂时注释
    if(i){
       //暂时注释
      // this.getHbydjs()
    }
    else{
      this.showHbyDjs=false
    }
    },
   
    codeToken:function(i){
      if(i!=''){
        if(localStorage.getItem('HotMatchTime')!=new Date().getDate()||localStorage.getItem('HotMatchId')!=this.userinfo.user_id){
          localStorage.setItem('HotMatchTime',new Date().getDate());
          localStorage.setItem('HotMatchId',this.userinfo.user_id);
        }
      }
    },
    showtyUrl:function(i){
      if(i){
        this.isloadTy=true
        clearTimeout(this.loadTyTimeout)
      }else{
      this.loadTyTimeout=setTimeout(() => {
          if(!this.showtyUrl){
            this.isloadTy=false
          }
        }, 30000);
      }
    },
    isloadTy:function(i){
      if(i){
        this.$vux.loading.show();
       this.SETIFRAMELOAD(true)
      }
    }
  },
  mounted() {
  // this.showWh=window.isshowwh
    // document.body.addEventListener(
    //             "touchmove",
    //             function(e) {
    //                 e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    //             },
    //             { passive: false }
    //         );
    
    
   
      this.$nextTick(() => {
         this.floatIint()
          // console.log(this.left)
          const floatButton = this.$refs.floatButton
          floatButton.addEventListener("touchstart", (e) => {
            
            this.activeImg=true
            clearTimeout(this.floatTimer)
              floatButton.style.transition = 'none'
          })
          
          // 在拖拽的过程中，组件应该跟随手指的移动而移动。
          floatButton.addEventListener("touchmove", (e) => {
            if(e.target.tagName=='LI'||e.target.tagName=='UL'){
              return
            }
            this.showFl=true
            
             this.showFl=true
              if (e.targetTouches.length === 1) {       
                this.activeImg=true 
                  let touch = e.targetTouches[0]
                  this.left = touch.clientX - this.itemWidth/2
                  if(touch.clientY - this.itemHeight/2<0){
                    this.top = 0
                  }
                  else if(touch.clientY >document.documentElement.clientHeight-this.itemHeight/2){
                    this.top = document.documentElement.clientHeight-this.itemHeight
                  }
                  else{
                     this.top = touch.clientY - this.itemHeight/2
                  }
                  
                  
              }
          })
          
    // 拖拽结束以后，重新调整组件的位置并重新设置过度动画。
          floatButton.addEventListener("touchend", (e) => {
           let x= this.clientWidth-this.left<this.$refs.closeFloat.clientWidth
           let y=this.clientHeight-this.top<this.$refs.closeFloat.clientWidth
           if(x&&y){
             this.SETOPENPURE2(0);
             this.showMenu=false
             this.isshowHd=false;
           }
            this.showFl=false
            this.floatTimer=setTimeout(() => {
              this.activeImg=false 
            }, 3000);
              floatButton.style.transition = 'all 0.3s'
              if(this.left > document.documentElement.clientWidth / 2) {
                  this.left = document.documentElement.clientWidth - this.itemWidth-10
              }else{
                  this.left = 10
              }
          })
          const floatMenu = this.$refs.floatMenu;
          let touchstarty=0
          let rotateY=0
          floatMenu.addEventListener("touchstart", (e) => {
            touchstarty=e.touches[0].pageY;
          })
          floatMenu.addEventListener("touchmove", (e) => {
            var _x=e.touches[0].pageX;
            var _y=e.touches[0].pageY;
           if(this.left<this.clientWidth/2-this.itemWidth/2){
             floatMenu.style.transform = 'rotate(' + (rotateY+(_y-touchstarty)) + 'deg)'
           }else{
              floatMenu.style.transform = 'rotate(' + -(rotateY+(_y-touchstarty)) + 'deg)'
           }
            
          })
           floatMenu.addEventListener("touchend", (e) => {
            rotateY=rotateY+e.changedTouches[0].pageY-touchstarty
            if(this.left<this.clientWidth/2-this.itemWidth/2){
              document.querySelectorAll('.hd-list li img').forEach((t,i)=>{
              t.style.transform= 'rotate(' + -rotateY+ 'deg)'
            })
           }else{
             document.querySelectorAll('.hd-list li img').forEach((t,i)=>{
              t.style.transform= 'rotate(' + rotateY+ 'deg)'
            })
           }
           
            
          })
      })
     // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener('hashchange', () => {
      let currentPath = window.location.hash.slice(1)
      if (this.$route.path !== currentPath) {
        this.$router.push(currentPath)
      }
    }, false)
    
    if (/Android/.test(navigator.appVersion)) {
      window.addEventListener("resize", function() {
        if (
          document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA"
        ) {
          document.activeElement.scrollIntoView();
        }
      });
    }

    if (this.$route.path == "/kLottery")
      document.body.style.background = "#f7f7f7";
    else document.body.style.background = "#fff";
    if(this.socketSetInterval){
      clearInterval(this.socketSetInterval)
    }
    this.socketSetInterval=setInterval(() => {
     if(this.websock.readyState==1||this.websock.readyState==2){
     }else if(this.websock.readyState==3){
       this.initWebSocket()
     }
    }, 20000);

  },
  filters:{
  },
  methods: {
    ...mapMutations(["SETISNOTICE","SETPURE","SETONLINENUMBER","SETOPENPURE","SETPURE","SETOPENPURE2","SETWEBDATA","SETCLOSEDATA","SETZCGIF","SETSKINDATA","SETZJArr","SETCLDATA","SETUSERTOKEN","SETHOTMATCH","SETISBB","SETENCRYPT","SETCHAT","SETVERSION","SETMSGPOINT","SETLANLIST","SETDEFAULTLAN","SETNOTICEDATA","SETTYSHOW","SETIFRAMELOAD"]),

    // 获取全局配置 语言 和 是否加密
    async getLanConfig(){
      let r = await this.$http.get('/api/common/config');
      this.SETENCRYPT(r.data.data.is_encrypt);
      this.SETDEFAULTLAN(r.data.data.current_lang);
      this.$SetLanguage(localStorage.getItem('Language')||r.data.data.current_lang);
      this.SETLANLIST(r.data.data.languages||[])
      if(this.noticeType==1){
          if(this.$route.name!='toGame') this.getXtNotice();//官方弹框消息
      }else{
          if(this.$route.name!='toGame') this.getDlXtNotice();//代理弹框消息
      }
      this.getXsType();
     

    },
    rameLoad(){
      if(this.tygameUrl!=''){
        this.$vux.loading.hide();
      this.SETIFRAMELOAD(false)
      }
      
    },
    getWhStatus(){
      this.$http.get('/nodeapi/whstatus/?sid=1').then(res=>{
      this.showWh=res.data.data.iswh
      this.msgText=res.data.data.whText
      if(this.showWh){
        return
      }
  })
    },
    loginType(){
      this.$http.get('/nodeapi/settinglist',{
                params: {
                    username:this.userinfo.username,
                }
            }).then(res=>{
              console.log(res)
          if(res.data.data.length==1){
            localStorage.setItem('isLogin',res.data.data[0].status)
          }
    })
    },
   changeVersion(n){
      this.SETVERSION(n);
       if(n==1){
          this.$router.push('/')
       }else if(n==2){
          this.$router.push('/oldHome')
       }
      // this.$router.push('/oldHome');
    },
    goServe(){
      // this.$router.push('/service');
      // this.SETCHAT(false);
      window.open('https://direct.lc.chat/13287642/')
    },
    changeChat(){
      if(!this.codeToken) return this.$popup();
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
            return;
        }
     if(this.chatShow){
        this.SETCHAT(false)
     }else{
        this.SETCHAT(true)
     }
   

    },
    changeMoney(c){
      if(!this.codeToken) return this.$popup();
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
            return;
        }
     if(c==1){
      this.$router.push('/recharge');
     }else{
      this.$router.push('/tx');
     }
   

    },
    goHby2(){
      this.isshowHd = false;
      // this.hotMatch = false;
      this.SETHOTMATCH(false)
      this.showHb=true;
    },
   
    floatIint(){
      this.itemWidth=this.$refs.floatButton.clientWidth
      this.itemHeight=this.$refs.floatButton.clientHeight
      this.clientWidth = document.documentElement.clientWidth
      this.clientHeight = document.documentElement.clientHeight
      this.left = this.clientWidth - this.itemWidth - this.gapWidth-10
    },
    
     handleScrollStart() {
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
              this.handleScrollEnd()
          }, 300)
          this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
          if(this.left > this.clientWidth / 2) {
              this.left = this.clientWidth - this.itemWidth / 2
          } else {
              this.left = -this.itemWidth / 2
          }
      },
      handleScrollEnd(){
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          if(scrollTop === this.currentTop) {
              if(this.left > this.clientWidth/2) {
                  this.left = this.clientWidth - this.itemWidth - this.gapWidth
              } else {
                  this.left = this.gapWidth
              }
              clearTimeout(this.timer)
          }
      },
    async getXsType(){
        if(localStorage.getItem('isSetType')) return ;
        let res = await this.$http.get('/api/common/get_h5_version',{
            params:{
                host:location.host
                // host:'lgzb18.com'
            }
        })
        if(res.data.data!=null && res.data.code==1){
            if(res.data.data.default==2){
                this.SETPURE(1);//控制显示哪个版本 纯净版
                if(this.$route.name=='home'){
                    // this.$router.push('/gameCenter');
                }
            }else{
                this.SETPURE(0);//控制显示哪个版本 直播版
            }
            // this.SETISBB(res.data.data.isshow);//是否显示切换版本按钮
            // this.SETOPENPURE(res.data.data.isshow);//控制悬浮按钮是否显示
            // this.SETOPENPURE2(res.data.data.isshow);//控制悬浮按钮是否显示
            //修改后，悬浮按钮都显示  无论是哪个版本
            this.SETOPENPURE(1);
            this.SETOPENPURE2(1);
            localStorage.setItem('isSetType',true);
        }else{
          //测试需要用  打包线上去掉
            this.SETOPENPURE(1);
            this.SETOPENPURE2(1);
            localStorage.setItem('isSetType',true);
        }
    },
    getBalance () {
      this.$store.dispatch('getHotZb')
    },
    getNewApi(){
      this.$http.get('/getvnLine').then(res=>{
        if(res.data.data.uri_a) setToken('gfios',res.data.data.uri_a);//官方ios下载链接  
        if(res.data.data.uri_b) setToken('gfanz',res.data.data.uri_b);//官方安卓下载链接
        if(res.data.data.uri_c) setToken('dlios',res.data.data.uri_c);//代理ios下载链接
        if(res.data.data.uri_d) setToken('dlanz',res.data.data.uri_d);//代理安卓下载链接
        
        
      })
    },
  
    goRegister(){
      if(this.noticeType==1){
        if(this.$route.query.c&&this.$route.query.c!='undefined'){
          this.$router.push('/register?c='+this.$route.query.c)
        }else{
          this.$router.push('/register?c=')
        }
      }else{
        if(this.$route.query.c&&this.$route.query.c!='undefined'){
          this.$router.push('/RegisterDl?c='+this.$route.query.c)
        }else{
         this.$router.push('/RegisterDl?c=')
        }
      }
      if(this.selectIndex){
        this.showZC = false;
        this.SETZCGIF(false)
      }else{
        this.showZC = false;
      }

    },
   
    async getInit(){
        if(this.currversion){
          // this.$router.push('/');
          this.SETVERSION(this.currversion)
        }else{
          // this.$router.push('/oldHome');
           this.SETVERSION(1);
        }

      // console.log(this.$route)
      // console.log(this.currversion)
      //   if(this.$route.path=='/'||this.$route.path=='/oldHome'){
      //     if(this.currversion==1){
      //         // this.$router.push('/')
      //     }else if(this.currversion==2){
      //         // this.$router.push('/oldHome')
      //     }
      //   }else{
      //     console.log(909090909090)
      //   }

          if(this.skin){
             this.SETSKINDATA(this.skin);
          }else{
            //默认的皮肤  下个版本默认5 黑金
             this.SETSKINDATA(5);
          }
          let res = await this.$http.get('/api/common/siteConfig',{
              params:{
                  client:1,
                  version:'3.2.1'
              }
          });
          if(res){
              this.SETWEBDATA(JSON.stringify(res.data.data));
              this.isRed_pop = res.data.data.redpaper_pop; 
              
          }
      },
     
    initWebSocket(){
      let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
      //  let wsServer =this.chatSocket
      this.websock = new WebSocket(wsServer);
      this.websock.onmessage=this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
   websocketonmessage:function(e){
     let socketData=JSON.parse(e.data)
    if(socketData.type=='connected'){
      // this.$store.state.userinfo.user_id
      this.socketData=JSON.parse(e.data)
      let loginData={type:'login',client_id:this.socketData.client_id,user_id:this.$store.state.userinfo.user_id?this.$store.state.userinfo.user_id:0,client_type:'H5'}
      this.websocketsend(JSON.stringify(loginData))
    }
    if(socketData.type=='server_push'){
      if(!this.chatShow){
        this.SETMSGPOINT(true)
      }
      // 中奖提示
      if(socketData.msg_type=='prize_reminder'){
        this.ServerPushType=false
        this.show10 = true;
        this.lotteryMsg=socketData.msg;
        let confirmData={type:'confirm',event:'open_lottery_push',client_id:this.socketData.client_id,user_id:this.$store.state.userinfo.user_id,msg_id:socketData.data.msg_id}
      }
      
      if(socketData.msg_type == 'market_reminder'){
        let isSuccessDate = {
          type:'confirm',
          event:'market_reminder',
          client_id:this.socketData.client_id,
          user_id:this.$store.state.userinfo.user_id,
          msg_id:socketData.data.msg_id
        }
        if(socketData.code == 1){
           this.$publicPop({
                title: this.$t('app.text[0]'),
                content: socketData.data.market_reminder,
                isShowCancelButton:false,
                clickCancel: () => {
                    
                },
                clickConfirm: () => {
                  this.websocketsend(JSON.stringify(isSuccessDate));
                }
            });

        }else{
            this.$publicPop({
                title: this.$t('app.text[1]'),
                content: socketData.data.market_reminder,
                confirmText:this.$t('app.text[2]'),
                clickCancel: () => {
                    this.websocketsend(JSON.stringify(isSuccessDate));
                },
                clickConfirm: () => {
                 this.websocketsend(JSON.stringify(isSuccessDate));
              this.goOnline();
                }
            });

        } 
      }
     
      if (window.timer_push_out)
          clearTimeout(window.timer_push_out);
        window.timer_push_out = setTimeout(() => {
          this.show10 = false;
        }, 4000);
    }

    if(socketData.type=='ping'){
      let pingData={type:'pong'}
      this.websocketsend(JSON.stringify(pingData))
    }
  
    
     
  },
   websocketonopen(e){
    
  },
   websocketsend(Data) {//数据发送
      this.websock.send(Data)
  },
  websocketonerror(){
     console.log('error')
  },
  websocketclose(){
  console.log('close')
  },
    hidenotice() {
    
      this.SETISNOTICE("no");
      //
    },
    

    //获取系统公告
    async getXtNotice() {
      let res = await this.$http.get("/api/live/sport/get_pop_notice/");
      if (res && res.data.code == 1) {
        // console.log(res)
        // this.noticeData=res.data.data;
        this.SETNOTICEDATA(res.data.data);
      }
    },
      //获取代理系统公告
      async getDlXtNotice() {
          let res = await this.$http.get( "/api/live/sport/get_pop_notice_dl/");
          if (res && res.data.code == 1) {
              // this.noticeData=res.data.data
              this.SETNOTICEDATA(res.data.data);
          }
      },

   
    goOnline(){
    
      window.open(JSON.parse(this.webInitData).customer)

    },

  },

};
</script>

<style lang="less">
.rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  html,
  body {
    -webkit-touch-callout: none;
    height: auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  img {
    -webkit-touch-callout: none;
    pointer-events: none;
  }
  #myiframe {
  width: 100%;
  height: 92%;
  position: absolute;
//   top: 1.2rem;
}
.iframe_load{
  width: 92px;
    height: 92px;
    position: fixed;
    left: 50%;
    top: 180px;
    z-index: 99999;
    transform: translateX(-46px);
  >img{
    width: 100%;
  }
}
.vux-loading-no-text .weui-toast{
  min-height: 92px;
}
// .weui-toast{
//   background: none;
// }
// .weui-icon_toast.weui-loading{
//   animation:none;
//   width: 92px;
//   height: 92px;
//   margin: 0;
//   background: url('../public/logo2.png') no-repeat;
//   background-size: 100% 100%;
// }
// .weui-loading_toast .weui-toast__content{
//   display: none;
// }
  .key-box {
    position: fixed;
    width: 100%;
    padding: 0.3rem 0.2rem;
    background: #d0d3dc;
    bottom: 0;
    .key-item {
      span {
        float: left;
      }
      .num {
        font-weight: bold;
        font-size: 0.48rem;
        font-family: number1;
        background: #fff;
        height: 1.1rem;
        line-height: 1.1rem;
        box-shadow: 1px 2px #959698;
        border-radius: 5px;
        margin: 0 2% 0.2rem 0;
        width: 32%;
        text-align: center;
        &:nth-of-type(3n) {
          margin: 0 0 0.2rem 0;
        }
      }
      .zoro {
        margin: 0 2% 0 34%;
      }
      .delete-icon {
        text-align: center;
        display: inline-block;
        width: 32%;
        img {
          width: 0.7rem;
          padding-top: 0.38rem;
        }
      }
    }
  }

  .success-box-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    z-index: 5;
    .success-box {
      background: #fff;
      border-radius: 10px;
      margin: 60% auto 0;
      text-align: center;
      font-size: 0.38rem;
      font-weight: bold;
      width: 59.2%;
      padding: 0.5rem 0;
      img {
        width: 1.05rem;
        height: 1.05rem;
        vertical-align: middle;
        margin: 0 0.1rem;
      }
      .tip {
        display: inline-block;
        text-align: left;
        span {
          font-weight: bold;
          font-size: 0.4rem;
        }
        p {
          color: #ccc;
          font-size: 0.35rem;
        }
      }
    }
  }
  .widthSuccess {
    .success-box {
      img {
        vertical-align: bottom;
      }
    }
  }
  .error-tip {
    color: #ff513e;
    font-weight: 500;
    font-size: 0.3rem;
    padding: 0.2rem 1.8rem;
    margin-top: -0.5rem;
  }

  .member-key {
    z-index: 1000 !important;
    .pwd-box {
      margin: 0.2rem 0 0.4rem 0 !important;
      padding: 0.2rem 0 0 0 !important;
    }
    .error-tip {
      padding: 0.4rem 0.8rem 0.2rem 0.8rem !important;
    }
  }
  .width-key {
    .error-tip {
      padding: 0.4rem 0.8rem 0.2rem 0.8rem !important;
    }
  }

  .chat-pwd-success {
    z-index: 101;
  }
  .chat-key {
    z-index: 100;
    background: #fff;
    border-radius: 10px 10px 0 0;
    text-align: center;
    padding: 0.3rem 0 0 0;
    .key-content {
      background: #d0d3dc;
      overflow: hidden;
      padding: 0.2rem;
    }
    .pwd-box {
      padding: 0.2rem 0 0.5rem 0;
    }
    .error-tip {
      color: #ff513e;
      font-weight: 500;
      font-size: 0.3rem;
      padding: 0rem 0.8rem 0.3rem 0.8rem;
      text-align: left;
    }
    .title {
      font-size: 0.4rem;
      font-weight: bold;
      position: relative;
      .remove-icon {
        position: absolute;
        display: inline-block;
        right: 5.3%;
        top: 0.05rem;
        width: 0.4rem;
        height: 0.4rem;
        background: url("./assets/images/member/close.png") no-repeat center;
        background-size: 70%;
      }
    }
    .pwd-box {
      margin: 0.3rem 0 0 0;
    }
    .contact {
      color: #ff3437;
      text-decoration: underline;
      padding-bottom: 0.1rem;
    }
    .contact-tip {
      
      line-height: 1.35rem;
    }
  }

  .pwd-box,
  .pwd-re-box {
    text-align: center;
    > span {
      display: inline-block;
      border-radius: 5px;
      width: 1rem;
      height: 1rem;
      background: #f5f5f5;
      margin-right: 0.4rem;
      i {
        width: 0.26rem;
        height: 0.26rem;
        background: #f5f5f5;
        border-radius: 50%;
        display: inline-block;
        margin-top: 0.35rem;
      }
      i.active {
        background: #666;
      }
      i.red-active {
        background: #ff513e;
      }
      &:last-of-type {
        margin: 0;
      }
    }
  }
  .key-box-bg {
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99;
  }

  .header {
    position: absolute;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    top: 0;
    z-index: 100;
    background: #fff;
    font-size: 0.42rem;
    font-weight: bold;
    min-width: 320px;
    max-width: 750px;
   
  }
 
  .vue-picker .header{background: #fff;}
 
 
  .home-header {
    text-align: center;
   
  }


 .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("./assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }

  .vux-popup-dialog {
    .position-vertical-demo {
      font-size: 0.33rem;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: center;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.5rem;
        margin-right: 0.2rem;
      }
    }
  }

  .other-header {
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.42rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
    .back-icon {
      width: 0.32rem;
      position: absolute;
      left: 0.3rem;
      top: 0.14rem;
      display: inline-block;
    }
  }

  .vux-slider > .vux-indicator > a > .vux-icon-dot,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot {
    background: #fff !important;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    width: 0.5rem !important;
  }
  .vux-slider > .vux-indicator,
  .vux-slider .vux-indicator-right {
    bottom: 0.55rem !important;
    left: 50% !important;
    // right: 0 !important;
        right: inherit !important;
    transform: translateX(-50%);
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a img{
    width: 96%;
    margin: 0 auto;
    border-radius: 5px;
  }

  .swiper-container-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 27px;
    left: 0;
    width: 100%;
  }

  .swiper-pagination-bullet {
    width: 6px !important;
    height: 6px !important;
    background: #fff;
    border-radius: 50%;
    opacity: 1;
    margin: 0 3px !important;
  }
  #themeSkinXQ .swiper-pagination-bullet {
    width: 6px !important;
    height: 6px !important;
    background: #cccccc !important;
    border-radius: 50%;
    opacity: 1;
    margin: 0 3px !important;
  }
  
  #themeSkinXQ .swiper-slide-active {
    transform: scale(1) !important;
    transition: all 0.1s ease-out;
  }
  #themeSkinXQ .swiper-wrapper {
    margin-left: 1rem;
  }
  #themeSkinXQ .swiper-pagination-bullet-active {
    background: #1486FF !important;
    width: 0.5rem !important;
    border-radius: 10px !important;
  }
  .swiper-pagination-bullet-active {
    background: #fff !important;
    width: 0.5rem !important;
    border-radius: 10px !important;
  }
  #lotteryPagination.swiper-pagination-dw .swiper-pagination-bullet-active {
    background:#8EB917 !important;
  }
  #lotteryPagination.swiper-pagination-qrj .swiper-pagination-bullet-active {
    background:linear-gradient(90deg,#7832f6,#ba83ce)!important;
  }
  #lotteryPagination.swiper-pagination .swiper-pagination-bullet-active {
    background: #ff513e !important;
  }
  #lotteryPagination.swiper-pagination-dw{
    text-align: center!important;
  }
  #lotteryPagination.swiper-pagination-qrj{
    text-align: center!important;
  }

  #lotteryPagination .swiper-pagination-bullet {
    width: 0.65rem !important;
    height: 0.11rem !important;
    background: #eee;
    border-radius: 10px;
    opacity: 1;
  }

  // 资料修改页面样式
  .nickname div input {
    .rem(font-size,26)!important;
  }
   .nickname div.nick1  input {
     text-align: right!important;
   }

  .gender > div > div {
    padding: 0;
    margin: 0 !important;
    width: 100%;
    background: none !important;
  }
  .gender > div {
    width: 100%;
  }
  .gender > div > div::before {
    border: 0 !important;
  }
  .gender > div > div::after {
    border: 0 !important;
  }

  .gender .vux-cell-primary div {
    text-align: left !important;
  }

  .gender .vux-popup-picker-select span {
    color: #4b4b4b;
    font-size: 0.9em;
  }

  .area {
    width: 81.33%;
    height: 3rem;
    border-radius: 6px;
    margin: 0 auto;
    background: #f5f5f5!important;
  }
  .area1 {
    width: 100%!important;
    height: 2rem!important;
    border-radius: 6px;
    margin: 0 auto;
    background: #fff!important;
  }
  .area textarea {
    height: 2.2rem !important;
    font-size: 1.2em !important;
    // .rem(font-size,26)!important;
    color: #4b4b4b !important;
    font-family: "PingFang-SC-Medium";
  }
  .area1 textarea {
    height: 1.6rem !important;
    // font-size: 1.2em !important;
    .rem(font-size,26)!important;
    color: #999 !important;
    font-family: "PingFang-SC-Medium";
  }
  .area textarea::-webkit-textarea-placeholder {
    color: #cccccc;
  }
  // 上传头像画布样式

  .cropper-view-box,
  .cropper-face {
    border-radius: 50%;
  }

  .cropper-container {
    font-size: 0;
    line-height: 0;

    position: relative;

    -webkit-user-select: none;

    -moz-user-select: none;

    -ms-user-select: none;

    user-select: none;

    direction: ltr;
    -ms-touch-action: none;
    touch-action: none;
  }

  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg;
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .cropper-wrap-box {
    overflow: hidden;
  }

  .cropper-drag-box {
    opacity: 0;
  }

  .cropper-modal {
    opacity: 0.5;
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;

    width: 100%;
    height: 100%;

    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }

  .cropper-dashed {
    position: absolute;

    display: block;

    opacity: 0.5;
    border: 0 dashed #eee;
  }

  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }

  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px;
  }

  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;

    display: block;

    width: 0;
    height: 0;

    opacity: 0.75;
  }

  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: " ";
  }

  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px;
  }

  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px;
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;

    display: block;

    width: 100%;
    height: 100%;

    opacity: 0.1;
  }

  .cropper-face {
    top: 0;
    left: 0;
  }

  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }

  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }

  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }

  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }

  .cropper-point {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }

  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize;
  }

  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }

  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize;
  }

  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }

  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize;
  }

  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize;
  }

  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
  }

  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1;
  }

  @media (min-width: 768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px;
    }
  }

  @media (min-width: 992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px;
    }
  }

  @media (min-width: 1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: 0.75;
    }
  }

  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: " ";
    opacity: 0;
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
  }

  .cropper-hide {
    position: absolute;

    display: block;

    width: 0;
    height: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

  /*t弹窗样式修改*/
  .weui-dialog__bd {
    font-weight: bold !important;
    font-size: 0.42rem;
  }
  .weui-dialog__btn:after {
    border: none;
  }
  .weui-dialog__btn {
    color: #fff;
    background: #d7d7d7;
    margin: 0 0.55rem 0.6rem 0.55rem;
    border-radius: 20px;
    font-size: 0.36rem;
    height: 1rem;
    line-height: 1rem;
  }
  .weui-dialog {
    border-radius: 5px;
  }
  .weui-dialog__ft:after {
    border: none;
  }
  .weui-dialog__btn_primary {
    
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
  }
  .skin-pop-pink{
    .weui-dialog__btn_primary{
      background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%) !important;
    }
  }
  .skin-pop-maingreen{
    .weui-dialog__btn_primary{
      background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
    }
  }
  .skin-pop-blue{
    .weui-dialog__btn_primary{
      
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%) !important;
    }
  }
  .skin-pop-green{
    .weui-dialog__btn_primary{
      background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%) !important;
    }
  }
  .skin-pop-golden{
    
      .weui-dialog{
          background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
          border: 1px solid #746550;
          div{
            color: #E3CF95;
          }
          .weui-dialog__btn{
            background: #464B53;
            color: #cecece;
          }
          
      }
        
    
    .weui-dialog__btn_primary{
      background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
      color: #A85100 !important;
    }
  }
  .vux-prompt-msgbox {
    padding: 0.3rem 5px;
  }

  .weui-dialog {
    left: 50%;
    top: 35%;
    // top: 26.5%;
    margin-left: -150px;
    bottom: auto;
    right: auto;
    width: 80%;
  }

  .dialog-demo .weui-dialog {
    left: 50%;
    top: 20%;
    // top: 26.5%;
    margin-left: -150px;
    bottom: auto;
    right: auto;
    width: 80%;
  }
  .weui-btn {
    font-size: 0.4rem !important;
  }
  

  .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
    background-color: rgb(102, 102, 102);
  }
  .weui-mask {
    max-width: 750px;
    min-width: 320px;
  }

  .withdrawals {
    .weui-dialog__title {
      font-size: 0.4rem !important;
      font-weight: bold !important;
    }
    .weui-dialog__hd {
      padding: 2.4em 1.6em 2em;
    }
    .weui-dialog__bd {
      padding: 0 1.6em 1.45em;
    }
    .wrapperY{
      padding:0 4%!important;
    }
  }

  @media screen and (max-width: 320px) {
    #notice{
      width: 88%;
    }
    .weui-dialog {
      margin-left: -130px;
    }
  }

  

  .blue {
    background: #569ebb !important;
    color: #fff !important;
  }
  
  
  
  #borderGroup .weui-cells:before {
    border-top: 0 !important;
  }
  .borderGroup .weui-cells:after {
    border-bottom: solid 2px #f5f5f5 !important;
  }
  .borderGroup-golden .weui-cells:after {
    border-bottom: none !important;
  }
  #borderGroup .weui-cell_access.vux-cell-box:after {
    position: relative;
    display: none;
    // right: 22px;
  }
  #borderGroup .weui-cell_access .weui-cell__ft:after {
    position: relative;
    display: none;
  }
  #borderGroup .weui-cell_access span img {
    width: 10px;
  }
  #borderGroup .weui-cells {
    margin-top: 0;
    width: 100%;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #cccccc;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #cccccc;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #cccccc;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #cccccc;
  }

  .psw_1 .weui-cells::before {
    border: 0;
  }
  .psw_1 .weui-cells {
    width: 100%;
  }
  .psw_1 .weui-cells::after {
    border: 0;
  }
  //  投注
  #con {
    div {
      .content {
        height: 100% !important;
      }
    }
  }

  #Notescontact {
    div {
      .content {
        height: 100% !important;
      }
    }
  }

  .pswp__button--close {
    background-position: 0 -44px;
    display: none;
  }
  
  //系统公告
  #notice .wrapperY{
    height: 7.5rem;
    min-width: 190px;
    width: 5.6rem;
    // max-height: 6rem;
    position: relative;
  }
    #datebox .wrapperY{
      height: 9.5rem;
    }

  .notice{
    .notice-close{
        width: 0.66rem;
        height: 0.66rem;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
        text-align: center;
        line-height: 0.55rem;
        font-size: 0.5rem;
        color: #fff;
        bottom: 2.2rem;
        left: 48%;
        z-index: 100000;
    }
  }
  .notice-box-bg{
     position: fixed;
      width: 100%;
      max-width: 750px;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 100000;
      top: 0;
  }
  .notice {
    // position: fixed;
    // width: 100%;
    // max-width: 750px;
    // height: 100vh;
    // background: rgba(0, 0, 0, 0.4);
    // z-index: 100000;
    // top: 0;
    .notice-box {
      background-color: #fff;
      border-radius: 10px;
      width:92.6%;
      height: 65%;
      border-radius: 10px;
      padding-bottom: 0.94rem;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 12%;
      z-index: 100000;
        .notice-title{
            color: #fff;
            font-size: 0.54rem;
            position: absolute;
            left: 4%;
            top: 0.4rem;
            font-weight: bold;
        }
      
      #notice{
        height: 85%;
        display: flex;
        margin-top: -0.3rem;
        >div{padding-top:0.2rem; font-size: 0.32rem;}
        .notice-menu{
          height: 100%;width: 39%;text-align: center;
          ul{
            background: linear-gradient(0deg, #F1F4F7 0%, #F1F4F7 82.23%, rgba(241, 244, 247, 0) 100%);
            li{
              .rem(height,80);
              .rem(line-height,80);
              border-bottom: 1px solid #fff;
            }
            .active{
              color: #1486FF;
              background: #fff;
              box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.25);
            }
          }
        }
        .notice-content{
          width: 60%;height: 100%;position: relative;
          .content-text{padding: 0.3rem 0.3rem 0;}
        }
      }
      .notice-img {
        display: block;
        width: 100%;
        .rem(height,304);
        .rem(margin-top,-90);
 
      }
      p {
      
        font-size: 0.32rem;
        line-height: 0.62rem;
      }
      .notice-tit {
        color: #445779;
        font-size: 0.4rem;
        margin-bottom: 0.3rem;
        margin-left: 10%;
        font-weight: bold;
      }
      .notice-btn {
        display: block;
        width: 77.78%;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        background-image: linear-gradient(90deg, #ff3131 0%, #ff8067 100%),
        linear-gradient(#ff513e, #ff513e);
        background-blend-mode: normal, normal;
        border-radius: 99px;
        height: 1.068rem;
        line-height: 1.068rem;
        font-size: 0.4rem;
        margin-top: 0.7rem;
        position: relative;
        z-index: 10;
      }
    }
  }


  .close-float{
    .rem(width,165*2);
    .rem(height,165*2);
    background: url('./assets/images/newTask/xf_close.png') no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 999;
    img{
      width: 1.5rem;
    margin-left: 1.9rem;
    margin-top: 1.4rem;
    }
    p{text-align: center;
    color: #fff;
    padding-left: 1rem;
    margin-top: 0.4rem;
    font-size: 0.32rem;}
  }
  .float-bg{
    position: fixed;
    top: 0;
    left: 0;
    background:transparent;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .float-box{
    .rem(width,120);
    .rem(height, 120);
    .defaultBtn{
      opacity: 1;}
    img{width: 100%;
    &.active{
      opacity: 1;
    }
    }
    position: fixed;
    z-index: 99999;
    .hby-djs{
      img{
        animation:move 3s 0s infinite;-webkit-animation:moveHb 3s 0s infinite;
      }
      i{
   width: 100%;
    padding: 0.02rem 0;
    position: absolute;
    border-radius: 4px;
    bottom: -0.25rem;
    left: 0;
      background-image: linear-gradient(#797670, #ca7635);
    color: #fff;}
    }
    .hd-list{
      // .rem(width,490);
      width: 0;
      .rem(height, 490);
      overflow: hidden;
      transition: height 0.5s;
      background: url('./assets/images/xf_bg3.png') no-repeat;background-size:100% 100% ;position: absolute; left: -2.5rem;top: -2.5rem;
      &.show-list{.rem(width,490); transition: width 0.5s;}
      li{
        .rem(width,120);
        .rem(height, 120);
        &:nth-child(1){
          transform: translate(2.6rem, 0.15rem);
        }
        &:nth-child(2){
         transform: translate(0.8rem, -0.8rem);
        }
        &:nth-child(3){
          transform:translate(0.1rem, -0.6rem);
        }
        &:nth-child(4){
          transform: translate(0.9rem, -0.5rem);
        }
        &:nth-child(5){
          transform: translate(2.6rem, -1.6rem);
        }
      }
      &.hd-list-left{
         position: absolute; left: -2.5rem;top: -2.5rem;
         li{
        &:nth-child(1){
         transform: translate(2.3rem, 0.1rem);
        }
        &:nth-child(2){
         transform:translate(4rem, -0.8rem);
        }
         &:nth-child(3){
         transform:translate(4.8rem, -0.7rem);
        }
        &:nth-child(4){
         transform: translate(4.1rem, -0.6rem);
        }
        &:nth-child(5){
          transform: translate(2.3rem, -1.6rem);
        }
      }
      }
    }
  }
  @keyframes upgrade
    {
    from {right: -7rem;}
    to {right:9.8rem;}
    }
@keyframes moveHb
{
	0%, 65%{ 
	  -webkit-transform:rotate(0deg);
	  transform:rotate(0deg);
	}
	70% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(8deg);
	}
	75% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	80% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(6deg);
	}
	85% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	90% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(8deg);
	}
	95% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	100% {  
	  -webkit-transform:rotate(0deg);
	  transform:rotate(0deg);
	}
}

  .weui-cell__ft {
    display: none;
  }

  #borderGroup .weui-cell__ft {
    display: block !important;
  }


  

  #addCard .header{
    background: none !important;
  }
   #addCard .weui-btn_warn{
     background: linear-gradient(top left,#1486FF,#4BA1FF)!important;
   }
  #addCard .addCard-content .weui-label {
    color:#445779!important;
  }
  #addCard{
    .addCard-content{
      &.goldenForm{
        padding-top: 0.2rem;
        .weui-cells{
          background-color: #1F252C;
        }
        .vux-cell-value{
           color: #AB9B62!important;
        }
        .weui-cells:after{
          border-bottom: 1px solid #5C564D;
        }
        .weui-cell_access .weui-cell__ft:after{
           border-color: #AB9B62!important;
        }
        .tishi{
          background-color: #1F252C;
          p{
            // color: #A85100;
          }
        }
        .weui-label{
          color: #AB9B62!important;
        }
        .vux-no-group-title{
          color: #AB9B62!important;
        }
        .weui-input{
          color: #CECECE;
        }

      }
    }
  }
  .addCard {
    .weui-cell__ft{
      color:#445779!important;
    }
    x-input::-webkit-input-placeholder {
    color: #6A86B9!important;
    }
  }
  
  .addCard .weui-cell_access .weui-cell__ft:after{
    border-color:#445779!important;
  }
 .addCard input::-webkit-input-placeholder {
    color:  #6A86B9!important;
  }
  .addCard-golden {
    .weui-cell__ft{
      color:#cecece!important;
    }
    x-input::-webkit-input-placeholder {
    color: #cecece!important;
    }
  }

  .addCard-golden .weui-cell_access .weui-cell__ft:after{
    border-color:#cecece!important;
  }
 .addCard-golden input::-webkit-input-placeholder {
    color:  #cecece!important;
  }

.virtualTopUp input::-webkit-input-placeholder {
    color:  #6A86B9!important;
  }
.virtualTopUp  x-input::-webkit-input-placeholder {
    color: #6A86B9!important;
    }

  .golden input::-webkit-input-placeholder {
    color:  #cecece!important;
  }
.golden  x-input::-webkit-input-placeholder {
    color: #cecece!important;
    }
.cardRecharge input::-webkit-input-placeholder {
    color:  #6A86B9!important;
  }
.cardRecharge  x-input::-webkit-input-placeholder {
    color: #6A86B9!important;
    }


   .cardRecharge-golden input::-webkit-input-placeholder {
    color:  #cecece!important;
  }
.cardRecharge-golden  x-input::-webkit-input-placeholder {
    color: #cecece!important;
    }
  


  .whiteColor{
    color: #fff!important;
  }
  


  /*    按钮样式*/
  .main-btn{
    background:linear-gradient(90deg,rgba(247,59,59,1),rgba(252,137,74,1));
    border-radius:44px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    .rem(font-size,32);
    .rem(padding-top,28);
    .rem(padding-bottom,28);
    width: 90%;
    margin: 0 auto;
  }
  .buy-btn{
    background:#fff;
    border-color: #ff6f65;
    border: 1px solid #ff6f65;
    color: #ff3131;
    .rem(margin-bottom,60);
  }
  .loading-text{
    font-size: .35rem;
    text-align: center;
    margin-top: 1rem;
  }
  .no-data-tip {
    text-align: center;
    font-size: 0.33rem;
    padding: 0.4rem 0 .8rem 0;
    color: #666;
  }


  

  //团队报表
  .vux-calendar .weui-cell{
    padding:0!important;
  }
  #team .vux-calendar .weui-cell .vux-cell-bd{
    width: 100%!important;
    .rem(line-height,60)!important;
  }
  .vux-popup-dialog{
    // z-index: 1002!important;
  }
  .vux-popup-mask{
    // z-index: 1001!important;
  }
  #team .vux-calendar:before{
    border-top: 0px solid #D9D9D9!important;

  }
  #team .vux-popup-dialog .inline-calendar td.current > span.vux-calendar-each-date{
    background-color: #fff!important;
    color: #FF513E!important;
  }
  .bottom-line {
    text-align: center;
    font-size: 0.3rem;
    color: #ccc;
    padding-bottom: 0.7rem;
  }
  // 日历
  .inline-calendar td{
    padding: 0!important;
  }
  #home-header .inline-calendar td.current > span.vux-calendar-each-date{
    background-color: #fff!important;
    color: #FF513E!important;
  }
  .no-content{
    text-align: center;
    img{
      .rem(width,250);
      .rem(padding-top,152);
      .rem(padding-bottom,40);
    }
    p{
      // font-weight: bold;
      .rem(font-size,32);
      color: #6A86B9;
    }
  }

  #home-header .vux-calendar{
    width: 46%;
  }
  #home-header .vux-popup-dialog{
    background: #fff!important;
    top: 2.4rem!important;
  }
  .inline-calendar td.is-today, .inline-calendar td.is-today.is-disabled{
    color: #444!important;
  }
  .vux-prev-icon, .vux-next-icon{
    border: 3px solid #FF513E;
  }

  // video样式调整
  .pswp__scroll-wrap{
    display: none!important;
  }
  .video-js .vjs-mouse-display:after, .video-js .vjs-play-progress:after, .video-js .vjs-time-tooltip{
    content: ''!important;
    background-color:rgba(0, 0, 0, 0)!important;
  }
  .video-js .vjs-play-progress:before{
    top:-0.43rem!important;
  }
  //暂停出现播放按钮
  .video-js.vjs-paused .vjs-big-play-button{
    display: block!important;
    transform: translateX(-50%)!important;
    margin-left: 0!important;
  }
  .vjs-error .vjs-error-display:before{
    display: none!important;
  }
  .vjs-error .vjs-error-display .vjs-modal-dialog-content{
    line-height: 5rem!important;
  }
  // 点击屏幕暂停
  .video-js.vjs-playing .vjs-tech {
    pointer-events: auto!important;
  }
  .vjs-poster{
    background-size: cover!important;
  }
  .video-js .vjs-time-control{display:block!important;}
  .video-js .vjs-remaining-time{display: none!important;}
    .over-text{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }


    .weui-dialog{
      position:absolute!important ;
    }

    /*vip页*/
    #vipPage{
      .swiper-pagination{
        .rem(bottom,10) !important;
      }
      .swiper-pagination-bullet{
        width: 6px;
        height: 6px;
        border-radius:50%;
      }
      .swiper-pagination-bullet-active{
        width: 6px !important;
        height: 6px !important;
        border-radius:50%;
        background: #f00 !important;
      }
    }
    //个人资料
    #updateInforNew{
      .email,.phone{
        .weui-input{
          height: 1.3rem;
        }
      }
      .weui-cell{
        padding: 0!important;
        color: #6A86B9 !important
      }
      .weui-cells{
        .rem(font-size,26)!important;
        line-height:1.48rem!important;
        margin-top: 0!important;
        &:before{
          border: 0px!important;
        }
        &:after{
          border: 0px!important;
        }
      }
    }

    //回电
    .call-back-container .wrapperY{
        width: 90% !important;
        height: 14rem;
        position: relative;
        left: 5% !important;
        border-radius: .2rem;
      }

    

  #vip-ranking{
    span.swiperPag {
      display: block;
      .rem(height,40);
      align-items: center;
      .swiper-pagination-customs {
        .rem(width,70) !important;
        .rem(line-height,35) !important;
        .rem(font-size,18);
        color: #666;
        text-align: center;
        background: url("./assets/images/vipRanking/page_m.png") center no-repeat;
        background-size: 100% 100%;
        border-radius:4px;
        .rem(margin-right,15);
        float: left;
        &:last-of-type{
          margin-right: 0;
        }
      }
      /*自定义分页器激活时的样式表现*/
      .swiper-pagination-customs-active{
        color: #fff;
        background: url("./assets/images/vipRanking/page_active.png") center no-repeat;
        background-size: 100% 100%;
      }
    }
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom:0.27rem;
    }
  }
  .zc-hb{
    position:fixed;
    background: rgba(0,0,0,.5);
    z-index: 9000;
    height:100%;
    width:100%;
    top:0;
    .zc-close-icon{
      display: block;
      .rem(height,66);
      .rem(width,66);
      background: url("./assets/images/close-zc.png")no-repeat;
      background-size: contain;
      position: absolute;
      right: 8%;
      top: 2.8rem;
      z-index: 10000;
    }
    a{
      display: block;
    }
    p{
      text-align: center;
      color: #fefefe;
      .rem(font-size,36);
      .rem(line-height,36);
      margin: -1rem auto 0 auto;
      width: 30%;
      position: relative;
      z-index: 10000;
      padding-top: 0.5rem;
      .check-icon{
        display: block;
        .rem(height,35);
        .rem(width,35);
        background: url('./assets/images/check-zc.png')no-repeat;
        background-size: contain;
        margin-right: 4%;
        margin-top: 0.05rem;
        
        &.active{
          position: relative;
          &:before{
            position: absolute;
            content: '';
            background: url('./assets/images/select-zc.png')no-repeat;
            .rem(height,35);
            .rem(width,35);
            top: 0;
            left: 0;
            background-size: contain;

          }
        }

      }
    }
    img{
      // padding-top: 1rem;
    }
    .zc-jt{
      width: 112%;
      margin-left: -5%;
    }

  }

    .more-result-container{
        .wrapperY{
            height: 12rem;
            z-index: 1000!important;
        }
    }
   
    .main-content{
      padding: 0 .3rem;
    }



//游戏


.game-container{
  h3{
    line-height: 1rem;
    // padding-left: 3%;
    color: #445779;
  }
    background: #fff;
    margin-bottom: .2rem;
    ul{
        margin-left: 3%;
        li{
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
            display: inline-block;
            .rem(border-radius,10);
            width: 30%;
            margin-right: 3%;
            text-align: center;
            margin-bottom: .2rem;
            padding: 0 .2rem 0 .2rem;
            .rem(height,290);
            overflow: hidden;
            position: relative;
            .close-icon{
                position: absolute;
                left: .15rem;
                top:.15rem;
                background: url("./assets/images/game/fp_icon.png") no-repeat;
                background-size: contain;
                .rem(width,60);
                .rem(height,20);
                display: none;
            }
            &.active{
                .close-icon{
                    display: block;
                }
            }
            .tag-icon{
                position: absolute;
                .rem(width,56);
                .rem(height,58);
                right: 0;
                top:0;
                &.tag-hot{
                    background: url("./assets/images/game/hot.png") no-repeat;
                    background-size: contain;
                }
                &.tag-new{
                    background: url("./assets/images/game/new.png") no-repeat;
                    background-size: contain;
                }
            }
            .g-img{
                margin: .3rem auto .2rem;
                /*width: 80%;*/
                .rem(width,160);
                .rem(height,160);
            }

            p{
                .rem(padding-bottom,10)
            }
            span{
                
                .rem(font-size,20);
            }
        }
    }
&.game-container-golden{
  background: #161C23;
  ul{
    li{
      p{
        color: #cecece;
      }
    }
  }
}
}

.slide-fade-enter-active,
.transitionRouter-leave-active {
    transition: all 0.2s;
}

.slide-fade-enter,
.transitionRouter-leave{
    transform: translate3d(100%, 0, 0);
}
.chat-sport{
  .wrapperY{
    background: #ECEFF6 !important;
  }
}



//activityDaw活动抽奖页弹窗
.rule-pup .wrapperY{
    min-width: 200px;
    // .rem(width,710) !important;
    width: 95% !important;
    // .rem(height,800);
    position: relative;
}
// 报表


  .tab-title{
    .rem(height,110);
    background: #fff;
    overflow: hidden;
    span{
      .rem(width,210);
      .rem(height,64);
      .rem(line-height,64);
      .rem(font-size,28);
      text-align: center;
      color: #445779;
      float: left;
      background: #f5f7fa;
      .rem(border-radius,30);
      .rem(margin-left,30);
      .rem(margin-top,16);
      &.active{
        color: #fff;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
        background-size: 100% 100%;
      }
    }
    &.tab-title-golden{
      background: #1F252C !important;
      span{
        background: #464B53;
        color: #CECECE;
      }
    }
  }
  .main-box{
    .rem(width,710);
    margin: 0 auto;
    .total-box{
      .rem(height,180);
      .rem(margin-top,20);
      background: #fff;
      overflow: hidden;
      .rem(padding-left,30);
      .rem(padding-right,30);
      .rem(padding-top,40);
      .rem(border-radius,10);
      >div{
        width: 50%;
        &:last-of-type{
          text-align: right;
        }
        span{
          display: block;
          font-family: 'DIN-Bold';
          font-weight: bold;
          .rem(font-size,42);
        }
        .c9{
          .rem(font-size,28);
          color: #9999;
          font-weight: normal;
          .rem(margin-bottom,10);
        }
        .red{
          color: #FF513D;
        }
      }

    }
    .item-box{
      .rem(padding-left,30);
      .rem(padding-right,30);
      .rem(margin-top,20);
      .rem(border-radius,10);
      background: #fff;
      .title{
        .rem(line-height,86);
        color: #445779;
        border-bottom:1px solid #EDEDED;
        .fl{
          font-weight: bold;
          .rem(font-size,28);
          .fl-icon{
            .rem(width,32);
            .rem(height,28);
            .rem(margin-right,10);
            .rem(margin-top,29);
            float: left;
          }
        }
        .fr{
          .rem(font-size,24);
          .fr-icon{
            .rem(width,12);
            .rem(height,21);
            .rem(margin-left,10);
            .rem(margin-top,32);
            float: right;
          }
        }

      }
      .item{
        // width: 25%;
        // text-align: center;
        .rem(padding-top,30);
        .rem(padding-bottom,30);
         border-bottom: 1px dashed #eee;
        span{
          // display: block;
          .rem(font-size,24);
          .rem(padding-bottom,15);
          
        }
        strong{
          float: right;
          .rem(font-size,32);
          color: #445779;
          font-family: Impact;
          font-weight: normal;
          &.red{
            color: #FF513D;
          }

        }
      }
    }
    &.main-box-golden{
      .rtotal-box{
        background: #464B53;
        >div{
          color: #CECECE;
          >div{
            border-bottom: 1px dashed #5C564D;
            span{
              
            }
          }
        }
      }
      .item-box{
        background: #464B53;
        
        .title{
          color: #CECECE;
          border-bottom: 1px solid #5C564D;
          .fr{
            color: #928151;
          }
        }
        .item-box-one {
          border-top: 1px solid #5C564D;
          >div{
            span{
              color: #CECECE;
            }
          }
        }
        .item{
          border-bottom: 1px dashed #5C564D;
          strong{
            color: #CECECE;
          }
          
        }
      }
    }
  }


    .calendar-header{
        width: 100%;
    }

 #xz .date-box .wrapperY{
    width: 91.2%!important;
    left: 50%!important;
    transform: translateX(-50%)!important;
  }


.skin-btn-pink{
  background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%) !important;
  color: #fff!important;
}
.skin-btn-green{
  background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%) !important;
  color: #fff!important;
}
.skin-btn-maingreen{
 background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
  color: #fff!important;
}
.skin-btn-blue{
  background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%) !important;
  color: #fff!important;
}

.skin-btn-golden{
  background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
  color: #A85100 !important;
}
.skin-btn-golden-room{
  background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%) !important;
  color: #E3CF95!important;
}
.skin-btn-golden-cs{
  background: #1F252C!important;
  color: #E3CF95!important;
  .input-box{
    input{
background: #464B53 !important;
}
    }
    
  .tg-btn{
    color: #A85100!important;
  }
}
.skin-border-b-pink{
  border: 1px solid #FB796B !important;
}
.skin-border-b-blue{
  border: 1px solid #0CB6D9 !important;
}
.skin-border-b-green{
  border: 1px solid #0B9B71 !important;
}

.skin-border-b-maingreen{
  border: 1px solid #01B373 !important;
}

.skin-border-b-golden{
  border: 1px solid #AB9B62 !important;
}



.skin-border-pink{
  border: 1px solid #FB796B !important;
  background: #fff !important;
  color: #FB796B !important;
}
.skin-border-blue{
  border: 1px solid #0CB6D9 !important;
  background: #fff!important;
  color: #0CB6D9 !important;
  
}
.skin-border-green{
  border: 1px solid #0B9B71 !important;
  background: #fff !important;
  color: #0B9B71 !important;
}
.skin-border-maingreen{
  border: 1px solid #01BE79 !important;
  background: #fff !important;
  color: #01BE79 !important;
}

.skin-border-golden{
  border: 1px solid #AB9B62 !important;
  background: #fff !important;
  color: #AB9B62 !important;
}


.green-active{
  color: #00B681 !important;
  &:before{
    background: #00B681 !important;
  }
}
.blue-active{
  color: #0CB6D9 !important;
  &:before{
    background: #0CB6D9 !important;
  }
}
.pink-active{
  color:#FB796B !important;
  &:before{
    background: #FB796B !important;
  }
}
.maingreen-active{
  color:#01BE79 !important;
  &:before{
    background: #01BE79 !important;
  }
}
.golden-active{
  color:#E5AE18 !important;
  &:before{
    background: #E5AE18 !important;
  }
}
.pink-bg{
  background: #FB796B !important;
}
.blue-bg{
  
  background: #0CB6D9 !important;
}
.green-bg{
  background: #00B681 !important;
}
.maingreen-bg{
  background: #01BE79 !important;
}
.golden-bg{
  background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
  color:#AB9B62!important;
}
.pink-color{
  color: #FB796B !important;
}
.blue-color{
  color: #0CB6D9 !important;
}
.green-color{
  
  color: #00B681 !important;
}
.maingreen-color{
  
  color: #01BE79 !important;
}

.golden-color{
  
  color: #AB9B62 !important;
}
.golden-color{
  
  color: #AB9B62 !important;
}
.golden-text-color{
  
  color: #CECECE!important;
}
.golden-color-xi{
  
  color: #928151!important;
  font-weight: normal!important;
}

.vux-label{
      word-break: break-word !important;
}
// .gamePlay{
//   .wrapperY{
//      background: #F3F4F5 !important;
//   }
// }
.gamePlay{
   .wrapperY{
      .content{
       padding-bottom: 1rem;
      }
   }
 }
.goldenHeader{
  background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%) !important;
  color: #E3CF95 !important;
  .back-icon{
    background: url("./assets/images/skin/golden/goBack.png") no-repeat center left !important;
    background-size: 25% !important;
  }
  .go-back{
    background: url("./assets/images/skin/golden/goBack.png") no-repeat center left !important;
    background-size: 100% !important;
  }
  .return-icon,.black-back{
    background: url("./assets/images/skin/golden/goBack.png") no-repeat center left !important;
    background-size: contain!important;
  }
}
.msgDetail{
  .goldenHeader{
    .go-back{
    background: url("./assets/images/skin/golden/goBack.png") no-repeat center left !important;
    background-size: 25% !important;
  }
  }
}

&.msg-content-golden{
      .vux-swipeout-content{
        background: #1F252C !important;
      }
    }
    .borderGroup-golden{
      .weui-cells{
        background-color: #1F252C;
      }
      &:after{
        border-bottom: none !important;
      }
      .bot{
        border-bottom:1px solid #5C564D !important;
        color: #cecece !important;
      }
  
}
#updateInforNew .edit-golden{
  .edit-sex {
      background: #1F252C !important;
  
      .weui-cells {
        background-color: #1F252C !important;
      }
      
    }
    .edit-nick{
      .weui-cell:before {
          border-top: 0px !important;
        }
    }
    .weui-cell{
      color: #CECECE!important;
    }
    .el>span{
      color: #CECECE!important;
    }
}
//登录注册golden
.login-golden-bg{
  background: #1F252C!important;
  padding-bottom: 6rem;
  input{
    color: #CECECE !important;
  }
  input::placeholder{
    color: #CECECE !important;
  }
  .trial-play{
    background: linear-gradient(180deg, #A08779 0%, #9E8577 100%)!important;
    color: #CECECE!important;
  }
  .inp-box{
    background: #464B53!important;
  }
  .logo{
    background: url('./assets/images/skin/golden/Vector2.png') no-repeat!important;
    background-size: cover!important;
  }
  .logo1{
    background: url("./assets/images/skin/golden/goBack.png") no-repeat center left !important;
      background-size:59% !important;
  }
}
//推广
.report-golden{
  color: #CECECE!important;
  .re-header{
    background: #464B53!important;
    .huiColor{
      color: #E3CF95!important;
    }
  }
  .re-content{
    ul{
      li{
        background: #464B53!important;
        .huiColor{
          color: #928151!important;
        }
        .re-shuliang1{
          color: #CECECE!important;
        }
      }
    }
  }
}
.pasBox-golden{
  input::-webkit-input-placeholder {
    color: #cecece !important;
    }
}
.invite{
          .tydl,.yjbl{
            .table-title{
                font-weight: normal;
                .rem(line-height,60);
                color: #fff;
                text-align: center;
                background: linear-gradient(180deg, #5FABFF 0%, #007CFF 100%);
                border-radius: 0.2rem 0.2rem 0 0;
                .rem(margin-top,40);
            }
            .pink-table-title{
                background: linear-gradient(1.1deg, #FB6E6D 1.1%, #FFCAA2 95.14%)!important;
            }
             .blue-table-title{
                background: linear-gradient(1.1deg, #06B4D8 1.15%, #75DFF2 99.28%)!important;
            }
             .green-table-title{
                background: linear-gradient(1.1deg, #32C986 -11.06%, #59F3B2 103.42%)!important;
            }
            .maingreen-table-title{
                background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%)!important;
            }
            .golden-table-title{
                background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%)!important;
                color: #A85100!important;
            }
       } 
}

.golden-pop-bottom{
  .vux-popup-dialog{
    background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
  }
  .popup-title{
   
    background: #2D2D2D;
    color: #E3CF95;
    .cancel{
      color: #E3CF95;
    }
  }
  .wrapper .content{
    border-top: 1px solid #5C564D;
  }
  .popup-style li{
    background: #2D2D2D !important;
    border-top: none;
    border-bottom: 1px solid #5C564D;
    color:#cecece;
  }
}
.vue-golden-picker{
  .vue-picker{
   .header{
    background: #2D2D2D;
    .btn{
      color: #E3CF95;
    }
    .title{
      color: #E3CF95;
    }
   }
   .content{
    background: #2D2D2D;
   }
  }
}
</style>
