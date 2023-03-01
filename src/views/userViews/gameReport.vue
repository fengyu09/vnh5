<template>
  <div class="gameReport">
    <headerExtend/>
    <div class="tab-title" :class="skin==5?'tab-title-golden':''">
      <span :class="[{'active':skin ==0&&curIndex =='1'},{'skin-btn-pink':skin ==1&&curIndex =='1'},{'skin-btn-blue':skin ==2&&curIndex =='1'},{'skin-btn-green':skin ==3&&curIndex =='1'},{'skin-btn-maingreen':skin ==4&&curIndex =='1'},{'skin-btn-golden':skin ==5&&curIndex =='1'}]" @click="tabType(1)">{{$t('gameReportTitle[0]')}}</span>
      <span :class="[{'active':skin ==0&&curIndex =='2'},{'skin-btn-pink':skin ==1&&curIndex =='2'},{'skin-btn-blue':skin ==2&&curIndex =='2'},{'skin-btn-green':skin ==3&&curIndex =='2'},{'skin-btn-maingreen':skin ==4&&curIndex =='2'},{'skin-btn-golden':skin ==5&&curIndex =='2'}]" @click="tabType(2)">{{$t('gameReportTitle[1]')}}
</span>
      <span :class="[{'active':skin ==0&&curIndex =='3'},{'skin-btn-pink':skin ==1&&curIndex =='3'},{'skin-btn-blue':skin ==2&&curIndex =='3'},{'skin-btn-green':skin ==3&&curIndex =='3'},{'skin-btn-maingreen':skin ==4&&curIndex =='3'},{'skin-btn-golden':skin ==5&&curIndex =='3'}]" @click="tabType(3)">{{$t('gameReportTitle[2]')}}</span>
    </div>
        <myScroll
            :bgColor="skin==5?'161C23':'f5f7fa'"
            :bottom="0"
            :top="skin==5?2.6:3"
            ref="scrollWrapper"
            :data="playList"
            v-on:func="reLoad"
            :isUp="isUpFlag"
            >
    <div class="main-box" :class="skin==5?'main-box-golden':''">
       <div class="rtotal-box" :style="isPure==0?'':'margin-top:0;padding-top:0;'">
        <div class="total-money total-exchange clearfix" :style="isPure==0?'':'border-top:none'">
          <div class="clearfix">
            <span class="c9 xq-title fl">{{$t('gameReport.text[2]')}} ({{$t('moneyDw')}})</span>
            <span class="xz-money fr">{{gameReport.amount}}</span>
          </div>
          <div class="clearfix">
            <span class="c9 fl">{{$t('gameReport.text[3]')}}({{$t('moneyDw')}})</span>
            <span class="red fr" :style="skin==5?'color: #AB9B62;':''">{{gameReport.prize}}</span>
          </div>
          <div class="clearfix">
            <span class="c9 fl">{{$t('gameReport.text[4]')}} ({{$t('moneyDw')}})</span>
            <span :class="gameReport.profit>0?'red':''" class="fr" :style="skin==5?'color: #AB9B62;':''"><i v-if="gameReport.profit>0">+</i>{{gameReport.profit}}</span>
          </div>
        </div>
      </div> 
      <!-- 彩票游戏 -->
      <div class="item-box clearfix" v-if="lanCode!=2">
        <div class="title clearfix">
            <span class="fl">
              <img class="fl-icon" src="../../assets/images/extend/cpgame.png" alt="">{{$t('gameReport.text[5]')}}
            </span>
            <span class="fr" @click="details(1,1)">{{$t('gameReport.text[6]')}}<img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
        </div>
        <div class="item-box-one ">
          <div class="item clearfix">
            <span>{{$t('gameReport.text[7]')}}</span>
            <strong class="fr">{{lotteryReport.count?lotteryReport.count:0}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[8]')}}</span>
            <strong class="fr">{{lotteryReport.amount}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[9]')}}</span>
            <strong class="red fr" :style="skin==5?'color: #AB9B62;':''">{{lotteryReport.prize}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[10]')}} ({{$t('moneyDw')}})</span>
            <strong :class="lotteryReport.profit>0?'red':''" class="fr" :style="skin==5?'color: #AB9B62;':''"><i v-if="lotteryReport.profit>0">+</i>{{lotteryReport.profit}}</strong>
          </div>
        </div>
      </div>
      <!-- bbinSport -->
       <div class="item-box clearfix">
       <div class="title clearfix">
           <span class="fl">
             <img class="fl-icon" src="../../assets/images/extend/bbinsport.png" alt="">{{$t('gameReport.text[11]')}}
           </span>
         <span class="fr" @click="goDetails('bbin','sport')">{{$t('gameReport.text[6]')}}<img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
       </div>
       <div class="item-box-one clearfix">
         <div class="item clearfix">
           <span>{{$t('gameReport.text[7]')}}</span>
           <strong>{{bbinSport.count}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[8]')}}</span>
           <strong>{{bbinSport.amount}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[9]')}}</span>
           <strong class="red" :style="skin==5?'color: #AB9B62;':''">{{bbinSport.prize}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[10]')}} ({{$t('moneyDw')}})</span>
           <strong :class="bbinSport.profit>0?'red':''" :style="skin==5?'color: #AB9B62;':''"><i v-if="bbinSport.profit>0">+</i>{{bbinSport.profit}}</strong>
         </div>
       </div>
      </div>
      <!-- ae 电子 -->
       <div class="item-box clearfix">
       <div class="title clearfix">
           <span class="fl">
             <img class="fl-icon" src="../../assets/images/extend/ae.png" alt="">AE Electronics
           </span>
         <span class="fr" @click="goDetails('ae','slot')">{{$t('gameReport.text[6]')}}<img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
       </div>
       <div class="item-box-one clearfix">
         <div class="item clearfix">
           <span>{{$t('gameReport.text[7]')}}</span>
           <strong>{{aeSlot.count}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[8]')}}</span>
           <strong>{{aeSlot.amount}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[9]')}}</span>
           <strong class="red" :style="skin==5?'color: #AB9B62;':''">{{aeSlot.prize}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[10]')}} ({{$t('moneyDw')}})</span>
           <strong :class="aeSlot.profit>0?'red':''" :style="skin==5?'color: #AB9B62;':''"><i v-if="aeSlot.profit>0">+</i>{{aeSlot.profit}}</strong>
         </div>
       </div>
      </div>
      <!-- cq9 体育 -->
      <div class="item-box clearfix">
       <div class="title clearfix">
           <span class="fl">
             <img class="fl-icon" src="../../assets/images/extend/cq9sport.png" alt="">{{$t('gameReport.text[12]')}}
           </span>
         <span class="fr" @click="goDetails('cq9','sport')">{{$t('gameReport.text[6]')}}<img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
       </div>
       <div class="item-box-one clearfix">
         <div class="item clearfix">
           <span>{{$t('gameReport.text[7]')}}</span>
           <strong>{{cq9Sport.count}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[8]')}}</span>
           <strong>{{cq9Sport.amount}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[9]')}}</span>
           <strong class="red" :style="skin==5?'color: #AB9B62;':''">{{cq9Sport.prize}}</strong>
         </div>
         <div class="item clearfix">
           <span>{{$t('gameReport.text[10]')}} ({{$t('moneyDw')}})</span>
           <strong :class="cq9Sport.profit>0?'red':''" :style="skin==5?'color: #AB9B62;':''"><i v-if="cq9Sport.profit>0">+</i>{{cq9Sport.profit}}</strong>
         </div>
       </div>
      </div>
        <!-- 其他三方 -->
      <div class="item-box clearfix" v-for="v,index in allReport" :key="index">
        <div class="title clearfix">
            <span class="fl">
              <img class="fl-icon" v-lazy="v.icon" alt="">
              <!-- xổ số TCG   -->
              {{v.code|filterSfName(v.name,lanCode)}}
            </span>
            <span class="fr" @click="goDetails(v.code)">{{$t('gameReport.text[6]')}}<img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
        </div>
        <div class="item-box-one ">
          <div class="item clearfix">
            <span>{{$t('gameReport.text[7]')}}</span>
            <strong class="fr">{{v.count?v.count:0}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[8]')}}</span>
            <strong class="fr">{{v.amount}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[9]')}}</span>
            <strong class="red fr" :style="skin==5?'color: #AB9B62;':''">{{v.prize}}</strong>
          </div>
          <div class="item clearfix">
            <span>{{$t('gameReport.text[10]')}} ({{$t('moneyDw')}})</span>
            <strong :class="v.profit>0?'red':''" class="fr" :style="skin==5?'color: #AB9B62;':''"><i v-if="v.profit>0">+</i>{{v.profit}}</strong>
          </div>
        </div>
      </div>
     
     
     
    </div>
   </myScroll>
  </div>
</template>

<script>
    import headerExtend from "../../components/headerOne";
    import {fun_date} from "../../assets/js/public";
    import { mapState } from "vuex";
export default {
  name: "gameReport",
  data() {
    return {
        curIndex:1,
        gameReport:{},
        lotteryReport:{},
        bbinSport:{},
        cq9Sport:{},
        aeSlot:{},
        playList:{},
        isLoading:false,
        isLup: false, //是否显示 上拉加载更多的组件
        isUpFlag: false, //是否开启上拉加载更多 默认不开启
        st:'',
        et:'',
        allReport:[],
        allGames:[]
    };
  },
  computed: {
    ...mapState(['isPure',"skin","lanCode"])
  },
  created(){
    this.getGameList();
    this.getGameReport();//彩票+三方统计
    this.getbbinSportReport();
    this.getCq9SportReport();
    this.getaeSlotReport();
    if(this.lanCode!=2){
      this.getLotteryReport();//彩票游戏
    }
    
    
  },
  watch:{
   
  },
  filters:{
    filterSfName(code,name,lanCode){
      let n = ""
      if(code=='tcg'){
        if(lanCode==1){
          n = "xổ số TCG"
        }else if(lanCode==2||lanCode==5){
          n = "TCG Lottery"
        }
        
      }else if(code=='ae'||code=='ag'||code=='bbin'||code=='dg'||code=='allbet'||code=='ebet'||code=='ezu'||code=='ibo'||code=='sa'){
        n = name + ' ' +'Live'
      }else if(code=='mg'){
        n = 'MG Electronics'
      }else if(code=='jdb'){
        n = 'JDB Electronics'
      }else if(code=='ael'){
        n = 'AE Lottery'
      }else if(code=='sbo'||code=='cmd'||code=='ibc'){
        if(lanCode==1){
           n = name +' '+'Thể Thao'
        }else if(lanCode==2||lanCode==5){
           n = name +' '+'Sport'
        }
       
      }else {
        n = name;
      }
      return n;
    }
  },
    methods: {
      goDetails(code,type){
        if(type){
          this.$router.push('/gameCount?code='+code+'&gameType='+type)
        }else if(code=='ae'||code=='ag'||code=='bbin'||code=='dg'||code=='allbet'||code=='ebet'||code=='ezu'||code=='ibo'){
          this.$router.push('/gameCount?code='+code+'&gameType=live')
        }else if(code=='sbo'||code=='cmd'||code=='sa'){
          this.$router.push('/gameCount?code='+code+'&gameType=sport')
        }else if(code=='mg'||code=='jdb'){
          this.$router.push('/gameCount?code='+code+'&gameType=slot')
        }else {
          this.$router.push('/gameCount?code='+code)
        }
        localStorage.setItem('st',this.st);
        localStorage.setItem('et',this.et);
        
      },
      getGameList(){
          this.$http.get("/api/vendor/index").then(res=>{
              if(res && res.data.code==1){
                this.allGames = res.data.data || [];
                this.getAllGameReport();
              }
          })
        },
        async getAllGameReport(s,e){
          let arr = [];
           this.allGames.forEach(c=>{
             let t ;
             if(c.code=='bbin'||c.code=='ae'){
               t = 'live';
             }
                this.$http.get('/api/vendors.'+c.code+'/count',{
                  params:{
                    st:s,
                    et:e,
                    game_type:t
                  }
                }).then(res=>{
                   if (res && res.data.code == 1) {
                     let obj = {};
                     obj = res.data.data;
                     obj.code = c.code;
                     obj.name = c.name;
                     obj.icon = c.icon;
                    arr.push(obj);
                  }
                });
                
          })
          this.allReport = arr;
      },
        tabType: function (index) {
            this.curIndex = index;
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
            this.getAllGameReport(s,e);
            this.getbbinSportReport(s,e);
            this.getCq9SportReport(s,e);
            this.getaeSlotReport(s,e);
            this.getGameReport(s,e);
            if(this.lanCode!=2){
              this.getLotteryReport(s,e);
            }
            
            
        },
        details:function (type,id) {
          if(type==1){
            this.$router.push("CPGame");
          }
          
          localStorage.setItem('st',this.st);
          localStorage.setItem('et',this.et);
        },
      async getGameReport(s,e){
        let res = await this.$http.get('/api/user/count',{
          params:{
            st:s,
            et:e
          }
        });
        if(res && res.data.code == 1){
          this.gameReport= res.data.data;
        }
      },
      async getLotteryReport(s,e){
        let res = await this.$http.get('/api/guess/count',{
            params:{
                st:s,
                et:e
            }
        });
        if(res && res.data.code == 1){
          this.lotteryReport= res.data.data;
          // this.playList.lotteryReport = this.lotteryReport;

        }
      },
     
      async getbbinSportReport(s,e){
        let res = await this.$http.get('/api/vendors.bbin/count',{
          params:{
            st:s,
            et:e,
            game_type:'sport'
          }
        });
        if(res && res.data.code == 1){
          this.bbinSport =  res.data.data;
          // this.playList.lotteryReport = this.lotteryReport;
        }
      },
      async getCq9SportReport(s,e){
        let res = await this.$http.get('/api/vendors.cq9/count',{
          params:{
            st:s,
            et:e,
            game_type:'sport'
          }
        });
        if(res && res.data.code == 1){
          this.cq9Sport =  res.data.data;
          // this.playList.lotteryReport = this.lotteryReport;
        }
      },
      async getaeSlotReport(s,e){
        let res = await this.$http.get('/api/vendors.ae/count',{
          params:{
            st:s,
            et:e,
            game_type:'slot'
          }
        });
        if(res && res.data.code == 1){
          this.aeSlot =  res.data.data;
        }
      },
      
      reLoad(data,obj) {
        if (data == "down") {
        } else if (data == "up") {
        }else if(data=='end'){
            obj.name = this.$route.name;
            this.$store.commit('SETPOSITIONY',obj);
        }
      },
      
    },
    components: {
        headerExtend,
        
    },
    mounted(){
      setTimeout(()=>{
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
            },20)
    }
};
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
  .home-header{
    background: #fff;
  }
  .gameReport{
    min-height: 100%;
    height:667px;
    background: #f5f7fa;
  }
  .tab-title{
    .rem(height,110);
    background: #fff;
    overflow: hidden;
    span{
      .rem(width,210);
      .rem(height,64);
      .rem(line-height,64);
      .rem(font-size,28);
      text-align: center;
      // color: #445779;
      float: left;
      background: #f5f7fa;
      .rem(border-radius,30);
      .rem(margin-left,30);
      .rem(margin-top,16);
      &.active{
        color: #fff;
        // background: url("../../assets/images/extend/tab-bg.png") no-repeat;
        // background-size: 100% 100%;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      }
      &.skin-btn-pink,&.skin-btn-blue,&.skin-btn-green{
        color: #fff;
      }
    }
    &.tab-title-golden{
      background: #1F252C;
      span{
        background: #464B53;
        color: #CECECE;
      }
    }
  }
  .main-box{
    .rem(width,710);
    margin: 0 auto;
    .rtotal-box{
      // .rem(margin-top,20);
      background: #fff;
      overflow: hidden;
      .rem(padding-left,30);
      .rem(padding-right,30);
      // .rem(padding-top,40);
      .rem(border-radius,10);
      .total-money{
        .rem(padding-bottom,40);
      }
      .total-exchange{
        .rem(padding-top,40);
        // border-top: 1px dashed #eee;
      }
      >div>div{
        // width: 33.33%;
        padding: .3rem 0;
        border-bottom: 1px dashed #eee;
        &:last-of-type{
          border-bottom:none;
          padding: .3rem 0 0 0;
          // text-align: right;
          
        }
        span{
          // display: block;
          // font-family: 'Impact';
          /*font-weight: bold;*/
          .rem(font-size,36);
        }
        .xz-money{
          /*padding-left: .8rem;*/
          text-align: center;
        }
        .xz-title{
            background: url("../../assets/images/extend/z.png") left center no-repeat;
            background-size: contain;
            padding-left: .5rem;
        }
        .xq-title{
              background: url("../../assets/images/extend/Frame.png") left center no-repeat;
              background-size: 8%;
              padding-left: .5rem;
        }
        .c9{
          .rem(font-size,24);
          // color: #9999;
          font-weight: normal;
          /*text-align: center;*/
          .rem(margin-bottom,10);
        }
        .red{
          color: #FF513D;
        }
      }

    }
    .item-box{
      .rem(padding-left,30);
      .rem(padding-right,30);
      .rem(margin-top,20);
      .rem(border-radius,10);
      background: #fff;
      .item-box-one{
        border-top:1px solid #EDEDED;
        >div{
          span{
            color: #445779;
          }
          strong{
           float:right;
          }
        }
      }
      .title{
        .rem(line-height,86);
        color: #445779;
        .fl{
          font-weight: bold;
          .rem(font-size,28);
          .fl-icon{
            .rem(width,32);
            .rem(height,28);
            .rem(margin-right,10);
            .rem(margin-top,29);
            float: left;
          }
        }
        .fr{
          .rem(font-size,24);
          .fr-icon{
            .rem(width,12);
            .rem(height,21);
            .rem(margin-left,10);
            .rem(margin-top,32);
            float: right;
          }
        }

      }
      .item{
        // width: 25%;
        // text-align: center;
        .rem(padding-top,30);
        .rem(padding-bottom,30);
        border-bottom: 1px dashed #eee;
        &:last-of-type{
          border-bottom:none;
          
        }
        span{
          // display: block;
          .rem(font-size,24);
          .rem(padding-bottom,15);
          // 
        }
        strong{
          .rem(font-size,32);
          color: #445779;
          // font-family:'Impact';
          font-weight: normal;
          &.red{
            color: #FF513D;
          }

        }
      }
    }
    &.main-box-golden{
      .rtotal-box{
        background: #464B53;
        >div{
          color: #CECECE;
          >div{
            border-bottom: 1px dashed #5C564D;
            span{
              
            }
          }
        }
      }
      .item-box{
        background: #464B53;
        
        .title{
          color: #CECECE;
          border-bottom: 1px solid #5C564D;
          .fr{
            color: #928151;
          }
        }
        .item-box-one {
          border-top: 1px solid #5C564D;
          >div{
            span{
              color: #CECECE;
            }
          }
        }
        .item{
          border-bottom: 1px dashed #5C564D;
          strong{
            color: #CECECE;
          }
          
        }
      }
    }
  }

</style>
