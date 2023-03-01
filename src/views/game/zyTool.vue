<template>
    <div class="zyTool-container">
        <header>
            <div class="back-icon" @click="$router.go(-1)"></div>
            <h3>助赢工具</h3>
        </header>
        <!--助赢工具-->
        <div class="tool-tab">
            <div class="tool-tab-content">
                <div class="tool-tab-item" v-if="LotteryIds!=5&&LotteryIds!=14" style="text-align: right;" :class="currItem==1?'active':''" @click="currItem=1">{{LotteryIds==8?'露珠':'露珠走势'}}</div>
                <div class="tool-tab-item" :class="currItem==2?'active':''" @click="currItem=2">历史开奖</div>
                <div class="tool-tab-item" style="text-align: left;" :class="currItem==3?'active':''" @click="currItem=3">玩法规则</div>
            </div>
            
        </div>
        <!--  露珠走势-->
        <div class="tool-lz-container" v-if="currItem==1">
            <lz :LotteryId="LotteryIds" :top="LotteryIds==8?3.2:4.2" :topNav="2.7"/>
        </div>
        <!--        历史开奖-->
        <div class="tool-kj-container" v-if="currItem==2">
            <kj :LotteryId="LotteryIds" :top="4.1" :topNav="2.7"/>
        </div>
        <!--        玩法规则-->
        <div class="tool-rule-container" v-if="currItem==3">
            <rule :LotteryId="LotteryIds" :top="5" :topNav="2.7" :topNav2="4"/>
        </div>
    </div>
</template>

<script>
    import lz from '../../components/jcTools/lz.vue'
    import kj from '../../components/jcTools/kj.vue'
    import rule from '../../components/jcTools/rule.vue'
    export default {
        name: "jcTool",
        data(){
            return{
                currItem:0,
                LotteryIds:7
            }
        },
        created(){
            this.LotteryIds = this.$route.params.id-0;
            this.currItem=this.LotteryIds==5||this.LotteryIds==14?2:1;
        },
        components:{
            lz,kj,rule
        },
        methods:{
            closeTool(){
                this.$emit('closeFunc',12)
            }
        },
    }
</script>

<style scoped lang="less">
    .zyTool-container{
        header{
            text-align: center;
            line-height: 1.2rem;
            position: relative;
            .back-icon{
                position: absolute;
                width: 1rem;
                height: 1.2rem;
                left: .3rem;
                top:0;
                background: url("../../assets/images/chat/fanhui.png") center left;
                background-size: 25%;
                background-repeat: no-repeat;
            }
        }
    }
    .tool-tab{
        background: #F5F7FA;
        overflow: hidden;
        padding-bottom: .3rem;
        position: absolute;
        width: 100%;
        top:1.2rem;
        z-index: 999;
       
        .back-icon{
            position: absolute;
            width: 1rem;
            height: 1.2rem;
            left: .6rem;
            top:0;
            background: url("../../assets/images/chat/fanhui.png") center left;
            background-size: 25%;
            background-repeat: no-repeat;
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
                
                // width: 33.33%;
                text-align: center;
                font-weight: 500;
                font-size: .38rem;
                float: left;
                &.active{
                    color: #3F8FFF;
                    font-weight: bold;
                }
            }
        }
       
    }
</style>