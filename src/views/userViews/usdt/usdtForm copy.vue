<template>
  <div class="virtualTopUp" >
     <header class="home-header clearfix">
        <div @click="goBack" class="back-icon"></div>
        <span>{{$route.meta.title}}</span>
    </header>
    <myScroll :top='1.2' :bottom='0'>
        <div class="vtu-content">
            <p class="title">Các loại tiền ảo：</p>
            <ul class="clearfix species">
                <li class="fl clearfix">
                <img class="bz-icon fl" src="../../../assets/images/withdrawals/xuanzhong (2).png" alt=""><span class="fl">USDT</span> 
                </li>
            </ul>
            <p class="title">Định dạng tiền ảo:</p>
            <ul class="pact clearfix">
                <li class="fl" @click="changePT(v,index)" :key="index" :class="xnProtocl == v ?'active':''" v-for="(v,index) in usdtHL.protocol">{{v}}</li>
            </ul>
            <div class="input-box">
                <p class="title">Địa chỉ chuyển Token:</p>
                <div class="other-input">
                    <input type="text" v-model="czDz" placeholder="Vui lòng nhập địa chỉ Token" @blur='changeAdress'>
                    <i class="cy-adr" v-if="usdtList.length" @click="$router.push('/addUsdt')">Địa chỉ thường dùng</i>
                    <i class="cy-adr red-color" v-if="!usdtList.length" @click="addAdress">Thêm địa chỉ</i>
                </div>
            </div>
           
            <div class="input-box">
                <p class="title">ID Giao dịch chuyển tiền (Số đơn)</p>
                <div class="other-input">
                    <input type="text" v-model="hkID" placeholder="Vui lòng nhập số đơn ID">
                </div>
            </div>
            <div class="input-box">
                <p class="title">Thời gian chuyển tiền</p>
                <div class="other-input">
                    <input type="text" v-model="hkTime" placeholder="Vui lòng nhập thời gian chuyển tiền">
                    <datetime style="height: 1rem;position: absolute;width: 100%;top: 0;left:0" v-model="timeValue"  @on-confirm="getCzTime()" format="YYYY/MM/DD HH:mm" :start-date="startDate"  confirm-text="Xác nhận" cancel-text="Hủy"></datetime>
                </div>
            </div>
             <div class="input-box">
                <p class="title">Số lượng chuyển USDT</p>
                <div class="money-input other-input">
                    USDT:<input type="text" v-model="xnAmount" placeholder="Vui lòng nhập số lượng USDT">
                </div>
            </div>
            <div class="refer">
                <p class="clearfix">
                    <span class="fl">Tham khảo tỉ giá hối đoái:<i>1USDT≈{{usdtHL.cz_exchange_rate}}{{$t('moneyDw')}}</i></span>
                    <!-- <span class="fr">预计支付：<i>{{((xnAmount-0)/usdtHL.cz_exchange_rate).toFixed(2)}}USDT</i></span> -->
                    <span class="fl">Dự kiến hoàn thành : <i>{{((xnAmount-0)*usdtHL.cz_exchange_rate).toFixed(2)}}{{$t('moneyDw')}}</i></span>
                </p>
                <p class="red-color">Vui lòng lấy tỷ giá hối đoái thanh toán theo thời gian thực làm tiêu chuẩn, dự kiến hoàn thành không nhỏ hơn {{usdtHL.low_money}} usdt</p> 
                <p>Số tiền nhận được là {{$t('moneyDw')}} khi lệnh được gửi</p>
                
            </div>
            <div class="kf-code" v-for="(v,index) in codeList" :key="index" v-show='xnProtocl==v.protocol'>
                <p> Vui lòng dùng ví USDT quét mã QR phía dưới để hoàn tất thanh toán</p>
                 <img v-lazy="v.code_image" alt="">
                 <p class="over-text usdt-adress">{{v.address}}</p>
                 <div class="copy-adress copy-link" data-clipboard-action="copy" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]" :data-clipboard-text="v.address" @click="copyLink">Sao chép địa chỉ</div>
            </div>
            <div class="bank-bth" @click="onConfirm()" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]">Đã hoàn tất nạp tiền</div>
            <!-- <span class="kf-enter">如需帮助，请<i style="color:#FF5251" @click="goOnline()">liên hệ với dịch vụ khách hàng</i></span> -->
            <span class="kf-enter"><i style="color:#FF5251" @click="goOnline()">Liên hệ với dịch vụ khách hàng</i></span>
        </div>
    </myScroll>    
    

  </div>
</template>

<script>
 import { Datetime  } from 'vux';
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "usdtForm",
  data:function(){
    return{
      customer:'',
      czlist:[],
      usdtHL:{},
      xnAmount:'',//汇款jin'e
      czDz:'',//汇款地址
      hkTime:'',//汇款时间
      timeValue:'',
      startDate:'',//
      hkID:'',//订单号
      xnProtocl:'',//协议名称
    //   PTIndex:0,
      codeList:[],//汇款二维码
      fName:''
    }
  },
  components:{
        Datetime,
    },
  watch:{
    xnAmount: function(n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
        //   this.xnAmount = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");

         if(n.charAt(n.length-1).indexOf('.')>-1&&v.indexOf('.')>-1){
            return this.xnAmount=n.slice(0,n.length-1);
        }
        this.xnAmount = n.replace(/[^\d.]/g,'').replace(/\.{2,}/g,".").replace(/^[0,.]{1,}/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

          if(i>parseInt(this.usdtHL.high_money)){
            this.xnAmount = this.xnAmount.substring(0,this.usdtHL.high_money.length);
            this.$vux.toast.text("Số tiền nạp là("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
          }
        });
      }
    },


  },
  computed:{
    ...mapState(['userinfo','webInitData','usdtList','czTypeArr',"skin"])
  },
  created() {
     this.init();
  },
  mounted() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      m = m < 10 ? "0" + m : m; //月小于10，加0
      d = d < 10 ? "0" + d : d; //day小于10，加0
      this.startDate= y-1 + "/" + m + "/" + d;
  },
  beforeRouteEnter(to, from, next) {
   next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
    //   console.log(to.name,222)
    //   console.log(from.name,222)
      vm.fName = from.name

    })
  },
  methods: {
    ...mapMutations(['SETUSDTADRESS']),
    async getCodeList(){
        let res = await this.$http.get("/api/v2/Recharge/get_usdt_list");
        this.codeList = res.data.data || [];
    },
    getCzTime(){
        this.hkTime= this.timeValue;
    },
    changeAdress(){
        this.SETUSDTADRESS(this.czDz)
    },
    addAdress(){
        this.$inputBox({no:this.czDz});
    },
    async postUsdtRg(){
        // console.log(this.usdtHL)
        this.$vux.loading.show({text:'Đang gửi...'});
        // let timestamp1 = (Date.parse(this.hkTime))/1000;
         let timestamp1 = new Date(this.hkTime).getTime()/1000;
          let d = this.globalPpproach.checkIsEncrypt({
            protocol:this.xnProtocl,
            address:this.czDz,
            trade_order:this.hkID,
            amount:this.xnAmount,
            pay_time:timestamp1
        })
        let res = await this.$http.post("/api/v2/Recharge/currency_recharge",d)
        this.$vux.loading.hide();
        if(res.data.code==1){
            this.czDz = '';
            this.hkID = '';
            this.xnAmount = '';
            this.timestamp1 = '';
            this.hkTime = '';
        }

         this.$vux.alert.show({
            title: 'Nhắc nhở',
            content: res.data.msg,
            buttonText:'Đã hiểu',
        })
    },
    init(){
      try {
        this.customer = JSON.parse(this.webInitData).customer;
      } catch (error) {
          
      }
    //   console.log(this.czTypeArr)
        if(!this.czTypeArr.length){
            this.getList();
        }else{
             this.usdtHL = this.czTypeArr.find(res=>{
                return res.pay_type == 'vcsdcz'
            });
            this.xnProtocl = this.usdtHL.protocol[0];
            console.log(this.xnProtocl)
            this.getCodeList();
        }
        if(this.$store.state.sdSelectAdr) this.czDz = this.$store.state.sdSelectAdr;
        if(this.$store.state.sdSelectType) this.xnProtocl = this.$store.state.sdSelectType;
       
       if(Object.prototype.toString.call(this.usdtList) === '[object Array]'&&!this.usdtList.length){
           this.$store.dispatch('getUsdtAdressList');
       }
    },
    onConfirm(){
      if (!this.$store.state.codeToken){
          this.$popup();
      }else{
          //非空
        if(!this.czDz){
            this.$vux.toast.hide();
           this.$vux.toast.text("Địa chỉ Token không được để trống",'top');
        }else if(!this.hkID){
            this.$vux.toast.hide();
           this.$vux.toast.text("ID đơn không được để trống",'top');
        }else if(!this.hkTime){
            this.$vux.toast.hide();
           this.$vux.toast.text("Thời gian chuyển tiền không được để trống",'top');
        }else if(!this.xnAmount){
          this.$vux.toast.hide();
          this.$vux.toast.text("Số tiền nạp không được để trống",'top');
        }else if(this.xnAmount<parseInt(this.usdtHL.low_money)||this.xnAmount>parseInt(this.usdtHL.high_money)){
          this.$vux.toast.hide();
          this.$vux.toast.text("Số tiền nạp là("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
        }else{
         //提交数据
            this.postUsdtRg();
        }
      }
    },
    changePT(v,index){
        this.xnProtocl = v;
        this.$store.commit('SETSDTYPE',v)
        // this.PTIndex = index;
    },
    getList(){
      this.$http.get("/api/v2/Recharge/getList").then(res => {
        this.$vux.loading.hide();
        if(res && res.data.code==1){
          this.czlist=res.data.data || [];
          this.usdtHL = this.czlist.find(res=>{
            return res.pay_type == 'vcsdcz'
          });
          this.xnProtocl = this.usdtHL.protocol[0];
          this.$store.commit('SETCZTYPE',res.data.data);
          this.getCodeList();
        }else{
          this.$vux.toast.text(res.data.msg, 'middle');
        }
      });
    },
    goOnline(){
         window.open(this.customer);
    },  
    goBack(){
        // this.$router.go(-1);
        // console.log(99999,this.fName)
        // if(this.fName=='addUsdt'){
        //     this.$router.push('/withdrawalTopUp/1');
        // }else{
        //     this.$router.go(-1);
        // }
         this.$router.push('/recharge');
    
   },
    copyLink() {
        let _this = this;
        let clipboard = new this.clipboard(".copy-link");
        clipboard.on('success', function () {
            _this.$vux.toast.show({
                text: "Sao chép thành công",
                position: "middle"
            });
        });
        clipboard.on('error', function () {
            _this.$vux.toast.text(' Sao chép không thành công, vui lòng thử lại sau');
        });
    },

  },
};
</script>

<style  lang="less">
.rem(@name,@px){
  @{name}:unit(@px/75,rem)
}
.home-header {
    .rem(font-size,32);
    font-weight: 500;
    line-height: 1.2rem;
    // color:#fff;
    // position: fixed;
    top:0;
    left: 0;
    width: 100%;
    z-index: 111111;
    background: #fff;
    font-weight: bold;
    .back-icon{
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        z-index: 2000001;
        left: .3rem;
        background: url("../../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }
}
.virtualTopUp{
    .vtu-content{
        padding: 0 0.2rem;
        // p{
        //     color:#999;
        // }
        .title{
            font-weight: bold !important;
            font-size: .38rem;
        }
        .input-box{
             border-bottom: 1px solid #eee!important;
             margin-bottom: .2rem;
            p{
                // color: #445779;
                font-weight: 500;
            }
        }
        .species{
            padding:0.35rem 0;
            li{
                .rem(line-height,55);
                // color:#666;
                .rem( margin-right,20);
                .bz-icon{
                    display:block;
                    .rem(width,55);
                    .rem(height,55);
                }
                span{
                    display: block;
                    .rem( margin-left,20);
                }

            }
        }
        .pact{
            padding:0.25rem 0;
            li{ 
                .rem(width,180);
                .rem(height,69);
                .rem(line-height,69);
                .rem( margin-right,30);
                text-align: center;
                background: #fff;
                border-radius: 5px;
                border: 1px solid #999;
                color: #6A86B9;
                &.active{
                    background: url('../../../assets/images/withdrawals/ss.png')no-repeat;
                    border: none!important;
                    background-size: contain;
                    color: #6A86B9;
                }
            }
        }
        .other-input{
             .rem(font-size,26);
             position: relative;
            input{
                border: none!important;
                .rem(font-size,26);
                // font-size:0.32rem;
                .rem(height,80);
                .rem(line-height,80);
                width: 100%;
                
            }
            .cy-adr{
                position: absolute;
                right: .3rem;
                color: #4BA1F9;
                top: 0.35rem;
                &.red-color{
                    color: #FF5251;
                }
            }
        }
        .money-input{
            input{
                width: 80%;
                margin-left: 0.8rem;
                
            }
        }
        .refer{
            // color:#6E6E6E;
            margin: 0.2rem 0 0.5rem 0;
            p{
              .rem(line-height,40);
            }
            .red-color{
                color: #FF5251;
            }
            span{
                display: block;
                i{
                    color: #FF5251;
                }
            }
        }
        .kf-code{
            text-align: center;
            background: #fff;
            width: 72%;
            border-radius: 6px;
            margin: 0 auto 1rem;
            box-shadow: 0px 0px 15px #eee;
            padding: .6rem .3rem;
            border:1px solid #eee;
            img{
                .rem(width,300);
                .rem(height,300);
                margin: .5rem auto;
                display: block;
            }
            p{
                font-weight: bold;
                color: #FF5251;
            }
            .usdt-adress{
                color: #445779;
                width: 100%;
                display: inline-block;
            }
            .copy-adress{
                color: #fff;
                width: 60%;
                margin: 0 auto;
                border-radius: 20px;
                // background: #FF5251;
                background: linear-gradient(90deg, #007CFF 0%, #4BA1FF 100%);

                text-align: center;
                .rem(height,80);
                .rem(line-height,80);
                .rem(font-size,30);
                font-weight: 500;
                margin-top: .5rem;
            }
        }
        .bank-bth{
            width: 100%;
            .rem(height,88);
            .rem(line-height,88);
            text-align: center;
            color:#fff;
            // background: #FF5251;
            background: linear-gradient(90deg, #007CFF 0%, #4BA1FF 100%);

            border-radius: 50px;
            .rem(font-size,30);
            margin-bottom: 0.5rem;
        }
        .kf-enter{
            width: 100%;
            text-align: center;
            color:#333;
            .rem(font-size,18);
            display: block;
        }
    }

}
.wrapper .content{
    padding-bottom: 1rem;
}


</style>
