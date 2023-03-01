<template>
    <div class="zdDetails">
        <headerDate v-on:func="selectDate"/>
        <div class="tab-title clearfix" :class="$st.state.skin==5?'tab-title-golden':''">
            <span class="tab-item" :class="[{'active':$st.state.skin ==0&&curIndex =='0'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='0'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='0'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='0'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='0'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='0'}]"  @click="tabType(0)">{{$t('zdDetails[0]')}}</span>

            <span class="tab-item" :class="[{'active':$st.state.skin ==0&&curIndex =='1'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='1'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='1'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='1'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='1'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='1'}]"   @click="tabType(1)">{{$t('zdDetails[1]')}}</span>

            <span class="tab-item" :class="[{'active':$st.state.skin ==0&&curIndex =='2'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='2'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='2'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='2'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='2'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='2'}]"  @click="tabType(2)">{{$t('zdDetails[2]')}}</span>
        </div>
        <myScroll
                ref="scrollWrapper"
                :data="playList"
                :probeType="2"
                :top="2.6"
                :bgColor="$st.state.skin==5?'1F252C':'fff'"
                v-on:func="reLoad"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :left="0"
                :bottom="0"
                :zIndex="499"
                class="scroll-item"
        >
            <div class="zd-content" v-if="curIndex==0" :class="$st.state.skin==5?'zd-content-golden':''">
                <table class="">
                    <tr class="tab-th" :class="$st.state.skin==5?'tab-th-golden':''">
                        <td class="date">{{$t('zdDetails[3]')}}</td>
                        <td class="issue">{{$t('zdDetails[4]')}}</td>
                        <td class="number"> {{$t('zdDetails[5]')}}</td>
                        <td class="odds">{{$t('zdDetails[6]')}}</td>
                        <td class="money">{{$t('zdDetails[7]')}}</td>
                    </tr>
                    <tr class="item" v-for="(item,index) in recordList" :key="index">
                        <td class="date">
                            <span>{{item.order_time| formatDate2}}</span>
                            <span>{{item.order_time| formatDate3}}</span>
                        </td>
                        <td>
                            {{item.lottery_name}}<br>
                            {{item.issue}}
                        </td>
                        <td>
                            {{item.play_name}}
                            <br>
                            {{item.item_name}}
                            <!-- {{item.item_code}} -->
                        </td>
                        <td>{{item.possible_prize}}</td>
                        <td class="money" v-if="item.prize==0">{{item.amount}}</td>
                        <td class="money" :class="item.prize | filterMoneyColor" v-else>{{item.prize}}</td>
                    </tr>
                </table>
            </div>
            <div class="zd-content" v-if="curIndex==1" :class="$st.state.skin==5?'zd-content-golden':''">
                <table class="">
                    <tr class="tab-th" :class="$st.state.skin==5?'tab-th-golden':''">
                        <td class="date">{{$t('zdDetails[3]')}}</td>
                        <td class="issue">{{$t('zdDetails[4]')}}</td>
                        <td class="number"> {{$t('zdDetails[5]')}}</td>
                        <td class="odds">{{$t('zdDetails[6]')}}</td>
                        <td class="money">{{$t('zdDetails[7]')}}</td>
<!--                        <td class="">Lợi nhuận (vndk)</td>-->
                    </tr>
                    <tr class="item" v-for="(item,index) in recordList" :key="index">
                        <td class="date">
                            <span>{{item.order_time| formatDate2}}</span>
                            <span>{{item.order_time| formatDate3}}</span>
                        </td>
                        <td>
                            {{item.lottery_name}}<br>
                            {{item.issue}}
                        </td>
                        <td>
                            {{item.play_name}}
                            <br>
                            {{item.item_name}}
                            <!-- {{item.item_code}} -->
                        </td>
                        <td>{{item.possible_prize}}</td>
                        <td class="money">{{item.amount}}</td>
<!--                        <td class="yl" style="font-weight: bold">100</td>-->
                    </tr>
                </table>
            </div>
            <div class="zd-content" v-if="curIndex==2" :class="$st.state.skin==5?'zd-content-golden':''">
                <table class="">
                    <tr class="tab-th" :class="$st.state.skin==5?'tab-th-golden':''">
                        <td class="date">{{$t('zdDetails[3]')}}</td>
                        <td class="issue">{{$t('zdDetails[4]')}}</td>
                        <td class="number"> {{$t('zdDetails[5]')}}</td>
                        <td class="odds">{{$t('zdDetails[6]')}}</td>
                        <td class="money">{{$t('zdDetails[7]')}}</td>
                    </tr>
                    <tr class="item" v-for="(item,index) in recordList" :key="index">
                        <td class="date">
                            <span>{{item.order_time| formatDate2}}</span>
                            <span>{{item.order_time| formatDate3}}</span>
                        </td>
                        <td>
                            {{item.lottery_name}}<br>
                            {{item.issue}}
                        </td>
                        <td>
                            {{item.play_name}}
                            <br>
                            {{item.item_name}}
                            <!-- {{item.item_code}} -->
                        </td>
                        <td>{{item.possible_prize}}</td>
                        <td class="money" :class="item.prize | filterMoneyColor">{{item.prize}}</td>
<!--                        <td class="yl" style="font-weight: bold">100</td>-->
                    </tr>
                </table>
            </div>

            <div class="no-content" v-if="!recordList.length && !isLoading">
                <img src="../../assets/images/chat/zwtzjl-min.png" alt="">
                <p>no data</p>
            </div>
            <p class="loading-text" v-if="isLoading">{{$t('zdDetails[9]')}}...</p>
            <p class="no-data-tip" v-if="deadline&&!isLoading&&recordList.length&&recordList.length>limit">{{$t('zdDetails[8]')}}}~</p>
        </myScroll>
    </div>
</template>

<script>
    import headerDate from "../../components/header_date";
    import myScroll from "../../components/myScroll"; //横向滚动
    import {fun_date} from "../../assets/js/public";
    export default {
        name: "tzRecord.vue",
        data(){
            return{
                isShow:false,
                curIndex:0,
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
                currLoId:'',
                currType:'',
            }
        },
        created(){
            this.currLoId = this.$route.params.id;
            this.currType = this.$route.params.type;
            this.getRecordList();
        },
        methods: {
            selectDate(data){
                // console.log(data);
                // localStorage.setItem('st',data.st);
                // localStorage.setItem('et',data.et);
                this.getRecordList(data.st,data.et);
                this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
            },
            tabType: function (index) {
                this.curIndex = index;
                this.recordList = [];
                this.getRecordList();
            },
            reLoad(data) {
                if (data == "down") {
                } else if (data == "up") {
                    this.loadMore();
                }
            },
            async loadMore(id,st,et) {
                //判断是否有下一页
                if (!this.isMorePage) return;
                //判断节流阀
                if (!this.isUpFlag) return;
                this.isLup = true;
                this.page++;
                let res = await this.$http.get("/api/guess/orderlist", {
                    params: {
                        flag: this.curIndex,
                        limit: this.limit,
                        page: this.page,
                        lottery_id:this.currLoId,
                        st:st || localStorage.getItem('st'),
                        et:et || localStorage.getItem('et')
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
            async getRecordList(st,et) {
                this.isLoading = true;
                this.page = 1;
                let res = await this.$http.get("/api/guess/orderlist", {
                    params: {
                        flag: this.curIndex,
                        limit: this.limit,
                        page: this.page,
                        lottery_id:this.currLoId,
                        st:st || localStorage.getItem('st'),
                        et:et || localStorage.getItem('et')
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
                console.log(this.recordList );
                this.playList.recordList = this.recordList;

            },
            goback(){
                 this.$router.go(-1);
            }
        },
        filters:{
            filterTime(t){

            },
            filterMoneyColor(m){
                if(m.indexOf('+')>-1) return 'redMoney'
                else return ''
            }
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
        height: 1.2rem;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
        .search-icon {
            position: absolute;
            right: .3rem;
            width: 1.2rem;
            height: 1.2rem;
            display: inline-block;
            background: url("../../assets/images/main/home_icon_07.png") no-repeat center right;
            background-size: 45%;
        }
        .date-icon{
            position: absolute;
            display: inline-block;
            .rem(width,40);
            .rem(height,40);
            right: .3rem;
        }
    }
    // .tab-title{
    //     .rem(padding-top,16);
    //     .rem(padding-bottom,30);
    //     .tab-item{
    //         .rem(width,210);
    //         .rem(height,64);
    //         .rem(line-height,64);
    //         .rem(font-size,28);
    //         .rem(border-radius,32);
    //         .rem(margin-left,30);
    //         text-align: center;
    //         color: #445779;
    //         background: #F5F7F9;
    //         float: left;
    //         &.active{
    //             color: #fff;
    //             background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    //             background-size: 100% 100%;
    //         }
    //     }

    // }

    .zd-content{
        table{
            text-align: center;
            border: none;
            border-collapse: collapse;
            width: 94.6%;
            margin: 0 auto;
            .tab-th{
                width: 100%;
                .rem(height,54);
                .rem(font-size,24);
                
                background: #F5F7FA;
                border:0px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                &.tab-th-golden{
                    background: #161C23;
                    color: #AB9B62;
                    height: 1.2rem;
                }
                th{
                    border:0px;
                    font-weight: normal;
                }
                .date{
                    width:20%;
                    -webkit-border-radius: 4px 0 0 4px;
                    -moz-border-radius: 4px 0 0 4px;
                    border-radius: 4px 0 0 4px;
                }
                .issue{
                    width:25%;
                }
                .number{
                    width: 20%;
                }
                .money{
                    text-align: center;
                    -webkit-border-radius: 0 4px 4px 0;
                    -moz-border-radius: 0 4px 4px 0;
                    border-radius: 0 4px 4px 0;
                }
            }
            .item{
                .rem(font-size,24);
                color: #445779;
                border-bottom: 1px dashed #EEE;
                td{
                    .rem(padding-top,35);
                    .rem(padding-bottom,30);
                    width: 20%;
                    word-break: break-all;
                }
                .date{
                    .rem(font-size,24);
                    // 
                }
                .money{
                    width: 14%;
                    font-weight: bold;
                    .rem( font-size, 28);
                    text-align: left;
                    &.red{
                        color: #FF513E;
                    }
                }
            }
        }
        &.zd-content-golden{
            table{
                width: 100%;
                .item{
                    border-bottom: 1px dashed #5C564D;
                    color: #CECECE;
                    .redMoney{
                        color: #AB9B62 !important;
                    }
                }
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