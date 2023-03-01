<template>
  <div class="CPGame">
    <headerDate v-on:func="selectDate"/>
     
     <div class="tab-title" :class="$st.state.skin==5?'tab-title-golden':''">
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='1'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='1'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='1'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='1'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='1'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='1'}]" @click="tabType(1)">{{$t('gameReportTitle[0]')}}</span>

      <span :class="[{'active':$st.state.skin ==0&&curIndex =='2'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='2'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='2'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='2'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='2'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='2'}]" @click="tabType(2)">{{$t('gameReportTitle[1]')}}
</span>
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='3'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='3'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='3'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='3'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='3'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='3'}]" @click="tabType(3)">{{$t('gameReportTitle[2]')}}</span>
    </div>
      <myScroll
              :bgColor="$st.state.skin==5?'161C23':'f5f7fa'"
              :bottom="0"
              :top="$st.state.skin==5?2.6:3"
              ref="scrollWrapper"
              :data="playList"
              >
          
          <div class="main-box" v-if="typeIndex==1" :class="$st.state.skin==5?'main-box-golden':''">
              <div class="item-box clearfix" v-for="(v,index) in lotteryList" :key="index">
                  <div class="title clearfix">
                <span class="fl">
                  <img class="fl-icon" v-lazy="v.lottery_icon" alt="">{{v.lottery_name}}
                </span>
                      <span class="fr" @click="seeDatail(v.lottery_id,1)">{{$t('CPGame[0]')}} <img class="fr-icon" src="../../assets/images/extend/right@2x.png" alt=""></span>
                  </div>
                  <div class="item">
                      <span>{{$t('CPGame[1]')}}</span>
                      <strong>{{v.count}}</strong>
                  </div>
                  <div class="item">
                      <span>{{$t('CPGame[2]')}}</span>
                      <strong>{{v.amount}}</strong>
                  </div>
                  <div class="item">
                      <span>{{$t('CPGame[3]')}}</span>
                      <strong class="red" :style="$st.state.skin==5?'color: #AB9B62;':''">{{v.prize}}</strong>
                  </div>
                  <div class="item">
                      <span>{{$t('CPGame[4]')}} ({{$t('moneyDw')}})</span>
                      <strong :class="v.profit>0?'red':''" :style="$st.state.skin==5?'color: #AB9B62;':''"><i v-if="v.profit>0">+</i>{{v.profit}}</strong>
                  </div>
              </div>
          </div>
          <div class="no-content" v-if="!lotteryList.length && !isLoading">
              <img src="../../assets/images/chat/zwtzjl-min.png" alt="">
              <p>no data</p>
          </div>
          <p class="loading-text" v-if="isLoading">{{$t('loadingText')}}...</p>
          <p class="bottom-line" v-if="lotteryList.length && lotteryList.length>10">{{$t('deadline')}}~~</p>
      </myScroll>

  </div>
</template>

<script>
    import myScroll from "../../components/myScroll";
    import headerDate from "../../components/header_date";
    import {fun_date} from "../../assets/js/public";
export default {
  name: "CPGame",
  data() {
    return {
        typeIndex:1,
        lotteryList:[],
        curIndex:1,
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
            console.log(this.st);
        console.log(this.et)
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
            this.getLotteryReport(s,e);
        },
        seeDatail(id,type){
            this.$router.push('/zdDetails/'+id+'/'+type);
        },
        async getLotteryReport(s,e){
            localStorage.setItem('st',this.st);
            localStorage.setItem('et',this.et);
            this.isLoading = true;
            let res = await this.$http.get('/api/guess/detailcount',{
                params:{
                  st:s || this.st,
                  et:e || this.et,
                  is_bl_play:1
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
        headerDate,myScroll
    },
    mounted() {
        //        到时候放App全局
        document.body.addEventListener(
            "touchmove",
            function(e) {
                e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
        );

        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        this.$refs.scrollWrapper.enable(); //启动滚动条
        this.$refs.scrollWrapper.disable(); //禁止滚动条
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
    .CPGame{
        min-height: 100%;
        /*height:667px;*/
        /*background: #f5f7fa;*/
    }
    .type-title{
        background: #fff;
        text-align: center;
        overflow: hidden;
        .rem(padding-left,190);
        >span{
            display: inline-block;
            .rem(width,190);
            .rem(height,64);
            .rem(line-height,64);
            .rem(font-size,32);
            text-align: center;
            
            border:1px solid #FF3232;
            float: left;
            &:first-of-type{
                -webkit-border-radius: 0.1rem 0 0 0.1rem;
                -moz-border-radius: 0.1rem 0 0 0.1rem;
                border-radius: 0.1rem 0 0 0.1rem;
                border-right:0;
                &.active{
                    color: #fff;
                    background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                    border-radius: 0.1rem 0 0 0.1rem;
                }
            }
            &:last-of-type{
                -webkit-border-radius: 0 0.1rem 0.1rem 0;
                -moz-border-radius: 0 0.1rem 0.1rem 0;
                border-radius: 0 0.1rem 0.1rem 0;
                border-left:0;
                &.active{
                    color: #fff;
                    background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                    border-radius: 0 0.1rem 0.1rem 0;
                }
            }

        }
    }
    

</style>
