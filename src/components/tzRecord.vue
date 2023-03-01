<template>
    <div class="">
        <div class="main-record">
            <div class="tab-title" :style="'top:'+topNav+'rem'">
                <span class="tab-item" :class="curIndex =='1'?'active':''"  @click="tabType(1)">Chưa quyết toán</span>
                <span class="tab-item" :class="curIndex =='2'?'active':''" @click="tabType(2)">Đã quyết toán</span>
            </div>
            <div class="tab-record-content">
                <!--滚动部分-->
                <myScroll
                        ref="scrollWrapper"
                        :data="playList"
                        :probeType="2"
                        :top="top"
                        v-on:func="reLoad"
                        :isUp="isUpFlag"
                        :isloadUp="isLup"
                        :left="0"
                        :bottom="0"
                        :zIndex="1000"
                        class="scroll-item"
                >
                <div class="tz-content" v-if="curIndex==1">
                    <table v-if="$store.state.isPure!=1" class="">
                        <tr class="tab-th">
                            <th class="date">Thời gian</th>
                            <th class="issue">Ngày tháng</th>
                            <th class="number">Số</th>
                            <th class="odds">Tỷ lệ cược</th>
                            <th class="money" @click="seletTypeBox = !seletTypeBox">
                                <!-- 金额
                                <div class="select-type" v-show="seletTypeBox">
                                    <span v-for="(vv,index5) in ['钻石','余额']" 
                                          :key="index5" 
                                          :class="seletType == index5 ?'active':''"
                                          @click="changeType(index5)"
                                          >{{vv}}</span>
                                </div> -->
                                余额
                            </th>
                        </tr>
                        <tr class="item" v-for="(item,index) in recordList" :key="index">
                            <td class="date">
                                <span>{{item.play_bet_time| formatDate2}}</span>
                                <span>{{item.play_bet_time| formatDate3}}</span>
                            </td>
                            <td>
                                {{item.play_bet_lottery_name}}<br>
                                {{item.play_bet_issue}}期
                            </td>
                            <td>
                                {{item.play_sec_name}}<br/>
                                {{item.play_class_name}}
                            </td>
                            <td>{{item.play_odds}}</td>
                            <td class="money">
                                <span>{{item.play_bet_sum}}</span>
                                <!-- <span v-if="seletType == 0">钻石</span>
                                <span v-if="seletType == 1">余额</span> -->
                            </td>

                        </tr>
                    </table>
                    <table v-if="$store.state.isPure==1"  class="">
                        <tr class="tab-th">
                            <th class="date">时间</th>
                            <th class="issue">期号</th>
                            <th class="number">号码</th>
                            <th class="odds">赔率</th>
                            <th class="money no-down-icon">
                                金额
                            </th>
                        </tr>
                        <tr class="item" v-for="(item,index) in recordList" :key="index">
                            <td class="date">
                                <span>{{item.play_bet_time| formatDate2}}</span>
                                <span>{{item.play_bet_time| formatDate3}}</span>
                            </td>
                            <td>
                                {{item.play_bet_lottery_name}}<br>
                                {{item.play_bet_issue}}期
                            </td>
                            <td>
                                {{item.play_sec_name}}<br/>
                                {{item.play_class_name}}
                            </td>
                            <td>{{item.play_odds}}</td>
                            <td class="money">
                                <span>{{item.play_bet_sum}}</span>
                                <!-- <span>余额</span> -->
                            </td>

                        </tr>
                    </table>
                </div>
                <div class="tz-content " v-if="curIndex==2">
                    <table v-if="$store.state.isPure!=1" class="">
                        <tr class="tab-th">
                            <th class="date">时间</th>
                            <th class="issue">期号</th>
                            <th class="number">号码</th>
                            <th class="odds">Tỷ lệ cược</th>
                            <th class="money" @click="seletTypeBox = !seletTypeBox">
                                <!-- 金额
                                <div class="select-type" v-show="seletTypeBox">
                                    <span v-for="(vv,index5) in ['钻石','余额']" 
                                          :key="index5" 
                                          :class="seletType == index5 ?'active':''"
                                          @click="changeType(index5)"
                                          >{{vv}}</span>
                                </div> -->
                                余额
                            </th>
                        </tr>

                        <tr class="item" v-for="(item,index) in recordList" :key="index">
                            <td class="date">
                                <span>{{item.play_bet_time|formatDate2}}</span>
                                <span>{{item.play_bet_time|formatDate3}}</span>
                            </td>
                            <td>
                                {{item.play_bet_lottery_name}}<br>
                                {{item.play_bet_issue}}期
                            </td>
                            <td>
                                {{item.play_sec_name}}<br/>
                                {{item.play_class_name}}
                            </td>
                            <td>{{item.play_odds}}</td>
                            <td class="money"  >
                                <span :class="item.play_bet_score | filterMoneyColor">{{item.play_bet_score }}</span>
                                <!-- <span v-if="seletType == 0">钻石</span>
                                <span v-if="seletType == 1">余额</span> -->
                            </td>
                        </tr>

                    </table>
                    <table v-if="$store.state.isPure==1" class="">
                        <tr class="tab-th">
                            <th class="date">时间</th>
                            <th class="issue">期号</th>
                            <th class="number">号码</th>
                            <th class="odds">赔率</th>
                            <th class="money no-down-icon">
                                金额
                            </th>
                        </tr>

                        <tr class="item" v-for="(item,index) in recordList" :key="index">
                            <td class="date">
                                <span>{{item.play_bet_time|formatDate2}}</span>
                                <span>{{item.play_bet_time|formatDate3}}</span>
                            </td>
                            <td>
                                {{item.play_bet_lottery_name}}<br>
                                {{item.play_bet_issue}}期
                            </td>
                            <td>
                                {{item.play_sec_name}}<br/>
                                {{item.play_class_name}}
                            </td>
                            <td>{{item.play_odds}}</td>
                            <td class="money"  >
                                <span :class="item.play_bet_score | filterMoneyColor">{{item.play_bet_score }}</span>
                                <!-- <span>余额</span> -->
                            </td>
                        </tr>

                    </table>
                </div>
                <div class="no-content" v-if="!recordList.length && !isLoading">
                    <img src="../assets/images/chat/zwtzjl-min.png" alt="">
                    <p>no data</p>
                </div>
                <p class="loading-text" v-if="isLoading">Đang nhận ...</p>
                 <p class="no-data-tip" v-if="deadline&&!isLoading&&recordList.length&&recordList.length>limit">Tôi cũng có giới hạn đó~</p>
                </myScroll>
            </div>
        </div>
    </div>
</template>

<script>
    import myScrollX from "./myScrollX"
    import myScroll from "./myScroll"; //横向滚动
    import {mapMutations, mapState } from "vuex";

    export default {
        name: "tzRecord.vue",
        data(){
            return{
                isShow:false,
                curIndex:1,
                limit: 30, //每页多少条
                page:1,
                recordList:[],
                isLoading:false,
                isLup: false, //是否显示 上拉加载更多的组件
                isUpFlag: false, //是否开启上拉加载更多 默认不开启
                issueNum: 10,
                playList:{},
                deadline:false,
                isMorePage:false,
                isBlPlay:(this.$store.state.isPure==1)?1:0,//是否余额投注, 0 钻石  1 余额
                seletType:1,
                seletTypeBox:false,
                // top1:7.8,
                // top2:9.2

            }
        },
        created(){
            if(this.seletType != this.isType){
              this.seletType = this.isType
            }
            this.getRecordList(this.seletType);
            // if(this.isHideVideo){
            //     this.top1 = 2.55
            //     this.top2 = 3.95
            // }else{
            //     this.top1 = 7.8
            //     this.top2 = 9.2
            // }
            // console.log(currentId);

        },
         computed: {
            ...mapState(["isType"])
        },
        methods: {
            ...mapMutations(["SETISTYPE"]),
            tabType:function (index) {
                this.curIndex = index;
                this.recordList = [];
                this.getRecordList(this.seletType);
                // console.log(this.curIndex)
            },
            reLoad(data) {
                // console.log(2);
                if (data == "down") {
                } else if (data == "up") {
                    this.loadMore();
                }
            },
            async loadMore(id,bl) {
                //判断是否有下一页
                if (!this.isMorePage) return;
                //判断节流阀
                if (!this.isUpFlag) return;
                this.isLup = true;
                this.page++;
                let res = await this.$http.get("/forum/guess/play_bet_history", {
                    params: {
                        play_bet_state: this.curIndex,
                        limit: this.limit,
                        page: this.page,
                        is_bl_play:this.isBlPlay || bl
                    }
                });
                this.isLup = false;
                if (res && res.data.code == 1) {
                    if (res.data.data.length >= this.limit) {
                        this.isMorePage = true;
                        this.isUpFlag = true;
                        this.deadline = false;
                    } else {
                        this.isMorePage = false;
                        this.isUpFlag = false;
                        this.deadline = true;
                    }
                    this.recordList = this.recordList.concat(res.data.data);
                    this.playList.recordList = this.recordList;
                    setTimeout(()=>{
                        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                    },20)

                }else if(res && res.data.code==-1){
                    this.isMorePage = false;
                    this.isUpFlag = false;
                    this.deadline = true;
                }
            },
            async getRecordList(bl) {
                if(!this.$store.state.codeToken) return
                this.isLoading = true;
                this.page = 1;
                let res = await this.$http.get("/forum/guess/play_bet_history", {
                    params: {
                        play_bet_state: this.curIndex,
                        limit: this.limit,
                        page: this.page,
                        is_bl_play:this.isBlPlay || bl
                    }
                });
                if (res.data.data.length >= this.limit) {
                    this.isMorePage = true;
                    this.isUpFlag = true;
                    this.deadline = false;
                } else {
                    this.isMorePage = false;
                    this.isUpFlag = false;
                    this.deadline = true;
                }
                this.isLoading = false;
                this.recordList =res.data.data;
                this.playList.recordList = this.recordList;

            },
            changeType(index){
                this.seletType = index;
                // console.log(index)
                this.recordList = [];
                this.getRecordList(index);
                this.SETISTYPE(this.seletType);
            }
        },
        
        filters:{
            filterTime(t){
              
            },
            filterMoneyColor(m){
                // console.log(m+'');
                m = m+'';    
                if(m.indexOf('+')>-1) return 'redMoney'
                else return ''
            }
        },
        components: {
            myScroll,
            myScrollX
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
        props:{
            // isHideVideo:{
            //     type:Boolean,
            //     default:false
            // },
            top:{
                type:Number,
                default:9.6
            },
            topNav:{
                type:Number,
                default:8.15
            },
            currentId:{
                inputName: String,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
.rem(@name,@px){
        @{name}:unit(@px/75,rem)
}
.hide{
    display: none;
}
.main-record{
    font-family:'PingFang-SC-Medium';
    .rem(padding-left,20);
    .rem(padding-right,20);
    .tab-title{
        // border-top: 1px solid #eee;
        position: absolute;
        // top: 7.8rem;
        left: 0;
        z-index: 999;
        background: #fff;
        width: 100%;
        .rem(font-size,32);
        
        text-align: center;
        .rem(padding-top,20);
        .rem(padding-bottom,10);
        .tab-item{
            display: inline-block;
            width: 40%;
            .rem(height,65);
            position: relative;
            &.active{
                font-weight: bold;
                color: #445779;
                &:after{
                    display: block;
                    content: '';
                    .rem(width,40);
                    .rem(height,6);
                    background: #FF513E;
                    position: absolute;
                    left:45%;
                    bottom:0;
                    -webkit-border-radius: 3px;
                    -moz-border-radius:  3px;
                    border-radius: 3px;
                }
            }
        }
    }
    table{
        text-align: center;
        border: none;
        border-collapse: collapse;
        width: 94.6%;
        margin: 0 auto;
    }
    .tab-th{
        width: 100%;
        .rem(height,67);
        .rem(font-size,24);
        
        background: #F5F7FA;
        border:0px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        th{
            border:0px;
            font-weight: normal;
            width: 20%;
        }
        .date{
            -webkit-border-radius: 4px 0 0 4px;
            -moz-border-radius: 4px 0 0 4px;
            border-radius: 4px 0 0 4px;
        }
        .issue{
            // width:30%;
        }
        .number{
            // width: 11%;
        }
       /* .money{
            text-align: left;
            -webkit-border-radius: 0 4px 4px 0;
            -moz-border-radius: 0 4px 4px 0;
            border-radius: 0 4px 4px 0;
        }*/
        .money{
            text-align: left;
            -webkit-border-radius: 0 4px 4px 0;
            -moz-border-radius: 0 4px 4px 0;
            border-radius: 0 4px 4px 0;
            position: relative;
            width: 17%;
            padding-left: 2%;
            // &:before{
            //   content: '';
            //   position: absolute;
            //   right: 20%;
            //   top: 0.37rem;
            //   .rem(width,25);
            //   .rem(height,11);
            //   background: url('../assets/images/chat/tz-down-icon.png')no-repeat;
            //   background-size: contain;

            // }
            .select-type{
                position: absolute;
                bottom: -2.2rem;
                left: 0;
                .rem(width,107);
                .rem(height,167);
                text-align: center;
                background: #fff;
                .rem(line-height,83.5);
                 box-shadow:0 0 3px  3px #eee;
                 border-radius: 2px;
                span{
                    display: block;
                    .rem(height,83.5);
                    color: #666;
                    &.active{
                        color: #ff513e;
                    }
                }
            }
        }
        .no-down-icon{
            &:before{
                background: none !important;
            }
        }
    }
    .item{
        .rem(font-size,24);
        color: #445779;
        border-bottom: 1px dashed #EEE;
        td{
            .rem(padding-top,35);
            .rem(padding-bottom,30);
            word-break: break-all;
        }
        .date{
            .rem(font-size,24);
            
        }
        .money{
            // width: 14%;
            font-weight: bold;
            .rem( font-size, 28);
            text-align: left;
            &.red{
                color: #FF513E;
            }
            span{
                display: block;
                text-align: center;
            }
        }
    }
    .no-content{
        text-align: center;
        img{
            .rem(width,100);
            .rem(padding-top,152);
            .rem(padding-bottom,40);
        }
        p{
            font-weight: bold;
            .rem(font-size,32);
            color: #000;
        }
    }
}
    .redMoney{
            color: #FF513E !important;
    }
    .loading-text{
        font-size: .35rem;
        text-align: center;
        margin-top: 1rem;
    }
    .no-data-tip {
        text-align: center;
        font-size: 0.33rem;
        padding: 0.4rem 0 .8rem 0;
        color: #666;
    }
</style>