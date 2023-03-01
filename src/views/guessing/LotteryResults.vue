<template>
    <div id="LotteryResults" :class="[{'lo-pink':skin==1},{'lo-blue':skin==2},{'lo-green':skin==3},{'lo-maingreen':skin==4},{'lo-golden':skin==5}]">
       <header :class="skin==5?'goldenHeader':''">
         <i class="return-icon" @click="$router.go(-1)"></i>
         <div class="title">{{$t('xz.text5[0]')}}</div>
       </header>
       <div class="data-box clearfix">
           <div class="fl data-icon" @click="showPopup = !showPopup">{{dataValue}}</div>
           <div class="fl tiptext" style="padding:0 5px">{{$t('xz.text5[1]')}}</div>
           <div class="fl data-icon" @click="showPopup2 = !showPopup2">{{dataValue2}}</div>
           <div class="fr go-btn" @click="getOpenData(cid,dataValue,dataValue2)">{{$t('xz.text5[2]')}}</div>
       </div>
       <myScroll :top="2.18" :bottom="0" :bgColor="skin==5?'1F252C':'F3F4F5'">
         <div class="change-type clearfix" @click="PickerShow()">
             <span class="fl" v-if="defalutLan=='vi-vn'">Loại hình:</span>
             <span class="fl" v-if="defalutLan=='en'">Type:</span>
             <div class="fl">{{currName}}</div>
         </div>
         <ul class="clearfix kjData-list" v-if="allOpenData.length">
             <li class="fl" v-for="(item,dateindex) in allOpenData" :key="dateindex" @click="changeOpenData(dateindex)">{{item.belong_date}}/{{item.issue}}</li>
         </ul>
         <p v-if="!allOpenData.length" style="text-align:center;padding-top:3rem">no data</p>
       </myScroll>
      
          <!-- 每一期的开奖弹框 -->

          <div class="kj-box" v-if="showList" @click="closeBox($event)">
           <div class="kj-list" v-if="code=='h2bd'||code=='h2bd1k'||code=='combo2'||code=='combo3'||code=='combo4'||code=='lose4'||code=='lose8'||code=='lose10'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
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
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>
            <div class="kj-list" v-else-if="code=='q2bd'">
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
           <div class="kj-list" v-else-if="code=='h3bd'">
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

            <div class="kj-list" v-else-if="code=='dg0h3dg6'">
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
            <div class="kj-list" v-else-if="code=='h4bd'">
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
            <div class="kj-list" v-else-if="code=='dg0h2'||code=='dg0q2'||code=='dg1q2'||code=='dg1h2'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="code=='dg0h2'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,item.length-2)}}<span>{{item.substring(item.length-2,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="code=='dg0q2'">
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
                  <tr v-if="code=='dg1q2'">
                      <td>{{$t("xz.kj[3]")}}</td>
                      <td><div v-for="(item,index1) in currOpend.firstprize[0].split(',')" :key="index1"><i v-if="index1>0">-</i><span>{{item.substring(0,2)}}</span>{{item.substring(item.length-3,item.length)}}</div></td>
                      <td>0</td>
                      <td>{{currOpend.headsubprize[0]}}</td>
                  </tr>
                  <tr v-else-if="code=='dg1h2'">
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
                  <tr v-if="code=='dg7'">
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
            <div class="kj-list" v-else-if="code=='dg0d1'||code=='dg0d2'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="code=='dg0d2'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,3)}}<span>{{item.substring(item.length-2,item.length-1)}}</span>{{item.substring(item.length-1,item.length)}}</div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-if="code=='dg0d1'">
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
            <div class="kj-list" v-else-if="code=='dg6'||code=='dg0h3'||code=='dg1h3'||code=='dg0h4'||code=='dg7'||code=='dg0h3dg7'||code=='dg8'||code=='dg0h2dg8'">
              <h3>{{currOpend.vname}} <i class="date">{{currOpend.belong_date}}-{{currOpend.issue}}</i></h3>
              <table>
                   <tr v-if="code=='dg0h3'||code=='dg0h3dg7'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,2)}}<span>{{item.substring(item.length-3,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="code=='dg0h4'">
                      <td>{{$t("xz.kj[0]")}}</td>
                      <td><div v-for="item,index in currOpend.grandprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item.substring(0,1)}}<span>{{item.substring(item.length-4,item.length)}}</span></div></td>
                      <td class="co-hui">{{$t("xz.kj[1]")}}</td>
                      <td class="co-hui">{{$t("xz.kj[2]")}}</td>
                  </tr>
                   <tr v-else-if="code=='dg0h2dg8'">
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
                   <tr v-if="code=='dg1h3'">
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
                  <tr v-if="code=='dg6'">
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
                 <tr v-if="code=='dg7'|| code=='dg0h3dg7'">
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
                      <td v-if="code=='dg8'||code=='dg0h2dg8'"><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i><span>{{item}}</span></div></td>
                       <td v-else><div v-for="item,index in currOpend.eigthprize[0].split(',')" :key="index"><i v-if="index>0">-</i>{{item}}</div></td>
                      <td>10</td>
                      <td>{{currOpend.headsubprize[9]}}</td>
                  </tr>
              </table>
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>







          <div class="kj-list" v-else>
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
              <div class="btn" @click="showList=false">{{$t("qdText")}}</div>
           </div>
       </div>
         
        <popup v-model="showPopup">
         <datetime-view format="YYYY-MM-DD" v-model="dataValue"  confirm-text="完成" cancel-text="取消"></datetime-view>
       </popup>
      
        <popup v-model="showPopup2">
         <datetime-view format="YYYY-MM-DD" v-model="dataValue2"  confirm-text="完成" cancel-text="取消"></datetime-view>
       </popup>

       <!-- 彩种切换 -->
        <picker
        :data="allLottery"
        :showToolbar="true"
        cancelText='cancel'
        confirmText='confirm'
        :maskClick="true"
        @change="pickerconfirm1"
        @confirm="confirmCZ"
        :visible.sync="pickershow"
        :rowNumber="1"
        />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { DatetimeView } from 'vux';
import { Datetime } from 'vux';
import { Popup } from 'vux'
import picker from 'vue-pickers'
    export default {
        name: "LotteryResults",
        data(){
            return{
              showList:false,
              showPopup:false,
              showPopup2:false,
              dataValue:this.formatDate2(),
              dataValue2:this.formatDate2(),
              currOpend:{},//选中当前期开奖数据
              allOpenData:[],//选中时间范围内的开奖数据  默认当天
              allLottery:[[]],//所有彩种
              cid:1,//彩种id
              pickershow:false,//显示彩种切换
              code:'h2bd'

            }
        },
        created(){
          this.dataValue = this.formatDate2();
          this.dataValue2 = this.formatDate2();
          //获取传过来的彩种id
          this.cid = this.$route.query.cid;
          this.code = this.$route.query.currcode;

          this.currName = this.$route.query.cname;
          this.getOpenData();
          this.getLotteryData();
          
        },
         components: {
            DatetimeView,Popup,Datetime,picker
        },
        methods: {
          PickerShow(){
              this.pickershow = true;
            },
          pickerconfirm1(){

          },
           closeBox(e){
            // console.log(e)
             console.log(e.target.className)
             if(e.target.className=='kj-box'){
              this.showList = false;
             }
          },
          confirmCZ(val){
            this.cid=val[0].lottery_id;
            // console.log(val[0])
            this.currName=val[0].label;
            // console.log(this.cid)
            this.getOpenData(null,this.dataValue,this.dataValue2)
            
          },
            formatDate2() {
              let date = new Date();
              let y = date.getFullYear(); // 年
              let M = date.getMonth() + 1;
              M = M < 10 ? "0" + M : M; // 月
              let D = date.getDate();
              D = D < 10 ? "0" + D : D; // 日
              let hh = date.getHours();
              hh = hh < 10 ? "0" + hh : hh; // 时
              let mm = date.getMinutes();
              mm = mm < 10 ? "0" + mm : mm;
              return y + "-" + M + "-" + D ;
            },
           changeOpenData(index){
            this.currOpend= this.allOpenData[index];
            this.showList = true;
          },
         //获取开奖数据
          async getOpenData(cid,sdate,edate){
            this.allOpenData = [];
            this.$vux.loading.show();
             let res = await this.$http.get('/api/lottery/index',{params:{lottery_id:this.cid,st:sdate,et:edate}})
             this.$vux.loading.hide();
             if(res.data.data==null||!res.data.data.length) return
             this.currOpend = res.data.data[0] || [];
             this.allOpenData = res.data.data;
             
          },
          //获取彩种
            async getLotteryData(){
             let res = await this.$http.get('/api/lottery/allsort/');
             let arr = res.data.data || [];
              for(let i = 0 ; i < arr.length;i++){
                    this.allLottery[0].push({
                          label:arr[i].vname,
                          lottery_id:arr[i].lottery_id,
                      })
                }
            //  this.allLottery = res.data.data;
             
          },
        },
        computed: {
            ...mapState([
                "skin","defalutLan"
                ])
        },
    }
</script>

<style scoped lang="less">
 .rem(@name,@px){
    @{name}:unit(@px/75,rem)
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
        .title{
            color: #E3CF95;
        }
    }
  }
  .data-box{
      .rem(line-height,56);
      background: #D3E1FC;
      padding:0.135rem ;
      color: #287BE1;
      .data-icon{
          .rem(height,56);
          .rem(line-height,56);
          .rem(width,252);
          text-align: center;
          position: relative;
          border: 1px solid #287BE1;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 0.34rem;
          &::before{
              position: absolute;
              content: '';
              left: 0.135rem;
              top: 0.13rem;
               .rem(width,40);
               .rem(height,36);
               background: url('../../assets/images/ynxz/Vector.png')no-repeat;
               background-size: contain;
          }
          &::after{
               position: absolute;
              content: '';
              right: 0.135rem;
              top: 0.3rem;
               .rem(width,20);
               .rem(height,12);
               background: url('../../assets/images/ynxz/blue_Polygon.png')no-repeat;
               background-size: contain;
          }

      }
      .go-btn{
          background: #287BE1;
          border-radius: 4px;
           .rem(height,56);
           .rem(width,134);
           text-align: center;
           color: #fff;
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
        top: 50%;
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
  .change-type{
    background: #fff;
    padding:0.16rem ;
    font-size: 0.34rem;
    // border-bottom: 1px solid #d1d1d1;
    margin-bottom: 0.1rem;
    span{
        display: inline-block;
        .rem(height,56);
        .rem(line-height,56);
    }
    div{
        .rem(height,56);
          .rem(line-height,56);
          .rem(width,252);
        //   text-align: center;
          position: relative;
          border: 1px solid #d1d1d1;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 0.34rem;
            margin-left: 0.2rem;
            padding-left: 0.2rem;
          &::after{
               position: absolute;
              content: '';
              right: 0.135rem;
              top: 0.3rem;
               .rem(width,20);
               .rem(height,12);
               background: url('../../assets/images/ynxz/gray_Polygon.png')no-repeat;
               background-size: contain;
          }
    }
  }
  .kjData-list{
      width: 95%;
      margin: 0 auto;
      text-align: center;
      background: #fff;
      font-size: 0.3;
      li{
          width: 49.9%;
          .rem(height,70);
          .rem(line-height,70);
          border-bottom: 1px solid #F3F4F5;
          border-right:1px solid #F3F4F5;
          &:nth-of-type(2n){
              border-right: 0;
          }
      }
  }

  .lo-pink{
    .btn{
      background: linear-gradient(1.76deg, #FB6E6D 0.42%, #FFCAA2 97.44%)!important;
    }
    i.date{
      color: #FB796B!important;
    }
    header{
      background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
    }
    .data-box{
      background: #FFE3DA!important;
    }
    .go-btn{
      background: #FB796B!important;
    }
    .data-icon{
      border-color: #FB796B!important;
      color:#FB796B!important;
      &:before{
               background: url('../../assets/images/ynxz/Vector-pink.png')no-repeat;
               background-size: contain;
      }
      &::after{
               background: url('../../assets/images/ynxz/Polygon-pink.png')no-repeat;
               background-size: contain;
      }
    }
  }
  .lo-blue{
    .btn{
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
    }
     i.date{
      color: #0CB6D9!important;
    }
    header{
      background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%)!important;
    }
    .data-box{
      background: #DAEFFF!important;
    }
    .go-btn{
      background: #0CB6D9!important;
    }
    .data-icon{
      border-color: #0CB6D9!important;
      color:#0CB6D9!important;
      &:before{
               background: url('../../assets/images/ynxz/Vector-blue.png')no-repeat;
               background-size: contain;
      }
      &::after{
               background: url('../../assets/images/ynxz/Polygon-blue.png')no-repeat;
               background-size: contain;
      }
    }
  }
  .lo-green{
    .btn{
       background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
    }
    i.date{
      color: #00B681!important;
    }
    header{
      background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%)!important;
    }
    .data-box{
      background: #DAEFFF!important;
    }
    .go-btn{
      background: #00B681!important;
    }
    .data-icon{
      border-color: #00B681!important;
      color:#00B681!important;
      &:before{
               background: url('../../assets/images/ynxz/Vector-green.png')no-repeat;
               background-size: contain;
      }
      &::after{
               background: url('../../assets/images/ynxz/Polygon-green.png')no-repeat;
               background-size: contain;
      }
    }
  }

   .lo-maingreen{
    .btn{
      background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%)!important;
    }
    i.date{
      color: #00B681!important;
    }
    header{
      
        background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%)!important;
    }
    .data-box{
      background: #DAEFFF!important;
    }
    .go-btn{
      background: #00B681!important;
    }
    .tiptext{
        color:#00B681!important;
    }
    .data-icon{
      border-color: #00B681!important;
      color:#00B681!important;
      &:before{
               background: url('../../assets/images/ynxz/Vector-green.png')no-repeat;
               background-size: contain;
      }
      &::after{
               background: url('../../assets/images/ynxz/Polygon-maingreen.png')no-repeat;
               background-size: contain;
      }
    }
  }
  .lo-golden{
    .btn{
      background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%)!important;
    }
    i.date{
      color: #E3CF95!important;
    }
   
    .data-box{
      background: #464B53!important;
    }
    .go-btn{
      background: #E3CF95!important;
      color: #A85100;
    }
    .tiptext{
        color:#E3CF95!important;
    }
    .data-icon{
      border-color: #E3CF95!important;
      color:#E3CF95!important;
      &:before{
               background: url('../../assets/images/skin/golden/rili.png')no-repeat;
               background-size: contain;
      }
      &::after{
               background: url('../../assets/images/skin/golden/select_icon-golden.png')no-repeat;
               background-size: contain;
      }
    }
    .change-type{
        background: #1F252C !important;
        color: #cecece;
    }
    .kjData-list{
        background: #464B53;

        li{
           color:#cecece;
           border-bottom: 1px solid #1F252C;
           border-right: 1px solid #1F252C; 
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
  }
</style>