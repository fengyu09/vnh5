<template>
  <div class="QPGame">
    <headerDate v-on:func="selectDate"/>
     <div class="tab-title">
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='1'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='1'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='1'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='1'}]" @click="tabType(1)">Hôm nay</span>
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='2'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='2'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='2'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='2'}]" @click="tabType(2)">7 ngày gần đây
</span>
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='3'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='3'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='3'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='3'}]" @click="tabType(3)">Ba tháng</span>
    </div>
    <myScroll
            :bgColor="'f5f7fa'"
            :bottom="0"
            :top="2.8"
            ref="scrollWrapper"
            :data="playList"
    >
      <div class="main-box">
      <div class="item-box clearfix" v-for="(item,index) in lotteryList" :key="index">
        <div class="title clearfix">
            <span class="fl">
              <img class="fl-icon" src="../../assets/images/game/AG1.png" alt="">{{item.game_name}}
            </span>
          <span class="fr" @click="seeDatail(item.game_type)">kiểm tra các chi tiết <img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
        </div>
        <div class="item">
          <span>Số lần đặt cược</span>
          <strong>{{item.count}}</strong>
        </div>
        <div class="item">
          <span>Số tiền đặt cược</span>
          <strong>{{item.amount}}</strong>
        </div>
        <div class="item">
          <span>Số tiền thắng cuộc</span>
          <strong class="red">{{item.prize}}</strong>
        </div>
        <div class="item">
          <span>Lợi nhuận (vndk)</span>
          <strong :class="item.profit>0?'red':''"><i v-if="item.profit>0">+</i>{{item.profit}}</strong>
        </div>
      </div>
    </div>
      <div class="no-content" v-if="!lotteryList.length && !isLoading">
        <img src="../../assets/images/chat/zwtzjl-min.png" alt="">
        <p>no data</p>
      </div>
      <p class="loading-text" v-if="isLoading">Đang nhận...</p>
    </myScroll>
  </div>
</template>

<script>
  import headerDate from "../../components/header_date.vue";
  import {fun_date} from "../../assets/js/public";
  export default {
    name: "AgGame",
    data() {
      return {
        curIndex:1,
        lotteryList:[],
        playList:{},
        isLoading:false,
        st:fun_date(0),
        et:fun_date(0)
      };
    },
    created(){
      this.st = localStorage.getItem('st') || fun_date(0);
      this.et = localStorage.getItem('et') || fun_date(0);
      this.changeStatus();
      this.getLotteryReport(this.st,this.et);
    },
    methods: {
      changeStatus(){
        if(this.st==this.et) this.curIndex = 1;
        else if((Date.parse(this.et)-Date.parse(this.st))/(1*24*60*60*1000)==7) this.curIndex = 2;
        else if((Date.parse(this.et)-Date.parse(this.st))/(1*24*60*60*1000)==90) this.curIndex = 3;
        else this.curIndex = 4;
      },
      selectDate(data){
        this.st = data.st;
        this.et = data.et;
        this.changeStatus();
        this.getLotteryReport(data.st,data.et);
      },
      typeTitle: function (index) {
        this.typeIndex = index;
        this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
        this.getLotteryReport();
      },
      tabType: function (index) {
        this.curIndex = index;
        this.lotteryList = [];
        this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
        let s='';
        let e='';
        if(index==1){
          s=fun_date(0);
          e=fun_date(0);
        }else if(index==2){
          s=fun_date(-7);
          e=fun_date(0);
        }else if(index==3){
          s=fun_date(-90);
          e=fun_date(0);
        }
        this.st = s;
        this.et = e;
        // localStorage.setItem('st',this.st);
        // localStorage.setItem('et',this.et);
        this.getLotteryReport(s,e);
      },
      seeDatail(id,type){
        this.$router.push('/bbinLiveDetail/'+id);
        // localStorage.setItem('st',this.st);
        // localStorage.setItem('et',this.et);
      },
      async getLotteryReport(s,e){
        localStorage.setItem('st',this.st);
        localStorage.setItem('et',this.et);
        this.isLoading = true;
        let res = await this.$http.get('/api/vendors.bbin/detailcount',{
          params:{
            st:s || this.st,
            et:e || this.et,
            game_type:'live'
          }
        });
        this.isLoading = false;
        if(res && res.data.code == 1){
          this.lotteryList= res.data.data;
          this.playList= this.lotteryList;
        }
      },
    },
    components: {
      headerDate
    },

  };
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
  .home-header{
    background: #fff;
  }
  .QPGame{
    min-height: 100%;
    height:667px;
    background: #f5f7fa;
  }
  // .tab-title{
  //   .rem(height,110);
  //   background: #fff;
  //   overflow: hidden;
  //   span{
  //     .rem(width,210);
  //     .rem(height,64);
  //     .rem(line-height,64);
  //     .rem(font-size,28);
  //     text-align: center;
  //     color: #445779;
  //     float: left;
  //     background: #f5f7fa;
  //     .rem(border-radius,30);
  //     .rem(margin-left,30);
  //     .rem(margin-top,16);
  //     &.active{
  //       color: #fff;
  //       // background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
  //       background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
  //       background-size: 100% 100%;
  //     }
  //   }
  // }
  // .main-box{
  //   .rem(width,710);
  //   margin: 0 auto;
  //   .total-box{
  //     .rem(height,180);
  //     .rem(margin-top,20);
  //     background: #fff;
  //     overflow: hidden;
  //     .rem(padding-left,30);
  //     .rem(padding-right,30);
  //     .rem(padding-top,40);
  //     .rem(border-radius,10);
  //     >div{
  //       width: 50%;
  //       &:last-of-type{
  //         text-align: right;
  //       }
  //       span{
  //         display: block;
  //         font-family: 'DIN-Bold';
  //         font-weight: bold;
  //         .rem(font-size,42);
  //       }
  //       .c9{
  //         .rem(font-size,28);
  //         color: #9999;
  //         font-weight: normal;
  //         .rem(margin-bottom,10);
  //       }
  //       .red{
  //         color: #FF513D;
  //       }
  //     }

  //   }
  //   .item-box{
  //     .rem(padding-left,30);
  //     .rem(padding-right,30);
  //     .rem(margin-top,20);
  //     .rem(border-radius,10);
  //     background: #fff;
  //     .title{
  //       .rem(line-height,86);
  //       color: #445779;
  //       border-bottom:1px dotted #EDEDED;
  //       .fl{
  //         font-weight: bold;
  //         .rem(font-size,28);
  //         .fl-icon{
  //           .rem(width,32);
  //           .rem(height,28);
  //           .rem(margin-right,10);
  //           .rem(margin-top,29);
  //           float: left;
  //         }
  //       }
  //       .fr{
  //         .rem(font-size,24);
  //         .fr-icon{
  //           .rem(width,12);
  //           .rem(height,21);
  //           .rem(margin-left,10);
  //           .rem(margin-top,32);
  //           float: right;
  //         }
  //       }

  //     }
  //     .item{
  //       // width: 25%;
  //       // text-align: center;
  //       .rem(padding-top,30);
  //       .rem(padding-bottom,30);
  //        border-bottom: 1px dashed #eee;
  //       span{
  //         // display: block;
  //         .rem(font-size,24);
  //         .rem(padding-bottom,15);
          
  //       }
  //       strong{
  //         float: right;
  //         .rem(font-size,32);
  //         color: #445779;
  //         font-family: Impact;
  //         font-weight: normal;
  //         &.red{
  //           color: #FF513D;
  //         }

  //       }
  //     }
  //   }
  // }

</style>
