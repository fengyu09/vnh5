<template>
    <div class="newHome">
        <Header_download v-if="lanCode != 2"></Header_download>
        <header class="newhome-header" :class="[{ header: skin == 0 }, { 'header-pink': skin == 1 }, { 'header-blue': skin == 2 },
        { 'header-green': skin == 3 }, { 'header-maingreen': skin == 4 }, { 'header-golden': skin == 5 }]">
            <img src="../../assets/images/newLogo.png" v-if="noticeType == 1 && skin != 5" alt="" style="width: 3.3rem;">
            <img src="../../assets/images/newLogoDl.png" v-if="noticeType == 2 && skin != 5" alt="" style="width: 3.3rem;">
            <img src="../../assets/images/skin/golden/logo.png" v-if="noticeType == 1 && skin == 5" alt=""
                style="width: 3.3rem;">
            <img src="../../assets/images/login/logo1-golden.png" v-if="noticeType == 2 && skin == 5" alt=""
                style="width: 3.3rem;">
            <span class="no-login-home" style="margin-left:auto;" v-if="!codeToken && noticeType == 1"
                @click="$router.push({ path: '/register' })">
                {{ $t('newHome[0]') }}
            </span>
            <span style="margin-left:auto;" class="no-login-home" v-if="!codeToken && noticeType == 2"
                @click="$router.push({ path: '/registerDl' })">
                {{ $t('newHome[0]') }}
            </span>
            <span v-if="!codeToken" class="no-login-home" @click="$router.push({ path: '/login' })">
                {{ $t('newHome[1]') }}
            </span>
            <div class="logo-info" v-if="codeToken != ''" @click="$router.push({ path: '/member' })">
                <div>
                    <p style="font-size: 0.37rem;">{{ userinfo.nickname }}</p>
                    <p>ID:{{ userinfo.id }}</p>
                </div>
                <img :src="userinfo.avatar" alt="" srcset="">
            </div>
            <div class="language-box">
                <div class="language-icon" @click="languageListShow = !languageListShow">

                    <img v-show="languageActive == v.code" v-for="v, index in lanList" :key="index" :src="v.icon" alt="">
                </div>

            </div>
        </header>
        <myScroll ref="shareScroll" :top="scrollTop" :bottom="scrollBottom" :bgColor="skin == 5 ? '1F252C' : 'fbfbff'">
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
                :class="[{ 'notice-pink': skin == 1 }, { 'notice-blue': skin == 2 }, { 'notice-green': skin == 3 }, { 'notice-maingreen': skin == 4 }, { 'notice-golden': skin == 5 }]">
                <marquee scrollAmount="3" scrolldelay="50" direction="left">
                    <span v-if="notice.length <= 0">no data</span>
                    <span v-for="(v, index) in notice" :key="index"
                        @click="$router.push({ path: '/msgDetail', query: { msg_id: v.id } })">{{ index + 1 }}.{{ v.content }}&nbsp;&nbsp;&nbsp;</span>


                </marquee>
                <div class="online-box">
                    <span>{{ $t('newHome[2]') }}: {{ onlinenumber }}</span>
                </div>
            </div>
            <div class="game-menu" v-show="gameListData.length">
                <div class="swiper-container">
                    <ul class="swiper-wrapper">
                        <li v-for="(item, index) in gameListData" class="swiper-slide" :key="index"
                            @click="changeMenu(index)">
                            <img v-if="item.code == showGameCode" :src="item.icon1" alt="" srcset="">
                            <img v-else :src="item.icon" alt="" srcset="">
                        </li>
                        <!-- <li class="swiper-slide" @click="$router.push('/live')">

                            <img v-if="skin == 3" src="../../assets/images/skin/green/live-2.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/live-2.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/live-2.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/live-2.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/live-2.png" alt="" srcset="">
                            <img v-if="skin == 5" src="../../assets/images/skin/golden/live.png" alt="" srcset="">
                        </li> -->
                        <li class="swiper-slide" @click="download" v-if="this.languageActive != 'en'">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/xiazai-1.png" alt="" srcset="">
                            <img v-if="skin == 5" src="../../assets/images/skin/golden/down.png" alt="" srcset="">
                        </li>
                        <li class="swiper-slide" @click="download" v-else>
                            <img v-if="skin == 3" src="../../assets/images/skin/green/xiazai-1-ES.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/xiazai-1-ES.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/xiazai-1-ES.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/xiazai-1-ES.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/xiazai-1-ES.png" alt=""
                                srcset="">
                            <img v-if="skin == 5" src="../../assets/images/skin/golden/down.png" alt="" srcset="">
                        </li>
                        <li class="swiper-slide" @click="toChat">
                            <img v-if="skin == 3" src="../../assets/images/skin/green/chat_1.png" alt="" srcset="">
                            <img v-if="skin == 0" src="../../assets/images/newHome/chat_1.png" alt="" srcset="">
                            <img v-if="skin == 1" src="../../assets/images/skin/pink/chat_1.png" alt="" srcset="">
                            <img v-if="skin == 2" src="../../assets/images/skin/blue/chat_1.png" alt="" srcset="">
                            <img v-if="skin == 4" src="../../assets/images/skin/maingreen/chat_1.png" alt="" srcset="">
                            <img v-if="skin == 5" src="../../assets/images/skin/golden/chat_1.png" alt="" srcset="">
                        </li>
                    </ul>
                </div>
                <i class="menu-jt" :class="{ gray: menuIndex == 0 }" @click='toleft'
                    style="left:0;transform: rotate(180deg);top: 0.4rem;">
                    <img v-if="skin == 4 || skin == 3" src="../../assets/images/newHome/jt_icon.png" alt="" srcset="">
                    <img v-if="skin == 0" src="../../assets/images/newHome/jt_icon-2.png" alt="" srcset="">
                    <img v-if="skin == 1" src="../../assets/images/newHome/jt_icon-3.png" alt="" srcset="">
                    <img v-if="skin == 2" src="../../assets/images/newHome/jt_icon-4.png" alt="" srcset="">
                    <img v-if="skin == 5" src="../../assets/images/skin/golden/right_on.png" alt="" srcset="">
                </i>
                <i class="menu-jt" :class="{ gray: menuIndex >2 }" @click='toright' style="right:0;">
                    <img v-if="skin == 4 || skin == 3" src="../../assets/images/newHome/jt_icon.png" alt="" srcset="">
                    <img v-if="skin == 0" src="../../assets/images/newHome/jt_icon-2.png" alt="" srcset="">
                    <img v-if="skin == 1" src="../../assets/images/newHome/jt_icon-3.png" alt="" srcset="">
                    <img v-if="skin == 2" src="../../assets/images/newHome/jt_icon-4.png" alt="" srcset="">
                    <img v-if="skin == 5" src="../../assets/images/skin/golden/right_on.png" alt="" srcset="">
                </i>
            </div>
            <div v-show="homeNewShow == -1">
                <div class="module-title"
                    :class="[{ 'module-title-pink': skin == 1 }, { 'module-title-blue': skin == 2 }, { 'module-title-green': skin == 3 }, { 'module-title-maingreen': skin == 4 }, { 'module-title-golden': skin == 5 }]">
                    <h2>{{ $t('newHome[3]') }}</h2>
                </div>
                <div class="shortcut">

                    <div class="shortcut-item" v-if="homeNewShow == -1">
                        <ul class="swiper-wrapper"
                            :class="[{ 'color-pink': skin == 1 }, { 'color-blue': skin == 2 }, { 'color-green': skin == 3 }, { 'color-maingreen': skin == 4 }, { 'color-golden': skin == 5 }]"
                            ref="swiperShortcut">
                            <li @click="$router.push('recharge')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 14.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 14.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/icon_ck.png" alt="" srcset="">
                                <p>{{ $t('newHome[4]') }}</p>
                            </li>
                            <li @click="$router.push('tx')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 15.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 15.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/tx.png" alt="" srcset="">
                                <p>{{ $t('newHome[5]') }}</p>
                            </li>
                            <li @click="$router.push('wallet')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 16.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 16.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/exChange.png" alt="" srcset="">
                                <p>{{ $t('newHome[6]') }}</p>
                            </li>
                            <li @click="$router.push('messageCenter')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 17.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 17.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/info.png" alt="" srcset="">
                                <p>{{ $t('newHome[7]') }} </p>
                            </li>
                            <li @click="$router.push('vip')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 18.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 18.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/icon_vip.png" alt="" srcset="">
                                <p>{{ $t('newHome[8]') }}</p>
                            </li>
                            <li @click="$router.push('invite')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 19.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 19.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/invite.png" alt="" srcset="">
                                <p>{{ $t('newHome[9]') }}</p>
                            </li>
                            <li @click="$router.push('invite')" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 20.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 20.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/icon_tg.png" alt="" srcset="">
                                <p>{{ $t('newHome[10]') }}</p>
                            </li>
                            <li @click="showCs()" class="swiper-slide">
                                <img v-if="skin == 0" src="../../assets/images/newHome/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 1" src="../../assets/images/skin/pink/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 2" src="../../assets/images/skin/blue/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 3" src="../../assets/images/skin/green/Frame 21.png" alt="" srcset="">
                                <img v-if="skin == 4" src="../../assets/images/skin/maingreen/Frame 21.png" alt=""
                                    srcset="">
                                <img v-if="skin == 5" src="../../assets/images/skin/golden/cs_icon.png" alt="" srcset="">
                                <p>{{ $t('newHome[11]') }}</p>
                            </li>

                        </ul>
                        <div class="swiper-pagination-shortcut" style="text-align: center;">

                        </div>
                    </div>

                </div>
                <div class="information" style="padding-bottom: 0.4rem;">

                    <div class="information-item">
                        <div class="information-title" v-if="gameListData.length">
                            <span :class="[{ 'golden-color': skin == 5 }]">{{ $t('newHome[22]') }}</span>
                            <i @click="changeMenu2('lottery')"
                                :class="[{ 'pink-color': skin == 1 }, { 'blue-color': skin == 2 }, { 'green-color': skin == 3 }, { 'maingreen-color': skin == 4 }, { 'golden-color': skin == 5 }]">{{ $t('newHome[15]') }}</i>
                        </div>
                        <div class="hot-game">
                            <div class="lottery-swiper" style="width: 100%;">
                                <div class="swiper-wrapper">
                                    <div v-for="(item, index) in hotLottery" :key="index" class="game-item swiper-slide">
                                        <img src="../../assets/images/newHome/Mask group (2).png" alt="" srcset="">
                                        <div class="content">
                                            <div class="djs-box">
                                                <span> <img src="../../assets/images/newHome/Group 380.png" alt=""
                                                        srcset=""> {{ djsTimeArr[index] }}</span>
                                            </div>
                                            <ul>
                                                <li v-for="(l, i) in item.open_code.split(',')" :key="i + 'c'">{{ l }}</li>

                                            </ul>
                                            <div class="issue-box">
                                                <span>{{ item.next_issue }}</span>
                                            </div>
                                            <div class="togame-btn"
                                                :class="[{ 'color-pink': skin == 1 }, { 'color-blue': skin == 2 }, { 'color-green': skin == 3 }, { 'color-maingreen': skin == 4 }, { 'color-golden': skin == 5 }]"
                                                @click="toLottery(item.code, item.name, item.remark)">
                                                {{ $t('newHome[16]') }}
                                            </div>
                                            <img :src="item.img" alt="" class="game-icon" srcset="">
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="information-item" v-for="(it, id) in hotGames" :key="id" v-if="it.code!='hot'">
                        <div class="information-title" v-if="gameListData.length">
                            <span :class="[{ 'golden-color': skin == 5 }]">{{ it.name }}</span>
                            <i @click="changeMenu2(it.code)"
                                :class="[{ 'pink-color': skin == 1 }, { 'blue-color': skin == 2 }, { 'green-color': skin == 3 }, { 'maingreen-color': skin == 4 }, { 'golden-color': skin == 5 }]">{{ $t('newHome[15]') }}</i>
                        </div>
                        <div class="hot-game">
                            <div class="live-swiper" style="width: 100%;">
                                <div class="swiper-wrapper" v-show="it.list.length > 2">
                                    <div class="game-item swiper-slide" v-for="(item, index) in it.list" :key="index"
                                        @click="goQp2(item.code, item.type, 0)">
                                        <img style="max-height: 2.2rem;" v-lazy="item.img" alt="" srcset="">
                                    </div>
                                </div>
                                <div v-show="it.list.length < 3" style="display: flex;">
                                    <div class="game-item" v-for="(item, index) in it.list" :key="index"
                                        @click="goQp2(item.code, item.type, 0)" style="width:44%;margin-right: 3%;">
                                        <img style="max-height: 2.2rem;" v-lazy="item.img" alt="" srcset="">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- <div class="information-item">
                <div class="information-title" v-if="gameListData.length">
                    <span>{{gameListData[5].name}}</span>
                    <i @click="changeMenu(5)" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3},{'maingreen-color':skin==4}]">{{$t('newHome[15]')}}</i>
                </div>
                 <div class="hot-game">
                    <div class="live-swiper" style="width: 100%;">
                        <div class="swiper-wrapper">
                        <div class="game-item swiper-slide" v-for="(item,index) in hotLive" :key="index" @click="goQp2(item.code,item.type,0)">
                            <img :src="item.img" alt="" srcset="">
                        </div>
                       
                        </div>
                    </div>
                  
                </div>
            </div> -->
                </div>
            </div>
            <div v-if="homeNewShow != -1">
                <div v-if="gameListMenu.length ">
                    <div class="game-type" v-show="showGameCode == 'lottery' || showGameCode == 'slot'"
                        :style="{ background: showGameCode == 'slot' ? '#fff' : '' }">
                        <div class="search-top" v-if="showGameCode == 'slot'">
                            <div class="input-box" style="position: relative">
                                <icon type="search" style="position: absolute;left: 0.2rem;top: 0.2rem;"></icon>
                                <input type="text" v-model="searchText" :placeholder="$t('newHome[18]')"
                                    @focus="showSearch = true; showShortcut = true; showFooter = false" @blur="showFooter = true">
                                <div style="width:0.4rem;position: absolute;right: 0.2rem;top: 0.2rem;"
                                    v-show="showShortcut" @click="showShortcut = false; showSearch = false; searchText = ''">
                                    <img src="../../assets/images/hmlz-icon2.png" alt="" srcset="">
                                </div>
                            </div>
                            <span @click="toSearch"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }, { 'w-golden': skin == 5 }]">
                                {{ $t('newHome[18]') }}
                            </span>
                        </div>
                        <div class="swiper-containertype">
                            <ul class="swiper-wrapper"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }, { 'w-golden': skin == 5 }]">
                                <li v-for="(item, index) in gameListMenu" class="swiper-slide"
                                    :class="[{ 'active': gameTypeIndex == index && skin == 0 }, { 'active-pink': gameTypeIndex == index && skin == 1 }, { 'active-blue': gameTypeIndex == index && skin == 2 }, { 'active-green': gameTypeIndex == index && skin == 3 }, { 'active-maingreen': gameTypeIndex == index && skin == 4 }, { 'active-golden': gameTypeIndex == index && skin == 5 }]"
                                    :key="index"
                                    @click="gameTypeIndex = index; nav2Active = (defalutLan == 'vi-vn' ? 'Tất cả' : 'All'); lgIndex = 0">
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                            <div class="swiper-paginationtype" v-show="gameListMenu.length > 5"
                                style="text-align: center;" ref="pagination">

                            </div>
                        </div>
                    </div>
                    <div class="game-type" style="margin-top: 0.5rem"
                        v-show="gameListMenu[gameTypeIndex].code == 'lg_lottery'">
                        <div class="swiper-containertypetwo">
                            <ul class="swiper-wrapper"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }, { 'w-golden': skin == 5 }]"
                                ref="swiperMenu">
                                <li v-for="(item, index) in lotteryGames" class="swiper-slide swiper-no-swiping"
                                    :class="[{ 'active': lgIndex == index && skin == 0 }, { 'active-pink': lgIndex == index && skin == 1 }, { 'active-blue': lgIndex == index && skin == 2 }, { 'active-green': lgIndex == index && skin == 3 }, { 'active-maingreen': lgIndex == index && skin == 4 }, { 'active-golden': lgIndex == index && skin == 5 }]"
                                    :key="index" @click="lgIndex = index; nav2Active = (defalutLan == 'vi-vn' ? 'Tất cả' : 'All')">
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="game-list" v-if="gameListMenu[gameTypeIndex].code == 'lg_lottery'&& lotteryGames.length "
                        :class="[{ 'game-list-pink': skin == 1 }, { 'game-list-blue': skin == 2 }, { 'game-list-green': skin == 3 }, { 'game-list-maingreen': skin == 4 }, { 'game-list-golden': skin == 5 }]">
                        <!-- <myScroll ref="shareScroll" :top="10"  :bottom="1.2" :bgColor="'fbfbff'"> -->
                        <div class="cp-select" v-if="showGameCode == 'lottery'">
                            <span :class="nav2Active == item ? 'active' : ''" v-for="(item, index) in nav2" :key="index"
                                @click="nav2Active = item">{{ item }}</span>
                        </div>
                        <!--  -->
                        <ul v-if="nav2Active == (defalutLan == 'vi-vn' ? 'Tất cả' : 'All')">
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
                    <div class="game-list" v-if="showGameCode == 'slot'">
                        <ul v-show="!showSearch">
                            <li @click="goQp(item)" v-for="(item, index) in gameListMenu[gameTypeIndex].list"
                                v-if="index < 101">
                                <img v-lazy="item.img" alt="">
                                <p>{{ item.name }} </p>
                            </li>
                        </ul>
                        <div class="search-bottom" v-show="showSearch">
                            <div class="search-shortcut" v-show="showShortcut"
                                :class="[{ 'w-pink': skin == 1 }, { 'w-blue': skin == 2 }, { 'w-green': skin == 3 }, { 'w-maingreen': skin == 4 }, { 'w-golden': skin == 5 }]">
                                <div class="title">
                                    <i></i>
                                    <h2>{{ $t('newHome[19]') }}</h2>
                                </div>
                                <div class="shortcut-list">
                                    <ul>
                                        <li v-for="(item, index) in searchPopular" :key="index"
                                            @click="searchText = item.name">{{ item.name }}</li>
                                    </ul>
                                </div>
                                <div class="title">
                                    <i></i>
                                    <h2>{{ $t('newHome[20]') }}</h2>
                                    <div class="del-btn" @click="clearSearch">
                                        <img src="../../assets/images/newHome/icon_del.png" alt="" srcset="">
                                    </div>
                                </div>
                                <div class="shortcut-list">
                                    <ul v-if="searchList.length">
                                        <li v-for="(item, index) in searchList" :key="index" @click="searchText = item">
                                            {{ item }}</li>
                                    </ul>
                                    <p v-else>
                                        no history~
                                    </p>
                                </div>
                            </div>
                            <div class="search-result" v-show="!showShortcut">
                                <ul v-if="searchGameList.length">
                                    <li @click="goQp(item)" v-for="(item, index) in searchGameList" :key="index">
                                        <img v-lazy="item.img" alt="">
                                        <p>{{ item.name }} </p>
                                    </li>
                                </ul>
                                <p v-else> {{ $t('newHome[23]') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="game-list" v-if="gameListMenu[gameTypeIndex].code == 'tcg_lottery'">
                        <ul>
                            <li @click="goQp(gameListMenu[gameTypeIndex])"
                                v-for="(item, index) in gameListMenu[gameTypeIndex].list" v-if="index < 101">
                                <img v-lazy="item.img" alt="">
                                <p>{{ item.name }} </p>
                            </li>
                        </ul>
                    </div>
                    <div class="ag-list" v-if="showGameCode == 'live'||showGameCode == 'hot'">
                        <ul>
                            <li v-for="(item, index) in gameListData[homeNewShow].list" :key="index" @click="goQp(item)">
                                <img v-lazy="item.img" alt="" srcset="" :style="{height:showGameCode == 'hot'?'2.3rem':'auto'}" >
                                <p v-if="showGameCode == 'live'">{{ item.name }}</p>
                            </li>

                        </ul>
                    </div>
                    <div class="sport-list"
                        v-show="showGameCode != 'live' && showGameCode != 'lottery' && showGameCode != 'slot'&& showGameCode != 'hot'">
                        <ul>
                            <li v-for="(item, index) in gameListData[homeNewShow].list" :key="index" @click="goQp(item)">
                                <!-- {{item}} -->
                                <img v-lazy="item.img" alt="">
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </myScroll>
        <div class="main-cs" v-if="isCs">
            <p class="address">{{ $t('home.text[1]') }}</p>
            <myScroll :top='scrollTop' :left='0' :bottom='1.4' :bgColor="$st.state.skin == 5 ? '161C23' : 'fff'"
                ref="csScroll">
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
        <Foot v-show="showFooter" />
        <div class="language-dialog" v-show="languageListShow" @click="languageListShow = false">
            <ul>
                <li @click="languageActive = v.code" v-for="v, index in lanList" :key="index"
                    :class="{ active: languageActive == v.code }">
                    <span>{{ v.name }}</span>
                    <i>
                        <span></span>
                    </i>
                </li>

            </ul>
        </div>

        <!-- 世界杯代理icon -->
        <div class="sjb" v-show="showSjb == true" :style="{ 'left': left + 'px', 'top': top + 'px' }" ref="sjbButton">
            <div class="close-btn" @click="hideSjb()" ref="closeBtn"><img src="../../assets/images/sjb_close.png"
                    alt=""></div>
            <div @click="goDl()">
                <img src="../../assets/images/sjb_en.png" v-if="$st.state.defalutLan == 'en'" alt="">
                <img src="../../assets/images/sjb.png" v-else alt="">
            </div>
        </div>
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
            nav2: [this.defalutLan == 'vi-vn' ? 'Tất cả' : 'All', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            nav2Active: this.defalutLan == 'vi-vn' ? 'Tất cả' : 'All',
            gameType: [],
            gameTypeIndex: 0,
            swiper1: null,
            lotteryGames: [],
            allGamesList: [],
            information: [],
            lgIndex: 0,
            swiper2: '',
            onlineInter: null,
            gameInter: null,
            isCs: false,
            lineList: [],
            languageListShow: false,
            languageActive: this.defalutLan,
            hotLottery: [],
            djsTime1: '--:--',
            djsTime2: '--:--',
            swiper4: '',
            djsTimeArr: [],
            hotLive: [],
            hotCock: [],
            hotGames: [],
            showSearch: false,
            searchText: '',
            showShortcut: true,
            searchGameList: [],
            searchPopular: [],
            showGameCode: '',
            showFooter: true,
            scrollBottom: 1.2,
            left: 0,
            top: 300,
            clientWidth: 0,
            clientHeight: 0,
            itemWidth: 0,
            itemHeight: 0,
            swipertype5:null,

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
            "lanCode",
            "lanList",
            "defalutLan",
            "searchList",
            "showSjb"
        ])
    },
    watch: {
        showFooter: function (n) {
            if (n) {
                this.scrollBottom = 1.2
                document.body.style.top = '0'
            } else {
                this.scrollBottom = 0;
                let u_agent = navigator.userAgent;
                if (u_agent.indexOf('Android') > -1) {
                    setTimeout(() => {
                        this.$refs.shareScroll.scrollTo(0, -document.body.clientHeight / 2)
                        // alert(document.body.clientHeight/2)
                    }, 400)
                }

            }
        },
        languageActive: function (n) {
            if (n) {
                this.$SetLanguage(n);
            } else {
                this.$SetLanguage(this.defalutLan);
            }

            if (this.defalutLan == 'vi-vn') {
                this.nav2 = ['Tất cả', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
                this.nav2Active = 'Tất cả'
            } else {
                this.nav2 = ['All', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

                this.nav2Active = 'All'
            }

            this.getGame();
            this.getInit()
            this.getBanner(true)
            this.getNotice()
            this.getHotlive();
            if (this.noticeType == 1) {
                if (this.$route.name != 'toGame') this.getXtNotice();//官方弹框消息
            } else {
                if (this.$route.name != 'toGame') this.getDlXtNotice();//代理弹框消息
            }
        },
        homeNewShow: function (m, o) {
            this.gameTypeIndex = 0;
            this.searchText = '';
            this.showSearch = false;
            this.showShortcut = false;
            if (m > -1) {
                // if(m==0){
                //     this.gameListMenu=this.lotteryGames
                // }else{
                this.gameListMenu = this.gameListData[m].list
                this.showGameCode = this.gameListData[m].code
                // }
                this.initSwiper()

            } else {
                this.showGameCode = ''
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
        this.languageActive = this.defalutLan;
        if (this.defalutLan == 'vi-vn') {
            this.nav2 = ['Tất cả', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
            this.nav2Active = 'Tất cả'
        } else {
            this.nav2 = ['All', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

            this.nav2Active = 'All'
        }
        this.getLanConfig();
        this.getInit();

        this.getHotLotter();
        this.getHotlive();
        this.searchGame();
        if (this.lanCode != 2) {
            this.scrollTop = this.$store.state.isDownLoad ? 3 : 1.2
        } else {
            this.scrollTop = 1.4
        }
        this.getOnline()
        clearInterval(this.onlineInter)
        clearInterval(this.gameInter)
        this.onlineInter = setInterval(() => {
            this.getOnline()
        }, 6000);
        this.gameInter = setInterval(() => {
            if(this.homeNewShow==-1){
                this.getHotLotter()
            }
            
        }, 15000);
        this.getBanner()
        this.getNotice()

        // this.getInformation()
    },
    mounted() {
        // window.onresize=function(){
        //     alert(11)
        // }
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

            this.floatIint()
            const floatButton = this.$refs.sjbButton
            console.log(111)
            floatButton.addEventListener("touchstart", (e) => {

                floatButton.style.transition = 'none'
            })

            // 在拖拽的过程中，组件应该跟随手指的移动而移动。
            floatButton.addEventListener("touchmove", (e) => {
                if (e.target.tagName == 'LI' || e.target.tagName == 'UL') {
                    return
                }
                if (e.targetTouches.length === 1) {

                    let touch = e.targetTouches[0]
                    this.left = touch.clientX - this.itemWidth / 2
                    if (touch.clientY - this.itemHeight / 2 < 0) {
                        this.top = 0
                    }
                    else if (touch.clientY > document.documentElement.clientHeight - this.itemHeight / 2) {
                        this.top = document.documentElement.clientHeight - this.itemHeight
                    }
                    else {
                        this.top = touch.clientY - this.itemHeight / 3
                    }


                }
            })
            floatButton.addEventListener("touchend", (e) => {
                floatButton.style.transition = 'all 0.3s'
                if (this.left > document.documentElement.clientWidth / 2 - this.itemWidth / 3) {
                    this.left = document.documentElement.clientWidth - this.itemWidth - 10
                    this.$refs.closeBtn.style.left = '-0.4rem';
                    this.$refs.closeBtn.style.right = 'auto'
                } else {
                    this.left = 10
                    this.$refs.closeBtn.style.right = '-0.8rem';
                    this.$refs.closeBtn.style.left = 'auto'
                }
            })

        })
    },
    beforeDestroy() {
        clearInterval(this.onlineInter);
        clearInterval(this.gameInter)
    },
    props: ['getChildData'],
    methods: {
        ...mapMutations(["SETBANNER_S", "SETUSERTOKEN", "SETNEWSHOW", "SETHOMENEWDATA", "SETVERSION", "SETDEFAULTLAN", "SETSEARCHLIST", "SETNOTICEDATA", "SETSJB","SETCHAT"]),
        hideSjb() {
            this.$st.commit('SETSJB', false);
        },
        floatIint() {
            this.itemWidth = this.$refs.sjbButton.clientWidth
            this.itemHeight = this.$refs.sjbButton.clientHeight
            this.clientWidth = document.documentElement.clientWidth
            this.clientHeight = document.documentElement.clientHeight
            this.left = this.clientWidth - this.itemWidth - 10
        },
        goDl() {
            if (this.$st.state.defalutLan == 'en') {
                window.open('https://img.luckyvnk188admin.work/uploads/20221108/edfe146df2671555109f8b4b442a2e99.jpg')
            } else {
                window.open('https://img.luckyvnk188admin.work/uploads/20221108/508b37ef321dda0ba09b59cbeb4c77c3.jpg')
            }
        },
        async getLanConfig() {
            // console.log(this.defalutLan)
            let r = await this.$http.get('/api/common/config');
            this.SETDEFAULTLAN(r.data.data.current_lang);
            if (!this.defalutLan) this.languageActive = r.data.data.current_lang || 'vi-vn'
            else this.languageActive = this.defalutLan;

        },
        //获取系统公告
        async getXtNotice() {
            let res = await this.$http.get("/api/live/sport/get_pop_notice/");
            if (res && res.data.code == 1) {
                // console.log(res)
                // this.noticeData=res.data.data;
                this.SETNOTICEDATA(res.data.data);
            }

        },

        //获取代理系统公告
        async getDlXtNotice() {
            let res = await this.$http.get("/api/live/sport/get_pop_notice_dl/");
            if (res && res.data.code == 1) {
                // this.noticeData=res.data.data
                this.SETNOTICEDATA(res.data.data);

            }
        },
        searchGame(e) {
            this.$http.get('/api/vendor/search', {
                params: {
                    key: this.searchText,
                }
            }).then(res => {
                if(e){
                    this.$vux.loading.hide()
                }
                if (res.data.code == 1) {
                    this.searchGameList = res.data.result;
                    this.searchPopular = res.data.popular;
                    this.showShortcut = false
                }
            })
        },
        getHotlive() {
            this.$http.get('/api/vendor/homegames', {
                params: {
                    flag: 1,
                    skin: this.skin ? this.skin : 0
                }
            }).then(res => {
                if (res.data.code == 1) {
                    // this.hotLive=res.data.data[2].list
                    // this.hotCock=res.data.data[5].list
                    this.hotGames = res.data.data
                    new Swiperc('.live-swiper', {
                        paginationClickable: true,
                        spaceBetween: document.body.clientWidth / 37.5,
                        slidesPerView: 2.2,
                        observer: true,
                        observeParents: true,
                    });
                    new Swiperc('.dj-swiper', {
                        paginationClickable: true,
                        spaceBetween: document.body.clientWidth / 37.5,
                        slidesPerView: 2,
                        observer: true,
                        observeParents: true,
                    });
                }
            })
        },
        clearSearch() {
            let obj = {
                flag: 'del',
                text: ''
            }
            this.SETSEARCHLIST(obj)
        },
        toSearch() {
            if (this.searchText == '') {
                this.$vux.toast.text(this.$t('newHome[21]'), 'middle')
                return
            }
            this.$vux.loading.show()
            this.searchGame(1)
            let obj = {
                flag: 'add',
                text: this.searchText
            }

            this.SETSEARCHLIST(obj)


        },
        getHotLotter() {
            this.$http.get('/api/lottery/countdown').then(res => {
                if (res.data.code == 1) {
                    // this.hotLottery=res.data.data.slice(0,6)
                    this.hotLottery = res.data.data;
                    if (this.swiper4 == '') {
                        this.swiper4 = new Swiperc('.lottery-swiper', {
                            paginationClickable: true,
                            spaceBetween: document.body.clientWidth / 37.5,
                            slidesPerView: 2.2,
                            observer: true,
                            observeParents: true,
                        });
                    }

                    let timeArr = []

                    for (let index = 0; index < this.hotLottery.length; index++) {
                        if (!this.djsTimeArr.length) {
                            this.djsTimeArr.push('--:--')
                        }
                        timeArr.push(this.hotLottery[index].next_closetime)

                    }


                    // console.log(this.djsTimeArr)
                    // console.log(timeArr)
                    this.timerArr(timeArr)
                    // if(this.djsTime1=='--:--'){
                    //     this.timer(this.hotLottery[0].next_closetime)
                    // }
                    // if(this.djsTime2=='--:--'){
                    //     this.timer2(this.hotLottery[1].next_closetime)
                    // }

                }
            })
        },
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
        toChat(){
            if(!this.codeToken) return this.$popup();
        if(this.$store.state.userinfo.user_id<0){
            this.$swBox({
                title: this.$t('tsTitle'),
                content: this.$t('swTip'),
                leftBtn: this.$t('loginText'),
                rightBtn:this.$t('registerText'),
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
     if(this.chatShow){
        this.SETCHAT(false)
     }else{
        this.SETCHAT(true)
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
                this_.swipertype5=new Swiperc('.swiper-containertype', {
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
            this.nav2Active = this.defalutLan == 'vi-vn' ? 'Tất cả' : 'All'
            this.$forceUpdate();
        },
        changeMenu2(i) {
            // this.SETNEWSHOW(i)
            let code = this.gameListData.findIndex((c, v) => {
                return c.code == i
            })
            this.SETNEWSHOW(code)
            // this.showGameCode=i
            this.nav2Active = this.defalutLan == 'vi-vn' ? 'Tất cả' : 'All'
            this.$refs.shareScroll.scrollTo(0, 0)
            this.$forceUpdate();
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
                if (code == 'mg_slot' || code == 'jdb_slot' || code == 'jili_slot'||code == 'pp_slot'||code == 'pt_slot'||code == 'pg_slot') {
                    let codeslot = this.gameListData.findIndex((c, v) => {
                        return c.code == 'slot'
                    })
                    let typeIndex=this.gameListData[codeslot].list.findIndex((g,d)=>{
                        return g.code==code
                    })
                
                setTimeout(()=>{
                    this.swipertype5.slideTo(typeIndex-4)
                },300)
                    if (code == 'jdb_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    } else if (code == 'mg_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    } else if (code == 'jili_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    }
                    else if (code == 'pp_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    }
                    else if (code == 'pt_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    }
                    else if (code == 'pg_slot') {
                        setTimeout(() => {
                            this.gameTypeIndex = typeIndex
                        }, 100)
                    }
                    this.SETNEWSHOW(codeslot)
                    this.$refs.shareScroll.scrollTo(0, 0)
                    return
                }
                window.open('/toGame/' + code + '/' + type + '/' + id);
            }
        },
        goQp(item, id) {

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
                if (item.code == 'ae_slot') {
                    window.open('/toGame/ae_slot/slot/0')
                    return

                }
                if (window.android) {
                    if (this.gameListMenu[this.gameTypeIndex].code == 'mg_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jdb_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jili_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'qm_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'fc_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pp_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'rich88_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pt_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pg_slot') {
                        this.$router.push('/toGame/' + item.vendor + '/' + item.code / +'/0');
                    } else {
                        if (this.gameListMenu[this.gameTypeIndex].code == 'ae_slot') {
                            window.push('/toGame/ae_slot/slot/0')
                            return
                        }
                        this.$router.push('/toGame/' + item.code + '/' + item.type + '/' + item.list[0].code)
                    }

                } else {
                    if (this.gameListMenu[this.gameTypeIndex].code == 'mg_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jdb_slot' || this.gameListMenu[this.gameTypeIndex].code == 'jili_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'qm_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'fc_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pp_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'rich88_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pt_slot'|| this.gameListMenu[this.gameTypeIndex].code == 'pg_slot') {
                        window.open('/toGame/' + item.vendor + '/' + item.code + '/0');
                        
                    }

                    else {
                        if (this.gameListMenu[this.gameTypeIndex].code == 'ae_slot') {
                            window.open('/toGame/ae_slot/slot/0')
                            return
                        }
                        // console.log(item)
                        window.open('/toGame/' + item.code + '/' + item.type + '/' + item.list[0].code)
                        // window.open('/toGame/'+item.code+'/'+item.type+'/0')
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
                this.$vux.loading.hide();
                if (res && res.data.code == 1) {
                    this.gameListData = res.data.data;

                    this.getlotteryGames()
                    this.SETHOMENEWDATA(this.gameListData);
                    if (this.homeNewShow > -1) {
                        this.showGameCode = this.gameListData[this.homeNewShow].code
                    }
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
            // console.log(90)
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
        timerArr(t) {
            if (window.timer1) clearInterval(window.timer1);
            window.timer1 = setInterval(() => {

                t.forEach((it, id) => {
                    t[id] = it - 1
                    //  console.log(it)
                    this.djsTimeArr[id] = this.count(it)
                    if (it <= -1) {
                        // this.getHotLotter()
                        this.djsTimeArr[id] = '--:--'
                    }
                    this.$forceUpdate()
                })
                // this.djsTime1 = this.count(t--);
                // if (t <= -1) {
                // this.getHotLotter()
                // this.djsTime1 = "--:--";
                // }
            }, 1000);
        },
        // timer(t) {
        //     if (window.timer1) clearInterval(window.timer1);
        //     window.timer1 = setInterval(() => {
        //         this.djsTime1 = this.count(t--);
        //         if (t <= -1) {
        //         this.getHotLotter()
        //         this.djsTime1 = "--:--";
        //         }
        //     }, 1000);
        //     },
        //     timer2(t) {
        //     if (window.timer2) clearInterval(window.timer2);
        //     window.timer2 = setInterval(() => {
        //         this.djsTime2 = this.count(t--);
        //         if (t <= -1) {
        //         this.getHotLotter()
        //         this.djsTime2 = "--:--";
        //         }
        //     }, 1000);
        //     },
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
                h = parseInt((parseInt(time / 60) / 60));
                d = parseInt(parseInt(time / 60) / 60 / 24);
                second = second >= 10 ? second : "0" + second;
                min = min >= 10 ? min : "0" + min;
                if (!h) h = "";
                else h = h >= 10 ? h : "0" + h;


                if (h >= 1) {
                    t = h + ":" + min + ":" + second;
                } else {
                    t = min + ":" + second;
                }


            } else {
                t = "00:" + (time >= 10 ? time : "0" + time);
            }
            return t;
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
    .language-dialog {
        position: fixed;
        top: 0;
        bottom: 0;
        background: rgba(45, 39, 39, 39%);
        width: 100%;
        z-index: 999;

        ul {
            position: absolute;
            background: #fff;
            color: #000;
            width: 92%;
            text-align: center;
            font-size: 0.28rem;
            z-index: 10;
            left: 4%;
            top: 33%;
            border-radius: 0.4rem;

            li {
                padding: 0.5rem 0.4rem;
                display: flex;
                align-items: center;
                font-size: .45rem;
                justify-content: space-between;

                i {
                    display: block;
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    border: 2px solid #000;
                    padding: 2px;

                    span {
                        width: 100%;
                        height: 100%;
                        background: #fff;
                        display: block;
                        border-radius: 50%;
                    }
                }

                // border-bottom: 0.5px solid rgba(228,231,235,54%);
                &:first-child {
                    border-bottom: 0.5px solid rgb(228, 231, 235);
                }

                &.active {
                    i {
                        border: 2px solid blue;

                        span {
                            background: blue;
                        }
                    }
                }
            }
        }
    }

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

        .language-box {
            margin-left: 0.1rem;
            position: relative;

            .language-icon {
                padding-top: 0.1rem;

                img {
                    width: 0.8rem;
                }
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

        &.notice-golden {
            background: url("../../assets/images/skin/golden/notice.png") #1A1A1A no-repeat 0.4rem center;
            background-size: 4% !important;
            border-radius: 0;
            ;

            span {
                color: #746E49;
            }

            .online-box {
                border: 0.5px solid #746E49;
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

        .search-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;

            input {
                height: 0.8rem;
                background: #F6F6F6;
                border-radius: 1.2rem;
                font-size: 0.32rem;
                padding-left: 0.8rem;
                width: 6.4rem;
            }

            span {
                border-radius: 1.2rem;
                line-height: 0.8rem;
                text-align: center;
                background: linear-gradient(180deg, #A2C5F6 0%, #6496F2 72.92%, #6091EF 100%);
                border: 1px solid #EBF0F6;
                box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #417EE5;
                color: #fff;
                padding: 0 0.2rem;

                &.w-pink {

                    background: linear-gradient(180deg, #FFC9A2 0%, #FC8379 72.92%, #FB6E6D 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #B45D2C;
                    color: #fff;

                }

                &.w-blue {

                    background: linear-gradient(180deg, #49CAE2 0%, #11B7D9 72.92%, #06B4D8 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #2C83B4;
                    color: #fff;

                }

                &.w-green {
                    background: linear-gradient(180deg, #35E097 0%, #24CA80 72.92%, #24CA80 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(6, 45, 121, 0.15), inset 0px -3px 0px #2CB432;
                    color: #fff;

                }

                &.w-maingreen {
                    background: linear-gradient(180deg, #78D0B2 0%, #14A071 72.92%, #00865A 100%);
                    border: 1px solid #EBF0F6;
                    box-shadow: 0px 2px 3px rgba(43, 121, 6, 0.15), inset 0px -3px 0px #087A43;
                    color: #fff;

                }

                &.w-golden {
                    background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                    border: 1px solid #B99D68;
                    box-shadow: 0px 2px 3px rgba(6, 121, 73, 0.15);
                    color: #7D5F1D;

                }

            }
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

            &.w-golden {
                li {
                    background: #3E372F;
                    border: 1px solid #B99D68;
                    box-shadow: 0px 2px 3px rgba(6, 121, 73, 0.15);
                    color: #7D5F1D;
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

                &.active-golden {
                    background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                    border: 1px solid #B99D68;
                    box-shadow: 0px 2px 3px rgba(43, 121, 6, 0.15), inset 0px -3px 0px #D6B966;
                    color: #A85100;
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

                &.color-golden li {
                    color: #E3CF95;
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

        &.module-title-golden {
            &::before {
                background: #928151;
            }

            h2 {
                color: #fff;
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

        .information-item {
            padding: 0 0.25rem;

            .information-title {
                display: flex;
                justify-content: space-between;
                margin: 0.1rem 0;
                align-items: center;

                span {
                    font-size: 0.42rem;
                    color: #32413C;
                }

                i {
                    font-size: 0.26rem;
                    color: #1486FF;
                    // text-decoration: underline;
                }
            }

            .hot-game {
                display: flex;
                justify-content: space-between;

                .game-item {
                    // width: 48%;
                    width: 4.1rem;
                    margin-right: 0.2rem;
                    min-height: 2rem;
                    position: relative;

                    .content {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;

                        .game-icon {
                            width: 1.2rem;
                            position: absolute;
                            bottom: 0.2rem;
                            left: 0.1rem;
                        }

                        .djs-box {
                            width: 2rem;
                            height: 0.4rem;
                            background: url('../../assets/images/newHome/djs_bg.png') no-repeat;
                            background-size: 100% 100%;
                            margin: 0 auto;
                            color: #484C52;
                            text-align: center;

                            img {
                                width: 0.3rem;
                                margin-right: 4px;
                            }

                            span {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }

                        ul {
                            display: flex;
                            justify-content: space-evenly;
                            margin: 0.15rem 0;

                            li {
                                width: 0.6rem;
                                height: 0.6rem;
                                border-radius: 50%;
                                background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 63.54%, rgba(233, 233, 233, 0.89) 100%);
                                // border: 0.5px solid rgba(0, 0, 0, 0.1);
                                box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(0, 0, 0, 0.1);
                                text-align: center;
                                line-height: 0.6rem;
                                color: #4E4E4E;
                            }
                        }

                        .issue-box {
                            background: rgba(79, 0, 0, 0.4);
                            color: #fff;
                            font-size: 14px;
                            text-align: right;
                            padding-right: 0.4rem;
                            line-height: 0.5rem;
                        }

                        .togame-btn {
                            width: 1.68rem;
                            background: #fff;
                            border-radius: 0.1rem;
                            text-align: center;
                            padding: 0.06rem 0;
                            margin-left: 2.2rem;
                            margin-top: 0.1rem;
                            color: #1486FF;

                            &.color-pink {
                                color: #FB796B;
                            }

                            &.color-blue {
                                color: #0CB6D9;
                            }

                            &.color-green {
                                color: #00B681;
                            }

                            &.color-maingreen {
                                color: #01B373;
                            }
                        }
                    }
                }
            }
        }
    }

    .ag-list {
        ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0.2rem;
            padding-bottom: 0.2rem;

            li {
                width: 46%;
                width: 46%;
                margin: 0.1rem 2%;

                p {
                    text-align: center;
                    color: #000;
                    line-height: 0.5rem;
                }
            }
        }
    }

    .sport-list {
        ul {
            li {
                padding: 0 0.2rem;
                margin-bottom: 0.2rem;

                img {
                    max-height: 2.5rem;
                }
            }
        }
    }

    .game-list {
        margin-top: 0.4rem;

        >ul {
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

        .search-bottom {
            // height: 10rem;
            background: #fff;
            margin-top: -1.3rem;
            z-index: 99;
            position: relative;
            padding: 0 0.36rem;
            padding-bottom: 0.1rem;

            .search-shortcut {
                .title {
                    display: flex;
                    align-items: center;

                    h2 {
                        color: #32413C;
                        margin-left: 0.1rem;
                    }

                    i {
                        display: inline-block;
                        width: 3px;
                        height: 0.48rem;
                        background: linear-gradient(1.79deg, #488DF2 2.02%, #CBE0FB 98.99%);
                        border-radius: 9px;
                    }

                    .del-btn {
                        width: 0.4rem;
                        margin-left: auto;
                    }
                }

                .shortcut-list {
                    margin: 0.3rem 0;

                    p {
                        text-align: center;
                    }

                    ul {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            min-width: 1.2rem;
                            height: 0.72rem;
                            background: #F6F6F6;
                            border-radius: 1rem;
                            margin-right: 0.2rem;
                            margin-bottom: 0.2rem;
                            text-align: center;
                            line-height: 0.72rem;
                            padding: 0 0.2rem;
                        }
                    }
                }

                &.w-pink {
                    .title {
                        i {
                            background: linear-gradient(180deg, #FFCAA2 0%, #FB6E6D 100%);
                        }
                    }
                }

                &.w-blue {
                    .title {
                        i {
                            background: linear-gradient(180deg, #48CAE2 0%, #06B4D8 100%);
                        }
                    }
                }

                &.w-green {
                    .title {
                        i {

                            background: linear-gradient(180deg, #C9F3DF 0%, #26CD7F 100%);
                        }
                    }
                }

                &.w-maingreen {
                    .title {
                        i {
                            background: linear-gradient(1.79deg, #008258 2.02%, #00BF7A 98.99%);
                        }
                    }
                }

                &.w-golden {
                    .title {
                        i {
                            background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                        }
                    }
                }


            }

            .search-result {
                >p {
                    text-align: center;
                    padding: 0.5rem 0;
                    font-size: 0.36rem;
                }

                >ul {
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

        &.game-list-golden {
            .cp-select {
                span {
                    color: #cecece;

                    &.active {

                        color: #AB9B62;

                        &::before {
                            background: #AB9B62;
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
}

.header-golden {
    background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%) !important;
    color: #E3CF95 !important;

    .no-login-home {

        border: 0.5px solid #E3CF95 !important;
    }
}

.goldenSkin {

    .online-box {
        span {
            color: #AB9B62 !important;
        }

        border:1px solid #AB9B62 !important;
    }

    .game-menu {
        background: #252A31 !important;
    }

    .ag-list,
    .game-list {
        ul {
            li {
                p {
                    color: #AB9B62 !important;
                }
            }
        }
    }

    .game-type {
        background: #1A1A1A !important;
        margin: 0 !important;
        padding: .3rem .1rem !important;

        .search-top {
            input {
                background: #464B53 !important;
            }
        }
    }

    .search-bottom {
        background: #1F252C !important;

        h2 {
            color: #AB9B62 !important;
        }

        .shortcut-list {
            li {
                background: #464B53 !important;
                color: #cecece !important;
            }
        }
    }

    .game-list {
        margin-top: 0 !important;
    }

    .cp-select {
        background: #1A1A1A !important;
    }
}

.sjb {
    position: fixed;
    width: 30%;
    // height: 3rem;
    right: 2%;
    top: 50%;
    z-index: 10;

    .close-btn {
        width: 0.75rem;
        position: absolute;
        top: 0.5rem;
        left: -0.4rem;
    }
}
</style>