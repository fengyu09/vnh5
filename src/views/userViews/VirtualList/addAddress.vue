<template>
  <div class="virtualTopUp" >
     <header class="home-header clearfix">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>Thêm địa chỉ ví tiền ảo</span>
    </header>
    <div class="vtu-content">
        <p >Tên địa chỉ:</p>
        <input v-model="xn.xnName" type="text" placeholder="Bạn có thể dễ dàng phân biệt địa chỉ tiền ảo dưới tên của mình">
        <p >Thỏa thuận tiền ảo:</p>
        <ul class="pact clearfix">
            <li class="fl" :class="xyIndex == index ?'active':''" @click="changeXY(v,index)" v-for="(v,index) in xyArr" :key="index">{{v}}</li>
        </ul>
        <p >Địa chỉ ví:</p>
        <input v-model="xn.xnAddress" type="text" placeholder="Vui lòng nhập địa chỉ ví">
        <p >Mật mã giao dịch:</p>
        <input v-model="xn.pass" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')"  placeholder="Mật mã rút tiền">
        <!-- <p >Mã xác minh điện thoại:</p> -->
        <!-- <div class="yzm">
            <input v-model="xn.smsCode" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')" oninput="if(value.length>4)value=value.slice(0,4)"  placeholder="Vui lòng nhập mã xác minh điện thoại">
            <x-button
                type="warn"
                plain
                :disabled="isSend"
                style="width:auto;padding:0;margin:0;border:none;position: absolute;right: 0.4rem;"
                @click.native="getSMS"
                class="yzm-btn"
                :class="isSend == true ?'hcolor':''"
            >
                <span style="font-size:12px;color:#ff513e">{{btnText}}</span>
            </x-button>
           
        </div> -->
        <i>Nhắc nhở: Vui lòng đảm bảo rằng địa chỉ ví là chính xác, nếu địa chỉ sai, 
bạn sẽ phải chịu trách nhiệm về hậu quả!</i>
        <!-- <div class="bank-bth">提交</div> -->
    </div>
    <div class="bank-bth1" @click="addXN()">Gửi đi</div>


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
import myScroll from '../../../components/myScroll.vue'
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "virtualTopUp",
  components:{
    Confirm,
    myScroll},
  data:function(){
    return{
        xn:{
            xnName:'',
            xnProtocol:'',
            xnAddress:'',
            // mobile:'',
            // smsCode:'',
            pass:'',
        },
        btnText:'lấy mã xác minh',
        isSend:true,
        xyIndex:0,
        xyArr:[],
        isSend:false

    }
  },
  computed:{
    ...mapState(['userinfo','webInitData',"lanCode"])
  },
  created() {
    // this.addXN()
    this.getXy();
  },
  mounted() {


  },

  methods: {
    changeXY(v,index){
        this.xyIndex = index;
        this.xnProtocol = v;
        
    },
    getSMS(){
        if(!this.xn.mobile) return this.$vux.toast.text('请输入手机号码', 'middle')
        let d = this.globalPpproach.checkIsEncrypt()
        this.$http
                  .post("/api/sms/send", {
                    mobile: this.xn.mobile.replace(/\s*/g, ""),
                    event: "bindusdt",
                  })
                  .then(res => {
                      if(res && res.data.code == 1){
                        this.$vux.toast.text(res.data.msg, 'middle');
                        this.timer(120)
                      }else{
                          this.$vux.toast.text(res.data.msg, 'middle')
                      }
                  })
    },
    async getXy(){
      let res = await this.$http.get('/api/v2/Recharge/get_protocol_list');
      if(res.data.code==1) {
        this.xyArr = res.data.data || [];
        this.xn.xnProtocol = this.xyArr[0]
        }
    },
    addXN(){
       let d = this.globalPpproach.checkIsEncrypt({
          name:this.xn.xnName,
          protocol:this.xn.xnProtocol,
          address:this.xn.xnAddress,
          pass:this.xn.pass
      })
      // console.log({
      //     name:this.xn.xnName,
      //     protocol:this.xn.xnProtocol,
      //     address:this.xn.xnAddress,
      //     pass:this.xn.pass
      // });
      this.$vux.loading.show();
      this.$http.post("/api/v2/Recharge/set_vr_wallet",d).then(res=>{
        this.$vux.loading.hide();
           this.$vux.toast.text(res.data.msg, 'middle');
           if(res.data.code==1){
            // this.$router.push('recharge');
            if(this.lanCode!=2){
              this.$router.push('/recharge')
           }else{
             this.$router.push('/usdtForm')
           }
           }
           
      }).catch(err=>{
        this.$vux.loading.show();
      })
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
      //倒计时
    timer(t) {
        if (window.timer1) clearInterval(window.timer1);
        window.timer1 = setInterval(() => {
            this.djsTime = t--;
            this.btnText ="Gửi lại("+this.djsTime+")";
            this.isSend = true;
            if (t <= -1) {
                this.isSend = false;
                this.djsTime = "0";
                this.btnText = "lấy mã xác minh"
            }
        }, 1000);
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
        .rem(font-size,24);
        // font-size:0.32rem;
        p{
            color:#445779;
        }
        input{
            width: 100%;
            border-bottom: 1px solid #eee;
            .rem(line-height,60);
            margin-bottom: 0.2rem;
            .rem(font-size,24);
            // font-size:0.32rem;
        }
        .yzm{
            position: relative;
            .yzm-btn{
                display: block;
                position: absolute;
                right: 0.2rem;
                bottom: 0.2rem;
                color:#fff;
                // background: #FF5251;
                background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                .rem(line-height,53);
                .rem(height,53);
                border-radius: 3px;
                 padding:0 0.1rem!important;
                span{
                    color:#fff!important;
                    padding:0 0.1rem!important;
                }
                &.hcolor{
                  background: #ccc;
                  // background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
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
                border: 1px solid #445779;
                color:#6A86B9;
                &.active{
                    background: url('../../../assets/images/withdrawals/ss.png')no-repeat;
                    border: none!important;
                    background-size: contain;
                    // color: #445779;
                    color: #6A86B9;
                }
            }
        }
        >i{
            display: block;
            color:#1486FF;
            .rem(font-size,18);
        }

    }
        .bank-bth1{
            width: 93%;
            
            .rem(height,96);
            .rem(line-height,96);
            text-align: center;
            color:#fff;
            // background: #FF5251;
            background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
            border-radius: 50px;
            .rem(font-size,30);
            margin-bottom: 0.5rem;
            position: fixed;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
        }

}



</style>
