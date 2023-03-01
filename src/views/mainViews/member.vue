<template>
  <div class="member">
    <myScroll
      :top="0"
      :isDown="true"
      v-on:func="reLoad"
      ref="scrollWrapper"
      :isLoad="isL"
      :data="playList"
    >
      <div class="member-container">
        <!-- header -->
        <div id="headerMain" :class="[{'headbg': isNew==0}, {'headbgNew': isNew==1},{'headbgDW': isNew==2 && !codeToken},{'headbgDWDL': isNew==2 && codeToken},{'headbgQRJ':isNew==3},{'headbggq':isNew==4},{'headbgsdj':isNew==5&& codeToken},{'headbgsdjWDL':isNew==5&& !codeToken}]">
          <div class="headTop">
            <div class="sculpture"  v-if="codeToken">
              <router-link to="/UpdateInforNew">
                <img :src="avatar" v-if="avatar" alt />
                <img src="../../assets/images/main/web_03.png" v-else alt />
              </router-link>
            </div>
            <div class="headerMainPic" :style="isPure==1?'margin-top:1rem':''">
              <dl>
                <dt v-if="codeToken">
                  <router-link to="/UpdateInforNew">
                    <span class="userName">
                      <h3>
                        <span>{{nickname}}</span>
                        <img
                          v-if="vip>0"
                          :src="require('../../assets/images/member/vip'+vip+'.png')"
                        />
                        <img v-if="vip<=0" src />
                      </h3>
                    </span>
                    <span class="userId" :class="[{'userId-qrjBGColor' : isNew == 3},{'userId-gqBGColor' : isNew == 4},{'userId-sdjBGColor' : isNew == 5},{'userId-dwBGColor':isNew == 2}]">ID: {{userinfo.unique_id}}</span>
                    <span class="zl" v-if="isPure!=1">
                      <a>{{userinfo.following}}关注</a>
                      <i></i>
                      <a>{{userinfo.followers}}粉丝</a>
                      <i></i>
                      <a>{{userinfo.like}}获赞</a>
                    </span>
                    <p class="profile">{{profile}}</p>
                  </router-link>
                </dt>
              </dl>
            </div>
            <div class="toUser fr"  v-if="codeToken&&isPure!=1" @click="toUser">
              <img src="../../assets/images/white-back-icon.png" alt />
            </div>

            <div v-if="!codeToken" class="no-login" style="padding-top: 1rem;">
                  <div class="fl">
                    <h5 class="wdlH5">Hi~欢迎来到乐购</h5>
                    <p class="wdlp">登录开启你的娱乐世界</p>
                  </div>
                  <div class="fr"><router-link to="/login" :class="[ {'dwColor':isNew==2 },{'qrjColor' : isNew==3},{'gqColor' : isNew==4},{'color-sdj' : isNew==5}]">登录</router-link></div>
                </div>
          </div>
          <!-- 充值提现 -->
          <div class="money" v-show="token==1&&isPure!=1&&userinfo.user_id>0">
<!--            <p class="shadow"></p>-->
            <ul class="clearfix">
              <!-- <li>
                <router-link :to="{name:'withdrawalTopUp',params:{type:1}}">
                  <img src="../../assets/images/member/cun.png" alt />
                  <span>存款</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'withdrawalTopUp',params:{type:0}}">
                  <img src="../../assets/images/member/qu.png" alt />
                  <span>取款</span>
                </router-link>
              </li>-->
              <!-- <li>
                <img src="../../assets/images/member/vip.png" alt />
                <span>会员</span>
              </li>-->
              <li>
                <div>
                  <span class="fl">余额</span>
                  <a class="sx fr" @click="goWallet"></a>
                </div>
                <div id="count">{{amount}} <i @click="money(true)" class="refurbish"></i></div>
              </li>
              <li class="beforLine">
                <div>
                  <span class="fl">钻石</span>
                  <a class="dh fr" @click="dhPop(true)"></a>
                </div>
                <div id="countZuan">{{zsMount}} <i  @click="zsQuest()" class="refurbish"></i></div>
                <!-- <span @click="dhPop()">
                  钻石
                  <img
                    style="  width: 1.1em;"
                    class="add"
                    src="../../assets/images/member/add.png"
                    alt
                  />
                </span>-->
              </li>
            </ul>
          </div>
            <div class="money" v-show="(token==1&&isPure==1)||(token&&userinfo.user_id<0)" style="padding: 0.4rem 0rem 0.15rem 0rem;">
                <ul class="clearfix">
                    <li style="width:100%;">
                        <div>
                            <span class="fl">余额</span>
                            <a class="sx fr" @click="goWallet"></a>
                        </div>
                        <div id="count">{{amount}} <i @click="money(true)" class="refurbish"></i></div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 主播招募 -->
        <div class="zmzb">
          <ul>
            <li>
              <router-link :to="{name:'withdrawalTopUp',params:{type:1}}">
                <div>
                <img v-if="isNew == 0 || isNew == 1 || isNew == 4|| isNew == 5" src="../../assets/images/member/ckbg.png" alt />
                <img v-if="isNew == 2" src="../../assets/images/dw/qk.png" alt />
                <img v-if="isNew == 3" src="../../assets/images/ValentineDay/ck-min.png" alt />
                </div>
                <span>存款</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'withdrawalTopUp',params:{type:0}}">
                <div>
                <img v-if="isNew == 0 || isNew == 1 || isNew == 4|| isNew == 5" src="../../assets/images/member/qkbg.png" alt />
                <img v-if="isNew == 2" src="../../assets/images/dw/ck.png" alt />
                <img v-if="isNew == 3" src="../../assets/images/ValentineDay/icon-qk-min.png" alt />
                </div>
                <span>取款</span>
              </router-link>
            </li>
            <li v-if="isPure!=1">
              <router-link to="/Concern">
                <div>
                <img v-if="isNew == 0 || isNew == 1 || isNew == 4|| isNew == 5" src="../../assets/images/member/gz.png" alt />
                <img v-if="isNew == 2" src="../../assets/images/dw/gz.png" alt />
                <img v-if="isNew == 3" src="../../assets/images/ValentineDay/icon-gz-min.png" alt />
                </div>
                <span>关注</span>
              </router-link>
            </li>
             <li v-if="isPure==1">
                  <router-link to="/team">
                      <div>
                          <img  src="../../assets/images/newMine/dl.png" alt />
                      </div>
                      <span>代理</span>
                  </router-link>
              </li>
          </ul>
          
        </div>

        <!-- 个人资料 -->
        <div class="my">
          <ul>
              <li>
               <a @click="tomessageCenter">
                <!-- <i class></i> -->
                <img v-if="isNew==0" src="../../assets/images/member/xxzx.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/1.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/xx.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-xx-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/xxzx.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/xiaoxi.png" alt />
                <span class="border-bot">
                  消息中心
                  <!--noticeNum-->
                  <i class="fr host-online" v-if="nNum>0&&isNew==1">有最新消息哦</i>
                  <i class="fr dian" v-if="nNum>0&&isNew==0"></i>
                </span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </a>
            </li>
            <!-- <li>
              <router-link to="/UpdateInforNew">
                <i class="icon icon1"></i>
                <a class="border-bot">个人资料</a>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt /> -->
                  <!-- <x-icon
                    type="ios-arrow-forward"
                    color="#dddddd"
                    class="infoPortrait-icon"
                    size="15"
                  ></x-icon>-->
                <!-- </span>
              </router-link>
            </li> -->
            <!-- <li>
              <router-link to="/Concern">
                <i class="icon icon2"></i>
                <img src="../../assets/images/member/wdgz@3x.png" alt />
                <a class="border-bot">
                  我的关注
                  <i class="fr host-online" v-if="isLive">有主播在直播哦</i>
                </a>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li> -->
             <li>
<!--              <a @click="toERecord">-->
               <router-link to="/ERecord">
                <!-- <i class="icon icon3"></i> -->
                <img v-if="isNew==0" src="../../assets/images/member/wdzd.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/2.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/zd.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-zd-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/wdzd.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/zhangdan.png" alt />
                <span class="border-bot">Hóa đơn của tôi</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
               </router-link>
            </li>

            <li v-if="isPure==0">
              <router-link to="/themeSkin">
                <img v-if="isNew==0" src="../../assets/images/member/hf.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/hf.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/pf.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-ztpf-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/ztpf.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/sink.png" alt />
                <span class="border-bot">主题换肤</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>


            <li v-if="isPure==0">
              <router-link to="/recruit">
                <!-- <i class="icon icon3"></i> -->
                <img v-if="isNew==0" src="../../assets/images/member/zbzm.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/3.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/zm.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-zbzm-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/zbzm.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/zhaomu.png" alt />
                <span class="border-bot">主播招募</span>
                <span>
                   <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
            <li >
              <router-link to="/loginConfirm">
                <img v-if="isNew==0" src="../../assets/images/member/sm.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/sm.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/sm.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/sm.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/sm.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/smdl.png" alt />
                <span class="border-bot">扫码登录</span>
                <span>
                   <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
            <li>
<!--              <a  @click="toGameBB()">-->
                <router-link to="/gameReport">
                <!-- <i class="icon icon3"></i> -->
                  <img v-if="isNew==0" src="../../assets/images/member/yxbb.png" alt />
                  <img v-if="isNew==1" src="../../assets/images/newyear/yxbb.png" alt />
                  <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/yxbb.png" alt />
                  <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-yxbb-min.png" alt />
                  <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/yxbb.png" alt />
                  <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/yxbb.png" alt />
                  <span class="border-bot">游戏报表</span>
                  <span>
                     <img src="../../assets/images/enter-seeding.png" alt />
                  </span>
                </router-link>
            </li>
            <li v-if="isPure==0">
<!--              <a @click="toTame()">-->
              <router-link to="/team">
                <!-- <i class="icon icon3"></i> -->
                <img v-if="isNew==0" src="../../assets/images/member/tuiguang.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/tuiguang.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/tuiguang.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-tgbb-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/tgbb.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/tgbb.png" alt />
                <span class="border-bot">推广报表</span>
                <span>
                   <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
            <!-- <li>
              <router-link to="/GameShow">
                <img src="../../assets/images/member/4.png" alt />
                <a class="border-bot">玩法说明</a>
                <span>
                  <x-icon type="ios-arrow-forward" class="infoPortrait-icon" size="15"></x-icon>
                </span>
              </router-link>
            </li>-->
            <!-- <li>
              <router-link to="/">
                <img src="../../assets/images/member/5.png" alt />
                <a class="border-bot">代理合作</a>
                <span>
                  <x-icon type="ios-arrow-forward" class="infoPortrait-icon" size="15"></x-icon>
                </span>
              </router-link>
            </li>-->
            <!-- <li>
              <router-link to="/TheTutorial">
                <img src="../../assets/images/member/6.png" alt />
                <a class="border-bot">新手教程</a>
                <span>
                  <x-icon type="ios-arrow-forward" class="infoPortrait-icon" size="15"></x-icon>
                </span>
              </router-link>
            </li>-->
            <li>
              <router-link to="/Feedback">
                <!-- <i class="icon icon4"></i> -->
                <img v-if="isNew==0" src="../../assets/images/member/7.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/4.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/yj.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-yjfk-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/yjfk.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/yjfk.png" alt />
                <span class="border-bot">意见反馈</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
            <li>
              <!--<router-link to="/Notescontact">-->
              <!--<img src="../../assets/images/member/8.png" alt />-->
              <!--<a class="border-bot">liên hệ với dịch vụ khách hàng</a>-->
              <!--<span>-->
              <!--<img src="../../assets/images/enter-seeding.png" alt />-->
              <!--</span>-->
              <!--</router-link>-->
              <a href="javascript:;" @click="goOnline">
                <img v-if="isNew==0" src="../../assets/images/member/8.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/5.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/lxkf.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-lxkf-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/lxkf_03.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/kefu.png" alt />
                <!-- <i class="icon icon5"></i> -->
                <span class="border-bot">liên hệ với dịch vụ khách hàng</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </a>
            </li>
             <li >
              <router-link to="/contact">
                <!-- <i class="icon icon6"></i> -->
                <img v-if="isNew==0"  src="../../assets/images/member/jiaoliumoren.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/jiaoliu@2x.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/gfjlq.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-gfjl-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/gfjlq.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/gfql.png" alt />
                <span class="border-bot">官方交流群</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
            <li v-if="codeToken">
              <router-link to="/setting">
                <!-- <i class="icon icon6"></i> -->
                <img v-if="isNew==0"  src="../../assets/images/member/9.png" alt />
                <img v-if="isNew==1" src="../../assets/images/newyear/6.png" alt />
                <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/sz.png" alt />
                <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/sz-min.png" alt />
                <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/sz.png" alt />
                <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/sz.png" alt />
                <span class="border-bot">设置</span>
                <span>
                  <img src="../../assets/images/enter-seeding.png" alt />
                </span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- <div class="logout"><x-button @click.native="logout" v-if="codeToken" class="btn" type="primary" button-global-border-radius>退出</x-button></div> -->
      </div>
    </myScroll>

    <!-- 兑换弹窗 -->
    <div class="git-list-box-bg z" v-if="exchange"></div>
    <div class="dialog-pop" v-if="exchange">
      <p class="head">
        钻石兑换
        <span @click="close">
          <img src="../../assets/images/member/close.png" alt />
        </span>
      </p>
      <p class="mainCon">
        <img src="../../assets/images/member/yue.png" alt />余额：
        <span class="amount">₫{{amount}}</span>
        <span class="fr">兑换比例 1:10</span>
      </p>
      <p class="dhInp" @focusout="inputBlur" @focusin="inputFocus">
        <input type="tel" v-model="zsMoney" maxlength="11" placeholder="请输入兑换金额" />
        <a @click="allChange">全部兑换</a>
      </p>
      <p v-bind:class="[isHigh? 'btnHigh':'active']" @click="submitDh">
        <a>兑换</a>
      </p>
      <span style="color:#999;font-size: .3rem;float: left;margin: .3rem 0 0 .8rem"><i style="color:#ff3f30">注：</i>钻石无法兑换成余额</span>
    </div>

    <!--键盘-->
    <div class="key-box-bg" @click="isKey=false" v-if="isKey"></div>
    <div class="key-box member-key chat-key" v-if="isKey">
      <div class="input-pwd">
        <div class="title">
          请输入支付密码
          <i class="remove-icon" @click="isKey=false"></i>
        </div>
        <div class="pwd-box">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
        <p class="error-tip" v-if="showTip">密码输入错误，您还有{{changeTime}}次机会</p>
        <!--<p class="contact-tip">忘记支付密码，<router-link to="/Notescontact" class="contact">liên hệ với dịch vụ khách hàng</router-link></p>-->
      </div>
      <div class="key-content">
        <div class="key-item">
          <span class="num" @click="changeNum(1)">1</span>
          <span class="num" @click="changeNum(2)">2</span>
          <span class="num" @click="changeNum(3)">3</span>
        </div>
        <div class="key-item">
          <span class="num" @click="changeNum(4)">4</span>
          <span class="num" @click="changeNum(5)">5</span>
          <span class="num" @click="changeNum(6)">6</span>
        </div>
        <div class="key-item">
          <span class="num" @click="changeNum(7)">7</span>
          <span class="num" @click="changeNum(8)">8</span>
          <span class="num" @click="changeNum(9)">9</span>
        </div>
        <div class="key-item">
          <span class="num zoro" @click="changeNum(0)">0</span>
          <span class="delete-icon" @click="deleteNum">
            <img src="../../assets/images/delete.png" alt />
          </span>
        </div>
      </div>
    </div>

    <!--修改成功-->
    <div class="success-box-container chat-pwd-success" v-if="isSuccess">
      <div class="success-box">
        <img src="../../assets/images/member/tick-icon.png" alt />
        <span>兑换成功！</span>
      </div>
    </div>

    <div class="teach-box" v-if="isteachmember && isPure!=1">
      <!-- <div class="teach-one">
        <img src="../../assets/images/teach/c1_01-min.png" alt />
      </div>
      <div class="teach-two">
        <img src="../../assets/images/teach/c2-min.png" alt />
      </div> -->
      <div class="teach-four">
        <img src="../../assets/images/teach/qb.png" alt="">
      </div>
      <div class="teach-five">
        <img src="../../assets/images/teach/qb2.png" alt="">
      </div>
      <div class="teach-six">
        <img src="../../assets/images/teach/qb1.png" alt="">
      </div>
      <div class="teach-seven">
        <img src="../../assets/images/teach/zs.png" alt="">
      </div>
      <div class="teach-three" @click="know">
        <img src="../../assets/images/teach/konw-min.png" alt />
      </div>
    </div>
  
    <Foot />

<!--    <div class="wdltt" v-if="!codeToken" @click="toLogin">-->
<!--              -->
<!--          </div>-->
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
import Foot from "../../components/footer.vue";
import { Flexbox, FlexboxItem, numberComma, Drawer } from "vux";
import { mapState, mapMutations } from "vuex";
import { getToken, setToken } from '../../store/cookie';
export default {
  name: "member",
  data() {
    return {
      isNew:0,
      defaultName: "游客",
      nickname: "",
      profile: "",
      token: "1",
      amount: "0.00",
      zsMount: "0.00",
      zsMoney: "",
      wdl: true,
      ydl: false,
      exchange: false,
      isL: false, //是否显示 下拉刷新的组件
      playList: {},
      avatar: "",
      isHigh: false,
      isLive: false, //是否有关注的主播正在直播
      isKey: false, //兑换键盘
      payPwd: "", //支付密码
      showTip: false, //是否显示验证信息
      isSuccess: false, //支付密码设置成功提示
      changeTime: "", //次数
      defaultAmount: "", //默认的金额
      isBind: false,
      isteachmember: "",
      timer: null,
      customer: "",
      nNum:0
    };
  },
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Foot,
    myScroll,
    numberComma,
    Drawer
  },

  mounted() {
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
    this.showPositionValue = true;
    //    location.reload();
  },
  computed: {
    ...mapState(["username", "codeToken", "userinfo", "safePwd", "vip","noticeNum","skin","hdnotice","xtnotice","gfnotice","AllNotices",'isPure','webInitData'])
  },
  created() {
    // let aa = localStorage.getItem("isNew");
    // if (aa == null) {
    //   this.isNew = 1;
    // } else {
    //   this.isNew = localStorage.getItem("isNew");
    // }
    this.isNew = this.skin
    this.init();
  },
  watch: {
    isKey: function(n) {
      if (!n) {
        this.payPwd = "";
        this.showTip = false;
        this.clearActive();
      }
    },
    payPwd: function(n, o) {
      if ((n + "").length == 7) {
        this.payPwd = o;
      } else if (n.length < 7) {
        if (n.length > o.length) {
          if (document.querySelectorAll(".pwd-box i")[n.length - 1])
            document
              .querySelectorAll(".pwd-box i")
              [n.length - 1].classList.add("active");
        } else {
          if (document.querySelectorAll(".pwd-box i")[n.length])
            document
              .querySelectorAll(".pwd-box i")
              [n.length].classList.remove("active");
        }
        if (n.length == 6) {
          setTimeout(() => {
            //验证是否密码是否正确
            this.checkOldPwd();
            return;
          }, 50);
        }
      }
    },
    zsMoney: function(n, o) {
      if (n) {
        this.$nextTick(() => {
          this.zsMoney = n.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
      let num = this.zsMoney.substring(0, 1);
      // console.log(num)
      if (Number(this.zsMoney) > Number(this.defaultAmount) || num == 0) {
        this.isHigh = false;
      } else {
        this.isHigh = true;
      }
    }
  },
  methods: {
    ...mapMutations([
      "SETUSERTOKEN",
      "SETUSERINFO",
      "SETPIC",
      "SETSAFEPWD",
      "SETUSERVIP",
      "SETUSERNOTICE",
      "SETDIAMOND"
    ]),
    alertLL(url, title) {
      android.show(url, title);
    },
    tomessageCenter(){
      this.$router.push('/messageCenter');
    },
    toLogin(){
      this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
    },
    toERecord(){
      this.$router.push('/ERecord');
    },
    toTame(){
      this.$router.push('/team');
    },
    toGameBB(){
      this.$router.push('/gameReport');
    },
    toUser(){
      
      this.$ro.push({ name:'userInfo',query:{ id:this.$store.state.userinfo.user_id,}});
    },
    goOnline() {
      // if (window.webkit) {
      //   window.webkit.messageHandlers.needNav.postMessage({
      //     url: this.customer,
      //     name: "在线客服",
      //     backUrl: window.location.href
      //   });
      //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
      // } else if (window.android) {
      //   this.alertLL(this.customer, "在线客服");
      // } else {
      //   window.location.href = this.customer;
      // }
      window.location.href = this.customer;
    },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    },
    inputFocus(e) {
      // 如果focus，则移除上一个输入框的timer
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        clearTimeout(this.timer);
      }
    },
    init() {
      this.isteachmember =
        getToken("isteachmember") == "no" ? false : true;
      this.getUserInfo();
      this.loadMoney();
      this.getIsLive();
      this.zsQuest();
      // 获取用户vip等级
      // this.getVipNow();
      this.customer = JSON.parse(this.webInitData).customer;
      this.checkNotice();
    },


    know() {
      this.isteachmember = false;
      setToken("isteachmember", "no");
    },
    async getVipNow(flag) {
      if (!this.codeToken) return;
      if (!this.vip || flag) {
        this.$http
          .get(this.versionLive2+"user/VIP_now/", {
            params: {
              user_id: this.userinfo.user_id
            }
          })
          .then(res => {
            if (res.data.data.vip == 0) {
              this.SETUSERVIP("");
            } else {
              this.SETUSERVIP(res.data.data.vip);
            }
          })
          .catch(err => {});
      }
    },
    //检查旧密码
    async checkOldPwd() {
      if (this.isBind) return;
      this.$vux.loading.show({ text: "Đang xác minh..." });
      this.isBind = true;
      let res = await this.$http.post("/api2/index/verify-fund-password", {
        password: this.payPwd
      });
      this.$vux.loading.hide();
      this.isBind = false;
      if (res && res.data.code == 1) {
        //发送请求
        this.isKey = false;
        this.changeDiamond();
      } else if (res && res.data.code == 1002) {
        //提示剩下的机会
        this.changeTime = res.data.data.remain_times;
        if (this.changeTime == 0) {
          this.showTip = false;
          this.SETSAFEPWD(10);
          //冻结账户判断
          this.$vux.confirm.show({
            title: "Tiền trong tài khoản của quý khách đã khóa ",
            content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
            confirmText: "liên hệ với dịch vụ khách hàng",
            onCancel: () => {
              this.isKey = false;
              this.payPwd = "";
              this.clearActive();
              this.zsMoney = "";
            },
            onConfirm: () => {
              //              this.$router.push({ name: "Notescontact" });
              this.goOnline();
            }
          });
        } else {
          this.showTip = true;
          this.payPwd = "";
          //清空
          this.clearActive();
        }
      } else if (res && res.data.code == 1012) {
        this.SETSAFEPWD(10);
        //冻结账户判断
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
          confirmText: "liên hệ với dịch vụ khách hàng",
          onCancel: () => {
            this.payPwd = "";
            this.showTip = false;
            this.clearActive();
            this.isKey = false;
          },
          onConfirm: () => {
            //            this.$router.push({ name: "Notescontact" });
            this.goOnline();
          }
        });
      } else if (res) {
        this.$vux.toast.text(res.data.msg, "middle");
      }
    },
    //获取用户个人信息
    getUserInfo(flag) {
      if (!this.codeToken) {
        return;
      } else {
           //缓存个人资料
      // if (!flag && this.userinfo.profile) {
      //   (this.nickname = this.userinfo.nickname || "我的昵称"),
      //     (this.profile = this.userinfo.profile || "个性签名~"),
      //     (this.avatar = this.userinfo.avatar);
      //   return;
      // }

      this.isL = true;
      this.$http.get("/api2/index/index").then(res => {
        if (res && res.data.code == 1) {
          this.isL = false;
          (this.nickname = res.data.data.nickname || "我的昵称"),
            (this.profile = res.data.data.profile || "个性签名~"),
            //          this.avatar = res.data.data.avatar==null?'../../assets/images/main/1.jpg':res.data.data.avatar;
            (this.avatar = res.data.data.avatar);
          this.SETUSERINFO(res.data.data);
          this.SETPIC(res.data.data.avatar);         
        }
      });
      }
     
    },

    

    //是否有关注的主播正在直播
    getIsLive() {
      if (!this.codeToken||this.userinfo.user_id<0) return;
      this.$http
        .get(this.versionLive2+"user/is_anchor_live", {
          params: {
            user_id: this.$store.state.userinfo.user_id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.isLive = true;
          }
        })
        .catch(err => {});
    },
    login: function() {
      this.$ro.push("/login");
    },
    routerLink1: function() {
      this.$ro.push("/recruit");
    },
    routerLink2: function() {
      this.$ro.push("/sendGifts");
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
            this.defaultAmount = res.data.data.balance || "0"; //用于计算的
            // this.amount =
            //   this.amount > 10000
            //     ? parseInt(this.amount / 1000) + "k"
            //     : this.amount;
          }
        });
      }
    },
    //检测是否设置过支付密码
    async checkPay() {
      if (this.safePwd == 1 || this.safePwd == 9 || this.safePwd == 10) {
        if (this.safePwd == 1) {
          //已经设置 可以发
          this.exchange = true;
        } else if (this.safePwd == 9) {
          //未设置
          this.$vux.confirm.show({
            title: "",
            content: "您还未设置支付密码",
            confirmText: "立即设置",
            onCancel: () => {},
            onConfirm: () => {
              this.$router.push({ name: "setting" });
            }
          });
        } else if (this.safePwd == 10) {
          //冻结
          this.isKey = false;
          this.showR = false;
          this.$vux.confirm.show({
            title: "Tiền trong tài khoản của quý khách đã khóa ",
            content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
            confirmText: "liên hệ với dịch vụ khách hàng",
            onCancel: () => {},
            onConfirm: () => {
              //              this.$router.push({ name: "Notescontact" });
              this.goOnline();
            }
          });
        }
        return;
      }
      this.$vux.loading.show({ text: "Đang xác minh..." });
      let res = await this.$http.get("/api2/index/check-fund-password");
      this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        //已经设置
        this.exchange = true;
        this.SETSAFEPWD(1);
      } else if (res && res.data.code == 9) {
        //未设置
        this.SETSAFEPWD(9);
        this.$vux.confirm.show({
          title: "",
          content: "请先设置支付密码",
          confirmText: "马上设置",
          onCancel: () => {},
          onConfirm: () => {
            this.$router.push({ name: "setting" });
          }
        });
      } else if (res && res.data.code == 10) {
        //冻结
        this.SETSAFEPWD(10);
        this.$vux.confirm.show({
          title: "Tiền trong tài khoản của quý khách đã khóa ",
          content: "Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ",
          confirmText: "liên hệ với dịch vụ khách hàng",
          onCancel: () => {},
          onConfirm: () => {
            //            this.$router.push({ name: "Notescontact" });
            this.goOnline();
          }
        });
      }
    },
    dhPop() {
      //未登录
      if (!this.codeToken) {
        this.$popup({
          title: "我是标题",
          content: "我是内容",
          btnText: "我是按钮",
          click: () => {
            this.isLogin = false;
          }
        });
      } else {
        if(this.userinfo.user_id<0){
          // alert(88);
            //  this.$vux.confirm.show({
            //         title:'提示',
            //         content:'<p style="font-size: 14px;padding-bottom: .2rem;padding-top: .2rem;color: #445779;font-weight: 500">当前账号为游客试玩账号</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">不可以执行此操作</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">请Đăng ký正式账号</p>',
            //         confirmText:"Xác nhận",
            //         showCancelButton:false,
            //         onConfirm : () => {
                       
            //         }
            //     });
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
        }else{
          //是否冻结 或者是否设置支付密码
            this.checkPay();
        }
        
      }
    },
    close() {
      this.exchange = false;
      this.zsMoney = "";
    },

    allChange() {
      //0元不能
      if (this.defaultAmount == 0) {
        return (this.isHigh = false);
      }
      this.zsMoney = parseInt(this.defaultAmount) + "";
    },
    submitDh() {
      if (!this.isHigh) return;
      //输入支付密码
      this.exchange = false;
      this.isKey = true;
    },
    loadMoney() {
      if (!this.codeToken) return;
      this.$http.get("/api2/index/balance").then(res => {
        if (res && res.data.code == 1) {
          //          this.amount = numberComma(res.data.data.balance) || '0';
          this.amount = res.data.data.balance || "0"; //显示出来的
          this.defaultAmount = res.data.data.balance || "0"; //用于计算的
          //          this.amount = 9999.99;
          // this.amount =
          //   this.amount > 10000
          //     ? parseInt(this.amount / 1000) + "k"
          //     : this.amount;
        }
      });
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.codeToken||this.userinfo.user_id<0) return;
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
    reLoad(data) {
      // 下拉页面刷新当前页面，重新请求我的页面所有信息

      if (data == "down") {
          this.getUserInfo(true);
      } else if (data == "up") {
      }
    },
    async changeDiamond() {
      this.$vux.loading.show({ text: "兑换中..." });
      let res = await this.$http.post(this.versionLive2+"user/exchange_diamond/", {
        user_id: this.userinfo.user_id,
        diamond: this.zsMoney,
        password: this.payPwd
      });
      this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        this.isSuccess = true;
        //更新余额  更新钻石
        this.zsMount = res.data.data.diamond;
        this.zsMoney = "";
        // this.getVipNow(true);
        this.money(true);
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      }
    },
    clearActive() {
      let allA = document.querySelectorAll(".pwd-box i");
      for (let i = 0, len = allA.length; i < len; i++) {
        allA[i].classList.remove("active");
      }
    },
    allError() {
      let allA = document.querySelectorAll(".pwd-box i");
      for (let i = 0, len = allA.length; i < len; i++) {
        allA[i].classList.add("red-active");
      }
    },
    changeNum(n) {
      if (this.payPwd.length > 6) return;
      this.payPwd += n;
    },
    deleteNum() {
      this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
    },
    async checkNotice(){
        if (!this.codeToken) {
        return;
      } else {
      if((this.noticeNum-0)>0) return
      // let res = await this.$http.get(this.versionLive2+'live/get_notice_new/',{params:{
      //   user_id:this.userinfo.user_id,
      //   lasttime:localStorage.getItem('lastTime') || 0
      // }});
      let res = await this.$http.get('/api/live/sport/get_message_count/',{params:{
              client_type:3,
              api:this.noticeType==1?1:5
      }});
      if(res && res.data.code==1){
//        localStorage.setItem('lastTime',Date.now())
        // this.nNum = res.data.data.msgCount;
        // this.SETUSERNOTICE(res.data.data.msgCount);
        //  if(this.hdnotice==0&&this.xtnotice==0&&this.gfnotice==0&&res.data.data.msgCount==this.AllNotices){
        //           this.nNum = 0
        //         } else{
                  this.nNum = res.data.data.msgCount;
                // }
      }
      }
    },
    goWallet(){
      //  if (!this.codeToken) {
      //   this.$popup({
      //     title: "我是标题",
      //     content: "我是内容",
      //     btnText: "我是按钮",
      //     click: () => {
      //       this.isLogin = false;
      //     }
      //   });
      //   return
      // }
      this.$router.push('wallet')
    }
  }
};
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
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
    width: 48%;
    top: 4rem;
    right: 0.4rem;
  }
  .teach-two {
    width: 36%;

top: 1.25rem;

right: 31.9%;
  }
  .teach-three {
    width: 29.3%;
    top: 12rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .teach-four {
    width: 41.3%;
    left: 34%;
    top: 1.5rem;
  }
  .teach-five {
    width: 44.3%;
    top: 4.8rem;
    right: 4%;
  }
  .teach-seven {
    width: 22%;
    right: 9%;
    top: 3.9rem;
  }
  .teach-six {
    width: 22%;
    left: 25%;
    top: 3.9rem;
  }
}
.host-online {
  color: #ff513e;
  padding-right: 0.5rem;
}
/*.member > div > .wrapperY {*/
/*position: absolute;*/
/*top: 0 !important;*/
/*}*/
.member-container {
  padding-bottom: 0.8rem;
  .infoPortrait-icon {
    fill: #dddddd;
  }
}
.home-header {
  span {
    font-size: 0.5rem;
    font-weight: 700;
  }
}
.content {
  background: #ccc;
}
.member {
  width: 100%;
  height: auto;
}

.headTop {
  display: block;
  height: 10.5em;
}
.headTop .sculpture {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  float: left;
  position: relative;
  overflow: hidden;
  top: 3.1em;
  border: solid 4px #fff;
  background: #fff;
}

.headTop .sculpture img {
  height: 100%;
  width: auto;
  -webkit-touch-callout: inherit !important;
  pointer-events: inherit !important;
}
.headTop .headerMainPic {
  width: 75%;
  //  padding: 0 10px;
  margin-top: 0.6rem;
  overflow: hidden;
  float: left;
  dl {
    overflow: hidden;
    dt {
      float: left;
      border-radius: 50%;
      position: relative;
      left: 1em;
      .userName {
        display: block;
        clear: both;
        margin-bottom: 0.1rem;
        overflow: hidden;
        h3 {
          float: left;
          font-size: 0.45rem;
          font-weight: bold;
          font-family: sans-serif;
          color: #fff;
          margin-bottom: 0.1rem;
          span {
            display: inline-block;
            max-width: 6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
          }
          img {
            margin: 0 0 0 0.05rem;
            width: 0.6rem;
            position: relative;
            top: 2px;
          }
          > i {
            color: #fbc800;
            font-size: 0.34rem;
            position: relative;
            top: -0.13rem;
            right: 0.1rem;
          }
        }
        .img {
          width: 14px;
          padding-top: 5px;
          margin-left: 0.5em;
        }
      }
      .userId {
        display: block;
        width: 2.6rem;
        clear: both;
        background: rgb(255, 115, 73);
        padding: 2px 3px;
        border-radius: 99px;
        text-align: center;
        color: #fff;
        font-size: 0.25rem;
        margin-bottom: 0.15rem;
      }
      .userId-dwBGColor{
        color: #fff;
        background:url('../../assets/images/dw/idd.png')no-repeat;
        background-size: 100% 100%;
        // opacity: 0.3;
      }
      .userId-qrjBGColor{
        color: #fff;
        background:url('../../assets/images/ValentineDay/55-min.png')no-repeat;
        background-size: 100% 100%;
        // opacity: 0.3;
      }
      .userId-gqBGColor{
        color: #fff;
        background:url('../../assets/images/National Day/bjt.png')no-repeat;
        background-size: 100% 100%;
        // opacity: 0.3;
      }
      .userId-sdjBGColor{
        color: #fff;
        background:url('../../assets/images/Christmas/yj.png')no-repeat;
        background-size: 100% 100%;
        // opacity: 0.3;
      }
      .zl {
        display: block;
        clear: both;
        margin-bottom: 0.1rem;
        a {
          color: #ffffff;
          font-size: 0.25rem;
        }
        i {
          display: inline-block;
          width: 1px;
          height: 0.3rem;
          background: #fff;
          position: relative;
          top: 0.04rem;
          margin: 0 0.2rem;
        }
      }
      .profile {
        color: #ffffff;
        font-size: 0.3rem;
        width: 6.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    dd {
      float: right;
      margin-top: 1em;
      // margin-left: 107px;
      text-align: right;
    }
  }
  .wdl{
    a {
      font-size: 2em;
      color: #fff;
      margin-top: 0.21em;
    }
  }
}
.toUser {
  img {
    width: 0.3rem;
    transform: rotate(180deg);
    margin-top: 1.5rem;
  }
}
#userName {
  font-size: 18px;
}
.money {
  width: 100%;
  margin: 0.9rem auto;
  background: #fff;
  border-radius: 8px;
  padding: 0.4rem 0.4rem 0.15rem 0.4rem;
  clear: both;
  -webkit-box-shadow: 1px 1px 4px #f5f5f5;
  box-shadow: 1px 1px 4px #f5f5f5;
  position: relative;
  top: 0;
  // top: -5em;
  ul li {
    float: left;
    width: 50%;
    div {
      span {
        font-size: 0.35rem;
        color: #333333;
      }
      a {
        display: block;
        color: #fff;
        text-align: center;
        .rem(width,160);
        .rem(height,42);
        margin-top: -0.1rem;
      }
      .sx {
        // background: -webkit-gradient(
        //   linear,
        //   left top,
        //   right top,
        //   from(#ff871d),
        //   to(#ffc513)
        // );
        // background: linear-gradient(to right, #ff871d, #ffc513);
        background: url('../../assets/images/newMine/money_change.png') no-repeat;background-size: contain;
      }
      .dh {
        // background: -webkit-gradient(
        //   linear,
        //   left top,
        //   right top,
        //   from(#ff3131),
        //   to(#ff8067)
        // );
        // background: linear-gradient(to right, #ff3131, #ff8067);
          background: url('../../assets/images/newMine/diamon_icon.png') no-repeat;background-size: contain;
      }
    }
  }
  ul li:first-child {
    padding-right: 0.3rem;
  }
  ul li:last-child {
    padding-left: 0.3rem;
  }
  .beforLine {
    position: relative;
  }
  .beforLine::before {
    content: "";
    width: 1px;
    height: 1.2rem;
    background: #F5F7FA;
    position: absolute;
    top: 0.2rem;
    left: -0.02rem;
  }
}

#headerMain {
  height: 5.1rem;
  width: 100%;
  
  background-size: 100% 100%;
  position: relative;
  padding: 0 5.33%;
}
.headbg{
    // background: url(../../assets/images/member/top.png) no-repeat center;
    background: url('../../assets/images/video/video-bg.png') no-repeat center;
}
.headbgNew{
  background: url(../../assets/images/newyear/top.png) no-repeat center;
}
.headbgDW{
  background: url('../../assets/images/dw/WDL.png') no-repeat center;
}
.headbgDWDL{
  background: url('../../assets/images/dw/wdbj.png') no-repeat center;
}
.headbgQRJ{
  background: url('../../assets/images/ValentineDay/header-min.png') no-repeat center;
}
.headbggq{
  background: url('../../assets/images/National Day/tbbj.png') no-repeat center;
}
.headbgsdj{
  background: url('../../assets/images/Christmas/title1.png') no-repeat center;
}
.headbgsdjWDL{
  background: url('../../assets/images/Christmas/title3.png') no-repeat center;
}
.headTop {
  display: block;
  height: 10em;
}
.headTop .headerMainPic {
  width: 72%;
}
.zmzb {
  width: 92.33%;
  // height: 8em;
  margin: 1.5rem auto 0;
  padding-top: 0;
  // top: -5em;
  ul {
    width: 100%;
    overflow: hidden;
    li {
      float: left;
      width: 33.33%;
      text-align: center;
      a {
        display: block;
        overflow: hidden;
        >div{
          height: 0.87rem;
        }
        img {
          width: 0.7rem;
          width: 0.87rem;
        }
        span {
          display: block;
          font-size: 0.3rem;
          padding: 0.2rem 0;
          font-weight: 500;
        }
      }
    }
  }
}

@media screen and(min-width: 320px) and(max-width: 359px) {
  .money {
    margin: -0.2rem auto 0;
  }
  .zmzb {
    margin: 1.75rem auto 0;
  }
  .teach-box .teach-one {
    top: 4rem;
  }
  .teach-box .teach-two {
    top: 1.25rem;
  }
}

@media screen and(min-width: 360px) and(max-width: 374px) {
  .money {
    margin: 0.3rem auto;
  }
  .teach-box .teach-one {
    top: 4rem;
  }
  .teach-box .teach-two {
    top: 1.25rem;
  }
}

@media screen and(min-width: 375px) and(max-width: 385px) {
  .money {
    margin: 0.4rem auto 0;
  }

  .zmzb {
    margin: 1.5rem auto 0;
  }
  .teach-box .teach-two {
   top: 1.25rem;
  }
  .teach-box .teach-one {
    top: 4rem;
  }
}

@media screen and(min-width: 386px) and(max-width: 392px) {
  .money {
    margin: 0.4rem auto 0;
  }
}

@media screen and(min-width: 393px) and(max-width: 400px) {
  .money {
    margin: 0.4rem auto 0;
  }
}

@media screen and(min-width: 401px) and(max-width: 414px) {
  .money {
    margin: 0.8rem auto 0;
  }
  .teach-box .teach-one {
    top: 4.1rem;
  }
  .teach-box .teach-two {
    top: 1.35rem;
  }
  .teach-box .teach-six{
    top: 4rem;
  }
  .teach-box .teach-seven{
    top: 4rem;
  }
}

@media screen and(min-width: 750px) and(max-width: 799px) {
  #headerMain {
    height: 5rem;
    width: 100%;
    background: url(../../assets/images/member/top.png) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 0 5.33%;
  }
  .zmzb {
    width: 92.33%;
    margin: 1.05rem auto 0;
    padding-top: 0;
    .flex-demo {
      float: left;

      a {
        display: block;
        overflow: hidden;
        img {
          width: 100%;
          /*box-shadow: 1px 1px 4px #f5f5f5;*/
        }
      }
    }
  }
  .teach-box .teach-one {
   width: 48%;
   right: 0.4rem;
  }
  .teach-box .teach-two {
    top: 1.25rem;
    right: 5%;
  }
  //   .teach-box .teach-six{
  //   top: 4.1rem;
  // }
  // .teach-box .teach-seven{
  //   top: 4.1rem;
  // }
}

@media only screen and(min-device-width :768px) and(max-device-width :1024px) {
  #headerMain {
    height: 5rem;
    width: 100%;
    background: url(../../assets/images/member/top.png) no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 0 5.33%;
  }
}

#count {
  font-size: 1.6em;
  font-weight: bold;
  line-height: 2.5em;
  padding-top: 0.05em;
  font-family: "PingFang-SC";
  clear: both;
  .refurbish{display: inline-block;width: 0.36rem;height: 0.36rem;background: url('../../assets/images/member/sx_icon.png') no-repeat;background-size: cover;}
}

#countZuan {
  font-size: 1.6em;
  font-weight: bold;
  line-height: 2.5em;
  padding-top: 0.05em;
  font-family: "PingFang-SC-Bold";
  clear: both;
  .refurbish{
    display: inline-block;width: 0.36rem;height: 0.36rem;background: url('../../assets/images/member/sx_icon.png') no-repeat;background-size: cover;
  }
}

.shua {
  position: relative;
  top: 2px;
  left: 2px;
}

.add {
  position: relative;
  top: 2px;
  left: 2px;
}

.my {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  // top: -6em;
  ul {
    li {
      height: 3.5em;
      width: 100%;
      // border-bottom: solid 1px #f5f5f5;
      line-height: 3.5em;
      padding: 0 5.33%;
      clear: both;
      font-size: 0.36rem;
      > a {
        display: block;
        overflow: hidden;
      }
      .border-bot {
        display: inline-block;
        /*border-bottom: solid 1px #f5f5f5!important;*/
        font-weight: 500;
        width: 86%;
        position: relative;
          &:after{
              content:'';
              position: absolute;
              width: 100%;
              height: 1px;
              background: #f5f5f5;
              bottom: 0;
              left: 0;
          }
        .dian{
           position: absolute;
            background: url("../../assets/images/main/home_icon_03.png") no-repeat;
            background-size: contain;
            width: 0.22rem;
            height: 0.22rem;
            left: -0.6rem;
            top: 0.3rem;
        }
      }
      img {
        width: 1.3em;
        position: relative;
        top: 3px;
        margin-right: 1em;
      }
      // .imgdw{
      //   width: 2.15em;
      //   vertical-align: sub;
      // }
      span {
        float: right;
        position: absolute;
        right: 8px;
        padding-top: 0;
        img {
          width: 1em;
        }
      }
      .icon1 {
        // background: url(../../assets/images/member/xxzx.png) no-repeat center!important;
        // background-position: 0px -5.78rem;
        // background-size: 100% 100%;
      }
      .icon2 {
        background-position: 0px -9.1rem;
        background-size: 1.4rem;
      }
      .icon3 {
        background-position: 0px -7.05rem;
        background-size: 1.91rem;
      }
      .icon4 {
        background-position: 0px -10.12rem;
        background-size: 1.91rem;
      }
      .icon5 {
        background-position: 0px -8.89rem;
        background-size: 1.91rem;
      }
      .icon6 {
        background-position: 0px -8.26rem;
        background-size: 1.91rem;
      }
    }
    .icon {
      display: inline-block;
      width: 0.54rem;
      height: 0.54rem;
      background: url("../../assets/images/icon.png");
      position: relative;
      top: 6px;
      margin-right: 1em;
    }
  }
}
.logout {
  width: 82.33%;
  height: 3.1em;
  margin: 0.4rem auto 0;

  line-height: 3em;
  text-align: center;

  font-size: 0.35rem;
  position: relative;
  // top: -5em;
  .btn {
    color: #bbbbbb;
    background: #f5f5f5;
    border-radius: 20px;
    border: 0;
  }
  .btn:after {
    border: 0;
  }
}

.no-login {
  color: #fff;
  font-size: 0.45rem;
  padding-top: 0.2rem;
   div {
     h5{
    color: #fff;
    font-size: 0.5rem;
    padding-bottom: 0.15rem;
    font-weight: 600;
   }
   p{
     color: #fff;
     font-size: 0.4rem;
   }
   a{
    display: inline-block;
    background: #FFF;
    color: #ff513e;
    text-align: center;
    font-size: 0.4rem;
    width: 1.5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 99px;
    position: relative;
    top: 0.4rem;
   }
   }
}

.loading-money {
  -webkit-animation: loading 2s infinite;
  -o-animation: loading 2s infinite;
  animation: loading 2s infinite;
  animation-fill-mode: forwards;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.git-list-box-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.z {
  z-index: 101;
}
.dialog-pop {
  z-index: 5000;
  width: 80%;
  max-width: 300px;
  background-color: #ffffff;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem 0;
  z-index: 102;
  font-family: "PingFang-SC-Bold";
  .head {
    width: 100%;
    line-height: 1.2em;
    color: #333333;
    font-size: 1.3em;
    font-weight: 600;
    position: relative;
    span {
      display: inline-block;
      overflow: hidden;
      // padding-right: 1em;
      position: absolute;
      right: 15px;
      img {
        width: 14px;
        position: relative;
        top: 2px;
      }
    }
  }
  .mainCon {
    width: 80%;
    margin: 0 auto;
    font-size: 1.2em;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    line-height: 0.8rem;
    clear: both;
    img {
      width: 18px;
      position: relative;
      top: 4px;
      margin-right: 5px;
    }
    .amount {
      font-weight: 600;
      color: #333333;
      /*font-family: number1;*/
    }
    .fr {
      float: right;
      color: #999999;
      /*position: relative;*/
      top: 0.1rem;
    }
  }
  .dhInp {
    width: 80%;
    margin: 0 auto;
    height: 3.5em;
    clear: both;
    background: #f6f6f6;
    position: relative;
    border-radius: 6px;
    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      font-size: 0.35rem;
    }
    a {
      position: absolute;
      top: 0;
      line-height: 3.5em;
      color: #ff3f30;
      right: 10px;
    }
  }
  .btnHigh {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #ff3f30;
      color: #fff;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
  .active {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #f5f5f5;
      color: #dddddd;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
}
@media screen and (max-width: 320px) {
  .dialog-pop .mainCon {
    font-size: 1em;
  }
  .dialog-pop .mainCon .fr {
    top: 0.15rem;
  }
}

.wdltt{
      position: absolute;
    display: block;
    width: 100%;
    height: 5rem;
    top: 6rem;
    z-index: 10001;
}
</style>
