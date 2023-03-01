<template>
  <div class="VTList" >
     <header class="home-header clearfix">
        <div @click="$router.go(-1)" class="back-icon"></div>
        <span>Danh sách tiền ảo</span>
    </header>
    <myScroll :top="1.2" :bottom="0">
        <ul class="dz-list">
            <li class="clearfix" @click="changeAddress(v,index)" v-for="(v,index) in vtList" :key="index" :class="v.id == isActive ?'active':''">
                <span class="fl"><img src="../../../assets/images/withdrawals/xnb_icon.png" alt=""></span>
                <i class="fl">{{v.name}}</i>
                <i class="fr select-icon-xnb"></i>
            </li>
            <li class="clearfix" @click="$router.push({name:'addAddress'})">
                <span class="fl"><img src="../../../assets/images/withdrawals/tjyhk.png" alt=""></span>
                <i class="fl">Thêm địa chỉ ví ảo</i>
            </li>
            
        </ul>
    </myScroll>



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
  name: "VTList",
  components:{
    Confirm,
    myScroll},
  data:function(){
    return{
      vtList:[],
      isActive:4
    }
  },
  computed:{
    ...mapState(['userinfo','webInitData'])
  },
  created() {
    this.$vux.loading.show({text:'Đang nhận...'});
    this.getList();
  },
  mounted() {


  },

  methods: {
    changeAddress(v){
        this.isActive = v.id;
        localStorage.setItem('vtList',JSON.stringify(v));
         setTimeout(() => {
             this.$router.push('/tx')
         },500);
    },
    getList(){
        this.$http.get("/api/v2/Recharge/get_vrwallet_list").then(res=>{
          this.$vux.loading.hide();
          if(res && res.data.code == 1){
              this.vtList = res.data.data;
              this.isActive=this.$route.params.VTId||res.data.data[0].id;
          }else{
         
          }
      }).catch(err=>{
        this.$vux.loading.hide();
      });
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
        background: url("../../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }
}
.dz-list{
    padding: 0 0.32rem;
    li{
        .rem(line-height,46);
        color:#666;
        .rem(font-size,24);
        padding:0.5rem  0;
        border-bottom: 1px solid #eee;
        position: relative;
        margin-left: 1rem;

        span{
            display: block;
            margin-right: 0.27rem;
            position: absolute;
            left: -1rem;
            top: 0.5rem;
            .rem(width,46);
            .rem(height,46);
            img{
                width: 100%;
            }
        }
        .select-icon-xnb{
            display: block;
            .rem(width,33);
            .rem(height,33);
            background: url('../../../assets/images/withdrawals/xnwxz.png')no-repeat;
            background-size: contain;

        }
        &.active{
            .select-icon-xnb{
                display: block;
                .rem(width,33);
                .rem(height,33);
                background: url('../../../assets/images/withdrawals/xz.png')no-repeat;
                background-size: contain;
            }
        }
    }
}



</style>
