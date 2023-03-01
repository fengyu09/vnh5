<template>
  <div class="virtualTopUp" >
     <header class="home-header clearfix">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>{{$route.meta.title}}</span>
    </header>
    <div v-if="!bodyHtml" class="vtu-content">
        <p style="color:#999">虚拟币种类：</p>
        <ul class="clearfix species">
            <li class="fl clearfix">
               <img class="bz-icon fl" src="../../assets/images/withdrawals/xuanzhong (2).png" alt=""><span class="fl">USDT</span> 
            </li>
        </ul>
        <p style="color:#999">虚拟币协议：</p>
        <ul class="pact clearfix">
            <li class="fl" :key="index" @click="changePT(v,index)" :class="PTIndex == index ?'active':''" v-for="(v,index) in usdtHL.protocol">{{v}}</li>
        </ul>
        <p style="color:#666">存款金额</p>
        <div class="money-input">
            ₫k<input type="text" v-model="xnAmount">
        </div>
        <div class="refer">
            <p class="clearfix">
                <span class="fl">参考汇率：1USDT≈{{usdtHL.cz_exchange_rate}}CNY</span>
                <span class="fr">预计支付：{{((xnAmount-0)/usdtHL.cz_exchange_rate).toFixed(2)}}USDT</span>
            </p>
            <p>请以实时支付汇率为准</p>
            <p>到账金额为提交订单时的RMB金额</p>
        </div>
        <div class="bank-bth" @click="onConfirm()">立即存款</div>
        <span class="kf-enter">如需帮助，请<i style="color:#FF5251" @click="goOnline()">liên hệ với dịch vụ khách hàng</i></span>
    </div>
    <div v-if="bodyHtml" v-html="bodyHtml"></div>
    


  </div>
</template>

<script>
import {
//  Checker,
//  CheckerItem,
//  Divider,
//  XDialog,
//  XTable,
  Confirm} from 'vux'
import myScroll from '../../components/myScroll.vue'
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "virtualTopUp",
  components:{
    Confirm,
    myScroll},
  data:function(){
    return{
      customer:'',
      czlist:[],
      usdtHL:{},
      xnAmount:'',
      xnProtocl:'',
      PTIndex:0,
      bodyHtml:''
    }
  },
  watch:{
    xnAmount: function(n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          // this.xnAmount = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
           if(n.charAt(n.length-1).indexOf('.')>-1&&o.indexOf('.')>-1){
            // if(n.charAt(n.length-1)=='.'){
               return this.xnAmount=n.slice(0,n.length-1);
            // }
          }
          this.xnAmount = n.replace(/[^\d.]/g,'').replace(/\.{2,}/g,".").replace(/^[0,.]{1,}/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
          //  console.log(this.xnAmount)
          if(i>parseInt(this.usdtHL.high_money)){
            this.xnAmount = this.xnAmount.substring(0,this.usdtHL.high_money.length);
            this.$vux.toast.text("Số tiền nạp là("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
          }
        });
      }
    },
    bodyHtml:function () {
        this.$nextTick(() => {
            // location.href = document.actform[0].getAttribute('form')
            document.getElementById('actform').submit();
            // document.actform.submit();
        });
    }
  },
  computed:{
    ...mapState(['userinfo','webInitData'])
  },
  created() {
     this.init();
  },
  mounted() {


  },

  methods: {
    ...mapMutations(["SETSAFEPWD"]),
    init(){
      try {
        this.customer = JSON.parse(this.webInitData).customer;
      } catch (error) {
        
      }
       this.getList();
    },
    alertLL(url,title){
        android.show(url,title)
    },
    submitRecharge(){
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (!this.$store.state.codeToken){
          this.$popup({
            title: "我是标题",
            content: "我是内容",
            btnText: "我是按钮",
            click: () => {
                this.isLogin = false;
            }
        });
      }else{
        if(this.xnAmount<parseInt(this.usdtHL.low_money)||this.xnAmount>parseInt(this.usdtHL.high_money)){
           this.$vux.toast.hide();
           this.$vux.toast.text("Số tiền nạp là("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
        }else{
           let d = this.globalPpproach.checkIsEncrypt({
              user_id:this.$store.state.userinfo.user_id,
                amount:this.xnAmount,
                channels_id:this.usdtHL.id,
                currency_type:this.usdtHL.currency_type,
                protocl:this.xnProtocl
           })
            this.$http.post(this.versionLive2+'Recharge/thirdCreateOrder',d).then(res=>{
                if(res && res.data.code == 1){
                    // this.bodyHtml = res.data.data.form;
                    // console.log(this.bodyHtml);
                    let url = res.data.data.url;
                    if(window.webkit){
                        if(res.data.data.type==2){
                            // console.log(1111);
                            localStorage.setItem('bodyHtml',res.data.data.form)
                            this.bodyHtml=res.data.data.form;
                            // this.$router.push('/rechargeIng');
                        }else{
                          //  console.log(444);
                            window.webkit.messageHandlers.needNav.postMessage({
                                url:url,
                                name:this.usdtHL.channels_type,
                                backUrl:window.location.href
                            });
                        }
                    }else if(window.android){
                        if(res.data.data.type==2){
                            // console.log(2222);
                            localStorage.setItem('bodyHtml',res.data.data.form);
                            this.bodyHtml=res.data.data.form;
                        }else{
                            this.alertLL(res.data.data.url,this.usdtHL.channels_type);
                            // console.log(333);
                        }
                    }else{
                        if(res.data.data.type==2){
                          // console.log(555);
                            localStorage.setItem('bodyHtml',res.data.data.form)
                            this.bodyHtml=res.data.data.form;
                        }else{
                            window.location.href = res.data.data.url;
                        }


                    }
                }
            //   this.bodyHtml =
            })
        }
      }
    },
    onConfirm(){
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (!this.$store.state.codeToken){
          this.$popup({
            title: "我是标题",
            content: "我是内容",
            btnText: "我是按钮",
            click: () => {
                this.isLogin = false;
            }
        });
      }else{
        if(!this.xnAmount){
          this.$vux.toast.hide();
          this.$vux.toast.text("充值金额不得为空",'top');
        }else if(this.xnAmount<parseInt(this.usdtHL.low_money)||this.xnAmount>parseInt(this.usdtHL.high_money)){
          this.$vux.toast.hide();
          this.$vux.toast.text("Số tiền nạp là("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
        }else{
          let url = this.usdtHL.apiroute;
          if(this.xnAmount.charAt(this.xnAmount.length-1)=='.'){
            this.xnAmount=this.xnAmount.substring(0,this.xnAmount.length-1);
          }
          let data ={
            user_id:this.$store.state.userinfo.user_id,
            amount:this.xnAmount,
            channels_id:this.usdtHL.id,
            currency_type:this.usdtHL.currency_type,
            protocl:this.xnProtocl,
            returnurl:window.location.href
          };
          this.$vux.loading.show();
          let d = this.globalPpproach.checkIsEncrypt(data)
        this.$http.post(this.versionLive2+'Recharge/thirdCreateOrder',d).then(res=>{
          this.$vux.loading.hide();
          if(res&& res.data.code==1){
            this.xnAmount = '';
            let url = '';
            if(this.usdtHL.id==3 || this.usdtHL.id==6){
              url = res.data.data.url+"?isOpen=123"
            }else{
              url = res.data.data.url
            }
            if(window.webkit){
                if(res.data.data.type==2){
                    localStorage.setItem('bodyHtml',res.data.data.form)
                    this.bodyHtml=res.data.data.form;
                }else{
                    window.webkit.messageHandlers.needNav.postMessage({
                        url:url,
                        name:this.usdtHL.channels_type,
                        backUrl:window.location.href
                    });
                }
            }else if(window.android){
                if(res.data.data.type==2){
                    localStorage.setItem('bodyHtml',res.data.data.form);
                    this.bodyHtml=res.data.data.form;
                }else{
                    this.alertLL(res.data.data.url,this.usdtHL.channels_type);
                }
            }else{
                if(res.data.data.type==2){
                    localStorage.setItem('bodyHtml',res.data.data.form)
                    this.bodyHtml=res.data.data.form;
                    // this.$router.push('/rechargeIng');
                }else{
                  window.location.href = res.data.data.url;
                }


            }
          }else if(res){
              this.$vux.toast.text(res.data.msg, 'middle')
          }
        }).catch(res=>{
          this.$vux.loading.hide();
        })
        // this.showConfirm=false
        }
      }
    },
    changePT(v,index){
        this.xnProtocl = v;
        this.PTIndex = index;
    },
    getList(){
      this.$http.get("/api/v2/Recharge/getList").then(res => {
        this.$vux.loading.hide();
        if(res && res.data.code==1){
          this.czlist=res.data.data || [];
          this.usdtHL = this.czlist.find(res=>{
            return res.pay_type == 'usdtcz'
          });
          this.xnProtocl = this.usdtHL.protocol[0];
          // console.log(this.usdtHL)
        }else{
          this.$vux.toast.text(res.data.msg, 'middle');
        }
      });
    },
    goOnline(){
        // if (window.webkit) {
        //     window.webkit.messageHandlers.needNav.postMessage({
        //     url: this.customer,
        //     name: "在线客服",
        //     backUrl: window.location.href
        //     });
        //     //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
        // } else if (window.android) {
        //     this.alertLL(this.customer, "在线客服");
        // } else {
        //     window.location.href = this.customer;
        // }
         window.open(this.customer) ;
    },  
    goBack(){
     if(this.$route.params.backUrl){
       this.$router.push(this.$route.params.backUrl)
        //  console.log(90);
     }else{
        // this.$router.push(this.backUrl)
        //  console.log(80);
         this.$router.push('/member');
     }
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
        background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }
}
.virtualTopUp{
    .vtu-content{
        padding: 0 0.2rem;
        // p{
        //     color:#999;
        // }
        .species{
            padding:0.35rem 0;
            li{
                .rem(line-height,55);
                color:#666;
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
                color: #666;
                &.active{
                    background: url('../../assets/images/withdrawals/xuanzhong (1).png')no-repeat;
                    border: none!important;
                    background-size: contain;
                    color: #445779;
                }
            }
        }
        .money-input{
          .rem(font-size,26);
            input{
                border: none!important;
                border-bottom: 1px solid #eee!important;
                .rem(font-size,26);
                // font-size:0.32rem;
                .rem(height,100);
                .rem(line-height,100);
                width: 80%;
                margin-left: 0.8rem;
                
            }
        }
        .refer{
            color:#6E6E6E;
            margin: 0.2rem 0 0.5rem 0;
            p{
              .rem(line-height,40);
            }
            span{
                display: block;
            }
        }
        .bank-bth{
            width: 100%;
            .rem(height,88);
            .rem(line-height,88);
            text-align: center;
            color:#fff;
            background: #FF5251;
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

</style>
