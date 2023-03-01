  <template>
    <div class="mine2-container" id="mine2-container">
        <myScroll :top="0" :bottom="1.4" :bgColor="'f5f7fa'" ref="scrollWrapper">
            <div class="session session-header" v-show="codeToken">
                <div class="user-img" @click="$router.push('/UpdateInforNew')">
                     <div class="img-box">
                        <img :src="avatar" v-if="avatar" alt />
                        <img src="../../assets/images/main/web_03.png" v-else alt />
                     </div>
                     <span class="edit-box">Biên tập tư liệu<i></i></span>
                </div>
                <div class="user-mess">
                    <div class="user-name" :class="isPure==1?'pureTop':''">
                        <span class="name">{{nickname}}</span>
                        <!-- 差个性别icon 2女  1 男 0未知不显示-->
                        <i class="sex-icon" v-show="userinfo.gender" :class="userinfo.gender==2?'female-icon':'male-icon'"></i>
                        <!-- 贵族icon -->
                        <i class="gz-icon" :class="'gz-icon'+this.$store.state.userinfo.noble" v-show="this.$store.state.userinfo.noble&&isPure!=1"></i>
                        <i class="grade-icon" :class="'grade-icon'+$store.state.userinfo.vip" v-show="$store.state.userinfo.vip>0"></i>
                    </div>
                    <div class="user-id">
                        <span class="id-icon">ID:{{userinfo.unique_id}}</span>
                        <p class="video-mess">
                          <span class="every-video" v-show="isPure!=1">每日贵族观影 <i v-if="userinfo.noble<7">{{userinfo.free_watch_nums}}/{{userinfo.sum_watch_nums}}</i><i v-else>{{userinfo.sum_watch_nums}}</i></span>
                          <!-- <span class="every-video" v-show="isPure!=1&&userinfo.noble>=7">每日贵族观影 <i>无限次</i></span> -->
                          <span class="yqm-mess" v-show="isPure!=1&&userinfo.market_code">推广码&nbsp;{{userinfo.market_code}}</span>
                        </p>
                        
                    </div>
                    <p class="qm over-text">{{profile}}</p>
                </div>
                <div class="toUser fr"  v-show="isPure!=1" @click="toUser">
                  <img src="../../assets/images/jt_right.png" alt />
                </div>
            </div>
             <!-- 未登录 -->
            <div class="session session-header no-session-header" v-show="!codeToken">
                <div class="login-reg-btn"><router-link to='login'>登录</router-link>&nbsp;/&nbsp;<router-link to='register'>Đăng ký</router-link></div>
                <div class="tip-box"><i></i><p>现在Đăng ký乐购用户，即可获得1880钻石礼包哦~</p> </div>   

            </div>

            <div class="session session-num" v-show="isPure!=1">
                <dl>
                    <dt>{{codeToken?userinfo.following:'0'}}</dt>
                    <dd>关注</dd>
                </dl>
                <dl>
                    <dt>{{codeToken?userinfo.followers:'0'}}</dt>
                    <dd>粉丝</dd>
                </dl>
                <dl>
                    <dt>{{codeToken?userinfo.like:'0'}}</dt>
                    <dd>获赞</dd>
                </dl>
            </div>
            <div class="session session-money">
                <div class="ye-box balance-box" :class="isPure==1?'pureMoney':''">
                    <span>余额</span><i class="balance-icon change-icon fr" @click="$router.push('/wallet')"></i>
                    <p>{{amount}}<i class="refresh-icon" @click="money(true)"></i></p>
                </div>
                <div class="zs-box" v-show="isPure!=1">
                    <span>钻石</span><i class="balance-icon zs-icon fr" @click="dhPop(true)"></i>
                    <p>{{zsMount}} <i class="refresh-icon"  @click="zsQuest()"></i></p>
                </div>
            </div>
            <div class="session session-main-title">
                <router-link :to="{name:'withdrawalTopUp',params:{type:1}}">
                    <dl>
                        <dt><img src="../../assets/images/newMine/monePack.png" alt=""></dt>
                        <dd>钱包</dd>
                    </dl>
                </router-link>
                <router-link to="/invite">
                    <dl>
                        <dt><img src="../../assets/images/newMine/extend_icon.png" alt=""></dt>
                        <dd>推广</dd>
                    </dl>
                </router-link>
                <router-link to="/vipRanking">
                    <dl>
                        <dt><img src="../../assets/images/newMine/VIP.png" alt=""></dt>
                        <dd>VIP</dd>
                    </dl>
                </router-link>
                <router-link to="/Concern" v-show="isPure!=1">
                    <dl>
                        <dt><img src="../../assets/images/newMine/focus_icon.png" alt=""></dt>
                        <dd>关注</dd>
                    </dl>
                </router-link>
                
            </div>
            
            <div class="session session-main-tj">
                <h3>推荐服务</h3>
                <div class="tj-content">
                    <router-link to="/vipGz" v-show="isPure!=1&&codeToken">
                        <dl>
                            <dt>
                              <img v-show="isNew == 0" src="../../assets/images/member/guizuVIP.png" alt="">
                              <img v-show="isNew==1" src="../../assets/images/newyear/guizuvip.png" alt />
                              <img v-show="isNew==2" src="../../assets/images/dw/guizuDW.png" alt />
                              <img v-show="isNew==3" src="../../assets/images/ValentineDay/guizuQRJ.png" alt />
                              <img v-show="isNew==4" src="../../assets/images/National Day/guizuGQ.png" alt />
                              <img v-show="isNew==5" src="../../assets/images/Christmas/guizuSD.png" alt />
                              <img v-show="isNew==6" src="../../assets/images/oxYear/gztq.png" alt />
                              <img v-show="isNew==7" src="../../assets/images/UEFA/gztq.png" alt />
                            </dt>
                            <dd>贵族特权</dd>
                            <!-- <i class="fr dian" v-if="nNum>0&&isNew==0"></i> -->
                        </dl>
                    </router-link>
                    <router-link to="/messageCenter">
                        <dl>
                            <dt>
                              <img v-show="isNew == 0" src="../../assets/images/newMine/notice_icon.png" alt="">
                              <img v-show="isNew==1" src="../../assets/images/newyear/1.png" alt />
                              <img v-show="isNew==2" src="../../assets/images/dw/xx.png" alt />
                              <img v-show="isNew==3" src="../../assets/images/ValentineDay/icon-xx-min.png" alt />
                              <img v-show="isNew==4" src="../../assets/images/National Day/xxzx.png" alt />
                              <img v-show="isNew==5" src="../../assets/images/Christmas/xiaoxi.png" alt />
                              <img v-show="isNew==6" src="../../assets/images/oxYear/message.png" alt />
                              <img v-show="isNew==7" src="../../assets/images/UEFA/xxzx.png" alt />
                            </dt>
                            <dd>消息中心</dd>
                            <!-- <i class="fr dian" v-if="nNum>0&&isNew==0"></i> -->
                            <i class="fr dian" v-if="nNum>0"></i>
                        </dl>
                    </router-link>
                    <router-link to="/ERecord">
                        <dl>
                            <dt>
                              <img v-show="isNew==0" src="../../assets/images/newMine/zd_icon.png" alt="">
                              <img v-show="isNew==1" src="../../assets/images/newyear/2.png" alt />
                              <img v-show="isNew==2"  src="../../assets/images/dw/zd.png" alt />
                              <img v-show="isNew==3"  src="../../assets/images/ValentineDay/icon-zd-min.png" alt />
                              <img v-show="isNew==4"  src="../../assets/images/National Day/wdzd.png" alt />
                              <img v-show="isNew==5"  src="../../assets/images/Christmas/zhangdan.png" alt />
                              <img v-show="isNew==6"  src="../../assets/images/oxYear/wdzd.png" alt />
                              <img v-show="isNew==7"  src="../../assets/images/UEFA/wdzd.png" alt />
                            </dt>
                            <dd>Hóa đơn của tôi</dd>
                        </dl>
                    </router-link>
                   <router-link to="/gameReport">
                        <dl>
                            <dt>
                              <img v-show="isNew==0" src="../../assets/images/newMine/game_report.png" alt="">
                              <img v-show="isNew==1" src="../../assets/images/newyear/yxbb.png" alt />
                              <img v-show="isNew==2"  src="../../assets/images/dw/yxbb.png" alt />
                              <img v-show="isNew==3"  src="../../assets/images/ValentineDay/icon-yxbb-min.png" alt />
                              <img v-show="isNew==4"  src="../../assets/images/National Day/yxbb.png" alt />
                              <img v-show="isNew==5"  src="../../assets/images/Christmas/yxbb.png" alt />
                              <img v-show="isNew==6"  src="../../assets/images/oxYear/yxbb.png" alt />
                              <img v-show="isNew==7" src="../../assets/images/UEFA/yxbb.png" alt />
                            </dt>
                            <dd>游戏报表</dd>
                        </dl>
                   </router-link>
                   <!-- <router-link to="/team">
                        <dl>
                            <dt>
                              <img v-if="isNew==0" src="../../assets/images/newMine/extend_report.png" alt="">
                              <img v-if="isNew==1" src="../../assets/images/newyear/tuiguang.png" alt />
                              <img v-if="isNew==2" class="imgdw" src="../../assets/images/dw/tuiguang.png" alt />
                              <img v-if="isNew==3" class="imgdw" src="../../assets/images/ValentineDay/icon-tgbb-min.png" alt />
                              <img v-if="isNew==4" class="imgdw" src="../../assets/images/National Day/tgbb.png" alt />
                              <img v-if="isNew==5" class="imgdw" src="../../assets/images/Christmas/tgbb.png" alt />
                            </dt>
                            <dd>推广报表</dd>
                        </dl>
                   </router-link> -->
                     <router-link to="/themeSkin" v-if="isPure!=1">
                        <dl>
                            <dt>
                              <img v-show="isNew==0" src="../../assets/images/newMine/skin_icon.png" alt="">
                              <img v-show="isNew==1" src="../../assets/images/newyear/hf.png" alt />
                              <img v-show="isNew==2" src="../../assets/images/dw/pf.png" alt />
                              <img v-show="isNew==3" src="../../assets/images/ValentineDay/icon-ztpf-min.png" alt />
                              <img v-show="isNew==4" src="../../assets/images/National Day/ztpf.png" alt />
                              <img v-show="isNew==5" src="../../assets/images/Christmas/sink.png" alt />
                              <img v-show="isNew==6" src="../../assets/images/oxYear/ztpf.png" alt />
                              <img v-show="isNew==7" src="../../assets/images/UEFA/skin.png" alt />
                            </dt>
                            <dd>主题皮肤</dd>
                        </dl>
                     </router-link>
                     <router-link to="/recruit" v-if="isPure!=1">
                        <dl>
                            <dt>
                              <img v-if="isNew==0" src="../../assets/images/newMine/zm_icon.png" alt="">
                              <img v-if="isNew==1" src="../../assets/images/newyear/3.png" alt />
                              <img v-if="isNew==2" src="../../assets/images/dw/zm.png" alt />
                              <img v-if="isNew==3" src="../../assets/images/ValentineDay/icon-zbzm-min.png" alt />
                              <img v-if="isNew==4" src="../../assets/images/National Day/zbzm.png" alt />
                              <img v-if="isNew==5" src="../../assets/images/Christmas/zhaomu.png" alt />
                              <img v-if="isNew==6" src="../../assets/images/oxYear/zmzb.png" alt />
                              <img v-if="isNew==7" src="../../assets/images/UEFA/zbzm.png" alt />
                            </dt>
                            <dd>主播招募</dd>
                        </dl>
                     </router-link>
                     <router-link to="/myVideo?type=1" v-show="isPure!=1&&codeToken">
                        <dl>
                            <dt>
                              <img v-if="isNew==0" src="../../assets/images/newMine/movie_icon.png" alt="">
                              <img v-if="isNew==1" src="../../assets/images/newyear/movie.png" alt />
                              <img v-if="isNew==2" src="../../assets/images/dw/movie.png" alt />
                              <img v-if="isNew==3" src="../../assets/images/ValentineDay/movie.png" alt />
                              <img v-if="isNew==4" src="../../assets/images/National Day/movie.png" alt />
                              <img v-if="isNew==5" src="../../assets/images/Christmas/movie.png" alt />
                              <img v-if="isNew==6" src="../../assets/images/oxYear/movie.png" alt />
                              <img v-if="isNew==7" src="../../assets/images/UEFA/wdgy.png" alt />
                            </dt>
                            <dd>我的观影</dd>
                        </dl>
                     </router-link>
                     <router-link to="/loginConfirm" v-show="codeToken">
                        <dl>
                            <dt>
                              <img v-if="isNew==0" src="../../assets/images/newMine/sm_icon.png" alt="">
                              <img v-if="isNew==1" src="../../assets/images/newyear/sm.png" alt />
                              <img v-if="isNew==2" src="../../assets/images/dw/sm.png" alt />
                              <img v-if="isNew==3" src="../../assets/images/ValentineDay/sm.png" alt />
                              <img v-if="isNew==4" src="../../assets/images/National Day/sm.png" alt />
                              <img v-if="isNew==5" src="../../assets/images/Christmas/smdl.png" alt />
                              <img v-if="isNew==6" src="../../assets/images/oxYear/smdl.png" alt />
                              <img v-if="isNew==7" src="../../assets/images/UEFA/smdl.png" alt />
                            </dt>
                            <dd>扫码登录</dd>
                        </dl>
                     </router-link>
                     <router-link to="/memberPackage" v-show="codeToken">
                        <dl>
                            <dt>
                              <img v-if="isNew==0" src="../../assets/images/member/hylb.png" alt="">
                              <img v-if="isNew==1" src="../../assets/images/newyear/hylb-xn.png" alt />
                              <img v-if="isNew==2" src="../../assets/images/dw/hylb-dw.png" alt />
                              <img v-if="isNew==3" src="../../assets/images/ValentineDay/hylb-qrj.png" alt />
                              <img v-if="isNew==4" src="../../assets/images/National Day/hylb-zq.png" alt />
                              <img v-if="isNew==5" src="../../assets/images/Christmas/hylb-sd.png" alt />
                              <img v-if="isNew==6" src="../../assets/images/oxYear/hylb-ox.png" alt />
                              <img v-if="isNew==7" src="../../assets/images/UEFA/hylb.png" alt />
                            </dt>
                            <dd>Quà hội viên</dd>
                        </dl>
                     </router-link>

                   
                </div>
            </div>
            <div class="session session-main-server">
                <h3>我的服务</h3>
                <ul>
                    <li>
                        <i>
                          <img v-if="isNew==0" src="../../assets/images/newMine/serve_icon.png" alt="">
                          <img v-if="isNew==1" src="../../assets/images/newyear/5.png" alt />
                          <img v-if="isNew==2" src="../../assets/images/dw/lxkf.png" alt />
                          <img v-if="isNew==3" src="../../assets/images/ValentineDay/icon-lxkf-min.png" alt />
                          <img v-if="isNew==4" src="../../assets/images/National Day/lxkf_03.png" alt />
                          <img v-if="isNew==5" src="../../assets/images/Christmas/kefu.png" alt />
                          <img v-if="isNew==6" src="../../assets/images/oxYear/lxkf.png" alt />
                          <img v-if="isNew==7" src="../../assets/images/UEFA/lxkf.png" alt />
                        </i>
                        <a href="javascript:;" @click="goOnline">liên hệ với dịch vụ khách hàng</a>
                    </li>
                    <li>
                        <i>
                          <img v-if="isNew==0" src="../../assets/images/newMine/yj_icon.png" alt="">
                          <img v-if="isNew==1" src="../../assets/images/newyear/4.png" alt />
                          <img v-if="isNew==2" src="../../assets/images/dw/yj.png" alt />
                          <img v-if="isNew==3" src="../../assets/images/ValentineDay/icon-yjfk-min.png" alt />
                          <img v-if="isNew==4" src="../../assets/images/National Day/yjfk.png" alt />
                          <img v-if="isNew==5" src="../../assets/images/Christmas/yjfk.png" alt />
                          <img v-if="isNew==6" src="../../assets/images/oxYear/yjfk.png" alt />
                          <img v-if="isNew==7" src="../../assets/images/UEFA/yjfk.png" alt />
                        </i>
                        <router-link to="/Feedback">意见反馈</router-link>
                    </li>
                    <li>
                        <i class="gf-icon">
                          <img v-if="isNew==0" src="../../assets/images/newMine/chat_icon.png" alt="">
                          <img v-if="isNew==1" src="../../assets/images/newyear/jiaoliu@2x.png" alt />
                          <img v-if="isNew==2" src="../../assets/images/dw/gfjlq.png" alt />
                          <img v-if="isNew==3" src="../../assets/images/ValentineDay/icon-gfjl-min.png" alt />
                          <img v-if="isNew==4" src="../../assets/images/National Day/gfjlq.png" alt />
                          <img v-if="isNew==5" src="../../assets/images/Christmas/gfql.png" alt />
                          <img v-if="isNew==6" src="../../assets/images/oxYear/gfjlq.png" alt />
                          <img v-if="isNew==7" src="../../assets/images/UEFA/gfjlq.png" alt />
                        </i>
                        <router-link to="/contact">官方交流群</router-link>
                    </li>
                    <li v-show="codeToken">
                        <i class="gf-icon">
                          <img v-if="isNew==0" src="../../assets/images/newMine/callback_icon.png" alt="">
                          <img v-if="isNew==1" src="../../assets/images/newyear/huid (4).png" alt />
                          <img v-if="isNew==2" src="../../assets/images/dw/huid (3).png" alt />
                          <img v-if="isNew==3" src="../../assets/images/ValentineDay/huid (2).png" alt />
                          <img v-if="isNew==4" src="../../assets/images/National Day/huid.png" alt />
                          <img v-if="isNew==5" src="../../assets/images/Christmas/huidian.png" alt />
                          <img v-if="isNew==6" src="../../assets/images/oxYear/hdfw.png" alt />
                          <img v-if="isNew==7" src="../../assets/images/UEFA/hdfw.png" alt />
                        </i>
                        <a href="javascript:;" @click="isShowCallTel=true">回电服务</a>
                    </li>
                    <li v-show="codeToken">
                        <i>
                          <img v-if="isNew==0" src="../../assets/images/newMine/setting_icon.png" alt="">
                          <img v-if="isNew==1" src="../../assets/images/newyear/6.png" alt />
                          <img v-if="isNew==2" src="../../assets/images/dw/sz.png" alt />
                          <img v-if="isNew==3" src="../../assets/images/ValentineDay/sz-min.png" alt />
                          <img v-if="isNew==4" src="../../assets/images/National Day/sz.png" alt />
                          <img v-if="isNew==5" src="../../assets/images/Christmas/sz.png" alt />
                          <img v-if="isNew==6" src="../../assets/images/oxYear/sz.png" alt />
                          <img v-if="isNew==7" src="../../assets/images/UEFA/sz.png" alt />
                        </i>
                        <router-link to="/setting">设置</router-link>
                    </li>
                </ul>
            </div>
        </myScroll>
        <Foot/>


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
          Vui lòng nhập mã thanh toán 
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

    <!-- 回电服务 -->
    <div class="call-back-container" v-if="isShowCallTel">
      <myScroll ref="scrollWrapper" :top='2' :bottom='5'>
          <div class="call-back-content">
            <p>我们提供7*24小时的电话客服回电服务，如果您在使用本平台时遇到问题，请选择您的问题类型和希望的客服语言，我们在第一时间给您致电！</p>
            
            <div class="back-item fk-item">
              <span>反馈类型：</span>
              <div class="item-list">
                <span v-for="(v,index) in quesList" :key="index" @click='selectQuesType($event,v.id)'>{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span>选择语言：</span>
              <div class="item-list lan-item">
                <span v-for="(v,index) in lanList" :key="index" :class="v.is_check?'active':''"  @click="changeLan($event,v)">{{v.title}}</span>
              </div>
            </div>
            <div class="back-item">
              <span>会员账号：</span>
              <input type="text" maxlength="11"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="memberAccount" placeholder="Vui lòng gửi tài khoản thành viên">
            </div>
            <div class="back-item">
              <span>电话号码：</span>
              <input type="text" maxlength="12"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" v-model="tel" placeholder="Số điện thoại di động hoặc số điện thoại cố định">
            </div>
            <div class="commit-btn" @click="getCallBack">提交信息</div>
          </div>
         

      </myScroll>
      <div class="close-callback-btn" @click="isShowCallTel=false"></div>
    </div>



    </div>
</template>

<script>
    import Foot from "../../components/footer.vue";
    import {  numberComma, Drawer } from "vux";
    import { mapState, mapMutations } from "vuex";
    import {removeAllactive } from '../../assets/js/public'
    export default {
        name: "mine2",
        data(){
            return{
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
                nNum:0,
                lanList:[],
                quesList:[],
                currLan:'',
                 selectQues:[],
                tel:'',
                isShowCallTel:false,
                memberAccount:'',
            }
        },
          props: {
            top: {
            type: Number,
            default: 0
            }
        },
        components: {
            Foot,
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
    },
    isShowCallTel:function(){
        this.selectQues = [];
        this.tel = '';
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

   changeLan(e,v){
        let curr = e.currentTarget;
        removeAllactive(document.querySelectorAll('.lan-item span'));
        curr.classList.add('active')
        this.currLan = v.id;
      },
    selectQuesType(e,id){
      let curr = e.currentTarget;
        if(curr.className.indexOf('active')>-1){
            curr.classList.remove('active');
            //删掉id
            let i = this.selectQues.findIndex(v=>{
              return v == id
            })
            this.selectQues.splice(i,1);
        }else{
            curr.classList.add('active');
            this.selectQues.push(id);
        }

    },
    //获取语言列表
    async getLan(){
      let res = await this.$http.get(this.versionLive2+'user/language_list/');
      if(res.data.code==1){
          this.lanList = res.data.data || [];
          for(let i=0,len=this.lanList.length;i<len;i++){
            if(this.lanList[i].is_check) this.currLan = this.lanList[i].id;
          }
      }else{

      }
    },
    //获取问题列表
     async getQues(){
      let res = await this.$http.get(this.versionLive2+'user/feedback_type_list/');
      if(res.data.code==1){
          this.quesList = res.data.data;
      }else{

      }
    },
    //提交回电问题
    async getCallBack(){
      if(!this.selectQues.length){
        this.$vux.toast.text('请选择反馈问题类型', 'middle')
        return;
      }
      if(this.currLan<0){
        this.$vux.toast.text('请选择语言类型', 'middle')
        return;
      }
      if(!this.tel){
        this.$vux.toast.text('请输入电话号码', 'middle')
        return;
      }
      this.$vux.loading.show();
      let res = await this.$http.get(this.versionLive2+'user/call_back/',{
        params:{
          type_id:this.selectQues.join(','),
          lang_id:this.currLan,
          issue_phone:this.memberAccount,
          phone:this.tel
        }
      })
      this.$vux.loading.hide();
      this.$vux.toast.text(res.data.msg, 'middle')
      if(res.data.code==1){
          this.isShowCallTel = false;
      }

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
    toUser(){
      if(this.$store.state.userinfo.user_id<0){
           this.$swBox({
              title: "Nhắc nhở",
              content: "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức。",
              leftBtn: "Đăng nhập",
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
          return;
      } 
      this.$ro.push({ name:'userInfo',query:{ id:this.$store.state.userinfo.user_id}});
      //this.$ro.push({ name:'userInfoNew',query:{ id:this.$store.state.userinfo.user_id,}});
    },
    goOnline() {
      //  window.open(this.customer);
      location.open(customer);
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
        localStorage.getItem("isteachmember") == "no" ? false : true;
      this.getUserInfo();
      this.loadMoney();
      this.getIsLive();
      this.zsQuest();
      // 获取用户vip等级
      // this.getVipNow();
      this.customer = JSON.parse(this.webInitData).customer;
      this.checkNotice();
      this.getLan();
      this.getQues();
    },


    know() {
      this.isteachmember = false;
      localStorage.setItem("isteachmember", "no");
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
      let d = this.globalPpproach.checkIsEncrypt({
               password: this.payPwd
             })
      let res = await this.$http.post("/api2/index/verify-fund-password",d);
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
             cancelText:'Hủy',
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
           cancelText:'Hủy',
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
          // console.log(res.data.data)     
        }else{

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
          // title: "我是标题",
          // content: "我是内容",
          // btnText: "我是按钮",
          // click: () => {
          //   this.isLogin = false;
          // }
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
            this.amount = res.data.data.balance || "0.00"; //显示出来的
            if(this.amount == 0){
              this.amount = "0.00";
            }
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
             cancelText:'Hủy',
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
             cancelText:'Hủy',
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
           cancelText:'Hủy',
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
           cancelText:'Hủy',
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
          this.$swBox({
              title: "Nhắc nhở",
              content: "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức。",
              leftBtn: "Đăng nhập",
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
          this.amount = res.data.data.balance || "0.00"; //显示出来的
           if(this.amount == 0){
              this.amount = "0.00";
            }
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
      }else{
        this.$vux.toast.text(res.data.msg,'middle');
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
        if (!this.codeToken||this.userinfo.user_id<0) {
        return;
      } else {
      if((this.noticeNum-0)>0) return
       let res = await this.$http.get('/api/live/sport/get_message_count/',{params:{
              client_type:3,
              api:this.noticeType==1?1:5
      }});
      if(res && res.data.code==1){
          this.nNum = res.data.data.msgCount;
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
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }

    .call-back-container{
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,.5);
      left:0;
      right: 0;
     
      .call-back-content{
        padding: .5rem .3rem 1rem .3rem;
        background: #fff;
         p{
          .rem(font-size,24);
          
          margin-bottom: .3rem;
        }
        .back-item{
          margin-bottom:.3rem;
          >span{
              .rem(font-size,24);
              
          }
          input{
            .rem(width,500);
            .rem(height,68);
            .rem(border-radius,4);
            padding: 0 .2rem;
            border: 1px solid #D3D3D3;
          }
          .item-list{
            margin-bottom: .3rem;
            display: inline-block;
            >span{
              .rem(padding-left,20);
              .rem(padding-right,20);
              .rem(height,68);
              .rem(line-height,68);
              .rem(border-radius,4);
              .rem(margin-bottom,20);
              .rem(margin-right,10);
              color:#999;
              .rem(font-size,20);
              display: inline-block;
              border-radius: .1rem;
              font-weight: 500;
              border: 1px solid #D3D3D3;
              &.active{
                color:#fff;
                border:1px solid #4BE5EE;
                // background: linear-gradient(90deg, #FF5B54, #FFA193);
                background: linear-gradient(90deg, #559CFF, #4BE5EE); 
              }
            }
          }
        }
        .fk-item{
          >span{
            float: left;
            width: 20%;
          }
          .item-list{
            float: left;
            width: 80%;
             >span{
              .rem(padding-left,5);
              .rem(padding-right,5);
             }
          }
        }
        .commit-btn{
            background: linear-gradient(90deg, #559CFF, #4BE5EE); 
            color:#fff;
            text-align: center;
            .rem(height,88);
            .rem(line-height,88);
            .rem(width,420);
            .rem(font-size,32);
            .rem(border-radius,50);
            margin: .6rem auto 0;
        }
        
      }
      .close-callback-btn{
            position: absolute;
            .rem(height,70);
            .rem(width,70);
            background: url(../../assets/images/newMine/remove.png) no-repeat;
            background-size: contain;
            left: 50%;
            transform: translateX(-50%);
            bottom:3rem;
            bottom:0.7rem;
        }
    }
    
    .mine2-container{
        .session{
            .rem(margin-top,30);
            .rem(padding-left,30);
            .rem(padding-right,30);
        }
    }
    .session-header{
        // .rem(padding-top,30);
        display: -webkit-box;
        background: #fff;
        .user-img{
            // overflow: hidden;
            .rem(width,140);
            .rem(height,140);
            // border-radius: 50px;
            // overflow: hidden;
            // background: #ccc;
            position: relative;
            margin-top:.6rem;
            // border-radius: 50%;
            // overflow: hidden;

            .img-box{
              .rem(width,140);
            .rem(height,140);
               background: #ccc;
              border-radius: 50%;
              overflow: hidden;
            }
            .edit-box{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              bottom: 0rem;
              color: #fff;
              .rem(width,120);
              .rem(height,30);
              .rem(line-height,30);
              border-radius: 30px;
              background: #4C4C4C;
              text-align: center;
              .rem(font-size,18);
              i{
                .rem(width,14);
                .rem(height,14);
                display: inline-block;
                background: url(../../assets/images/newMine/edit_icon.png);
                background-size: contain;
              }
            }
        }
        .user-mess{
            .user-name{
                .rem(margin-top,25);
            }
            .pureTop{
              .rem(margin-top,55);
            }
            .rem(margin-left,30);
            box-flex: 1;
            flex: 1;
            .name{
                color: #343434;
                .rem(font-size,32);
                font-weight: bold;
            }
            .sex-icon{
                vertical-align: text-top;
                .rem(height,30);
                .rem(width,30);
                display: inline-block;
              &.female-icon{
                  background: url("../../assets/images/newMine/female_icon.png") no-repeat;
                  background-size: contain;
              }
              &.male-icon{
                background: url("../../assets/images/chat/gender-man-min (1).png") no-repeat center;
                background-size: contain;
              }
            }
            .gz-icon{
              display: inline-block;
              .rem(height,30);
              .rem(width,90);
              
               vertical-align: text-top;
            }
            .gz-icon1{
               background: url("../../assets/images/newMine/qs.png") no-repeat;
               background-size: contain;
            }
            .gz-icon2{
               background: url("../../assets/images/newMine/nj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon3{
               background: url("../../assets/images/newMine/zj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon4{
               background: url("../../assets/images/newMine/bj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon5{
               background: url("../../assets/images/newMine/hj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon6{
               background: url("../../assets/images/newMine/gj.png") no-repeat;
               background-size: contain;
            }
            .gz-icon7{
               background: url("../../assets/images/newMine/gw.png") no-repeat;
               background-size: contain;
            }
            .grade-icon{
                color: #fff;
                .rem(padding-left,37);
                font-weight: bold;
                display: inline-block;
                .rem(width,64);
                .rem(height,55);
                .rem(line-height,31);
               
                vertical-align: text-bottom;
            }
            .grade-icon1{
                background: url("../../assets/images/newMine/vip1.png") no-repeat;
                background-size: contain;
            }
             .grade-icon2{
                background: url("../../assets/images/newMine/vip2.png") no-repeat;
                background-size: contain;
            }
             .grade-icon3{
                background: url("../../assets/images/newMine/vip3.png") no-repeat;
                background-size: contain;
            }
             .grade-icon4{
                background: url("../../assets/images/newMine/vip4.png") no-repeat;
                background-size: contain;
            }
             .grade-icon5{
                background: url("../../assets/images/newMine/vip5.png") no-repeat;
                background-size: contain;
            }
             .grade-icon6{
                background: url("../../assets/images/newMine/vip6.png") no-repeat;
                background-size: contain;
            }
             .grade-icon7{
                background: url("../../assets/images/newMine/vip7.png") no-repeat;
                background-size: contain;
            }
             .grade-icon8{
                background: url("../../assets/images/newMine/vip8.png") no-repeat;
                background-size: contain;
            }
            .yqm-mess{
                .rem(font-size,20);
                color: #666;
            }
        }
        .user-id{
            .rem(margin-top,10);
            .video-mess{
              margin-top: .1rem;
            }
            .id-icon{
                background: #A9B3C8;
                color: #fff;
                .rem(border-radius,8px);
                .rem(font-size,22);
                .rem(padding-left,10);
                .rem(padding-right,10);
                margin-bottom: .2rem;
            }
            .every-video{
                // color: #666;
                padding-right: .1rem;
                .rem(font-size,18);
                i{
                    font-family: number1;
                    font-weight: 400;
                    .rem(font-size,24);
                }
            }
        }
        .qm{
            font-weight: 500;
            .rem(font-size,22);
            // color: #666;
            .rem(margin-top,5);
            width: 100%;
        }
        .login-reg-btn{
            background: linear-gradient(90deg, #FF3131, #FF8067);
            color: #fff;
            .rem(border-radius,32px);
            .rem(width, 220px);
            .rem(height, 64px);
            .rem(line-height, 64px);
            .rem(font-size, 28px);
            margin: 0 auto;
            text-align: center;
            a{
                color: #fff;
            }
        }
    }
    .no-session-header{
        .rem(padding-top,50);
        background: #fff;
        display: block;
        .tip-box{
            margin: .4rem auto 0;
            i{
               display: inline-block;    
                .rem(width, 80px);
                .rem(height, 64px);
                background: url(../../assets/images/newMine/gift.png) no-repeat;
                background-size: contain;
                vertical-align: bottom;
            }
            p{
                .rem(font-size, 24px);
                color: #666;
                display: inline-block;    
                padding-left: .2rem;
            }
        }
    }
    .mine2-container {
        .session-num{
          display: flex;
          justify-content: space-around;
          background: #fff;
          margin-top:0;
          padding-top:.4rem;
          padding-bottom: .3rem;
          dl{
              position: relative;
              text-align: center;
              dt{
                  font-weight: bold;
                  .rem(font-size,32);
                  font-style: italic;
              }
              dd{
                  .rem(font-size,24);
                  color: #9A9A9A;
                  .rem(padding-top,5);
              }
              &:after{
                  content: '';
                  position: absolute;
                  .rem(width,1);
                  .rem(height,47);
                  background: #D0D0D0;
                  .rem(left,140);
                  .rem(top,20);
              }
              &:last-of-type:after{
                  background: none;
              }
          }
      }
    }
    .session-money{
        display: flex;
        justify-content: space-around;
        >div{
            background: #fff;
            .rem(border-radius,20);
            .rem(padding-left,20);
            .rem(padding-right,20);
            .rem(padding-top,20);
            .rem(width,354);
            .rem(height,154);
            &.pureMoney{
              width: 100%;
              margin-right: 0;
              p{
                text-align: left;
              }
              
            }
            span{
                .rem(font-size,28);
                color:#666;
                font-weight: 500;
            }
            .balance-icon{
                .rem(width,160);
                .rem(height,42);
                display: inline-block;
                &.change-icon{
                    background: url("../../assets/images/newMine/money_change.png") no-repeat;
                    background-size: contain;
                }
                &.zs-icon{
                    background: url("../../assets/images/newMine/diamon_icon.png") no-repeat;
                    background-size: contain;
                }
            }
            p{
                text-align: right;
                font-weight: bold;
                color: #666;
                .rem(font-size,44);
                .rem(padding-top,30);
                font-family: number1;
                .refresh-icon{
                    .rem(width,32);
                    .rem(height,29);
                    display: inline-block;
                    background: url("../../assets/images/member/sx_icon.png") no-repeat;
                    background-size: contain;
                }
            }
        }
        .balance-box{
            .rem(margin-right,30);
        }
    }
    .session-main-title{
        display: flex;
        justify-content: space-around;
        background: #fff;
        .rem(border-radius,10);
        .rem(padding-top,20);
        .rem(padding-bottom,20);
        .rem(margin-left,30);
        .rem(margin-right,30);
        a{
            display: inline-block;
        }
        dl{
            text-align: center;
            dt{
                .rem(height,124);
                .rem(width,124);
            }
            dd{
                color: #666;
                font-weight: 500;
            }
        }
    }
    .mine2-container{
        .session-main-tj{
            background: #fff;
            .rem(border-radius,10);
            .rem(padding-top,20);
            .rem(padding-bottom,20);
            .rem(padding-left,0);
            .rem(padding-right,0);
            .rem(margin-left,30);
            .rem(margin-right,30);
            h3{
                .rem(margin-left,30);
                color: #343434;
                font-weight: 500;
                .rem(font-size,28);
            }
            .tj-content{
                overflow: hidden;
                a{
                    width: 24%;
                    // float: left;
                    display: inline-block;
                    position: relative;
                    .rem(margin-top,40);
                        .dian{
                            position: absolute;
                                background: url("../../assets/images/main/home_icon_03.png") no-repeat;
                                background-size: contain;
                                width: 0.22rem;
                                height: 0.22rem;
                                right: 29%;
                                top: -.1rem;
                            }
                }
                dl{
                    text-align: center;
                    
                    dt{
                        display: inline-block;
                        .rem(height,51);
                        .rem(width,40);
                    }
                    dd{
                        .rem(font-size,24);
                        color: #666;
                    }
                }
            }

        }
    }
    .mine2-container{
        .session-main-server{
            
            .rem(border-radius,10);
           
            .rem(margin-bottom,30);
            .rem(padding-left,0);
            .rem(padding-right,0);
            .rem(margin-left,30);
            .rem(margin-right,30);
            overflow: hidden;
            h3{
                .rem(padding-left,30);
                 .rem(padding-top,30);
                color: #343434;
                font-weight: 500;
                .rem(font-size,28);
                background: #fff;
            }
            ul{
              padding-bottom: .5rem;
                li{
                    >i{
                        display: inline-block;
                        .rem(width,51);
                        .rem(height,51);
                        vertical-align: middle;
                        .rem(margin-left,30);
                    }
                    .gf-icon{
                        .rem(width,52);
                        .rem(height,47);
                    }
                    a{
                        display: inline-block;
                        border-bottom: 1px solid #F2F1F1;
                        .rem(height,100);
                        .rem(line-height,100);
                        .rem(width,540);
                        .rem(font-size,24);
                        color: #666;
                        font-weight: 500;
                        .rem(margin-left,30);
                    }
                    background: url("../../assets/images/newMine/left_icon.png") #fff 97% center  no-repeat;
                    background-size: 3%;
                }
            }
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
.toUser {
  position: absolute;
  right: .3rem;
  width: .4rem;
  height: 2.5rem;
  img {
    width: 0.2rem;
    margin-top: 1.2rem;
  }
}

</style>