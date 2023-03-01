<template>
    <div id="betting">
        <header class="home-header clearfix">
            <div @click="goback()" class="back-icon"></div>
            <div class="lottery-cz fl clearfix">
              <div  class="fl lotteryValue " @click="PickerShow()">{{lotteryValue}}</div>
              <div class="fl lott-icon"></div>
            </div>
            <div class="lottery-rig fr" @click="$router.push('/zyTool/'+currId)">
                <span>助赢工具</span>
            </div>
        </header>
<!--        开奖结果&开奖时间-->
        <div class="lott-record">
            <div class="lott-bt clearfix">
                <div class="kj-issue fl">{{currBallDel.issue}}期开奖结果</div>
                <div class="djs fr">
                    <span  style="color:#999;margin:0 0 0 .1rem;">封盘&nbsp;<i>{{djsTime1}}</i></span>
                    <span  style="color:#999;margin:0 0 0 .1rem">开奖&nbsp;<i>{{djsTime}}</i></span>
                </div>
                <i :class="{'lottery-music':true,'close-music':!musicState}" @click="musicState=!musicState"></i>
            </div>
            <div class="lott-num clearfix" :class="currId == 8?'pb1':''" v-if="currBall.length">
                <span v-if="currId != 1 && currId != 10 && currId != 8 && currId != 28&& currId != 30&& currId != 31 && currId != 5&& currId != 14" class="fl" :class=" v | filterBallColor" v-for="v in currBall">{{v}}</span>
                <span v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31 " class="fl  fiveMa" v-for="v in currBall">{{v}}</span>
                <span v-if="currId == 8 " class="fl add-icon" :class="v | filterSixBs" v-for="v in currBall">{{v}}</span>
                <span v-if="currId == 5 || currId == 14 " class="fl fc-color" v-for="v in currBall">{{v}}</span>
            </div>
            <div  class="zodiac clearfix" v-if="currBall.length" >
                <span v-if="currId == 8 " class="fl add-icon"  v-for="v in currBall">{{v | filterSixSX(currBallDel.issue)}}</span>
            </div>
            <div class="lott-num" v-else style="line-height: 0.8rem">开奖中...</div>
            <div class="see-more" :class="showZS?'see-more-up':''" @click="seeMore"></div>
        </div>
        <div class="tab-title">
            <span :style="isPure==1?'width:50%':''" @click="changeTab(0)" :class="tabIndex == 0 ? 'active':''" >投注区</span>
            <span :style="isPure==1?'width:50%':''" @click="changeTab(1)" :class="tabIndex == 1 ? 'active':''" >我的注单</span>
            <span @click="changeTab(2)" :class="tabIndex == 2 ? 'active':''" v-if="isPure==0">热门直播</span>
        </div>
<!--        投注区-->
        <div class="betting-content clearfix" v-show="tabIndex == 0">
            <div class="bett-left">
                <myScroll ref="ulScroll" @func="scrollEnd"  :top="currId == 8?5.3:4.9" :data="playList" class=""  :bottom="gbottom" left="0">
                    <ul @touchend="liTouchend($event)">
                        <li v-for="(v,index) in palyUnit" :key="index" @click="changeWfTab(index,v.play_unit_name,v)" 
                        ref="liItem"
                        :class="secIndex == v.play_unit_id ? 'active' : ''" 
                        :data-index="index" :style="v.play_unit_name.length>5?'font-size:.36rem;':''"
                        @touchstart="liTouchstart($event, v, index)"
                        @touchmove="liTouchmove($event,index)"
                        >
                            <span>{{v.play_unit_name}}</span>
                            <i></i>
                        </li>
                        <!-- <li  @click="changeWfTab(0,'长龙')">长龙</li> -->
                    </ul>
                </myScroll>
            </div>
            <div class="bett-rigth">
                <myScroll  :top="currId == 8?5.3:4.9" :data="playList" class="" :left="2.43" :bottom="gbottom"  ref="scrollWrapper">
                    <div class="lmian wf-list" :style="playSecList.length>1?'':'padding-top: .3rem'" v-if="lotteryId!=8&&palyUnitName == '两面'">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <p v-if="playSecList.length>1">{{item.play_sec_cname}}</p>
                            <div :class="{'w33':item.play_sec_data.length%3==0,'w25':item.play_sec_data.length%4==0||item.play_sec_data.length}" class="wf-item" >
                                <span :style=" item.play_sec_cname =='色波'?'width:2.13rem':''" class="wf-je"  v-for="(item1,index1) in item.play_sec_data" :key="index1" @click="selectClick($event,item1,item.play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                    <i>{{item1.play_class_cname}}</i>
                                    <br>
                                    <i>{{item1.play_odds}}</i>
                                </span>
                            </div>
                        </div>
                   </div>
                    <div class="lmian wf-list" :style="playSecList.length>1?'':'padding-top: .3rem'" v-if="lotteryId==8&&(palyUnitName == '两面'||palyUnitName == '7色波'|| palyUnitName == '色波'||palyUnitName == '平特一肖尾数'||palyUnitName == '总肖'||palyUnitName == '头尾数'||palyUnitName == '特肖'||palyUnitName == '五行')">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <p v-if="playSecList.length>1">{{item.play_sec_cname}}</p>
                            <div :class="{'w33':item.play_sec_data.length%3==0,'w25':item.play_sec_data.length%4==0||item.play_sec_data.length}" class="wf-item" >
                                <span :style=" item.play_sec_cname =='色波'?'width:2.13rem':''" class="wf-je"  v-for="(item1,index1) in item.play_sec_data" :key="index1" @click="selectClick($event,item1,item.play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                    <i>{{item1.play_class_cname}}</i>
                                    <br>
                                    <i>{{item1.play_odds}}</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="lmian wf-list lhc-tm" v-if="lotteryId==8&&(palyUnitName == '特码'||palyUnitName == '正码特'||palyUnitName == '连肖连尾'||palyUnitName == '连码'||palyUnitName == '自选不中')">
                        <myScrollX v-show="playSecList.length>1">
                            <div class="tm-title" ref="personTitleTab">
                                <span v-for="(item,index2) in playSecList" :key="index2" @click="currTmItem = index2;currTabNav=item.play_sec_cname" :class="currTmItem==index2?'active':''">{{item.play_sec_cname=='三中二'?'中二':item.play_sec_cname}}</span>
                            </div>
                        </myScrollX>
                        <div class="pl-box" v-if="palyUnitName == '连码'" style="padding-top:0;">赔率：{{playSecList[currTmItem].play_sec_options[0].play_odds}}</div>
                        <div class="pl-box" v-if="palyUnitName == '自选不中'&&selectNum>0" style="padding-top:.2rem">赔率：{{playSecList[0].play_sec_options[selectArr.length-5].play_odds}}</div>
                        <div class="wf-item w25">
                            <span class="wf-je" v-if="index1<49"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" :data-id="item1.play_sec_id" :key="index1" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" :class="item1.play_class_cname| filterHll1 | filterColor" :style="palyUnitName == '连码'||palyUnitName == '自选不中'?'margin: 0.3rem auto 0;':'margin: 0.1rem auto 0;'">{{item1.play_class_cname}}</i>
                                 <!-- <br> -->
                                <i v-if="palyUnitName == '连码'||palyUnitName == '自选不中'"></i>
                               
                                <i v-else>{{item1.play_odds}}</i>
                            </span>
                        </div>
                        <div class="wf-item w25">
                            <span class="wf-je" v-if="index1>48"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" :data-id="item1.play_sec_id"  :key="index1" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i :style="palyUnitName == '连码'||palyUnitName == '自选不中'?'margin: 0.3rem auto 0;':'margin: 0rem auto 0;'">{{item1.play_class_cname}}</i>
                                <br>
                                <i v-if="palyUnitName == '连码'||palyUnitName == '自选不中'"></i>
                                
                                <i v-else>{{item1.play_odds}}</i>
                            </span>
                        </div>
                    </div>

                    <div class="lmian wf-list lhc-tm" style="padding-top: .3rem" v-if="palyUnitName == '正码'">
                        <div class="wf-item w25">
                            <span class="wf-je" v-if="index1<49"  v-for="(item1,index1) in playSecList[0].play_sec_data"  :key="index1" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" :class="item1.play_class_cname| filterHll1 | filterColor">{{item1.play_class_cname}}</i>
                                <i>{{item1.play_odds}}</i>
                            </span>
                        </div>
                        <div class="wf-item w25">
                            <span class="wf-je" v-if="index1>48"  v-for="(item1,index1) in playSecList[0].play_sec_data"  :key="index1" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i>{{item1.play_class_cname}}</i>
                                <br>
                                <i>{{item1.play_odds}}</i>
                            </span>
                        </div>
                    </div>
                    <div class="lmian wf-list lhc-hx lhc-tm" style="padding-top: .3rem" v-if="palyUnitName == '合肖'">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <div class="pl-box" v-if="selectNum>0">赔率：{{item.play_sec_options[selectArr.length-2].play_odds}}</div>
                            <div class="wf-item w25" >
                                <span  class="wf-je"  v-for="(item1,index1) in item.play_sec_data" :key="index1" @click="selectClick($event,item1,item.play_sec_cname,item)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                    <i class="ball" style="margin: 0.3rem auto 0;">{{item1.play_class_cname}}</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="lmian wf-list lhc-hx lhc-tm" style="padding-top: .3rem" v-if="palyUnitName == '正肖'">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <div class="wf-item w25" >
                                <span  class="wf-je"  v-for="(item1,index1) in item.play_sec_data" :key="index1" @click="selectClick($event,item1,item.play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}">
                                    <i class="ball" style="margin: 0.1rem auto 0;">{{item1.play_class_cname}}</i>
                                    <i>{{item1.play_odds}}</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="kuaijie wf-list" v-show="lotteryId!=8&&palyUnitName == '快捷'">
                        <div class=" w20 kj-title">
                            <span v-for="(item,index) in playSecList" :key="index" class="wf-je"  @click="changeWfKJ($event,index,item)" >{{item.play_sec_cname}}</span>
                        </div>
                        <!-- {{playClassList[0].play_sec_data}} -->
                        <div class="w50 wf-item kj-item-list" v-for="(v,index) in playClassList" :key="index" v-show="v.play_sec_merge_name=='pk10_gj_lm'||v.play_sec_merge_name=='ssc_d1q_lm'">
                            <span class="wf-je" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" 
                            style="line-height:.6rem;padding-top:.1rem"
                                  :data-pscname="v.play_sec_cname"
                                  :data-pname="v2.play_sec_name"
                                  :data-pid="v2.play_class_id"
                                  :data-pcname="v2.play_class_name"
                                  :data-pccname="v2.play_class_cname"
                                  :data-odds="v2.play_odds"
                                  :key="index1" @click="selectClick($event,v2,v.play_sec_cname)"
                                  :class="{active:selectList2.indexOf(index1)!=-1}">
                                  <i>{{v2.play_class_cname}}</i>
                                  <br>
                                  <i>{{v2.play_odds}}</i>
                                  </span>
                        </div>

                   </div>
                   <div class="danhao wf-list" v-if="palyUnitName == '单号1-10' || palyUnitName == '整合' || palyUnitName == '第一球' || palyUnitName == '第二球' || palyUnitName == '第三球' || palyUnitName == '第四球' || palyUnitName == '第五球'||palyUnitName == '正码1-6'">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <p>{{item.play_sec_cname}}</p>
                            <div class="w20 wf-item" :class="palyUnitName == '正码1-6'?'w25':''">
                                <span class="wf-je"  v-for="(item1,index1) in item.play_sec_data" @click="selectClick($event,item1,item.play_sec_cname)"  :class="{active:selectList2.indexOf(index1)!=-1}" :key="index1">
                                    <i>{{item1.play_class_cname}}</i>
                                    <br>
                                    <i>{{item1.play_odds}}</i>
                                </span>
                            </div>
                        </div>
                   </div>
                   <div class="gyj wf-list" v-if="palyUnitName == '冠亚军组合'">
                        <div v-for="(item,index) in playSecList" :key="index">
                            <!-- <p>{{item.play_sec_cname}}</p> -->
                            <div class="w25 wf-item">
                                <span class="wf-je"  v-for="(item1,index1) in item.play_sec_data" :key="index1" @click="selectClick($event,item1,item.play_sec_cname)"  :class="{active:selectList2.indexOf(index1)!=-1}">
                                    <i>{{item1.play_class_cname}}</i>
                                    <br>
                                    <i>{{item1.play_odds}}</i>
                                </span>
                            </div>
                        </div>
                   </div>
                   <div class="kuaijie wf-list" v-if="lotteryId!=8&&(palyUnitName == '连码' ||palyUnitName == '斗牛')">
                        <div class=" w20 kj-title">
                           <span class="wf-je" v-for="(item,index) in playSecList" :key="index" :class="wfIndex== index?'active':''" @click="changeWf(index,item)">{{item.play_sec_cname}}</span>
                        </div>

                       <div class="w20 wf-item" v-for="(v,index) in playClassList" :key="index" v-show="!isCombo&&wfIndex== index">
                                <span class="wf-je" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick($event,v2,v.play_sec_cname)"  :class="{active:selectList2.indexOf(index1)!=-1}">
                                     <i>{{v2.play_class_cname}}</i>
                                     <br>
                                     <i>{{v2.play_odds}}</i>
                                </span>
                       </div>

<!--                        <div class="w20 wf-item" v-if="!isCombo">-->
<!--                          <span class="wf-je" v-for="(item,index) in playClassList" :key="index" @click="selectClick($event,item,item.play_sec_cname)"  :class="{active:selectList2.indexOf(index)!=-1}">-->
<!--                                <i>{{item.play_class_cname}}</i>-->
<!--                                <i>{{item.play_odds}}</i>-->
<!--                          </span>-->
<!--                        </div>-->

<!--                        <div class="w20 isCombo wf-item" v-for="(v,index) in playClassList" :key="index" v-show="isCombo&&wfIndex== index">-->
                        <div class="w20 isCombo wf-item" v-for="(v,index) in playClassList" v-show="isCombo&&wfIndex== index">
                          <span class="wf-je" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1"  @click="selectClickCombo($event,v2)"
                                :data-wf="v2.play_class_name"
                                :data-name="v2.play_class_cname"
                                :data-odds="v2.play_odds"
                                :data-sec="v2.play_sec_name">
                                <i>{{v2.play_class_cname}}</i>
                                <br>
                                <i>{{v2.play_odds}}</i>
                          </span>
                        </div>
                   </div>
                   <div class="kuaijie wf-list" v-if="lotteryId!=8&&palyUnitName == '单码'">
                        <div class=" w20 kj-title">
                           <span class="wf-je" v-for="(item,index) in playSecList" :key="index" :class="wfIndex== index?'active':''" @click="changeWf(index,item)" :data-index="index">{{item.play_sec_cname}}</span>
                        </div>
                       <div class="w20 wf-item" v-for="(v,index) in playClassList" :key="index" v-show="wfIndex== index">
                                <span class="wf-je" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClickDM(index1,v2)"  :class="DMIndex==index1?'active':''">
                                     <i>{{v2.play_class_cname}}</i>
                                     <br>
                                     <i>{{v2.play_odds}}</i>
                                </span>
                       </div>
<!--                        <div class="w20 wf-item">-->
<!--                          <span class="wf-je" v-for="(item,index) in playClassList" :key="index" @click="selectClickDM(index,item)" :class="DMIndex==index?'active':''">-->
<!--                                <i>{{item.play_class_cname}}</i>-->
<!--                                <i>{{item.play_odds}}</i>-->
<!--                          </span>-->
<!--                        </div>-->
                   </div>
                   <div class="lmian wf-list" v-if="palyUnitName == '主势盘' || palyUnitName == '一字组合' || palyUnitName == '二字组合' || palyUnitName == '三字组合' || palyUnitName == '三字和数' || palyUnitName == '跨度'">
                     <div v-for="(item,index) in playSecList" :key="index">
                        <p>{{item.play_sec_cname}}</p>
                        <div class=" wf-item "
                             :class="[
                               {'w25':item.play_sec_cname == '一字组合' ||item.play_sec_cname.indexOf('和尾数')||item.play_sec_cname == '跨度'},
                               {'w33':item.play_sec_cname == '佰'||item.play_sec_cname == '个'||item.play_sec_cname == '拾'},
                               {'w50':item.play_sec_cname == '佰拾和数'||item.play_sec_cname == '佰个和数'||item.play_sec_cname == '拾个和数'}]">
                              <span class="wf-je"  v-for="(item1,index1) in item.play_sec_data" @click="selectClick($event,item1,item.play_sec_cname)"  :class="{active:selectList2.indexOf(index1)!=-1}" :key="index1">
                                  <i>{{item1.play_class_cname}}</i>
                                  <br>
                                  <i>{{item1.play_odds}}</i>
                              </span>
                        </div>
                      </div>
                   </div>
                  <div class="lmian wf-list lhc-tm" v-if="palyUnitName == '二字和数'">
                    <myScrollX>
                      <div class="tm-title" ref="personTitleTab">
                        <span v-for="(item,index) in playSecList" :key="index" :class="wfIndex== index?'active':''" @click="changeWf(index,item)" :data-index="index">{{item.play_sec_cname}}</span>
                      </div>
                    </myScrollX>
                    <div v-for="(v,index) in playClassList" :key="index" v-show="wfIndex== index">
                      <div class="w25 wf-item" :data-id="index1" v-for="(v1,index1) in v.play_sec_data" :key="index1" >
                        <p>{{v1.play_sec_cname}}</p>
                        <span class="wf-je"  v-for="(v2,index2) in v1.play_sec_data"  @click="selectClick($event,v2,v1.play_sec_cname)" :class="{active:selectList2.indexOf(index1)!=-1}" :key="index2">
                             <i>{{v2.play_class_cname}}</i>
                             <br>
                             <i>{{v2.play_odds}}</i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="lmian wf-list" v-if="palyUnitName == '一字定位'">
                    <div v-for="(item,index) in playSecList" :key="index">
                      <p>{{item.play_sec_cname}}</p>
                      <div class=" wf-item w25">
                              <span class="wf-je"  v-for="(item1,index1) in item.play_sec_data" @click="selectClick($event,item1,item.play_sec_cname)"  :class="{active:selectList2.indexOf(index1)!=-1}" :key="index1">
                                  <i>{{item1.play_class_cname}}</i>
                                  <br>
                                  <i>{{item1.play_odds}}</i>
                              </span>
                      </div>
                    </div>
                  </div>
                  <div class="lmian wf-list lhc-tm" v-if="palyUnitName == '二字定位' || palyUnitName == '三字定位'">
                    <div class="tm-title" ref="personTitleTab" v-if="palyUnitName == '二字定位'">
                      <span class="w140" v-for="(item,index2) in playSecList" :key="index2" @click="currTmItem = index2;currTabNav=item.play_sec_cname" :class="currTmItem==index2?'active':''">{{item.play_sec_cname}}</span>
                    </div>
                    <p v-if="palyUnitName == '三字定位'">{{secName}}</p>
                    <div class="pl-box"  style="padding-top:0;"> <span style="color: #445779;">赔率：</span>{{playSecList[currTmItem].play_sec_options[0].play_odds}}</div>
                    <div class="fc3D-bw clearfix" :class="palyUnitName == '二字定位'?'fc3D-bw2':''" >
                      <span v-for="(item1,index1) in playSecList[currTmItem].play_sec_info">{{item1}}</span>
                     <!-- <span>拾位</span>
                      <span v-if="palyUnitName == '三字定位'">个位</span>-->
                    </div>
                    <div class="clearfix" v-if="palyUnitName == '二字定位'">
                        <div class="wf-item w49 fl lott1" >
                            <span class="wf-je"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" 
                            :data-id="item1.play_sec_id" 
                            :data-pcname="item1.play_class_cname" 
                            :data-pname="item1.play_sec_name"
                            :data-pccname="item1.play_class_cname"
                            :key="index1" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" >{{item1.play_class_cname}}</i>
                            </span>
                        </div>
                        <div class="wf-item w49 fl lott2">
                            <span class="wf-je"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data"
                             :data-id="item1.play_sec_id" 
                             :data-pcname="item1.play_class_cname" 
                             :data-pname="item1.play_sec_name"
                             :data-pccname="item1.play_class_cname"
                             :key="index1"
                              @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" >{{item1.play_class_cname}}</i>
                            </span>
                        </div>
                    </div>
                    <div class="clearfix" v-if="palyUnitName == '三字定位'">
                        <div class="wf-item w333 fl lott1">
                            <span class="wf-je"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" 
                            :data-id="item1.play_sec_id" 
                             :data-pcname="item1.play_class_cname" 
                             :data-pname="item1.play_sec_name"
                             :data-pccname="item1.play_class_cname"
                            :key="index1" 
                            @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" >{{item1.play_class_cname}}</i>
                            </span>
                        </div>
                        <div class="wf-item w333 fl lott2">
                            <span class="wf-je"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" 
                            :data-id="item1.play_sec_id"
                             :data-pcname="item1.play_class_cname" 
                             :data-pname="item1.play_sec_name"
                             :data-pccname="item1.play_class_cname"
                             :key="index1"
                             @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                <i class="ball" >{{item1.play_class_cname}}</i>
                            </span>
                        </div>
                        <div class="wf-item w333 fl lott3">
                              <span class="wf-je"  v-for="(item1,index1) in playSecList[currTmItem].play_sec_data" 
                              :data-id="item1.play_sec_id" 
                               :data-pcname="item1.play_class_cname" 
                             :data-pname="item1.play_sec_name"
                             :data-pccname="item1.play_class_cname"
                              :key="index1" 
                              @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])" :class="{active:selectList2.indexOf(index1)!=-1}">
                                  <i class="ball" >{{item1.play_class_cname}}</i>
                              </span>
                        </div>
                    </div>
                  </div>
                  <div class="lmian wf-list fc3d-zc" v-if="palyUnitName == '组选三' || palyUnitName == '组选六'">
                    <div class="pl-box"  style="text-align: center;color: #f00;padding: 10px 0;" v-if="palyUnitName == '组选三'&&selectNum>0"> <span style="color: #445779;">赔率：</span>{{playSecList[0].play_sec_options[selectArr.length-5].play_odds}}</div>
                    <div class="pl-box"  style="text-align: center;color: #f00;padding: 10px 0;" v-if="palyUnitName == '组选六'&&selectNum>0"> <span style="color: #445779;">赔率：</span>{{playSecList[0].play_sec_options[selectArr.length-4].play_odds}}</div>
                     <!-- <div class="pl-box" v-if="palyUnitName == '自选不中'&&selectNum>0" style="padding-top:.2rem">赔率：{{playSecList[0].play_sec_options[selectArr.length-5].play_odds}}</div> -->
                    <div v-for="(item,index) in playSecList" :key="index">
                      <div class=" wf-item w25">
                            <span class="wf-je"  v-for="(item1,index1) in item.play_sec_data" @click="selectClick($event,item1,playSecList[currTmItem].play_sec_cname,playSecList[currTmItem])"  :class="{active:selectList2.indexOf(index1)!=-1}" :key="index1">
                                <i class="ball">{{item1.play_class_cname}}</i>
                            </span>
                      </div>
                    </div>
                  </div>
                  <div class="wf-list long-betting" v-if="palyUnitName == '长龙'">
                      <div class="cl-issue">长龙连开期数：<span  class=" " @click="PickerShow1()">{{clValue}}</span></div>
                      <ul class="long-bet">
                        <li v-for="(v,index) in currClData" :key="index" v-if="v.nums>=clValue">
                            <i class="pk-Close" v-if="v.count_down<=0">已封盘</i>
                            <div class="clearfix cl-name">
                                <span class="fl">{{v.lottery_name}}</span>
                                <span class="fr">第 <i class="redColor">{{v.next_issue}}</i> 期</span>
                            </div>
                            <div class="clearfix pk-size">
                                <div class="fl xz-left">
                                    <span>{{v.play_sec_cname}}</span>
                                    <span class="redColor" v-if="v.count_down>0">{{v.count_down | filterCLtime}}</span>
                                </div>
                 <!-- v-for="(vv,index2) in v.play_sec_data" :key="index2"  -->
                                <div class="fr xz-btn blueColor"
                                    :class="{active:selectList3.find(value=>{return v.play_sec_name==value.play_sec_name&&v.lottery_id==value.play_bet_lottery_id&&v.play_sec_data[0].play_class_name==value.play_class_name})}"
                                    @click="selectCl($event,v,0)">
                                    <span>{{v.play_sec_data[0].play_class_cname}}</span>
                                    <span>{{v.play_sec_data[0].play_odds}}</span>
                                </div>
                                <div class="fr xz-btn blueColor redColor"
                                    :class="{active:selectList3.find(value=>{return v.play_sec_name==value.play_sec_name&&v.lottery_id==value.play_bet_lottery_id&&v.play_sec_data[1].play_class_name==value.play_class_name})}"
                                    @click="selectCl($event,v,1)">
                                    <span>{{v.play_sec_data[1].play_class_cname}}</span>
                                    <span>{{v.play_sec_data[1].play_odds}}</span>
                                </div>
                            </div>
                            <div class="pk-percent">
                                <span class="pk-red" :style="'width:'+v.pk[0]*100+'%'"></span>
                                <span class="pk-blue" :style="'width:'+v.pk[1]*100+'%'">
                                    <i class="pk-icon"></i>
                                </span>
                            </div>
                            <div class="pk-last">
                                <i class="redColor">{{v.result}}</i>
                                连开<i class="redColor">{{v.nums}}</i>期
                            </div>
                        </li>
                        <!-- <li>
                            <i class="pk-Close">已封盘</i>
                            <div class="clearfix cl-name">
                                <span class="fl">幸运飞艇</span>
                                <span class="fr">第 <i class="redColor">2000000002</i> 期</span>
                            </div>
                            <div class="clearfix pk-size">
                                <div class="fl xz-left">
                                    <span>亚军</span>
                                    <span class="redColor">01:22</span>
                                </div>
                                <div class="fr xz-btn blueColor active">
                                    <span>大</span>
                                    <span>01:22</span>
                                </div>
                                <div class="fr xz-btn redColor">
                                    <span>小</span>
                                    <span>01:22</span>
                                </div>
                            </div>
                            <div class="pk-percent">
                                <span class="pk-red"></span>
                                <span class="pk-blue">
                                    <i class="pk-icon"></i>
                                </span>
                            </div>
                            <div class="pk-last">
                                <i class="redColor">6</i>
                                小连开<i class="redColor">6</i>期
                            </div>
                        </li> -->
                      
                      </ul>
                  </div>
                </myScroll>
            </div>
        </div>
<!--        我的注单-->
        <div class="betting-content" v-show="tabIndex == 1">
            <TzRecord :currentId="currId" :topNav="5.3" :top="6.3"/>
        </div>
<!--        热门直播-->
        <div class="betting-content" v-show="tabIndex == 2 &&isPure==0">
            <HotHost/>
        </div>
        <!-- 筹码 -->
        <div class="foo-submit clearfix" v-show="!isMess">
            <div class="diamond fl over clearfix"><i class="fl"></i><span class="fl">{{amount}}</span><p @click="money(true)" class="refurbish"></p></div>
            <!-- <div class="diamond fl clearfix"  v-show="quizTypeId == '0'" ><i class="fl"></i><span class="fl">{{zsMount}}</span><p @click="zsQuest(true)" class="refurbish"></p></div> -->
            <div class="foo-btn fr clearfix">
                <div class="clear-btn fl" @click="clearSelectList">重置</div>
                <div class="submit-btn fl"   @click="submitBetOver">提交</div>
                <!-- <div class="submit-btn fl" v-show="quizTypeId == '0'" @click="submitBet">提交</div> -->
            </div>
            <!-- v-if="chouma" -->
            <div class="chips-box" v-show="chouma" @focusout="inputBlur" @focusin="inputFocus">
                <!-- <div class="quiz-type" v-if="$store.state.isPure!=1">
                    <span  :class="quizTypeId == '1' ? 'active' : '' " @click="quizType(1)"><i class="icon"></i> 余额竞猜</span>
                    <span :class="quizTypeId ==0 ? 'active' : '' " @click="quizType(0)"><i class="icon"></i> 钻石竞猜</span>
                </div> -->
                <div style="margin-left:0.4rem">
                <myScrollX>
                    <div class="chips clearfix" ref="chipsTab">
                        <span v-for="(item,index) in chipsNum" :key="index" @click="chipsChange(index,item.play_sum_num)" class="fl" :class="{['chips-'+item.play_sum_num]:['chips-'+item.play_sum_num],active:chipsJE==item.play_sum_num}" id="chips"></span>
<!--                    <span v-for="(item,index) in chipsNum" :key="index" @click="chipsChange(index,item.play_sum_num)" class="fl" :class="{['chips-'+item.play_sum_num]:['chips-'+item.play_sum_num],active:chipsIndex == index}" id="chips"></span>-->
                    </div>
                </myScrollX>
                </div>
                <div class="chips-Amount clearfix" >
                    <div class="chips-l fl">
                    <span style="margin-right:0.22rem;">其他金额:</span>
                    <!-- <x-input aria-placeholder="请输入钻石"></x-input> -->
                    <!-- <input type="text" v-if="quizTypeId==0" placeholder="请输入钻石"  class="chips-input" v-model="chipsJE" id="jine" maxlength="9"> -->
                    <input type="text"  placeholder="请输入金额"  class="chips-input" v-model="chipsJE" id="jine" maxlength="9">
                    </div>
                    <div class="chips-r fr" >
                        <span>共{{selectNum}}注</span>
                        <!-- <span v-if="quizTypeId ==0" style="margin-left: 0.13rem;"><i>{{selectDiamond}}</i> 钻 </span> -->
                        <span style="margin-left: 0.13rem;"><i>{{selectDiamond}}</i> 元 </span>
                    </div>
                </div>
            </div>
         </div>
        <div class="Confirm-mb" v-show="isMess" @click ="isMess = false"></div>
        <!--确认注单详情-->
        <div class="Confirm-bet" v-show="isMess"  id="betContent">
                     <h3>请确认详细注单</h3>
                     <div class="bet-list" v-if="palyUnitName != '长龙'">
                         <div class="bet-title clearfix">
                             <span>玩法</span>
                             <span>号码</span>
                             <span>赔率</span>
                             <span>金额</span>
                             <!-- <span v-if="quizTypeId==0">钻石</span> -->
                         </div>
                         <myScroll ref="scrollWrapperMess"  :top="2.15" :bgColor="'f5f7fa'" :playList="playList" :bottom="0" :zIndex="999">
                            <div class="bet-content " @focusout="inputBlur" @focusin="inputFocus" >
                                <div  data-type="0" class="list-item" v-for="(v,index) in selectList3" :key="index">
                                    <div class="clearfix "  @touchstart.capture="touchstart" @touchend.capture="touchEnd">
                                        <span>{{v.play_sec_cname}}</span>
                                        <span>{{v.play_class_cname}}</span>
                                        <span style="">{{v.play_odds}}</span>
                                        <span class="jine" ><input v-model="v.play_bet_sum" :data-index="index" maxlength="9"></span>
                                        <div class="delete" @click="deleteItem" :data-index="index"> 删除</div>
                                    </div>
                                </div>
                            </div>
                         </myScroll>  
                     </div>
                     <!-- 长龙注单 -->
                     
                     <div class="bet-list cl-bet-list" v-if="palyUnitName == '长龙'">
                         <div class="bet-title clearfix">
                             <span>号码</span>
                             <span>赔率</span>
                             <span>金额</span>
                         </div>
                         <myScroll ref="scrollWrapperMess"  :top="2.15" :bgColor="'f5f7fa'" :playList="playList" :bottom="0" :zIndex="999">
                            <div class="bet-content " @focusout="inputBlur" @focusin="inputFocus" >
                                
                                <div  data-type="0" class="list-item" v-for="(v,index) in selectList3" :key="index">
                                    <div class="clearfix "  @touchstart.capture="touchstart" @touchend.capture="touchEnd">
                                        <span>{{v.play_lottery_name}}<br>[{{v.play_sec_cname}}][{{v.play_class_cname}}]</span>
                                        <span style="">{{v.play_odds}}</span>
                                        <span class="jine" ><input v-model="v.play_bet_sum" :data-index="index" maxlength="9"></span>
                                        <div class="delete" @click="deleteItem" :data-index="index"> 删除</div>
                                    </div>
                                </div>
                            </div>
                         </myScroll>  
                     </div>
             </div>
        <div class="foo-submit clearfix" v-if="isMess">
           <div class="fl bet-num">总下注金额： <span>{{totalNum}}</span> </div>
           <div class="fr bet-btn" @click="Confirmbet">确认</div>
        </div>

        <!-- 彩种切换 -->
        <picker
        :data="lotteryList"
        :showToolbar="true"
        :maskClick="true"
        @change="pickerconfirm1"
        @confirm="confirmCZ"
        :visible.sync="pickershow"
        :rowNumber="5"
        />
        <!-- 彩长龙期数切换 -->
        <picker
        :data="clList"
        :showToolbar="true"
        :maskClick="true"
        @confirm="confirmCL"
        :visible.sync="pickerCLshow"
        :rowNumber="5"
        />

        <audio :src="musicSrc"  controls="" id="lotteryMusic" v-show="isAudio"></audio>

        <!-- 多期开奖走势 -->
        <div class="more-result-mask" :class="currId == 8 ?'t4':''" @click="showZS=false" v-show="showZS"></div>
        <div class="more-result-container" v-show="showZS">
           <myScroll :top="currId == 8 ?4.1:3.6" :bottom='0' :data="playListData" ref="historyScroll">
                <div class="control-container" v-show="showBj">
                    <p class="clearfix"><span class="fl">标记号码</span> <span class="fr clear-btn" @click="clearAll">清空</span></p>
                    <div class="select-ball">
                        <span v-if="currId==29||currId==9||currId==26||currId==27||currId==11||currId==32" v-for="(v,index) in selectBallSc" @click="selectOneBall($event,v)" :key="index">{{v}}</span>
                        <span v-if="currId==10||currId==30||currId==31||currId==10||currId==28||currId==5||currId==14" v-for="(v,index) in selectBall" @click="selectOneBall($event,v)" :key="index">{{v}}</span>
                    </div>
                     <p class="clearfix"><span class="fl">标记双面</span></p>
                     <div class="select-other">
                         <div class="select-item">
                             <span @click="selectLm($event,'1',1)">大</span>
                             <span @click="selectLm($event,'2',1)">小</span>
                         </div>
                         <div class="select-item">
                             <span @click="selectLm($event,'1',2)">单</span>
                             <span @click="selectLm($event,'2',2)">双</span>
                         </div>
                          <!-- <div class="select-item" v-show="currId==10||currId==30||currId==31||currId==10||currId==28||currId==5||currId==14">
                             <span @click="selectLm($event,'1',3)">质</span>
                             <span @click="selectLm($event,'2',3)">合</span>
                         </div> -->
                     </div>
                </div>
                <!-- 六合彩 -->
                <div class="result-content lhc-result" v-if="currId==8">
                    <table cellspacing='0' cellpadding=0>
                        <thead>
                            <tr>
                                <th rowspan= "2">期号</th>
                                <th colspan="7">开奖号码</th>
                                <th colspan="2">特码</th>
                            </tr>
                            <tr>
                                <th>正1</th>
                                <th>正2</th>
                                <th>正3</th>
                                <th>正4</th>
                                <th>正5</th>
                                <th>正6</th>
                                <th>特码</th>
                                <th>大小</th>
                                <th>单双</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in historyList" :key="index">
                                <td>{{v.issue}}</td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[0]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[0]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[0] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[1]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[1]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[1] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[2]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[2]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[2] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[3]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[3]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[3] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[4]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[4]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[4] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td class="tm6">
                                        <span class="ball" :class="v.code.split(',')[5]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[5]}}</span><i>+</i>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[5] | filterSixSX(v.issue)}}</span><i>&nbsp;</i>
                                    </td>
                                    <td>
                                        <span class="ball" :class="v.code.split(',')[6]|filterSelectBallsix(currSelectBall)">{{v.code.split(',')[6]}}</span>
                                        <span class="zodiac"  style="display:block; color: #445779;" >{{v.code.split(',')[6] | filterSixSX(v.issue)}}</span>
                                    </td>
                                    <td :class="v.code.split(',')[6]|filterDxH(24)|filterColor">{{v.code.split(',')[6]|filterDxH(24)}}</td>
                                    <td :class="v.code.split(',')[6]|filterDs|filterColor">{{v.code.split(',')[6]|filterDs}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 福彩 -->
                <div class="result-content fc-result" v-if="currId==5||currId==14">
                    <table cellspacing='0' cellpadding=0>
                        <thead>
                            <tr>
                                <th style="width:15%" rowspan= "2">期号</th>
                                <th style="width:26%" rowspan= "2"><span>开奖号码</span><br><span @click="showBj=!showBj" style="color:#1486FF">标记<i v-if='currSelectBallArr.length' style="word-break: break-all;">({{currSelectBallArr.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
                                <th style="width:18%" colspan="3">百</th>
                                <th style="width:18%" colspan="3">十</th>
                                <th style="width:18%" colspan="3">个</th>
                                <th style="width:15%" colspan="2">总和</th>
                            </tr>
                            <tr> 
                                <th>大小</th>
                                <th>单双</th>
                                <th>质合</th>
                                <th>大小</th>
                                <th>单双</th>
                                <th>质合</th>
                                <th>大小</th>
                                <th>单双</th>
                                <th>质合</th>
                                <th>大小</th>
                                <th>单双</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in historyList" :key="index">
                                <td>{{v.issue}}</td>
                                <td><span class="ball" v-for="(ball, index1) in v.code.split(',')" :key="index1" :class="ball|filterSelectBall(currSelectBall)">{{ball}}</span></td>
                                <td><span  :class="v.code.split(',')[0] | filterDx(4) | filterColor">{{ v.code.split(',')[0] | filterDx(4) }}</span></td>
                                <td><span :class="v.code.split(',')[0] | filterDs | filterColor">{{ v.code.split(',')[0] | filterDs}}</span></td>
                                <td><span  :class="v.code.split(',')[0] | filterZh | filterColor">{{ v.code.split(',')[0] | filterZh}}</span></td>
                                <td><span  :class="v.code.split(',')[1] | filterDx(4) | filterColor">{{ v.code.split(',')[1] | filterDx(4) }}</span></td>
                                <td><span :class="v.code.split(',')[1] | filterDs | filterColor">{{ v.code.split(',')[1] | filterDs}}</span></td>
                                <td><span  :class="v.code.split(',')[1] | filterZh | filterColor">{{ v.code.split(',')[1] | filterZh}}</span></td>
                                <td><span  :class="v.code.split(',')[2] | filterDx(4) | filterColor">{{ v.code.split(',')[2] | filterDx(4) }}</span></td>
                                <td><span  :class="v.code.split(',')[2] | filterDs | filterColor">{{ v.code.split(',')[2] | filterDs}}</span></td>
                                <td><span :class="v.code.split(',')[2] | filterZh | filterColor">{{ v.code.split(',')[2] | filterZh}}</span></td>
                                <td><span :class="v.code| filtersSum| filterDx(13) | filterColor">{{ v.code | filtersSum| filterDx(13)}}</span></td>
                                <td><span :class="v.code| filtersSum| filterDs | filterColor">{{ v.code | filtersSum| filterDs}}</span></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 时时彩 -->
                <div class="result-content ssc-result" v-if="currId==10||currId==30||currId==31||currId==10||currId==28">
                    <table cellspacing='0' cellpadding=0>
                        <thead>
                            <tr>
                                <th class="w25">期号</th>
                                <th class="w35"><span>开奖号码</span><br><span @click="showBj=!showBj"  style="color:#1486FF">标记 <i v-if='xsSelectBall.length' style="word-break: break-all;">({{xsSelectBall.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
                                <th class="w4">总和龙虎和</th>
                            </tr>
                        </thead>
                         <tbody>
                            <tr v-for="(v,index) in historyList" :key="index">
                                <td>{{v.issue}}</td>
                                <td><span class="ball" v-for="(ball, index1) in v.code.split(',')" :key="index1" :class="ball|filterSelectBall(currSelectBall)">{{ball}}</span></td>
                                <td>
                                    <span class="xt" :class="v.code | filtersSum | filterDx(22) | filterColor">{{ v.code | filtersSum | filterDx(22) }}</span>
                                    <span class="xt" :class="v.code | filtersSum | filterDs | filterColor">{{ v.code | filtersSum | filterDs }}</span>
                                    <span class="xt" :class="v.code | filterLhh('一v五') | filterColor">{{v.code | filterLhh('一v五')}}</span>
                                </td>
                            </tr>
                         </tbody>
                    </table>
                </div>
                <!-- 赛车 -->
                <div class="result-content sc-result" v-if="currId==29||currId==9||currId==26||currId==27||currId==11||currId==32">
                    <table cellspacing='0' cellpadding=0>
                        <thead>
                            <tr>
                                <th style="width:16%" rowspan= "2">期号</th>
                                <th style="width:55%" rowspan= "2"><span>开奖号码</span><span @click="showBj=!showBj" style="color:#1486FF">标记<i v-if='xsSelectBall.length' style="word-break: break-all;">({{xsSelectBall.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
                                <th style="width:12%" colspan="2">冠亚和</th>
                            </tr>
                            <tr> 
                                <th>大小</th>
                                <th>单双</th>
                            </tr>
                        </thead>
                         <tbody>
                            <tr v-for="(v,index) in historyList" :key="index">
                                <td>{{v.issue}}</td>
                                <td><span class="ball" v-for="(ball, index1) in v.code.split(',')" :key="index1" :class="ball|filterSelectBallSc(currSelectBall)">{{ball}}</span></td>
                                <td>
                                    <span class="xt" :class="v.code | filterPk10Gyh | filterDx(11) | filterColor">{{ v.code | filterPk10Gyh | filterDx(11) }}</span> 
                                </td>
                                <td>
                                    <span class="xt" :class="v.code | filterPk10Gyh | filterDs | filterColor">{{ v.code | filterPk10Gyh | filterDs }}</span>
                                </td>
                            </tr>
                         </tbody>
                    </table>
                </div>
                <div class="bottom-btn">
                    <div class="back-btn" @click="showZS=false">返回</div>
                    <div class="see-all" @click="$router.push('/zyTool/'+currId)">查看完整走势</div>
                </div>
           </myScroll>    
        </div>

    </div>
</template>

<script>
import picker from 'vue-pickers'
import TzRecord from "../../components/tzRecord.vue"//Ghi chép cá cược 
import HotHost from "./hotHost.vue"//Ghi chép cá cược 
import { removeAllactive,num_zh,getNumZh,getRank,getSiblings } from "../../assets/js/public"
import {mapMutations, mapState } from "vuex";
var pageTimer = {}
    export default {
        name: "betting",
        data(){
            return{
                isBetting:false,
                isAudio:false,
                playList:{},
                currBallDel:{
                    issue:''
                },//当前开奖
                currBall:[],//当前开奖号码
                djsTime: "--:--",//倒计时
                djsTime1: "--:--",//倒计时
                loadingTime:false,
                musicState:this.$store.state.musicState==true||this.$store.state.musicState=='true',
                musicSrc:require('../../assets/ring.mp3'),
                tabTitle:["投注区","我的注单","热门直播"],
                tabIndex:0,
                lotteryValue:'loading',
                pickershow:false,
                lotteryList:[[]],//彩种切换
                isMess:false,
                // quizTypeId:(this.$store.state.isPure==1)?1:0,
                quizTypeId:1,
                chouma:false,//筹码盒子
                chipsNum:[],
                chipsJE:1,
                chipsIndex:0,
                totalNum:'',
                amount:0,
                zsMount:0,
                selectDiamond:0,
                selectNum:0,
                selectList3:[],
                selectList2:[],
                selectListTs:[],//六合彩 连码 连肖连尾 合肖显示的下注数据列表
                lotteryId:9,
                palyList:[],//玩法列表
                palyUnit:[],
                playSecList:[],
                playClassList:[],
                secName:'',//玩法
                secIndex:0,
                palyUnitName:'',
                wfIndex:0,
                isCombo:0,  //0 一般玩法  1组合玩法
                nextEndTime:'',
                gbottom:1.34,
                DMIndex:-1,
                comboType:'二中二', //单码、连码、斗牛
                currId:'',
                lastRoute:false,
                isTz:this.$store.state.codeToken,
                kjNum:[],
                currTmItem:0,//六合彩切换
                showKj:0,
                currTabNav:'',//右边玩法，当前选中的玩法
                selectArr:[],//选中特殊玩法的名字
                selectNameArr:[],//选中特殊玩法的名字中文
                selectBall:[0,1,2,3,4,5,6,7,8,9],
                selectBallSc:[1,2,3,4,5,6,7,8,9,10],
                currSelectBall:[],
                xsSelectBall:[],
                historyList:[],//近20期历史开奖
                playListData:{},
                showZS:false,//走势
                showBj:false,//显示标记号码
                currDX:0,//大小
                currDS:0,//单双
                currZH:0,//质合
                selectObj:{
                    '100':[5,6,7,8,9],//大
                    '200':[0,1,2,3,4],//小
                    '010':[1,3,5,7,9],//单
                    '020':[0,2,4,6,8],//双
                    '001':[2,3,5,7],//质
                    '002':[4,6,8,9],//合
                    '110':[5,7,9],//大单
                    '120':[6,8],//大双
                    '101':[5,7],//大质
                    '102':[6,8,9],//大合
                    '111':[7],//大单质
                    '121':[],//大双质 没有
                    '112':[9],//大单合
                    '122':[8],//大双合
                    '210':[1,3],//小单
                    '220':[0,2,4],//小双
                    '201':[2,3],//小质
                    '202':[4],//小合
                    '211':[3],//小单质
                    '221':[2],//小双质
                    '212':[],//小单合 没有
                    '222':[4],//小双合
                    '011':[3,5,7],//单质
                    '012':[9],//单合
                    '021':[2],//双质
                    '022':[4,6,8],//双合
                    '000':[0,1,2,3,4,5,6,7,8,9]
                },
                selectObjSc:{
                    '100':[6,7,8,9,10],//大
                    '200':[1,2,3,4,5],//小
                    '010':[1,3,5,7,9],//单
                    '020':[2,4,6,8,10],//双
                    '110':[7,9],//大单
                    '120':[6,8,10],//大双
                    '210':[1,3,5],//小单
                    '220':[2,4],//小双
                    '000':[1,2,3,4,5,6,7,8,9,10]
                },
                sixBallData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
                17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,
                34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],
                clValue:6,
                pickerCLshow:false,
                clList:[[{label:6},{label:8}, {label:10},{label:12}]],
                currClData:[],//长龙渲染数据
                clPostData:[],//长龙下注发送数据
                clSelectIndex:null,
                currSelectBallArr:[],
                currSelectSmArr:[],
                moveLiIndex:-1,
                moveLiHight:0,
                coordinate: {
                client: {},
                elePosition: {}
                },
                topHight:0,
                timeOutEvent:0,
                isMoveLi:false,
                ulScrollY:0,
                moveRange:0
                
            }
        },
        components:{
            picker,
            TzRecord,
            HotHost
        },
        created(){
            this.lotteryId = this.$route.params.id ;
            this.currId = this.$route.params.id;
            this.init();//初始化
        },
        watch:{
            clData:{
                deep:true, //深度监听设置为 true
                 handler:function(newV,oldV){
                 let i=0;
                //   console.log('watch中：'+(i++),newV)
                  this.currClData = newV;
                   setTimeout(() => {
                        if(this.$refs.scrollWrapper) this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                    }, 20);
                //    console.log(this.currClData);
                } 
            },
            currSelectBall:function(){

            },
            currTmItem:function(){
                this.clearSelectList();

            },
            chipsNum: function() {
                this.$nextTick(() => {
                    this.ChipsScrollX();
                });
            },
            selectList3:{
                handler:function(newValue,oldValue){
                    // console.log(newValue)
                    let totalNum = 0;
                    for(let i = 0, len = newValue.length; i < len; i++) {
                        if((newValue[i].play_bet_sum)){
                            totalNum  +=  parseInt(newValue[i].play_bet_sum);
                            let n = newValue[i].play_bet_sum.toString();
                            newValue[i].play_bet_sum = n.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                        }
                       
                    }
                    this.totalNum = totalNum;

                },
                deep:true,
            },
            selectListTs:{
                handler:function(newValue,oldValue){
                    // console.log(newValue)
                    let totalNum = 0;
                    for(let i = 0, len = newValue.length; i < len; i++) {
                        totalNum  +=  parseInt(newValue[i].play_bet_sum);
                        let n = newValue[i].play_bet_sum.toString();
                        newValue[i].play_bet_sum = n.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                    }
                    this.totalNum = totalNum;

                },
                deep:true,
            },
            chipsJE: function(n, o) {
                if (n) {
                    this.$nextTick(() => {
                    let i = n.toString();
                    // console.log(i)
                    this.chipsJE = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                        
                    this.selectDiamond = this.chipsJE * this.selectNum;
                    this.selectList3.forEach((value , index) => {
                        value['play_bet_sum'] = this.chipsJE;
                    });
                    if(i != 10 && i != 20  && i != 50  && i != 100  && i != 200 && i != 500  && i != 1000 && i != 5000  && i != 10000 && i != 50000 && i != 100000
                    ){
                        this.chipsIndex = -1;
                    }
                    // if(i == 10){this.chipsIndex = 0; }
                        // if(this.quizTypeId==1){
                        //     if(i<1){
                        //         this.$vux.toast.text('请输入≥1的整数', 'middle');
                        //     }
                        // }else{
                        //     if(i<10){
                        //         this.$vux.toast.text('请输入≥10的整数', 'middle');
                        //     }
                        // }
                         if(i<1){
                                this.$vux.toast.text('请输入≥1的整数', 'middle');
                            }

                    if(i>999999999){
                        this.chipsJE = this.chipsJE.substring(0,9);
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                    }
                    });
                }
            },
            'currBallDel.issue':function(v,c){
                if(v-c!=1){
                return
                }
                if(this.musicState){
                    let Music=document.getElementById('lotteryMusic')
                if(Music!=null){
                    Music.play()
                }
                }
            },
            musicState:function(v){
                this.SETISMUSIC(v)
            },
            chouma:function(n,o){
                if(this.chouma){
                    if(this.$store.state.isPure==1){
                        this.gbottom = 4;
                    }else{
                        this.gbottom = 4.9;
                    }

                }else{
                    this.gbottom = 1.34;
                }
                // if(this.quizTypeId ==1){
                //     this.chipsJE = 1;
                // }else{
                //     this.chipsJE = 10;
                // }
            },
            quizTypeId:function(n){
                if(n ==1){
                    this.chipsJE = 1;
                }else{
                    this.chipsJE = 10;
                }
            },
            wfIndex(n,o) {
                if(n!=o&&this.palyUnitName!='快捷'){
                    this.clearSelectList();
                }
                if(this.palyUnitName=='快捷'){
                    if(this.selectList2.length&&this.kjNum.length) this.chouma = true;
                    else this.chouma = false;
                    //this.doKj();
                    this.selectNum = this.selectList2.length *this.kjNum.length;
                    this.selectDiamond = this.chipsJE * this.selectNum;
                }
            },
            kjNum:function(){
                if(this.selectList2.length&&this.kjNum.length) this.chouma = true;
                else this.chouma = false;
               // this.doKj();
                let allActive =  document.querySelectorAll('.kj-item-list span.active');
                if(!this.kjNum.length){
                    this.selectList2 = [];
                    removeAllactive(allActive);
                }
                this.selectNum = this.selectList2.length *this.kjNum.length;
                this.selectDiamond = this.chipsJE * this.selectNum;
            },
            playSecList(){
                this.$nextTick(() => {
                    this.TitleScrollX();
                });
            },
            "$route":function () {
                this.lotteryId = this.$route.params.id ;
                this.currId = this.$route.params.id;
            }

        },
        computed: {
           ...mapState(["userType","isYue","isPure","codeToken","userinfo","clData",'czListData',"moneyData"])

        },
        filters:{
            filterCLtime(time){
                 let t = "";
                let h = "";
                let d = "";
                let min = "";
                let second = "";
                // let obj = {};
                if (time > 60) {
                    second = parseInt(time) % 60;
                    min = parseInt((time / 60) % 60);
                    h = parseInt((parseInt(time / 60) / 60) % 24);
                    d = parseInt(parseInt(time / 60) / 60 / 24);
                    second = second >= 10 ? second : "0" + second;
                    min = min >= 10 ? min : "0" + min;
                    if (!h) h = "";
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
                } else {
                    t = "00:" + (time >= 10 ? time : "0" + time);
                }
                return t;
            },
            filterSelectBall(n,arr){
                // if(!arr.length) return
                // console.log(arr);
                let index = arr.findIndex((v,i)=>{
                    return v == n
                })
                if(index<=-1){
                    return 'no-select-ball'
                }
            },
            filterSelectBallSc(n,arr){
                 let color = "";
                switch (parseInt(n)) {
                    case 1:
                        color = "firstColor";
                        break;
                    case 2:
                        color = "secondColor";
                        break;
                    case 3:
                        color = "thirdColor";
                        break;
                    case 4:
                        color = "fourthColor";
                        break;
                    case 5:
                        color = "fifthColor";
                        break;
                    case 6:
                        color = "sixthColor";
                        break;
                    case 7:
                        color = "seventhColor";
                        break;
                    case 8:
                        color = "eigthColor";
                        break;
                    case 9:
                        color = "ninthColor";
                        break;
                    case 10:
                    color = "tenthColor";
                    break;
                }
                let index = arr.findIndex((v,i)=>{
                    return v == n
                })
                if(index<=-1){
                    return 'no-select-ball'
                }else{
                    return color;
                }
            },
            filterSelectBallsix(n,arr){
                let ballColor = ''
                switch (n - 0) {
                    case 1:
                    case 2:
                    case 7:
                    case 8:
                    case 12:
                    case 13:
                    case 18:
                    case 19:
                    case 23:
                    case 24:
                    case 29:
                    case 30:
                    case 34:
                    case 35:
                    case 40:
                    case 45:
                    case 46:
                        ballColor = 'redBg'
                        break
                    case 5:
                    case 6:
                    case 11:
                    case 16:
                    case 17:
                    case 21:
                    case 22:
                    case 27:
                    case 28:
                    case 32:
                    case 33:
                    case 38:
                    case 39:
                    case 43:
                    case 44:
                    case 49:
                        ballColor = 'greenBg'
                        break
                    case 3:
                    case 4:
                    case 9:
                    case 10:
                    case 14:
                    case 15:
                    case 20:
                    case 25:
                    case 26:
                    case 31:
                    case 36:
                    case 37:
                    case 41:
                    case 42:
                    case 47:
                    case 48:
                        ballColor = 'blueBg'
                        break
                    default:
                        break
                }
                let index = arr.findIndex((v,i)=>{
                    return v == n
                })
                if(index<=-1){
                    return 'no-select-ball'
                }else{
                    return ballColor;
                }
            }
        },
        methods:{
            ...mapMutations(["SETISMUSIC","GETISYUE","SETDIAMOND","SETDIAMOND","SETUSERTOKEN","SETCZNDATA","SETCZNDATA","SETGAMEDATA","SETMONEYNDATA"]),
            scrollEnd(i,d){
               if(i=='end'){
                   this.ulScrollY=d.y
               }
            },
            liTouchstart(e, item, index){
                this.topHight=document.getElementById('betting').offsetHeight
                this.moveLiHight=this.$refs.liItem[index].offsetHeight
               this.moveLiIndex=index
               this.moveRange=this.$refs.ulScroll.Myscroll.wrapperHeight<this.palyUnit.length*this.moveLiHight?this.$refs.ulScroll.Myscroll.wrapperHeight:this.palyUnit.length*this.moveLiHight
                let element = e.targetTouches[0]
                this.coordinate.client = {
                y: element.clientY
            }
            this.coordinate.elePosition.top = this.$refs.liItem[index].offsetTop
            this.timeOutEvent = setTimeout(()=>{
              this.isMoveLi=true
              this.$refs.liItem[index].classList.add('moveActive')
            //   moveActive
            //   this.$refs.liItem[index].style.color="blue"
            //   this.$refs.liItem[index].style.fontSize="24px"
              this.$refs.ulScroll.disable()
            },600)
            },
            liTouchmove(e,index){
             clearTimeout(this.timeOutEvent);
            this.timeOutEvent=0
            if(!this.isMoveLi){
            return
            }   
            let element = e.targetTouches[0]
            let y = this.coordinate.elePosition.top + (element.clientY - this.coordinate.client.y)
            this.$refs.liItem[index].style.zIndex='99'
            this.$refs.liItem[index].style.transform = 'translate3d( 0,' + (y-index*this.moveLiHight) + 'px, 0)'
            // this.$refs.ulScroll.disable()
            },
             liTouchend (e) {
            clearTimeout(this.timeOutEvent);
            this.timeOutEvent=0
            if(!this.isMoveLi){
                return
            }
            this.$refs.ulScroll.enable()
            for (let i = 0; i < this.palyUnit.length; i++) {
                this.$refs.liItem[i].style.transform = 'translate3d(0px, 0px, 0px)';
                this.$refs.liItem[i].style.zIndex='1'
                this.$refs.liItem[i].classList.remove('moveActive')

                }
            //    console.log()
            if(e.changedTouches[0].pageY-this.topHight>this.moveRange||e.changedTouches[0].pageY-this.topHight<=0){
                return
            }
            let num=Math.floor((e.changedTouches[0].pageY-this.topHight-this.ulScrollY)/this.moveLiHight)
            if(num!=this.moveLiIndex){
                let temp = this.palyUnit[this.moveLiIndex];
                    this.palyUnit[this.moveLiIndex] = this.palyUnit[num];
                    this.palyUnit[num] = temp;
                    this.$forceUpdate()
            }
            this.isMoveLi=false
            },
            //去重
             unique(arr) {
                if (!Array.isArray(arr)) {
                    // console.log('type error!')
                    return
                }
                var array = [];
                for (var i = 0; i < arr.length; i++) {
                    if (array .indexOf(arr[i]) === -1) {
                        array .push(arr[i])
                    }
                }
                return array;
            },
             data_demo_do(data) {
                let odds = {};
                if (data) {
                    odds = data;
                } else return;
                let play_list = {};
                for (let k in odds) {
                    let v = odds[k];
                    if (!play_list[v.lottery_id]) play_list[v.lottery_id] = []
                    play_list[v.lottery_id].push(v);
                }
                return play_list;
            },
            clearAllDJS(){
                //全部清除方法
                for(var each in pageTimer){
                    clearInterval(pageTimer[each]);
                }
            },
            //长龙选择
            selectCl(e,val,i){
               
                let obj = {
                    play_bet_lottery_id:val.lottery_id,
                    play_bet_issue:val.next_issue,
                    play_sec_name:val.play_sec_data[i].play_sec_name,
                    play_sec_cname:val.play_sec_cname,
                    play_class_name:val.play_sec_data[i].play_class_name,
                    play_odds:val.play_sec_data[i].play_odds,
                    play_class_cname:val.play_sec_data[i].play_class_cname,
                    play_lottery_name:val.lottery_name,
                    play_bet_sum:this.chipsJE.toString()
                }

                let index=this.selectList3.findIndex((res,i)=>{
                    return JSON.stringify(res)==JSON.stringify(obj)
                    
                })
                if(index>-1){
                    this.selectList3.splice(index,1)
                
                }else{
                    this.selectList3.push(obj)
                }
               // this.selectList3 = arr;
                if(this.selectList3.length){
                    this.chouma = true;
                }else{
                    this.chouma = false;
                }
                 this.selectNum = this.selectList3.length;
                // console.log(this.selectList3)
            },
            //获取长龙数据
            async getClData(){
                let res = await this.$http.get('/forum/lottery/dragon-bet');
                // this.changeCLTime(res.data.data || [])
                this.currClData = res.data.data || [];
                this.getOneNumber();
            },
            seeMore(e){
                this.showZS = !this.showZS;
                this.showBj = false;
                this.clearAll();
            },
            getToday(){
                let time = new Date();
                let y = time.getFullYear();
                let m = time.getMonth() + 1;
                let d = time.getDate();
                m = m >= 10 ? m : "0" + m;
                d = d >= 10 ? d : "0" + d;
                return y + "-" + m + "-" + d
            },
            async getHistoryList(id) {
                // this.historyList = [];
                let res = await this.$http.post("/open/idx/history", {
                    lottery_id: id || this.lotteryId,
                    belong_date: this.getToday(),
                    nums: 20
                });
               this.historyList = res.data.data || [];
                this.playListData.history = this.historyList;
                setTimeout(() => {
                    this.$refs.historyScroll.refresh(); //重新计算高度，刷新滚动条
                }, 20);
            },
            selectOneBall(e,v){
                let allother = document.querySelectorAll('.select-other span.active');
                if(allother.length){
                    // this.currSelectBall = [];
                    // console.log(111,this.currSelectBall)
                    this.xsSelectBall = this.unique(this.currSelectBall); //标记号码
                    //  removeAllactive(allother);
                    //  this.currDX = '0';
                    //  this.currDS = '0';
                    //  this.currZH = '0';
                }
                let curr = e.currentTarget;
                if(curr.className.includes('active')){
                    // console.log(1)
                    let index = this.currSelectBall.findIndex(val=>{
                        return val==v
                    })
                     let index1 = this.currSelectBallArr.findIndex(val=>{
                        return val==v
                    })
                    this.currSelectBallArr.splice(index1,1);
                    this.currSelectBall.splice(index,1);
                    curr.classList.remove('active');
                    // this.xsSelectBall = this.currSelectBall;
                     this.xsSelectBall =this.unique(this.currSelectBall);
                    if(!allother.length&&!this.currSelectBall.length){
                         if(this.currId==29||this.currId==9||this.currId==26||this.currId==11||this.currId==27||this.currId==32) this.currSelectBall = [1,2,3,4,5,6,7,8,9,10];
                        else if(this.currId == 8) this.currSelectBall = this.sixBallData;
                        else this.currSelectBall = [0,1,2,3,4,5,6,7,8,9];
                    }
                }else{
                    // console.log(3)
                    curr.classList.add('active');
                    this.currSelectBall.push(v);
                    this.currSelectBallArr.push(v);
                    if(this.currSelectBall.length>10&&!allother.length){
                        this.currSelectBall.splice(0,10);    
                    }
                    this.xsSelectBall =this.unique(this.currSelectBall);
                     
                }
                // console.log(this.currSelectBall)
                 
            },
            //大小单双
            selectLm(e,type,bType){
                // v-show="currId==29||currId==9||currId==26||currId==27"
                let flag = false;
                if(this.currId==29||this.currId==9||this.currId==26||this.currId==27||this.currId==11||this.currId==32) flag = true
                let curr = e.currentTarget;
                let allBall = document.querySelectorAll('.select-ball>span.active');
                if(allBall.length){
                    // this.currSelectBall = [];
                    this.xsSelectBall = this.unique(this.currSelectBall);
                    // removeAllactive(allBall);
                    //  this.currDX = '0';
                    //  this.currDS = '0';
                    //  this.currZH = '0';
                } 
                if(curr.className.includes('active')){
                    curr.classList.remove('active');
                     //数据 1 大小  2 单双  3 质合
                    if(bType==1){
                        this.currDX = '0';
                    }else if(bType==2){
                        this.currDS = '0';
                    }else if(bType==3){
                        this.currZH = '0';
                    }
                }else{
                    curr.classList.add('active');
                    removeAllactive(getSiblings(curr));
                     //数据 1 大小  2 单双  3 质合
                    if(bType==1){
                        this.currDX = type;
                    }else if(bType==2){
                        this.currDS = type;
                    }else if(bType==3){
                        this.currZH = type;
                    }
                }
                // console.log((this.currDX?this.currDX:'0')+(this.currDS?this.currDS:'0')+(this.currZH?this.currZH:'0'))
                let s = !flag?this.selectObj[(this.currDX?this.currDX:'0')+(this.currDS?this.currDS:'0')+(this.currZH?this.currZH:'0')]:this.selectObjSc[(this.currDX?this.currDX:'0')+(this.currDS?this.currDS:'0')+(this.currZH?this.currZH:'0')];
                let ss =  Object.prototype.toString.call(s) === '[object Array]'?s:[];
                console.log('标记的号码',this.currSelectBallArr);
                this.currSelectBall = this.currSelectBallArr.concat(ss);
                console.log('两面的号码',ss);
                console.log('显示颜色的球',this.currSelectBall)              
                if(this.currDX=='0'&&this.currDS=='0'&&this.currZH=='0') this.xsSelectBall = []
                else this.xsSelectBall = this.unique(this.currSelectBall);

            },
            //清空
            clearAll(){
                 if(this.currId==29||this.currId==9||this.currId==26||this.currId==11||this.currId==27||this.currId==32) this.currSelectBall = [1,2,3,4,5,6,7,8,9,10];
                 else if(this.currId == 8) this.currSelectBall = this.sixBallData;
                 else this.currSelectBall = [0,1,2,3,4,5,6,7,8,9];
                this.xsSelectBall = [];
                this.currSelectBallArr = [];
                // console.log(this.currSelectBall)
                let allBall = document.querySelectorAll('.select-ball>span');
                let allother = document.querySelectorAll('.select-other span');
                removeAllactive(allBall);
                removeAllactive(allother);
            },
            doKj(){
                let bigBox =  document.querySelectorAll('.kj-item-list');
                let allActive =  document.querySelectorAll('.kj-item-list span.active');
                //if(this.kjNum.length&&this.selectList2.length) removeAllactive(allActive);
                for(let i=0,len=this.kjNum.length;i<len;i++){
                    for(let j=0,lenj=this.selectList2.length;j<lenj;j++){
                        bigBox[this.kjNum[i]].children[this.selectList2[j]].classList.add('active')
                    }
                }
                let a =  document.querySelectorAll('.kj-item-list span.active');
                // console.log(a);
            },
            TitleScrollX(){
                if(this.playSecList.length<2) return
                if(this.lotteryId==8&&(this.palyUnitName == '特码'||this.palyUnitName == '正码特'||this.palyUnitName == '连肖连尾'||this.palyUnitName == '连码') || this.palyUnitName == '二字和数'){
                    let t = document.querySelectorAll('.tm-title span');
                    let width=0;
                    for(let i=0,len=t.length;i<len;i++){
                        width +=(t[i].offsetWidth+15)
                    }
                    this.$refs.personTitleTab.style.width = width + "px";
                }

            },
            money: function(flag) {
                if (!flag) return;
                if (flag && !this.codeToken) {
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                    });
                } else {
                    // 点击刷新请求该账户余额
                    if (flag && document.querySelector(".shua"))
                        document.querySelector(".shua").classList.add("loading-money");
                      this.amount = "Đang nhận ...";
                      this.$http.get("/api2/index/balance").then(res => {
                        if (flag && document.querySelector(".shua"))
                            document.querySelector(".shua").classList.remove("loading-money");
                        if (res && res.data.code == 1) {
                            //            this.amount = numberComma(res.data.data.balance);
                            this.amount = res.data.data.balance || "0"; //显示出来的
                            // this.defaultAmount = res.data.data.balance || "0"; //用于计算的
                            // this.amount =
                            //   this.amount > 10000
                            //     ? parseInt(this.amount / 1000) + "k"
                            //     : this.amount;
                        }
                    });
                }
            },
            zsQuest() {
                // 获取钻石/api/v1/user/diamond_now/
                if (!this.codeToken || this.userinfo.user_id<0) return;
                this.zsMount = "Đang nhận...";
                this.$http
                    .get(this.versionLive2+"user/diamond_now/?user_id=" + this.userinfo.user_id)
                    .then(res => {
                        if (res && res.data.code == 1) {
                            if (res.data.data.diamond == null) {
                                this.zsMount = 0;
                                this.SETDIAMOND(0)
                            } else {
                                this.zsMount = parseFloat(res.data.data.diamond).toFixed(2);
                                this.SETDIAMOND(res.data.data.diamond);
                            }
                        }
                    }).catch(res=>{
                    this.zsMount = "0.00";
                });
            },
            init(){
                this.getPlayList();
                this.balance();
                this.getHistoryList();
                this.getClData();
                
                this.getGame();
                this.getPlayNum();
                // this.zsQuest(); 
            },
            goback(){
                if(this.lastRoute){
                    this.$router.push('/gameCenter');
                }else {
                    this.$router.go(-1);
                }

            },
            // 开奖
            async getOneNumber(id,flag){
                this.currBall = [];
                this.djsTime = "--:--";
                this.djsTime1 = "--:--";
                this.loadingTime = false;
                let res = await this.$http.post("/open/idx/indexNewOne",{
                    lottery_id:id || this.currId
                })
                if(res.data && res.data.code == 1){
                    this.currBallDel = res.data.data ;
                    this.currId = res.data.data.lottery_id;

                    if (res.data.data.next_lottery_time < 0){
                        this.currBall = [] ;
                    }else{
                        this.currBall = res.data.data.code.split(",") || [];
                         if (flag && this.historyList[0].issue != res.data.data.issue) {
                            this.getHistoryList(this.currId);
                        }
                    }
                    //开奖时间
                    this.timer(res.data.data.next_lottery_time);
                    this.nextEndTime = res.data.data.next_lottery_end_time;
                    this.timer1(res.data.data.next_lottery_end_time);
                    this.betIssue = res.data.data.next_issue;
                }
                this.loadingTime = true;
            },
            //倒计时
            count(time) {
                let t = "";
                let h = "";
                let d = "";
                let min = "";
                let second = "";
                if (time > 60) {
                    second = parseInt(time) % 60;
                    min = parseInt((time / 60) % 60);
                    h = parseInt((parseInt(time / 60) / 60) % 24);
                    d = parseInt(parseInt(time / 60) / 60 / 24);
                    second = second >= 10 ? second : "0" + second;
                    min = min >= 10 ? min : "0" + min;
                    if (!h) h = "";
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
                } else {
                    t = "00:" + (time >= 10 ? time : "0" + time);
                }
                return t;
            },
            timer(t) {
                if (window.timer1) clearInterval(window.timer1);
                window.timer1 = setInterval(() => {
                    this.djsTime = this.count(t--);
                    if (t <= -1) {
                    this.getOneNumber(null, true);
                    this.djsTime = "--:--";
                    }
                }, 1000);
            },
            timer1(t) {
                if (window.timer3) clearInterval(window.timer3);
                window.timer3 = setInterval(() => {
                    this.djsTime1 = this.count(t--);
                    if (t <= -1) {
                    // this.djsTime1 = "--:--";
                    this.djsTime1 = "已封盘";
                    
                    }
                     this.currClData.forEach(item=>{
                        if(item.count_down>0){
                            item.count_down--
                        }else{
                            this.selectList3.forEach((res,index)=>{
                                if(res.play_bet_lottery_id==item.lottery_id&&res.play_bet_issue==item.next_issue&&res.play_sec_name==item.play_sec_name){
                                        this.selectList3.splice(index,1)
                                        this.selectList3.splice(index,1)
                                }
                            })
                        }
                    })

                }, 1000);
            },
            changeTab(index){
                this.tabIndex = index;
            },
            PickerShow(){
              this.pickershow = true;
            },
            PickerShow1(){
              this.pickerCLshow = true;
            },
            pickerconfirm1(){},
            //切换长龙期数
            confirmCL(val){
                this.clValue = val[0].label;
            },
            //切换彩种
            confirmCZ(val){
                this.getOneNumber(val[0].lottery_id);
                this.getPlayList(val[0].lottery_id);
                this.getHistoryList(val[0].lottery_id);
                // this.getClData();
                this.lotteryValue = val[0].label;
                this.secIndex = 0;
                this.DMIndex = -1 ;
                this.clearSelectList();
                this.currId = val[0].lottery_id;
                this.lotteryId = this.currId ;
                // this.$router.push('/betting/'+this.currId);
                this.lastRoute = true;
                this.showZS = false;
                this.currSelectBall = [];
                this.xsSelectBall = [];
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,0)
            },
            //全部彩种
            async getGame() {
                if(this.czListData.length){
                    this.allLottery = this.czListData;
                    let lotteryArr = this.allLottery.filter((item, i) => {
                        return item.lottery_id != 0;
                    });
                    this.fixRoomId();
                    for(let i = 0 ; i < lotteryArr.length;i++){
                        if(lotteryArr[i].cname!=this.lotteryValue){
                            this.lotteryList[0].push({
                                label:lotteryArr[i].cname,
                                lottery_id:lotteryArr[i].lottery_id,
                                logoUrl:lotteryArr[i].logo_url,
                            })
                        }
                    }
                }else{
                    let res = await this.$http.post("/open/idx/sort/");
                    if (res.data && res.data.code == 1) {
                        this.allLottery = res.data.data || [];
                        this.SETCZNDATA(res.data.data || []);
                        let lotteryArr = this.allLottery.filter((item, i) => {
                            return item.lottery_id != 0;
                        });
                        this.fixRoomId();
                        for(let i = 0 ; i < lotteryArr.length;i++){
                            if(lotteryArr[i].cname!=this.lotteryValue){
                                this.lotteryList[0].push({
                                    label:lotteryArr[i].cname,
                                    lottery_id:lotteryArr[i].lottery_id,
                                    logoUrl:lotteryArr[i].logo_url,
                                })
                            }
                        }
                    }    
                }
                
            },
            fixRoomId() {
                let game = this.allLottery;
                for (let j = 0, lenj = game.length; j < lenj; j++) {
                    if (this.lotteryId == game[j].lottery_id) {
                        this.lotteryValue = game[j].cname;
                        this.logoUrl = game[j].logo_url;
                        this.lotteryList[0].push({
                            label:game[j].cname,
                            lottery_id:game[j].lottery_id,
                            logoUrl:game[j].logo_url,
                        })
                    }
                    }
            },
            //关于键盘
            inputBlur(e) {
                // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
                if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
                    // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
                    this.timer_2 = setTimeout(() => {
                        window.scrollTo(0,0);
                    }, 0)
                }
            },
            inputFocus(e) {
                // 如果focus，则移除上一个输入框的timer
                if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
                    clearTimeout(this.timer_2);
                }
            },
            ChipsScrollX(){
                let Width = this.chipsNum.length * 1.5;
                this.$refs.chipsTab.style.width = Width + "rem";
            },
            //余额
            zsQuest() {
                // 获取钻石/api/v1/user/diamond_now/
                if (!this.$store.state.codeToken||this.userinfo.user_id<0) return;
                this.zsMount = "Đang nhận...";
                this.$http
                    .get(this.versionLive2+"user/diamond_now/?user_id=" +this.$store.state.userinfo.user_id)
                    .then(res => {
                    if (res && res.data.code == 1) {
                        if (res.data.data.diamond == null) {
                        this.zsMount = 0;
                        } else {
                        this.zsMount = parseFloat(res.data.data.diamond).toFixed(2);
                        }
                    }
                    });
            },
            balance(){
                if(!this.isTz) return
                this.amount = "Đang nhận...";
                this.$http.get("/api2/index/balance").then(res => {
                    if (res && res.data.code == 1) {
                        //this.amount = res.data.data.balance || "0"; //显示出来的
                        if (res.data.data.balance == null) {
                            this.amount = 0;
                        } else {
                            this.amount = parseFloat(res.data.data.balance).toFixed(2);
                        }
                    }
                });
            },
            //关于下注
              //余额竞猜
            submitBetOver(){
               if(!this.$store.state.codeToken){
                        this.$popup({
                            title: "我是标题",
                            content: "用户信息已过期，请重新登录",
                            btnText: "我是按钮",
                            click: () => {
                                this.isLogin = false;
                            }
                            });
                            return false;
                }
               //组合玩法
                if(this.isCombo&&this.lotteryId!=8&&this.lotteryId!=5&&this.lotteryId!=14){
                    let all = document.querySelectorAll('.isCombo>.active');
                    if(!this.chipsJE) {
                        this.$vux.toast.text('未选择投注金额，请选择后再提交', 'middle');
                    }else if(this.chipsJE < 1){
                        this.$vux.toast.text('请输入≥1的整数', 'middle');
                    }else if(this.chipsJE > 999999999){
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                    }else if(this.selectDiamond > this.amount){
                        this.$vux.confirm.show({
                            content:'您的余额不足，请充值',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                            },
                            onConfirm : () => {
                                // this.$router.push("/member");
                                this.$router.push("/withdrawalTopUp/1");
                            }
                        });
                    }else if(this.nextEndTime <= 0 ){
                        this.$vux.confirm.show({
                            content:'当前期已封盘或已开奖，请购买下一期',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                                this.clearSelectList();
                            },
                            onConfirm : () => {
                                this.clearSelectList();
                            }
                        });
                    }else if(this.comboType == '二中二'){
                        if(all.length != 2){
                            this.$vux.toast.text('二中二需要选2个号码', 'middle');
                        }else{
                            this.selectList3 = [
                                    {
                                        play_sec_name:all[0].dataset.sec,
                                        play_sec_cname:this.secName,
                                        play_class_name:all[0].dataset.wf+','+all[1].dataset.wf,
                                        play_class_cname:all[0].dataset.name+','+all[1].dataset.name,
                                        play_odds:all[0].dataset.odds,
                                        play_bet_sum:this.chipsJE
                                    }
                                ];
                                this.isMess = true;
                        }
                    }else if(this.comboType == '三中三'){
                        if(all.length != 3){
                            this.$vux.toast.text('三中三需要选3个号码', 'middle');
                        }else{
                            this.selectList3 = [
                                    {
                                        play_sec_name:all[0].dataset.sec,
                                        play_sec_cname:this.secName,
                                        play_class_name:all[0].dataset.wf+','+all[1].dataset.wf+','+all[2].dataset.wf,
                                        play_class_cname:all[0].dataset.name+','+all[1].dataset.name+','+all[2].dataset.name,
                                        play_odds:all[0].dataset.odds,
                                        play_bet_sum:this.chipsJE
                                    }
                                ];
                                this.isMess = true;
                        }
                    }

                }else{
                    if(this.palyUnitName == '快捷'){
                        if(this.kjNum.length && this.selectList2.length){
                            this.sxData();
                        }else{
                            this.$vux.toast.text('未选择任何玩法或投注金额，请选择后再提交', 'middle');
                            return ;
                        }
                    }
                    if(this.selectList3 == [] || this.selectList3.length == 0 || !this.chipsJE){
                        this.$vux.toast.text('未选择任何玩法或投注金额，请选择后再提交', 'middle');
                    }else if(this.chipsJE < 1){
                        this.$vux.toast.text('请输入≥1 的整数', 'middle');
                    }else if(this.chipsJE > 999999999){
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                    }else if(this.selectDiamond > this.amount){
                        this.$vux.confirm.show({
                            content:'您的余额不足，请充值',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                            },
                            onConfirm : () => {
                                // this.$router.push("/member");
                                this.$router.push("/withdrawalTopUp/1");
                            }
                        });
                    }else if(this.nextEndTime <= 0 ){
                        this.$vux.confirm.show({
                            content:'当前期已封盘或已开奖，请购买下一期',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                                this.clearSelectList();
                            },
                            onConfirm : () => {
                                this.clearSelectList();
                            }
                        });
                    }else{
                        this.isMess = true;
                    }
                }
                    var totalNum = 0;
                        for(let i = 0, len = this.selectList3.length; i < len; i++) {
                            totalNum  +=  parseInt(this.selectList3[i].play_bet_sum-0)
                        }
                        this.totalNum = totalNum;
                        this.playList.selectList3 = this.selectList3;
            },
            sxData(){
                let arr = [];
                let arrList = [];
                let d = this.playSecList;
                let k = this.kjNum;
                let s = this.selectList2;
                for(let i=0,len=d.length;i<len;i++){
                    for(let j=0,lenj=k.length;j<lenj;j++){
                        if(k[j]==d[i].play_sec_cname){
                            arr.push(d[i])
                        }
                    }
                }
                for(let i=0,len=s.length;i<len;i++){
                    for(let j=0,lenj=arr.length;j<lenj;j++){
                        for(let l=0,lenl=arr[j]['play_sec_data'].length;l<lenl;l++){
                            if(s[i]==arr[j]['play_sec_data'][l].play_class_cname){
                                arrList.push({
                                    play_sec_cname:arr[j]['play_sec_cname'],
                                    play_sec_name:arr[j]['play_sec_data'][l].play_sec_name,
                                    play_class_id:arr[j]['play_sec_data'][l].play_class_id,
                                    play_class_name:arr[j]['play_sec_data'][l].play_class_name,
                                    play_class_cname:arr[j]['play_sec_data'][l].play_class_cname,
                                    play_odds:arr[j]['play_sec_data'][l].play_odds,
                                    play_bet_sum:this.chipsJE
                                })
                            }
                        }
                    }
                }
                this.selectList3 = arrList;
            },
            //钻石竞猜
            submitBet(){
                if(!this.$store.state.codeToken){
                        this.$popup({
                            title: "我是标题",
                            content: "用户信息已过期，请重新登录",
                            btnText: "我是按钮",
                            click: () => {
                                this.isLogin = false;
                            }
                            });
                            return false;
                }
                if(this.$store.state.userinfo.user_id<0){
                    //  this.$vux.confirm.show({
                    //     title:'提示',
                    //     content:'<p style="font-size: 14px;padding-bottom: .2rem;padding-top: .2rem;color: #445779;font-weight: 500">当前账号为游客试玩账号</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">不可以执行此操作</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">请Đăng ký正式账号</p>',
                    //     confirmText:"Xác nhận",
                    //     showCancelButton:false,
                    //     onConfirm : () => {
                        
                    //     }
                    // });
                     this.$swBox({
                            title: "提示",
                            content: "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức。",
                            leftBtn: "登录",
                            rightBtn:'Đăng ký',
                            clickL: () => {
                                this.SETUSERTOKEN('')
                                this.$router.push('/login');
                            },
                            clickR: () => {
                                this.SETUSERTOKEN('')
                                if(this.noticeType==1){
                                    this.$router.push('/register');
                                    
                                }else{
                                    this.$router.push('/RegisterDl');
                                    
                                }
                            }
                        });
                    return
                    
                }
                if(this.isCombo&&this.lotteryId!=8&&this.lotteryId!=5&&this.lotteryId!=14){
                    // console.log(this.chipsJE)
                    let all = document.querySelectorAll('.isCombo>.active');
                    // console.log(all)
                    if(!this.chipsJE) {
                        this.$vux.toast.text('未选择投注金额，请选择后再提交', 'middle');
                    }else if(this.chipsJE < 10){
                        this.$vux.toast.text('请输入≥10的整数', 'middle');
                        // console.log(">10")
                    }else if(this.chipsJE > 999999999){
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                    }else if(this.selectDiamond > this.zsMount){
                        this.$vux.confirm.show({
                            content:'您的钻石不足，请兑换钻石',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                            },
                            onConfirm : () => {
                                this.$router.push("/member");
                            }
                        });
                    }else if(this.nextEndTime <= 0 ){
                        this.$vux.confirm.show({
                            content:'当前期已封盘或已开奖，请购买下一期',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                                this.clearSelectList();
                            },
                            onConfirm : () => {
                                this.clearSelectList();
                            }
                        });
                    }else if(this.comboType == '二中二'){
                        if(all.length != 2){
                            this.$vux.toast.text('二中二需要选2个号码', 'middle');
                        }else{
                            this.selectList3 = [
                                {
                                    play_sec_name:all[0].dataset.sec,
                                    play_sec_cname:this.secName,
                                    play_class_name:all[0].dataset.wf+','+all[1].dataset.wf,
                                    play_class_cname:all[0].dataset.name+','+all[1].dataset.name,
                                    play_odds:all[0].dataset.odds,
                                    play_bet_sum:this.chipsJE
                                }
                            ];
                            this.isMess = true;
                        }
                    }else if(this.comboType == '三中三'){
                        if(all.length != 3){
                            this.$vux.toast.text('三中三需要选3个号码', 'middle');
                        }else{
                            this.selectList3 = [
                                {
                                    play_sec_name:all[0].dataset.sec,
                                    play_sec_cname:this.secName,
                                    play_class_name:all[0].dataset.wf+','+all[1].dataset.wf+','+all[2].dataset.wf,
                                    play_class_cname:all[0].dataset.name+','+all[1].dataset.name+','+all[2].dataset.name,
                                    play_odds:all[0].dataset.odds,
                                    play_bet_sum:this.chipsJE
                                }
                            ];
                            this.isMess = true;
                        }
                    }
                }else{

                    if(this.palyUnitName == '快捷'){
                        if(this.kjNum.length && this.selectList2.length){
                            this.sxData();
                        }else{
                            this.$vux.toast.text('未选择任何玩法或投注金额，请选择后再提交', 'middle');
                            return ;
                        }
                    }

            
                    if(this.selectList3 == [] || this.selectList3.length == 0 || !this.chipsJE){
                        this.$vux.toast.text('未选择任何玩法或投注金额，请选择后再提交', 'middle');
                    }else if(this.chipsJE < 10){
                        this.$vux.toast.text('请输入≥10 的整数', 'middle');

                    }else if(this.chipsJE > 999999999){
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                    }
                    else if(this.selectDiamond > this.zsMount){
                        this.$vux.confirm.show({
                            content:'您的钻石不足，请兑换钻石',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                            },
                            onConfirm : () => {
                                this.$router.push("/member");
                            }
                        });
                    } else if(this.nextEndTime <= 0 ){
                        this.$vux.confirm.show({
                            content:'当前期已封盘或已开奖，请购买下一期',
                            confirmText:"Xác nhận",
                            onCancel : () => {
                                this.clearSelectList();
                            },
                            onConfirm : () => {
                                this.clearSelectList();
                            }
                        });
                    }else{
                        this.isMess = true;
                    }
                }
                var totalNum = 0;
                for(let i = 0, len = this.selectList3.length; i < len; i++) {
                    totalNum  +=  parseInt(this.selectList3[i].play_bet_sum)
                }
                this.totalNum = totalNum;
                this.playList.selectList3 = this.selectList3;
                // this.isMess = true;
            },
            clearActive(){
                let all = document.querySelectorAll('.wf-item .active');
                let allKjTitle = document.querySelectorAll('.kj-title .active');
                removeAllactive(document.querySelectorAll('.long-betting .xz-btn.active'));
                for(let i=0,len=all.length;i<len;i++){
                    all[i].classList.remove('active');
                }
                if(this.palyUnitName=='快捷'){
                    for(let i=0,len=allKjTitle.length;i<len;i++){
                        allKjTitle[i].classList.remove('active');
                    }
                }

            },
            clearSelectList(){
                this.chouma = false;//筹码盒子
                this.selectList3 = [];
                this.selectListTs = [];
                this.selectList2 = [];
                this.kjNum = [];
                this.clearActive();
                this.isMess = false;//确认投注单
                this.chipsIndex = 0;//筹码索引
                this.chipsJE =  1 ;//金额
                this.selectNum = 0 ;//数量
                this.selectArr = [];
                this.selectNameArr = [];
                // this.DMIndex = -1 ;
                // this.wfIndex = 0;
                
            },
            Confirmbet(id){
                let limit= 1;
                    for(let i = 0, len = this.selectList3.length; i < len; i++) {
                    if(this.selectList3[i].play_bet_sum == ''){
                        this.$vux.toast.text('未填写投注金额，请填写后再提交', 'middle');
                        return false;
                    }else if(this.selectList3[i].play_bet_sum < limit){
                        this.$vux.toast.text('请输入≥1 的整数', 'middle');
                        return false;
                    }else if(this.selectList3[i].play_bet_sum >= 999999999){
                        this.$vux.toast.text('请输入小于999999999的整数', 'middle');
                        return false;
                    }
                }
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "用户信息已过期，请重新登录",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });

                } else{
                    this.$vux.loading.show({text: "投注中"});
                    let obj = {orders:JSON.stringify(this.selectList3)};
                    if(this.palyUnitName == '长龙'){
                          this.$http.post("/forum/guess/dragon-play",{datas:this.encrypt(obj)
                         },{timeout:60000}).then(res=>{
                        this.$vux.loading.hide();
                        //下注成功
                        if(res.data.code==1){
                            //更新余额
                            this.balance();
                            this.$vux.confirm.show({
                                content:'投注成功',
                                confirmText:'Xác nhận',
                                showCancelButton:false,
                                onConfirm : () => {
                                    this.isMess = false;
                                    this.clearSelectList();
                                    //去分享
                                }
                            });
                        }else if(res.data.code==1012){
                            this.$vux.confirm.show({
                                content:'您的余额不足，请充值',
                                confirmText:"Xác nhận",
                                onCancel : () => {
                                },
                                onConfirm : () => {
                                    // this.$router.push("/member");
                                    this.$router.push("/withdrawalTopUp/1");
                                }
                            });
                        }else if(res.data.code==16){
                            this.$vux.confirm.show({
                                content:'当前期已封盘或已开奖，请购买下一期',
                                confirmText:"Xác nhận",
                                onCancel : () => {
                                    this.clearSelectList();
                                },
                                onConfirm : () => {
                                    this.clearSelectList();
                                }
                            });
                        }else{
                            this.$vux.toast.text(res.data.msg, 'middle')
                        }


                    })
               

                    }else{
                        let issue = '';
                    if(this.isCombo || this.currId==5||this.currId==14) {
                        issue = this.betIssue;
                    }else{
                        issue = this.selectList2.length?this.betIssue:this.followOrders.play_bet_issue;
                    }
                    let dataObj ={};
                    // let order = "";
                    // if(this.lotteryId==8&&(this.palyUnitName =='连码'||this.palyUnitName =='连肖连尾'||this.palyUnitName =='自选不中'||this.palyUnitName =='合肖')){
                    //     order = JSON.stringify(this.selectListTs)
                    // }else{
                    //     order = JSON.stringify(this.selectList3)
                    // }
                    let order = JSON.stringify(this.selectList3)
                    // if(this.quizTypeId == 0){ //钻石投注
                    //     dataObj = {
                    //         play_bet_lottery_id:this.currId,
                    //         play_bet_issue:issue,
                    //         order_detail:order,
                    //         play_bet_follow_user: 0,
                    //         is_bl_play:this.quizTypeId
                    //     }

                    // }else{ //余额投注
                    //     dataObj = {
                    //         play_bet_lottery_id:this.currId,
                    //         play_bet_issue:issue,
                    //         order_detail:order,
                    //         play_bet_follow_user: 0,
                    //         is_bl_play:this.quizTypeId  //为1
                    //     }

                    // }
                    dataObj = {
                            play_bet_lottery_id:this.currId,
                            play_bet_issue:issue,
                            order_detail:order,
                            play_bet_follow_user: 0,
                            is_bl_play:1  //为1
                        }
                    // console.log(dataObj);
                    if(this.isBetting) return
                    this.isBetting = true;
                    this.$http.post("/forum/guess/play_bet",{datas:this.encrypt(dataObj)
                    },{timeout:60000}).then(res=>{
                        this.isBetting = false;
                        this.$vux.loading.hide();
                        //下注成功
                        //console.log(res);
                        if(res.data.code==1){
                            this.SETGAMEDATA([]);
                            //更新钻石
                            // this.zsQuest();
                            //更新余额
                            this.balance();
                            this.$vux.confirm.show({
                                content:'投注成功',
                                confirmText:'Xác nhận',
                                showCancelButton:false,
                                onConfirm : () => {
                                    this.isMess = false;
                                    this.clearSelectList();
                                    //去分享
                                }
                            });
                        }else if(res.data.code==1012){
                            // if(this.quizTypeId  == 0){
                            //     this.$vux.confirm.show({
                            //         content:'您的钻石不足，请兑换钻石',
                            //         confirmText:"Xác nhận",
                            //         onCancel : () => {
                            //         },
                            //         onConfirm : () => {
                            //             this.$router.push("/member");
                            //         }
                            //     });
                            // }else{
                                
                            // }
                            this.$vux.confirm.show({
                                    content:res.data.msg,
                                    confirmText:"Xác nhận",
                                    onCancel : () => {
                                    },
                                    onConfirm : () => {
                                        // this.$router.push("/member");
                                        this.$router.push("/withdrawalTopUp/1");
                                    }
                                });

                        }else if(res.data.code==16){
                            this.$vux.confirm.show({
                                content:'当前期已封盘或已开奖，请购买下一期',
                                confirmText:"Xác nhận",
                                onCancel : () => {
                                    this.clearSelectList();
                                },
                                onConfirm : () => {
                                    this.clearSelectList();
                                }
                            });
                        }else{
                            this.$vux.toast.text(res.data.msg, 'middle')
                        }


                    }).catch(error=>{
                        this.isBetting = false;
                    })
               
                    }
                    
               }
            },
            chipsChange(index,num){
                this.chipsIndex = index;
                this.chipsJE =  num ;
                this.selectDiamond = this.chipsJE * this.selectNum;
                this.selectList3.forEach((value , index) => {
                    value['play_bet_sum'] = this.chipsJE;
                })
            },
            quizType(index){
                //console.log(index);
                this.quizTypeId= index;
                // this.GETISYUE(this.quizTypeId);

            },
            //快选金额
            getPlayNum(){
                if(this.moneyData.length){
                    this.chipsNum = this.moneyData;
                }else{
                    this.$http.get('/forum/guess/play_sum_list').then(res=>{
                        if(res && res.data.code == 1){
                        this.chipsNum = res.data.data;
                        this.SETMONEYNDATA(res.data.data ||[])
                        }
                    })
                }
                
            },
            //玩法列表
            getPlayList(id){
                this.$vux.loading.show({ text: "Đang nhận..." });
                this.playSecList = [];
                this.playClassList = [];
                this.palyUnit = [];
                this.$http.get("/forum/guess/play_list",{
                params:{
                    lottery_id:id || this.lotteryId,
                    client_type:4
                }
                }).then(res=>{
                    this.$vux.loading.hide();
                if(res && res.data.code==1){
                    this.palyUnit = res.data.data;
                    this.playSecList = res.data.data[0].play_unit_data;
                    this.playClassList = res.data.data[0].play_unit_data;
                    this.secName = res.data.data[0].play_unit_data[0].play_sec_cname;
                    this.palyUnit.unshift({play_unit_name:'长龙'});
                    this.palyUnitName = res.data.data[0].play_unit_name;
                    this.playList.palyUnit = this.palyUnit;
                    this.playList.playSecList = this.playSecList;
                    this.playList.playClassList = this.playClassList;
                    this.playList.secName = this.secName;
                    this.playList.palyUnitName = this.palyUnitName;
                    this.secIndex=res.data.data[0].play_unit_id

                }else{
                    this.$vux.toast.text(res.data.msg, 'middle')
                }
                }).catch(error=>{
                    this.$vux.loading.hide();
                })
            },
            //投注区,左侧玩法切换玩法切换
            changeWfTab(index,name,v){
                if(name == "长龙"){
                    this.palyUnitName = name;
                    this.secIndex = v.play_unit_id;
                     this.clearSelectList();
                    setTimeout(() => {
                        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                    }, 20);
                }else{
                    this.secIndex = v.play_unit_id;
                    this.currTmItem = 0;
                    this.palyUnitName = name;
                    this.wfIndex = 0;
                    this.playSecList = this.palyUnit[index].play_unit_data;
                    this.playClassList2 = this.palyUnit[index].play_unit_data[0].play_sec_data;  //二字和数
                    this.playClassList = this.palyUnit[index].play_unit_data;
                    // this.secName = this.playSecList[0].play_sec_cname;
                    this.secName = v.play_unit_data[0].play_sec_cname;
                    this.isCombo = v.play_unit_data[0].play_sec_combo;  //一般玩法
                    this.currTabNav =v.play_unit_data[0].play_sec_cname;
                    this.comboType = this.palyUnit[index].play_unit_data[0].play_sec_cname;
                    //console.log(this.playSecList);
                    //console.log(444,this.playClassList2);
                    this.clearSelectList();
                    this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
                    if(this.$refs.personTitleTab) {
                        this.$refs.personTitleTab.style.transform =  'translateX(0px)';
                    }
                }
                                    // console.log(this.palyUnit.length)
            },
            //投注区,右侧小标题玩法切换
            changeWf(index,v){
              //console.log(v);
              this.wfIndex = index;
               this.comboType = v.play_sec_cname;
                console.log(222,this.comboType);
                // this.playClassList = v.play_sec_data;
               this.isCombo = v.play_sec_combo;
               this.secName = v.play_sec_cname;

            },
            //投注区,右侧小标题玩法切换
            changeWfKJ(e,index,v){
                let i;
                let curr = e.currentTarget;
                i = this.kjNum.findIndex((res) => res ==v.play_sec_cname);
                if(curr.className.includes('active')){
                    curr.classList.remove('active');
                    this.kjNum.splice(i,1);
                }else{
                    curr.classList.add('active');
                    this.kjNum.push(v.play_sec_cname)
                }
                this.wfIndex = index;
                this.comboType = v.play_sec_cname;
                console.log(333,this.comboType);
                this.isCombo = v.play_sec_combo;
               this.secName = v.play_sec_cname;

            },
            //正常玩法
            selectClick(e,v,name,vBig){
                // if(this.$store.state.isPure==1){
                //     this.quizTypeId = 1;
                // }else{
                //     if(this.quizTypeId != this.isYue ){
                //         this.quizTypeId = this.isYue;
                //     }
                // }
                let curr = e.currentTarget;
                let index;
                if(this.palyUnitName == '连码'||this.palyUnitName == '自选不中'||this.palyUnitName == '连肖连尾'||this.palyUnitName == '合肖'||this.palyUnitName == '组选三'||this.palyUnitName == '组选六'){
                    let maxL;
                    let minL;
                    let orders_temp;
                    let orders_temp_name;
                    // let num = 0;
                    if(vBig){
                        maxL = vBig.play_sec_max;
                        minL = vBig.play_sec_min;
                    }
                    index = this.selectArr.findIndex((res) => res == v.play_class_name);
                    if(curr.className.indexOf('active')>-1){
                        curr.classList.remove('active');
                        this.selectList2.splice(index,1);
                        this.selectList3.splice(index,1);
                        this.selectArr.splice(index,1);
                        this.selectNameArr.splice(index,1);
                    }else{
                        if(vBig&&vBig.play_sec_combo==1&&this.selectNameArr.length>=maxL){
                            this.$vux.toast.text('最多选择'+maxL+'个号码', 'middle');
                            return;
                        }
                        curr.classList.add('active');
                        this.selectList2.push(e);//控制选中样式
                        this.selectArr.push(v.play_class_name);
                        this.selectNameArr.push(v.play_class_cname);
                    }
                    console.log(this.selectArr);
                    if(this.palyUnitName == '自选不中'||this.palyUnitName == '合肖'||this.palyUnitName == '组选三'||this.palyUnitName == '组选六'){
                        if(this.selectArr.length>=minL){
                            let arr= [
                                {
                                    play_sec_cname:(this.palyUnitName == '组选三'||this.palyUnitName == '组选六')?this.palyUnitName+' '+this.selectArr.length:this.palyUnitName,
                                    play_sec_name:vBig.play_sec_options[0].play_sec_name,
                                    play_class_name:this.selectArr.join(','),
                                    play_class_cname:this.selectNameArr.join(','),
                                    // play_odds:vBig.play_sec_options[0].play_odds,
                                    play_odds:this.playSecList[0].play_sec_options[this.selectArr.length-minL].play_odds,
                                    play_bet_sum:this.chipsJE
                                }
                            ]
                            this.selectList3=arr;
                            this.chouma = true;
                            this.selectNum =1;
                        } else{
                            this.chouma = false;
                            this.selectNum =0;
                            this.selectList3 =[];
                        }
                    }else{
                        //组合玩法的组数
                        orders_temp = getRank(this.selectArr,minL);
                        orders_temp_name = getRank(this.selectNameArr,minL);
                        // this.selectNum = orders_temp.length;
                        if(orders_temp_name.length){
                            let a = [];
                            let a2 = [];
                            for(let i=0,len=orders_temp_name.length;i<len;i++){
                                a.push({
                                    play_sec_cname:this.palyUnitName == '连肖连尾'?vBig.play_sec_cname:vBig.play_sec_options[0].play_class_cname,
                                    // play_sec_name:this.palyUnitName == '连肖连尾'?v.play_sec_name:vBig.play_sec_options[0].play_sec_name,
                                    play_sec_name:this.palyUnitName == '连肖连尾'?vBig.play_sec_merge_name:vBig.play_sec_options[0].play_sec_name,
                                    play_class_name:orders_temp[i],
                                    play_class_cname:orders_temp_name[i],
                                    play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
                                    play_bet_sum:this.chipsJE
                                });
                                a2.push({
                                    play_sec_name:this.palyUnitName == '连肖连尾'?vBig.play_sec_merge_name:vBig.play_sec_options[0].play_sec_name,
                                    play_class_name:orders_temp[i],
                                    play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
                                    play_bet_sum:this.chipsJE
                                });
                            }
                            // a2.push({
                            //     play_sec_name:this.palyUnitName == '连肖连尾'?vBig.play_sec_merge_name:vBig.play_sec_options[0].play_sec_name,
                            //     play_class_name:this.selectArr.join(','),
                            //     play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
                            //     play_bet_sum:this.chipsJE
                            // });
                            this.selectList3 = a;
                            this.selectListTs = a2;
                            console.log(this.selectListTs);
                            this.chouma = true;
                        }else{
                            this.chouma = false;
                        }
                        console.log(orders_temp);
                        this.selectNum = orders_temp_name.length;
                    }

                    this.playList.selectList3 = this.selectList3;//控制显示的数据
                    this.selectDiamond = this.chipsJE * this.selectNum;

                }else if(this.palyUnitName == '二字定位'||this.palyUnitName == '三字定位'){
                    if(curr.className.includes('active')){
                        curr.classList.remove('active');                                 
                        }else{
                            curr.classList.add('active');
                    }
                    this.doData(name,v.play_sec_name);
                        
                }else{
                    if(this.palyUnitName=='快捷'){
                        index = this.selectList2.findIndex((res) => res == v.play_class_cname);
                        if(curr.className.indexOf('active')>-1){
                            curr.classList.remove('active');
                            this.selectList2.splice(index,1);
                        }else {
                            curr.classList.add('active');
                            this.selectList2.push(v.play_class_cname);
                        }
                        if(!this.selectList2.length){
                            this.kjNum = [];
                            let allKjTitle = document.querySelectorAll('.kj-title .active');
                            for(let i=0,len=allKjTitle.length;i<len;i++){
                                allKjTitle[i].classList.remove('active');
                            }
                        }
                        if(this.selectList2.length&&this.kjNum.length) this.chouma = true;
                        else this.chouma = false;
                        this.selectNum = this.selectList2.length *this.kjNum.length;
                        this.selectDiamond = this.chipsJE * this.selectNum;
                    }else{
                        index = this.selectList3.findIndex((res) => res.play_class_id == v.play_class_id);
                        if(curr.className.indexOf('active')>-1){
                            curr.classList.remove('active');
                            this.selectList2.splice(index,1);
                            this.selectList3.splice(index,1);
                        }else{
                            curr.classList.add('active');
                            this.selectList2.push(e);
                            this.selectList3.push({
                                    play_sec_cname:name || this.secName,
                                    play_sec_name:v.play_sec_name,
                                    play_class_id:v.play_class_id,
                                    play_class_name:v.play_class_name,
                                    play_class_cname:v.play_class_cname,
                                    play_odds:v.play_odds,
                                    play_bet_sum:this.chipsJE
                                }
                            );
                        }
                        if(this.selectList2.length) this.chouma = true;
                        else this.chouma = false;
                        this.selectNum = this.selectList3.length;
                        this.playList.selectList3 = this.selectList3;//控制显示的数据
                        this.selectDiamond = this.chipsJE * this.selectNum;
                    }
                }
            },
             doData(name,name2){
                console.log(this.playSecList[this.wfIndex])
                let one = document.querySelectorAll('.lott1 span.active');
                let two = document.querySelectorAll('.lott2 span.active');
                let three;
                if(this.palyUnitName == '三字定位'){
                    three = document.querySelectorAll('.lott3 span.active');
                }
                let arr = [];
                if(this.palyUnitName == '二字定位'&&one.length&&two.length){
                    for(let i=0,len=one.length;i<len;i++){
                        for(let j=0,lenj=two.length;j<lenj;j++){
                            let s = ''
                            s = one[i].dataset.pcname+','+two[j].dataset.pcname;
                            arr.push({
                                play_sec_cname:name,
                                play_sec_name:name2,
                                play_class_name:s,
                                play_class_cname:s,
                                play_odds:this.playSecList[this.wfIndex].play_sec_options[0].play_odds,
                                play_bet_sum:this.chipsJE
                            })
                        }
                    }

                    console.log(arr)
                }else if(this.palyUnitName == '三字定位'){
                    console.log('44444')
                    if(one.length&&two.length&&three.length){
                        for(let i=0,len=one.length;i<len;i++){
                            for(let j=0,lenj=two.length;j<lenj;j++){
                                for(let l=0,lenl=three.length;l<lenl;l++){
                                let s = ''
                                s = one[i].dataset.pcname+','+two[j].dataset.pcname+','+three[l].dataset.pcname;
                                arr.push({
                                        play_sec_cname:this.playSecList[this.wfIndex].play_sec_cname,
                                        play_sec_name:this.playSecList[this.wfIndex].play_sec_merge_name,
                                        play_class_name:s,
                                        play_class_cname:s,
                                        play_odds:this.playSecList[this.wfIndex].play_sec_options[0].play_odds,
                                        play_bet_sum:this.chipsJE
                                })
                                }
                                
                            }
                        }
                    
                    }


                }
                this.selectList3 = arr;
                if(this.selectList3.length){
                    this.chouma = true;
                    // if(this.quizTypeId != this.isYue ){
                    //     this.quizTypeId = this.isYue;
                    // }
                    this.playList.selectList3 = this.selectList3;
                    this.selectNum = this.selectList3.length;
                    this.selectDiamond = this.chipsJE * this.selectNum;
                }else{
                    this.chouma = false;
                }
                
            },
            // 单码玩法
            selectClickDM(e,v){
                this.selectList3 = [];
                this.selectList2 = [];
                this.DMIndex = e;
                this.selectList2.push(e);
                this.selectList3.push({
                            play_sec_cname:name || this.secName,
                            play_sec_name:v.play_sec_name,
                            play_class_id:v.play_class_id,
                            play_class_name:v.play_class_name,
                            play_class_cname:v.play_class_cname,
                            play_odds:v.play_odds,
                            play_bet_sum:this.chipsJE
                        }
                    );
                this.selectNum = 1;
                this.chouma = true;
                this.selectDiamond = this.chipsJE * this.selectNum;
                //console.log(this.selectList3);
            },
            //组合玩法选择
            selectClickCombo(e,v){
                let curr = e.currentTarget;
                let sum = 0;
                let maxSum = 0; //最多选几个
                let maxTip = "";//超过提示
                console.log(this.comboType);
                if(this.comboType == '二中二'){
                    maxSum = 2;
                    maxTip = "二中二最多选2个号码";
                }else{
                    maxSum = 3;
                    maxTip = "三中三最多选3个号码";
                }
                if(curr.className.indexOf('active')>-1){
                    curr.classList.remove('active');
                    sum = document.querySelectorAll('.isCombo .active').length;
                    if(sum<maxSum){
                        this.chouma = false;
                        this.selectNum = 0;
                        this.selectDiamond = this.chipsJE * this.selectNum;
                    }
                }else{
                    curr.classList.add('active')
                    sum = document.querySelectorAll('.isCombo .active').length;
                    if(sum==maxSum){
                        this.chouma = true;
                        this.selectNum = 1;
                        this.selectDiamond = this.chipsJE * this.selectNum;
                    }else if(sum>maxSum){
                        this.$vux.toast.text(maxTip, 'middle');
                        /*this.$message({
                            type: "warning",
                            message: maxTip,
                            center: true,
                            offset: 225
                        });*/
                        // this.$myConfirm.myPrompt({
                        //     type:'',
                        //     msg: maxTip,
                        //     closeIsShow:false,
                        //     btn:{
                        //         cancelText:'',
                        //         cancelClass:'',
                        //         confirmText:'',
                        //         confirmClass:''
                        //     }
                        // })

                        curr.classList.remove('active');
                    }else{
                        curr.classList.add('active');
                        this.chouma = false;
                        this.selectNum = 0;
                        this.selectDiamond = this.chipsJE * this.selectNum;
                    }
                }
                
            },
                //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            //删除
            deleteItem(e){
                // if(this.palyUnitName == '连码'||this.palyUnitName == '自选不中'||this.palyUnitName == '连肖连尾'||this.palyUnitName == '合肖'){
                //     this.$vux.toast.text('组合玩法不能删除')
                //     return
                // }
                let index = e.currentTarget.dataset.index;
                // console.log(index);
                // 复位
                this.restSlide();
                this.selectList3.splice(index,1);
                if(this.selectList3.length == '' || this.selectList3.length == 0 ){
                    this.isMess = false;
                    this.clearSelectList();
                }
            },
            touchstart(e){
                // if(this.palyUnitName == '连码'||this.palyUnitName == '自选不中'||this.palyUnitName == '连肖连尾'||this.palyUnitName == '合肖') return
                this.startX = e.touches[0].clientX;
            },
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 50 ){
                    this.restSlide();
                    parentElement.dataset.type = 1;
                    // console.log('左滑')
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -50 ){
                    this.restSlide();
                    parentElement.dataset.type = 0;
                    // console.log('右滑')
                }
                this.startX = 0;
                this.endX = 0;
            },
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .more-result-mask{
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 100%;
        position: fixed;
        max-width: 750px;
        left: 0;
        top:3.6rem;
        z-index: 999;
        &.t4{
            top: 4.15rem;
        }
    }
    .more-result-container{
       .control-container{
           border-top: 1px solid #BFBFBF;
           padding: .3rem;
           color: #666;
           .rem(font-size,24);
           .clear-btn{
               background: #51A6FF;
               color: #fff;
               border-radius: .1rem;
               .rem(height,50);
               .rem(line-height,50);
               .rem(width,90);
               text-align: center;
           }
           .select-ball{
               padding: .25rem 0;
               >span{
                   color: #666;
                   .rem(font-size,28);
                   .rem(width,60);
                   .rem(height,60);
                   .rem(line-height,60);
                   text-align: center;
                   display: inline-block;
                   font-family: number1;
                    border: 1px solid #BFBFBF;
                    font-weight: 500;
                    border-radius: 50%;
                    .rem(margin-left,5);
                   &.active{
                    color: #1486FF;   
                    background: #E1F0FF;
                    font-weight: bold;
                    border:1px solid #1486FF;
                   }
               }
           }
           .select-other{
               overflow: hidden;
           .select-item{
               float: left;
               margin-right:.4rem;
               padding: .35rem 0 .25rem 0;
               >span{
                   display: inline-block;
                    border: 1px solid #BFBFBF;
                    color: #666;
                   .rem(font-size,24);
                   .rem(width,90);
                   .rem(height,60);
                   .rem(line-height,60);
                   .rem(border-radius,4);
                   margin-right: .1rem;
                   text-align: center;
                   &.active{
                       color: #1486FF;
                        background: #E1F0FF;
                        font-weight: bold;
                        border: 1px solid #1486FF;
                   }
               }
           }
       }
       }
       .result-content{
           table{
               width: 100%;
               thead{
                   color: #666;
                   background: #F5F7FA;
                   tr{
                    
                   }
                   th{
                       border-bottom: 1px solid#BFBFBF;
                       border-top: 1px solid#BFBFBF;
                       border-right: 1px solid#BFBFBF;
                       line-height:.6rem;
                       &:last-of-type{
                           border-right: none;
                       }
                       .rem(font-size,24);
                       &.w35{
                           width: 35%;
                       }
                       &.w25{
                           width: 25%;
                       }
                       &.w4{
                           width: 40%;
                       }
                       .bj-icon{
                           margin-left: .2rem;
                           display: inline-block;
                           .rem(width,20);
                           .rem(height,10);
                           background: url(../../assets/images/x@2x.png) no-repeat left center;
                           background-size: 100%;
                       }
                       .bj-icon-up{
                           background: url(../../assets/images/s@2x.png) no-repeat left center;
                           background-size: 100%;
                       }
                   }
               }
               tbody{
                   tr:nth-child(2n){
                       background: #f5f5f5;
                   }
                   td{
                       font-weight: 600;
                       text-align: center;
                       padding:.2rem 0;
                       span{
                           .rem(font-size,24);
                            .rem(width,40);
                            .rem(height,40);
                            .rem(line-height,40);
                            text-align: center;
                            display: inline-block;
                            font-family: number1;
                            font-weight: bold;
                            border-radius: 50%;
                            &.ball{
                                color: #fff;
                                margin-right: .05rem;
                            }
                            &.xt{
                                padding: 0 .55rem;
                            }
                            &.ssc{
                                background: #4FA3FF;
                            }
                            &.no-select-ball{
                                color: #445779;
                                background: none;
                            }
                       }
                   }
               }
           }
       }
       .ssc-result{
           .ball{
               background: #4FA3FF;
           }
       }
       .sc-result{
           table{
               thead{
                   th{

                   }
               }
               tbody{
                   td{
                    span.xt{
                        padding: 0;
                    }
                   }
               } 
           }
       }
       .fc-result{
           table{
               thead{
                   th{

                   }
               }
               tbody{
                   td{
                       padding:.15rem 0;
                    span.xt{
                        padding: 0;
                    }
                   }
               } 
           }
            .ball{
                background: linear-gradient(180deg, #DB2525, #FF5C5C);
           }
       }
       .lhc-result{
           .tm6{
               position: relative;
               i{
                   position: absolute;
                   color: #9e9e9e;
                   right: -.15rem;
                   top:.15rem;
                   .rem(font-size,30);

               }
           }
           tr{
               td{
                   .zodiac{
                            display: block;
                            .rem(font-size,24);
                            color: #445779;
                            margin-left:5%;
                    }
                   &:nth-of-type(8){
                         .zodiac{
                             margin-left:15%;
                             margin-right: 0;
                         }
                   }
               }
           }
           
       }
       
       .bottom-btn{
           text-align: center;
           margin-top: .3rem;
           padding-bottom: .3rem;
           >div{
               display: inline-block;
               .rem(height,68);
               .rem(line-height,68);
               .rem(font-size,28);
               text-align: center;
               border-radius: 50px;
               .rem(width,280);

           }
           .back-btn{
                background: #FAFAFC;;
                border: 1px solid #999;
                margin-right: .3rem;
           }
           .see-all{
                color: #fff;
                background: linear-gradient(90deg, #1486FF, #4BA1FF);
                margin-left: .3rem;
           }
       }
    }

    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
        .lottery-rig{
            .rem(margin-right,25);
            .rem(font-size,28);
            color:#999;
        }
        .lottery-cz{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: #445779;
            .rem(font-size,32);
            i{
            display: block;
            width: 20px;
            height: 20px;
            // background: #FF807F;
            // border-radius: 50%;
            margin-top: 0.15rem;
            margin-right: 0.13rem;
            }
            .lott-icon{
            margin: 0.55rem 0 0 0.15rem;
            width:8px ;
            height: 5px;
            background: url('../../assets/images/chat/lott-min.png')no-repeat;
            background-size: contain;
            }
            .lotteryValue{
            font-weight: bold;
            }
        }
    }
    .lott-record{
      background: #fff;
      width: 100%;
      padding: 0 0.2rem;
      color: #445779;
      position: relative;
      .lott-bt{
          padding-top: 0.4rem;
         .rem(font-size,24);
          position: relative;
         .kj-issue{
           font-family: number1;
           .rem(font-size,24);
           font-weight: bold;
           max-width: 4.3rem;
           overflow:hidden; //超出的文本隐藏
           text-overflow:ellipsis; //溢出用省略号显示
           white-space:nowrap; //溢出不换行
         }
          .lottery-music{
              display: inline-block;
              width: 0.4rem;
              height: 0.38rem;
              background: url('../../assets/images/lb_icon.png') no-repeat;
              background-size: 100% 100%;
              position: absolute;
              top: 0.45rem;
              right: -1%;
          }
          .close-music{
              background: url('../../assets/images/chat/close-music.png') no-repeat;
              background-size: 100% 100%;
          }
         .djs{
           margin-right: .4rem;
         }
         i{
            font-family: number1;
            font-weight: bold;
            color: #445779;
            .rem(font-size,24);
         }
      }
      .lott-num{
        padding-top: 0.42rem;
        padding-bottom: 0.4rem;
            &.pb1{
                padding-bottom: 0.1rem;
            }
        
        .see-more-up{

        }
        // margin: 0.42rem 0 0.4rem 0;
        span{
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          margin-right: 0.1rem;
          border-radius: 50%;
          color: #fff;
          font-weight: bold;
          .rem(font-size,28);
          font-family: number1;
          &.fiveMa{
            background: linear-gradient(0deg,rgba(80,129,255,1) 0%,rgba(107,194,255,1) 100%);
            margin-right: 0.4rem;
          }
          &:nth-last-child(1){
            margin-right: 0;
          }
          &.add-icon{
            &:nth-last-child(1){
              position: relative;
              margin-left: 5%;
              &:before{
                content: '';
                background: url("../../assets/images/main/six_add.png") no-repeat;
                width: 0.24rem;
                height: 0.24rem;
                background-size: contain;
                position: absolute;
                // left: 72.6%;
                top: 0.3rem;
                left: -55%;

              }
            }
          }
          &.fc-color{
            background: linear-gradient(180deg, #DB2525, #FF5C5C);
            margin-right: 0.53rem;
          }
        }
      }
        .zodiac{
            span{
                display: block;
                width: 0.8rem;
                height: 0.8rem;
                line-height: 0.8rem;
                text-align: center;
                margin-right: 0.13rem;
                color: #445779;
                .rem(font-size,24);
                &:nth-last-child(1){
                position: relative;
                margin-left: 4%;
                }
            }
        }
      .see-more{
            display: inline-block;
            .rem(width,45);
            .rem(height,60);
            background: url(../../assets/images/x@2x.png) no-repeat right center;
            background-size: 80%;
            position: absolute;
            top:1.3rem;
            right:.3rem;
        }
        .see-more-up{
            // display: inline-block;
            // .rem(width,45);
            // .rem(height,60);
            // background: url(../../assets/images/s@2x.png) no-repeat right center;
            background-size: 80%;
            right:.22rem;
            transform: rotate(180deg);
        }
    }
    .tab-title{
        width: 100%;
        .rem(height,86);
        .rem(line-height,86);
        // border-top: solid 1px #eee;
        border-bottom: solid 1px #eee;
        overflow: hidden;
        span{
            /*display: inline-block;*/
            display: block;
            float: left;
            width: 33.33%;
            text-align: center;
            background-color: #f5f7fa;
            color:#666666;
            .rem(font-size,28);
            border-right: 1px solid #fff;
            border-top: solid 1px #eee;
            border-bottom: solid 1px #eee;
            &:nth-last-child(1){
                border-right: none;
            }
            &.active{
              background-color: #fff;
              color: #1486FF;
              border-bottom: solid 1px #eee;
              font-weight: bold;
            }
        }
    }
    .betting-content{
        // position: relative;
         display: -webkit-box;
         box-align: center;
        .bett-line{
            position: relative;
            top: 0;
            left: 20px;
            width: 1px;
            height: 100%;
            background: #eee;
        }
        .bett-left{
            overflow: hidden;
            // .rem(width,182);
            width:2.43rem;
            text-align: left;
            .rem(margin-left,35);
            // .rem(min-height,300);
            ul{
                // .rem(width,182);
                width: 2.43rem;
                // border-right: solid 1px #eee;
                li{
                    position: relative;
                    font-weight: bold;
                    // .rem(padding,25);
                    height: 1.12rem;
                    line-height: 1.12rem;
                    padding-left: 0;
                    padding-right: 0;
                    .rem(font-size,28);
                    text-align: left;
                    // padding-left: .5rem;
                    padding-left: .45rem;
                    color: #445779;
                    &.active{
                        color: #1486FF;
                        font-weight: bold;
                    }
                    span{
                         -webkit-touch-callout:none;
                        -webkit-user-select:none;
                        -khtml-user-select:none;
                        -moz-user-select:none;
                        -ms-user-select:none;
                        user-select:none;
                        transition: transform 0.6s;
                    }
                    &.moveActive{
                        span{
                            display: inline-block;
                            transform: scale(1.2);
                        }
                    }
                    i{
                       display: block;
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        position: absolute;
                        z-index: 99;
                        left: 0;
                        top: 0;
                        
                    }
                }
            }
        }
        .bett-rigth{
             box-flex: 1;
             flex: 1;
            border-left: solid 1px #eee;
            p{
                padding-top: 0.26666rem;
                padding-bottom: 0.4rem;
                .rem(font-size,24);
                 text-align: center;
            }
            .fc3d-zc{
              .wf-je{
                  font-weight: bold;
                text-align: center;
                font-weight: bold;
                .rem(padding-top,25);
                i.ball{
                  .rem(width,40);
                  .rem(height,40);
                  .rem(line-height,40);
                  color: #FFF !important;
                  border-radius: 50%;
                  background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                  margin: 0 auto;
                }
                &.active{
                  i.ball{
                    color: #FFF !important;
                    background: linear-gradient(180deg, #1486FF, #FF8188);
                  }
                }
              }
            }
            .wf-list{
               .rem(width,566); 
               /*padding: 0 0.26666rem;*/
               border-left: #eee 1px solid;
              //    text-align: center;
              .fc3D-bw,.fc3D-bw2{
                background: #F5F7FA;
                .rem(line-height,60);
                .rem(height,60);
                text-align: center;
                width: 100%;
                margin-bottom: 0.5rem;
                span{
                  display: block;
                  width: 33%;
                  float: left;
                  .rem(font-size,24);
                  border-right: 1px #eee solid;
                  &:nth-last-child(1){
                    border-right: none;
                  }
                }
              }
              .fc3D-bw2{
                span{
                  width: 50%!important;
                }
              }
              .fc3D{
                width: 33%!important;
                .active{
                  background: #FFECE8;
                  color: #FF513E!important;
                  border: 1px solid #1486FF;
                  padding: -1px;
                  // box-sizing: border-box;
                  span{
                    color: #FF513E!important;
                    font-weight: bold;
                    .lhc-sx{
                      background: linear-gradient(180deg, #DB2525, #FF5C5C)!important;
                    }
                  }
                }
                .lhc-w100{
                  width: 100%!important;
                  margin-right:0!important;
                }
              }

              .w25 {
                  >span{
                      &:nth-of-type(4n){
                          /*margin-right: 0;*/
                      }
                      .rem(width,116);
                      .rem(height,90);
                      .rem(line-height,48);
                  }

              }
               .w20{
                    >span{
                       &:nth-of-type(5n){
                           margin-right: 0;
                       }
                     .rem(width,86);  
                     .rem(height,78);
                     .rem(line-height,39);
                    //  text-align: center;
                    }
               }
                .w33{
                  >span{
                    &:nth-of-type(3n){
                      /*margin-right: 0;*/
                    }
                    .rem(width,160);
                    .rem(height,100);
                    .rem(line-height,48);
                  }

                }
              .w333{
                width: 33.333%;
                .wf-je{
                     font-weight: bold;
                  width: 88%;
                  .rem(height,100);
                  .rem(padding-top,25);
                  i.ball{
                    .rem(width,40);
                    .rem(height,40);
                    .rem(line-height,40);
                    border-radius: 50%;
                    background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                  }
                  &.active{
                    i.ball{
                      background: linear-gradient(180deg, #1486FF, #FF8188);
                    }
                  }
                }
              }

                .w49{
                  width: 50%;
                    .wf-je{
                         font-weight: bold;
                      width: 88%;
                      .rem(height,100);
                      .rem(padding-top,25);
                      i.ball{
                        .rem(width,40);
                        .rem(height,40);
                        .rem(line-height,40);
                        border-radius: 50%;
                        background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                      }
                      &.active{
                        i.ball{
                          background: linear-gradient(180deg, #1486FF, #FF8188);
                        }
                      }
                    }
                }
               .w50{
                    >span{
                       &:nth-of-type(2n){
                           margin-right: 0;
                       }
                     .rem(width,250);  
                     .rem(height,100);
                    //  .rem(line-height,100);
                     
                    //  text-align: center;
                    }
               }
               .kj-title{
                   .rem(font-size,22);
                   >div{
                       display: inline-block;
                       width: 1.3rem;
                       text-align: center;
                       border: 1px solid #999;
                       border-radius: 5px;
                       margin-left: 0.2rem;
                       margin-bottom: 0.2rem;
                       span.wf-je{
                            border: none;
                           margin: 0;
                            font-weight: bold;
                       }
                   }
                   span{
                       .rem(line-height,78);
                   }
               }
               &.gyj,&.kuaijie{
                //    .rem(margin-top,52);
                   .rem(padding-top,52);

               }
               .kuaijie{
                   span{
                       .rem(line-height,100);
                   }
               }
               .wf-je{
                    font-weight: bold;
                   border-radius: 5px;
                   border: 1px solid #999;
                   color: #666;
                   display: inline-block;
                   background-color: #fff;
                   margin-left: 0.266666rem;
                   margin-bottom: 0.266666rem;
                   text-align: center;
                   &.active{
                       border: 1px solid #ff6565;
                       color:#1486FF;
                       background-color: #ffebe7;
                       i{
                           color:#1486FF!important;
                       }
                   }
                   i{
                       &:nth-last-child(1){
                           color: #1486FF;
                           line-height: .5rem;
                       }
                       color: #445779;
                       display: inline-block;
                       .rem(font-size,22);
                        text-align: center;
                   }

               }

            }
            .long-betting{
                .cl-issue{
                    color:#666;
                    padding: 0.5rem 2rem;
                    .rem(line-height,36);
                    span{
                        display: inline-block;
                        background: #E8E6E8;
                        border: 1px solid #999999;
                        border-radius: 4px;
                        .rem(width,70);
                        padding-left: 5%;
                        .rem(height,36);
                        position: relative;
                        color: #445779;
                        &:before{
                            content:'';
                            position: absolute;
                            .rem(width,18);
                            .rem(height,10);
                            background: url('../../assets/images/chat/shouqi.png')no-repeat;
                            background-size: contain;
                            top: 0.15rem;
                            right: 14%;

                        }
                    }
                }
                ul{
                    li{
                        border:1px solid #eee;
                        border-radius: 10px;
                        color: #445779;
                        position: relative;
                        overflow: hidden;
                        margin:0 0.2rem 0.2rem 0.2rem;
                        background: #F5F7FA;
                        .cl-name{
                            border-bottom: 1px solid #eee;
                            padding:0 0.2rem;
                            .rem(height,60);
                            .rem(line-height,60);
                            background: #fff;
                            font-weight: 600;
                        }
                        .pk-Close{
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            background: rgba(0,0,0,0.3);
                            color: #fff;
                            line-height: 150px;
                            font-size: 20px;
                            font-weight: bold;
                            z-index:2;
                            border-radius: 10px;
                        }
                        .pk-size{
                            padding: 0.2rem 0.2rem 0.68rem 0.2rem;
                            span{
                                display: block;
                                font-weight: bold;
                            }
                            .xz-left{
                                .rem(width,100);
                                .rem(height,100);
                                text-align: left;
                                line-height: 22px;
                                padding-top:5px;
                            }
                            .xz-btn{
                                .rem(width,100);
                                .rem(height,100);
                                text-align: center;
                                line-height: 22px;
                                padding-top:5px;
                                background-color: #fff;
                                margin-left:15px;
                                cursor: pointer;
                                &.active{
                                    background: url('../../assets/images/chat/select.png')no-repeat;
                                    background-size: contain;
                                }
                            }
                        }
                        .pk-percent{
                            position: relative;
                            .rem(height,8);
                            margin:0 0.1rem;
                            span{
                                display: block;
                                position: absolute;
                                border-radius: 10px;
                                 .rem(height,8);
                                 top:0;
                            }
                            .pk-red{
                                background: #FF4B42;
                                width:19%;
                                left: 0;
                            }
                            .pk-blue{
                                background: #55A7F3;
                                width: 79%;
                                right: 0;
                                .pk-icon{
                                    position: absolute;
                                    display:block;
                                    left: -6%;
                                    bottom: 8px;
                                    .rem(width,45);
                                    .rem(height,40);
                                    background: url('../../assets/images/chat/PK@2x (2) (1).png')no-repeat;
                                    background-size: contain;
                                }
                            }
                            
                        }
                        .pk-last{
                            .rem(line-height,60);
                            padding-left:0.2rem;
                            font-weight: bold;
                            i{
                                padding:0 0.2rem;
                            }
                        }
                    }
                }
            }
            .lhc-tm{
                .pl-box{
                    color: #1486FF;
                    text-align: center;
                    .rem(font-size,24);
                    .rem(padding-bottom,20);
                }
                .tm-title{
                    padding: .3rem 0 .3rem .2rem;
                    span{
                        display: inline-block;
                        .rem(width,180);
                        .rem(height,60);
                        .rem(line-height,60);
                        .rem(border-radius,100);
                        .rem(font-size,24);
                        text-align: center;
                        background: #F5F7FA;
                        .rem(margin-right,15);
                        &.active{
                            color: #1486FF;
                            background: #FFEBE7;
                        }
                      &.w140{
                        .rem(width,140);
                        .rem(margin-right,45);
                        &:last-of-type{
                          .rem(margin-right,0);
                        }
                      }
                    }
                }
                .wf-je{
                     font-weight: bold;
                    i{
                         font-weight: bold;
                        &:nth-last-child(1){
                            color: #1486FF;
                        }
                        &:nth-last-child(0){
                            display: block!important;
                        }
                        //display: inline-block;
                    }
                    i.ball{
                        display: block;
                        .rem(width,40);
                        .rem(height,40);
                        .rem(line-height,40);
                        margin: .1rem auto 0;
                        text-align: center;
                        border-radius:50px;
                        color: #fff!important;
                        font-weight: bold;
                        font-family: DIN;
                    }
                    i.redColor{
                        background: linear-gradient(180deg, #DB2525, #FF5C5C);
                    }
                    i.blueColor{
                        background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                    }
                    i.greenColor{
                        background: linear-gradient(180deg, #3BBA74, #82EF8D);
                    }
                    i.wuColor{
                        background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                    }
                }
            }
            .lhc-hx{
                .wf-je{
                    i.ball{
                        background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                        margin: 0.3rem auto 0;
                    }
                }
            }
        }
    }
    .Confirm-mb{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.3);
    }
    .Confirm-bet{
      position: fixed;
    //   position: absolute;
      bottom: 1.34rem;
      left: 0;
      width: 100%;
      z-index: 3;
      .rem(height,530);
      background: #f5f7fa;
      h3{
        .rem(height,90);
        .rem(line-height,90);
        .rem(font-size,30);
        font-weight: bold;
        color: #445779;
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
          /*position: absolute;*/
          /*top:10.22rem;*/
          /*border-top: 10px solid #F5F7FA;*/
          /*width: 100%;*/
          /*z-index: 1000;*/
      }
      .bet-list{
        background: #fff;
        .bet-title{
            border-bottom: 1px solid #eee;
          border-top: 1px solid #eee;
            /*position: absolute;*/
            /*top:11.6rem;*/
            /*background: #fff;*/
            /*width: 100%;*/
            /*z-index: 1000;*/
          span{
            display: block;
            width: 25%;
            .rem(font-size,24);
            .rem(padding-top,18);
            .rem(padding-bottom,18);
            
            text-align: center;
            // border-bottom: 1px solid #eee;
            float: left;
          }
        }
        .bet-content{
          li{
            border-bottom: 1px solid #eee;
          }
          span{
                display: block;
                width: 25%;
                .rem(font-size,28);
                .rem(line-height,50);
                .rem(padding-top,20);
                .rem(padding-bottom,20);
                color: #445779;
                text-align: center;
                // border-bottom: 1px solid #eee;
                float: left;
              word-break: break-all;
          }

          .jine{
            strong{
              display: block;
              .rem(width,140);
              .rem(height,50);
              .rem(line-height,50);
              color: #FF513E;
              background: #F5F5F5;
              -webkit-border-radius: 25px;
              -moz-border-radius: 25px;
              border-radius: 25px;
              margin: 0 auto;
            }
            input{
              display: block;
              .rem(width,140);
              .rem(height,50);
              .rem(line-height,50);
              color: #FF513E;
              background: #F5F5F5;
              -webkit-border-radius: 25px;
              -moz-border-radius: 25px;
              border-radius: 25px;
              margin: 0 auto;
              text-align: center;
              font-weight: bold;
            }
          }
        }
      }
      .cl-bet-list{
           .bet-title{
               span{width: 33.33%;}
           }
           .bet-content{
               span{
                   width:33.33%;
                //    .rem(line-height,80);
               }
           }
      }
    }
     .list-item{
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
        background: #fff;
            border-top: 1px solid #eee;
            &:first-child{
                border-top: none;
            }
            .delete{
                width: 1.9rem;
                // height: 100%;
                .rem(line-height,50);
                // height: 100%;
                .rem(padding-top,20);
                .rem(padding-bottom,20);
                background: #ff513e;
                font-size: .4rem;
                color: #fff;
                text-align: center;
                position: absolute;
                top:0;
                right: -1.95rem;
                .deleteMenu{
                    padding-top:0.55rem;
                }
            }
    }
    .list-item[data-type="0"]{
        transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
        transform: translate3d(-1.9rem,0,0);
    }
    .foo-submit{
      padding: 0 0.28rem;
      border-top: 1px solid #eee;
      width: 100%;
      position: fixed;
    //   position: absolute;
      bottom: 0;
      left: 0;
      height: 1.34rem;
      background-color: #fff;
      z-index: 999;
      .rem(font-size,28);
      .diamond{
          position: relative;
        height: 1.34rem;
        line-height: 1.34rem;
        i{
          background: url('../../assets/images/chat/zuanshi-min.png') no-repeat;
          background-size: contain;
          width: 0.42rem;
          height: 0.4rem;
          display: block;
          margin-top: 0.46rem;
          margin-right: 0.13rem;
        }
        font-weight: bold;

      }
        .over{
            i{
                background: url('../../assets/images/chat/over.png') no-repeat;
                background-size: contain;
                width: 0.42rem;
                height: 0.4rem;
                display: block;
                margin-top: 0.46rem;
                margin-right: 0.13rem;
            }
        }
      .foo-btn{
        >div{
          height: 0.8rem;
          line-height: 0.8rem;
          width: 1.88rem;
          border-radius: 100px;
          overflow: hidden;
          text-align: center;
          margin-top: 0.28rem;
        }
        .clear-btn{
          background: #F5F7FA;
          color: #445779;
        }
        .submit-btn{
         background: linear-gradient(-90deg,#65AFFF, #007CFF);
         box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
          color: #fff;
          margin: 0.28rem 0 0 0.4rem;
        }
      }
      .bet-btn{
        height: 0.8rem;
          line-height: 0.8rem;
          width: 1.88rem;
          border-radius: 100px;
          overflow: hidden;
          text-align: center;
          margin-top: 0.28rem;
        //   background: linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
        background: linear-gradient(-90deg,#65AFFF, #007CFF);
          color: #fff;
          margin: 0.28rem 0 0 0.4rem;
      }
      .bet-num{
        height: 1.34rem;
        line-height: 1.34rem;
        span{
          color: #FF513E;
          font-weight: bold;
        }
      }
      .chips-box{
        background-color: #fff;
        // position: fixed;
        position: absolute;
        bottom: 1.34rem;
        left: 0;
        .rem(font-size,24);
        padding-bottom: 0.4rem;
        width: 100%;
        border-top: 1px solid #eee;
        .chips{
          // height: 1.6rem;
          height: 0.933rem;
          overflow: hidden;
          margin: 0.4rem 0 0.26rem 0.4rem;
          span{
            width: 0.933rem;
            height: 0.933rem;
            // width: 35px;
            // height: 35px;
            display: block;
            // background-size: 1.89rem;
            background: url('../../assets/images/chat/chouma-min.png')no-repeat;
            margin-right: 0.54rem;
          }
          .chips-10{
            background-size: 1.89rem;
            background-position: -0.96rem -0.96rem;
            &.active{
              background-position: 0px -0.96rem;
            }
          }
          .chips-20{
            background-size: 1.89rem;
            background-position: -0.96rem -1.92rem;
            &.active{
              background-position: 0px -1.92rem;
            }
          }
          .chips-50{
            background-size: 1.89rem;
            background-position: -0.96rem -2.88rem;
            &.active{
              background-position: 0px -2.88rem;
            }
          }
          .chips-100{
            background-size: 1.89rem;
            background-position: -0.96rem -3.84rem;
            &.active{
              background-position: 0px -3.84rem;
            }
          }
          .chips-200{
            background-size: 1.89rem;
            background-position: -0.96rem -4.8rem;
            &.active{
              background-position: 0px -4.8rem;
            }
          }
          .chips-500{
            background-size: 1.89rem;
            background-position: -0.96rem -5.76rem;
            &.active{
              background-position: 0px -5.76rem;
            }
          }
          .chips-1000{
            background-size: 1.89rem;
            background-position: -0.96rem -6.72rem;
            &.active{
              background-position: 0px -6.72rem;
            }
          }
          .chips-5000{
            background-size: 1.89rem;
            background-position: -0.96rem -7.68rem;
            &.active{
              background-position: 0px -7.68rem;
            }
          }
          .chips-10000{
            background-size: 1.89rem;
            background-position: -0.96rem -8.64rem;
            &.active{
              background-position: 0px -8.64rem;
            }
          }
          .chips-20000{
            background-size: 1.89rem;
            background-position: -0.96rem -10.56rem;
            &.active{
              background-position: 0px -10.56rem;
            }
          }
          .chips-50000{
            background-size: 1.89rem;
            background-position: -0.96rem -9.6rem;
            &.active{
              background-position: 0px -9.6rem;
            }
          }
          .chips-100000{
            background-size: 1.89rem;
            background-position: -0.96rem -11.52rem;
            &.active{
              background-position: 0px -11.52rem;
            }
          }
        }
        .chips-Amount{
          height: 0.68rem;
          line-height: 0.68rem;
          padding: 0 0.28rem 0 0.54rem;
          .chips-l{
            .chips-input{
              height: 0.68rem;
              border-radius: 100px;
              background: #F5F7FA;
              width: 3.86rem;
              padding: 0 1rem;
            }
          }
          .chips-r{
            span{
              i{
                color: #FF513E;
              }
            }
          }
        }
        .quiz-type{
            .rem(height,53);
            .rem(line-height,53);
            .rem(font-size,22);
            text-align: right;
            span {
                color: #445779;
                .rem(margin-right, 24px);
                .rem(padding-left, 22px);
                .icon{
                    display: inline-block;
                    .rem(width,19);
                    .rem(height,19);
                    background: url("../../assets/images/chat/radio.png") no-repeat;
                    background-size: 100% 100%;
                }
                &.active{
                    color: #FF3232;
                    .icon{
                        .rem(width,19);
                        .rem(height,19);
                        background: url("../../assets/images/chat/radio-select.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }

            }
        }
      }
    }
    .shua {
        position: relative;
        top: 2px;
        left: 2px;
    }
    .loading-money {
        -webkit-animation: loading 2s infinite;
        -o-animation: loading 2s infinite;
        animation: loading 2s infinite;
        animation-fill-mode: forwards;
    }
    .foo-submit .diamond p.refurbish{
        /*display: inline-block;*/
        position: absolute;
        width: 0.36rem;height: 0.36rem;
        background: url('../../assets/images/member/sx_icon.png') no-repeat;
        background-size: cover;
        /*margin-top: 0.48rem;*/
        /*margin-left: .2rem*/
        top: .48rem;
        right: -0.5rem;
    }

</style>