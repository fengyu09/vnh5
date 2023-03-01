<template >
  <div class="cardlist">
    <x-header
      style="background-color:transparent;z-index: 9;color:#000"
      title="Danh sách thẻ ngân hàng"
      :left-options="{showBack: false}"
    >
      <span>Danh sách thẻ ngân hàng</span>
      <i class="black-back"></i>
      <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
    </x-header>
   <myScroll ref="scrollWrapper" :isDown="false"  :bottom="0" :data="playList">
    <div class="cardlist-box">
    <!--<p style="text-align:center;" v-if="!cardList.length">-->
      <!--<span style="vertical-align:middle;display:inline-block;font-size:14px;">loading &nbsp;&nbsp;</span><inline-loading></inline-loading>-->
    <!--</p>-->
        <ul>
            <li v-for="(item,index) in cardList" :key="index" @click="selectCard(item,index)">
                <div :class="['yhcard-icon',item.yhtype]">
                   <img v-if="item.id==isActive" :src="item.bank_img" alt="" width="100%" height="100%">
                   <img v-else :src="item.bank_img" alt="" width="100%" height="100%">
                </div>
            <div style="line-height: 0.5rem;margin:.05rem 0 0 -30%;">
                <p class="font-15">{{item.bank_name}}</p>
                <p class="color-gray">{{item.realname}} &nbsp;|&nbsp; Thẻ tiết kiệm số cuối{{item.card_num.substring(item.card_num.length-4)}}</p>
            </div>
         <div  :class="{ 'right-icon': true, 'active':item.id==isActive}">
         </div>
            </li>
        </ul>
        <div class="tjyhk-box" @click="$router.push('/addCard')" v-if="cardList.length && cardList.length<5">
         <div class="add-icon">
         </div>
          <div style="margin-left:-65%;font-size: 15px;">
           <span>添加银行卡</span>
         </div>
          <div class="right-icon">
         </div>
       </div>
        <!-- <div class="btn-box" style="margin-top:0.8rem">
          <x-button  type="warn" style="border-radius:0.6rem;background-color:#ff513e;height:1.2rem">Xác nhận选择</x-button>
       </div> -->
    </div>
   </myScroll>
  </div>
</template>
<script>
import {
//  XButton,
//  Toast,
//  XHeader,
//  Confirm,
//  InlineLoading
} from "vux";
import myScroll from '../../components/myScroll.vue'
export default {
  name: "cardList",
  components: {
//    XButton,
//    Toast,
//    XHeader,
    myScroll,
//    InlineLoading
  },
  data(){
      return{
      //   cardList:[
      //   {
      //   yhtype:'gs',
      //   name:'中国工商银行',
      //   weihao:'3486',
      //   },
      //   {
      //   yhtype:'js',
      //   name:'中国建设银行',
      //   weihao:'6184',
      //   },
      //    {
      //   yhtype:'shpf',
      //   name:'上海浦发银行',
      //   weihao:'0356',
      //   },
      //   {
      //   yhtype:'zs',
      //   name:'招商银行',
      //   weihao:'3840',
      //   },
      // ],
      cardList:[],
      isActive:4,
        playList:{}
      }
  },
  created(){
    this.$vux.loading.show({text:'Đang nhận...'});
    this.$http.get("/api/user/usercardlist").then(res => {
      this.$vux.loading.hide();
      if(res && res.data.code==1){
        this.cardList=res.data.data || []
        this.playList.cardList = this.cardList;
        this.isActive=this.$route.params.cardId||res.data.data[0].id;
      }
    }).catch(err=>{
      this.$vux.loading.hide();
    });
  },
  mounted() {
    this.$refs.scrollWrapper.refresh()  //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.enable()  //启动滚动条
    this.$refs.scrollWrapper.disable()  //禁止滚动条


    //到时候放App全局
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false});

  //    if(localStorage.getItem('card')){
  //   let i= this.cardList.findIndex(item=>{
  //        return item.weihao==JSON.parse(localStorage.getItem('card')).weihao
  //    })
  //    i>1?this.isActive=i:this.isActive=0
  //  }
  
  },
  methods:{
      selectCard(item,index){
         this.isActive=item.id;
         localStorage.setItem('card',JSON.stringify(item));
         setTimeout(() => {
             this.$router.push('/withdrawalTopUp/0')
         },500);
      }
  },
};
</script>
<style lang="less">
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
.cardlist .vux-header .vux-header-title {
  color: #000;
  margin: 0!important;
}
.black-back {
  display: block;
  width: 12px;
  height: 20px;
  position: absolute;
  background: #ccc;
  top: 12px;
  left: 12px;
  background: url("../../assets/images/withdrawals/fanhui.png") no-repeat;
  background-size: 100% 100%;
}
.cardlist-box{
    padding: 0 4%;
    li{display: flex;align-items:center;justify-content:space-between;.rem(padding-bottom,34);.rem(padding-top,34);border-bottom:1px solid #f5f5f5;
    .right-icon{.rem(width,29);.rem(height,29);background: url('../../assets/images/withdrawals/wxzyh.png') no-repeat;background-size: 100% 100%;}
    .right-icon.active{background: url('../../assets/images/withdrawals/xzyh.png') no-repeat;background-size: 100% 100%;}
    }
     .yhcard-icon{
      .rem(width,70);
      .rem(height,70);
    }
    .yhcard-icon.gs{background: url('../../assets/images/withdrawals/zggs.png') no-repeat;background-size: 100% 100%}
    .yhcard-icon.js{background: url('../../assets/images/withdrawals/jsyh.png') no-repeat;background-size: 100% 100%}
    .yhcard-icon.shpf{background: url('../../assets/images/withdrawals/shpf.png') no-repeat;background-size: 100% 100%}
    .yhcard-icon.zs{background: url('../../assets/images/withdrawals/zsyh.png') no-repeat;background-size: 100% 100%}
    .font-15{font-size: 15px;}
    .color-gray{color: #afafaf;}
     .tjyhk-box{
      display: flex;align-items:center;justify-content:space-between;.rem(padding-bottom,34);.rem(padding-top,34);border-bottom:1px solid #f5f5f5;
      .add-icon{.rem(width,46);.rem(height,46);background: url('../../assets/images/withdrawals/tjyhk.png') no-repeat;background-size: 100% 100%;}
      .right-icon{.rem(width,14);.rem(height,20);background: url('../../assets/images/withdrawals/tianjaiyinhangka_jiantou.png') no-repeat;background-size: 100% 100%;}
    }
}
</style>