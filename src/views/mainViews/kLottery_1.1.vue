<template>
  <div class="history-container">
    <header class="home-header open-num-header" 
           :class="[{'header-kj':isNew==0},
                    {headerbg:isNew==1},
                    {'header-dw':isNew==2},
                    {'header-qrj':isNew==3},
                    {'header-gq':isNew==4},
                    {'header-sdj':isNew==5},
                    {'header-ox':isNew==6},
                    {'header-uefa':isNew==7},
                    {'whiteColor':isNew==2 || isNew==3|| isNew==4}
                    ]">
                    <div @click="goback()" class="back-icon"></div>
                    开奖中心  
                    <i style="position: absolute;right: 0.2rem;font-size: 0.34rem;" @click="$router.push({path:'rule',query: {lottery_id:currId}})">玩法规则</i> 
     </header>

    <div :class="[{lottery:isNew==0 },{lotteryPad:isNew==1|| isNew==2 || isNew==3 || isNew==4|| isNew==5|| isNew==6|| isNew==7}]" >
      <!--彩种类型-->
      <div class="lottery-type">
        <myScrollX v-if="allLottery.length">
          <div class="clearfix preview-list" ref="personTab">
            <div
              v-for="(v, index) in allLottery"
              :key="index"
              class="lottery-item"
              @click="
                changeLottery(v.lottery_id, v.cname, v.video_url, v.anchor_id)
              "
              :class="
              [{'active':v.lottery_id == currId &&isNew == 1},
              {'active':v.lottery_id == currId &&isNew == 0},
              {'active-dw':v.lottery_id == currId &&isNew ==2},
              {'active-qrj':v.lottery_id == currId &&isNew ==3},
              {'active-gq':v.lottery_id == currId &&isNew ==4},
              {'active-sdj':v.lottery_id == currId &&isNew ==5},
              {'active-ox':v.lottery_id == currId &&isNew ==6},
              {'active-uefa':v.lottery_id == currId &&isNew ==7},
              ]"
            >
              <span class="preview">{{ v.cname }}</span>
            </div>
          </div>
        </myScrollX>

        <div class="no-lottery" v-else>
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
        </div>
      </div>
      <!--当前开奖号码-->
      <div class="open-num-box">
        <!--<h3>{{ currName }}</h3>-->
        <div class="curr-open-ball">
          <div class="curr-time clearfix">
            <div class="fl curr-period">
              <i>{{ currBallDel.issue }}</i
              >期开奖结果
            </div>
            <div class="fr">
              距下次
              <span class="count-down-time">{{ djsTime }}</span>
              <a
                v-if="currRoomId != undefined"
                href="javascript:;"
                class="open-video"
                @click="$router.push('/chat/' + currRoomId)"
              >
              
                <img v-if="$store.state.isPure!=1" src="../../assets/images/main/video.png" alt />
              </a>
            </div>
          </div>
          <div
            class="curr-ball"
            v-if="currBall.length"
            :class="
              currId == 1 || currId == 10 || currId == 8 || currId == 28|| currId == 30|| currId == 31|| currId == 14|| currId == 5? 'curr-ballOne' : ''
            "
          >
            <div
              v-for="(v, index) in currBall"
              :key="index"
              :class="index == 6 ? 'lastBall' : ''"
              class="sixBall"
              v-if="currId == 8"
            >
              <span :class="v | filterSixBs">{{ v }}</span>
            </div>
            <i v-if="currId == 8" class="add-icon"></i>
            <div
              v-if="currId != 8 && currId != 1 && currId != 10 && currId != 28&& currId != 30&& currId != 31&& currId != 14&& currId != 5"
              v-for="(v, index) in currBall"
              :key="index"
            >
              <span :class="v | filterBallColor">{{ v }}</span>
            </div>
            <div
              v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31 || currId == 5 || currId == 14"
              v-for="(v, index) in currBall"
              :key="index"
              class="curr-ballTwo"
            >
              <span :class="[{'fc-color':currId == 5 || currId == 14}]">{{ v }}</span>
            </div>
             <div class="zodiac"  v-if="currId == 8" >
              <span class="fl"  v-for="(v, index) in currBall" :key="index" >{{ v | filterSixSX( currBallDel.issue) }}</span>
            </div>
          </div>
         
          <div class="no-open" v-else>开奖中...</div>
        </div>
      </div>
      <div class="open-num-history">
        <!--切换的部分-->
        <div class="history-list">
          <span
            class="tab-item history-item"
            @click="HistoryHM()"
            :class="[{active:currType == 1 && isNew == 1},
            {active:currType == 1 && isNew == 0 },
            {'active-dw':currType == 1 && isNew == 2},
            {'active-qrj':currType == 1 && isNew == 3},
            {'active-gq':currType == 1 && isNew == 4},
            {'active-sdj':currType == 1 && isNew == 5},
            {'active-ox':currType == 1 && isNew == 6},
            {'active-uefa':currType == 1 && isNew == 7},
            ]"
            >历史开奖</span
          >
          <span
            class="tab-item"
            @click="HistoryLZ()"
            v-if="currId!=5&&currId!=14"
            :class="[{active:currType == 3 && isNew == 0 },
            {active:currType == 3 &&  isNew == 1},
            {'active-dw':currType == 3 && isNew == 2},
            {'active-qrj':currType == 3 && isNew == 3},
            {'active-gq':currType == 3 && isNew == 4},
            {'active-sdj':currType == 3 && isNew == 5},
            {'active-ox':currType == 3 && isNew == 6},
            {'active-uefa':currType == 3 && isNew == 7},
            ]"
            >路珠</span
          >
          <span
            class="tab-item"
            v-if="currId != 8&&currId!=5&&currId!=14"
            @click="HistoryZS()"
            :class="[{active:currType == 4 && isNew == 0 },
            {active:currType == 4 &&  isNew == 1},
            {'active-dw':currType == 4 && isNew == 2},
            {'active-qrj':currType == 4 && isNew == 3},
            {'active-gq':currType == 4 && isNew == 4},
            {'active-sdj':currType == 4 && isNew == 5},
            {'active-ox':currType == 4 && isNew == 6},
            {'active-uefa':currType == 4 && isNew == 7},
            ]"
            >走势</span
          >
           <span
            class="tab-item"
            @click="HistoryExpertPlan()"
            :class="[{active:currType == 2 &&isNew == 0},
            {active:currType == 2 && isNew == 1 },
            {'active-dw':currType == 2 && isNew == 2},
            {'active-qrj':currType == 2 && isNew == 3},
            {'active-gq':currType == 2 && isNew == 4},
            {'active-sdj':currType == 2 && isNew == 5},
            {'active-ox':currType == 2 && isNew == 6},
            {'active-uefa':currType == 2 && isNew == 7},
            ]"
            >专家计划</span
          >
           <span
            class="tab-item"
            @click="HistoryCl()"
            :class="[{active:currType == 5 &&isNew == 0},
            {active:currType == 5 && isNew == 1 },
            {'active-dw':currType == 5 && isNew == 2},
            {'active-qrj':currType == 5 && isNew == 3},
            {'active-gq':currType == 5 && isNew == 4},
            {'active-sdj':currType == 5 && isNew == 5},
            {'active-ox':currType == 5 && isNew == 6},
            {'active-uefa':currType == 5 && isNew == 7},
            ]"
            >长龙</span>
          <!-- <span v-for="(v,i) in HistoryTitle" :key="i" :class="i==currType?'active':''" class="tab-item" @click="getHistoryTitle(i)">{{v}}</span> -->
        </div>
        <div class="tab-box" :class="currType == 1 ? 'tab-box1' : ''">
          <div
            v-if="currId != 8 && currId != 1 && currId != 10 && currId != 28 && currId != 30 && currId != 31"
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
               v-if="currId!=5&&currId!=14"
                @click="currTypeItem = 2"
                :class="currTypeItem == 2 ? 'active' : ''"
              >
                大小
              </li>
              <li
               v-if="currId!=5&&currId!=14"
                @click="currTypeItem = 3"
                :class="currTypeItem == 3 ? 'active' : ''"
              >
                单双
              </li>
              <li
                v-if="currId!=5&&currId!=14"
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
          <div class="tab-box" v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31">
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
          <div
            class="tab-box2"
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
            style="margin-top: -0.3rem;"
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
            v-show="[1, 8, 10].find(res => currId == res) && currType != 3"
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
        <!-- <div v-if="currType == 3" class="pearl">
          <div v-if="currId != 8 && currId != 1 && currId != 10" class="tab-box2 clearfix">
            <span class="fl ranking-all">全部名次</span>
            <span class="fr">
              <span>今天</span>
              <span>昨天</span>
              <span>前天</span>
            </span>
          </div>
        </div> -->
        <div class="history-content-container">
          <!--滚动部分-->
          <myScroll
            ref="scrollWrapper"
            :data="playList"
            :probeType="2"
            :top="currId == 8?topHeight2:topHeight"
            v-on:func="reLoad"
            :isUp="isUpFlag"
            :isloadUp="isLup"
            :left="0"
            :bottom="0"
            class="scroll-item"
          >
            <div
              class="history-content"
              style="margin-left: 2.6%;"
              v-show="currType == 1"
            >
              <!-- <p class="loading" v-if="isLoadingHistory">Đang nhận...</p> -->
              <div
                class="no-data"
                v-if="!historyList.length && !isLoadingHistory"
              >
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
                <dd v-if="currId != 8 && currId != 1 && currId != 10 && currId != 28&& currId != 30&& currId != 31&& currId != 5&& currId != 14">
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
                    <span class="fl"   v-for="(ball, index1) in v.code.split(',')" :key="index1" >{{ball | filterSixSX(v.issue)}}</span>
                  </div>
                </dd>
                <dd v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31 || currId == 5||currId == 14">
                  <span
                    v-if="currTypeItem == 1&&(currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31)"
                    class="open-num ssc-ball"
                    v-for="(ball, index1) in v.code.split(',')"
                    :key="index1"
                    >{{ ball }}</span
                  >
                  <span
                    v-if="currTypeItem == 1&&(currId == 5||currId == 14)"
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
              </dl>
              <p
                class="no-data-tip"
                v-if="deadline && !isLoadingHistory && historyList.length"
              >
                Tôi cũng có giới hạn đó~
              </p>
            </div>
            <div v-if="currType == 4 && ![1, 8, 10].find(res => currId == res)">
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
            <div class="plan-container" v-show="currType == 2">
              <!-- <p class="loading" v-if="isLoadingHistory">Đang nhận...</p> -->
              <div
                class="no-data"
                v-if="!expertPlan.length && !isLoadingHistory"
              >
                暂无数据
              </div>
              <div v-if="isLoadingHistory" style="background: #fff">
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
              <ul>
                <li
                  v-for="(v, index) in expertPlan"
                  :key="index"
                  :class="currType != 2 && currType != 4 ? 'li-boder' : ''"
                >
                  <!-- <dl class="clearfix">
                      <dt class="fl clearfix">
                        <span class="expert-img fl">
                          <img v-lazy="v.avatar" alt />
                        </span>
                        <span class="expert-mess fl">
                          <i class="nick-name">{{v.nickname}}</i>
                          <i class="period">{{v.issue}}期</i>
                          <i class="play-type">{{v.method}}</i>
                        </span>
                      </dt>
                      <dd class="fr rate-box">
                        <p>
                          <i class="rate">{{v.hit_rate *100}}</i>%
                        </p>
                        <span>近期命中率</span>
                      </dd>
                    </dl>
                    <div class="plan-ball clearfix">
                      <div class="ball-list fl">
                        <span
                          class="ball-item"
                          v-for="(ball,index1) in v.code.split(',')"
                          :class="ball | filterBallColor"
                        >{{ball}}</span>
                      </div>
                  </div>-->
                  <div class="clearfix">
                    <span class="expert-img fl" @click="goExpert(v.expert_id,v.lottery_id)">
                      <img v-lazy="v.avatar" alt />
                    </span>
                    <span class="fl expert-info clearfix">
                      <i class="new-nick-name fl">{{ v.nickname }}</i>
                      <span class="fr period">{{ v.issue }} 期</span>
                    </span>
                    <!-- <span class="fr period">{{v.issue}} 期</span> -->
                    <span class="percentage-box">
                      <span class="Win-rate percentage"
                        >胜率{{ v.win_rate_mul_100 }}%</span
                      >
                      <span class="Even-red percentage" v-if="v.winning>0"
                        >{{ v.winning }}连红</span
                      >
                      <span class="profit percentage"
                        >盈利{{ v.profit_rate_mul_100}}%</span
                      >
                    </span>
                  </div>
                  <div class="recommend-box">
                    <span class="method-box">{{ v.method }}</span>
                    <span
                      v-for="(ball, index1) in v.code.split(',')"
                      class="recommend"
                      :class="ball | filterBallColor1"
                      :key="index1"
                      >{{ ball }}</span
                    >
                  </div>
                  <div class="recent">
                    <span style="margin-left:0.27rem">近十期战绩:</span>
                    <span v-for="(i, index2) in v.last_10_games" :key="index2">
                      <b class="win" v-if="i == 1">胜</b>
                      <b class="lose" v-if="i == 0">负</b>
                    </span>
                    <!-- <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="lose">负</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>
                    <span class="win">胜</span>-->
                  </div>
                </li>
              </ul>
              <p
                class="no-data-tip"
                v-if="deadline && !isLoadingHistory && historyList.length"
              >
                Tôi cũng có giới hạn đó~
              </p>
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
			 <luzhu
			    :zsid="currId"
			    :dayMode="dayMode"
			    :rankNumShow="selectList4"
			    :lzType="lzType"
			    :isload.sync="isload"
			    :ranking="ranking"
			  ></luzhu>
            </div>
            <div class="pearl-road" v-if="currType == 3&&currId==8">
              <lhcLuzhu
                :zsid="currId"
                :dayMode="dayMode"
                :rankNum="rankNum"
                :lzType="lzType"
                :isload.sync="isload"
                :rankNumShow="selectList4"
              ></lhcLuzhu>
            </div>
            <div v-if="currType == 5" class="changlong">
              <table v-if="clData.length">
                <tr>
                  <td width="50%">号码</td>
                  <td>期数</td>
                </tr>
                <tr v-for="(item,index) in clData" :key="index">
                    <td>{{item.method_cname}}  {{item.result_c}}</td>
                    <td>{{item.nums}}</td>
                </tr>
              </table>
              <div style="text-align: center;font-size: 0.36rem;margin-top:0.4rem" v-else>
                <span>暂无长龙数据~</span>
              </div>
            </div>
          </myScroll>
        </div>
      </div>
    </div>

    <!--视频播放 box-->
    <div class="open-video-box" v-if="showVideo">
      <h3>开奖视频</h3>
      <div class="remove-icon" @click="showVideo = false"></div>
      <!--视频蒙版 阻止点击-->
      <div class="no-click"></div>
      <!--视频-->
      <iframe
        :src="currUrl"
        id="myiframe"
        scrolling="no"
        frameborder="0"
        :class="currId == 7 ? 'pk' : ''"
      ></iframe>
    </div>
    <!--底部-->
    <Foot v-if="$store.state.isPure==1"/>

    <div class="teach-box" v-if="isteachOpen">
      <!--<div class="teach-one">-->
      <!--<img src="../../assets/images/teach/open_03-min.png" alt="">-->
      <!--</div>-->
      <div class="teach-two">
        <img src="../../assets/images/teach/open_07-min.png" alt />
      </div>
      <div class="teach-three" @click="know">
        <img src="../../assets/images/teach/konw-min.png" alt />
      </div>
    </div>
    <picker
      :data="selectNumData"
      :showToolbar="true"
      :maskClick="true"
      @confirm="pickerconfirm1"
      :visible.sync="pickershow1"
    />
    <picker
      :data="selectNumData2"
      :showToolbar="true"
      :maskClick="true"
      @confirm="pickerconfirm2"
      :visible.sync="pickershow2"
    />
    <picker
      :data="selectNumData3"
      :showToolbar="true"
      :maskClick="true"
      @confirm="pickerconfirm3"
      :visible.sync="pickershow3"
    />
	<picker
	  :data="selectNumData4"
	  :showToolbar="true"
	  :maskClick="true"
	  @confirm="pickerconfirm4"
	  :visible.sync="pickershow4"
    
	/>
    <div class="zsloading-box"
      :style="{height:loadHeight+'px'}"
       v-show="isload && [3, 4].find(i => i == currType)"
      
    >
      <p style="margin-top:3.8rem">
        <span>loading</span>
        <InlineLoading></InlineLoading>
      </p>
    </div>
	<!-- hide-on-blur  @on-hide="dialogHide" -->
	<x-dialog v-model="dialogShow">
	</x-dialog>
   <!-- <x-dialog v-model="dialogShow"  class="luzhu-dialog"> -->
      <div class="luzhu-select" v-show="dialogShow">
       <div class="select-head">
		   <span @click="dialogHide">取消</span>
		   <span @click="qurenselect" style="color: #ff513e;">确认</span>
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
import Foot from "../../components/footer.vue";
import myScroll from "../../components/myScroll.vue";
import myScrollX from "../../components/myScrollX.vue"; //横向滚动
import { Flexbox, FlexboxItem, InlineLoading,XDialog } from "vux";
import P from "../../assets/js/tool";
import { mapState, mapMutations } from "vuex";
// 赛车走势
import Movements from "../toolViews/movements.vue";
// 路珠
import luzhu from "../toolViews/luzhu.vue";
// 六合彩路珠
import lhcLuzhu from "../toolViews/lhcLuzhu.vue";
// 形态走势
import xintaiMovement from "../toolViews/xintaiMovement.vue";
// 龙虎走势
import longhuMovement from "../toolViews/longhuMovement.vue";
import sscMovements from "../toolViews/sscMovements.vue";
import picker from "vue-pickers";
import { getToken, setToken } from '../../store/cookie';
export default {
  name: "kLottery1.1",
  data() {
    return {
      isNew:0,
      playList: {},
      isL: false, //是否显示 下拉刷新的组件
      isLup: false, //是否显示 上拉加载更多的组件
      page: 1, //页码
      isMorePage: false, //判断是否有下一页
      limit: 30, //每页多少条
      isUpFlag: false, //是否开启上拉加载更多 默认不开启
      isToast: false,
      allLottery: [], //所有彩种
      currBallDel: {}, //当前彩种开奖信息
      currBall: [], //当前开奖号码
      djsTime: "--:--",
      historyList: [], //历史开奖号码
      expertPlan: [], //专家计划
      currId: "",
      currUrl: "", //当前视频路径
      currIssue: "", //当前期数
      currRoomId: "", //当前彩种房间id
      currName: "",
      isLoadingHistory: true, //历史数据loading
      currType: 1,
      date: "",
      deadline: false, //显示我是有底线的
      showVideo: false, //是否显示视频
      isteachOpen: true,
      currTypeItem: 1, //历史记录二级
      currTypeItem1: 0, //历史记录二级
      currTypeLZ: 1, //路珠二级
      currTypeZS: 1, //走势二级
      // topHeight: 7,
      // HistoryTitle: ["历史开奖", "路珠", "走势", "专家计划"],
      dayMode: 0,
      pickershow1: false,
      selectNumData: [[]],
      selectNumData2: [[]],
      selectNumData3: [[]],
      ranking: "冠军",
      sscRanking: "第1球",
      pickershow2: false,
      issueText: "近10期",
      issueNum: 10,
      pickershow3: false,
	  pickershow4: false,
      rankNum: 1,
      dialogShow:false,
      topHeight: 7.6,
      topHeight2:9,
      // HistoryTitle: ["历史开奖", "路珠", "走势", "专家计划"],
      isload: false,
      lzType: "daxiao",
      initialData: [],
	  selectList1:[],
	  selectList2:[],
	  selectList3:[],
	  selectList4:[1,2,3,4,5],
	  selectNumData4:[[
		  {label:'前三形态',value:[7,10]},
		  {label:'中三形态',value:[8,11]},
		  {label:'后三形态',value:[9,12]},
      ]],
    xtrankNum:[7,10],
		xintai:'前三形态',
		isshowBtn:true,
    rankNumShow:[1,3,5],
    loadHeight:374,
    game:[],
    clData:[]
    };
  },
  computed: {
    ...mapState(["skin","czListData"])
  },
  created() {
    // let aa = localStorage.getItem("isNew");
    // if (aa == null) {
    //   this.isNew = 1;
    // } else {
    //   this.isNew = localStorage.getItem("isNew");
    // }
    
    // console.log(this.count(100000))
    this.isNew = this.skin
    this.isteachOpen =
      getToken("isteachOpen") == "no" ? false : true;
    this.kInit();
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    m = m >= 10 ? m : "0" + m;
    d = d >= 10 ? d : "0" + d;
    this.date = y + "-" + m + "-" + d;

    let self = this;
    let visProp = P.getHiddenProp();
    if (visProp) {
      let evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
      document.addEventListener(
        evtname,
        function() {
          if (document[P.getVisibilityState()] == "hidden") {
          } else {
            if (self.$route.name == "kLottery") {
              self.getOneNumber();
              self.getHistoryList();
              self.currType = 1;
            }
          }
        },
        false
      );
    }
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
  },
  watch: {
    allLottery: function() {
      this.$nextTick(() => {
        this.ScrollX();
      });
    },
    currType: function(n) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
        }, 20);
      });
      if (n == 1) {
        this.getHistoryList(this.currId);
      } else if (n == 2) {
        this.getExpertPlan(this.currId);
      }
      this.page = 1;
    },
    currIssue: function(n) {
      this.isteachOpen =
        getToken("isteachOpen") == "no" ? false : true;
      if (this.isteachOpen) {
        return (this.currType = 2);
      }
      this.currType = 1;
    },
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
	}
  },
  filters: {},
  components: {
    Foot,
    Flexbox,
    FlexboxItem,
    myScroll,
    myScrollX,
    Movements,
    picker,
    InlineLoading,
    XDialog,
    sscMovements,
    luzhu,
    lhcLuzhu,
    xintaiMovement,
	longhuMovement

  },
  methods: {
    ...mapMutations(["SETGAME_S","SETCZNDATA"]),
    goback(){
      this.$router.go(-1);
    },
    async getHotGame() {
      let res = await this.$http.get(this.versionLive2 + "live/get_game_list2/");
      if (res && res.data.code == 1) {
        let arr = [];
        for(let k in res.data.data){
          for(let i=0,len=res.data.data[k].length;i<len;i++){
            arr.push(res.data.data[k][i])
          }
        }
        this.game = arr;
      }
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
	dialogHide(){
		this.dialogShow = false;
		this.selectList2=this.selectList3;
	},
	qurenselect(){
		this.dialogShow = false;
		this.luzhuFormat(this.selectList2)
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
	luzhuFormat(d){
	this.selectList4=d.sort().map(i=>{
			return i=i+1
		})
	},
    know() {
      this.isteachOpen = false;
     setToken("isteachOpen", "no");
    },
    showVideoUrl() {
      this.showVideo = true;
      //显示视频
    },
    //    reLoad(data) {
    //      if (data == "down") {
    //        //              this.refreshData(true,true);
    //      } else if (data == "up") {
    //        this.loadMore();
    //      }
    //    },
    changeLottery(id, name, url, roomId) {
      this.currId = id;
      this.currName = name;
      this.currRoomId = roomId;
      this.currUrl = url;
      this.djsTime = "--:--";
      this.currType = 1;
      this.page = 1;
      this.currTypeItem = 1;
      this.currTypeItem1 = 0;
      this.ranking = "冠军";
      this.rankNum = 1;
      this.dayMode = 0;
      this.currTypeZS = 1;
      this.currTypeLZ = 1;
      this.lzType = "daxiao";
      this.getOneNumber(id);
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scrollWrapper.Myscroll.scrollTo(0, 0);
        }, 20);
      });
      if (this.currType == 1) {
        this.getHistoryList(id);
      } else if (this.currType == 2) {
        this.getExpertPlan(id);
      }
      if (this.currType == 8) {
          this.topHeight = 10.6;
          return;
      }
      this.topHeight = 7.6;
      // this.gettopHeight();
    },
    kInit() {
      if (!localStorage.getItem("games")) {
        this.getGames();
      } else {
        this.getGames();
        this.getGame(true);
      }
    },
    //获取彩种列表
    async getGame(flag) {
      if(this.czListData.length){
         this.allLottery = this.fixRoomId(this.czListData);
         this.currId = this.allLottery[0].lottery_id;
        this.currRoomId = this.allLottery[0].anchor_id;
        this.currName = this.allLottery[0].cname;
        this.currUrl = this.allLottery[0].video_url;
        this.playList.allLottery = this.allLottery;
         if (flag) {
          this.getOneNumber();
          this.getHistoryList();
        }
      }else{
           let res = await this.$http.post("/open/idx/sort/");
          if (res.data && res.data.code == 1) {
            this.allLottery = this.fixRoomId(res.data.data || []);
            this.currId = this.allLottery[0].lottery_id;
            this.currRoomId = this.allLottery[0].anchor_id;
            this.currName = this.allLottery[0].cname;
            this.currUrl = this.allLottery[0].video_url;
            this.playList.allLottery = this.allLottery;
            this.SETCZNDATA(res.data.data||[])
            if (flag) {
              this.getOneNumber();
              this.getHistoryList();
            }
          }
      }
     
    },
    async getGames() {
      let res = await this.$http.get(this.versionLive2 + "live/get_game_list2/");
      if (res && res.data.code == 1) {
        let arr = [];
        for(let k in res.data.data){
          for(let i=0,len=res.data.data[k].length;i<len;i++){
            arr.push(res.data.data[k][i])
          }
        }
        this.game = arr;
        // this.SETGAME_S(res.data.data || []);
        localStorage.setItem("games",JSON.stringify(this.game));
        this.getGame(true);
      }
    },
    //匹配彩种直播房间
    fixRoomId(d) {
      let game = localStorage.getItem("games")?JSON.parse(localStorage.getItem("games")):this.game;
      // console.log(game);
      for (let i = 0, len = d.length; i < len; i++) {
        for (let j = 0, lenj = game.length; j < lenj; j++) {
          if (d[i].cname == game[j].name) {
            d[i].anchor_id = game[j].anchor_id;
          }
        }
      }
      return d;
    },
    //获取当前开奖信息
    async getOneNumber(id, flag) {
      this.currBall = [];
      let res = await this.$http.post("/open/idx/indexNewOne", {
        lottery_id: id || this.currId
      });
      if (res.data && res.data.code == 1) {
        this.currBallDel = res.data.data;
        this.currIssue = res.data.data.issue;
        if (res.data.data.next_lottery_time <= 0) {
          this.currBall = [];
        } else {
          this.currBall = res.data.data.code.split(",") || [];
          if (flag && this.historyList[0].issue != res.data.data.issue) {
            this.historyList.unshift({
              code: res.data.data.code,
              input_time: res.data.data.open_time,
              issue: res.data.data.issue
            });
            this.playList.history = this.historyList;
          }
          this.isteachOpen =
           getToken("isteachOpen") == "no" ? false : true;
          if (this.isteachOpen) {
            this.getExpertPlan(this.currId);
          }
        }
        this.timer(res.data.data.next_lottery_time);
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
    //获取专家计划
    async getExpertPlan(id) {
      this.isLoadingHistory = true;
      this.expertPlan = [];
      let res = await this.$http.get("/forum/plan/index", {
        params: {
          lottery_id: id || this.currId,
          issue: this.currIssue,
          limit: this.limit
        }
      });
      this.isLoadingHistory = false;
      if (res && res.data.code == 1) {
        this.expertPlan = res.data.data || [];
        this.playList.plan = this.expertPlan;
      }
    },
    ScrollX() {
      let width = this.allLottery.length * 2.554;
      this.$refs.personTab.style.width = width + "rem";
      // let width1 = 19 * 0.8;
      // this.$refs.personTab1.style.width = width1 + "rem";
      // let width2 = 19 * 0.8;
      // this.$refs.personTab2.style.width = width1 + "rem";
      // let width3 = 19 * 0.8;
      // this.$refs.personTab3.style.width = width1 + "rem";
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
      this.topHeight = 8.5;
      if(this.currId==8){
        this.topHeight2 = 9;
      }
    },
    HistoryExpertPlan() {
      this.currType = 2;

      if (this.topHeight != 6.9) {
        this.topHeight = 6.9;
      }
      if(this.currId==8){
        this.topHeight2 = 7.5;
      }
    },
    HistoryCl(){
      this.currType = 5;
      this.topHeight=6.8;
      this.$vux.loading.show();
      this.$http.get("/forum/lottery/changlong",{
        params:{
          lottery_id:this.currId
        }
      }).then(res=>{
        if(res&&res.data.code==1){
          this.clData=res.data.data
        }
        this.$vux.loading.hide();
      })

      if(this.currId==8){
        this.topHeight2 = 7.5;
      }
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
      // if (this.currId != 8 && this.currId != 1 && this.currId != 10) {
      if (this.topHeight != 8.5) {
        this.topHeight = 8.5;
        // }
      }
    },
    HistoryHM() {
      this.currType = 1;
      this.currTypeItem = 1;
      // if(this.currId != 8 && this.currId != 1 && this.currId != 10){
      if (this.topHeight != 7.6) {
        this.topHeight = 7.6;
        // }
      }
      if(this.currId==8){
        this.topHeight2 = 9;
      }

      // if (this.topHeight != 7.6) {
      //   this.topHeight = 7.6;
      // }
    },
    // getHistoryTitle(i){
    //   this.currType = i
    //   //  this.currType = i;
    //    console.log(1);
    // },
    reLoad(data) {
      if (data == "down") {
        //                this.refreshData(data)
      } else if (data == "up") {
        this.loadMore();
      }
    },
    refreshData(data) {
      //模拟数据请求
      this.isL = true;
      setTimeout(() => {
        this.page = 1;
        this.isL = false;
      }, 2000);
    },
    // 倒计时
    timer(t) {
      if (window.timer1) clearInterval(window.timer1);
      window.timer1 = setInterval(() => {    
        this.djsTime = this.count(t--);
        if (t <= -1) {
          this.getOneNumber(null, true);
          this.djsTime = "--:--";
        }
      }, 1000);

      if (t <= 0) {
        this.currBallDel.issue = this.currIssue - 0 + 1;
        this.currIssue = this.currIssue;
      }
    },
    count(time) {
      let t = "";
      let h = "";
      let d = "";
      let min = "";
      let second = "";
      let obj = {};
      if (time > 60) {
        second = parseInt(time) % 60;
        min = parseInt((time / 60) % 60);
        h = parseInt((parseInt(time / 60) / 60) % 24);
        d = parseInt(parseInt(time / 60) / 60 / 24);
        second = second >= 10 ? second : "0" + second;
        min = min >= 10 ? min : "0" + min;
        if (!h) h = "";
        // else h = h >= 10 ? h : "0" + h + ":";
        else h = h >= 10 ? h : "0" + h ;
        if (d >= 1) {
          if (!h) h = "00";
          t = d + "天" + h + ":" + min + ":" + second;

        } else {
          if(h>=1){
               t = h + ":"  + min + ":" + second;
          } else{
             t =  min + ":" + second;
          }
        }
        //              obj ={
        //                h1 :(h+'').split('')[0],
        //                h2 : (h+'').split('')[1],
        //                min1 : (min+'').split('')[0],
        //                min2 :(min+'').split('')[1],
        //                s1 : (second+'').split('')[0],
        //                s2 : (second+'').split('')[1],
        //              }
      } else {
        t = "00:" + (time >= 10 ? time : "0" + time);
        //              t=(time>=10?time:'0'+time);
        //              obj ={
        //                min1 : 0,
        //                min2 :0,
        //                s1 : (time+'').split('')[0],
        //                s2 : (time+'').split('')[1],
        //              }
      }
      //            return obj
      return t;
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
    showLoading(i){
      if(i==0&&this.currTypeItem!=2){
        this.currTypeItem = 2;this.isload=true;
      }
      if(i==1&&this.currTypeItem!=3){
         this.currTypeItem = 3;this.isload=true;
      }
    },
    goExpert(id,lotteryId) {
      // this.$router.push({name: "expertCenter/" + id, params: {lotteryId}})
      // this.$router.push("/expertCenter/" + id);
      this.$router.push("/expertCenter/" + id +"?" + lotteryId);
    }
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
  this.getOption()
  this.loadHeight=window.innerHeight-document.querySelector('.lottery').scrollHeight;
  },
  destroyed() {
    if (window.timer1) clearInterval(window.timer1);
  }
};
</script>

<style scoped lang="less">
.teach-box {
  position: fixed;
  width: 100%;
  height: 100%;
  min-width: 320px;
  max-width: 750px;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  z-index: 1000;
  > div {
    position: absolute;
  }
  .teach-one {
    width: 32%;
    top: 1.5rem;
    right: 1.2rem;
  }
  .teach-two {
    width: 36%;
    top: 7.2rem;
    left: 40%;
  }
  .teach-three {
    width: 29.3%;
    top: 12rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
/*开奖视频*/
.open-video-box {
  h3 {
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    color: #fff;
  }
  .no-click {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 1rem;
    z-index: 5;
  }
  .remove-icon {
    position: absolute;
    height: 0.6rem;
    width: 0.6rem;
    background: url("../../assets/images/member/close.png") no-repeat;
    background-size: 60%;
    right: 0.2rem;
    top: 0.3rem;
  }
  position: fixed;
  top: 1.2rem;
  width: 100%;
  height: 7rem;
  background: #000;
  z-index: 10;
  #myiframe {
    /*margin-top: 1rem;*/
    width: 100%;
    height: 100%;
  }
  #myiframe.pk {
    width: 10rem;
  }
}
.open-num-header {
  background-color: #fff;
   .back-icon{
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        z-index: 2000001;
        left: .3rem;
        background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
        background-size: 25%;
    }  
}
.flex-demo {
  text-align: center;
}
.upload-cam {
  background: #000000;
}
.history-container {
  /*专家计划*/
  .plan-container {
    // width: 94.66%;
    width: 92%;
    margin: 0 auto;
    ul {
      background: #fff;
      li {
        font-size: 0.3rem;
        // margin: 0 4%;
        padding: 0.4rem 0;
        &.li-boder {
          border-bottom: 1px solid #f5f5f5;
        }
        .expert-img {
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          overflow: hidden;
          /*background: #000;*/
          text-align: center;
          margin-right: 0.27rem;
          img {
            // width: 100%;
            /*height: 100%;*/
            height: 100%;
            width: auto;
          }
        }
        .new-nick-name {
          // display: block;
          font-size: 0.38rem;
          font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .expert-info {
          display: block;
          width: 83%;
        }
        .percentage-box {
          display: block;
        }
        .percentage {
          border-radius: 0px 15px 15px 15px;
          color: #fff;
          padding: 0 0.17rem;
          font-size: 0.32rem;
          height: 0.4rem;
          line-height: 0.4rem;
          margin-right: 0.135rem;
        }
        .Win-rate {
          background: linear-gradient(
            90deg,
            rgba(123, 182, 255, 1) 0%,
            rgba(113, 120, 255, 1) 100%
          );
          background: -webkit-linear-gradientlinear-gradient(
            90deg,
            rgba(123, 182, 255, 1) 0%,
            rgba(113, 120, 255, 1) 100%
          );
          background: -o-linear-gradient(
            90deg,
            rgba(123, 182, 255, 1) 0%,
            rgba(113, 120, 255, 1) 100%
          );
          background: -moz-linear-gradientlinear-gradient(
            90deg,
            rgba(123, 182, 255, 1) 0%,
            rgba(113, 120, 255, 1) 100%
          );
        }
        .Even-red {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 1) 0%,
            rgba(255, 166, 127, 1) 0%,
            rgba(255, 81, 62, 1) 100%
          );
          background: -webkit-linear-gradientlinear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 1) 0%,
            rgba(255, 166, 127, 1) 0%,
            rgba(255, 81, 62, 1) 100%
          );
          background: -o-linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 1) 0%,
            rgba(255, 166, 127, 1) 0%,
            rgba(255, 81, 62, 1) 100%
          );
          background: -moz-linear-gradientlinear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 1) 0%,
            rgba(255, 166, 127, 1) 0%,
            rgba(255, 81, 62, 1) 100%
          );
        }
        .profit {
          background: linear-gradient(
            90deg,
            rgba(255, 200, 104, 1) 0%,
            rgba(255, 126, 31, 1) 100%
          );
          background: -webkit-linear-gradientlinear-gradient(
            90deg,
            rgba(255, 200, 104, 1) 0%,
            rgba(255, 126, 31, 1) 100%
          );
          background: -o-linear-gradient(
            90deg,
            rgba(255, 200, 104, 1) 0%,
            rgba(255, 126, 31, 1) 100%
          );
          background: -moz-linear-gradientlinear-gradient(
            90deg,
            rgba(255, 200, 104, 1) 0%,
            rgba(255, 126, 31, 1) 100%
          );
        }
        .period {
          // font-family: number1;
          color: #999999;
          font-size: 0.34rem;
        }
        .expert-mess {
          margin-left: 0.2rem;
          .nick-name {
            padding-bottom: 0.1rem;
            font-size: 0.38rem;
            font-weight: bold;
            display: block;
          }

          .play-type {
            color: #ff513e;
            padding: 0.05rem 0.2rem;
            border-radius: 20px;
            background: #ffebe9;
          }
        }
        .plan-ball {
          margin-top: 0.1rem;
          line-height: 0.8rem;
          .open-status {
            
          }
        }
        .ball-item {
          width: 0.76rem;
          height: 0.76rem;
          line-height: 0.76rem;
          text-align: center;
          display: inline-block;
          background: #ff513e;
          color: #fff;
          font-size: 0.3rem;
          font-family: number1;
          border-radius: 50%;
          margin: 0 0.1rem 0.2rem 0;
        }
        .rate-box {
          color: #ff513e;
          text-align: center;
          .rate {
            font-family: number1;
            font-size: 0.6rem;
          }
        }
        &:last-of-type {
          border-bottom: none;
        }
        .recommend-box {
          padding: 0.27rem 0;
          .method-box {
            padding: 0 0.35rem;
            background: #ffece8;
            border-radius: 99px;
            color: #ff513e;
            height: 0.48rem;
            line-height: 0.48rem;
            font-size: 0.34rem;
            margin-right: 0.27rem;
          }
          .recommend {
            color: #445779;
            font-weight: bold;
            font-family: number1;
            font-size: 0.38rem;
            // width: 0.4rem;
            margin-right: 0.4rem;
          }
        }
        .recent {
          background: rgba(245, 247, 250, 1);
          border-radius: 5px;
          height: 0.72rem;
          line-height: 0.72rem;
          color: #999999;
          font-size: 0.34rem;
          span {
            // margin-right: 0.4rem;
            margin-right: 2.5%;
            &:nth-child(1) {
              // margin-right: 0;
            }
            b {
              font-weight: normal;
              &.win {
                color: #ff513e;
              }
              &.lose {
                
              }
            }
          }
        }
      }
    }
  }
  .pearl-road {
    // padding: 0.4rem;
  }
  .changlong{
    padding: 0 0.2rem;
    table{
      border-collapse: collapse;
      tr{height: 0.92rem;border-bottom: 1px solid #EEEEEE;}
      width: 100%;
      td{text-align: center;font-size: 0.32rem;}
    }
  }
  .lottery {
    background: #f5f7fa;
    margin-top: 1.2rem;
  }
  .lotteryPad{
    background: #f7f7f7;
    // margin-top: 1.4rem;
    margin-top: 1.2rem;
  }
  /*当前彩种*/
  .lottery-type {
    /*box-shadow: 0px 8px 20px #f1f1f1;*/
    /*border-radius: 5px;*/
    overflow: hidden;
    /*width: 97%;*/
    /*margin: 0 auto;*/
    padding: 0.3rem 0;
    background: #fff;
    .lottery-item {
      display: inline-block;
      // padding: 0 0.38rem;//1.0
      padding: 0 0.137rem;
      text-align: center;
      font-size: 0.35rem;
      // 
      color:#445779;
      &.active,&.active-dw,.active-qrj,.active-gq,.active-sdj,.active-ox {
        span {
          color: #fff;
          font-weight: bold;
          // background: linear-gradient(
          //   90deg,
          //   rgba(255, 49, 49, 1),
          //   rgba(255, 128, 103, 1)
          // );
          background: linear-gradient(-90deg, #007CFF, #65AFFF);
        }
      }
      &.active-dw{
        span{
          background:linear-gradient(90deg,#a3e41a,#ddeb27);
        }
      }
      &.active-qrj{
        span{
          background:linear-gradient(90deg,#7832f6,#ba83ce);
          color: #fff;
        }
      }
      &.active-sdj{
        span{
          background:linear-gradient(90deg,#94efff,#acf5ec);
          color: #fff;
        }
      }
      &.active-ox{
        span{
          background:linear-gradient(90deg,#f13b18,#fda14e);
          color: #fff;
        }
      }
      &.active-uefa{
        span{
          background:linear-gradient(90deg,#5284ff,#4c61de);
          color: #fff;
        }
      }
      &.active-gq{
        span{
          background:linear-gradient(90deg,#ef7e11,#f7c93c);
          color: #fff;
        }
      }
    }
    .lottery-img {
      width: 1.5rem;
    }
  }
  .lottery-hide {
    display: none;
  }
  /*开奖号码*/
  .open-num-box {
    /*padding:0 .1rem;*/
    // border-radius: 6px;
    background: #fff;
    // width: 94.66%;
    width: 100%;
    margin: 0.27rem auto 0;
    > h3 {
      font-size: 0.38rem;
      padding: 0.3rem 0;
    }
    .curr-open-ball {
      // border-radius: 6px;
      // width: 92%;
      // margin: 0 auto;
      overflow: hidden;
      .curr-time {
        width: 92%;
        margin: 0 auto;
        font-size: 0.35rem;
        /*background-image: linear-gradient(#f94166, #fc7c81);*/
        padding: 0.2rem 0;
        // border-radius: 6px 6px 0 0;
        .open-video {
          width: 0.54rem;
          display: inline-block;
          /*margin-right: 0.2rem;*/
          img {
            vertical-align: sub;
          }
        }
        .count-down-time {
          display: inline-block;
          color: #445779;
          font-family: number1;
          /*background-image: linear-gradient(left,#ff2b2b, #ffd592);*/
          padding: 0 0.05rem 0.02rem 0.05rem;
          border-radius: 20px 0 0 20px;
          letter-spacing: 1px;
        }
        .curr-period {
          /*padding-top: 0.05rem;*/
          font-size: 0.38rem;
          color: #445779;
          font-weight: bold;
          i {
            font-family: number1;
          }
        }
        .open-time {
          display: inline-block;
          color: #445779;
          border-radius: 3px;
          background: #fff;
          padding: 0.05rem 0.1rem;
          margin: 0 0 0 0.1rem;
          font-size: 0.38rem;
        }
      }
      .no-open {
        padding: 0.3rem 0.2rem;
        font-size: 0.38rem;
        color: #f94166;
        height: 1.5rem;
      }
      .curr-ball {
        padding: 0.3rem 0.2rem 0 0.1rem;
        // height: 1.5rem;
        text-align: center;
        position: relative;
        > div {
          display: inline-block;
        }
        > div.lastBall {
          // margin-left: 0.7rem;
          margin-left: 5.68%;
          span {
            // margin: 0 0 0.2rem 0 !important;
          }
        }
        span {
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          display: inline-block;
          // background: #0084ff;
          background: linear-gradient(
            0deg,
            rgba(80, 129, 255, 1) 0%,
            rgba(107, 194, 255, 1) 100%
          );
          color: #fff;
          font-size: 0.38rem;
          font-family: number1;
          border-radius: 50%;
          margin: 0 0 0.2rem 0.1rem;
        }
        .add-icon {
          display: inline-block;
          background: url("../../assets/images/main/six_add.png") no-repeat;
          width: 0.24rem;
          height: 0.24rem;
          background-size: contain;
          position: absolute;
          // left: 72.6%;
          left: 68.2%;
          top: 0.55rem;
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
            margin-right: 0.13rem;
            color: #445779;
            background: none;
            margin-bottom: 0 !important;
            &:nth-last-child(1){
              position: relative;
              margin-left: 8%;
            }
          }
      }
      .curr-ballOne {
        text-align: left;
        padding: 0.3rem 0.2rem 0 0.4rem;
      }
      .curr-ballTwo {
        // padding: 0.3rem 0.2rem 0 0.4rem;
        span {
          margin: 0 0.4rem 0.2rem 0;
        }
      }
      .sixBall {
        span {
          margin: 0 0.27rem 0.2rem 0;
        }
      }
    }
  }
  .open-fixed {
    position: fixed;
    width: 100%;
    top: 0rem;
  }

  .open-num-history-fixed {
    position: fixed;
    width: 100%;
    top: 4rem;
  }
  /*历史开奖头*/
  .open-num-history {
    // width: 94.66%;
    width: 100%;
    border-radius: 6px 6px 0 0;
    margin: 0.27rem auto 0;
    padding: 0.3rem 0;
    background: #fff;
    .history-list {
      width: 92%;
      margin: 0 auto;
      .list-title {
        border-radius: 6px 6px 0 0;
        font-size: 0.35rem;
        padding: 0.2rem 0;
        background: #e5e5e5;
        > span {
          margin: 0 0.2rem;
        }
        .select-type {
          display: inline-block;
          color: #e54848;
          padding: 0.1rem 0.2rem;
          &.active {
            background: #fff;
            border: 1px solid #e54848;
            border-radius: 15px;
          }
        }
      }
      .tab-item {
        font-size: 0.38rem;
        // 
        color: #71819D;
        text-align: center;
        width: 18.4%;
        display: inline-block;
        position: relative;
        font-weight: 500;
        &.active,.active-dw,.active-qrj,.active-gq {
          // color: #445779;
          color: #1486FF;
          font-weight: bold;
        }
        &.active:before, &.active-dw:before,&.active-qrj:before,&.active-gq:before,&.active-sdj:before,&.active-ox:before,&.active-uefa:before{
          content: "";
          position: absolute;
          width: 0.6rem;
          height: 0.1rem;
          // background: #ff513e;
          background: #1486FF;
          left: 50%;
          border-radius: 20px;
          bottom: -0.1rem;
          transform: translate(-50%);
        }
        &.active-qrj:before{
          background:linear-gradient(90deg,#7832f6,#ba83ce);
        }
        &.active-sdj:before{
          background:linear-gradient(90deg,#94efff,#acf5ec);
        }
        
        &.active-ox:before{
          // background:linear-gradient(90deg,#f13b18,#fda14e);
          background: #ee3c1a;
        }
        &.active-gq:before{
          background:#ef7e11;
        }
        &.active-uefa:before{
          background:#5284FF;
        }
        // &.active-dw:before {
        //   content: "";
        //   position: absolute;
        //   width: 0.6rem;
        //   height: 0.1rem;
        //   background:#8EB917;
        //   left: 50%;
        //   border-radius: 20px;
        //   bottom: -0.1rem;
        //   transform: translate(-50%);
        // }
      }
    }
    .tab-box1 {
      border-bottom: 1px solid #eee !important;
      height: 1.415rem;
    }
    .tab-box2 {
      width: 92%;
      margin: 0 auto;
    }
    .tab-box {
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
          background: #f5f7fa;
          border-radius: 100px;
          height: 0.67rem;
          line-height: 0.67rem;
          margin-right: 0.275rem;
          font-size: 0.32rem;
          cursor: pointer;
          &.active {
            // color: #ff513e;
            // background: #ffece8;
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
    .pearl {
      margin-top: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #eee !important;
      .ranking-all {
        font-size: 0.36rem;
        font-weight: bold;
        margin-left: 1.5%;
      }
      .tab-box2 {
        > span {
          span {
            margin-left: 0.668rem;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  .open-num-history .wrapperY .content {
    background: #fff !important;
  }
  // .history-content-container .scroll-item .wrapperY{
  //   border-top:1px solid #eee!important;
  // }
  .history-content-container {
    background: #f7f7f7;
    // width: 94.66%;//1.0
    width: 92%;
    // .scroll-item{
    //       border-top: 1px solid rgb(238, 238, 238);
    // }
    .loading {
      text-align: center;
      color: #e12525;
      font-size: 0.35rem;
      padding-top: 1rem;
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
  }
  .history-content {
    width: 94.66%;
    background: #fff;
    .open-item {
      /*padding: 0.3rem 0 .3rem .2rem;*/
      padding: 0.3rem 0;
      border-bottom: 1px solid #eee;
      background: #fff;
      // margin: 0 3.5%;//1.0
      dt {
        /*margin-right: .2rem;*/
        font-size: 0.33rem;
        // padding-top: 0.1rem;
        // padding-top: 0.2rem;
        .issue {
          color: #445779;
          font-size: 0.38rem;
          font-family: number1;
          i {
            padding-right: 0.05rem;
          }
        }
        .date {
          display: block;
          
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
      .fc-color{
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
        color: #445779;
        background: none;
        margin-bottom: 0 !important;
      }
    }
  }
  .no-lottery {
    overflow: hidden;
    dl {
      display: inline-block;
      width: 25%;
      text-align: center;
      float: left;
      dt {
        display: inline-block;
        // width: 1.5rem;
        // height: 1.5rem;
        // border-radius: 6px;
        // background: #ededed;
      }
      dd {
        margin-top: 0.1rem;
        display: inline-block;
        width: 2rem;
        height: 0.6rem;
        border-radius: 36px;
        background: #ededed;
      }
    }
  }
}
.select-box {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  margin-top: 0.15rem;

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
    }
    .active {
      color: #1486FF;
    }
  }
}
// .history-item:after {
//   content: "";
//   position: absolute;
//   width: 1px;
//   height: 0.3rem;
//   background: #eee;
//   right: 0;
//   top: 0.12rem;
// }
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
.preview-list {
  .preview {
    display: block;
    // background:linear-gradient(90deg,rgba(255,128,103,1),rgba(255,49,49,1));
    // background: #f5f7fa;
    background: #F6F7FB;
    height: 0.855rem;
    width: 2.27rem;
    line-height: 0.855rem;
    color: #445779;
    // color: #445779;
    border-radius: 100px;
  }
}
.luzhu-dialog{
	.weui-dialog{
		width: 100%;
		bottom: 0;
		height: 100px;
		background: #fff;
	}
	
}
.luzhu-select{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 9999;
	text-align: center;
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
				.active{background-image: linear-gradient(to right, #ff3433, #ff7e66);color: #fff;}
			}
		}
	}
}
.zsloading-box{
  width: 100%;height:520px;position: fixed;bottom: 1.5rem;background: rgba(255, 255, 255, 0.71);z-index: 99;text-align: center;
}

@media screen and (max-width: 360px) {
  .history-container .open-num-history .tab-box ul li {
    padding: 0 0.5rem;
  }
  .history-container .open-num-history .tab-box ul li:last-child {
    margin-right: 0;
  }
  .history-container .open-num-history .tab-box .lz-box li {
    padding: 0 0.38rem;
  }
  .history-container .plan-container ul li .recent span {
    margin-right: 2.5% !important;
  }
}
</style>
