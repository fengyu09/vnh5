<template>
  <div class="virtualTopUp" :class="skin==5?'golden':''">
      <div class="head" v-if="lanCode==2">
          <div @click="goBack" class="back-icon"></div>
          Recharge
          </div>
    <myScroll :top="nowTop" :bottom='0' :bgColor="skin==5?'161C23':'fff'" >
        <div class="vtu-content">
            <div class="curr-xnProtocl-box">
                <span class="curr-xnProtocl" @click="showDetail=true">{{xnProtocl}}</span>
                <span>1 USDT ≈ {{usdtHL.cz_exchange_rate}} {{$t('moneyDw')}}</span>
            </div>

            <div class="kf-code" v-for="(v,index) in codeList" :key="index" v-show='xnProtocl==v.protocol'>
                <p> {{$t('usdtForm.text[0]')}}</p>
                 <img :src="v.code_image" alt="">
                 <div class="over-text usdt-adress">{{v.address}}
                     <span class="copy-adress copy-link" data-clipboard-action="copy" :data-clipboard-text="v.address" @click="copyLink"></span>
                 </div>
                 
            </div>

            <div class="input-box">
                <div class="other-input">
                    <input type="text" v-model="czDz" :placeholder="$t('usdtForm.text[1]')" @blur='changeAdress'>
                    <i class="cy-adr" v-if="usdtList.length" @click="$router.push('/addUsdt')">{{$t('usdtForm.text[2]')}}</i>
                    <i class="cy-adr red-color" v-if="!usdtList.length" @click="addAdress">{{$t('usdtForm.text[3]')}}</i>
                </div>
            </div>
           
            <div class="input-box">
                <div class="other-input">
                    <input type="text" v-model="hkID" :placeholder="$t('usdtForm.text[4]')">
                </div>
            </div>
            <div class="input-box">
                <div class="other-input">
                    <input type="text" v-model="hkTime" :placeholder="$t('usdtForm.text[5]')">
                    <datetime style="height: 1rem;position: absolute;width: 100%;top: 0;left:0" v-model="timeValue"  @on-confirm="getCzTime()" format="YYYY/MM/DD HH:mm" :start-date="startDate"  :confirm-text="$t('usdtForm.text[6]')" :cancel-text="$t('usdtForm.text[7]')"></datetime>
                </div>
            </div>
             <div class="input-box">
                <div class="money-input other-input">
                   <input type="text" v-model="xnAmount" :placeholder="$t('usdtForm.text[8]')">
                   <i class="cy-adr dw">USDT</i>
                </div>
            </div>
            <div class="refer">
                <p class="clearfix">
                    <span class="fl">{{$t('usdtForm.text[9]')}} <i>1USDT≈{{usdtHL.cz_exchange_rate}}{{$t('moneyDw')}}</i></span>
                    <span class="fl">{{$t('usdtForm.text[10]')}} <i>{{((xnAmount-0)*usdtHL.cz_exchange_rate)}}{{$t('moneyDw')}}</i></span>
                </p>
                <p class="redColor">*{{$t('usdtForm.text[11]')}}</p>
                
            </div>
            
            <div class="bank-bth" @click="onConfirm()" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('usdtForm.text[12]')}}</div>
           
            <span class="kf-enter"><i style="color:#FF5251" @click="goOnline()">{{$t('usdtForm.text[13]')}}</i></span>
        </div>
    </myScroll>    
    
    <!-- 底部弹窗 -->
        <div class="overlayer"  @touchmove.prevent v-show="showDetail" @click="showDetail=false"></div>
        <popup v-model="showDetail" :class="skin==5?'golden-pop-bottom':''" show-bottom-border="true" position="bottom" height="50%" should-rerender-on-show :show-mask="false">
            <div class="popup-title clearfix">
                <span class="fl">{{$t('usdtForm.text[14]')}}</span>
                <span class="cancel fr" @click="showDetail=false">{{$t('usdtForm.text[15]')}}</span>
            </div>
            <ul class="popup-style">
                <myScroll
                    ref="scrollWrapper"
                    :bottom="0"
                    :data="usdtHL.protocol"
                    :bgColor="skin==5?'2D2D2D':''"
                    :top="1.1">
                    <li :class="xnProtocl== item?'active':''" v-for="(item,index) in usdtHL.protocol" :key="index" @click="changePT(item,index)">
                       
                        {{item}}
                    </li>
                </myScroll>
            </ul>
        </popup>

  </div>
</template>

<script>
 import { Datetime  } from 'vux';
import { mapState ,mapMutations } from 'vuex'
 import { Popup } from 'vux'
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
      fName:'',
      showDetail:false,
      nowTop:this.lanCode==2?1.2:5
    }
  },
  components:{
        Datetime,
        Popup
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
            this.$vux.toast.text(this.$t('usdtForm.text[16]')+"("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
          }
        });
      }
    },


  },
  computed:{
    ...mapState(['userinfo','webInitData','usdtList','czTypeArr',"skin","lanCode"])
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

   beforeRouteEnter (to, from, next){
          next(vm => {
            // 通过 `vm` 访问组件实例,将值传入fromPath
            vm.fromPath = from.path
            // console.log('00',vm.fromPath)
          })
        },
  methods: {
    ...mapMutations(['SETUSDTADRESS']),
     goBack() {
        // console.log(this.fromPath)
        if(this.fromPath=='/'||this.$route.params.backUrl){
        this.$router.go(-1);
        }else{
            this.$router.push('/member');
        }
    },
    async getCodeList(){
        let res = await this.$http.get("/api/v2/Recharge/get_usdt_list");
        this.codeList = res.data.data || [];
        this.$http.get('/nodeapi/whstatus/?sid=2').then(res2=>{
            if(res2.data.data.iswh){
            this.$http.get('/nodeapi/usdtlist').then(res3=>{
            this.codeList=res3.data.data || []
        })
            }
        })
       

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
        this.$vux.loading.show({text:this.$t('usdtForm.text[17]')});
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
            this.$http.post('/nodeapi/recharge',{
                name:this.userinfo.username,
                money:this.xnAmount,
                protocol:this.xnProtocl,
                address:this.czDz,
                trade_order:this.hkID,
                type:'USDT'
                }).then(res1=>{})
            this.czDz = '';
            this.hkID = '';
            this.xnAmount = '';
            this.timestamp1 = '';
            this.hkTime = '';
        }

         this.$vux.alert.show({
            title: this.$t('usdtForm.text[18]'),
            className:'golden-alert',
            content: res.data.msg,
            buttonText:this.$t('usdtForm.text[19]'),
        })
    },
    init(){
      try {
        this.customer = JSON.parse(this.webInitData).customer;
      } catch (error) {
          
      }
    //   console.log(this.czTypeArr)
        if(!this.czTypeArr.length){
            // console.log(9090)
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
           this.$vux.toast.text(this.$t('usdtForm.text[20]'),'top');
        }else if(!this.hkID){
            this.$vux.toast.hide();
           this.$vux.toast.text(this.$t('usdtForm.text[21]'),'top');
        }else if(!this.hkTime){
            this.$vux.toast.hide();
           this.$vux.toast.text(this.$t('usdtForm.text[22]'),'top');
        }else if(!this.xnAmount){
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('usdtForm.text[23]'),'top');
        }else if(this.xnAmount<parseInt(this.usdtHL.low_money)||this.xnAmount>parseInt(this.usdtHL.high_money)){
          this.$vux.toast.hide();
          this.$vux.toast.text(this.$t('usdtForm.text[16]')+"("+this.usdtHL.low_money+"~"+this.usdtHL.high_money+")",'top');
        }else{
         //提交数据
            this.postUsdtRg();
        }
      }
    },
    changePT(v,index){
        this.xnProtocl = v;
        this.$store.commit('SETSDTYPE',v)
        this.showDetail = false;
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
   
    copyLink() {
        let _this = this;
        let clipboard = new this.clipboard(".copy-link");
        clipboard.on('success', function () {
            _this.$vux.toast.show({
                text: _this.$t('copySuccess'),
                position: "middle"
            });
        });
        clipboard.on('error', function () {
            _this.$vux.toast.text(_this.$t('usdtForm.text[26]'));
        });
    },

  },
};
</script>

<style  lang="less">
.rem(@name,@px){
  @{name}:unit(@px/75,rem)
}

.virtualTopUp{
    .head{
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        font-size: .4rem;
        .back-icon{
        position: fixed;
        width: 1.2rem;
        height: 1.2rem;
        z-index: 2000001;
        left: .3rem;
        background: url("../../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }
    }
    &.golden{
        .vtu-content{
            color: #CECECE;
            .kf-code{
                background: #1F252C;
                .usdt-adress{
                    background: #464B53;
                    color: #CECECE;
                    border: 1px solid #464B53 !important;
                }
            }
            .other-input .cy-adr{
                background: none;
                color: #E4A861;
                .dw{
                    color: #CECECE;
                }
            }
            .input-box{
                background: #464B53;
                color: #CECECE;
                border: 1px solid #464B53 !important;
            }
        }
    }
    .vtu-content{
        padding: 0.2rem;
        // p{
        //     color:#999;
        // }
        .curr-xnProtocl-box{
            margin-bottom: .3rem;
        }
        .curr-xnProtocl{
            border: 1px solid #eee;
            border-radius: .1rem;
            text-align: center;
            padding: .2rem .8rem .2rem .2rem;
            display: inline-block;
            position: relative;
            font-size: .32rem;
            &::after{
                content: '';
                position: absolute;
                right: .2rem;
                top: .25rem;
                width: .35rem;
                height: .3rem;
                background: url(../../../assets/images/down-xn.png) no-repeat;
                background-size: contain;
            }
        }
        .title{
            font-weight: bold !important;
            font-size: .38rem;
        }
        .input-box{
             border: 1px solid #eee!important;
             margin-bottom: .2rem;
             border-radius: .1rem;
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
                padding: 0 .2rem;
                
            }
            .cy-adr{
                position: absolute;
                right: .3rem;
                color: #4BA1F9;
                top: 0;
                background: #fff;
                height: 100%;
               .rem(line-height,80);
                &.dw{
                    color: #71819D;
                }
                &.red-color{
                    color: #FF5251;
                }
            }
        }
        .money-input{
            input{
                width: 80%;
                // margin-left: 0.8rem;
                
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
            // width: 72%;
            border-radius: 6px;
            margin: 0 auto .1rem;
            // box-shadow: 0px 0px 15px #eee;
            // padding: .6rem .3rem;
            // border:1px solid #eee;
            img{
                .rem(width,320);
                .rem(height,320);
                margin: .5rem auto;
                display: block;
            }
            p{
                // font-weight: bold;
                // color: #FF5251;
            }
            .usdt-adress{
                color: #445779;
                width: 100%;
                display: inline-block;
                border-radius: .1rem;
                border: 1px solid #eee;
                text-align: left;
                padding: 0 .2rem;
                .rem(height,80);
                .rem(line-height,80);
                position: relative;
            }
            .copy-adress{
                width: .6rem;
                height: .6rem;
                background: url(../../../assets/images/copy-icon.png) no-repeat;
                background-size: contain;
                position: absolute;
                right: .2rem;
                top: .2rem;
            
            }
        }
        .bank-bth{
            width: 80%;
            .rem(height,88);
            .rem(line-height,88);
            text-align: center;
            color:#fff;
            // background: #FF5251;
            background: linear-gradient(90deg, #007CFF 0%, #4BA1FF 100%);

            border-radius: 50px;
            .rem(font-size,30);
            margin:0 auto 0.5rem;
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


.overlayer{
     position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index: 500;
  background-color: #000;
  opacity: .5;
}
.popup-title{
    .rem(height,88);
    .rem(line-height,88);
    .rem(font-size,30);
    .rem(padding-left,30);
    color: #445779;
    background: #fff;
    .cancel{
        color: #aaa;
        float: left;
        .rem(margin-right,20);
    }
}
.popup-style{
    background: #fff;
    li{
        .rem(line-height,87);
        border-top: 1px solid #EEE;
        .rem(font-size,24);
        color: #445779;
        .rem(padding-left,30);
        .rem(padding-right,30);
        background: #fff  !important;
        position: relative;
        &.active{
            &::before{
                content: '';
                .rem(width,28);
                .rem(height,23);
                background: url(../../../assets/images/rechargeTutorial/gou.png) no-repeat ;
                background-size: 100% 100%;
                position: absolute;
                .rem(right,30);
                .rem(top,25);
            }
            
        }
    }
    
}

</style>
