<template>
    <div id="xz" :class="[{'xzTab-pink':skin==1},{'xzTab-blue':skin==2},{'xzTab-green':skin==3},{'xzTab-maingreen':skin==4},{'xzTab-golden':skin==5}]">
       <header :class="skin==5?'goldenHeader':''">
         <i class="return-icon" @click="$router.push('/')"></i>
         <div class="title"  >
          <!-- hahah -->
          {{currLottery.vname}}
           <!-- <i class="title-down" @click="goGamePlay(currLottery)"   :class="showTitle == true ? 'title-up':''"></i> -->
           <i class="title-down" @click="showAllLottery=!showAllLottery;showTitle=!showTitle" :class="showTitle == true ? 'title-up':''"></i>
           <i class="lt-icon"  @click="goChat()"></i>
          <i class="quick-icon" @click="isQuickMenu=true"></i>
         </div>
       </header>
       <myScroll ref="scrollWrapper" :top="1.18" :bottom="3.65" :bgColor="skin==5?'1F252C':'F3F4F5'">
       <div class="content">
         <!-- 开奖部分 -->
          <div class="kj">
           <div class="wx-tip clearfix">
             <div class="fl">
              <!--<span class="fl"  style="line-height: 0.75rem;">{{currLottery.vname}}</span>-->
               <div class="czlb fl" style="margin-left:5px;" >
                  <div class="cz-name" :class="[{'skin-border-b-pink':skin==1},{'skin-border-b-blue':skin==2},{'skin-border-b-green':skin==3},{'skin-border-b-maingreen':skin==4}]" @click="showTitle = !showTitle"> <!--{{currLottery.vname}} -->
                  {{is_merge?hbName:currData.name}}
                   <i class="icon fr"></i></div>
               </div>
             </div>
              <!-- pk3的 下一期的期数-->
             <div class="fr next-issue-mess" v-if="cid>=45&&cid<=50">
                <div class="next-issue">{{xzIssueMess.issue}}</div>
                <div class="fr countdown-time">{{djsTime}}</div>
             </div>
             <div class="fr " v-else  :class="showDate== true ?'up-icon':'down-icon'" @click="showDate = !showDate;showTitle=false;"></div>
             <!-- showDate?showList=true:showList=false -->
            
           </div>
           <div class="kj-rq clearfix">
             
             <!-- pk3 显示当前期数开奖结果-->
             <div v-if="cid>=45&&cid<=50">
                 <div class="fl" v-if="currOpend.headsubprize.length"   @click="isPk3Kj=true">{{currOpend.issue}} 
                   <i class="open-num" :class="'num'+v" v-for="(v,index) in currOpend.headsubprize[0].split(',')" ></i> 
                   <span class="more-pk3"></span></div>
                <i class="tips-icon" @click="showDW=true"></i>
             </div>
             
             <div v-else>
                <div class="fl" >{{$t('xz.text[0]')}} <i class="curr-date">{{xzIssueMess.belong_date}} / {{xzIssueMess.issue}}</i></div>
             <div class="fr countdown-time">{{djsTime}}</div>
             </div>

           </div>
           <!-- 更多开奖日期 -->
            <div class="more-time" v-if="showDate">
              <span>{{$t('xz.text[1]')}}</span>
              <ul>
                <li v-for="(item,dateindex) in lastOpenData" :key="dateindex" @click="changeOpenData(dateindex)">
                 {{item.belong_date}}/{{item.issue}}
                </li>
              </ul>
              <span class="refer" @click="goMoreResult()">{{$t('xz.text[2]')}}</span>
            </div>
         </div>
         <div class="title-tab clearfix" v-if="!Array.isArray(currData)&&currData.field_modes.length>1">
           <span class="fl " @click="changeTab(index,v.code)" :class="tabIndex == v.code ?'active':''" :key="index" v-for="(v,index) in currData.field_modes">{{v.name}}</span>
         </div>
           <!-- single下注方式多选几个号码 tabIndex==single -->
         <div class="tips" :class="tabIndex == 'single' ?'grey':''" v-if="cid<45">
           <div class="more-num-select fl"  v-if="tabIndex=='direct'&&currData.field_rule=='00-99'">
             00-99 <i class="num-tip">{{bnum}}</i> 
           </div>
           <div class="more-num-select fl"  v-if="tabIndex=='direct'&&currData.field_rule=='00-45'">
             00-45 <i class="num-tip">{{bnum}}</i> 
           </div>
           <div class="more-num-select more-num-select-t fl" @click="showNumSelect()"  v-if="tabIndex=='direct'&&currData.field_rule=='000-999'">
             {{currSingleThird}} <i class="num-tip">{{bnum}}</i> <i class="down-icon"></i>
           </div>
          <p> 
           <span v-if="!Array.isArray(currData)"> 
             {{$t('xz.text[3]')}} <i>1</i> an <i>{{!Array.isArray(currData)?(currData.prize.length==1?currData.prize[0].prize:'--'):'--'}}</i>
             </span>
            <i class="tips-icon" @click="showDW=true"></i></p>
         </div>
           <!-- 复式 -->
         <div class="chouma-list" v-if="tabIndex == 'duplex'">
           <!-- &&currData.field_modes.length>1 -->
           <!-- v-if="!Array.isArray(currData)" -->

        

             <div class="pc2" v-if="(cid>=45&&cid<=50)">
                    <ul class="clearfix"  v-for="item,index in currData.field_def" :key="index" >
                      <li class="fl" @click="selectOneBallZH($event,num,item)" :class="singleSelectNumber.findIndex(v=>{return v.item_code ==num.code})>-1?'active':''"  v-for="(num,numIndex) in item.nums" :key="numIndex" :data-pcode='num.code'>
                        <span>{{num.name}}</span>
                        <span>{{num.code  | filterOdds(currData.prize)}}</span>
                      </li>
                    </ul>
            </div>

            <div class="cm-list clearfix" v-if="!Array.isArray(currData)&&(cid<45)" :class="'lott'+(index+1)" v-for="item,index in currData.field_def" :key="index">
               <div class="list-lf fl">{{item.prompt}}</div>
               <div class="list-r fr clearfix">
                  <div class="list-tab clearfix" >
                    <span class="fl"  @click="changeFast($event,item.code)"  v-for="(item,index) in listTab" :key="index">{{item.name}}</span>
                  </div>
                  <div class="list-content clearfix">
                    <span class="fl" :data-ball="num.code" :data-ballxs="num.name" :data-ws="item.prompt"  @click="checkBall($event)" :data-pcname='num.code' :data-index="numIndex" v-for="(num,numIndex) in item.nums" :key="numIndex">
                      {{num.name}}
                      <i v-if="JSON.stringify(notOpenList)!='[]'"  :class="{'blue-bg':notOpenList[index][num.name]>5&&notOpenList[index][num.name]<10,'orange-bg':notOpenList[index][num.name]>9}">{{notOpenList[index][num.name]}}</i>
                    </span>
                    <!-- <i>1</i> -->
                  </div>
               </div>
            </div>
            
            <div class="pc2" v-if="Array.isArray(currData)">
              <div>
                <div v-for="item,index in currData" :key="index" :data-pcname='item.code'>
                    <p>{{item.name}} </p>
                    <ul class="clearfix" v-for="v,index2 in item.field_def" :key="index2" :data-pcname='v.code'>
                      <li class="fl"  v-for="(num,numIndex) in v.nums" :key="numIndex" :data-wfcode="item.code" :data-pcname='num.code' @click="selectOneBallZH($event,num,item)" :class="singleSelectNumber.findIndex(v=>{return v.item_code ==num.code&&v.play_code ==item.code})>-1?'active':''">
                        <span>{{num.name}}</span>
                        <!-- <span v-if="item.prize.length==0">{{item.prize.length?item.prize[0].prize:'--'}}</span> -->
                        <span>{{num.code | filterOdds(item.prize)}}</span>
                      </li>
                    </ul>
                </div>
              </div>

            </div>
            
          
           
         </div>
         <!-- 输入 -->
         <div class="textarea-warp" v-if="tabIndex == 'single'">
           <textarea  v-if="currBigwf!='combo'&&currBigwf!='lose'" class="play-textarea" v-model="textareaVal" @focus="textareaFocus($event)"
                                @blur="textareaBlur($event)" name="play-textarea" id="" cols="30" rows="10"></textarea>
             <textarea  v-else class="play-textarea" v-model="textareaValToo" @focus="textareaFocus($event)"
                                @blur="textareaBlur($event)" name="play-textarea" id="" cols="30" rows="10"></textarea>
           <div class="play-explain" v-show="showText" @click="textareaFocus()">
             <p v-html="currData.field_desc"></p>
           </div>
         </div>
         <!-- 单选 -->
         <div class="ks-list" v-if="tabIndex == 'direct'">
            <div class="ksxz-list clearfix" >
              <div class="fl" @click="showGameZn=true"><i class="ks-tips"></i>
              <i>{{$t('xz.text[4]')}}</i></div>
              <!-- ['Ngẫu Nhiên','Gợi Ý','Ít Xuất Hiện'] -->
              <div class="fr" v-if="currBigwf=='combo'||currBigwf=='lose'"><span v-for="(v,index) in [$t('xz.text[5]')]" :key="index" :class="quitCurrIndex==index+1?'active':''" @click="quitCurrIndex=index+1;showKJ=true" >{{v}}</span></div>
              <div class="fr" v-else><span v-for="(v,index) in [$t('xz.text[5]'),$t('xz.text[6]')]" :key="index" :class="quitCurrIndex==index+1?'active':''" @click="quitCurrIndex=index+1;showKJ=true" >{{v}}</span></div>
              
            </div>
            
            <div class="lx-tab" >
              <!-- 自选不中 串2 3 4 -->
              <!-- 随机选 quitCurrIndex==1 -->
               <ul class="clearfix"  v-if="quitCurrIndex==1&&showKJ&&(currBigwf=='combo'||currBigwf=='lose')">
                <li class="fl" v-for="(v,index) in [{ num:1,name:$t('xz.text[7]') },]" :key="index" @click="selectRandomOrder(v.num)" :class="currKxNum==v.num?'active':''">{{v.name}}</li>
              </ul>
              <ul class="clearfix"  v-if="quitCurrIndex==1&&showKJ&&(currBigwf!='combo'&&currBigwf!='lose')">
                <li class="fl" v-for="(v,index) in kxTab" :key="index" @click="selectRandomOrder(v.num)" :class="currKxNum==v.num?'active':''">{{v.name}}</li>
              </ul>
              <!-- 建议选 quitCurrIndex==2  双帮、大小单双  -->
              <ul class="clearfix"  v-if="quitCurrIndex==2&&showKJ&&currData.field_rule=='000-999'">
                <li class="fl" v-for="(item,index) in [{ code:'bx', name:$t('xz.text[8]') }]" :key="index" @click="getJyBall(item.code)" :class="currjyTab==item.code?'active':''" >{{item.name}}</li>
              </ul>

              <ul class="clearfix"  v-if="quitCurrIndex==2&&showKJ&&currData.field_rule!='000-999'">
                <li class="fl" v-for="(item,index) in jyTab" :key="index" @click="getJyBall(item.code)" :class="currjyTab==item.code?'active':''" >{{item.name}}</li>
              </ul>
              <ul class="clearfix"  v-if="quitCurrIndex==3&&showKJ">
                <li class="fl" v-for="(item,index) in topNum" :key="index" :class="currTop==item.code?'active':''"  @click="getTopBall(item.code)">{{item.name}}</li>
              </ul>
              <i class="" :class="showKJ == false ?'dn-icon':'up-icon'" @click="showKJ = !showKJ"></i>
            </div>
            <!--  -->
            <div class="kx-list" v-if="(currBigwf=='combo'||currBigwf=='lose')">
              <ul class="clearfix">
                <li class="fl" v-for="ball,index in singleData" :key="index" v-show="currMaxNum.max>=index&&currMaxNum.min<=index" @click="selectOneBall($event,ball)"  :class="{'active':singleSelectNumber.findIndex(v=>{return v.item_code ==ball.code})>-1,'no-active':singleSelectNumber.length==maxComboLen}">{{ball.name}}
                <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'blue-bg':notOpenList[ball.name]>5&&notOpenList[ball.name]<10,'orange-bg':notOpenList[ball.name]>9}">{{notOpenList[ball.name]}}</i>
                </li>
                
              </ul>
            </div>

            <div class="kx-list" v-else>
              <ul class="clearfix">
                <li class="fl" v-for="ball,index in singleData" :key="index" v-show="currMaxNum.max>=index&&currMaxNum.min<=index" @click="selectOneBall($event,ball)" :class="singleSelectNumber.findIndex(v=>{return v.item_code ==ball.code})>-1?'active':''">
                  {{ball.name}}
                  <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'blue-bg':notOpenList[ball.name]>5&&notOpenList[ball.name]<10,'orange-bg':notOpenList[ball.name]>9}">{{notOpenList[ball.name]}}</i>
                </li>
                <!-- <li class="fl active">00<i>4</i></li> -->
              </ul>
            </div>
          </div>
         
          
        </div>
       </myScroll>
       <div class="chouma-box">
         
         <div class="chips-img clearfix">
          
           <span class="fl" :class="'chips-'+(index+1)" v-for="(v,index) in choumaValue" :key="index" @click="addCm($event,v)"></span>
           <div class="fr">
            
             <span>{{$t('xz.text[9]')}}<i>{{bnum}}</i></span>
             <span>{{$t('xz.text[10]')}}<i>{{bnum*chipsJE*mult}}</i></span>
           </div>
         </div>
          
         <div class="chips-total  clearfix">
            
           <div class="chips-left fl">
             <div><input type="text" v-model="mult"/>{{$t('xz.text[11]')}}</div>
             <div>{{amount}} <i class="refresh-icon" @click="loadMoney"></i> </div>
           </div>
           <div class="chips-right fr">
             <span @click="resetFunc()">{{$t('xz.text[12]')}}</span>
             <span @click="goXz()">{{$t('xz.text[13]')}}</span>
           </div>
         </div>
       </div>
       <!-- 导玩 玩法规则-->
       <div class="show-box" v-show="showDW" @click="showDW = false">
          <div class="hint-box">
             <h3>{{hbName?hbName:currData.name}}</h3>
                <span v-html="playRule.content"></span>
             <div class="enter-btn" @click="showDW = false">{{$t('qdText')}}</div>
          </div>
       </div>
       <!-- 游戏指南 -->
        <div class="show-box" v-show="showGameZn">
          <div class="hint-box">
             <h3>{{$t('xz.text[14]')}}</h3>
                <span>
                <i style="color:#1E80FF">{{$t('xz.text[15]')}} </i>{{$t('xz.text[16]')}}
                <br>
                <i style="color:#1E80FF"> {{$t('xz.text[17]')}} </i>{{$t('xz.text[18]')}}
                <br>
                <i style="color:#1E80FF"> {{$t('xz.text[19]')}}</i> {{$t('xz.text[20]')}}
                <br>
                <i style="color:#1E80FF">{{$t('xz.text[21]')}}</i>
               {{$t('xz.text[22]')}}
                </span>
             <div :class="[{'blue-bg':skin==2},{'green-bg':skin==3},{'pink-bg':skin==1}]" class="enter-btn" @click="showGameZn = false">{{$t('qdText')}}</div>
          </div>
       </div>
       <!-- 选择日期编号弹窗 -->
       <div class="show-box" v-show="showNum" >
         <div class="date-box hint-box" id="datebox">
           <h3>{{$t('xz.text[23]')}} </h3>
           <myScroll :top="1" ref="dateScroll" :bottom='5'>
            <ul>
              <li v-for="v,index in selectQx" :key="index" @click="changeSelectNum($event,v)" >
                <span>{{v.title}}</span>
                <span> <i>{{v.num}}</i></span>
                <span></span>
              </li>
              
            </ul>
           </myScroll>
           <div class="bottom-btn clearfix">
             <span class="fl" @click="cancelNumber()">{{$t('xz.text[24]')}}</span>
             <span class="fr" @click="selectOneQx()">{{$t('qdText')}}</span>
           </div>
         </div>
       </div>
       <!-- 切换玩法头部下拉选择菜单 -->
       <!--  -->
       <div class="title-list-box show-box" v-if="showTitle" :class="skin==5?'title-list-box-golden':''">
           <div class="title-list" :class='[{"title-pink":skin==1},{"title-blue":skin==2},{"title-green":skin==3},{"title-maingreen":skin==4},{"title-golden":skin==5}]'>
             <myScroll :top="0" :bottom="4" :bgColor="skin==5?'1F252C':'fff'" ref="menuScroll">
              <div class="sort-list" v-for="(playItem,playIndex) in playGroup" :key="playIndex">
                <span>{{playItem.name}}</span>
                <ul class="clearfix">
                  <li class="fl" v-for="(playCode,codeIndex) in playItem.children" :key="codeIndex" :class="is_merge?(hbName==playCode.name?'active':''):(currData.name==playCode.name?'active':'')" @click="changePlayCode($event,playItem,playCode,codeIndex)">{{playCode.name}}</li>
                </ul>
              </div>
             </myScroll>
           </div>
       </div>

       <!-- 切换头部彩种选择菜单 -->
       <div class="title-list-box show-box allGAme-box" v-if="showAllLottery" :class="skin==5?'title-list-box-golden':''">
          <allGAmeList :fa-cid="cid" />
       </div>


      <!-- pk3开奖弹框 -->
       <div class="pk3-kj" v-if="isPk3Kj">
         <div class="pk3-kj-content" >
           <div class="kj-title">{{$t('xz.text4[0]')}} <i class="remove-btn" @click="isPk3Kj=false"></i></div>
           <div class="total-box clearfix">

             <span class="big"> {{$t('xz.text4[1]')}} {{lastOpenData[0].totalBig}}</span>
             <span class="fr sm">  {{$t('xz.text4[2]')}} {{lastOpenData[0].totalSmall}}</span>
             <span class="odd">  {{$t('xz.text4[3]')}} {{lastOpenData[0].totalOdd}}</span>
             <span class="fr even"> {{$t('xz.text4[3]')}} {{lastOpenData[0].totalEven}}</span>
           </div>
           <div id="pk3-content" v-if="lastOpenData[1].length">
             <myScroll
              :top="3.5"
              :bottom="0"
              :left="0"
            >
              <ul>
                <li v-for="v,index in lastOpenData[1]" :key="index">
                  <span class="open-num" :class="'num'+vv" v-for="vv,index2 in v.code.split(',')" ></span>
                  <span class="num-total">{{v.prize_list.sum[0]}}</span>
                  <span class="num-sx"  :class="[{'da':v.prize_list.size.code=='big'},{'xi':v.prize_list.size.code=='small'},{'da-line':v.prize_list.size.code=='big'&&v.prize_list.size.is_strikethrough==1},{'xi-line':v.prize_list.size.code=='small'&&v.prize_list.size.is_strikethrough==1}]">{{v.prize_list.size.name}}</span>
                  <span class="num-sx"  :class="[{'dan':v.prize_list.parity.code=='odd'},{'su':v.prize_list.parity.code=='even'},{'dan-line':v.prize_list.parity.code=='odd'&&v.prize_list.size.is_strikethrough==1},{'su-line':v.prize_list.parity.code=='even'&&v.prize_list.size.is_strikethrough==1}]" >{{v.prize_list.parity.name}}</span>
                  <span class="num-isuse">{{v.issue}}</span>
                </li>
              </ul>
           </myScroll>
           </div>
           
         </div>
       </div>

       <!-- 开奖弹框 -->
        <div class="kj-box" v-if="showList&&!is_merge" @click="closeBox($event)">
           <div class="kj-list" v-if="currData.code=='h2bd'||currData.code=='h2bd1k'||currData.code=='combo2'||currData.code=='combo3'||currData.code=='combo4'||currData.code=='lose4'||currData.code=='lose8'||currData.code=='lose10'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}} - {{currOpend.issue}}</i></h3>
              <table>
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t('qdText')}}</div>
           </div>
            <div class="kj-list" v-else-if="currData.code=='q2bd'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                <!-- 特别 -->
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index">
                        <span>{{item.substring(0,2)}}</span><i v-if="index>0">-</i>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <!-- 1 -->
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <!-- 2 -->
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!--4 -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--6  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-1,item.length)}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <!-- 7 -->
                  <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <!-- 8 -->
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>
          
           <!--  -->
           <div class="kj-list" v-else-if="currData.code=='h3bd'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>

            <div class="kj-list" v-else-if="currData.code=='dg0h3dg6'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>
            <!--  -->
            <div class="kj-list" v-else-if="currData.code=='h4bd'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-4)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr v-else>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>
            <!--  -->
            <div class="kj-list" v-else-if="currData.code=='dg0h2'||currData.code=='dg0q2'||currData.code=='dg1q2'||currData.code=='dg1h2'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="currData.code=='dg0h2'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="currData.code=='dg0q2'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,item.length-3)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <tr v-if="currData.code=='dg1q2'">
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr v-else-if="currData.code=='dg1h2'">
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <tr v-if="currData.code=='dg7'">
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>

              <!--  -->
            <div class="kj-list" v-else-if="currData.code=='dg0d1'||currData.code=='dg0d2'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="currData.code=='dg0d2'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,3)}}<span>{{item.substring(item.length-2,item.length-1)}}</span>{{item.substring(item.length-1,item.length)}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-if="currData.code=='dg0d1'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,4)}}<span>{{item.substring(item.length-1,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                 <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>


             <!--  -->
            <div class="kj-list" v-else-if="currData.code=='dg6'||currData.code=='dg0h3'||currData.code=='dg1h3'||currData.code=='dg0h4'||currData.code=='dg7'||currData.code=='dg0h3dg7'||currData.code=='dg8'||currData.code=='dg0h2dg8'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="currData.code=='dg0h3'||currData.code=='dg0h3dg7'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,2)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="currData.code=='dg0h4'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,1)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="currData.code=='dg0h2dg8'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-if="currData.code=='dg1h3'">
                      <td>{{$t("xz.kj[3]")}}</td>
                       <td><div v-for="item,index in currOpend.firstprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,2)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr v-if="currData.code=='dg6'">
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-3)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                   <tr v-else>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                 <tr v-if="currData.code=='dg7'|| currData.code=='dg0h3dg7'">
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <tr v-else>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td v-if="currData.code=='dg8'||currData.code=='dg0h2dg8'"><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                       <td v-else><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t('qdText')}}</div>
           </div>






            <!--  -->
             <div class="kj-list" v-else>
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                <!-- 特别 -->
                  <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index">
                        <span>{{item.substring(0,2)}}</span><i v-if="index>0">-</i>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                  <!-- 1 -->
                  <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <!-- 2 -->
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!--4 -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--6  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-1,item.length)}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                  <!-- 7 -->
                  <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}{{item.substring(item.length-2,item.length)}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                  <!-- 8 -->
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t('qdText')}}</div>
           </div>
       </div>

        <div class="kj-box" v-if="showList&&is_merge" @click="closeBox($event)">
            <div class="kj-list">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr>
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.grandprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item.substring(0,3)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                    <tr>
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr>
                      <td>{{$t("xz.kj[4]")}}</td>
                       <td><div v-for="(item,index1) in currOpend.secondprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i>{{item}}</div></td>
                      <td>1</td>
                      <td>{{currOpend.headsubprize[1]}}</td>
                  </tr> 
                  <!--3-5  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[5]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.thirdprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>2</td>
                      <td>{{currOpend.headsubprize[2]}}</td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td>{{currOpend.headsubprize[3]}}</td>
                  </tr>
                  <!-- -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[6]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fourthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>4</td>
                      <td>{{currOpend.headsubprize[4]}}</td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td>{{currOpend.headsubprize[5]}}</td>
                  </tr>
                  <!--  -->
                   <!--  -->
                  <tr>
                      <td  rowspan ="2">{{$t("xz.kj[7]")}}</td>
                      <td  rowspan ="2"><div v-for="item,index in currOpend.fifthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>6</td>
                      <td>{{currOpend.headsubprize[6]}}</td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td>{{currOpend.headsubprize[7]}}</td>
                  </tr>
                  <!--  -->
                  <tr>
                      <td>{{$t("xz.kj[8]")}}</td>
                      <td><div v-for="item,index in currOpend.sixthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>8</td>
                      <td>{{currOpend.headsubprize[8]}}</td>
                  </tr> 
                 <tr>
                      <td>{{$t("xz.kj[9]")}}</td>
                      <td><div v-for="item,index in currOpend.seventhprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>9</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
                   <tr v-if="cid>1&&cid!=37">
                      <td>{{$t("xz.kj[10]")}}</td>
                      <td><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t('qdText')}}</div>
           </div>

         






       </div>

    
       

       <!-- 下注确认弹窗 -->
       <div class="show-box" v-if="isXzComfirm">
         <div class="qr-box">
           <h3>{{currLottery.vname}}  <i>{{currOpend.next_open_date}}</i></h3>
           <div style="padding:.3rem .56rem;background:#fff">
             <span>{{$t('xz.text[51]')}}{{is_merge?hbName:currData.name}}</span>
             <span> </span>
             <div style="display:inline-block">
               <p> {{$t('xz.text[25]')}}</p>
               <!-- &&(!Array.isArray(currData)) -->
              <!-- || (!Array.isArray(currData)&&currData.field_def.length<2) -->
                <!-- 单个号码显示 -->
               <p style="word-break:break-word;max-height: 5rem;overflow-y: auto;padding-top: 0.3rem;" v-if="tabIndex == 'single'||tabIndex == 'direct'&& (!Array.isArray(currData))"><span v-for="v,index in singleSelectNumber" :key="index">{{v.xs_code}}&nbsp;</span></p>
               
               <!-- pk3 -->
                
                <p style="word-break:break-word" class="fl" v-else-if="(cid>=45&&cid<=50)" v-for="v,key in contents.xs" :key="key">
                 <span v-if="key!='undefined'">
                    <i v-for="vv,index in v" :key="index"> {{vv.xs_code}}  <i style="color:#ccc" v-show="v.length>1&&index<v.length-1">/</i>&nbsp;</i>
                 </span>
               </p>
               <!-- 合并的显示 -->
                <p style="word-break:break-word" v-else-if="Array.isArray(currData)" v-for="v,key in contents.xs" :key="key">
                 <span v-if="key!='undefined'">
                      {{key}} 
                    <i style="color:d7524e">-</i>
                    <i v-for="vv,index in v" :key="index">{{vv.xs_code}} <i style="color:#ccc" v-show="v.length>1&&index<v.length-1">/</i>&nbsp;</i>
                    
                 </span>
               </p>

                <!-- 复试显示 -->
               <p style="display:inline-block;word-break:break-word" v-else v-for="v,index in contents.xsOrder" :key="index">
                 <span>{{v}} <i style="color:#d7524e" v-show="contents.xsOrder.length>1&&index<contents.xsOrder.length-1">|</i></span>
               </p>

             </div>
           </div>
           <div style="padding:.3rem .56rem 0 .56rem">
             <div><span> {{$t('xz.text[26]')}} <i>{{bnum}}</i></span><span style="margin-left:0.3rem">{{$t('xz.text[11]')}}：<i>{{mult}}</i></span></div>
             <span> {{$t('xz.text[28]')}}:  <i>{{bnum*chipsJE*mult}}</i> {{$t('moneyDw')}}</span>
             <span v-if="(!Array.isArray(currData)&&currData.prize.length)&&!(cid>=45&&cid<=50)">{{$t('xz.text[29]')}} <i style="color:#FF5640">{{mult*currData.prize[0].prize}}</i> {{$t('moneyDw')}}</span>
             <!-- <span v-else> Tiền thắng /1 lần: <i style="color:#FF5640">{{mult*currData[0].prize[0].prize}}</i> {{$t('moneyDw')}}</span> -->
           </div>
           <div class="clearfix btn-box">
             <div class="fl" @click="isXzComfirm=false">{{$t('xz.text[24]')}}</div>
             <div class="fr" @click="postBet()">{{$t('xz.text[30]')}}</div>
           </div>
         </div>
       </div>

      <!-- 右侧弹窗 -->
      <div class="quickInfo-box" v-if="isQuickMenu" :class="skin==5?'quickInfo-box-golden':''">
        <div class="quick-content">
          <div class="user-info" :class="[{'user-info-pink':skin==1},{'user-info-blue':skin==2},{'user-info-green':skin==3},{'user-info-maingreen':skin==4},{'user-info-golden':skin==5}]">
            <img  class="fl" :src="$store.state.avatar" v-if="$store.state.avatar" alt="">
            <div class="clearfix">
              <span class="name">{{$store.state.username}}</span>
              <span class="money">{{amount}}{{$t('moneyDw')}}</span>
            </div>
            <div class="btn-group">
               <router-link class="home" to="/">{{$t('xz.text[31]')}}</router-link>
               <router-link class="recharge" to="/recharge">{{$t('xz.text[32]')}}</router-link>
            </div>
          </div>
          <ul class="quick-list">
            <li>
              <img src="../../assets/images/ynxz/icon-tradeRecorde.png" alt="">
              <router-link to="/ERecord">{{$t('xz.text[33]')}}</router-link>
            </li>
            <li>
              <img src="../../assets/images/ynxz/icon-betRecord.png" alt="">
              <router-link to="/ERecord?type=1">{{$t('xz.text[34]')}}</router-link>
            </li>
            <li>
              <img src="../../assets/images/ynxz/icon-rule.png" alt="">
              <span @click="goGameRule()">{{$t('xz.text[52]')}}</span>
            </li>
            <li>
              <img src="../../assets/images/ynxz/icon-activity.png" alt="">
              <router-link to="/Activities">{{$t('xz.text[35]')}}</router-link>
            </li>
            <li>
              <img src="../../assets/images/ynxz/icon-skin.png" alt="">
              <span @click="showSkin=!showSkin">{{$t('xz.text[36]')}}</span>
            </li>
          </ul>
          <ul class="skin-list" v-show="showSkin">
            <li v-for="(v,index) in skinList" :key="index"  @click="getselect(index,v.id,v)">
              <img v-lazy="v.cover" alt="">
              <span>{{v.id | filterSkinName(lanCode)}}</span>
            </li>
          </ul>
        </div>
        <div class="quick-close" @click="isQuickMenu=false"></div>
      </div>

       <!-- 切换彩种 -->

    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import { removeAllactive,getSiblings } from "../../assets/js/public"
import L from './controller/lottery';
import allGAmeList from '../game/gameplay.vue'
    export default {
        name: "xz",
        data(){
            return{
              isPk3Kj:false,
        sharePurview:'',
        voicePpurview:'',
        showItemNum:4,
				timeOutEvent:0,
				isClick:true,
				isMute:false,
        isQuickMenu:false,    
              shareOrderNum:'',
             
               tabIndex:'duplex',//顶部tab
               listTabIndex:0,//玩法tab
               numIndex:0,
             
               listTab:[
                 {code:'a',name:this.$t('xz.text[37]')},
                 {code:'b',name:this.$t('xz.text1[0]')},
                 {code:'s',name:this.$t('xz.text1[1]')},
                 {code:'o',name:this.$t('xz.text1[2]')},
                 {code:'e',name:this.$t('xz.text1[3]')},
                 {code:'c',name:this.$t('xz.text1[4]')},
               ],
              
               showDate:false,
               textareaVal:'',//输入号码
               untextareaVal:'',//去重后的号码
               textareaValToo:'',
               showText:true,
               showDW:false,//导玩 规则弹框
               showNum:false,//号码
               currKxNum:'',//当前机选
               kxTab:[],
               kxTab1:[{
                 num:1,
                 name:this.$t('xz.text3[0]')
               },{
                 num:2,
                 name:this.$t('xz.text3[1]')
               },{
                 num:3,
                 name:this.$t('xz.text3[2]')
               },{
                 num:5,
                 name:this.$t('xz.text3[3]')
               },{
                 num:10,
                 name:this.$t('xz.text3[4]')
               },],
               kxTab2:[{
                 num:10,
                 name:this.$t('xz.text3[5]')
               },{
                 num:20,
                 name:this.$t('xz.text3[6]')
               },{
                 num:30,
                 name:this.$t('xz.text3[7]')
               },{
                 num:40,
                 name:this.$t('xz.text3[8]')
               },{
                 num:50,
                 name:this.$t('xz.text3[9]')
               },],
              
              currjyTab:'',
               jyTab:[{
                 code:'bx',
                 name:this.$t('xz.text[38]')
               },{
                 code:'even',
                 name:this.$t('xz.text[39]')
               },{
                 code:'odd',
                 name:this.$t('xz.text[40]')
               },{
                 code:'big',
                 name:this.$t('xz.text[41]')
               },{
                 code:'small',
                 name:this.$t('xz.text[42]')
               }],
               topNum:[{
                 code:'1',
                 name:'Top1'
               },{
                 code:'2',
                 name:'Top2'
               },{
                 code:'5',
                 name:'Top5'
               },{
                 code:'10',
                 name:'Top10'
               },{
                 code:'20',
                 name:'Top20'
               }],
               currTop:0,
               showKJ:true,
               showTitle:false,
               showGameZn:false,//游戏指南

               showPC2:false,//另一种下注方式

               currData:{field_modes:[],prize:[]},//当前选择的玩法数据
               allData:[],//当前大类玩法所有数据
               currOpend:{belong_date:'',next_open_date:'',headsubprize:[]},//当前开奖数据
               djsTime: "--:--",//倒计时
               showList:false,
               lastOpenData:[],//最新默认返回10条记录
               playGroup:[],//玩法组列表
               currBigwf:'',//当前大类玩法 例如  包胆(baodan)
               playRule:[],//玩法规则列表
               playRuleObj:{},//当前玩法内容
               singleData:[],//单选号码
               currLottery:{},//当前彩种信息 传过来了的
               quitCurrIndex:1,// 1随机 2 建议
               currSingleThird:'000-999',//默认
               currSelectNum:{},//暂时存一下
               currMaxNum:{max:99,min:0},
               selectQx:[
                 {max:99,min:0,title:'000-099',num:0},
                 {max:199,min:100,title:'100-199',num:0},
                 {max:299,min:200,title:'200-299',num:0},
                 {max:399,min:300,title:'300-399',num:0},
                 {max:499,min:400,title:'400-499',num:0},
                 {max:599,min:500,title:'500-599',num:0},
                 {max:699,min:600,title:'600-699',num:0},
                 {max:799,min:700,title:'700-799',num:0},
                 {max:899,min:800,title:'800-899',num:0},
                 {max:999,min:900,title:'900-999',num:0},
               ],
               currDirctArr:[],//当前直选号码
                maxComboLen:0,//组合玩法至少最多选中几个  比如 combo

                /*下注的*/
                choumaValue:[10,50,100,200,500],//筹码
                chipsJE:1,//输入框金额
                bnum:0,//注数
                mult:1,//倍数
                scale:"",//赔率
                yjfl:1,//模式 1 10 100 1000
                mode:'duplex',//选号还是输号码 duplex直选号码（组合选） 1输号码 dirct选单个
                bone:1,//每注1 默认（可修改）
                contents:{},//下单详情
                singleSelectNumber:[],//单选选的号码
                amount:'',//用户金额
                totalMoney:2222,//下注总额
                isXzComfirm:false,//下注确认框
                isPost:false,//下注节流阀
                cid:1,//彩种id 通过路由传过来 目前默认1 越南北部彩票
                numXq:{
                  num1:0,
                  num2:0,
                  num3:0,
                  num4:0,
                  num5:0,
                  num6:0,
                  num7:0,
                  num8:0,
                  num9:0,
                  num10:0,
                },
                is_merge:0,
                hbName:'',
                hbCode:'',
                skinList:[{
                  cover: require("../../assets/images/skin/theme-color.png"),
                  id: 0,
                  name: "默认颜色",
                  nameVin:'Màu chủ đề',
                  type: "default",
                  users: 95,
                },{
                  cover: require("../../assets/images/skin/pink.png"),
                  id:1,
                  name: "樱花粉",
                  nameVin:'Màu hoa anh đào',
                  type: "pink",
                  users: 119,
                },{
                  cover: require("../../assets/images/skin/blue.png"),
                  id: 2,
                  name: "水川蓝",
                  nameVin:'Màu xanh lam',
                  type: "blue",
                  users: 115,
                },{
                  cover: require("../../assets/images/skin/green.png"),
                  id: 3,
                  name: "青草绿",
                  nameVin:'Màu xanh lá',
                  type: "green",
                  users: 195,
                },{
                  cover: require("../../assets/images/skin/maingreen.png"),
                  id: 4,
                  name: "翡翠绿",
                  nameVin:'Màu xanh ngọc bích',
                  type: "maingreen",
                  users: 195,
                },
                {
                  cover: require("../../assets/images/skin/golden.png"),
                  id: 5,
                  name: "黑",
                  nameVin:this.$t('themeSkin.text[6]'),
                  type: "golden",
                  users: 232,
                }],
                skinIndex:0,
                showSkin:false,
                xzIssueMess:{},
                kjDjs:'',
                showAllLottery:false,
                notOpenList:[]

            }
        },
        created(){
          this.cid = this.$route.params.id;
          this.SETHISTORYGAME({id:this.$route.params.id,vname:this.$route.query.vname,remark:this.$route.query.mark})
          this.currLottery.vname = this.$route.query.vname;
          this.currLottery.remark = this.$route.query.mark;
          this.getPlayGroup();
          this.loadMoney();
          this.getDjs();
         
          if(this.cid>=45&&this.cid<=50){
            this.getCurrOpenData(false,true);
          }
          this.getCurrOpenData();

        },
        components: { allGAmeList },
        filters:{
          filterOdds(code,oddArr){
            for(let i =0,len=oddArr.length;i<len;i++){
              if(oddArr[i].items.indexOf(code)>-1){
                return oddArr[i].prize
              }else if(!oddArr[i].items.length){
                return oddArr[i].prize
              }
            }
          },
           filterSkinName(id,c){
            let name = ''
            if(c==1){
              if(id==0){
                name = "Màu chủ đề"
              }else if(id==1){
                name = "Màu hoa anh đào"
              }else if(id==2){
                name = "Màu xanh lam"
              }else if(id==3){
                name = "Màu xanh lá"
              } else if(id==4){
                name = "Màu xanh ngọc bích"
              }else if(id==5){
                name = "Đêm vàng"
              }
            }else if(c==2||c==5){
              if(id==0){
                name = "Theme color"
              }else if(id==1){
                name = "Cherry blossom color"
              }else if(id==2){
                name = "Blue"
              }else if(id==3){
                name = "Green"
              } else if(id==4){
                name = "Jade green"
              }else if(id==5){
                name = "Night Gold"
              }
            }
            
            return name;
          }
        },
        watch:{
          showDate:function(n,o){
            if(n){
              this.getCurrOpenData();
            }
          },
          isPk3Kj:function(n,o){
             if(n){
              this.getCurrOpenData(true);
            }
          },
               "mult": function(n, o) {
                if (n) {
                    this.$nextTick(() => {
                      let i = n.toString();
                      this.mult = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                     
                      if(this.mult&&Array.isArray(this.contents.items)){
                        this.contents.items.forEach((value , index) => {
                            value['amount'] = this.mult;
                            
                        });
                      }
                    

                    });
                }
            },
             shareNum: function(n, o) {
                if (n) {
                    this.$nextTick(() => {
                    let i = n.toString();
                    this.shareNum = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                    });
                }
            },

            quitCurrIndex:function(n,o){
              this.singleSelectNumber = [];
              this.bnum = this.singleSelectNumber.length;
              this.currjyTab = '';
              this.currKxNum = '';
            },
            textareaVal:function(n,o){
               if(!n){
            return
          }
               this.singleSelectNumber=[]
            //控制不能输入的字符
              let s = n;
              // s=s.replace(/[^\d\,\;\|\:\s\t\n]/g,'');
              let reg = /[,;|:\s\t\n]/;
              let regSz=/^\d+$/;
              this.textareaVal = s;
              // console.log(this.textarea);
              //匹配数据
            let arrnum=this.currData.field_def.length
        let fuhao=',';
        // let splitCode=[',',' ',';']
        let splitCode = ["|",","," ", ";","。","；","，","."];
        splitCode.forEach((i3,d3)=>{
                if(s.indexOf(i3)>-1&&s.indexOf(i3)<arrnum+1){
                    fuhao=i3
              }
        })
        let textArr=s.split(fuhao).filter(function (s) {return s && s.trim()})
        try {
            textArr.forEach((i1,i2)=>{
            if(regSz.test(i1)&&i1.length==arrnum){
                this.bnum=textArr.length;
            }else{
                this.bnum=0
                throw new Error("EndIterative");
            }
        })
        } catch (error) {
            if(error.message!="EndIterative") throw error;
        }
         let str1=this.textareaVal.replace(/[^\d]/g,' ').split(" ").filter(function (s) {
                        return s && s.trim(); 
                })
         let str2=''
        if(this.bnum){
          str1.forEach(i=>{
                    str2+=' '+i
                })
        }
         this.singleSelectNumber.push({
                  play_code:this.currData.code,
                  amount:this.mult,
                  item_code:str2.slice(1),
                  xs_code:s
                })
      
      this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":this.singleSelectNumber
              }
                
        },
        textareaValToo:function(n,o){
          if(!n){
            return
          }
               this.singleSelectNumber=[]
            //控制不能输入的字符
              let s = n;
              // s=s.replace(/[^\d\,\;\|\:\s\t\n]/g,'');
              let reg = /[,;|:\s\t\n]/;
              let regSz=/^\d+$/;
              this.textareaValToo = s;
              // console.log(this.textarea);
              //匹配数据

              let ss = this.textareaValToo;
              let arr = [];
              //判断中间
              // for(let i=0,len=ss.length;i<len;i++){
              //     if(reg.test(ss[i])&&!regSz.test(ss[i-3])){
              //         //截取前两位
              //       let n = ss.substring(i-2,i);
              //       //是否全是数字
              //       if(regSz.test(n)){
              //           arr.push(n);
              //       }
              //     }
              // }
        let arrnum=this.currData.code.replace(/[^\d]/g,' ')
        let fuhao='|';
        let splitCode = ["|", " ", ";","。","；","，","."];
       splitCode.forEach((i3,d3)=>{
                if(s.indexOf(i3)>-1&&s.indexOf(i3)<arrnum+1){
                    fuhao=i3
              }
        })
       let textArr=s.split(fuhao).filter(function (s) {return s && s.trim()})
        try {
           textArr.forEach((i1,i2)=>{
            if(i1.split(',').length==arrnum){
                i1.split(',').forEach((i3,i4)=>{
                    if(regSz.test(i3)&&i3.length==2){
                        this.bnum=textArr.length;
                    }else{
                        this.bnum=0
                        throw new Error("EndIterative");
                    }
                })
                // this.zhudanNum=textArr.length;
            }else{
                this.bnum=0
                throw new Error("EndIterative");
            }
        })
        } catch (error) {
            if(error.message!="EndIterative") throw error;
        }
         let str4=''
         let str3=this.textareaValToo.replace(/[^\d]/g,' ').split(" ").filter(function (s) {
                        return s && s.trim(); 
                })
        let str5=this.group(str3,parseInt(arrnum) )
        
        if(this.bnum){
          str5.forEach((i,c)=>{
                    str4+=' '+i.toString()
                })
        }
         this.singleSelectNumber.push({
                  play_code:this.currData.code,
                  amount:this.mult,
                  item_code:str4.slice(1),
                  xs_code:s
                })
      
      this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":this.singleSelectNumber
              }
                
        },
        'xzIssueMess.issue':function(n,o){
          if(n-o==1){
           setTimeout(() => {
            this.getCurrOpenData(false,false,true);
           
           }, 4000);
          }
        }
        },
          computed: {
            ...mapState([
                "skin",
                "chatShow",
                'skinData',
                'skinListStore',
                'defalutLan',
                "lanCode"
                ])
        },
        methods: {
          ...mapMutations(["SETHISTORYGAME","SETUSERTOKEN","SETCHAT","SETSKINDATA",'SETSKINLIST']),
          closeBox(e){
            // console.log(e)
             console.log(e.target.className)
             if(e.target.className=='kj-box'){
              this.showList = false;
             }
          },
          goGameRule(){
            // window.open('/gameRule/'+this.cid)
            //  window.open("/gameRule/"+this.cid+"?vname="+this.currLottery.vname)
             this.$router.push("/gameRule/"+this.cid+"?vname="+this.currLottery.vname)
          },
          async getDjs(){
            let res = await this.$http.get('/api/lottery/allowtime',{params:{
              lottery_id:this.cid
            }})
             this.timer(res.data.data.closetime);
             this.xzIssueMess = res.data.data;
          },
          goGamePlay(){
            this.$router.push('/gameplay?id='+this.cid);
          },
          goChat(){
            if(this.$store.state.userinfo.user_id<0){
                this.$swBox({
                     title: this.$t('tsTitle'),
                    content: this.$t('swTip'),
                    leftBtn: this.$t('loginText'),
                    rightBtn:this.$t('registerText'),
                    clickL: () => {
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
            this.SETCHAT(!this.chatShow)
          },
          goMoreResult(){
            this.$router.push('/LotteryResults?cid='+this.cid+'&cname='+this.currLottery.vname+'&currcode='+(this.is_merge?this.hbCode:this.currData.code))
          },
           changeChat(){
        if(this.chatShow){
            this.SETCHAT(false)
        }else{
            this.SETCHAT(true)
        }
        },
          clearOld(){
             this.selectQx.forEach(v=>{
               v.num = 0;
             })
          },
          //判断是否在某个范围
          group(array, subGroupLength) {
                let index = 0;
                let newArray = [];
                while(index < array.length) {
                    newArray.push(array.slice(index, index += subGroupLength));
                }
                return newArray;
            },
          checkQj(arr){
            // console.log(arr);
            for(let i=0,len=arr.length;i<len;i++){
              if(arr[i]>=0&&arr[i]<=99){
                this.selectQx[0].num++
              }else if(arr[i]>=100&&arr[i]<=199){
                this.selectQx[1].num++
              }else if(arr[i]>=200&&arr[i]<=299){
                this.selectQx[2].num++
              }else if(arr[i]>=300&&arr[i]<=399){
                this.selectQx[3].num++
              }else if(arr[i]>=400&&arr[i]<=499){
                this.selectQx[4].num++
              }else if(arr[i]>=500&&arr[i]<=599){
                this.selectQx[5].num++
              }else if(arr[i]>=600&&arr[i]<=699){
                this.selectQx[6].num++
              }else if(arr[i]>=700&&arr[i]<=799){
                this.selectQx[7].num++
              }else if(arr[i]>=800&&arr[i]<=899){
                this.selectQx[8].num++
              }else if(arr[i]>=900&&arr[i]<=999){
                this.selectQx[9].num++
              }
            }
          },
          textareaFocus(event){ 
            this.showText = false;
          },
          textareaBlur(event){
            if(!this.textareaVal){
                this.showText = true;
            }else{
                this.showText = false;
            }
          },
          //去重
          unique(arr) {
            if (!Array.isArray(arr)) {
                // console.log('type error!')
                return
            }
            let array =[];
            for(let i = 0; i < arr.length; i++) {
                if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
                }
            }
            return array
        },
       
          //单双 大小 
          getJyBall(code){
            // console.log(code);
            this.currjyTab = code;
            this.singleSelectNumber = [];
            if(code=='bx'){
              if(this.currData.field_rule=='000-999'){
                for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                
                 if(i%111==0){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.mult})
                 }
                  
               }
              }else{
                for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                
                 if(i%11==0){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.mult})
                 }
                  
               }
              }
               

            }else if(code=='even'){
              for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                 if(i%2==0){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.chipsJE})
                 }
                  
               }

            }else if(code=='odd'){
              for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                 if(i%2!=0){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.chipsJE})
                 }
                  
               }

            }else if(code=='small'){
              for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                 if(i<99/2){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.chipsJE})
                 }  
               }

            }else if(code=='big'){
              for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
                 if(i>99/2){
                   this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.chipsJE})
                 }
                  
               }
            }
            this.bnum = this.singleSelectNumber.length;
            // console.log(this.singleSelectNumber)
            this.getSame();
            // this.singleSelectNumber.forEach((item) => {
            //   this.getSame(item);
            // });
            
          },
          getSame(item,f){
            for(let i=0,leni=this.currDirctArr.length;i<leni;i++){
              if(item==i){
                  this.singleSelectNumber.push({item_code:this.currDirctArr[i].code, play_code:this.currData.code,xs_code:this.currDirctArr[i].name,amount:this.mult})
                }else{
                }
            }
            if(!f){
              this.bnum = this.singleSelectNumber.length;
              this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":this.singleSelectNumber
              }
            }else{
              let arr = [];
              this.singleSelectNumber.forEach(res=>{
                arr.push(res.xs_code)
              })
               this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":[{
                  play_code:this.currData.code,
                  amount:this.mult,
                  item_code:arr.join(',')
                }]
              }
            }
            // console.log(this.contents)
          },
          //随机选中
          selectRandomOrder(num){
            console.log(num)
            //生成随机数
            this.singleSelectNumber = [];
            
            if( this.currKxNum == num){
              this.currKxNum = -1;
            }else{
              this.currKxNum = num;
            }
            if(this.currKxNum<0) {
              this.clearOld();
              this.contents = {};
              this.bnum = 0;
              return
            }
            let arr = [];
            let f = false;
            
            if(this.currBigwf=='combo'||this.currBigwf=='lose'){
              //自选一注
                if(this.bnum>0){
                //取消选中
                this.bnum = 0;
                this.currKxNum = '';
                this.singleSelectNumber = [];
                // console.log(9999999999)
              }
              f=true;
              this.bnum = 1;
              num = this.currData.field_def[0].max_selected;
              // console.log(num)
              
            }
            if(this.currData.field_rule=='00-99'){
              arr = this.doRandom(this.currMaxNum.min,this.currMaxNum.max,num,100);
            }else if(this.currData.field_rule=='000-999'){
              arr = this.doRandom(0,999,num,1000);
              this.clearOld();
              this.checkQj(arr);
            }
            arr.forEach((item) => {
              this.getSame(item,f);
            });
            
            
           
          },
          //生成随机数
          doRandom(start,end,num,allNum) {
            let arr = [];
            for(let i = start; i < allNum; i++) {
              let n = Math.floor(Math.random() * end);
              let numIndex = arr.findIndex((v,index)=>{
                return n==v
              })
              if(numIndex<0&&arr.length<num) arr.push(n)
              
              // console.log(n);
            }
            console.log(arr)
            return arr;
            },
          showNumSelect(){
            this.showNum = true;
            let arr = document.querySelectorAll('.date-box li.active');
            if(!arr.length){
               let o = document.querySelector('.date-box li');
              o.classList.add('active');
              removeAllactive(getSiblings(o));
              this.currMaxNum = this.selectQx[0];
              this.currSingleThird = this.currMaxNum.title;
            }
          },
          //取消
          cancelNumber(){
            this.showNum = false;
            let o = document.querySelector('.date-box li');
            o.classList.add('active');
            removeAllactive(getSiblings(o));
            this.currMaxNum = this.selectQx[0];
            this.currSingleThird = this.currMaxNum.title;
          },
          //选中
          changeSelectNum(e,v){
            e.currentTarget.classList.add('active');
            removeAllactive(getSiblings(e.currentTarget));
            this.currSelectNum = v;
          },
          //选中号码区间
          selectOneQx(){
            this.showNum = false;
            if(this.currSelectNum.title){
               this.currMaxNum=this.currSelectNum;
              this.currSingleThird=this.currSelectNum.title;
            }
          },
          findSameData(obj,ball,f){
            // &&v.play_code
            let index;
            if(f){
              index = this.singleSelectNumber.findIndex(v=>{
                return v.item_code==ball.code&&v.play_code==obj.play_code
                })
            }else{
              index = this.singleSelectNumber.findIndex(v=>{
                return v.item_code==ball.code
                })
            }
            
            if(index>-1){
              this.singleSelectNumber.splice(index,1)
            }else{
              this.singleSelectNumber.push(obj)
            }
          },
         //正常的直选
          selectOneBall(e,ball){
            //串烧 自选不中
            this.checkQj([ball.name]);
            if(this.currBigwf=='combo'||this.currBigwf=='lose'){
               let obj = {
                  item_code:ball.code,
                  xs_code:ball.name,
              }
              let maxL = this.currData.field_def[0].max_selected;
              
             if(maxL==this.singleSelectNumber.length){
                let index = this.singleSelectNumber.findIndex(v=>{
                  return v.item_code==ball.code
                })
                if(index>-1){
                  this.singleSelectNumber.splice(index,1);
                  this.bnum = 0;
                }
              }else if(maxL>this.singleSelectNumber.length){
                  this.findSameData(obj,ball);
                  this.bnum = 0;
               if(maxL==this.singleSelectNumber.length){
                  this.bnum = 1;
               }else{
                  this.bnum = 0;
               }
              } else{
                //不能再选
              }
              // console.log(this.singleSelectNumber);
              let arr = [];
              this.singleSelectNumber.forEach(res=>{
                arr.push(res.xs_code)
              })
              this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":[{
                  play_code:this.currData.code,
                  amount:this.mult,
                  item_code:arr.join(',')
                }]
              }

              // console.log(this.contents)
            }else{
               let obj = {
                play_code:this.currData.code,
                item_code:ball.code,
                xs_code:ball.name,
                amount:this.mult
              }
             this.findSameData(obj,ball);
              // console.log(this.singleSelectNumber);
              this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":this.singleSelectNumber
              }
              this.bnum = this.singleSelectNumber.length;
            }
          },
          selectOneBallZH(e,ball,item){
            let obj = {} ;
            if(this.cid>=45&&this.cid<=50){
               obj = {
                play_code:this.currData.code,
                play_name:ball.name,
                item_code:ball.code,
                xs_code:ball.name,
                amount:this.mult
              }
            }else{
               obj = {
                play_code:item.code,
                play_name:item.name,
                item_code:ball.code,
                xs_code:ball.name,
                amount:this.mult
              }
            }
            console.log(obj)
             this.findSameData(obj,ball,true);
             let xs = this.doZHXS(this.singleSelectNumber);
              this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":this.singleSelectNumber,
                "xs":xs
              }
              console.log(this.contents);
              this.bnum = this.singleSelectNumber.length;
          },
          doZHXS(data){
           let items= {};
            if (data) {
                items = data;
            } else return;
            let item = {};
            for (let k in items) {
                let v = items[k];
                if (!item[v.play_name]) item[v.play_name] = [];
                item[v.play_name].push(v);
            }
            return item;
          },
          //处理单式号码
          doSingle(rule){
            let arr1 = [0,1,2,3,4,5,6,7,8,9]
            let arr2 = [0,1,2,3,4,5,6,7,8,9]
            let arr3 = [0,1,2,3,4,5,6,7,8,9]
            let arr=[];
            if(rule=='00-99'){
              for(let i=0,len=arr1.length;i<len;i++){
                for(let j=0,lenj=arr2.length;j<lenj;j++){
                   arr.push({name:arr1[i]+''+arr2[j],code:arr1[i]+','+arr2[j]})
                 
                  
              } 
              }
            }else if(rule=='000-999'){
              for(let i=0,len=arr1.length;i<len;i++){
                for(let j=0,lenj=arr2.length;j<lenj;j++){
                  for(let k=0,lenk=arr3.length;k<len;k++){
                    arr.push({name:arr1[i]+''+arr2[j]+''+arr3[k],code:arr1[i]+','+arr2[j]+','+arr3[k]})
                  }
                  
              } 
              }
            }
            return arr;
          },
          //重置
          resetFunc(){
            this.reset(2);
          },
          addCm(e,v){
            // this.chipsJE=this.chipsJE-0+v;
            if(this.mult==1){
              this.mult = v;
            }else{
              this.mult = this.mult-0+v;
            }
            
            removeAllactive(getSiblings(e.currentTarget))
            e.currentTarget.classList.add('active');
            
          },
          goXz(){
            //是否登录
            if(!this.$store.state.codeToken){
                return this.$popup();
            }
            //是否选号码
            console.log(this.bnum)
            if(!this.bnum){
              return  this.$vux.toast.text(this.$t('xz.text[46]'), 'bottom')
            }

            //金额是否够
            if(this.amount<(this.bnum*this.chipsJE*this.bone)){
               return  this.$vux.toast.text(this.$t('xz.text[47]'), 'bottom')
            }
            
             if(this.mult<1){
              return  this.$vux.toast.text(this.$t('xz.text[48]'), 'bottom')
            }
            this.isXzComfirm = true;
            // console.log(this.contents)
          },
          loadMoney() {
            if (!this.$store.state.codeToken) return;
            this.$http.get("/api/user/balance").then(res => {
              if (res && res.data.code == 1) {
               this.amount = res.data.data.balance
              }
            });
          },
           shareOrder(i){
            this.$vux.loading.show()
            // console.log(i)
            i.order_no=this.shareOrderNum
            let d = this.globalPpproach.checkIsEncrypt(i)
            this.$http.post('/api/chatroom/share', d).then(res=>{
              this.$vux.loading.hide()
              this.$vux.toast.text(res.data.msg,'middle')
            })
          },
          //下注接口
          async postBet(){
            //lottery_id	integer	是	彩种id
            // issue	string	是	奖期
            // items	json	是	注单详情,必须包含:play_code玩法代码,item_code详情代码,amount金额,如: [{"play_code":"h2bd","item_code":"1,5","amount":1},{"play_code":"h2bd","item_code":"2,9","amount":1}]
            // console.log(obj)
            this.$vux.loading.show();
            if(this.isPost) return
            this.isPost = true;
            this.contents.code=this.defalutLan;
            if(this.contents.items&&typeof this.contents.items=='object')  this.contents.items = JSON.stringify(this.contents.items)
            console.log(909999999090,this.contents)
            let d = this.globalPpproach.checkIsEncrypt(this.contents)
            let res = await this.$http.post('/api/guess/play', d,{timeout:60000});
            this.isPost = false;
            this.$vux.loading.hide();
            if(res.data.code!=1){
              this.isXzComfirm = false;
               this.$publicPop({
                    title: "",
                    content: res.data.msg,
                    isShowCancelButton:false
             });
              if(res.data.code==401){
                this.$popup();
              }
            }else{
              if(this.sharePurview==''||this.$store.state.userinfo.vip>=this.sharePurview){
                let items1=res.data.items
                items1.forEach((v,a)=>{
                v.oneAmount=v.amount/v.multiple/v.nums
              })
              let shareContent={
                issue: res.data.issue,
                lottery_id: res.data.lottery_id,
                items: JSON.stringify(items1),
                code:this.defalutLan
              }
                   this.$publicPop({
                    title: "tip",
                    content: this.$t('xz.text[50]'),
                    clickConfirm: () => {
                        this.shareOrderNum=res.data.order_no
                        this.shareOrder(shareContent)
                    }
                });


                // console.log(shareContent)
              }
              
              this.isXzComfirm = false;
              //刷新金额
              this.loadMoney();
              this.$vux.toast.text(res.data.msg,'middle');
              //恢复某些东西
              this.singleSelectNumber = [];
              this.currKxNum = 0;
              this.bnum = 0;
              removeAllactive(document.querySelectorAll('.list-content span.active'))
              removeAllactive(document.querySelectorAll('.cm-list span'));
              this.textareaVal = '';
              this.showText = true;
              this.contents = {};
              

            }
           

          },
          //切换玩法重置
          reset(m){
            this.showDate = false;
            this.showTitle = false;
            if(m==1){
              this.isChangeMode(this.is_merge);
              
            }
            this.currjyTab = '';
            this.currKxNum = '';
            this.singleSelectNumber = [];
            this.bnum = 0;
            this.mult = 1;
            if(this.is_merge==1){
              this.chipsJE = this.currData[0].amount;
            }else{
              this.chipsJE = this.currData.amount;
            }
            this.textareaVal=null;
            this.textareaValToo=null;
            this.quitCurrIndex = 1;
            this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            removeAllactive(document.querySelectorAll('.chips-img > span'));
            removeAllactive(document.querySelectorAll('.cm-list span'));
            removeAllactive(document.querySelectorAll('.cm-list .ist-lf'));
          },
          //是否切换下注模式
          // isChangeMode(type){
          //   // console.log(type)
          //   if(type==1){
          //     return this.tabIndex = 'duplex';
          //   }
          //   if(this.currData.field_modes.length>1){
          //          let curr = this.currData.field_modes.find(v=>{
          //           return v.code=='duplex'
          //           //默认复试
          //         });
          //         // 没有 就 单选默认
          //         this.tabIndex = curr?curr.code:'direct';
          //       }else{
          //          this.tabIndex= 'duplex'
          //       }
          // },
          //是否切换下注模式
          isChangeMode(type){
            console.log(type)
            if(type==1){
              return this.tabIndex = 'duplex';
            }
            if(this.currData.field_modes.length>1){
                   let curr = this.currData.field_modes.find(v=>{
                    ////默认复试
                    //// return v.code=='duplex'
                    //默认直选
                    return v.code=='direct'
                  });
                  console.log(curr)
                  //// 没有 就 单选默认
                  //// this.tabIndex = curr?curr.code:'direct';
                  //如果没有复试默认
                  this.tabIndex = curr?curr.code:'duplex';
                }else{
                   this.tabIndex= 'duplex'
                }
          },
          changePlayCode(e,bPlayObj,sPlayObj,index){
              this.reset(1);
              this.playRule = [];
              removeAllactive(document.querySelectorAll('.sort-list li'));
              removeAllactive(document.querySelectorAll('.cm-list .list-lf'));
              e.currentTarget.classList.add('active');
              //判断
              this.is_merge = bPlayObj.is_merge;//是否组合
              if(this.currBigwf==bPlayObj.code){
                if(this.is_merge==1){
                  this.chipsJE = this.currData[0].amount;
                  this.currData = this.allData;
                  this.hbName = sPlayObj.name;
                  this.hbCode = sPlayObj.code;
                }else{
                  this.currData = this.allData[index];
                  this.maxComboLen = this.currData.field_def[0].max_selected;
                  this.playRuleObj = this.playRule[index];
                  if(this.currData.field_rule){
                    this.singleData = this.doSingle(this.currData.field_rule)
                    this.currDirctArr = this.doSingle(this.currData.field_rule);
                  }
                 
                //  this.getPlayRule(sPlayObj.code);
                 this.chipsJE = this.currData.amount;
                 if(bPlayObj.code=="sanshu"||bPlayObj.code=="ershu"){
                  this.kxTab = this.kxTab2;
                  }else{
                    this.kxTab = this.kxTab1;
                  }
                }
                if(sPlayObj.code.includes('h2')){
                  this.currMaxNum={max:99,min:0}
                }
                this.getPlayRule(sPlayObj.code);
                this.getnotOpen(sPlayObj.code);
                this.isChangeMode(this.is_merge);
                
                
              }else{
                 this.getPlaylist(index,bPlayObj.code,sPlayObj,bPlayObj);
                 this.currBigwf = bPlayObj.code;
              }
             
              
          },
          changeOpenData(index){
            this.currOpend= this.lastOpenData[index];
            this.showList = true;
            console.log(this.currData)
          },
          addClassActive(eleArr){
            for(let i=0,len=eleArr.length;i<len;i++){
              eleArr[i].classList.add('active')
            }
          },
          //选择球  复式
           checkBall(e){
                e = e || window.e;
                let titleDom = e.currentTarget.parentNode.parentNode.parentNode.children[0];
                let fastTitle = e.currentTarget.parentNode.parentNode.children[0].children;
                //去掉大小 单双 全 
                removeAllactive(fastTitle)
               if(e.currentTarget.className.indexOf('active') > -1){
                   e.currentTarget.classList.remove("active");
                }else{
                    e.currentTarget.classList.add("active");
                }
                let allS = getSiblings(e.currentTarget);
                let arr = [];
                allS.push(e.currentTarget);
                for(let i= 0,len = allS.length;i<len;i++){
                    if(allS[i].className.indexOf('active') > -1){
                        arr.push(allS[i]);

                    }
                }
                if(arr.length){
                    this.activeLen = 1;
                }else{
                    this.activeLen = 0;
                }
                if(arr.length){
                  titleDom.classList.add('active')
                }else{
                  titleDom.classList.remove('active')
                }
               
                

                let contentD = L.order_process(this);

                this.contents = {
                  "lottery_id":this.cid,
                  "issue":this.xzIssueMess.issue,
                  "items":[{"item_code":contentD.content.ball.substring(0,contentD.content.ball.lastIndexOf('|')),"play_code":this.currData.code,"amount":this.mult}],
                  "xsOrder":contentD.content.name.substring(0,contentD.content.ball.lastIndexOf('|')).split('|'),

                }
            },

           
          //快速选择 大小 单双 全选 清空
           changeFast(event,f){
                let curr = event.currentTarget;
                let p = curr.parentNode.parentNode;
                let titleDom = curr.parentNode.parentNode.parentNode.children[0];
                let s = p.children[1].children;
                if(f == "c"){//清
                    removeAllactive(getSiblings(curr));
                   removeAllactive(s);
                   let content = L.order_process(this);
                  titleDom.classList.remove('active')
                  this.contents = {
                    lottery_id:this.cid,
                    issue:this.xzIssueMess.issue,
                    item_code:content.content.ball.substring(0,content.content.ball.lastIndexOf('|')),
                    play_code:this.currData.code,
                    amount:this.mult,
                    xsOrder:content.content.name.substring(0,content.content.ball.lastIndexOf('|')).split('|'),
                  }
                   return
                }
                if(curr.className.includes('active')){
                  // curr.classList.remove('active');
                }else{
                  curr.classList.add('active');
                  removeAllactive(getSiblings(curr));
                }
               
                removeAllactive(s);
                if(f == "a"){//全选
                    this.addClassActive(s);
                }else if(f == "b"){//大
                  for(let i=0,len=s.length;i<len;i++){
                    if(i>=len/2){
                      s[i].classList.add('active')
                    }
                    
                  }
                }else if(f == "s"){//小
                  for(let i=0,len=s.length;i<len;i++){
                    if(i<len/2){
                      s[i].classList.add('active')
                    }
                    
                  }
                }else if(f == "o"){//单
                  for(let i=0,len=s.length;i<len;i++){
                      if(i%2!=0){
                        s[i].classList.add('active')
                      }
                      
                    }
                }else if(f == "e"){//双
                    for(let i=0,len=s.length;i<len;i++){
                      if(i%2==0){
                        s[i].classList.add('active')
                      }
                      
                    }
                }
                let content = L.order_process(this);
                let num = 0;
                for(let i=0,len=s.length;i<len;i++){
                  if(s[i].className.includes('active')){
                    num++;
                  }
                }
                if(num>0){
                  titleDom.classList.add('active')
                }else{
                  titleDom.classList.remove('active')
                }

                // console.log(content)
                this.contents = {
                "lottery_id":this.cid,
                "issue":this.xzIssueMess.issue,
                "items":[{
                  play_code:this.currData.code,
                  amount:this.mult,
                  item_code:content.content.ball.substring(0,content.content.ball.lastIndexOf('|'))
                }],
                "xsOrder":content.content.name.substring(0,content.content.ball.lastIndexOf('|')).split('|')
              }
                
               
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
                  // h = parseInt((parseInt(time / 60) / 60) % 24);
                  h = parseInt((parseInt(time / 60) / 60) );
                  d = parseInt(parseInt(time / 60) / 60 / 24);
                  second = second >= 10 ? second : "0" + second;
                  min = min >= 10 ? min : "0" + min;
                  if (!h) h = "";
                  else h = h >= 10 ? h : "0" + h ;
                 

                  if(h>=1){
                      t = h + ":"  + min + ":" + second;
                  } else{
                      t =  min + ":" + second;
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
                this.getDjs();
                this.djsTime = "--:--";
                }
            }, 1000);
            },
            timerKj(t){
               if (window.timer2) clearInterval(window.timer2);
                window.timer2 = setInterval(() => {
                  this.kjDjs = this.count(t--);
                    if (t <= -1) {
                      if(this.cid>=45&&this.cid<=50){
                        this.getCurrOpenData(false,true);
                      }
                    }
                }, 1000);
               
            },
          //获取下注数据
          async getPlaylist(index,code,sPlayObj,bPlayObj){
            this.$vux.loading.show();
            let res = await this.$http.get('/api/guess/playlist',{params:{lottery_id:this.cid,group_code:code,client_type:1}})
            this.$vux.loading.hide();
            this.allData = res.data.data;
            if(this.is_merge==1){
              // console.log(9090909)
                this.currData = this.allData;
                // console.log(909090,this.currData)
                this.chipsJE = this.currData[0].amount;
                this.hbName = sPlayObj.name;
                this.hbCode = sPlayObj.code;
                this.isChangeMode(1);
                this.getPlayRule(sPlayObj.code);
                this.getnotOpen(sPlayObj.code);
            }else{
              if(index){
                this.currData = res.data.data[index];
              }else{
                this.currData = res.data.data[0];
              }
              if(bPlayObj){
                if(bPlayObj.code=="sanshu"||bPlayObj.code=="ershu"){
                  this.kxTab = this.kxTab2;
                }else{
                  this.kxTab = this.kxTab1;
                }
              }else{
                this.kxTab = this.kxTab1;
              }
              
              this.maxComboLen = this.currData.field_def[0].max_selected;
              this.isChangeMode();
              if(this.currData.field_rule){
                this.singleData = this.doSingle(this.currData.field_rule)
                this.currDirctArr = this.doSingle(this.currData.field_rule)
              }
              this.chipsJE = this.currData.amount;
              this.getPlayRule(this.currData.code);
              this.getnotOpen(this.currData.code);
            }
            

            
            

          },
          //获取下注规则
           async getPlayRule(code){
            let res = await this.$http.get('/api/guess/playrule',{params:{lottery_id:this.cid,play_code:code}})
            this.playRule = res.data.data;
            // this.playRuleObj = this.playRule.find(value=>{
            //   return value.code == this.currData.code;
            // })
          
          },
          getnotOpen(code){
            this.notOpenList=[]
            this.$http.get('/api/lottery/notopencount',{params:{lottery_id:this.cid,play_code:code,field_mode:this.tabIndex}}).then(res=>{
            if(res.data.code=='1'){
              this.notOpenList=res.data.data
            }
            })
          },
          //获取所有玩法列表
           async getPlayGroup(){
            let res = await this.$http.get('/api/guess/playgroup',{params:{lottery_id:this.cid,client_type:'1'}})
            if(res.data.code==1){
              this.playGroup = res.data.data;
               this.getPlaylist(null,this.playGroup[0].code);
            
              this.currBigwf = this.playGroup[0].code;
            }else{
              this.$vux.toast.text(res.data.msg,'middle')
            }
            

          },
          //获取最新开奖数据（当前期）
          async getCurrOpenData(flag,flag2,flag3){
             let res = {}
            if(flag){
               res = await this.$http.get('/api/lottery/history',{params:{lottery_id:this.cid}})
                this.lastOpenData = res.data.data;
                // this.currOpend =  this.lastOpenData[1][0] || {};
                console.log(999,res.data.data[1][0])
            }else{
              res = await this.$http.get('/api/lottery/index',{params:{lottery_id:this.cid}})

               this.currOpend = res.data.data[0];
               this.kjDjs  = this.currOpend.next_countdown;
                this.timerKj(this.kjDjs);
                if(flag3){
                  if(this.currOpend.next_issue==this.xzIssueMess.issue){
                    this.showList=true;
                  setTimeout(()=>{
                    this.showList=false;
                  },3000)
                  }else{
                    this.getCurrOpenData(false,false,true);
                  }
                  
                }
               if(!flag2) this.lastOpenData = res.data.data;
            }
            
             
          },
          changeTab(index,code){
            this.tabIndex = code;
            this.resetFunc();
            if(code!='single'){
              this.getnotOpen(this.currData.code)
            }
          },
           getselect(index,id,v){
            this.SETSKINDATA(id);
            // this.SETHOMEGAME([])
            this.skinIndex = id ;
            this.skinList[index].users = v.users-0+1;
            this.SETSKINLIST(this.skinList);
            this.isQuickMenu = false;
          },
         
        },
    }
</script>

<style scoped lang="less">
 .rem(@name,@px){
    @{name}:unit(@px/75,rem)
  }
  .pk3-kj{
    position: fixed;
    background: rgba(0,0,0,.5);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
     .pk3-kj-content{
        .remove-btn{
          position: absolute;
          .rem(width,44);
          .rem(height,44);
          border-radius: 50%;
          border: 2px solid #1E80FF;
          background: url(../../assets/images/ynxz/kj-remove.png) center center no-repeat;
          background-size: 60%;
          right: .3rem;
        }
        .kj-title{
          height: .8rem;
          line-height: .5rem;
          text-align: center;
          border-bottom: 1px solid  #F3F4F5;
          font-size: .4rem;
        }
        .total-box{
          padding-top: .2rem;
          height: 2.3rem;
          span{
            display: inline-block;
            width: 48%;
            text-align: center;
            background: #f06;
            color: #fff;
            font-size: .35rem;
            border-radius: .5rem;
            padding: .2rem 0;
            margin-bottom: .2rem;
            &.big{
              background: #7679E4;
            }
            &.sm{
              background: #FC5C5D;
            }
            &.odd{
              background: #3CC1BE;
            }
            &.even{
              background: #FD9B4D;
            }
          }
        }
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: .3rem .2rem;
        background: #fff;
        border-radius: .3rem;
        overflow: hidden;
        height: 65%;
        width: 95%;
        #pk3-content {
          height: 85%;
          ul{
            li{
              border-top: 1px solid  #F3F4F5;
              padding: .2rem 2.5%;
              .num-total{
                .rem(height,50);
                .rem(line-height,50);
                .rem(width,50);
                text-align: center;
                background: #1E8CFF;
                color: #fff;
                font-family: "number1";
                border-radius: 50%;
                display: inline-block;
                margin:0 .5rem 0 .3rem;
              }
              .num-sx{
                padding-left: .6rem;
                &.da{
                  color: #7679E4;
                } 
                &.xi{
                  color: #FC5C5D;
                }
                &.dan{
                  color: #3CC1BE;
                }
                &.su{
                  color: #FD9B4D;
                }
                 &.da-line{
                  color: #7679E4;
                  text-decoration:line-through;
                } 
                &.xi-line{
                  color: #FC5C5D;
                  text-decoration:line-through;
                }
                &.dan-line{
                  color: #3CC1BE;
                  text-decoration:line-through;
                }
                &.su-line{
                  color: #FD9B4D;
                  text-decoration:line-through;
                }
              }
              .num-isuse{
                font-size: .4rem;
                color: #000;
                float:right;
              }
            }
          }
        }
        #pk3-content .wrapperY{
          height: 7.5rem;
        }
      }
  }
 


  .open-num{
    display: inline-block;
    .rem(height,50);
    .rem(line-height,50);
    .rem(width,50);
    vertical-align: bottom;
    margin-right: .1rem;
    &.num1{
      background: url(../../assets/images/ynxz/1.png) no-repeat;
      background-size: contain;
    }
    &.num2{
        background: url(../../assets/images/ynxz/2.png) no-repeat;
      background-size: contain;
    }
    &.num3{
        background: url(../../assets/images/ynxz/3.png) no-repeat;
      background-size: contain;
    }
     &.num4{
        background: url(../../assets/images/ynxz/4.png) no-repeat;
      background-size: contain;
    }
     &.num5{
        background: url(../../assets/images/ynxz/5.png) no-repeat;
      background-size: contain;
    }
     &.num6{
        background: url(../../assets/images/ynxz/6.png) no-repeat;
      background-size: contain;
    }
  }
  header{
     height: 1.18rem;
      line-height: 1.18rem;
      background: #1B74C8;
      position: relative;
      i{
        position: absolute;
        display: block;
        .rem(top,22);
        &.return-icon{
          .rem(width,34);
          .rem(height,42);
          background: url('../../assets/images/ynxz/left-return.png')no-repeat;
          background-size: contain;
          left: 0.453rem;
        }
        &.more-icon{
          .rem(width,44);
          .rem(height,44);
          background: url('../../assets/images/ynxz/chat_icon.png')no-repeat;
          background-size: contain;
          right: 1.15rem;
        }
        &.msg-icon{
          .rem(width,48);
          .rem(height,36);
          background: url('../../assets/images/ynxz/more_icon.png') no-repeat;
          background-size: contain;
          right: 0.22rem;
          top: 0.35rem;

        }
      }
    .title{
     
      color:#fff;
      text-align: center;
      font-size: 0.48rem;
      i{
        &.title-down{
          display: inline-block;
          .rem(width,40);
          .rem(height,40);
          background: url('../../assets/images/ynxz/w_Subtract.png')no-repeat;
          background-size: contain;
          vertical-align: middle;
          margin-left: 0.2rem;
        }
        &.lt-icon{
          .rem(width,60);
          .rem(height,60);
          background: url('../../assets/images/fhemoji/lt_icon.png')no-repeat;
          background-size: 100% 100%;
          right: 1rem;
          top: 0.2rem;
          &::before{
            position: absolute;
            content: '';
            width: .2rem;
            height: .2rem;
            right: 0.15rem;
            top: 0.1rem;
            background: #FF5640;
            border-radius: 50%;
          }
        }
        &.quick-icon{
          .rem(width,40);
          .rem(height,40);
          background: url('../../assets/images/ynxz/quick-icon.png')no-repeat;
          background-size: 100% 100%;
          right: 0.2rem;
          top: 0.35rem;
        }
        &.title-up{
          display: inline-block;
          .rem(width,40);
          .rem(height,40);
          background: url('../../assets/images/ynxz/Subtract (3) (1).png')no-repeat;
          background-size: contain;
          vertical-align: middle;
          margin-left: 0.2rem;
        }
      }
    }
    &.goldenHeader{

    }
  }
  .chat-box{
    position: fixed;
    z-index: 9;
    bottom: 0;
    background:#F6F6F6;
    width: 100%;
    .chat-title{
      .return-icon{
          .rem(width,34);
          .rem(height,42);
          background: url('../../assets/images/ynxz/left-return.png')no-repeat;
          background-size: contain;
          
        }
      .rem(height,90);
      border-bottom: 0.5px solid #d9d2d2;
      padding-top: 0.16rem;
      &.iszk{
         border-bottom: none;
         background: #1B74C8;
      }
      >div{
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sq{
        .ds-btn{
          .rem(width,164);
          .rem(height,60);
          text-align: center;
          color: #fff;
          font-size: 0.37rem;
          background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
          border-radius: 5px;
          line-height: 0.8rem;
        }
      }
      .zk{
       
        color: #fff;
        font-size:0.53rem
      }
    }
    .chat-main{
      .rem(height,488);
      ul{
        padding: 0.2rem;
        li{
          margin-bottom: 0.3rem;
          display: flex;
          // align-items: center;
          &.selfMsg{
           flex-direction: row-reverse;
            // span{
            //   margin-left: auto;
            // }
            .avatarBox{
             margin-left:0.2rem;
             margin-right: 0;
          }
             .msg-name{
              display: flex;
               flex-direction: row-reverse;
          }
            .msg-text{
               margin-left: auto;
               background:#48A0FF;
               margin-right: inherit;
               color: #fff;
               .chat-time{
              left: -0.8rem;
              right: none;
             }
             .orderBtn{
               padding: 0.2rem 0;
                color: #000;
               span{
                padding: 0.1rem 0.5rem;
                background:#fff;
                border-radius:1rem;
               }
             }
               img{
                 width:0.5rem;
                 vertical-align: middle;
               }
            }
          }
          .msg-content{width: 100%;display: flex;flex-direction: column;}
          .avatarBox{
             margin-right:0.2rem;
            img{
             .rem(width,100);
             .rem(height,100);
             border-radius: 50%;
          }
          }
          
          .msg-name{
            display: flex;
            span{
            color: #666;
            font-size: 0.32rem;
          }
          >img{margin: 0 0.2rem;}
          i{font-size:0.26rem;color: #FF5640;}
          }
          
          .msg-text{
            position: relative;
            margin-right: auto;
            background:#fff;
            color: #000;
             font-size: 0.37rem;
             padding: 0.15rem 0.2rem;
             border-radius: 0.16rem;
             max-width: 70%;
             .chat-time{
              position: absolute;
              right: -0.8rem;
              bottom: 0;
              font-size: 0.26rem;
              color: #777777;
             }
			 &.sharePlan{
				 &.expireBtn{
				 				 background: #EEEEEE;
				 				 color: #222222;
				 				 .orderBtn{
				 					 span{
				 						 background: #C4C4C4;
				 						 color: #fff;
				 						 pointer-events: none;
				 					 }
				 				 }
				 }
			 }
			 
             .orderBtn{
               padding: 0.2rem 0;
                color: #fff;
               span{
                padding: 0.1rem 0.5rem;
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                border-radius:1rem;
               }
               
             }
          }
          
        }
      }
      
    }
    .send-msg{
      position: fixed;
    bottom: 0;
    width: 100%;
      display: flex;
      justify-content: space-around;;
      align-items: center;
      border-top: 0.5px solid #d9d2d2;
      .rem(height,126);
      .emojiText{
        .rem(height,70);
        .rem(width,524);
        background: #fff;
        border-radius: 0.2rem;
        padding: 0 0.1rem;
        color: #A2A2A2;
        font-size: 14px;
        -webkit-user-select:text;
        outline: none;
        overflow: hidden;
        &:empty::before{
          content: 'Vui lòng nhập nội dung trò chuyện';
          color: #ccc;
        }
        &:focus::before{

          content: none;
          color: #ccc;
        }
      }
	  .mute{
		  .rem(width,56);
		  .rem(height,56);
		   &.mute1{
		                  background: url('../../assets/images/fhemoji/mute-1.png') no-repeat;
		                  background-size: 100% 100%;
		           }
		              &.active{
		                  background: url('../../assets/images/fhemoji/mute.png') no-repeat;
		                  background-size: 100% 100%;
		              }
	  }
    }
    .emoji-box{
      position: fixed;
      bottom: 1.68rem;
      width: 100%;
      padding: 0.1rem;
      background:#fff;
      z-index: 9;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          padding: 0.1rem;
          margin:0 0.1rem;
          img{ .rem(width,60);}
        }
      }
    }
    .go-down{
      position: fixed;
      bottom: 2.1rem;
      right: 0.2rem;
      width: 0.93rem;
      height: 0.93rem;
      z-index: 11;
      img{width: 100%;}
    }
  }
  .chat-order{
    
   position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .order-info{
      width: 94%;
      background: #fff;
      position: absolute;
      left: 3%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      .title{
        text-align: center;
        padding: 0.12rem 0;
        border-bottom: 1px solid #E9E9E9;
        color: #6A86B9;
        h2{
          color: #445779;
          font-size: 0.53rem;
          margin-bottom: 0.05rem;
        }
      }
      .order-content{
        padding:0.2rem 0.4rem;
        color: #445779;
        font-size: 0.37rem;
        p{
          padding-bottom: 0.1rem;
        }
        .share-order{
          text-align: center;
          img{
            width: 0.42rem;
            vertical-align: text-bottom;
          }
        }
        table{
          border: 1px solid #017CFF;
          border-radius: 4px;
          border-collapse:collapse;
          margin-bottom: 0.2rem;
          margin-top: 0.1rem;
          tr{
            text-align: center;
            td{
              border-right: 1px solid #017CFF;
              padding: 0.1rem 0;
              input{
                width: 80%;
                border: 1px solid #666666;
                border-radius: 4px;
                padding-left: 0.1rem;
                background: url('../../assets/images/fhemoji/Group 279.png') no-repeat;
                background-size: 0.3rem 0.3rem;
                background-position: center right 6px;
                
              }
            }
            th{
              background:  #F2F2F2;
              color: #287BE1;
              border-bottom: 1px solid #017CFF;
              border-right: 1px solid #017CFF;
              padding: 0.1rem 0;
            }
          }
        }
      }
      .btns{
        display: flex;
        justify-content: space-around;
        margin-bottom: 0.36rem;
        span{
          display: block;
          .rem(width,270);
          .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
         .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
        }
      }
    }
    .share-rule{
     position: absolute;
     top: 0;
     bottom: 0;
     width: 100%;
     background: rgba(0, 0, 0, 0.5);
     >div{
      font-size: 0.37rem;
      width: 80%;
      background: #fff;
      position: absolute;
      left: 10%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      padding: 0.3rem;
      padding-top: 0.5rem;
      .btn{

        .rem(width,270);
        .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
        .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
         margin: 0 auto;
        margin-top: 0.4rem;
      }
     }
    }
    
  }
  .prohibit{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    >div{
      font-size: 0.37rem;
      width: 70%;
      background: #fff;
      position: absolute;
      left: 15%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      padding: 0.4rem;
      .touxiang{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .manage-time{
        margin-top: 0.3rem;
        position: relative;
         color: #666666;
        font-size: 0.37rem;
        .rem(line-height,60);
        >div{
           position: relative;
          .rem(height,60);
        width:84%;
        border-radius: 8px;
        .rem(line-height,60);
        border: 1px solid #222222;
        margin-left: 8%;
        padding-left: 0.3rem;
        img{
          width: 0.3rem;
          position: absolute;
          right: 0.3rem;
          top: 0.3rem;
        }
        }
        ul{
          position: absolute;
          background: #fff;
          width: 84%;
          left: 8%;
          border-radius: 6px;
          z-index: 9;
          top: 0.9rem;
          box-shadow: 0 -2px 4px 0px #d9d9d9;
          li{
            width: 82%;
            margin-left: 15%;
            border-bottom: 1px solid #F5F7FA;
            position: relative;
            i{position: absolute;
            color: #479FFF;
            left: -0.5rem;}
          }
        }
      }
      .btn{

        .rem(width,270);
        .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
        .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
         margin: 0 auto;
        margin-top: 0.4rem;
      }
      .close-btn{
       position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
  }
  .content{
    color: #555;
    text-align: center;
    .kj{
      background: #fff;
      color:#555;
      .wx-tip{
        padding: 0.3rem 0.21rem;
        font-size: 0.48rem;
        // margin-bottom: 0.3rem;
        .next-issue-mess{
          .next-issue{
            font-size: .3rem;
            color: #555;
          }
          .countdown-time{
            color: #FF5640;
            .rem(font-size,36);
            font-weight: bold;
            font-family: number2;
          }
        }
        
        .down-icon{
          .rem(width,40);
          .rem(height,40);
          background: url('../../assets/images/ynxz/b_Subtract.png')no-repeat;
          background-size: contain;
        }
        .up-icon{
          .rem(width,40);
          .rem(height,40);
          background: url('../../assets/images/ynxz/up_Subtract.png')no-repeat;
          background-size: contain;
        }
        i{
          font-size: 0.38rem;
        }
        .czlb{
          .rem(min-width,264);
          .rem(height,56);
          .rem(font-size,28);
           position: relative;
          .cz-name{
            .rem(height,56);
            .rem(line-height,56);
            .rem(font-size,28);
            border: 1px solid  #4A89EC;
            .rem(border-radius,8);
            position: relative;
            .rem(padding-right,20);
            &.skin-border-b-pink{
              .icon{
                background: url('../../assets/images/ynxz/p_1.png') no-repeat;
                background-size: contain;
              }
            }
            &.skin-border-b-blue{
              .icon{
                background: url('../../assets/images/ynxz/b_1.png') no-repeat;
                background-size: contain;
              }
            }
            &.skin-border-b-green{
              .icon{
                background: url('../../assets/images/ynxz/g_1.png') no-repeat;
                background-size: contain;
              }
            }
             &.skin-border-b-maingreen{
              .icon{
                background: url('../../assets/images/ynxz/g_1.png') no-repeat;
                background-size: contain;
              }
            }
            .icon{
              display: inline-block;
              .rem(width,20);
              .rem(height,12);
              background: url('../../assets/images/ynxz/blue_arrow.png') no-repeat;
              background-size: contain;
              position: absolute;
              .rem(top,20);
              .rem(right,10);
              &.active{
                transform: rotate(180deg);
              }
            }
          }
        }
      }
      .kj-rq{
        padding: 0 0.21rem; 
         font-size: 0.38rem;
          border-bottom: 1px solid #E5E5E5;
          line-height: .8rem;
          position: relative;
          .tips-icon{
              display: inline-block;
            .rem(width,32);
            .rem(height,32);
            background: url('../../assets/images/ynxz/tips-icon.png')no-repeat;
            background-size: cover;
            position: absolute;
            right: .3rem;
            top: .2rem;
          }
          .open-num{
            vertical-align: middle;
          }
          .more-pk3{
             display: inline-block;
            .rem(width,20);
            .rem(height,20);
            background: url('../../assets/images/ynxz/morepk3.png')no-repeat;
            background-size: contain;
            vertical-align: middle;
          }
          .curr-date{
            color:#3A81E5;
            margin-left: 0.2rem;
          }
          .countdown-time{
            color: #FF5640;
            .rem(font-size,36);
            font-weight: bold;
            font-family: number2;
          }

      }
      .more-time{
        // .rem(height,302);s
        width: 100%;
        font-size: 0.34rem;
        text-align: center;
        background: #D3E1FC;
        color: #555;
        >span{
          width: 100%;
          .rem(height,60);
          .rem(line-height,60);
          color: #287BE1;
          display: inline-block;
        
          &:nth-child(1){
            border-bottom: 1px solid #fff;
          }
        }
        .refer{
          color: #fff;
          background: #287BE1;
        }
        ul{
          li{
            border-bottom: 1px solid #fff;
            border-right: 1px solid #fff;
            width: 50%;
            display: inline-block;
            padding: .2rem 0;
            &:nth-child(2n){
              border-right: none;
            }
            span{
              display: inline-block;
              width: 49%;
              .rem(height,80);
              .rem(line-height,80);
              &:nth-child(1){
                border-right: 1px solid #fff;
              }
            }
          }
        }
      }
    }
   .zmw-tips{
     background: #fff;
     text-align: right;
     .rem(height,64);
     .rem(line-height,64);
    padding:0 0.21333333rem;
     .tips-icon{
        display: inline-block;
        .rem(width,32);
        .rem(height,32);
        background: url('../../assets/images/ynxz/tips-icon.png')no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-left: 0.18rem;
      }
   }
    .title-tab{
      // border-top: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      .rem(padding,16);
      background: #fff;
      display: flex;
      span{
            .rem(height,70);
        .rem(line-height,70);
        .rem(font-size,24);
        display: inline-block;
      
        // width: 33.33%;
        flex: 1;
        color: #287BE1;
        border: 1px solid #287BE1;
            word-break: break-all;
        &:nth-child(1){
          border-radius: 5px 0 0 5px;
          border-right: none;
        }
        &:nth-last-child(1){
          border-radius:0 5px 5px 0;
          border-left: none;
        }
        &.active{
          color: #fff;
          background: #287BE1;
          border: 1px solid #287BE1;
        }
      }
    }
    .tips{
      text-align: right;
      font-size: 0.3rem;
      .rem(padding,16);
      background: #fff;
      .more-num-select{
        border-radius: .1rem;
        text-align: center;
        border: 1px solid #bbb;
        color: #555;
        padding: 0 .2rem;
        position: relative;
        .rem(font-size,28);
        position: relative;
        .num-tip{
          position: absolute;
          border-radius: 50%;
          background: #FF5640;
          font-family: number2;
          .rem(height,28);
          .rem(line-height,28);
          border-radius: .1rem;
          right:-8px;
          top: -8px;
          padding: 0 .1rem;
          color:#fff;
        }
        .down-icon{
          margin-left: .4rem;
          display: block;
          position: absolute;
          bottom: 0px;
          right: .1rem;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-top: 6px solid #bbb;
        }
        &.more-num-select-t{
          padding: 0 .5rem 0 .2rem;
        }
      }
      &.grey{
        background: #F3F4F5;
      }
      .tips-icon{
        display: inline-block;
        .rem(width,32);
        .rem(height,32);
        background: url('../../assets/images/ynxz/tips-icon.png')no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-left: 0.2rem;
      }
      i{
        color:#3A81E5;
        font-size: 0.32rem;
      }
    }
    .chouma-list{
      background: #fff;
      .cm-list{
        .rem(padding,16);
        .rem(padding-bottom,40);
        border-bottom: 1px solid #E5E5E5;
        .list-lf{
          .rem(width,157);
          .rem(height,60);
          .rem(line-height,60);
          background: url('../../assets/images/ynxz/gray_Rectangle.png')no-repeat;
          background-size: cover;
          color:#555;
          &.active{
            background: url('../../assets/images/ynxz/blue_Rectangle.png')no-repeat;
            background-size: cover;
            color:#fff;
          }

        }
        .list-r{
          width: 72%;
          .list-tab{
              span{
                display: inline-block;
                padding:0 0.1rem;
                .rem(height,56);
                .rem(line-height,56);
                .rem(margin-right,6);
                color:#555;
                border:1px solid #555;
                border-radius: 3px;
                &.active{
                  color:#fff;
                  background: #DFA040;
                  border: 1px solid #DFA040;
                }
              }
          }
          .list-content{
            span{
              display: block;
              .rem(width,88);
              .rem(height,88);
              .rem(line-height,88);
              .rem(margin-right,12);
              .rem(margin-top,28);
              text-align: center;
              border-radius: 50%;
              border: 1px solid #D1D1D1;
              box-sizing: border-box;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
              font-family: PingFang SC;
              font-size: 0.42rem;
              position: relative;
              font-family: number2;
              &.active{
                color: #fff;
                background: linear-gradient(180deg, #8AD5FF 0%, #1F4FF8 100%);
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
                border: none;
              }
              i{
              display: block;
              position: absolute;
              right: -0.2rem;
              top: -0.2rem;
              .rem(width,32);
              .rem(height,32);
              .rem(line-height,32);
              .rem(font-size,15);
              background: #F2F2F2;
              color: #838383;
              border-radius: 50%;
              &.orange-bg{
                 color: #fff;
                 background: #FF3232;
              }
              &.blue-bg{
                 color: #fff;
                 background: #287BE1;
              }
            }
            }
          }
        }
      }
    }
    .textarea-warp{
      background: #fff;
      .rem(width,702);
      .rem(height,314);
      margin: 0 auto;
      border-radius: 4px; 
      text-align: left;
      
      position: relative;
      .play-textarea{
        width: 100%;
        padding: 1em;
        height: 100%;
        outline: none;
        resize: none;
        position: relative;
        z-index: 2;
        background: transparent;
      }
      .play-explain{
        color: #B6B6B6;
        width: 93%;
        .rem(line-height,45);
        position: absolute;
        top: 1em;
        left: 1em;
        z-index: 1;
        span{
          i{
            color: #d7524e;
          }
        }
      }
    }
    .ks-list{
      font-size: 0.36rem;
      color: #555;
      background: #fff;
      .ksxz-list{
        padding:0 0.3rem .3rem;
        background: #fff;
         .rem(line-height,62);
        i{
          display: inline-block;
        }
        .ks-tips{
          .rem(width,32);
          .rem(height,32);
          background: url('../../assets/images/ynxz/kx-icon.png')no-repeat;
          background-size: contain;
          vertical-align: middle;
        }
        span{
          display: inline-block;
          .rem(height,50);
          .rem(line-height,50);
          padding: 0 0.2rem;
          color: #B4B4B4;
          border-radius: 4px;
          border: 1px solid #B4B4B4;
          margin-left: 0.2rem;
          &.active{
            color: #287BE1;
            border-color: #287BE1;
          }
        }
      }
      .lx-tab{
        background: #ECF4FF;
        width: 95.2%;
        margin: 0 auto 0.38rem auto;
        padding: 0.24rem 0 0.4rem;
        position: relative;
        ul{
          
          li{
            .rem(height,48);
            .rem(line-height,48);
            padding: 0 0.32rem;
            .rem(margin-left,22);
            margin-bottom: .1rem;
            border-radius: 4px;
            border: 1px solid #555;
            &.active{
              color:#fff;
              background: #287BE1;
              border-color: #287BE1;
            }
          }
        }
        .up-icon{
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border:7px solid transparent;
          border-bottom: 7px solid #287BE1;
 
        }
        .dn-icon{
          display: block;
          position: absolute;
          bottom: 9px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border: 7px solid transparent;
          border-top: 7px solid #287BE1;
        }
      }
      .kx-list{
        
        ul{
          padding: 0 0.27rem;
          li{
            .rem(width,120);
            .rem(height,80);
            .rem(line-height,80);
            .rem(margin-right,25);
            .rem(margin-bottom,22);
            border-radius: 4px;
            border: 1px solid #949494;
            font-size: 0.4rem;
            position: relative;

            font-family: number2;
            &:nth-of-type(5n){
              margin-right: 0;
            }
            i{
              display: block;
              position: absolute;
              right: -0.2rem;
              top: -0.2rem;
              .rem(width,32);
              .rem(height,32);
              .rem(line-height,32);
              .rem(font-size,15);
              background: #F2F2F2;
              color: #838383;
              border-radius: 50%;
              &.orange-bg{
                 color: #fff;
                 background: #FF3232;
              }
              &.blue-bg{
                 color: #fff;
                 background: #287BE1;
              }
            }
            &.active{
              background: url('../../assets/images/ynxz/xz.png')no-repeat;
              background-size: 100% 100%;
              border: none;
              // i{
              //   color: #287BE1;
              //   background:  #B9E2FF;;
              // }
            }
            &.no-active{
              border: 1px solid #ddd;
              i{
                // color: #eee;
              }
            }
          }
        }
      }
    }
    .pc2{
      p{
        text-align: center;
        .rem(height,64);
        .rem(line-height,64);
        font-size: 0.32rem;
        background: #f3f4f5;
      }
      ul{
        background: #fff;
        padding:  0.26rem 2% 0 0;
        li{
          // .rem(width,172);
          width: 23%;
          margin-left: 2%;
          .rem(height,92);
         
          .rem(margin-bottom,22);
          border: 1px solid #D1D1D1;
          border-radius: 4px;
          // .rem(line-height,46);
          font-size: 0.32rem;
          &:nth-of-type(3n){
            // margin-right: 0;
          }
          span{
            display: block;
            &:nth-child(1){
              font-size: 0.45rem;
              font-family: number2;
              margin: 0.1rem 0 0.1rem 0;
            }
            &:nth-child(2){
              color: #FF3232;

            }
          }
           &.active{
              background: url('../../assets/images/ynxz/xz.png')no-repeat;
              background-size: 100% 100%;
              border: none;
            }
        }
      }
    }
  }
  .chouma-box{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 750px;
    .rem(height, 274);
    font-size: 0.32rem;
    .chips-img{
      padding: 0 0.32rem;
      // .rem(padding-top,22);
      .rem(padding-top,15);
      position: relative;
      bottom: -0.15rem;
      >span{
       
        display: block;
        .rem(width,100);
        .rem(height, 120);
        .rem(margin-right, 8);
        &.active{
          margin-top: -.1rem;
        }
        &:nth-child(4){
          margin-right: 0;
        }
          &.chips-1{
            background: url('../../assets/images/ynxz/cm1.png')no-repeat;
            background-size: contain;
          }
          &.chips-2{
            background: url('../../assets/images/ynxz/cm2.png')no-repeat;
            background-size: contain;
          }
          &.chips-3{
            background: url('../../assets/images/ynxz/cm3.png')no-repeat;
            background-size: contain;
          }
          &.chips-4{
            background: url('../../assets/images/ynxz/cm4.png')no-repeat;
            background-size: contain;
          }
          &.chips-5{
            background: url('../../assets/images/ynxz/cm5.png')no-repeat;
            background-size: contain;
          }
      }
      >div{
        .rem(padding-top,42);
        span{
          display: block;
          i{
            color: #287BE1;

          }
        }
      }
    }
    .chips-total{
      padding: 0.29rem 0.32rem 0.47rem;
      // .rem(padding-top,22);
      background: #ECF4FF;
      width: 100%;
      color: #555;
      .chips-left{
        input{
          .rem(width,126);
          background: #fff;
           border-radius: 4px;
          color: #000;
          .rem(height,54);
          .rem(line-height,54);
          margin-right: 0.15rem;
          margin-bottom: 0.2rem;
          text-align: center;
        }
        .refresh-icon{
          display: inline-block;
          .rem(width,36);
          .rem(height,30);
          background: url('../../assets/images/ynxz/sx_icon.png')no-repeat;
          background-size: contain;
          vertical-align: middle;
        }
      }
      .chips-right{
        span{
          display:inline-block;
          .rem(width,168);
          .rem(height,80);
          .rem(line-height,80);
          background: linear-gradient(180deg, #FACB70 0%, #FF995C 100%);
          border-radius: 4px;
          color: #fff;
          text-align: center;
          &:nth-child(2){
            background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%);
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
  
  .show-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    //导玩弹窗
    .hint-box{
      position: relative;
      top: 50%;
      background: #fff;
      border-radius: 6px;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 84.8%;
      // .rem(height,558);
      
      color: #555;
      .rem(line-height,40);
      padding: .2rem 0.26rem .4rem .26rem;
      font-size: 0.32rem;
      h3{
        font-size: 0.45rem;
        text-align: center;
        padding: 0.2rem 0;
      }
      .enter-btn{
        background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%);
        border-radius: 4px;
        .rem(height,60);
        .rem(line-height,60);
        .rem(width,200);
        color: #fff;
        text-align: center;
        margin: 0.5rem auto 0;
      }
    }
    //选择日期弹窗
    .date-box{
      height: 12rem;
      top: 2rem !important;
      background: #F1F1F1;
      transform: translate(-50%,0) !important;
      ul{
        background: #fff;
        // width: 91.2%;
        margin: 0 auto;
        .rem(max-height,388);
        .rem(height,388);
        li{
          border-bottom: 1px solid #C4C4C4;
          margin: 0 0.1rem;
          .rem(height,71);
          .rem(line-height,71);
          color: #000;
          .rem(font-size,28);
          span{
            display: inline-block;
            width: 32%;
            text-align: center;
            >i{
              display: inline-block;
              color: #fff;
              background: #287BE1;
              border-radius: 4px;
              padding:0 0.1rem;
              .rem(height,40);
              .rem(line-height,40);
            }
            &:nth-child(3){
              display: none;
              color: #287BE1;
              background: url(../../assets/images/ynxz/gou.png) center right no-repeat;
              width: .5rem;
              height: 0.4rem;
              background-size: contain;
              float: right;
              margin: .2rem;
            }
          }
          &.active{
           span{
              &:nth-child(3){
              display: inline-block;
              
            }
           }
          }
        }
      }
      h3{
        font-size: 0.45rem;
        text-align: center;
        padding: 0.2rem 0;
      }
      .bottom-btn{
        padding: 0.3rem 0.8rem 0;
        position: absolute;
        bottom: 0.2rem;
        width: 95%;
        left: 50%;
        transform: translateX(-50%);
        span{
            display: inline-block;
            background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%);
            border-radius: 4px;
            .rem(height,60);
            .rem(line-height,60);
            .rem(width,200);
            color: #fff;
            text-align: center;
            &:nth-child(1){
              background: linear-gradient(180deg, #FACB70 0%, #FF995C 100%);
            }
        }
      }
    }
    //确认下注
  
  }
    .qr-box{
      position: relative;
      top: 50%;
      background: #f6f6f9;
      border-radius: 6px;
      overflow: hidden;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 84.8%;
      // .rem(height,488);
      color: #555;
      .rem(line-height,50);
      padding: 0 0 .5rem 0;
      font-size: 0.36rem;

      h3{
        font-size: 0.45rem;
        text-align: center;
        padding: 0.2rem 0;
        background: #287BE1;
        color: #fff;

        i{
          font-size: .38rem;
          color: hsla(0,0%,100%,.6);
        }
      }
      >div{
        border-top: 1px solid #F3F4F5;
        >span{
          display: block;
          
        }
         i{
            font-style: bold;
            color:#287BE1;
          }
        &.btn-box{
          width: 84%;
          margin: 0.3rem auto 0;
           border-top:0;
          div{
            background: linear-gradient(180deg, #FACB70 0%, #FF995C 100%);
            border-radius: 4px;
            .rem(height,60);
             .rem(line-height,60);
            .rem(width,200);
            text-align: center;
            color: #fff;
            &:nth-child(2){
              background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%);
            }
          }
        }
      }
    }
  .title-list-box{
    width: 100%;
    top: 2.5rem;
    color: #555;
    &.allGAme-box{
      top: 1.18rem;
      height: 100%;
    }
    .title-list{
      background: #F3F4F5;
      height: 70%;
      .sort-list{
        padding:0 0.42rem;
        border: 1px solid #F3F4F5;
        span{
          font-size: 0.32rem;
          color:#287BE1;
          .rem(line-height,70);
        }
        ul{
          li{
            .rem(min-width,202);
            padding: 0 0.2rem;
            .rem(height,70);
            .rem(line-height,70);
            text-align: center;
            background: #F6FAFF;
            border: 1px solid #E4E3E3;
            box-sizing: border-box;
            border-radius: 4px;
            .rem(margin-right,18);
            .rem(margin-bottom,26);
            &:nth-of-type(3n){
              // margin-right: 0;
            }
            &.active{
              background: #287BE1;
              border: 1px solid #287BE1;
              color: #fff;
            }
          }
        }
      }
    }
    .title-pink{
      .sort-list{
        >span{
          color: #FB796B!important;
        }
      }
      ul{
        li.active{
          background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
          border-color: #FB796B!important;
        }
      }
    }
    .title-blue{
        .sort-list{
        >span{
          color: #0CB6D9!important;
        }
      }
      ul{
        li.active{
          background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%)!important;
          border-color: #0CB6D9!important;
        }
      }
    }
    .title-green{
        .sort-list{
        >span{
          color: #00B681!important;
        }
      }
      ul{
        li.active{
          background: linear-gradient(89.97deg, #32C986 0.02%, #59F3B2 99.97%)!important;
          border-color: #00B681!important;
        }
      }
    }
    .title-maingreen{
        .sort-list{
        >span{
          color: #00B681!important;
        }
      }
      ul{
        li.active{
          background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
          border-color: #00B681!important;
        }
      }
    }
    .title-golden{
        .sort-list{
        >span{
          color: #A85100!important;
        }
      }
      ul{
        li.active{
          background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
          border-color: #D6B966!important;
          color: #A85100 !important;

        }
      }
    }
    &.title-list-box-golden{
      .title-list{
        .sort-list{
          border: none;
          border-bottom: 1px solid #000;
          ul{
            li{
              color:#cecece;
              background: #464B53;
              border: 1px solid #464B53;
            }
          }
        }
      }
    }
  }

    .kj-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    .kj-list{
        background: #fff;
        width: 92%;
        position: relative;
        left: 50%;
        transform: translate(-50%,-50%);
        // top: 2rem;
        top:50%;
        border-radius: 6px;
        text-align: center;
        // .rem(height,800);
        // max-height: 13rem;
        padding-bottom: .5rem;
        color:#555555;
        h3{
            font-size: 0.42rem;
            .rem(line-height,90);
            i{
                color: #287BE1;

            }
        }
        table{
            border-collapse: collapse;
            width: 100%;
            font-size: .36rem;
            tr{
                .rem(line-height,60);
                border-bottom: 1px solid #efefef;
                &:nth-child(1){
                    border-top: 1px solid #efefef;
                }
                td{
                  div{
                    display: inline-block;

                    i{
                      padding: 0 2px;
                    }
                    span{
                      color: #ff9741;
                    }
                  }
                    border-right: 1px solid #efefef;
                    width: 20%;
                    &:nth-child(2){
                        width: 45%;
                        line-height: .4rem;
                    }
                    &:nth-child(3){
                        width: 15%;
                    }
                    &:nth-last-child(1){
                        border-right: 0;
                        width: 20%;
                    }
                }
            }
        }
        .co-hui{
            background: #ECF4FF;
        }
        .btn{
            background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%);
            border-radius: 4px; 
            .rem(width,200);
            .rem(height,60);
            .rem(line-height,60);color: #fff;
            font-size: 0.32rem;
            margin: 0.26rem auto;
        }
    }
  }


  .xzTab-pink{
       .chat-box{
      .ds-btn{
       background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
      }
    }
    .kj-box{
      .kj-list{
        h3{ i{color: #FB796B!important;}}
        .btn{
          background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
        }
      }
    }
    .qr-box{
      h3{
        background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
      }
       .btn-box{
          div{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
            }
          }
        }
    }
     .enter-btn{
      background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
    }
    
    header{
      
        background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
    }
     .content{
       .kj{
          .curr-date{
            color: #FB796B!important;
          }
          .more-time{
              background: #FFE3DA!important;
              >span{
                color:#FB796B!important;
                &.refer{
                  background: #FB796B!important;
                  color:#fff!important;
              }
            }
          }
          .wx-tip{
            .down-icon{
                background: url('../../assets/images/ynxz/b_Subtract-pink.png')no-repeat!important;
                background-size: contain!important;     
            }
            .up-icon{
                background: url('../../assets/images/ynxz/up_Subtract-pink.png')no-repeat!important;
                background-size: contain!important;     
            }
          }     
       }
       .tips{
         p{
           span{
             i{
               color:#FB796B;
             }
           }
         }
       }
       .title-tab{
         span{
           color: #FB796B!important;
           border: 1px solid #FB796B!important;
         }
         .active{
           background: #FB796B!important;
           color: #fff!important;
         }
       }
       .chouma-list{
         .cm-list{
          .list-lf{
              &.active{
                background: url('../../assets/images/ynxz/Rectangle-pink.png')no-repeat!important;
                background-size: cover!important;
              }

            }
            .list-r{
              .list-content{
                span{
                  &.active{
                    background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
                  }
                }
              }
            }
         }
            .pc2{
           ul{
             li.active{
                 background: url('../../assets/images/ynxz/xz-pink.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
             }
           }
         }
       
       }
       .ks-list{
         .ksxz-list{
           div{
             .ks-tips{
                background: url('../../assets/images/ynxz/kx-icon-pink.png')no-repeat!important;
                background-size: contain!important;
             }
             &:nth-last-child(1){
               .active{
                 color: #FB796B!important;
                 border-color: #FB796B!important;
               }
             }
           }
         }
         .lx-tab{
           background: #FFE3DA!important;
           .up-icon{
             border-bottom: 7px solid #FB796B!important;
           }
           .dn-icon{
             border-top: 7px solid #FB796B!important;
           }
            ul>li{
              &.active{
                  background: #FB796B!important;
                  color:#fff!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
         .kx-list{
            ul>li{
              &.active{
                  background: url('../../assets/images/ynxz/xz-pink.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
       }

    }
    .chouma-box{
        .chips-img{
           >div{
             span{
               i{
                 color: #FB796B!important;
               }
             }
           }
         }
      .chips-total{
        .chips-right{
          span{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
            }
          }
        }
        .chips-left{
          .refresh-icon{
            background: url('../../assets/images/ynxz/sx_icon-pink.png')no-repeat!important;
            background-size: contain!important;
          }
        }
      }
    }
  }
  .xzTab-blue{
       .kj-box{
      .kj-list{
        h3{ i{color:#0CB6D9!important;}}
        .btn{
          background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
        }
      }
    }
     .qr-box{
      h3{
        background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
      }
       .btn-box{
          div{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
            }
          }
        }
    }
    header{
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
    }
     .content{
       .kj{
          .curr-date{
            color:#0CB6D9!important;
          }
          .more-time{
              background: #DAEFFF!important;
              >span{
                color:#0CB6D9!important;
                &.refer{
                  background: #0CB6D9!important;
                  color:#fff!important;
              }
            }
          }
          .wx-tip{
            .down-icon{
                background: url('../../assets/images/ynxz/b_Subtract-blue.png')no-repeat!important;
                background-size: contain!important;     
            }
            .up-icon{
                background: url('../../assets/images/ynxz/up_Subtract-blue.png')no-repeat!important;
                background-size: contain!important;     
            }
          }     
       }
       .tips{
         p{
           span{
             i{
               color:#0CB6D9;
             }
           }
         }
       }
       .title-tab{
         span{
           color: #0CB6D9!important;
           border: 1px solid #0CB6D9!important;
         }
         .active{
           background: #0CB6D9!important;
           color: #fff!important;
         }
       }
       .chouma-list{
         .cm-list{
          .list-lf{
              &.active{
                background: url('../../assets/images/ynxz/Rectangle-blue.png')no-repeat!important;
                background-size: cover!important;
              }

            }
            .list-r{
              .list-content{
                span{
                  &.active{
                    background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
                  }
                }
              }
            }
         }
            .pc2{
           ul{
             li.active{
                 background: url('../../assets/images/ynxz/xz-blue.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
             }
           }
         }
       
       }
       .ks-list{
         .ksxz-list{
           div{
             .ks-tips{
                background: url('../../assets/images/ynxz/kx-icon-blue.png')no-repeat!important;
                background-size: contain!important;
             }
             &:nth-last-child(1){
               .active{
                 color: #0CB6D9!important;
                 border-color: #0CB6D9!important;
               }
             }
           }
         }
         .lx-tab{
           background: #DAEFFF!important;
           .up-icon{
             border-bottom: 7px solid #0CB6D9 !important;
           }
           .dn-icon{
             border-top: 7px solid #0CB6D9 !important;
           }
            ul>li{
              &.active{
                  background: #0CB6D9!important;
                  color:#fff!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
         .kx-list{
            ul>li{
              &.active{
                  background: url('../../assets/images/ynxz/xz-blue.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
       }

    }
    .chouma-box{
        .chips-img{
           >div{
             span{
               i{
                 color: #0CB6D9!important;
               }
             }
           }
         }
      .chips-total{
        .chips-right{
          span{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
            }
          }
        }
        .chips-left{
          .refresh-icon{
            background: url('../../assets/images/ynxz/sx_icon-blue.png')no-repeat!important;
            background-size: contain!important;
          }
        }
      }
    }
    .enter-btn{
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
    }
      .chat-box{
      .ds-btn{
       background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
      }
    }
  }
  .xzTab-green{
    .chat-box{
      .ds-btn{
        background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
      }
    }
    .kj-box{
      .kj-list{
        h3{ i{color: #00B681!important;}}
        .btn{
          background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
        }
      }
    }       
     .qr-box{
      h3{
        background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
      }
       .btn-box{
          div{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
            }
          }
        }
    }
    .enter-btn{
      background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
    }
    header{
      background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
    }
     .content{
       .kj{
          .curr-date{
            color: #00B681!important;
          }
          .more-time{
              background: #D3FCDE!important;
              >span{
                color:#00B681!important;
                &.refer{
                  background: #3DCE8D!important;
                  color:#fff!important;
              }
            }
          }
          .wx-tip{
            .down-icon{
                background: url('../../assets/images/ynxz/b_Subtract-green.png')no-repeat!important;
                background-size: contain!important;     
            }
            .up-icon{
                background: url('../../assets/images/ynxz/up_Subtract-green.png')no-repeat!important;
                background-size: contain!important;     
            }
          }     
       }
       .tips{
         p{
           span{
             i{
               color:#00B681;
             }
           }
         }
       }
       .title-tab{
         span{
           color: #3DCE8D!important;
           border: 1px solid #3DCE8D!important;
         }
         .active{
           background: #3DCE8D!important;
           color: #fff!important;
         }
       }
       .chouma-list{
         .cm-list{
          .list-lf{
              &.active{
                background: url('../../assets/images/ynxz/Rectangle-green.png')no-repeat!important;
                background-size: cover!important;
              }

            }
            .list-r{
              .list-content{
                span{
                  &.active{
                    background: linear-gradient(1.76deg, #32C986 0.42%, #59F3B2 97.44%)!important;
                  }
                }
              }
            }
         }
         .pc2{
           ul{
             li.active{
                 background: url('../../assets/images/ynxz/xz-green.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
             }
           }
         }
       
       }
       .ks-list{
         .ksxz-list{
           div{
             .ks-tips{
                background: url('../../assets/images/ynxz/kx-icon-green.png')no-repeat!important;
                background-size: contain!important;
             }
             &:nth-last-child(1){
               .active{
                 color: #00B681!important;
                 border-color: #00B681!important;
               }
             }
           }
         }
         .lx-tab{
           background: #D3FCDE!important;
           .up-icon{
             border-bottom: 7px solid #3DCE8D !important;
           }
           .dn-icon{
             border-top: 7px solid #3DCE8D !important;
           }
            ul>li{
              &.active{
                  background: #3DCE8D!important;
                  color:#fff!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
         .kx-list{
            ul>li{
              &.active{
                  background: url('../../assets/images/ynxz/xz-green.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
       }

    }
    .chouma-box{
        .chips-img{
           >div{
             span{
               i{
                 color: #00B681!important;
               }
             }
           }
         }
      .chips-total{
        .chips-right{
          span{
            &:nth-child(2){
              background: linear-gradient(1.76deg, #32C986 0.42%, #59F3B2 97.44%)!important;
            }
          }
        }
        .chips-left{
          .refresh-icon{
            background: url('../../assets/images/ynxz/sx_icon-green.png')no-repeat!important;
            background-size: contain!important;
          }
        }
      }
    }
  }
    .xzTab-maingreen{
    .chat-box{
      .ds-btn{
        background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
      }
    }
    .kj-box{
      .kj-list{
        h3{ i{color: #00B681!important;}}
        .btn{
          background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%)!important;
        }
      }
    }       
     .qr-box{
      h3{
        background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
      }
       .btn-box{
          div{
            &:nth-child(2){
              background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
            }
          }
        }
    }
    .enter-btn{
      background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%) !important;
    }
    header{
      background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
    }
     .content{
       .kj{
          .curr-date{
            color: #00B681!important;
          }
          .more-time{
              background: #D3FCDE!important;
              >span{
                color:#00B681!important;
                &.refer{
                  background: #01B373!important;
                  color:#fff!important;
              }
            }
          }
          .wx-tip{
            .down-icon{
                background: url('../../assets/images/ynxz/b_Subtract-maingreen.png')no-repeat!important;
                background-size: contain!important;     
            }
            .up-icon{
                background: url('../../assets/images/ynxz/up_Subtract-maingreen.png')no-repeat!important;
                background-size: contain!important;     
            }
          }     
       }
       .tips{
         p{
           span{
             i{
               color:#01B373;
             }
           }
         }
       }
       .title-tab{
         span{
           color: #01B373!important;
           border: 1px solid #01B373!important;
         }
         .active{
           background: #01B373!important;
           color: #fff!important;
         }
       }
       .chouma-list{
         .cm-list{
          .list-lf{
              &.active{
                background: url('../../assets/images/ynxz/Rectangle-maingreen.png')no-repeat!important;
                background-size: cover!important;
              }

            }
            .list-r{
              .list-content{
                span{
                  &.active{
                    background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%) !important;
                  }
                }
              }
            }
         }
         .pc2{
           ul{
             li.active{
                 background: url('../../assets/images/ynxz/xz-green.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
             }
           }
         }
       
       }
       .ks-list{
         .ksxz-list{
           div{
             .ks-tips{
                background: url('../../assets/images/ynxz/kx-icon-green.png')no-repeat!important;
                background-size: contain!important;
             }
             &:nth-last-child(1){
               .active{
                 color: #00B681!important;
                 border-color: #00B681!important;
               }
             }
           }
         }
         .lx-tab{
           background: #D3FCDE!important;
           .up-icon{
             border-bottom: 7px solid #01B373 !important;
           }
           .dn-icon{
             border-top: 7px solid #01B373 !important;
           }
            ul>li{
              &.active{
                  background: #01B373!important;
                  color:#fff!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
         .kx-list{
            ul>li{
              &.active{
                  background: url('../../assets/images/ynxz/xz-green.png')no-repeat!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
       }

    }
    .chouma-box{
        .chips-img{
           >div{
             span{
               i{
                 color: #00B681!important;
               }
             }
           }
         }
      .chips-total{
        .chips-right{
          span{
            &:nth-child(2){
              background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%) !important;
            }
          }
        }
        .chips-left{
          .refresh-icon{
            background: url('../../assets/images/ynxz/sx_icon-green.png')no-repeat!important;
            background-size: contain!important;
          }
        }
      }
    }
  }
  .xzTab-golden{
    .chat-box{
      .ds-btn{
        background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
      }
    }
    .kj-box{
      .kj-list{
        h3{
           i{color: #A85100!important;}
           background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
           border-radius: 6px 6px 0 0;
          }
        .btn{
          background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%)!important;
        }
      }
    }       
     .qr-box{
      h3{
        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%)!important;
        color: #A85100;
      }
       .btn-box{
          div{
            &:nth-child(2){
              background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%) !important;
            }
          }
        }
    }
    .enter-btn{
      background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;

      color: #A85100 !important;
    }
    header{
      .title{
        color: #E3CF95;
     i{
       &.title-down{
         
         background: url('../../assets/images/skin/golden/donw.png')no-repeat;
         background-size: contain;
         
       }
       &.lt-icon{
         
         background: url('../../assets/images/skin/golden/chat.png')no-repeat;
         background-size: 100% 100%;
         
         &::before{
           
           background: #FF5640;
           
         }
       }
       &.quick-icon{
         background: url('../../assets/images/skin/golden/icon_zhankai.png')no-repeat;
         background-size: 100% 100%;

       }
       &.title-up{
        
         background: url('../../assets/images/skin/golden/up.png')no-repeat;
         background-size: contain;
        
       }
     }
   }
    }
     .content{
      .textarea-warp{
        background: #464B53;
        .play-textarea{
          color:#cecece;
        }
      }
       .kj{
        background: #252A31;
        color: #CECECE;
          .curr-date{
            color: #AB9B62!important;
          }
          .cz-name{
            border: 1px solid #AB9B62 !important; 
            .icon{
              background: url('../../assets/images/skin/golden/select_icon-golden.png')no-repeat!important;
              background-size: contain!important;     
            }
          }
          .more-time{
              background: #464B53!important;
              >span{
                color:#E3CF95!important;
                &.refer{
                  background: #928151!important;
                  color:#fff!important;
              }
              &:nth-child(1){
                border-bottom: 1px solid #1F252C;

              }
            }
            ul{
              li{
                border-bottom: 1px solid #1F252C;
                border-right: 1px solid #1F252C;
                color: #cecece;
              }
            }
          }
          .wx-tip{
            .down-icon{
                background: url('../../assets/images/skin/golden/donw.png')no-repeat!important;
                background-size: contain!important;     
            }
            .up-icon{
                background: url('../../assets/images/skin/golden/up.png')no-repeat!important;
                background-size: contain!important;     
            }
          }     
          .kj-rq{
            border-bottom: 1px solid #1F252C;
          }
       }
       .tips{
        border-top: 1px solid #1F252C;
        background: #252A31;
         p{
          color: #cecece;
           span{
             i{
               color:#E3CF95;
             }
           }
         }
         .more-num-select{
          color: #A85100;
         }
       }
       .title-tab{
        border-bottom: 1px solid #1F252C;
        background: #252A31;
         span{
           color: #CECECE!important;
           border: 1px solid #D6B966!important;
         }
         .active{
          background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%)!important;
           color: #A85100!important;
         }
       }
       .chouma-list{
        background: #252A31;
         .cm-list{
          border-bottom: 5px solid #1F252C;
          background: #252A31;
          .list-lf{
              background: url('../../assets/images/skin/golden/44.png')no-repeat;
                background-size: cover;
                color:#cecece;
              &.active{
                background: url('../../assets/images/skin/golden/33.png')no-repeat!important;
                background-size: cover!important;
                color:#A85100;
              }

            }
            .list-r{
              .list-tab{
                span{
                  background: #464B53;
                  color:#cecece;
                  border: 1px solid #464B53;
                  &.active{
                    background:  #DFA040 !important;
                    color: #464B53 !important;
                  }
                }
              }
              .list-content{
                span{
                  background: #464B53;
                  color:#cecece;
                  border: 1px solid #464B53;
                  &.active{
                    background:  linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
                    color: #464B53 !important;
                  }
                }
              }
            }
         }
         .pc2{
          background: #252A31;
          p{
            background: #464B53 !important;
            color: #E3CF95 !important;
          }
           ul{
            background: #252A31;
            li{
              background: #464B53;
              border: 1px solid #464B53;
              span{
                color:#cecece;
              }
              span:nth-child(2){
                color: #A85100;
              }
            }
             li.active{
              background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%)!important;
              span{
                color: #464B53;
                &:nth-child(2){
                color: #A85100;
              }
              }
                  background-size: 100% 100%!important;
                  border: none!important;
             }
           }
         }
       
       }
       .ks-list{
        background: #1F252C;
         .ksxz-list{
            background: #1F252C;
            color:#cecece;
           div{
             .ks-tips{
                background: url('../../assets/images/skin/golden/ts_icon-golden.png')no-repeat!important;
                background-size: contain!important;
             }
             &:nth-last-child(1){
               .active{
                 color: #E3CF95!important;
                 border-color: #E3CF95!important;
               }
             }
           }
         }
         .lx-tab{
           background: #252A31!important;
           .up-icon{
             border-bottom: 7px solid #E3CF95 !important;
           }
           .dn-icon{
             border-top: 7px solid #E3CF95 !important;
           }
            ul>li{
              background: #928151;
              color: #CECECE;
              &.active{
                background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                  color:#A85100!important;
                  background-size: 100% 100%!important;
                  border: none!important;
              }
            }
         }
         .kx-list{
            ul>li{
              background: #464B53;
              color:#cecece;
              &.active{
                  // background: url('../../assets/images/ynxz/xz-green.png')no-repeat!important;
                  // background-size: 100% 100%!important;
                  background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                  // border: none!important;
                  color: #464B53;
              }
            }
         }
       }

    }
    .chouma-box{
      color: #cecece;
      background: #161C23;
        .chips-img{
           >div{
             span{
               i{
                 color: #E3CF95!important;
               }
             }
           }
         }
      .chips-total{
        background: #161C23;
        color:#928151;
        .chips-right{
          span{
            &:nth-child(2){
              background: linear-gradient(180deg, #6DC4FF 0%, #1E80FF 100%) !important;
            }
          }
        }
        .chips-left{
          input{
            background: #464B53;
            color:#cecece;
          }
          .refresh-icon{
            background: url('../../assets/images/skin/golden/sx_icon.png')no-repeat!important;
            background-size: contain!important;
          }
        }
      }
    }
    
  }

  .quickInfo-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 100;
    .quick-close{
      width:49%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // background: pink;
    }
    .quick-content{
      width:50%;
      height: 100%;
      color: #555;
      background: #fff;
      position: relative;
      left: 50%;
      top: 0;
      z-index: 101;
      .user-info{
        background: url('../../assets/images/ynxz/user-bg.png')no-repeat;
        background-size: 100% 100%;
        .rem(padding-top,30);
        .rem(padding-left,15);
        .rem(padding-right,15);
        .rem(padding-bottom,20);
        color: #fff;
        &.user-info-pink{
          background: url('../../assets/images/skin/pink/user-bg.png')no-repeat!important;
          background-size: 100% 100%!important;
        }
        &.user-info-blue{
          background: url('../../assets/images/skin/blue/user-bg.png')no-repeat!important;
          background-size: 100% 100%!important;
        }
        &.user-info-green{
          background: url('../../assets/images/skin/green/user-bg.png')no-repeat!important;
          background-size: 100% 100%!important;
        }
        &.user-info-maingreen{
          background: url('../../assets/images/skin/maingreen/user-bg.png')no-repeat!important;
          background-size: 100% 100%!important;
        }
        &.user-info-golden{
          background: url('../../assets/images/skin/golden/user-bg.png')no-repeat!important;
          background-size: 100% 100%!important;
        }
        img{
          .rem(width,100);
          .rem(height,100);
          .rem(margin-right,10);
          .rem(margin-bottom,20);
          border-radius: 50%;
        }
        .name{
          display: block;
          font-weight: bold;
          .rem(font-size,32);
          .rem(margin-top,20);
        }
        .money{
          .rem(font-size,24);
        }
        .btn-group{
          border-top: 1px solid #fff;
          .rem(padding-top,20);
          .home,.recharge{
            display: inline-block;
            .rem(width,160);
            .rem(line-height,50);
            .rem(height,50);
            .rem(font-size,28);
             color: #fff;
             text-align: center;
             border-radius: 5px;
             border: none;
             &.home{
               background: linear-gradient(180deg, #ABE1FF 0%, #2096EB 100%);
              .rem(margin-right,15);
             }
             &.recharge{
               background: linear-gradient(180deg, #FFED46 0%, #FF8D24 100%);
             }
          }
        }
      }
      .quick-list{
        .rem(padding-top,30);
        .rem(padding-left,30);
        .rem(padding-right,20);
        li{
          .rem(font-size,28);
          background: url('../../assets/images/ynxz/right-arrow.png')no-repeat right center;
          background-size: 6%;
          .rem(padding-top,25);
          .rem(padding-bottom,25);
          a{
            color: #555;
          }
          img{
            .rem(width,44);
            .rem(margin-right,24);
            vertical-align: middle;
          }
        }
      }
      .skin-list{
        border-top:1px solid #e9e9e9;
        border-bottom:1px solid #e9e9e9;
        .rem(margin-left,30);
        .rem(margin-right,20);
        .rem(padding-top,16);
        .rem(padding-bottom,16);
        color:#888;
        li{
          .rem(margin-bottom,32);
          &:nth-last-child(1){
            margin-bottom:0;
          }
          
        }
        span{
          display:inline-block;
        }
        img{
          .rem(width,40);
          .rem(height,40);
          .rem(margin-right,8);
          vertical-align: middle;
          border-radius: 2px;
        }
      }
    }
    &.quickInfo-box-golden{
      
      .quick-content{
        background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
        .user-info {
          .btn-group{
            border-top: 1px solid #999;
          }
        }
        .skin-list{
          border-top: 1px solid #5C564D;
          border-bottom: 1px solid #5C564D;
          span{
              color:#cecece;
            }
        }
        .quick-list{
          li{
            color:#cecece;
            a{
              color:#cecece;
            }
           
          }
        }
      }
    }
  }
</style>