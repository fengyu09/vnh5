<template>
    <div class="sportLive-container">
        <div class="live-type-nav">
            <span :class="currType==v.type_name?'active':''" v-for="v,index in tabNav" :key="index" @click="changeCurr(v)">{{v.name}}</span>
            <!-- <span>欧冠</span>
            <span>欧冠</span> -->
        </div>
        <myScroll 
        :top='2' 
        :bgColor="'F2F6F7'"
        :isDown="true"
        v-on:func="reLoad"
        :isLoad="isL"
        :data="playList"
        ref="scrollWrapper"
        >
            <!-- banner -->
            <!-- <Banner :banner="bannerList" v-if="bannerList.length"/> -->
            <div class="banner-img"><a :href="sportBanner.url?sportBanner.url:'javascript:;'"><img v-lazy="sportBanner.image_url" alt=""></a></div>
            <!-- 主要内容 -->
            <div class="live-main-content">
                 <ul class="clearfix hot hot-box">
                    <li v-for="(v,index) in hotHost" :key="index">
                        <a href="javascript:;" @click="goChat(v.id)">
                            <div class="lottery-type">{{v.race_config.matchdate|filterMatchDate}}</div>
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
                                <p class="fr host-type" >
                                    <!-- 体育稿里不需要这个图标 -->
                                    <!-- <img v-lazy="v.tags[0].icon" alt class="hot-type" /> -->
                                    <!-- <span>{{allType[v.race_type]}}</span>-->
                                    <span>{{v.race_type}}</span> 
                                </p>
                            </div>
                            <p class="hot-mes clearfix">
                                <span class="fl intro text-overflow">{{v.race_config.simpleleague}}<i v-show="v.race_config.stagename">-</i>{{v.race_config.stagename}}</span>
                                <span class="fr online-num">{{v.online | filterOnlineNum}}</span>
                            </p>
                            <div class="race-config">
                                <dl>
                                    <dt><img v-lazy="v.race_config.homelogo" alt=""></dt>
                                    <dd>{{v.race_config.homesxname|filterNickName}}</dd>
                                </dl>
                                <dl>
                                    <dt style="font-weight: bold;font-size:.4rem;line-height:.5rem">{{v.race_config.matchtime|filterCut}}</dt>
                                    <dd style="font-weight: bold;font-size:.4rem">VS</dd>
                                </dl>
                                <dl>
                                    <dt><img v-lazy="v.race_config.awaylogo" alt=""></dt>
                                    <dd>{{v.race_config.awaysxname|filterNickName}}</dd>
                                </dl>
                                
                            </div>
                            <div class="red-pack" v-if="v.red_paper_num>0" :class="v.ext_img?'hasTz':''"></div>
                            <div class="cr-living" v-if="v.ext_img"><img :src="v.ext_img"/></div>
                        </a>
                    </li>
                 </ul>
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
import { mapState,mapMutations } from "vuex";
    export default {
        name: "sportLive",
        data(){
            return{
                bannerList:[],
                hotHost:[],
                playList:{},
                isL:false,
                tabNav:[],
                currType:this.$store.state.gamestatus.sportHot||'',
                yhListData:[],
                allType:{},
                raceType:'zq',
                sportBanner:{},
                isDownload:3.81
            }
        },
        filters: {
            filterNickName(n) {
                if(!n) return
                if (n.length > 5) {
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
            },
            filterCut(n){
                n = n?n.slice(10, n.length):n;
                return n
            },
            filterMatchDate(n){
                n = n?n.slice(0, 10):n;
                return n
            }
        },
          computed: {
            ...mapState(["isDownLoad"])
        },
         created(){
             this.getBanner();
            this.getType();
            
            this.getSportBanner();
        //     if(!this.$store.state.isDownLoad){
        //         this.isDownload = 2
        //     }else{
        //             this.isDownload = 3.81
        //    }
        },
        watch:{
             currType:function(type){
                this.$store.commit('SETGAMESTATUS',{key:'sportHot',val:type})
                this.hotHost=this.sxData(type);
            },
           
            hotHost:function(){
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },20)

                })
            },
            //    isDownLoad:function(n){
            //     if(!n){
            //         this.isDownload = 2
            //     }else{
            //         this.isDownload = 3.81
            //     }
            //    }

            
        },
        methods: {
            sxData(type){
                if(!this.yhListData) return
                // if(type=='zq') return this.hotHost = this.yhListData
                let arr = [];
                // console.log(44444,this.yhListData)
                for(let i=0,len=this.yhListData.length;i<len;i++){
                        if(this.yhListData[i].race_type==type){
                            arr.push(this.yhListData[i])
                        }   
                }
                return arr;
            },
            async getType(){
                let res = await this.$http.get(' /api/live/sport/get_sport_type/');
                this.tabNav = res.data.data||[];
                this.currType = this.currType?this.currType:this.tabNav[0].type_name;
                // this.tabNav.forEach(v=>{
                //     this.allType
                // });
                this.getHost();
            },
            async getSportBanner(type){
                let res = await this.$http.get(this.versionLive2+'user/get_sport_banner/',{params:{
                    client_type:3,
                    race_type:type || this.raceType
                }});
                this.sportBanner = res.data.data[0];

            },
            changeCurr(v){
                console.log(v)
                this.currType=v.type_name;
                this.getSportBanner(v.type_name);
            },
            goChat(id) {
                this.$router.push("/chatSport/" + id);
            },
            reLoad(data,obj) {
                if (data == "down") {
                    this.isL = true;
                    this.getBanner(true);
                    this.getHost();
                } else if (data == "up") {
                }else if(data=='end'){
                    obj.name = this.$route.name;
                    this.$store.commit('SETPOSITIONY',obj)
                    
                }
            },
             async getBanner(flag) {
                if (!flag && this.$store.state.banners.length){
                    this.bannerList = this.$store.state.banners;
                    this.playList.bannerList = this.bannerList;  
                   
                    return 
                } 
                let res = await this.$http.get("/api/live/sport/get_banner/");
                if (res && res.data.code == 1) {
                    this.bannerList = res.data.data || [];
                    // this.SETBANNER_S(this.bannerList);
                    this.playList.bannerList = this.bannerList;
                    console.log(this.bannerList)
                    
                    
                }
            },
            //接口改成体育直播的
            async getHost() {
                let res = await this.$http.get('/api/live/sport/get_sport_list/');
                 this.isL = false;
                if (res && res.data.code == 1) {
                    this.yhListData = res.data.data.data || [];
                    this.hotHost = this.sxData(this.currType);
                    console.log(this.hotHost )
                    
                    this.playList.hotHost = this.hotHost;
                }
            },
        },
    }
</script>

<style scoped lang='less'>
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .live-main-content{
        padding:.3rem;
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
                            width: 75%;
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
                                color: #fff;
                                background: #4C6176;
                                .rem(border-radius,6);
                                padding: .1rem .15rem;
                                opacity: 0.2;
                                .rem(font-size,24);
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
    .live-type-nav{
         height: 1rem;
        line-height: 1rem;
        background: #fff;
        padding: 0 .4rem;
        span{
            color: #71819D;
            .rem(font-size,24);
            padding:0 .2rem;
            position: relative;
            display: inline-block;
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
    .race-config{
        position: absolute;
        top: .8rem;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        display: flex;
        padding: .2rem 0 0 0 ;
        >dl{
            flex: 1;
            color: #fff;
            text-align: center;
            dt{
                img{
                    width: .5rem;
                    height: .5rem;
                    margin: 0 auto;
                }
            }
            dd{
                
                margin-top: .1rem;
            }
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