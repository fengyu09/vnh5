<template>
    <div class="live-container">
        <div class="live-type-nav" :class="isDown?'moreNav':''">
            <span :class="currHot==v.type?'active':''" v-for="v,index in typeList" :key="index" @click="currHot=v.type;lottery=v.name;isDown=false">{{v.name}}</span>
            <i class="seeMore-icon" @click="showMore" v-if="typeList.length" :class="isDown?'seeUp':''"></i>
        </div>
        <div class="nav-bg" v-if="isDown" @click="isDown=false"></div>
        
        <myScroll 
            :top='2'
            :bgColor="'F2F6F7'"
            :isDown="true"
            v-on:func="reLoad"
            :isLoad="isL"
            ref="scrollWrapper"
            :data="playList">
            <!-- banner -->
            <!-- <Banner :banner="bannerList" v-if="bannerList.length"/> -->
            <div class="banner-img" v-for="v,index in hotBanner" v-if="currHot==v.type" :key="index">
                <a v-if="currHot==v.type" :href="v.url?v.url:'javascript:;'"><img v-lazy="v.image_url" alt=""></a>
                </div>
            <!-- 主要内容 -->
            <div class="hot-host section">
                 <ul v-if="hotHost.length" class="clearfix hot hot-box">
                        <li v-for="(v,index) in hotHost" :key="index">
                            <a href="javascript:;" @click="goChat(v.anchor_id)">
                                <div class="lottery-type" :style="'background:url('+v.background+') 100% no-repeat'">{{v.name}}</div>
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
                 <div v-if="!hotHost.length" style="text-align: center;
    padding: 1rem 0;">暂无</div>
                 <!-- <ul v-if="!hotHost.length" class="no-host">
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
                 </ul> -->
            </div>
        </myScroll>
    </div>
</template>

<script>
// import swiper from "swiper";
    export default {
        name: "live",
        data(){
            return{
                bannerList:[],
                hotHost:[],
                playList:{},
                typeList:this.$store.state.hotLive.typeList||[],
                currHot:this.$store.state.gamestatus.liveHot||0,
                yhListData:this.$store.state.hotLive.data||[],
                isDown:false,
                isL:false,
                lottery:'全部',
                hotBanner:[],
                isDownload:4.81
            }
        },
        created(){
            this.getHost();
            this.getHotBanner();
        },
        watch:{
             currHot:function(type){
                this.$store.commit('SETGAMESTATUS',{key:'liveHot',val:type})
                this.hotHost=this.sxData(type);
            },
            lottery:function(name){
               // this.getHotBanner(name);
            },
            hotHost:function(){
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)

                })
            }
        },
         filters: {
            filterNickName(n) {
                if (n.length > 8) {
                    n = n.substring(0, n.length - (n.length - 5)) + "...";
                    return n;
                }
                return n;
            },
            filterOnlineNum(n) {
                if (n > 10000) {
                    return n / 10000 + "万";
                }
                return n;
            }
        },
        methods: {
            async getHotBanner(type){
                let res = await this.$http.get(this.versionLive2+'user/get_good_live/',{params:{
                    // lottery:type||this.lottery
                }});
                this.hotBanner = res.data.data;

            },
            sxData(type){
                if(!this.yhListData) return
                if(type==0) return this.hotHost = this.yhListData
                let arr = [];
                // console.log(44444,this.yhListData)
                for(let i=0,len=this.yhListData.length;i<len;i++){
                        if(this.yhListData[i].r_id==type){
                            arr.push(this.yhListData[i])
                        }   
                }
                return arr;
            },
            showMore(){
                this.isDown = !this.isDown;
            },
            reLoad(data,obj) {
                if (data == "down") {
                    this.isL = true;
                    this.getHotBanner();
                    this.getHost();
                } else if (data == "up") {
                }else if(data=='end'){
                    obj.name = this.$route.name;
                    this.$store.commit('SETPOSITIONY',obj)
                    console.log(obj);
                    
                }
            },
            goChat(id) {
                if (!this.$store.state.userinfo.user_id && id == 1111111111) {
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
            async getBanner(flag) {
                // if (!flag && this.$store.state.banners.length){
                //     this.bannerList = this.$store.state.banners;
                //     this.playList.bannerList = this.bannerList;
                //     return 
                // } 
                this.bannerList = this.$store.state.banners;
                let res = await this.$http.get("/api/live/sport/get_banner/");
                if (res && res.data.code == 1) {
                    this.bannerList = res.data.data || [];
                    // this.SETBANNER_S(this.bannerList);
                    
                    // this.$store.commit('SETBANNER_S',this.bannerList)
                    this.playList.bannerList = this.bannerList;
                   
                    
                }
            },
            async getHost() {
                this.hotHost = this.sxData(this.currHot);//渲染的数据列表
                let res = await this.$http.get(this.versionLive2 + "live/get_all_list/",{
                    params:{
                        limit:1000,
                        page:1
                    }
                });
                this.isL = false;
                if (res && res.data.code == 1) {
                    this.isL = false;
                    this.yhListData = res.data.data || [];//原来的数据
                    this.typeList = res.data.typeList;//种类
                    this.lottery = res.data.typeList[0].name;
                    console.log( this.lottery)
                    // this.getHotBanner();
                    this.hotHost = this.sxData(this.currHot);//渲染的数据列表
                    this.playList.hotHost = this.hotHost;
                    this.$store.commit('SETHOTLIVEDATA',res.data);
                }
            },
            
        },
    }
</script>

<style scoped lang='less'>
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .live-type{
        padding:0 .2rem ;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        span{
            color: #71819D;
            .rem(font-size,28);
            padding: 0 .2rem;
            &.active{
                color: #1486FF;
                font-weight: bold;
                .rem(font-size,32);
            }
        }
    }
    .live-type-nav{
        height: 1rem;//
        overflow: hidden;
        background: #fff;
        padding: 0 .4rem .4rem .4rem;
        display: flex;
        flex-wrap: wrap;
        flex: none;
        position: fixed;
        z-index: 3;
        background: #fff;
        width: 100%;
        align-items: flex-start;
         max-width: 750px; 
        min-width: 320px;
        transition: all .3s;
        &.moreNav{
            height: 3.5rem;//
            
        }
        .seeMore-icon{
            position: absolute;
            bottom: 0rem;
            background: url(../../assets/images/newHome/down.png) no-repeat center;
            background-size: 40%;
            right: 0rem;
            width: 1rem;
            height: 1rem;
            &.seeUp{
                background: url(../../assets/images/newHome/up.png) no-repeat center;
                background-size: 40%;
            }
        }
        span{
            color: #71819D;
            .rem(font-size,24);
            padding:0 .2rem;
            position: relative;
            display: inline-block;
             height: 1rem;
            line-height: 1rem;
            &.active{
                 color: #1486FF;
                font-weight: bold;
                .rem(font-size,28);
                &:before{
                    content: '';
                    position: absolute;
                    .rem(height,6);
                    width: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #1486FF;
                    border-radius: 5px 5px 0px 0px;
                    bottom: 0;
                }
            }
        }
    }
    .nav-bg{
       background: rgba(0,0,0,.5);
       width: 100%;
       height: 100%;
       max-width: 750px; 
       min-width: 320px;
       position: fixed;
       z-index: 2;
       
    }
    .section {
                width: 94.6%;
                margin: 0.4rem auto 0;
                font-size: 0.33rem;
                border-top:none!important;

            ul.hot {
                li {
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
                                .online{
                                    display: inline-block;
                                    background: url("../../assets/images/anchorP/zhibo_ing.gif")
                                        no-repeat center;
                                    background-size: contain;
                                    vertical-align:middle;
                                    height: 20px;
                                    width: 15px;
                                }
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
    .banner-img{
        width: 94.6%;
        margin: 0 auto;
        height: 4.2rem;
        overflow: hidden;
        background: #eee;
        border-radius: .2rem;
        a{
            display: block;
        }
    }
</style>