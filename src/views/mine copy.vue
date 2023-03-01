  <template>
    <div class="mine2-container" id="mine2-container">
        <myScroll :top="0" :bottom="1.4" :bgColor="'f5f7fa'" ref="scrollWrapper">
            <div class="session session-header" v-show="codeToken">
                <div class="user-img" @click="$router.push('/UpdateInforNew')">
                     <div class="img-box">
                        <img v-lazy="avatar" v-if="avatar" alt />
                        <img src="../assets/images/main/web_03.png" v-else alt />
                     </div>
                     <span class="edit-box">{{$t('member.text[0]')}}<i></i></span>
                </div>
                <div class="user-mess">
                    <div class="user-name" :class="[{'sx-pink':skin ==1},{'sx-blue':skin ==2},{'sx-green':skin ==3}]">
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
                        <p class="user-money"  :class="[{'sx-pink':skin ==1},{'sx-blue':skin ==2},{'sx-green':skin ==3}]">{{$t('member.text[2]')}}{{amount}} {{$t('moneyDw')}} <i class="yw-icon" :class="[{'yw-pink':skin == 1},{'yw-blue':skin == 2},{'yw-green':skin == 3}]" @click="showBl"></i> <i class="backMoney" @click="hsMoney">{{$t('member.text[3]')}}</i></p>
                        
                    </div>
                </div>
            </div>
             <!-- 未登录 -->
            <div class="session session-header no-session-header" v-show="!codeToken">
                <div class="login-reg-btn" :class="[{'login-reg-btn-pink':skin ==1},{'login-reg-btn-blue':skin ==2},{'login-reg-btn-green':skin ==3}]"><router-link to='login'>{{$t('loginText')}} </router-link>&nbsp;/&nbsp;<router-link :to="noticeType==1?'register':'RegisterDl'">{{$t('registerText')}}</router-link></div>
                <div class="tip-box"><i></i><p>{{$t('member.text[4]')}}</p> </div>   

            </div>
            
            <div class="session session-main-title">
                <router-link :to="{name:'recharge'}">
                    <dl>
                        <dt class="dt-icon1">
                          <!-- <img src="../assets/images/newMine/monePack.png"  alt=""> -->
                         
                          </dt>
                        <dd>Gửi tiền</dd>
                    </dl>
                </router-link>
                <router-link to="/wallet" >
                    <dl>
                        <dt class="dt-icon2">
                          <!-- <img src="../assets/images/newMine/zh.png" 
                      alt=""> -->
                      </dt>
                        <dd>Chuyển đổi</dd>
                    </dl>
                </router-link>
                <router-link to="/invite">
                    <dl>
                        <dt class="dt-icon3">
                          <!-- <img src="../assets/images/newMine/extend_icon.png" alt=""> -->
                          </dt>
                        <dd>Quảng bá</dd>
                    </dl>
                </router-link>
                <router-link to="/vipRanking">
                    <dl>
                        <dt class="dt-icon4">
                          <!-- <img src="../assets/images/newMine/VIP.png" alt=""> -->
                          </dt>
                        <dd>VIP</dd>
                    </dl>
                </router-link>
              
                
            </div>
            <div class="session session-main-server">
                <h3>Đề xuất dịch vụ</h3>
                <ul :class="[{'go-pink':skin==1},{'go-blue':skin==2},{'go-green':skin==3}]">
                  <li>
                    <i class="go-icon5">
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/notice_icon.png" alt="">
                          <img v-show="skin==1" src="../assets/images/skin/pink/notice.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/notice.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/notice.png" alt /> -->
                      </i><router-link to="/messageCenter">Trung tâm tin nhắn</router-link>
                      <i class="fr dian" v-if="nNum>0"></i>
                      </li>
                      <li>
                        <i class="go-icon6"> 
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/zd_icon.png" alt="">
                          <img v-show="skin==1" src="../assets/images/skin/pink/zd.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/zd.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/zd.png" alt /> -->
                        </i>
                        <router-link to="/ERecord">Hóa đơn của tôi</router-link>
                      </li>
                      <li>
                        <i class="go-icon7"> 
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/game_report.png" alt="">
                           <img v-show="skin==1" src="../assets/images/skin/pink/game_report.png" alt />
                           <img v-show="skin==2" src="../assets/images/skin/blue/game_report.png" alt />
                           <img v-show="skin==3" src="../assets/images/skin/green/game_report.png" alt /> -->
                        </i>
                        <router-link to="/gameReport">Báo cáo trò chơi</router-link>
                      </li>
                        <li>
                          <i class="go-icon8">
                           <!-- <img v-show="skin==0" src="../assets/images/newMine/movie_icon.png" alt="">
                           <img v-show="skin==1" src="../assets/images/skin/pink/movie_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/movie_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/movie_icon.png" alt /> -->
                        </i>
                        <router-link to="/myVideo?type=2">Xem của tôi</router-link>
                      </li>
                      <li>
                        <i class="go-icon9">
                           <!-- <img v-show="skin==0" src="../assets/images/newMine/skin_icon.png" alt="">
                           <img v-show="skin==1" src="../assets/images/skin/pink/skin_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/skin_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/skin_icon.png" alt /> -->
                        </i>

                      
                         <router-link to="/themeSkin"> Màu chủ đề</router-link>
                      </li>
                      <li>
                        <i class="go-icon10">
                           <!-- <img v-show="skin==0" src="../assets/images/newMine/hylb.png" alt="">
                            <img v-show="skin==1" src="../assets/images/skin/pink/hylb.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/hylb.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/hylb.png" alt /> -->
                      </i>
                      <router-link to="/memberPackage">Gói thành viên</router-link>
                      </li>
                      <li>
                        <i class="go-icon11">
                           <!-- <img v-show="skin==0" src="../assets/images/newMine/sm_icon.png" alt="">
                            <img v-show="skin==1" src="../assets/images/skin/pink/sm_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/sm_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/sm_icon.png" alt /> -->
                      </i><router-link to="/loginConfirm">Quét mã đăng nhập</router-link></li>
                </ul>
            </div>
            <div class="session session-main-server" style="padding-bottom:.4rem">
                <h3>Dịch vụ của tôi</h3>
                <ul :class="[{'go-pink':skin==1},{'go-blue':skin==2},{'go-green':skin==3}]">
                    <li>
                        <i class="go-icon1">
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/serve_icon.png" alt="">
                           <img v-show="skin==1" src="../assets/images/skin/pink/serve_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/serve_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/serve_icon.png" alt /> -->
                         
                        </i>
                        <a href="javascript:;" @click="goOnline">Liên hệ với dịch vụ khách hàng</a>
                    </li>
                    <li>
                        <i class="go-icon2">
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/yj_icon.png" alt="">
                          <img v-show="skin==1" src="../assets/images/skin/pink/yj_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/yj_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/yj_icon.png" alt /> -->
                        </i>
                        <router-link to="/Feedback">Ý kiến phản hồi</router-link>
                    </li>
                   
                    <li>
                        <i class="gf-icon go-icon3">
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/callback_icon.png" alt="">
                          <img v-show="skin==1" src="../assets/images/skin/pink/callback_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/callback_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/callback_icon.png" alt /> -->
                        </i>
                        <a href="javascript:;" @click="isShowCallTel=true">Gọi lại dịch vụ</a>
                    </li>
                    <li>
                        <i class="go-icon4">
                          <!-- <img v-show="skin==0" src="../assets/images/newMine/setting_icon.png" alt="">
                          <img v-show="skin==1" src="../assets/images/skin/pink/setting_icon.png" alt />
                          <img v-show="skin==2" src="../assets/images/skin/blue/setting_icon.png" alt />
                          <img v-show="skin==3" src="../assets/images/skin/green/setting_icon.png" alt /> -->
                        </i>
                        <router-link to="/setting">Cài đặt</router-link>
                    </li>
                </ul>
            </div>
        </myScroll>
        <Foot/>


   

    <!-- 回电服务 -->
    <div class="call-back-container" v-if="isShowCallTel">
      <myScroll ref="scrollWrapper2" :top='2' :bottom='5'>
          <div class="call-back-content">
            <p>Chúng tôi cung cấp dịch vụ gọi lại dịch vụ khách hàng qua điện thoại 7 * 24 giờ, nếu bạn đang sử dụng Benping
Khi bạn gặp sự cố tại nhà ga, vui lòng chọn loại sự cố và ngôn ngữ dịch vụ khách hàng mong muốn.
Chúng tôi sẽ gọi cho bạn lần đầu tiên!</p>
            
            <div class="back-item fk-item" >
              <span>Loại phản hồi:</span>
              <div class="item-list"  style="margin-bottom:0" :class="[{'skin-item-pink':skin ==1},{'skin-item-blue':skin ==2},{'skin-item-green':skin ==3}]">
                <span v-for="(v,index) in quesList" :key="index" @click='selectQuesType($event,v.id,$st.state.skin)' >{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span  style="display:block;margin-bottom:2%">Chọn một ngôn ngữ:</span>
              <div class="item-list lan-item" :class="[{'skin-item-pink':skin ==1},{'skin-item-blue':skin ==2},{'skin-item-green':skin ==3}]">
                <!-- :class="v.is_check?'active':''"  -->
                <!-- :class="[{'active':$st.state.skin ==0&&v.is_check},{'skin-btn-pink':$st.state.skin ==1&&v.is_check},{'skin-btn-blue':$st.state.skin ==2&&v.is_check},{'skin-btn-green':$st.state.skin ==3&&v.is_check}]" -->
                <span v-for="(v,index) in lanList" :key="index"  
                 :class="[{'active':$st.state.skin ==0&&v.is_check},{'skin-btn-pink':$st.state.skin ==1&&v.is_check},{'skin-btn-blue':$st.state.skin ==2&&v.is_check},{'skin-btn-green':$st.state.skin ==3&&v.is_check}]"
                 @click="changeLan($event,v,$st.state.skin)">{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span style="display:block;margin-bottom:2%">tài khoản thành viên:</span>
              <input type="text" maxlength="11" :class="[{'skin-border-pink':skin ==1},{'skin-border-blue':skin ==2},{'skin-border-green':skin ==3}]"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="memberAccount" placeholder="Vui lòng gửi tài khoản thành viên">
            </div>
            <div class="back-item">
              <span style="display:block;margin-bottom:2%;margin-top:2%">số điện thoại:</span>
              <input type="text" :class="[{'skin-border-pink':skin ==1},{'skin-border-blue':skin ==2},{'skin-border-green':skin ==3}]" maxlength="12"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="tel" placeholder="Số điện thoại di động hoặc số điện thoại cố định">
            </div>
            <div class="commit-btn" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]"  @click="getCallBack">Gửi thông tin</div>
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
                amount: "0.00",
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
    ...mapState(["codeToken", "userinfo","vip","noticeNum","skin",'webInitData'])
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
        this.$vux.loading.show({ text: "Đang nhận..." });
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
        this.$vux.toast.text('Vui lòng chọn loại câu hỏi phản hồi', 'middle')
        return;
      }
      if(this.currLan<0){
        this.$vux.toast.text('Vui lòng chọn ngôn ngữ', 'middle')
        return;
      }
      if(!this.tel){
        this.$vux.toast.text('Vui lòng điền số điện thoại của bạn', 'middle')
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
          (this.nickname = res.data.data.nickname || "Biệt danh của tôi"),
            (this.profile = res.data.data.profile || "Chữ ký riêng~"),
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
        this.amount = "Đang nhận...";
        this.$http.get("/api/user/balance").then(res => {
          if (flag && document.querySelector(".shua"))
            document.querySelector(".shua").classList.remove("loading-money");
          if (res && res.data.code == 1) {
            this.amount = res.data.data.balance || "0.00"; //显示出来的
            if(this.amount == 0){
              this.amount = "0.00";
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
          this.amount = res.data.data.balance || "0.00"; //显示出来的
           if(this.amount == 0){
              this.amount = "0.00";
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
                  // background: url(../assets/images/newMine/sx-pink.png) no-repeat;
                  // background-size: contain;
                  background-position: -884px -266px;
                }
                }
                &.sx-blue{
                  i.money-refresh{
                    // background: url(../assets/images/newMine/sx-blue.png) no-repeat;
                    // background-size: contain;
                    background-position: -884px -280px;
                  }
                }
                &.sx-green{
                  i.money-refresh{
                    // background: url(../assets/images/newMine/sx-green.png) no-repeat;
                    // background-size: contain;
                    background-position: -884px -254px;
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
                // background: url(../assets/images/member/ts_icon.png) no-repeat;
                width: .41rem;
                height: .41rem;
                display: inline-block;
                // background-size: contain;
                vertical-align: sub;
                background: url(../assets/images/newMine/allMineIcon.png) no-repeat;
                background-size: 410px 410px;
                background-position: -180px -287px;
                &.yw-pink{
                  // background: url("../assets/images/skin/pink/ts_icon-pink.png") no-repeat!important;
                  // background-size: contain!important;
                  background-size: 270px 270px;
                  background-position: -209px -186px;
                }
                &.yw-blue{
                  // background: url("../assets/images/skin/blue/ts_icon-blue.png") no-repeat!important;
                  // background-size: contain!important;
                  background-size: 270px 270px;
                  background-position: -154px -187px;
                }
                &.yw-green{
                  // background: url("../assets/images/skin/green/ts_icon-green.png") no-repeat!important;
                  // background-size: contain!important;
                  background-size: 270px 270px;
                  background-position: -183px -187px;
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
                background: url(../assets/images/newMine/allMineIcon.png) no-repeat;
                &.dt-icon1{
                  
                  background-size: 1200px 1200px;
                  background-position: -1064px -199px;
                }
                &.dt-icon2{
                  
                  background-size: 1200px 1200px;
                      background-position: -1062px -136px;
                }
                &.dt-icon3{
                  
                  background-size: 1200px 1200px;
                  background-position: -1060px -74px;
                }
                &.dt-icon4{
                  
                  background-size: 1200px 1200px;
                  background-position: -1060px -3px;
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
                        background-position: -2px 1px;
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
                          background-position: -2px -126px;
                      }
                      &.go-icon10{
                        background-size: 320px 320px;
                        background-position: -1px -181px;
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
                    // background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                    // background-size: 310px 310px;
                    // background-position: -240px -42px;
                }
                &.go-pink{
                  li{
                    background: url("../assets/images/skin/pink/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                  }
                  .go-icon1{
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                       background-size: 310px 310px;
                       background-position: -240px -42px;

                      }
                  .go-icon2{
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
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
                    background-position: -108px -181px;
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
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                       background-size: 310px 310px;
                       background-position: -177px -42px;

                      }
                  .go-icon2{
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                       background-size: 310px 310px;
                       background-position: -177px -78px;

                      }
                  .go-icon3{
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
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
                    background-position: -43px -181px;
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
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
                       background-size: 310px 310px;
                       background-position: -210px -42px;

                      }
                  .go-icon2{
                      //  background: url('../assets/images/newMine/allMineIcon.png') no-repeat;
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
                     background-position: -77px -181px;
                  }
                  .go-icon11{
                         background-size: 300px 300px;
                         background-position: -204px 2px;
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

</style>