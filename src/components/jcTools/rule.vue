<template>
    <div>
    <div class="header" v-if="$route.name=='rule'">
            <div @click="$router.go(-1);">
                <i class="go-back"></i>
            </div>
            <div>
                <h3>玩法规则</h3>
            </div>
    </div>
        <ul class="rule-type" :style="'top:'+topNav+'rem'">
            <li v-for="(item,index) in ruleData" :key="index" :class="currIndex==index?'active':''" @click="currIndex=index">{{item.play_rule_type_name}}</li>
        </ul>
        <div class="rule-content">
            <div class="lottery-type"  v-if="ruleData.length" :style="'top:'+topNav2+'rem'">
                <!-- <myScrollX v-if="ruleData[currIndex].play_rule_type_data.length">
                    <div ref="personTab">
                        <span v-for="(item,indexType) in ruleData[currIndex].play_rule_type_data" :key="indexType" :class="currLotteryIndex==indexType?'active':''" @click="currLotteryIndex=indexType">{{item.play_rule_lottery_name}}</span>
                    </div>
                </myScrollX> -->
                <!-- <myScrollX v-if="ruleData[currIndex].play_rule_type_data.length">
                    <div ref="personTab">
                        <span v-for="(item,indexType) in ruleData[currIndex].play_rule_type_data" :key="indexType" :class="currLotteryIndex==indexType?'active':''"  @click="currLotteryIndex=indexType">{{item.play_rule_lottery_name}}</span>
                    </div>
                </myScrollX> -->
                <myScrollX>
            <ul ref="personTab" id="allTab">
                <!-- :style="{borderRight:currLotteryIndex==0&&indexType==1?'1px solid':'none',borderLeft:currLotteryIndex==2&&indexType==1?'1px solid':'none'}" -->
                <li v-for="(item,indexType) in ruleData[currIndex].play_rule_type_data" :key="indexType" :class="currLotteryIndex==indexType?'active':''"  @click="currLotteryIndex=indexType">{{item.play_rule_lottery_name}}</li>
            </ul>
            </myScrollX>
            </div>
            <myScroll
                    ref="scrollWrapper"
                    :data="playList"
                    :probeType="2"
                    :top="top"
                    :bottom="0"
                    :left="0"
                    :zIndex="999"
                    class="scroll-item"
            >
                <div class="lottery-rule" v-if="ruleData.length" v-html="ruleData[currIndex].play_rule_type_data[currLotteryIndex].play_rule_content">
                </div>

            </myScroll>

        </div>
    </div>
</template>

<script>
    import myScrollX from "../myScrollX.vue";
    import myScroll from "../myScroll.vue";
    export default {
        name: "rule",
        data(){
            return{
                ruleData:[],
                currIndex:0,
                currLotteryIndex:0,
                currAllType:[],
                playList:{},
                top1:8.2,
                top2:9.6,
                top3:10.6,
                tops:'',
            }
        },
        created(){
          this.getRule();
         if(this.$route.name=="rule"){
             this.topNav=1.4
             this.topNav2=2.8
             this.top=3.8
            // this.tops = 3.8;
         }
        
            // if(this.isHideVideo){
            //     this.top1 = 2.95
            //     this.top2 = 4.3
            //     this.top3 = 5.3
            //
            // }else{
            //     this.top1 = 8.2
            //     this.top2 = 9.6
            //     this.top3 = 10.6
            // }
        },
        watch:{
          "currIndex":function () {
              this.currLotteryIndex = 0;
              this.currAllType = this.ruleData[this.currIndex].play_rule_type_data;
              this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
               console.log(this.currAllType)
          },
            "currAllType":function () {
                this.$nextTick(() => {
                    this.ScrollX();
                });
            },
            'currLotteryIndex':function () {
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            }
        },
        methods:{
            async getRule(){
                let res = await this.$http.get('/forum/guess/play_rule');
                console.log(res.data.data);
                this.ruleData = res.data.data
                if(this.$route.name=="rule"){
                    this.ruleData.forEach((item,index)=>{
                      let ruleId = item.play_rule_type_data.findIndex((item2,index2)=>{
                           return item2.play_rule_lottery_id==this.$route.query.lottery_id
                    })
                    if(ruleId!=-1){
                        this.currIndex=index
                        this.currLotteryIndex=ruleId
                    }
                    })
                    
                    
                }
                this.currAllType = this.ruleData[0].play_rule_type_data;
                console.log(this.currAllType)
            },
            ScrollX() {
                //  let allLi = document.querySelectorAll("#allTab li");
                //  console.log(allLi)
                //     let sum = 0;
                //     for (var i = 0; i < allLi.length; i++) {
                //         sum += allLi[i].offsetWidth;
                //         // console.log(allLi[i].offsetWidth);
                //         // console.log(sum)
                //     }
                // let width = sum + this.currAllType.length *5;
                let width = this.currAllType.length * 2.40;
                this.$refs.personTab.style.width = width + "rem";
            },
        },
        components:{
            myScroll,myScrollX
        },
        props:{
            LotteryId:{
                type:Number,
                default:1
            },
            // isHideVideo:{
            //     type:Boolean,
            //     default:false
            // },
            top:{
                type:Number,
                default:10.6
            },
            topNav:{
                type:Number,
                default:8.2
            },
            topNav2:{
                type:Number,
                default:9.6
            }
        }

    }
</script>

<style scoped lang="less">
.header{
        display: flex;
        background: #fff;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.346rem;
        .go-back{display: block;width: 0.26rem;height:0.48rem;background: url('../../assets/images/gray-back-icon.png') no-repeat;background-size: cover;}
        h3{font-weight: 550;font-size: 0.45rem;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        }
    }
    .rule-type{
        overflow: hidden;
        position: absolute;
        width: 100%;
        // top:8.2rem;
         background: #fff;
         border-bottom: 1px solid #eee;
        >li{
            float: left;
            width: 20%;
            text-align: center;
            font-size: .38rem;
            color: #71819D;
            font-weight: 500;
            padding: .3rem;
            // margin-bottom: .3rem;
            
            &.active{
                color: #1486FF;
                font-weight: bold;
                position: relative;
                &:after{
                    content: '';
                    position: absolute;
                    height: 0.08rem;
                    width: 0.6rem;
                    left: 50%;
                    bottom: 0;
                    transform: translateX(-50%);
                    background: #1486FF;
                    border-radius: 5px;
                }
            }
        }
    }
    .lottery-type{
        overflow: hidden;
        // border-bottom: 1px solid #eee;
        // padding: 0 0 .3rem .3rem;
        position: absolute;
        width: 100%;
        // top:9.6rem;
        background: #fff;
        z-index: 999;
        text-align: center;
        ul{
            display: inline-block;
            // background: linear-gradient(90deg, #FF403B 0%, #FF7F66 100%);
            border-radius: 0.12rem;
            padding: 1px;
            padding-left: 0.2rem;
            li{
                padding: 0.2rem 0.1rem;
                float: left;
                color: #445779;
                font-size: 0.32rem;
                width: 2rem;
                background: #F6F7FB;
                border-radius: 100px;
                 margin-right: 0.275rem;
                // &:nth-child(2){
                //     border-right: 1px solid #fff;
                // }
                //  &:nth-child(2){
                //     border-left: 1px solid #fff;
                // }
            }
            .active{
                background: #DCE8FB;
                color: #1486FF;
                border-radius: 100px;
                border: none;
            }
        }
        span{
            float: left;
            padding: 0 0.54rem;
            background: #f5f7fa;
            border-radius: 100px;
            height: 0.67rem;
            line-height: 0.67rem;
            margin-right: 0.275rem;
            font-size: 0.32rem;
            &.active{
                color: #1486FF;
                background: #ffece8;
            }
        }
    }
    .lottery-rule{
        padding: .3rem;
    }
</style>

