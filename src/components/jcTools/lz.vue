<template>
    <div>
        <div class="lz-tab" :style="'top:'+topNav+'rem'" v-if="LotteryId!=8">
            <div class="lz-tab-item"  :class="currType==3?'active':''" @click="currType=3">露珠</div>
            <div class="lz-tab-item"  :class="currType==4?'active':''" @click="currType=4">走势</div>
        </div>
<!--        内容引入-->

        <myScroll
                ref="scrollWrapper"
                :data="playList"
                :probeType="4"
                :top="top"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :left="0"
                :bottom="0"
                :zIndex="999"
                class="scroll-item"
        >
            <div
                class="tab-box2 tab-box"
                v-if="currType == 3 && [1,10].find(res => currId == res)"
                style="padding-top: 0;margin-bottom:0.3rem"
        >
            <ul class="clearfix" style="display: flex;">
                <li
                        @click="
                  sscOption();
                  currTypeItem = 1;
                  lzType = 'daxiao';
                  rankNum=1
                "
                        :class="currTypeItem == 1 ? 'active' : ''"
                        style="padding: 0 0.42rem;"
                >
                    大小
                </li>
                <li
                        @click="
                  sscOption();
                  currTypeItem = 2;
                  lzType = 'danshuang';
                  rankNum=1
                "
                        :class="currTypeItem == 2 ? 'active' : ''"
                        style="padding: 0 0.42rem;"
                >
                    单双
                </li>
                <li
                        @click="
                  currTypeItem = 3;
                  lzType = 'longhu';
                 rankNum=0
                "
                        :class="currTypeItem == 3 ? 'active' : ''"
                        style="padding: 0 0.42rem;"
                >
                    龙虎
                </li>
                <li
                        @click="getluNum();currTypeItem = 4;lzType='num'"
                        :class="currTypeItem == 4 ? 'active' : ''"
                        style="padding: 0 0.42rem;"
                >
                    号码
                </li>
                <li
                        @click="currTypeItem = 5;lzType='zonghe'"
                        :class="currTypeItem == 5 ? 'active' : ''"
                        style="padding: 0 0.42rem;"
                >
                    总和
                </li>
            </ul>
        </div>

            <div
                    v-if="currId != 8 && currId != 1 && currId != 10"
                    class="tab-box2"
            >
                <ul class="clearfix" v-if="currType == 1">
                    <li
                            @click="currTypeItem = 1"
                            :class="currTypeItem == 1 ? 'active' : ''"
                    >
                        号码
                    </li>
                    <li
                            @click="currTypeItem = 2"
                            :class="currTypeItem == 2 ? 'active' : ''"
                    >
                        大小
                    </li>
                    <li
                            @click="currTypeItem = 3"
                            :class="currTypeItem == 3 ? 'active' : ''"
                    >
                        单双
                    </li>
                    <li
                            @click="currTypeItem = 4"
                            :class="currTypeItem == 4 ? 'active' : ''"
                    >
                        冠亚和/龙虎
                    </li>
                </ul>
                <ul
                        class="clearfix lz-box"
                        v-if="currType == 3"
                        style="margin-bottom:0.3rem"
                >
                    <li
                            @click="
                  getlzDx();
                  currTypeLZ = 1;
                  lzType = 'daxiao';
                "
                            :class="currTypeLZ == 1 ? 'active' : ''"
                    >
                        大小
                    </li>
                    <li
                            @click="
                  getlzDx();
                  currTypeLZ = 2;
                  lzType = 'danshuang';
                "
                            :class="currTypeLZ == 2 ? 'active' : ''"
                    >
                        单双
                    </li>
                    <li @click="getlzLh" :class="currTypeLZ == 3 ? 'active' : ''">
                        龙虎
                    </li>
                    <li
                            @click="
                  getlzQh();
                  currTypeLZ = 4;
                  lzType = 'qianhou';
                "
                            :class="currTypeLZ == 4 ? 'active' : ''"
                    >
                        前后
                    </li>
                    <li
                            @click="
                  currTypeLZ = 5;
                  lzType = 'gy';
                "
                            :class="currTypeLZ == 5 ? 'active' : ''"
                    >
                        冠亚和
                    </li>
                </ul>
                <ul class="clearfix" v-if="currType == 4">
                    <li
                            @click="
                  currTypeZS = 1;
                  rankNum = 1;
                "
                            :class="currTypeZS == 1 ? 'active' : ''"
                    >
                        号码走势
                    </li>
                    <li
                            @click="
                  currTypeZS = 2;
                  rankNum = 11;
                  ranking = '冠军';
                "
                            :class="currTypeZS == 2 ? 'active' : ''"
                    >
                        冠亚和走势
                    </li>
                </ul>
            </div>
            <div class="tab-box" v-if="currId == 1 || currId == 10">
                <ul v-if="currType == 1">
                    <li
                            @click="currTypeItem = 1"
                            :class="currTypeItem == 1 ? 'active' : ''"
                    >
                        号码
                    </li>
                    <li
                            @click="currTypeItem = 2"
                            :class="currTypeItem == 2 ? 'active' : ''"
                    >
                        大小
                    </li>
                    <li
                            @click="currTypeItem = 3"
                            :class="currTypeItem == 3 ? 'active' : ''"
                    >
                        单双
                    </li>
                    <li
                            @click="currTypeItem = 5"
                            :class="currTypeItem == 5 ? 'active' : ''"
                    >
                        总和/形态
                    </li>
                </ul>
            </div>

            <div class="lhc-tab" v-if="currType==3&&currId==8">
                <myScrollX >
                    <div
                            class="tab-box2"
                            style="padding-top: 0;margin-bottom:0.3rem;width:12rem"
                            v-if="currId==8"
                    >
                        <ul class="clearfix" style="display: flex;">
                            <li
                                    @click="
                  currTypeItem = 1;
                  lzType = 'daxiao';
                "
                                    :class="currTypeItem == 1 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                大小
                            </li>
                            <li
                                    @click="
                  currTypeItem = 2;
                  lzType = 'danshuang';
                "
                                    :class="currTypeItem == 2 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                单双
                            </li>
                            <li
                                    @click="
                  currTypeItem = 3;
                  lzType = 'bose';
                "
                                    :class="currTypeItem == 3 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                波色
                            </li>
                            <li
                                    @click="currTypeItem = 4;lzType='zonghe'"
                                    :class="currTypeItem == 4 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                总和
                            </li>
                            <!-- <li
                              @click="currTypeItem = 5;lzType='zonghe'"
                              :class="currTypeItem == 5 ? 'active' : ''"
                              style="padding: 0 0.42rem;"
                            >
                              总和大小
                            </li> -->
                            <li
                                    @click="currTypeItem = 6;lzType='weishu'"
                                    :class="currTypeItem == 6 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                尾数大小
                            </li>
                            <li
                                    @click="currTypeItem = 7;lzType='heshu'"
                                    :class="currTypeItem == 7 ? 'active' : ''"
                                    style="padding: 0 0.42rem;"
                            >
                                合数单双
                            </li>
                        </ul>

                    </div>
                </myScrollX>
            </div>

            <div
                    class="tab-box2"
                    v-if="currType == 4 && [1, 8, 10].find(res => currId == res)"
            >
                <ul class="clearfix">
                    <li
                            @click="currTypeItem = 1"
                            :class="currTypeItem == 1 ? 'active' : ''"
                    >
                        基本走势
                    </li>
                    <li
                            @click="showLoading(0)"
                            :class="currTypeItem == 2 ? 'active' : ''"
                    >
                        形态走势
                    </li>
                    <li
                            @click="showLoading(1)"
                            :class="currTypeItem == 3 ? 'active' : ''"
                    >
                        龙虎走势
                    </li>
                </ul>
            </div>
            <div class="tab-box2" v-if="currId == 8&&currType!=3">
                <ul v-if="currType == 1">
                    <li
                            @click="currTypeItem1 = 0"
                            :class="currTypeItem1 == 0 ? 'active' : ''"
                    >
                        号码
                    </li>
                    <li
                            @click="currTypeItem1 = 1"
                            :class="currTypeItem1 == 1 ? 'active' : ''"
                    >
                        总和
                    </li>
                    <li
                            @click="currTypeItem1 = 2"
                            :class="currTypeItem1 == 2 ? 'active' : ''"
                    >
                        特码
                    </li>
                </ul>
            </div>



            <div
                class="select-box"
                style="display: flex;"
                v-if="currType == 4 || currType == 3"
        >
            <div
                    v-show="
              rankNum != 11 &&
                ![1, 8, 10].find(res => currId == res) &&
                currType != '3'
            "
                    class="select-num"
                    @click="pickershow1 = true"
            >
                <span>{{ ranking }}</span>
                <x-icon
                        type="ios-arrow-down"
                        size="18"
                        style="float: right;"
                ></x-icon>
            </div>
            <div
                    v-show="[1, 10].find(res => currId == res)&&currType != 3&&currTypeItem==1"
                    class="select-num"
                    @click="pickershow2 = true"
            >
                <span>{{sscRanking}}</span>
                <x-icon
                        type="ios-arrow-down"
                        size="18"
                        style="float: right;"
                ></x-icon>
            </div>
            <div
                    v-show="[1, 10].find(res => currId == res)&&currType != 3&&currTypeItem==2"
                    class="select-num"
                    @click="pickershow4 = true"
            >
                <span>{{xintai}}</span>
                <x-icon
                        type="ios-arrow-down"
                        size="18"
                        style="float: right;"
                ></x-icon>
            </div>
            <div
                    v-show="currType == 3&&isshowBtn"
                    class="select-num"
                    @click="showSelectlz"
            >
                <span>筛选号码</span>
                <x-icon
                        type="ios-arrow-down"
                        size="18"
                        style="float: right;"
                ></x-icon>
            </div>
            <div
                    v-show="[1,8,, 10].find(res => currId == res) && currType != 3"
                    class="select-num"
                    @click="pickershow3 = true"
            >
                <span>{{ issueText }}</span>
                <x-icon
                        type="ios-arrow-down"
                        size="18"
                        style="float: right;"
                ></x-icon>
            </div>
            <div style="height: 0.5rem;"></div>
            <div class="select-day" v-show="currId!=8">
                <div
                        v-for="(item, index) in ['今天', '昨天', '前天']"
                        :key="index"
                        @click="dayMode = index"
                        :class="{ active: index == dayMode }"
                >
                    <span>{{ item }}</span>
                </div>
            </div>
        </div>
            <div class="lhc-tab" v-if="currType==3&&currId!=8">
            <myScrollX >
                <div
                        class="tab-box2"
                        style="padding-top: 0;margin-bottom:0.3rem;width:12rem"
                        v-if="currId==8"
                >
                    <ul class="clearfix" style="display: flex;">
                        <li
                                @click="
                  currTypeItem = 1;
                  lzType = 'daxiao';
                "
                                :class="currTypeItem == 1 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            大小
                        </li>
                        <li
                                @click="
                  currTypeItem = 2;
                  lzType = 'danshuang';
                "
                                :class="currTypeItem == 2 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            单双
                        </li>
                        <li
                                @click="
                  currTypeItem = 3;
                  lzType = 'bose';
                "
                                :class="currTypeItem == 3 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            波色
                        </li>
                        <li
                                @click="currTypeItem = 4;lzType='zonghe'"
                                :class="currTypeItem == 4 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            总和
                        </li>
                        <!-- <li
                          @click="currTypeItem = 5;lzType='zonghe'"
                          :class="currTypeItem == 5 ? 'active' : ''"
                          style="padding: 0 0.42rem;"
                        >
                          总和大小
                        </li> -->
                        <li
                                @click="currTypeItem = 6;lzType='weishu'"
                                :class="currTypeItem == 6 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            尾数大小
                        </li>
                        <li
                                @click="currTypeItem = 7;lzType='heshu'"
                                :class="currTypeItem == 7 ? 'active' : ''"
                                style="padding: 0 0.42rem;"
                        >
                            合数单双
                        </li>
                    </ul>

                </div>
            </myScrollX>
        </div>


            <luzhu
                    :zsid="currId"
                    :dayMode="dayMode"
                    :rankNumShow="selectList4"
                    :lzType="lzType"
                    :isload.sync="isload"
                    :ranking="ranking"
                    v-if="currType==3"
            ></luzhu>

            <div v-if="currType == 4 && ![1,10].find(res => currId == res)">
                <!-- @showLoad="showLoad" -->
                <Movements
                        :zsid="currId"
                        :dayMode="dayMode"
                        :rankNum="rankNum"
                        :isload.sync="isload"
                        ref="movements"
                ></Movements>
            </div>
            <div v-if="currType == 4 && [1, 8, 10].find(res => currId == res)&&currTypeItem==1">
                <!-- @showLoad="showLoad" -->
                <sscMovements
                        :zsid="currId"
                        :dayMode="dayMode"
                        :rankNum="rankNum"
                        :isload.sync="isload"
                        :issueNum="issueNum"
                        ref="movements"
                ></sscMovements>
            </div>
            <div v-if="currType == 4 && [1, 8, 10].find(res => currId == res)&&currTypeItem==2" >
                <xintaiMovement
                        :zsid="currId"
                        :dayMode="dayMode"
                        :xtrankNum="xtrankNum"
                        :issueNum="issueNum"
                        :isload.sync="isload"
                >
                </xintaiMovement>
            </div>
            <div  v-if="currType == 4 && [1, 8, 10].find(res => currId == res)&&currTypeItem==3">
                <longhuMovement
                        :zsid="currId"
                        :dayMode="dayMode"
                        :issueNum="issueNum"
                        :isload.sync="isload"
                ></longhuMovement>
            </div>

            <div class="pearl-road" v-if="currType == 3&&currId!=8">
                <!-- <div v-for="(i,d) in selectList4">
                <luzhu
                :zsid="currId"
                :dayMode="dayMode"
                :rankNum="i"
                :lzType="lzType"
                :isload.sync="isload"
                :ranking="ranking"
              ></luzhu>
              </div> -->
                <!-- <luzhu
                        :zsid="currId"
                        :dayMode="dayMode"
                        :rankNumShow="selectList4"
                        :lzType="lzType"
                        :isload.sync="isload"
                        :ranking="ranking"
                ></luzhu> -->
            </div>
            <!-- <div class="pearl-road" v-if="currType == 3&&currId==8">
                <lhcLuzhu
                        :zsid="currId"
                        :dayMode="dayMode"
                        :rankNum="rankNum"
                        :lzType="lzType"
                        :isload.sync="isload"
                        :rankNumShow="selectList4"
                ></lhcLuzhu>
            </div> -->




        </myScroll>

        <picker
                v-if="!isload"
                :data="selectNumData"
                :showToolbar="true"
                :maskClick="true"
                @confirm="pickerconfirm1"
                :visible.sync="pickershow1"
                :defaultIndex="selectDefault"
        />
        <picker
                v-if="!isload"
                :data="selectNumData2"
                :showToolbar="true"
                :maskClick="true"
                @confirm="pickerconfirm2"
                :visible.sync="pickershow2"
                :defaultIndex="selectDefault"
        />
        <picker
                v-if="!isload"
                :data="selectNumData3"
                :showToolbar="true"
                :maskClick="true"
                @confirm="pickerconfirm3"
                :visible.sync="pickershow3"
                :defaultIndex="selectDefault"
        />
        <picker
                v-if="!isload"
                :data="selectNumData4"
                :showToolbar="true"
                :maskClick="true"
                @confirm="pickerconfirm4"
                :visible.sync="pickershow4"
                :defaultIndex="selectDefault"

        />
        <div class="zsloading-box" v-show="isload && [3, 4].find(i => i == currType)">
            <p style="margin-top:3.8rem">
                <span>loading</span>
                <InlineLoading></InlineLoading>
            </p>
        </div>

        <x-dialog v-model="dialogShow">
        </x-dialog>

        <div class="luzhu-select" v-show="dialogShow">
            <div class="select-head">
                <span @click="dialogHide">取消</span>
                <span @click="qurenselect" style="color: #1486FF;">确认</span>
            </div>
            <div class="select-content">
                <div class="all-select">
                    <span @click="allSelect">全选</span>
                    <span @click="selectList2=[]">清空</span>
                </div>
                <div class="select-list">
                    <ul>
                        <li v-for="(i,t) in selectList1" :class="{active:selectList2.indexOf(t)!=-1}" :key="t" @click="selectClick(t)">{{i.label=='第1名'?'冠军':i.label}}</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    // 赛车走势
    import Movements from "../../views/toolViews/movements.vue";
    // 路珠
    import luzhu from "../../views/toolViews/luzhu.vue";
    // 六合彩路珠
    import lhcLuzhu from "../../views/toolViews/lhcLuzhu.vue";
    // 形态走势
    import xintaiMovement from "../../views/toolViews/xintaiMovement.vue";
    // 龙虎走势
    import longhuMovement from "../../views/toolViews/longhuMovement.vue";
    import sscMovements from "../../views/toolViews/sscMovements.vue";
    import myScroll from "../../components/myScroll.vue";
    import { Flexbox, FlexboxItem, InlineLoading,XDialog } from "vux";
    import picker from "vue-pickers";
    export default {
        name: "lz",
        data(){
            return{
                currId:1,
                lzType:'daxiao',
                isload:false,
                dayMode: 0,
                rankNum: 1,
                selectList1:[],
                selectList2:[],
                selectList3:[],
                selectList4:[1,2,3,4,5],
                selectNumData: [[]],
                selectNumData2: [[]],
                selectNumData3: [[]],
                selectNumData4:[[
                    {label:'前三形态',value:[7,10]},
                    {label:'中三形态',value:[8,11]},
                    {label:'后三形态',value:[9,12]},
                ]],
                pickershow1: false,
                pickershow2: false,
                pickershow3: false,
                pickershow4: false,
                currItem:1,
                currType:3,
                currTypeItem:1,
                ranking: "冠军",
                sscRanking: "第1球",
                issueText: "近10期",
                xtrankNum:[7,10],
                xintai:'前三形态',
                isshowBtn:true,
                rankNumShow:[1,3,5],
                sUpFlag:true,
                playList:{},
                isL: false, //是否显示 下拉刷新的组件
                isLup: false, //是否显示 上拉加载更多的组件
                isUpFlag: false, //是否开启上拉加载更多 默认不开启
                dialogShow:false,
                issueNum: 10,
                loadHeight:374,
                currTypeLZ: 1, //路珠二级
                currTypeZS: 1, //走势二级,
                selectDefault:0,
                // top1:8,
                // top2:9.5
            }
        },
        created(){
            console.log(this.LotteryId);
            this.currId = this.LotteryId;
            for (let i = 1; i < 11; i++) {
                this.selectNumData[0].push({
                    label: i == 1 ? "冠军" : "第" + i + "名",
                    value: i
                });
            }
            for (let i = 1; i < 6; i++) {
                this.selectNumData2[0].push({
                    label: "第" + i + "球",
                    value: i
                });
            }
            let issuearr = [10, 30, 60, 90];
            for (let i = 0; i < issuearr.length; i++) {
                this.selectNumData3[0].push({
                    label: "近" + issuearr[i] + "期",
                    value: issuearr[i]
                });
            }

            // if(this.isHideVideo){
            //     this.top1 = 2.75
            //     this.top2 = 4.2
            //
            // }else{
            //     this.top1 = 8
            //     this.top2 = 9.5
            // }
        },
        watch:{
            dayMode: function() {
                this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
            },
            rankNum: function() {
                this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
            },
            currId:function(){
                this.getOption();
                // this.selectList4=[1];
                this.selectList4=this.selectList2.map(i=>{return i+1});
            },
            lzType:function(n){
                this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
                this.isshowBtn=true;
                if(n=='longhu'&&[1,10].find(i=>i==this.currId)){
                    this.isshowBtn=false
                }
                if(n=='zonghe'){
                    this.isshowBtn=false;
                    this.rankNumShow=[1,2]
                }
                if(n=='gy'){
                    this.isshowBtn=false;
                    this.rankNumShow=[1,2]
                }
                if(n=='longhu'){
                    this.getLhOption()
                }else if(n=='qianhou'){
                    this.getNumOption(1)
                }else if(n=='num'){
                    this.getNumOption(0)
                }else{
                    this.getOption()
                }
                this.selectList4=this.selectList2.map(i=>{return i+1});
            },
            selectList4:function(n){
                this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
            },
            currType:function () {
               this.currTypeItem = 1;
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            },
            currTypeItem:function(v){
                this.issueNum=10;
                this.issueText='近10期'
                this.xintai='前三形态'
                this.xtrankNum=[7,10]
                this.sscRanking="第一球"
                this.rankNum=1
                this.selectDefault=0
            }
        },
        mounted(){
             this.getOption()
            // this.loadHeight=window.innerHeight-document.querySelector('.lottery').scrollHeight;
        },
        methods:{
            getlzLh() {
                this.currTypeLZ = 3;
                this.lzType = "longhu";
                this.rankNum = 1;
                this.ranking = "冠军";
                this.selectNumData[0].splice(0, 11);
                for (let i = 1; i < 6; i++) {
                    this.selectNumData[0].push({
                        label: i == 1 ? "冠军" : "第" + i + "名",
                        value: i
                    });
                }
                this.selectNumData[0].push({ label: "全部名次", value: 0 });
            },
            getlzQh() {
                this.rankNum = 1;
                this.ranking = "号码1";
                this.selectNumData[0].splice(0, 11);
                for (let i = 1; i < 11; i++) {
                    this.selectNumData[0].push({
                        label: "号码" + i,
                        value: i
                    });
                }
                this.selectNumData[0].push({ label: "全部号码", value: 0 });
            },
            getlzDx() {
                if (this.selectNumData[0].length == 6) {
                    this.selectNumData[0].splice(5, 6);
                    for (let i = 6; i < 11; i++) {
                        this.selectNumData[0].push({
                            label: i == 1 ? "冠军" : "第" + i + "名",
                            value: i
                        });
                    }
                    this.selectNumData[0].push({ label: "全部名次", value: 0 });
                } else {
                    if (this.selectNumData[0][0].label != "冠军") {
                        this.rankNum = 1;
                        this.ranking = "冠军";
                        this.selectNumData[0].splice(0, 11);
                        for (let i = 1; i < 11; i++) {
                            this.selectNumData[0].push({
                                label: i == 1 ? "冠军" : "第" + i + "名",
                                value: i
                            });
                        }
                        this.selectNumData[0].push({ label: "全部名次", value: 0 });
                    }
                }
            },
            showLoading(i){
                if(i==0&&this.currTypeItem!=2){
                    this.currTypeItem = 2;this.isload=true;
                }
                if(i==1&&this.currTypeItem!=3){
                    this.currTypeItem = 3;this.isload=true;
                }
            },
            selectClick(i){
                let index=this.selectList2.indexOf(i)
                if(index==-1){
                    this.selectList2.push(i)
                }else{
                    this.selectList2.splice(index,1)
                }
            },
            allSelect(){
                let arr=[];
                this.selectList1.forEach((i,d)=>{
                    arr.push(d)
                })
                this.selectList2=arr
            },
            qurenselect(){
                if(this.selectList2.length==0){
                     this.$vux.toast.text('至少选择一个', 'middle')
                }else{
                this.dialogShow = false;
                this.luzhuFormat(this.selectList2)
                }
                
            },
            dialogHide(){
                this.dialogShow = false;
                this.selectList2=this.selectList3;
            },
            getOption(){
                let arr=[];
                let arr2=[];
                if(this.currId!=''){
                    if([1,8,10].find(res=>res==this.currId)){
                        if(this.currId==8){
                            for(let i=1;i<8;i++){
                                arr.push({
                                    label:i==7?"特码":"正码"+i,
                                    value:i
                                })
                                arr2.push(i-1)
                            }
                        }else{
                            for(let i=1;i<6;i++){
                                arr.push({
                                    label:'第'+i+'球',
                                    value:i
                                })
                                arr2.push(i-1)
                            }
                        }
                    }else{
                        for(let i=1;i<11;i++){
                            arr.push({
                                label:'第'+i+'名',
                                value:i
                            })
                            arr2.push(i-1)
                        }
                    }
                }else{
                    for(let i=1;i<6;i++){
                        arr.push({
                            label:'第'+i+'球',
                            value:i
                        })
                        arr2.push(i-1)
                    }
                }
                this.selectList1=arr;
                this.selectList2=arr2;
            },
            getLhOption(){
                let arr=[];
                let arr2=[];
                for(let i=1;i<6;i++){
                    arr.push({
                        label:'第'+i+'名',
                        value:i
                    })
                    arr2.push(i-1)
                }
                this.selectList1=arr;
                this.selectList2=arr2;
            },
            getNumOption(i){
                let arr=[];
                let arr2=[];
                if(i){
                    for(let i=1;i<11;i++){
                        arr.push({
                            label:'号码'+i,
                            value:i
                        })
                        arr2.push(i-1)
                    }
                }else{
                    for(let i=0;i<10;i++){
                        arr.push({
                            label:'号码'+i,
                            value:i
                        })
                        arr2.push(i)
                    }
                }
                this.selectList1=arr;
                this.selectList2=arr2;
            },
            showSelectlz(){
                this.dialogShow = true;
                let active=document.querySelectorAll(".select-list ul li");
                this.selectList3=[];
                active.forEach((i,d)=>{
                    if(i.className=='active'){
                        this.selectList3.push(d)
                    }
                })
            },
            getluNum(){
                this.rankNum = 1;
                this.sscRanking = "号码0";
                this.selectNumData2[0].splice(0, 11);
                for (let i = 1; i < 11; i++) {
                    this.selectNumData2[0].push({
                        label: "号码" + (i-1),
                        value: i
                    });
                }
                this.selectNumData2[0].push({ label: "全部号码", value: 0 });
            },
            luzhuFormat(d){
                this.selectList4=d.sort().map(i=>{
                    return i=i+1
                })
            },
            sscOption(){
                if(this.selectNumData2[0].length>10){
                    this.rankNum=1;
                    this.sscRanking = "第1球";
                    this.selectNumData2[0].splice(0, 11);
                    for (let i = 1; i < 6; i++) {
                        this.selectNumData2[0].push({
                            label: "第" + i + "球",
                            value: i
                        });
                    }
                    this.selectNumData2[0].push({ label: "全部号码", value: 0 });
                }
            },
            HistoryLZ() {
                this.currTypeItem = 1;
                this.currType = 3;
                (this.lzType = "daxiao"), (this.currTypeLZ = 1);
                this.rankNum = 1;
                this.dayMode = 0;
                this.sscRanking = "第1球";
                if (this.selectNumData[0].length == 10) {
                    this.selectNumData[0].push({ label: "全部号码", value: 0 });
                }
                if (this.selectNumData2[0].length == 5) {
                    this.selectNumData2[0].push({ label: "全部号码", value: 0 });
                }
                // if (this.currId != 8 && this.currId != 1 && this.currId != 10) {
                //   if (this.topHeight != 8.6) {
                //     this.topHeight = 8.6;
                //   }
                // }
                // this.topHeight = 8.5;
            },
            HistoryZS() {
                this.currType = 4;
                this.currTypeItem = 1;
                this.rankNum = 1;
                this.ranking = "冠军";
                this.dayMode = 0;
                this.selectNumData[0].splice(0, 11);
                if (this.selectNumData2[0].length == 6) {
                    this.selectNumData2[0].splice(5, 6);
                }else{
                    this.selectNumData2[0].splice(0, 11);
                    for (let i = 1; i < 6; i++) {
                        this.selectNumData2[0].push({
                            label: "第" + i + "球",
                            value: i
                        });
                    }
                }
                this.sscRanking = "第1球";
                for (let i = 1; i < 11; i++) {
                    this.selectNumData[0].push({
                        label: i == 1 ? "冠军" : "第" + i + "名",
                        value: i
                    });
                }
                // if (this.topHeight != 8.5) {
                //     this.topHeight = 8.5;
                //     // }
                // }
            },
            // 选择号码
            pickerconfirm1(i) {
                // this.$refs.movements.getOpenInfo(i[0].value)
                this.ranking = i[0].label;
                this.rankNum = i[0].value;
            },
            pickerconfirm2(i) {
                this.sscRanking = i[0].label;
                this.rankNum = i[0].value;
            },
            pickerconfirm3(i) {
                this.issueText = i[0].label;
                this.issueNum = i[0].value;
            },
            pickerconfirm4(i) {
                this.xintai = i[0].label;
                this.xtrankNum = i[0].value;
            },
        },
        components:{
            luzhu,
            myScroll,
            XDialog,
            Flexbox,
            FlexboxItem,
            Movements,
            lhcLuzhu,
            xintaiMovement,
            longhuMovement,
            sscMovements,
            picker,
            InlineLoading
        },
        props:{
            LotteryId:{
                type:Number,
                default:1
            },
            isHideVideo:{
                type:Boolean,
                default:false
                },
            top:{
                type:Number,
                default:9.5
            },
            topNav:{
                type:Number,
                default:8
            }
        }
    }
</script>

<style scoped lang="less">
.lz-tab{
    overflow: hidden;
    padding: .4rem 0 .6rem 0;
    position: absolute;
    // top:8rem;
    width: 100%;
    background: #fff;
    .lz-tab-item{
        color: #71819D;
        width: 50%;
        text-align: center;
        float: left;
        font-weight: 500;
        font-size: .38rem;
        position: relative;
        &.active{
            font-weight: bold;
            color: #1486FF;
            &:after{
                content: '';
                position: absolute;
                height: 0.1rem;
                width: 0.5rem;
                left: 50%;
                bottom: -0.3rem;
                transform: translateX(-50%);
                background: #1486FF;
                border-radius: 5px;
            }
        }
    }

}
.tab-box2 {
    width: 92%;
    margin: 0 auto;
    /*position: absolute;*/
    /*top:9.5rem;*/
    /*z-index: 999;*/
    /*left: .3rem;*/
}
.tab-box,.tab-box2 {
    // height: 1.415rem;
    // width: 92%;
    // margin: 0 auto;

    > div {
        padding-top: 0.35rem;
        margin-left: 0.4rem;
    }
    ul {
        // margin-left: 0.4rem;
        li {
            float: left;
            padding: 0 0.54rem;
            background: #F6F7FB;
            border-radius: 100px;
            height: 0.67rem;
            line-height: 0.67rem;
            margin-right: 0.275rem;
            font-size: 0.32rem;
            color: #445779;
            cursor: pointer;
            &.active {
                color: #1486FF;
                background: #DCE8FB;
            }
        }
    }
    .lz-box {
        li {
            padding: 0 0.42rem;
            &:nth-last-child(1) {
                margin-right: 0;
            }
        }
    }
}
.select-box {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding-left: 0.3rem;
    /*position: absolute;*/
    /*width: 100%;*/
    /*top:10.4rem;*/
    /*z-index: 999;*/
    background: #fff;
    height: 1rem;

    .select-num {
        font-size: 15px;
        font-weight: bold;
        margin-right: 0.3rem;
    }
    .select-day {
        display: flex;
        position: absolute;
        right: 0;
        div {
            padding: 0.1rem 0.25rem;
            color:#445779;
        }
        .active {
            color: #1486FF;
        }
    }
}
.luzhu-select{

    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    text-align: center;
    color:#445779;
    .select-head{
        display: flex;justify-content: space-between;background: #f5f5f5;
        span{padding: 0.2rem 0.3rem;font-size: 14px;}
    }
    .select-content{
        background: #fff;
        .all-select{
            display: flex;justify-content: center;
            font-size: 14px;
            span{padding: 0.2rem 0.3rem;margin: 0 0.2rem;}
        }
        .select-list{
            padding-bottom: 0.2rem;
            ul{
                padding: 0 0.2rem;
                display: flex;
                flex-wrap:wrap;
                li{width: 20%;margin: 0.2rem 2.5%;font-size: 14px;padding: 0.16rem;background: #f5f7fa;border-radius: 0.4rem;}
                .active{
                    // background-image: linear-gradient(to right, #ff3433, #ff7e66);
                    background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                color: #fff;}
            }
        }
    }

}
.zsloading-box{
    top:8rem;
    width: 100%;height:520px;position: fixed;bottom: 1.5rem;background: rgba(255, 255, 255, 0.71);z-index: 1000;text-align: center;
}
</style>