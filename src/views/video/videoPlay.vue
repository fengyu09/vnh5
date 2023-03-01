<template>
    <div class="video-play">
        <div class="video-header"><i @click="goBack()"></i></div>
        <div class="video-play-container" v-show="isToken">
            <video id="myVideo" style="width: 100%; height: 100%"
                   class="video-js vjs-default-skin vjs-big-play-centered "
                   webkit-playsinline="true"
                   playsinline="true"
                   controls
                   :poster="playerOptions.poster"
                   preload="auto">
<!--                <source src="http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8" type="application/x-mpegURL">-->
<!--                 <source src="https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8" type="application/x-mpegURL">-->
                <source :src="playerOptions.sources[0].src" :type='playerOptions.sources[0].type' />
            </video>

<!--            <video style="width: 100%; height: 100%" class="full-height full-width" ref="video" controls></video>-->
            <!-- <div v-show="!isToken" class="now-login-btn">立即登录</div>
            <div v-show="!isToken" class="now-reg-btn">立即Đăng ký</div> -->
<!--            <video id="myVideo" style="width:100%;height:100%"-->
<!--                 controls="controls"-->
<!--                preload="auto" webkit-playsinline="true" playsinline="true"-->
<!--                   class="video-js vjs-default-skin vjs-big-play-centered"-->
<!--                 >-->
<!--                <source src="https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8" type="application/x-mpegURL" id="target"/>-->
<!--            </video>-->
<!--            <video  id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered video-player vjs-custom-skin"-->
<!--                style="width:100%;height:100%"-->
<!--                ref="videoPlayer"-->
<!--                controls-->
<!--                currentSrc-->
<!--                x5-video-player-type='h5'-->
<!--                preload="auto"-->
<!--                x-webkit-airplay="allow"-->
<!--                x5-video-player-fullscreen="true"-->
<!--                x5-video-orientation="portraint"-->
<!--                webkit-playsinline="true"-->
<!--                playsinline="true"-->
<!--                :poster="playerOptions.poster"-->
<!--                >-->
<!--                <source :src="playerOptions.sources[0].src" :type='playerOptions.sources[0].type' />-->
<!--            </video>-->
        </div>
        <div v-show="!isToken" class="video-play-container">
            <div  class="now-login-btn" @click="$router.push('/login')">{{$t('videoPlay.text[0]')}}</div>
            <div  class="now-reg-btn" v-if="noticeType==1" @click="$router.push('/register')">{{$t('videoPlay.text[1]')}}</div>
            <div  class="now-reg-btn" v-if="noticeType==2" @click="$router.push('/RegisterDl')">{{$t('videoPlay.text[2]')}}</div>
        </div>
        <myScroll
                ref="scrollWrapper"
                :data="playList"
                :probeType="2"
                :top="6.2"
                :bottom="0"
                :left="0"
                :zIndex="10"
                class="scroll-item"
                :bgColor="$st.state.skin==5?'1F252C':''"
        >
            <div class="video-banner"  v-if="playVideoBanner.length" @click="goLink"><img v-lazy="playVideoBanner[0].image_url" alt=""></div>
            <div class="video-msg" :class="skin==5?'video-msg-golden':''">
                <h3>{{videoMess.title}}</h3>
                <div class="video-msg-num">
                    <span class="video-play-num"><i></i>{{videoMess.reads}}&nbsp;{{$t('videoPlay.text[3]')}}</span>
                    <span class="video-play-time">{{videoMess.shelftime | formatDate2}}</span>
                    <span class="sc-btn" @click="scFuc()" v-if="videoMess.is_collect"><img src="../../assets/images/video/sc.png" alt=""></span>
                    <span class="sc-btn" @click="scFuc()" v-if="videoMess.is_collect==0"><img src="../../assets/images/video/msc.png" alt=""></span>
                    <span class="xiazai"  @click="xzVideo"> <img src="../../assets/images/video/xiazai.png" alt="" srcset=""> {{$t('videoPlay.text[4]')}}</span>
                    <span class="unlike-num" :class="unlike?'active':''" @click="controlLike($event,3)"><i></i>{{videoMess.tread}}</span>
                    <span class="like-num" :class="islike?'active':''" @click="controlLike($event,2)"><i></i>{{videoMess.praise}}</span>
                </div>

            </div>
            <div class="guess-like" :class="skin==5?'guess-like-golden':''">
                    <div class="guess-like-title clearfix">
                        <h3 class="fl">{{$t('videoPlay.text[5]')}}</h3>
                        <span class="fr" @click="changeOther">{{$t('videoPlay.text[6]')}}</span>
                    </div>
                    <ul class="guess-like-all">
                        <li class="like-item" v-for="(v,index) in guessLike" :key="index" @click="goPlay(v)">
                            <div class="like-img"><img v-lazy="v.cover" alt=""></div>
                            <div class="like-msg">
                                <p class="like-title">
                                    {{v.title | filterTitle}}
                                </p>
                                <p class="play-tag">{{$t('videoPlay.text[7]')}}<i v-if="v.tag.length" v-for="(item,i) in v.tag.split(',')" :key="i">{{item}}</i></p>
                                <p><i class="play-icon"></i>{{v.reads | filterOnlineNum}}{{$t('videoPlay.text[8]')}}</p>
                            </div>
                        </li>
   
                    </ul>
                    <p class="no-more" v-if="!guessLike.length&&!loadingLike">{{$t('videoPlay.text[9]')}}</p>
                    <p class="no-more" v-if="!guessLike.length&&loadingLike">{{$t('videoPlay.text[10]')}}</p>
             </div>
        </myScroll>

       


    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "videoPlay",
        data(){
            return {
                ii:'hahah',
                playList:{},
                videoMess:[],
                guessLike:[],
                changeLoading:false,
                loadingLike:true,
                postData:{
                    cid:1,//小分类
                    typeId:8,//大分类
                    limit:10,
                    //isMore:true,
                    page:1,
                    code:this.defalutLan,
                },
                islike:false,
                unlike:false,
                isiOS:Boolean,
                videoSrc:'',
                playerOptions : {
                    // playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            src:'https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8',
                            // src:'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8',
                            type:'application/x-mpegURL'
                        },
                    ],
                    poster: "../../static/images/test.jpg", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        currenTimeDisplay:true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    },
                    techOrder: ['html5','flash' ],// 兼容顺序
                    hls:{
                        withCredentials:true
                    }
                },
                myPlayer:'',
                playVideoBanner:JSON.parse(localStorage.getItem('banner_movie_play')),
                // playVideoBanner:[],
                hls: '',
                isToken:true,
                isLoadingZc:false,
                isSeeTime:false,//次数没有了需要购买
                codeNum:1,
                isBuy:0,
                isBuyMovie:false
            }
        },
      
        computed:{
            ...mapState([
                "codeToken",
                "username",
                "defalutLan",
                "skin"
            ]),
        },
        created(){
            // console.log(this.postData);
            this.getVideoPage();
            this.isToken = true;
            // 语言包
             this.$video.addLanguage("zh-CN",{
                "Play": this.$t('videoPlay.text[11]'),
                "Pause": "Tạm dừng",
                "Current Time": "Thời điểm hiện tại",
                "Duration Time": "Khoảng thời gian",
                "Remaining Time": "Thời gian còn lại ",
                "Stream Type": "媒体流类型",
                "LIVE": "直播",
                "Loaded": "Tải hoàn tất",
                "Progress": "进度",
                "Fullscreen": "Toàn màn hình",
                "Non-Fullscreen": "Thoát khỏi màn hình",
                "Mute": "Im lặng",
                "Unmute": "Hủy im lặng",
                "Playback Rate": "播放码率",
                "Subtitles": "Phụ đề",
                "subtitles off": " Tắt phụ đề ",
                "Captions": "内嵌字幕",
                "captions off": "内嵌字幕关闭",
                "Chapters": "Đoạn chương trình",
                "You aborted the media playback": "Dừng phát video",
                "A network error caused the media download to fail part-way.": "Lỗi mạng khiến quá trình tải xuống video không thành công.",
                "The media could not be loaded, either because the server or network failed or because the format is not supported.": this.$t('videoPlay.text[28]'),
                "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": this.$t('videoPlay.text[29]'),
                "No compatible source was found for this media.": "Không thể tìm thấy nguồn tương thích cho video này.",
                "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。"
                });
        },

        methods: {
            xzVideo(){
                 window.location.href=this.videoMess.down_url;
               
            },
            
            goLink(){
                if(!this.playVideoBanner[0].url) return
                else window.open(this.playVideoBanner[0].url)
            },
            goPlay(v) {
                //切换重新播放视频源
                this.isToken = true;
                this.getVideoPage(v.id,true);
                localStorage.setItem('vTime',JSON.stringify(''));
                this.myPlayer.play();
                
            },
            goBack(){
                 this.$router.history.go(-1)
                 localStorage.setItem('currType',1)
            },
            async getVideoList() {
                this.changeLoading = true;
                this.loadingLike = true;
                let res = await this.$http.post('/api/live/movie/domestic/', this.postData);
                this.changeLoading = false;
                this.loadingLike = false;
                if (res && res.data.code == 1) {
                    this.guessLike = res.data.data;
                    this.playList.guessLike = res.data.data;
                }else{
                    this.$vux.toast.text(res.data.msg, 'middle');
                }
            },
            //换一批
            changeOther() {
                if (this.changeLoading) return;
                this.postData.page++;
                this.getVideoList();
            },
           
            //收藏
            async scFuc(){
                if (!this.codeToken) {
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
                this.isLoadingZc = true;
                let res = await this.$http.post('/api/live/movie/movie_action/',{
                    movie_id:this.videoMess.id, //影片id
                    action:5
                })
                this.isLoadingZc = false;
                if (res && res.data.code == 1) {
                    //改变状态
                    if(this.videoMess.is_collect){
                        this.videoMess.is_collect = 0;    
                    }else{
                        this.videoMess.is_collect = 1;
                    }
                    this.$vux.toast.text(res.data.msg,"middle")

                }else{
                    this.$vux.toast.text(res.data.msg,"middle")
                }

            },
            //点赞 点踩
            async controlLike(e, type) {
                if(this.isLoadingZc) return;
                if (!this.codeToken) {
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
                this.isLoadingZc = true;
                 let d = this.globalPpproach.checkIsEncrypt({
                    action: type,//是否点赞 固定值 3：点踩 2：点赞
                    movie_id:this.videoMess.id //影片id
                })
                let res = await this.$http.post('/api/live/movie/movie_action/',{
                    action: type,//是否点赞 固定值 3：点踩 2：点赞
                    movie_id:this.videoMess.id //影片id
                });
                this.isLoadingZc = false;
                if (res && res.data.code == 1) {
                    this.videoMess.tread = res.data.data.tread;
                    this.videoMess.praise = res.data.data.praise;
                    //改变点赞和点踩的样式
                    if(type==2){
                        this.islike = true;
                        this.unlike = false;
                    }else{
                        this.unlike = true;
                        this.islike = false;
                    }
                    let curr = e.target.parentNode;
                    if (curr.className.includes('active')) {
                        curr.classList.remove('active');
                    } else {
                        curr.classList.add('active');
                    }
                }
            },
           
            isMyPlayer(){
                const  _this = this;
                _this.myPlayer = _this.$video('myVideo',_this.playerOptions,function(){
                    //--------methods
                    // this.load();
                    // this.play();
                    //this.pause();//暂停
                     _this.isToken = true;
                     if(!_this.codeToken){
                        this.on('timeupdate', function () {
                            var currentTime = this.currentTime();
                            if(currentTime >= 60){
                                    this.pause();
                                    localStorage.setItem('vTime',JSON.stringify(currentTime));
                                    _this.isToken = false;
                                    return;
                            }
                        });
                    }else{
                         _this.isToken = true;
                        let historyTime = localStorage.getItem('vTime');
                        if(historyTime){
                            this.currentTime(historyTime);
                        }
                        localStorage.setItem('vTime',JSON.stringify(''));
                    }
                });
                
            },
            //获取播放页
           async getVideoPage(id,flag){
               let d = this.globalPpproach.checkIsEncrypt({
                   movie_id: id || this.$route.params.id - 0,
                  language:this.defalutLan
                })
               let res = await this.$http.post('/api/live/movie/get_movie_detail/',{
                  movie_id: id || this.$route.params.id - 0,
                  language:this.defalutLan
                });
               if((res && res.data.code == 1)||res.data.code == -1){
                   this.videoMess = res.data.data;
                    this.postData.cid = res.data.data.cid-0;
                    this.postData.typeId = res.data.data.type-0;
                   //推荐列表
                   if(!flag) this.guessLike = res.data.data.guseelist;
                    if(!flag) this.playList.guessLike = res.data.data.guseelist;
                   //播放地址
                   this.playerOptions.sources[0].src = res.data.data.play_url;
                   //点赞状态
                   this.islike = res.data.data.is_zan == 1 ? true : false;
                   this.unlike = res.data.data.is_cai == 1 ? true : false;
                   if(res.data.code==-1){
                        this.isSeeTime = true;
                        this.isMyPlayer();
                   }else{
                        this.isMyPlayer();
                   }
                   //播放器
                   this.codeNum = res.data.code;
                   this.myPlayer.posterImage.setSrc(res.data.data.cover);
                   this.myPlayer.src(this.playerOptions.sources[0].src);
                
                // this.myPlayer.src('http://tp1.liveplay.vk7b0.cn/live/127ba3f4091df4a210b45e5e781b3b82.m3u8?user=lgzb137&pass=123456');
                //    this.isBuy = res.data.data.is_buy;
                }else {
                    this.$vux.toast.text(res.data.msg,"middle")
                }
            }
        },
        beforeDestroy:function(){
            if(this.myPlayer){
              this.myPlayer.dispose();
            }
        },

    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }
    .look-remind {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 101;

        .remind-box {
            height: 5.06rem;
            width: 7.3rem;
            background: #FFFFFF;
            border-radius: 0.266rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            .title {
                font-size: 0.42rem;
                margin-top: 0.66rem;
            }

            .confirm-btn {
                width: 75%;
                height: 0.94rem;
                font-size: 0.4rem;
                background-image: linear-gradient(to right, #FF3332, #FF7F66);
                color: #fff;
                line-height: 0.94rem;
                margin: 0.5rem auto;
                border-radius: 0.46rem;
            }

            .cancel-btn {
                width: 75%;
                height: 0.94rem;
                font-size: 0.4rem;
                border: 1px solid #FF7F66;
                color: #FF3434;
                line-height: 0.94rem;
                margin: 0rem auto;
                border-radius: 0.46rem;
            }

            .closeBtn {
                width: 0.58rem;
                height: 0.58rem;
                background: url('../../assets/images/chat/11_03.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                bottom: -1.5rem;
                left: 46%;
            }
        }
    }
    .time-out-tip{
         .remind-box{
             width: 90%;
             .confirm-btn,.cancel-btn{
                width: 40%;
                display: inline-block;
                margin:.3rem 0 0 0;
            }
            .cancel-btn{
                color: #666;
                border:1px solid #999;
            }
        p{
            color: #666;
            padding: .5rem 1rem;

        }
         }
        
    }
    .video-play{
        .video-header{
            height: 1.2rem;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 1000;
            i{
                position: absolute;
                .rem(width,23);
                .rem(height,42);
                background: url("../../assets/images/white-back-icon.png") no-repeat center;
                background-size: contain;
                top:.2rem;
                left: .3rem;
            }
        }
        .video-play-container{
            .rem(height,440px);
            background: #000;
            text-align: center;
            >div{
                .rem(width,240);
                .rem(height,70);
                .rem(line-height,70);
                .rem(border-radius,10);
                text-align: center;
                display: inline-block;
            }
            .now-login-btn{
                background:linear-gradient(90deg,rgba(255,51,51,1),rgba(255,127,102,1));
                color: #fff;
                .rem(margin-right,40);
                .rem(margin-top,180)
            }
            .now-reg-btn{
                background:#fff;
            }
        }
        .video-banner{
            /*margin: 0 .3rem;*/
            //.rem(width,670);
            .rem(height,100);
            margin:.3rem;
            .rem(border-radius,6);
            background: #eee;
            overflow: hidden;
        }
        .video-msg{
            padding: 0 .3rem;
            >h3{
                .rem(font-size,30);
                color: #222;
            }
            .video-msg-num{
                padding: .25rem 0;
            }
            .video-play-num{
                
                //.rem(font-size,18);
                >i{
                    display: inline-block;
                    .rem(width,20);
                    .rem(height,20);
                    background: url("../../assets/images/video/play_icon.png") no-repeat;
                    background-size: 100% 100%;
                    margin-right: .1rem;
                    vertical-align: unset;

                }
            }
            .video-play-time{
                .rem(font-size,24);
                padding-left: 0.5rem;
            }
            .sc-btn{
                .rem(width,40);
                .rem(height,25);
                display: inline-block;
                img{
                    .rem(width,20);
                    .rem(height,17);
                }
            }
            .xiazai{
                
                margin-left: 0.5rem;
                img{
                    vertical-align: middle;
                    width: 0.36rem;
                }
            }
            .like-num{
                
                //.rem(font-size,20);
                float: right;
                margin-right: .2rem;
                i{
                    display: inline-block;
                    color: #FF3533;
                    .rem(width,20);
                    .rem(height,19);
                    background: url("../../assets/images/video/like1.png") no-repeat;
                    background-size: contain;
                    margin-right: .1rem;
                    vertical-align: unset;
                }
                &.active{
                    i{
                        background: url("../../assets/images/video/like.png") no-repeat;
                        background-size: contain;
                    }
                }
            }
            .unlike-num{
                
                //.rem(font-size,20);
                float: right;
                margin-right: .2rem;
                i{
                    display: inline-block;
                    color: #FF3533;
                    .rem(width,20);
                    .rem(height,19);
                    background: url("../../assets/images/video/cai.png") no-repeat;
                    background-size: contain;
                    margin-right: .1rem;
                    vertical-align: unset;
                }
                &.active{
                    i{
                        background: url("../../assets/images/video/unlike2.png") no-repeat;
                        background-size: contain;
                    }
                }
            }
            &.video-msg-golden{
                color: #cecece;
                .like-num {
                    i{
                        background: url("../../assets/images/skin/golden/1.png") no-repeat;
                        background-size: contain;
                    }
                    &.active{
                        i{
                            background: url("../../assets/images/skin/golden/3.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
                .unlike-num {
                    i{
                        background: url("../../assets/images/skin/golden/4.png") no-repeat;
                        background-size: contain;
                    }
                    &.active{
                        i{
                            background: url("../../assets/images/skin/golden/2.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }
        }
        .guess-like{
            margin: 0 .3rem;
            .no-more{
                text-align: center;
                .rem(font-size,24);
                
                padding: .2rem 0;
            }
            .guess-like-title{
                h3{
                    .rem(font-size,32);
                    position: relative;
                    .rem(padding-left,15);
                    &:before{
                        position: absolute;
                        content: '';
                        .rem(height,30);
                        .rem(width,4);
                        border-radius: 20px;
                        background: #ff3333;
                        left: 0;
                        top:.08rem;
                    }
                }
                span{
                    color: #666;
                    padding-top: .1rem;
                    .rem(font-size,24);
                }
            }
            .guess-like-all{
                /*padding: 0 .3rem;*/
                padding-bottom: 20px;
                >li{
                    display: -webkit-box;
                    box-align: center;
                    .rem(margin-top,20);
                    .like-img{
                        .rem(width,240px);
                        .rem(height,140px);
                        background: #eee;
                        .rem(border-radius,6);
                        overflow: hidden;
                    }
                    .like-msg{
                        box-flex: 1;
                        flex: 1;
                        .rem(margin-left,20);
                        >p{
                            
                            .rem(font-size,18);
                        }
                        .like-title{
                            .rem(font-size,24);
                            color: #445779;
                            .rem(line-height,30);
                        }
                        .play-tag{
                            .rem(font-size,18);
                            
                            padding: .2rem 0 .2rem 0;
                            >i{
                                border:1px solid rgba(153,153,153,1);
                                border-radius:3px;
                                padding: .01rem .1rem;
                                margin-left: .1rem;
                            }
                        }
                        .play-icon{
                            display: inline-block;
                            .rem(width,20);
                            .rem(height,20);
                            background: url("../../assets/images/video/play_icon.png") no-repeat;
                            background-size: contain;
                            margin-right: .1rem;
                            vertical-align: middle;
                        }
                    }
                }
            }
            &.guess-like-golden{
                color:#cecece;
                .guess-like-title{
                    h3{
                        &::before{
                            background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%);
                        }
                    }
                    span{
                        color:#cecece; 
                    }
                    
                }
                .guess-like-all{
                    .like-title{
                        color:#cecece !important; 
                    }
                    .play-tag{
                        >i{
                            background: #464B53;
                            border: 1px solid #8799CE !important;
                        }
                    }
                }
                
            }
        }
    }
    // 播放器按钮
    .vjs-big-play-centered {
        margin:  0 auto;
    }
    .video-js .vjs-mouse-display:after, .video-js .vjs-play-progress:after, .video-js .vjs-time-tooltip{
        content: ''!important;
    }
</style>