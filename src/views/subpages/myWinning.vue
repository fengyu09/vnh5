<template>
    <div class="winningRcord">
        <flexbox class="infoHead">
            <flexbox-item :span="1/10">
                <div
                @click="$router.go(-1)"
                class="flex-demo"
                style="padding-top: 0.7em; z-index: 10000001;"
                >
                <img src="../../assets/images/gray-back-icon.png" alt />
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo tickling">我的中奖</div>
            </flexbox-item>
            <flexbox-item :span="1/10">
                <div class="flex-demo"></div>
            </flexbox-item>
        </flexbox>
        <div class="record-tab" v-if="$store.state.isPure==0">
            <span :class="lotteryType==1?'active':''" @click="prizeRecord(1)">余额</span>
            <span :class="lotteryType==0?'active':''" @click="prizeRecord(0)">钻石</span>
        </div>
        <div class="prize-record clearfix" v-if="lotteryType == 1">
            <myScroll :isDown="false"
                :isLoad="isL"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :bottom="0"
                :top="$store.state.isPure==0?2.4:1.2"
                ref="scrollWrapper"
                :data="recordList"
                v-on:func="reLoad"
                >
                <dl>
                    <dd v-for="(v,index) in recordList" :key="index">
                        <span class="fl">{{v.created_time}}</span>
                        <span class="fr">{{v.name}}*{{v.number}}</span>
                    </dd>
                </dl>
                <p style="text-align:center;" v-if="!recordList.length">no data</p>
                <p class="loading-text" v-if="isLoading">Đang nhận...</p>
                <p class="no-data-tip" v-if="deadline&&!isLoading&&recordList.length&&recordList.length>limit">Tôi cũng có giới hạn đó~</p>
            </myScroll>
        </div>
        <div class="prize-record clearfix" v-if="lotteryType == 0">
             <myScroll :isDown="false"
                :isLoad="isL"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :bottom="0"
                :top="2.4"
                ref="scrollWrapper"
                :data="recordList"
                v-on:func="reLoad"
                >
                <dl>
                    <dd v-for="(v,index) in recordList" :key="index">
                        <span class="fl">{{v.created_time}}</span>
                        <span class="fr">{{v.name}}*{{v.number}}</span>
                    </dd>
                </dl>
                <p style="text-align:center;" v-if="!recordList.length">暂无</p>
                <p class="loading-text" v-if="isLoading">Đang nhận...</p>
                <p class="no-data-tip" v-if="deadline&&!isLoading&&recordList.length&&recordList.length>limit">Tôi cũng có giới hạn đó~</p>
            </myScroll>
        </div>
    </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem
 
} from "vux";
export default {
    name: "myWinning",
    data(){
        return{
            isLup: false, //是否显示 上拉加载更多的组件
            isUpFlag: false, //是否开启上拉加载更多 默认不开启
            isL: false, //是否显示 下拉刷新的组件
            isload: false, //是否显示下拉刷新的loading
            recordList:[], //中奖记录
            lotteryType:1, //1余额抽奖 0钻石抽奖
            useMoney:null, //余额
            limit:20,
            page:1,
            isLoading:false,
            deadline:false,
            isMorePage:false,
        }
    },
    created(){
    //获取中奖记录
    this.getRecordList();
    },
    components: {
        Flexbox,
        FlexboxItem,
    },
    methods: {
        //获取中奖记录
        async getRecordList(flag,ye){
            this.isLoading = true;
            this.page = 1;
            if(!flag){
                this.recordList = {};
            }
            if(flag){
                this.page = 1;
                this.isL = true;
            }
            let res = await this.$http.get(this.versionLive2+'user/turntable_log/',{params:{
                limit:this.limit,
                type:this.lotteryType,
                page: this.page,
            }});
            this.isLoading = false;
            this.isL = false;
            if(res && res.data.code==1){
                if (res.data.data.length >= this.limit) {
                    this.isMorePage = true;
                    this.isUpFlag = true;
                    this.deadline = false;
                } else {
                    this.isMorePage = false;
                    this.isUpFlag = false;
                    this.deadline = true;
                }
                this.recordList = res.data.data;
                //console.log( res);
            }
        },
        //我的中奖记录切换
        prizeRecord(index){ 
            this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            this.lotteryType = index
            this.getRecordList(true,this.lotteryType)
            this.isLup=false;
            this.isUpFlag= true;
        },
        reLoad(data) {
            if (data == "down") {
                this.getRecordList(true);
            } else if (data == "up") {
                //console.log(999);
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
            let res = await this.$http.get(this.versionLive2+'user/turntable_log/',{params:{
                limit:this.limit,
                type:this.lotteryType,
                page: this.page,
            }});
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
                //this.recordList = res.data.data;
                this.recordList = this.recordList.concat(res.data.data);
                setTimeout(()=>{
                    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                },20)

            }else if(res && res.data.code==-1){
                this.isMorePage = false;
                this.isUpFlag = false;
                this.deadline = true;
            }
        },
    }
}
</script>
<style lang="less" scoped>
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.infoHead {
  height: 1.2rem;
  line-height: 1.2rem;
}

.flex-demo {
  text-align: center;
  img {
    width: 0.25rem;
  }
}   
.tickling {
  font-weight: 550;
  font-size: 0.45rem;
}
.record-tab{
    .rem(width,390);
    .rem(font-size,28);
    color: #666;
    text-align: center;
    background: #F5F7FA;
    margin: 8px auto 0;
    border-radius: 20px;
    span{
        display: inline-block;
        .rem(width,190);
        .rem(line-height,70);
        &.active{
            color: #fff;
            background: linear-gradient(90deg, #FF3634, #FF7F66);
            border-radius: 20px;
        }
    }
}
.prize-record{
    dl{
        .rem(font-size,24);
        color: #445779;
        margin-top: 14px;
        dd{
            width: 100%;
            .rem(line-height,100);
            .rem(padding-left,30);
            .rem(padding-right,30);
            overflow: hidden;
            &:nth-child(odd){
                background: #F5F6FA;
            }
            .fr{
                font-weight: bold;
            }
        }
    }
}
</style>