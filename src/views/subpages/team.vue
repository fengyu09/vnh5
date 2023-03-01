<template>
  <div class="team clearfix" id="team" :class="$st.state.skin==5?'team-golden':''">
    <headerExtend/>
    <ul  class="top-box">
      <p class="new-icon" :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':$st.state.skin==4},{'skin-btn-golden':$st.state.skin==5}]">{{$t('team[1]')}}</p>
      <li>
        <strong>{{lastMsg.invitee_num}}</strong>
        <p>{{$t('team[2]')}}</p>
      </li>
      <li>
        <strong>{{lastMsg.recharge}}</strong>
        <p>{{$t('team[3]')}}</p>
      </li>
      <li>
        <strong>{{lastMsg.brokerage}}</strong>
        <p>{{$t('team[4]')}}</p>
      </li>
    </ul>
    <div class="main-box">
      <div class="date clearfix">
       
        <calendar class="date-input fl" :start-date="dateSix"  :readonly="readonly" @on-change="onChangeDate1" v-model="dateOne" :title="dateOne"  disable-future placeholder="placeholder"></calendar>
        <span class="fl">{{$t('team[5]')}}</span> 
        <calendar class="date-input fl" :start-date="dateOne"  :readonly="readonly"  @on-change="onChangeDate2" v-model="dateTwo" :title="dateTwo"  disable-future placeholder="placeholder" ></calendar>
        
        <button class="inquire fl" @click="getTeam(true)" :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':$st.state.skin==4},{'skin-btn-golden':$st.state.skin==5}]">{{$t('team[6]')}}</button>
      </div>
      <ul class="list">
        <li @click="goRegMember">
<!--        <li>-->
          <span class="fl">{{$t('team[7]')}}</span>
          <i class="next-icon"><img src="../../assets/images/enter-seeding.png" alt=""></i>
          <span class="fr num">{{teamMsg.reg_num}}</span>

        </li>
        <li>
          <span class="fl">{{$t('team[8]')}}</span>
          <span class="fr num">{{teamMsg.recharge_user_num}}</span>
        </li>
        <!-- <li>
          <span class="fl">Số tiền trao đổi</span>
          <span class="fr num">{{teamMsg.exchange}}</span>
        </li> -->
        <li>
          <span class="fl">{{$t('team[9]')}}</span>
          <span class="fr num">{{teamMsg.recharge}}</span>
        </li>
        <li>
          <span class="fl">{{$t('team[10]')}}</span>
          <span class="fr num">{{teamMsg.brokerage}}</span>
        </li>
        <li>
          <span class="fl">{{$t('team[11]')}}</span>
          <span class="fr num">{{teamMsg.sub_brokerage}}</span>
        </li>
      </ul>
    </div>
    <footerExtend/>
  </div>
</template>

<script>
  import footerExtend from "../../components/footer_extend";
  import headerExtend from "../../components/header_extend";
  import { Calendar,Datetime  } from 'vux';
export default {
  name: "team",
  data() {
    return {
      teamMsg:{},
      lastMsg:{},
      readonly: false,
      dateOne: 'TODAY',
      dateTwo: 'TODAY',
      dateTherr: '',
      dateFour:'',//当前时间
      dateFive:'',
      dateSix:'',//Ba tháng前
    };
  },
  components: {
      footerExtend,headerExtend,Calendar,Datetime 
  },
  created(){
    this.getTeam();
    this.getLast();
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    m = m >= 10 ? m : "0" + m;
    d = d >= 10 ? d : "0" + d;
    let m1 = m - 3;
    m1 = m1 >= 10 ? m1 : "0" + m1;
    this.dateFour = y + "-" + m + "-" + d;
    this.dateFive = y + "-" + m + "-" + d;
    this.dateTherr = y + "-" + m + "-" + d;
    this.dateSix = y + "-" + m1 + "-" + d;
  },
  methods:{
    goRegMember(){
      localStorage.setItem('regSt',this.dateOne);
      localStorage.setItem('regEd',this.dateTwo);
      this.$router.push('/regMember');
    },
    async getTeam(flag){
      if(flag) this.$vux.loading.show({text:this.$t('searchReport[4]')});
      // let res = await this.$http.get('/api2/market/team-count',{
      let res = await this.$http.get('/api/market/teamcount',{
        params:{
          st:this.dateOne,
          et:this.dateTwo
        }
      });
      this.$vux.loading.hide();
      if(res && res.data.code == 1){
        this.teamMsg= res.data.data;
      }
    },
    async getLast(){
      // let res = await this.$http.get('/api2/market/latest-count',{
      let res = await this.$http.get('/api/market/latestcount',{
        params:{
          range:0
        }
      });
      if(res && res.data.code == 1){
        this.lastMsg= res.data.data;
      }
    },
    //日历模板
    onChangeDate1(val) {
      this.dateOne = val
    },
    onChangeDate2(val) {
      this.dateTwo = val
    },
    //范围模板
    onChangeDate3(val) {
      this.dateTherr = val
    },
    onChangeDate4(val) {
      this.dateFive = val;
    },
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
  .team{
    min-height: 100%;
    height:100vh;
    background: #f5f7fa;
  }
  .top-box{
    .rem(height,192);
    background: #fff;
    overflow: hidden;
    .new-icon{
      .rem(width,200);
      .rem(height,40);
      .rem(line-height,40);
      .rem(margin-left,10);
      color: #fff;
      text-align: center;
      border-radius: .1rem .1rem .1rem 0;
      background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
      // background-size: 100% 100%;
    }
    li{
      width: 33.333%;
      text-align: center;
      float: left;
      strong{
        display: block;
        font-family: 'DIN-Bold';
        color: #445779;
        .rem(font-size,42);
        .rem(margin-top,15);
      }
      p{
        .rem(font-size,24);
        // 
        .rem(margin-top,5);
      }
    }
  }
  .main-box{
    .rem(width,710);
    margin: 0 auto;
    background: #fff;
    .rem(border-radius,10);
    .rem(margin-top,20);
    .date{
      .rem(height,120);
      .rem(font-size,24);
      border-bottom: 1px solid #EDEDED;
      .rem(padding-left,30);
      .rem(padding-top,30);
      
      span{
        .rem(line-height,60);
      }
      .date-input{
        .rem(width,200);
        .rem(height,60);
        .rem(border-radius,30);
        .rem(font-size,24);
        .rem(line-height,60);
        color: #445779;
        text-align: center;
        background: #F5F7F9;
        &:first-of-type{
          .rem(margin-right,20);
        }
        &:last-of-type{
          .rem(margin-left,20);
        }
      }
      .inquire{
        .rem(width,120);
        .rem(height,60);
        .rem(border-radius,30);
        color: #fff;
        background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
        border:none;
        .rem(margin-left,40);
      }
    }
    .list{
      font-family: 'DIN-Bold';
      .rem(font-size,28);
      
      .rem(padding-left,40);
      .rem(padding-right,40);
      li{
        .rem(height,100);
        .rem(line-height,100);
        border-bottom: 1px dotted #EDEDED;
        position: relative;
        &:last-of-type{
          border-bottom: none;
        }
        .num{
          .rem(font-size,32);
          color: #445779;
          margin-right: .3rem;
        }
        .next-icon{
          .rem(width,28);
          .rem(height,40);
          position: absolute;
          right: -.2rem;
          top:.15rem

        }
      }

    }
  }
  .team-golden{
    color: #E3CF95!important;
    background: #161C23!important;
    .top-box{
      background: #464B53!important;
      strong{
        color: #CECECE!important;
      }
      li{
      p{
        color: #E3CF95!important;
        }
      }
     
    .huiColor{
      color: #E3CF95!important;
    }
    }
    .main-box{
      background: none!important;
      .date{
        border-bottom: 1px dotted  #5C564D!important;
        color: #CECECE!important;
        .date-input{
          background: #F5F7F9!important;
          color: #999!important;
          opacity: 0.5!important;
          
        }
      }
      ul{
        li{
          border-bottom: 1px dotted  #5C564D!important;
          .num{
             color: #CECECE!important;
          }
        }
      }
    }
  }
</style>
