<template>
    <div class="chat-box" id="chatBox" :class="hp?'hp':''" >
        <div class="chat-header">
            <div class="chat-head" @click="goBack">
                <a href="javascript:;" class="back-icon"><img src="../../assets/images/gray-back-icon.png" alt=""></a>
            </div>
            <div class="chat-logo"  @click="$router.push('/')">
                <!-- <img src="../../assets/images/login/logo1.png" alt=""> -->
            </div>
            <!-- <div class="fr down-load" @click="download">download App</div> -->
        </div>
        <div class="live-room" >

            <div class="video-wrap">
                <!-- :style="{'position': 'absolute','width': '100%','z-index':'9', 'top': chatTop+'px','max-width':'750px'}" -->
                <div class="video-box" v-if="!isHideVideo"  >
                    <div >
                        <div v-if="liveData&&liveData.live_status" >
                            <flv-player :src="videoSrc.originPullUrl" v-if="!isiOS&&chatData" :imgSrc="liveData" :chatData="chatData" :pushDanmu="pushDanmu" @watchChild="watchChild"/>

                            <hls-player v-if="chatData&&isiOS" :src="videoSrc.originPullUrl" :imgSrc="liveData"  :chatData="chatData" />
                        </div>
                    </div>
                    <div v-if="liveData&&!liveData.live_status" class="no-kb">
                        <!-- <div class="img">
                            <img :src="liveData.avatar" alt="">
                        </div>
                        <div class="live-rest" v-if="liveData&&!liveData.live_status">
                            <p>主播暂时不在家~</p>
                            <p v-if="liveData.liveStartTimeTxt">下次开播时间：{{ liveData.liveStartTimeTxt }}</p>
                        </div> -->





                         <div class="sport-top">
                            <!-- <img class="back" src="../../assets/images/chat/back.png" alt=""> -->
                            <div class="top-main">
                                <p class="title">{{liveData.race_config.simpleleague}}【{{liveData.race_config.matchtime}}】</p>
                                <div class="name-content clearfix">
                                    <span class="name d-name fl" style="width:40%"> 
                                        <img class="icon" v-lazy="liveData.race_config.homelogo" alt="">
                                        {{liveData.race_config.homesxname}}（主）
                                    </span>
                                    <span class="num fl" style="width:20%">
                                        ({{liveData.race_config.homescore}}:{{liveData.race_config.awayscore}})
                                        <strong>{{liveData.race_config.homescore}} : {{liveData.race_config.awayscore}}</strong>
                                    </span>
                                    <span class="name k-name fl" style="width:40%"> 
                                        <img class="icon" v-lazy="liveData.race_config.awaylogo" alt="">
                                        {{liveData.race_config.awaysxname}}（客）
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--切换栏-->
                <div class="room-info-tab" v-if="!guessSw" :class="isHideVideo?'hideVideoTab':''">
                    <ul class="fl room-tab sprot-room-tab">
                        <!-- <li @click="currTab=1" :class="currTab==1?'active':''"><span>trò chuyện</span></li> -->
                        <li @click="currTab=5" :class="currTab==5?'active':''"><span>đội</span></li>
                        <!-- <li @click="currTab=2" :class="currTab==2?'active':''"><span>主播</span></li> -->
                        <!-- <li @click="currTab=3" :class="currTab==3?'active':''"><span>排行</span></li> -->
                        <!-- <li @click="currTab=4" :class="currTab==4?'active':''"><span>预告</span></li> -->
                    </ul>
                    <!-- <div class="focus-me fr" @click="clickFollow" :class="isFollow?'active':''"><i v-if="!isFollow"></i>{{ isFollow?'已关注':'关注' }}</div> -->
                </div>

                <!--通知-->
                <!--<div v-if="liveData&&chatData&&currTab==1&&!guessSw" :class="isHideVideo?'room-tz-hide':''" class="room-tz">-->
                <!-- <div v-if="currTab==1&&!guessSw" :class="isHideVideo?'room-tz-hide':''" class="room-tz">
                    <i class="user-vip sy"></i>
                    <span class="msg-content" v-if="liveData">
                                欢迎来到{{ liveData.nickname }}直播间，喜欢就点关注吧。
                    </span>
                </div> -->

                <!-- 可以滚动的区域 -->
                <main >
<!--                    用户进入直播间底部提示-->
                    <div class="showuser-In">
<!--                        <span  class="one-item item-in" :class="v.vip<1&&!v.isAnchor?'no-vip':''" v-for="(v,indexChat) in inData" :key="indexChat" v-if="v.type=='subscribe'&&v.user_id">-->
<!--                           <i class="user-vip" :class="'user-vip'+v.vip" style="top:-.05rem" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2"></i>-->
<!--                           <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>-->
<!--                            <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>-->
<!--                           <span style="float:none;">欢迎 <i @click="banned(v.userType,v.userName,v.user_id)">{{ v.userName }}</i>进入直播间</span>-->
<!--                           <span style="vertical-align: baseline"></span>-->
<!--                        </span>-->

                    </div>

<!--                    <span style="text-align: center;width: 100%;position: fixed;bottom:1.4rem;left:50%;transform:translateX(-50%);z-index: 2"  class="one-item item-in" :class="v.vip<1&&!v.isAnchor?'no-vip':''" v-for="(v,indexChat) in inData" :key="indexChat" v-if="v.type=='subscribe'&&v.user_id">-->
<!--                           <i class="user-vip" :class="'user-vip'+v.vip" style="top:-.05rem" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2"></i>-->
<!--                           <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>-->
<!--                            <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>-->
<!--                           <span style="float:none;">欢迎 <i @click="banned(v.userType,v.userName,v.user_id)">{{ v.userName }}</i>进入直播间</span>-->
<!--                           <span style="vertical-align: baseline"></span>-->
<!--                        </span>-->
                    <!--聊天内容-->
                    <myScroll v-if="currTab==1&&!guessSw"  ref="scrollWrapper" :data="playList" :class="isHideVideo?'high-index':''" :top="isHideVideo?3.1:7.8" :bottom="showEmj?4:1.2"  class="scrollWrapper" >
                        <div v-if="!chatData" class="chat-msg-loading" style="color:#ff513e;margin: 0.1rem 0.5rem;font-size: .38rem;">聊天室Đang nhận...</div>
                        <!--聊天室-->
                        <div id="chat-content" class="chat-content"  :class="isPointer?'isP':''" >
                            <!--<div v-if="liveData&&chatData" class="room-tz">-->
                                <!--<i class="user-vip sy"></i>-->
                                <!--<span class="msg-content" style="color: #FF9999">-->
                                           <!--欢迎来到{{ liveData.nickname }}直播间，喜欢就点关注吧。-->
                                       <!--</span>-->
                            <!--</div>-->
                            <div v-for="(v,indexChat) in chatData" :key="indexChat"  v-if="v.type!='subscribe'">
                                <!--讲话-->
                                <!--<span v-if="v.type=='publish'" class="one-item" :class="v.vip<1&&!v.isAnchor?'no-vip':''">-->
                                                <!--<i class="user-vip" :class="'user-vip'+v.vip" v-if="v.vip>0&&v.isAnchor!=1"></i>-->
                                                <!--<i class="user-vip host-vip" v-if="v.isAnchor==1"></i>-->
                                               <!--<span class="username">{{ v.userName }}：</span>-->
                                                <!--<span class="username" @click="banned(v.userType,v.userName,v.user_id)">{{ v.userName }}：</span>-->
                                               <!--<keep-alive>-->
                                                   <!--<span class="msg-content"  v-html="v.text"></span>-->
                                               <!--</keep-alive>-->
                                 <!--</span>-->
                                <!--说话-->
                                <dl class="speak clearfix" v-if="v.type=='publish'&&v.event!='pushPlan'" :class="v.vip<1&&!v.isAnchor?'no-vip':''">
<!--                                <dl class="speak clearfix" v-if="v.type=='publish'" :class="v.vip<1&&!v.isAnchor?'no-vip':''">-->
                                    <dt class="fl" @click="goInfo(v)" @touchstart="gtouchstart(v)" @touchmove="gtouchmove()" @touchend="gtouchend(v)">
                                        <img :src="v.avatar" alt="">
                                    </dt>
                                    <dd class="fl">
                                        <i class="user-vip fl" :class="'user-vip'+v.vip" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2"></i>
                                        <i class="user-vip host-vip fl" v-if="v.isAnchor==1"></i>
                                        <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>
                                        <span class="user-name fl" @click="banned(v.userType,v.userName,v.user_id)">{{v.userName}}</span><p class="speak-time">{{v.sendTimeTxt}}</p>
                                        <div class="clearfix"></div>
                                        <keep-alive>
                                            <p class="speak-content" v-html="v.text"></p>
                                        </keep-alive>
                                    </dd>

                                </dl>
                                <dl class="new-speak clearfix" v-if="v.type=='publish'&&v.event=='pushPlan'" :class="v.vip<1&&!v.isAnchor?'no-vip':''">
                                    <dt class="fl" @click="goInfo(v)" @touchstart="gtouchstart(v)" @touchmove="gtouchmove()" @touchend="gtouchend(v)">
                                        <img :src="v.avatar" alt="">
                                    </dt>
                                    <dd class=" fl">
                                        <div class="user-head" style="height:0.5rem;color: #445779;font-size: 0.32rem;">
                                            <i class="user-vip host-vip fl" v-if="v.isAnchor==1" style="margin-top: 0.03rem;"></i>
                                            <span style="margin-left:0.1rem">{{v.userName}}</span>
                                            <span class="fr">{{v.sendTimeTxt}}</span>
                                        </div>
                                        <p class="issue">
                                            <span class="user-name fl">{{v.orders.lottery_cid}}</span>
                                            <span class="speak-time fr">{{v.orders.play_bet_issue}}期</span>
                                        </p>
                                        <!--加上height是一行-->
                                        <ul class="table height">
                                            <li class="title">
                                                <span>玩法</span>
                                                <span>号码</span>
                                                <span>赔率</span>
                                                <!-- <span v-if="v.orders.is_bl_play==0">钻石</span>
                                                <span v-if="v.orders.is_bl_play==1">金额</span> -->
                                                <span >金额</span>
                                            </li>
                                            <li class="gt-item" v-for="(item,index) in (typeof(v.orders.order_detail)=='string'?JSON.parse(v.orders.order_detail):v.orders.order_detail)" :key="index">
                                                <span>{{item.play_sec_cname}}</span>
                                                <span>{{item.play_class_cname}}</span>
                                                <span>{{(item.play_odds-0).toFixed(2)}}</span>
                                                <span>
                                                    <i>{{item.play_bet_sum}}</i>
                                                    <!-- <i class="zt-size" v-if="v.orders.isBalance==0">钻石</i>
                                                    <i class="zt-size" v-if="v.orders.isBalance==1">元</i> -->
                                                    <i class="zt-size" v-if="v.orders.is_bl_play==0">钻石</i>
                                                    <i class="zt-size" v-if="v.orders.is_bl_play==1">元</i>
                                                </span>
                                            </li>
                                        </ul>
                                        <p class="line"></p>
                                        <p class="btn-group">
                                            <span class="open-up" v-if="(typeof(v.orders.order_detail)=='string')&&JSON.parse(v.orders.order_detail).length>1" @click="showAll($event)">展开 <img class="icon" src="../../assets/images/chat/zk-min.png" alt=""></span>
                                            <span class="open-up" v-if="((typeof v.orders.order_detail=='object')&&v.orders.order_detail.constructor==Array)&&v.orders.order_detail.length>1" @click="showAll($event)">展开 <img class="icon" src="../../assets/images/chat/zk-min.png" alt=""></span>
                                            <span class="put-away" style="display: none" @click="hideAll($event)">收起 <img class="icon" src="../../assets/images/chat/sq-min.png" alt=""> </span>
                                            <button :class="{'follow-up':true,'expire':!v.isExpire}" @click="followOrder(v.orders,v.isExpire)">跟投</button>
                                        </p>
                                    </dd>
                                </dl>
                                <!--                               <span class="gift-item" v-if="v.type=='gift'&&v.gift_type==1&&v.gift_id!=18&&v.gift_id!=24&&v.gift_id!=30&&v.gift_id!=31&&v.gift_id!=23">-->
                                <!--发礼物-->
                                <span class="gift-item one one-item" style="text-align: center;color: #666;width: 100%;max-width: 100%;" v-if="v.type=='gift'&&v.gift_type==1&&!guessSw" :class="v.vip<1&&!v.isAnchor?'no-vip':''">
                                           <i class="user-vip" :class="'user-vip'+v.vip" v-if="v.vip>0&&v.userType!=2"></i>
                                           <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>
                                           <i class="user-vip admin-vip" v-if="v.userType==2"></i>
                                           <i class="username11">{{ v.userName }}</i>&nbsp;<i style="color: #333333">送给主播</i> &nbsp;{{ v.gift_num }} 个&nbsp;<i style="color:#FF513E;">{{ v.gift_name }}</i>
                                            <img :src="v.icon" alt="" class="gift">
                                            <span class="giftnum" v-if="v.ljNum!=undefined"><i>X</i>{{v.ljNum}}</span>
                                </span>
                                <!--发红包-->
                                <span class="gift-item one-item" style="text-align: center;color: #666;width: 100%;max-width: 100%;"
                                      v-if="v.type=='gift'&&v.gift_type==4" :class="v.vip<1&&!v.isAnchor?'no-vip':''">
                                                <i class="user-vip" :class="'user-vip'+v.vip" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2" style="top: -.05rem"></i>
                                                <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>
                                                <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>
                                                <i class="username11">{{ v.userName }}</i>&nbsp;发出一个<i style="color:#ff513e">{{ v.gift_price }}元红包</i>，大家快去抢啊！
                                 </span>
                                <!--进入直播间-->
<!--                                <span style="text-align: center;color: #666;width: 100%;max-width: 100%;position: fixed;bottom:0" v-if="v.type=='subscribe'&&v.user_id" class="one-item" :class="v.vip<1&&!v.isAnchor?'no-vip':''">-->
<!--                                           <i class="user-vip" :class="'user-vip'+v.vip" style="top:-.05rem" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2"></i>-->
<!--                                           <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>-->
<!--                                            <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>-->
<!--                                    &lt;!&ndash;尊贵的用户 {{ v.userName }} <i class="user-vip vip1"></i> 进入房间了~~&ndash;&gt;-->
<!--                                           <span style="float:none;color: #666;">欢迎 <i @click="banned(v.userType,v.userName,v.user_id)">{{ v.userName }}</i>进入直播间</span>-->
<!--                                           <span style="vertical-align: baseline"></span>-->
<!--                                </span>-->

                            </div>

                            <!--榜单-->
                            <div class="reward-list" v-if="ifView==2">
                                <div class="reward-list-title">
                                    <span :class="isReward=='day'?'active':''" @click="changeRew('day')">日榜</span>
                                    <span :class="isReward=='week'?'active':''" @click="changeRew('week')">周榜</span>
                                </div>
                                <div class="reward-list-item" v-if="rewardItem&&!rewardItem.length">
                                    暂无榜单哦~
                                </div>
                                <div class="reward-list-item" v-for="(v,index) in rewardItem">
                                    <div>no.{{ index+1 }} &nbsp;{{ v.nickname }}</div>
                                    <div>{{ v.amount }}</div>
                                </div>

                            </div>

                        </div>


                    </myScroll>

                    <myScroll v-if="currTab==2"  ref="scrollWrapper2" :data="playList" :class="isHideVideo?'high-index':''" :top="isHideVideo?2.3:7.85" :bottom="0"   class="scrollWrapper" >
                        <!--主播个人信息-->
                        <div class="host-container">
                            <dl class="host-msg clearfix">
                                <dt class="fl" @click="goHost"><img v-lazy="hostMsg.avatar" alt=""><i class="host-icon"></i></dt>
                                <dd class="fl">
                                    <h3 class="nick-name">{{hostMsg.nickname}} <i class="tj-zb" v-if="$store.state.codeToken&&isHotPut!=0&&$store.state.userinfo.noble>6" @click="tjfunc(hostMsg.anchor_id)"></i><i class="tj-zb tj-zb-over" v-if="$store.state.codeToken&&isHotPut==0&&$store.state.userinfo.noble>6" @click="tjfuncOver()"></i></h3>
                                    <span class="room-no">房间号：{{hostMsg.anchor_id}} / {{hostMsg.fans}}粉丝</span>
                                    <p class="icon-list">
                                        <i class="sex-icon" :class="hostMsg.sex==0?'female':'male'"></i>
                                        <i class="year-icon">{{hostMsg.age}}</i>
                                        <i class="grade-icon">{{hostMsg.level}}</i>
                                    </p>
                                </dd>
                                <dd class="right-icon" @click="goHost"></dd>
                            </dl>
                            <!--主播动态-->
                            <TrendDt v-if="hostDt.length" :dataList="hostDt"></TrendDt>
                        </div>
                    </myScroll>

                    <myScroll v-if="currTab==3"  ref="scrollWrapper3" :data="playList" :class="isHideVideo?'high-index':''" :top="isHideVideo?2.3:7.85"  :bottom="0"   class="scrollWrapper" >
                        <!--排行-->
                        <div class="bd-content">
                            <ul class="bd-list">
                                <li v-for="(item,index) in liveRewardData" :key="index" v-if="index<10">
                                    <router-link :to="{name:'userInfo',query:{id:item.user_id,avatar:item.avatar}}">
                                        <span class="bd-user-pm" :class="'bd-user-pm'+(index+1)" v-if="index<3"></span>
                                        <span class="bd-user-pm" v-else>{{index+1}}</span>
                                        <div class="bd-user-img"><img v-lazy="item.avatar" alt=""></div>
                                        <span class="bd-user-name">{{item.nickname | filterNickName(item.vip)}}</span>
                                        <span class="bd-user-vip" :class="'bd-user-vip'+item.vip"></span>
                                        <span class="bd-user-diamod">{{item.amount | filterDiamond}}钻石</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </myScroll>

                    <myScroll v-if="currTab==4"  ref="scrollWrapper4" :data="playList" :class="isHideVideo?'high-index':''" :top="isHideVideo?2.3:7.85"  :bottom="0"   class="scrollWrapper" >
                        <!--预告-->
                        <!-- <preview :typeId="lotterId" /> -->
                         <div class="preview-container">
                            <p class="loading-tip" v-if="loading">Đang nhận...</p>
                            <div class="one-item" v-for="(v,k) in LivePreview" :key="k">
                              <h4>
                                <i>{{k}}</i>
                              </h4>
                              <ul class="preview-list-box clearfix">
                                <li v-for="(item,index) in v" :key="index">
                                  <dl class="clearfix">
                                    <dt class="host-img fl" @click="toZbj(item)">
                                      <!-- <img v-lazy="item.avatar" @click="toZbj(item)" alt /> -->
                                      <div class="host-img-new"><img v-lazy="item.avatar" @click="toZbj(item)" alt /></div>
                                      <div :class="item.livestatus == 1 ? 'circle' : ''"></div>
                                      <div :class="item.livestatus == 1 ? 'circle' : ''"></div>
                                      <div :class="item.livestatus == 1 ? 'circle' : ''"></div>

                                    </dt>
                                    <dd class="fl">
                                      <h4 class="host-name">{{item.nickname}}</h4>
                                      <span class="lottery-name">{{item.name}}</span>
                                      <p class="play-time">{{item.starttime}}-{{item.endtime}}</p>
                                    </dd>
                                    <dd
                                      class="focus-btn"
                                      @click="followAnchor(item)"
                                      :class="item.isFollow?'focus':'no-focus'"
                                    ></dd>
                                  </dl>
                                  <!-- :class="'hot-icon'+(index+1)" -->
                                  <div class="hot-icon" v-if="index<3" ></div>
                                </li>
                              </ul>
                            </div>
                            <p class="no-data" v-if="!loading && LivePreview.length<1">
                                <img src="../../assets/images/member/zwyg.png" alt="">
                                该彩种暂无预告
                                </p>
                          </div>
                    </myScroll>

                     <myScroll v-show="currTab==5"  ref="scrollWrapper5" :data="playList" :class="isHideVideo?'high-index':''" :top="isHideVideo?2.3:7.85"  :bottom="0"   class="scrollWrapper" >
                        <!-- 球队信息 -->
                        <div class="team-box">
                            <div class="title-tab">
                                <span :class="{'active':inftTab == 0}" @click="inftTab = 0">{{liveData.race_config.homesxname}}</span>
                                <span :class="{'active':inftTab == 1}" @click="inftTab = 1">{{liveData.race_config.awaysxname}}</span>
                            </div>
                            <div class="team-info" v-show="inftTab ==0" v-html="homeTeamInfo">
                                <!-- <p>富勒姆足球俱乐部（Fulham F.C.）<br/>

                                <br/>是一家位于英格兰伦敦的足球俱乐部，成立于1879年，主场为克拉文农场球场。队徽最初设计于19世纪，图案是圣保罗之剑。后来两度修改，最终简化为如今的图案，三个红色字母为富勒姆足球俱乐部的缩写。

                                <br/>在1960年代，球队大部分时间都在旧英甲联赛（英超前身）但没有赢得任何重要的锦标。1975年，他们终于打进足总杯决赛，不过遗憾屈居亚军。20世纪90年代，埃及富商法耶德入主俱乐部，富勒姆在得到重大财力支持后于2001年升上英超，此后曾多次出现降级危机，不过每次都能顺利保级。2009-10赛季俱乐部再度迎来高光时刻，在欧洲足联欧洲联赛中获得亚军。

                                <br/>2013年7月入主富勒姆长达16年的法耶德将股份出售给美籍巴基斯坦裔的沙希德·可汗。2013/14赛季，富勒姆在英超联赛中表现不济陷入降级危机，虽然球队聘用马加特为新教练，但最终仍未实现保级，球队连续13年的英超生涯终止。2018年5月27日英冠升级附加赛在新温布利球场进行，富勒姆凭借上半场凯尔尼的进球1-0力克阿斯顿维拉，时隔四年重返英超。 [1]  2020年8月5日，富勒姆在英冠升级附加赛决赛上以2-1击败布伦特福德，时隔1年成功重返英超。 [2] 
                                <br/>2021年5月11日，富勒姆降入英冠联赛。 [9] 
                                </p> -->
                            </div>
                            <div class="team-info" v-show="inftTab ==1" v-html="awayTeamInfo">
                                <!-- <p>富勒姆足球俱乐部（Fulham F.C.）<br/>

                                <br/>是一家位于英格兰伦敦的足球俱乐部，成立于1879年，主场为克拉文农场球场。队徽最初设计于19世纪，图案是圣保罗之剑。后来两度修改，最终简化为如今的图案，三个红色字母为富勒姆足球俱乐部的缩写。

                                <br/>在1960年代，球队大部分时间都在旧英甲联赛（英超前身）但没有赢得任何重要的锦标。1975年，他们终于打进足总杯决赛，不过遗憾屈居亚军。20世纪90年代，埃及富商法耶德入主俱乐部，富勒姆在得到重大财力支持后于2001年升上英超，此后曾多次出现降级危机，不过每次都能顺利保级。2009-10赛季俱乐部再度迎来高光时刻，在欧洲足联欧洲联赛中获得亚军。

                                <br/>2013年7月入主富勒姆长达16年的法耶德将股份出售给美籍巴基斯坦裔的沙希德·可汗。2013/14赛季，富勒姆在英超联赛中表现不济陷入降级危机，虽然球队聘用马加特为新教练，但最终仍未实现保级，球队连续13年的英超生涯终止。2018年5月27日英冠升级附加赛在新温布利球场进行，富勒姆凭借上半场凯尔尼的进球1-0力克阿斯顿维拉，时隔四年重返英超。 [1]  2020年8月5日，富勒姆在英冠升级附加赛决赛上以2-1击败布伦特福德，时隔1年成功重返英超。 [2] 
                                <br/>2021年5月11日，富勒姆降入英冠联赛。 [9] 
                                </p> -->
                            </div>
                        </div>
                    </myScroll>



                </main>

                <!--一般礼物-->
                <!--<div class="gifShow-box">-->
                    <!--<div class="gifShow fadeInLeft" v-for="v in genGitData">-->
                        <!--<span class="tx"><img :src="v.avatar" alt=""></span>-->
                        <!--<dl class="nickAGif">-->
                            <!--<dt>{{ v.name }}</dt>-->
                            <!--<dd>送出 <span>{{ v.giftName }}</span></dd>-->
                        <!--</dl>-->
                        <!--<div class="gifts"><img :src="v.icon" alt=""></div>-->
                        <!--<div class="num"><i>X</i>1</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--一般礼物-->
                <!-- <i class="user-vip admin-vip" v-if="v.userType==2"></i>
                                               {{ v.userName }} &;<i style="color: #333333">送给主播</i> &nbsp;{{ v.gift_num }} 个&nbsp;<i style="color:#FF513E;">{{ v.gift_name }}</i>
                                               <img :src="v.icon" alt="" class="gift">
                                            <span class="giftnum" v-if="v.ljNum!=undefined"><i>X</i>{{v.ljNum}}</span> -->
                <div class="gifShow-box">
                    <div v-for="v in genGitData" :class="{gifShow:true,fadeInLeft:v.boxShowTime>4,fadeInShow:v.boxShowTime<=4,fadeInHide:v.boxShowTime<=1}"  :key="v">
                        <div class="user-img">
                            <span class="tx"><img :src="v.avatar" alt=""></span>
                        </div>
                        <dl class="nickAGif">
                            <dt class="user-name clearfix">
                                {{v.name}}
                                <div class="num" :class="v.gift_num>999?'long-num':v.gift_num>99?'long-bw':''"><i>X</i><span>{{v.ljNum}}</span> </div>
                                <div class="gifts"><img :src="v.icon" alt=""></div>
                            </dt>


                            <dd class="git-name"><span style="color:#fff;float:left">送出</span> <span style="float:left">{{ v.gift_num }}个{{v.giftName}}</span></dd>
                        </dl>
                    </div>
                </div>

                <!--长龙提示-->
                <div class="cl-tip" v-if="clshow"><i class="cl-icon"></i>{{lotterId}}  {{clList[0].method_cname}}：{{clList[0].result_c}}  <i style="color: #ff513e">{{clList[0].nums}}期</i></div>


            </div>
        </div>


        <!--vip进入直播间-->
        <!--<div class="vip-in" v-if="vipData.vip>0">-->
        <div class="vip-container">
            <div class="vip-in" v-if="v.vip>0" v-for="(v,index) in vipData" :key="index">
                <!-- <i class="vip-type">VIP{{v.vip}}</i> -->
                <!-- 欢迎{{v.vip|filterGz}}
                <i class="vip-name">{{v.userName}}</i>
                进入直播间222 -->
                <img :src="v.avatar" alt="" srcset="" :class="v.vipName">
                <div :class="['vip-bg',v.vipName]">
                    <!-- <p>欢迎{{v.vip|filterGz}}进入直播间</p> -->
                    <p>Chào mừng đến với phòng phát sóng trực tiếp</p>
                </div>
            </div>
        </div>

        <div class="vip-container">
            <div class="vip-in" v-if="vipIsShow">
                <!-- <i class="vip-type">VIP{{this.$store.state.userinfo.noble}}</i> -->
                <!-- 欢迎 {{this.$store.state.userinfo.noble|filterGz}}
                <i class="vip-name">{{this.$store.state.username}}</i>
                进入直播间 -->
                 <img :src="this.$store.state.userinfo.avatar" alt="" srcset="" :class="vipName">
                <div :class="['vip-bg',vipName]">
                    <!-- <p style="">欢迎{{this.$store.state.userinfo.noble|filterGz}}进入直播间</p> -->
                    <p>Chào mừng đến với phòng phát sóng trực tiếp</p>
                </div>
            </div>
        </div>



        <div class="chat-footer1" v-if="isHide==false&&liveData&&!isShowKey &&currTab==1 && !guessSw" :style="{bottom:ftBottom+'rem'}">
            <div class="send-barrage">
                <div class="say-input-box"  v-if="($store.state.userinfo.user_id>0&&$store.state.userinfo.noble>0)||!$store.state.codeToken">
                    <div class="emoj-box"></div>
                    <input class="barrage-input"  id="textInput1" readonly    @touchstart="showKeyBoard"  type="text" placeholder="说点啥吧..." v-model="chatMsgForm.comment_text" >
                </div>
                <div class="say-no-vip" v-if="$store.state.codeToken&&!$store.state.userinfo.noble&&$store.state.userinfo.user_id<0">骑士 即可发言哦~</div>

               

            </div>
            <!-- <div class="fish-icon recharge-icon" @click="isFish=!isFish"  style="display:none">
                <i></i>
            </div> -->
            <!-- <div class="guess-icon recharge-icon" @click="showGuess">
                <i></i>
            </div> -->
            <!-- <div class="recharge-icon red" @click="linkRech">
                <i :class="isFirst?'isF':''"></i>
            </div> -->
            <!-- <div class="recharge-icon" @click="showRed">
                <i></i>
            </div> -->
            <!-- <div class="gift" @click="showGift">
                <i></i>
            </div> -->
        </div>
        <!--发送信息框-->
        <!-- ftBottom bottom:5.2rem -->
        <div class="chat-footer1 key" v-if="isHide==false&&isShowKey" :style="{bottom:ftBottom+'rem'}">
            <div class="send-barrage-view">
                <div @focusout="inputBlur" @focusin="inputFocus">
                  <textarea id="textInput" class="barrage-input" @blur.prevent="hideKey" @focus="showEmj=false"  ref="focusTextarea" type="text" placeholder="说点啥吧..." v-model="chatMsgForm.comment_text"
                  οnkeyup="this.value=this.value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,''"
                  >
                  </textarea>
                    <img src="../../assets/images/chat/smiley.png" alt="" @click="changeEmg" v-if="!showEmj">
                    <img src="../../assets/images/chat/keyboard-icon.png" alt="" @click="changeEmg2();showEmj=false" v-if="showEmj" style="width:0.6rem;top:0.1rem">
                </div>
                <!-- <keep-alive>
                    <vme v-show="showEmj" ref="vmeChild"></vme>
                </keep-alive> -->
                <span @click="sendChatMsg" class="send-mess"><i>发送</i></span>
            </div>
        </div>
        
        <div class="footChat" v-if="isHide==true">Đăng nhập để bình luận</div>
        <!--<Loading v-model="isToast"/>-->
        <Toast v-model="showMsg" :text="chatReturnMsg" type="text"></Toast>

        <!--礼物列表 左右滚动的礼物列表-->
        <div class="git-list-box-bg" v-if="show4" @click="show4=!show4;showDiamondNum=false"></div>
        <div class="git-list-box" v-if="show4">
            <div class="git-tab">
                <span v-for="(v,index) in giftTabsList" :class="currGitType==index?'active':''" @click="currGitType=index">
                    {{v}}
                    <!-- {{ v|filterGift }} -->
                </span>
                <!--                <span :class="currGitType=='pt'?'active':''" @click="currGitType='pt'">普通</span>-->
                <!--                <span :class="currGitType=='bb'?'active':''" @click="currGitType='bb'">表白</span>-->
                <!--                <span :class="currGitType=='cp'?'active':''" @click="currGitType='cp'">彩票</span>-->
            </div>
            <div class="git-content">
                <myScroll  ref="scrollWrapperX" :data="playList" :bottom="1.25" :top="1.3">
                    <div class="clearfix" v-for="(tab,key) in giftTab" v-if="tab==currGitType && giftData[currGitType].length">
                        <div class="git-item" v-for="(v,index) in giftData[currGitType]" @click="selectGit($event,v,index)">
                            <a href="javascript:;">
                                <div class="git-icon"><img v-lazy="v.icon" alt=""></div>
                                <p>{{ v.name }}</p>
                                <p class="diamond" v-if="!v.free_num"> {{v.amount}}钻石</p>
                                <p class="diamond" v-if="v.free_num>0"> 免费</p>
                            </a>
                            <i v-if="v.free_num">{{v.free_num}}</i>
                        </div>
                    </div>
                    <div v-if="!giftData[currGitType].length">
                        暂无
                    </div>
                </myScroll>
            </div>
            <div class="git-bottom">
                <div class="num-list" v-if="showDiamondNum">
                    <ul>
                        <li class="clearfix" v-for="(v,index) in diamondNum" :key="index" @click="selectNum(v)">
                            <span class="fl diamon-num">{{v.num}}</span>
                            <span class="fr">{{v.title}}</span>
                        </li>
                    </ul>
                </div>
                <div class="fl">
                    <div class="user-money"><img src="../../assets/images/chat/diamond_02.png" alt=""> {{ balance }}</div>
                </div>
                <div class="fr send-container clearfix">
                    <span class="select-num fl" @click="showDiamondNum=!showDiamondNum" v-if="selectnumShow">{{giftFormData.gift_num}} <img src="../../assets/images/chat/num-icon.png" alt=""></span>
                    <span class="send-git-btn fr" @click="comfirmSendGift">发送</span>
                </div>
            </div>
        </div>

        <!-- 送红包弹窗-->
        <div class="git-list-box-bg" v-if="showR" @click="showR=!showR"></div>
        <div class="send-red-box" v-if="showR" @focusout="inputBlur" @focusin="inputFocus">
            <div class="red-box-title">直播间红包</div>

            <div class="redPacket-money send-input">
                <x-input title="金额" :show-clear=false v-model="redFormData.amount" placeholder="请输入金额" id="input01" text-align="right"  :min="1" ref="input01" type="tel" ></x-input>
                <i>元</i>
            </div>
            <div class="red-num send-input">
                <!--<input type="tel" v-model="redFormData.num" style="border: 1px solid #ddd" >-->
                <x-input title="个数" :show-clear=false v-model="redFormData.num" :max="3" :min="1" placeholder="请填写个数"  text-align="right" ref="input02" type="tel"></x-input>
                <i>个</i>
            </div>

            <div class="cong" @focusout="inputBlur" @focusin="inputFocus">
                <x-input title="祝福" :show-clear=false v-model="redFormData.text" :max="10" placeholder="请输入祝福语" text-align="right" type="text"></x-input>
            </div>

            <x-button @click.native="sendRedEnvelope" type="primary">发送红包</x-button>
            <!--<group title="" label-width="3em" label-margin-right="1em" @focusout="inputBlur" @focusin="inputFocus">-->

            <!--<div class="redPacket-money send-input">-->
            <!--<x-input title="金额" :show-clear=false v-model="redFormData.amount" placeholder="请输入金额" id="input01" text-align="right"  :min="1" ref="input01" type="tel" ></x-input>-->
            <!--<i>元</i>-->
            <!--</div>-->
            <!--<div class="red-num send-input">-->
            <!--&lt;!&ndash;<input type="tel" v-model="redFormData.num" style="border: 1px solid #ddd" >&ndash;&gt;-->
            <!--<x-input title="个数" :show-clear=false v-model="redFormData.num" :max="3" :min="1" placeholder="请填写个数"  text-align="right" ref="input02" type="tel"></x-input>-->
            <!--<i>个</i>-->
            <!--</div>-->
            <!--<div class="cong">-->
            <!--<x-input title="祝福" :show-clear=false v-model="redFormData.text" :max="10" text-align="right" type="text"></x-input>-->
            <!--</div>-->

            <!--<x-input title="支付密码" v-model="redFormData.password" :max="6" :min="6" ref="input03" type="password" ></x-input>-->
            <!--<x-button @click.native="sendRedEnvelope" type="primary">发送红包</x-button>-->
            <!--</group>-->
        </div>


        <!-- 设置支付密码弹窗-->
        <!--<div class="git-list-box-bg" v-if="setPay" @click="setPay=!setPay"></div>-->
        <!--<div class="send-red-box" v-if="setPay">-->
        <!--<group title="设置支付密码" label-width="5.5em" label-margin-right="2em" label-align="justify">-->
        <!--<x-input title="支付密码" v-model="payForm.new_password"  :max="6"  ref="input04" type="password" ></x-input>-->
        <!--<x-input title="确认密码" v-model="payForm.new_password_repeat" :max="6"  ref="input05" type="password" ></x-input>-->
        <!--<x-button @click.native="sendPayPsd" type="primary">确认</x-button>-->
        <!--</group>-->
        <!--</div>-->

        <keep-alive>
            <!-- &&isShowKey -->
            <vme v-if="showEmj&&isShowKey" ref="vmeChild" :showEmoji="showEmj" style="bottom:0"></vme>
            <!-- <vme  ref="vmeChild"></vme> -->
        </keep-alive>
        <!--拆红包-->
        <div class="git-list-box-bg z" v-if="showbigRed" @click="showbigRed=!showbigRed">

        </div>
        <div class="show-cha-red" v-if="showbigRed" >
            <p class="send-msg">恭喜发财，大吉大利</p>
            <div class="chai" @click="sendReceiveRed"></div>
            <!--<p>红包来了，快拆啊～</p>-->
            <!--            <span class="comfirm-btn" @click="showbigRed=!showbigRed"></span>-->
        </div>
        <!--小红包-->
        <div class="show-small-red" v-if="redPaper.length" @click="checkRed">
            <!--<p>拆红包啦</p>-->
        </div>
        <!--显示红包金额-->
        <div class="git-list-box-bg z" v-if="showMoney" @click="showMoney=!showMoney"></div>
        <div class="show-red-money" v-if="showMoney">
            <p class="send-msg">恭喜获得</p>
            <!--<p class="red-money">{{ redInfo.amount }}<i>元</i></p>-->
            <p class="red-money">{{ redInfo.amount | filterMoney}}<i>元</i></p>
            <div class="send-user-img">
                <img :src="redInfo.send_user_avatar" alt="" v-if="redInfo.send_user_avatar">
                <img src="../../assets/images/chat/2.jpg" alt="" v-else>
            </div>
            <p class="send-user-name">{{ redInfo.send_user_name }}</p>
            <p class="send-msg-noline">{{ redInfo.send_text | filterTextLen }}</p>

            <!--             <span class="comfirm-btn" @click="showMoney=false"></span>-->

            <!--              <img src="../../assets/images/chat/11_03.png" alt="" @click="showMoney=!showMoney">-->
        </div>

        <!--红包被抢光了-->
        <div class="git-list-box-bg z" v-if="noMoney" @click="noMoney=!noMoney"></div>
        <div class="show-red-money no" v-if="noMoney">
            <h3>哎呀~</h3>
            <p class="no-tip">手速慢了哦！下次要加油鸭</p>
            <div class="send-user-img">
                <img :src="redInfo.send_user_avatar" alt="" v-if="redInfo.send_user_avatar">
                <img src="../../assets/images/chat/2.jpg" alt="" v-else>
            </div>
            <p class="send-user-name">{{ redInfo.send_user_name }}</p>
            <p class="no-money-msg">{{ redInfo.send_text | filterTextLen }}</p>
            <!--            <span class="comfirm-btn" @click="noMoney=false"></span>-->
        </div>

        <!--    发红包余额不足弹窗-->
        <div class="git-list-box-bg z" v-if="noSendMoney" @click="noSendMoney=!noSendMoney"></div>
        <div class="dialog-pop" v-if="noSendMoney">
            <img src="../../assets/images/chat/yebz@3x.png" alt="">
            <p>{{ noSendMoneyMsg }}</p>
            <div class="dialog_ft">
                <a href="javascript:;" @click="noSendMoney=!noSendMoney">取消</a>
                <a href="javascript:;" @click="goRech" v-if="noSendMoneyMsg=='余额不足，前去充值'" >去充值</a>
                <router-link to="/member" href="javascript:;"  v-else>去兑换</router-link>
            </div>

        </div>

        <!--         确认送礼弹窗-->
        <div class="git-list-box-bg z" v-if="sendGiftPop" @click="sendGiftPop=!sendGiftPop"></div>
        <div class="dialog-pop send-gift-pop" v-if="sendGiftPop">
            <p v-if="giftFormData.gift_num>currGift.free_num">
                是否花费{{ currGift.amount*giftFormData.gift_num -currGift.free_num}}钻石送主播“{{ giftData[currGitType][giftIndex].name }}”!'
            </p>
            <p v-if="giftFormData.gift_num<=currGift.free_num">
                是否免费送主播{{giftFormData.gift_num}}个“{{ giftData[currGitType][giftIndex].name }}”!'
            </p>
            <div class="dialog_ft">
                <!--<a href="javascript:;" @click="sendGiftPop=!sendGiftPop">取消</a>-->
                <a href="javascript:;" @click="sendGift" >Xác nhận</a>
            </div>

            <div class="dialog_no_longer" v-if="isShowImg!='true'">
                <img src="../../assets/images/chat/wxzyh@3x.png" alt=""  @click="isShowImg=2" v-if="isShowImg==1">
                <img src="../../assets/images/chat/wxzyh@2x.png" alt=""  @click="isShowImg=1" v-if="isShowImg==2">
                <span>下次不再提示</span>
            </div>

        </div>



        <!--   动画-->
        <!--        <div class="svgContainer" ref="svgContainer"></div>-->
        <div>
            <!--            <lottie :options="defaultOptions"  :height="400" :width="400" v-on:animCreated="handleAnimation" />-->
        </div>

        <div id="demoCanvas" ref="demoCanvas" :class="isSpecia?'active':''" ></div>
        <!--        <div id="previewDemo" style="background-color: black; width: 0px; height: 0px"></div>-->



        <!--键盘-->
        <div class="key-box-bg chat-key-bg" @click="isKey=false" v-if="isKey"></div>
        <div class="key-box chat-key" v-if="isKey">
            <div class="input-pwd">
                <div class="title">{{tipText}} <i class="remove-icon" @click="isKey=false"></i></div>
                <div class="pwd-box" v-show="isComfirm==1">
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                </div>
                <div class="pwd-box pwd-re-box"  v-show="isComfirm==2">
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                </div>
                <div class="pwd-box pwd-red-box"  v-show="isComfirm==3">
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                    <span><i></i></span>
                </div>
                <p class="error-tip" v-if="showTip">两次密码输入不一致</p>
                <p class="error-tip" v-if="showTip2">密码输入错误，您还有{{ changeTime }}次机会</p>
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
                    <span class="delete-icon" @click="deleteNum"><img src="../../assets/images/delete.png" alt=""></span>
                </div>
            </div>

        </div>

        <!--支付密码设置成功-->
        <div class="success-box-container chat-pwd-success" v-if="isSuccess">
            <div class="success-box">
                <img src="../../assets/images/member/tick-icon.png" alt="">
                <span>支付密码设置成功！</span>
            </div>
        </div>

        <div class="fish-game" v-if="isFish">
            <div class="cancel-box" @click="isFish=false"></div>
            <iframe src="http://10.10.40.200:8080/web-mobile/" id="myiframe" scrolling="no" frameborder="0"></iframe>
        </div>


        <!--更多操作 清屏 收起聊天-->
        <!-- <div class="more-cz" id="moreBox" @click="showMore" v-show="currTab==1&&isShowSus==true&&!guessSw">
            <div class="more-icon"><img src="../../assets/images/chat/more.png" alt=""></div>
            <ul class="more-list" v-if="showMoreControl">
                <li class="hide-video" :class="isHideVideo?'open-icon':''" @click="hideVideo"><i></i>{{isHideVideo?'展开视频':'收起视频'}}</li>
                <li class="clear-chat" @click="clearChatContent"><i class="gl-clear"></i>清除聊天</li>
                <li class="clear-chat" @click="clearChatContent(2)" v-if="userType==2"><i ></i>管理清屏</li>
                <li class="clear-chat" @click="specialEffects()"><i class="pb-icon"></i>{{pingbi}}</li>
            </ul>
        </div> -->
       <!-- <x-dialog v-model="dialogShow" hide-on-blur >
            <div class="prohibit-box">
				<p class="title">禁言“弗兰克”</p>
				<div class="item-box">
					<div class="timeItem"><i></i><span>禁言30分钟</span></div>
					<div class="timeItem"><i></i> <span>永久禁言</span></div>
				</div>
				<div class="prohibit-btn">
					<span>立即禁言</span>
				</div>
			</div>
        </x-dialog> -->
    <!-- <confirm v-model="true"
    title="Confirm deleting the item"
     >
    <p style="text-align:center;">Are you sure</p>
    </confirm> -->

        <!--禁言弹窗-->
        <div class="no-speak" v-if="dialogShow">
            <div class="no-speak-content">
                <i class="remove-btn" @click="dialogShow=false"></i>
                <h3>禁言 <i>"{{noSpeakInfo.name}}"</i></h3>
                <div class="no-speak-time">
                    <div class="item" @click="noSpeak=30">
						<i :class="{active:noSpeak==30}"></i>
                        <span>禁言30分钟</span>
                    </div>
                    <div class="item" @click="noSpeak=0">
						<i :class="{active:noSpeak==0}"></i>
                        <span>永久禁言</span>
                    </div>
                </div>
                <div class="no-speak-btn" @click="setBanned">立即禁言</div>
            </div>
        </div>

         <!-- <div class="teach" @click="know" v-if="isteachChat">
            <img class="img1" src="../../assets/images/teach/gc.png" alt="">
            <img class="img2" src="../../assets/images/teach/jt.png" alt="">
        </div> -->
        <!--活动-->
        <!-- <div class="active-icon" @click="$router.push('/activity')" v-show="currTab==1 && !guessSw" >
            <img  src="../../assets/images/activity/shu-min.png" />
        </div> -->

        <!-- g购彩入口 -->
<!--        <div class="buyCai" @click="goLottery" v-show="currTab==1 && !guessSw" >-->
<!--            <img  src="../../assets/images/chat/fh_xz.png" />-->
<!--        </div>-->
        <!-- <div class="buyCai" @click="goLottery" v-show="currTab==1 && !guessSw" >
            <img  src="../../assets/images/chat/l_game.png" />
        </div> -->
        <!-- 大转盘入口 -->
        <!-- <div class="active-icon dzp-icon" @click="showDzp()" v-show="currTab==1 && !guessSw" >
            <img  src="../../assets/images/chat/dzp-icon.png" />
        </div> -->
        <!-- 棋牌游戏入口 -->
<!--        <div class="qiPai" @click="goQiPai" v-show="currTab==1 && !guessSw">-->
<!--            <img  src="../../assets/images/chat/qp_xz.png" />-->
<!--        </div>-->
        <!-- <div class="goucai-btn" @click="goLottery">
            
        </div> -->
        <!-- 竞猜 -->
        <div class="guessing" v-if="guessSw == true">
            <i class="shouqi" @click="guessSw = false" :style="'top:'+top1+'rem'"></i>
            <tzmain
                    :isHideVideo="isHideVideo"
                    :lotteryId="lottery_id"
                    :allLottery="allLottery"
                    :followOrders="followOrders"
                    :isFollowOrder="isFollowOrder"
                    v-on:func="shareOrder"
            ></tzmain>
<!--            <tzRecord/>-->
        </div>
        <x-dialog :show="novipboxShow" :dialog-style="{'width':'84%'}">
           <div class="novip-box">
            <div class="close-btn" @click="novipboxShow=false">
                <img src="../../assets/images/chat/close_icon2.png" alt="">
            </div>
            <div style="margin-bottom: 0.5rem;"><img src="../../assets/images/chat/ts_icon.png" style="width:1.66rem;height:1.66rem;" /> </div>
            <h2>骑士以上用户才能领取红包哦！</h2>
            <p>首充且兑换任意金额钻石即可免费升级VIP哦！</p>
            <div class="novip-btn">
                <span @click="$router.push('/withdrawalTopUp/2')">去充值</span>
                <span @click="$router.push('/member')">去兑换</span>
            </div>
           </div>
        </x-dialog>

        <!-- 大转盘 -->
        <!-- <DZP v-show="isDzp" v-on:closeFunc="closeDzp"/> -->

    </div>
</template>

<script>
    import flvPlayer from  '../../components/flv-player'
    import hlsPlayer from  '../../components/hls-player'
    import myScroll from '../../components/myScroll.vue' //纵向滚动
    import myScrollX from '../../components/myScrollX.vue' //横向滚动
    import preview from '../../components/chatPreview.vue'
    import vme from '../../components/vue-mobile-emoji/vme.vue'
    import TrendDt from "../../components/trendsDt.vue";
    import tzRecord from "../../components/tzRecord";
    import SVGA from 'svgaplayerweb';
    import DZP from './dzp'

    import  { Toast,Group,XInput,XButton,Confirm, XDialog} from  'vux'
    import { mapState, mapMutations } from "vuex";
    import tzmain from "../guessing/tzMain.vue"; //投注
     import { getToken } from '../../store/cookie';
    var timeOutEvent=0;
    export default {
        name: 'chat',
        data: function () {
            return {
                inftTab:0,
                isDzp:false,
                lottery_id:8,
                isHide:false,
                isLogin:true,
                videoSrc: null,
                isToast: true,
                liveData: {race_config:{}},//房间信息
                chatData: null,//最新20条聊天记录
                playerOptions: '',
                config: {
                    type: {},
                    required: false
                },
                mediaDataSource: {},
                chatMsgForm: {
                    user_id:this.$store.state.userinfo.user_id,
                    dynamic_id: 11,
                    comment_text: ''
                },
                showMsg: false,
                chatReturnMsg: null,
                // path: "wss://www.cpbadmin.com/wss",//线上
                // path: "wss://www.lgadmin561.com/wss",//线上7.27日换
                // path: "wss://www.lgadmin561.com/wss",//davis新测试线路,不用管
                //  path: "wss://www.lgadmin561.com/wss",//线上7.27日换
                //path: "ws://47.244.212.147/wss",//测试10.1
                // path: this.versionWss,
                path: '/wss',
                socket: "",
                show4: false,
                giftData: null,
                giftFormData: {
                    anchor_id: null,
                    user_id:this.$store.state.userinfo.user_id,
                    gift_id: null,
                    gift_num: 1,
                    version:"v2"
                },
                text_obj: {
                    type: 'publish',
                    room_id: 100010,
                    user_id: this.$store.state.userinfo.user_id,
                    userName: this.$store.state.username,
                    text: 222
                },
                showEmj: false,
                ifView: 3,
                anchorData: null,
                isFollow: null,
                isiOS: Boolean,
                rewardData: null,//主播打赏榜,
                rewardItem: null,
                isReward: 'day',
                isChrome: Boolean,
                playList: {},
                liveRewardData: null,
                isShowKey: false,
                currGitType: null, //bb 表白  cp 彩票  pt 普通 礼物类型
                currGift: {},
                redFormData: {
                    anchor_id: null,
                    user_id: this.$store.state.userinfo.user_id,
                    amount: null,
                    num: null,
                    text: '恭喜发财',
                    password: null,
                    version:"v2"

                },
                pushDanmu: null,
                showR: false,//发红包
                showbigRed: false,//拆红包
                showsmallRed: false,//显示右下角小红包
                showMoney: false,//显示拆到红包的数额
                noMoney: false,//红包已经抢完了,
                redId: null,// 红包id
                redInfo: null,
                redPaper: [],
                hp: false,
                msgScrollY:null,
                isPointer:null,
                setPay:false,// 设置支付密码弹窗
                payForm:{
                    new_password:null,
                    new_password_repeat:null
                },
                balance:null,//钱包余额
                noSendMoney:false,//发红包余额不足弹窗
                noSendMoneyMsg:'余额不足，前去充值',//发红包余额不足弹窗消息
                sendGiftPop:false,//确认送礼弹窗
                isShowImg:1,
                isSpecia:false,
                isComfirm:1, //显示确认密码还是新密码
                payRePwd:'',//确认密码
                payPwd:'',//新密码
                showTip:false,//是否显示验证信息
                showTip2:false,//是否显示验证信息 支付密码是否正确
                changeTime:'',//剩余次数
                isKey:false,//是否显示键盘
                isSuccess:false,//支付密码设置成功提示
                tipText:'请设置支付密码',
                lastRoute:'',//上一个路由
                dbData:null,
                isNow:true,//现在是输入支付密码  false  设置支付密码
                redPwd:'',//红包密码
                isBind:false,//
                giftTab:null,//礼物列表
                parser:null,
                player:null,//
                giftTime:[],
                genGitData:[],
                giftIndex:null,//一般礼物索引
                childQ:false,
                timer_2:null,
                isFirst:Boolean,
                chatTop:46,
                isFish:false,
                currTab:5,
                hostMsg:{},//主播信息
                hostDt:[],//主播动态
                showMoreControl:false,//显示更多操作
                isHideVideo:false,//收起视频
                vipData:[],//vip进入房间
                showDiamondNum:false,
                diamondNum:[
                  {num:1314,title:'一生一世'},
                  {num:520,title:'我爱你'},
                  {num:88,title:'好运连连'},
                  {num:58,title:'守护你'},
                  {num:10,title:'十全十美'},
                  {num:1,title:'一心一意'}
                ],
                currGitNum:1314,
				dialogShow:false,
				noSpeak:30,
                noSpeakInfo:{},
                clshow:false,
                clList:[],
                clTimer:null,
                giftTabsList:[],
                ftBottom:0,
                boxShowTime:6,
                GitDTimeout:null,
                isShowSus:false,
                seconds:10,
                minutes:0,
                selectnumShow:true,
                isteachChat:"",
                buyCaiShow:true,
                originHeight:window.innerHeight,
                lotterId:"",
                vipIsShow:false,
                vipName:'',
                secondsT:3,
                munLj:1,
                LivePreview: [], //直播预告
                loading: true,
                guessSw:false,
                dhList:["冠军","亚军","第三名","第四名","第五名","第六名","第七名","第八名","第九名","第十名"],//单号1-10
                allLottery:[],
                followOrders:{},//跟投信息
                isFollowOrder:false,//是否跟投,
                openIssue:[],
                pingbi: "隐藏特效",
                isvip:true,
                inData:[],
                history_id:'',
                top1:6.45,
                novipboxShow:false,
                isHotPut:this.$store.state.userinfo.put_hot,
                homeTeamInfo:"",
                awayTeamInfo:''
           }
        },
        beforeDestroy() {
        },
        created() {
            this.isteachChat = localStorage.getItem("isteachChat") == "no" ? false : true;
            this.init();
            this.isShowImg = localStorage.getItem('ifLonger') || 1;

            this.SPECIAL(false);
            this.pingbi = "隐藏特效";
            // console.log(this.vip)
            if(this.$store.state.userinfo.noble == '' || this.$store.state.userinfo.noble  > '0' || !this.$store.state.userinfo.noble ){
                this.isvip = true;
            }else{
                this.isvip = false;
            }

        },
        mounted() {
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            }, {passive: false});
           // window.addEventListener("resize", this.renderResize, false);
         // this.removeTarget("moreBox");
        //   document.getElementById('chatBox').addEventListener('click',function(e){
        //      let num = e.composedPath().findIndex(i=>i.className=='vme');
        //      let num2 = e.composedPath().findIndex(i=>i.className!=undefined&&i.className.includes('chat-footer1'));
        //      if(num==-1&&num2==-1){
        //          this.isShowKey = false;
        //          this.showEmj=false;
        //      }
        //   }.bind(this))
        //  if(this.$store.state.userinfo.noble>0){
        //             this.vipIsShow = true
        //             if(this.$store.state.userinfo.noble==1){
        //                 this.vipName='qishi'
        //                 this.SVGA('vip1.svga',48)
        //             }
        //             else if(this.$store.state.userinfo.noble==2){
        //                 this.vipName='nanjue'
        //                 this.SVGA('vip2.svga',40)
        //             }
        //             else if(this.$store.state.userinfo.noble==3){
        //                 this.vipName='zijue'
        //                 this.SVGA('vip3.svga',26)
        //             }
        //             else if(this.$store.state.userinfo.noble==4){
        //                 this.vipName='bojue'
        //                 this.SVGA('vip4.svga',51)
        //             }
        //             else if(this.$store.state.userinfo.noble==5){
        //                 this.vipName='houjue'
        //                 this.SVGA('vip5.svga',59)
        //             }
        //             else if(this.$store.state.userinfo.noble==6){
        //                 this.vipName='gongjue'
        //                 this.SVGA('vip6.svga',59)
        //             }
        //             else if(this.$store.state.userinfo.noble==7){
        //                 this.vipName='guowang'
        //                 this.SVGA('vip7.svga',47)
        //             }
        //         }
        },
        computed: {
            ...mapState(["safePwd","vip","userType","suspension","userInfo","special","webInitData","czListData"])
        },
        beforeRouteEnter(to, from, next) {
            next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
//                console.log(to)
//                console.log(from)
                vm.lastRoute = from.name;
            })
        },
        methods: {
            ...mapMutations(["SETSAFEPWD","SETUSERVIP","SPECIAL","SETUSERTOKEN","SETCZNDATA"]),
            //获取球队信息
            async getHomeTeamInfo(type,id,teamName){
                let res = await this.$http.get(this.versionLive+'get_teaminfo',{params:{type:type,teamid:id}})
                this.homeTeamInfo = res.data.data.introduction?res.data.data.introduction:'暂无信息';
            },
            async getAwayTeamInfo(type,id,teamName){
                let res = await this.$http.get(this.versionLive+'get_teaminfo',{params:{type:type,teamid:id}})
                this.awayTeamInfo = res.data.data.introduction?res.data.data.introduction:'暂无信息';
            },
            showDzp(){
                if(!this.$store.state.userinfo.user_id<0){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }
                this.isDzp=true;
            },
           closeDzp(d){
               this.isDzp = d;
           },
            //国王推荐主播 只能国王有这个权利
            async tjfunc(id){
                this.$vux.loading.show({ text: "推荐中..." });
                let res = await this.$http.get(this.versionLive2+'live/anchor_hot/',{
                    params:{anchor_id:id}
                });
                this.$vux.loading.hide();
                if(res&&res.data.code==1){
                    //提示并置灰
                    this.isHotPut = 0;
                    this.$vux.confirm.show({
                        title:'',
                        content:'谢谢尊贵的国王推荐我上热门哟，么么哒！',
                        showCancelButton:false,
                        onConfirm : () => {
                        }
                    });
                }else{
                    this.$vux.confirm.show({
                        title:'',
                        content:res.data.msg,
                        showCancelButton:false,
                        onConfirm : () => {
                        }
                    });
                }
            },
            //已经推荐过了
            tjfuncOver(){
                this.$vux.confirm.show({
                    title:'',
                    content:'尊贵的国王推荐上热门每日只允许使用一次哟~',
                    showCancelButton:false,
                    onConfirm : () => {
                    }
                  });
            },
            //获取个人信息  改变推荐上热门状态
            //记录历史播放
            async playHistory(){
                if(!this.$store.state.codeToken) return ;
                if(this.$store.state.userinfo.user_id<0) return ;  
                // console.log((this.$store.state.userinfo.user_id);
              let res = await this.$http.get(this.versionLive2+'/live/live_play_history/',{
                  params:{
                      anchor_id:this.liveData.anchor_id,
                      flag:'start',
                      history_id:''
                  }
              });
              if(res && res.data.code==1){
                  this.history_id=res.data.data.history_id
              }
            },
            //showUserin
            showUserIn(n){
                // console.log(3333);
                let dom1 = document.querySelector('.showuser-In');
                for(let i=0,len=n.length;i<len;i++){
                    if(n[i].type=='subscribe'&&n[i].user_id){
                        let str ='';
                        let str1='';
                        let str2='';
                        let str3='';
                        let str4='';
                        if(n[i].vip<1&&!n[i].isAnchor){
                            str1='<span class="one-item item-in no-vip">'
                        }else{
                            str1='<span class="one-item item-in">'
                        }
                        if(n[i].vip>0&&n[i].isAnchor!=1&&n[i].userType!=2){
                            // str2='<i class="user-vip user-vip'+n[i].vip+'" style="top:-.05rem;background: url("../../assets/images/chat/vip_'+n[i].vip+'.png") no-repeat;background-size:contain"></i>'
                            str2='<i class="user-vip user-vip1" style="top:-.05rem;"></i>'
                        }else{
                            str2=''
                        }
                        if(n[i].isAnchor==1){
                            str3 = '<i class="user-vip host-vip" style="top:-.05rem"></i>'
                        }else{
                            str3 = '';
                        }
                        if(n[i].userType==2){
                            str4 = '<i class="user-vip admin-vip fl"></i>';
                        }else{
                            str4 = '';
                        }
                        // let str5 ='<span style="float:none;">欢迎 <i>'+ n[i].userName +'</i>进入直播间</span>'
                        let str5 ='<span style="float:none;"> Chào mừng đến với phòng phát sóng trực tiếp </span>'
                       
                        let str6 = '<span style="vertical-align: baseline"></span>'
                        str=str1+str2+str3+str4+str5+str6+'</span>';
                        // console.log(str);
                        dom1.innerHTML=str;
                    }

                }
            },
                //屏蔽特效
            specialEffects() {
            if (this.special == false) {
                this.SPECIAL(true);
                this.pingbi = "恢复特效";
            } else if (this.special == true) {
                this.SPECIAL(false);
                this.pingbi = "隐藏特效";
            }
            },
            followOrder(o,v){
                // console.log(v)
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                    });
                }else{
                    if(v){
                         this.guessSw = true;
                    this.isFollowOrder = true;
                    this.followOrders = o || {};
                    this.lottery_id = o.play_bet_lottery_id;
                    }

                }
            },
            showAll(e){
                e.currentTarget.parentNode.parentNode.children[2].style.height='100%';
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentNode.children[1].style.display='block';
            },
            hideAll(e){
                e.currentTarget.parentNode.parentNode.children[2].style.height='1.6rem';
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentNode.children[0].style.display = 'block'
            },
          //开始按
           know() {
                this.isteachChat = false;
                localStorage.setItem("isteachChat", "no");
            },
          gtouchstart(item){
            timeOutEvent = setTimeout(()=>{
              //判断是否登录
              if(!this.$store.state.codeToken) return console.log('未登录');
            //   console.log(item.userName)
              //触发输入框 并且显示@某个人
              this.showKeyBoard();
              this.chatMsgForm.comment_text = '@'+item.userName;


            },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
            return false;
          },
          //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
          gtouchend:function gtouchend(item){
            clearTimeout(timeOutEvent);//清除定时器
            if(timeOutEvent!=0){
              //这里写要执行的内容（尤如onclick事件）

            }
            return false;
          },
          //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
          gtouchmove:function gtouchmove(){
            clearTimeout(timeOutEvent);//清除定时器
            timeOutEvent = 0;

          },

          //真正长按后应该执行的内容
          longPress:function longPress(item){
            timeOutEvent = 0;
            //执行长按要执行的内容，如弹出菜单
            $api.css($api.dom('.Popup'), 'display:block');
          },
          goInfo(v) {
            if (v.userType == '0') {
                this.$router.push({ name: "userInfo", query: { id:v.user_id, avatar:v.avatar } }); //进入用户个人页
            } else if (v.userType == '1') {
                this.$router.push("/anchorProfile/" + v.user_id); //进入主播个人页
            } 
            },



          //选择礼物数量
          selectNum(v){
            this.showDiamondNum = false;
            this.currGitNum = v.num;
            this.giftFormData.gift_num = v.num;
            this.munLj = 0;     
          },
          //清屏
            clearChatContent(i){
                if(i==2){
                   this.$http.post(this.versionLive2+'live/clear_chat/',{
                    user_id:this.$store.state.userinfo.user_id,
                    anchor_id:this.liveData.anchor_id
                   }).then(res=>{
                       if(res.data.code==1){
                            this.$vux.toast.text(res.data.msg, 'middle');
                            this.chatData = [];
                       }else{
                           this.$vux.toast.text(res.data.msg, 'middle')
                       }
                   })
                }else{
                 this.chatData = [];
                }
            },
          //收起直播
            hideVideo(){
                this.isHideVideo = !this.isHideVideo;
                this.scrollBottom();
            },
            showMore(){
              this.showMoreControl = !this.showMoreControl;
            },
            removeTarget(removeId){
              // 获取节点
              var block = document.getElementById(removeId);
              var oW,oH;
              // 绑定touchstart事件
              block.addEventListener("touchstart", (e)=> {
                var touches = e.touches[0];
                oW = touches.clientX - block.offsetLeft;
                oH = touches.clientY - block.offsetTop;
                if(!this.showMoreControl){
//                  this.showMoreControl = true
                  var oLeft = touches.clientX - oW;
                  var oTop = touches.clientY - oH;
                  if(oLeft==0 || oLeft==document.documentElement.clientWidth){
                    oLeft=65
                  }
                  if(oTop==0){
                    oTop = 0
                  }else if(oTop>=document.documentElement.clientHeight-60){
                    oTop = document.documentElement.clientHeight-150
                  }
                  block.style.left = oLeft + "px";
                  block.style.top = oTop + "px";
                }
                //阻止页面的滑动默认事件
                document.addEventListener("touchmove",defaultEvent,false);
              },false);

              block.addEventListener("touchmove", (e)=> {
                var touches = e.touches[0];
                var oLeft = touches.clientX - oW;
                var oTop = touches.clientY - oH;
                if(this.showMoreControl){
                  if(oLeft < 65){
                    oLeft=65
                  }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth){
                    oLeft = (document.documentElement.clientWidth - block.offsetWidth);
                  }
                  if(oTop<=0){
                    oTop=0;
                  }else if(oTop>document.documentElement.clientHeight-150){
                    oTop=document.documentElement.clientHeight-150;
                  }else if(oTop > document.documentElement.clientHeight - block.offsetHeight){
                    oTop = (document.documentElement.clientHeight - block.offsetHeight);
                  }
                }else{
                  if(oLeft < 0) {
                    oLeft = 0;
                  }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
                    oLeft = (document.documentElement.clientWidth - block.offsetWidth);
                  }

                  if(oTop<0){
                    oTop=0;
                  }else if(oTop > document.documentElement.clientHeight - block.offsetHeight){
                    oTop = (document.documentElement.clientHeight - block.offsetHeight);
                  }
                }

//                if(oTop<0){
//                  oTop=0;
//                }else if(oTop > document.documentElement.clientHeight - block.offsetHeight){
//                  oTop = (document.documentElement.clientHeight - block.offsetHeight);
//                }
                block.style.left = oLeft + "px";
                block.style.top = oTop + "px";

              },false);

              block.addEventListener("touchend",function() {
                document.removeEventListener("touchmove",defaultEvent,false);
              },false);
              function defaultEvent(e) {
                e.preventDefault();
              }

            },
          //主播动态
          async getHostDt(){
                let res = await this.$http.get(this.versionLive2+'live/get_anchor_dynamic/',{
                    params:{
                      anchor_id:this.hostMsg.anchor_id,
                      user_id:this.$store.state.userinfo.user_id,
                      page:1,
                      limit:10,
                      lasttime:''
                    }
              });
              if(res && res.data.code==1){
                this.hostDt = res.data.data || [];
              }
          },
          //主播信息
          async getHostMess(){
            //   
              let res = await this.$http.get(this.versionLive2+'live/get_anchor_info/',{
                params:{
                  anchor_id: this.$route.params.id,
                  user_id: this.$store.state.userinfo.user_id
                }
              });
              // console.log(res)
              if(res && res.data.code==1){
                this.hostMsg = res.data.data;
                if(this.$store.state.userinfo.user_id<0) return
                this.getHostDt();
                // this.clTimer=setInterval(() => {
                //       this.getClong();      
                //     }, 5000);
              }
            },
            getClong(){
                this.$http.get("/forum/lottery/changlong", {
					params: {
						lottery_id:this.hostMsg.lottery_id,
					}
				}).then(res=>{
                    if(res&&res.data.code==1){
                        if(JSON.stringify(this.clList[0])!=JSON.stringify(res.data.data[0])){
                        this.clList=res.data.data;
                        this.clshow=true;
                        }
                    }
                })
            },
          goHost(){
            this.$router.push("/anchorProfile/" + this.hostMsg.anchor_id);
          },
                  download(){
              if(this.$store.state.codeToken){
                  this.$vux.loading.show({text: 'Đang chạy...'});
                  // let res = await this.$http.get(this.versionLive2+"user/VIP_now/", {
                  //     params: {
                  //         user_id: this.userinfo.user_id
                  //     }
                  // });
                  this.$vux.loading.hide();
                  // if(res.data.data.vip) this.vipDj = res.data.data.vip
                  if(this.isPhoneAgent()=='ios'){
                      //判断是否是vip
                      if(this.$store.state.userinfo.vip>0||this.$store.state.userinfo.noble>0){
                          if(this.$store.state.userinfo.referrer_id==0){
                              window.open(getToken('loadUriIosCjqVip'))
                          }else{
                              window.open(getToken('loadUriIosDl'))
                          }
                      }else{
                          //壳子打包的
                          if(this.$store.state.userinfo.referrer_id==0){
                              window.open(getToken('loadUriH5'))
                          }else{
                              window.open(getToken('loadUriH5Dl'))
                          }
                          // window.open(localStorage.getItem('loadUriH5'))
                      }
                  }else if(this.isPhoneAgent()=='android'){
                      if(this.$store.state.userinfo.referrer_id==0){
                          window.open(getToken('loadUriAndroidGf'));
                      }else{
                          window.open(getToken('loadUriAndroidDl'));
                      }
                      // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');

                  }
              }else{
                  if(this.isPhoneAgent()=='ios'){
                      window.open(getToken('loadUriH5'))
                  }else if(this.isPhoneAgent()=='android'){
                      // window.open('https://www.lgapp8.com/assets/lgzb/lgzb.apk');
                      window.open(getToken('loadUriAndroidGf'));
                  }
              }

          },
          isPhoneAgent(){
              let u = navigator.userAgent, app = navigator.appVersion;
              let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
              let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              if (isAndroid) {
                  //这个是安卓操作系统
                  return 'android'
              }
              if (isIOS) {
                  //这个是ios操作系统
                  return 'ios'
              }
          },
          downloadApp(){
            if(window.webkit){
              window.webkit.messageHandlers.needNav.postMessage({
                url:window.location.protocol+"//"+window.location.host+'//download?isOpen=123',
                name:'App下载',
                backUrl:window.location.href
              });
            }else{
              this.$router.push('/download');
            }
          },
          renderResize() {
                // 判断横竖屏
                let width = document.documentElement.clientWidth;
                let height = document.documentElement.clientHeight;
                if(!navigator.userAgent.includes('iPhone')){
                    if(this.originHeight>height){
                        this.buyCaiShow=false
                    }else{
                        this.buyCaiShow=true
                    }
                }
                if (width > height) {
                    this.buyCaiShow=false
                }else {
                    this.buyCaiShow=true
                    this.scrollBottom(true);
                    this.ScrollX(true);
                }
            },
            banned(type,name,id){
                if(this.$store.state.userinfo.user_id==undefined){
                    return;
                }
                // console.log(this.userType);
                if(type!=0||this.userType!=2 || id==this.$store.state.userinfo.user_id)return;
				this.dialogShow=true;
				this.noSpeakInfo={type,name,id}
                // this.$vux.confirm.show({
                //     title:'禁言',
                //     content:'将对 '+name+' 禁言30分钟',
                //     confirmText:"Xác nhận",
                //     onCancel : () => {
                //     },
                //     onConfirm : () => {
                //         this.setBanned(id);
                //     }
                // });


            },
            async setBanned(){
                this.$vux.loading.show({text:'禁言中...'});
                let res = await this.$http.post(this.versionLive2+'live/ban_words/',{
                    opertate_user:this.$store.state.userinfo.user_id,
                    ban_user:this.noSpeakInfo.id,
                    // room_id:'all',
                    ban_time:this.noSpeak
                });
				// console.log(res);
                if(res && res.data.code==1){
					this.dialogShow=false;
                    this.$vux.loading.hide();
                    this.$vux.confirm.hide();
                    this.$vux.toast.text(res.data.msg, 'middle')

                }else{
                    this.$vux.loading.hide();
                    this.$vux.toast.text(res.data.msg, 'middle')
                }
            },

            goBack(){
              if(this.lastRoute=="withdrawalTopUp"){
                    this.$router.push('/');
                }else{
                    this.$router.go(-1);
                }
            },
            //是否首充
            async  rechargeIsFirst(){
            if(!this.$store.state.codeToken||this.$store.state.userinfo.user_id<0) return ;
              let res = await this.$http.post(this.versionLive2+'Recharge/IsFirst',{user_id:this.$store.state.userinfo.user_id});
              if(res && res.data.code==1){
                  if(res.data.data.isfirst==0){
                      this.isFirst = true;
                  }else{
                      this.isFirst = false;
                  }
              }else{
                  this.isFirst = false;
              }
            },
             toZbj(item) {
            //进入用户   主播个人页
            if (item.livestatus == 1) {
                this.$router.push("/chat/" + item.aid);
                window.location.reload();
            } else {
                this.$router.push("/anchorProfile/" + item.aid);
            }
            },
            //检查旧密码
            async checkOldPwd(){
                if(this.isBind) return
                this.$vux.loading.show({text:'Đang xác minh...'});
                //节流阀
                this.isBind = true;
                let res = await this.$http.post('/api2/index/verify-fund-password',{password:this.redPwd});
                this.isBind = false;
                this.$vux.loading.hide();
                if(res && res.data.code==1){
                    //发送请求
                    this.redFormData.password = this.redPwd;
                    this.isKey = false;
                    this.sendRedPacket();
                }else if(res && res.data.code==1002){
                    //提示剩下的机会
                    this.changeTime = res.data.data.remain_times;
                    if(this.changeTime==0){
                        this.showTip2 = false;
                        this.SETSAFEPWD(10);
                        //冻结账户判断
                        this.$vux.confirm.show({
                            title:'Tiền trong tài khoản của quý khách đã khóa ',
                            content:'Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ',
                            confirmText:"liên hệ với dịch vụ khách hàng",
                            onCancel : () => {
                                this.isKey = false;
                                this.redPwd = "";
                                this.clearActive();
                            },
                            onConfirm : () => {
                              this.goOnline();
//                                this.$router.push({name:'Notescontact'});
                            }
                        });
                    }else{
                        this.showTip2 = true;
                        this.redPwd = "";
                        //清空
                        this.clearActive();
                    }

                }else if(res &&res.data.code==1012){
                    this.SETSAFEPWD(10);
                    //冻结账户判断
                    this.$vux.confirm.show({
                        title:'Tiền trong tài khoản của quý khách đã khóa ',
                        content:'Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ',
                        confirmText:"liên hệ với dịch vụ khách hàng",
                        onCancel : () => {
                            this.redPwd = "";
                            this.showTip2 = false;
                            this.clearActive();
                            this.isKey = false;
                        },
                        onConfirm : () => {
//                            this.$router.push({name:'Notescontact'});
                            this.goOnline();
                        }
                    });
                }else if(res){
                    this.$vux.toast.text(res.data.msg, 'middle')
                }
            },
            alertLL(url,title){
            android.show(url,title)
          },
            goOnline(){
            // if(window.webkit){
            //   window.webkit.messageHandlers.needNav.postMessage({
            //     url:JSON.parse(this.webInitData).customer,
            //     name: "在线客服",
            //     backUrl: window.location.href
            //   });
            //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
            // }else if(window.android){
            //   this.alertLL(JSON.parse(this.webInitData).customer,'在线客服');
            // }else{
            //   window.location.href = JSON.parse(this.webInitData).customer
            // }
            window.location.href = JSON.parse(this.webInitData).customer

          },
          goLottery(){
            //   if(window.webkit){
            //   window.webkit.messageHandlers.needNav.postMessage({
            //     url:localStorage.getItem('lotteryUrl'),
            //     name: "购彩",
            //     backUrl: window.location.href
            //   });
            //   //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
            // }else if(window.android){
            //   this.alertLL(localStorage.getItem('lotteryUrl'),'购彩');
            // }else{
            //   window.location.href = localStorage.getItem('lotteryUrl')
            // }
              this.$router.push('/gameCenter');
          },
           goQiPai(){
               if(localStorage.getItem('chessArr')){
                    window.location.href = localStorage.getItem('chessArr');
               }else{
                    //  this.$vux.toast.text('网络超时,请刷新后再试', 'middle'); 
                    this.$vux.confirm.show({
                    content:'网络超时,请刷新后再试',
                    confirmText:"Xác nhận",
                    onCancel : () => {
                        
                    },
                    onConfirm : () => {
                        this.getOutLine();
                    }
                });
               }

           },
           async getOutLine(){
            let res = await this.$http.get(this.versionLive2+'user/jump_to/');
            if(res && res.data.code==1){
                localStorage.setItem('chessArr',res.data.data.chessArr[0])
            }},
            //检测是否设置过支付密码
            async checkPay(){
                if(this.safePwd==1 || this.safePwd==2 || this.safePwd== 10){
                    if(this.safePwd==1){
                        //已经设置 可以发
                        this.showR = true;
                        this.isKey = false;
                    }else if(this.safePwd==2){
                        //未设置
                        this.isKey = true;
                        this.showR = false;
                    }else if(this.safePwd== 10){
                        //冻结
                        this.isKey = false;
                        this.showR = false;
                        this.$vux.confirm.show({
                            title:'Tiền trong tài khoản của quý khách đã khóa ',
                            content:'Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ',
                            confirmText:"liên hệ với dịch vụ khách hàng",
                            onCancel : () => {
                            },
                            onConfirm : () => {
//                                this.$router.push({name:'Notescontact'});
                              this.goOnline();
                            }
                        });
                    }
                    return
                }
                this.$vux.loading.show({text:'Đang nhận...'});
                let res = await this.$http.get('/api/user/chkexistsfundpwd');
                this.$vux.loading.hide();
                if(res && res.data.code==1){
                    //已经设置
                    this.SETSAFEPWD(1);
                    //可以直接发红包
                    this.showR = true;
                    this.isKey = false;
                }else if(res && res.data.code==2){
                    //未设置
                    this.SETSAFEPWD(9);
                    this.showR = false;
                    this.isKey = true;
                }else if(res && res.data.code== 10){
                    //冻结
                    this.showR = false;
                    this.isKey = false;
                    this.SETSAFEPWD(10);
                    this.$vux.confirm.show({
                        title:'Tiền trong tài khoản của quý khách đã khóa ',
                        content:'Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ',
                        confirmText:"liên hệ với dịch vụ khách hàng",
                        onCancel : () => {
                        },
                        onConfirm : () => {
//                            this.$router.push({name:'Notescontact'});
                          this.goOnline();
                        }
                    });
                }
            },
            async setPwd(){
                this.$vux.loading.show({text:'设置中...'});
                let res = await this.$http.post("/api2/index/set-fund-password",{new_password:this.payPwd});
                this.$vux.loading.hide();
                if(res && res.data.code==1){
                    //修改成功
                    this.isSuccess = true;
                    this.SETSAFEPWD(1);
                    setTimeout(()=>{
                        this.isSuccess = false;
                        this.isKey = false;
                    },2000)
                }else if(res && res.data.code==1013){
                    //Mật khẩu đăng nhập và mật khẩu thanh toán không được giống nhau
                    this.$vux.confirm.show({
                        title:'',
                        content:'Mật khẩu đăng nhập và mật khẩu thanh toán không được giống nhau',
                        confirmText:"重新设置",
                        onCancel : () => {
                            this.isKey = false;
                            this.payPwd='';
                            this.payRePwd="";
                            this.clearActive();
                        },
                        onConfirm : () => {
                            //重新设置
                            this.clearActive();
                            this.isComfirm = 1;
                            this.tipText = "请设置支付密码";
                            this.payPwd='';
                            this.payRePwd="";
                        }
                    });
                }else if(res){
                    //修改不成功
                    this.$vux.toast.text(res.data.msg, 'middle')
                    setTimeout(()=>{
                        this.isKey = false;
                    },2000)
                }
            },
            clearActive(){
                let allA = document.querySelectorAll('.pwd-box i');
                for(let i=0,len=allA.length;i<len;i++){
                    allA[i].classList.remove('active')
                }
            },
            changeNum(n){
                if(this.isComfirm==1){ //新密码
                    if(this.payPwd.length>6) return;
                    this.payPwd+=n;
                }else if(this.isComfirm==2){ //确认新密码
                    if(this.payRePwd.length>6) return;
                    this.payRePwd+=n;
                }else if(this.isComfirm==3){ //输入支付密码 发红包
                    if(this.redPwd.length>6) return;
                    this.redPwd+=n;
                }
            },
            deleteNum(){
                if(this.isComfirm==1){ //旧密码
                    this.payPwd = this.payPwd.substring(0, this.payPwd.length - 1);
                }else if(this.isComfirm==2){ //新密码
                    this.payRePwd = this.payRePwd.substring(0, this.payRePwd.length - 1);
                }else if(this.isComfirm==3){ //输入支付密码 发红包
                    this.redPwd = this.redPwd.substring(0, this.redPwd.length - 1);
                }
            },
            SVGA (url,num,flag,sort) {
                if (flag == "undefined" || flag == null || flag == "") {
                    flag = this.special; //是否播放
                }
                this.$vux.loading.show({text: '礼物Đang nhận...'});
                if(!sort&&!flag){
                    this.$vux.loading.hide();
                    this.giftTime.push({url: url, num: num});
                }
                if (flag==false||sort=='sort'||this.giftTime.length==1) {
                    let player = new SVGA.Player('#demoCanvas');
                    let parser = new SVGA.Parser('#demoCanvas');
                     parser.load(url, (videoItem) => {
                        this.$vux.loading.hide();
                       player.loops = 1;// 设置循环播放次数是 1
                       player.setVideoItem(videoItem);
                        if (!flag) {
                            this.isSpecia = true;
                           player.stepToFrame(0, true) // 从指定帧开始播放动画
                        } else {
                            this.isSpecia =false;
                           player.stepToFrame(0, 0) // 从指定帧开始播放动画
                        }
                        player.onFrame((i) => {
                            // console.log(i+'----'+num)
                            if(i==1&&num!=302){
                                let dom = document.querySelector('#demoCanvas canvas');
                                dom.style.display = 'block';
                                
                            }
                            if(i==1){
                                this.$vux.loading.hide();
                            }

                            // if(i==1&&num!=302){
                            //     this.$vux.loading.hide();
                            // }
                            // if(i==3&&num==302){
                            //     this.$vux.loading.hide();
                            // }
                            // console.log(i);
                            if (i >= 24 && i < 26) {
                                // console.log('111')
                            } else if (i == num) {
                                
                                this.$vux.loading.hide();
                                this.getLiveRewardList();
                                this.giftTime.splice(0, 1);
                                let dom = document.querySelector('#demoCanvas canvas');
                                    dom.style.display = 'none';

                                player.clear();
                                this.isSpecia = false;
                                if(this.giftTime.length){
                                    this.SVGA(this.giftTime[0].url,this.giftTime[0].num,'','sort')
                                }


                            }
                        })

                    }, function (error) {
                        console.log(error);
                    });
                }
            },

            watchChild(){
                let dom = document.getElementById('chat-content');
                this.isPointer = true;
                // this.isPointer = false;
                // this.$refs.scrollWrapper.Myscroll.maxScrollY = this.msgScrollY;
                // this.$refs.scrollWrapper.Myscroll.scrollTo(0, this.msgScrollY);
                // this.$refs.scrollWrapper.refresh();
            },
            comfirmSendGift() {
                if (!this.currGift.amount)
                    return this.$vux.alert.show({
                        title: '提示',
                        content: '请选择礼物'
                    });
                // this.show4 = false;
                if(localStorage.getItem('ifLonger')){
                  //是否提示  不提示
                    this.sendGift();
                }else{
                  //是否提示  提示
                    this.sendGiftPop = true;
                }
                // this.showGift();
                // this.balance
                // console.log(this.balance)
                //余额不足：
                //余额够
                // this.$vux.confirm.show({
                //     title: '提示',
                //     content: '是否需要花费' + this.currGift.amount + '送主播“' + this.liveData.nickname + '”!',
                //     onCancel: () => {
                //         console.log(this) //当前 vm
                //     },
                //     onConfirm: () => {
                //         this.sendGift();
                //     }
                // });
            },
            checkRed(flag) {
                 if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }
                if(this.$store.state.userinfo.noble <1){
                    this.novipboxShow=true;
                    return
                }
                this.$vux.loading.show();
                if(this.redId){
                    this.showbigRed = true;
                }
                this.$http.get(this.versionLive2+'live/get_room_red', {
                    
                    params: {
                        anchor_id: this.$route.params.id,
                        user_id: this.$store.state.userinfo.user_id
                    }
                }).then((res) => {
                    this.$vux.loading.hide();
                    if (res.data.data.length) {
                        this.redId = res.data.data[res.data.data.length - 1].id;
                        this.redPaper = res.data.data;
                        this.showbigRed = true;
                    } else if (res.data.data == 401) {
                        this.showMsg = true;
                        this.chatReturnMsg = res.data.msg;
                    } else {
                        this.redPaper = [];
                        if(flag==true) return;
                        this.noMoney = true;

                    }
                }).catch((err) => {
                    this.$vux.loading.hide();
                })
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
            findGift(id){
                for(let key in this.giftData){
                    for(let i=0,len=this.giftData[key].length;i<len;i++){
                        if(this.giftData[key][i].id==id){
                            this.giftData[key][i].free_num = this.giftData[key][i].free_num>this.giftFormData.gift_num?this.giftData[key][i].free_num-this.giftFormData.gift_num:0;
                            this.currGift.free_num = this.giftData[key][i].free_num;
                        }
                    }
                }
                // console.log(this.currGift.free_num);
            },
            selectGit(e, v,index) {
                let gitArr=[15,16,17,21,23,27,28,29,30,51,52,53,54,41,42,43,44,45,46];
                if(gitArr.findIndex(i=>i==v.id)!=-1){
                    this.selectnumShow=false;
                    this.giftFormData.gift_num=1
                }else{
                    this.selectnumShow=true;
                }
                let curr = e.currentTarget;
                this.giftIndex =  index;
                this.removeAllactive(this.getSiblings(curr));
                if (curr.className.indexOf('active') > -1) {
                    curr.classList.remove('active');
                    this.currGift = {}
                } else {
                    curr.classList.add('active');
                    this.currGift = {
                        id: v.id,
                        name: v.name,
                        amount: v.amount,
                        free_num:v.free_num,
                    }
                }

                //            @click="sendGift(v.id,v.name,v.amount)"

            },
            //聊天室滚动到底部
            scrollBottom(flag) {
                if(flag){
                    setTimeout(()=>{
                        this.$refs.scrollWrapper.Myscroll.refresh(); //重新计算高度，刷新滚动条
                        // this.$refs.scrollWrapper.Myscroll.disable();  //禁止滚动条
                        // this.$refs.scrollWrapper.Myscroll.enable();//启动滚动条
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0, this.$refs.scrollWrapper.Myscroll.maxScrollY-300);

                    },0);
                    return;
                }

                setTimeout(() => {
                    this.$refs.scrollWrapper.Myscroll.refresh(); //重新计算高度，刷新滚动条
                    this.$refs.scrollWrapper.Myscroll.disable();  //禁止滚动条
                    this.$refs.scrollWrapper.Myscroll.enable();//启动滚动条
                    // alert(this.$refs.scrollWrapper.Myscroll.maxScrollY);
                    if(this.$refs.scrollWrapper.Myscroll.scrollerHeight<=373) return;
                    this.$refs.scrollWrapper.Myscroll.scrollTo(0, this.$refs.scrollWrapper.Myscroll.maxScrollY);
                },20)

            },
            ScrollX(flag) {
                if(flag){
                    setTimeout(()=>{
                        this.$refs.personTab.style.transform = 'translate(0px, 0px) scale(1) translateZ(0px);'
                    },20)
                    return;
                }
                setTimeout(()=>{
                    let width = (this.liveRewardData.length) * 1;
//                    this.$refs.personTab.style.width = width + "rem";
                },20)
            },
            init() {
            
                //获取礼物列表
                // this.getGiftList();
                // 获取直播房间信息
                //获取直播间刷礼物榜单
                // this.getLiveRewardList();
//                获取房间信息
                this.getLiveRoom();

                // this.initSocket();
                // 获取聊天室最新的20条聊天记录
                // this.getInitChat();
                //获取vip 已经废除  登录会返回用户的贵族等级
                // this.getVipNow();
                //是否首充
                // this.rechargeIsFirst();

                //主播信息
                // this.getHostMess();
                // 悬浮按钮显隐
                // console.log("aaa",)
                if(this.suspension==0){
                   this.isShowSus = false;
                } else{
                   this.isShowSus = true;
                }
               
                // 定时5分钟提示一次登录
                // this.timeDjs();
                // this.timeIn();
                // this.loginPrompt();
                // this.getGame();
                
            },

            timeDjs(){
                 setTimeout(()=>{
                            let dom = document.querySelector('.vip-container>div');
                            if(dom){
                                dom.remove();
                            }
                            },3000)

            },
            timeIn(){
                setTimeout(()=>{
                    let dom = document.querySelector('.showuser-In>span');
                    if(dom){
                        dom.remove();
                    }
                },1000)

            },

            loginPrompt(){
                this.isLogin = false;
                setTimeout(()=>{
                    if (!this.$store.state.codeToken) {
                       this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                           
                        }
                            },5*60*1000)
                
            },
           
            //vip等级
            async getVipNow(){
                if(!this.$store.state.codeToken) return ;
              this.$http.get(this.versionLive2+'user/VIP_now/',{
                params:{
                  user_id:this.$store.state.userinfo.user_id
                }
              }).then((res)=>{
                this.SETUSERVIP(res.data.data.vip);
              }).catch((err)=>{

              })

            },
            hideKey() {
                if (window.timer_3) clearTimeout(window.timer_3);
                window.timer_3 = setTimeout(() => {
                    // if(!this.childQ){
                    //     this.isShowKey = false;
                    // }
                    this.childQ = false;
                }, 100)
            },
            changeEmg() {
                setTimeout(() => {
                    this.showEmj = true;
                }, 200);
                // this.$refs.focusTextarea.focus();
                if (window.timer_3) clearTimeout(window.timer_3);
            },
             changeEmg2() {
                this.$refs.focusTextarea.focus();
            },
            showKeyBoard() {
                if(!this.$store.state.codeToken){
                    this.$popup({
                    title: "我是标题",
                    content: "我是内容",
                    btnText: "我是按钮",
                    click: () => {
                        this.isLogin = false;
                    }
                    });
                    return;
                }
                this.isShowKey = true;
                let input = document.getElementById('textInput');
                let button = document.getElementById('textInput1');
                let this_=this
                let appHeight=window.innerHeight
                input.addEventListener('click',function(){
                   if(navigator.userAgent.includes('iPhone OS')){
                       setTimeout(()=>{
                            document.getElementById('app').style.top= appHeight-window.innerHeight+'px'
                       },300)
                    this_.chatTop=window.innerHeight/2.15
                    document.getElementById('app').style.position='fixed'
                    document.getElementById('app').style.width='100%'
                   }
                    input.focus();
                });
                input.addEventListener('blur',function(){
                    document.getElementById('app').style.position='inherit'
                })
                // this.$refs.focusTextarea.focus();
                // console.log(document.querySelector('#textInput'));
                // setTimeout(()=>{
                //     document.querySelector('#textInput').scrollIntoView()
                // },300)
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS == true) {
                    if(u.indexOf('UCBrowser')>-1){
                        setTimeout(function () {
                            document.body.scrollTop = document.body.scrollHeight;
                        }, 500);
                    }
                }

            },
            //模拟登录
            login() {
                this.$http({
                    method: 'post',
                    url: this.versionLive2+'user/user_login',
                    data: {}
                }).then(function (res) {
                    // console.log(res);
                }).catch(function (err) {

                })
            },
            changeRew(name) {
                this.isReward = name;
                if (name == 'day') {
                    this.rewardItem = this.rewardData.day;
                } else {
                    this.rewardItem = this.rewardData.week;
                }
            },
            getLiveRoom() {
                // if(this.$store.state.userinfo.user_id<0) return
                this.$vux.loading.show({text: '请求中...'});
                this.$http.get('/api/live/sport/get_live_room/', {
                    params: {
                        anchor_id: this.$route.params.id,
                        user_id: this.$store.state.userinfo.user_id
                    }
                }).then((res) => {
                    // console.log(res)
                    this.liveData = res.data.data;
                    this.getAwayTeamInfo(res.data.data.race_type,res.data.data.race_config.awayid);
                    this.getHomeTeamInfo(res.data.data.race_type,res.data.data.race_config.homeid);
                    this.isFollow = res.data.data.isFollow;
                    this.isHide = res.data.data.isHide;
                    let u = navigator.userAgent;
                    this.lotterId = res.data.data.name;
                    // this.getPreview(this.lotterId);//获取直播间预告
                    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                    let videoObjIos =  res.data.data.liveInfo.find(value=>{
                        return value.type == 'HLS'//0
                    });
                    let videoObjAnd =  res.data.data.liveInfo.find(value=>{
                        return value.type == 'HDL'//2
                    });
                    if (isiOS) {
                        this.isiOS = true;
                        this.videoSrc = videoObjIos.liveUrl;
                    } else {
                        this.isiOS = false;
                        this.videoSrc = videoObjAnd.liveUrl;
                        this.top1=6.75
                    }
                    if (res.data.data.red_paper.length) {
                        this.redPaper = res.data.data.red_paper;
                        this.redId = this.redPaper[this.redPaper.length - 1].id;
                    }

                    // if(this.liveData.live_status){
                    // 初始化webSocket
                    // this.initSocket();
                    // 获取聊天室最新的20条聊天记录
                    // this.getInitChat();
                    //获取直播间刷礼物榜单
                    // this.getLiveRewardList();
                    // }
                    this.playHistory()
                    setTimeout(() => {
                        this.$vux.loading.hide();
                    }, 100)
                }).catch((err) => {
                    this.$vux.loading.hide();
                })
            },
            getInitChat() {
                // this.$vux.loading.show();
                this.$http.get(this.versionLive2+'live/initChat?anchor_id='+this.$route.params.id,
                ).then((res) => {
                    this.$vux.loading.hide();
                    this.chatData = res.data.data;
                    // console.log(this.chatData);
                    // console.log(this.chatData)
                    this.flitImg(this.chatData);
                    this.playList.chatData = this.chatData;
                }).catch(function (err) {
                    // this.$vux.loading.hide();
                    // console.log(err);
                })
            },
            initSocket(data) {
                if(data) this.dbData = data;
                // 实例化socket
                if(!this.socket|| data){
                    //let wsServer = `${location.protocol == 'https:' ? 'wss' : 'ws'}://${location.host}/wss`;
                    let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
                    console.log(44,wsServer);
                    this.socket = new WebSocket(wsServer);
                    // 监听socket连接
                    this.socket.onopen = this.open;
                    // 监听socket错误信息
                    this.socket.onerror = this.error;
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage;
                    // 监听socket关闭
                    this.socket.onclose = this.close;
                    //发送消息
                    // this.socket.send = this.send();
                }


            },
            getGiftList() {
                this.$http.get(this.versionLive2+'live/get_gift_list',
                ).then((res) => {
                    this.giftData = res.data.data;
                    this.playList[this.currGitType] = this.giftData[this.currGitType];
                    this.giftTab =  Object.keys(this.giftData);
                    // debugger;
                    this.giftTabsList = res.data.typeList;
                    this.currGitType = this.giftTab[0];
                }).catch((err) => {
                    // console.log(err);
                })
            },
            //socket心跳
            timer() {
                if (window.timer_1) clearInterval(window.timer_1);
                window.timer_1 = window.setInterval(() => {
                    let text_obj2 = {
                        "type": "ping",
                        "room_id": this.$route.params.id,
                        "user_id": this.$store.state.userinfo.user_id,
                        "userName": this.$store.state.username
                    };
                    this.send(JSON.stringify(text_obj2),true);
                }, 50000);
            },

            // 送出礼物
            sendGift() {
                if(this.socket.readyState==3) {
                    this.initSocket('{"type": "gift"}');
                }else{
                    this.$vux.loading.show({text: '发送中...'});
                    this.giftFormData.gift_id = this.currGift.id;
                    this.giftFormData.anchor_id = this.$route.params.id;
                    this.$http({
                            method: 'post',
                            url: this.versionLive2+'live/send_gift',
                            data: this.giftFormData
                        }
                    ).then((res) => {
                        if (res.data.code == 1) {
                            //减去当前送的礼物个数
                            this.findGift(this.currGift.id);
                            // this.show4 = false;
                            this.sendGiftPop = false;
                            // this.currGift.amount = null;
                            let text_obj = {
                                "type": "gift",
                                "room_id": this.$route.params.id,
                                "gift_type": 1,
                                "user_id": this.$store.state.userinfo.user_id,
                                "userName": this.$store.state.username,
                                "gift_id": this.currGift.id,
                                "gift_name": this.currGift.name,
                                "gift_price": this.currGift.amount,
                                //"gift_num": "1",
                                "gift_num": this.giftFormData.gift_num,
                                "avatar":this.$store.state.userinfo.avatar,
                                "icon":this.giftData[this.currGitType][this.giftIndex].icon,
                                vip:this.$store.state.userinfo.noble+'',
                                userType:this.userType+'',
                            };
                            // this.send(JSON.stringify(text_obj));

                            //刷新砖石
                            this.getZs();
                            if(this.isShowImg!=2) return;
                            if(this.isShowImg==2){
                                localStorage.setItem('ifLonger','true');
                                this.isShowImg = localStorage.getItem('ifLonger')
                            }
                        }else if(res.data.code==2||res.data.code==0){
                            this.noSendMoney = true;
                            this.noSendMoneyMsg = res.data.msg;
                            this.sendGiftPop = false;
                            this.$vux.loading.hide();

                        }else{
                            this.$vux.loading.hide();

                        }
//                    $this.isToast = false;





                    }).catch((err) => {
                        this.$vux.loading.hide();
                    });
                }

            },
            open: function () {
                console.log("socket连接成功");
                if(this.dbData){
                    if(JSON.parse(this.dbData).type=='publish'){
                        setTimeout(()=>{
                            this.$vux.toast.text('聊天室连接成功', 'middle')
                        },1000)
                    }else if(JSON.parse(this.dbData).type=='gift'){
                        this.sendGift();
                    }else if(JSON.parse(this.dbData).type=='red'){
                        this.sendRedPacket();
                    }
                }
                let type = 'subscribe';
                let type2 = 'ping';
                let text_obj = {
                    "type": type,
                    "room_id": this.$route.params.id,
                    "userName": this.$store.state.userinfo.nickname,
                    "user_id": this.$store.state.userinfo.user_id,
                    "vip": this.$store.state.userinfo.noble
                };
                let text_obj2 = {
                    "type": type2,
                    "room_id": this.$route.params.id,
                    "user_id": this.$store.state.userinfo.user_id,
                    "userName": this.$store.state.userinfo.nickname
                };
                this.send(JSON.stringify(text_obj));
                this.send(JSON.stringify(text_obj2),true);
                this.timer();
            },
            error: function () {
                console.log("连接错误");
            },
            getMessage: function (msg) {
                let data = JSON.parse(msg.data);
                //  console.log(data);
                let $this = this;
                if (data.type == 'publish') {
                    // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
                    if(data.event=='pushPlan'){
                        data.isExpire=true
                    }
                    $this.chatData.push(data);
                    $this.$vux.loading.hide();
                    $this.pushDanmu = data;
                } else if (data.type == 'gift') {
                   // if(typeof data.userType=='string'){
                   //      return
                   //  }
                    data.ljNum=1;
                    // console.log(this.giftData[this.currGitType][this.giftIndex].grade)
                    if(this.giftIndex&&this.giftData[this.currGitType][this.giftIndex].grade == 'low'){
                      $this.boxShowTime = 3;
                    }else if(this.giftIndex&&this.giftData[this.currGitType][this.giftIndex].grade == 'meddle'){
                        $this.boxShowTime = 6;
                    }else if(this.giftIndex&&this.giftData[this.currGitType][this.giftIndex].grade == 'high'){
                        $this.boxShowTime = 9;
                    }
                   let dataIndex=$this.chatData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<$this.boxShowTime);
                   if(dataIndex!=-1){
                       $this.chatData[dataIndex].ljNum++;
                       $this.chatData[dataIndex].sendTime=data.sendTime
                   }else{
                       $this.chatData.push(data);
                   }
                //    console.log( data.sendTime)
                  // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);

                    //红包
                    if (data.gift_type == 4) {
                        $this.showbigRed = true;
                        $this.checkRed(true);
                        $this.redId = data.r_id;
                        $this.$vux.loading.hide();
                    }else {
                    //  普通礼物
                      this.$vux.loading.hide();
                      if(data.gift_id>=1){
                      // if (data.gift_id == 18 || data.gift_id == 24 || data.gift_id == 30 || data.gift_id == 31 || data.gift_id == 21 || data.gift_id == 22|| data.gift_id == 38|| data.gift_id == 50|| data.gift_id == 49) {
                        //这样出现内存变大  需要删除数组元素
                        // var GitDTimeout=null
                        let dataIndex=$this.genGitData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<$this.boxShowTime);
                        if(dataIndex!=-1){
                          //   let nun =  localStorage.getItem('gift_num');
                          //   if(nun!=data.gift_num){
                          //       $this.genGitData[dataIndex].ljNum = parseInt(data.ljNum);
                          //   } else {
                            $this.genGitData[dataIndex].ljNum ++;

                          //   }

                            $this.genGitData[dataIndex].gift_num = parseInt(data.gift_num);
                            $this.genGitData[dataIndex].sendTime=data.sendTime;
                            $this.genGitData[dataIndex].boxShowTime=$this.boxShowTime;
                        }else{
                            $this.genGitData.push(
                                {
                                    name: data.userName,
                                    avatar: data.avatar,
                                    giftName: data.gift_name,
                                    icon: data.icon,
                                    gift_num:data.gift_num,
                                    sendTime:data.sendTime,
                                    gift_id:data.gift_id,
                                    user_id:data.user_id,
                                    boxShowTime:6,
                                    ljNum:1,
                                    timer:null

                                }
                            )
                            dataIndex = $this.genGitData.length - 1;

                        }
                        clearInterval($this.genGitData[dataIndex].timer);
                        $this.genGitData[dataIndex].timer = setInterval(() => {
                                $this.genGitData.forEach((i,d)=>{
                                    if (d != dataIndex){
                                    i.boxShowTime-- ;
                                    if(i.boxShowTime == 0){
                                        clearInterval(i.timer);
                                        $this.genGitData.splice(d,1);
                                    }
                                    }else{
                                    $this.genGitData[dataIndex].boxShowTime--;
                                        if($this.genGitData[dataIndex].boxShowTime == 0){
                                            clearInterval($this.genGitData[dataIndex].timer);
                                            $this.genGitData.splice(dataIndex,1);
                                        }
                                    }

                                })
                            }, 1000);


                         if (data.gift_id == 27) {
                              $this.SVGA('float.svga', 149);
                          } else if (data.gift_id == 28) {
                              $this.SVGA('fireCloud.svga', 153);
                          } else if (data.gift_id == 17) {
                              $this.SVGA('phoenix.svga', 138);
                          } else if (data.gift_id == 15) {
                              $this.SVGA('lamborghini.svga', 302);
                          } else if (data.gift_id == 16) {
                              $this.SVGA('castle.svga', 159);
                          } else if (data.gift_id == 29) {
                              $this.SVGA('yacht.svga', 139);
                          }else if(data.gift_id == 23){
                              $this.SVGA('loveyou.svga', 179);
                          }
                          else if(data.gift_id == 39){
                              $this.SVGA('shengdanlaoren.svga', 45);
                          }
                          else if(data.gift_id == 40){
                              $this.SVGA('shengdanhuoche.svga',76);
                          }
                          else if(data.gift_id == 41){
                              $this.SVGA('zhendongbang.svga',94);
                          }
                          else if(data.gift_id == 42){
                              $this.SVGA('huanggua.svga',105);
                          }
                          else if(data.gift_id == 43){
                              $this.SVGA('qiezi.svga',62);
                          }
                          else if(data.gift_id == 44){
                              $this.SVGA('pibian.svga',55);
                          }
                          else if(data.gift_id == 45){
                              $this.SVGA('dila.svga',104);
                          }
                          else if(data.gift_id == 46){
                              $this.SVGA('saqian.svga',149);
                          }
                          else if(data.gift_id == 51){
                              $this.SVGA('kongmingdeng.svga',58);
                          }
                          else if(data.gift_id == 52){
                              $this.SVGA('gu.svga',107);
                          }
                          else if(data.gift_id == 53){
                              $this.SVGA('nnyouyu.svga',107);
                          }
                          else if(data.gift_id == 54){
                              $this.SVGA('bianpao.svga',99);
                          }else if(data.gift_id == 21){
                              $this.SVGA('kh.svga',119);
                          }

                      }
                    }

                        // }
                    // }


                } else if (data.type == 'subscribe'&& !data.isMe) {
                  //进入房间
                  if(data.vip==1){
                      data.vipName='qishi'
                      $this.SVGA('vip1.svga',48)
                  }
                  else if(data.vip==2){
                      data.vipName='nanjue'
                      $this.SVGA('vip2.svga',40)
                  }
                   else if(data.vip==3){
                      data.vipName='zijue'
                      $this.SVGA('vip3.svga',26)
                  }
                   else if(data.vip==4){
                      data.vipName='bojue'
                      $this.SVGA('vip4.svga',51)
                  }
                   else if(data.vip==5){
                      data.vipName='houjue'
                      $this.SVGA('vip5.svga',59)
                  }
                   else if(data.vip==6){
                      data.vipName='gongjue'
                      $this.SVGA('vip6.svga',59)
                  }
                   else if(data.vip==7){
                      data.vipName='guowang'
                      $this.SVGA('vip7.svga',47)
                  }
                  $this.vipData.push(data);
                  $this.inData.push(data);
                    $this.chatData.push(data);
                    $this.$vux.loading.hide();
                }else if(data.type =='error'){
                    $this.$vux.loading.hide();
                    //  if(this.$store.state.userinfo.user_id<0) return
                    $this.showMsg = true;
                    // console.log(22222222)
                    $this.chatReturnMsg = data.msg;
                } else if(data.type =='operation'){
                    this.clearChatContent();
                }else if(data.type=="ServerPush"){
                   if(data.dataType=='long_dragon'){
                        $this.clList=[]
                    data.data.forEach((i,d)=>{
                        if($this.hostMsg.lottery_id==i.lottery_id){
                            $this.clList.push(i);

                        }
                    })

                    if($this.clList.length){
                        this.clshow=true;
                    }
                   }else if(data.dataType=='update_online'){
                       if( document.querySelector('.onlineNum')){
                            document.querySelector('.onlineNum').innerHTML='在线人数     '+(this.liveData.base_online+data.data.online)
                       }
                   }
                   else if(data.dataType=='push_open_issue'){
                      this.chatData.forEach((t,i)=>{
                         if(t.event=='pushPlan'){
                             data.data.forEach((t2,i2)=>{
                                 if(t.orders.play_bet_lottery_id==t2.lotteryId){
                                     if(t.orders.play_bet_issue==t2.issue){
                                         t.isExpire=true
                                     }else{
                                         t.isExpire=false
                                     }
                                 }
                             })
                         }
                      })
                      this.$forceUpdate();
                   }
                }
            },
//             getMessage: function (msg) {
//                 let data = JSON.parse(msg.data);
//                 let $this = this;
//                 if (data.type == 'publish') {
//                     // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
//                     $this.chatData.push(data);
//                     $this.$vux.loading.hide();
//                     $this.pushDanmu = data;
//                 } else if (data.type == 'gift') {
//                     //   console.log(data)
//                     data.ljNum=1;
//                     let dataIndex=$this.chatData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<6);
//                     if(dataIndex!=-1){
//                         $this.chatData[dataIndex].ljNum++;
//                         $this.chatData[dataIndex].sendTime=data.sendTime
//                     }else{
//                         $this.chatData.push(data);
//                     }
//                     //    console.log( data.sendTime)
//                     // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
//
//                     //红包
//                     if (data.gift_type == 4) {
//                         $this.showbigRed = true;
//                         $this.checkRed(true);
//                         $this.redId = data.r_id;
//                         $this.$vux.loading.hide();
//                     }else {
//
//                         //动画礼物
//                         //    if (data.gift_id == 27) {
//                         //         $this.SVGA('float.svga', 149);
//                         //     } else if (data.gift_id == 28) {
//                         //         $this.SVGA('fireCloud.svga', 153);
//                         //     } else if (data.gift_id == 17) {
//                         //         $this.SVGA('phoenix.svga', 138);
//                         //     } else if (data.gift_id == 15) {
//                         //         $this.SVGA('lamborghini.svga', 302);
//                         //     } else if (data.gift_id == 16) {
//                         //         $this.SVGA('castle.svga', 159);
//                         //     } else if (data.gift_id == 29) {
//                         //         $this.SVGA('yacht.svga', 139);
//                         //     }else if(data.gift_id == 23){
//                         //         $this.SVGA('loveyou.svga', 179);
//                         //     }
//                         //     else if(data.gift_id == 39){
//                         //         $this.SVGA('shengdanlaoren.svga', 45);
//                         //     }
//                         //     else if(data.gift_id == 40){
//                         //         $this.SVGA('shengdanhuoche.svga',76);
//                         //     }
//                         //     else if(data.gift_id == 41){
//                         //         $this.SVGA('zhendongbang.svga',94);
//                         //     }
//                         //     else if(data.gift_id == 42){
//                         //         $this.SVGA('huanggua.svga',105);
//                         //     }
//                         //     else if(data.gift_id == 43){
//                         //         $this.SVGA('qiezi.svga',62);
//                         //     }
//                         //      else if(data.gift_id == 44){
//                         //         $this.SVGA('pibian.svga',55);
//                         //     }
//                         //     else if(data.gift_id == 45){
//                         //         $this.SVGA('dila.svga',104);
//                         //     }
//                         //     else if(data.gift_id == 46){
//                         //         $this.SVGA('saqian.svga',149);
//                         //     }
//                         //      else if(data.gift_id == 51){
//                         //         $this.SVGA('kongmingdeng.svga',58);
//                         //     }
//                         //      else if(data.gift_id == 52){
//                         //         $this.SVGA('gu.svga',107);
//                         //     }
//                         //      else if(data.gift_id == 53){
//                         //         $this.SVGA('nnyouyu.svga',107);
//                         //     }
//                         //      else if(data.gift_id == 54){
//                         //         $this.SVGA('bianpao.svga',99);
//                         //     }
//                         // else{
//                         //普通礼物
//                         this.$vux.loading.hide();
//                         if(data.gift_id>=1){
//                             // if (data.gift_id == 18 || data.gift_id == 24 || data.gift_id == 30 || data.gift_id == 31 || data.gift_id == 21 || data.gift_id == 22|| data.gift_id == 38|| data.gift_id == 50|| data.gift_id == 49) {
//                             //这样出现内存变大  需要删除数组元素
//                             var GitDTimeout=null
//                             let dataIndex=$this.genGitData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&data.sendTime-res.sendTime<8);
//                             if(dataIndex!=-1){
//                                 let nun =  localStorage.getItem('gift_num');
//                                 if(nun!=data.gift_num){
//                                     $this.genGitData[dataIndex].ljNum = parseInt(data.ljNum);
//                                 } else {
//                                     $this.genGitData[dataIndex].ljNum ++;
//
//                                 }
//
//                                 $this.genGitData[dataIndex].gift_num = parseInt(data.gift_num);
//                                 $this.genGitData[dataIndex].sendTime=data.sendTime;
//                                 // $this.genGitData[dataIndex].boxShowTime=6;
//                                 if(data.grade=="low"){
//                                     $this.genGitData[dataIndex].boxShowTime=3;
//                                 } else if(data.grade=="middel"){
//                                     $this.genGitData[dataIndex].boxShowTime=6;
//                                 } else if(data.grade=="high"){
//                                     $this.genGitData[dataIndex].boxShowTime=9;
//                                 }
//
//                                 //  if(data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20||data.gift_id == 19 || data.gift_id == 20){
//                                 //         $this.genGitData[dataIndex].boxShowTime=3;
//                                 // }
//                                 localStorage.setItem('gift_num',$this.genGitData[dataIndex].gift_num);
//                             }else{
//                                 $this.genGitData.push(
//                                     {
//                                         name: data.userName,
//                                         avatar: data.avatar,
//                                         giftName: data.gift_name,
//                                         icon: data.icon,
//                                         gift_num:data.gift_num,
//                                         sendTime:data.sendTime,
//                                         gift_id:data.gift_id,
//                                         user_id:data.user_id,
//                                         boxShowTime:6,
//                                         ljNum:data.ljNum
//
//                                     }
//                                 )
//
//                             }
//                             clearInterval(this.GitDTimeout)
//                             this.GitDTimeout=setInterval(() => {
//                                 $this.genGitData.forEach((i,d)=>{
//                                     i.boxShowTime--
//                                     if(i.boxShowTime==0){
//                                         $this.genGitData.splice(d,1)
//                                     }
//                                 })
//                                 if($this.genGitData.length==0){
//                                     clearInterval(this.GitDTimeout)
//                                 }
//                             }, 1000);
//
//
//
//                             if (data.gift_id == 27) {
//                                 $this.SVGA('float.svga', 149);
//                             } else if (data.gift_id == 28) {
//                                 $this.SVGA('fireCloud.svga', 153);
//                             } else if (data.gift_id == 17) {
//                                 $this.SVGA('phoenix.svga', 138);
//                             } else if (data.gift_id == 15) {
//                                 $this.SVGA('lamborghini.svga', 302);
//                             } else if (data.gift_id == 16) {
//                                 $this.SVGA('castle.svga', 159);
//                             } else if (data.gift_id == 29) {
//                                 $this.SVGA('yacht.svga', 139);
//                             }else if(data.gift_id == 23){
//                                 $this.SVGA('loveyou.svga', 179);
//                             }
//                             else if(data.gift_id == 39){
//                                 $this.SVGA('shengdanlaoren.svga', 45);
//                             }
//                             else if(data.gift_id == 40){
//                                 $this.SVGA('shengdanhuoche.svga',76);
//                             }
//                             else if(data.gift_id == 41){
//                                 $this.SVGA('zhendongbang.svga',94);
//                             }
//                             else if(data.gift_id == 42){
//                                 $this.SVGA('huanggua.svga',105);
//                             }
//                             else if(data.gift_id == 43){
//                                 $this.SVGA('qiezi.svga',62);
//                             }
//                             else if(data.gift_id == 44){
//                                 $this.SVGA('pibian.svga',55);
//                             }
//                             else if(data.gift_id == 45){
//                                 $this.SVGA('dila.svga',104);
//                             }
//                             else if(data.gift_id == 46){
//                                 $this.SVGA('saqian.svga',149);
//                             }
//                             else if(data.gift_id == 51){
//                                 $this.SVGA('kongmingdeng.svga',58);
//                             }
//                             else if(data.gift_id == 52){
//                                 $this.SVGA('gu.svga',107);
//                             }
//                             else if(data.gift_id == 53){
//                                 $this.SVGA('nnyouyu.svga',107);
//                             }
//                             else if(data.gift_id == 54){
//                                 $this.SVGA('bianpao.svga',99);
//                             }else if(data.gift_id == 21){
//                                 $this.SVGA('kh.svga',119);
//                             }
//
//                         }
//                     }
//
//                     // }
//                     // }
//
//
//                 } else if (data.type == 'subscribe' && !data.isMe) {
//                     //进入房间
// //                    this.vipData = data;
//                     //   console.log(data)
//
//                     $this.vipData.push(data)
//
//                     // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
//
//                     $this.chatData.push(data);
//                     $this.$vux.loading.hide();
//                 }else if(data.type =='error'){
//                     $this.$vux.loading.hide();
//                     $this.showMsg = true;
//                     $this.chatReturnMsg = data.msg;
//                 } else if(data.type =='operation'){
//                     this.clearChatContent();
//                 }else if(data.type=="ServerPush"){
//                     if(data.dataType=='long_dragon'){
//                         $this.clList=[]
//                         data.data.forEach((i,d)=>{
//                             if($this.hostMsg.lottery_id==i.lottery_id){
//                                 $this.clList.push(i);
//
//                             }
//                         })
//
//                         if($this.clList.length){
//                             this.clshow=true;
//                         }
//                     }else if(data.dataType=='update_online'){
//                         if( document.querySelector('.onlineNum')){
//                             document.querySelector('.onlineNum').innerHTML='在线人数     '+(this.liveData.base_online+data.data.online)
//                         }
//                     }
//                     else if(data.dataType=='push_open_issue'){
//                       this.chatData.forEach((t,i)=>{
//                          if(t.event=='pushPlan'){
//                              data.data.forEach((t2,i2)=>{
//                                  if(t.orders.play_bet_lottery_id==t2.lotteryId){
//                                      if(t.orders.play_bet_issue==t2.issue){
//                                          t.isExpire=true
//                                      }else{
//                                          t.isExpire=false
//                                      }
//                                  }
//                              })
//                          }
//                       })
//                    }
//                 }
//             },
            send(data,flag) {
                // console.log(data);
                if(this.socket.readyState==1){
                    this.socket.send(data);
                    this.dbData = null;
                    if(flag=='msg'){
                        this.chatMsgForm.comment_text = '';
                        this.showEmj = false;
                        this.isShowKey = false;
                    }
                }else if(this.socket.readyState==3){
                    if (window.timer_1) clearInterval(window.timer_1);
                    if(flag===true) return;
                    this.$vux.loading.hide();
                    this.initSocket(data);
                }else if(this.socket.readyState==0){
                    this.$vux.loading.hide();
                    if(JSON.parse(this.dbData).type=='publish'){
                        this.$vux.toast.text('聊天室重连中，请稍等~', 'middle')
                    }
                }

            },
            close: function (e) {
                console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
                console.log("socket已经关闭");
                if(this.show4){
                    this.$vux.loading.hide();
                    // this.$vux.toast.text('发送失败~', 'middle')
                }

                // this.showMsg = true;
                // this.chatReturnMsg = '网络请求错误~'
                // this.initSocket();

            },
            // czID1(v){
            //    console.log(v)
            //    this.lottery_id = v;
            //    console.log(this.lottery_id )
            // },
            //主播分享
            shareOrder(data){
                // console.log(data);
                this.guessSw = false;
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                    });
                    return;
                }
                this.$vux.loading.show({text: '分享中...'});
                let text_obj = {
                    type: 'publish',
                    room_id: this.$route.params.id,
                    user_id: this.$store.state.userinfo.user_id,
                    userName: this.$store.state.username,
                    text: '',
                    vip:this.$store.state.userinfo.noble +'',
                    userType:this.userType+'',
                    // userType:1, //主播type 为1
                    avatar:this.$store.state.avatar,
                    event :'pushPlan',
                    orders:data
                };
                this.send(JSON.stringify(text_obj),'msg');
            },
            //发送消息
            sendChatMsg() {
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }
                if (!this.chatMsgForm.comment_text) {
//                this.showMsg = true;
//                this.chatReturnMsg = '您还没有输入内容哦~';
                    this.$vux.toast.text('您还没有输入内容哦', 'middle')
                    return;
                }
                this.$vux.loading.show({text: '发送中...'});
                let text_obj = {
                    type: 'publish',
                    room_id: this.$route.params.id,
                    user_id: this.$store.state.userinfo.user_id,
                    userName: this.$store.state.username,
                    text: this.chatMsgForm.comment_text,
                    vip:this.$store.state.userinfo.noble +'',
                    userType:this.userType+'',
                    avatar:this.$store.state.avatar,
                };
                this.send(JSON.stringify(text_obj),'msg');
            },
            //抢红包
            sendReceiveRed() {
                 if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                } else {
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
                this.$vux.loading.show();
                this.$http({
                    method: 'post',
                    url: this.versionLive2+'user/receive_red',
                    data: {
                        user_id: this.$store.state.userinfo.user_id,
                        rid: this.redId

                    }
                }).then((res) => {
                    this.checkRed(true);
                    this.$vux.loading.hide();
                    if (res.data.code == 1) {
                        this.showbigRed = false;
                        this.showMoney = true;
                        this.redInfo = res.data.data;

                    } else {
                        this.redInfo = res.data.data;
                        this.showbigRed = false;
                        this.noMoney = true;
                        this.$vux.toast.text(res.data.msg, 'middle');
                    }
                }).catch(() => {
                    this.$vux.loading.hide();
                })
                }
            },

            // 设置支付密码
            sendPayPsd(){
                if ((this.payForm.new_password+'').length!=6) {
//                this.showMsg = true;
//                 this.chatReturnMsg = '支付密码应为6位~' ;
                    this.$vux.toast.text('支付密码应为6位', 'middle')
                    return;
                } else if ((this.payForm.new_password_repeat+'').length!=6) {
//                this.showMsg = true;
//                this.chatReturnMsg = '确认密码应为6位~';
                    this.$vux.toast.text('确认密码应为6位', 'middle')
                    return;
                }else if(this.payForm.new_password!==this.payForm.new_password_repeat){
//                this.showMsg = true;
//                this.chatReturnMsg = '两次输入密码不一致~';
                    this.$vux.toast.text('两次输入密码不一致', 'middle')
                    return;
                }
                this.$vux.loading.show();
                this.$http({
                    method:'post',
                    url:'/api2/index/set-fund-password',
                    data:this.payForm
                }).then((res)=>{
                    this.showMsg = true;
                    this.$vux.loading.hide();
                    if(res.data.code==1){
                        this.chatReturnMsg = res.data.msg;
                        this.showR = true;
                        this.setPay =false;
                    }else{
                        this.chatReturnMsg = res.data.msg;
                    }

                }).catch((err)=>{
                    this.$vux.loading.hide();
                })
            }   ,
            //发送红包
            sendRedEnvelope() {
                //1.验证
                if(!this.redFormData.amount){
//                this.showMsg = true;
//                this.chatReturnMsg = '红包金额不能为空~';
                    this.$vux.toast.text('请输入红包金额', 'middle')
                    return;
                }
                if(!this.redFormData.num){
//                this.showMsg = true;
//                this.chatReturnMsg = '红包总数不能为空~';
                    this.$vux.toast.text('请输入红包个数', 'middle')
                    return;
                }
//            if((this.redFormData.password+'').length!=6){
////                this.showMsg = true;
////                this.chatReturnMsg = '支付密码应为6位~';
//                this.$vux.toast.text('请输入6位支付密码', 'middle')
//                return;
//            }


                //2.输入支付密码
//            this.showR = false;
                this.isKey = true;
                this.isComfirm = 3;
            },
            //发送红包
            sendRedPacket(){
                if(this.socket.readyState==3){
                    this.initSocket('{"type": "red"}');
                }else{
                    this.$vux.loading.show({text: '发送中...'});
                    this.redFormData.anchor_id = this.$route.params.id;
                    this.$http({
                        method: 'post',
                        url: this.versionLive2+'user/send_red',
                        data: this.redFormData
                    }).then((res) => {
                        if (res.data.code == 1) {
                            let text_obj = {
                                "type": "gift",
                                "room_id": this.$route.params.id,
                                "gift_type": 4,
                                "user_id": this.$store.state.userinfo.user_id,
                                "userName": this.$store.state.username,
                                "gift_price": this.redFormData.amount,
                                "gift_num": this.redFormData.num,
                                "gift_text": this.redFormData.text,
                                "r_id": res.data.data.rid,
                                "userType": this.userType+'',
                                "vip":this.$store.state.userinfo.noble +''
                            };
                            //this.send(JSON.stringify(text_obj));
                            this.showR = false;
                            this.redFormData.amount = null;
                            this.redFormData.num = null;
                            this.redFormData.password = null;
                            this.redFormData.text = '恭喜发财';
                            // this.showMsg = true;
                            // this.chatReturnMsg  = res.data.msg;
                            this.redId = res.data.data.rid;
                            // this.checkRed();
                        } else if (res.data.code == 2) {
                            this.noSendMoney = true;
                            this.noSendMoneyMsg = '余额不足，前去充值'
                            // let _this = this;
                            // this.$vux.confirm.show({
                            //     content: res.data.msg,
                            //     // 组件除show外的属性
                            //     onCancel() {
                            //     },
                            //     onConfirm() {
                            //         _this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}});
                            //     }
                            // })
                        }else if(res.data.code == 10){
                            this.SETSAFEPWD(10);
                            this.$vux.confirm.show({
                                title:'Tiền trong tài khoản của quý khách đã khóa ',
                                content:'Nếu muốn tiến hành thao tác rút tiền mời liên hệ với bộ phận Chăm sóc khách hàng ',
                                confirmText:"liên hệ với dịch vụ khách hàng",
                                onCancel : () => {
                                },
                                onConfirm : () => {
//                                    this.$router.push({name:'Notescontact'});
                                  this.goOnline();
                                }
                            });
                        } else {
                            this.showMsg = true;
                            this.chatReturnMsg = res.data.msg;
                        }

                        this.$vux.loading.hide();
                    }).catch((err) => {
                        this.$vux.loading.hide();
                    })
                }

            },

            async getPreview(id) {
                //   if (n == "全部") n = "";
                let res = await this.$http.get(this.versionLive2+"/user/anchor_advance/", {
                    params: {
                    user_id: this.$store.state.userinfo.user_id,
                    type: id
                    }
                });
                this.loading = false;
                if (res && res.data.code == 1) {
                    this.LivePreview = res.data.data || [];
                }
                },
            // 获取主播信息
            getAnchorInfo() {
                this.ifView = 3;
//                 this.$vux.loading.show({text:'Đang nhận...'});
                this.$http.get(this.versionLive2+'live/get_anchor_info', {
                    params: {
                        anchor_id: this.$route.params.id,
                        user_id: this.$store.state.userinfo.user_id
                    }
                }).then((res) => {
                    this.anchorData = res.data.data;
                    this.isFollow = res.data.data.isFollow;
//                     $this.$vux.loading.hide();
                }).catch(function () {
//                     $this.$vux.loading.hide();
                })
            },
            //获取主播打赏榜
            getRewardList() {
                this.ifView = 2;
                this.$vux.loading.show({text: 'Đang nhận...'});
                this.$http.get(this.versionLive2+'user/reward_list', {
                    params: {
                        anchor_id: this.$route.params.id,
                    }
                }).then((res) => {
                    this.rewardData = res.data.data;
                    if (this.isReward == 'day') {
                        this.rewardItem = this.rewardData.day;
                    } else {
                        this.rewardItem = this.rewardData.week;
                    }

                    // console.log(this.rewardData);
//                    $this.isToast =false;
                    this.$vux.loading.hide();
                }).catch(() => {
//                    $this.isToast =false;
                    this.$vux.loading.hide();
                })
            },
            //获取直播间榜单
            getLiveRewardList() {
                this.$http.get(this.versionLive2+'live/get_reward_list', {
                    params: {
                        anchor_id: this.$route.params.id,
                    }
                }).then((res) => {
                    this.liveRewardData = res.data.data || [];
                   // console.log(this.liveRewardData)
//                    $this.isToast =false;
//                     $this.$vux.loading.hide();
                }).catch(() => {
//                    $this.isToast =false;
//                    $this.$vux.loading.hide();
                })
            },
            //关注主播与取关
            clickFollow() {

                if (!this.$store.state.codeToken) {
                        this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                        return 
                    }
                     if(this.$store.state.userinfo.user_id<0){
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
                this.$vux.loading.show({text: 'Đang nhận...'});
                this.$http({
                    method: 'post',
                    url: this.versionLive2+'live/follow',
                    data: {
                        anchor_id: this.$route.params.id,
                        user_id: this.$store.state.userinfo.user_id
                    }
                }).then((res) => {
                    if (res.data.code == 1) {
                    this.isFollow = !this.isFollow;
                    }
                    this.getPreview(this.lotterId)
                    this.showMsg = true;
                    this.chatReturnMsg = res.data.msg;
                    this.$vux.loading.hide();
                }).catch((err) => {
                    this.$vux.loading.hide();
                })

            },

            async followAnchor(v) {
                //是否登录

                    if (!this.$store.state.codeToken) {
                        this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                        return 
                    }
                    //已经登录
                    let res = await this.$http.post(this.versionLive2+"live/follow", {
                        anchor_id: v.aid,
                        user_id: this.$store.state.userinfo.user_id
                    });
                    if (res && res.data.code == 1) {
                        if (v.isFollow == true) {
                            v.isFollow = false;
                            } else {
                            v.isFollow = true;
                            }
                            if(v.aid==this.$route.params.id){
                                    this.isFollow = !this.isFollow;
                            }
                        this.getPreview(this.lotterId)
                    }
                },
            showGift() {
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }
                     if(this.$store.state.userinfo.user_id<0){
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
                this.$vux.loading.show();
                this.$http.get(this.versionLive2+'user/diamond_now/', {
                    params:{
                        user_id:this.$store.state.userinfo.user_id
                    }
                }).then((res)=>{
                    this.$vux.loading.hide();
                    if(res.data.code==1){
                        
                        this.balance = res.data.data.diamond;
                        // console.log(res.data.data,111)
                        // if(res.data.data.balance==0){
                        //     this.noSendMoney = true;
                        // }else{
                        this.show4 = true;
                        // }

                    }else{
                        this.showMsg = true;
                        this.chatReturnMsg  = res.data.msg;
                    }

                }).catch((err)=>{
                    this.$vux.loading.hide();
                })

            },
            getZs(){
                this.$vux.loading.show();
                this.$http.get(this.versionLive2+'user/diamond_now/', {
                    params:{
                        user_id:this.$store.state.userinfo.user_id
                    }
                }).then((res)=>{
                    this.$vux.loading.hide();
                    if(res.data.code==1){
                        this.balance = res.data.data.diamond;

                    }else{
                        this.showMsg = true;
                        this.chatReturnMsg  = res.data.msg;
                    }

                }).catch((err)=>{
                    this.$vux.loading.hide();
                })
            },
            //验证是否设置了支付密码
            showRed() {
                // this.showR = true;
                if(!this.$store.state.codeToken){
                   this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }
                    if(this.$store.state.userinfo.user_id<0){
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
                this.checkPay();
//            this.$vux.loading.show({text:'Đang xác minh...'});
//            this.$http({
//                method:'post',
//                url:'/api/v1/user/ver_pay_pass',
//                data:{user_id:this.$store.state.userinfo.user_id}
//            }).then((res)=> {
//                this.$vux.loading.hide();
//                if(res.data.code==1){
//                    this.showR = true;
//                }else if(res.data.code==2){
//                    this.setPay =true;
//                } else{
//                    this.showMsg = true;
//                    this.chatReturnMsg  = res.data.msg;
//                }
//
//            }).catch(()=> {
//                this.$vux.loading.hide();
//            });
            },
            //显示竞猜入口
            showGuess(){

                 if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                }else{
                    this.guessSw = true;
                    this.isFollowOrder = false;
                    this.followOrders = {};
                    this.lottery_id=this.liveData.lottery_id;
                     console.log(this.liveData.lottery_id);

                     if(this.isHideVideo){
                      this.top1 = 1.2
                    }else{
                        if(this.isiOS){
                            this.top1 = 6.45
                        }else{
                            this.top1 = 6.75
                        }
                    }
                }
            },
            //全部彩种
            async getGame() {
                if(this.czListData.length){
                    this.allLottery = this.czListData;
                }else{
                    let res = await this.$http.post("/open/idx/sort/");
                    if (res.data && res.data.code == 1) {
                        this.allLottery = res.data.data || [];
                        this.SETCZNDATA(res.data.data || []);
                    }
                }
                
            },
            goRech(){
                this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}})
            },
            linkRech() {
                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                }else{
                    this.$router.push({ name: 'withdrawalTopUp', params: { type: 1,backUrl:this.$route.fullPath}});
                }

            },
            onConfirm4() {
                this.show4 = false;
            },
            play() {
                // this.$refs.fp.play();
                // let video  =  document.getElementById('videoElement');
                // video.play();
                // this.showVideo=2
            },
            refresh() {
                this.$refs.fp.refresh()
            },
            pause() {
                this.$refs.fp.pause()
            },
            flitImg(data) {
                let len = this.$refs.vmeChild.emojis.length;
                let fhbq=this.$refs.vmeChild.fhbqList;
                let gzbq=this.$refs.vmeChild.gzbqList
                let dL = data.length;
                for (let o = 0; o < dL; o++) {
                    for (let i = 0; i < len; i++) {
                        if (data[o].type == 'publish') {
                            if (data[o].text.indexOf(this.$refs.vmeChild.emojis[i]) > -1) {
                                let len = data[o].text.length;
                                for (let j = 0; j < len; j++) {
                                    this.chatData[o].text = this.chatData[o].text.replace(this.$refs.vmeChild.emojis[i], '<img src="../static/images/chat/emoji/' + this.$refs.vmeChild._emojiName(this.$refs.vmeChild.emojis[i]) + '">');
                                }

                            }
                        }
                    }
                fhbq.forEach((item,i)=>{
                    if (data[o].type == 'publish') {
                            if (data[o].text.indexOf(item.flag) > -1) {
                                let len = data[o].text.length;
                                for (let j = 0; j < len; j++) {
                                    this.chatData[o].text = this.chatData[o].text.replace(item.flag, '<img src="'+item.imgSrc+'" style="width:0.4rem;vertical-align: text-bottom;">');
                                }

                            }
                        }
                })
                gzbq.forEach((item,i)=>{
                    if (data[o].type == 'publish') {
                            if (data[o].text.indexOf(item.flag) > -1) {
                                let len = data[o].text.length;
                                for (let j = 0; j < len; j++) {
                                    this.chatData[o].text = this.chatData[o].text.replace(item.flag, '<img src="'+item.imgSrc+'" style="width:0.7rem;vertical-align: text-bottom;">');
                                }

                            }
                        }
                })

                }
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
        },
        filters:{
            filterGz(n){
                let name = "";
                if(n<1) return
                if(n==2){
                     name = '男爵';
                }else if(n==1){
                     name = '骑士';
                }
                else if(n==3){
                     name = '子爵';
                }else if(n==4){
                     name = '典雅的伯爵';
                }else if(n==5){
                     name = '华贵的侯爵';
                }else if(n===6){
                     name = '崇高的公爵';
                }else if(n==7){
                     name = '伟大的国王';
                }else{
                     name = 'max';
                }
                return name;
            },
            filterTextLen(n){
                if(n.length>60){
                    return n.substring(0,57)+'...'
                } else{
                    return n;
                }
            },
            filterGift(name){
                let n =  '';
                switch (name) {
                    case 'xk':
                        n = '炫酷';
                        break;
                    case 'lm':
                        n = '浪漫';
                        break;
                    case 'zg':
                        n = '尊贵';
                        break;
                }
                return n;

            },
            filterMoney(n){
                if(n.indexOf('.')>-1){
                    return n
                }
                return n+'.00'
            },
            filterDiamond(n){
              if((n-0)>10000){
                  
               return parseFloat(n/10000).toFixed(2)+"万" 
              }else {
                return n
              }
            },
            filterNickName(n,vip){
              if(vip>0){
                if(n.length>6){
                  return n.substring(0,6)+'...'
                }
                return n
              }else{
                if(n.length>9){
                  return n.substring(0,9)+'...'
                }
                return n
              }

            }

        },
        watch:{
          currTab:function (n,o) {
            if(this.currTab == 2){
              this.isHideVideo = false;
              this.$refs.scrollWrapper2.Myscroll.scrollTo(0,0)
            }else if(this.currTab == 3){
              this.isHideVideo = false;
              this.$refs.scrollWrapper3.Myscroll.scrollTo(0,0)
            }else if(this.currTab == 4){
              this.isHideVideo = false;
              this.$refs.scrollWrapper4.Myscroll.scrollTo(0,0)
            }else if(this.currTab == 1){
              this.scrollBottom();
            }
          },
          vipData:function (n) {
            setTimeout(()=>{
              let dom = document.querySelector('.vip-container>div');
              if(dom){
                dom.remove();
                this.vipData.splice(0,1)
              }
            },3000);


           // this.$nextTick(()=>{
           //   if(n.length>=2){
           //     setTimeout(()=>{
           //       let dom = document.querySelector('.vip-container>div');
           //       if(dom){
           //         dom.remove();
           //       }
           //     },3000)
           //   }else if(n.length==1){
           //     setTimeout(()=>{
           //       let dom = document.querySelector('.vip-container>div');
           //       if(dom){
           //         dom.remove();
           //       }
           //     },3000)
           //   }
           //
           // })
          },
            inData:function (n,o) {
              let dom1 = document.querySelector('.showuser-In');
              setTimeout(()=>{
                    this.showUserIn(n);
              },5000);
              // let str= '<span  class="one-item item-in" :class="v.vip<1&&!v.isAnchor?\'no-vip\':\'\'" v-for="(v,indexChat) in inData" :key="indexChat" v-if="v.type==\'subscribe\'&&v.user_id">\n' +
              //     '                           <i class="user-vip" :class="\'user-vip\'+v.vip" style="top:-.05rem" v-if="v.vip>0&&v.isAnchor!=1&&v.userType!=2"></i>\n' +
              //     '                           <i class="user-vip host-vip" style="top:-.05rem" v-if="v.isAnchor==1"></i>\n' +
              //     '                            <i class="user-vip admin-vip fl" v-if="v.userType==2"></i>\n' +
              //     '                           <span style="float:none;">欢迎 <i @click="banned(v.userType,v.userName,v.user_id)">'+ v.userName +'</i>进入直播间</span>\n' +
              //     '                           <span style="vertical-align: baseline"></span>\n' +
              //     '                        </span>';

                setTimeout(()=>{
                    let dom = document.querySelector('.showuser-In>span');
                    if(dom){
                        dom.remove();
                        this.inData.splice(0,1)
                    }
                },9000)
            },
            'chatMsgForm.comment_text':function(n,o){
                if(n.length>200){
                    this.$vux.toast.text('输入内容长度超出限制~');
                    this.chatMsgForm.comment_text  =  o;
                }
            },
            genGitData:function(n){
                this.$nextTick(()=>{
                //   setTimeout(()=>{
                //     let dom = document.querySelector('.gifShow-box>div');
                //     if(dom){
                //       dom.remove();
                //       this.genGitData.splice(0,1)
                //     }
                //   },4000)


//                    if(n.length>=2){
//                        // this.genGitData = n.splice(1,1);
//                        setTimeout(()=>{
//                            let dom = document.querySelector('.gifShow-box>div');
//                            if(dom){
//                                dom.remove();
//                              this.genGitData.splice(0,1)
//                            }
//                        },4000)
//                    }else if(n.length==1){
//                        setTimeout(()=>{
//                            let dom = document.querySelector('.gifShow-box>div');
//                            if(dom){
//                                dom.remove();
//                              this.genGitData.splice(0,1)
//                            }
//                        },4000)
//                    }

                })
            },
            isKey:function (n) {
                if(!n){
                    //清空
                    this.payRePwd = "";
                    this.payPwd = "";
                    this.redPwd = "";
                    this.showTip = false;
                    this.showTip2 = false;
                    this.isComfirm = 1;
                    this.clearActive();
                    this.tipText ="请设置支付密码";
                }
            },
            isComfirm:function (n) {
                if(n==3) this.tipText ="请输入支付密码";
            },
            dbData:function(n){
                if(n)this.send(JSON.stringify(n));
            }  ,
            redPwd:function (n,o) {
                if((n+'').length==7){
                    this.redPwd = o;
                }else if(n.length<7){
                    if(n.length>o.length){
                        if(document.querySelectorAll('.pwd-red-box i')[n.length-1]) document.querySelectorAll('.pwd-red-box i')[n.length-1].classList.add('active');
                    }else{
                        if(document.querySelectorAll('.pwd-red-box i')[n.length]) document.querySelectorAll('.pwd-red-box i')[n.length].classList.remove('active');
                    }
                    if(n.length==6){
                        setTimeout(()=>{
                            //验证是否冻结
                            this.checkOldPwd();
                        },50)
                    }
                }
            },
            payPwd:function (n,o) {
                if((n+'').length==7){
                    this.payPwd = o;
                }else if(n.length<7){
                    if(n.length>o.length){
                        if(document.querySelectorAll('.pwd-box i')[n.length-1]) document.querySelectorAll('.pwd-box i')[n.length-1].classList.add('active');
                    }else{
                        if(document.querySelectorAll('.pwd-box i')[n.length]) document.querySelectorAll('.pwd-box i')[n.length].classList.remove('active');
                    }
                    if(n.length==6){
                        setTimeout(()=>{
                            this.isComfirm = 2;
                            this.tipText ="请确认支付密码";
                        },50)
                    }
                }
            },
            payRePwd:function (n,o) {
                if((n+'').length==7){
                    this.payRePwd = o;
                }else if(n.length<7){
                    if(n.length>o.length){
                        if(document.querySelectorAll('.pwd-re-box i')[n.length-1]) document.querySelectorAll('.pwd-re-box i')[n.length-1].classList.add('active');
                    }else{
                        if(document.querySelectorAll('.pwd-re-box i')[n.length]) document.querySelectorAll('.pwd-re-box i')[n.length].classList.remove('active');
                    }
                    if(n.length==6){
                        //检测新密码与确认密码是否一致
                        if(this.payPwd != n){
                            setTimeout(()=>{
                                this.showTip = true;
                                //清空
                                this.payRePwd = "";
                                this.clearActive();
                            },50)

                        }else{
                            this.showTip = false;
                            //设置
                            this.setPwd();
                        }

                    }
                }
            },
            'showVideo':function (n) {
                if(n==2){
                    // let dom = document.getElementById('video');
                    // dom.play();
                }
            },
            'chatData':function (n) {
                this.$nextTick(()=>{
                    this.flitImg(n);
                    this.scrollBottom();
                    // setTimeout(()=>{
                    // //     if(this.$refs.scrollWrapper){
                    //  this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$refs.scrollWrapper.Myscroll.maxScrollY);
                    //     // }
                    //
                    // },20)

                })

            },
            'currGitType':function () {
                this.currGift = {};
                this.removeAllactive(document.querySelectorAll('.git-item'));

            },
            'redFormData.amount':function(n,o){
                if(n){
                    this.$nextTick(()=>{
                        this.redFormData.amount=n.replace(/[^\d]/g, '').replace(/^0{1,}/g,'');
                    })
                    if((n-0)>2000) {
                        this.$nextTick(() =>{
                            this.redFormData.amount = o;
                        });
                    }
                }


            },
            'redFormData.text':function (n) {
               this.$nextTick(()=>{
                   this.redFormData.text = n.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,'');
               })
            },
            'redFormData.num':function(n,o){
                if(n){
                    this.$nextTick(()=>{
                        this.redFormData.num=n.replace(/[^\d]/g, '').replace(/^0{1,}/g,'');
                    });
                    if((n-0)>2000) {
                        this.$nextTick(() =>{
                            this.redFormData.num = o;
                        });
                    }
                }

            },
            liveRewardData:function (n) {
                this.$nextTick(() => {
                    this.ScrollX();
                });

            },
            clshow:function(n){
                if(n){
                    setTimeout(() => {
                        this.clshow=false;
                    }, 4000);
                }
            },
            showEmj:function(n){
                if(n){
                    this.ftBottom=5.1;
                }else{
                     this.ftBottom=0;
                }
            }
        },
        destroyed(){
            if (window.timer_1) clearInterval(window.timer_1);
            if(this.socket) this.socket.close();
            if(!this.$store.state.codeToken) return ;
            if(this.$store.state.userinfo.user_id<0) return ;
           if(this.history_id){
                 this.$http
            .get(this.versionLive2+'/live/live_play_history/',{params:{anchor_id:this.liveData.anchor_id,flag:'end',history_id:this.history_id}})
            .then(res => {  
            // console.log(res)
            })
            .catch(err => {
        
            });
           }
        },
        beforeRouteLeave(to, form, next) {
           if(this.clTimer){
               clearInterval(this.clTimer)
           }
            next()
        },
        components:{
            tzRecord,
            myScroll,
            myScrollX,
            flvPlayer,
            Group,
            XInput,
            XButton,
            vme,
            hlsPlayer,
            Toast,
            TrendDt,
            preview,
            Confirm,
            XDialog,
            tzmain, //投注首页
            DZP
            // lottie,
            // ckPlayer
        }
    }
</script>

<style  lang="less">
    /*禁言*/
    .no-speak{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 30;
        text-align: center;
        background: rgba(0,0,0,.5);
        .no-speak-content{
            h3{
                font-size: .4rem;
                font-weight: bold;
                i{
                    padding-left: .2rem;
                }
            }
            position: relative;
            background: #fff;
            border-radius: 10px;
            width: 84%;
            padding: .8rem 0 .6rem 0;
            margin: 50% auto 0;
            .remove-btn{
                position: absolute;
                width: 1rem;
                height: 1rem;
                background: url("../../assets/images/member/close.png") center no-repeat;
                background-size: 30%;
                right: .2rem;
                top: .1rem;
            }
            .no-speak-btn{
                letter-spacing: 2px;
                width: 77.77%;
                margin: 0 auto;
                color: #fff;
                font-size: .4rem;
                font-weight: 500;
                height:1rem;
                line-height: 1rem;
                background:linear-gradient(90deg,rgba(255,49,49,1) 0%,rgba(255,128,103,1) 100%);
                border-radius: 22px;
            }
        }
        .no-speak-time{
            margin: .6rem 0;
            .item{
                font-size: .35rem;
                font-weight: bold;
                display: inline-block;
                margin-right: .5rem;
                img{
                    width: .3rem;
                    vertical-align: middle;
                }
				i{display: inline-block;width: 0.42rem;height: 0.4rem;background: url(../../assets/images/chat/wxzyh@3x.png) no-repeat;background-size: 100% 100%;float: left;margin-right: 0.08rem;}
				.active{
					background: url(../../assets/images/chat/wxzyh@2x.png) no-repeat;background-size: 100% 100%;
				}
            }
        }
    }
    /*收起的层级*/
    .high-index{
        z-index: 10;
    }
    /*新的聊天样式*/
    .speak{
        margin-bottom: .15rem;
        dt{
            width: .85rem;
            height: .85rem;
            border-radius: 50%;
            overflow: hidden;
            background: #eee;
            img{
                width: 100%;
                height: 100%;
            }
        }
        dd{
            max-width: 88%;
            margin-left: .2rem;
            position: relative;
            background: #fff;
            border-radius:0 8px 8px 8px;
            padding: .2rem .25rem;
            &:before{
                position: absolute;
                content: '';
                left: -.15rem;
                top: 0;
                width: 0.25rem;
                height: 0.55rem;
                background: url("../../assets/images/chat/chatBg.png") no-repeat;
                background-size: contain;

            }
            .user-name{
                font-size: .3rem;
                
                padding: 0 .3rem 0 .1rem;
            }
            .speak-time{
                font-size: .3rem;
                
                display: inline-block;
                float: right;
                line-height: .5rem;
            }
            .speak-content{
                font-size: .35rem;
                color: #445779;
                font-weight: 500;
                word-break: break-word;
				img{
					width: 0.5rem;
					vertical-align: text-bottom;
				}
            }
        }
    }

    /*2.0版聊天样式*/
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .new-speak {
        margin-bottom: .15rem;
        width: 100%;
        dt {
            width: .85rem;
            height: .85rem;
            border-radius: 50%;
            overflow: hidden;
            background: #eee;
            img {
                width: 100%;
                height: 100%;
            }
        }
        dd{
            min-width: 75%;
            margin-left: .2rem;
            position: relative;
            background: #fff;
            border-radius:0 8px 8px 8px;
            padding: .2rem .25rem;
            &:before{
                position: absolute;
                content: '';
                left: -.15rem;
                top: 0;
                width: 0.25rem;
                height: 0.55rem;
                background: url("../../assets/images/chat/chatBg.png") no-repeat;
                background-size: contain;

            }
            .issue{
                .rem(font-size,24);
                overflow: hidden;
                border-bottom:1px solid #eee;
                .rem(padding-bottom,10);
                .user-name,.speak-time{
                    color: #445779;
                    &.user-name{
                        .rem(padding-right,150);
                    }
                }
            }
            .table{
                width: 100%;
                font-weight: bold;
                .rem(font-size,28);
                color: #445779;
                overflow: hidden;
                position: relative;
                &.height{
                    .rem(height,116);
                }
                li{
                    width: 100%;
                    font-weight: bold;
                    overflow: hidden;
                    &.title{
                        .rem(font-size,24);
                        
                    }
                    .zt-size{
                        .rem(font-size,10);
                        font-weight: normal;
                        color: #445779;
                    }
                    span{
                        width: 20%;
                        .rem(padding-top,20);
                        text-align: center;
                        float: left;
                        word-break: break-all;
                        &:first-of-type{
                            width: 32%;
                            text-align: left;
                        }
                        &:last-of-type{
                            width: 20%;
                            text-align: right;
                        }
                    }
                }
            }
            .line{
                width: 100%;
                .rem(height,1);
                background: #eee;
                .rem(margin-top,20);
            }
            .btn-group{
                text-align: center;
                .rem(padding-top,20);
                .open-up,.put-away{
                    display: block;
                    .rem(font-size,24);
                    
                    .icon{
                        .rem(width,14);
                    }
                }
            }
            .follow-up{
                .rem(width,160);
                .rem(height,50);
                .rem(font-size,24);
                font-weight: bold;
                color: #fff;
                -webkit-border-radius: 25px;
                -moz-border-radius: 25px;
                border-radius: 25px;
                background: #FF513E;
                border:none;
                .rem(margin-top,20);
            }
            .expire{
                 background: #878e8d;
            }

        }
    }


    /*长龙提示*/
    .cl-tip{
        border-radius: 5px 0 0 5px;
        height: .85rem;
        line-height: .85rem;
        position: fixed;
        right: -10rem;
        top: 53%;
        // z-index: 10;
        z-index: 999;
        background: url("../../assets/images/chat/open_remind.png") #fff .2rem center no-repeat;
        background-size: 10%;
        padding: 0 .4rem 0 .8rem;
        font-weight: 500;
        animation: RToL 1s;
        animation-fill-mode:forwards;
        -webkit-animation: RToL 1s;
        -webkit-animation-fill-mode:forwards;
    }
    @keyframes RToL {
        from{
            right: -10rem;
        }to{
            right: 0;
        }
    }

    @keyframes leftToRight {
        from{
            left: -10rem;
        }to{
             left: 0.2rem;
         }
    }

    /*vip进入房间*/
    .vip-in{
        color: #666;
        font-weight: 500;
        font-size: .35rem;
        position: fixed;
        bottom: 2.5rem;
        left: 0;
        // z-index: 10;
        z-index: 1000;
        // background:linear-gradient(90deg,rgba(255,225,209,1) 0%,rgba(255,240,225,1) 100%);
        // padding:0 .2rem;
        // height: .7rem;
        line-height: .7rem;
        animation: leftToRight 1s;
        -webkit-animation: leftToRight 1s;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards;
        // width: 7.04rem;
        // height:1.25rem;
        // display: flex;
        // align-items: center;
    //    padding-bottom: 2%;
       .vip-bg{
        position: relative;
        top: 0;
        left: 0;
        &.zijue{
        width: 6.56rem;
        height: 1.2rem;
        background: url('../../assets/images/chat/zijue.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.15rem;
        }
        &.nanjue{
        width: 6.56rem;
        height: 1.2rem;
        background: url('../../assets/images/chat/nanjue.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.15rem;
        }
        &.qishi{
        width: 6.56rem;
        height: 1.2rem;
        background: url('../../assets/images/chat/qishi.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.15rem;
        }
         &.bojue{
        width: 7.04rem;
        height: 1.28rem;
        background: url('../../assets/images/chat/bojue.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.2rem;
        p{color: #BCD7FAFF;}
        }
        &.houjue{
        width: 7.04rem;
        height: 1.28rem;
        background: url('../../assets/images/chat/houjue.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.2rem;
         p{color: #7EFCECFF;}
        }
        &.gongjue{
        width: 7.04rem;
        height: 1.28rem;
        background: url('../../assets/images/chat/gongjue.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.2rem;
        p{color: #FD41FBFF;}
        }
         &.guowang{
        width: 7.04rem;
        height: 1.25rem;
        background: url('../../assets/images/chat/guowang.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 0.2rem;
        p{color: #EBFE4DFF;}
        }
       }
       p{padding-left: 35%;color: #fff;line-height: 216%;}
        img{
          width: 12%;
            position: absolute;
            top: 5%;
            left: 2%;
            &.nanjue{
            top: 10%;
            left: 1%;
            }
            &.houjue{
            top: 10%;
            left: 1%;
            }
            &.gongjue{
            top: 10%;
            left: 1%;
            }
            &.guowang{
            top: 10%;
            left: 1%;
            }
        }
        .vip-type{
            color: #FF513E;
            font-weight: bold;
            font-style:italic!important;
        }
        .vip-name{
            color: #d3904e;
            font-weight: bold;
        }
        // &:after{
        //     position: absolute;
        //     content: '';
        //     height: 100%;
        //     width: .3rem;
        //     background: url("../../assets/images/chat/rightBg.png") no-repeat;
        //     background-size: 100% 100%;
        //     right: -.3rem;
        //     top: 0;
        // }
    }
    /*按钮*/
    .more-cz{
        position: absolute;
        width: 1.4rem;
        height:1.4rem;
        right: 2%;
        bottom: 7.6rem;
        z-index: 33;
        z-index: 1001;//置顶
        .more-icon{

        }
        .more-list{
            background: #fff;
            box-shadow:0px 0px 30px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            padding: .1rem .4rem;
            width: 3rem;
            position:absolute;
            right: 2%;
            top: 1.3rem;
            li{
                font-size: .35rem;
                padding: .3rem 0;
                text-align: center;
                border-bottom: 1px solid #eee;
                &:nth-last-child(1){
                    border-bottom: none;
                }
                i{
                    display: inline-block;
                    background: url("../../assets/images/chat/hideV.png") no-repeat;
                    background-size: contain;
                    width: .35rem;
                    height: .35rem;
                    margin-right: .3rem;
                    margin-top: .2rem;
                }
                &.hide-video{
                    // border-bottom: 1px solid #eee;
                    padding: .1rem 0 .3rem 0;
                    i{
                        background: url("../../assets/images/chat/hideV.png") no-repeat;
                        background-size: contain;
                    }

                }
                &.open-icon{
                    i{
                        background: url("../../assets/images/chat/open.png") no-repeat;
                        background-size: contain;
                    }
                }
                &.clear-chat{
                    i{
                        background: url("../../assets/images/chat/delate-icon.png") no-repeat;
                        background-size: contain;
                        width: .35rem;
                        height: .35rem;
                    }
                    .gl-clear{
                        background: url("../../assets/images/chat/glclear-icon.png") no-repeat;
                        background-size: cover;
                        width: .36rem;
                        height: .35rem;
                    }
                    .pb-icon{
                        background: url("../../assets/images/chat/pingbi.png") no-repeat;
                        background-size: cover;
                        width: .36rem;
                        height: .35rem;
                    }
                }
            }
        }

    }

    /*主播信息*/
    .host-container{
        .host-msg{
            background: #fff;
            padding: .5rem 2.66%;
            position: relative;
            margin-bottom: .25rem;
            dt{
                width: 1.75rem;
                height: 1.75rem;
                position: relative;
                margin:0 .38rem 0 .1rem;
                position: relative;
                img{
                    width: 100%;
                    border-radius: 50%;
                    // border: 3px solid #ff513e;
                    height: 100%;
                }
                i.host-icon{
                    position: absolute;
                    width: .75rem;
                    height: .38rem;
                    background: url("../../assets/images/chat/host_14.png") no-repeat;
                    background-size: contain;
                    display: block;
                    bottom: 0;
                    right: .1rem;
                }
            }
            dd{
                .room-no{
                    font-size: .33rem;
                    
                    padding: .1rem 0;
                    display: inline-block;
                }
                .nick-name{
                    font-size: .42rem;
                    line-height: .42rem;
                    font-weight: bold;
                    padding-top: .15rem;
                    .tj-zb{
                        display: inline-block;
                        .rem(width,121);
                        .rem(height,37);
                        background: url(../../assets/images/chat/tj_zb.png) no-repeat;
                        background-size: contain;
                        vertical-align: sub;
                    }
                    .tj-zb-over{
                         background: url(../../assets/images/chat/tj_zb_over.png) no-repeat;
                        background-size: contain;
                    }
                }
                .icon-list{
                    >i{
                        display: inline-block;
                        vertical-align: bottom;
                    }
                }
                .sex-icon{
                    width: .4rem;
                    height: .4rem;
                    &.male{
                        background: url("../../assets/images/chat/gender-man-min (1).png") no-repeat;
                        background-size: contain;
                    }
                    &.female{
                        background: url("../../assets/images/chat/host_07.png") no-repeat;
                        background-size: contain;
                    }
                }
                .year-icon{
                    margin: 0 .1rem;
                    background: url("../../assets/images/chat/host_09.png") no-repeat;
                    background-size: 100% 100%;
                    width: 1.1rem;
                    height: .4rem;
                    text-align: center;
                    color: #fff;
                    font-family: number1;
                    padding-left: .1rem;
                }
                .grade-icon{
                    background: url("../../assets/images/chat/host_11.png") no-repeat;
                    background-size: 100% 100%;
                    width: 1.1rem;
                    height: .4rem;
                    text-align: center;
                    color: #fff;
                    font-family: number1;
                    padding-left: .2rem;
                }
            }
            .right-icon{
                position: absolute;
                background: url("../../assets/images/chat/host_03.png") no-repeat;
                background-size: contain;
                width: .22rem;
                height: .32rem;
                right: 4%;
                top:50%;
                transform:translateY(-50%)
            }
        }
        .dt-list{

        }
    }

    /*主播动态*/






    .fish-game{
        .cancel-box{
            position: absolute;
            right: 0;
            top: 0;
            width: 1rem;
            height: 1rem;
            background: url("../../assets/images/remove.png") center no-repeat;
        }
        /*height: 8.4rem;*/
        /*position: absolute;*/
        /*top: 8.2rem;*/
        /*left: 0;*/
        /*z-index: 10;*/
        /*background: #000;*/
        /*width: 100%;*/
        /*max-width: 750px;*/
        position: absolute;
        top: 7.8rem;
        bottom: 1.2rem;
        left: 0;
        z-index: 10;
        background: #000;
        width: 100%;
        max-width: 750px;
    }
    #myiframe{
        width: 100%;
        height: 100%;
    }
    .chat-header{
        img{
            width: 100% !important;
        }
        .chat-logo{
            width: 28%;
            margin-left: 1rem;
            margin-top: .05rem;
        }
        .down-load{
            color: #fff !important;
            font-size: .3rem !important;
            background: #4c65e3;
            padding:0.1rem 0.38rem;
            border-radius: 20px;
        }
    }
    .chat-box{
        /*video{*/
        /*    width: 100%;*/
        /*    !*display: none;*!*/
        /*}*/
        /*video::-webkit-media-controls-fullscreen-button {*/
        /*    display: none;*/
        /*}*/
        /*video::-webkit-media-controls-play-button {*/
        /*    background: red;*/
        /*}*/
        /*video::-webkit-media-controls-play-button {display: none}*/
        /*video::-webkit-media-controls-timeline {display: none}*/
        /*video::-webkit-media-controls-current-time-display{}*/
        /*video::-webkit-media-controls-time-remaining-display {}*/
        /*video::-webkit-media-controls-time-remaining-display {}*/
        /*video::-webkit-media-controls-mute-button {}*/
        /*video::-webkit-media-controls-toggle-closed-captions-button {}*/
        /*video::-webkit-media-controls-volume-slider {}*/
        /*video::-internal-media-controls-download-button {*/
        /*    display:none;*/
        /*}*/
        /*video::-webkit-media-controls-enclosure {*/
        /*    overflow:hidden;*/
        /*}*/
        /*video::-webkit-media-controls-panel {*/
        /*    width: calc(100% + 30px);*/
        /*}*/
    }
    .vux-loading{
        z-index: 1000!important;
    }
    #demoCanvas{
        z-index: -1;
    }
    #demoCanvas.active{
        position: fixed;
        width: 100%;
        height: 100%;
        // height: 97%;
        /*left: 50%;*/
        z-index: 99;
        /*transform: translateX(-50%);*/
        // top: 1.2rem;
        top: 0;
        bottom: 0;
        left: 0;
        background:rgba(0,0,0,.3);
    }
    #demoCanvas canvas{
        /*position: absolute;*/
        /*height: 100%;*/
        /*width: 100%;*/
        background: none!important;
        /*height: 0;*/
    }
    #demoCanvas.active canvas{
        height: auto;
    }
    body{
        orientation:landscape!important;
    }
    .chat-box .wrapperY{
        background: #fff !important;
    }
    .video-wrap  .wrapperY{
        background: #f5f7fa !important;
    }
    .chat-box .vme .wrapperY{
        background: #f5f7fa !important;
    }
    .xgplayer-skin-default .xgplayer-start{
        z-index: 99!important;
        /*display: none;*/
    }
    .xgplayer-icon-pause,.xgplayer-play,.xgplayer-rotate{
        display: none !important;
    }
    .xgplayer-live{
        margin-left: .3rem;
    }
    .chat-head{
        position: fixed;
        width: .8rem;
        height: 1.2rem;
        line-height: 1.2rem;
        z-index: 1001;
        padding: 5px 0;
        text-align: center;
        a.back-icon{
            width: .3rem;
            display: inline-block;
        }
    }
    .chat-box{
        .weui-toast_text .weui-toast__content{
            font-size: .38rem;
            padding-left: .1rem;
            padding-right: .1rem;
        }
        .weui-mask{z-index: 1001;}
        .novip-box{
            padding: 0.66rem 0;position: relative;
            h2{font-size: 0.42rem;color: #000;margin-bottom: 0.2rem;}
            p{font-size: 0.37rem;color:#999999;line-height: 0.6rem;padding: 0 1.6rem;}
            .novip-btn{
                display: flex;justify-content: space-around;margin-top:0.4rem;
                span{display: block;text-align: center;width: 2.8rem;height:1.06rem;line-height: 1.06rem;background: #FF3F30;font-size: 0.38rem;color: #fff;border-radius: 1rem;}
            }
            .close-btn{
                position: absolute;right: 0.2rem;top:0.1rem;padding:0.1rem ;
                img{width: .3rem;height: .3rem;}
            }
        }
        .dialog-pop{
            z-index: 1002;
            width: 80%;
            max-width: 300px;
            background-color: #FFFFFF;
            text-align: center;
            border-radius: 10px;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            padding: .8rem 0;
            >img{
                width: 3rem;
            }
            >p{
                font-weight: 550;
                font-size: .37rem;
                margin: .1rem 0;
            }
            .dialog_ft{
                display: flex;
                a{
                    display: flex;
                    flex: 1;
                    color: #fff;
                    background: #d7d7d7;
                    margin: .4rem 0.4rem 0 0.4rem;
                    border-radius: 20px;
                    font-size: 0.38rem;
                    height: 1rem;
                    line-height: 1rem;
                    justify-content: center;
                }
                a:nth-last-of-type(1){
                    background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                }
            }
        }
        .send-gift-pop{
            z-index: 1000002;
            >p{
                font-size: .42rem;
                color: #445779;
                font-weight: bold;
                padding: 0 1.6em;
            }
            >.dialog_no_longer{
                margin-top: .5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                
                font-size: .35rem;
                >img{
                    width: .4rem;
                    height: .4rem;
                    margin-right: .2rem;
                    -webkit-touch-callout: inherit!important;
                    pointer-events: inherit!important;
                }
            }
        }
    }.hp{
     }

    .chat-header{
        max-width: 750px;
        min-width: 320px;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
        background: #fff;
        position: fixed;
        // z-index: 11;
        // z-index: 1000;
        z-index: 1501;
        width: 100%;
        top: 0;
        >.fr{
            color: #fb7299;
            font-size: .4rem;
        }
        img{
            width: 2rem;
        }
    }
    .video-js{
        width: 100% !important;
        height: 5.5rem!important;
    }
    .video-js .vjs-big-play-button{
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        top: 50%;
    }
    .live-room{
        width: 100%;
        height: 100%;
        -webkit-touch-callout: none; /*系统默认菜单被禁用*/
        -webkit-user-select: none; /*webkit浏览器*/
        -khtml-user-select: none; /*早起浏览器*/
        -moz-user-select: none; /*火狐浏览器*/
        -ms-user-select: none; /*IE浏览器*/
        user-select: none; /*用户是否能够选中文本*/
        .live-rest{
            position: absolute;
            width: 80%;
            left: 50%;
            transform: translateX(-50%);
            /*bottom: 8%;*/
            /*right: 3%;*/
            /*transform: translate(-50%,-50%);*/
            font-size: .39rem;
            z-index: 12;
            p:nth-child(1){
                color:rgba(255,255,255,1);
                margin: .1rem 0;
            }
            p:nth-child(2){
                
                font-size: .35rem;
            }
        }
        .video-wrap{
            /*position: absolute;*/
            width: 100%;
            height: 100%;
            background: #fff;
            >.video-box{
                height: 5.6rem;
                width: 100%;
                background: #fff;
                position: relative;
                top: 1.2rem;
                >video{
                    width: 100%;
                    height: 6rem;
                }
                >img{
                    width: 2.2rem;
                    position: absolute;
                    top: .3rem;
                    left: .3rem;
                }
                .no-kb{
                    height: 5.8rem;
                    overflow: hidden;
                    text-align: center;
                    background: url('../../assets/images/chat/sport-bg.png') no-repeat top;
                    background-size: cover;
                    // background:radial-gradient(circle,rgba(51,51,51,1) 0%,rgba(40,40,40,1) 100%);
                    .img{
                        width:2.2rem;
                        /*margin-top: 1rem;*/
                        margin: 1rem auto .1rem;
                        /*margin-bottom: .1rem;*/
                        /*height:120px;*/
                        border-radius:50%;
                        height: 2.2rem;
                        overflow: hidden;
                        >img{
                            width: auto;
                            height: 100%;
                        }
                    }
                }
            }.active{
             /*position: fixed;*/
             /*left: 0;*/
             /*right: 0;*/
             /*top: 1.2rem;*/
            }
            /*.play{*/
            /*    width: 1.6rem;*/
            /*    height: 1.6rem;*/
            /*    position: absolute;*/
            /*    left: 50%;*/
            /*    top: 15%;*/
            /*    margin-left: -.8rem;*/
            /*    margin-top: -.8rem;*/
            /*    background: url("../../assets/images/chat/TV-Play.png")no-repeat;*/
            /*    background-size: 100%;*/
            /*    z-index: 11;*/

            /*}*/



            .chat-content{
                max-height: 56%;
                min-height: 9rem;
                overflow: hidden;
                color: #fff;
                border-bottom: 1.6rem;
                width: 100%;
                background: #f5f7fa;
                padding: .2rem 0;
                .user-vip{
                    display: inline-block;
                    // width: 1rem;
                    // height: .45rem;
                    .rem(height,30);
                    .rem(width,90);
                    vertical-align: middle;
                    /*margin: 0 .1rem;*/
                    /*position: relative;*/
                    /*top: 0;*/
                }
                .host-vip{
                    background: url("../../assets/images/chat/host-icon.png") no-repeat;
                    background-size:contain;
                }
                .admin-vip{
                    background: url("../../assets/images/chat/gly-icon.png") no-repeat;
                    background-size:contain;
                }
                .giftnum{
                    color: #333333;
                    font-family: number1;
                    font-weight: bold;
                    font-size: 0.5rem;
                    i{font-size: 0.38rem;margin: 0 0.06rem}
                    }
                .user-vip-no{
                    display: inline-block;
                    width: .1rem;
                    height: .35rem;
                    vertical-align: -webkit-baseline-middle;
                    margin: 0 .1rem;
                    position: relative;
                    top: -.12rem;
                }
                .user-vip1{
                    background: url("../../assets/images/newMine/qs.png") no-repeat;
                    background-size:contain;
                }
                .user-vip1{
                    background: url("../../assets/images/newMine/qs.png") no-repeat;
                    background-size:contain;
                }
                .user-vip2{
                    background: url("../../assets/images/newMine/nj.png") no-repeat;
                    background-size:contain;
                }
                .user-vip3{
                    background: url("../../assets/images/newMine/zj.png") no-repeat;
                    background-size:contain;
                }
                .user-vip4{
                    background: url("../../assets/images/newMine/bj.png") no-repeat;
                    background-size:contain;
                }
                .user-vip5{
                    background: url("../../assets/images/newMine/hj.png") no-repeat;
                    background-size:contain;
                }
                .user-vip6{
                    background: url("../../assets/images/newMine/gj.png") no-repeat;
                    background-size:contain;
                }
                .user-vip7{
                    background: url("../../assets/images/newMine/gw.png") no-repeat;
                    background-size:contain;
                }
                >.reward-list{
                    >.reward-list-title{
                        display: flex;
                        justify-content: center;
                        padding-bottom: .3rem;
                        border-bottom: 1px solid #fb7299;
                        >span{
                            margin: 0 .2rem;
                            font-size: .36rem;
                            background: #ec6969;
                            padding: 0 .5rem;
                            border-radius: .2rem;
                        }.active{
                             background: #772323;
                         }
                    }
                    >.reward-list-item{
                        display: flex;
                        justify-content: space-around;
                        font-size: .4rem;
                        border-bottom: 1px solid #fb7299;
                        padding: .3rem 0;
                    }
                }
                >div{
                    .msg-content{
                        word-break: break-all;
                        color: #333333;
                        vertical-align: sub;
                        font-size: .35rem;
                    }
                    margin: .15rem .2rem;
                    display: flex;
                    align-items: center;
                    >.no-vip{
                        > span:nth-child(2){
                            vertical-align: text-top!important;
                            >img{
                                top: -.02rem;
                                vertical-align: baseline;
                            }
                        }
                    }
                    >.one-item{
                        /*background: rgba(10, 10, 10, 0.6);*/
                        text-align: left;
                        padding: 0rem .1rem;
                        border-radius: .4rem;
                        /*display: flex;*/
                        max-width: 95%;
                        overflow-wrap: break-word;
                        color: #999999;
                        font-size: .35rem;
                        margin-bottom: 0;
                        img{
                            width: .55rem;
                            margin-right: .05rem;
                            position: relative;
                            top: 0;
                            vertical-align: bottom;
                            /*float: left;*/
                        }.gift{
                             width: 0.7rem;
                             top: -0.02rem;
                             left: .1rem;
                             vertical-align: bottom;
                         }
                        >span:nth-child(1){
                            color: #999999;
                            float: left;
                            >.type-icon{
                                background: #fca851;
                                color: #fff;
                                border-radius: .1rem;
                                padding:0 .1rem;
                            }
                        }
                        >span:nth-child(2){
                            /*display: flex;*/
                            /*align-items: center;*/
                            vertical-align: sub;
                        }
                    }
                    .gift-item{
                        color: #d6be8d;
                        font-size: .35rem;
                    }.one{
                         color: #999999;
                     }
                }
            }
            .isP{
                 pointer-events: initial!important;
             }

            /*榜单*/
            .bd-content{
                background: #fff;
                padding: 0 2.66%;
                ul{
                    li{
                        position: relative;
                        padding: .3rem 0;
                        span{
                            display: inline-block;
                        }
                        span.bd-user-pm{
                            width: 0.65rem;
                            height: 0.6rem;
                            margin-left: 2.66%;
                            text-align: center;
                            
                            font-weight: bold;
                            font-family: number1;
                            font-size: .42rem;
                            position: absolute;
                            top:50%;
                            transform: translateY(-50%);
                            left:0;
                        }
                        span.bd-user-pm1{
                            background: url("../../assets/images/chat/chat-vip_03.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-pm2{
                            background: url("../../assets/images/chat/chat-vip_09.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-pm3{
                            background: url("../../assets/images/chat/chat-vip_12.png") no-repeat;
                            background-size: contain;
                        }
                        div.bd-user-img{
                            display: inline-block;
                            width: 1.1rem;
                            height: 1.1rem;
                            overflow: hidden;
                            margin-left: .55rem;
                            vertical-align: middle;
                            border-radius: 50%;
                            position: absolute;
                            top:50%;
                            transform: translateY(-50%);
                            left: 10%;
                            img{
                                width: auto;
                                height: 100%;
                            }
                        }
                        span.bd-user-name{
                            font-size: .38rem;
                            color: #445779;
                            padding: 0 .2rem;
                            font-weight: bold;
                            /*width:4.2rem;*/
                            /*overflow: hidden;*/
                            /*text-overflow: ellipsis;*/
                            /*white-space: nowrap;*/
                            line-height: 1rem;
                            margin-left: 2.6rem;

                        }
                        span.bd-user-diamod{
                            font-size: .35rem;
                            
                            float: right;
                            line-height: 1rem;
                        }
                        span.bd-user-vip{
                            vertical-align: text-bottom;
                        }
                        span.bd-user-vip1{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/qs.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip2{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/nj.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip3{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/zj.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip4{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/bj.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip5{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/hj.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip6{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/gj.png") no-repeat;
                            background-size: contain;
                        }
                        span.bd-user-vip7{
                            width: 1.2rem;
                            height: .45rem;
                            background: url("../../assets/images/newMine/gw.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }




            // 一般礼物加载
            .gifShow-box{
                position: fixed;
                top: 47%;
                width: 94%;
                z-index: 1000001;
                .gifShow{
                    position: relative;
                    /*background: url(../../assets/images/giftBg.png) no-repeat center;*/
                    /*background-size: 100% 100%;*/
                    display: none;
                    /*height: 50px;*/
                    /*left: -10px;*/
                    /*left: 0;*/
                    .user-img{
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        border: 3px solid #fe3a4c;
                        text-align: center;
                        float: left;
                        margin: 8px 0 8px 15px;
                        position: absolute;
                        left: 0;
                        top:10px;
                        z-index: 2;
                    }
                    .tx{
                        display: inline-block;
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        background: #fff;
                        img{
                            width: 39px;
                            height: 39px;
                            border-radius: 50%;
                            margin-top: 3px;

                        }
                    }
                    .nickAGif{
                        float: left;
                        display: inline-block;
                        margin-left: 1rem;
                        margin-top: .8rem;
                        dt.user-name{
                            position: relative;
                            padding-left: .9rem;
                            color: #fff;
                            font-size: 0.3rem;
                            font-weight: 600;
                            background:rgba(255,38,57,0.9);
                            line-height: 28px;
                            &:after{
                                position: absolute;
                                content: '';
                                background: url("../../assets/images/chat/gitBg.png") no-repeat;
                                background-size: contain;
                                height:100%;
                                width: 15px;
                                right: -15px;
                                top: 0;
                            }
                        }
                        dd.git-name{
                            padding-left: .9rem;
                            color: #fff;
                            span{
                                color: #ffe400;
                            }
                            background: url("../../assets/images/chat/gitbg1.png") no-repeat;
                            background-size: 100% 100%;
                            height: 26px;
                            line-height: 26px;
                        }
                        .gifts{
                            height: 50px;
                            width: 50px;
                            overflow: hidden;
                            float: right;
                            margin-left: 40px;
                            margin-top: -22px;
                        }
                        .num{
                            position: absolute;
                            right: -1.8rem;
                            top: 0;
                            font-size: 2.8em;
                            // font-family:DIN;
                            font-weight:bold;
                            font-style:italic;
                            color:rgba(51,51,51,1);
                            -webkit-text-stroke:2px undefined;
                            text-stroke:2px undefined;
                            // background:linear-gradient(0deg,rgba(255,43,43,1) 0%, rgba(255,191,191,1) 99.12109375%);
                            // -webkit-background-clip:text;
                            color:#f94343;
                            // -webkit-text-fill-color:transparent;
                            //     text-shadow:#e0721b 1px 0 0,#e0721b 0 1px 0,#e0721b -1px 0 0,#e0721b 0 -1px 0;

                            // -webkit-text-shadow:#e0721b 1px 0 0,#e0721b 0 1px 0,#e0721b -1px 0 0,#e0721b 0 -1px 0;

                            // -moz-text-shadow:#e0721b 1px 0 0,#e0721b 0 1px 0,#e0721b -1px 0 0,#e0721b 0 -1px 0;

                            // *filter: Glow(color=#e0721b, strength=1);
                            font-style: italic;
                            padding: 0 .2rem;
                            i{
                                font-size: 0.6em;
                                padding-left: 8px;
                                font-style: italic;
                            }
                        }
                        .long-num{
                            right: -2.4rem!important;
                        }
                        .long-bw{
                            right: -2rem!important;
                        }
                    }

                }
                .fadeInLeft {
                    display: flex;
                    animation-name: fadeInLeft;
                    -webkit-animation: fadeInLeft;
                    animation-duration: 2s !important;
                    -webkit-animation-duration: 2s !important;
                    animation-fill-mode: both !important;
                    -webkit-animation-fill-mode: both !important;
                }
                .fadeInHide{
                    display: flex;
                    animation-name: fadeInHide;
                    -webkit-animation: fadeInHide;
                    animation-duration: 1.5s !important;
                    -webkit-animation-duration: 1.5s !important;
                    animation-fill-mode: both !important;
                    -webkit-animation-fill-mode: both !important;
                }
                .fadeInShow{
                    display: flex;
                     opacity: 1;
                    -webkit-transform: translateY(-0); /* Safari */
                    transform: stranslateY(-0); /* 标准语法 */
                }
            }

            @keyframes fadeInLeft
            {
                0% {
                    opacity: 0;
                    -webkit-transform: translate(-1000px,0);
                    transform: stranslate(-1000px,0);
                }
                50% {
                    opacity:1;
                    -webkit-transform: translate(0,0);
                    transform: stranslate(0,0);
                }

                55%{
                    opacity: 1;
                    -webkit-transform: translateY(-0); /* Safari */
                    transform: stranslateY(-0); /* 标准语法 */
                }
                // 60%{
                //     opacity: 0.5;
                //     -webkit-transform: translateY(-10); /* Safari */
                //     transform: stranslateY(-10); /* 标准语法 */
                // }
                // 80% {
                //     opacity:0;
                //     -webkit-transform: translateY(-100px); /* Safari */
                //     transform: stranslateY(-100px); /* 标准语法 */
                // }
                // 100% {
                //     opacity:0;
                //     -webkit-transform: translateY(-100px); /* Safari */
                //     transform: stranslateY(-100px); /* 标准语法 */
                // }
            }
             @keyframes fadeInHide{
                  10%{
                    opacity: 0.5;
                    -webkit-transform: translateY(-10); /* Safari */
                    transform: stranslateY(-10); /* 标准语法 */
                }
                50% {
                    opacity:0;
                    -webkit-transform: translateY(-100px); /* Safari */
                    transform: stranslateY(-100px); /* 标准语法 */
                }
                100% {
                    opacity:0;
                    -webkit-transform: translateY(-100px); /* Safari */
                    transform: stranslateY(-100px); /* 标准语法 */
                }
             }
            @-webkit-keyframes fadeInLeft
            {
                0% {
                    opacity: 0;
                    -webkit-transform: translate(-1000px,0);
                    transform: stranslate(-1000px,0);
                }
                50% {
                    opacity:1;
                    -webkit-transform: translate(0,0);
                    transform: stranslate(0,0);
                }

                55%{
                    opacity: 1;
                    -webkit-transform: translateY(-0); /* Safari */
                    transform: stranslateY(-0); /* 标准语法 */
                }
                // 60%{
                //     opacity: 0.5;
                //     -webkit-transform: translateY(-10); /* Safari */
                //     transform: stranslateY(-10); /* 标准语法 */
                // }
                // 80% {
                //     opacity:0;
                //     -webkit-transform: translateY(-100px); /* Safari */
                //     transform: stranslateY(-100px); /* 标准语法 */
                // }
                // 100% {
                //     opacity:0;
                //     -webkit-transform: translateY(-100px); /* Safari */
                //     transform: stranslateY(-100px); /* 标准语法 */
                // }
            }


        }.active{
             /*background: url("")no-repeat;*/
             background-size: 100% 100%;
         }
        .video-wrap-noopen{
            height: auto;
        }
        /*切换信息*/
        .room-info-tab{
            position: absolute;
            width: 100%;
            max-width: 750px;
            min-width: 320px;
            color: #445779;
            font-size: .3rem;
            top: 6.7rem;
            background: #fff;
            z-index:20;
            border-radius: .2rem .2rem 0 0;
            overflow: hidden;
            .room-tab{
                width: 80%;
                overflow: hidden;
                border-bottom: 1px solid #efefef;
                li{
                    position: relative;
                    line-height: 1.1rem;
                    height: 1.1rem;
                    width: 35%;
                    float: left;
                    text-align: center;
                    
                    font-size: .38rem;
                    font-weight: 500;
                    span{
                        padding: .1rem .3rem;
                    }
                    &.active{
                        color: #445779;
                        font-weight: bold;
                        &:before{
                            position: absolute;
                            content: '';
                            width: 30%;
                            height: .1rem;
                            border-radius: 50px;
                            left: 50%;
                            transform: translateX(-50%);
                            bottom: 0;
                            background: #ff513e;
                        }

                    }
                }
                &.sprot-room-tab{
                    li{
                        &.active{
                            span{
                             background: #4C65E3;
                             color: #fff;
                             border-radius: .3rem 0 .3rem .3rem;
                        }
                           &:before{
                               background:none;
                           } 
                        }
                    }
                }
            }
            .focus-me{
                position: relative;
                height: 1.1rem;
                line-height: 1.1rem;
                width: 20%;
                padding-left: .9rem;
                font-weight: 500;
                color: #fff;
                font-size: .33rem;
                background: -webkit-linear-gradient(left,#ff3131,#ff8067);
                >i{
                    position: absolute;
                    top: 31%;
                    left: .4rem;
                    background: url("../../assets/images/chat/add.png") no-repeat;
                    width: .35rem;
                    height: .35rem;
                    display: inline-block;
                    background-size: contain;
                }
                &.active{
                    padding-left: 0;
                    text-align: center;
                    background: #efefef;
                    
                }
            }
            /*.img-box{*/
                /*width: .9rem;*/
                /*height: .9rem;*/
                /*!*margin-right: .2rem;*!*/
                /*margin-top: .12rem;*/
                /*border-radius: 50%;*/
                /*overflow: hidden;*/
            /*}*/
            /*.text{*/
                /*padding-left: .1rem;*/
                /*padding-top: .05rem;*/
            /*}*/
            /*>.fl{*/
                /*display: flex;*/
                /*flex: 5;*/
                /*flex-direction: row;*/
                /*text-align: left;*/
                /*h4{*/
                    /*!*margin-top: .1rem;*!*/
                    /*font-size: .3rem;*/
                    /*text-align: left;*/
                    /*padding-left: .1rem;*/
                /*}*/
                /*p{*/
                    /*i.online-num{*/
                        /*display: inline-block;*/
                        /*!*background: url("../../assets/images/chat/online_19.png") no-repeat;*!*/
                        /*!*width: .3rem;*!*/
                        /*!*height: .4rem;*!*/
                        /*!*background-size: contain;*!*/
                        /*!*margin-right: .1rem;*!*/
                    /*}*/
                    /*span:nth-child(2){*/
                        /*background:rgba(245,245,245,1);*/
                         /*text-align: left;*/
                        /*border-radius:15px;*/
                        /*!*height: 16px;*!*/
                        /*!*line-height: 16px;*!*/
                        /*display: inline-block;*/
                        /*padding: 0 .1rem;*/
                    /*}*/
                    /*span:nth-child(3){*/
                        /*padding:.04rem .15rem;*/
                        /*background:rgba(255,81,62,1);*/
                        /*color: #fff;*/
                        /*border-radius:15px;*/
                        /*>i{*/
                            /*font-size: .45rem;*/
                            /*position: relative;*/
                            /*top: .02rem;*/
                        /*}*/
                    /*}*/
                    /*margin-top: .1rem;*/

                /*}*/
                /*p>span{*/
                    /*color: #445779;*/
                    /*vertical-align: super;*/
                /*}*/
                /*img{*/
                    /*!*width: 1.2rem;*!*/
                    /*!*height: 1rem;*!*/
                    /*margin-right: .2rem;*/
                    /*!*width: auto;*!*/
                    /*height: 100%;*/
                /*}*/
            /*}*/
            /*>.fr{*/
                /*flex: 7;*/
                /*overflow-x: hidden;*/
                /*>span{*/
                    /*color: #fff;*/
                    /*background: #fb7299;*/
                    /*border-radius: .1rem;*/
                    /*padding:.1rem .22rem;*/
                    /*font-size: .38rem;*/
                    /*cursor: pointer;*/
                /*}*/
                /*>img{*/
                    /*width: 1rem;*/
                    /*height: .9rem;*/
                    /*border-radius: 50%;*/
                    /*float: left;*/
                /*}*/
                /*.img-box{*/
                    /*float: left;*/
                    /*width: .75rem;*/
                    /*height: .75rem;*/
                    /*!*padding: 0 .1rem;*!*/
                    /*margin: 0 .1rem;*/
                    /*img{*/
                        /*!*width: auto;*!*/
                        /*height: 100%;*/
                    /*}*/
                /*}*/
            /*}.active{*/
                  /*background: #f5f5f5 !important;*/
                  /*color: #666666!important;*/
             /*}*/
        }
        .hideVideoTab{
            top: 1.2rem !important;
        }
        .tab{
            display: flex;
            /*margin-top: 0.2rem;*/
            position: absolute;
            height: 1rem;
            line-height: 1rem;
            /*bottom: 11rem;*/
            /*top: 5.6rem;*/
            width: 100%;
            background: #fff;
            >span{
                display: flex;
                flex: 1;
                justify-content: center;
                color: #666;
                font-size: .4rem;
                >i{
                    padding: .1rem;
                }

            }.active{
                 color: #fb7299;
                 position: relative;
                 >i{
                     display: inline-block;
                     /*width: 1.2rem;*/
                     border-bottom: 2px solid #fb7299;
                 }
             }
        }

        /*通知*/
        .room-tz{
            position: absolute;
            top:7.8rem;
            width: 100%;
            max-width: 750px;
            min-width: 320px;
            background: #ebf0f6;
            height: .8rem;
            line-height: .8rem;
            color: #445779;
            .sy{
                display: inline-block;
                width: 1.1rem;
                height: .4rem;
                position: absolute;
                top: 50%;
                left: 2.6%;
                transform: translateY(-50%);
                background: url("../../assets/images/chat/syMsg.png") no-repeat;
                background-size:contain;
            }
            .msg-content{
                padding-left: 1.4rem;
            }

        }
        .room-tz-hide{
            top: 2.3rem!important;
        }

    }

    .chat-footer1{
        max-width: 750px;
        min-width: 320px;
        -webkit-touch-callout: none; /*系统默认菜单被禁用*/
        -webkit-user-select: none; /*webkit浏览器*/
        -khtml-user-select: none; /*早起浏览器*/
        -moz-user-select: none; /*火狐浏览器*/
        -ms-user-select: none; /*IE浏览器*/
        user-select: none; /*用户是否能够选中文本*/
        position: fixed!important;
        height: 1.2rem;
        background: #fff;
        width: 100%;
        // bottom: 0!important;
        /*background: #000;*/
        // z-index: 1;
        z-index: 1001;
        display: flex;
        display: -webkit-flex;
        padding: 0 .3rem;
        bottom: 0;
        left: 0;
        >div{
            display: flex;
            align-items: center;
        }

        .recharge-icon{
            // -webkit-box-flex:4;
            // -moz-box-flex:4;
            // -webkit-flex:4;
            // -ms-flex:4;
            flex: 4;
            justify-content: center;
            text-align: right;
            /*margin: 0 .1rem;*/
            >i{
                display: inline-block;
                width: .9rem;
                height: .9rem;
                background: url("../../assets/images/chat/red.png") right no-repeat;
                background-size: 59%;
            }
        }

        .recharge-icon.red{
            margin: 0;
            >i{
                background: url("../../assets/images/chat/12_05.png") right no-repeat;
                background-size: 64%;
            }.isF{
                background: url("../../assets/images/chat/recharge-first.png") right no-repeat;
                background-size: 90%;
            }
        }
        .recharge-icon.fish-icon{
            padding-top: .2rem;
            >i{
                background: url("../../assets/images/chat/fish.png") no-repeat;
                background-size: contain;
            }
        }
        .recharge-icon.guess-icon{
            margin-left: 0.1rem;
            // padding-top: .2rem;
            >i{
                background: url("../../assets/images/chat/jingcai-min.png") no-repeat;
                background-size: contain;
                width: 0.8rem;
                height: 0.8rem;
            }
        }
        .gift{
            flex: 2;
            justify-content: center;
            text-align: right;
            >i{
                display: inline-block;
                width: .9rem;
                height: .9rem;
                background: url("../../assets/images/chat/12_07.png") right no-repeat;
                background-size: 67%;
            }
        }
        .send-barrage{
            .say-input-box{
                position: relative;
                .emoj-box{
                    position: absolute;
                    right: .3rem;
                    top:.14rem;
                    background: url("../../assets/images/chat/em.png") no-repeat;
                    background-size: contain;
                    width: .55rem;
                    height: .55rem;
                }
            }
            .say-no-vip{
                color: #fff;
                background-color: #d7d6d6;
                height: .8rem;
                line-height: 0.8rem;
                justify-content: center;
                border-radius: .4rem;
                // background: #f9f9f9;
                // width: 6rem;
                width: 5.2rem;
                // 
                padding:0 .4rem;
                border-color: #e2e2e2;
                resize: none;
                outline: none;
                font-size: .33rem;
            }

        }
        .send-barrage,.send-barrage-view{
            >div:nth-child(1){
                position: relative;
                display: flex;
                flex: 13;
                >.barrage-input{
                    height: .8rem;
                    justify-content: center;
                    border-radius: .4rem;
                    background: #f9f9f9;
                    // width: 5.2rem;
                    width: 8rem;
                    
                    padding:0 .4rem;
                    border-color: #e2e2e2;
                    resize: none;
                    outline: none;
                    font-size: .33rem;
                }
                >img{
                    position: absolute;
                    width: .7rem;
                    right: .2rem;
                    top: .05rem;
                    -webkit-touch-callout: inherit!important;
                    pointer-events: inherit!important;
                }
            }
            >span{
                color: #445779;
                // width: 1.7rem;
                width: 2rem;
                text-align: center;
                font-size: .33rem;
                line-height: 1.2rem;
            }
            flex: 13;

        }
        .send-barrage-view{
            position: absolute;
            /*padding: .2rem 0;*/
            bottom: 0;
            width: 100%;
            background: #fff;
            >div:nth-child(1){
                >.barrage-input{
                    width: 8rem;
                    padding:.17rem .8rem 0 .4rem;
                }
            }
        }
    }.key{
         border-top: 1px solid #f7f7f7;
     }
    .gift-item{
        margin-bottom: .2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
            margin: 0 .1rem;
        }
        img{
            width: .8rem;
        }
        .username11{
            max-width:2.1rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    /*礼物列表*/
    .git-list-box-bg{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background:rgba(0,0,0,.5);
        /*backdrop-filter: blur(5px) brightness(100%);*/
        // z-index: 101;
        z-index: 1001;
        min-width: 320px;
        max-width: 750px;
    }.z{
         z-index: 1001;
     }
    .git-list-box{
        max-width: 750px;
        min-width: 320px;
        position: fixed;
        width: 100%;
        height: 8.5rem;
        bottom: 0;
        left: 0;
        padding: .3rem 0;
        background: #fff;
        // z-index: 101;
        z-index: 1001;
        border-top-left-radius: .22rem;
        border-top-right-radius: .22rem;
        .git-tab{
            /*overflow: hidden;*/
            >span{
                color: #445779;
                padding: 0 .4rem;
                font-size: .38rem;
                position: relative;
                text-align: center;
                font-weight: 500;
                padding-bottom: .2rem;
            }
            >span.active{
                color: #445779;
                font-weight: bold;
            }
            >span.active:after{
                content:'';
                color: #ff513e;
                width: .5rem;
                height: 4px;
                background: #ff513e;
                position: absolute;
                bottom: -.15rem;
                left: 50%;
                margin-left: -.25rem;
                border-radius: 20px;
            }

        }
        .git-item{
            float: left;
            width: 25%;
            text-align: center;
            margin-top: .05rem;
            font-size: .3rem;
            position: relative;
            p{
                line-height: .5rem;
            }
            &.active a{
                border: 2px solid #ff505d !important;
            }
            .git-icon{
                width: 1.2rem;
                height: 1.2rem;
                display: block;
                margin: 0 auto;
            }

            >a{
                display: inline-block;
                padding: .3rem .2rem;
                border-radius: 8px;
                border: 2px solid #fff;
            }
            .diamond{
                
                >img{
                    /*width: .25rem;*/
                    width: 10px;
                    height: 8px;
                }
            }
            i{
                position: absolute;
                background-color: red;
                padding: 0.08rem 0.12rem;
                line-height: 0.3rem;
                border-radius: 0.2rem;
                color: #fff;
                right: 0.4rem;
                top: 0.1rem;
            }
        }
        .git-bottom{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 1.25rem;
            line-height: 1.25rem;
            padding: 0 .3rem;
            font-size: .35rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #eee;
            z-index: 1001;
            .user-money{
                display: flex;
                align-items: center;
                font-weight: bold;
            }
            .send-container{
                background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                border-radius: 20px;
                height: 31px;
                line-height: 31px;
                .select-num{
                    color: #445779;
                    font-weight: 500;
                    background: #fff;
                    border-radius:20px 0 0 20px;
                    height: 27px;
                    line-height: 27px;
                    margin-top: 2px;
                    margin-left: 2px;
                    padding: 0 .3rem;
                    img{
                        margin-left:.1rem;
                        width: .25rem;
                        vertical-align: baseline;
                    }
                }
            }
            .send-git-btn{
                color: #fff;
                /*background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));*/
                /*border-radius:0 20px 20px 0;*/
                padding:0 .6rem;
            }
            img{
                width: .4rem;
                margin-right: .1rem;
            }
            .num-list{
                position: absolute;
                right: 13.3%;
                bottom: 1.25rem;
                z-index: 20;
                box-shadow:0px 0px 30px 0px rgba(0, 0, 0, 0.05);
                background: #fff;
                border-radius: 8px;
                li{
                    font-weight: 500;
                    margin:0 .6rem;
                    border-bottom: 1px solid #eee;
                    
                    line-height: 1rem;
                    &:last-of-type{
                        border-bottom: none;
                    }
                    .diamon-num{
                        font-weight: 500;
                        color: #ff513e;
                        padding-right: .3rem;
                    }
                }
                &:after{
                    position: absolute;
                    content: '';
                    bottom: -9px;
                    left: 50%;
                    transform: translateX(-50%);
                    width:0;
                    height:0;
                    border-left:11px solid transparent;
                    border-right:11px solid transparent;
                    border-top:12px solid #fff;
                }
            }
        }
    }


    /*送红包*/
    .send-red-box{
        position: absolute;
        width: 84%;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 0 0 .4rem 0;
        background: #fff;
        z-index: 1001;
        border-radius: 10px;
        overflow: hidden;
        .weui-cells{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .weui-cells__title{
            text-align: center;
            line-height: 1rem;
            font-size: .4rem;
            border: none;
        }
        .vux-no-group-title{
            margin-top: 0;
        }
        .red-box-title{
            /*<img src="" alt="">*/
            background: url("../../assets/images/chat/title.png") no-repeat center -2px;
            background-size: 100% 100%;
            height: 1.9rem;
            line-height: 1.9rem;
            margin-bottom: .65rem;
            color: #fff;
            text-align: center;
            font-size: .45rem;
            font-weight: bold;
            /*border-top-left-radius: 5px;*/
            /*border-top-right-radius: 5px;*/
        }
        .weui-btn{
            width: 77.7%;
            background: #FF513E;
            font-size: .38rem;
            margin: .65rem auto .4rem;
            border-radius: 30px;
            line-height: 1.09rem;
        }
        .weui-cell:before,.weui-cells:after,.weui-cells:before{
            border: none;
        }
        .weui-btn_primary:not(.weui-btn_disabled):active{
            background-color: #ff513e;
            color: #fff;
        }
        .weui-cell{
            /*border: 1px solid #e2e2e2;*/
            border-radius: .1rem;
            font-size: .38rem;
            width: 77.77%;
            margin: 0 auto .55rem;
            color: #445779;
            padding: .27rem .8rem .27rem .3rem;
            background: #F6F6F6;
            font-weight: 500;
        }
        .cong .weui-cell{
            padding: .27rem .38rem .27rem .3rem;
        }
        /*.weui-cell:last-of-type{*/
        /*padding: .27rem .3rem .27rem .3rem;*/
        /*}*/
        .weui-btn:after{
            border-radius: 30px;
        }
    }

    /*拆红包*/
    .show-cha-red{
        max-width: 750px;
        min-width: 320px;
        text-align: center;
        font-size: .4rem;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 58.6%;
        height: 8rem;
        // z-index: 1000;
        z-index: 1001;
        background: url("../../assets/images/chat/chb.png") no-repeat center;
        background-size: contain;
        color: #fff;
        p{
            position: absolute;
            width: 100%;
            top: 1.9rem;
            font-size: .47rem;
            letter-spacing: .02rem;
            left: 50%;
            transform: translateX(-50%);
            color: #FFE1BB;
            /*font-weight: bold;*/
        }
        .send-msg-noline{
            color: #ffe1bb;
            font-weight: bold;
            font-size: .35rem;
        }
        .chai{
            width: 2rem;
            height: 2rem;
            margin: 3rem auto;
        }
        .comfirm-btn{
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            position: absolute;
            bottom: -1.5rem;
            left: 50%;
            transform: translateX(-50%);
        }

        .comfirm-btn{
            color: #ff4e00;
            background: url("../../assets/images/chat/hb-ok-btn.png") no-repeat center;
            background-size: 60%;
            width: 15%;
            height: 1rem;
            line-height: .8rem;
            font-size: .37rem;
        }
    }

    /*显示右下角小红包*/
    .show-small-red{
        text-align: center;
        font-size: .3rem;
        position: fixed;
        right: 3%;
        bottom: 5.5rem;
        z-index: 80;
        width: 11%;
        height: 1.5rem;
        background: url("../../assets/images/chat/s_redpack.png") no-repeat;
        background-size: contain;
        -webkit-animation: shake 1s infinite linear;
        -o-animation: shake 1s infinite linear;
        animation: shake 1s infinite linear;
        p{
            position: absolute;
            width: 100%;
            bottom:.4rem;
            left: 50%;
            transform: translateX(-50%);
            font-weight: bold;
            color: #ff513e;
        }
    }

    /*红包金额*/
    .show-red-money{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1002;
        width: 7rem;
        height: 8rem;
        background:url("../../assets/images/chat/11_07.png")no-repeat center;
        background-size: contain;
        border-radius: 5px;
        padding: .5rem 0 0.8rem 0;
        text-align: center;
        color: #fff;
        font-size: .33rem;
        .red-money{
            color: #FF3340;
            font-weight: bold;
            font-size: .9rem;
            padding: .4rem 0 .1rem 0;
            i{
                font-size: .3rem;
                font-weight: 500;
            }
        }
        .send-user-name{
            color: #ffe1bb;
            padding: .2rem 0;
            font-size: .45rem;
            font-weight: bold;
        }
        .send-msg{
            color: #C38063;
            position: relative;
            font-size: .35rem;
            font-weight: 500;
        }
        .no-money-msg{
            color: #FFE1BB;
            font-size: .35rem;
            font-weight: 500;
            width: 75%;
            margin: 0 auto;
        }
        .send-msg::after{
            content:'';
            width: .65rem;
            height: 1px;
            background-color: #c38063;
            position: absolute;
            top: .2rem;
            left: 2rem;
        }
        .send-msg::before{
            content:'';
            width: .65rem;
            height: 1px;
            background-color: #c38063;
            position: absolute;
            top: .2rem;
            right: 2rem;
        }
        .send-user-img{
            /*background: #fff;*/
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #F3BC88;
            margin-top: .3rem;
        }
        >div{
            display: inline-block;
        }
        h3{
            color: #ffca3e;
            font-size: .5rem;
            font-weight: bold;
        }
        .no-tip{
            color: #fff;
            text-align: center;
            padding: .2rem 0;
            font-size: .3rem;
        }
        .comfirm-btn{
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            position: absolute;
            bottom: -1.5rem;
            left: 50%;
            transform: translateX(-50%);
        }

        .comfirm-btn{
            color: #ff4e00;
            background: url("../../assets/images/chat/hb-ok-btn.png") no-repeat center;
            background-size: 60%;
            width: 15%;
            height: 1rem;
            line-height: .8rem;
            font-size: .37rem;
        }
        /*p:nth-last-child(1){*/
        /*color: #f39a85;*/
        /*}*/
        .send-msg-noline{
            color: #ffe1bb;
            font-weight: bold;
            font-size: .35rem;
            width: 75%;
            margin: 0 auto;
        }
        >img{
            width: 1rem;
            position: absolute;
            top: -1.2rem;
            right: 1.5rem;
        }
    }
    .show-red-money.no{
        background:url("../../assets/images/chat/11_07.png")no-repeat center;
        background-size: contain;
        width: 7rem;
        padding-top: .7rem;
        h3{
            color: #C38063;
            font-size: .4rem;
            font-weight: 500;
        }
        .no-tip{
            font-size: .38rem;
            font-weight: 500;
            color: #C38063;
        }
        .comfirm-btn{
            color: #ff4e00;
            background: url("../../assets/images/chat/hb-ok-btn.png") no-repeat center;
            background-size: 60%;
            width: 15%;
            height: 1rem;
            line-height: .8rem;
            font-size: .37rem;
        }
    }


    .xgplayer-skin-default .xgplayer-poster{
        z-index: 1!important;
    }


    .success-box-container{
        z-index: 101;
    }
    .chat-key{
        z-index: 100;
        background: #fff;
        border-radius: 10px 10px 0 0;
        text-align: center;
        padding: .3rem 0 0 0;
        .key-content{
            background: #d0d3dc;
            overflow: hidden;
            padding: .2rem;
        }
        .error-tip{
            color: #FF513E;
            font-weight: 500;
            font-size: .3rem;
            padding: 0.2rem .8rem;
            text-align: left;
        }
        .title{
            font-size: .4rem;
            font-weight: bold;
            position: relative;
            .remove-icon{
                position: absolute;
                display: inline-block;
                right: 5.3%;
                top: .05rem;
                width: .4rem;
                height: .4rem;
                background: url("../../assets/images/member/close.png") no-repeat center;
                background-size: 70%;

            }
        }
        .pwd-box{
            margin: .3rem 0 0 0;
        }
        .contact{
            color: #ff3437;
            text-decoration: underline;
            padding-bottom: .1rem;
        }
        .contact-tip{
            
            line-height: 1.35rem;
        }
    }


    .pwd-box,.pwd-re-box{
        text-align: center;
        >span{
            display: inline-block;
            border-radius: 5px;
            width: 1rem;
            height: 1rem;
            background: #f5f5f5;
            margin-right: .4rem;
            i{
                width: .26rem;
                height: .26rem;
                background: #f5f5f5;
                border-radius: 50%;
                display: inline-block;
                margin-top: .35rem;
            }
            i.active{
                background: #666;
            }
            &:last-of-type{
                margin: 0;
            }
        }
    }
    .key-box-bg{
        position: fixed;
        background: rgba(0,0,0,.4);
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99;
        min-width: 320px;
        max-width: 750px;
    }
    .send-input{
        position: relative;
        i{
            position: absolute;
            right: 1.3rem;
            top:.3rem;
            font-size: .35rem;
        }
    }
    .chat-key-bg{
        z-index: 1000;
    }
    .chat-key{
        z-index: 1001;
    }
    .chat-pwd-success{
        z-index: 1002;
    }

    .send-mess{
        i{
            color: #fff!important;
            font-size: 0.3rem !important;
            background: #4C65E3;
            padding: 0.15rem 0.3rem;
            border-radius: 20px;
        }

    }
	.prohibit-box{
		padding: 0.4rem 0.8rem;
		.title{font-size: 15px;font-weight: bold;}
		.item-box{
			padding: 0.46rem 0.2rem;display: flex;
			.timeItem{
				// display: flex;
				// align-items: center;
				i{display: inline-block;width: 0.4rem;height: 0.4rem;background: url(../../assets/images/chat/wxzyh@3x.png) no-repeat;background-size: 100% 100%;float: left;margin-top: 0.02rem;margin-right: 0.08rem;}
			}
			
		}
	}
    @media screen and (min-width: 750px) {
        .send-red-box{
            width: 550px;
            left: 40%;
        }
        .show-cha-red,.show-red-money{
            left: 40%;
        }
        .fish-game{
            top: 8rem;
        }
        .live-room .room-info-tab{
            top:6.4rem;
            
        
        }
        .live-room .room-tz{
            top:7.5rem;
            z-index:10
        }
    }
    .goucai-btn{
    position: absolute;
    width: 0.933rem;
    height: 0.933rem;
    bottom: 1.5rem;
    right: 0.4rem;
    background: url(../../assets/images/buy-icon.png) no-repeat;
    background-size: 100% 100%;
    z-index: 9;
    }
    @media screen and (min-width: 410px) {
        .fish-game{
            /*top: 7.8rem;*/
        }
    }

    @media screen and (max-width: 320px) {
        .live-room .video-wrap > .video-box{
            height: 5.6rem;
        }
        .live-room .room-info{
            padding: 0 0 0.1rem 0.3rem;
            margin: -.1rem 0 0 0;
        }
        .fish-game{
            top: 8.3rem;
        }
    }
    @-webkit-keyframes shake {
        10% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        15% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        20% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        25% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        30% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        35% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        40% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        45% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        50%,
        100% {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg);
        }
    }
    @-ms-keyframes shake {
        10% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        15% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        20% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        25% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        30% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        35% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        40% {
            transform: rotate(10deg);
            -ms-transform: rotate(10deg);
        }
        45% {
            transform: rotate(-10deg);
            -ms-transform: rotate(-10deg);
        }
        50%,
        100% {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg);
        }
    }

 
     .buyCai,.qiPai,.active-icon{
       position: fixed;
        bottom: 1.4rem;
        // z-index: 50;
        z-index: 1000;
        right: 0.3rem;
            img{
                width:1rem;
            }
        }
    .qiPai{
      bottom:2.7rem;
    }
    .active-icon{
        bottom:2.6rem;
    }
    .dzp-icon{
        bottom:4rem;
    }

    .teach{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10000000001;
        .img1{
               width: 4rem;
                position: absolute;
                bottom: 5rem;
                left: 3rem;
        }
        .img2{
            width: 2rem;
            position: absolute;
            bottom: 3rem;
            left: 7.5rem;
        }
    }
    .footChat{
        position: absolute;
        bottom: 0;
        height: 1.2rem;
        background: #fff;
        line-height: 1.2rem;
        width: 100%;
        text-align: center;
        color: #bdbdbd;
    }


    .preview-container {
  // padding-top: 0.25rem;
  .loading-tip,
  .no-data {
    font-size: 0.35rem;
    
    text-align: center;
    padding-top: 0.3rem;
    img{
      display: block;
       width: 5.3rem;
       margin: 0 auto;
       padding-bottom: 0.5rem;
    }
  }
  .no-data {
    padding-top: 2rem;
  }
  margin: 0 2.6%;
  .one-item {
    > h4 {
      // margin-top: .25rem;
      padding-top: 0.25rem;
      
      font-size: 0.35rem;
      i {
        letter-spacing: 2px;
      }
    }
    .preview-list-box {
      li {
        float: left;
        width: 48.7%;
        background: #fff;
        border-radius: 5px;
        padding: 0.25rem 0.5rem;
        margin: 0.25rem 2.6% 0 0;
        position: relative;
        .hot-icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 1.05rem;
          height: 0.5rem;
        }
        .hot-icon1 {
          background: url("../../assets/images/main/No.1.png") no-repeat;
          background-size: contain;
        }
        .hot-icon2 {
          background: url("../../assets/images/main/No.2.png") no-repeat;
          background-size: contain;
        }
        .hot-icon3 {
          background: url("../../assets/images/main/No.3.png") no-repeat;
          background-size: contain;
        }
        &:nth-of-type(2n) {
          margin: 0.25rem 0 0 0;
        }
        .host-img {
          width: 1.1rem;
          height: 1.1rem;
          margin-right: 0.25rem;
          margin-top: 0.15rem;
          position: relative;
          .host-img-new{
            width: 1.1rem;
            height: 1.1rem;
            position: relative;
            z-index: 50;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            // margin-top: 0.15rem;
          }
        }
        .host-name {
         font-size: 0.35rem;
          font-weight: bold;
          max-width: 1.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .lottery-name {
          font-size: 0.35rem;
          
        }
        .play-time {
          font-size: 0.35rem;
          font-weight: bold;
        }
        .focus-btn {
          position: absolute;
          width: 0.65rem;
          height: 0.45rem;
          right: 0.2rem;
          top: 0.2rem;
          border-radius: 20px;
          &.no-focus {
            background: url("../../assets/images/chat/add.png") #ff513e center
              no-repeat;
            background-size: 50%;
          }
          &.focus {
            background: url("../../assets/images/chat/yiguanzhu@2x-min (1).png") #eee center
              no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
}
  .circle {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    // border: 6px solid #ff2727;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    background: #ff2727;
    // opacity: 0.3;
    // right: 0.75rem;
    // text-align: center;
    // top: 3.18rem;
    // width: calc(100% - 6px);
    // height: calc(100% - 6px);
    // border-color:#ff2727; 
    &:nth-child(1) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
    }
    &:nth-child(2) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.9s;
      -webkit-animation-delay: 0.9s;
      -o-animation-delay: 0.9s;
      -moz-animation-delay: 0.9s;
      -ms-animation-delay: 0.9s;
    }
    &:nth-child(3) {
      animation: circle-opacity 0.6s linear infinite;
      -webkit-animation: circle-opacity 0.6s linear infinite;
      -moz-animation: circle-opacity 0.6s linear infinite;
      -o-animation: circle-opacity 0.6s linear infinite;
      -ms-animation: circle-opacity 0.6s linear infinite;
      animation-delay: 0.6s;
      -webkit-animation-delay: 0.6s;
      -o-animation-delay: 0.6s;
      -moz-animation-delay: 0.6s;
      -ms-animation-delay: 0.6s;
    }

    @keyframes circle-opacity {
      from {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-o-keyframes circle-opacity {
      from  {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
     to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-moz-keyframes circle-opacity {
      from  {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
    @-webkit-keyframes circle-opacity {
      from {
        border: 1.5px solid #ff2727;
        opacity: 0.6;
        -webkit-transform: scale(1.08);
        -o-transform: scale(1.08);
        -moz-transform: scale(1.08);
        -ms-transform: scale(1.08);
        transform: scale(1.08);
        // border-width:5px;
      }
      to {
        border: 1.5px solid #ff2727;
        opacity: 0;
        -webkit-transform: scale(1.3);
        -o-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
      }
    }
  }
  .guessing{
    position: static;
    margin-top: 6.7rem;
    bottom: 0;
    // z-index: 999;
    z-index: 1500;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .shouqi{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    //   top:6.45rem;
      width: 30.26667%;
      height: 0.35rem;
        z-index: 1000;
      background: url('../../assets/images/chat/shouqi-min.png') no-repeat;
      background-size: contain;
    }
    .guess-fot{
        position: fixed;
        z-index: 100;
        bottom: 0;
        left: 0;
    }
  }
    .showuser-In{
        >span{
            text-align: center;
            
            width: 100%;
            position: fixed;
            bottom:1.4rem;
            left:50%;
            transform:translateX(-50%);
            z-index: 2
        }
    }


    .chat-sport{
        background: url('../../assets/images/chat/sport-bg.png') no-repeat top;
        background-size: contain;
    }
    .sport-top{
        position: relative;
        .rem(padding-top,50);
        .back{
            .rem(width,14);
            position: absolute;
            .rem(top,70); 
            .rem(left,20); 
        }
        .top-main{
            .rem(width,481);
            .rem(height,180);
            .rem(font-size,24);
            color: #fff;
            background: url('../../assets/images/chat/top-bg.png') no-repeat top;
            margin: 0 auto;
            .title{
                .rem(height,40);
                text-align: center;
                background: #4c65e3;
                border-radius: 10px 10px 0 0;
            }
            .name-content{
                .name{
                    text-align: center;
                    .rem(margin-top,30);
                    .icon{
                        display: block;
                        .rem(width,50);
                        .rem(height,50);
                        margin: 0 auto;
                        .rem(margin-bottom,20);
                    }
                    &:first-of-type{
                        // .rem(margin-left,5);
                    }
                }
                .num{
                    .rem(font-size,20);
                    text-align: center;
                    .rem(margin-top,17);
                    strong{
                        display: block;
                        .rem(font-size,36);
                    }
                }
                
            }
        }
    }

    .team-box{
        // background: #ECEFF6;
        .rem(font-size,24);
        // padding-top: 1px;
        .title-tab{
            color: #4C65E3;
            overflow: hidden;
            span{
                width: 50%;
                .rem(line-height,68);
                float: left;
                text-align: center;
                &.active{
                    color: #666;
                    background: #fff;
                }
            }
        }
        .team-info{
            .rem(padding,20);
            color: #666;
        }
    }
</style>