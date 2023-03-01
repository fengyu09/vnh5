<template>
  <div class="memberPackage" >
     <header class="home-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>{{$t('memberPackage.text[0]')}}</span>
    </header>
    <div class="tab-content">
        
        <myScroll :top="1.2" :bottom="0" :bgColor="$st.state.skin==5?'161C23':'F0F0F0'" v-if="tabIndex == 'vip' ">
          <ul class="vip-list clearfix" v-if="packList.length > 0">
              <li v-for="(item,index1) in packList" :key="index1">
                  <span v-if="lanCode==2||lanCode==5">Exclusive VIP{{item.degree}}</span>
                  <span v-else>VIP{{item.degree}}độc quyền</span>
                  <img v-lazy="item.icon" class="vipImg" alt="">
                  <p>{{item.name}}</p>
                  <div class="receive-btn" @click="showAddress(item)" >{{$t('memberPackage.text[1]')}}</div>
                  <div class="receive-btn active" v-if="item.status == 1">{{$t('memberPackage.text[2]')}}</div>
              </li>
          </ul>
          <p v-else style="text-align: center;line-height: 5rem;">no data</p>
        </myScroll>
        

    </div>
        <!-- 礼物领取 -->
    <div class="address-box" v-show="isReceive" :class="$st.state.skin==5?'address-box-golden':''">
      <div class="add-content">
        <h3>{{$t('memberPackage.text[3]')}}</h3>
        <div class="clearfix"><span>{{$t('memberPackage.text[4]')}}</span><input v-model="add.name"  type="text" :placeholder="$t('memberPackage.text[5]')"></div>
        <div class="clearfix"><span> {{$t('memberPackage.text[6]')}}</span>  <input v-model="add.address" type="text" :placeholder="$t('memberPackage.text[7]')"></div>
        <div class="clearfix"><span>{{$t('memberPackage.text[8]')}}</span><input  v-model="add.tel" type="text"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" :placeholder="$t('memberPackage.text[9]')"></div>
        <p>{{$t('memberPackage.text[10]')}}</p>
        <div class="submit-btn" :class="isShowBtn == 2 ?'pink-btn':''" @click="submitAdd">{{$t('memberPackage.text[11]')}}</div>
        <div class="close-icon" @click="isReceive = false"></div>
      </div>
    </div>




  </div>
</template>

<script>
import {

  Confirm} from 'vux'
import myScroll from '../../components/myScroll.vue'
import { mapState ,mapMutations } from 'vuex'
export default {
  name: "memberPackage",
  components:{
    Confirm,
    myScroll},
  data:function(){
    return{
        tabIndex:'vip',
        btnText:this.$t('memberPackage.text[12]'),
        add:{
            tel:'',
            name:'',
            address:''
        },
        isReceive:false,
        typeList:[],
        packList:{},
        packId:'',
        degree:'',
        isShowBtn:1
    }
  },
  computed:{
    ...mapState(['userinfo','webInitData','addressInfor','isPure',"lanCode"])
  },
  created() {
    this.$vux.loading.show({text:this.$t('memberPackage.text[13]')});
    this.getGifs();
   
    if(this.addressInfor.tel){
      this.add =  this.addressInfor;
      if(this.add.name == ''||this.add.address==''||this.add.tel==''){
         this.isShowBtn = 1
      }else{
        this.isShowBtn = 2
      }
    }
    // console.log(this.isShowBtn)
  },
  mounted() {
  
  },
  watch:{
    add:{
      handler(newVal, oldVal) {
                let btn = document.querySelector('.submit-btn');
                // console.log(newVal)
                if(newVal.name != '' && newVal.tel != ''&& newVal.address != ''){
                  // btn.classList.add('pink-btn')
                  this.isShowBtn = 2
                }else{
                  //  btn.classList.remove('pink-btn')
                  this.isShowBtn = 1
                }
            },
            deep: true
    }
  },

  methods: {
    ...mapMutations(["SETADDRESSINFOR"]),
    changeTab(v){
        this.tabIndex = v.type ;
    },
    //地址弹窗
    showAddress(v){
        if(!this.$store.state.codeToken){
            this.$popup();
            return;
        }

        if(this.add.name != '' &&this.add.address != '' && this.add.tel!='' ){
          this.isShowBtn = 2
        }else{
          this.isShowBtn = 1
        }
        this.isReceive = true;
        this.packId = v.gift_id;
        this.degree = v.degree
        // console.log(this.isShowBtn)
    },
    getGifs(){
        if(!this.$store.state.codeToken) return;
        this.$http.get('/api/user/giftlist').then(res=>{
            this.$vux.loading.hide();
            if(res && res.data.code == 1){
                this.packList = res.data.data;
               
            }else{
                 this.$vux.toast.text(res.data.msg); 
            }
        }).catch(err => {});
    },
    submitAdd(){
        if(!this.add.name){
            this.$vux.toast.text(this.$t('memberPackage.text[14]')); 
        }else if(!this.add.address){
            this.$vux.toast.text(this.$t('memberPackage.text[15]')); 
        }else if(!this.add.tel){
            this.$vux.toast.text(this.$t('memberPackage.text[16]')); 
        }
       
        else{
           let d = this.globalPpproach.checkIsEncrypt({
             gift_id:this.packId,
              rec_name:this.add.name,
              rec_address:this.add.address,
              rec_phone:this.add.tel,
              degree:this.degree
        })
        let obj = {
             gift_id:this.packId,
              rec_name:this.add.name,
              rec_address:this.add.address,
              rec_phone:this.add.tel,
              degree:this.degree
        }
        // console.log(obj)
        this.$vux.loading.show({text:this.$t('memberPackage.text[13]')});
            this.$http.post('/api/user/receivegift',d).then(res=>{
              this.$vux.loading.hide();
                if(res && res.data.code == 1){
                    this.getGifs();
                    this.$vux.toast.text(res.data.msg); 
                    this.isReceive = false;
                    // this.add = {};
                    this.SETADDRESSINFOR(this.add);
                }else{
                    this.$vux.toast.text(res.data.msg); 
                }
            }).catch(err => {});
        }
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
.tab-content{
    .tab{
        background: #fff;
        .rem(width,360);
        .rem(height,64);
        margin: 0 auto;
        border-radius: 100px;
        overflow: hidden;
        background: #eee;
        &.tabWidth{
          .rem(width,200);
        }
        span{
            display: block;
            text-align: center;
            color: #445779;
            .rem(width,160);
            .rem(height,64);
            .rem(line-height,64);
            .rem(font-size,28px);
            &.active{
                .rem(width,200);
                color:#fff;
                // background: linear-gradient(90deg, #FF3131, #FF8067);
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                border-radius: 100px;
                font-weight: bold;
            }
        }
    }
    .vip-list{
        width: 88.9%;
        margin: 0 auto;
        li{
            float: left;
            width: 46.4%;
            background: #fff;
            .rem(margin-right,47);
            .rem(margin-top,20);
            border-radius: 5px;
            background: url('../../assets/images/vip/li_bg.png')no-repeat;
            background-size: 100% 100%;
            position: relative;
            .rem(height,357);
            img{
                display: block;
                width: 2rem;
                margin: 0 auto;
                margin-top:1rem;

            }
            .vipImg{
              width: 3rem;
              margin-top: 0.3rem;
            }
            &:nth-of-type(2n){
                margin-right: 0;
            }
            span{
                position: absolute;
                top: 0.2rem;
                left: 8%;
                color: #FF0000;
                .rem(font-size,24);
            }
            p{
                position: absolute;
                bottom: 1rem;
                text-align: center;
                left: 50%;
                transform: translateX(-50%);
                color: #445779;
                width: 80%;
            }
            .receive-btn{
                color: #fff;
                width: 51.6%;
                margin: 0 auto;
                .rem(height,58);
                .rem(line-height,58);
                // background: linear-gradient(90deg, #FF3131, #FF8067);
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                text-align: center;
                border-radius: 100px;
                .rem(font-size,24);
                // .rem(margin-bottom,13);
                position: absolute;
                .rem(bottom,13);
                left: 50%;
                transform: translateX(-50%);
                &.active{
                    color: #fff;
                    background: #aaa;
                }
            }
        }
    }
    .gz-list{
        li{
            p{
                bottom:1.2rem!important;
            }
        }
    }
}
.address-box{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    .add-content{
      background: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 2rem;
      width: 85.7%;
      border-radius: 10px;
      padding: 0 0.666rem;
      .close-icon{
        position: absolute;
        .rem(width,70);
        .rem(height, 70);
        bottom: -2rem;
        left: 50%;
        transform: translateX(-50%);
        background: url('../../assets/images/close-zc.png')no-repeat;
        background-size: contain;
      }
      h3{
        font-weight: bold;
        text-align: center;
        .rem(font-size,32);
        .rem(margin-top,40);
        .rem(margin-bottom,47);
      }
      p{
        color: #FF3131;
        .rem(font-size,16);
        .rem(margin-top,57);
      }
      >div{
        .rem(margin-bottom,22);
        .rem(line-height,58);
        color: #445779;
        span{
          float: left;
          .rem(font-size,24);
          display: block;
        }
        input{
          // float: right;
          background: #F5F6F9;
          .rem(height,58);
          // .rem(font-size,14);
          .rem(font-size,24);
          padding-left: 0.2rem;
          border-radius: 3px;
          .rem(width,480);
        }
      }
      .submit-btn{
        .rem(width,540);
        .rem(height, 88);
        .rem(line-height,88);
        text-align: center;
        margin: 0 auto;
        border-radius: 100px;
        background: #eee;
        color:#999;
        .rem(font-size,36);
        .rem(margin-top,51);
        .rem(margin-bottom,85);
      }
      .pink-btn{
        background: linear-gradient(90deg, #FF3131, #FF8067);
        color:#fff;
      }
    }
    &.address-box-golden{
      .add-content{
        background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
        border: 1px solid #746550;
        h3{
          color: #E3CF95;
        }
        >div{
          span{
            color: #AB9B62;
          }
          input{
            background: #464B53;
          }
        }
        .submit-btn{
          background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
          color: #A85100;
        }
      }
    }
  }



</style>
