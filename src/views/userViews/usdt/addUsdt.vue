<template>
  <div class="VTList addSdList" :class="skin==5?'golden':''">
     <header class="home-header clearfix" :class="skin==5?'goldenHeader':''">
        <div @click="goBack()" class="back-icon"></div>
        <span>{{$t('addUsdt[0]')}}</span>
        <div class="add-Adr" @click="addAdress">{{$t('addUsdt[1]')}}</div>
    </header>
    <myScroll :top="1.2" :bottom="0" :bgColor="skin==5?'161C23':'f5f7fa'">
      
               <swipeout>
                    <swipeout-item :threshold=".5" underlay-color="#ccc" v-for="(item,index) in usdtList"  ref="swipeoutItem" :key="index" >
                      <div slot="right-menu">
                        <swipeout-button @click.native="deleteOne(item)" background-color="#D23934">{{$t('addUsdt[2]')}}</swipeout-button>
                      </div>
                      <div slot="content" class="li">
                        <div class="swipeout-content" @click="changeAddress(item,index)" :class="item.no == $store.state.sdSelectAdr ?'active':''">
                           <span class="fl"> <img v-if="skin==5" src="../../../assets/images/withdrawals/xnb_icon.png" alt=""> <img v-else  src="../../../assets/images/withdrawals/usdtDz.png" alt=""></span>
                            <p>{{item.remark}}</p>
                            <i class="fl">{{item.no}}</i>
                            <i class="fr select-icon-xnb"></i>
                        </div>
                      </div>
                  </swipeout-item>
              </swipeout>


    </myScroll>



  </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex'
import {  SwipeoutItem, SwipeoutButton ,Swipeout} from "vux";
export default {
  name: "addUsdt",
  data:function(){
    return{
      vtList:[],
      isActive:4
    }
  },
   components: {
    Swipeout, 
    SwipeoutItem, 
    SwipeoutButton
  },
  computed:{
    ...mapState(['usdtAdress','usdtList',"lanCode","skin"])
  },
  created() {
      
      if(Object.prototype.toString.call(this.usdtList) === '[object Array]'&&!this.usdtList.length){
        this.$store.dispatch({
          type:'getUsdtAdressList',
          flag:true
        });
      }

  },
  mounted() {


  },

  methods: {
    addAdress(){
      // this.$inputBox({address:this.usdtAdress});
      this.$inputBox();
    },
    changeAddress(v){
        this.isActive = v.id;
        this.$store.commit('SETSDADR',v.no)
         setTimeout(() => {
           if(this.lanCode!=2){
              this.$router.push('/recharge?type=2')
           }else{
             this.$router.push('/usdtForm')
           }
            
         },500);
    },
    async deleteOne(v){
      this.$vux.loading.show('Xóa...')
      let d = this.globalPpproach.checkIsEncrypt({
        id:v.id
      })
      let res = await this.$http.post("/api/v2/Recharge/del_commonno",d)
      this.$vux.loading.hide();
      if(res.data.code==1){
        let arr = this.usdtList;
        arr.splice(arr.findIndex((item)=>item.id==v.id),1);
        this.$store.commit('SETUSDTLIST',arr);
      }
      this.$vux.toast.text(res.data.msg, 'middle')
    },
    goBack(){
      // this.$router.push('/recharge?type=2');
      if(this.lanCode!=2){
        this.$router.push('/recharge?type=2')
      }else{
        this.$router.push('/usdtForm')
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
    &.goldenHeader{
      .add-Adr{
        color: #E3CF95 ;
      }
    }
    .add-Adr{
         position: absolute;
         right: .3rem;
         color: #666;
         top: 0;
        //  .rem(font-size,28);
         font-size: 0.3rem;
    }
}
.addSdList{
  &.golden{
    .vux-swipeout-content{
      background: #1F252C;
      .li{
        .swipeout-content{
          border: 1px solid #5C564D;
          box-shadow:none;
          color: #AB9B62;
          &.active{
            .select-icon-xnb{
                display: block;
                .rem(width,33);
                .rem(height,33);
                background: url('../../../assets/images/withdrawals/active_1.png')no-repeat;
                background-size: contain;
            }
        }
          .select-icon-xnb{
            display: block;
            .rem(width,33);
            .rem(height,33);
            background: url('../../../assets/images/withdrawals/active_0.png')no-repeat;
            background-size: contain;
            position: absolute;
            right: .3rem;
            top: 0.55rem;

        }
        }
      }
    }
  }
}
.addSdList .vux-swipeout-content{
    padding: 0 0.32rem;
    .li{
      .swipeout-content{
          .rem(line-height,46);
          color:#666;
          .rem(font-size,24);
          padding:0.2rem .3rem 1rem 1.2rem;
          border: 1px solid #eee;
          position: relative;
          margin-top: .3rem;
          box-shadow: 0px 0px 15px #eee;
          border-radius: .1rem;
           &.active{
            .select-icon-xnb{
                display: block;
                .rem(width,33);
                .rem(height,33);
                background: url('../../../assets/images/withdrawals/usdtG.png')no-repeat;
                background-size: contain;
            }
        }
        .vux-swipeout-item{
           border:none!important;
        }
        .vux-swipeout-button-box{
          background:none!important;
        }
      }
      
        p{
          font-weight: bold;
        }
        span{
            display: block;
            margin-right: 0.27rem;
            position: absolute;
            left: .3rem;
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
            background: url('../../../assets/images/withdrawals/no_seltct.png')no-repeat;
            background-size: contain;
            position: absolute;
            right: .3rem;
            top: 0.55rem;

        }

    }
}



</style>
