<template>
    <div class="kyqp-container">
        <header class="home-header clearfix">
            <div @click="goback()" class="back-icon"></div>
            <span>Trò chơi xổ số</span>
            <!-- <router-link to='/kLotteryOne'>开奖中心</router-link> -->

        </header>
        <myScroll :top="1.5" :bottom="0">
            <div class="yn-game-container" v-for="(v,key) in lotteryArr" :key="key">
                <div class="title"  :key="key"><i></i>{{key}}</div>
                <ul>
                    <li v-for="(item,index1) in v" :key="index1" @click="goxz(item.lottery_id,item.vname,item.remark)">
                        <div class="lottery-img">
                            <!-- <img src="../../assets/images/ynxz/11.png" alt=""> -->
                            <img v-lazy="item.logo_url" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>{{item.vname}}</h5>
                            <p>{{item.remark}}</p>
                        </div>
                    </li>
                    <!-- <li @click="goxz(1)">
                        <div class="lottery-img">
                            <img src="../../assets/images/ynxz/11.png" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>Miền Bắc</h5>
                            <p>mở thưởng hàngngày</p>
                        </div>
                    </li> -->
                    <!-- <li @click="goxz(1)">
                        <div class="lottery-img">
                            <img src="../../assets/images/ynxz/11.png" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>Miền Bắc</h5>
                            <p>mở thưởng hàngngày</p>
                        </div>
                    </li> -->
                </ul>
            </div>
            <!-- <div class="yn-game-container">
                <div class="title"><i></i>Miền Bắc</div>
                <ul>
                    <li @click="goxz(1)">
                        <div class="lottery-img">
                            <img src="../../assets/images/ynxz/11.png" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>Miền Bắc</h5>
                            <p>mở thưởng hàngngày</p>
                        </div>
                    </li>
                    <li @click="goxz(1)">
                        <div class="lottery-img">
                            <img src="../../assets/images/ynxz/11.png" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>Miền Bắc</h5>
                            <p>mở thưởng hàngngày</p>
                        </div>
                    </li>
                    <li @click="goxz(1)">
                        <div class="lottery-img">
                            <img src="../../assets/images/ynxz/11.png" alt="">
                        </div>
                        <div class="lottery-name">
                            <h5>Miền Bắc</h5>
                            <p>mở thưởng hàngngày</p>
                        </div>
                    </li>
                </ul>
            </div> -->
        </myScroll>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { removeAllactive } from "../../assets/js/public"
    export default {
        name: "info",
        components:{},
        data(){
            return {
                lotteryArr:[],
                list:[],
                tabName:null,
                sList:[],
                smallListType:null
            }
        },
        filters:{},
        watch:{},
        computed: {
        },
        created(){
            this.getlottery();
        },
        methods:{
             goback(){
                this.$router.go(-1);
            },
            goxz(id,name,mark){
                if(!this.$store.state.codeToken){
                    return  this.$popup();
                }
                this.$router.push("/xz/"+id+"?vname="+name+'&mark='+mark)
            },

            async getlottery(code){
                this.lotteryArr = this.$st.state.allLotteryGame;
                let res = await this.$http.get('api/lottery/categories/')
                if(res && res.data.code == 1){
                    this.lotteryArr = res.data.data;
                    this.$st.commit('SETLOTTERY',this.lotteryArr)
                //    this.tabName = Object.keys(res.data.data)
                //    this.sList = Object.values(res.data.data)
                //    this.sList=this.sList[0];
                }
          
          },
        }
    }
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}

.home-header{
  .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
        position:relative;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }  
        a{
            position:absolute;
            right:.3rem;
            height: 100%;
            .rem(font-size,24);
            font-weight: normal;
        }
}
.yn-game-container{
    padding:0 .2rem;
    .title{
        padding-left: .25rem;
        position: relative;
        .rem(font-size,14);
        color: #445779;
        font-weight: 500;
        margin: .1rem 0 .3rem 0;
        i{
            position: absolute;
            content: '';
            background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
            border-radius: 5px;
            width: 3px;
            height: 100%;
            left: 0;
            top: -1px;
        }
        
    }
    ul{
        overflow: hidden;
        li{
            width: 49%;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.5px solid #ACC6F3;
            border-radius: .1rem;
             margin: 0 0 .2rem 0;
            //  padding: .15rem .2rem;
             .rem(height,130);
            &:nth-child(2n){
                margin: 0 0 .2rem 2%;
            }
            .lottery-img{
                // flex: 2;
                justify-content:center;
                img{
                    // width: 1.5rem;
                    
                    .rem(width,100);
                    .rem(height,100);
                    vertical-align: middle
                }
            }
            .lottery-name{
                display: flex;
                flex-direction: column;
                margin-left: .2rem;
                h5{
                     font-size: .36rem;
                     color: #445779;
                }
                p{
                    font-size: .32rem;
                    width: 2.5rem;
                }
                // flex: 3;
                 .rem(font-size,12);
                 color: #71819D;
            }
        }
    }
}
</style>