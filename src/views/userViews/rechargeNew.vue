<template>
    <div>
       <header class="home-header clearfix"  :class="skin==5?'goldenHeader':''">
          <!-- <div @click="goBack" class="back-icon"></div> -->
          <span>{{$t('recharge.text[0]')}}</span>
      </header>
      <myScroll :bottom="1.4" :bgColor="skin==5?'161C23':'f5f7fa'" ref="listScroll">
        <div v-show="czTypeArr.length" :class="skin==5?'goldenBg':''">
          <div class="recharge-content" >
            <h5>{{$t('recharge.text[1]')}} <span style="color:red;margin-left: 20%;">(1VNDK = 1000VND)</span></h5>
            <ul class="type-list">
              <li class="type-item" :class="currType==key?'active':''" @click="currType=key" v-for="(item,key) in rechargeType" :key="key" v-if="key!='undefined'">                                
                <div>
                  <img
                    :src="
                      require('../../assets/images/withdrawals/cz_0' +  key +'.png')" alt=""/>
                  <p>{{key | filterRechargeName(lanCode)}}</p>
                </div>
              </li>
              <li class="type-item" style="padding-top: 0.2rem;" @click="$router.push('/cardRecharge?type=1')">                                
                <div>
                  <img
                    src="../../assets/images/withdrawals/unnamed 1.png" alt=""/>
                  <p style="margin-top: 0.2rem;">MO MO QR</p>
                </div>
              </li>
            </ul>
          </div> 
          <div class="recharge-content recharge-qd-content" v-if="currType!=2">
            <h5>{{$t('recharge.text[2]')}} </h5>
            <ul class="qd-list">
              <li v-for="item,index in rechargeType[currType]" :key="index" :class="currqd==item.id?'active':''" @click="changeQd(item)">
                <span>{{item.channels_type}}</span>
              </li>
            </ul>
          </div>
          <div class="recharge-content recharge-money-content" v-if="currType!=2">
            <h5 v-if="currqd>0">{{$t('recharge.text[3]')}}</h5>
            <ul class="money-list" v-for="(v,index) in rechargeType[currType]" :key="index"  v-if="currqd==v.id">
              <li v-for="(money,index1) in v.quick_list" :key="index1" @click="changeKjMoney(money)"><i v-if="v.currency_type=='VNDK'">{{$t('moneyDwSx')}}</i><i v-if="v.currency_type=='USDT'">usdt</i>{{money}}</li>
            </ul>
            <div class="input-money-box" v-if="currqd>0" :class="isError?'errorborder':''">
              <span>{{$t('moneyDwSx')}}</span><input type="tel" v-model="paymoney" ref="paymoneyNum" :placeholder="$t('recharge.text[4]')+ currTypeItem.low_money+'???'+currTypeItem.high_money+ $t('moneyDw')">
              
            </div>
            <div class="error-tx" v-if="isError">{{$t('recharge.text[4]')}} {{currTypeItem.low_money}} ??? {{currTypeItem.high_money}} {{$t('moneyDw')}}</div>
            <div v-if="isBankCode" class="select-bank-list" @click="pickershow1=true">
              <p>{{userBank}}</p>
              <i class="select-bank-icon"></i>
            </div>
            <div style="height:5rem;text-align: center;padding:.5rem 0;display:none"  v-html="bodyHtmlString" ></div>
            <div class="submit-btn" @click="onConfirm" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('recharge.text[5]')}}</div>
          </div>
        </div>
        
      </myScroll>
      <Xnb v-show="currType==2"/>
      <!-- ??????????????? -->
      <picker
        :data="selectGame1"
        :showToolbar="true"
        :maskClick="true"
          :cancelText="$t('recharge.text[6]')"
            :confirmText="$t('recharge.text[7]')"
        @confirm="pickerConfirm"
        :visible.sync="pickershow1"
      />
      <Foot />
    </div>
</template>

<script>
 import picker from "vue-pickers";
 import { mapState, mapMutations } from "vuex";
 import Xnb from './usdt/usdtForm.vue'
 import Foot from "../../components/footer.vue";
    export default {
        name: "test",
        data(){
            return{
               selectGame1:[[
              ]],
              userBank:this.$t('recharge.text[8]'),
              user_bank_id:'',
              pickershow1:false,
              rechargeType:{},
              currType:0,//????????????
              currqd:-1,//????????????
              currTypeItem:{},//???????????????????????????
              isBankCode:false,
              paymoney:'',
              bodyHtmlString:'',//???????????????
              isError:false,
              isXnb:false,
            }
        },
        filters:{
          filterRechargeName(n,lanCode){
            // recharge_method  ???????????????0????????????1?????????2?????????
            let name = n;
            if(lanCode==1){
              if(n==0){
              name="N???p th??? ng??n h??ng";
            }else if(n==1){
              name="Qu??t m?? ????? n???p ti???n";
            }else if(n==2){
              name=" N???p ti???n ???o";
            }
            }else if(lanCode==2||lanCode==5){
              if(n==0){
              name="Bank card recharge";
            }else if(n==1){
              name="Scan code recharge";
            }else if(n==2){
              name="Virtual currency";
            }
            }
            
            return name
          },
        },
        watch:{
           bodyHtmlString: function () {
            this.$nextTick(() => {
              document.getElementById("actform").submit();
            });
          },

          paymoney: function (n, v) {
            if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
              return (this.paymoney = n.slice(0, n.length - 1));
            }
            this.paymoney = n
              .replace(/[^\d.]/g, "")
              .replace(/\.{2,}/g, ".")
              .replace(/^[0,.]{1,}/g, "")
              .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");


               if (
                this.paymoney < parseInt(this.currTypeItem.low_money) ||
                this.paymoney > parseInt(this.currTypeItem.high_money)
              ) {
                this.isError = true
              } else{
                this.isError = false
              }

          },
          currType:function(n,v){
            this.userBank = this.$t('recharge.text[8]');
            this.user_bank_id = "";
            this.isBankCode = false;
            this.currqd = -1;
            this.paymoney = '';
          }
        },
       components:{
        picker,Xnb,Foot
       },
       created(){
         this.currType = this.$route.query.type?this.$route.query.type:0;
         this.init();
       },
        beforeRouteEnter (to, from, next){
          next(vm => {
            // ?????? `vm` ??????????????????,????????????fromPath
            vm.fromPath = from.path
            // console.log('00',vm.fromPath)
          })
        },
        computed: {
          ...mapState(["czTypeArr","skin","lanCode"]),
        },
        methods: {
            // ...mapMutations(["SETSAFEPWD"]),
            changeKjMoney(money){
              this.paymoney = money+''
            },
            goBack() {
              // console.log(this.fromPath)
              if(this.fromPath=='/'||this.$route.params.backUrl||this.fromPath.indexOf('/xz')>-1){
                this.$router.go(-1);
              }else{
                  this.$router.push('/member');
              }
            },
            pickerConfirm(i){
              // console.log(i)
                this.userBank = i[0].label;
                this.user_bank_id =i[0].value
            },
            changeQd(item){
              if(item.pay_type=="yhkcz"){
                this.$router.push('/cardRecharge')
              }if(item.pay_type=="vcsdcz"){
                this.$router.push('/usdtForm')
              }else{
                this.currqd=item.id;
                this.currTypeItem = item;
                this.userBank = this.$t('recharge.text[8]');
                this.user_bank_id = "";
                
               
             
                if(this.currTypeItem.bank_code==null||this.currTypeItem.bank_code=='null'||this.currTypeItem.bank_code==''){
                  this.isBankCode = false;
                  
                }else{
                   this.isBankCode = true;
                   this.getUserCardList(this.currTypeItem.bank_code.split(','))
                }
                setTimeout(()=>{
                this.$refs.listScroll.scrollBottom()
               },200)
              }
            },
            //?????????????????????
            async getUserCardList(bank){
                //let res = await this.$http.get(this.versionLive2+'/Recharge/get_vietnam_bank_list')
                let tdata = [];
                for (let i = 0; i < bank.length; i++) {
                    tdata.push({
                    label:bank[i],
                    value:bank[i]
                    })
                }
                this.selectGame1 = [tdata]
            },
            init() {
              this.getList();
            },
            getList() {
              if(this.czTypeArr.length){
                this.rechargeType = this. do_data(this.czTypeArr)
              }
              this.$http.get("/api/v2/Recharge/getList").then((res) => {
                this.$vux.loading.hide();
                if (res && res.data.code == 1) {
                  this.rechargeType = this.do_data(res.data.data);
                  // this.rechargeType = [{
                  //   apiroute: "/api/v2/Recharge/index",
                  //   bank_code: null,
                  //   channels_type: "?????????????????????",
                  //   currency_type: "USDT",
                  //   cz_exchange_rate: "24.50",
                  //   exchange_rate: 0,
                  //   fee: 0.5,
                  //   fix_money: "",
                  //   high_money: "10000.00",
                  //   icon: "http://54.255.11.229:18305//uploads/20211224/534bd6db65fa1b7ff33d134c735ca8f1.png",
                  //   id: 4,
                  //   low_money: "10.00",
                  //   pay_type: "vcsdcz",
                  //   protocol: [],
                  // quick_list: [101, 1009, 2005, 4996, 9968],
                  // recharge_method: 1,
                  // reparams: "user_id,amount,channels_id",
                  // }]
                  this.$store.commit("SETCZTYPE", res.data.data);
                } else {
                  this.$vux.toast.text(res.data.msg, "middle");
                }
              });
            },
            do_data(data) {
                let items= {};
                if (data) {
                    items = data;
                } else return;
                let item = {};
                for (let k in items) {
                    let v = items[k];
                    if (!item[v.recharge_method]) item[v.recharge_method] = [];
                    item[v.recharge_method].push(v);
                }
                return item;
            },
            onConfirm() {
              if(this.currqd<1){
                this.$vux.toast.text(this.$t('recharge.text[12]'), "bottom");
                return
              }
              if(!this.paymoney){
                this.$vux.toast.text(this.$t('recharge.text[13]'), "bottom");
                return
              }
              if(this.currTypeItem.bank_code&&!this.user_bank_id){
                 this.$vux.toast.text(this.$t('recharge.text[14]'), "bottom");
                return
              }
              if (
                this.paymoney < parseInt(this.currTypeItem.low_money) ||
                this.paymoney > parseInt(this.currTypeItem.high_money)
              ) { this.$vux.toast.hide();
                this.$vux.toast.text(
                  this.$t('recharge.text[15]')+"(" +
                    this.currTypeItem.low_money +
                    "~" +
                    this.currTypeItem.high_money +
                    ")",
                  "bottom"
                );
              } else {
                let url = this.currTypeItem.apiroute;
                if (this.paymoney.charAt(this.paymoney.length - 1) == ".") {
                  this.paymoney = this.paymoney.substring(0, this.paymoney.length - 1);
                }
                let d = this.globalPpproach.checkIsEncrypt({
                  amount: this.paymoney,
                  channels_id: this.currTypeItem.id,
                  bank_code:this.user_bank_id,
                  currency_type:this.currTypeItem.currency_type
                })
                let data = {
                  amount: this.paymoney,
                  channels_id: this.currTypeItem.id,
                  bank_code:this.user_bank_id,
                  currency_type:this.currTypeItem.currency_type
                };
                this.$vux.loading.show();
                //????????????????????????????????????
                // thirdCreateOrder
                this.$http
                  .post(this.versionLive2+'Recharge/index',d)
                  .then((res) => {
                    this.$vux.loading.hide();
                    if (res && res.data.code == 1) {
                      this.paymoney = "";
                      this.user_bank_id = "";
                      if(res.data.data.type==1){
                        url = res.data.data.url;
                        location.href = url
                      }else if(res.data.data.type==2){
                        // localStorage.setItem("bodyHtml", res.data.data.form);
                          this.bodyHtmlString = res.data.data.form;
                      }
                    } else {
                      // this.$vux.toast.text(res.data.msg, "middle");
                    }
                    this.$vux.toast.text(res.data.msg, "bottom");
                  })
                  .catch((res) => {
                    this.$vux.loading.hide();
                  });
                this.showConfirm = false;
              }
            },
        },
    }
</script>

<style scoped lang="less">
.goldenBg{
  .recharge-content{
   background: #1F252C;
   h5{
     color: #CECECE;
     border-bottom: 1px solid #5C564D;
   }
   ul{
    li{
      background: #464B53;
      color: #CECECE;
      border: 1px solid #464B53;
    }
   }
   .input-money-box {
    span{
      color: #CECECE;
    }
    input{
      color: #CECECE;
    }
   }
  }
}
.recharge-content{
  background: #fff;
  margin-top: .2rem;
  padding: .3rem;
  &.recharge-money-content{
    margin-top: 0;
  }
  &.recharge-qd-content{
    ul{
      li{
        // width: 49%;
        width: auto;
         &:nth-child(3n){
          margin: .2rem 2% 0 0;
        }
         &:nth-child(2n){
          margin: .2rem 0 0 0;
        }
        p{
          color: rgb(204, 204, 204);
          font-size: .3rem;
        }
      }
    }
  }
  h5{
    color: #445779;
    font-size: .35rem;
    font-weight: normal;
    padding-bottom: .3rem;
    border-bottom: 1px solid #eee;
  }
  .type-list,.money-list,.qd-list{
    display: flex;
    flex-wrap:wrap;
    li{
      margin: .2rem 1% 0 0;
      border-radius: .2rem;
      border:1px solid #eee;
      padding:.1rem 0rem;
      text-align: center;
      font-size: .3rem;
      // justify-content: space-between;
      width: 24%;
      overflow: hidden;
      position: relative;
      // &:nth-child(3n){
      //   margin: .2rem 0 0 0;
      // }
      &.active{
        border: 1px solid #E4A861;
        color: #E4A861;
      }
      >div{
         
      }
      img{
        width: .75rem;
        // padding-bottom: .1rem;
      }
    }
  }
  .type-list{
    li{
      &.active{
        &::before{
          content: '';
          position: absolute;
          background: url(../../assets/images/check.png) no-repeat;
          width: .4rem;
          height: .4rem;
          bottom: 0;
          right: 0;
          background-size: contain;
        }
      }
    }
  }
  .money-list,.qd-list{
    li{
      border-radius: .1rem;
      padding: .2rem;
       &.active{
        border: 1px solid #E4A861;
        color: #E4A861;
      }
    }

  }
  .qd-list{
    li{
      &:nth-child(2n){
        margin: .2rem .2rem 0 0 !important;
      }
    }
  }
  .money-list {
    li{
        font-size: .38rem;
      }
  }
  .input-money-box{
    border-bottom: 1px solid #eee;
    margin-top: .8rem;
    position: relative;
    // padding-bottom: .3rem;
  &.errorborder{
    border-bottom: 1px solid red;
  }
   
    input{
        width: 100%;
        padding:0 .5rem;
         font-size: .4rem;
         line-height: .6rem;
    }
    span{
      font-weight: normal;
      color: #445779;
       font-size: .55rem;
       position: absolute;
       left: 0;
    }
  }
  .select-bank-list{
    position: relative;
    border: 1px solid #71819D;
    margin-top: .4rem;
    border-radius: .2rem;
    height: 1rem;
    line-height: 1rem;
    padding-left: .5rem;
    p{

    }
    .select-bank-icon{
      position: absolute;
      background: url(../../assets/images/withdrawals/Vector_down.png) no-repeat;
      background-size: contain;
      width: .3rem;
      height: .3rem;
      right: .3rem;
      top: .4rem;
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
    font-size: .4rem;
  }
  .error-tx{
    color: red;
    padding-top: .2rem;
  }
}
</style>