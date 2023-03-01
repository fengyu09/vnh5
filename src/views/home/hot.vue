<template>
    <div class="home-container">
        <Home/>
        <!--滚动部分-->
        <myScroll
                ref="scrollWrapper"
                :isDown="true"
                v-on:func="reLoad"
                :isLoad="isL"
                :data="playList"
                :bgColor="'f5f7fa'"
                :top="2.5"
        >
            <div class="main-container " 
                :class="[{'main-container-dw':skin == 2},
                {'main-container-gq':skin == 4},
                {'main-container-qrj':skin == 3},
                {'main-container-new':isNew == 0},
                {'main-container-sdj':isNew == 5},
                {'main-container-ox':isNew == 6},
                {'main-container-uefa':isNew == 7},
                ]" style=" background: #f5f7fa;">
                <div class="onlineNum">当前在线：{{onlinenumber}}</div>
                <!--轮播图-->
                <div :class="[{'banner': skin==0},
                              {'bannerBG': skin==1},
                              {'banner-dw-home': skin==2},
                              {'banner-qrj-home': skin==3},
                              {'banner-gq-home': skin==4},
                              {'banner-sdj-home': skin==5},
                              {'banner-ox-home': skin==6},
                              {'banner-uefa-home': skin==7},
                              ]">
                    <div class="" id="swiperBanner" v-show="bannerList.length" style="position: relative;">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(v,index) in bannerList" :key="index">
                                <div class="lottery-item clearfix">
                                    <a href="javascript:;" v-if="v.url" @click="goUrl(v.url,v.title)">
                                        <!--<div class="banner-img" :style="'background:url('+v.image_url+') center no-repeat;background-size:cover'" v-if="v.image_url"></div>-->
                                        <div class="banner-img">
                                            <img :src="v.image_url" alt />
                                        </div>
                                    </a>
                                    <a href="javascript:;" v-else>
                                        <!--<div class="banner-img" :style="'background:url('+v.image_url+') center no-repeat;background-size:cover'" v-if="v.image_url"></div>-->
                                        <div class="banner-img">
                                            <img :src="v.image_url" alt />
                                            <!--<img v-lazy="v.image_url" alt="">-->
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination" id="bannerPagination" style="bottom:17px"></div>
                        <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
                    </div>
                    <div class="no-banner" v-if="!bannerList.length"></div>
                </div>
                <!--公告-->
                <!-- :class="[{'notice-box-dw':isNew == 2},{'notice-box-pt':isNew == 1 || isNew == 0 ||  isNew == 4 },{'notice-box-qrj':isNew == 3}]" -->
                <div class="notice-box notice-box-pt" :class="[{'notice-box-uefa':isNew ==7}]">
                    <marquee scrollAmount="3" scrolldelay="50" direction="left">
                        <span
                                v-for="(v,index) in notice"
                                v-if="notice.length"
                                :key="index"
                                @click="$router.push({path:'/msgDetail',query: { msg_id: v.id }})"
                        >{{index+1}}.{{v.content}}&nbsp;&nbsp;&nbsp;</span>
                        <span v-else>暂无公告</span>
                    </marquee>
                </div>
                <!--热门游戏-->
                <keep-alive>
                <div class="section hot-game">
                    <h3 :class="skin==0 ? 'title':'title1'">
                        <span>
                      <img v-if="skin==1" src="../../assets/images/newyear/remen (3).png"/>
                      <img v-if="skin==2" src="../../assets/images/dw/remen (2).png"/>
                      <img v-if="skin==3" src="../../assets/images/ValentineDay/remen.png"/>
                      <img v-if="skin==4" src="../../assets/images/National Day/rmyx.png"/>
                      <img v-if="skin==5" src="../../assets/images/Christmas/rmyx.png"/>
                      <img v-if="skin==6" src="../../assets/images/oxYear/rmyx.png"/>
                      <img v-if="skin==7" src="../../assets/images/UEFA/rmyx.png"/>
                      热门游戏
                    </span>
                        <router-link to="/gameCenter" :class="[{'color-sdj':skin==5},{'color-uefa':skin==7}]" class="more">更多 <i > >> </i></router-link>
                    </h3>
                    <div class="main-lottery">
                        <div class="lottery-item clearfix"  @click="getClick(v.name,v)"
                             v-for="(v,index) in qpData"
                             :key="index">
                                <dl>
                                    <dt>
                                        <img v-lazy="v.img_url" alt />
                                    </dt>
                                    <dd>
                                        {{v.name}}
                                    </dd>
                                </dl>
                        </div>
                    </div>

                    <ul class="no-lottery" v-show="!qpData.length">
                        <li v-for="(v,index) in 6" :key="index">
                            <div class="no-img"></div>
                            <div class="no-name"></div>
                        </li>
                    </ul>
                </div>
                </keep-alive>

                <!--热门主播-->
                <div class="hot-host section">
                    <h3  :class="skin==0 ? 'title':'title1'">
                        <span>
                      <img v-if="skin==1" src="../../assets/images/newyear/rmtj.png"/>
                      <img v-if="skin==2" src="../../assets/images/dw/rm_5_27_icon.png"/>
                      <img v-if="skin==3" src="../../assets/images/ValentineDay/icon-rm-min.png"/>
                      <img v-if="skin==4" src="../../assets/images/National Day/rmzb.png"/>
                      <img v-if="skin==5" src="../../assets/images/Christmas/rmzb.png"/>
                      <img v-if="skin==6" src="../../assets/images/oxYear/rmzb.png"/>
                      <img v-if="skin==7" src="../../assets/images/UEFA/rmzb.png"/>
                      热门直播
                    </span>
                        <router-link to="/allanchor" class="more" :class="[{'color-sdj':skin==5},{'color-uefa':skin==7}]">更多 <i > >> </i></router-link>
                    </h3>
                    <ul v-if="hotHost.length" class="clearfix hot hot-box">
                        <li v-for="(v,index) in hotHost" :key="index">
                            <a href="javascript:;" @click="goChat(v.anchor_id)">
                                <div class="lottery-type" :style="'background:url('+v.background+');background-size:cover'">{{v.name}}</div>
                                <!--<div class="img-box" :style="'background:url('+v.avatar+');background-size:cover'" v-if="v.avatar">-->
                                <div class="img-box" v-if="v.avatar" :key="v.avatar">
                                    <img v-lazy="v.avatar" alt />
                                </div>
                                <div class="img-box img-box-noHot" v-else>
                                    <img src="../../assets/images/main/web_11.png" alt />
                                </div>
                                <div class="clearfix section-mes">
                                    <p class="nickname-box fl">
                                        {{v.nickname}}
                                        <i class="online" v-if="v.live_status"></i>
                                    </p>
                                    <!--<p class="fr host-type" v-for="(vv,index2) in v.tags" :key="index2">-->
                                    <!--<i class="hot-type" :style="'background:url('+vv.icon+') center no-repeat;background-size: contain'"></i><span >{{vv.title}}</span>-->
                                    <!--</p>-->
                                    <p class="fr host-type" v-if="v.tags.length">
                                        <img v-lazy="v.tags[0].icon" alt class="hot-type" />
                                        <!--<i class="hot-type" :style="'background:url('+v.tags[0].icon+') center no-repeat;background-size: 100%'"></i>-->
                                        <span>{{v.tags[0].title}}</span>
                                    </p>
                                </div>
                                <p class="hot-mes clearfix">
                                    <span class="fl intro text-overflow">{{v.live_intro}}</span>
                                    <span class="fr online-num">{{v.online | filterOnlineNum}}</span>
                                </p>
                                <div class="red-pack" v-if="v.red_paper_num>0" :class="v.ext_img?'hasTz':''"></div>
                                <div class="cr-living" v-if="v.ext_img"><img :src="v.ext_img"/></div>
                            </a>
                        </li>
                    </ul>
                    <ul v-if="!hotHost.length" class="no-host">
                        <li>
                            <div class="no-img"></div>
                            <div class="no-name"></div>
                        </li>
                        <li>
                            <div class="no-img"></div>
                            <div class="no-name"></div>
                        </li>
                        <li>
                            <div class="no-img"></div>
                            <div class="no-name"></div>
                        </li>
                        <li>
                            <div class="no-img"></div>
                            <div class="no-name"></div>
                        </li>
                    </ul>
                </div>
                <p class="bottom-line">Tôi cũng có giới hạn đó~~</p>
            </div>
        </myScroll>
        <div class="teach-box" v-if="isteachHome">
            <div class="teach-one">
                <!-- <img src="../../assets/images/teach/home1-min.png" alt /> -->
                <img src="../../assets/images/teach/shouye.png" alt />
            </div>
            <div class="teach-three" @click="know">
                <img src="../../assets/images/teach/konw-min.png" alt />
            </div>
            <div class="teach-four" @click="know">
                <img src="../../assets/images/teach/xsjc.png" alt />
            </div>
            <div class="teach-five" @click="know">
                <img src="../../assets/images/teach/shouye2.png" alt />
            </div>
            <!-- <div class="teach-two">
                <img src="../../assets/images/teach/home2-min.png" alt />
            </div> -->
            <!--      <div class="teach-four">-->
            <!--        <img src="../../assets/images/newTask/task.png" alt />-->
            <!--      </div>-->
            <!--      <div class="teach-five">-->
            <!--        <img src="../../assets/images/newTask/task-teach-min.png" alt />-->
            <!--      </div>-->
        </div>
        <pop v-show="showstate" @toLogin="toLogin" @toRegist="toRegist" @closeIsLogin="closeIsLogin"></pop>
        <div v-html="gameUrl"></div>
<!--        纯净 直播切换-->
        <div class="pure-box" v-if="openPure2==1" @click="changePure"></div>

    </div>
</template>

<script>
    import Foot from "../../components/footer.vue";
    import { Swiper, SwiperItem } from "vux";
    import P from "../../assets/js/tool";
    import { getClickTimes } from "../../assets/js/public";
    import swiper from "swiper";
    //import BScroll from "better-scroll";
    import { mapState, mapMutations } from "vuex";
    import "../../../node_modules/swiper/css/swiper.min.css";
    import pop from "../../components/loginPop.vue";
    import Home from '../mainViews/home'
import { getToken, setToken } from '../../store/cookie';
    export default {
        name: "hot",
        components: { Swiper, SwiperItem, Foot, pop,Home },
        data() {
            return {
                showstate: false,
                hotHost: [], //热门主播
                bannerList: [], //banner图
                notice: [], //系统公告
                game: [], //热门彩票
                qpData:[],//热门游戏
                bannerImg: [], //广告图2
                playList: {},
                len: 6,
                isL: false, //是否显示 下拉刷新的组件
                isteachHome: "",
                imgObj: "../../static/site/imgs/load.png",
                nNum: 0,
                gameList: [],
                typeList: [],
                gameCurr: null,
                newType: "",
                IsLoading: false,
                isNew: 0, //皮肤状态
                isType: 1,
                slip: false,
                bjt:"background: url('../../assets/images/dw/bgshouye.png')!important;",
                isShowNewDot:false,
                gameUrl:'',
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                //  这里的vm指的就是vue实例，可以用来当做this使用
                if (window.webkit && from.name === null) {
                    //              window.location.reload();
                } else {
                    //              window.location.refresh();
                }
            });
        },
        created() {
            this.isNew = this.skin; //皮肤
            this.isteachHome =
                getToken("isteachHome") == "no" ? false : true;
            this.refreshData(true, true,false);
            // this.isShowRedDot();
            let self = this;
            let visProp = P.getHiddenProp();
            if (visProp) {
                let evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                document.addEventListener(
                    evtname,
                    function() {
                        if (document[P.getVisibilityState()] == "hidden") {
                        } else {
                            if (self.$route.name == "home") self.refreshData(true, true,true);
                        }
                    },
                    false
                );
            }
        },
        computed: {
            ...mapState([
                "host",
                "notices",
                "banners",
                "games",
                "ad",
                "codeToken",
                "avatar",
                "userinfo",
                "skin",
                "hdnotice",
                "xtnotice",
                "gfnotice",
                "AllNotices",
                "openPure2",
                "onlinenumber",
                "webInitData",
                "hotGame"
            ])
        },
        beforeRouteLeave(to, from, next) {
            //        alert("是否注销list的pops")
            window.removeEventListener("popstate", this.pageBack, false);
            next();
        },
        watch: {
            gameUrl:function () {
                this.$nextTick(() => {
                    // window.open(document.forms[0].getAttribute('action'));
                });
            },
            hotHost:function(){
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)

                })
            }
        },
        methods: {
            ...mapMutations([
                "SETHOST_S",
                "SETHOSTEXPERTS_S",
                "SETPRORED_S",
                "SETLIVEPREVIEW_S",
                "SETBANNER_S",
                "SETNOTICE_S",
                "SETGAME_S",
                "SETAD_S",
                "SETUSERNOTICE",
                "SETPURE",
                "SETSKINDATA",
                "SETHOTGAME",
                "SETPOSITIONY",
                "SETUSERTOKEN"
            ]),
            changePure(){
                this.SETPURE(1);
                //存现在的皮肤
                // if(f==1) {
                //     localStorage.setItem('isPskin',this.skin);
                //     this.SETSKINDATA(0);
                // }else{
                //     this.SETSKINDATA(localStorage.getItem('isPskin')&&localStorage.getItem('isPskin')!='undefined'&&localStorage.getItem('isPskin')!='null'?localStorage.getItem('isPskin'):0);
                // }
                localStorage.setItem('isPskin',this.skin);
                this.SETSKINDATA(0);
                this.$router.push('/gameCenter')
            },
            async getNoticeDl(){
                if (!this.codeToken) {
                    return;
                } else {
                    let res = await this.$http.get(
                        this.versionLive2 + "live/get_notice_new_dl/",{
                            params: {
                                user_id: this.userinfo.user_id
                            }
                        }
                    );
                    if (res && res.data.code == 1) {
                        localStorage.setItem("news", JSON.stringify(res.data.data));
                        this.nNum = res.data.data.msgCount;
                    }
                }
            },
            //是否显示红点
            async isShowRedDot(){
                // 领取过了，就不请求这个接口了 if() 直接是不显示
                if(!this.codeToken) return ;
                let res = await this.$http.get('/api2/user/task-prompt');
                if(res && res.data.code==1){
                    if(res.data.data.prompt==1){
                        //显示
                        this.isShowNewDot = true;
                    }else {
                        //不显示
                        this.isShowNewDot = false;
                    }
                }
            },
            gotoUrl(url){
              this.$router.push('/'+url);
            },
            closeIsLogin() {
                this.showstate = false;
            },
            toLogin() {
                this.$router.push("/login");
            },
            toRegist() {
                this.$router.push("/register");
            },
            getClick(type,value) {
                getClickTimes(type);
                this.goQp(value);
            },
            async checkNotice() {
                if (!this.codeToken) {
                    return;
                } else {
                    let res = await this.$http.get(
                        this.versionLive2 + "live/get_notice_new/",
                        {
                            params: {
                                user_id: this.userinfo.user_id
                                // lasttime:localStorage.getItem('lastTime') || 0
                                //        lasttime:0
                            }
                        }
                    );
                    if (res && res.data.code == 1) {
                        // debugger;
                        localStorage.setItem("news", JSON.stringify(res.data.data));
                        // localStorage.setItem('lastTime',Math.round(new Date().getTime()/1000))
                        // console.log(localStorage.getItem('lastTime'))

                        // this.SETUSERNOTICE(res.data.data);
                        //  if(this.hdnotice==0&&this.xtnotice==0&&this.gfnotice==0&&res.data.data.msgCount==this.AllNotices){
                        //     this.nNum = 0
                        //   } else{
                        this.nNum = res.data.data.msgCount;
                        // }
                    }
                }
            },
            async getGameList(flag){
                 if (!flag && this.hotGame.length){
                    this.qpData = this.hotGame;
                    this.playList.qpData = this.hotGame;
                    return 
                } 
                let res = await this.$http.get('/api2/user/hot-games');
                if(res && res.data.code==1){
                    this.qpData = res.data.data || [];
                     this.SETHOTGAME(this.qpData);
                    this.playList.qpData = res.data.data || [];
                }
            },
            goChat(id) {
                if (!this.userinfo.user_id && id == 1111111111) {
                    return this.$vux.confirm.show({
                        title: "",
                        content: "互动秀直播间需要进行登录哦~",
                        onCancel: () => {
                            //            console.log(this); //当前 vm
                        },
                        onConfirm: () => {
                            this.$router.push({ name: "login" });
                        }
                    });
                } else {
                    this.$router.push("/chat/" + id);
                }
            },
            downloadApp() {
                if (window.webkit) {
                    window.webkit.messageHandlers.needNav.postMessage({
                        url: window.location.href + "download?isOpen=123",
                        name: "App下载",
                        backUrl: window.location.href
                    });
                } else {
                    this.$router.push("/download");
                    //                window.location.href = "https://www.lgapp8.com/";
                }
            },
            goUrl(url, title) {
                if (window.webkit) {
                    window.webkit.messageHandlers.needNav.postMessage({
                        url: url,
                        name: title,
                        backUrl: window.location.href
                    });
                } else if (window.android) {
                    this.alertLL(url, title);
                } else {
                    window.location.href = url;
                }
            },
            alertLL(url, title) {
                android.show(url, title);
            },
            async goQp(item){
                if (!this.userinfo.user_id) {
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
                // if(item.type=='fh_chess'){
                //     window.open('//toGame/cp/'+item.id);
                // }else 
                if(item.type=='lott'){
                    //跳转去下注
                    this.$router.push('/betting/'+item.id)
                }else{
                    if(this.$store.state.userinfo.user_id<0){
                        // this.$vux.confirm.show({
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
                    window.open('//toGame/'+item.type+'/'+item.id);
                }

                // else if(item.type=='ag_live'){
                //     window.open('//toGame/live/-1');
                // }else if(item.type=='ag_slot'){
                //     window.open('//toGame/slot/-1');
                // }
                // else if(item.type=='bg_fish'){
                //     window.open('//toGame/bg_fish/'+item.id);
                // }else if(item.type=='bg_live'){
                //     window.open('//toGame/bg_live/'+item.id);
                // }else if(item.type=='ibc'){
                //     window.open('//toGame/ibc/'+item.id);
                // }else if(item.type=='ag_hunter'){
                //     window.open('//toGame/ag_hunter/'+item.id);
                // }else if(item.type=='ky'){
                //     window.open('//toGame/ky/'+item.id);
                // }else if(item.type=='im'){
                //     window.open('//toGame/im/'+item.id);
                // }


            },
            async goGameUrl(url){
                this.$vux.loading.show({text: 'Đang chạy...'});
                let res=  await this.$http.get('/api2/'+url);
                this.$vux.loading.hide();
                if(res.data.data){
                    this.gameUrl =res.data.data;
                }
            },
            activated() {
                if (window.history && window.history.pushState) {
                    window.addEventListener("popstate", this.pageBack, false); //false阻止默认事件
                }
            },

            know() {
                this.isteachHome = false;
                setToken("isteachHome", "no");
            },
            init(flag1, flag2,flag3) {
                if(this.noticeType==1){
                    // this.checkNotice();//检查是否有官方系统消息
                    this.getNotice();//获取官方滚动公告
                }else{
                     // this.getNoticeDl();//检查是否有代理系统消息
                     this.getSystemNoticeDl();//获取代理滚动公告
                }
                this.getBanner(flag3);
                this.getGameList(flag3);
                this.getHost(flag1, flag2);
            },
            goRecruit() {
                this.$router.push("/recruit");
            },
            goAnchor(id, s) {
                if (s == 1) {
                    if (!this.userinfo.user_id && id == 1111111111) {
                        return this.$vux.confirm.show({
                            title: "",
                            content: "互动秀直播间需要进行登录哦~",
                            onCancel: () => {
                                //            console.log(this); //当前 vm
                            },
                            onConfirm: () => {
                                this.$router.push({ name: "login" });
                            }
                        });
                    } else {
                        this.$router.push("/chat/" + id);
                    }
                } else {
                    this.$router.push("/anchorProfile/" + id);
                }
            },
            async getHost(flag1, flag2) {
                if (this.host.length) this.hotHost = this.host;
                if (!flag2) this.$vux.loading.show({ text: "Đang nhận..." });
                if (flag1) this.isL = true;
                let res = await this.$http.get(this.versionLive2 + "live/get_hot_list/");
                if (res && res.data.code == 1) {
                    this.isL = false;
                    this.$vux.loading.hide();
                    this.hotHost = res.data.data || [];
                    this.SETHOST_S(this.hotHost);
                    this.playList.hotHost = this.hotHost;
                }
            },
            async getBanner(flag) {
                if (!flag && this.banners.length){
                    this.bannerList = this.banners;
                    this.playList.bannerList = this.bannerList;
                     this.$nextTick(() => { 
                        this.initSwiper();
                    });
                    return 
                } 
                let res = await this.$http.get("/api/live/sport/get_banner/");
                if (res && res.data.code == 1) {
                    this.bannerList = res.data.data || [];
                    this.SETBANNER_S(this.bannerList);
                    this.playList.bannerList = this.bannerList;
                    this.$nextTick(() => { 
                        this.initSwiper();
                    });
                }
            },
            async getNotice() {
                //            if(this.notices.length) return this.notice = this.notices;
                let res = await this.$http.get("/api/live/sport/system_notice/");
                if (res && res.data.code == 1) {
                    console.log(res)
                    this.notice = res.data.data || [];
                    //                this.SETNOTICE_S(this.notice);
                }
            },
            async getSystemNoticeDl() {
                //            if(this.notices.length) return this.notice = this.notices;
                let res = await this.$http.get("/api/live/sport//system_notice_dl/");
                if (res && res.data.code == 1) {
                    this.notice = res.data.data || [];
                    //                this.SETNOTICE_S(this.notice);
                }
            },

            reLoad(data,obj) {
                if (data == "down") {
                    this.refreshData(true, true,true);
                } else if (data == "up") {
                }else if(data=='end'){
                    obj.name = this.$route.name;
                    this.SETPOSITIONY(obj)
                    
                }
            },
            refreshData(flag1, flag2,flag3) {
                if(flag3) this.SETHOST_S("");
                if(flag3) this.SETBANNER_S("");
                this.SETNOTICE_S("");
                this.SETAD_S("");
                this.init(flag1, flag2,flag3);
            },
            goUser() {
                if (this.codeToken) {
                    this.$router.push("/member");
                } else {
                    //登录弹窗
                    this.$router.push("/login");
                }
            },
            data_demo_do(data) {
                let odds = {};
                if (data) {
                    odds = data;
                } else return;
                let play_list = {};
                for (let k in odds) {
                    let v = odds[k];
                    if (!play_list[v.playd_guoup_id]) play_list[v.playd_guoup_id] = {};
                    if (!play_list[v.playd_guoup_id][v.playd_type_name])
                        play_list[v.playd_guoup_id][v.playd_type_name] = [];
                    play_list[v.playd_guoup_id][v.playd_type_name].push(v);
                }
                return play_list;
            },
            goOnline() {
                // let customer = JSON.parse(this.webInitData).customer;
                // if (window.webkit) {
                //     window.webkit.messageHandlers.needNav.postMessage({
                //     url: customer,
                //     name: "在线客服",
                //     backUrl: window.location.href
                //     });
                //     //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
                // } else if (window.android) {
                //     this.alertLL(customer, "在线客服");
                // } else {
                //     window.location.href = customer;
                // }
                window.location.href = customer;
            },
            initSwiper(){
                 var mySwiper1 = new swiper("#swiperBanner", {
                autoplay: {
                    delay: 3000 // 5秒切换一次
                },
                loop: true, //循环
                autoplay:true,
                pagination: {
                    el: "#bannerPagination"
                },
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
            }
        },
        mounted() {
            //彩种
            let mySwiper2 = new swiper("#swiperLottery", {
                autoplay: false,
                initialSlide: 0, //初始页索引
                pagination: {
                    el: "#lotteryPagination"
                },
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
            // let mySwiper3 = new swiper("#swiperLottery1", {
            //   autoplay: false,
            //   pagination: {
            //     el: "#lotteryPagination1"
            //   },
            //   observer: true, //修改swiper自己或子元素时，自动初始化swiper
            //   observeParents: true //修改swiper的父元素时，自动初始化swiper
            // });

            window.addEventListener("beforeunload", e => {
                this.refreshData(false, true);
            });

            //        到时候放App全局
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
        },
        filters: {
            filterTitle(n) {
                if (n.length > 30) return n.substring(0, 30) + "...";
                else return n;
            },
            filterType(n) {
                let className = "";
                if (n == 1) {
                    className = "new-tj";
                } else if (n == 2) {
                    className = "new-hot";
                } else {
                    className = "";
                }
                return className;
            },
            filterNickName(n) {
                if (n.length > 8) {
                    n = n.substring(0, n.length - (n.length - 8)) + "...";
                    return n;
                }
                return n;
            },
            filterTime(time) {
                if (!time) return;
                let t = new Date(time * 1000);
                let h = t.getHours() >= 10 ? t.getHours() : "0" + t.getHours();
                let min = t.getMinutes() >= 10 ? t.getMinutes() : "0" + t.getMinutes();
                return h + ":" + min;
            },
            filterOnlineNum(n) {
                if (n > 10000) {
                    return n / 10000 + "万";
                }
                return n;
            }
        },
        destroyed() {}
    };
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .pure-box{
        position: fixed;
        top:2.8rem;
        .rem(width,142);
        .rem(height,48);
        background: url("../../assets/images/pure_icon.png") no-repeat;
        background-size: contain;
        z-index: 10;
    }
    .down-load {
        color: #fff !important;
        font-size: 0.3rem !important;
        background: #ff513e;
        padding: 0 0.38rem;
        border-radius: 20px;
        height: 0.65rem;
        line-height: 0.66rem;
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
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
            top: 7rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .teach-two {
            width: 41%;
            bottom: 1.5rem;
            left: 25%;
        }
        .teach-three {
            width: 29.3%;
            top: 12.8rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .teach-five {
            width: 40%;
            top: 12%;
            left: 28%;
        }
        .teach-four {
            width: 5%;
            // top: 8.5%;
            top: 1.5rem;
            right: 26%;

        }

    }

    .home-header {
        // height: 1.2rem;
        // background: url('../../assets/images/video/video-bg.png') no-repeat;
        // background-size: 100% ;
        .rem(height,188);
        z-index: 1;
        span {
            // font-weight: bold;
            // color: #445779;
            // .rem(font-size,36);
            // line-height: 1.2rem;
            display: inline-block;
            margin-right: 0.2rem;
            color: #fff;
            position: relative;
        }
        span.active{
            font-size: 0.45rem;
            font-weight: bold;
            &:before{
                content: '';
                display: block;
                width: 60%;
                height: 4px;
                background: #fff;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                border-radius: 4px;
            }
        }
        > a {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            top: 0.18rem;
        }
        .curr-user {
            position: absolute;
            /*background: url("../../assets/images/main/web_03.png") no-repeat right;*/
            /*background-size: 80%;*/
            left: 0.3rem;
            top: 0.23rem;
            overflow: hidden;
            img {
                height: 100%;
                width: auto;
            }
        }
        .newsIcon {
            background: url("../../assets/images/main/sy_xx@3x.png") no-repeat center;
            background-size: 66.66%;
            /*margin:.2rem 0.3rem 0 0;*/
            position: absolute;
            top: 0.2rem;
            right: 4%;
        }
        .newsIconFFF {
            background: url("../../assets/images/newyear/sy_xx.png") no-repeat center;
            background-size: 66.66%;
            /*margin:.2rem 0.3rem 0 0;*/
            position: absolute;
            top: 0.2rem;
            right: 4%;
        }
        .mess {
            // background: url("../../assets/images/main/sy_xx@3x.png") no-repeat center;
            // background-size: 66.66%;
            /*margin:.2rem 0.3rem 0 0;*/
            position: absolute;
            top: 0.2rem;
            right: 4%;
            i.has-msg {
                position: absolute;
                background: url("../../assets/images/main/home_icon_03.png") no-repeat;
                background-size: contain;
                width: 0.22rem;
                height: 0.22rem;
                right: 0.1rem;
                top: 0.1rem;
            }
        }
        .search-icon {
            background: url("../../assets/images/main/home_icon_07.png") no-repeat
            center;
            background-size: 66.66%;
            right: 14.8%;
        }
        .searchIcon {
            background: url("../../assets/images/video/video-serch.png") no-repeat center;
            background-size: 66.66%;
            right: 14.8%;
        }
        .new-task-icon{
            background: url("../../assets/images/newTask/task.png") no-repeat center;
            background-size: 57.66%;
            right: 25%;
            .red-dot{
                position: absolute;
                background: url("../../assets/images/main/home_icon_03.png") no-repeat;
                background-size: contain;
                width: 0.22rem;
                height: 0.22rem;
                right: 0.1rem;
                top: 0.1rem;
            }
        }
          .kefu{
            position: absolute;
            right: 2rem;
            top: 0.2rem;
            height: 0.8rem;
            width: 0.8rem;
        }
        .recharge-btn{
            width: 1.333rem;
            height: 0.8rem;
            // background: url("../../assets/images/video/recharge-btn.png") no-repeat;
            // background-size: 100% 100%;
            position: absolute;
            right: 0.4rem;
            top: 0.2rem;
            img{
                width: 100%;
            }
        }
        .video-navigation{
            position: relative;
            color: #fff;
            text-align: left;
            padding-left: 0.5rem;
            > a {
                display: inline-block;
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                top: 0.18rem;
            }
        }
    }
    // .main-container-dw{
    //     background: url('../../assets/images/dw/bgshouye.png')!important;
    //     background-size:100%!important;
    // }
    .main-container-new{
        // background: url('../../assets/images/video/video-bg-x.png')no-repeat!important;
        background-size:100%!important;
    }
    // .main-container-qrj{
    //     background: url('../../assets/images/ValentineDay/bj@2x-min.png')!important;
    //     background-size:cover!important;
    // }
    // .main-container-gq{
    //     background: url('../../assets/images/ValentineDay/bj@2x-min.png')!important;
    //     background-size:cover!important;
    // }
    .main-container,.main-container-dw,.main-container-gq,.main-container-sdj,.main-container-ox,.main-container-uefa{
        background: #f5f7fa;
        position: relative;
        .onlineNum{
            position: absolute;
            z-index: 1000;
            // background: url('../../assets/images/onlineBG.png')no-repeat;
            // background-size: contain;
            padding: 0 0.2rem;
            background: rgba(0,0,0,0.3);
            text-align: center;
            color: #fff;
            border-radius: 1rem;
            right: 3.5%;
            top: 0.22rem;
            // .rem(width,166);
            // .rem(height,40);
            .rem(line-height,40);
            
        }
        .banner {
            text-align: center;
            a {
                display: block;
                padding-bottom: 0.4rem;
                height: 4.4rem;
                > div {
                    background: #f3f3f3;
                    height: 100%;
                    border-radius: 5px;
                    overflow: hidden;
                    width: 94.6%;
                    box-shadow: 0px 5px 20px #ececec;
                    display: inline-block;
                    img {
                        /*height: 100%;*/
                        border-radius: 5px;
                    }
                }
            }
        }
        .bannerBG,.banner-dw-home,.banner-qrj-home,.banner-gq-home,.banner-sdj-home,.banner-ox-home,.banner-uefa-home {
            text-align: center;
            // background: url('../../assets/images/newyear/top.png') no-repeat center;
            // background-size: 100% 100%;
            background: url('../../assets/images/newyear/top.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -1.5rem;
            a {
                display: block;
                padding-bottom: 0.4rem;
                height: 4.4rem;
                > div {
                    // background: #f3f3f3;
                    height: 100%;
                    border-radius: 5px;
                    overflow: hidden;
                    width: 94.6%;
                    // box-shadow: 0px 5px 20px #ececec;
                    display: inline-block;
                    img {
                        /*height: 100%;*/
                        border-radius: 5px;
                    }
                }
            }
        }
        .banner-qrj-home{
            background: url('../../assets/images/ValentineDay/he1.png') no-repeat bottom;
            background-size: cover;
            background-position-y: -1.5rem;
        }
        .banner-dw-home{
            background: url('../../assets/images/dw/WDL.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -1.5rem;
        }
        .banner-gq-home{
            background: url('../../assets/images/National Day/dbbj.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -1.5rem;
        }
        .banner-sdj-home{
            background: url('../../assets/images/Christmas/title1.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -2.4rem;
        }
        .banner-ox-home{
            background: url('../../assets/images/oxYear/bg.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -2.4rem;
        }
        .banner-uefa-home{
            background: url('../../assets/images/UEFA/bg.png') no-repeat bottom;
            background-size: 100% 100%;
            background-position-y: -2.4rem;
        }
        /*公告*/
        .notice-box {
            width: 94.6%;
            margin: 0 auto;
            // background: url("../../assets/images/main/notice-text.png") #fff no-repeat
            //   0.4rem center;
            background-size: 8%!important;
            border-radius: 20px;
            color: #666;
            font-size: 0.32rem;
            padding-right: 0.4rem;
            min-height: 0.95rem;
            &.notice-box-pt{
                /*background: url("../../assets/images/main/notice-text.png") #fff no-repeat*/
                background: url("../../assets/images/main/notice.png") no-repeat
                0.4rem center;
            }
            &.notice-box-dw{
                background: url("../../assets/images/dw/gongg_w_5_27.png") #fff no-repeat
                0.4rem center;
            }
            &.notice-box-qrj{
                background: url("../../assets/images/ValentineDay/gongg_w_5_27-min.png") #fff no-repeat
                0.4rem center;
            }
            &.notice-box-uefa{
                background: url("../../assets/images/UEFA/gg.png") #fff no-repeat
                0.4rem center;
            }
            marquee {
                padding: 0.16rem 0 0.15rem 0;
                margin-left: 1.3rem;
                span {
                    vertical-align: -webkit-baseline-middle;
                }
            }
        }
        .section {
            width: 94.6%;
            margin: 0.4rem auto 0;
            font-size: 0.33rem;
            border-top:none!important;
            h3{
                background: #f5f7fa!important;
                border-top:none!important;
            }
            > .title {
                font-size: 0.42rem;
                position: relative;
                margin-bottom: 0.35rem;
                font-weight: normal;
                line-height: 0.5rem;
                color: #343434;
                position: relative;
                height: 0.5rem;
                border-top:none!important;
                span {
                    position: relative;
                    z-index: 2;
                    padding-left: 0.3rem;
                }
                a {
                    float: right;
                    color: #ccc;
                }
                a.more {
                    font-weight: 500;
                    font-size: 0.38rem;
                    color: #343434;
                    i{
                        color: #F73C3C;
                    }
                }
                i.more-icon {
                    background: url("../../assets/images/more-icon.png") no-repeat;
                    width: 0.25rem;
                    height: 0.25rem;
                    display: inline-block;
                    background-size: contain;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                // i.more-icon-dw{
                //   background: url("../../assets/images/dw/more.png") no-repeat!important;
                //   width: 0.25rem;
                //   height: 0.25rem;
                //   display: inline-block;
                //   background-size: contain;
                //   position: absolute;
                //   right: 0;
                //   top: 50%;
                //   transform: translateY(-50%);
                // }
                // &:before {
                //     content: "";
                //     position: absolute;
                //     width: 0.5rem;
                //     height: 0.1rem;
                //     border-radius: 20px;
                //     background: #ffd4af;
                //     bottom: 0.05rem;
                //     left: 0;
                // }
                &:before {
                    content: "";
                    position: absolute;
                    width: 0.1rem;
                    height: 0.5rem;
                    border-radius: 20px;
                    background: #ff3131;
                    bottom: -0.02rem;
                    left: 0;
                }
            }
            > .title1 {
                font-size: 0.42rem;
                position: relative;
                margin-bottom: 0.35rem;
                font-weight: bold;
                line-height: 0.5rem;
                position: relative;
                border-top:none!important;
                span {
                    position: relative;
                    z-index: 2;
                    >img{
                        width:0.7rem;position: relative;top: 0.15rem;
                    }
                }
                a {
                    float: right;
                    color: #ccc;
                }
                a.more {
                    font-weight: 500;
                    font-size: 0.33rem;
                    color: #ff513e;
                    position: relative;
                    top: 0.3rem;
                }
                a.more-qrj{
                    color: #fff;
                }
                a.more-dw{
                    color: #333333;
                    font-weight: bold;
                }
                i.more-icon {
                    background: url("../../assets/images/more-icon.png") no-repeat;
                    width: 0.25rem;
                    height: 0.25rem;
                    display: inline-block;
                    background-size: contain;
                    position: absolute;
                    right: 0;
                    top: 72%;
                    transform: translateY(-50%);
                }
                i.more-icon-dw {
                    background: url("../../assets/images/dw/more.png") no-repeat;
                    width: 0.25rem;
                    height: 0.25rem;
                    display: inline-block;
                    background-size: contain;
                    position: absolute;
                    right: 0;
                    top: 72%;
                    transform: translateY(-50%);
                }
                // &:before {
                //     content: "";
                //     position: absolute;
                //     width: 0.5rem;
                //     height: 0.1rem;
                //     border-radius: 20px;
                //     background: #ffd4af;
                //     bottom: 0.05rem;
                //     left: 0.7rem;
                // }
            }
            ul.hot {
                li {
                    /*box-shadow: 0 0.3rem 20px #f8f8f8;*/
                    background: #fff;
                    border-radius: 5px;
                    overflow: hidden;
                    .img-box {
                        overflow: hidden;
                        height: 3.15rem;
                        background: #f3f3f3;
                    }
                    a {
                        position: relative;
                        .hot-mes {
                            position: absolute;
                            color: #fff;
                            bottom: 0.9rem;
                            left: 3%;
                            width: 92%;
                            line-height: 0.5rem;
                            .online-num {
                                font-family: number2;
                            }
                            .intro {
                                display: inline-block;
                                width: 55%;
                            }
                        }
                        img {
                            display: block;
                            /*height: 3.15rem;*/
                        }
                        .section-mes {
                            padding: 0.2rem;
                            .nickname-box {
                                font-weight: bold;
                            }
                            .host-type {
                                margin-left: 0.05rem;
                                span {
                                    vertical-align: middle;
                                    
                                }
                            }
                            .nickname-overflow {
                                width: 0.8rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .hot-type {
                                display: inline-block;
                                width: 0.37rem;
                                height: 0.38rem;
                                vertical-align: sub;
                                margin-right: 0.05rem;
                            }
                            .hot-type-qc {
                                background: url("../../assets/images/main/web_49.png") no-repeat
                                right center;
                                background-size: contain;
                            }
                        }
                    }
                }
            }
            ul.hot-box {
                li {
                    width: 48.5%;
                    margin: 0 3% 0.4rem 0;
                    float: left;
                    a {
                        position: relative;
                        display: block;
                        font-size: 0.33rem;
                        > .lottery-type {
                            font-size: 0.3rem;
                            padding: 0.05rem 0.12rem;
                            position: absolute;
                            left: 0;
                            top: 0;

                            color: #fff;
                        }
                        .red-pack {
                            position: absolute;
                            right: 0.2rem;
                            top: 1.7rem;
                            width: 0.55rem;
                            height: 0.65rem;
                            background: url("../../assets/images/main/home_icon_14.png")
                            no-repeat;
                            background-size: contain;
                            &.hasTz{
                                top: 1.2rem!important;
                            }
                        }
                        .cr-living{
                            position: absolute;
                            right: 0.2rem;
                            top: 2.1rem;
                            img{
                                width:70%;
                                float:right;
                            }
                        }
                    }
                }
                li:nth-of-type(2n) {
                    margin: 0 0 0.4rem 0;
                }
            }
        }
        .hot-host {
            margin: 0.2rem auto 0 !important;
        }
        .bottom-line {
            text-align: center;
            font-size: 0.3rem;
            color: #ccc;
            padding-bottom: 0.7rem;
        }
        /*热门彩种*/
        .main-lottery {
            /*display: flex;*/
            /*justify-content: space-around;*/
            margin: 0.27rem auto;
            border-radius: 5px;
            overflow: hidden;
            .main-gameList {
                // height: 1.07rem;
                // line-height: 1.07rem;
                padding: 0.27rem 0;
                text-align: center;
                font-size: 0.4rem;
                
                overflow: hidden;
                span {
                    display: inline-block;
                    float: left;
                    border-right: 1px solid #eee;
                    &:nth-last-child(1) {
                        border-right: none;
                    }
                    &.w1{
                        width: 9.4rem;
                    }
                    &.w2{
                        width: 4.7rem;
                    }
                    &.w3{
                        width: 3.156rem;
                    }
                    &.w4{
                        width: 2rem;
                    }
                    &.active,&.active-dw1,&.active-qrj1{
                        color: #445779;
                        position: relative;
                        font-weight: bold;
                        &:before {
                            position: absolute;
                            content: "";
                            width: 11.3%;
                            height: 0.1rem;
                            border-radius: 50px;
                            left: 50%;
                            transform: translateX(-50%);
                            // bottom: 0;
                            bottom: -0.27rem;
                            background: #ff513e;
                        }
                    }
                }
            }
            .lottery-item {
                overflow: hidden;
                padding-bottom: 0.4rem;
                // width: 33.2%;
                width: 25%;
                .rem(height,230);
                text-align: center;
                float: left;
                /*margin-top: 0.4rem;*/
                dl {
                    display: inline-block;
                    dd {
                        .rem(font-size,28);
                        /*margin-top: 0.2rem;*/
                    }
                    dt {
                        /*width: 2rem;*/
                        /*height: 1.7rem;*/
                        .rem(width,140);
                        .rem(height,140);
                        display: inline-block;
                        overflow: hidden;
                        border-radius: 5px;
                    }
                }
            }


        }
        /*广告图*/
        .banner-ad {
            height: 1.6rem;
            border-radius: 5px;
            overflow: hidden;
            background: #f3f3f3;
            margin: 0 auto;
            .ad-img {
                height: 1.6rem;
                border-radius: 5px;
                overflow: hidden;
                background: #f3f3f3;
                display: block;
            }
            img {
                height: 100%;
                -webkit-touch-callout: inherit !important;
                pointer-events: inherit !important;
            }
        }
        .online {
            display: inline-block !important;
            width: 0.37rem !important;
            height: 0.3rem !important;
            background: url("../../assets/images/member/a1.gif") no-repeat right bottom !important;
            background-size: contain !important;
        }
        /*最新资讯*/
        .news-box {
            margin-bottom: 0.4rem;
            .news-list {
                li {
                    background: #fff;
                    border-radius: 5px;
                    padding: 0.35rem 4%;
                    margin-bottom: 0.2rem;
                    a {
                        display: block;
                        dt {
                            width: 67.5%;
                            h4 {
                                color: #445779;
                                font-weight: bold;
                                font-size: 0.36rem;
                                margin-bottom: 0.25rem;
                            }
                            .new-time {
                                
                                font-size: 0.35rem;
                                line-height: 0.32rem;
                            }
                            .newType2 {
                                display: inline-block;
                                color: #ff513e;
                                background: #ffece8;
                                width: 1.33rem;
                                height: 0.48rem;
                                line-height: 0.48rem;
                                border-radius: 0.24rem;
                                font-size: 0.32rem;
                                text-align: center;
                            }
                            .newType3 {
                                display: inline-block;
                                color: #fd8208;
                                background: #fff9e8;
                                width: 1.33rem;
                                height: 0.48rem;
                                line-height: 0.48rem;
                                border-radius: 0.24rem;
                                font-size: 0.32rem;
                                text-align: center;
                            }
                            .newType4 {
                                display: inline-block;
                                color: #fd8208;
                                background: #fff9e8;
                                width: 1.33rem;
                                height: 0.48rem;
                                line-height: 0.48rem;
                                border-radius: 0.24rem;
                                font-size: 0.32rem;
                                text-align: center;
                            }
                            .newType1 {
                                display: inline-block;
                                color: #d444f3;
                                background: #ede5f9;
                                width: 1.33rem;
                                height: 0.48rem;
                                line-height: 0.48rem;
                                border-radius: 0.24rem;
                                font-size: 0.32rem;
                                text-align: center;
                            }
                            .new-icon {
                                width: 0.8rem;
                                height: 0.32rem;
                                display: inline-block;
                                margin-left: 0.2rem;
                                position: relative;
                                top: 0.1rem;
                            }
                            .new-hot {
                                background: url("../../assets/images/main/home_icon_28.png")
                                no-repeat;
                                background-size: contain;
                                vertical-align: text-top;
                            }
                            .new-tj {
                                background: url("../../assets/images/main/home_icon_31.png")
                                no-repeat;
                                background-size: contain;
                                vertical-align: text-top;
                            }
                        }
                        dd {
                            width: 29%;
                            height: 1.5rem;
                            overflow: hidden;
                            border-radius: 5px;
                            background: #eee;
                        }
                    }
                }
            }
        }
    }
    .main-gameList {
        // width: 94.6667%;
    }
    .swiper-container {
        --swiper-pagination-color: #ff513e; /* 两种都可以 */
    }
    // .swiper-container {
    //   --swiper-pagination-dw-color:#8EB917; /* 两种都可以 */
    // }
    .vux-slider {
        height: 4.6rem;
    }
    .no-banner {
        height: 4.2rem;
        background: #ededed;
        width: 94.6%;
        margin: 0 auto;
        border-radius: 5px;
        margin-bottom: 0.4rem;
    }
    .no-host {
        overflow: hidden;
        > li {
            float: left;
            width: 48.5%;
            margin: 0 3% 0.4rem 0;
            .no-img {
                height: 3.15rem;
                background: #ededed;
                border-radius: 5px 5px 0 0;
            }
            .no-name {
                margin-top: 0.2rem;
                height: 0.7rem;
                background: #ededed;
            }
        }
        li:nth-of-type(2n) {
            margin: 0 0 0.4rem 0;
        }
    }
    .no-lottery {
        overflow: hidden;
        // margin-top: 0.4rem;
        > li {
            float: left;
            width: 33.33%;
            margin: 0 0 0.4rem 0;
            padding: 0 0.6rem;
            .no-img {
                height: 2rem;
                background: #ededed;
                border-radius: 5px;
            }
            .no-name {
                margin-top: 0.2rem;
                height: 0.4rem;
                border-radius: 5px;
                background: #ededed;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .vux-slider {
            height: 6rem;
        }
        .main-container .banner a {
            height: 6rem;
        }
        .no-banner {
            height: 5.5rem;
        }
        .main-container .notice-box marquee {
            margin-left: 1.5rem;
        }
    }
    @media screen and (max-width: 320px) {
        .main-container .live-preview .preview-list > div a .rest-time i {
            left: 0.1rem;
        }
        .main-container .live-preview .preview-list > div a .play-time i {
        }
        .main-container .section ul.hot li a .hot-mes {
            bottom: 1rem;
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
        background: #ff2727;
        // opacity: 0.3;
        // right: 0.75rem;
        // text-align: center;
        // top: 3.18rem;
        // width: calc(100% - 6px);
        // height: calc(100% - 6px);
        // &:nth-child(1) {
        //   animation: circle-opacity 0.9s infinite;
        //   -webkit-animation: circle-opacity 0.9s infinite;
        //   -moz-animation: circle-opacity 0.9s infinite;
        //   -o-animation: circle-opacity 0.9s infinite;
        // }
        // &:nth-child(2) {
        //   animation: circle-opacity 0.9s infinite;
        //   -webkit-animation: circle-opacity 0.9s infinite;
        //   -moz-animation: circle-opacity 0.9s infinite;
        //   -o-animation: circle-opacity 0.9s infinite;
        //   animation-delay: 0.3s;
        //   -webkit-animation-delay: 0.3s;
        //   -o-animation-delay: 0.3s;
        //   -moz-animation-delay: 0.3s;
        // }
        // &:nth-child(3) {
        //   animation: circle-opacity 0.9s infinite;
        //   -webkit-animation: circle-opacity 0.8s infinite;
        //   -moz-animation: circle-opacity 0.8s infinite;
        //   -o-animation: circle-opacity 0.8s infinite;
        //   animation-delay: 0.6s;
        //   -webkit-animation-delay: 0.6s;
        //   -o-animation-delay: 0.6s;
        //   -moz-animation-delay: 0.6s;
        // }
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
            0% {
                border: 1.5px solid #ff2727;
                opacity: 0.6;
                -webkit-transform: scale(1.08);
                -o-transform: scale(1.08);
                -moz-transform: scale(1.08);
                transform: scale(1.08);
                // border-width:5px;
            }
            100% {
                border: 1.5px solid #ff2727;
                opacity: 0;
                -webkit-transform: scale(1.3);
                -o-transform: scale(1.3);
                -moz-transform: scale(1.3);
                transform: scale(1.3);
            }
        }
        @-o-keyframes circle-opacity {
            0% {
                border: 1.5px solid #ff2727;
                opacity: 0.6;
                -webkit-transform: scale(1.08);
                -o-transform: scale(1.08);
                -moz-transform: scale(1.08);
                transform: scale(1.08);
                // border-width:5px;
            }
            100% {
                border: 1.5px solid #ff2727;
                opacity: 0;
                -webkit-transform: scale(1.3);
                -o-transform: scale(1.3);
                -moz-transform: scale(1.3);
                transform: scale(1.3);
            }
        }
        @-moz-keyframes circle-opacity {
            0% {
                border: 1.5px solid #ff2727;
                opacity: 0.6;
                -webkit-transform: scale(1.08);
                -o-transform: scale(1.08);
                -moz-transform: scale(1.08);
                transform: scale(1.08);
                // border-width:5px;
            }
            100% {
                border: 1.5px solid #ff2727;
                opacity: 0;
                -webkit-transform: scale(1.3);
                -o-transform: scale(1.3);
                -moz-transform: scale(1.3);
                transform: scale(1.3);
            }
        }
        @-webkit-keyframes circle-opacity {
            0% {
                border: 1.5px solid #ff2727;
                opacity: 0.6;
                -webkit-transform: scale(1.08);
                -o-transform: scale(1.08);
                -moz-transform: scale(1.08);
                transform: scale(1.08);
                // border-width:5px;
            }
            100% {
                border: 1.5px solid #ff2727;
                opacity: 0;
                -webkit-transform: scale(1.3);
                -o-transform: scale(1.3);
                -moz-transform: scale(1.3);
                transform: scale(1.3);
            }
        }
    }
    @keyframes circle-opacity {
        0% {
            border: 1.5px solid #ff2727;
            opacity: 0.6;
            -webkit-transform: scale(1.08);
            -o-transform: scale(1.08);
            -moz-transform: scale(1.08);
            transform: scale(1.08);
            // border-width:5px;
        }
        100% {
            border: 1.5px solid #ff2727;
            opacity: 0;
            -webkit-transform: scale(1.3);
            -o-transform: scale(1.3);
            -moz-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
    @-o-keyframes circle-opacity {
        0% {
            border: 1.5px solid #ff2727;
            opacity: 0.6;
            -webkit-transform: scale(1.08);
            -o-transform: scale(1.08);
            -moz-transform: scale(1.08);
            transform: scale(1.08);
            // border-width:5px;
        }
        100% {
            border: 1.5px solid #ff2727;
            opacity: 0;
            -webkit-transform: scale(1.3);
            -o-transform: scale(1.3);
            -moz-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
    @-moz-keyframes circle-opacity {
        0% {
            border: 1.5px solid #ff2727;
            opacity: 0.6;
            -webkit-transform: scale(1.08);
            -o-transform: scale(1.08);
            -moz-transform: scale(1.08);
            transform: scale(1.08);
            // border-width:5px;
        }
        100% {
            border: 1.5px solid #ff2727;
            opacity: 0;
            -webkit-transform: scale(1.3);
            -o-transform: scale(1.3);
            -moz-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
    @-webkit-keyframes circle-opacity {
        0% {
            border: 1.5px solid #ff2727;
            opacity: 0.6;
            -webkit-transform: scale(1.08);
            -o-transform: scale(1.08);
            -moz-transform: scale(1.08);
            transform: scale(1.08);
            // border-width:5px;
        }
        100% {
            border: 1.5px solid #ff2727;
            opacity: 0;
            -webkit-transform: scale(1.3);
            -o-transform: scale(1.3);
            -moz-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
</style>