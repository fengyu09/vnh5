<template>
    <div>
        <headerDate v-on:func="selectDate"/>
        <myScroll
                ref="scrollWrapper"
                :data="playList"
                :probeType="2"
                :top="1.2"
                v-on:func="reLoad"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :left="0"
                :bottom="0"
                :zIndex="499"
                class="scroll-item"
        >
            <div class="zd-content">
                <table class="">
                    <tr class="tab-th">
                        <td class="date">Thời gian</td>
                        <td class="issue">tên trò chơi</td>
                        <td class="number">Số tiền đặt cược</td>
                        <td class="money">Lợi nhuận (vndk)</td>
                    </tr>
                    <tr class="item" v-for="(item,index) in recordList" :key="index">
                        <td class="date">
                            <span>{{item.order_time| formatDate2}}</span>
                            <span>{{item.order_time| formatDate3}}</span>
                        </td>
                        <td>
                            {{item.game_name}}
                        </td>
                        <td style="font-weight: bold;font-family: number1;font-size: .4rem;">
                            {{item.amount}}
                        </td>
                        <td class="money" :class="item.prize | filterMoneyColor">{{item.prize}}</td>
                    </tr>
                </table>
            </div>

            <div class="no-content" v-if="!recordList.length && !isLoading">
                <img src="../../assets/images/chat/zwtzjl-min.png" alt="">
                <p>no data</p>
            </div>
            <p class="loading-text" v-if="isLoading">Đang nhận...</p>
            <p class="no-data-tip" v-if="deadline&&!isLoading&&recordList.length&&recordList.length>limit">Tôi cũng có giới hạn đó~</p>
        </myScroll>
    </div>
</template>

<script>
    import headerDate from "../../components/header_date";
    export default {
        name: "agDetails",
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
                tag:'',
                name:'',
            }
        },
        created(){
            this.currLoId = this.$route.params.id;
            this.currType = this.$route.params.type;
            this.name =  this.$route.query.name;
            this.tag =  this.$route.query.tag;
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
                let res = await this.$http.get("/api/vendors.cq9/gamerecord", {
                    params: {
                        limit: this.limit,
                        page: this.page,
                        // game_type:'sport',
                        st:st || localStorage.getItem('st'),
                        et:et || localStorage.getItem('et'),
                        game_id:this.currLoId,
                        game_name:this.name,
                        tag:this.tag
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
                let res = await this.$http.get("/api/vendors.cq9/gamerecord", {
                    params: {
                        limit: this.limit,
                        page: this.page,
                        // game_type:'sport',
                        st:st || localStorage.getItem('st'),
                        et:et || localStorage.getItem('et'),
                        game_id:this.currLoId,
                        game_name:this.name,
                        tag:this.tag
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
            goback(){
                this.$router.go(-1);
            }
        },
        filters:{
            filterTime(t){

            },
            filterMoneyColor(m){
                if(m-0>0) return 'redMoney'
                else return ''
            }
        },
        components: {
            headerDate
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
                th{
                    border:0px;
                    font-weight: normal;
                }
                .date{
                    width:25%;
                    -webkit-border-radius: 4px 0 0 4px;
                    -moz-border-radius: 4px 0 0 4px;
                    border-radius: 4px 0 0 4px;
                }
                .issue{
                    width:25%;
                    word-break: break-all;
                }
                .number{
                    width: 25%;
                }
                .money{
                    width: 25%;
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
                }
                .date{
                    .rem(font-size,24);
                    
                }
                .money{
                    /*width: 14%;*/
                    font-weight: bold;
                    .rem( font-size, 28);
                    font-family: number1;
                    text-align: center;
                    &.red{
                        color: #FF513E;
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