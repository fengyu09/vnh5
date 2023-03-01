<template>
  <div class="withdrawals" :style="{ width: domWidth + 'px' }">
    <x-header
      style="background-color: #fff; z-index: 1001; color: #445779;border-bottom:.2rem solid #F5F7FA"
      :left-options="{ showBack: false }"
    >
      <span style="color: #445779">Rút tiền</span>
      <i class="white-back"></i>
      <div
        style="
          position: absolute;
          width: 42px;
          height: 42px;
          top: 0;
          left: 0;
          z-index: 10000001;
        "
        @click="goBack"
      ></div>
    </x-header>
    <myScroll :top="1.4" :bottom="0" :left="0" :data="playList">
      <div class="user-money">Số tiền có thể rút: {{myMoney}} vndk</div>
      <div class="tx-box">
        
        <!-- 银行卡列表 -->
        <div
          class="txcard-box clearfix"
          @click="changeCard($event,v)"
          v-for="v,index in cardList"
          :key="index"
          :class="cardInfo.card_num==v.card_num?'active':''"
        >
          <!-- 默认 -->
          <div class="default-bank" v-if="index==0">Mặc định</div>
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
          <p class="color-gray">
                {{ v.realname }} 
               <span class="fr">**** **** **** {{
                v.card_num.substring(v.card_num.length - 4)
                }} </span>
          </p>
        </div>


        <!-- 添加 -->
        <div
          class="tjyhk-box clearfix"
          @click="addcard($event)"
        >
         <span>+ Thêm thẻ ngân hàng</span>
        </div>

        <div class="txje">
          <span>Số tiền rút</span>
        </div>
        <div class="money-box" @focusout="inputBlur" @focusin="inputFocus">
          <span>₫k</span>
          <input type="text" v-model="txMoney"  />
          <div style="float: right; margin-top: 0.36rem;color:#1486FF;" @click="allMoney">
            <span>Rút tất cả</span>
          </div>
        </div>
        <div class="refer">
          <p class="hl-tips clearfix" v-show="txMoney && !isAll">
            <span class="fl"
              >(Thực tế khấu trừ：<i class="redColor">{{
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
              >, Phí thủ tục：<i class="redColor">{{
                (
                  Math.ceil(
                    (txMoney - 0) * (handDate.service_fee - 0) * 100
                  ) /
                    100 +
                  (handDate.hand_fee - 0)
                ).toFixed(2)
              }}</i>
              )</span
            >
            <span class="tips-icon fl" @click="showSXF = !showSXF">
              <img src="../../assets/images/withdrawals/hl-tips.png" alt="" />
              <ul v-show="showSXF">
                <li>
                  Phícố định： <i class="redColor">{{ handDate.hand_fee }}vndk</i>
                </li>
                <li>
                  Phí chuyển khoản:
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (txMoney - 0) * (handDate.service_fee - 0) * 100
                      ) / 100
                    }}vndk (Tỷ lệ phí{{ (handDate.service_fee - 0) * 100 }}%)</i
                  >
                </li>
                <li>
                  Tổng phí dịch vụ:
                  <i class="redColor"
                    >{{
                      (
                        Math.ceil(
                          (txMoney - 0) * (handDate.service_fee - 0) * 100
                        ) /
                          100 +
                        (handDate.hand_fee - 0)
                      ).toFixed(2)
                    }}vndk</i
                  >
                </li>
              </ul>
            </span>
          </p>
          <p class="hl-tips clearfix" v-show="txMoney && isAll">
            <span class="fl"
              >(Thực tế khấu trừ：<i class="redColor">{{
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
              >,Phí thủ tục：<i class="redColor">{{
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
                  Phícố định： <i class="redColor">{{ handDate.hand_fee }} vndk</i>
                </li>
                <li>
                  Phí chuyển khoản:
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (myMoney - 0) * (handDate.service_fee - 0) * 100
                      ) / 100
                    }}vndk (Tỷ lệ phí{{ (handDate.service_fee - 0) * 100 }}%)</i
                  >
                </li>
                <li>
                  Tổng phí dịch vụ:
                  <i class="redColor"
                    >{{
                      Math.ceil(
                        (myMoney - 0) * (handDate.service_fee - 0) * 100
                      ) /
                        100 +
                      (handDate.hand_fee - 0)
                    }} vndk</i
                  >
                </li>
              </ul>
            </span>
          </p>
          <p v-if="bankIndex == 1 && usdtHL.withdraw_rate">
            Tham khảo tỉ giá hối đoái：1USDT≈{{ usdtHL.withdraw_rate }}vndk
          </p>
          <p v-if="bankIndex == 1 && usdtHL.withdraw_rate">
            Dự kiến thanh toán：{{
              ((txMoney - 0) / usdtHL.withdraw_rate).toFixed(2)
            }}USDT
          </p>
          <!-- <p style="color: #1486FF" v-show="txType != 1">
            * Đối với các lần rút tiền dưới 15,000,000 vndk, vui lòng sử dụng giao thức blockchain
          </p> -->

          <p style="color: #FF4E46">
            * Vui lòng kiểm tra xem tài khoản của bạn có đúng không
          </p>
        </div>
        <div
          class="btn-box"
          style="margin-top: 0.3rem; margin-bottom: 0.3rem"
        >
          <x-button
            type="warn"
            style="
              border-radius: 0.6rem;
              background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
              height: 1.2rem;
            "
            :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]"
            @click.native="drawMoney"
            >Trích xuất</x-button
          >
        </div>
        <!-- <div class="fwf-tips">
          Lưu ý: Phí dịch vụ rút tiền sẽ được xác định tùy theo ngân hàng rút tiền,
tài khoản rút tiền của người dùng và tình hình cá nhân của người dùng.
Nó thay đổi tùy theo tình huống.
        </div> -->
      </div>
    </myScroll>

    
  

    <!--键盘-->
    <div class="key-box-bg" @click="isKey = false" v-if="isKey"></div>
    <div class="key-box member-key chat-key width-key" v-if="isKey">
      <div class="input-pwd">
        <div class="title">
          Vui lòng nhập mã thanh toán  <i class="remove-icon" @click="isKey = false"></i>
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
           Mật khẩu được nhập không chính xác, bạn vẫn còn ({{changeTime}}) lần nhập
        </p>
        <!--<p class="contact-tip">忘记支付密码，<router-link to="/Notescontact" class="contact">liên hệ với dịch vụ khách hàng</router-link></p>-->
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
      <div class="success-box">
        <div class="tip-box">Nhắc nhở</div>
        <div class="success-tip">
          <img src="../../assets/images/member/tick-icon.png" alt="" />
          <span>Đơn rút tiền thành công</span>
          
        </div>
        <div class="tx-money">Số tiền rút：<span>{{txMoney}} VNDK</span></div>
        <p class="success-mess">Vui lòng kiên nhẫn chờ kết quả kiểm tra của dịch vụ khách hàng, nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận <a :href="customer">CSKH trực tuyến</a></p>
        <div class="close-btn" @click="isSuccess=false" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]">Đóng</div>
        
      </div>
    </div>

    <!-- 提现失败 -->
    <div class="tixian-box" v-if="showSDZH">
      <div class="tixian">
         <img src="../../assets/images/withdrawals/tips-sb.png" alt="">
         <p>Thu hồi toàn bộ không thành công, vui lòng thực hiện thu hồi theo cách thủ công</p>
         <div class="clearfix">
           <span class="fl" @click="showSDZH = false">Hủy</span>
           <span class="fr" @click="$router.push('/wallet')">Chuyển đổi thủ công</span>
         </div>
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
      txMoney: "",
      toastType: "warn",
      backUrl: "/member",
      //      safePwd:'',
      czlist: [
        // {imgurl:require('../../assets/images/withdrawals/yinlian.png'),name:"银联快捷",type:1},
        // {imgurl:require('../../assets/images/withdrawals/yunshanfu.png'),name:"云闪付扫码",type:2},
        // {imgurl:require('../../assets/images/withdrawals/weixinzhifu.png'),name:"微信扫码",type:3},
        // {imgurl:require('../../assets/images/withdrawals/zhifubaozhifu.png'),name:"支付宝扫码",type:4},
        // {imgurl:require('../../assets/images/withdrawals/yhzz.png'),name:"银行卡转账",type:5},
        // {imgurl:require('../../assets/images/withdrawals/wangyinzaixian.png'),name:"网银在线",type:6},
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
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd", "diamond", "webInitData", "czTypeArr","skin","cardListStore"]),
  },
  created() {
    this.init();
    this.domWidth = window.innerWidth;
  },
  mounted() {
    // this.$http.get("/api/user/usercardlist").then((res) => {
    //   if (res.data.data.length) {
    //     this.hascard = true;
    //     if (
    //       res.data.data.findIndex((item) => {
    //         return localStorage.getItem("card") == JSON.stringify(item);
    //       }) > -1
    //     ) {
    //       this.cardInfo = JSON.parse(localStorage.getItem("card"));
    //     } else {
    //       this.cardInfo = res.data.data[0];
    //     }
    //   }
    // });

    // this.iscz = parseInt(this.$route.params.type);
    // this.$http
    //   .get("/api/v2/Recharge/get_vrwallet_list")
    //   .then((res) => {
    //     if (res.data.data.length) {
    //       this.hasXN = true;
    //       if (
    //         res.data.data.findIndex((item) => {
    //           return localStorage.getItem("vtList") == JSON.stringify(item);
    //         }) > -1
    //       ) {
    //         this.vtList = JSON.parse(localStorage.getItem("vtList"));
    //       } else {
    //         this.vtList = res.data.data[0];
    //       }
    //       // console.log(this.vtList);
    //     }
    //   });

    // 到时候放App全局
    document.body.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
      },
      { passive: false }
    );
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
      // let money = (this.txMoney-0)+(Math.ceil((this.myMoney-0)*(this.handDate.service_fee-0)*100)/100+(this.handDate.hand_fee-0))
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
    
      //  console.log(this.txMoney);
        // console.log(money);
      if (this.txMoney >= this.myMoney || money > this.myMoney) {
        // debugger
        this.isAll = false;
        this.isAllType = 2;
        this.$vux.toast.text("Số tiền rút không được lớn hơn số dư tài khoản", "middle");
      } else if (money == this.myMoney) {
        this.isAll = true;
        this.isAllType = 1;
      } else {
        this.isAllType = 2;
        this.isAll = false;
      }
      // console.log(this.isAllType);
      // console.log(this.isAll);
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
    ...mapMutations(["SETSAFEPWD","SETCARDLIST"]),
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
    getAgMoney() {
      this.$http.get("/api2/ag/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.agMoney = res.data.data.bl - 0;
        } else if (res && res.data.code == 16) {
          this.agMoney = 0;
        }
      });
    },
    getBgMoney() {
      this.$http.get("/api2/bg/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.bgMoney = res.data.data.bl - 0;
        } else if (res && res.data.code == 16) {
          this.bgMoney = 0;
        }
      });
    },
    getQpMoeny() {
      this.$http.get("/api2/fhchess/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.qpMoney = res.data.data.bl - 0;
        } else if (res && res.data.code == 16) {
          this.qpMoney = 0.0;
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
        return this.$vux.toast.text("Số tiền rút tối thiểu là" + this.lowmoney, "middle");
      if (this.myMoney > this.highmoney)
        return this.$vux.toast.text(
          "Số tiền rút tối đa là" + this.highmoney,
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
      // console.log(allMoney)

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
        } else if (res) {
          this.myMoney = "Đang nhận...";
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
      // this.getHh();
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
          this.$vux.confirm.show({
            title: "",
            content: "Bạn chưa đặt mật khẩu thanh toán",
            confirmText: " Cài đặt ngay",
            cancelText:'Hủy',
            onCancel: () => {},
            onConfirm: () => {
              //              this.$router.push({name:'setPayPwd'});
              this.$router.push("/setPayPwd");
            },
          });
        } else if (this.safePwd == 10) {
          this.$vux.confirm.show({
            title: "Tiền trong tài khoản của quý khách đã khóa ",
            content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
             cancelText:'Hủy',
             confirmText: "liên hệ với dịch vụ khách hàng",
            onCancel: () => {},
            onConfirm: () => {
              //              this.$router.push('/Notescontact')
              this.goOnline();
            },
          });
        }
        return;
      }
      this.$vux.loading.show({ text: "Đang xác minh..." });
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        //已经设置
        this.SETSAFEPWD(1);
        this.$router.push("/addCard");
      } else if (res && res.data.code == 2) {
        //未设置
        this.SETSAFEPWD(2);
        this.$vux.confirm.show({
          title: "Nhắc nhở",
          content: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?",
          onCancel: () => {},
           cancelText:'Hủy',
           confirmText: "Xác nhận",
          onConfirm: () => {
            this.$router.push("/setPayPwd");
          },
        });
      } else if (res && res.data.code == 10) {
        this.SETSAFEPWD(10);
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
           cancelText:'Hủy',
           confirmText: "liên hệ với dịch vụ khách hàng",
          onCancel: () => {},
          onConfirm: () => {
            this.goOnline();
          },
        });
      }
    },
    //提现
    newSubmitMoney() {
      this.$vux.loading.show({ text: "Đang nhận..." });
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
            //更新余额
            this.$http.get("/api/user/balance").then((res) => {
              if (res && res.data.code == 1) {
                this.myMoney =parseFloat(res.data.data.balance);
              } else {
                this.myMoney = "Đang nhận...";
              }
            });
            // setTimeout(() => {
            //   this.isSuccess = false;
            //   this.txMoney = "";
            // }, 2000);
          } else if (res) {
            //提现失败
            this.$vux.toast.text(res.data.msg, "middle");
          }
        });

    },
    //检查旧密码
    async checkOldPwd() {
      if (this.isBind) return;
      this.$vux.loading.show({ text: "Đang xác minh..." });
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
          this.$vux.confirm.show({
            title: "Tiền trong tài khoản của quý khách đã khóa ",
            content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
            confirmText: "liên hệ với dịch vụ khách hàng",
             cancelText:'Hủy',
            onCancel: () => {
              this.isKey = false;
              this.payPwd = "";
              this.clearActive();
            },
            onConfirm: () => {
              //              this.$router.push({name:'Notescontact'});
              this.goOnline();
            },
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
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
          confirmText: "liên hệ với dịch vụ khách hàng",
          cancelText:'Hủy',
          onCancel: () => {
            this.payPwd = "";
            this.showTip = false;
            this.clearActive();
            this.isKey = false;
          },
          onConfirm: () => {
            //            this.$router.push({name:'Notescontact'});
            this.goOnline();
          },
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



    alertLL(url, title) {
      android.show(url, title);
    },

    onConfirm() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (
        this.paymoney < parseInt(this.payInfo.low_money) ||
        this.paymoney > parseInt(this.payInfo.high_money)
      ) {
        //          this.showPositionValue=true;
        //          this.paymsg="充值金额为("+this.payInfo.low_money+"~"+this.payInfo.high_money+")"
        this.$vux.toast.hide();
        this.$vux.toast.text(
          "Số tiền nạp là(" +
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
    alertLL(url, title) {
      android.show(url, title);
    },
    goOnline() {
      // if (window.webkit) {
      //   window.webkit.messageHandlers.needNav.postMessage({
      //     url: JSON.parse(this.webInitData).customer,
      //     name: "在线客服",
      //     backUrl: window.location.href,
      //   });
      //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
      // } else if (window.android) {
      //   this.alertLL(JSON.parse(this.webInitData).customer, "在线客服");
      // } else {
        
      // }
      window.open(JSON.parse(this.webInitData).customer) ;
    },
    drawMoney() {
      // let _drawMoney = this.txMoney - 0 + (this.txMoney*0.006 + 2) ;
      let _drawMoney =
        Math.ceil(
          (this.txMoney - 0 +(Math.ceil( (this.myMoney - 0) * (this.handDate.service_fee - 0) ) +(this.handDate.hand_fee - 0))) );
      if (this.safePwd == 10) {
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
          confirmText: "liên hệ với dịch vụ khách hàng",
          cancelText:'Hủy',
          onCancel: () => {},
          onConfirm: () => {
            this.goOnline();
          },
        });
        return;
      }
      if (this.txType == 1) {
        if (JSON.stringify(this.cardInfo) == "{}") {
          //        this.showPositionValue=true;
          //        this.paymsg="请先绑定银行卡";
          this.$vux.toast.hide();
          this.$vux.toast.text("Vui lòng cài thẻ ngân hàng ", "middle");
          return;
        }
      }
      if (this.txType == 2) {
        if (JSON.stringify(this.vtList) == "{}") {
          //        this.showPositionValue=true;
          //        this.paymsg="请先绑定银行卡";
          this.$vux.toast.hide();
          this.$vux.toast.text("请先绑定USDT地址", "middle");
          return;
        }
      }

      //      this.lowmoney = res.data.data.lowmoney;
      //      this.highmoney = res.data.data.highmoney;
      if (this.txMoney < this.lowmoney - 0) {
        //        this.showPositionValue=true;
        //        this.paymsg="提现金额不能小于"+this.lowmoney;
        this.$vux.toast.hide();
        this.$vux.toast.text("Số tiền rút tối thiểu là " + this.lowmoney, "middle");
        return;
      }
      // if (this.txMoney > this.highmoney - 0) {
      //   //        console.log(this.highmoney)
      //   //        this.showPositionValue=true;
      //   //        this.paymsg="提现金额不能大于"+this.highmoney;
      //   this.$vux.toast.hide();
      //   this.$vux.toast.text("提现金额不能大于" + this.highmoney, "middle");
      //   return;
      // }
      //       if(this.txMoney-0>this.myMoney-0){
      // //        this.showPositionValue=true;
      // //        this.paymsg="Số tiền rút không được lớn hơn số dư tài khoản";
      //         this.$vux.toast.hide();
      //         this.$vux.toast.text('Số tiền rút không được lớn hơn số dư tài khoản','middle');
      //         return
      //       }
      if (_drawMoney > this.myMoney - 0) {
        this.$vux.toast.hide();
        this.$vux.toast.text("Số tiền rút không được lớn hơn số dư tài khoản", "middle");
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
      // console.log(this.fromPath)
       if(this.fromPath=='/'||this.$route.params.backUrl){
         this.$router.go(-1)
       }else{
        //  this.$router.push('/member');
        this.$router.go(-1)
       }

    },
    addcard(e) {
      // if (e.target.className.indexOf("selectBank-icon") > -1) {
      //   return;
      // } else {
      //   this.checkPay();
      // }
       if(this.safePwd==1){
        //已经设置
        this.$router.push('/addcard')
      }else if(this.safePwd==2){
         //未设置
          this.$vux.confirm.show({
            title: "Nhắc nhở",
            content: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?",
            onCancel: () => {},
            cancelText:'Hủy',
            confirmText: "Xác nhận",
            onConfirm: () => {
              this.$router.push("/setPayPwd");
            },
          });
      }else if(this.safePwd==10){
        //资金账号异常
         this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
           cancelText:'Hủy',
           confirmText: "liên hệ với dịch vụ khách hàng",
          onCancel: () => {},
          onConfirm: () => {
            this.goOnline();
          },
        });
      }
    },
    changeCard(e,v){
      this.cardInfo.card_num =v.card_num
    },
    // addAd(e) {
    //   if (e.target.className.indexOf("selectBank-icon") > -1) {
    //     return;
    //   } else {
    //     this.$router.push("/addAddress");
    //   }
    // },
    // goCardList(e) {
    //   if (e.target.className.indexOf("selectBank-icon") > -1) {
    //     return;
    //   } else {
    //     this.$router.push({
    //       name: "cardList",
    //       params: { cardId: this.cardInfo.id },
    //     });
    //   }
    // },
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
  }
  .txje {
    color: #445779;
    .rem(font-size,28);
    .rem(margin-top,40);
    .rem(margin-bottom,40);
  }
  .money-box {
    .rem(padding-bottom,20);
    border-bottom: 1px solid #eee;
    input {
      font-size: 0.7rem;
      width: 60%;
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
}
.txcard-box {
  border: 1px solid #71819D;
  padding: .1rem .5rem;
  height: 2rem;
  border-radius: .2rem;
  margin-top: .2rem;
  position: relative;
  &.active{
    border: 1px solid #E4A861
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

}
</style>
