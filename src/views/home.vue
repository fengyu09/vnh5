<template>
    <div class="home-container" :class="skin == 5 ? 'home-container-golden' : ''">
        <Header_download v-if="lanCode != 2"></Header_download>
        <header class="home-header clearfix"
            :class="[{ header: skin == 0 }, { 'header-pink': skin == 1 }, { 'header-blue': skin == 2 }, { 'header-green': skin == 3 }, { 'header-maingreen': skin == 4 }, { 'header-golden': skin == 5 }]">
            <!--切换版本  -->
            <!-- <div class="backToOld" @click="changeVersion">Chuyển sang phiên bản mới</div> -->
            <span class="title clearfix">
                <i class="logo-icon fl" :style="lanCode == 2 ? 'width:3.8rem;top:0;' : ''">
                    <img src="../assets/images/newLogo.png" v-if="noticeType == 1 && (lanCode == 1 || lanCode == 5) && skin != 5"
                        alt="">
                    <img src="../assets/images/sfc.png" v-if="lanCode == 2 && skin != 5" alt="">
                    <img src="../assets/images/skin/golden/logo.png" v-if="noticeType == 1 && skin == 5" alt=""
                        style="width: 3.3rem;">
                    <img src="../assets/images/login/logo1-golden.png" v-if="noticeType == 2 && skin == 5" alt=""
                        style="width: 3.3rem;">
                    <!-- <img v-if="noticeType == 2&&lanCode!=2" src="../assets/images/newLogoDl.png" alt=""> -->
                </i>
            </span>

            <div class="cs" v-if="isLink" @click="showCs()"></div>
            <a @click="gotoUrl('messageCenter')" class="mess fr newsIconFFF">
                <i class="has-msg" v-if="nNum > 0"></i>
            </a>
        </header>
        <div v-if="!isCs" class="main-container" style=" background: #fff;">
            <!-- v-if="showBanner" -->
            <div class="banner" :class="{ bannerHide: !showBanner }">
                <!-- 切换版本 回到新版本 -->
                <div class="toNewversion" @click="changeVersion">
                    <img src="../assets/images/newHome/ToNew.png" alt />
                </div>
                <swiper :aspect-ratio="350 / 800" :auto="true" :loop="true">
                    <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
                        <!-- <img :src="item.image_url"> -->
                        <a href="javascript:;" v-if="item.url" @click="goUrl(item.url, item.title)">

                            <img :src="item.image_url" alt />
                        </a>
                        <a href="javascript:;" v-else>
                            <img :src="item.image_url" alt />
                        </a>
                    </swiper-item>

                </swiper>


                <div class="no-banner" v-if="!bannerList.length"></div>
                <div class="online">
                    {{ $t('home.text[0]') }}: {{ onlinenumber }}
                </div>
            </div>

            <div class="notice-box notice-box-pt"
                :class="[{ 'notice-pink': skin == 1 }, { 'notice-blue': skin == 2 }, { 'notice-green': skin == 3 }, { 'notice-green': skin == 4 }, { 'notice-golden': skin == 5 }]">
                <marquee scrollAmount="3" scrolldelay="50" direction="left">
                    <span v-if="notice.length <= 0">no data</span>
                    <span v-for="(v, index) in notice" :key="index"
                        @click="$router.push({ path: '/msgDetail', query: { msg_id: v.id } })">{{ index + 1 }}.{{ v.content }}&nbsp;&nbsp;&nbsp;</span>

                </marquee>
            </div>

            <!-- 用户中心 -->
            <div class="user-center main-content" :class="skin == 5 ? 'user-center-golden' : ''">
                <dl :class="'user' + lanCode">
                    <dt>
                        <!-- :class="'user-head'+$store.state.userinfo.vip" -->
                        <div class="fl user-head" :class="'user-head' + $store.state.userinfo.vip"
                            @click="$store.state.codeToken ? $router.push('/member') : $router.push('/login')">
                            <img v-lazy="$store.state.avatar" v-if="$store.state.avatar" alt />
                            <img src="../assets/images/main/Frame.png" v-else alt />

                        </div>
                        <div class="fl user-name" v-if="$store.state.codeToken">
                            <span class="over-text">{{ $store.state.username }}</span>
                            <p>ID:{{ $store.state.userinfo.id }}</p>
                        </div>
                        <div class="fl user-name" v-if="!$store.state.codeToken">
                            <span class="over-text">{{ $t('home.text[0]') }}</span>
                            <p>
                                <router-link to="/login">{{ $t('loginText') }}</router-link>/
                                <a @click="goRegister">{{ $t('registerText') }}</a>
                            </p>
                        </div>
                    </dt>
                    <dd
                        :class="[{ 'user-qy-pink': skin == 1 }, { 'user-qy-blue': skin == 2 }, { 'user-qy-green': skin == 3 }, { 'user-qy-green': skin == 4 }, { 'user-qy-golden': skin == 5 }]">
                        <router-link to='/vip' class="vip"></router-link>
                        <router-link to='/wallet' class="phb"></router-link>
                        <router-link :to="lanCode == 2 ? '/usdtForm' : '/recharge'" class="recharge"></router-link>
                        <router-link to='/tx' class="withdrawal"></router-link>
                    </dd>
                </dl>
            </div>

            <!-- 游戏中心 -->
            <div class="game-center">
                <div class="left-nav">
                    <myScroll ref="gameListScroll" :bgColor="skin == 5 ? '1F252C' : 'fff'" :top="scrollTop" :left="0.2">
                        <ul ref="leftNav" style="width:1.2rem">
                            <li v-for="v, index in allGame" :key="index" :class="currType == index ? 'active' : ''"
                                @click="changeGame(index)">
                                <img :src="currType == index ? v.icon1 : v.icon" alt="">
                            </li>
                        </ul>
                    </myScroll>
                </div>
                <div class="right-content" :style="{ top: scrollTop + 'rem' }" :class="skin == 5 ? 'right-content-golden' : ''">
                    <!-- <myScroll
                    ref="gameScroll"
                    v-on:func="reLoad"
                    @func="scrollEnd"
                    :top="scrollTop"
                    :left="1.55"
                    @isScroll="isScroll"
                    
                    class="fl"
                    
                > -->
                    <div :style="{ top: currType * -gameBoxsHeight + 'px', position: 'absolute' }" class="content">
                        <div class="" v-for="v, index in allGame" :key="index" class="gameListItem" ref="gameBoxs"
                            v-swipeup="(e) => vueTouch('top')" v-swipedown="(e) => vueTouch('bottom')"
                            :style="{ height: gameBoxsHeight + 'px' }" @scroll="gameItemscroll($event)">
                            <div @click="goQp(vv)" v-for="vv, index1 in v.list" :key="index1">
                                <img :src="vv.img" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- </myScroll> -->
                </div>
            </div>

        </div>


        <!-- 测试速度 -->
        <div class="main-cs" v-if="isCs">
            <p class="address">{{ $t('home.text[1]') }}</p>
            <myScroll :top='1.4' :left='0' :bottom='1.6' :bgColor="$st.state.skin == 5 ? '161C23' : 'fff'" ref="csScroll">
                <div class="list">
                    <!-- 延迟高低区分： 50以上高
                ms≤500绿色
                500<ms<1000黄色
                ms≥1000红色 -->
                    <div class="item zg" v-for="v, index in lineList" :key="index"
                        :class="[{ 'green': v.speed <= 500 }, { 'yellow': v.speed < 1000 && v.speed > 500 }, { 'red': v.speed >= 1000 }]"
                        @click="goUrl(v.url)">
                        <div class="left">
                            <img v-show="v.speed < 1000 && v.speed > 500" src="../assets/images/zg.png" alt="">
                            <img v-show="v.speed <= 500" src="../assets/images/zd.png" alt="">
                            <img v-show="v.speed >= 1000" src="../assets/images/zg1.png" alt="">
                            <span>{{ v.speed }}ms</span>
                        </div>
                        <div class="cen" :class="skin == 5 ? 'golden-text-color' : ''">{{ v.url }}</div>
                        <div class="rig">
                            <span>{{ v.speed > 500 ? $t('home.text[3]') : $t('home.text[4]') }}</span>
                            <img src="../assets/images/jt.png" alt="">
                        </div>
                    </div>




                </div>
            </myScroll>

            <div class="submit-btn"
                :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-maingreen': skin == 4 }, { 'skin-btn-golden': skin == 5 }]"
                @click="onConfirmCs">{{ $t('home.text[2]') }}</div>
        </div>


        <Foot />
    </div>
</template>

<script>
import Foot from "../components/footer.vue";
import { mapState, mapMutations } from "vuex";
import { Swiper, SwiperItem } from 'vux'
import Header_date from '../components/header_date.vue';
import Header_download from '../components/header_download.vue';
export default {
    name: "hot",
    components: { Foot, Header_date, Header_download, Swiper, SwiperItem },
    data() {
        return {
            nNum: 0,
            bannerList: [], //banner图
            isL: false, //是否显示 下拉刷新的组件
            notice: [],
            playList: {},
            currType: this.$store.state.gamestatus.home || 0,
            scrollTop: 0,
            isScrollEnd: true,
            hotMatch: true, // 热门赛事弹窗
            allGame: [

            ],
            isCs: false,
            lineList: [],
            isLink: false,
            onlinenumber: 201,
            showBanner: true,
            gameBoxsHeight: 30,
            isScrollIng: false,
            scrollTimer: ''
        };
    },
    created() {
        if (this.codeToken) {
            this.checkNotice();//检查是否有系统消息
        }
        this.getInit();
        this.getOnline()
        setInterval(() => {
            this.getOnline()
        }, 6000);
        // if(!this.$store.state.isDownLoad){
        //     this.isDownload = 1.2
        // }else{
        //         this.isDownload = 3.1
        //     }
        if (this.lanCode != 2) {
            this.scrollTop = this.$store.state.isDownLoad ? 10.5 : 8.5
        } else {
            this.scrollTop = 8.5
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
            "lanCode"
        ])
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener("popstate", this.pageBack, false);
        next();
    },
    filters: {
        filterSd(s) {
            if (s > 500) {
                return 'Độ trễ cao'
            } else {
                return 'Độ trễ thấp'
            }
        }
    },
    watch: {
        allGame: function () {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$refs.gameScroll.Myscroll.scrollTo(0, this.$store.state.scrollYPosition[this.$route.name] ? this.$store.state.scrollYPosition[this.$route.name] : 0);
                }, 20)

            })
        },
        currType: function (n) {
            if (n > 0) {
                this.showBanner = false;
                if (this.lanCode != 2) {
                    this.scrollTop = this.$store.state.isDownLoad ? 5.8 : 4
                } else {
                    this.scrollTop = this.$store.state.isDownLoad ? 4 : 4
                }

            } else {
                this.showBanner = true;
                if (this.lanCode != 2) {
                    this.scrollTop = this.$store.state.isDownLoad ? 10.5 : 8.5
                } else {
                    this.scrollTop = this.$store.state.isDownLoad ? 8.5 : 8.5
                }

            }
            this.SETGAMESTATUS({ key: 'home', val: n })
            if (n > 2) {
                this.$refs.gameListScroll.scrollBottom()
            }
            else {
                this.toBottom = false
                this.$refs.gameListScroll.scrollTo(0, 0)
            }
        },
        isDownLoad: function (n) {
            if (this.showBanner) {
                this.scrollTop = this.$store.state.isDownLoad ? 10.5 : 8.5
            } else {
                this.scrollTop = this.$store.state.isDownLoad ? 5.8 : 4
            }


        },
        scrollTop: function (n) {

            this.$nextTick(() => {
                setTimeout(() => {
                    this.gameBoxsHeight = document.querySelector('.right-content').offsetHeight
                }, 20)
            })
        },
        'skin': function () {
            this.getGameList(true);
        }
    },
    methods: {
        ...mapMutations(["SETWEBDATA", "SETHOMENAV", "SETPURE", "SETSKINDATA", "SETGAMESTATUS", "SETBANNER_S", "SETHOMEGAME", "SETUSERTOKEN", "SETHOTMATCH", "SETVERSION"]),
        changeVersion() {
            this.SETVERSION(1);
            this.$router.push('/');
        },
        gameItemscroll(e) {
            clearTimeout(this.scrollTimer)
            this.isScrollIng = true
            setTimeout(() => {
                this.isScrollIng = false
            }, 500);

        },
        vueTouch(flag) {
            if (this.isScrollIng) {
                return
            }
            // console.log(this.$refs.gameBoxs[this.currType].scrollHeight-this.gameBoxsHeight)
            // console.log(this.$refs.gameBoxs[this.currType].scrollTop)
            if (flag == 'top') {
                if (this.currType < this.allGame.length - 1) {
                    // if(this.$refs.gameBoxs[this.currType].scrollHeight-this.gameBoxsHeight==this.$refs.gameBoxs[this.currType].scrollTop){
                    this.currType++
                    // }

                }
            }
            else {
                if (this.currType > 0) {
                    // if( this.$refs.gameBoxs[this.currType].scrollTop<1){
                    this.currType--
                    // }

                }

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
        //获取网址
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
        ping(url, i) {
            var responseTime, requestTime, ping;
            requestTime = new Date().getTime();
            this.$http.get(url).then(res => {
                responseTime = new Date().getTime();
                console.log(responseTime)
                ping = Math.abs(requestTime - responseTime);
                this.lineList[i].speed = ping;
            });

        },
        // 测试网速
        onConfirmCs() {
            for (let i = 0, len = this.lineList.length; i < len; i++) {
                this.ping(this.lineList[i].url, i)
            }
        },
        changeHotMatch() {
            this.SETHOTMATCH(true)
        },
        goUrl(url, title) {
            window.open(url)
        },
        changeGame(i) {
            this.isScrollEnd = false
            this.currType = i
            setTimeout(() => {
                this.$refs.gameScroll.scrollTo(0, -this.$refs.gameBoxs[i].offsetTop)
            }, 100);
        },
        goRegister() {
            if (this.noticeType == 1) {
                if (this.$route.query.c && this.$route.query.c != 'undefined') {
                    this.$router.push('/register?c=' + this.$route.query.c)
                } else {
                    this.$router.push('/register?c=')
                }
            } else {
                if (this.$route.query.c && this.$route.query.c != 'undefined') {
                    this.$router.push('/RegisterDl?c=' + this.$route.query.c)
                } else {
                    this.$router.push('/RegisterDl?c=')
                }
            }
        },
        scrollEnd(i, d) {
            if (i == 'end') {
                this.isScrollEnd = true
            }
        },
        isScroll(d) {
            if (!this.isScrollEnd) {
                return
            }
            if (-d.y < this.$refs.gameBoxs[1].offsetTop) {
                this.currType = 0
            }
            if (-d.y >= this.$refs.gameBoxs[1].offsetTop && -d.y < this.$refs.gameBoxs[2].offsetTop) {
                this.currType = 1
            }
            if (-d.y >= this.$refs.gameBoxs[2].offsetTop && -d.y < this.$refs.gameBoxs[3].offsetTop) {
                this.currType = 2
            }
            if (-d.y >= this.$refs.gameBoxs[3].offsetTop && -d.y < this.$refs.gameBoxs[4].offsetTop) {
                this.currType = 3
            }
            if (d.y <= this.$refs.gameScroll.maxScrollY) {
                this.currType = 4
            }
            //  if(-d.y>=this.$refs.gameBoxs[4].offsetTop){
            //     this.currType=4
            // }
        },

        goQp(item, id) {
            if (item.code == 'lg_lottery') {
                this.$router.push('/lgLottery')

            } else if (item.code == 'ky') {
                this.$router.push('/kyqp');
            } else if (item.code == 'fh_chess') {
                this.$router.push('/lgqp');
            } else if (item.code == "mg_slot") {
                this.$router.push('/mgdz');
            } else if (item.code == "jdb_slot") {
                this.$router.push('/mgdz?title=JDB&type=jdb');
            } else if (item.code == "jili_slot") {
                this.$router.push('/mgdz?title=JILI&type=jili');
            } 
            else if (item.code == "pp_slot") {
                this.$router.push('/mgdz?title=PP&type=pp');
            } 
            else if (item.code == "pg_slot") {
                this.$router.push('/mgdz?title=PG&type=pg');
            } 
            else if (item.code == "pt_slot") {
                this.$router.push('/mgdz?title=PT&type=pt');
            } else {
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
                        this.$router.push('/toGame/' + item.code + '/' + item.type + '/' + id)
                    } else {
                        window.open('/toGame/' + item.code + '/' + item.type + '/' + id);
                    }

                }

            }

        },
        gotoUrl(url) {
            this.$router.push('/' + url);
        },
        goOnline() {
            window.open(customer);
        },
        async checkNotice(url) {
            if (this.codeToken && this.userinfo.user_id < 0) {
                return;
            } else {
                let res = await this.$http.get(
                    '/api/live/sport/get_message_count/', {
                    params: {
                        client_type: 3,
                        api: this.noticeType == 1 ? 1 : 5
                    }
                }
                );
                if (res && res.data.code == 1) {
                    localStorage.setItem("news", JSON.stringify(res.data.data));
                    this.nNum = res.data.data.msgCount;
                }
            }
        },
        getInit() {
            this.getGameList();
            if (this.noticeType == 1) {
                this.getNotice();//获取官方滚动公告
                this.getcsLink();
            } else {
                this.getSystemNoticeDl();//获取代理滚动公告
                this.getcsLinkDl();
            }
            this.getBanner();

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
        async getSystemNoticeDl() {
            let res = await this.$http.get(" /api/live/sport/system_notice_dl/");
            if (res && res.data.code == 1) {
                this.notice = res.data.data || [];
            }
        },

        reLoad(data, obj) {
            if (data == "down") {
                this.isL = true;
                this.getGameList(true);
                this.getBanner(true);
            } else if (data == "up") {
            } else if (data == 'end') {
                obj.name = this.$route.name;
                this.$store.commit('SETPOSITIONY', obj)

            }
        },
        async getGameList(flag) {
            this.allGame = this.$store.state.homeGame || [];
            if (!flag && this.allGame.length) {
                setTimeout(() => {
                    this.$refs.gameScroll.Myscroll.refresh(); //重新计算高度，刷新滚动条
                }, 50);
                return;
            }
            let res = await this.$http.get('/api/vendor/homegames', {
                params: {
                    skin: this.skin ? this.skin : 0
                }
            })
            this.allGame = res.data.data;
            this.SETHOMEGAME(res.data.data || [])
            //     document.body.removeEventListener(
            //     "touchmove",

            //     function(e) {
            //     },
            //     { passive: false }
            // );

            setTimeout(() => {
                this.$refs.gameScroll.Myscroll.refresh(); //重新计算高度，刷新滚动条
            }, 50);
        }

    },
    mounted() {
        this.gameBoxsHeight = document.querySelector('.right-content').offsetHeight
    },

};
</script>

<style scoped lang="less">
.rem(@name, @px) {
    @{name}: unit(@px/75, rem)
}

.home-container-golden {
    background: #1A1A1A;
    position: fixed;
    width: 100%;
    height: 100%;

    &.notice-box-pt {}
}

.home-header {
    height: 1.2rem;
    z-index: 1;
    position: relative !important;
    background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);

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

    &.header-golden {
        background: linear-gradient(89.97deg, #1E1E1E 0.02%, #3A3F44 99.97%) !important;
        color: #E3CF95 !important;

        .newsIconFFF {
            background: url('../assets/images/skin/golden/mess.png') center no-repeat !important;
            background-size: 66.66% !important;
        }

        .cs {
            background: url("../assets/images/skin/golden/cs.png") no-repeat;
            background-size: contain;

        }
    }

    span {
        display: inline-block;

        .logo-icon {
            width: 3.1rem;
            .rem(height, 80);
            top: 0.1rem;
            position: relative;
        }
    }

    >a {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        top: 0.18rem;
    }

    .newsIconFFF {
        background: url("../assets/images/newyear/sy_xx.png") no-repeat center;
        background-size: 66.66%;
        /*margin:.2rem 0.3rem 0 0;*/
        position: absolute;
        top: 0.2rem;
        right: 4%;
    }

    .mess {
        position: absolute;
        top: 0.2rem;
        right: 4%;

        i.has-msg {
            position: absolute;

            background: #FF5640;
            border-radius: 50%;

            width: 0.22rem;
            height: 0.22rem;
            right: 0.1rem;
            top: 0.1rem;
        }
    }

    .cs {
        position: absolute;
        top: 0.35rem;
        right: 14%;
        width: 0.5rem;
        height: 0.5rem;
        background: url("../assets/images/Subtract.png") no-repeat;
        background-size: contain;

    }


}


/*公告*/
.notice-box {
    margin: 0 auto;
    background-size: 8% !important;
    border-radius: 20px;
    color: #666;
    font-size: 0.32rem;
    min-height: 0.95rem;
    padding: 0 .3rem;

    &.notice-box-pt {
        background: url("../assets/images/newHome/lb.png") #fff no-repeat 0.4rem center;
        background-size: 4% !important;
    }

    &.notice-pink {
        background: url("../assets/images/skin/pink/lb.png") #fff no-repeat 0.4rem center;
        background-size: 4% !important;
    }

    &.notice-blue {
        background: url("../assets/images/skin/blue/lb.png") #fff no-repeat 0.4rem center;
        background-size: 4% !important;
    }

    &.notice-green {
        background: url("../assets/images/skin/green/lb.png") #fff no-repeat 0.4rem center;
        background-size: 4% !important;
    }

    &.notice-golden {
        background: url("../assets/images/skin/golden/notice.png") #1A1A1A no-repeat 0.4rem center !important;
        background-size: 4% !important;
        border-radius: 0 !important;

        span {
            color: #746E49 !important;
        }

        .online-box {
            border: 0.5px solid #746E49 !important;
        }
    }


    marquee {
        width: 90%;
        padding: 0.15rem 0 0.15rem 0;
        margin-left: 1rem;
        float: left;

        span {
            vertical-align: -webkit-baseline-middle;
            color: #6A86B9;
        }
    }

}

// 用户
.user-center {
    padding: .2rem;
    max-width: 750px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    background: #fff;

    dl {
        display: flex;

        dt {
            flex: 4;

            .user-head {
                .rem(width, 80);
                .rem(height, 80);
                border-radius: 50%;
                .rem(margin-right, 10);
                margin-left: 0.15rem;
                position: relative;

                img {
                    .rem(width, 80);
                    .rem(height, 80);
                    overflow: hidden;
                    border-radius: 50%;
                }

                &::before {
                    position: absolute;
                    content: '';
                    .rem(width, 100);
                    .rem(height, 100);

                    top: -.1rem;
                    left: -.13rem;
                }


            }

            .user-head1 {
                &::before {
                    background: url(../assets/images/newHome/VIP_01.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head2 {
                &::before {
                    background: url(../assets/images/newHome/VIP_02.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head3 {
                &::before {
                    background: url(../assets/images/newHome/VIP_03.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head4 {
                &::before {
                    background: url(../assets/images/newHome/VIP_04.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head5 {
                &::before {
                    background: url(../assets/images/newHome/VIP_05.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head6 {
                &::before {
                    background: url(../assets/images/newHome/VIP_06.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head7 {
                &::before {
                    background: url(../assets/images/newHome/VIP_07.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-head8 {
                &::before {
                    background: url(../assets/images/newHome/VIP_08.png) no-repeat;
                    background-size: contain;
                }
            }

            .user-name {
                padding-top: .1rem;
                .rem(font-size, 22);
                padding-left: .15rem;

                p,
                a {
                    color: #6A86B9;

                }

                span {
                    width: 2.8rem;
                    display: inline-block;

                    &.over-text {
                        color: #445779;
                        .rem(font-size, 26);
                    }
                }
            }

        }

        &.user1 {
            dd {
                flex: 4;
                display: flex;
                background: url(../assets/images/newHome/jgq.png) no-repeat center;
                background-size: contain;

                &.user-qy-pink {
                    background: url(../assets/images/skin/pink/jgq.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-blue {
                    background: url(../assets/images/skin/blue/jgq.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-green {
                    background: url(../assets/images/skin/green/jgq.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-golden {
                    background: url(../assets/images/skin/golden/jgq.png) no-repeat center;
                    background-size: contain;
                }

                >a {
                    flex: 1;
                    display: inline-block;
                    padding-top: 1rem;
                    .rem(height, 88);
                    .rem(font-size, 18);
                    color: #445779;

                }
            }
        }

        &.user2,
        &.user5 {
            dd {
                flex: 4;
                display: flex;
                background: url(../assets/images/newHome/jgq-yw.png) no-repeat center;
                background-size: contain;

                &.user-qy-pink {
                    background: url(../assets/images/skin/pink/jgq-yw.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-blue {
                    background: url(../assets/images/skin/blue/jgq-yw.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-green {
                    background: url(../assets/images/skin/green/jgq-yw.png) no-repeat center;
                    background-size: contain;
                }

                &.user-qy-golden {
                    background: url(../assets/images/skin/golden/jgq1.png) no-repeat center;
                    background-size: contain;
                }

                >a {
                    flex: 1;
                    display: inline-block;
                    padding-top: 1rem;
                    .rem(height, 88);
                    .rem(font-size, 18);
                    color: #445779;

                }
            }
        }

    }

    &.user-center-golden {
        background: #252A31;

        .user-name {
            color: #928151;

            .over-text,
            a,
            p {
                color: #928151;
            }
        }
    }
}

//游戏
.game-center {
    // display: flex;
    padding: 0 .2rem;
    max-width: 750px;
    overflow: hidden;

    .left-nav {
        // flex: 1;
        width: 1.2rem;
        overflow: hidden;

        li {
            img {
                .rem(height, 180);
                .rem(width, 90);
            }

        }
    }

    .right-content {
        // flex:5;
        width: 8.2rem;
        overflow: hidden;
        margin-left: 1.5rem;
        position: absolute;
        bottom: 1.4rem;

        .content {
            transition: top 0.6s;
        }

        .gameListItem {
            // display: flex;
            // flex-wrap: wrap;
            // height: 7.2rem;
            padding-top: 0.2rem;
            overflow: scroll;

            >div {
                width: 32%;
                margin-bottom: 0.1rem;
                margin-right: 0.1rem;
                display: inline-block;

                img {

                    height: 2.6rem;
                }
            }
        }

        &.right-content-golden {
            background: #1F252C !important;
        }
    }
}

// 轮播图
.banner {
    text-align: center;
    margin-top: .3rem;
    height: 4.2rem;
    position: relative;

    .toNewversion {
        position: absolute;
        left: 0rem;
        width: 2.5rem;
        top: -.3rem;
        z-index: 20;
    }

    a {
        display: block;

        >div {
            background: #f3f3f3;
            height: 100%;
            border-radius: 5px;
            overflow: hidden;
            width: 94.6%;
            box-shadow: 0px 1px 10px #ececec;
            display: inline-block;

            img {
                border-radius: 5px;
            }
        }
    }

    transition:height 0.2s;

    &.bannerHide {
        height: 0;
        overflow: hidden;
    }
}



// .no-banner {
//     height: 4.2rem;
//     background: #ededed;
//     width: 94.6%;
//     margin: 0 auto;
//     border-radius: 5px;
//     margin-bottom: 0.4rem;
// }

.online {
    position: absolute;
    background: rgba(0, 0, 0, 0.67);
    border-radius: 0.5rem;
    right: 0.4rem;
    top: 0.2rem;
    padding: 4px 6px;
    color: #fff;
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
        bottom: 2.5rem;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
    }
}

.backToOld {
    width: 2.5rem;
    border-radius: .1rem;
    border: 1px solid #fff;
    text-align: center;
    font-size: .3rem;
    position: absolute;
    left: .2rem;
    top: .2rem;
    line-height: .4rem;
    color: #fff;
}
</style>