<template>
    <div class="newHome">
        <Header_download v-if="lanCode != 2"></Header_download>
        <header class="newhome-header" :class="[{ header: skin == 0 }, { 'header-pink': skin == 1 }, { 'header-blue': skin == 2 },
        { 'header-green': skin == 3 }, { 'header-maingreen': skin == 4 }]">
            <!--切换版本  -->
            <!-- <div class="backToOld" @click="changeVersion">Quay lại phiên bản cũ</div> -->
            <img src="../../assets/images/newLogo.png" v-if="noticeType == 1" alt="" style="width: 3.3rem;">
            <img src="../../assets/images/newLogoDl.png" v-if="noticeType == 2" alt="" style="width: 3.3rem;">
            <span style="margin-left:auto;" v-if="!codeToken && noticeType == 1" @click="$router.push({ path: '/register' })">
                Đăng ký
            </span>
            <span style="margin-left:auto;" v-if="!codeToken && noticeType == 2" @click="$router.push({ path: '/registerDl' })">
                Đăng ký
            </span>
            <span v-if="!codeToken" @click="$router.push({ path: '/login' })">
                Đăng nhập
            </span>
            <div class="logo-info" v-if="codeToken != ''" @click="$router.push({ path: '/member' })">
                <div>
                    <p style="font-size: 0.37rem;">{{ userinfo.nickname }}</p>
                    <p>ID:{{ userinfo.id }}</p>
                </div>
                <img :src="userinfo.avatar" alt="" srcset="">
            </div>
        </header>
        <myScroll ref="shareScroll" :top="scrollTop" :bottom="1.2" :bgColor="'fbfbff'">
            <div class="banner">
                <!-- 切换版本 回到新版本 -->
                <div class="toOldversion" @click="changeVersion">
                    <img src="../../assets/images/newHome/ToOld.png" alt />
                </div>
                <swiper :aspect-ratio="350 / 800" :auto="true" :loop="true">
                    <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
                        <!-- <img :src="item.image_url"> -->
                        <div @click="goUrl(item.url, item.title)" v-if="item.url">
                            <img :src="item.image_url" alt />
                        </div>
                        <div v-else>
                            <img :src="item.image_url" alt />
                        </div>
                    </swiper-item>
                </swiper>
            </div>
            <div class="notice-box notice-box-pt"
                :class="[{ 'notice-pink': skin == 1 }, { 'notice-blue': skin == 2 }, { 'notice-green': skin == 3 }, { 'notice-maingreen': skin == 4 }]">
                <marquee scrollAmount="3" scrolldelay="50" direction="left">
                    <span v-if="notice.length <= 0">no data</span>
                    <span v-for="(v, index) in notice" :key="index"
                        @click="$router.push({ path: '/msgDetail', query: { msg_id: v.id } })">{{ index + 1 }}.{{ v.content }}&nbsp;&nbsp;&nbsp;</span>


                </marquee>
                <div class="online-box">
                    <span>Đang onl: {{ onlinenumber }}</span>
                </div>
            </div>
            <div class="game-menu" v-show="gameListData.length">
                <div class="swiper-container">
                    <ul class="swiper-wrapper">
                        <li v-for="(item, index) in gameListData" class="swiper-slide" :key="index"
                            @click="changeMenu(index)">
                            <img v-if="index == homeNewShow" :src="item.icon1" alt="" srcset="">
                            <img v-else :src="item.icon" alt="" srcset="">
                        </li>
                        <li class="swiper-slide" @click="$router.push('/live')">

                            <img v-if="skin == 3" src="../../assets/images/skin/green/live-2.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/live-2.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/live-2.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/live-2.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/live-2.png" alt="" srcset="">
                        </li>
                        <li class="swiper-slide" @click="download">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/xiazai-1.png" alt="" srcset="">
                        </li>
                    </ul>
                </div>
                <i class="menu-jt" :class="{ gray: menuIndex == 0 }" @click='toleft'
                    style="left:0;transform: rotate(180deg);top: 0.4rem;">
                    <img v-if="skin == 4 || skin == 3" src="../../assets/images/newHome/jt_icon.png" alt="" srcset="">
                    <img v-if="skin == 0" src="../../assets/images/newHome/jt_icon-2.png" alt="" srcset="">
                    <img v-if="skin == 1" src="../../assets/images/newHome/jt_icon-3.png" alt="" srcset="">
                    <img v-if="skin == 2" src="../../assets/images/newHome/jt_icon-4.png" alt="" srcset="">
                </i>
                <i class="menu-jt" :class="{ gray: menuIndex == 2 }" @click='toright' style="right:0;">
                    <img v-if="skin == 4 || skin == 3" src="../../assets/images/newHome/jt_icon.png" alt="" srcset="">
                    <img v-if="skin == 0" src="../../assets/images/newHome/jt_icon-2.png" alt="" srcset="">
                    <img v-if="skin == 1" src="../../assets/images/newHome/jt_icon-3.png" alt="" srcset="">
                    <img v-if="skin == 2" src="../../assets/images/newHome/jt_icon-4.png" alt="" srcset="">
                </i>
            </div>
            <div v-show="homeNewShow == -1">
                <div class="module-title"
                    :class="[{ 'module-title-pink': skin == 1 }, { 'module-title-blue': skin == 2 }, { 'module-title-green': skin == 3 }, { 'module-title-maingreen': skin == 4 }]">
                    <h2>TIN TửC HOT</h2>
                </div>
                <div class="shortcut">

                    <div class="shortcut-item" v-if="homeNewShow == -1">
                        <ul class="swiper-wrapper"
                            :class="[{ 'color-pink': skin == 1 }, { 'color-blue': skin == 2 }, { 'color-green': skin == 3 }, { 'color-maingreen': skin == 4 }]"
                            ref="swiperShortcut">
                            <li @click="$router.push('recharge')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 14.png" alt="" srcset="">
                                <p>Nạp tiền</p>
                            </li>
                            <li @click="$router.push('tx')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 15.png" alt="" srcset="">
                                <p>Rút tiền</p>
                            </li>
                            <li @click="$router.push('wallet')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 16.png" alt="" srcset="">
                                <p>Chuyển đổi</p>
                            </li>
                            <li @click="$router.push('messageCenter')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 17.png" alt="" srcset="">
                                <p>Thông tin </p>
                            </li>
                            <li @click="$router.push('vip')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 18.png" alt="" srcset="">
                                <p>VIP</p>
                            </li>
                            <li @click="$router.push('invite')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 19.png" alt="" srcset="">
                                <p>Quảng bá</p>
                            </li>
                            <li @click="$router.push('invite')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 20.png" alt="" srcset="">
                                <p>Đại lý</p>
                            </li>
                            <li @click="showCs()" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 21.png" alt="" srcset="">
                                <p>Kiểm tra</p>
                            </li>
                            <!-- <li class="active swiper-slide"  @click="$router.push('vip')" > 
                            <img src="../../assets/images/newHome/Vector-1.png" alt="" srcset="">
                            <span>VIP</span>
                            </li>
                        <li @click="$router.push('wallet')" class="swiper-slide">
                             <img v-if="skin==4||skin==3" src="../../assets/images/newHome/Vector-3.png" alt="" srcset="">
                             <img v-if="skin==0"  src="../../assets/images/newHome/66.png" alt="" srcset="">
                              <img v-if="skin==1"  src="../../assets/images/skin/pink/33.png" alt="" srcset="">
                              <img v-if="skin==2"  src="../../assets/images/skin/blue/3.png" alt="" srcset="">
                            <span>Chuyển đổi</span>
                        </li>
                        <li @click="$router.push('recharge')" class="swiper-slide">
                             <img v-if="skin==4||skin==3" src="../../assets/images/newHome/Vector-2.png" alt="" srcset="">
                             <img v-if="skin==0" src="../../assets/images/newHome/Vector_1.png" alt="" srcset="">

                             <img v-if="skin==1" src="../../assets/images/skin/pink/11.png" alt="" srcset="">
                             <img v-if="skin==2" src="../../assets/images/skin/blue/5.png" alt="" srcset="">
                            <span>Tiền nạp</span>
                        </li>
                        <li @click="$router.push('tx')" class="swiper-slide">
                             <img v-if="skin==4||skin==3" src="../../assets/images/skin/green/tx_icon.png" alt="" srcset="">
                             <img v-if="skin==0" src="../../assets/images/newHome/tx_icon.png" alt="" srcset="">

                             <img v-if="skin==1" src="../../assets/images/skin/pink/tx_icon.png" alt="" srcset="">
                             <img v-if="skin==2" src="../../assets/images/skin/blue/tx_icon.png" alt="" srcset="">
                            <span>Rút tiền</span>
                        </li> -->
                        </ul>
                        <div class="swiper-pagination-shortcut" style="text-align: center;">

                        </div>
                    </div>

                </div>
                <div class="information">
                    <!-- <myScroll ref="shareScroll" :top="10.5"  :bottom="1.2" :bgColor="'fff'"> -->
                    <!-- <ul>
                <li v-for="(item,index) in information" :key="index" @click="toNews(item)">
                    <img :src="item.image" alt="" srcset="">
                </li>
                
            </ul> -->
                    <!-- 写死版本 -->
                    <ul>
                        <li @click="toLottery(1, 'Miền Bắc', '')">
                            <img v-if="skin == 0" src="../../assets/images/newHome/cp.png" alt="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/maingreencp.png" alt="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/pinkcp.png" alt="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/bluecp.png" alt="">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/greencp.png" alt="">


                        </li>
                        <li @click="goQp2('ibc_sport', 'sport', 0)">
                            <img v-if="skin == 0" src="../../assets/images/newHome/zq.png" alt="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/maingreenzq.png" alt="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/pinkzq.png" alt="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/bluezq.png" alt="">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/greenzq.png" alt="">

                        </li>
                        <li @click="goQp2('ae_slot', 'slot', 0)">
                            <img v-if="skin == 0" src="../../assets/images/newHome/cdx.png" alt="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/maingreencdx.png" alt="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/pinkcdx.png" alt="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/bluecdx.png" alt="">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/greencdx.png" alt="">

                        </li>
                        <li @click="goQp2('s128_cock', 'cock', 0)">
                            <img v-if="skin == 0" src="../../assets/images/newHome/dj.png" alt="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/maingreendj.png" alt="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/pinkdj.png" alt="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/bluedj.png" alt="">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/greendj.png" alt="">

                        </li>
                    </ul>
                    <!-- </myScroll> -->
                </div>
            </div>
            <div v-show="homeNewShow != -1">
                <div v-if="gameListMenu.length && lotteryGames.length">
                    <div class="game-type">
                        <div class="swiper-containertype">
                            <ul class="swiper-wrapper"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }]">
                                <li v-for="(item, index) in gameListMenu" class="swiper-slide"
                                    :class="[{ 'active': gameTypeIndex == index && skin == 0 }, { 'active-pink': gameTypeIndex == index && skin == 1 }, { 'active-blue': gameTypeIndex == index && skin == 2 }, { 'active-green': gameTypeIndex == index && skin == 3 }, { 'active-maingreen': gameTypeIndex == index && skin == 4 }]"
                                    :key="index" @click="gameTypeIndex = index; nav2Active = 'Tất cả'; lgIndex = 0">
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                            <div class="swiper-paginationtype" v-show="gameListMenu.length > 5" style="text-align: center;"
                                ref="pagination">

                            </div>
                        </div>
                    </div>
                    <div class="game-type" style="margin-top: 0.5rem"
                        v-show="gameListMenu[gameTypeIndex].code == 'lg_lottery'">
                        <div class="swiper-containertypetwo">
                            <ul class="swiper-wrapper"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }]"
                                ref="swiperMenu">
                                <li v-for="(item, index) in lotteryGames" class="swiper-slide swiper-no-swiping"
                                    :class="[{ 'active': lgIndex == index && skin == 0 }, { 'active-pink': lgIndex == index && skin == 1 }, { 'active-blue': lgIndex == index && skin == 2 }, { 'active-green': lgIndex == index && skin == 3 }, { 'active-maingreen': lgIndex == index && skin == 4 }]"
                                    :key="index" @click="lgIndex = index; nav2Active = 'Tất cả'">
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="game-list" v-if="gameListMenu[gameTypeIndex].code == 'lg_lottery'"
                        :class="[{ 'game-list-pink': skin == 1 }, { 'game-list-blue': skin == 2 }, { 'game-list-green': skin == 3 }, { 'game-list-maingreen': skin == 4 }]">
                        <!-- <myScroll ref="shareScroll" :top="10"  :bottom="1.2" :bgColor="'fbfbff'"> -->
                        <div class="cp-select" v-if="homeNewShow == 0">
                            <span :class="nav2Active == item ? 'active' : ''" v-for="(item, index) in nav2" :key="index"
                                @click="nav2Active = item">{{ item }}</span>
                        </div>
                        <!--  -->
                        <ul v-if="nav2Active == 'Tất cả'">
                            <li v-for="(item2, index2) in lotteryGames[lgIndex].allGame"
                                @click="toLottery(item2.code, item2.name, item2.remark)" :key="index2">
                                <img :src="item2.img" alt="" srcset="">
                                <p>{{ item2.name }} </p>
                            </li>
                        </ul>
                        <ul v-if="nav2Active == item1.name" v-for="(item1, index1) in lotteryGames[lgIndex].list"
                            :key="index1">
                            <li v-for="(item2, index2) in item1.list" :key="index2 + 'i'"
                                @click="toLottery(item2.code, item2.name, item2.remark)">
                                <img :src="item2.img" alt="" srcset="">
                                <p>{{ item2.name }} </p>
                            </li>
                        </ul>
                        <!-- </myScroll> -->
                    </div>
                    <div class="game-list" v-else>
                        <ul>
                            <li @click="goQp(item)" v-for="(item, index) in gameListMenu[gameTypeIndex].list"
                                v-if="index < 101">
                                <img v-lazy="item.img" alt="">
                                <p>{{ item.name }} </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </myScroll>
        <div class="main-cs" v-if="isCs">
            <p class="address">{{ $t('home.text[1]') }}</p>
            <myScroll :top='scrollTop' :left='0' :bottom='1.4' :bgColor="$st.state.skin == 5 ? '161C23' : 'fff'" ref="csScroll">
                <div class="list">
                    <!-- 延迟高低区分： 50以上高
                ms≤500绿色
                500<ms<1000黄色
                ms≥1000红色 -->
                    <div class="item zg" v-for="v, index in lineList" :key="index"
                        :class="[{ 'green': v.speed <= 500 }, { 'yellow': v.speed < 1000 && v.speed > 500 }, { 'red': v.speed >= 1000 }]"
                        @click="goUrl(v.url)">
                        <div class="left">
                            <img v-show="v.speed < 1000 && v.speed > 500" src="../../assets/images/zg.png" alt="">
                            <img v-show="v.speed <= 500" src="../../assets/images/zd.png" alt="">
                            <img v-show="v.speed >= 1000" src="../../assets/images/zg1.png" alt="">
                            <span>{{ v.speed }}ms</span>
                        </div>
                        <div class="cen" :class="skin == 5 ? 'golden-text-color' : ''">{{ v.url }}</div>
                        <div class="rig">
                            <span>{{ v.speed > 500 ? $t('home.text[3]') : $t('home.text[4]') }}</span>
                            <img src="../../assets/images/jt.png" alt="">
                        </div>
                    </div>




                </div>
            </myScroll>

            <div class="submit-btn"
                :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-maingreen': skin == 4 }, { 'skin-btn-golden': skin == 5 }]"
                @click="onConfirmCs">{{ $t('home.text[2]') }}</div>
            <div style="position: fixed;bottom: 1.6rem;z-index: 9;width: 1rem;left: 45%;" @click="isCs = false">
                <img src="../../assets/images/close-zc.png" alt="" srcset="">
            </div>
        </div>
        <Foot />
    </div>
</template>
<script>
import Swiperc from "swiper"
import { Swiper, SwiperItem } from 'vux'
import { mapState, mapMutations } from "vuex";
import Header_download from '../../components/header_download.vue';
import Foot from "../../components/footer.vue";
export default {
    name: 'newHome',
    components: { Swiper, SwiperItem, Header_download, Foot },
    data() {
        return {
            menuIndex: 0,
            playList: {},
            bannerList: [],
            notice: [],
            onlinenumber: 231,
            gameListData: [],
            gameListMenu: [],
            scrollTop: 0,
            nav2: ['Tất cả', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            nav2Active: 'Tất cả',
            gameType: [],
            gameTypeIndex: 0,
            swiper1: null,
            lotteryGames: [],
            allGamesList: [],
            information: [],
            lgIndex: 0,
            swiper2: '',
            onlineInter: null,
            isCs: false,
            lineList: [],

        }
    },
    computed: {
        ...mapState([
            "codeToken",
            "avatar",
            "userinfo",
            "skin",
            "isTask",
            "webInitData",
            "homeTabNav",
            "openPure2",
            "isDownLoad",
            "homeNewShow",
            "homeNewData",
            "lanCode"
        ])
    },
    watch: {
        homeNewShow: function (m) {
            this.gameTypeIndex = 0
            if (m > -1) {
                // if(m==0){
                //     this.gameListMenu=this.lotteryGames
                // }else{
                this.gameListMenu = this.gameListData[m].list
                // }
                this.initSwiper()

            } else {
                this.$nextTick(function () {
                    this.swiper2 = new Swiperc('.shortcut-item', {
                        paginationClickable: true,
                        spaceBetween: 6,
                        slidesPerView: 7,
                        pagination: {
                            el: '.swiper-pagination-shortcut',
                            type: 'bullets',
                        },
                    });
                })
                // this.swiper2.slidePrev()
            }

        },
        isDownLoad: function (n) {
            this.scrollTop = this.$store.state.isDownLoad ? 3 : 1.2
        },
        'skin': function () {
            this.getGame(true);
        }
    },
    created() {
        this.getInit()
        if (this.lanCode != 2) {
            this.scrollTop = this.$store.state.isDownLoad ? 3 : 1.2
        } else {
            this.scrollTop = 1.4
        }
        this.getOnline()
        clearInterval(this.onlineInter)
        this.onlineInter = setInterval(() => {
            this.getOnline()
        }, 6000);
        this.getBanner()
        this.getNotice()

        this.getInformation()
    },
    mounted() {
        this.getGame()
        this.$nextTick(function () {
            this.swiper2 = new Swiperc('.shortcut-item', {
                paginationClickable: true,
                spaceBetween: 6,
                slidesPerView: 7,
                pagination: {
                    el: '.swiper-pagination-shortcut',
                    type: 'bullets',
                },
            });
        })
    },
    beforeDestroy() {
        clearInterval(this.onlineInter)
    },
    methods: {
        ...mapMutations(["SETBANNER_S", "SETUSERTOKEN", "SETNEWSHOW", "SETHOMENEWDATA", "SETVERSION"]),
        changeVersion() {
            this.SETVERSION(2);
            this.$router.push('/oldHome');
        },
        getInit() {
            if (this.noticeType == 1) {
                // this.getNotice();//获取官方滚动公告
                this.getcsLink();
            } else {
                //  this.getSystemNoticeDl();//获取代理滚动公告
                this.getcsLinkDl();
            }
        },
        showCs() {
            this.isCs = !this.isCs;
            if (this.isCs) {
                for (let i = 0, len = this.lineList.length; i < len; i++) {
                    this.ping(this.lineList[i].url, i)
                }
            }
        },
        ping(url, i) {
            var responseTime, requestTime, ping;
            requestTime = new Date().getTime();
            this.$http.get(url).then(res => {
                responseTime = new Date().getTime();
                // console.log(responseTime)
                ping = Math.abs(requestTime - responseTime);
                this.lineList[i].speed = ping;
            });

        },
        onConfirmCs() {
            for (let i = 0, len = this.lineList.length; i < len; i++) {
                this.ping(this.lineList[i].url, i)
            }
        },
        async getcsLink() {
            let res = await this.$http.get("/api/common/get_datas");
            if (res && res.data.code == 1) {
                let cslink = res.data.data.line;
                for (let i = 0, len = cslink.length; i < len; i++) {
                    this.lineList.push({
                        url: cslink[i],
                        tit: this.$t('home.text[6]') + (i + 1),
                        speed: 50 * 10,
                    });
                }
                // this.lineList.push({
                //      url:' https://www.baidu.com/',
                //         tit: this.$t('home.text[6]'),
                //         speed: 50*10,
                // })

                for (let i = 0, len = cslink.length; i < len; i++) {
                    if (cslink[i]) {
                        this.isLink = true
                    }
                    return
                }
            }
        },
        async getcsLinkDl() {
            let res = await this.$http.get("/api/common/get_datas_dl");
            if (res && res.data.code == 1) {
                let cslink = res.data.data.line;
                let r = Math.floor(Math.random() * 10)
                for (let i = 0, len = cslink.length; i < len; i++) {
                    this.lineList.push({
                        url: cslink[i],
                        tit: this.$t('home.text[6]') + (i + 1),
                        speed: 50 + i + r,
                    });
                }
                for (let i = 0, len = cslink.length; i < len; i++) {
                    if (cslink[i]) {
                        this.isLink = true
                    }
                    return
                }
            }
        },
        download() {
            if (this.noticeType == 1) {
                //官方
                if (this.isPhoneAgent() == 'ios') {
                    // window.open(getToken('gfios'))
                    // window.open('https://nom88.com/kiss588WjsdNaPnb9.mobileconfig')
                    window.open('https://k188.app/k188_v3.mobileconfig')

                } else if (this.isPhoneAgent() == 'android') {
                    // window.open(getToken('gfanz'))
                    // window.open('https://kiss06.s3.ap-southeast-1.amazonaws.com/kiss588.apk')
                    window.open('https://060a.s3.ap-southeast-1.amazonaws.com/yn/k188.apk')
                    // 
                }
            } else {
                //代理
                if (this.isPhoneAgent() == 'ios') {
                    // window.open(getToken('dlios'))
                    window.open('https://nom89.com/kiss589.mobileconfig')
                    // 

                } else if (this.isPhoneAgent() == 'android') {
                    // window.open(getToken('dlanz'))
                    window.open('https://kiss06.s3.ap-southeast-1.amazonaws.com/kiss589.apk')
                    // 
                }
            }


        },
        isPhoneAgent() {
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
        initSwiper() {
            let this_ = this
            this.$nextTick(function () {
                new Swiperc('.swiper-containertype', {
                    paginationClickable: true,
                    spaceBetween: 6,
                    slidesPerView: 5,
                    observer: true,
                    observeParents: true,
                    pagination: {
                        el: '.swiper-paginationtype',
                        type: 'bullets',
                    },
                    on: {
                        slideChangeTransitionEnd: function () {
                            Array.from(this_.$refs.pagination.children).forEach((r, i) => {
                                if (this.activeIndex == i) {
                                    r.classList.add('swiper-pagination-bullet-active')
                                } else {
                                    r.classList.remove('swiper-pagination-bullet-active')
                                }
                            })
                        },
                    },
                });
                new Swiperc('.swiper-containertypetwo', {
                    paginationClickable: true,
                    spaceBetween: 6,
                    slidesPerView: 5,
                });
                this.$refs.swiperMenu.style.transform = 'translate3d(0px, 0px, 0px)';

            })
        },
        changeMenu(i) {
            this.SETNEWSHOW(i)
            this.nav2Active == 'Tất cả'
        },
        toNews(i) {
            if (i.url) {
                window.open(i.url)
            }

        },
        toLottery(id, name, mark) {
            if (!this.$store.state.codeToken) {
                return this.$popup();
            }
            this.$router.push("/xz/" + id + "?vname=" + name + '&mark=' + mark)
        },
        goQp2(code, type, id) {
            if (!this.userinfo.user_id) return this.$popup();
            if (this.$store.state.userinfo.user_id < 0) {
                this.$swBox({
                    title: this.$t('tsTitle'),
                    content: this.$t('swTip'),
                    leftBtn: this.$t('loginText'),
                    rightBtn: this.$t('registerText'),
                    clickL: () => {
                        this.SETUSERTOKEN('')
                        this.$router.push('/login');
                    },
                    clickR: () => {
                        this.SETUSERTOKEN('')
                        if (this.noticeType == 1) {
                            this.$router.push('/register');

                        } else {
                            this.$router.push('/RegisterDl');

                        }
                    }
                });
                return
            } else {
                window.open('/toGame/' + code + '/' + type + '/' + id);
            }
        },
        goQp(item, id) {
            // if(item.code=='lg_lottery'){

            //     this.$router.push('/lgLottery')

            // }else if(item.code=='ky'){
            //     this.$router.push('/kyqp');
            // }else if(item.code=='fh_chess'){
            //     this.$router.push('/lgqp');
            // }else if(item.code=="mg_slot"){
            //     this.$router.push('/mgdz');
            // }else if(item.code=="jdb_slot"){
            //     this.$router.push('/mgdz?title=JDB&type=jdb');
            // }else{
            if (!this.userinfo.user_id) return this.$popup();
            if (this.$store.state.userinfo.user_id < 0) {
                this.$swBox({
                    title: this.$t('tsTitle'),
                    content: this.$t('swTip'),
                    leftBtn: this.$t('loginText'),
                    rightBtn: this.$t('registerText'),
                    clickL: () => {
                        this.SETUSERTOKEN('')
                        this.$router.push('/login');
                    },
                    clickR: () => {
                        this.SETUSERTOKEN('')
                        if (this.noticeType == 1) {
                            this.$router.push('/register');

                        } else {
                            this.$router.push('/RegisterDl');

                        }
                    }
                });
                return
            } else {
                if (window.android) {
                    if (this.gameListMenu[this.gameTypeIndex].code == 'mg_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jdb_slot') {
                        this.$router.push('/toGame/' + item.vendor + '/' + item.code / +'/0');
                    } else {
                        this.$router.push('/toGame/' + this.gameListMenu[this.gameTypeIndex].code + '/' + this.gameListMenu[this.gameTypeIndex].type + '/' + item.code)
                    }

                } else {
                    if (this.gameListMenu[this.gameTypeIndex].code == 'mg_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jdb_slot') {
                        window.open('/toGame/' + item.vendor + '/' + item.code + '/0');
                    }

                    else {
                        window.open('/toGame/' + this.gameListMenu[this.gameTypeIndex].code + '/' + this.gameListMenu[this.gameTypeIndex].type + '/' + item.code)
                    }

                }

            }

            // }

        },
        toleft() {

            this.swiper1.slidePrev()
            this.menuIndex = this.swiper1.realIndex
        },
        toright() {

            this.swiper1.slideNext()
            this.menuIndex = this.swiper1.realIndex
        },
        getGame() {
            this.$vux.loading.show();
            //  this.gameListData = this.homeNewData;
            this.$http.get('/api/v2.vendor/homegames', {
                params: {
                    skin: this.skin ? this.skin : 0
                }
            }).then(res => {
                if (res && res.data.code == 1) {
                    this.gameListData = res.data.data;

                    this.getlotteryGames()
                    this.SETHOMENEWDATA(this.gameListData);
                    let this_ = this
                    this.swiper1 = new Swiperc('.swiper-container', {
                        paginationClickable: true,
                        spaceBetween: 6,
                        slidesPerView: 6,
                        observer: true,
                        observeParents: true,
                        on: {
                            slideChangeTransitionEnd: function () {
                                this_.menuIndex = this.activeIndex
                            },
                        },
                    });

                }
            })
        },
        getInformation() {
            this.$http.get('/api/common/news', {
                params: {
                    skin: this.skin ? this.skin : 0
                }
            }).then(res => {
                if (res && res.data.code == 1) {
                    this.information = res.data.data
                }
            })
        },
        async getBanner(flag) {

            if (!flag && this.$store.state.banners.length) {
                this.bannerList = this.$store.state.banners;
                this.playList.bannerList = this.bannerList;

                return
            }
            let res = await this.$http.get("/api/live/sport/get_banner/");
            this.isL = false;
            if (res && res.data.code == 1) {
                this.bannerList = res.data.data || [];
                this.SETBANNER_S(this.bannerList);
                this.playList.bannerList = this.bannerList;

            }
        },
        goUrl(url, title) {
            if (url) {
                window.open(url)
            }

        },
        async getOnline() {
            let res = await this.$http.get("/api/user/onlinecount");
            if (res && res.data.code == 1) {
                this.onlinenumber = res.data.data.online_user_nums

            }
        },
        async getNotice() {
            let res = await this.$http.get("/api/live/sport/system_notice/");
            if (res && res.data.code == 1) {
                // console.log(res)
                this.notice = res.data.data || [];
            }
        },
        async getlotteryGames() {
            let res = await this.$http.get('/api/lottery/games');
            this.$vux.loading.hide();
            if (res && res.data.code == 1) {
                this.lotteryGames = res.data.data || [];
                // this.allGamesList = this.lotteryGames[0].list;
                this.lotteryGames.forEach((v, d) => {
                    v.allGame = []
                    v.list.forEach((v2, d2) => {
                        v2.list.forEach((v3, d3) => {
                            v.allGame.push(v3)
                        })
                    })
                })
                try {
                    this.gameListMenu = this.gameListData[this.homeNewShow].list
                    this.initSwiper()
                } catch (error) {
                    console.log('error')
                }
            }
        },
    }
}
</script>
<style lang="less">
@import url("../../../node_modules/swiper/css/swiper.css");

.newHome .game-menu .menu-jt.gray {
    opacity: 0.2 !important;
}

.game-type .vux-slider>.vux-indicator>a>.vux-icon-dot.active {
    background-color: #488DF2 !important;
}

.game-type .vux-slider>.vux-indicator>a>.vux-icon-dot {
    background-color: #D9D9D9 !important;
}

.game-type .vux-slider>.vux-indicator {
    bottom: 0 !important;
}

.newHome {
    .newhome-header {
        height: 1.2rem;
        background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
        display: flex;
        color: #fff;
        align-items: center;
        padding: 0 0.2rem;
        line-height: normal;
        position: relative;

        &.header-pink {
            background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%);
        }

        &.header-blue {
            background: linear-gradient(89.97deg, #06B4D8 0.02%, #49CAE2 99.97%);
        }

        &.header-green {
            background: linear-gradient(89.97deg, #24CA80 0.02%, #35E098 99.97%);
        }

        &.header-maingreen {
            background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
        }

        span {
            border: 0.5px solid #fff;
            padding: 0.05rem;
            border-radius: 4px;
            // margin-right: 0.2rem;
            font-size: .3rem;

            &:first-of-type {
                margin-right: .1rem;
            }
        }

        .logo-info {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            line-height: normal;
            font-size: 0.32rem;

            img {
                width: 1rem;
                margin: 0 0.2rem;
                border-radius: 50%;
            }
        }

    }

    .banner {
        padding: .3rem 0.2rem 0 .2rem;
        position: relative;

        // margin-top: 0.2rem;
        .toOldversion {
            position: absolute;
            left: 0rem;
            width: 2.5rem;
            top: -.22rem;
            z-index: 20;
        }

        img {
            border-radius: 6px;
        }
    }

    .notice-box {
        margin: 0 auto;
        background-size: 8% !important;
        border-radius: 20px;
        color: #666;
        font-size: 0.32rem;
        min-height: 0.95rem;
        padding: 0 .3rem;
        position: relative;

        // &.notice-box-pt{
        //     background: url("../../assets/images/newHome/lb2.png") #fff no-repeat
        //     0.4rem center;
        //     background-size: 5%!important;
        // }
        marquee {
            width: 80%;
            padding: 0.15rem 0 0.15rem 0;
            margin-left: 1rem;
            float: left;

            span {
                vertical-align: -webkit-baseline-middle;

                color: #6A86B9;
            }
        }

        .online-box {
            position: absolute;
            border: 0.5px solid #017DFF;
            border-radius: 4px;
            padding: 0.05rem 0.1rem;
            right: 0.2rem;
            top: 0.1rem;
            background: #fff;
            color: #017DFF;
        }

        &.notice-box-pt {
            background: url("../../assets/images/newHome/lb.png") #fff no-repeat 0.4rem center;
            background-size: 4% !important;

            span {
                vertical-align: -webkit-baseline-middle;
                color: #6A86B9;
            }

        }

        &.notice-pink {
            background: url("../../assets/images/skin/pink/lb.png") #fff no-repeat 0.4rem center;
            background-size: 4% !important;

            span {
                vertical-align: -webkit-baseline-middle;
                color: #FB796B;
            }

            .online-box {
                border: 0.5px solid #FB796B;
            }
        }

        &.notice-blue {
            background: url("../../assets/images/skin/blue/lb.png") #fff no-repeat 0.4rem center;
            background-size: 4% !important;

            .online-box {
                border: 0.5px solid #0CB6D9;
            }

            span {
                vertical-align: -webkit-baseline-middle;
                color: #0CB6D9;
            }
        }

        &.notice-green {
            background: url("../../assets/images/skin/green/lb.png") #fff no-repeat 0.4rem center;
            background-size: 4% !important;

            .online-box {
                border: 0.5px solid #00B681;
            }

            span {
                vertical-align: -webkit-baseline-middle;
                color: #00B681;
            }
        }

        &.notice-maingreen {
            background: url("../../assets/images/newHome/lb2.png") #fff no-repeat 0.4rem center;
            background-size: 4% !important;

            span {
                color: #72C1A5;
            }

            .online-box {
                border: 0.5px solid #01BC79;
            }
        }


    }

    .game-menu {
        padding: 0.2rem 0.5rem;
        background: #F4FAFF;
        position: relative;

        .swiper-slide {
            img {
                height: 1.4rem;
            }
        }

        .game-menu-item {
            ul {
                display: flex;

                li {
                    width: 1.333rem;
                    margin: 0 0.1rem;

                    img {
                        width: 100%;
                    }

                }
            }
        }

        .menu-jt {
            position: absolute;
            top: 0.5rem;

            img {
                width: 0.5rem;
            }

            &.gray {
                filter: brightness(0);
                opacity: 0.2;
            }
        }
    }

    .game-type {
        padding: 0 0.1rem;
        margin: 0.3rem 0;
        position: relative;

        .swiper-pagination-fraction,
        .swiper-pagination-custom,
        .swiper-container-horizontal>.swiper-pagination-bullets {
            bottom: -0.4rem;
        }

        .swiper-pagination-bullet-active {
            background: linear-gradient(180deg, #C8DCF9 0%, #488DF2 100%) !important;
        }

        ul {
            display: flex;

            &.w-pink {
                li {
                    background: linear-gradient(180deg, #FEF8F5 0%, #FEF2F0 72.92%, #FFFEFE 100%);
                    border: 1px solid #F2E8E6;
                    box-shadow: 0px 2px 3px rgba(121, 34, 6, 0.15);
                    color: #E3AAAA;
                }
            }

            &.w-blue {
                li {
                    background: linear-gradient(180deg, #F5FCFE 0%, #F0FDFE 72.92%, #FAFEFF 100%);
                    border: 1px solid #E6EEF2;
                    box-shadow: 0px 2px 3px;
                    color: #72A5C1;
                }
            }

            &.w-green {
                li {
                    background: linear-gradient(180deg, #F5FEFB 0%, #F0FEF7 72.92%, #FEFFFF 100%);
                    border: 1px solid #E6F2ED;
                    box-shadow: 0px 2px 3px;
                    color: #92BCB2;
                }
            }

            &.w-maingreen {
                li {
                    background: linear-gradient(180deg, #F5FEFB 0%, #F0FEF7 72.92%, #FEFFFF 100%);
                    border: 1px solid #E6F2ED;
                    box-shadow: 0px 2px 3px rgba(6, 121, 73, 0.15);
                    color: #72C1A5;
                }
            }

            li {
                background: linear-gradient(180deg, #F5F8FE 0%, #F0F5FE 72.92%, #FEFFFF 100%);
                border: 1px solid #EBF0F6;
                box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15);
                border-radius: 1.2rem;
                line-height: 0.8rem;
                text-align: center;
                color: #929BBC;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                span {
                    display: inline-block;
                    min-width: 1.45rem;
                }

                &.active {
                    background: linear-gradient(180deg, #A2C5F6 0%, #6496F2 72.92%, #6091EF 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #417EE5;
                    color: #fff;
                }

                &.active-pink {
                    background: linear-gradient(180deg, #FFC9A2 0%, #FC8379 72.92%, #FB6E6D 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #B45D2C;
                    color: #fff;
                }

                &.active-blue {
                    background: linear-gradient(180deg, #49CAE2 0%, #11B7D9 72.92%, #06B4D8 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #2C83B4;
                    color: #fff;
                }

                &.active-green {
                    background: linear-gradient(180deg, #35E097 0%, #24CA80 72.92%, #24CA80 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #2CB432;
                    color: #fff;
                }

                &.active-maingreen {
                    background: linear-gradient(180deg, #78D0B2 0%, #14A071 72.92%, #00865A 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(43, 121, 6, 0.15), inset 0px -3px 0px #087A43;
                    color: #fff;
                }
            }

        }
    }

    .shortcut {
        position: relative;

        .shortcut-item {

            .swiper-pagination-fraction,
            .swiper-pagination-custom,
            .swiper-container-horizontal>.swiper-pagination-bullets {
                bottom: -0.4rem;
            }

            .swiper-pagination-bullet-active {
                background: linear-gradient(180deg, #C8DCF9 0%, #488DF2 100%) !important;
            }

            ul {

                // display: flex;
                li {

                    text-align: center;
                    padding-bottom: 0.1rem;
                    color: #1486FF;

                    //     &.active{
                    //     background: url('../../assets/images/newHome/16.png') no-repeat;
                    //     background-size: 100% 100%;
                    //    color: #fff;
                    //     }
                    img {
                        width: 36%;
                        height: 0.42rem;
                    }

                    p {
                        font-size: 0.22rem;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                &.color-pink li {
                    color: #FB796B;
                }

                &.color-blue li {
                    color: #0CB6D9;
                }

                &.color-green li {
                    color: #00B681;
                }

                &.color-maingreen li {
                    color: #01B373;
                }
            }

            &.shortcut-pink {
                ul {
                    li {
                        background: url('../../assets/images/skin/pink/14.png') no-repeat;
                        background-size: 100% 100%;
                        color: #E3AAAA;

                        &.active {
                            background: url('../../assets/images/skin/pink/99.png') no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                        }
                    }
                }
            }

            &.shortcut-blue {
                ul {
                    li {
                        background: url('../../assets/images/skin/blue/13.png') no-repeat;
                        background-size: 100% 100%;
                        color: #72A5C1;

                        &.active {
                            background: url('../../assets/images/skin/blue/111.png') no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                        }
                    }
                }
            }

            &.shortcut-green {
                ul {
                    li {
                        background: url('../../assets/images/skin/green/12.png') no-repeat;
                        background-size: 100% 100%;
                        color: #92BCB2;

                        &.active {
                            background: url('../../assets/images/skin/green/88.png') no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                        }
                    }
                }
            }

            &.shortcut-maingreen {
                ul {
                    li {
                        background: url('../../assets/images/newHome/oval_bg1.png') no-repeat;
                        background-size: 100% 100%;
                        color: #72C1A5;

                        &.active {
                            background: url('../../assets/images/newHome/oval_bg2.png') no-repeat;
                            background-size: 100% 100%;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    .module-title {
        padding: 0.2rem;

        &:before {
            content: '';
            width: 0.1rem;
            height: 0.4rem;
            background: #666;
            display: block;
            position: absolute;
            left: 0.2rem;
        }

        h2 {
            color: #333;
            padding-left: 0.5rem;
            line-height: 0.5rem;
        }

        &.module-title-pink {
            &::before {
                background: #FB796B;
            }

            h2 {
                color: #FB796B;
            }
        }

        &.module-title-blue {
            &::before {
                background: #445779;
            }

            h2 {
                color: #445779;
            }
        }

        &.module-title-green {
            &::before {
                background: #00B681;
            }

            h2 {
                color: #00B681;
            }
        }

        &.module-title-maingreen {
            &::before {
                background: #0A9366;
            }

            h2 {
                color: #01B373;
            }
        }
    }

    .information {
        ul {
            li {
                padding: 0 0.15rem;
                margin-bottom: 0.1rem;

                img {
                    width: 100%;
                }
            }
        }
    }

    .game-list {
        margin-top: 0.4rem;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 23%;
                text-align: center;
                margin: 0 1%;
                margin-bottom: 0.2rem;

                img {
                    width: 1.36rem;
                }

                p {
                    padding: 0.1rem 0.2rem;
                    // color: #01B373;
                    color: #6A78A9;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .cp-select {
            display: flex;
            justify-content: space-evenly;

            span {
                color: #71819D;
                font-size: 0.37rem;
                position: relative;
                padding: 0 0.15rem 0.3rem 0.15rem;

                &.active {
                    &:before {
                        content: '';
                        display: block;
                        width: 0.5rem;
                        width: 72%;
                        height: 3px;
                        background: #01B373;
                        position: absolute;
                        bottom: 0.1rem;
                    }
                }
            }

        }

        &.game-list-pink {
            .cp-select {
                span {

                    &.active {
                        color: #FB796B;

                        &::before {
                            background: #FB796B;
                        }

                    }
                }
            }
        }

        &.game-list-green {
            .cp-select {
                span {

                    &.active {
                        color: #00B681;

                        &::before {
                            background: #00B681;
                        }

                    }
                }
            }
        }

        &.game-list-blue {
            .cp-select {
                span {

                    &.active {
                        color: #0CB6D9;

                        &::before {
                            background: #0CB6D9;
                        }

                    }
                }
            }
        }

        &.game-list-maingreen {
            .cp-select {
                span {

                    &.active {
                        &::before {
                            background: #01B373;
                        }

                    }
                }
            }
        }
    }

    .main-cs {
        width: 100%;
        padding: 0 0.3rem;
        background: #fff;

        .address {
            text-align: center;
            font-size: 0.45rem;
            line-height: 25px;
            color: #445779;
            padding-top: 0.3rem;
        }

        .list {
            width: 96%;
            margin: 0 auto;

            .item {
                overflow: hidden;
                width: 100%;
                margin-top: 0.3rem;

                .left {
                    width: 25%;
                    height: 32px;
                    margin-left: 1%;
                    margin-top: 0.08rem;
                    float: left;

                    img {
                        width: 0.6rem;
                        margin-left: 0.1rem;
                        margin-top: 0.08rem;
                    }

                    span {
                        font-size: 0.35rem;
                        position: relative;
                        top: -0.16rem;
                        margin-left: 0.1rem;
                    }
                }

                .cen {
                    float: left;
                    width: 42%;
                    text-align: center;
                    line-height: 40px;
                    color: #445779;
                    font-size: 0.35rem;
                }

                .rig {
                    width: 30%;
                    height: 32px;
                    ;
                    margin-top: 0.08rem;
                    float: left;
                    text-align: center;

                    span {
                        font-size: 0.3rem;
                        color: #fff;
                        position: relative;
                        top: -0.18rem;
                    }

                    img {
                        width: 0.6rem;
                        margin-top: 0.1rem;
                        margin-left: 0.2rem;
                    }
                }
            }

            .yellow {
                height: 40px;
                border: 0.5px solid #FFBE78;
                border-radius: 27.5px;

                .left {
                    border: 0.5px solid #FFBE78;
                    border-radius: 27.5px;

                    span {
                        color: #FFBE78;
                    }
                }

                .rig {
                    background: linear-gradient(90deg, #FF9500 0%, #FFBE78 100%);
                    border-radius: 27.5px;
                }

            }

            .green {
                height: 40px;
                border: 0.5px solid #32DB8C;
                ;
                border-radius: 27.5px;

                .left {
                    border: 0.5px solid #32DB8C;
                    ;
                    border-radius: 27.5px;

                    span {
                        color: #32DB8C;
                        ;
                    }
                }

                .rig {
                    background: linear-gradient(90deg, #15CC77 0%, #69F8B5 100%);
                    border-radius: 27.5px;
                }
            }

            .red {
                height: 40px;
                border: 0.5px solid #F95065;
                ;
                border-radius: 27.5px;

                .left {
                    border: 0.5px solid #F95065;
                    ;
                    border-radius: 27.5px;

                    span {
                        color: #F95065;
                        ;
                    }
                }

                .rig {
                    background: linear-gradient(90deg, #EF233C 0%, #FF7283 100%);
                    border-radius: 27.5px;
                }
            }
        }

        .submit-btn {
            background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
            color: #fff;
            text-align: center;
            height: 1.2rem;
            line-height: 1.2rem;
            width: 80%;
            // margin: 2rem auto 3rem;
            border-radius: 1rem;
            font-size: .4rem;
            position: fixed;
            bottom: 2.8rem;
            z-index: 2;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

.backToOld {
    width: 2.5rem;
    border-radius: .1rem;
    border: 1px solid #fff;
    text-align: center;
    font-size: .3rem;
}</style>