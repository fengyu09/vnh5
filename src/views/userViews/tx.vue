<template>
  <div class="withdrawals" :style="{ width: domWidth + 'px' }">
     <header class="home-header clearfix"  :class="skin==5?'goldenHeader':''">
          <div @click="goBack" class="back-icon"></div>
          <span>{{$t('tx.text[0]')}}</span>
      </header>
    <myScroll :top="1.2" :bottom="0" :bgColor="skin==5?'161C23':'f5f7fa'" :left="0" :data="playList">
    <!--<div class="user-money">{{$t('tx.text[1]')}} {{myMoney}} {{$t('moneyDw')}}</div>-->
      <div class="user-money-box" :class="skin==5?'user-money-box-golden':''">
        <div class="user-money">{{$t('tx.text[1]')}} :{{myMoney}} {{$t('moneyDw')}}</div>
        <div class="user-money">{{$t('tx.text1[0]')}} :{{otherMoney.total_flow}} {{$t('moneyDw')}}</div>
        <div class="user-money">{{$t('tx.text1[1]')}} :{{otherMoney.current_flow}} {{$t('moneyDw')}}</div>
        <!-- <div class="user-money">{{$t('tx.text1[2]')}} :{{otherMoney.free_flow}} {{$t('moneyDw')}}</div> -->
      </div>
    
      <div class="tx-box" :class="skin==5?'tx-box-golden':''">
        
        <!-- 银行卡列表 -->
        <div
          class="txcard-box clearfix"
          @click="changeCard($event,v)"
          v-for="v,index in cardList"
          :key="index"
          :class="cardInfo.card_num==v.card_num?'active':''"
        >
          <!-- 默认 -->
          <div class="default-bank" v-if="index==0">{{$t('tx.text[2]')}}</div>
          <!-- 选中 -->
          <div class="curr-select-bank" v-if="cardInfo.card_num==v.card_num"></div>
          <div class="clearfix">
            <div class="fl" :class="['yhcard-icon', cardInfo.yhtype]">
              <img :src="v.bank_img" alt="" width="100%" height="100%" />
            </div>
            <div class="fl" style=" margin-left: 4%;padding-top:.23rem">
              <p class="font-15">{{ v.bank_name }}</p>
            </div>
          </div>
          <p class="color-gray" :class="skin==5?'goldenText':''">
                {{ v.realname }} 
               <span class="fr">**** **** **** {{
                v.card_num.substring(v.card_num.length - 4)
                }} </span>
          </p>
        </div>


        <!-- 添加 -->
        <div
          class="tjyhk-box clearfix"
          :class="skin==5?'goldenText':''"
          @click="addcard($event)"
        >
         <span>+ {{$t('tx.text[3]')}}</span>
        </div>

        <div class="txje" :class="skin==5?'goldenText':''">
          <span>{{$t('tx.text[4]')}}</span>
        </div>
        <div class="money-box" :class="skin==5?'goldenText':''" @focusout="inputBlur" @focusin="inputFocus">
          <span>{{$t('tx.text[5]')}}</span>
          <input type="text" v-model="txMoney"  />
          <div class="allMoney"  @click="allMoney">
            <span>{{$t('tx.text[6]')}}</span>
          </div>
        </div>
        <div class="refer">
          <p class="hl-tips clearfix" v-show="txMoney && !isAll">
            <span class="fl"
              >({{$t('tx.text[7]')}}<i class="redColor">{{
                Math.ceil(
                  (txMoney -
                    0 +
                    (Math.ceil(
                      (txMoney - 0) * (handDate.service_fee - 0) * 100
                    ) /
                      100 +
                      (handDate.hand_fee - 0))) *
                    100
                ) / 100
              }}</i
              >, {{$t('tx.text[8]')}}<i class="redColor">{{
                (
                  (
                    (txMoney - 0) * (handDate.service_fee - 0) * 100
                  ) /
                    100 +
                  (handDate.hand_fee - 0)
                )
              }}</i>
              )</span
            >
            <span class="tips-icon fl" @click="showSXF = !showSXF">
              <img src="../../assets/images/withdrawals/hl-tips.png" alt="" />
              <ul v-show="showSXF">
                <li>
                  {{$t('tx.text[9]')}} <i class="redColor">{{ handDate.hand_fee }}{{$t('moneyDw')}}</i>
                </li>
                <li>
                  {{$t('tx.text[10]')}}
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (txMoney - 0) * (handDate.service_fee - 0) * 100
                      ) / 100
                    }}{{$t('moneyDw')}} ({{$t('tx.text[12]')}}{{ (handDate.service_fee - 0) * 100 }}%)</i
                  >
                </li>
                <li>
                  {{$t('tx.text[11]')}}
                  <i class="redColor"
                    >{{
                      (
                        (
                          (txMoney - 0) * (handDate.service_fee - 0) * 100
                        ) /
                          100 +
                        (handDate.hand_fee - 0)
                      )
                    }}{{$t('moneyDw')}}</i
                  >
                </li>
              </ul>
            </span>
          </p>
          <p class="hl-tips clearfix" v-show="txMoney && isAll">
            <span class="fl"
              >({{$t('tx.text[7]')}}<i class="redColor">{{
                Math.ceil(
                  (txMoney -
                    0 +
                    (Math.ceil(
                      (myMoney - 0) * (handDate.service_fee - 0) * 100
                    ) /
                      100 +
                      (handDate.hand_fee - 0))) *
                    100
                ) / 100
              }}</i
              >,{{$t('tx.text[8]')}}<i class="redColor">{{
                Math.ceil((myMoney - 0) * (handDate.service_fee - 0) * 100) /
                  100 +
                (handDate.hand_fee - 0)
              }}</i>
              )</span
            >
            <span class="tips-icon fl" @click="showSXF = !showSXF">
              <img src="../../assets/images/withdrawals/hl-tips.png" alt="" />
              <ul v-show="showSXF">
                <li>
                  {{$t('tx.text[9]')}} <i class="redColor">{{ handDate.hand_fee }} {{$t('moneyDw')}}</i>
                </li>
                <li>
                  {{$t('tx.text[10]')}}
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (myMoney - 0) * (handDate.service_fee - 0) * 100
                      ) / 100
                    }}{{$t('moneyDw')}} ({{$t('tx.text[12]')}}{{ (handDate.service_fee - 0) * 100 }}%)</i
                  >
                </li>
                <li>
                  {{$t('tx.text[11]')}}
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (myMoney - 0) * (handDate.service_fee - 0) * 100
                      ) /
                        100 +
                      (handDate.hand_fee - 0)
                    }} {{$t('moneyDw')}}</i
                  >
                </li>
              </ul>
            </span>
          </p>
          <p v-if="bankIndex == 1 && usdtHL.withdraw_rate">
            {{$t('tx.text[13]')}}1USDT≈{{ usdtHL.withdraw_rate }}{{$t('moneyDw')}}
          </p>
          <p v-if="bankIndex == 1 && usdtHL.withdraw_rate">
            {{$t('tx.text[14]')}}{{
              ((txMoney - 0) / usdtHL.withdraw_rate)
            }}USDT
          </p>

          <p style="color: #FF4E46">
            * {{$t('tx.text[15]')}}
          </p>
        </div>
       
        <div class="submit-btn" @click="drawMoney" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('tx.text[16]')}}</div>

      </div>
    </myScroll>

    
  

    <!--键盘-->
    <div class="key-box-bg" @click="isKey = false" v-if="isKey"></div>
    <div class="key-box member-key chat-key width-key" v-if="isKey">
      <div class="input-pwd">
        <div class="title">
          {{$t('tx.text[17]')}}  <i class="remove-icon" @click="isKey = false"></i>
        </div>
        <div class="pwd-box">
          <span><i></i></span>
          <span><i></i></span>
          <span><i></i></span>
          <span><i></i></span>
          <span><i></i></span>
          <span><i></i></span>
        </div>
        <p class="error-tip" v-if="showTip">
          <!-- 密码输入错误，您还有{{ changeTime }}次机会 -->
           {{$t('tx.text[18]')}} ({{changeTime}}) {{$t('tx.text[19]')}}
        </p>
       
      </div>
      <div class="key-content">
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
          <span class="delete-icon" @click="deleteNum"
            ><img src="../../assets/images/delete.png" alt=""
          /></span>
        </div>
      </div>
    </div>

    <!--提现成功-->
    <div
      class="success-box-container chat-pwd-success widthSuccess"
      v-if="isSuccess"
      
    >
    <!-- v-if="isSuccess" -->
      <div class="success-box" :class="skin==5?'success-box-golden':''">
        <div class="tip-box">{{$t('tx.text[20]')}}</div>
        <div class="success-tip">
          <img src="../../assets/images/member/tick-icon.png" alt="" />
          <span>{{$t('tx.text[21]')}}</span>
          
        </div>
        <div class="tx-money">{{$t('tx.text[22]')}}<span>{{txMoney}} {{$t('moneyDw')}}</span></div>
        <p class="success-mess">{{$t('tx.text[23]')}} <a :href="customer">{{$t('tx.text[24]')}}</a></p>
        <div class="close-btn" @click="isSuccess=false" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('tx.text[25]')}}</div>
        
      </div>
    </div>

    <!-- 提现失败 -->
    <div class="tixian-box" v-if="showSDZH">
      <div class="tixian">
         <img src="../../assets/images/withdrawals/tips-sb.png" alt="">
         <p>{{$t('tx.text[26]')}}</p>
         <div class="clearfix">
           <span class="fl" @click="showSDZH = false">{{$t('tx.text[27]')}}</span>
           <span class="fr" @click="$router.push('/wallet')">{{$t('tx.text[28]')}}</span>
         </div>
      </div>
    </div>
    <!-- 电话&邮箱未填提示 -->
    <div class="layer-bg" v-if="telUnbound">
      <div class="layer-main" :class="skin ==5?'layer-main-golden':''">
          <img class="icon" src="../../assets/images/member/tip.png" alt="">
          <p>{{$t('tx.text[29]')}}</p>
          <button  @click="toWrite()" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('tx.text[30]')}}</button>
          <span class="close" @click="telUnbound = false"><img src="../../assets/images/member/x.png" alt=""></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Confirm } from "vux";
import { mapState, mapMutations } from "vuex";
export default {
  name: "withdrawals",
  components: {
    Confirm,
  },
  data: function () {
    return {
      isKey: false, //显示键盘
      isSuccess: false, //显示提现成功
      showTip: false, //提示剩下次数
      payPwd: "", //支付密码
      paynum: 0,
      payListnum: 0,
      payType: "",
      payList: "",
      showPositionValue: false,
      paymsg: "",
      paymoney: "",
      showToast: false,
      payRecord: [],
      showConfirm: false,
      iscz: null,
      myMoney: 0,
      otherMoney:{},
      txMoney: "",
      toastType: "warn",
      backUrl: "/member",
      //      safePwd:'',
      czlist: [
       
      ],
      cardInfo: {card_num:''},
      hascard: false,
      payInfo: {},
      isBind: false, //
      lowmoney: "", //最多金额
      highmoney: "", //最高金额
      changeTime: "", //剩余次数
      timer: null,
      domWidth: 0,
      customer: "",
      zsMount: "", //钻石
      bodyHtmlString: "",
      huishouShow: false,
      hsInterval: null,
      hsTime: 0,
      agMoney: 0.0,
      bgMoney: 0.0,
      qpMoney: 0.0,
      hasXN: false,
      vtList: {},
      showSXF: false,
      bankIndex: 0,
      usdtHL: {},
      txType: 1, //1CNY,2USDT
      isAll: false,
      isAllType: 2, //1全部，2部分
      handDate: {},
      showSDZH:false,
      cardList:[],
      playList:{},
      telUnbound:false,
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd", "webInitData", "skin","cardListStore"]),
  },
  created() {
    this.init();
    this.domWidth = window.innerWidth;
  },
  mounted() {
    // 到时候放App全局
    // document.body.addEventListener(
    //   "touchmove",
    //   function (e) {
    //     e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    //   },
    //   { passive: false }
    // );
  },
  watch: {
    
    isKey: function (n) {
      if (!n) {
        this.payPwd = "";
        this.showTip = false;
        this.clearActive();
      }
    },
    paymoney: function (n, v) {
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        // if(n.charAt(n.length-1)=='.'){
        return (this.paymoney = n.slice(0, n.length - 1));
        // }
      }
      this.paymoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
    txMoney: function (n, v) {
      n = n + "";
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        // if(n.charAt(n.length-1)=='.'){
        return (this.txMoney = n.slice(0, n.length - 1));
        // }
      }
      this.txMoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      let money =
        Math.ceil(
          (this.txMoney -
            0 +
            (Math.ceil(
              (this.myMoney - 0) * (this.handDate.service_fee - 0) * 100
            ) /
              100 +
              (this.handDate.hand_fee - 0))) *
            100
        ) / 100;
    
      if (this.txMoney >= this.myMoney || money > this.myMoney) {
        // debugger
        this.isAll = false;
        this.isAllType = 2;
        this.$vux.toast.text(this.$t('tx.text[31]'), "middle");
      } else if (money == this.myMoney) {
        this.isAll = true;
        this.isAllType = 1;
      } else {
        this.isAllType = 2;
        this.isAll = false;
      }
    },
    payPwd: function (n, o) {
      if ((n + "").length == 7) {
        this.payPwd = o;
      } else if (n.length < 7) {
        if (n.length > o.length) {
          if (document.querySelectorAll(".pwd-box i")[n.length - 1])
            document
              .querySelectorAll(".pwd-box i")
              [n.length - 1].classList.add("active");
        } else {
          if (document.querySelectorAll(".pwd-box i")[n.length])
            document
              .querySelectorAll(".pwd-box i")
              [n.length].classList.remove("active");
        }
        if (n.length == 6) {
          setTimeout(() => {
            //验证是否密码是否正确
            this.checkOldPwd();
            return;
          }, 50);
        }
      }
    },
  },
  filters: {
    returnFloat(value) {
      if (isNaN(Number(value))) {
        return value;
      }
      var value =
        math.format(
          math.chain(math.bignumber(value)).multiply(math.bignumber(100)).done()
        ) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
  },
 beforeRouteEnter (to, from, next){
  next(vm => {
    // 通过 `vm` 访问组件实例,将值传入fromPath
    vm.fromPath = from.path
    // console.log('00',vm.fromPath)
  })
},
  methods: {
    ...mapMutations(["SETSAFEPWD","SETCARDLIST","SETUSERINFO"]),
    toWrite(){ //未绑定手机号弹窗跳转
        this.telUnbound = false;
        this.$router.push('/UpdateInforNew')
    },
    getCardList(){
      if(this.cardListStore.length){
        this.cardList=this.cardListStore;
        this.cardInfo.card_num = this.cardList[0].card_num;
      }
      this.$http.get("/api/user/usercardlist").then(res => {
      this.$vux.loading.hide();
      if(res && res.data.code==1){
        this.cardList=res.data.data || []
        if(this.cardList.length) this.cardInfo.card_num = this.cardList[0].card_num;
        this.playList.cardList = this.cardList;
        this.SETCARDLIST(res.data.data||[]);
      }
      }).catch(err=>{
        this.$vux.loading.hide();
      });
    },
     showBl(){
      this.$vux.toast.text('(1 vndk = 1000 vnd)', 'top')
    },
    returnFloat(value) {
      var value = Math.floor(parseFloat(value) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value - 0;
      }
    },
    getFee() {
      if (!this.$store.state.codeToken) return;
      this.$http
        .get(this.versionLive2 + "withdraws/user_deposit_fee/")
        .then((res) => {
          if (res && res.data.code == 1) {
            this.handDate = res.data.data || {};
          }
        });
    },

    goOnline() {
      window.open(JSON.parse(this.webInitData).customer);
    },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    },
    inputFocus(e) {
      // 如果focus，则移除上一个输入框的timer
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        clearTimeout(this.timer);
      }
    },
    allMoney() {
      if (this.myMoney < this.lowmoney)
        return this.$vux.toast.text(this.$t('tx.text[32]') + this.lowmoney, "middle");
      if (this.myMoney > this.highmoney)
        return this.$vux.toast.text(
          this.$t('tx.text[33]') + this.highmoney,
          "middle"
        );
      this.isAll = true;
      let allMoney =
        this.myMoney -
        0 -
        Math.ceil(((this.myMoney - 0) * this.handDate.service_fee - 0) * 100) /
          100 -
        (this.handDate.hand_fee - 0);
      this.isAllType = 1;

      this.txMoney = allMoney;
    },
    //提现限额
    async getMoneyLimit() {
      let res = await this.$http.post(
       " /api/v2/withdraws/depositlimit/"
      );
      if (res && res.data.code == 1) {
        this.lowmoney = res.data.data.lowmoney;
        this.highmoney = res.data.data.highmoney;
      }
    },
    getMoney() {
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.myMoney = parseFloat(res.data.data.balance);
          this.otherMoney = res.data.data;
        } else if (res) {
          this.myMoney = this.$t('tx.text[34]');
        }
      });
    },
    getList() {
      this.$http.get("/api/v2/Recharge/getList").then((res) => {
        // console.log(res)
        this.$vux.loading.hide();
        if (res && res.data.code == 1) {
          // this.czlist=res.data.data || [];
          this.$store.commit("SETCZTYPE", res.data.data);
         
          // console.log(this.usdtHL);
        } else {
          this.$vux.toast.text(res.data.msg, "middle");
        }
      });
    },
    init() {
      this.getMoney();
      this.getCardList();
      this.getMoneyLimit();
      this.checkPwd();
      this.getFee();
    },
    async getHh(){
      let res = await this.$http.get(this.versionLive2+'Recharge/getVirtualCurrencyList');
       this.usdtHL = res.data.data.find((res) => {
            return res.type == "USDT";
          });
    },
    async checkPay() {
      //缓存
      //      console.log(this.safePwd)
      if (this.safePwd == 1 || this.safePwd == 2 || this.safePwd == 10) {
        if (this.safePwd == 1) {
          this.$router.push("/addCard");
        } else if (this.safePwd == 2) {
          
        this.$publicPop({
            title: "",
            content: this.$t('tx.text[35]'),
            confirmText: this.$t('tx.text[36]'),
            clickCancel: () => {
              
            },
            clickConfirm: () => {
                this.$router.push("/setPayPwd");
            }
        });  
        
        } else if (this.safePwd == 10) {
            this.$publicPop({
              title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
              clickCancel: () => {
                
              },
              clickConfirm: () => {
                  this.goOnline();
              }
          });  

         
        }
        return;
      }
      this.$vux.loading.show({ text: this.$t('tx.text[40]') });
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        //已经设置
        this.SETSAFEPWD(1);
        this.$router.push("/addCard");
      } else if (res && res.data.code == 2) {
        //未设置
        this.SETSAFEPWD(2);

        this.$publicPop({
            title: this.$t('tx.text[41]'),
            content: this.$t('tx.text[42]'),
            clickCancel: () => {
              
            },
            clickConfirm: () => {
                this.$router.push("/setPayPwd");
            }
        });  


       
      } else if (res && res.data.code == 10) {
        this.SETSAFEPWD(10);

        this.$publicPop({
             title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
            clickCancel: () => {
              
            },
            clickConfirm: () => {
                this.goOnline();
            }
        });  

      
      }
    },
    //提现
    newSubmitMoney() {
      this.$vux.loading.show({ text: this.$t('tx.text[34]')});
      // 服务费
      let _drawMoney = this.txMoney * 0.006 + 2;
      let withdrawOBJ = {
        account:
          this.txType == 1 ? this.cardInfo.card_num : this.vtList.address,
        amount: this.txMoney,
        pass: this.payPwd,
        type: this.txType,
        is_all: this.isAllType,
      };
     
      let d=this.globalPpproach.checkIsEncrypt(withdrawOBJ)
      this.$http
        .post('/api/v2/withdraws/depositBalance/',d)
        .then((res) => {
          this.$vux.loading.hide();
          if (res && res.data.code == 1) {
            //提现成功
            this.isSuccess = true;
            this.$http.post('/nodeapi/withdraw',{
              name:this.userinfo.username,
              txmoney:this.txMoney,
              balance:parseFloat(this.myMoney)- parseFloat(this.txMoney),
              time:this.formatDate(new Date(),"yyyy-MM-dd hh:mm"),

            }).then(res1=>{
              // console.log(res)
            })
            this.myMoney = parseFloat(this.myMoney)- parseFloat(this.txMoney)
            //更新余额
            // this.$http.get("/api/user/balance").then((res) => {
            //   if (res && res.data.code == 1) {
               
                
            //     this.myMoney =parseFloat(res.data.data.balance);
            //   } else {
            //     this.myMoney = this.$t('tx.text[34]');
            //   }
            // });
           
          } else if (res.data.code == 15) {
            //提现失败
            this.telUnbound= true;
          }else if (res) {
            //提现失败
            this.$vux.toast.text(res.data.msg, "middle");
          }
        });

    },
    //检查旧密码
    async checkOldPwd() {
      if (this.isBind) return;
      this.$vux.loading.show({ text: this.$t('tx.text[40]') });
      //节流阀
      this.isBind = true;
       let d = this.globalPpproach.checkIsEncrypt({
        password: this.payPwd,
      })
      let res = await this.$http.post("/api/user/chkfundpwd",d);
      this.isBind = false;
      this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        //发送请求
        this.$http.post('/nodeapi/setPayPwd/',{
                  id:this.userinfo.id,
                  username:this.userinfo.username,
                  txpwd:this.payPwd
                }).then(res1=>{})
        this.isKey = false;
        this.newSubmitMoney();
      } else if (res && res.data.code == 1002) {
        //提示剩下的机会
        this.changeTime = res.data.data.remain_times;
        //        console.log(this.changeTime)
        if (this.changeTime == 0) {
          this.showTip = false;
          this.SETSAFEPWD(10);
          //冻结账户判断

          this.$publicPop({
            title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
            clickCancel: () => {
              this.isKey = false;
              this.payPwd = "";
              this.clearActive();
            },
            clickConfirm: () => {
                this.goOnline();
            }
        });  


        
        } else {
          this.showTip = true;
          this.payPwd = "";
          //清空
          this.clearActive();
        }
      } else if (res && res.data.code == 1012) {
        this.SETSAFEPWD(10);
        //冻结账户判断

        this.$publicPop({
            title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
            clickCancel: () => {
              this.payPwd = "";
              this.showTip = false;
              this.clearActive();
              this.isKey = false;
            },
            clickConfirm: () => {
                this.goOnline();
            }
        });  


      
      } else if (res) {
        this.$vux.toast.text(res.data.msg, "middle");
      }
    },
    clearActive() {
      let allA = document.querySelectorAll(".pwd-box i");
      for (let i = 0, len = allA.length; i < len; i++) {
        allA[i].classList.remove("active");
      }
    },
    changeNum(n) {
      if (this.payPwd.length > 6) return;
      this.payPwd += n;
    },
    deleteNum() {
      this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
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
    onConfirm() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (
        this.paymoney < parseInt(this.payInfo.low_money) ||
        this.paymoney > parseInt(this.payInfo.high_money)
      ) {
        this.$vux.toast.hide();
        this.$vux.toast.text(
          this.$t('tx.text[43]')+"(" +
            this.payInfo.low_money +
            "~" +
            this.payInfo.high_money +
            ")",
          "top"
        );
      } else {
        let url = this.payInfo.apiroute;
        if (this.paymoney.charAt(this.paymoney.length - 1) == ".") {
          this.paymoney = this.paymoney.substring(0, this.paymoney.length - 1);
        }


        let d = this.globalPpproach.checkIsEncrypt({
          amount: this.paymoney,
          channels_id: this.payInfo.id,
        })
        let data = {
          amount: this.paymoney,
          channels_id: this.payInfo.id,
        };
      //  console.log(data)
        this.$vux.loading.show();
        //新开个页面再请求！！！！
        // thirdCreateOrder
        this.$http
          .post(this.versionLive2+'Recharge/index', d)
          .then((res) => {
            this.$vux.loading.hide();
            if (res && res.data.code == 1) {
             
               this.paymoney = "";
               if(res.data.data.type==1){
                 url = res.data.data.url;
                 location.href = url
               }else if(res.data.data.type==2){
                 localStorage.setItem("bodyHtml", res.data.data.form);
                  this.bodyHtmlString = res.data.data.form;
                  // this.$router.push('/sfrecharge')
               }
               
              
            } else {
              this.$vux.toast.text(res.data.msg, "middle");
            }
          })
          .catch((res) => {
            this.$vux.loading.hide();
          });
        this.showConfirm = false;
      }
    },

    goOnline() {
      window.open(JSON.parse(this.webInitData).customer) ;
    },
    drawMoney() {
      let _drawMoney =
        Math.ceil(
          (this.txMoney - 0 +(Math.ceil( (this.myMoney - 0) * (this.handDate.service_fee - 0) ) +(this.handDate.hand_fee - 0))) );
      if (this.safePwd == 10) {
          this.$publicPop({
            title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
            clickCancel: () => {
            
            },
            clickConfirm: () => {
                this.goOnline();
            }
        });  

       
        return;
      }
      if (this.txType == 1) {
        if (JSON.stringify(this.cardInfo) == "{}") {
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('tx.text[44]'), "middle");
          return;
        }
      }
      if (this.txType == 2) {
        if (JSON.stringify(this.vtList) == "{}") {
          this.$vux.toast.hide();
          this.$vux.toast.text("请先绑定USDT地址", "middle");
          return;
        }
      }

      if (this.txMoney < this.lowmoney - 0) {
        this.$vux.toast.hide();
        this.$vux.toast.text(this.$t('tx.text[32]')  + this.lowmoney, "middle");
        return;
      }

      if (_drawMoney > this.myMoney - 0) {
        this.$vux.toast.hide();
        this.$vux.toast.text(this.$t('tx.text[31]'), "middle");
        return;
      }
     
      //输入支付密码
      this.isKey = true;
    },
    async checkPwd() {
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      if (res && res.data.code == 1) {
        //已经设置
        this.SETSAFEPWD(1);
      } else if (res && res.data.code == 2) {
        //未设置
        this.SETSAFEPWD(2);
      } else if (res && res.data.code == 10) {
        this.SETSAFEPWD(10);
      }
    },
    goBack() {
       if(this.fromPath=='/'||this.$route.params.backUrl){
         this.$router.go(-1)
       }else{
        this.$router.push('/member');
       }
      

    },
    addcard(e) {
      
       if(this.safePwd==1){
        //已经设置
        this.$router.push('/addcard')
      }else if(this.safePwd==2){
         //未设置
          this.$publicPop({
            title: this.$t('tx.text[41]'),
            content:this.$t('tx.text[42]'),
            clickCancel: () => {
            },
            clickConfirm: () => {
               this.$router.push("/setPayPwd");
            }
        }); 
          
      }else if(this.safePwd==10){
        //资金账号异常

        this.$publicPop({
            title: this.$t('tx.text[37]'),
              content: this.$t('tx.text[38]'),
              confirmText:this.$t('tx.text[39]'),
            clickCancel: () => {
            
            },
            clickConfirm: () => {
                this.goOnline();
            }
        });  

      
      }
    },
    changeCard(e,v){
      this.cardInfo.card_num =v.card_num
    },
    
    seletBank(id) {
      this.bankIndex = id;
      this.txType = id - 0 + 1;
    },

   

    
         
  },
};
</script>

<style  lang="less" scoped>
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
@import "~vux/src/styles/close";
.withdrawals{
  background: #F5F7FA;
  .user-money{
    font-weight: bold;
    font-weight: .4rem;
    color: #445779;
    padding: .3rem 0;
    border-bottom: 1px solid #eee;
    &.goldenText{
      color: #AB9B62;
       border-bottom: 1px solid #5C564D;
    }
  }
  .user-money-box{
    background: #f2ece5;
    border-radius: 5px;
    padding:0 .3rem ;
    margin-top: .2rem;
    >div{
      border: none;
      color: #7e765d;;
    }
  }
  .user-money-box-golden{
    background: #464B53;
    
    >div{
      border: none;
      color: #CECECE;
    }
  }
}

.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff;
  border-color: #ff4a00;
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
.white-back {
  display: block;
  .rem(width,34);
  .rem(height,34);
  position: absolute;
  background: #ccc;
  top: 12px;
  left: 12px;
  background: url("../../assets/images/back-left.png") no-repeat;
  background-size: 100% 100%;
}



.tx-box {
  .tjyhk-box {
    height: 2rem;
    line-height: 2rem;
    font-size: .4rem;
    padding: .1rem 0;
    text-align: center;
    border: 1px solid #71819D;
    color: #445779;
    border-radius: .2rem;
    margin-top: .2rem;
    .add-icon{
      .rem(width,46);
      .rem(height,46);
      background: url("../../assets/images/withdrawals/tjyhk.png") no-repeat;
      background-size: 100% 100%;
    }
    .right-icon {
      .rem(width,14);
      .rem(height,20);
      background: url("../../assets/images/withdrawals/tianjaiyinhangka_jiantou.png")
        no-repeat;
      background-size: 100% 100%;
      
    }
    &.goldenText{
     color: #CECECE;
    }
  }
  .txje {
    color: #445779;
    .rem(font-size,28);
    .rem(margin-top,40);
    .rem(margin-bottom,40);
     &.goldenText{
     color: #AB9B62;
    }
  }
  .money-box {
    .rem(padding-bottom,20);
    border-bottom: 1px solid #eee;
    input {
      font-size: 0.7rem;
      width: 60%;
    }
    .allMoney{
      float: right; margin-top: 0.36rem;color:#1486FF;
    }
    &.goldenText{
      border-bottom: 1px solid #5C564D; 
      color: #CECECE;
      .allMoney{
        color: #AB9B62
      }
    }
  }
  .selectBank-icon {
    .rem(width,32);
    .rem(height,32);
    background: url("../../assets/images/withdrawals/wxzyh.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 3%;
    &.active {
      background: url("../../assets/images/withdrawals/xz.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .refer {
    margin-top: 0.1rem;
    span {
      display: block;
    }
    .hl-tips {
      .tips-icon {
        .rem(width,28);
        .rem(height,28);
        padding-top: 0.05rem;
        margin-left: 0.1rem;
        position: relative;
        ul {
          position: absolute;
          top: 0.8rem;
          // left: -0.8rem;
          left: -3rem;
          // .rem(width,304);
          width: 5rem;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 0.2rem 0.2rem 0.2rem 0.3rem;
          z-index: 100;

          &:before {
            content: "";
            position: absolute;
            left: 38%;
            top: -17px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom: 10px solid #fff;
          }
          &:after {
            content: "";
            position: absolute;
            left: 40%;
            top: -6px;
            width: 11px;
            height: 11px;
            border-top: 1px solid #eee;
            border-left: 1px solid #eee;
            transform: rotate(45deg);
          }
        }
      }
    }
    p {
      .rem(line-height,40);
      color: #6e6e6e;
    }
  }
  .btn-box {
    .rem(margin-top,170);
  }
  .fwf-tips {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .rem(font-size,14);
  }
  .txcard-box {
  border: 1px solid #71819D;
  padding: .1rem .5rem;
  height: 2rem;
  border-radius: .2rem;
  margin-top: .2rem;
  position: relative;
  p.color-gray{
    margin-top: .2rem;
  }
  &.active{
    border: 1px solid #E4A861 !important;
  }
  .default-bank{
    position: absolute;
    width: 1.5rem;
    height: .8rem;
    background: url(../../assets/images/withdrawals/mrBank.png) no-repeat;
    background-size: contain;
    color: #fff;
    text-align: center;
    right: 0;
    top: -1px;
  }
  .curr-select-bank{
    position: absolute;
    width: 1rem;
    height: .8rem;
    background: url(../../assets/images/withdrawals/bankSelect.png) no-repeat;
    background-size: contain;
    color: #fff;
    text-align: center;
    right: -1px;
    bottom: -1px;
  }
  .yhcard-icon {
    .rem(width,70);
    .rem(height,70);
  }
  .yhcard-icon.gs {
    background: url("../../assets/images/withdrawals/zggs.png") no-repeat;
    background-size: 100% 100%;
  }
  .yhcard-icon.js {
    background: url("../../assets/images/withdrawals/jsyh.png") no-repeat;
    background-size: 100% 100%;
  }
  .yhcard-icon.shpf {
    background: url("../../assets/images/withdrawals/shpf.png") no-repeat;
    background-size: 100% 100%;
  }
  .yhcard-icon.zs {
    background: url("../../assets/images/withdrawals/zsyh.png") no-repeat;
    background-size: 100% 100%;
  }
  .font-15 {
    font-size: 15px;
  }
  .color-gray {
    color: #445779;
    font-size: .35rem;
    &.goldenText{
      color: #CECECE;
    }
  }
  .right-icon {
    .rem(width,14);
    .rem(height,20);
    background: url("../../assets/images/withdrawals/tianjaiyinhangka_jiantou.png")
      no-repeat;
    background-size: 100% 100%;
    margin-right: 3px;
  }
}
  &.tx-box-golden{
    .tjyhk-box{
      background: #464B53;
      border: 1px solid #71819D;
      color: #CECECE;
    }
    .txcard-box{
      background: #464B53;
      border: 1px solid #71819D;
      color: #CECECE;
    }
  }
}
.submit-btn{
  background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    color: #fff;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 80%;
    margin: 2rem auto 3rem;
    border-radius: 1rem;
    font-size: 0.4rem;
}

.yilian {
  width: 0.9rem !important;
  /*height: 1rem;*/
}
.tixian-box{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1002;
  .tixian{
    background: #fff;
    .rem(width,710);
    .rem(height,520);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 4.5rem;
    border-radius: 5px;
    text-align: center;
    font-size: 0.38rem;
    img{
      .rem(width,208);
      .rem(margin-top,38);
      .rem(margin-bottom,38);
      // margin-left: 36%;
    }
    >div{
      padding: 0 0.2rem;
    }
    span{
      display: block;
      border-radius: 100px;
      &:nth-child(1){
        border: 1px solid #6A86B9;
        color:#6A86B9;
      }
      &:nth-last-child(1){
        color:#fff;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      }
      .rem(width,320);
      .rem(height,96);
      .rem(line-height,96);
      
    }
    p{
      color:#445779;
      // font-size: 0.34rem;

      .rem(margin-bottom,54);
    }

  }
}
.widthSuccess{
  .success-box{
    width: 90%;
    padding: 0 0 .5rem 0;
  }
  .tip-box{
    text-align: center;
    color: #445779;
    font-size: .48rem;
    padding: .3rem 0;
    border-bottom: 1px solid #C4C4C4;
  }
  .success-tip{
    padding: .3rem 0 0 0;
    img{
      vertical-align: middle;
      width: 0.8rem;
      height: 0.8rem; 
    }
  }
  .success-mess{
    a{
      color: #007CFF;
    }
  }
  .tx-money{
    padding: .3rem 0;
    span{
      color: #E4A861;
    }
  }
  .close-btn{
    background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    border-radius: 66px;
    margin: .4rem auto 0;
    width: 75%;
    color: #fff;
    line-height: 1.2rem;
    font-size: .38rem;

  }
  .success-box-golden{
    border: 1px solid #746550;
    background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
    .tip-box{
      color: #E3CF95;
      border-color:#746550 ;
    }
    .success-tip{
      color: #AB9B62;
    }
    .tx-money{
      color: #cecece;
    }
    .success-mess{
      color: #928151;
    }
  }

}

.layer-bg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 100001;
  min-width: 320px;
  max-width: 750px;
}
.layer-main{
    width: 90%;
    height: 5.5rem;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    &.layer-main-golden{
      background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
      p{
        color:#cecece;
      }
    }
      .icon{
      width: 1.8rem;
      margin-top: 0.3rem;
    }
    .close{
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      bottom: -70px;
      left: 50%;
      transform: translate(-50%, 0);
      margin: 30px auto;
    }
    p{
      font-size: 0.36rem;
      color: #71819D;
      margin: 0.5rem auto;
    }
    button{
      width: 70%;
      height: 1.2rem;
      color: #fff;
      border: none;
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      border-radius: 66px;
      font-size: .38rem;
    }
}
</style>
