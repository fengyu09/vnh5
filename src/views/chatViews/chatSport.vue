<template>
    <div class="chat-sport">
        <div class="sport-top">
            <img class="back" src="../../assets/images/chat/back.png" alt="">
            <div class="top-main">
                <p class="title">英超【03-05 02:00】</p>
                <div class="name-content clearfix">
                    <span class="name d-name fl"> 
                        <img class="icon" src="../../assets/images/chat/flm.png" alt="">
                        富勒姆（主）
                    </span>
                    <span class="num fl">
                        (0:1)
                        <strong>0 : 0</strong>
                    </span>
                    <span class="name k-name fl"> 
                        <img class="icon" src="../../assets/images/chat/lwp.png" alt="">
                        利物浦（客）
                    </span>
                </div>
            </div>
        </div>
        <div class="sport-main">
            <div class="main-tab">
                <span :class="{'active':tabType ==0}" @click="tabType = 0">聊天</span>
                <span :class="{'active':tabType ==1}" @click="tabType = 1">球队</span>
            </div>
            <div class="chat-content" v-show="tabType ==0">
                <ul class="clearfix">
                    <myScroll 
                    :isDown="true"
                    :isLoad="isL"
                    :isUp="isUpFlag"
                    :isloadUp="isLup"
                    :bottom="0"
                    :top="0.2"
                    ref="scrollWrapper"
                    :data="playList"
                    v-on:func="reLoad"
                    >
                        <li>
                            <div class="clearfix">
                                <div class="chat-photo fl"><img src="../../assets/images/chat/2.jpg" alt=""></div>
                                <div class="chitchat fl">
                                    <div class="name-tiem clearfix">
                                        <span class="name fl">弗兰克</span>
                                        <span class="fr">16:38</span>
                                    </div>
                                    <span class="chat-say-content">喜欢主播的给主播点点关注哦喜欢主播的给主播点点关注哦</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="clearfix">
                                <div class="chat-photo fl"><img src="../../assets/images/chat/2.jpg" alt=""></div>
                                <div class="chitchat fl">
                                    <div class="name-tiem clearfix">
                                        <span class="name fl">大猫</span>
                                        <span class="fr">16:38</span>
                                    </div>
                                    <span class="chat-say-content">喜欢主播的给主播点点关注哦</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="clearfix">
                                <div class="chat-photo fl"><img src="../../assets/images/chat/2.jpg" alt=""></div>
                                <div class="chitchat fl">
                                    <div class="name-tiem clearfix">
                                        <span class="name fl">大猫</span>
                                        <span class="fr">16:38</span>
                                    </div>
                                    <span class="chat-say-content">喜欢主播的给主播点点关注哦</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="clearfix">
                                <div class="chat-photo fl"><img src="../../assets/images/chat/2.jpg" alt=""></div>
                                <div class="chitchat fl">
                                    <div class="name-tiem clearfix">
                                        <span class="name fl">大猫</span>
                                        <span class="fr">16:38</span>
                                    </div>
                                    <span class="chat-say-content">喜欢主播的给主播点点关注哦</span>
                                </div>
                            </div>
                        </li>
                    </myScroll>
                </ul>
                <p class="welcome">欢迎快乐十分进入直播间</p>
                <div class="say-box">
                    <input id="textInput" type="text" placeholder="说点啥吧..." class="barrage-input">
                    <div class="send-btn fl">发送</div>
                </div>
            </div>
            <div class="team-box" v-show="tabType ==1">
                <div class="title-tab">
                    <span :class="{'active':inftTab == 0}" @click="inftTab = 0">富勒姆</span>
                    <span :class="{'active':inftTab == 1}" @click="inftTab = 1">利物浦</span>
                </div>
                <div class="team-info" v-show="inftTab ==0">
                    <p>富勒姆足球俱乐部（Fulham F.C.）<br/>

                    <br/>是一家位于英格兰伦敦的足球俱乐部，成立于1879年，主场为克拉文农场球场。队徽最初设计于19世纪，图案是圣保罗之剑。后来两度修改，最终简化为如今的图案，三个红色字母为富勒姆足球俱乐部的缩写。

                    <br/>在1960年代，球队大部分时间都在旧英甲联赛（英超前身）但没有赢得任何重要的锦标。1975年，他们终于打进足总杯决赛，不过遗憾屈居亚军。20世纪90年代，埃及富商法耶德入主俱乐部，富勒姆在得到重大财力支持后于2001年升上英超，此后曾多次出现降级危机，不过每次都能顺利保级。2009-10赛季俱乐部再度迎来高光时刻，在欧洲足联欧洲联赛中获得亚军。

                    <br/>2013年7月入主富勒姆长达16年的法耶德将股份出售给美籍巴基斯坦裔的沙希德·可汗。2013/14赛季，富勒姆在英超联赛中表现不济陷入降级危机，虽然球队聘用马加特为新教练，但最终仍未实现保级，球队连续13年的英超生涯终止。2018年5月27日英冠升级附加赛在新温布利球场进行，富勒姆凭借上半场凯尔尼的进球1-0力克阿斯顿维拉，时隔四年重返英超。 [1]  2020年8月5日，富勒姆在英冠升级附加赛决赛上以2-1击败布伦特福德，时隔1年成功重返英超。 [2] 
                    <br/>2021年5月11日，富勒姆降入英冠联赛。 [9] 
                    </p>
                </div>
                 <div class="team-info" v-show="inftTab ==1">
                    <p>富勒姆足球俱乐部（Fulham F.C.）<br/>

                    <br/>是一家位于英格兰伦敦的足球俱乐部，成立于1879年，主场为克拉文农场球场。队徽最初设计于19世纪，图案是圣保罗之剑。后来两度修改，最终简化为如今的图案，三个红色字母为富勒姆足球俱乐部的缩写。

                    <br/>在1960年代，球队大部分时间都在旧英甲联赛（英超前身）但没有赢得任何重要的锦标。1975年，他们终于打进足总杯决赛，不过遗憾屈居亚军。20世纪90年代，埃及富商法耶德入主俱乐部，富勒姆在得到重大财力支持后于2001年升上英超，此后曾多次出现降级危机，不过每次都能顺利保级。2009-10赛季俱乐部再度迎来高光时刻，在欧洲足联欧洲联赛中获得亚军。

                    <br/>2013年7月入主富勒姆长达16年的法耶德将股份出售给美籍巴基斯坦裔的沙希德·可汗。2013/14赛季，富勒姆在英超联赛中表现不济陷入降级危机，虽然球队聘用马加特为新教练，但最终仍未实现保级，球队连续13年的英超生涯终止。2018年5月27日英冠升级附加赛在新温布利球场进行，富勒姆凭借上半场凯尔尼的进球1-0力克阿斯顿维拉，时隔四年重返英超。 [1]  2020年8月5日，富勒姆在英冠升级附加赛决赛上以2-1击败布伦特福德，时隔1年成功重返英超。 [2] 
                    <br/>2021年5月11日，富勒姆降入英冠联赛。 [9] 
                    </p>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
export default {
    name: "chatSport",
    components: {
        myScroll
    },
    data() {
        return {
            tabType:0, //聊天&球队内容
            inftTab:0, //球队介绍
            isload: false,
            isLup: false, //是否显示 上拉加载更多的组件
            isUpFlag: true, //是否开启上拉加载更多 默认不开启
            isL: false, //是否显示 下拉刷新的组件
        }
    },
    mounted() {
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
}
</script>

<style scoped lang='less'>
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
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
                        // .rem(margin-left,50);
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
    .sport-main{
        .rem(margin-top,241);
        .main-tab{
            .rem(height,88);
            background: #FAFAFA;
            border-radius: 20px 20px 0px 0px;
            .rem(padding-left,20);
            .rem(padding-top,24);
            span{
                display: inline-block;
                .rem(font-size,24);
                .rem(width,91);
                .rem(line-height,41);
                color: #666;
                text-align: center;
                &.active{
                    color: #FAFAFA;
                    border-radius: 10px 0px 10px 10px;
                    background: #4c65e3;
                }
            }
        }
    }
    .chat-content{
        .rem(min-height,782);
        background: #ECEFF6;
        ul{
            .rem(padding-top,20);
            .rem(min-height,600);
             background: #ECEFF6;
             overflow: hidden;
            position: relative;
            li{
                .rem(margin-bottom,12);
                .rem(padding-left,20);
                position: relative;
                >div{
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    position: relative;
                }
                .chat-photo{
                    .rem(width,70);
                    .rem(height,70);
                    overflow: hidden;
                    border-radius: 50%;
                    cursor: pointer;
                }
                .chitchat{
                    position: relative;
                    .rem(max-width,450);
                    .rem(min-width,300);
                    background: #fff;
                    .rem(margin-left,10);
                    border-radius: 0 4px 4px 4px;
                    .rem(padding,20);
                    .name-tiem{
                        .rem(font-size,24);
                        
                        .rem(padding-bottom,15);
                    }
                    .chat-say-content{
                        .rem(font-size,28);
                        color: #445779;
                    }
                }
            }
        }
       
        .welcome{
            .rem(font-size,24);
            color: #666;
            text-align: center;
            .rem(margin-top,20);
            .rem(margin-bottom,58);
        }
        .say-box{
            width: 100%;
            .rem(height,100);
            background: #fff;
            overflow: hidden;
            .rem(padding-top,15);
            .rem(padding-left,20);
            position: absolute;
            bottom: 0;
            left: 0;
            input{
                .rem(width,560);
                .rem(height,70);
                background: #ECEFF6;
                float: left;
                .rem(padding-left,10);
                .rem(padding-right,10);
            }
            .send-btn{
                .rem(width,130);
                .rem(line-height,70);
                color: #fff;
                text-align: center;
                background: #4c65e3;
                .rem(border-radius,10);
                .rem(margin-left,20);
            }
        }
    }
    .team-box{
        background: #ECEFF6;
        .rem(font-size,24);
        padding-top: 1px;
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
                    background: #FAFAFA;
                }
            }
        }
        .team-info{
            .rem(padding,20);
            color: #666;
        }
    }
</style>