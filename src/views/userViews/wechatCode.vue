<template>
    <div class="wechatCode" id="wechatCode">
          <x-header
              style="background-color:transparent;z-index: 9;color:#445779"
              title="微信扫码充值"
              :left-options="{showBack: false}"
            >
              <span style="color:#445779">微信扫码充值</span>
              <i class="black-back"></i>
              <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
              <!-- <p class="show-card" @click="$router.push('/bankCardList')">常用账号</p> -->
         </x-header>
    <myScroll :isDown="false" :top="1.4" :bottom="0" :left="0">
        <div class="we-code" v-if="wechat.length">
            <div class="img">
                <!-- <img src="../../assets/images/code.png" alt=""> -->
                <img :src="wechat[0].code_image" alt="">
            </div>
            <p>备注:存款金额{{wechat[0].min_sum}}-{{wechat[0].max_sum}}</p>
        </div>
   <!-- <div class="card-info">
       <p style="font-size:0.38rem;">请转账到以下账户：</p>
       <ul class="info-list" v-if="czCardInfo">
           <li><span>开户行:  {{czCardInfo.bank}}</span> <i @click="copy(czCardInfo.bank)">复制</i></li>
           <li><span>持卡人:  {{czCardInfo.name}}</span> <i @click="copy(czCardInfo.name)">复制</i></li>
           <li><span>卡号:  {{czCardInfo.no}}</span> <i @click="copy(czCardInfo.no)">复制</i></li>
           <li><span>开户行地址:  {{czCardInfo.openbank}}</span> <i @click="copy(czCardInfo.openbank)">复制</i></li>
           <li><span style="color:#1486FF;font-size:0.36rem">最低充值金额{{czCardInfo.low_money}}元</span></li> 
       </ul>
   </div> -->
   <div class="info-title"> 
       <p>请填写您的账户和转账信息 :</p>
   </div>
   <div class="userCard-info">
       <ul>
           <li>
               <span>存款人</span> <input type="text" v-model="userName" style="padding-left:20%" maxlength="20" placeholder="Vui lòng nhập tên của người gửi tiền">
           </li>
            <!-- <li>
               <span>存款账号</span> <input type="text" maxlength="50" v-model="cardNum" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')" style="padding-left:25%" placeholder="请输入存款人账号">
           </li> -->
            <li>
               <span>转账金额</span> <input type="text" v-model="czMoney" style="padding-left:25%" placeholder="请输入充值金额">
           </li>
            <li >
               <span>转账时间</span> <input type="text" v-model="timeValue2" style="padding-left:25%" readonly> <i></i>
                <datetime style="height: 1.34rem;position: absolute;width: 100%;top: 0;left:0" v-model="timeValue"  @on-confirm="getCzTime()" format="YYYY-MM-DD HH:mm" :start-date="startDate"  confirm-text="完成" cancel-text="取消"></datetime>
           </li>
       </ul>
       <div class="recharge-btn" @click="recharge"><span>提交充值</span></div>
   </div>
    </myScroll>
    </div>
</template>
<script>
 import { Datetime  } from 'vux';
export default {
    name:"wechatCode",
    data(){
        return{
            czMoney:'',
            czCardInfo:{},
            userName:'',
            cardNum:'',
            startDate:'',
            timeValue:'',
            timeValue2:'',
            fName:'',
            wechat:[],
            wechatId:''
        }
    },
    components:{
        Datetime,
    },
    watch:{
        czMoney:function(n,v){
        n=n+'';
        if(n.charAt(n.length-1).indexOf('.')>-1&&v.indexOf('.')>-1){
                return this.czMoney=n.slice(0,n.length-1);
        }
        this.czMoney = n.replace(/[^\d.]/g,'').replace(/\.{2,}/g,".").replace(/^[0,.]{1,}/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    }
    },
    created(){
        // this.getCardList();
        let obj = localStorage.getItem('currCommonCard')?JSON.parse(localStorage.getItem('currCommonCard')):'';
        if(typeof(obj)=='object'&&obj.name){
            this.userName = obj.name;
            // this.cardNum = obj.no;
        }
        this.getWechatCode();
    },
    mounted(){
    var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      m = m < 10 ? "0" + m : m; //月小于10，加0
      d = d < 10 ? "0" + d : d; //day小于10，加0
      this.startDate= y-1 + "-" + m + "-" + d;
    },
     beforeRouteEnter(to, from, next) {
    next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
        console.log(to.name,222)
        console.log(from.name,222)
        vm.fName = from.name

        })
    },
    methods:{
        getWechatCode(){
            this.$http.get(this.versionLive2+'recharge/get_wechat_list').then(res=>{
                if(res && res.data.code == 1){
                    this.wechat = res.data.data||[];
                }
            })
        },
        getCardList(){
             this.$vux.loading.show({ text: "Đang nhận..." });
         this.$http.post(this.versionLive2+'Recharge/bankList/').then(res=>{
            if(res&&res.data.code==1){
                if(res.data.data.length!=0){
                    this.czCardInfo=res.data.data[0]
                }else{
                     this.$vux.toast.text('没有可用银行卡', 'middle');
                }
                 
            }
            this.$vux.loading.hide()
         })
        },
        copy(data){
            let url = data;
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select();
            document.execCommand("Copy");
           this.$vux.toast.text('Sao chép thành công', 'middle');
            oInput.remove()
       },
      recharge(){
          if(this.userName==''){
              this.$vux.toast.text('请填写存款人姓名', 'middle');
              return
          }
            if(this.czMoney==''){
              this.$vux.toast.text('请填写充值金额', 'middle');
              return
          }
        //     if(this.czMoney==''){
        //       this.$vux.toast.text('请填写充值金额', 'middle');
        //       return
        //   }
             
          if(this.timeValue2==''){
              this.$vux.toast.text('请填写时间', 'middle');
              return
          }
        //    this.$http.defaults.headers["pay_user"] = this.userName;
        this.wechatId = this.wechat[0].id;
           this.$vux.loading.show({ text: "提交中..." });
           this.$http.post(this.versionLive2+'Recharge/wechat_recharge/',{
               wechat_id:this.wechatId,
               pay_user:this.userName,
               amount:this.czMoney,
               pay_time:parseInt(new Date(this.timeValue.replace(/-/g, '/') ).getTime().toString().substr(0,10))
           }).then(res=>{
            if(res&&res.data.code==1){
                 this.$vux.alert.show({
                    title: "提示",
                    content:'<span style="color:#333333">'+res.data.msg+'</span>',
                    buttonText:'知道了',
                    onConfirm: () => {
                }
            });
            this.userName=''
            this.czMoney=''
            this.timeValue2=''
            }else{
                  this.$vux.alert.show({
                    title: "提示",
                    content:res.data.msg,
                    onConfirm: () => {
                }
            });
            }
        //    this.$http.post(this.versionLive2+'Recharge/bank_recharge/',{
        //        bank_id:parseInt(this.czCardInfo.bank_id),
        //        pay_user:this.userName,
        //     //    pay_no:this.cardNum,
        //        pay_amount:this.czMoney,
        //        pay_time:parseInt(new Date(this.timeValue.replace(/-/g, '/') ).getTime().toString().substr(0,10))
        //    }).then(res=>{
        //     if(res&&res.data.code==1){
        //          this.$vux.alert.show({
        //             title: "提示",
        //             content:'<span style="color:#333333">'+res.data.msg+'</span>',
        //             buttonText:'知道了',
        //             onConfirm: () => {
        //         }
        //     });
        //     this.userName=''
        //     this.czMoney=''
        //     this.timeValue2=''
        //     }else{
        //           this.$vux.alert.show({
        //             title: "提示",
        //             content:res.data.msg,
        //             onConfirm: () => {
        //         }
        //     });
        //     }
            this.$vux.loading.hide()
         })
      },
      getCzTime(){
          this.timeValue2= this.timeValue
         
      }
    }

}
</script>
<style lang="less" >
.rem(@name,@px){
        @{name}:unit(@px/75,rem)
}
.wechatCode{
    font-size: 0.32rem;
    // .vux-header{box-shadow: -3px 0px 8px 1px #ccc;}
    .show-card{
        .rem(font-size,24);
        color: #445779;
        position: absolute;
        right: .3rem;
        top:.1rem;
    }
}
.wechatCode .vux-header .vux-header-title{color: #000}
.black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
.card-info{
    // background:#FF383A;
    color:#445779;margin-top: 0.2rem;padding: 0.3rem 0.34rem 0 0.34rem;
    p{
        font-weight: bold;
    }
    .info-list{
        li{
            font-size: 0.38rem;
            display: flex;justify-content: space-between;
            // margin-top: 0.58rem;
            align-items: center;
            .rem(height,109);.rem(line-height,109);
            border-bottom:1px solid #eee;
            &:nth-last-child(1){
                border-bottom:none;
            }
            i{background: #1486FF;color:#fff;
            text-align:center;
            // padding: 0.02rem 0.1rem;
            .rem(height,50);
            .rem(line-height,50);
            .rem(width,100);
            
            border-radius: 2px;}
            &:nth-child(1){margin-top: 0.2rem;}
        }
       
    }
}
.we-code{
    .rem(width,710);
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(20, 134, 255, 0.2);
    .img{
        .rem(width,440);
        margin:  0.3rem auto 0 auto;
    }
    p{
        text-align: center;
        color:#1486FF;
        font-size: 0.34rem;
        padding: 0.1rem 0 0.35rem 0;
    }
    // border: 1px solid #000;
}
.info-title{
    color:#445779;
    font-size: 0.38rem;
    // .rem(font-size,32);
    // text-align: center;
    position: relative;
    margin:0.3rem 0 0.36rem 0.26rem;
    font-weight: 400;
}
.userCard-info{
    padding: 0 0.34rem;padding-bottom: 0.2rem;
    
    ul{
        li{
            position: relative;margin-bottom: 0.53rem;
            span{color:#445779 ;font-size: 0.37rem;position: absolute; 
            // top: 0.22rem;
            top: 0.4rem;
            left: 0.3rem;}
            input{width: 100%;
                // height: 1rem;
                .rem(height,100);
                .rem(line-height,100);
                // border: 1px solid #CCCCCC;
                border: 1px solid #445779;
                border-radius: 4px;
            }
            input:focus{border: 1px dashed #666666;}
            i{display: block;width: 0.213rem;height: 0.386rem;background: url('../../assets/images/jt_right.png') no-repeat;background-size: cover;position: absolute;top: 0.4rem;right: 0.3rem;}
        }
    }
    .recharge-btn{.rem(height,96);.rem(line-height,96);.rem(font-size,32);background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);color: #fff;text-align: center;border-radius: 0.08rem;border-radius: 2rem;}
}
</style>