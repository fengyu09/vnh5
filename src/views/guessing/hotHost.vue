<template>
    <div class="hot-host-container">
        <!--热门主播-->
        <myScroll
                ref="scrollWrapper"
                :probeType="2"
                :top="5.2"
                :bottom="0"
                :left="0"
                :zIndex="1000"
                >
            <div class="hot-host section">
                <ul v-if="hotHost.length" class="clearfix hot hot-box">
                    <li v-for="(v,index) in hotHost" :key="index" v-if="index<6">
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
        </myScroll>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "hotHost",
        data(){
            return{
                hotHost: [], //热门主播
            }
        },
        computed: {
            ...mapState([
                "userinfo",
            ])
        },
        created() {
            this.getHost();
        },
        methods:{
            async getHost() {
                this.$vux.loading.show({ text: "Đang nhận..." });
                let res = await this.$http.get(this.versionLive2 + "live/get_hot_list/");
                this.$vux.loading.hide();
                if (res && res.data.code == 1) {
                    this.hotHost = res.data.data || [];
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
        }
    }
</script>

<style scoped lang="less">
    .section {
        width: 94.6%;
        margin: 0.4rem auto 0;
        font-size: 0.33rem;
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
</style>