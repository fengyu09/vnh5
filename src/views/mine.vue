  <template>
    <div class="mine2-container" id="mine2-container" :class="[{'goldenMine':skin==5}]">
        <myScroll :top="0" :bottom="1.4" :bgColor="skin==5?'1A1A1A':'f5f7fa'" ref="scrollWrapper">
            <div class="session session-header" v-show="codeToken">
                <div class="user-img" @click="$router.push('/UpdateInforNew')">
                     <div class="img-box">
                        <img v-lazy="avatar" v-if="avatar" alt />
                        <img src="../assets/images/main/web_03.png" v-else alt />
                     </div>
                     <span class="edit-box">{{$t('member.text[0]')}}<i></i></span>
                </div>
                <div class="user-mess">
                    <div class="user-name" :class="[{'sx-pink':skin ==1},{'sx-blue':skin ==2},{'sx-green':skin ==3},{'sx-maingreen':skin ==4},{'sx-golden':skin ==5}]">
                        <span class="name">{{nickname}}</span>
                        <!-- 差个性别icon 2女  1 男 0未知不显示-->
                        <i class="sex-icon" v-show="userinfo.gender" :class="userinfo.gender==2?'female-icon':'male-icon'"></i>
                       
                        <i class="grade-icon" :class="'grade-icon'+$store.state.userinfo.vip" v-show="$store.state.userinfo.vip>0"></i>
                        <i class="money-refresh" @click="money(true)"></i>
                    </div>
                    <div class="user-id">
                        <span class="id-icon">{{$t('member.text[1]')}}{{userinfo.id}}</span>
                        <p class="video-mess">
                        </p>
                        <p class="user-money"  :class="[{'sx-pink':skin ==1},{'sx-blue':skin ==2},{'sx-green':skin ==3},{'sx-maingreen':skin ==4},{'sx-golden':skin ==5}]">{{$t('member.text[2]')}}{{amount}} {{$t('moneyDw')}} <i v-if="lanCode!=2" class="yw-icon" :class="[{'yw-pink':skin == 1},{'yw-blue':skin == 2},{'yw-green':skin == 3},{'yw-maingreen':skin == 4},{'yw-golden':skin == 5}]" @click="showBl"></i> <i class="backMoney" @click="hsMoney">{{$t('member.text[3]')}}</i>
                        </p>
                        
                    </div>
                </div>
            </div>
             <!-- 未登录 -->
            <div class="session session-header no-session-header" v-show="!codeToken">
                <div class="login-reg-btn" :class="[{'login-reg-btn-pink':skin ==1},{'login-reg-btn-blue':skin ==2},{'login-reg-btn-green':skin ==3},{'login-reg-btn-maingreen':skin ==4},{'login-reg-btn-golden':skin ==5}]"><router-link to='login'>{{$t('loginText')}} </router-link>&nbsp;/&nbsp;<router-link :to="noticeType==1?'register':'RegisterDl'">{{$t('registerText')}}</router-link></div>
                <div class="tip-box"><i></i><p>{{$t('member.text[4]')}}</p> </div>   

            </div>
            
            <div class="session session-main-title">
                <router-link :to="lanCode==2?'/usdtForm':'/recharge'">
                    <dl>
                        <dt class="dt-icon1">
                         
                          </dt>
                        <dd>{{$t('member.text[5]')}}</dd>
                    </dl>
                </router-link>
                <router-link to="/wallet" >
                    <dl>
                        <dt class="dt-icon2">
                      </dt>
                        <dd>{{$t('member.text[6]')}}</dd>
                    </dl>
                </router-link>
                <router-link to="/invite">
                    <dl>
                        <dt class="dt-icon3">
                          </dt>
                        <dd>{{$t('member.text[7]')}}</dd>
                    </dl>
                </router-link>
                <router-link to="/vipRanking">
                    <dl>
                        <dt class="dt-icon4">
                          </dt>
                        <dd>VIP</dd>
                    </dl>
                </router-link>
              
                
            </div>
            <div class="session session-main-server">
                <h3>{{$t('member.text[8]')}}</h3>
                <ul :class="[{'go-pink':skin==1},{'go-blue':skin==2},{'go-green':skin==3},{'go-maingreen':skin==4},{'go-golden':skin==5}]">
                  <li>
                    <i class="go-icon5">
                      </i><router-link to="/messageCenter">{{$t('member.text[9]')}}</router-link>
                      <i class="fr dian" v-if="nNum>0"></i>
                      </li>
                      <li>
                        <i class="go-icon6"> 
                         
                        </i>
                        <router-link to="/ERecord">{{$t('member.text[10]')}}</router-link>
                      </li>
                      <li>
                        <i class="go-icon7"> 
                          
                        </i>
                        <router-link to="/gameReport">{{$t('member.text[11]')}}</router-link>
                      </li>
                        <!-- <li v-if="lanCode!=2">
                          <i class="go-icon8">
                          
                        </i>
                        <router-link to="/myVideo?type=2">{{$t('member.text[12]')}}</router-link>
                      </li> -->
                      <li>
                        <i class="go-icon9">
                           
                        </i>

                      
                         <router-link to="/themeSkin"> {{$t('member.text[13]')}}</router-link>
                      </li>
                      <li>
                        <i class="go-icon10">
                         
                      </i>
                      <router-link to="/memberPackage">{{$t('member.text[14]')}}</router-link>
                      </li>
                      <li>
                        <i class="go-icon11">
                          
                      </i><router-link to="/loginConfirm">{{$t('member.text[15]')}}</router-link></li>
                </ul>
            </div>
            <div class="session session-main-server" style="padding-bottom:.4rem">
                <h3>{{$t('member.text[16]')}}</h3>
                <ul :class="[{'go-pink':skin==1},{'go-blue':skin==2},{'go-green':skin==3},{'go-maingreen':skin==4},{'go-golden':skin==5}]">
                    <li>
                        <i class="go-icon1">
                         
                         
                        </i>
                        <a href="javascript:;" @click="goOnline">{{$t('member.text[17]')}}</a>
                    </li>
                    <li>
                        <i class="go-icon2">
                         
                        </i>
                        <router-link to="/Feedback">{{$t('member.text[18]')}}</router-link>
                    </li>
                   
                    <li>
                        <i class="gf-icon go-icon3">
                         
                        </i>
                        <a href="javascript:;" @click="isShowCallTel=true">{{$t('member.text[19]')}}</a>
                    </li>
                    <li>
                        <i class="go-icon4">
                         
                        </i>
                        <router-link to="/setting">{{$t('member.text[20]')}}</router-link>
                    </li>
                </ul>
            </div>
        </myScroll>
        <Foot/>


   

    <!-- 回电服务 -->
    <div class="call-back-container" v-if="isShowCallTel" :class="skin==5?'call-back-container-golden':''">
      <myScroll ref="scrollWrapper2" :top='2' :bottom='5' :bgColor="skin==5?'2D2D2D':''">
          <div class="call-back-content">
            <p>{{$t('member.text[22]')}}</p>
            
            <div class="back-item fk-item" >
              <span>{{$t('member.text[23]')}}</span>
              <div class="item-list"  style="margin-bottom:0" :class="[{'skin-item-pink':skin ==1},{'skin-item-blue':skin ==2},{'skin-item-green':skin ==3},{'skin-item-maingreen':skin ==4},{'skin-item-golden':skin ==5}]">
                <span v-for="(v,index) in quesList" :key="index" @click='selectQuesType($event,v.id,$st.state.skin)' >{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span  style="display:block;margin-bottom:2%">{{$t('member.text[24]')}}</span>
              <div class="item-list lan-item" :class="[{'skin-item-pink':skin ==1},{'skin-item-blue':skin ==2},{'skin-item-green':skin ==3},{'skin-item-maingreen':skin ==4},{'skin-item-golden':skin ==5}]">
               
                <span v-for="(v,index) in lanList" :key="index"  
                 :class="[
                  {'active':$st.state.skin ==0&&v.is_check},
                 {'skin-btn-pink':$st.state.skin ==1&&v.is_check},
                 {'skin-btn-blue':$st.state.skin ==2&&v.is_check},
                 {'skin-btn-green':$st.state.skin ==3&&v.is_check},
                 {'skin-btn-maingreen':$st.state.skin ==4&&v.is_check},
                 {'skin-btn-golden':$st.state.skin==5&&v.is_check}]"
                 @click="changeLan($event,v,$st.state.skin)">{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span style="display:block;margin-bottom:2%">{{$t('member.text[25]')}}</span>
              <input type="text" maxlength="11" :class="[{'skin-border-pink':skin ==1},{'skin-border-blue':skin ==2},{'skin-border-green':skin ==3},{'skin-border-maingreen':skin ==4},{'skin-border-golden':skin ==5}]"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="memberAccount" :placeholder="$t('member.text[26]')">
            </div>
            <div class="back-item">
              <span style="display:block;margin-bottom:2%;margin-top:2%">{{$t('member.text[27]')}}</span>
              <input type="text" :class="[{'skin-border-pink':skin ==1},{'skin-border-blue':skin ==2},{'skin-border-green':skin ==3},{'skin-border-maingreen':skin ==4},{'skin-border-golden':skin ==5}]" maxlength="12"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="tel" :placeholder="$t('member.text[28]')">
            </div>
            <div class="commit-btn" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]"  @click="getCallBack">{{$t('member.text[29]')}}</div>
          </div>
         

      </myScroll>
      <div class="close-callback-btn" @click="isShowCallTel=false"></div>
    </div>



    </div>
</template>

<script>
    import Foot from "../components/footer.vue";
    import { mapState, mapMutations } from "vuex";
    import {removeAllactive } from '../assets/js/public'
    export default {
        name: "mine2",
        data(){
            return{
                nickname: "",
                profile: "",
                token: "1",
                amount: "0",
                isL: false, //是否显示 下拉刷新的组件
                playList: {},
                avatar: "",
                defaultAmount: "", //默认的金额
                nNum:0,
                lanList:[],
                quesList:[],
                currLan:'',
                 selectQues:[],
                tel:'',
                isShowCallTel:false,
                memberAccount:'',
            }
        },
          props: {
            top: {
            type: Number,
            default: 0
            }
        },
        components: {
            Foot,
        },
  mounted() {
   
    this.showPositionValue = true;
  },
  computed: {
    ...mapState(["codeToken", "userinfo","vip","noticeNum","skin",'webInitData',"lanCode"])
  },
  created() {
   
    this.init();
  },

  watch: {
    isShowCallTel:function(){
        this.selectQues = [];
        this.tel = '';
    }
  },
  methods: {
    ...mapMutations([
      "SETUSERINFO",
      "SETPIC",
    ]),
    hsMoney(){
        this.$vux.loading.show(this.$t('member.text[35]'));
        this.$http.post("/api/vendor/transferinall",{},{timeout:60000}).then(res=>{
            this.$vux.loading.hide();
            this.loadMoney();
            this.$vux.toast.text(res.data.msg, 'middle');
        }).catch((res)=>{
            this.$vux.loading.hide();
            this.$vux.toast.text(res.data.msg, 'middle');;
        })
    },
    showBl(){
      this.$vux.toast.text('(1 vndk = 1000 vnd)', 'top')
    },
   changeLan(e,v,s){
        let curr = e.currentTarget;
        if(s==1){
          removeAllactive(document.querySelectorAll('.lan-item span'),'skin-btn-pink');
          curr.classList.add('skin-btn-pink');
          
        }else if(s==2){
          removeAllactive(document.querySelectorAll('.lan-item span'),'skin-btn-blue');
          curr.classList.add('skin-btn-blue')
        }else if(s==3){
          removeAllactive(document.querySelectorAll('.lan-item span'),'skin-btn-green');
          curr.classList.add('skin-btn-green')
        }else if(s==4){
          removeAllactive(document.querySelectorAll('.lan-item span'),'skin-btn-maingreen');
          curr.classList.add('skin-btn-maingreen')
        }else if(s==5){
          removeAllactive(document.querySelectorAll('.lan-item span'),'skin-btn-golden');
          curr.classList.add('skin-btn-golden')
        }else{
           removeAllactive(document.querySelectorAll('.lan-item span'));
          curr.classList.add('active')
        }
       
        this.currLan = v.id;
      },
    selectQuesType(e,id){
      let curr = e.currentTarget;
        if(curr.className.indexOf('active')>-1){
            curr.classList.remove('active');
            //删掉id
            let i = this.selectQues.findIndex(v=>{
              return v == id
            })
            this.selectQues.splice(i,1);
        }else{
            curr.classList.add('active');
            this.selectQues.push(id);
        }

    },
    //获取语言列表
    async getLan(){
      let res = await this.$http.get('/api/live/user/language_list/');
      if(res.data.code==1){
          this.lanList = res.data.data || [];
          for(let i=0,len=this.lanList.length;i<len;i++){
            if(this.lanList[i].is_check) this.currLan = this.lanList[i].id;
          }
      }else{

      }
    },
    //获取问题列表
     async getQues(){
      let res = await this.$http.get('/api/live/user/feedback_type_list/');
      if(res.data.code==1){
          this.quesList = res.data.data;
      }else{

      }
    },
    //提交回电问题
    async getCallBack(){
      if(!this.selectQues.length){
        this.$vux.toast.text(this.$t('member.text[30]'), 'middle')
        return;
      }
      if(this.currLan<0){
        this.$vux.toast.text(this.$t('member.text[31]'), 'middle')
        return;
      }
      if(!this.tel){
        this.$vux.toast.text(this.$t('member.text[32]'), 'middle')
        return;
      }
      this.$vux.loading.show();
      let res = await this.$http.get('/api/live/user/call_back/',{
        params:{
          type_id:this.selectQues.join(','),
          lang_id:this.currLan,
          issue_phone:this.memberAccount,
          phone:this.tel
        }
      })
      this.$vux.loading.hide();
      this.$vux.toast.text(res.data.msg, 'middle')
      if(res.data.code==1){
          this.isShowCallTel = false;
      }

    },
    goOnline() {
        if(window.android){
              location.href = this.customer
        }else{
            window.open(this.customer);
        }
    },
    init() {
      this.getUserInfo();
      this.loadMoney();
      this.customer = JSON.parse(this.webInitData).customer;
      this.checkNotice();
      this.getLan();
      this.getQues();
    },

    //获取用户个人信息
    getUserInfo(flag) {
      if (!this.codeToken) {
        return;
      } else {
      this.isL = true;
      this.$http.get("/api/user/index").then(res => {
        if (res && res.data.code == 1) {
          this.isL = false;
          (this.nickname = res.data.data.nickname || this.$t('member.text[33]')),
            (this.profile = res.data.data.profile || this.$t('member.text[34]')),
            (this.avatar = res.data.data.avatar);
          this.SETUSERINFO(res.data.data);
          this.SETPIC(res.data.data.avatar);    
        }else{

        }
      });
      }
    },

  
    money: function(flag) {
      if (!flag) return;
      if (flag && !this.codeToken) {
       this.$popup();
      } else {
        // 点击刷新请求该账户余额
        if (flag && document.querySelector(".shua"))
          document.querySelector(".shua").classList.add("loading-money");
        this.amount = this.$t('member.text[35]');
        this.$http.get("/api/user/balance").then(res => {
          if (flag && document.querySelector(".shua"))
            document.querySelector(".shua").classList.remove("loading-money");
          if (res && res.data.code == 1) {
            this.amount = res.data.data.balance || "0"; //显示出来的
            if(this.amount == 0){
              this.amount = "0";
            }
            this.defaultAmount = res.data.data.balance || "0"; //用于计算的
           
          }
        });
      }
    },
    loadMoney() {
      if (!this.codeToken) return;
      this.$http.get("/api/user/balance").then(res => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0"; //显示出来的
           if(this.amount == 0){
              this.amount = "0";
            }
          this.defaultAmount = res.data.data.balance || "0"; //用于计算的
         
        }
      });
    },

    async checkNotice(){
      if (!this.codeToken||this.userinfo.user_id<0) {
        return;
      } else {
      if((this.noticeNum-0)>0) return
       let res = await this.$http.get('/api/live/sport/get_message_count/',{params:{
              client_type:3,
              api:this.noticeType==1?1:5
      }});
      if(res && res.data.code==1){
          this.nNum = res.data.data.msgCount;
      }
      }
    },
    goWallet(){
      this.$router.push('wallet')
    }
  }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }

    .call-back-container{
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,.5);
      left:0;
      right: 0;
     
      .call-back-content{
        padding: .5rem .3rem 1rem .3rem;
        background: #fff;
         p{
          .rem(font-size,24);
          // 
          margin-bottom: .3rem;
          font-weight: 500;
        }
        .back-item{
          margin-bottom:.3rem;
          >span{
              .rem(font-size,24);
              font-weight: 500;
              // 
          }
          input{
            .rem(width,500);
            .rem(height,68);
            .rem(border-radius,4);
            padding: 0 .2rem;
            border: 1px solid #1486FF;
          }
          .item-list{
            margin-bottom: .3rem;
            display: inline-block;
            
            >span{
              .rem(padding-left,20);
              .rem(padding-right,20);
              .rem(height,68);
              .rem(line-height,68);
              .rem(border-radius,4);
              .rem(margin-bottom,20);
              .rem(margin-right,10);
              // color:#999;
              .rem(font-size,20);
              display: inline-block;
              border-radius: .1rem;
              font-weight: 500;
              border: 1px solid #1486FF;
              &.active{
                color:#fff;
                border:1px solid #1486FF;
                // background: linear-gradient(90deg, #FF5B54, #FFA193);
                // background: linear-gradient(90deg, #559CFF, #4BE5EE); 
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
              }
              &.skin-btn-blue{
                border:1px solid #0CB6D9;
              }
              &.skin-btn-green{
                border:1px solid #0B9B71;
              }
               &.skin-btn-maingreen{
                border:1px solid #01BE79;
              }
               &.skin-btn-pink{
                border:1px solid #FB796B;
              }
            }
            &.skin-item-pink{
              >span{
                 border: 1px solid #FB796B;
                 &.active{
                    background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%) !important;
                 }
              }
            }
            &.skin-item-blue{
              >span{
                 border: 1px solid #0CB6D9;
                  &.active{
                    background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%) !important;
                 }
              }
            }
            &.skin-item-green{
              >span{
                 border: 1px solid #0B9B71;
                  &.active{
                    background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%) !important;
                 }
              }
            }
            &.skin-item-maingreen{
              >span{
                 border: 1px solid #01BE79;
                  &.active{
                    background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
                 }
              }
            }
            &.skin-item-golden{
              >span{
                 border: 1px solid #464B53;
                 background: #464B53;
                 color: #CECECE;
                  &.active{
                    background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
                    color: #A85100;
                 }
              }
            }
          }
        }
        .fk-item{
          >span{
                width: 100%;
    margin-bottom: 3%;
    display: block;
          }
          .item-list{
            // float: left;
            width: 100%;
             >span{
               display: inline-block;
              //  width: 48%;
               text-align: center;
               margin: 0 1% 3% 1%;
             }
          }
        }
        .commit-btn{
            // background: linear-gradient(90deg, #559CFF, #4BE5EE); 
            background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
            color:#fff;
            text-align: center;
            .rem(height,88);
            .rem(line-height,88);
            .rem(width,420);
            .rem(font-size,32);
            .rem(border-radius,50);
            margin: .6rem auto 0;
        }
        
      }
      .close-callback-btn{
            position: absolute;
            .rem(height,70);
            .rem(width,70);
            background: url(../assets/images/newMine/remove.png) no-repeat;
            background-size: contain;
            left: 50%;
            transform: translateX(-50%);
            bottom:3rem;
            bottom:0.7rem;
        }
        &.call-back-container-golden{
          .call-back-content{
            background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
            p{
              color: #CECECE;
            }
            .fk-item > span{
              color: #CECECE;
            }
            .back-item{
              >span{
                color: #CECECE;
              }
              input{
                background: #464B53 !important;
                border: 1px solid #464B53 !important;
              }
            }
          }
        }
    }
    .mine2-container{
        .session{
            .rem(margin-top,30);
            .rem(padding-left,30);
            .rem(padding-right,30);
            // .rem(padding-bottom,30);
        }
    }
    .session-header{
        .rem(padding-bottom,30);
        display: -webkit-box;
        background: #fff;
        .user-img{
            // overflow: hidden;
            .rem(width,140);
            .rem(height,140);
            // border-radius: 50px;
            // overflow: hidden;
            // background: #ccc;
            position: relative;
            margin-top:.2rem;
            // border-radius: 50%;
            // overflow: hidden;

            .img-box{
              .rem(width,140);
            .rem(height,140);
               background: #ccc;
              border-radius: 50%;
              overflow: hidden;
            }
            .edit-box{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              bottom: 0rem;
              color: #fff;
              .rem(width,185);
              .rem(height,30);
              .rem(line-height,30);
              border-radius: 30px;
              background: #4C4C4C;
              text-align: center;
              .rem(font-size,18);
              i{
                .rem(width,14);
                .rem(height,14);
                display: inline-block;
                background: url(../assets/images/newMine/edit_icon.png);
                background-size: contain;
              }
            }
        }
        .user-mess{
            .user-name{
                .rem(margin-top,25);
                 i.money-refresh{
                   position: absolute;
                   right: .3rem;
                   top: .7rem;
                  display: inline-block;
                  // float: right;
                  // background: url(../assets/images/newMine/sx.png) no-repeat;
                  // background-size: contain;
                  background: url(../assets/images/newMine/allMineIcon.png) no-repeat;
                  background-size: 1000px 1000px;
                  background-position: -884px -235px;
                  width: .35rem;
                  height: .35rem;
                }
                &.sx-pink{
                 i.money-refresh{
                  background-position: -884px -266px;
                }
                }
                &.sx-blue{
                  i.money-refresh{
                    background-position: -884px -280px;
                  }
                }
                &.sx-green{
                  i.money-refresh{
                    background-position: -884px -254px;
                  }
                }
                &.sx-maingreen{
                  i.money-refresh{
                    background-position: -884px -295px;
                  }
                }
                &.sx-golden{
                  i.money-refresh{
                    background-position: -884px -312px;
                  }
                }
                
                 
            }
            .pureTop{
              .rem(margin-top,55);
            }
            .rem(margin-left,30);
            box-flex: 1;
            flex: 1;
            .name{
                color: #445779;
                .rem(font-size,32);
                font-weight: bold;
            }
            .sex-icon{
                vertical-align: text-top;
                .rem(height,30);
                .rem(width,30);
                display: inline-block;
              &.female-icon{
                  background: url("../assets/images/newMine/female_icon.png") no-repeat;
                  background-size: contain;
              }
              &.male-icon{
                background: url("../assets/images/chat/gender-man-min (1).png") no-repeat center;
                background-size: contain;
              }
            }
            .gz-icon{
              display: inline-block;
              .rem(height,30);
              .rem(width,90);
              
               vertical-align: text-top;
            }
            .gz-icon1{
               background: url("../assets/images/newMine/qs.png") no-repeat;
               background-size: contain;
            }
            .gz-icon2{
               background: url("../assets/images/newMine/nj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon3{
               background: url("../assets/images/newMine/zj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon4{
               background: url("../assets/images/newMine/bj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon5{
               background: url("../assets/images/newMine/hj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon6{
               background: url("../assets/images/newMine/gj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon7{
               background: url("../assets/images/newMine/gw.png") no-repeat;
               background-size: contain;
            }
            .grade-icon{
                color: #fff;
                .rem(padding-left,37);
                font-weight: bold;
                display: inline-block;
                .rem(width,64);
                .rem(height,55);
                .rem(line-height,31);
               
                vertical-align: text-bottom;
            }
            .grade-icon1{
                background: url("../assets/images/newMine/vip1.png") no-repeat;
                background-size: contain;
            }
             .grade-icon2{
                background: url("../assets/images/newMine/vip2.png") no-repeat;
                background-size: contain;
            }
             .grade-icon3{
                background: url("../assets/images/newMine/vip3.png") no-repeat;
                background-size: contain;
            }
             .grade-icon4{
                background: url("../assets/images/newMine/vip4.png") no-repeat;
                background-size: contain;
            }
             .grade-icon5{
                background: url("../assets/images/newMine/vip5.png") no-repeat;
                background-size: contain;
            }
             .grade-icon6{
                background: url("../assets/images/newMine/vip6.png") no-repeat;
                background-size: contain;
            }
             .grade-icon7{
                background: url("../assets/images/newMine/vip7.png") no-repeat;
                background-size: contain;
            }
             .grade-icon8{
                background: url("../assets/images/newMine/vip8.png") no-repeat;
                background-size: contain;
            }
            .yqm-mess{
                .rem(font-size,20);
                color: #666;
            }
        }
        .user-id{
            .rem(margin-top,10);
            .video-mess{
              margin-top: .1rem;
            }
            .user-money{
              color: #445779;
              font-weight: bold;
              line-height: .6rem;
              i.yw-icon{
                width: .43rem;
                height: .43rem;
                display: inline-block;
                // background-size: contain;
                vertical-align: sub;
                background: url(../assets/images/newMine/allMineIcon.png) no-repeat;
                background-size: 410px 410px;
                background-position: -180px -287px;
                &.yw-pink{
                  background-size: 270px 270px;
                  background-position: -209px -186px;
                }
                &.yw-blue{
                 
                  background-size: 270px 270px;
                  background-position: -154px -187px;
                }
                &.yw-green{
                 
                  background-size: 270px 270px;
                  background-position: -183px -187px;
                }
                &.yw-maingreen{
                  background-size: 270px 270px;
                  background-position: -228px -184px;
                }
                &.yw-golden{
                  background-size: 270px 270px;
                  background-position: -244px -184px;
                }
              }
              i.backMoney{
                background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
                color: #fff;
                font-size: .3rem;
                display: inline-block;
                float: right;
                border-radius: 50px;
                padding: 0 .22rem;
              }
               &.sx-pink{
                 i.backMoney{
                 background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2  99.97%);
                }
               }
                &.sx-blue{
                 i.backMoney{
                 background: linear-gradient(89.97deg, #06B4D8  0.02%, #49CAE2 99.97%);
                }
               }
                &.sx-green{
                 i.backMoney{
                 background: linear-gradient(89.97deg, #24CA80  0.02%, #35E098 99.97%);
                }
               }
               &.sx-maingreen{
                 i.backMoney{
                 background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
                }
               }
               &.sx-golden{
                 i.backMoney{
                  background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                  color: #A85100;
                }
               }
             
            }
            .id-icon{
                // background: #A9B3C8;
                color: #445779;
                .rem(border-radius,8px);
                .rem(font-size,22);
                // .rem(padding-left,10);
                // .rem(padding-right,10);
                margin-bottom: .2rem;
            }
            .every-video{
                // color: #666;
                padding-right: .1rem;
                .rem(font-size,18);
                i{
                    font-family: number1;
                    font-weight: 400;
                    .rem(font-size,24);
                }
            }
        }
        .qm{
            font-weight: 500;
            .rem(font-size,22);
            // color: #666;
            .rem(margin-top,5);
            width: 100%;
        }
        .login-reg-btn{
            background: linear-gradient(90deg, #1687FF, #4BA1FF);
            color: #fff;
            .rem(border-radius,32px);
            .rem(width, 320px);
            .rem(height, 64px);
            .rem(line-height, 64px);
            .rem(font-size, 28px);
            margin: 0 auto;
            text-align: center;
            a{
                color: #fff;
            }
            &.login-reg-btn-pink{
              background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%);
            }
            &.login-reg-btn-blue{
              background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%);
            }
            &.login-reg-btn-green{
              background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%);
            }
            &.login-reg-btn-maingreen{
              background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
            }
            &.login-reg-btn-golden{
              background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
              color: #A85100 !important;
              a{
                color: #A85100 !important;
              }
            }
        }
    }
    .no-session-header{
        .rem(padding-top,50);
        background: #fff;
        display: block;
        .tip-box{
            margin: .4rem auto 0;
            padding-bottom: .2rem;
            i{
               display: inline-block;    
                .rem(width, 70px);
                .rem(height, 64px);
                background: url(../assets/images/newMine/gift.png) no-repeat;
                background-size: contain;
                vertical-align: bottom;
                vertical-align: middle;
                    position: relative;
    top: -0.2rem;
            }
            p{
                .rem(font-size, 24px);
                color: #666;
                display: inline-block;    
                padding-left: .2rem;
                width: 88%;
            text-align: center;
            line-height: 18px;
            }
        }
    }
    .mine2-container {
        .session-num{
          display: flex;
          justify-content: space-around;
          background: #fff;
          margin-top:0;
          padding-top:.4rem;
          padding-bottom: .3rem;
          dl{
              position: relative;
              text-align: center;
              dt{
                  color: #445779;
                  font-weight: bold;
                  .rem(font-size,32);
                  font-style: italic;
              }
              dd{
                  .rem(font-size,24);
                  // color: #9A9A9A;
                  .rem(padding-top,5);
              }
              &:after{
                  content: '';
                  position: absolute;
                  .rem(width,1);
                  .rem(height,47);
                  background: #D0D0D0;
                  .rem(left,140);
                  .rem(top,20);
              }
              &:last-of-type:after{
                  background: none;
              }
          }
      }
    }
    .session-money{
        display: flex;
        justify-content: space-around;
        >div{
            background: #fff;
            .rem(border-radius,20);
            .rem(padding-left,20);
            .rem(padding-right,20);
            .rem(padding-top,20);
            .rem(width,354);
            .rem(height,154);
            &.pureMoney{
              width: 100%;
              margin-right: 0;
              p{
                text-align: left;
              }
              
            }
            span{
                .rem(font-size,28);
                // color:#666;
                font-weight: 500;
            }
            .balance-icon{
                .rem(width,160);
                .rem(height,42);
                display: inline-block;
                &.change-icon{
                    background: url("../assets/images/newMine/money_change.png") no-repeat;
                    background-size: contain;
                }
                &.zs-icon{
                    background: url("../assets/images/newMine/diamon_icon.png") no-repeat;
                    background-size: contain;
                }
            }
            p{
                text-align: right;
                font-weight: bold;
                color: #445779;
                .rem(font-size,44);
                .rem(padding-top,30);
                font-family: number1;
                .refresh-icon{
                    .rem(width,32);
                    .rem(height,29);
                    display: inline-block;
                    background: url("../assets/images/member/sx_icon.png") no-repeat;
                    background-size: contain;
                }
            }
        }
        .balance-box{
            .rem(margin-right,30);
        }
    }
    .session-main-title{
        display: flex;
        justify-content: space-around;
        background: #fff;
        .rem(border-radius,10);
        .rem(padding-top,20);
        .rem(padding-bottom,20);
        .rem(margin-left,30);
        .rem(margin-right,30);
        a{
            display: inline-block;
        }
        dl{
            text-align: center;
            dt{
                .rem(height,110);
                .rem(width,110);
                
                &.dt-icon1{
                  background: url(../assets/images/member/qb_icon2.png) no-repeat;
                  background-size:100% 100%;
                }
                &.dt-icon2{
                  
                  background: url(../assets/images/member/gz_icon.png) no-repeat;
                  background-size:100% 100%;
                }
                &.dt-icon3{
                  
                  background: url(../assets/images/member/tg_icon.png) no-repeat;
                  background-size:100% 100%;
                }
                &.dt-icon4{
                  
                 background: url(../assets/images/member/vip_icon.png) no-repeat;
                  background-size:100% 100%;
                }
            }
            dd{
                // color: #666;
                font-weight: 500;
            }
        }
    }
    .mine2-container{
        .session-main-tj{
            background: #fff;
            .rem(border-radius,10);
            .rem(padding-top,20);
            .rem(padding-bottom,20);
            .rem(padding-left,0);
            .rem(padding-right,0);
            .rem(margin-left,30);
            .rem(margin-right,30);
            h3{
                .rem(margin-left,30);
                color: #445779;
                font-weight: 500;
                .rem(font-size,28);
            }
            .tj-content{
                overflow: hidden;
                a{
                    width: 24%;
                    // float: left;
                    display: inline-block;
                    position: relative;
                    .rem(margin-top,40);
                        .dian{
                            position: absolute;
                                // background: url("../assets/images/main/home_icon_03.png") no-repeat;

                                background-size: contain;
                                width: 0.22rem;
                                height: 0.22rem;
                                right: 29%;
                                top: -.1rem;
                            }
                }
                dl{
                    text-align: center;
                    
                    dt{
                        display: inline-block;
                        .rem(height,51);
                        .rem(width,40);
                    }
                    dd{
                        .rem(font-size,24);
                        // color: #666;
                    }
                }
            }

        }
    }
    .mine2-container{
        .session-main-server{
            
            .rem(border-radius,10);
           
            .rem(margin-bottom,30);
            .rem(padding-left,0);
            .rem(padding-right,0);
            .rem(margin-left,30);
            .rem(margin-right,30);
            
            overflow: hidden;
            h3{
                .rem(padding-left,30);
                 .rem(padding-top,30);
                color: #445779;
                font-weight: 500;
                .rem(font-size,28);
                background: #fff;
            }
            ul{
              // padding-bottom: .5rem;
                li{
                  position: relative;
                    >i{
                        display: inline-block;
                        .rem(width,53);
                        .rem(height,53);
                        vertical-align: middle;
                        .rem(margin-left,30);
                        &.dian{
                            position: absolute;
                             background: #FF5640;
                              border-radius: 50%;
                               
                                width: 0.22rem;
                                height: 0.22rem;
                                left: 6%;
                                top: 0.25rem
                            }
                      background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                      &.go-icon1{
                       background-size: 260px 260px;
                       background-position: -115px -35px;
                      }
                      &.go-icon2{
                       background-size: 260px 260px;
                       background-position: -115px -64px;
                      }
                      &.go-icon3{
                       background-size: 230px 230px;
                       background-position: -101px -86px;
                      }
                      &.go-icon4{
                      background-size: 250px 250px;
                      background-position: -109px -125px;

                      }
                      &.go-icon5{
                        background-size: 260px 260px;
                        background-position: -2px 5px;
                      }
                      &.go-icon6{
                        background-size: 260px 260px;
                        background-position: -2px -25px;
                      }
                      &.go-icon7{
                        background-size: 260px 260px;
                        background-position: -2px -57px;
                      }
                      &.go-icon8{
                        background-size: 240px 240px;
                        background-position: -1px -82px;
                      }
                      &.go-icon9{
                          background-size: 270px 270px;
                          background-position: -2px -123px;
                      }
                      &.go-icon10{
                        background-size: 320px 320px;
                        background-position: -1px -178px;
                      }
                      &.go-icon11{
                        background-size: 220px 220px;
                        background-position: -96px 2px;
                      }
                    }
                    .gf-icon{
                        .rem(width,52);
                        .rem(height,47);
                    }
                    a{
                        display: inline-block;
                        border-bottom: 1px solid #F2F1F1;
                        .rem(height,100);
                        .rem(line-height,100);
                        .rem(width,540);
                        .rem(font-size,24);
                        // color: #666;
                        font-weight: 500;
                        .rem(margin-left,30);
                    }
                    background: url("../assets/images/newMine/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                    &:last-child{
                      a{
                        border: none !important;;
                      }
                    }
                }
               
                &.go-pink{
                  li{
                    background: url("../assets/images/skin/pink/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                  }
                  .go-icon1{
                       background-size: 310px 310px;
                       background-position: -240px -42px;

                      }
                  .go-icon2{
                       background-size: 310px 310px;
                       background-position: -240px -76px;
                      }
                  .go-icon3{
                       background-size: 310px 310px;
                       background-position: -240px -116px;
                      }
                  .go-icon4{
                    background-size: 320px 320px;
                    background-position: -248px -161px;
                  }
                  .go-icon5{
                    background-size: 320px 320px;
                    background-position: -109px 0px;
                  }
                  .go-icon6{
                    background-size: 320px 320px;
                    background-position: -109px -31px;
                  }
                  .go-icon7{
                    background-size: 320px 320px;
                    background-position: -108px -70px;
                  }
                  .go-icon8{
                    background-size: 320px 320px;
                    background-position: -109px -109px;
                  }
                  .go-icon9{
                      background-size: 340px 340px;
                      background-position: -115px -157px;
                  }
                  .go-icon10{
                    background-size: 320px 320px;
                    background-position: -108px -179px;
                  }
                  .go-icon11{
                        background-size: 300px 300px;
                        background-position: -232px 2px;
                  }
                }
                &.go-blue{
                  li{
                    background: url("../assets/images/skin/blue/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                  }
                  .go-icon1{
                       background-size: 310px 310px;
                       background-position: -177px -42px;

                      }
                  .go-icon2{
                       background-size: 310px 310px;
                       background-position: -177px -78px;

                      }
                  .go-icon3{
                       background-size: 310px 310px;
                       background-position: -177px -116px;

                      }
                  .go-icon4{
                       background-size: 320px 320px;
                       background-position: -183px -160px;
                  }
                  .go-icon5{
                       background-size: 320px 320px;
                       background-position: -43px 0px;
                  }
                  .go-icon6{
                       background-size: 320px 320px;
                       background-position: -44px -31px;
                  }
                  .go-icon7{
                       background-size: 320px 320px;
                       background-position: -43px -70px;
                  }
                  .go-icon8{
                       background-size: 320px 320px;
                       background-position: -44px -109px;
                  }
                  .go-icon9{
                    background-size: 340px 340px;
                    background-position: -46px -157px;
                  }
                  .go-icon10{
                    background-size: 320px 320px;
                    background-position: -43px -179px;
                  }
                  .go-icon11{
                       background-size: 300px 300px;
                        background-position: -171px 2px;
                  }
                }
                &.go-green{
                  li{
                    background: url("../assets/images/skin/green/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                  }
                  .go-icon1{
                       background-size: 310px 310px;
                       background-position: -210px -42px;

                      }
                  .go-icon2{
                       background-size: 310px 310px;
                       
                       background-position: -210px -76px;

                      }
                  .go-icon3{
                       background-size: 310px 310px;
                       background-position: -210px -116px;

                      }
                  .go-icon4{
                       background-size: 320px 320px;
                       background-position: -217px -161px;
                  }
                  .go-icon5{
                       background-size: 320px 320px;
                       background-position: -78px 0px;
                  }
                  .go-icon6{
                       background-size: 320px 320px;
                           background-position: -78px -31px;
                  }
                  .go-icon7{
                       background-size: 320px 320px;
                       background-position: -78px -70px;
                  }
                  .go-icon8{
                       background-size: 320px 320px;
                       background-position: -78px -109px;
                  }
                  .go-icon9{
                      background-size: 340px 340px;
                      background-position: -83px -157px;
                  }
                  .go-icon10{
                     background-size: 320px 320px;
                     background-position: -77px -179px;
                  }
                  .go-icon11{
                         background-size: 300px 300px;
                         background-position: -203px 2px;
                  }
                }
                &.go-maingreen{
                  li{
                    background: url("../assets/images/skin/maingreen/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                  }
                  .go-icon1{
                       background-size: 309px 309px;
                       background-position: -107px -230px;

                      }
                  .go-icon2{
                       background-size: 310px 310px;
                       
                       background-position: -2px -260px;

                      }
                  .go-icon3{
                       background-size: 310px 310px;
                       background-position: -40px -261px;

                      }
                  .go-icon4{
                       background-size: 318px 318px;
                       background-position:-76px -268px;
                  }
                  .go-icon5{
                       background-size: 316px 318px;
                       background-position: -2px -206px;
                  }
                  .go-icon6{
                       background-size: 320px 320px;
                        background-position:-109px -207px;
                  }
                  .go-icon7{
                       background-size: 320px 320px;
                       background-position:-41px -207px;
                  }
                  .go-icon8{
                       background-size: 320px 320px;
                       background-position: -78px -207px;
                  }
                  .go-icon9{
                      background-size: 340px 340px;
                      background-position: -2px -252px;
                  }
                  .go-icon10{
                     background-size: 320px 320px;
                     background-position: -40px -238px;
                  }
                  .go-icon11{
                         background-size: 300px 300px;
                         background-position: -72px -223px;
                  }
                }
                &.go-golden{
                  li{
                    background: url("../assets/images/skin/golden/left_icon.png") #1F252C 97% center  no-repeat;
                    background-size: 3%;
                    
                  }
                  .go-icon1{
                       background-size: 309px 309px;
                       background-position: -230px -234px;
                      }
                  .go-icon2{
                       background-size: 310px 310px;
                       
                       background-position: -231px -262px;

                      }
                  .go-icon3{
                       background-size: 310px 310px;
                       background-position: -263px -263px;

                      }
                  .go-icon4{
                       background-size: 318px 318px;
                       background-position:-269px -241px;
                  }
                  .go-icon5{
                       background-size: 316px 318px;
                       background-position: -140px -236px;
                  }
                  .go-icon6{
                       background-size: 320px 320px;
                       background-position: -140px -267px;
                  }
                  .go-icon7{
                       background-size: 320px 320px;
                       background-position: -174px -242px;
                  }
                  .go-icon8{
                       background-size: 320px 320px;
                       background-position:  -208px -242px;
                  }
                  .go-icon9{
                      background-size: 340px 340px;
                      background-position:  -150px -316px;
                  }
                  .go-icon10{
                     background-size: 320px 320px;
                     background-position: -172px -270px;
                  }
                  .go-icon11{
                         background-size: 300px 300px;
                         background-position: -192px -253px;
                  }
                }
            }
        }
    }

.git-list-box-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.z {
  z-index: 101;
}
.dialog-pop {
  z-index: 5000;
  width: 80%;
  max-width: 300px;
  background-color: #ffffff;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem 0;
  z-index: 102;
  font-family: "PingFang-SC-Bold";
  .head {
    width: 100%;
    line-height: 1.2em;
    color: #445779;
    font-size: 1.3em;
    font-weight: 600;
    position: relative;
    span {
      display: inline-block;
      overflow: hidden;
      // padding-right: 1em;
      position: absolute;
      right: 15px;
      img {
        width: 14px;
        position: relative;
        top: 2px;
      }
    }
  }
  .mainCon {
    width: 80%;
    margin: 0 auto;
    font-size: 1.2em;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    line-height: 0.8rem;
    clear: both;
    img {
      width: 18px;
      position: relative;
      top: 4px;
      margin-right: 5px;
    }
    .amount {
      font-weight: 600;
      color: #445779;
      /*font-family: number1;*/
    }
    .fr {
      float: right;
      color: #71819D;
      /*position: relative;*/
      top: 0.1rem;
    }
  }
  .dhInp {
    width: 80%;
    margin: 0 auto;
    height: 3.5em;
    clear: both;
    background: #F0F5FF;
    position: relative;
    border-radius: 6px;
    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      font-size: 0.35rem;
      &::-webkit-input-placeholder { 
        color: #6A86B9; 
      } 
    }
    a {
      position: absolute;
      top: 0;
      line-height: 3.5em;
      color: #1486FF;
      right: 10px;
    }
  }
  .btnHigh {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #1486FF;
      color: #fff;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
  .active {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #F0F5FF;
      color: #6A86B9;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
}
@media screen and (max-width: 320px) {
  .dialog-pop .mainCon {
    font-size: 1em;
  }
  .dialog-pop .mainCon .fr {
    top: 0.15rem;
  }
}
.toUser {
  position: absolute;
  right: .3rem;
  width: .4rem;
  height: 2.5rem;
  img {
    width: 0.2rem;
    margin-top: 1.2rem;
  }
}
.goldenMine{
  .session-header{
    background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%);
    .user-mess{
      .name{
        color: #AB9B62!important;
      }
      .id-icon{
        color: #AB9B62!important;
      }
      .user-money{
        color: #AB9B62!important;
      }
      
      
      
    }
    .user-img{
        .edit-box{
          color: #AB9B62!important;
        }
        i{
          background: url(../assets/images/skin/golden/edit.png) no-repeat;
          background-size: contain;
        }
      }
  }
  .no-session-header{
    background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%);
    .tip-box {
      p{
        color: #CECECE;
      }
    }
  }
  .session-main-title{
    background: #1F252C;
    dl{
      dd{
        color: #AB9B62;
      }
    }
  }
  .session-main-server{
    background: #1F252C;
    h3{
      background: #1F252C;
      color: #E3CF95;
    }
    ul{
      li{
        a{
          border-bottom:1px solid #5C564D;
          color: #CECECE;
        }
      }
    }
  }
}

</style>