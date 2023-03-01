<template>
    <div class="game-center">
        <header v-if="isPure==1" class="home-header clearfix header" style="height: 1.2rem">
            <a class="curr-user fl" @click="goUser">
                <img v-lazy="avatar" v-if="avatar" alt />
                <img src="../../assets/images/main/web_03.png" v-else alt />
            </a>
            <span>乐购体育</span>
            <div class="kefu" @click="goOnline()">
                <!-- <img src="../../assets/images/kefu.png" alt=""> -->
                 <img src="../../assets/images/video/defaultKf.png" alt="">
            </div>
             <div class="recharge-btn tixian" @click="gotoUrl('withdrawalTopUp/0')">
                <!-- <img v-if="skin==0 ||skin==1" src="../../assets/images/video/recharge-btn.png" />
                <img v-if="skin==2" src="../../assets/images/dw/dwcz.png" />
                <img v-if="skin==3" src="../../assets/images/ValentineDay/qxcz.png" /> -->
                <img src="../../assets/images/video/defaultTx.png" />

            </div>
            <div class="recharge-btn" @click="gotoUrl('withdrawalTopUp/1')">
                <!-- <img v-if="skin==0 ||skin==1" src="../../assets/images/video/recharge-btn.png" />
                <img v-if="skin==2" src="../../assets/images/dw/dwcz.png" />
                <img v-if="skin==3" src="../../assets/images/ValentineDay/qxcz.png" /> -->
                <img src="../../assets/images/video/defaultCz.png" />

            </div>
        </header>
        <header class="header-kj"  v-else 
               :class="[{headerbg:skin==1},
               {'header-dw':skin==2},
               {'header-qrj':skin==3},
               {'header-gq':skin==4},
               {'header-sdj':skin==5},
               {'header-ox':skin==6},
               {'header-uefa':skin==7},
               ]">
            <span>游戏中心</span>
            <i class="rule-rk" @click="$router.push('/rule')">玩法规则</i>
            </header>

        <!--公告-->
        <div class="notice-box" v-if="isPure==1">
<!--        <div class="notice-box">-->
            <marquee scrollAmount="3" scrolldelay="50" direction="left">
                        <span
                                v-for="(v,index) in notice"
                                v-if="notice.length"
                                :key="index"
                                 @click="$router.push({path:'/msgDetail',query: { msg_id: v.id }})"
                        >{{index+1}}.{{v.content}}&nbsp;&nbsp;&nbsp;</span>
                <span v-else>no data</span>
            </marquee>
        </div>
<!--        @click="$router.push({path:'/msgDetail',query: { msg_id: v.id }})"-->
        <myScrollX>
                <div class="game-type" ref="personTab">
<!--                    <span @click="currType=item.id" v-for="(item,index) in allGameType" :class="currType==item.id?'active':''">{{item.name}}</span>-->
                    <span @click="currType=value.name" v-for="(value,index) in allGames" :key="index" 
                    :class="[{'active':currType==value.name && skin == 0 },
                    {'active-gq':currType==value.name && skin == 4},
                    {'active-sdj':currType==value.name && skin == 5},
                    {'active-qrj':currType==value.name && skin == 3},
                    {'active-dw':currType==value.name && skin == 2},
                    {'active-new':currType==value.name && skin == 1},
                    {'active-ox':currType==value.name && skin == 6},
                    {'active-uefa':currType==value.name && skin == 7},
                    ]"
                    
                    >{{value.name}}</span>

                </div>

        </myScrollX>
        <i class="right-icon" v-if='allGames.length>5' :style="isPure!=1?'top: 1.3rem;':'top: 2.4rem;'" @click="goRight"></i>
        <myScroll
                    ref="scrollWrapper"
                    :bottom="1.4"
                    v-on:func="reLoad"
                    :isLoad="isL"
                    :data="playList"
                    :bgColor="'f5f5f5'"
                    :top="isPure==1?3.4:2.2">

                <!--热门推荐-->
                <div class="hot-tj" v-for="(value,index) in allGames" v-if="value.name=='热门推荐'&&currType==value.name" :key="index">
                    <div class="game-container qp-container" v-if="v.list.length&&v.name=='最近使用'" v-for="(v,index1) in value.list" :key="index1">
                        <h3 v-if="value.list[0].list.length">{{v.name}}</h3>
                        <myScrollX v-if="value.list[0].list.length">
                            <ul class="zj-list" ref="personTab2">
<!--                                <li v-for="(vv,index2) in value.list[0].list" :key="index2" @click="goQp(vv,v.name)" v-if="vv.name!='香港六合彩'" :class="vv.tag | filterTag">-->
                                <li v-for="(vv,index2) in value.list[0].list" :key="index2" @click="goQp(vv,v.name)" :class="vv.type" :data-cid="vv.id">
                                    <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                                    <i class="close-icon"></i>
                                    <div class="g-img" ><img v-lazy="vv.img_url" alt=""></div>
                                    <p class="game-name" >{{vv.name}}</p>
                                    <span>{{vv.remark}}</span>
                                </li>
                            </ul>
                        </myScrollX>
                    </div>
                    <div class="game-container qp-container" v-if="v.list.length&&v.name!='最近使用'" v-for="(v,index1) in value.list" :key="index1">
                        <h3>{{v.name}}</h3>
                        <ul>
<!--                            <li v-for="(vv,index2) in v.list" :key="index2" @click="goQp(vv,v.name)" v-if="vv.name!='香港六合彩'" :class="vv.tag | filterTag">-->
                            <li v-for="(vv,index2) in v.list" :key="index2" @click="goQp(vv,v.name)" :class="vv.type" :data-cid="vv.id">
                                <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                                <i class="close-icon"></i>
                                <div class="g-img" ><img v-lazy="vv.img_url" alt=""></div>
                                <p class="game-name" >{{vv.name}}</p>
                                <span>{{vv.remark}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="no-lottery" v-if="isLoading">
                    <li v-for="(v,index) in 20" :key="index">
                        <div class="no-img"></div>
                        <div class="no-name"></div>
                    </li>
                </ul>

                <div class="hot-tj" v-for="(value,index) in allGames" v-if="value.name!='热门推荐'&&currType==value.name" :key="index">
                    <!--            最近使用-->
                    <div class="game-container qp-container other-game-container">
<!--                        <h3>{{value.name}}</h3>-->
                        <ul>
<!--                            <li v-for="(v,index1) in value.list" :key="index1" @click="goQp(v,value.name)" v-if="v.name!='香港六合彩'" :class="v.tag | filterTag">-->
                            <li v-for="(v,index1) in value.list" :key="index1" @click="goQp(v,value.name)" :class="v.type" :data-cid="v.id">
                                <i class="tag-icon" v-if="v.tag" :class="v.tag | filterTag"></i>
                                <i class="close-icon"></i>
                                <div class="g-img" ><img v-lazy="v.img_url" alt=""></div>
                                <p class="game-name">{{v.name}}</p>
                                <span>{{v.remark}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </myScroll>
        <Foot/>
        <div v-html="gameUrl"></div>

        <!--        纯净 直播切换-->
        <!-- <div class="pure-box" @click="changePure(1)" v-if="openPure2==1&&isPure==0"></div>
        <div class="live-box" @click="changePure(0)" v-if="openPure2==1&&isPure==1"></div> -->
    </div>
</template>

<script>
    import { removeAllactive } from "../../assets/js/public"
    import Foot from "../../components/footer.vue";
    import { mapState, mapMutations } from "vuex";
    export default {
        name: "gameCenter",
        data(){
            return{
                playList:{},
                allGames:[],
                notice:[],
                isL:false,
                currType:'热门推荐',//当前类型
                gameUrl:'',
                // allGameType:[{id:1,name:'热门推荐'},{id:2,name:'彩票游戏'},{id:3,name:'棋牌游戏'},{id:4,name:'AG视讯'},{id:5,name:'AG电子'}],
                isNew: 0, //皮肤状态
                isLoading:true,
                socketPath:this.versionWssNotice,//测试环境10.1
                leftValue:'',
                customer:''

            }
        },
        components: { Foot },
        computed: {
            ...mapState([ "skin","isPure","openPure2","avatar","codeToken","closeData","webInitData","gameData","isSf"])
        },
        created() {
            this.getHotGame();
            // this.isNew = this.skin; //皮肤
            if(this.noticeType==2){
                this.getSystemNoticeDl();//代理滚动公告
            }else {
                this.getNotice();//官方滚动公告
            }
            this.customer = JSON.parse(this.$store.state.webInitData).customer
        },
        filters:{
            filterTag(n){
                let tag = '';
                if(n=='NEW'){
                    tag = 'tag-new';
                }else if(n=='HOT'){
                    tag = 'tag-hot';
                }
                return tag;
            },
        },
        methods:{
            ...mapMutations([
                "SETPURE",
                "SETSKINDATA",
                "SETPOSITIONY",
                "SETUSERTOKEN",
                "SETGAMEDATA",
                "SETISSF"
            ]),
            findClose(d){
                let allLot = document.querySelectorAll('.lott');
                removeAllactive(allLot)
                for(let i=0,len=d.length;i<len;i++){
                    for(let j=0,lenj=allLot.length;j<lenj;j++){
                        if(allLot[j].dataset.cid==d[i].lotteryId){
                            allLot[j].classList.add('active');
                        }
                    }
                }

            },
            goRight(){
                
                // console.log(document.querySelector('.game-type').offsetWidth)
                let s = document.querySelector('.game-type').offsetWidth;
                let ss = 0;
                 let all = document.querySelectorAll('.game-type>span');
                for(let i=0,len=all.length;i<len;i++){
                    if(i<5){
                         ss +=(all[i].offsetWidth);
                    }
                   
                }
                // let sum = (this.allGames.length-5)*83
                this.$refs.personTab.style.transform =  'translateX(-' + (s-ss) + 'px)';
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
            async getNotice() {
                let res = await this.$http.get("/api/live/sport/system_notice/");
                if (res && res.data.code == 1) {
                    this.notice = res.data.data || [];
                }
            },
            async getSystemNoticeDl() {
                let res = await this.$http.get("/api/live/sport/system_notice_dl/");
                if (res && res.data.code == 1) {
                    this.notice = res.data.data || [];
                }
            },
            changePure(f){
                // console.log(f);
                this.SETPURE(f);
                //存现在的皮肤
                if(f==1) {
                    localStorage.setItem('isPskin',this.skin);
                    this.SETSKINDATA(0);
                    
                }else{
                    this.SETSKINDATA(localStorage.getItem('isPskin')&&localStorage.getItem('isPskin')!='undefined'&&localStorage.getItem('isPskin')!='null'?localStorage.getItem('isPskin'):0);
                    this.$router.push('/')
                }
                // this.isNew = this.skin;
            },
            //获取热门列表
            async getHotGame(flag) {
                // if(this.isSf||this.gameData.length){
                //     console.log(44)
                //     this.isLoading=false;
                //     this.allGames = this.gameData;
                //     return ;
                // } 
                if(flag) {
                    this.isL = true;
                    this.isLoading=false;
                }else{
                    this.isLoading = true;
                    this.$vux.loading.show({text: 'Đang nhận...'});
                }
                let res = await this.$http.get("/api/vendor/allgames");
                this.$vux.loading.hide();
                this.isL = false;
                this.isLoading = false;
                if (res.data && res.data.code == 1) {
                    this.allGames = res.data.data;
                    // this.SETGAMEDATA(res.data.data);
                    // this.SETISSF(false)
                }
            },
            addCloseStatus(d){
                for(let i=0,len=d.length;i<len;i++){
                    for(let j=0,lenj=d[i].list;j<lenj;j++){
                        d[i].list[j]['closeStatus'] = false;
                    }
                }
                // console.log(d);
                return d;
            },
            reLoad(d,obj){
                if(d=='end'){
                    obj.name = this.$route.name;
                    obj.curr = this.currType;
                    // console.log(obj);
                    this.SETPOSITIONY(obj)
                    
                }else if(d=='down'){
                    this.getHotGame(true);
                }
                
            },
            async goQp(item,name){
                if (!this.$store.state.userinfo.user_id) {
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
               
                if(item.code=='lott'){
                    this.$router.push('/betting/'+item.id)
                }else{
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
                        return
                    }
                    if(name=="MG"){
                        window.open('/toGame/mg/'+item.code);
                    }else{
                        window.open('/toGame/'+item.code+'/'+item.id);
                    }
                    
                }


                // else if(item.type=='ag_live'){
                //     window.open('//toGame/live/-1');
                // }else if(item.type=='ag_slot'){
                //     window.open('//toGame/slot/-1');
                // }else if(item.type=='bg_fish'){
                //     window.open('//toGame/bg_fish/'+item.id);
                // }else if(item.type=='bg_live'){
                //     window.open('//toGame/bg_live/'+item.id);
                // }else if(item.type=='ibc'){
                //     window.open('//toGame/ibc/'+item.id);
                // }else if(item.type=='ky'){
                //     window.open('//toGame/ky/'+item.id);
                // }else if(item.type=='ag_hunter'){
                //     window.open('//toGame/ag_hunter/'+item.id);
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
            async goUrl(url){
                this.$vux.loading.show({text: 'Đang chạy...'});
                let res=  await this.$http.get('/api2/'+url);
                this.$vux.loading.hide();
                if(res.data.data){
                    this.gameUrl =res.data.data;
                }
            },
            ScrollX(){
                let all = document.querySelectorAll('.game-type>span');
                let allzj = document.querySelectorAll('.game-container .zj-list li');
                let sum = 0;
                let sum2 = 0;
                for(let i=0,len=all.length;i<len;i++){
                    sum +=(all[i].offsetWidth);
                }
                // console.log(allzj);
                for(let i=0,len=allzj.length;i<len;i++){
                    sum2 +=(allzj[i].offsetWidth)+10;
                }
                this.$refs.personTab.style.width = sum-0+10 + "px";
                this.leftValue = sum-0+10;
                if(this.codeToken) this.$refs.personTab2[0].style.width = sum2-0+10 + "px";
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
                window.location.href = this.customer;
            },
        },
        watch:{
            closeData:function(n,o){
                if(n&&n.length){
                    this.findClose(n)
                }
            },
            allGames: function() {
                this.$nextTick(() => {
                    this.ScrollX();
                    setTimeout(()=>{
                        //
                        if(this.$store.state.scrollYPosition['curr']) this.currType = this.$store.state.scrollYPosition["curr"]
                        // console.log(this.$store.state.scrollYPosition['curr'])
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)
                });
            },
            currType:function (n) {
                // this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
                let  obj ={};
                obj.name = this.$route.name;
                obj.curr = this.currType;
                obj.y = 0;
                console.log(obj);
                this.SETPOSITIONY(obj);

                this.$nextTick(() => {
                    if(this.currType=='热门推荐'&&this.codeToken){
                        let allzj = document.querySelectorAll('.game-container .zj-list li');
                        let sum2 = 0;
                        for(let i=0,len=allzj.length;i<len;i++){
                            sum2 +=(allzj[i].offsetWidth)+10;
                        }
                        this.$refs.personTab2[0].style.width = sum2-0+10 + "px";
                    }

                     setTimeout(()=>{
                        //
                        // if(this.$store.state.scrollYPosition['curr']) this.currType = this.$store.state.scrollYPosition["curr"]
                        // console.log(this.$store.state.scrollYPosition['curr'])
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)


                });
            },
            gameUrl:function () {
                this.$nextTick(() => {
                    // console.log(document.forms[0].getAttribute('action'));
                    // window.open(document.forms[0].getAttribute('action'));
                });
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .game-center{
        .right-icon{
            position: fixed;
            right: 0;
            top:2.4rem;
            z-index: 10;
            background: url("../../assets/images/game/x (1).png") #fff center center no-repeat;
            background-size: 45%;
            .rem(width,40);
            height: .8rem;
        }
    }
    .home-header {
        .rem(height,100);
        z-index: 1;
        span {
            display: inline-block;
            margin-right: 0.2rem;
            // color: #fff;
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
            right: 2.4rem;
            top: 0.2rem;
            // height: 0.8rem;
            // width: 0.8rem;
            .rem(width,50);
            .rem(height,50);
        }
        .recharge-btn{
            // width: 1.333rem;
            // height: 0.8rem;
              .rem(width,60);
            .rem(height,50);
            // background: url("../../assets/images/video/recharge-btn.png") no-repeat;
            // background-size: 100% 100%;
            position: absolute;
            right: 0.4rem;
            top: 0.2rem;
            img{
                width: 100%;
            }
        }
        .tixian{
            right:1.4rem;
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
    .live-box,.pure-box{
        position: fixed;
        top:4rem;
        .rem(width,142);
        .rem(height,48);
        background: url("../../assets/images/pure_icon.png") no-repeat;
        background-size: contain;
        z-index: 10;
    }
    .live-box{
        background: url("../../assets/images/live_icon.png") no-repeat;
        background-size: contain;
    }
    header{
        text-align: center;
        line-height: 1.2rem;
        height: 1.2rem;
        .rem(font-size,28);
        letter-spacing: 1px;
        position: static!important;
        font-weight: bold;
        .rule-rk{
            position: absolute;
            right: .3rem;
            top: 0;
        }
    }
    .game-type{
        line-height: 1rem;
        height: 1rem;
        border-bottom: 1px solid #f5f5f5;
        span{
            position: relative;
            display: inline-block;
            padding: 0 13px;
            .rem(font-size,26);
            &.active{
                // color: #F8423E;
                color: #1486FF;
                .rem(font-size,28);
                font-weight: bold;
            }
            &.active-gq{
                color: #f7423d;
                .rem(font-size,28)
            }
            &.active-qrj{
                color: #7E26F2;
                .rem(font-size,28)
            }
            &.active-sdj{
                color:  #94EFFF;
                .rem(font-size,28)
            }
            &.active-dw{
                color: #8EB917!important;
                .rem(font-size,28)
            }
            &.active-new{
                color: #ff513e;
                .rem(font-size,28)
            }
            &.active-ox{
                color: #ee3c1a;
                .rem(font-size,28)
            }
            &.active-uefa{
                color: #5284FF;
                .rem(font-size,28)
            }
            &.active:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                // background: #F8423E;
                background: #1486FF;
            }
            &.active-gq:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #ef7e11;
            }
            &.active-qrj:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #7E26F2;
            }
            &.active-sdj:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #94EFFF;
            }
            &.active-dw:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #8EB917!important;
            }
            &.active-new:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #ff513e!important;
            }
            &.active-ox:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #ee3c1a!important;
            }
            &.active-uefa:after{
                position: absolute;
                content: '';
                width: 50%;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                .rem(height,6);
                border-radius: 20px;
                background: #5284FF!important;
            }
        }
    }
    .other-game-container{
        ul{
            padding-top: .3rem;
        }
    }
    .game-container{
        background: #fff;
        margin-bottom: .2rem;
        h3{
            line-height: 1rem;
            padding-left: 3%;
        }
        ul{
            margin-left: 3%;
            li{
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
                display: inline-block;
                .rem(border-radius,10);
                width: 30%;
                margin-right: 3%;
                text-align: center;
                margin-bottom: .2rem;
                padding: 0 .2rem 0 .2rem;
                .rem(height,290);
                overflow: hidden;
                position: relative;
                .close-icon{
                    position: absolute;
                    left: .15rem;
                    top:.15rem;
                    background: url("../../assets/images/game/fp_icon.png") no-repeat;
                    background-size: contain;
                    .rem(width,60);
                    .rem(height,20);
                    display: none;
                }
                &.active{
                    .close-icon{
                        display: block;
                    }
                }
                .tag-icon{
                    position: absolute;
                    .rem(width,56);
                    .rem(height,58);
                    right: 0;
                    top:0;
                    &.tag-hot{
                        background: url("../../assets/images/game/hot.png") no-repeat;
                        background-size: contain;
                    }
                    &.tag-new{
                        background: url("../../assets/images/game/new.png") no-repeat;
                        background-size: contain;
                    }
                }
                .g-img{
                    margin: .3rem auto .2rem;
                    /*width: 80%;*/
                    .rem(width,160);
                    .rem(height,160);
                }

                p{
                    .rem(padding-bottom,10)
                }
                span{
                    
                    .rem(font-size,20);
                }
            }
        }
        ul.zj-list{
            overflow: hidden;
            li{
                .rem(margin-left,20);
                margin-right: 0;
                .rem(width,210);
                float: left;
            }
        }

    }
    /*公告*/
    .notice-box {
        width: 100%;
        margin: 0 auto;
        // background: url("../../assets/images/main/notice-text.png") #fff no-repeat
        //   0.4rem center;
        background: url("../../assets/images/main/notice.png") no-repeat 0.4rem center;
        background-size: 8%!important;
        color: #666;
        .rem(font-size,28);
        padding-right: 0.4rem;
        min-height: 0.95rem;
        border-bottom: 1px solid #eee;
        /*border-top: 1px solid #eee;*/
        marquee {
            padding: 0.16rem 0 0.15rem 0;
            margin-left: 1.3rem;
            span {
                vertical-align: -webkit-baseline-middle;
            }
        }
    }
    .no-lottery {
        overflow: hidden;
        background: #fff;
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
</style>