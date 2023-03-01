<template>
    <div class="home-container">
        <header :style="currType=='movie'?'height:4.2rem':''" class="home-header clearfix" 
        :class="[{header:skin==0},
                 {headerbg:skin==1},
                 {'header-dw':skin==2},
                 {'header-qrj':skin==3},
                 {'header-gq':skin==4},
                 {'header-sdj':skin==5},
                 {'header-ox':skin==6},
                 {'header-uefa':skin==7},
                 {'Oterheader':skin!=0}
                 ]">
            <a class="curr-user fl" @click="goUser">
                <img v-lazy="avatar" v-if="avatar" alt />
                <img src="../../assets/images/main/web_03.png" v-else alt />
            </a>
            <span class="title">乐购</span>
            <!-- 客服 -->
            <div class="kefu default-kf-btn" @click="goOnline()"  :class="[{'default-kf-btn':skin==0 ||skin==6}]">
                <!-- <img v-if="skin==0 || skin==6" src="../../assets/images/kefu.png" alt=""> -->
                <!-- <img v-if="skin==0 || skin==6" src="../../assets/images/video/defaultKf.png" alt=""> -->
                <img v-if="skin==1" src="../../assets/images/newyear/kf.png" alt="">
                <img v-if="skin==2" src="../../assets/images/dw/kf.png" alt="">
                <img v-if="skin==3" src="../../assets/images/ValentineDay/kf.png" alt="">
                <img v-if="skin==4" src="../../assets/images/National Day/kf.png" alt="">
                <img v-if="skin==5" src="../../assets/images/Christmas/kf.png" alt="">
                <img v-if="skin==6" src="../../assets/images/oxYear/kf.png" alt="">
                <img v-if="skin==0" src="../../assets/images/video/defaultKf.png" alt="">
                <img v-if="skin==7" src="../../assets/images/UEFA/kf.png" alt="">
            </div>
            <!-- <div class="tixian" @click="gotoUrl('withdrawalTopUp/0')" :class="[{'default-recharge-btn':skin==0 ||skin==1||skin==4||skin==6}]"> -->
            <!-- 提现 -->
            <div class="tixian default-recharge-btn" @click="gotoUrl('/recharge')" >
                <!-- <img src="../../assets/images/tx_icon.png" alt=""> -->
                <img v-if="skin==0" src="../../assets/images/video/defaultTx.png" />
                <img v-if="skin==7" src="../../assets/images/UEFA/tx.png" />
                <img v-if="skin==1" src="../../assets/images/newyear/qx.png" alt="">
                <img v-if="skin==2" src="../../assets/images/dw/qx.png" alt="">
                <img v-if="skin==3" src="../../assets/images/ValentineDay/qx.png" alt="">
                <img v-if="skin==4" src="../../assets/images/National Day/qx.png" alt="">
                <img v-if="skin==5" src="../../assets/images/Christmas/qx.png" alt="">
                <img v-if="skin==6" src="../../assets/images/oxYear/qx.png" alt="">
            </div>
            <!-- <div class="recharge-btn" @click="gotoUrl('withdrawalTopUp/1')" :class="[{'default-recharge-btn':skin==0 ||skin==1||skin==4||skin==6}]"> -->
            <!-- 充值 -->
            <div class="recharge-btn default-recharge-btn" @click="gotoUrl('/tx')">
                <!-- <img v-if="skin==0 ||skin==1||skin==4||skin==6" src="../../assets/images/video/recharge-btn.png" /> -->
                <!-- <img v-if="skin==0 ||skin==1||skin==4||skin==6" src="../../assets/images/video/defaultCz.png" /> -->
                 <!-- <img v-if="skin==2" src="../../assets/images/dw/dwcz.png" />
                <img v-if="skin==3" src="../../assets/images/ValentineDay/qxcz.png" />
                <img v-if="skin==5" src="../../assets/images/Christmas/cz.png" /> -->
                
                <img v-if="skin==0" src="../../assets/images/video/defaultCz.png" />
                <img v-if="skin==1" src="../../assets/images/newyear/cz.png" alt="">
                <img v-if="skin==2" src="../../assets/images/dw/cz.png" alt="">
                <img v-if="skin==3" src="../../assets/images/ValentineDay/cz.png" alt="">
                <img v-if="skin==4" src="../../assets/images/National Day/cz.png" alt="">
                <img v-if="skin==5" src="../../assets/images/Christmas/cz.png" alt="">
                <img v-if="skin==6" src="../../assets/images/oxYear/cz.png" alt="">
                <img v-if="skin==7" src="../../assets/images/UEFA/cz.png" />
            </div>
            <div class="video-navigation">
                <span class= "fl" v-for="(v,index) in nav" :key="index" :class="currType==v.code?'active':''" @click="changeType(v.code)">{{v.name}}</span>
                <!-- 消息中心 -->
                <a @click="gotoUrl('messageCenter')" class="mess fr" :class="[{newsIconFFF:skin==1||skin==2 || skin==3|| skin==4|| skin==5|| skin==6|| skin==7},{'default-newsIcon':skin==0}]">
                    <i class="has-msg" v-if="nNum>0"></i>
                </a>
                <!-- 搜索 -->
                <router-link
                        :to="currType=='hot'?'/search':'searchVideo'"
                        class="mess fr"
                        :class="[{'searchIcon':skin==1 ||skin == 2 ||skin == 3|| skin==4|| skin==5|| skin==6|| skin==7},{'default-search-icon':skin==0}]"
                ></router-link>
                <!-- 新手任务 -->
                <a class="mess new-task-icon fr" @click="gotoUrl('newTask')" :class="[{'default-task-icon':skin==0}]"><i class="red-dot" v-if="isShowNewDot"></i></a>
            </div>
            <div class="navigation2" v-if="isMovie">
                <div class="isbuy" :class="[{'default-buy':skin==0}]" @click="gotoUrl('myVideo')">

                </div>
                <div class="extend" :class="[{'default-extend':skin==0}]" @click="gotoUrl('invite')">

                </div>
            </div>
        </header>
        <Foot/>
    </div>
</template>

<script>
    import Foot from "../../components/footer.vue";
    // import Hot from '../home/hot'
    // import Ranking from '../home/ranking'
    // import videoHome from '../video/videoHome'
    import { mapState,mapMutations } from "vuex";
    export default {
        name: "hot",
        components: { Foot },
        data() {
            return {
                // currType:'',
                currType:this.$route.name,
                nNum: 0,
                isShowNewDot:false,
                nav:[],
                cWebsData:{},
                serveLine:'',
                isMovie:false
            };
        },
        created(){
            if(this.codeToken){
                this.checkNotice('/get_message_count/');//检查是否有系统消息
            }
            this.getInit();
            if(this.$route.name=='movie'){
                this.isMovie = true;
            }else{
                this.isMovie = false;
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
                "homeTabNav"
            ])
        },
        beforeRouteLeave(to, from, next) {
            //        alert("是否注销list的pops")
            window.removeEventListener("popstate", this.pageBack, false);
            next();
        },
        watch:{
            $route:function(n){
                // console.log(n);
               this.currType =  n.name
               if(n.name=='movie'){
                   this.isMovie = true;
               }else{
                   this.isMovie = false;
               }
            }
        },
        methods: {
            ...mapMutations(["SETWEBDATA","SETHOMENAV"]),
            changeType(n){
                //  this.currType = n;
                 this.$router.push("/"+n);
                //  this.currType = n;
                // if(n=='ranking'){
                //     this.$router.push('/ranking');
                // }else if(n=='vip'){
                //     this.$router.push("/vip");
                // }else if(n=='hot'){
                //     // this.currType = n;
                //     this.$router.push("/hot");
                // }else if(n=='movie'){
                //     this.$router.push("/movie");
                // }
               
        
            },
            //是否显示红点 留下
            async isShowRedDot(){
                if(!this.codeToken) return ;
                // if(this.isTask) return ;
                let res = await this.$http.get('/api2/user/task-prompt')
                if(res && res.data.code==1){
                    if(res.data.data.prompt==1){
                        //显示
                        this.isShowNewDot = true;
                        console.log(222)
                    }else {
                        //不显示
                        this.isShowNewDot = false;
                    }
                }
            },
            gotoUrl(url){
                this.$router.push('/'+url);
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
                // let customer = this.serveLine?this.serveLine:JSON.parse(this.webInitData).customer;
                // if (window.webkit) {
                //     window.webkit.messageHandlers.needNav.postMessage({
                //         url: customer,
                //         name: "在线客服",
                //         backUrl: window.location.href
                //     });
                //     //        window.webkit.messageHandlers.needNav.postMessage('https://acyl.otixz.com/chat/chatClient/chatbox.jsp?companyID=80002180&configID=97','在线客服');
                // } else if (window.android) {
                //     this.alertLL(customer, "在线客服");
                // } else {
                //     window.location.href = customer;
                // }
                window.open(customer) ;
            },
            async getInit(){
                this.isShowRedDot();
                // let n = localStorage.getItem('home_tab_nav');
                
                if(this.homeTabNav.length>1){
                    // console.log(this.homeTabNav);
                    this.nav =this.homeTabNav
                    
                    return
                }
                let res = await this.$http.get('/api/common/siteConfig',{
                    params:{
                        client:1,
                        version:'3.2.1'
                    }
                });
                if(res){
                    this.nav = res.data.data.index_nav;
                    this.SETWEBDATA(JSON.stringify(res.data.data));
                    // localStorage.setItem('home_tab_nav', JSON.stringify(this.nav))
                    this.SETHOMENAV(this.nav)
                    this.serveLine = res.data.data.customer;
                }
                
            },
            async checkNotice(url) {
                if (!this.codeToken&&this.userinfo.user_id<0) {
                    return;
                } else {
                    let res = await this.$http.get(
                         '/api/live/sport' + url,{
                            params: {
                                client_type:3,
                                api:this.noticeType==1?1:5
                            }
                        }
                    );
                    if (res && res.data.code == 1) {
                        localStorage.setItem("news", JSON.stringify(res.data.data));
                        this.nNum = res.data.data.msgCount;
                    }
                }
            },
        },
        mounted() {
            // this.getInit();
            // console.log(this.webInitData);
            // this.cWebsData = this.websData;
            // if(this.webInitData!=null&&this.webInitData!='undefined'&&this.webInitData!='null'){
            //     this.nav = JSON.parse(this.webInitData).index_nav;
            //     this.currType = this.$route.query.type || this.nav[0].code;
            // }else {
            //     this.getInit();
            // }
        },
        props:{
            websData:{
                type:Object,
                default:null
            }
        }
    };
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .home-header {
        // .rem(height,188);
        height: 2.5rem;
        z-index: 1;
        span {
            display: inline-block;
            margin-right: 0.2rem;
            color: #666;
            position: relative;
            .rem(font-size,26);
            &.title{
                .rem(font-size,36);
                color: #445779;
                font-weight: bold;
                position: relative;
                &:before{
                    content: '';
                    position: absolute;
                    .rem(width,35);
                    .rem(height,38);
                    background: url('../../assets/images/newLogo.png')no-repeat;
                    background-size: contain;
                    top: 0;
                    left: 0;
                }
            }
        }
        span.active{
            .rem(font-size,30);
            font-weight: bold;
            color: #FF3131;
            &:before{
                content: '';
                display: block;
                width: 60%;
                height: 4px;
                background: #FF3131;
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
        .default-newsIcon{
             background: url("../../assets/images/newTask/noticeDefault.png") no-repeat center;
            background-size: 66.66%;
        }
        .mess {
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
        .default-search-icon{
            background: url("../../assets/images/newTask/searchDefault.png") no-repeat center;
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
        .default-task-icon{
             background: url("../../assets/images/newTask/taskDefault.png") no-repeat center;
            background-size: 57.66%;
        }
        .kefu{
            position: absolute;
            right: 2.4rem;
            top: 0.2rem;
            height: 0.8rem;
            width: 0.8rem;
        }
        .default-kf-btn{
            .rem(width,50);
            .rem(height,50);
        }
        .tixian{
            position: absolute;
            right: 1.4rem;
            top: 0.2rem;
            height: 0.8rem;
            width: 0.84rem;
        }
        .recharge-btn{
            // width: 1.333rem;
            // height: 0.8rem;
            position: absolute;
            right: 0.4rem;
            top: 0.2rem;
            img{
                width: 100%;
            }
        }
        .default-recharge-btn{
            .rem(width,60);
            .rem(height,50);
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
        .navigation2{
            position: absolute;
            display: flex;
            right: 0.1rem;
            top: 2.4rem;
            div{
                width: 0.55rem;
                height: 0.55rem;
                background: red;
            }
            .isbuy{background: url('../../assets/images/goumai.png') no-repeat;background-size: 100% 100%;margin-right: 0.4rem;}
            .extend{background: url('../../assets/images/tuiguang.png') no-repeat;background-size: 100% 100%;}
            .default-buy{
                background: url('../../assets/images/default-buy.png') no-repeat;background-size: 100% 100%;margin-right: 0.4rem;
            }
            .default-extend{
                background: url('../../assets/images/default-extend.png') no-repeat;background-size: 100% 100%;margin-right: 0.4rem;
            }
        }
    }
    .Oterheader{
        span{
            color: #fff!important;
            &.active{
                &:before{
                    background: #fff!important;
                }
            }
        }
        .title{
            color: #fff!important;
        }
        
    }
</style>