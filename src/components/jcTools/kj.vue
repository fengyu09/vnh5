<template>
    <div>
        <div class="tab-box" :class="currType == 1 ? 'tab-box1' : ''">
            <div
                    v-if="currId != 8 && currId != 1 && currId != 10  && currId != 28&& currId != 30&& currId != 31&& currId != 5&& currId != 14"
                    class="tab-box2"
                    :style="'top:'+topNav+'rem'"
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
            <div class="tab-box2" v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31 || currId == 14 || currId == 5" :style="'top:'+topNav+'rem'">
                <ul v-if="currType == 1">
                    <li
                            @click="currTypeItem = 1"
                            :class="currTypeItem == 1 ? 'active' : ''"
                    >
                        号码
                    </li>
                    <li
                        v-if="currId != 14 && currId != 5"
                            @click="currTypeItem = 2"
                            :class="currTypeItem == 2 ? 'active' : ''"
                    >
                        大小
                    </li>
                    <li
                            v-if="currId != 14 && currId != 5"
                            @click="currTypeItem = 3"
                            :class="currTypeItem == 3 ? 'active' : ''"
                    >
                        单双
                    </li>
                    <li
                            v-if="currId != 14 && currId != 5"
                            @click="currTypeItem = 5"
                            :class="currTypeItem == 5 ? 'active' : ''"
                    >
                        总和/形态
                    </li>
                </ul>
            </div>
            <div
                    class="tab-box2"
                    v-if="currType == 3 && [1,10].find(res => currId == res)"
                    style="padding-top: 0;margin-bottom:0.3rem"
                    :style="'top:'+top1+'rem'"
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
            <div class="lhc-tab" v-if="currType==3&&currId==8">
                <myScrollX >
                    <div
                            class="tab-box2"
                            style="padding-top: 0;margin-bottom:0.3rem;width:12rem"
                            v-if="currId==8"
                            :style="'top:'+topNav+'rem'"
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
                    style="margin-top: -0.3rem;"
                    :style="'top:'+top1+'rem'"
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
            <div class="tab-box2" v-if="currId == 8&&currType!=3" :style="'top:'+topNav+'rem'">
            <!-- <div class="tab-box2" :style="'top:'+topNav+'rem'" v-if="currId == 8&&currType!=3"> -->
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
        </div>
        <myScroll
                ref="scrollWrapper"
                :data="playList"
                :probeType="4"
                :top="top"
                v-on:func="reLoad"
                :isUp="isUpFlag"
                :isloadUp="isLup"
                :left="0"
                :bottom="0"
                :zIndex="999"
                class="scroll-item"
        >
            <div class="history-content" style="margin-left: 2.6%;">
                <!-- <p class="loading" v-if="isLoadingHistory">Đang nhận...</p> -->
                <div class="no-data"  v-if="!historyList.length && !isLoadingHistory" >
                    暂无数据
                </div>
                <div v-if="isLoadingHistory">
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                    <dl class="gray">
                        <dt class="clearfix">
                            <span class="sp1"></span>
                            <span class="sp2"></span>
                        </dt>
                        <dd>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </dd>
                    </dl>
                </div>

                <dl
                        v-if="historyList.length"
                        class="open-item"
                        v-for="(v, index) in historyList"
                        :key="index"
                >
                    <dt class="clearfix">
                      <span class="issue fl">
                        <i>{{ v.issue }}</i
                        >期
                      </span>
                        <span class="date fr">{{ v.input_time }}</span>
                    </dt>
                    <dd v-if="currId != 8 && currId != 1 && currId != 10 && currId != 28&& currId != 30&& currId != 31&&currId != 5 &&currId != 14 ">
                      <span
                              v-if="currTypeItem == 1"
                              class="open-num"
                              v-for="(ball, index1) in v.code.split(',')"
                              :key="index1"
                              :class="ball | filterBallColor"
                      >{{ ball }}</span
                      >
                        <span
                                v-if="currTypeItem == 2"
                                class="open-num"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDx(5) | filterBgColor"
                        >{{ ball | filterDx(5) }}</span
                        >
                        <span
                                v-if="currTypeItem == 3"
                                class="open-num"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDs | filterBgColor"
                        >{{ ball | filterDs }}</span
                        >
                        <div v-if="currTypeItem == 4" class="clearfix longhu-box">
                            <!-- 冠亚和 -->
                            <span
                                    class="fl open-num-dx open-num-zh"
                                    v-if="v.code.substring(1) != ','"
                            >{{ v.code.substring(0, 4) | filterPk10Gyh }}</span
                            >
                            <span
                                    class="fl open-num-dx open-num-zh"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) != ','
                          "
                            >{{ v.code.substring(0, 4) | filterPk10Gyh }}</span
                            >
                            <span
                                    class="fl open-num-dx open-num-zh"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) == ','
                          "
                            >{{ v.code.substring(0, 3) | filterPk10Gyh }}</span
                            >
                            <!-- 大小 -->
                            <span
                                    class="fl open-num-dx"
                                    v-if="v.code.substring(1) != ','"
                            >{{ v.code.substring(0, 4) | filterPK10ElseDX }}</span
                            >
                            <span
                                    class="fl open-num-dx"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) != ','
                          "
                            >{{ v.code.substring(0, 4) | filterPK10ElseDX }}</span
                            >
                            <span
                                    class="fl open-num-dx"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) == ','
                          "
                            >{{ v.code.substring(0, 3) | filterPK10ElseDX }}</span
                            >
                            <!-- 单双 -->
                            <span
                                    class="fl open-num-dx"
                                    v-if="v.code.substring(1) != ','"
                            >
                          {{ v.code.substring(0, 4) | filterPk10Gyh | filterDs }}
                        </span>
                            <span
                                    class="fl open-num-dx"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) != ','
                          "
                            >
                          {{ v.code.substring(0, 4) | filterPk10Gyh | filterDs }}
                        </span>
                            <span
                                    class="fl open-num-dx"
                                    v-else-if="
                            v.code.substring(1) == ',' && v.code.substring(3) == ','
                          "
                            >
                          {{ v.code.substring(0, 3) | filterPk10Gyh | filterDs }}
                        </span>
                            <!-- 龙虎 -->
                            <ul class="clearfix fr open-num-lh">
                                <li
                                        class="fl open-num"
                                        :class="v.code | filterLhh('十v一') | filterBgColor"
                                >
                                    {{ v.code | filterLhh("十v一") }}
                                </li>
                                <li
                                        class="fl open-num"
                                        :class="v.code | filterLhh('九v二') | filterBgColor"
                                >
                                    {{ v.code | filterLhh("九v二") }}
                                </li>
                                <li
                                        class="fl open-num"
                                        :class="v.code | filterLhh('八v三') | filterBgColor"
                                >
                                    {{ v.code | filterLhh("八v三") }}
                                </li>
                                <li
                                        class="fl open-num"
                                        :class="v.code | filterLhh('七v四') | filterBgColor"
                                >
                                    {{ v.code | filterLhh("七v四") }}
                                </li>
                                <li
                                        class="fl open-num"
                                        :class="v.code | filterLhh('六v五') | filterBgColor"
                                >
                                    {{ v.code | filterLhh("六v五") }}
                                </li>
                            </ul>
                        </div>
                    </dd>
                    <dd v-if="currId == 8" class="open-num-sixBox">
                      <span
                              class="open-num open-num-six"
                              v-for="(ball, index1) in v.code.split(',')"
                              :key="index1"
                              :class="ball | filterSixBs"
                              v-if="currTypeItem1 == 0"
                      >{{ ball }}</span
                      >
                        <div v-if="currTypeItem1 == 1" class="open-num-six1">
                            <span class="opns">{{ v.code | filtersSum }}</span>
                            <span :class="v.code | filterDs | filterColor">{{
                          v.code | filterDs
                        }}</span>
                            <span :class="v.code | filterDx(174) | filterColor">{{
                          v.code | filterDx(174)
                        }}</span>
                            <span :class="v.code | filterqsb | filterColor">{{
                          v.code | filterqsb
                        }}</span>
                        </div>
                        <div v-if="currTypeItem1 == 2" class="open-num-six1">
                        <span
                                :class="v.code.split(',')[6] | filterSixDS | filterColor"
                        >{{ v.code.split(",")[6] | filterSixDS }}</span
                        >
                            <span
                                    :class="
                            v.code.split(',')[6] | filterSixHdxh | filterColor
                          "
                            >{{ v.code.split(",")[6] | filterSixHdxh }}</span
                            >
                            <span
                                    class="open-num-six3"
                                    :class="
                            v.code.split(',')[6] | filterSixTmHds | filterColor
                          "
                            >{{ v.code.split(",")[6] | filterSixTmHds }}</span
                            >
                            <span
                                    class="open-num-six3"
                                    :class="
                            v.code.split(',')[6] | filterSixTmHdx | filterColor
                          "
                            >{{ v.code.split(",")[6] | filterSixTmHdx }}</span
                            >
                            <span
                                    class="open-num-six3"
                                    :class="v.code.split(',')[6] | filterWdx | filterColor"
                            >{{ v.code.split(",")[6] | filterWdx }}</span
                            >
                        </div>
                        <div class="zodiac clearfix" v-if="currTypeItem1 == 0">
                            <span  class="fl add-icon"  v-for="(ball, index1) in v.code.split(',')">{{ball| filterSixSX(v.issue)}}</span>
                        </div>
                    </dd>
                    <dd v-if="currId == 1 || currId == 10|| currId == 28|| currId == 30|| currId == 31">
                      <span
                              v-if="currTypeItem == 1"
                              class="open-num ssc-ball"
                              v-for="(ball, index1) in v.code.split(',')"
                              :key="index1"
                      >{{ ball }}</span
                      >
                        <span
                                v-if="currTypeItem == 2"
                                class="open-num ssc-ball"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDx(4) | filterBgColor"
                        >{{ ball | filterDx(4) }}</span
                        >
                        <span
                                v-if="currTypeItem == 3"
                                class="open-num ssc-ball"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDs | filterBgColor"
                        >{{ ball | filterDs }}</span
                        >
                        <div v-if="currTypeItem == 5" class="open-num-xt">
                        <span
                                class="open-num-dx open-num-zh open-num-size"
                                :class="v.code | filtersSum | filterBallColor1"
                        >{{ v.code | filtersSum }}</span
                        >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filtersSum | filterDx(22) | filterColor"
                            >{{ v.code | filtersSum | filterDx(22) }}</span
                            >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filtersSum | filterDs | filterColor"
                            >{{ v.code | filtersSum | filterDs }}</span
                            >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filterLhh('一v五') | filterColor"
                            >{{ v.code | filterLhh("一v五") }}</span
                            >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filterBs(1) | filterColor"
                            >{{ v.code | filterBs(1) }}</span
                            >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filterBs(2) | filterColor"
                            >{{ v.code | filterBs(2) }}</span
                            >
                            <span
                                    class="open-num-dx"
                                    :class="v.code | filterBs(3) | filterColor"
                            >{{ v.code | filterBs(3) }}</span
                            >
                        </div>
                    </dd>
                    <dd v-if="currId == 5||currId == 14">
                      <span
                              v-if="currTypeItem == 1"
                              class="open-num fc-color"
                              v-for="(ball, index1) in v.code.split(',')"
                              :key="index1"
                      >{{ ball }}</span
                      >
                        <span
                                v-if="currTypeItem == 2"
                                class="open-num ssc-ball"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDx(4) | filterBgColor"
                        >{{ ball | filterDx(4) }}</span
                        >
                        <span
                                v-if="currTypeItem == 3"
                                class="open-num ssc-ball"
                                v-for="(ball, index1) in v.code.split(',')"
                                :key="index1"
                                :class="ball | filterDs | filterBgColor"
                        >{{ ball | filterDs }}</span
                        >
                        
                    </dd>

                    
                </dl>
                <p class="no-data-tip" v-if="deadline && !isLoadingHistory && historyList.length">
                    我是有底线滴~
                </p>
            </div>
        </myScroll>
    </div>
</template>

<script>
    import myScroll from "../myScroll.vue";
    import myScrollX from "../myScrollX.vue";
    export default {
        name: "kj",
        data(){
          return{
              playList:{},
              isL: false, //是否显示 下拉刷新的组件
              isLup: false, //是否显示 上拉加载更多的组件
              page: 1, //页码
              isMorePage: false, //判断是否有下一页
              limit: 30, //每页多少条
              topHeight:0,
              isUpFlag:true,
              historyList:[],
              currTypeItem:1,
              currTypeItem1: 0, //历史记录二级
              currType: 1,
              currId:10,//彩种id
              isLoadingHistory: true, //历史数据loading
              deadline: false, //显示我是有底线的
              date:'',
              top1:8.15,
              top2:9.6
          }
        },
        created(){
            this.currId = this.LotteryId;
            let time = new Date();
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            m = m >= 10 ? m : "0" + m;
            d = d >= 10 ? d : "0" + d;
            this.date = y + "-" + m + "-" + d;
            this.getHistoryList();
            // if(this.isHideVideo){
            //     this.top1 = 2.9
            //     this.top2 = 4.3
            //
            // }else{
            //     this.top1 = 8.15
            //     this.top2 = 9.6
            // }
        },
        methods:{
            reLoad(data) {
                if (data == "down") {
                    //                this.refreshData(data)
                } else if (data == "up") {
                    this.loadMore();
                }
            },
            async loadMore(id) {
                //判断是否有下一页
                if (!this.isMorePage) return;
                //判断节流阀
                if (!this.isUpFlag) return;
                //      console.log(this.isUpFlag);
                this.isLup = true;
                this.page++;
                let res = "";
                if (this.currType == 1) {
                    res = await this.$http.post("/open/idx/history", {
                        lottery_id: id || this.currId,
                        belong_date: this.date,
                        nums: this.limit,
                        page: this.page
                    });
                } else if (this.currType == 2) {
                    res = await this.$http.get("/forum/plan/index", {
                        params: {
                            lottery_id: id || this.currId,
                            issue: this.currIssue,
                            limit: this.limit,
                            page: this.page
                        }
                    });
                }
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
                    if (this.currType == 1) {
                        this.historyList = this.historyList.concat(res.data.data);
                        this.playList.history = this.historyList;
                    } else if (this.currType == 2) {
                        this.expertPlan = this.expertPlan.concat(res.data.data);
                        this.playList.plan = this.expertPlan;
                    }
                    setTimeout(() => {
                        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                    }, 20);
                } else if (res && res.data.code == -1) {
                    this.isMorePage = false;
                    this.isUpFlag = false;
                    this.deadline = true;
                }
            },
            //获取历史开奖
            async getHistoryList(id) {
                this.isLoadingHistory = true;
                this.historyList = [];
                let res = await this.$http.post("/open/idx/history", {
                    lottery_id: id || this.currId,
                    belong_date: this.date,
                    nums: this.limit
                });
                this.isLoadingHistory = false;
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
                    this.historyList = res.data.data || [];
                    this.playList.history = this.historyList;
                } else if (res && res.data.code == -1) {
                    this.historyList = [];
                }
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
            isHideVideo:{
                type:Boolean,
                default:false
            },
            top:{
                type:Number,
                default:9.6
            },
            topNav:{
                type:Number,
                default:8.15
            }
        },
        watch:{
            'currTypeItem':function () {
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            }
        }
    }
</script>

<style scoped lang="less">
    .tab-box {
        // height: 1.415rem;
        // width: 92%;
        // margin: 0 auto;
        /*padding: .3rem 0;*/
        > div {
            padding: 0.4rem 0 .4rem .3rem;
            border-bottom: 1px solid #eee;
            /*margin:0 0.3rem;*/
        }
        ul {
            // margin-left: 0.4rem;
            overflow: hidden;
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
    .tab-box2{
        position: absolute;
        // top:8.15rem;
        z-index: 999;
        background: #fff;
        width: 100%;
    }
    .history-content {
        width: 94.66%;
        background: #fff;
        .open-item {
            /*padding: 0.3rem 0 .3rem .2rem;*/
            padding: 0.3rem 0;
            border-top: 1px solid #eee;
            background: #fff;
            // margin: 0 3.5%;//1.0
            dt {
                /*margin-right: .2rem;*/
                font-size: 0.33rem;
                // padding-top: 0.1rem;
                // padding-top: 0.2rem;
                .issue {
                    color:#445779;
                    font-size: 0.38rem;
                    font-family: number1;
                    i {
                        padding-right: 0.05rem;
                    }
                }
                .date {
                    display: block;
                    color: #445779;
                    font-size: 0.32rem;
                    font-family: number2;
                }
            }
            dd {
                padding-top: 0.2rem;
            }
            .open-num {
                width: 0.8rem;
                height: 0.8rem;
                text-align: center;
                line-height: 0.8rem;
                display: inline-block;
                background-image: linear-gradient(to bottom right, #e12525, #eb6f6f);
                color: #fff;
                font-size: 0.38rem;
                /*color: #ff513e;*/
                font-family: number1;
                border-radius: 50%;
                // margin: 0 0.08rem 0.1rem 0;//1.0
                margin: 0 0 0.1rem 0.135rem;
            }
            .open-num-sixBox {
                > span {
                    &:nth-last-child(1) {
                        margin-left: 5.68%;
                        &:before {
                            content: "";
                            position: absolute;
                            background: url("../../assets/images/main/six_add.png") no-repeat;
                            width: 0.24rem;
                            height: 0.24rem;
                            background-size: contain;
                            position: absolute;
                            left: -68%;
                            top: 0.31rem;
                        }
                    }
                }
            }
            .open-num-six {
                margin: 0 0.27rem 0.135rem 0;
                position: relative;
            }
            .open-num-six1 {
                font-family: number1;
                font-weight: bold;
                font-size: 0.38rem;
                margin-left: 0.4rem;
                .opns {
                    color: #ff513e;
                }
                span {
                    // margin-right: 0.8rem;
                    margin-right: 0.6rem;
                    width: 0.65rem;
                    display: inline-block;
                }
                .open-num-six3 {
                    width: 0.85rem;
                }
            }
            .open-num-dx {
                width: 0.8rem;
                height: 0.8rem;
                text-align: center;
                line-height: 0.8rem;
                display: inline-block;
                font-family: number1;
                margin: 0 0.4rem 0.1rem 0;
                font-size: 0.38rem;
                font-weight: bold;
            }
            .open-num-zh {
                color: #ff513e;
            }
            .open-num-size {
                font-size: 0.4rem;
            }
            .open-num-lh {
                li {
                    margin: 0 0.268rem 0.1rem 0;
                    &:nth-last-child(1) {
                        margin: 0 0 0.1rem 0;
                    }
                }
            }
            .open-num-xt {
                margin-left: 0.2rem;
            }
            .ssc-ball {
                // background: #0084ff;
                background: linear-gradient(
                        0deg,
                        rgba(80, 129, 255, 1) 0%,
                        rgba(107, 194, 255, 1) 100%
                );
                margin: 0 0.4rem 0.1rem 0;
            }
        }
        .zodiac{
            display: block !important;
            span{
                display: block;
                width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                text-align: center;
                margin-right: 0.28rem;
                color:#445779;
                background: none;
                margin-bottom: 0 !important;
            }
        }
    }
    .no-data {
        margin-top: 1rem;
        text-align: center;
        font-size: 0.35rem;
        // background: rgb(247, 247, 247);
    }
    .no-data-tip {
        // background: #f7f7f7;
        text-align: center;
        font-size: 0.33rem;
        padding: 0.4rem 0 0.8rem 0;
        color: #666;
    }

    .gray {
        padding: 0.3rem 0;
        border-bottom: 1px solid #f5f5f5;
        background: #fff;
        margin: 0 3.5%;
        dt {
            .sp1 {
                display: block;
                float: left;
                width: 60px;
                height: 15px;
                background: #ededed;
                border-radius: 3px;
            }
            .sp2 {
                display: block;
                float: right;
                width: 100px;
                height: 15px;
                background: #ededed;
                border-radius: 3px;
            }
        }
        dd {
            padding-top: 0.3rem;
            span {
                width: 0.79rem;
                height: 0.79rem;
                text-align: center;
                line-height: 0.8rem;
                display: inline-block;
                background: #ededed;
                font-family: number1;
                border-radius: 50%;
                margin: 0 0 0.1rem 0;
            }
        }
    }


</style>