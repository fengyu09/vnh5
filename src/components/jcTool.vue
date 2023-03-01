<template>
    <div>
        <!--助赢工具-->
        <div class="tool-tab" :style="'top:'+top1+'rem'">
            <div class="back-icon" @click="closeTool"></div>
            <div class="tool-tab-content">

                <div class="tool-tab-item" v-if="LotteryId!=8&&LotteryId!=14&&LotteryId!=5" style="text-align: right;" :class="currItem==1?'active':''" @click="currItem=1">露珠走势</div>
                <div class="tool-tab-item" v-if="LotteryId==8" style="text-align: right;" :class="currItem==1?'active':''" @click="currItem=1">露珠</div>
                <div class="tool-tab-item" :class="currItem==2?'active':''" @click="currItem=2">历史开奖</div>
                <div class="tool-tab-item" style="text-align: left;" :class="currItem==3?'active':''" @click="currItem=3">玩法规则</div>

            </div>
           
        </div>
        <!--  露珠走势-->
        <div class="tool-lz-container" v-if="currItem==1">
            <lz :LotteryId="LotteryId" :top="isHideVideo?4.2:topLhc" :topNav="isHideVideo?2.75:8"/>
        </div>
        <!--        历史开奖-->
        <div class="tool-kj-container"  v-if="currItem==2">
            <kj :LotteryId="LotteryId" :top="isHideVideo?4.3:9.6" :topNav="isHideVideo?2.9:8.15"/>
        </div>
        <!--        玩法规则-->
        <div class="tool-rule-container" v-if="currItem==3">
            <rule :LotteryId="LotteryId" :top="isHideVideo?5.3:10.6" :topNav="isHideVideo?2.95:8.2" :topNav2="isHideVideo?4.3:9.6"/>
        </div>
    </div>
</template>

<script>
    import lz from '../components/jcTools/lz.vue'
    import kj from '../components/jcTools/kj.vue'
    import rule from '../components/jcTools/rule.vue'
    export default {
        name: "jcTool",
        data(){
            return{
                currItem:1,
                LotteryId:7,
                top1:6.7,
                topLhc:3.2
                // top2:8,
                // top3:9
            }
        },
        created(){
            // console.log(22222,this.valueId);
            this.LotteryId = this.valueId;
            if(this.LotteryId==8){
                this.topLhc = 8.5;
            }else{
                this.topLhc = 9.5;
            }
            // console.log(this.isHideVideo)
            if(this.isHideVideo){
                this.top1 = 1.45
            }else{
                this.top1 = 6.7
            }

            if(this.LotteryId==14||this.LotteryId==5){
                this.currItem = 2;
            }else{
                this.currItem = 1;
            }

        },
        components:{
            lz,kj,rule
        },
        methods:{
            closeTool(){
                this.$emit('closeFunc',12)
            }
        },
        props:{
             valueId:{
                type:Number,
                default:1
            },
            isHideVideo:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped lang="less">
.tool-tab{
    background: #F5F7FA;
    overflow: hidden;
    padding-bottom: .3rem;
    position: absolute;
    width: 100%;
    // top:6.7rem;
    z-index: 999;
    .back-icon{
        position: absolute;
        width: 1rem;
        height: 1.2rem;
        left: .4rem;
        top:0;
        background: url("../assets/images/chat/fanhui.png") center left;
        background-size: 25%;
        background-repeat: no-repeat;
        z-index: 1;
    }
    .tool-tab-content{
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        width: 100%;
         >.tool-tab-item{
            padding: .35rem 0;
            background: #fff;
            text-align: center;
            font-weight: 500;
            font-size: .38rem;
            float: left;
            color:#445779;
            &.active{
                color: #3F8FFF;
                font-weight: bold;
            }
        }
    }
   
}
</style>