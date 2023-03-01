<template>
    <header class="home-header clearfix" id="home-header" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback()" class="back-icon"></div>
        <span >{{$t('gameReport.text[1]')}}</span>
        <span class="mess fr date-icon" @click="calendarBox = true">
            <img v-if="$st.state.skin==5" src="../assets/images/skin/golden/date.png" alt="">
            <img v-else src="../assets/images/extend/date-icon.png" alt="">
        </span>
        <div class="calendar-box" v-show="calendarBox">
            <div class="zhezhao" @click="calendarBox = false"></div>
            <div class="change-value clearfix" :class="$st.state.skin==5?'change-value-golden':''">
                <span class="fl">
                  <i @click="[showDateOne = !showDateOne,showDateTwo = false]">{{dateOne}} <em :class="showDateOne == false ? 'down-icon' : ''"></em></i> 
                  --
                  <i @click="[showDateTwo = !showDateTwo,showDateOne = false]">{{dateTwo}} <em :class="showDateTwo == false ? 'down-icon' : ''"></em> </i>
                </span>
                <span class="val-btn fr" @click="dateSearch()">{{$t('gameReport.text[0]')}}</span>
            </div>
            <inline-calendar
                ref="calendar"
                v-if="showDateOne"
                @on-change="onChangeDate2()"
                class="inline-calendar-demo"
                :show.sync="show"
                v-model="dateOne"
                :range="range"
                :start-date="dateTherr"
                disable-future
                :return-six-rows="return6Rows">
            </inline-calendar>
            <inline-calendar
                ref="calendar"
                v-if="showDateTwo"
                @on-change="onChangeDate3()"
                class="inline-calendar-demo"
                :show.sync="show"
                v-model="dateTwo"
                :start-date="dateOne"
                disable-future
                :range="range"
                :return-six-rows="return6Rows">
            </inline-calendar>
        </div>
       

    </header>
</template>

<script>
  import { Calendar,InlineCalendar } from 'vux';
    export default {
        name: "header_extend",
        data(){
          return{
              readonly:false,
              dateOne:'',
              dateTwo:'',
              show: true,
              range: false,
              return6Rows: true,
              value:'',
              calendarBox:false,
              showDateOne:false,
              showDateTwo:false,
              dateTherr:'2000-01-01',//三个月前
    
          }
        },
        created(){
            let time = new Date();
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            m = m >= 10 ? m : "0" + m;
            d = d >= 10 ? d : "0" + d;
            let m1 = (m-0) - 3;
            // m1 = m1 >= 10 ? m1 : "0" + m1;
            if(m1 >= 10){
                m1 = m1
            }else if(m1 < 0){
                m1 = 12+(m1-0)
                y = y - 1;
                console.log(m1)
            }else{
                m1 = "0"+m1
            }
            this.dateOne =localStorage.getItem('st') ||( y + "-" + m + "-" + d);
            this.dateTwo = localStorage.getItem('et') || (y + "-" + m + "-" + d);
            this.dateTherr = y + "-" + m1 + "-" + d;
            // console.log(this.dateTherr)

        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            onChangeDate1(val){
              this.dateOne = val ;
            //   console.log(this.dateOne)
              
            } ,
            onChangeDate2(val){
            //  console.log(this.dateOne)
            } ,
            onChangeDate3(val){
              
            } ,
            dateSearch(){
                this.showDateTwo = false;
                this.showDateOne = false;
                // console.log(this.dateOne)
                // console.log(this.dateTwo)
                this.calendarBox = false;
                localStorage.setItem('st',this.dateOne);
                localStorage.setItem('et',this.dateTwo);
                this.$emit('func', {st:this.dateOne,et:this.dateTwo})
            }
        },
        components: {
            Calendar,InlineCalendar
        },

    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }

    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
        .search-icon {
            position: absolute;
            right: .3rem;
            width: 1.2rem;
            height: 1.2rem;
            display: inline-block;
            background: url("../assets/images/main/home_icon_07.png") no-repeat center right;
            background-size: 45%;
        }
        .date-icon{
            position: absolute;
            display: inline-block;
            .rem(width,40);
            .rem(height,40);
            right: .3rem;
            top: .1rem;
        }
    }
.inline-calendar-demo{
    // position: fixed;
    // bottom: 0;
    z-index: 501;
    position: relative;
}
.calendar-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    // background: rgba(0,0,0,0.3);
    z-index: 500;
   .change-value{
       background-color: #fff;
       margin-top: 1.2rem;
       .rem(padding,50);
       padding-top: 0;
       padding-bottom: 0;
       .rem(height,88);
       .rem(line-height,88);
       .rem(font-size,24);
       text-align: center;
       position: relative;
       z-index: 501;
       span{
           display: inline-block;
           text-align: center;
           &:nth-child(1){
               width: 80%;
           }
           &.val-btn{
               color: #fff;
               background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
               border-radius: 27px;
               .rem(width,110);
               .rem(height,54);
               text-align: center;
               .rem(line-height,54);
               .rem(margin-top,17);
           }
           i{
               display: inline-block;
               width: 46%;
               position: relative;
               font-family: "PingFang-SC-Medium";
               em{
                   position: absolute;
                   right: 5%;
                   top: 0.48rem;
                   .rem(width,24);
                   .rem(height,13);
                   background: url('../assets/images/extend/top-icon.png')no-repeat;
                   background-size: contain;
                   &.down-icon{
                       background: url('../assets/images/extend/down-icon.png')no-repeat;
                       background-size: contain;
                   }              
               }
           }
       }
       &.change-value-golden{
        background-color: #161C23;
        span{
            &.val-btn{
                background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                color: #A85100;

            }
        }
       }
   }
   .zhezhao{
       position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.3);
        z-index: 499;
   }
}

</style>