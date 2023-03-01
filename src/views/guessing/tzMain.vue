<template>
  <div id="tzMain">
      <div class="lottery-container" id="lotteryContainer" v-show="!isTool">
         <div class="tz-tit clearfix" :style="'top:'+top1+'rem'">
            <div class="lottery-cz fl clearfix">
              <i class="fl"><img :src="logoUrl" alt=""></i>
              <div  class="fl lotteryValue " @click="PickerShow()">{{lotteryValue}}</div>
              <div class="fl lott-icon"></div>
            </div>
            <div class="lottery-rig fr">
                <span @click="showTool">助赢工具</span>
                <span @click="showTzRecord">Ghi chép cá cược </span>
            </div>
         </div>
         <!-- 开奖记录 -->
         <myScroll :bgColor="'f5f7fa'" :top="top2" :bottom="gbottom" :zIndex="999" :data="playList" ref="scrollWrapperList">
             <div class="lott-record" @click="sqIsMess($event)">
                 <div class="lott-bt  clearfix">
                     <div class="kj-issue fl">{{currBallDel.issue}}期开奖结果</div>
                     <!-- <div class="fl" style="margin-left: 1%;">距下期</div> -->
                     <div class="fr djs" :class="currId == 8 || currId == 5|| currId == 14? 'djs1':''">
                       <span  style="color:#6A86B9;margin-left: 0.5%;">封盘<i>{{djsTime1}}</i></span>
                       <span  style="color:#6A86B9;margin-left: 0.5%;">开奖<i>{{djsTime}}</i></span>
                       <i :class="{'lottery-music':true,'close-music':!musicState}" @click="musicState=!musicState"></i>
                     </div>
                     <!-- <span  style="color:#999;margin-left: 1%;">封盘<i>{{djsTime1}}</i></span>
                     <span  style="color:#999;margin-left: 1%;">开奖<i>{{djsTime}}</i></span> -->
                 </div>
                 <div class="lott-num clearfix" v-if="currBall.length" >
                     <span v-if="currId != 1 && currId != 10 && currId != 8&& currId != 28&& currId != 30&& currId != 31&& currId != 5&& currId != 14" class="fl" :class=" v | filterBallColor" v-for="v in currBall">{{v}}</span>
                     <span v-if="currId == 1 || currId == 10 || currId == 28|| currId == 30|| currId == 31" class="fl  fiveMa" v-for="v in currBall">{{v}}</span>
                     <span v-if="currId == 8 " class="fl add-icon" :class="v | filterSixBs" v-for="v in currBall">{{v}}</span>
                     <span v-if="currId == 5 || currId == 14 " class="fl fc-color" v-for="v in currBall">{{v}}</span>
                 </div>
                 <div  class="zodiac clearfix" v-if="currBall.length" >
                    <span v-if="currId == 8 " class="fl add-icon"  v-for="v in currBall">{{v | filterSixSX(currBallDel.issue)}}</span>
                 </div>
                 <div class="lott-num" v-else style="line-height: 0.8rem">开奖中...</div>
                 <div class="see-more" :class="showZS?'see-more-up':''" @click="seeMore"></div>
             </div>
             <!-- 玩法列表 -->
             <div class="lott-play" v-show="!isMess&&palyUnit.length">
               <div class="play-tab" v-show="currId == 8 || currId == 5 || currId == 14">
                  <myScrollX >
                    <div class="play-tab-con1 clearfix" ref="wfTab">
                      <span class="fl wmSpan" v-for="(v,index) in palyUnit"  :key="index"   @click="wfChangeTab(index,v)" :class="tabIndex == index ?'active':''" >{{v.play_unit_name}}</span>
                    </div>
                  </myScrollX>
               </div>
               <div class="play-tab" v-show="currId != 8 && currId != 5&& currId != 14">
                  <!-- <myScrollX > -->
                    <div class="play-tab-con clearfix" >
                      <span class="fl " v-for="(v,index) in palyUnit"  :key="index"   @click="wfChangeTab(index,v)" :class="tabIndex == index ?'active':''" >{{v.play_unit_name}}</span>
                    </div>
                  <!-- </myScrollX> -->
               </div>
               <div class="play-List" v-show="currId != 5&&currId != 14&&currId != 8 ||
                                            currBTabName == '特码' ||
                                            currBTabName == '正码特'||
                                            currBTabName == '连肖连尾'||
                                            currBTabName == '连码'||
                                            currBTabName == '主势盘'||
                                            currBTabName == '跨度'||
                                            currBTabName == '二字定位'||
                                            currBTabName == '二字和数'||
                                            currBTabName == '一字组合'||
                                            currBTabName == '一字定位'||
                                            currBTabName == '组选六'||
                                            currBTabName == '组选三'">
                 <myScrollX >
                   <div class="play-wf clearfix" ref="personTab" >
                      <span v-for="(v,index) in playSecList" class="fl"  @click="wfChange(index,v)" :class="wfIndex == index ?'active':''">{{v.play_sec_cname}}</span>
                   </div>
                 </myScrollX>
               </div>
               <!-- <div class="play-List" v-show=" currBTabName == '二字和数'">
                   <div class="play-wf clearfix" ref="personTab" v-if=" currBTabName == '二字和数'">
                      <span v-for="(v,index) in palyUnit[tabIndex].play_unit_info" class="fl"  @click="wfChange(index,v)" :class="wfIndex == index ?'active':''">{{v}}</span>
                   </div>
               </div> -->
             </div>
             <div class="lott-content" v-if="!isMess">                
                 <!-- <div class="lott-content-list clearfix" :data-ids="index" v-show="!isCombo&&wfIndex==index" v-for="(v,index) in playSecList" :key="index">
                   <div class="playNan fl" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick(index1,v2,$event)">
                     <span class="playNan-1" >{{v2.play_class_cname}}</span>
                     <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                   </div>
                 </div>
                 <div class="lott-content-list clearfix"   v-show="currId == 8&&wfIndex==index2" v-for="(v,index2) in playSecList"> 
                   <div class="playNan fl"  v-for="(v2,index3) in v.play_sec_data" v-if="index3 <= 48" @click="selectClick(index3,v2,$event)" :key="index3">
                     <span class="playNan-1">
                       <i  class="lhc-ball" :class="v2.play_class_cname | filterSixBs">{{v2.play_class_cname}}</i>
                     </span>
                     <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                   </div>
                   <div class="playNan fl"  v-for="(v2,index3) in v.play_sec_data" v-if="index3 > 48"  @click="selectClick(index3,v2,$event)" :key="index3">
                     <span class="playNan-1">
                       <i>{{v2.play_class_cname}}</i>
                     </span>
                     <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                   </div>
                 </div>
                 <div class="lott-content-list clearfix" v-show="isCombo&&wfIndex==i" v-for="(item,i) in playSecList">
                   <div class="playNan fl" v-for="(v,index1) in item.play_sec_data" :key="index1" @click="selectClickCombo($event,v)"
                        :data-wf="v.play_class_name"
                        :data-name="v.play_class_cname"
                        :data-odds="v.play_odds"
                        :data-sec="v.play_sec_name"
                   >
                       <span class="playNan-1">{{v.play_class_cname}}</span>
                       <span class="playNan-2 pl-color">{{v.play_odds}}</span>
                   </div>
                 </div> -->
                 <div class="wf-list" v-if="currBTabName == '特码' || currBTabName == '正码'|| currBTabName == '正码特'||currBTabName == '自选不中'||currBTabName == '连肖连尾'">
                     <div class="lMian-pl secName-tit" v-if="currBTabName == '自选不中'&&selectNum>0">赔率：<i class="pl-color">{{currTabData.play_sec_options[selectArr.length-5].play_odds}}</i></div>
                    <div class="lott-content-list pdb-none clearfix">             
                      <div class="playNan fl" :data-id="index1" v-if="index1 <= 48" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" :style="currBTabName == '自选不中' ?'padding-top: 0.4rem':''">
                           <i  class="lhc-ball" :class="v2.play_class_cname | filterSixBs" >{{v2.play_class_cname}}</i>
                        </span>
                        <span v-if="currBTabName != '自选不中'" class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                    <div class="lott-content-list pdt-none clearfix" >
                      <div class="playNan fl" :data-id="index1" v-if="index1 > 48" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" >
                           <i>{{v2.play_class_cname}}</i>
                        </span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '主势盘' || currBTabName == '一字定位'|| currBTabName == '一字组合'|| currBTabName == '跨度'" >
                     <!-- <div class="lMian-pl secName-tit" v-if="currBTabName == '自选不中'&&selectNum>0">赔率：<i class="pl-color">{{currTabData.play_sec_options[selectArr.length-5].play_odds}}</i></div> -->
                    <div class="lott-content-list pdb-none clearfix">             
                      <div class="playNan fl" :class="[{'lhc-w24':(secName == '佰'||secName == '个'||secName == '拾')&&currBTabName == '主势盘'},{'lhc-w55':secName == '佰拾和数'||secName == '佰个和数'||secName == '拾个和数'}]" :data-id="index1"  v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1">
                           <i>{{v2.play_class_cname}}</i>
                        </span>
                        <span  class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '两面'&&currId==8 || currBTabName == '五行'||currBTabName == '头尾数'||currBTabName == '总肖'||currBTabName == '7色波'||currBTabName == '特肖'">
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan  fl" :class="currBTabName == '7色波' || currBTabName == '两面' ?'lhc-w25':''"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" >{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '正码1-6' || currBTabName == '平特一肖尾数'||currBTabName == '色波'" v-for="(v,index) in playSecList" :key="index">
                    <div class="secName-tit pl-color">{{v.play_sec_cname}}</div>
                    <div class="lott-content-list pdb-none pdt-none clearfix" >
                      <div class="playNan  fl" :class="v.play_sec_cname == '色波'?'lhc-w20':'lhc-w25'"  :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick(index1,v2,$event,v.play_sec_cname)">
                        <span class="playNan-1" >{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '三字和数' ||currBTabName == '一字组合'  || currBTabName == '二字组合'|| currBTabName == '三字组合'" v-for="(v,index) in playSecList" :key="index">
                    <div class="secName-tit pl-color">{{v.play_sec_cname}}</div>
                    <div class="lott-content-list pdb-none pdt-none clearfix" >
                      <div class="playNan  fl" :class="v.play_sec_cname == '色波'?'lhc-w20':'lhc-w25'"  :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick(index1,v2,$event,v.play_sec_cname)">
                        <span class="playNan-1" >{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="  currBTabName == '二字和数'" v-for="(v,index) in playClassList" :key="index">
                    <div class="secName-tit pl-color">{{v.play_sec_cname}}</div>
                    <div class="lott-content-list pdb-none pdt-none clearfix" >
                      <div class="playNan  fl lhc-w25" :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" >{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '正肖'||currBTabName == '合肖'">
                     <div class="lMian-pl secName-tit" v-if="currBTabName == '合肖'&&selectNum>0">赔率：<i class="pl-color">{{currTabData.play_sec_options[selectArr.length-2].play_odds}}</i></div>
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl" :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" :style="currBTabName == '合肖' ?'padding-top: 0.4rem':''">
                          <i  class="lhc-ball lhc-sx"  >{{v2.play_class_cname}}</i>
                        </span>
                        <span v-if="currBTabName == '正肖'" class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '连码'&&currId==8" >
                    <div class="lMian-pl secName-tit">赔率：<i class="pl-color">{{playSecList[wfIndex].play_sec_options[0].play_odds}}</i></div>
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1" style="padding-top: 0.4rem">
                          <i  class="lhc-ball lhc-sx" :class="v2.play_class_cname | filterSixBs" >{{v2.play_class_cname}}</i>
                        </span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '组选三' || currBTabName == '组选六'" >
                   <div class="lMian-pl secName-tit" v-if="currBTabName == '组选六'&&selectNum>0">赔率：<i class="pl-color">{{currTabData.play_sec_options[selectArr.length-4].play_odds}}{{selectNum}}</i></div>
                    <div class="lMian-pl secName-tit" v-if="currBTabName == '组选三'&&selectNum>0">赔率：<i class="pl-color">{{currTabData.play_sec_options[selectArr.length-5].play_odds}}</i></div>
                    <div class="lott-content-list pdb-none fc3D-ZX clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)"
                        :data-wf="v2.play_class_name"
                        :data-name="v2.play_class_cname"
                        :data-odds="v2.play_odds"
                        :data-sec="v2.play_sec_name">
                        <span class="playNan-1" style="padding-top: 0.4rem">
                          <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                        </span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '三字定位'" >
                    <div class="lMian-pl secName-tit">赔率：<i class="pl-color">{{playSecList[wfIndex].play_sec_options[0].play_odds}}</i></div>
                    <div class="fc3D-bw clearfix" >
                      <span v-for="(a,indexa) in playSecList[wfIndex].play_sec_info">{{a}}</span>
                      <!-- <span>佰位</span>
                      <span>拾位</span>
                      <span>个位</span> -->
                    </div>
                    <div class="clearfix" > 
                        <div class="lott-content-list pdb-none fc3D clearfix fl lott1">
                          <div class="playNan fl lhc-w100"  :data-id="index1" 
                           :data-pcname="v2.play_class_cname" 
                          :data-pname="v2.play_sec_name"
                          :data-pccname="v2.play_class_cname"
                          v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                            <span class="playNan-1" style="padding-top: 0.4rem">
                              <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                            </span>
                          </div>
                        </div>
                        <div class="lott-content-list pdb-none fc3D clearfix fl lott2">
                          <div class="playNan fl lhc-w100"  :data-id="index1"
                           :data-pcname="v2.play_class_cname" 
                            :data-pname="v2.play_sec_name"
                            :data-pccname="v2.play_class_cname"
                           v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                            <span class="playNan-1" style="padding-top: 0.4rem">
                              <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                            </span>
                          </div>
                        </div>
                        <div class="lott-content-list pdb-none fc3D clearfix fl lott3">
                          <div class="playNan fl lhc-w100"  :data-id="index1" 
                           :data-pcname="v2.play_class_cname" 
                            :data-pname="v2.play_sec_name"
                            :data-pccname="v2.play_class_cname"
                          v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                            <span class="playNan-1" style="padding-top: 0.4rem">
                              <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                            </span>
                          </div>
                        </div>
                    </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '二字定位'" >
                    <div class="lMian-pl secName-tit">赔率：<i class="pl-color">{{playSecList[wfIndex].play_sec_options[0].play_odds}}</i></div>
                    <div class="fc3D-bw clearfix fc3D-bw2" >
                      <span v-for="(a,indexa) in playSecList[wfIndex].play_sec_info">{{a}}</span>
                      <!-- <span>佰位</span>
                      <span>拾位</span> -->
                    </div>
                    <div class="clearfix"> 
                        <div class="lott-content-list pdb-none fc3D-20 clearfix fl lott1">
                          <div class="playNan fl lhc-w100"  :data-id="index1" 
                                   :data-pcname="v2.play_class_cname" 
                                    :data-pname="v2.play_sec_name"
                                    :data-pccname="v2.play_class_cname"
                          v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                            <span class="playNan-1" style="padding-top: 0.4rem">
                              <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                            </span>
                          </div>
                        </div>
                        <div class="lott-content-list pdb-none fc3D-20 clearfix fl lott2">
                          <div class="playNan fl lhc-w100"  :data-id="index1"
                           :data-pcname="v2.play_class_cname" 
                            :data-pname="v2.play_sec_name"
                            :data-pccname="v2.play_class_cname"
                           v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                            <span class="playNan-1" style="padding-top: 0.4rem">
                              <i  class="lhc-ball lhc-sx" >{{v2.play_class_cname}}</i>
                            </span>
                          </div>
                        </div>
                    </div>
                 </div>
                 <!-- <div class="wf-list" v-if="currBTabName == '连码'&&currId!=8">
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClickCombo($event,v2)"
                        :data-wf="v2.play_class_name"
                        :data-name="v2.play_class_cname"
                        :data-odds="v2.play_odds"
                        :data-sec="v2.play_sec_name">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '单码' || currBTabName == '斗牛'|| currBTabName == '整合'|| currBTabName == '单号1-10'|| currBTabName == '冠亚军组合'">
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '快捷' ">
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
                 <div class="wf-list" v-if="currBTabName == '两面'&&currId!=8">
                    <div class="lott-content-list pdb-none clearfix">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in playClassList" :key="index1" @click="selectClick(index1,v2,$event)">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div> -->
                 <div class="wf-list" v-if="currId!=8 && currId!=5 && currId!=14">
                    <div class="lott-content-list pdb-none clearfix" v-show="!isCombo&&wfIndex==index" :data-ids="index" v-for="(v,index) in playSecList">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClick(index1,v2,$event,v.play_sec_cname)">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                   <div class="lott-content-list pdb-none clearfix" v-show="isCombo&&wfIndex==index" :data-ids="index" v-for="(v,index) in playSecList">
                      <div class="playNan fl"  :data-id="index1" v-for="(v2,index1) in v.play_sec_data" :key="index1" @click="selectClickCombo($event,v2)"
                        :data-wf="v2.play_class_name"
                        :data-name="v2.play_class_cname"
                        :data-odds="v2.play_odds"
                        :data-sec="v2.play_sec_name">
                        <span class="playNan-1">{{v2.play_class_cname}}</span>
                        <span class="playNan-2 pl-color">{{v2.play_odds}}</span>
                      </div>
                   </div>
                 </div>
             </div>

             <!--确认注单详情-->
             <div class="Confirm-bet" v-show="isMess" id="betContent">
                     <!-- <myScroll ref="scrollWrapperMess" :top="10.22" :bgColor="'f5f7fa'" :playList="playList" :bottom="1.2" :zIndex="999">-->
                     <h3>请确认详细注单</h3>
                     <div class="bet-list">
                         <div class="bet-title clearfix">
                             <span>玩法</span>
                             <span>号码</span>
                             <span>赔率</span>
                             <span>金额</span>
                             <!-- <span v-else>钻石</span> -->
                             <!-- <span v-if="quizTypeId==0">钻石</span> -->
                         </div>

                         <div class="bet-content " @focusout="inputBlur" @focusin="inputFocus">
                             <div  data-type="0" class="list-item" v-for="(v,index) in selectList3" :key="index">
                                 <div class="clearfix "  @touchstart.capture="touchstart" @touchend.capture="touchEnd">
                                     <span>{{v.play_sec_cname}}</span>
                                     <span>{{v.play_class_cname}}</span>
                                     <span style="">{{v.play_odds}}</span>
                                     <!-- <span class="jine"><strong>{{v.play_bet_sum}}</strong></span> -->
                                     <!--                       <span class="jine"><input v-model="v.play_bet_sum" @change="chuangJE(index,v.play_bet_sum)" :data-index="index" maxlength="9"></span>-->
                                     <span class="jine" ><input v-model="v.play_bet_sum" :data-index="index" maxlength="9"></span>
                                     <div class="delete" @click="deleteItem" :data-index="index"> 删除</div>
                                 </div>
                             </div>
                         </div>
                     </div>
                         <!--                 </myScroll>-->
             </div>



         </myScroll>
         <div class="foo-submit clearfix" v-if="!isMess">
             <!--             <div class="diamond fl over clearfix"  v-show="quizTypeId != '0'" ><i class="fl"></i><span class="fl">{{amount}}</span></div>-->
             <!--             <div class="diamond fl clearfix"  v-show="quizTypeId == '0'" ><i class="fl"></i><span class="fl">{{zsMount}}</span></div>-->
             <div class="diamond fl over clearfix"><i class="fl"></i><span class="fl">{{amount}}</span><i @click="money(true)" class="refurbish"></i></div>
             <!-- <div class="diamond fl clearfix"  v-show="quizTypeId == '0'" ><i class="fl"></i><span class="fl">{{zsMount}}</span><i @click="zsQuest(true)" class="refurbish"></i></div> -->
            <div class="foo-btn fr clearfix">
              <div class="clear-btn fl" @click="clearSelectList">重置</div>
                <div class="submit-btn fl" @click="submitBetOver">提交</div>
                <!-- <div class="submit-btn fl" v-show="quizTypeId == '0'" @click="submitBet">提交</div> -->
            </div>
            <!-- v-if="chouma" -->
            <div class="chips-box" v-show="chouma" @focusout="inputBlur" @focusin="inputFocus">
                <!-- <div class="quiz-type">
                    <span  :class="quizTypeId == '1' ? 'active' : '' " @click="quizType(1)"><i class="icon"></i> 余额竞猜</span>
                    <span :class="quizTypeId == '0' ? 'active' : '' " @click="quizType(0)"><i class="icon"></i> 钻石竞猜</span>
                </div> -->
              <div style="margin-left:0.4rem">
                <myScrollX>
                <div class="chips clearfix" ref="chipsTab">
                  <span v-for="(item,index) in chipsNum" :key="index" @click="chipsChange(index,item.play_sum_num)" class="fl" :class="{['chips-'+item.play_sum_num]:['chips-'+item.play_sum_num],active:chipsJE==item.play_sum_num}" id="chips"></span>
                  <!--                  <span v-for="(item,index) in chipsNum" :key="index" @click="chipsChange(index,item.play_sum_num)" class="fl" :class="chipsJE==item.play_sum_num?'active':''" id="chips"></span>-->
                </div>
              </myScrollX>
              </div>
              <div class="chips-Amount clearfix" >
                <div class="chips-l fl">
                  <span style="margin-right:0.22rem;">其他金额:</span>
                  <!-- <x-input aria-placeholder="请输入钻石"></x-input> -->
                  <!-- <input type="text" v-if="quizTypeId==0" placeholder="请输入钻石"  class="chips-input" v-model="chipsJE" id="jine" maxlength="9"> -->
<!--                  <input type="text" v-if="quizTypeId==1" placeholder="请输入金额"  class="chips-input" v-model="chipsJE" id="jine" maxlength="9">-->
                  <input type="text" placeholder="请输入金额"  class="chips-input" v-model="chipsJE" id="jine" maxlength="9">
                </div>
                <div class="chips-r fr" >
                    <span>共{{selectNum}}注</span>
                    <!-- <span v-if="quizTypeId == '0'" style="margin-left: 0.13rem;"><i>{{selectDiamond}}</i> 钻</span> -->
                    <span style="margin-left: 0.13rem;"><i>{{selectDiamond}}</i> 元</span>
                </div>
              </div>
            </div>
         </div>

         <div class="foo-submit clearfix" v-if="isMess">
           <!-- <div class="fl bet-num">总下注金额： <span>{{chipsJE?selectList3.length*chipsJE:selectList3.length*selectList3[0].play_bet_sum}}</span> </div> -->
           <div class="fl bet-num">总下注金额： <span>{{totalNum}}</span> </div>
           <div class="fr bet-btn" @click="Confirmbet">确认</div>
         </div>
      </div>
      <picker
      :data="lotteryList"
      :showToolbar="true"
      :maskClick="true"
      @change="pickerconfirm1"
      @confirm="confirm"
      :visible.sync="pickershow"
      :rowNumber="5"
      />
      <!-- Ghi chép cá cược  -->
      <div class="record" v-if="TzRecord&&!isTool">
        <div class="record-title" :style="'top:'+top3+'rem'">
          <div class="record-icon" @click="TzRecord = false"></div>
           Ghi chép cá cược 
        </div>
          <!--        <TzRecord  class="TzRecord" :isHideVideo="isHideVideo" ></TzRecord>-->
          <TzRecord  class="TzRecord" :top="isHideVideo?4:9" :topNav="isHideVideo?2.6:7.9" :currentId="currId"></TzRecord>
      </div>
      <!--助赢工具-->
      <div class="jc-tool"  v-if="isTool">
          <jcTool :valueId="valueId" :isHideVideo="isHideVideo"  v-on:closeFunc="closeTool" />
      </div>
      <audio :src="musicSrc"  controls="" id="lotteryMusic" v-show="isAudio"></audio>

       <!-- 多期开奖走势 -->
        <div class="more-result-mask" :class="currId == 8 ?'t4':''" @click="showZS=false" v-show="showZS"></div>
        <div class="more-result-container" v-show="showZS">
           <myScroll :top="currId == 8 ?10.5:10" :bottom='0' :data="playListData" ref="historyScroll">
                <div class="control-container" v-show="showBj">
                    <p class="clearfix"><span class="fl">标记号码</span> <span class="fr clear-btn" @click="clearAll">清空</span></p>
                    <div class="select-ball">
                        <span v-if="currId==29||currId==9||currId==26||currId==27||currId==11||currId==32" v-for="(v,index) in selectBallSc" @click="selectOneBall($event,v)" :key="index">{{v}}</span>
                        <span v-if="currId==10||currId==30||currId==31||currId==10||currId==28||currId==5||currId==14" v-for="(v,index) in selectBall" @click="selectOneBall($event,v)" :key="index">{{v}}</span>
                    </div>
                     <p class="clearfix"><span class="fl">标记号码</span></p>
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
                                <th style="width:26%" rowspan= "2"><span>开奖号码</span><br><span @click="showBj=!showBj" style="color:#FF3131">标记<i v-if='currSelectBallArr.length' style="word-break: break-all;">({{currSelectBallArr.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
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
                                <th class="w35"><span>开奖号码</span><br><span @click="showBj=!showBj"  style="color:#FF3131">标记 <i v-if='xsSelectBall.length' style="word-break: break-all;">({{xsSelectBall.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
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
                                <th style="width:20%" rowspan= "2">期号</th>
                                <th style="width:48%" rowspan= "2"><span>开奖号码</span><span @click="showBj=!showBj" style="color:#FF3131">标记<i v-if='xsSelectBall.length' style="word-break: break-all;">({{xsSelectBall.join(',')}})</i><i class="bj-icon" :class="showBj?'bj-icon-up':''"></i></span></th>
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
                    <div class="see-all" @click="showTool">查看完整走势</div>
                </div>
           </myScroll>    
        </div>
  </div>
</template>

<script>
import picker from 'vue-pickers'
import TzRecord from "../../components/tzRecord.vue"//Ghi chép cá cược 
import jcTool from "../../components/jcTool.vue"
import tzMess from "../../components/tzMess.vue"
import P from '../../assets/js/tool'
import {getRank } from "../../assets/js/public"
import {mapMutations, mapState } from "vuex";
import { removeAllactive ,getSiblings} from "../../assets/js/public"
export default {
name:"tzMain",
  data(){
    return{
      showZS:false,
      showBj:false,
      selectBall:[0,1,2,3,4,5,6,7,8,9],
      selectBallSc:[1,2,3,4,5,6,7,8,9,10],
      currSelectBall:[],
      xsSelectBall:[],
      historyList:[],//近20期历史开奖
      playListData:{},
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
      currBallDel:{
        issue:''
      },//当前开奖
      currBall:[],//当前开奖号码
      djsTime: "--:--",//倒计时
      djsTime1: "--:--",//倒计时
      currIssue:"",//当前期数
      palyList:[],//玩法列表
      palyUnit:[],
      playSecList:[],
      playClassList:[],
      palyUnitName:'',
      tabIndex:0,//tab索引
      wfIndex:0,//玩法索引
      chipsIndex:0,
      chipsJE:1,
      chouma:false,//筹码盒子
      chipsNum:[],
      valueId:'',
      lotteryValue:'香港六合彩',
      logoUrl:"http://47.75.167.133:18306/lott/201911255ddb573b8e25d.png",
      lotteryList:[[]],//彩种切换
      // lotteryList:[[]],//彩种切换
      pickershow:false,
      TzRecord:false,//Ghi chép cá cược 
      selectList:[],
      selectList2:[],
      selectList3:[],
      // selectList4:[],
      isTool:false,
      selectNum:0,
      isMess:false,//确认投注单
      betIssue:'',//期数
      secName:'',//玩法
      // secName1:'',//玩法
      selectDiamond:0,
      currId:'',
      zsMount:0,
      nextEndTime:'',
      totalNum:'',
      isFollow:false,
      orderMode:0,//下注模式  0 一般下注 1跟投
      isCombo:0,  //0 一般玩法  1组合玩法
      comboType:'二中二',
      playList:{},
      startX:0,
      endX:0,
      gbottom:1,
      sel:'',
      musicState:this.$store.state.musicState==true||this.$store.state.musicState=='true',
      musicSrc:require('../../assets/ring.mp3'),

        quizTypeId:1, //1余额竞猜  0钻石竞猜
        amount:0,  //余额

      // comboType:'二中二',
      isAudio:false,
      top1:6.7 ,
      top2:7.7,
      top3:6.6,
      currBTabName:'',
      playOptions:{},  //二字定位
      lmPl:20,//两面赔率
      currTabData:{},//用于连码 连肖连尾 合肖 自选不中
      selectArr:[],//选中特殊玩法的名字
      selectNameArr:[],//选中特殊玩法的名字中文
      ezhsName:'',
       currSelectBallArr:[],
       isBetting:false,
       
    }
  },
  components:{
    // Picker,
    picker,
    TzRecord,
    jcTool,
    tzMess
    // PopupPicker
  },
  filters: {
    filtersClassName(n, t) {
      let c = '';
      if(n.status==-1){
        c = 'red';
      }else if(n.status==-2){
        c = 'green';
      }else if(n.status==-3){
        c = 'gray';
      }else if(n.status==-4){
        c = 'green';
      }else{
        c = 'red'
      }
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
  props:{
      lotteryId:{
          type:Number,
          default:8
      },
      allLottery:{
        type:Array,
        default:[]
      },
      followOrders:{
          type:Object,
          default:{}
      },
      isFollowOrder:{
          type:Boolean,
          default:false
      },
      isHideVideo:{
         type:Boolean,
         default:false
      }
      // liveData:{
      //   type:String,
      //   default:''
      // }
  },
  created(){
      // if(this.quizTypeId =! this.isYue){
      //   this.quizTypeId = this.isYue;
      // }
      console.log(this.czID)
      if(this.czID != ''){
          this.currId = this.czID;
          this.valueId = this.czID;
      }else{
        this.currId = this.lotteryId;
        this.valueId = this.lotteryId;
      }
      this.getHistoryList(this.currId);

      console.log(22222,this.valueId)
    //处理跟投
      if(typeof(this.followOrders.order_detail)=='string'){
          this.selectList3 =this.followOrders.order_detail?JSON.parse(this.followOrders.order_detail):[];
          // this.quizTypeId = this.followOrders.isBalance;
          this.quizTypeId = 1;
      }else{
          this.selectList3 =this.followOrders.order_detail?this.followOrders.order_detail:[];
          // this.quizTypeId = this.followOrders.isBalance;
          this.quizTypeId = 1;
      }

    if(this.selectList3.length){
        this.orderMode = 1;
        this.currId = this.followOrders.play_bet_lottery_id;
        this.betIssue = this.followOrders.play_bet_issue;
        // this.quizTypeId = this.followOrders.isBalance;
        this.quizTypeId = 1;
    }
      this.isFollow = this.isFollowOrder;
    if(this.isFollowOrder){
        this.isMess = true;
        // this.quizTypeId = this.followOrders.is_bl_play;
    } 
    //初始化
    this.Xinit();
    //切屏倒计时重启
      let self = this;
      let visProp = P.getHiddenProp();
      if (visProp) {
          let evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
          document.addEventListener(
              evtname,
              function() {
                  if (document[P.getVisibilityState()] == "hidden") {
                  } else {
                      if (self.$route.name == "chat") {
                          self.getOneNumber();
                      }
                  }
              },
              false
          );
      }

      if(this.isHideVideo){
        this.top1 = 1.45;
        this.top2 = 2.45;
        this.top3 = 1.35

      }else{
        this.top1 = 6.7;
        this.top2 = 7.7;
        this.top3 = 6.6;
      }
  },
  watch:{
      isTool:function(){
          // this.reloadOpen();
      },
    selectList3:{
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
    playSecList: function() {
      this.$nextTick(() => {
        this.ScrollX();
        // this.ScrollX1();
        this.TabScrollX();
      });
    },
    palyUnit: function() {
      this.$nextTick(() => {
        this.TabScrollX();
      });
    },
    chipsNum: function() {
      this.$nextTick(() => {
        this.ChipsScrollX();
      });
    },
    chouma:function(n,o){
      if(this.chouma) this.gbottom = 4.3;
      else this.gbottom = 1;
        // if(this.quizTypeId==1){
        //     this.chipsJE = 1;
        // }else{
        //     this.chipsJE = 10;
        // }
    },
      quizTypeId:function(n){
          if(n==1){
              this.chipsJE = 1;
          }else{
              this.chipsJE = 10;
          }
      },
    isMess:function(n,o){
        if(this.isMess) this.gbottom = 1.2;
        else this.gbottom = 1;
    },
    chipsJE: function(n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          // console.log(this.zsMount.toString().length)
          this.chipsJE = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
            //console.log(this.chipsJE);
            // if(this.quizTypeId == 0){
            //     if(this.chipsJE > this.zsMount){
            //         this.chipsJE = this.chipsJE.substring(0,this.zsMount.toString().length);
            //     }
            // }else if(this.quizTypeId == 1){
            //     if(this.chipsJE > this.amount){
            //         this.chipsJE = this.chipsJE.substring(0,this.amount.toString().length);
            //     }
            // }

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
    }
    // totalNum:function(n,o){
    //   if(n){


    //   this.$nextTick(() => {
    //     let totalNum = 0;
    //     for(let i = 0, len = this.selectList3.length; i < len; i++) {
    //         totalNum  +=  parseInt(this.selectList3[i].play_bet_sum)
    //     }
    //     this.totalNum = totalNum;
    //     // this.isMess = true;
    //     console.log()
    //   });
    //    }
    // }
  },
    destroyed(){
        clearInterval(window.timer1);
        clearInterval(window.timer3);
    },
  mounted(){
    this.getPlayNum();
      //        到时候放App全局
      document.body.addEventListener(
          "touchmove",
          function(e) {
              e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
          },
          { passive: false }
      );

      this.$refs.scrollWrapperList.refresh();
      this.$refs.scrollWrapperList.enable();
      this.$refs.scrollWrapperList.disable();
  },
    computed: {
        ...mapState(["userType","isYue","codeToken","czID","moneyData"])

    },
  methods:{
     getToday(){
          let time = new Date();
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          m = m >= 10 ? m : "0" + m;
          d = d >= 10 ? d : "0" + d;
          return y + "-" + m + "-" + d
      },
      seeMore(e){
          this.showZS = !this.showZS;
          this.showBj = false;
          this.clearAll();
      },
       async getHistoryList(id) {
                // this.historyList = [];
                let res = await this.$http.post("/open/idx/history", {
                    lottery_id: id || this.lotteryId,
                    belong_date: this.getToday(),
                    nums: 10
                });
               this.historyList = res.data.data || [];
                this.playListData.history = this.historyList;
                setTimeout(() => {
                    this.$refs.historyScroll.refresh(); //重新计算高度，刷新滚动条
                }, 20);
            },
            //去重
             unique(arr) {
                if (!Array.isArray(arr)) {
                    console.log('type error!')
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
            selectOneBall(e,v){
                let allother = document.querySelectorAll('.select-other span.active');
                if(allother.length){
                    // this.currSelectBall = [];
                     this.xsSelectBall = this.unique(this.currSelectBall); //标记号码
                    //  removeAllactive(allother);
                    //  this.currDX = '0';
                    //  this.currDS = '0';
                    //  this.currZH = '0';
                }
                let curr = e.currentTarget;
                if(curr.className.includes('active')){
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
                      this.xsSelectBall = this.unique(this.currSelectBall); //标记号码
                    if(!allother.length&&!this.currSelectBall.length){
                         if(this.currId==29||this.currId==9||this.currId==26||this.currId==11||this.currId==27||this.currId==32) this.currSelectBall = [1,2,3,4,5,6,7,8,9,10];
                        else if(this.currId == 8) this.currSelectBall = this.sixBallData;
                        else this.currSelectBall = [0,1,2,3,4,5,6,7,8,9];
                    }
                }else{
                    curr.classList.add('active');
                    this.currSelectBall.push(v);
                    this.currSelectBallArr.push(v);
                    // this.xsSelectBall.push(v);
                   if(this.currSelectBall.length>10&&!allother.length){
                        this.currSelectBall.splice(0,10);    
                    }
                      this.xsSelectBall = this.unique(this.currSelectBall); //标记号码
                }
                 
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
                     this.xsSelectBall = this.unique(this.currSelectBall); //标记号码
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
                // this.currSelectBall =  Object.prototype.toString.call(s) === '[object Array]'?s:[]   
                 this.currSelectBall = this.currSelectBallArr.concat(ss);            
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
              this.amount = "Đang nhận...";
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
      sqIsMess(e){
        if(this.isMess){
          console.log(e.target)
          if(e.target.className.indexOf('lottery-music')>-1)this.isMess = true;
          else this.isMess = false;
        }
      },
      zsQuest() {
          // 获取钻石/api/v1/user/diamond_now/
          if (!this.codeToken) return;
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
    reloadOpen(){
        let self = this;
        let visProp = P.getHiddenProp();
        if (visProp) {
            let evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(
                evtname,
                function() {
                    if (document[P.getVisibilityState()] == "hidden") {
                    } else {
                        if (self.$route.name == "chat") {
                            self.getOneNumber();
                        }
                    }
                },
                false
            );
        }
    },
    ...mapMutations(["SETISMUSIC","GETISYUE","SETDIAMOND","SETCZID","SETCZNDATA"]),
    Xinit(){
        this.getOneNumber();
        this.getPlayList();
        this.fixRoomId();
        this.zsQuest();
        this.balance();
        // let lotteryArr = this.allLottery.filter((item, i) => {
        //     return item.lottery_id != 8;
        // });
        let lotteryArr = this.allLottery;
        for(let i = 0 ; i < lotteryArr.length;i++){
            this.lotteryList[0].push({
                label:lotteryArr[i].cname,
                lottery_id:lotteryArr[i].lottery_id,
                logoUrl:lotteryArr[i].logo_url,
            })
        }
    },
    async getOneNumber(id){
      this.currBall = [];
      let res = await this.$http.post("/open/idx/indexNewOne",{
          lottery_id:id || this.currId
      })
      if(res.data && res.data.code == 1){
          this.currBallDel = res.data.data ;
          this.currId = res.data.data.lottery_id;

          if (res.data.data.next_lottery_time < 0){
            this.currBall = [] ;
            // this.betIssue = res.data.data.issue - 0 + 1;
          }else{
             this.currBall = res.data.data.code.split(",") || [];
            //  this.betIssue = res.data.data.issue;
          }
          //开奖时间
          this.timer(res.data.data.next_lottery_time);
          //封盘时间
          // let endTime = res.data.data.next_lottery_end_time;
          // let timestamp = Date.parse(new Date())/1000;
          // this.nextEndTime = endTime - timestamp;
          // this.timer1(this.nextEndTime);
          this.nextEndTime = res.data.data.next_lottery_end_time;
          this.timer1(res.data.data.next_lottery_end_time);
          this.betIssue = res.data.data.next_issue;
      }
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.$store.state.codeToken) return;
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
    fixRoomId() {
      let game = this.allLottery;
        for (let j = 0, lenj = game.length; j < lenj; j++) {
          if (this.valueId == game[j].lottery_id) {
              this.lotteryValue = game[j].cname;
              this.logoUrl = game[j].logo_url;
          }
        }
    },
    //倒计时
    count(time) {
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
        // else h = h >= 10 ? h : "0" + h + ":";
        else h = h >= 10 ? h : "0" + h ;
        if (d >= 1) {
            if (!h) h = "00";
          t = d + "天" + h + ":" + min + ":" + second;
          // console.log(t);
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
      //            return obj
      return t;
    },
    timer(t) {
      if (window.timer1) clearInterval(window.timer1);
      window.timer1 = setInterval(() => {
        this.djsTime = this.count(t--);
        if (t <= -1) {
          //          console.log(23)
          this.getOneNumber(null, true);
          this.djsTime = "--:--";
        }
        //        console.log(t)
      }, 1000);

      // if (t <= 0) {
      //   this.currBallDel.issue = this.currIssue - 0 + 1;
      //   this.currIssue = this.currIssue;
      // }
    },
    timer1(t) {
      if (window.timer3) clearInterval(window.timer3);
      window.timer3 = setInterval(() => {
        this.djsTime1 = this.count(t--);
        if (t <= -1) {
          // this.getOneNumber(null, true);
          this.djsTime1 = "--:--";
        }
        //        console.log(t)
      }, 1000);

      // if (t <= 0) {
      //   this.currBallDel.issue = this.currIssue - 0 + 1;
      //   this.currIssue = this.currIssue;
      // }
    },
    ScrollX() {
          // if(this.currId != 8||this.currBTabName == '特码' || this.currBTabName == '正码特'||this.currBTabName == '连肖连尾'||this.currBTabName == '连码'){
          //     let allLi = document.querySelectorAll(".play-wf span");
          //     let sum = 0;
          //     if(this.currBTabName == '特码'){
          //         this.$refs.personTab.style.width = '4rem';
          //     }else{
          //         for (var i = 0; i < allLi.length; i++) {
          //             sum += allLi[i].offsetWidth;
          //             // console.log(allLi[i].offsetWidth)
          //         }
          //         let width = sum + this.playSecList.length * 15;
          //         this.$refs.personTab.style.width = width + "px";
          //     }


          // }
          if( this.currId != 5&&
              this.currId != 14&&
              this.currId != 8 ||
              this.currBTabName == '特码' ||
              this.currBTabName == '正码特'||
              this.currBTabName == '连肖连尾'||
              this.currBTabName == '连码'||
              this.currBTabName == '主势盘'||
              this.currBTabName == '跨度'||
              this.currBTabName == '二字定位'||
              this.currBTabName == '二字和数'||
              this.currBTabName == '一字组合'||
              this.currBTabName == '一字定位'||
              this.currBTabName == '组选六'||
              this.currBTabName == '组选三'){
              let allLi = document.querySelectorAll(".play-wf span");
              let sum = 0;
              if(this.currBTabName == '特码'){
                  this.$refs.personTab.style.width = '4rem';
              }else{
                  for (var i = 0; i < allLi.length; i++) {
                      sum += allLi[i].offsetWidth;
                      // console.log(allLi[i].offsetWidth)
                  }
                  let width = sum + this.playSecList.length * 15;
                  this.$refs.personTab.style.width = width + "px";
              }


          }
    },
    // ScrollX1() {
    //   let allLi = document.querySelectorAll(".play-wf span");
    //   let sum = 0;
    //   for (var i = 0; i < allLi.length; i++) {
    //     sum += allLi[i].offsetWidth;
    //     console.log(allLi[i].offsetWidth)
    //   }
    //   // console.log(sum)
    //   let width = sum + this.playSecList.length * 15;
    //   this.$refs.personTab1.style.width = width + "px";
    // },
    ChipsScrollX(){
      let Width = this.chipsNum.length * 1.5;
      this.$refs.chipsTab.style.width = Width + "rem";
    },
    TabScrollX(){
      let allLi = document.querySelectorAll(".play-tab-con1 span");
      let sum = 0;
      for (var i = 0; i < allLi.length; i++) {
        sum += allLi[i].offsetWidth;
      }
      this.$refs.wfTab.style.width = sum+10 + "px";


      // let Width = this.palyUnit.length * 1.95;
      // this.$refs.wfTab.style.width = Width + "rem";
    },
    clearActive(){
        let all = document.querySelectorAll('.lott-content-list>.active');
        for(let i=0,len=all.length;i<len;i++){
            all[i].classList.remove('active');
        }
    },
    //重置
    clearSelectList(){
      this.selectList2 = [];
      this.chipsJE = 1;
      this.selectNum = 0 ;
      this.selectList3 = [] ;
      this.selectArr=[];
      this.selectNameArr=[];
      // this.selectList4 = [] ;
      this.chouma = false;
      this.chipsIndex = 0;
      this.isMess = false;
      this.clearActive();
      // this.quizTypeId = 1;//默认余额
    },
      //余额竞猜
    submitBetOver(){
        if(this.isCombo&&this.currId!=8&&this.currId!=5&&this.currId!=14){
            let all = document.querySelectorAll('.lott-content-list>.active');
            if(!this.chipsJE) {
                this.$vux.toast.text('未选择投注金额，请选择后再提交', 'middle');
            }else if(this.chipsJE < 1){
              this.$vux.toast.text('请输入≥1的整数', 'middle');
              // console.log(">10")
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
            if(this.selectList3 == [] || this.selectList3.length == 0 || !this.chipsJE){
                this.$vux.toast.text('未选择任何玩法或投注金额，请选择后再提交', 'middle');
            }else if(this.chipsJE < 1){
             this.$vux.toast.text('请输入≥1 的整数', 'middle');

             }else if(this.chipsJE > 999999999){
              this.$vux.toast.text('请输入小于999999999的整数', 'middle');
            }
             else if(this.selectDiamond > this.amount){
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
            }            else if(this.nextEndTime <= 0 ){
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
                // this.isMess = true;
    },

    //玩法切换
    wfChangeTab(index,v){
      this.currBTabName = v.play_unit_name;
      this.isCombo = v.play_unit_data[0].play_sec_combo;
      this.comboType = v.play_unit_data[0].play_sec_cname;
      this.playClassList = this.palyUnit[index].play_unit_data[0].play_sec_data;
      // this.secName = this.playSecList[0].play_sec_cname;
      this.secName = v.play_unit_data[0].play_sec_cname;
      // console.log(v.play_unit_data[index].play_sec_cname)
      this.tabIndex = index ;
      this.playSecList = this.palyUnit[index].play_unit_data;
      this.wfIndex = 0 ;
      this.clearSelectList();
      this.currTabData = v.play_unit_data[0];

    },
    wfChange(index,v){
      this.wfIndex = index ;
      this.currTabData = v;   
      if(this.isCombo || this.currBTabName=='单码'){
          this.clearSelectList();
      }
    
      // if(this.currBTabName!='快捷'&&this.currBTabName!='整合'){
      //   this.clearSelectList();
      // }
      if(this.currBTabName == "连码" ){
        this.clearSelectList();
      }
      if(this.currId==8 || this.currId==5||this.currId==14){
        this.clearSelectList();
      }

      this.secName = this.playSecList[index].play_sec_cname;
      console.log(this.secName)
      this.playClassList = v.play_sec_data;
      this.isCombo = v.play_sec_combo;
      this.comboType = v.play_sec_cname;
    },
    chipsChange(index,num){
      // if(num <= this.selectDiamond){
      //   this.chipsJE =  num ;
      //   this.chipsIndex = index;
      // }
      this.chipsIndex = index;
      this.chipsJE =  num ;
      this.selectDiamond = this.chipsJE * this.selectNum;
      this.selectList3.forEach((value , index) => {
      	value['play_bet_sum'] = this.chipsJE;
      })
      // this.selectList3.push({
      //   play_bet_sum:this.chipsJE
      // })
    },
    PickerShow(){
      this.pickershow = true;

    },
    pickerconfirm1(i){
    //  this.valueId = i[0].lottery_id;
    //  console.log(this.valueId)
     // this.lotteryValue = i[0].label;

    },
    // 切换彩种
    confirm(val){
      this.getOneNumber(val[0].lottery_id);
      this.getHistoryList(val[0].lottery_id);
      this.getPlayList(val[0].lottery_id);
      this.currId = val[0].lottery_id;
      this.valueId = val[0].lottery_id;
      this.lotteryValue = val[0].label;
      this.logoUrl = val[0].logoUrl;
      this.isMess = false;
      this.clearSelectList();
      this.wfIndex = 0 ;
      this.tabIndex = 0;
      this.isCombo = 0 ;
      this.palyUnit = [];
      this.playClassList = [];
      // this.quizTypeId = 1;
      // this.$emit('czID',val[0].lottery_id);
      // localStorage.setItem('CMID',val[0].lottery_id);
      this.SETCZID(val[0].lottery_id);
      this.showZS = false;
      this.currSelectBall = [];
      this.xsSelectBall = [];
    },
    //Ghi chép cá cược 
    showTzRecord(){
      this.TzRecord = true;
    },
    showTool(){
        this.isTool = true;
        console.log( this.valueId)
        console.log(this.lotteryId)
        this.showZS = false;
    },
    closeTool(data){
          this.isTool = false;
    },
  quizType(index){
      //console.log(index);
      this.quizTypeId= index;
      this.GETISYUE(this.quizTypeId);

  },
    //玩法列表
    getPlayList(id){
        this.$http.get("/forum/guess/play_list",{
          params:{
            lottery_id:id || this.valueId,
            client_type:1
          }
        }).then(res=>{
          if(res && res.data.code==1){
            this.palyUnit = res.data.data;
            this.playSecList = res.data.data[0].play_unit_data;
            this.playClassList = res.data.data[0].play_unit_data[0].play_sec_data;
            // this.playClassList = res.data.data[0].play_unit_data;
            this.secName = res.data.data[0].play_unit_data[0].play_sec_cname;
            this.currBTabName = res.data.data[0].play_unit_name;
            this.playOptions = res.data.data[0]; //二字定位
            // this.secName1 = res.data.data[0].play_unit_data[0].play_sec_name;
            // this.secondDW = 
            this.playList.palyUnit = this.palyUnit;
            this.playList.playSecList = this.playSecList;
            this.playList.playClassList = this.playClassList;
            this.playList.secName = this.secName;
            this.playList.currBTabName = this.currBTabName
            // console.log(this.playList);
            // console.log(this.playSecList);

            // console.log(this.playClassList);
            //play_unit_data   play_sec_data
          }
        })
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


      // this.$http.get('/forum/guess/play_sum_list').then(res=>{
      //   if(res && res.data.code == 1){
      //     this.chipsNum = res.data.data;
      //   }
      // })
    },
      removeAllactive(allA) {
          for (let i = 0, len = allA.length; i < len; i++) {
              allA[i].classList.remove('active');
          }
      },
      getSiblings(elm) {
          var a = [];
          var p = elm.parentNode.children;
          for (var i = 0, pl = p.length; i < pl; i++) {
              if (p[i] !== elm) a.push(p[i]);
          }
          return a;
      },
    selectClick(i,v,e,name){
        console.log(v);
        if(this.currBTabName=='连码'||this.currBTabName=='连肖连尾'||this.currBTabName == '合肖'||this.currBTabName == '自选不中'|| this.currBTabName == '组选三'||this.currBTabName == '组选六'){
            let curr = e.currentTarget;
            let maxL = this.currTabData.play_sec_max;
            let minL = this.currTabData.play_sec_min;
            let index;
            let orders_temp;
            let orders_temp_name;
            console.log(this.currTabData);
            index = this.selectArr.findIndex((res) => res == v.play_class_name);
            if(curr.className.indexOf('active')>-1){
                curr.classList.remove('active');
                this.selectList2.splice(index,1);
                this.selectList3.splice(index,1);
                this.selectArr.splice(index,1);
                this.selectNameArr.splice(index,1);
            }else{
                if(this.currTabData.play_sec_combo==1&&this.selectNameArr.length>=maxL){
                    this.$vux.toast.text('当前玩法最多选择'+maxL+'个号码', 'middle');
                    return;
                }
                curr.classList.add('active');
                this.selectList2.push(e);//控制选中样式
                this.selectArr.push(v.play_class_name);
                this.selectNameArr.push(v.play_class_cname);
            }
            console.log(this.selectArr);
            if(this.currBTabName == '自选不中'||this.currBTabName == '合肖'||this.currBTabName == '组选六'||this.currBTabName == '组选三'){
                if(this.selectArr.length>=minL){
                     let arr= [
                        {
                            play_sec_cname:(this.currBTabName == '组选三'||this.currBTabName == '组选六')?this.currBTabName+' '+this.selectArr.length:this.currBTabName,
                            play_sec_name:this.currTabData.play_sec_options[0].play_sec_name,
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
                // console.log(this.selectArr,minL+'1111111111111')
                // console.log(this.selectNameArr,minL+'222222222')
                orders_temp = getRank(this.selectArr,minL);
                orders_temp_name = getRank(this.selectNameArr,minL);
                // this.selectNum = orders_temp.length;
                if(orders_temp_name.length){
                    let a = [];
                    let a2 = [];
                    for(let i=0,len=orders_temp_name.length;i<len;i++){
                        a.push({
                            play_sec_cname:this.currBTabName == '连肖连尾'?this.currTabData.play_sec_cname:this.currTabData.play_sec_options[0].play_class_cname,
                            // play_sec_name:this.palyUnitName == '连肖连尾'?v.play_sec_name:vBig.play_sec_options[0].play_sec_name,
                            play_sec_name:this.currBTabName == '连肖连尾'?this.currTabData.play_sec_merge_name:this.currTabData.play_sec_options[0].play_sec_name,
                            play_class_name:orders_temp[i],
                            play_class_cname:orders_temp_name[i],
                            play_odds:this.currBTabName == '连肖连尾'?v.play_odds:this.currTabData.play_sec_options[0].play_odds,
                            play_bet_sum:this.chipsJE
                        });
                        a2.push({
                            play_sec_name:this.currBTabName == '连肖连尾'?this.currTabData.play_sec_merge_name:this.currTabData.play_sec_options[0].play_sec_name,
                            play_class_name:orders_temp[i],
                            play_odds:this.currBTabName == '连肖连尾'?v.play_odds:this.currTabData.play_sec_options[0].play_odds,
                            play_bet_sum:this.chipsJE
                        });
                    }
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
        }else if(this.currBTabName == '二字定位'||this.currBTabName == '三字定位'){
            if(e.currentTarget.className.includes('active')){
                   e.currentTarget.classList.remove('active');                                 
                }else{
                    e.currentTarget.classList.add('active');
             }
              this.doData();
                
        }else{
            //正常玩法
            if(e.currentTarget.className.includes('active')){
                e.currentTarget.classList.remove('active');
            }else{
                e.currentTarget.classList.add('active');
                if(this.currBTabName=='单码'){
                    this.removeAllactive(this.getSiblings(e.currentTarget));
                }
            }

            this.chouma = true;
            // if(this.quizTypeId != this.isYue ){
            //     this.quizTypeId = this.isYue;
            // }
            if(this.currBTabName=='单码'){
                if(e.currentTarget.className.includes('active')){
                    this.selectList2 = [i];
                    this.selectList3 = [{
                        play_sec_cname:name||this.secName,
                        play_sec_name:v.play_sec_name,
                        play_class_id:v.play_class_id,
                        play_class_name:v.play_class_name,
                        play_class_cname:v.play_class_cname,
                        play_odds:v.play_odds,
                        play_bet_sum:this.chipsJE
                    }]
                }else{
                    this.selectList2 = "";
                    this.selectList3 = [];
                }

            }else{
                let index = this.selectList3.findIndex((value,index)=>{
                    return value.play_class_id == v.play_class_id
                })
                if(index==-1){
                    this.selectList2.push(i);
                    this.selectList3.push({
                            play_sec_cname:name||this.secName,
                            play_sec_name:v.play_sec_name,
                            play_class_id:v.play_class_id,
                            play_class_name:v.play_class_name,
                            play_class_cname:v.play_class_cname,
                            play_odds:v.play_odds,
                            play_bet_sum:this.chipsJE
                        }
                    );
                }else{
                    this.selectList2.splice(index,1);
                    this.selectList3.splice(index,1);
                }
            }
            if(this.selectList2 == ""){
                this.chouma = false;
            }
            this.playList.selectList3 = this.selectList3;
            this.selectNum = this.selectList3.length;
            this.selectDiamond = this.chipsJE * this.selectNum;
            console.log(this.selectList3)
        }

    },
     doData(){
          console.log(this.playSecList[this.wfIndex])
          let one = document.querySelectorAll('.lott1 .playNan.active');
          let two = document.querySelectorAll('.lott2 .playNan.active');
          let three;
          if(this.currBTabName == '三字定位'){
              three = document.querySelectorAll('.lott3 .playNan.active');
          }
          let arr = [];
          if(this.currBTabName == '二字定位'&&one.length&&two.length){
              for(let i=0,len=one.length;i<len;i++){
                  for(let j=0,lenj=two.length;j<lenj;j++){
                      let s = ''
                      s = one[i].dataset.pcname+','+two[j].dataset.pcname;
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

              console.log(arr)
          }else if(this.currBTabName == '三字定位'){
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
      //组合玩法选择
    selectClickCombo(e,v){
        let curr = e.currentTarget;
        let sum = 0;
        let maxSum = 0; //最多选几个
        let maxTip = "";//超过提示
        if(this.comboType == '二中二'){
            maxSum = 2;
            maxTip = "二中二最多选2个号码";
        }else if(this.comboType == '三中三'){
            maxSum = 3;
            maxTip = "三中三最多选3个号码";
        }
        if(curr.className.indexOf('active')>-1){
            curr.classList.remove('active');
            sum = document.querySelectorAll('.lott-content-list>.active').length;
            if(sum<maxSum){
                this.chouma = false;
                this.selectNum = 0;
            }
        }else{
            curr.classList.add('active')
            sum = document.querySelectorAll('.lott-content-list>.active').length;
            if(sum==maxSum){
                this.chouma = true;
                
                // if(this.quizTypeId != 0 ){
                //   this.quizTypeId = 1;
                // }else{
                //   this.quizTypeId = 0;
                // } 
                // if(this.quizTypeId != this.isYue ){
                //   this.quizTypeId = this.isYue;
                // }
                // else{
                //   this.quizTypeId = 1;
                // }  
                this.selectNum = 1;
            }else if(sum>maxSum){
                this.$vux.toast.text(maxTip, 'middle');
                curr.classList.remove('active');
            }else{
                curr.classList.add('active');
                this.chouma = false;
                this.selectNum = 0;
            }
        }
    },
    Confirmbet(id){
        let limit = 1;
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
          let issue = '';
          if(this.isCombo || this.currId==5||this.currId==14) {
              console.log(2);
              issue = this.betIssue;
          }else{
              console.log(2)
              issue = this.selectList2.length?this.betIssue:this.followOrders.play_bet_issue;
          }
          console.log(issue);
          let shareObj = {
              lottery_cid:this.lotteryValue,
              play_bet_lottery_id:this.currId,
              play_bet_issue:issue,
              order_detail:this.selectList3,
              // isBalance:this.quizTypeId
              is_bl_play:this.quizTypeId
          }
        let dataObj ={}
        // if(this.quizTypeId == 0){ //钻石投注
        //     dataObj = {
        //         play_bet_lottery_id:this.currId,
        //         play_bet_issue:issue,
        //         order_detail:JSON.stringify(this.selectList3),
        //         play_bet_follow_user: this.orderMode,
        //         is_bl_play:this.quizTypeId
        //         // is_bl_play:0
        //     }

        //   }else{ //余额投注
        //     //console.log(this.quizTypeId);
        //     dataObj = {
        //         play_bet_lottery_id:this.currId,
        //         play_bet_issue:issue,
        //         order_detail:JSON.stringify(this.selectList3),
        //         play_bet_follow_user: this.orderMode,
        //         is_bl_play:this.quizTypeId  //为1
        //         // is_bl_play:1  //为1
        //     }

        //   }
        dataObj = {
                play_bet_lottery_id:this.currId,
                play_bet_issue:issue,
                order_detail:JSON.stringify(this.selectList3),
                play_bet_follow_user: this.orderMode,
                is_bl_play:1  //为1
                // is_bl_play:1  //为1
            }
        console.log(dataObj);
        if(this.isBetting) return
            this.isBetting = true;
        this.$http.post("/forum/guess/play_bet",{datas:this.encrypt(dataObj)
        }).then(res=>{
          this.isBetting = false;
            this.$vux.loading.hide();
            //下注成功
            //console.log(res);
            if(res.data.code==1){
                //更新钻石
                this.zsQuest();
                //更新余额
                this.balance();
                if(this.userType==1){
                    //如果是主播本播 1
                    this.$vux.confirm.show({
                        content:'投注成功',
                        confirmText:"分享方案",
                        cancelText:'Xác nhận',
                        onCancel : () => {
                            this.isMess = false;
                            this.clearSelectList();
                        },
                        onConfirm : () => {
                            this.isMess = false;
                            this.clearSelectList();
                            //去分享
                            this.$emit('func',shareObj)
                        }
                    });
                }else{
                    //如果不是主播本播
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
                }

            }else if(res.data.code==1012){

              this.$vux.confirm.show({
                        content:'您的余额不足，请充值',
                        confirmText:"Xác nhận",
                        onCancel : () => {
                        },
                        onConfirm : () => {
                            // this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}}) //充钱
                            // this.$router.push("/member");
                            this.$router.push("/withdrawalTopUp/1");
                        }
                    });
                // if(this.quizTypeId  == 0){
                //     this.$vux.confirm.show({
                //         content:'您的钻石不足，请兑换钻石',
                //         confirmText:"Xác nhận",
                //         onCancel : () => {
                //         },
                //         onConfirm : () => {
                //             // this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}}) //充钱
                //             this.$router.push("/member");
                //         }
                //     });
                // }else{
                //     this.$vux.confirm.show({
                //         content:'您的余额不足，请充值',
                //         confirmText:"Xác nhận",
                //         onCancel : () => {
                //         },
                //         onConfirm : () => {
                //             // this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}}) //充钱
                //             // this.$router.push("/member");
                //             this.$router.push("/withdrawalTopUp/1");
                //         }
                //     });
                // }

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


        }).catch(res=>{
          this.isBetting = false;
        })
      }
    },
    //滑动
    touchstart(e){
        // if(this.currBTabName == '连码'||this.currBTabName == '自选不中'||this.currBTabName == '连肖连尾'||this.currBTabName == '合肖') return
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
     //判断当前是否有滑块处于滑动状态
    checkSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0 ; i < listItems.length ; i++){
            if( listItems[i].dataset.type == 1 ) {
                return true;
            }
        }
        return false;
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
    chuangJE(index,e){
      this.selectList3[index].play_bet_sum = e ;
      let totalNum = 0;
      for(let i = 0, len = this.selectList3.length; i < len; i++) {
          totalNum  +=  parseInt(this.selectList3[i].play_bet_sum);
      }
      this.totalNum = totalNum;
      // console.log(this.selectList3);


    },
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
        top:10rem;
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
                    color: #FF3131;   
                    background: #FFEBE7;
                    font-weight: bold;
                    border:1px solid #FF3131;
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
                       color: #FF3131;
                        background: #FFEBE7;
                        font-weight: bold;
                        border: 1px solid #FF3131;
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
                background: linear-gradient(90deg, #FF3131, #FF7E66);
                margin-left: .3rem;
           }
       }
    }
  .pl-color{
    color: #FF3131!important;
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
  #tzMain{
    // background: #F5F7FA;
    .lottery-container{
      background: #F5F7FA;
    }
    .tz-tit{
      background: #fff;
      // width: 94.666%;
        position: absolute;
        width: 100%;
        // top:6.7rem;
        z-index: 999;
      padding: 0 0.27rem;
      height: 1.2rem;
      line-height: 1rem;
      color: #445779;
      border-bottom: 1px solid #fff;
      .lottery-cz{
        // color: #445779;
        .rem(font-size,28);
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
          margin: 0.46rem 0 0 0.15rem;
          width:8px ;
          height: 5px;
          background: url('../../assets/images/chat/lott-min.png')no-repeat;
          background-size: contain;
        }
        .lotteryValue{
          font-weight: bold;
        }
      }
      .lottery-rig{
        color: #445779;
        .rem(font-size,28);
        span:nth-last-child(1){
          margin-left: 0.67rem;
        }
      }
    }
    .lott-record{
            .see-more{
            display: inline-block;
            .rem(width,45);
            .rem(height,60);
            background: url(../../assets/images/x@2x.png) no-repeat right center;
            background-size: 80%;
            position: absolute;
            top:1.3rem;
            right:.1rem;
        }
        .see-more-up{
            display: inline-block;
            .rem(width,45);
            .rem(height,60);
            background: url(../../assets/images/s@2x.png) no-repeat right center;
            background-size: 80%;
        }
      background: #fff;
      // width: 92%;
      // margin: 0 auto;
        //position: absolute;
        //top:7.7rem;
       // z-index: 999;
        width: 100%;
      padding: 0 0.2rem;
      color: #445779;
        border-top: 1px solid #eee;
        border-bottom: 10px solid #F5F7FA;
      /*margin-bottom: 0.28rem;*/
      .lott-bt{
          padding-top: 0.4rem;
         .rem(font-size,24);
         .kj-issue{
           font-family: number1;
           .rem(font-size,24);
           font-weight: bold;
           max-width: 4.3rem;
           overflow:hidden; //超出的文本隐藏
           text-overflow:ellipsis; //溢出用省略号显示
           white-space:nowrap; //溢出不换行
         }
         .djs,.djs1{
           width: 40%;
           position: relative;
           color:#445779;
           .lottery-music{
             display: inline-block;
            width: 0.4rem;
            height: 0.38rem;
            background: url('../../assets/images/chat/open-music.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 0.05rem;
            right: -1%;
           }
           .close-music{
            background: url('../../assets/images/chat/close-music.png') no-repeat;
            background-size: 100% 100%;
           }
         }
         .djs1{
           width: 65%;
         }
         i{
            font-family: number1;
            font-weight: bold;
            color: #445779;
            .rem(font-size,24);
            margin-left: 1%;
         }
      }
      .lott-num{
        padding-top: 0.42rem;
        padding-bottom: 0.1rem;

        // margin: 0.42rem 0 0.4rem 0;
        span{
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          margin-right: 0.13rem;
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
    }
    .lott-play{
      background-color: #fff;
      // padding: 0 0.27rem;
      // padding-bottom: 0.4rem;
        width: 100%;
        //position: absolute;
        //top:10.8rem;
       // z-index: 999;
      .play-tab{
        // margin-bottom: 0.27rem;
        padding-bottom: 0.27rem;
        .play-tab-con{
            height: 1.08rem;
            line-height: 1.08rem;
            display: flex;
            span{
              flex: 1;
              text-align: center;
            }
        }
        .play-tab-con1{
            height: 1.08rem;
            line-height: 1.08rem;
            // display: flex;
            span{
              // flex: 1;
              text-align: center;
            }
        }
        span{
          .rem(font-size,32);
          color: #6A86B9;
          display: block;
          // padding: 0 0.25rem;


          &.wmSpan{
            // padding: 0 0.8rem;
            padding: 0 0.25rem;
          }
          &.smSpan{
            // padding: 0 0.54rem;
          }
          &.active{
            color: #1486FF;
            position: relative;
            &:before{
              position: absolute;
              content: "";
              left: 50%;
              transform: translateX(-50%);
              bottom: 0;
              height: 3px;
              width: 20px;
              border-radius: 10px;
              background-color: #1486FF;
            }
          }
        }
      }
      .play-List{
        overflow: hidden;
        margin: 0 0.4rem;
        padding-bottom: 0.4rem;
        .play-wf{
          height: 0.68rem;
          overflow: hidden;
          span{
            .rem(font-size,24);
            height: 0.68rem;
            line-height: 0.68rem;
            display: block;
            padding: 0 0.4rem;
            border-radius: 100px;
            background-color: #F6F7FB;
            margin: 0 0.138rem;
            &:nth-child(1){
              margin: 0 0.138rem 0 0;
            }
            &.active{
              background: #DCE8FB;
              color: #1486FF;
            }
          }
        }
      }
    }
    .lott-content{
      .wf-list{
        .secName-tit{
          text-align: center;
          .rem(font-size,28);
          font-weight: bold;
          margin-bottom: 0.4rem;
          // margin-top: 0.4rem;
        }
        &:nth-child(1){
          padding-top: 0.4rem;
        }
        &:nth-last-child(1){
          padding-bottom: 0.4rem;
        }
        .fc3D-bw,.fc3D-bw2{
          background: #fff;
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
      }
      .lott-content-list{
        padding: 0.4rem;
        padding-top: 0;
        // padding-bottom: 0;
        &.pdb-none{
          padding-bottom: 0;
        }
        &.pdt-none{
          padding-top: 0;
        }
        &.fc3D,&.fc3D-20{
          width: 33%!important;
          .active{
            background: #FFECE8;
            color: #FF513E!important;
            border: 1px solid #FF3131;
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
        &.fc3D-ZX{
          .active{
            background: #FFECE8;
            color: #FF513E!important;
            border: 1px solid #FF3131;
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
        }
        &.fc3D-20{
          width: 50%!important;
        }
        .playNan{
          background-color: #fff;
          border-radius: 5px;
          overflow: hidden;
          height: 1.333rem;
          width: 1.5222rem;
          text-align: center;
          margin-right: 0.39rem;
          margin-bottom: 0.4rem;
          &.lhc-w25{
            // width: 2rem;
            .rem(width,150);
            margin-right: 0.39rem!important;
            &:nth-of-type(4n){
              margin-right: 0!important;
            }
          }
          &.lhc-w20{
            // width: 2rem;
            .rem(width,200);
            margin-right: 0.39rem!important;
            &:nth-of-type(4n){
              margin-right: 0!important;
            }
          }
          &.lhc-w24{
            // width: 2rem;
            .rem(width,200);
            margin-right: 0.39rem!important;
            &:nth-of-type(3n){
              margin-right: 0!important;
            }
          }
          &.lhc-w55 {
            // width: 2rem;
            // .rem(width,320)!important;
            width: 48% !important;
            // margin-right: 0.39rem!important;
            margin-right: 4% !important;
            &:nth-last-child(1){
              margin-right: 0!important;
            }
          }
          &.lhc-w21{
            .rem(width,200);
            margin-right: 0.39rem!important;
          }
          &.lhc-w50{
            .rem(width,330);
            margin-right: 0.39rem!important;
            &:nth-of-type(2n){
              margin-right: 0!important;
            }
          }
          &.lhc-w33{
            .rem(width,150);
            margin-right: 0.39rem!important;
            &:nth-of-type(3n){
              margin-right: 0!important;
            }

          }
          &.lhc-w50{
            .rem(width,150);
            margin-right: 0.39rem!important;
            &:nth-of-type(2n){
              margin-right: 0!important;
            }

          }
          &.active{
            background: #FFECE8;
            color: #FF513E!important;
            border: 1px solid #FF3131;
            padding: -1px;
            // box-sizing: border-box;
            span{
              color: #FF513E!important;
              font-weight: bold;
            }
          }
          // &:nth-of-type(5){
          //   margin-right: 0;
          // }
          // &:nth-of-type(10){
          //   margin-right: 0;
          // }
          // &:nth-of-type(15){
          //   margin-right: 0;
          // }
          // &:nth-of-type(20){
          //   margin-right: 0;
          // }
          &:nth-of-type(5n){
             margin-right: 0;
          }
          >span{
            display: block;
            &.playNan-1{
              padding-top: 0.15rem;
              .rem(font-size,28);
              color: #445779;
              margin-bottom: 0.1rem;
              .lhc-ball{
                width: 0.54rem;
                height: 0.54rem;
                color: #fff;
                background: linear-gradient(0deg, #88CFFA, #3175F6);
                border-radius: 50%;
                display: block;
                margin: 0 auto;
              }
              .lhc-sx{
                background: linear-gradient(180deg, #4DA1FF, #78DCFF);
                // margin: 0.3rem auto 0;
                // padding-top: 0.4rem;
              }
            }
            &.playNan-2{
              .rem(font-size,24);
              
            }
          }
        }
      }
    }
    .lott-dw-list{
      .min-title{
        width: 100%;
        .rem(height,60);
        .rem(line-height,60);
        background: #fff;
        overflow: hidden;
        margin-bottom: 0.4rem;
        span{
          .rem(font-size,24);
          color: #445779;
          text-align: center;
          float: left;
          border-right: 2px solid #F5F7FA;
          &.w50{
            width: 50%;
          }
          &.w33{
            width: 33.333%;
          }
        }
      }
      .lott-content-list{
        >div{
          &.mr39{
            margin-right:0.39rem!important;
          }
          &.mr2{
            margin-right:0.2rem!important;
          }
        }
        .playNan{
          margin-right:0!important;
          .rem(padding-top,30);
          &.w50{
            .rem(width,330) !important;
          }
          &.w33{
            .rem(width,220) !important;
          }
          .lhc-sx{
            display: inline-block;
            .rem(width,40);
            .rem(height,40);
            .rem(line-height,40);
            color: #fff;
            text-align: center;
            background: linear-gradient(180deg, #4DA1FF, #78DCFF);
            border-radius: 50%;
          }
          &.active{
            .lhc-sx{
              background: linear-gradient(180deg, #FF3131, #FF8188);
            }
          }
        }
      }
    }
    .Confirm-bet{
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
    }
    .foo-submit{
      padding: 0 0.28rem;
      border-top: 1px solid #eee;
      width: 100%;
      position: fixed;
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
          background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
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
          background: linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
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
        position: fixed;
        bottom: 1.34rem;
        left: 0;
        .rem(font-size,24);
        padding-bottom: 0.4rem;
        width: 100%;
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
                color: #1486FF;
              }
            }
          }
        }
      }
    }
  }
  .record{
    /*position: fixed;*/
    /*z-index: 100000;*/
    /*top: 6.7rem;*/
    /*left: 0;*/
    background: #fff;
    height: 100%;
      width: 100%;
  }
  .record-title{
    height: 1.34rem;
    line-height: 1.34rem;
    // color: #445779;
    color: #445779;
    text-align: center;
    font-weight: bold;
    .rem(font-size,32);
    border-bottom: 1px solid #eee;
    position: absolute;
      width: 100%;
      // top: 6.6rem;
      z-index: 999;
      background: #fff;
    .record-icon{
        position: absolute;
        width: 8px;
        height: 12px;
        left: 0.4rem;
        top: 0.5rem;
        background: url('../../assets/images/chat/fanhui.png')no-repeat;
        background-size: contain;
    }
}
.vue-picker .left .btn{
  color: #333!important;
}
.jc-tool{

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
  #tzMain .foo-submit .diamond i.refurbish{
      position: absolute;
      /*display: inline-block;*/
      width: 0.36rem;
      height: 0.36rem;
      background: url('../../assets/images/member/sx_icon.png') no-repeat;
      background-size: 100% 100%;
      /*margin-top: 0.48rem;*/
      /*margin-left: .2rem;*/
      top: 0rem;
      right: -0.6rem;
  }


</style>