<template>
  <div class="withdrawals" :style="{ width: domWidth + 'px' }">
    <x-header
      style="background-color: #fff; z-index: 1001; color: #445779"
      title="钱包"
      :left-options="{ showBack: false }"
    >
      <span style="color: #445779">ví tiền</span>
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
      <!-- <div class="huishou">
        <span @click="hsMoney">一键回收 </span>
        <i class="ts-btn" @click="huishouShow=!huishouShow"></i>
      </div>
      <div class="huishou-point" v-show="huishouShow">
        <span>把游戏场馆的余额一键回收到中心钱包</span>
      </div> -->
    </x-header>
    <div class="surplus-box" ref="surplusbox">
      <div class="surplus-title">
        <span class="fl">Tổng tài sản</span>
        <div class="huishou fr">
          <span @click="hsMoney">Thu hồi</span>
          <!-- <i class="ts-btn" @click="huishouShow=!huishouShow"></i> -->
        </div>
        <div class="huishou-point" v-show="huishouShow">
          <span>Chuyển số dư của nhà cái trò chơi vào ví trung tâm chỉ với một cú nhấp chuột</span>
        </div>
      </div>
      <div class="over-box clearfix">
        <div
          class="zhye fl"
          :style="$store.state.isPure == 1 ? 'width:100%' : ''"
        >
          <h2><span style="font-size:16px;">₫k</span>{{ myMoney }}</h2>
          <p class="clearfix">
            <i class="money-icon" :style="$store.state.isPure == 1 ? 'left:37%' : ''"> <img style="    position: relative;
    top: -13%;" src="../../assets/images/withdrawals/icon_yue.png" alt=""></i>Số dư tài khoản <i class="yw-icon" @click="showBl"></i>
          </p>
          <!-- <div class="txcz-line"></div> -->
        </div>
        <!-- <div class="zsye fl" v-if="$store.state.isPure != 1">
          <h2><span style="font-size:16px;">₫</span>{{ zsMount }}</h2>
          <p class="clearfix"><i></i>钻石余额</p>
        </div> -->
      </div>
      <div class="txcz-change">
        <div :class="{ active: iscz }" @click="iscz = 1">
          <img
            class="icon"
            src="../../assets/images/withdrawals/cz_icon.png"
            alt=""
          />
          <span>Nạp điện</span>
          <div class="txcz-line"></div>
        </div>
        <div :class="{ active: !iscz }" @click="iscz = 0">
          <img
            class="icon"
            src="../../assets/images/withdrawals/tx_icon.png"
            alt=""
          />
          <span>trích xuất</span>
        </div>
      </div>
    </div>
    <div style="height:5rem;text-align: center;padding:.5rem 0" v-if="bodyHtmlString" v-html="bodyHtmlString" ></div>
    <div class="txcz-box" ref="txczbox" v-if="!bodyHtmlString">

     
      
      <!-- v-show="iscz" -->
      <!-- <div class="cz-list" > -->
      <!-- <div class="txcz-title" ref="txcztitle"><span>小额代充</span></div> -->
      <!-- <ul style="width: 94%"> -->
      <!-- <li class="cz-item" @click="goOnline()"> 
            <div class="zf-icon fl"><img src="../../assets/images/member/rengong.png" alt=""></div>
            <div class="cz-item-text fl"><span>人工充值</span> </div>
          </li> -->
      <!-- <li class="cz-item " @click="gotoKM()" style="    padding-top: 0.5rem;">
            <div class="zf-icon"> <img src="../../assets/images/member/km-icon.png" alt="" srcset="" ></div>
            <div class="cz-item-text" style="border-bottom:none"> <span>卡密充值</span> <span style="font-size:14px;color:#ccc"></span></div>
          </li> -->
      <!-- </ul> -->
      <!-- </div> -->
      <div class="cz-list" v-show="iscz" style="margin-top: 0rem">
        <div class="txcz-title" ref="txcztitle">
          <span>Nạp tiền vào số dư của bạn</span>
          <router-link
            style="color: #00a1fe; float: right"
            to="/rechargeTtorial"
            >Hướng dẫn nạp tiền</router-link
          >
        </div>
        <myScroll :isDown="false" :top="8" :bottom="0" :left="0">
          <!-- <ul style="width: 94%;margin-left:6%"> -->
          <ul>
            <li
              class="cz-item"
              v-for="(item, index) in czTypeArr"
              :key="index"
              @click="gotopay(item, $event)"
            >
              <div class="zf-icon">
                <img
                  v-lazy="item.icon"
                  alt=""
                  srcset=""
                  :class="[{ yilian: item.channels_type == '银联快捷' }]"
                />
              </div>
              <div class="cz-item-text">
                <span>{{ item.channels_type }}</span>
                <!-- <span v-if="item.fee>0" style="display:block;color:#ff4434;font-size:.3rem">额外赠送{{item.fee}}%</span> -->
                <span
                  style="font-size: 14px; color: #ccc"
                  v-if="item.low_money && item.high_money"
                  >({{ item.low_money }} <i v-if="item.pay_type == 'vcsdcz'">usdt</i> <i v-else>vndk</i> ~{{ item.high_money }} <i v-if="item.pay_type == 'vcsdcz'">usdt</i> <i v-else>vndk</i>)</span
                >
                <span
                  v-if="item.fee > 0"
                  style="display: block; color: #ff4434; font-size: 0.3rem"
                  >Chiết khấu {{ item.fee }}% cho mỗi giao dịch
                  <router-link
                    class="lj-icon"
                    v-show="item.pay_type == 'usdtcz'"
                    to="/Introduction"
                    > Hiểu về tiền ảo</router-link
                  ></span
                >
                
              </div>
            </li>
          </ul>
        </myScroll>
      </div>
      <div class="" v-show="!iscz">
          <div class="txcz-title" ref="txcztitle">
            <span>Chọn một kênh</span>
          </div>
        <myScroll :top="8.5" :bottom="0" :left="0" >
          <div class="tx-box">
            <!-- v-if="JSON.stringify(cardInfo)=='{}'" -->
            <!-- <myScroll  :top="6.5" :bottom="0" :left="0"> -->
            <div
              class="tjyhk-box clearfix"
              @click="addcard($event)"
              v-if="!hascard"
            >
              <div
                class="selectBank-icon fr"
                @click="seletBank(0)"
                :class="bankIndex == 0 ? 'active' : ''"
                style="margin-top: 0.2rem"
              ></div>
              <div class="add-icon fl"></div>
              <div class="fl" style="margin-left: 3%; font-size: 15px">
                <span>Thêm thẻ ngân hàng</span>
              </div>
              <!-- <div class="right-icon fr"></div> -->
            </div>
            <div
              class="txcard-box"
              @click="goCardList($event)"
              style="margin-top: 0.8rem; padding-bottom: 1.2rem"
              v-else
            >
              <div
                class="selectBank-icon fr"
                @click="seletBank(0)"
                :class="bankIndex == 0 ? 'active' : ''"
                style="margin-top: 0.38rem"
              ></div>
              <div class="fl" :class="['yhcard-icon', cardInfo.yhtype]">
                <img :src="cardInfo.bank_img" alt="" width="100%" height="100%" />
              </div>
              <div class="fl" style="line-height: 0.5rem; margin-left: 3%">
                <p class="font-15">{{ cardInfo.bank_name }}</p>
                <p class="color-gray">
                  <!-- {{ cardInfo.realname }} &nbsp;|&nbsp; 尾号{{
                    cardInfo.card_num.substring(cardInfo.card_num.length - 4)
                  }}储蓄卡 -->
                   {{ cardInfo.realname }} &nbsp;|&nbsp; Số đuôi {{
                    cardInfo.card_num.substring(cardInfo.card_num.length - 4)
                  }} Thẻ tín dụng 
                </p>
              </div>
              <div class="right-icon fr" style="margin-top: 0.45rem"></div>
            </div>
            <div class="tjyhk-box clearfix" @click="addAd($event)" v-if="!hasXN">
              <div
                class="selectBank-icon fr"
                @click="seletBank(1)"
                :class="bankIndex == 1 ? 'active' : ''"
                style="margin-top: 0.2rem"
              ></div>
              <div class="add-icon fl"></div>
              <div class="fl" style="margin-left: 3%; font-size: 15px">
                <span>Thêm địa chỉ ví tiền ảo</span>
              </div>
              <!-- <div class="right-icon fr"></div> -->
            </div>

            <div
              class="txcard-box clearfix"
              @click="goVTList($event)"
              style="margin-top: 0.8rem"
              v-else
            >
              <div
                class="selectBank-icon fr"
                @click="seletBank(1)"
                :class="bankIndex == 1 ? 'active' : ''"
                style="margin-top: 0.3rem"
              ></div>
              <div class="fl yhcard-icon">
                <img
                  src="../../assets/images/withdrawals/xnb_icon.png"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="fl" style="line-height: 0.93rem; margin-left: 3%">
                <p class="font-15">{{ vtList.name }}</p>
              </div>
              <!-- <div class="right-icon fr" style="margin-top: 0.35rem"></div> -->
            </div>
            <div class="txje">
              <span>Số tiền rút</span>
            </div>
            <div class="money-box" @focusout="inputBlur" @focusin="inputFocus">
              <span>₫k</span>
              <input type="text" v-model="txMoney" />
              <div style="float: right; margin-top: 0.36rem;color:#1486FF;" @click="allMoney">
                <span>Rút tất cả</span>
              </div>
            </div>
            <div class="refer">
              <!-- <p class="hl-tips" v-show="txMoney">(最高可提现：<i class="redColor">{{this.myMoney - 0 -(Math.ceil(((this.myMoney- 0 )*0.006)*100)/100)-2}}</i>)</p> -->
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
                <!-- <span class="fl">(实际扣除：<i class="redColor">{{(txMoney-0)+(Math.ceil((myMoney-0)*(handDate.service_fee-0)*100)/100+(handDate.hand_fee-0))}}</i>,手续费：<i class="redColor">{{(Math.ceil((myMoney-0)*(handDate.service_fee-0)*100)/100+(handDate.hand_fee-0))}}</i> )</span> -->
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
              <p style="color: #1486FF" v-show="txType != 1">
                * Đối với các lần rút tiền dưới 15,000,000 vndk, vui lòng sử dụng giao thức blockchain
              </p>

              

               <!-- <p >
                参考汇率：1USDT≈6.64vndk
              </p>
              <p >
                预计支付：
                  90USDT
              </p>
              <p >
                *低于15,000,000vndk提款请使用区块链协议TRC20
              </p> -->

              <p style="color: #1486FF">
                * Vui lòng xác minh rằng tài khoản rút tiền của bạn là chính xác, 
để không gây ra những rắc rối không đáng có
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
            <div class="fwf-tips">
              Lưu ý: Phí dịch vụ rút tiền sẽ được xác định tùy theo ngân hàng rút tiền,
tài khoản rút tiền của người dùng và tình hình cá nhân của người dùng.
Nó thay đổi tùy theo tình huống.
            </div>
            <!-- </myScroll> -->
          </div>
        </myScroll>
      </div>
    </div>
    <!--<toast v-model="showPositionValue" type="text" width="6rem" :time="1200" is-show-mask :text="paymsg" position="middle"></toast>-->
    <confirm
      v-model="showConfirm"
      @on-cancel="paymoney = ''"
      @on-confirm="onConfirm"
      title="Tiền nạp "
      :class="[{'skin-pop-pink':skin ==1},{'skin-pop-blue':skin ==2},{'skin-pop-green':skin ==3}]"
      confirmText="Xác nhận"
      cancelText='Hủy'
      :close-on-confirm="false"
      :input-attrs="{ type: 'number' }"
    >
      <!--        onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9][.]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"-->
      <input
        type="text"
        @focusout="inputBlur"
        @focusin="inputFocus"
        placeholder="Vui lòng nhập số tiền nạp "
        v-model="paymoney"
        style="
          height: 0.8rem;
          width: 6rem;
          border: none;
          background: #f6f6f6;
          border-radius: 5px;
          padding: 0.48rem 0.4rem;
          font-size: 0.35rem;
        "
      />
    </confirm>

    <!--充值弹窗-->

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
      <div class="success-box">
        <img src="../../assets/images/member/tick-icon.png" alt="" />
        <div class="tip" style="text-align:center">
          <span>Đơn rút tiền thành công</span>
          <p>Chăm sóc khách hàng khách hàng đang xử lý</p>
        </div>
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
      cardInfo: {},
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
      
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd", "diamond", "webInitData", "czTypeArr","skin"]),
  },
  created() {
    this.init();
    this.domWidth = window.innerWidth;
  },
  mounted() {
    this.$http.get("/api/user/usercardlist").then((res) => {
      if (res.data.data.length) {
        this.hascard = true;
        if (
          res.data.data.findIndex((item) => {
            return localStorage.getItem("card") == JSON.stringify(item);
          }) > -1
        ) {
          this.cardInfo = JSON.parse(localStorage.getItem("card"));
        } else {
          this.cardInfo = res.data.data[0];
        }
      }
    });

    this.iscz = parseInt(this.$route.params.type);
    this.$http
      .get("/api/v2/Recharge/get_vrwallet_list")
      .then((res) => {
        if (res.data.data.length) {
          this.hasXN = true;
          if (
            res.data.data.findIndex((item) => {
              return localStorage.getItem("vtList") == JSON.stringify(item);
            }) > -1
          ) {
            this.vtList = JSON.parse(localStorage.getItem("vtList"));
          } else {
            this.vtList = res.data.data[0];
          }
          // console.log(this.vtList);
        }
      });

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

    bodyHtmlString: function () {
      this.$nextTick(() => {
        document.getElementById("actform").submit();
      });
    },
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
    ...mapMutations(["SETSAFEPWD"]),
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
      // if (window.webkit) {
      //   window.webkit.messageHandlers.needNav.postMessage({
      //     url: JSON.parse(this.webInitData).customer,
      //     name: "在线客服",
      //     backUrl: window.location.href
      //   });
      //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
      // } else if (window.android) {
      //   this.alertLL(JSON.parse(this.webInitData).customer, "在线客服");
      // } else {
      //   window.location.href = JSON.parse(this.webInitData).customer;
      // }
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
      // this.getList();
      if (
        Object.prototype.toString.call(this.czTypeArr) === "[object Array]" &&
        !this.czTypeArr.length
      ) {
        this.$vux.loading.show({ text: "Đang nhận..." });
        // this.$store.dispatch('getCzTypeList');
        this.getList();
      } else {
        // this.usdtHL = this.czTypeArr.find((res) => {
        //   return res.pay_type == "usdtcz";
        // });
      }
      this.getMoneyLimit();
      this.checkPwd();
      this.getFee();
      this.getHh();
    },
    async getHh(){
      let res = await this.$http.get(this.versionLive2+'Recharge/getVirtualCurrencyList');
       this.usdtHL = res.data.data.find((res) => {
            return res.type == "USDT";
          });
          // console.log(777,this.usdtHL)
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
            //            this.$router.push('/Notescontact')
            this.goOnline();
          },
        });
      }
    },
    //提现
    submitMoney() {
      this.$vux.loading.show({ text: "Đang nhận..." });
      this.$http
        .post(this.versionLive2 + "withdraws/UserDeposit/", {
          user_id: parseInt(this.userinfo.user_id),
          user_putforwoad: this.txMoney,
          putforwoad_card: this.cardInfo.card_num,
          card_name: this.cardInfo.realname,
        })
        .then((res) => {
          this.$vux.loading.hide();
          if (res && res.data.code == 1) {
            //提现成功
            this.isSuccess = true;
            //更新余额
            this.$http.get("/api2/index/balance").then((res) => {
              if (res && res.data.code == 1) {
                this.myMoney = res.data.data.balance;
              } else {
                this.myMoney = "Đang nhận...";
              }
            });
            setTimeout(() => {
              this.isSuccess = false;
              this.txMoney = "";
            }, 2000);
          } else if (res) {
            //提现失败
            this.$vux.toast.text(res.data.msg, "middle");
          }
          //        console.log(res)
        });
    },
    //提现
    newSubmitMoney() {
      this.$vux.loading.show({ text: "Đang nhận..." });
      // 服务费
      let _drawMoney = this.txMoney * 0.006 + 2;
      // console.log(this.txType)
      let withdrawOBJ = {
        account:
          this.txType == 1 ? this.cardInfo.card_num : this.vtList.address,
        amount: this.txMoney,
        pass: this.payPwd,
        type: this.txType,
        is_all: this.isAllType,
      };
      // console.log(withdrawOBJ);
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
            setTimeout(() => {
              this.isSuccess = false;
              this.txMoney = "";
            }, 2000);
          } else if (res) {
            //提现失败
            this.$vux.toast.text(res.data.msg, "middle");
          }
          //        console.log(res)
        });

      // this.isAllType = 2 ;//恢复默认部分提现
      // this.isAll = true;
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
        // this.submitMoney();
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
    typeChange(value) {
      this.payList = this.payType[value].head.list;
    },
    listChange(value) {
      //        console.log(value)
    },
    topay() {
      try {
        let payid =
          this.payType[this.paynum].head.list[this.payListnum].pays_id;
        if (this.paymoney < this.highmoney && this.paymoney >= this.lowmoney) {
          this.$http
            .post(this.versionLive2 + "Recharge/createorder", {
              user_id: parseInt(this.userinfo.user_id),
              amount: this.paymoney,
              user_ip: sessionStorage.getItem("ip"),
            })
            .then((res) => {
              //        console.log(res)
            });
        } else {
          //       this.showPositionValue=true;
          //      this.paymsg="不在充值金额范围"
          this.$vux.toast.hide();
          this.$vux.toast.text("Không nằm trong phạm vi số tiền nạp", "middle");
        }
      } catch (error) {
        this.$vux.toast.hide();
        this.$vux.toast.text("Không có kênh thanh toán hiện tại", "middle");
        //      this.showPositionValue=true;
        //      this.paymsg="没有当前支付通道"
      }
    },
    getpayrecord() {
      this.$http
        .post("/pay/fin/orders", { user_mark: 1, page: 2 })
        .then((res) => {
          if (res.data.code == 200) {
            //        console.log(res.data.data.list)
            this.payRecord = res.data.data.list;
            this.showToast = true;
          }
        })
        .catch((err) => {
          //      console.error(err);
        });
    },
    alertLL(url, title) {
      android.show(url, title);
    },
    gotopay(i, e) {
    //  console.log(i)
      if (e.target.className.indexOf("lj-icon") > -1) {
        return;
      } else {
        if (i.pay_type == "rgcz") {
          // if (window.webkit) {
          //   window.webkit.messageHandlers.needNav.postMessage({
          //     url: i.apiroute,
          //     name: "在线客服",
          //     backUrl: window.location.href
          //   });
          //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
          // } else if (window.android) {
          //   this.alertLL(i.apiroute, "在线客服");
          // } else {
          //   window.location.href = i.apiroute
          // }
          window.location.href = i.apiroute;
          // window.open()
        } else if (i.pay_type == "yhkcz") {
          this.$router.push("/cardRecharge");
        } else if (i.pay_type == "usdtcz") {
          this.$router.push("/virtualTopUp");
        } else if (i.pay_type == "vcsdcz") {
          this.$router.push("/usdtForm");
        } else if (i.pay_type == "wxcz"){
           this.$router.push("/wechatCode");
        }else {
          this.showConfirm = true;
          this.payInfo = i;
        }
      }
    },
    gotoKM() {
      this.$router.push("/kmRecharge");
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
          (this.txMoney -
            0 +
            (Math.ceil(
              (this.myMoney - 0) * (this.handDate.service_fee - 0) * 100
            ) /
              100 +
              (this.handDate.hand_fee - 0))) *
            100
        ) / 100;

      // console.log(_drawMoney)
      // console.log(this.myMoney-0)
      if (this.safePwd == 10) {
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
          confirmText: "liên hệ với dịch vụ khách hàng",
          cancelText:'Hủy',
          onCancel: () => {},
          onConfirm: () => {
            //           this.$router.push('/Notescontact')
            this.goOnline();
          },
        });
        return;
      }
      // if(this.txMoney){
      //   this.toastType="success"
      //   this.showPositionValue=true;
      //   this.paymsg="提现成功"
      // }else{
      //   this.toastType="warn"
      //   this.showPositionValue=true;
      //   this.paymsg="提现金额不正确"
      // }
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
      // console.log(this.$route.params.backUrl);
      // this.$router.go(-1);
       if(this.fromPath=='/'||this.$route.params.backUrl){
         this.$router.go(-1)
          //  console.log(90);
       }else{
          // this.$router.push(this.backUrl)
          //  console.log(80);
           this.$router.push('/member');
       }

    },
    addcard(e) {
      // console.log(e.target);
      if (e.target.className.indexOf("selectBank-icon") > -1) {
        return;
      } else {
        this.checkPay();
      }
    },
    addAd(e) {
      if (e.target.className.indexOf("selectBank-icon") > -1) {
        return;
      } else {
        this.$router.push("/addAddress");
      }
    },
    goVTList(e) {
      if (e.target.className.indexOf("selectBank-icon") > -1) {
        return;
      } else {
        this.$router.push({ name: "VTList", params: { VTId: this.vtList.id } });
      }
    },
    goCardList(e) {
      // console.log(e.target);
      if (e.target.className.indexOf("selectBank-icon") > -1) {
        return;
      } else {
        this.$router.push({
          name: "cardList",
          params: { cardId: this.cardInfo.id },
        });
      }
    },
    seletBank(id) {
      this.bankIndex = id;
      this.txType = id - 0 + 1;
      // console.log(id);
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.$store.state.codeToken) return;
      this.zsMount = "Đang nhận...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.$store.state.userinfo.user_id
        )
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.zsMount = 0;
            } else {
              this.zsMount = parseFloat(res.data.data.diamond).toFixed(2);
            }
          }
        });
    },
    //  async hsMoney(){
    //          clearInterval(this.hsInterval)
    //         this.hsInterval= setInterval(() => {
    //             this.hsTime++
    //         if(this.hsTime==100){
    //             clearInterval(this.hsInterval)
    //             this.hsTime=0
    //         }
    //         }, 100);
    //         if(this.hsTime!=0){
    //           this.$vux.toast.text('点击过于频繁，请10秒后重试', 'middle')
    //           return
    //         }
    //         if(this.qpMoney==0&&this.agMoney==0&&this.bgMoney==0){
    //             //  this.$vux.toast.text('没有可回收账户', 'middle');
    //              return
    //         }
    //         this.$vux.loading.show({ text: "Đang nhận..." });
    //          this.$http.post("/api2/platform/transfer-in-all").then(res=>{
    //              if(res.data.code == 1){
    //             this.myMoney= ((this.myMoney-0) + (this.qpMoney-0)+(this.agMoney-0)+(this.bgMoney-0));
    //             this.qpMoney=0;
    //             this.agMoney=0;
    //             this.bgMoney=0;
    //             this.$vux.toast.text('回收成功', 'middle')
    //             }
    //             this.$vux.loading.hide()
    //         })
    //     },

    // async hsMoney() {
    //   clearInterval(this.hsInterval);
    //   this.hsInterval = setInterval(() => {
    //     this.hsTime++;
    //     if (this.hsTime == 100) {
    //       clearInterval(this.hsInterval);
    //       this.hsTime = 0;
    //     }
    //   }, 100);
    //   if (this.hsTime != 0) {
    //     this.$vux.toast.text("点击过于频繁，请10秒后重试", "middle");
    //     return;
    //   }
    //   if (
    //     this.qpMoney == 0 &&
    //     this.agMoney == 0 &&
    //     this.bgMoney == 0 &&
    //     this.sbMoney == 0 &&
    //     this.kyMoney &&
    //     this.imMoney == 0
    //   ) {
    //     //  this.$vux.toast.text('没有可回收账户', 'middle');
    //     return;
    //   }
    //   this.$vux.loading.show({ text: "Đang nhận..." });
    //   this.$http
    //     .post("/api2/platform/transfer-in-all")
    //     .then((res) => {
    //       if (res.data.code == 1) {
    //         this.zxMoney = math.format(
    //           math
    //             .chain(math.bignumber(this.zxMoney))
    //             .add(math.bignumber(this.qpMoney))
    //             .add(math.bignumber(this.agMoney))
    //             .add(math.bignumber(this.bgMoney))
    //             .add(math.bignumber(this.kyMoney))
    //             .add(math.bignumber(this.sbMoney))
    //             .add(math.bignumber(this.imMoney))
    //             .done()
    //         );
    //         this.qpMoney = 0;
    //         this.agMoney = 0;
    //         this.bgMoney = 0;
    //         this.sbMoney = 0;
    //         this.kyMoney = 0;
    //         this.imMoney = 0;
    //         this.$vux.toast.text("回收成功", "middle");
    //       } else {
    //         this.$vux.toast.text(res.data.msg, "middle");
    //       }
    //       this.$vux.loading.hide();
    //     })
    //     .catch(() => {
    //       this.$vux.loading.hide();
    //       // this.$vux.toast.text(res.data.msg, 'middle');
    //       this.$vux.toast.text("回收失败", "middle");
    //     });
    // },
          async hsMoney(){
            this.$vux.loading.show({ text: "Đang nhận..." });
            this.$http.post("/api/vendor/transferinall",{},{timeout:60000}).then(res=>{
                 if(res.data.code == 1){
                this.$vux.toast.text(res.data.msg, 'middle')
                }else if(res.data.code == 12){
                    this.$vux.toast.text(res.data.msg, 'middle')
                }else{
                  this.showSDZH = true;
                }
                this.$vux.loading.hide()
            }).catch(()=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(res.data.msg, 'middle');
            })
        },
  },
};
</script>

<style  lang="less">
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
@import "~vux/src/styles/close";
.withdrawals{
  background: #F5F7FA;
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
.surplus-box {
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #445779;
  margin-top: 0.2rem;
  .rem(padding-left,25);
  .rem(padding-right,25);
  .surplus-title{
    .rem(font-size,28);
    .rem(padding-top,20);
    .rem(padding-bottom,20);
    border-bottom: 1px solid #eee;
    .huishou {
      color: #6A86B9;
      .rem(font-size,24);
      // .ts-btn{display: inline-block;width: 0.373rem;height: 0.373rem;background: url('../../assets/images/member/ts_icon.png') no-repeat;background-size: cover;float: right;margin-top: 0.42rem;margin-left: 0.1rem;}
    }
    .huishou-point {
      line-height: 0.32rem;
      position: absolute;
      right: 0.3rem;
      top: 1rem;
      font-size: 0.32rem;
      padding: 0.1rem 0.12rem;
      background: #f1f0f6ff;
      border-radius: 0.05rem;
      color: #666666ff;
      width: 50%;
      &:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-left: 0.15rem solid transparent;
        border-right: 0.15rem solid transparent;
        border-bottom: 0.2rem solid #f1f0f6ff;
        position: absolute;
        top: -0.2rem;
        right: 0.1rem;
      }
    }
  }
  .txcz-line {
    width: 1px;
    height: 1.1rem;
    background: #eeeeee;
    position: absolute;
    right: 0;
    top: 0.3rem;
  }
  .over-box{
    border-bottom: 1px solid #eee;
    .rem(padding-top,20);
    .rem(padding-bottom,20);
    display: flex;
    justify-content: center;
    >div {
      width: 50%;
      position: relative;
      h2 {
        // font-size: 1rem;
        margin-bottom: 0.12rem;
        font-family: "number1";
        .rem(font-size,40);
      }
      p {
        position: relative;
        margin-left: 5%;
        text-align: center;
        i.money-icon {
          position: absolute;
          display: block;
          .rem(width,30);
          .rem(height,30);
          left: 8%;
          top: .05rem;

          // background: url("../../assets/images/withdrawals/icon_yue.png") no-repeat;
          // background-size: contain;
        }
        i.yw-icon{
          background: url(../../assets/images/member/ts_icon.png) no-repeat;
          width: .4rem;
          height: .4rem;
          display: inline-block;
          background-size: contain;
          vertical-align: bottom;
        }
      }
      &.zsye {
        i {
          background: url("../../assets/images/withdrawals/icon_zs.png")
            no-repeat;
          background-size: contain;
        }
      }
    }
  }
  .txcz-change {
    display: flex;
    justify-content: center;
    .rem(padding-top,20);
    > div {
      width: 50%;
      text-align: center;
      padding: 0.2rem 0 0.3rem;
      position: relative;
      .rem(font-size,28);
      color:#6A86B9;
    }
    .icon {
      display: block;
      .rem(width,60);
      margin: 0 auto 0.1rem;
    }
    .active {
      font-weight: bold;
      color:#1486FF;
    }
    .active::before {
      content: "";
      display: inline-block;
      width: 30%;
      height: 3px;
      background: #1486ff;
      position: absolute;
      bottom: 0;
      left:35%;
      border-radius: 4px;
    }
   
  }
}
.txcz-box {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  overflow: hidden;
  .rem(margin-top,30);
  .rem(padding-left,30);
  .rem(padding-right,30);
  .txcz-title {
    .rem(padding-top,40);
    .rem(padding-bottom,40);
    position: relative;
    &::before{
      content: '';
      .rem(width,6);
      .rem(height,40);
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      border-radius: 22px;
      position: absolute;
      left: 0;
      border-radius: 5px;
    }
    span{
      .rem(font-size,28);
      color: #445779;
      margin-left: 15px;
    }
  }
}
.cz-list {
  .rem(margin-top,60);
  ul {
    overflow: auto;
  }
  ul li.cz-item:nth-child(1) {
    padding-top: 0.2rem;
    .cz-item-text {
      padding-top: 0;
    }
    .zf-icon {
      margin-top: -0.4rem;
    }
  }
  .zf-icon {
    margin-top: 4px;
  }

  .cz-item {
    display: flex;
    align-items: center;
    img {
      .rem(width,50);
      .rem(height,50);
    }
    .cz-item-text {
      width: 100%;
      .rem(padding-top,38);
      .rem(padding-bottom,38);
      margin-left: 4%;
      border-bottom: 1px solid #f5f5f5;
      .rem(font-size,28);
    }
    .imgbox {
      .rem(width,50);
      .rem(height,50);
    }
  }
  .lj-icon {
    color: #00a1fe;
    float: right;
    display: block;
    margin-right: 10px;
    .rem(font-size,24);
  }
}
.tx-box {
  .tjyhk-box {
    // display: flex;align-items:center;justify-content:space-between;
    .rem(margin-top,40);
    .rem(padding-bottom,36);
    border-bottom: 1px solid #f5f5f5;
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
    border-bottom: 1px solid #f5f5f5;
    // display: flex;
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
  // display: flex;align-items:center;justify-content:space-between;
  border-bottom: 1px solid #f5f5f5;
  .rem(margin-top,72);
  .rem(padding-bottom,36);
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
    color: #afafaf;
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
</style>
