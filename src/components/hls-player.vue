<template>
    <!--    <div class="player-container">-->
    <!--        <video-player class="vjs-custom-skin  vjs-big-play-centered" :options="playerOptions"></video-player>-->
    <!--    </div>-->
<!--    <div class="cpb-video hls" :style="{background:'url('+imgSrc.avatar+')no-repeat'}">-->
    <div class="cpb-video hls" >
<!--        <div id="mse"></div>-->
<!--        x5-playsinline="" playsinline="" webkit-playsinline=""-->
<!--        <video id="my-video" playsinline="" webkit-playsinline=""  class="video-js vjs-default-skin vjs-big-play-centered"  preload="auto" >-->
<!--            <source :src="src" type="application/x-mpegURL">-->
<!--        </video>-->
<!--      <video-player  ref="videoPlayer" class="vjs-custom-skin big-play-centered" :options="playerOptions" x5-playsinline=true playsinline=true webkit-playsinline=true></video-player>-->
<!--        <video width="640" height="360"-->
<!--               autoplay controls autobuffer-->
<!--               src="http://demo.srs.com/live/livestream.m3u8"-->
<!--               type="application/vndk.apple.mpegurl">-->
<!--        </video>-->
<!--        <div class="container">-->
<!--            <div class="flvplayer-app"></div>-->
<!--        </div>-->
        <!--        <video :poster="imgSrc.avatar" class="tvhou" width="100%" height="100%"-->
        <video :style="{background:'url('+cover+')no-repeat'}"  class="tvhou" width="100%" height="100%"  id="iosVideo"
               controls="controls" autoplay="autoplay"
               x-webkit-airplay="true" x5-video-player-fullscreen="true"
               preload="auto" x5-playsinline="" playsinline="" webkit-playsinline=""
               x5-video-player-typ="h5 ">
            <source type="application/x-mpegURL" :src="src">
        </video>
    
    </div>
</template>

<script>
    // import { videoPlayer } from 'vue-video-player';
    // import  'video.js/dist/video-js.css';
    // import 'vue-video-player/src/custom-theme.css'
    // import   'videojs-contrib-hls'

//    import   HlsPlayer  from  'xgplayer-hls.js'

    // import   HlsPlayer  from  'xgplayer-hls.js'

    // import 'video.js/dist/video-js.css'
    // import videojs from 'video.js'
    // import 'videojs-contrib-hls'
    // import { videoPlayer }  from 'vue-video-player'
    // import 'video.js/dist/video-js.css'
    // import 'vue-video-player/src/custom-theme.css'
    // import 'videojs-contrib-hls.js/src/videojs.hlsjs';

    // import 'videojs-contrib-hls'
    //引入hls.js
    // import  'videojs-contrib-hls.js/src/videojs.hlsjs'
    // import '../../static/flv/flvplayer-control.css'
    // import '../../static/flv/flvplayer-control.js'
    // import   '../../static/flv/flvplayer.js';



    export default {
        name: "hls-player",
        data:function () {
            return {
                // playerOptions: {
                //     // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                //     autoplay: false, //如果true,浏览器准备好时开始回放。
                //     controls: true, //控制条
                //     preload: 'auto', //视频预加载
                //     muted: false, //默认情况下将会消除任何音频。
                //     loop: false, //导致视频一结束就重新开始。
                //     language: 'zh-CN',
                //     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                //     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                //     closeVideoClick:true,
                //     closeVideoTouch:true,
                //     live: true,
                //     sources: [{
                //         type: 'application/x-mpegURL',
                //         src:this.src
                //         // src: 'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8'
                //     }],
                //     controlBar: {
                //         timeDivider: false,
                //         durationDisplay: false,
                //         remainingTimeDisplay: false,
                //         fullscreenToggle: true  //全屏按钮
                //     },
                //     poster: this.imgSrc.avatar, //你的封面地址
                //     width: document.documentElement.clientWidth,
                //     notSupportedMessage: '直播加载失败，请刷新重试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                // },
                // playerOptions: {
                //     playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                //     autoplay: false, //如果true,浏览器准备好时开始回放。
                //     controls: false, //控制条
                //     preload: 'auto', //视频预加载
                //     muted: false, //默认情况下将会消除任何音频。
                //     loop: false, //导致视频一结束就重新开始。
                //     language: 'zh-CN',
                //     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                //     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                //     sources: [{
                //         type: 'application/x-mpegURL',
                //         src: 'http://47.244.212.147:8080/live/daa28096f9e8879ab3a02b90aa0e2f83/playlist.m3u8'
                //     }],
                //     poster: "", //你的封面地址
                //     width: document.documentElement.clientWidth,
                //     notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                // }
                player: null,
                cover:null,
                videoSetInterval:null
            }
        },
        props:{
            src:String,
            imgSrc:Object,
            // chatData:Array,
        },
        created(){
            this.cover = this.imgSrc.cover?this.imgSrc.cover:this.imgSrc.avatar;
            // console.log(this.imgSrc,'222');
            // this.playerOptions.poster = this.imgSrc.avatar;
            // this.playerOptions.sources[0].src = this.src;
            // console.log(this.playerOptions.sources[0].src);
        },
        mounted(){
            //
            // if (FlvPlayer.isSupported()) {
            //     var flv = new FlvPlayer({
            //         container: '.flvplayer-app',
            //         // url: 'http://47.244.212.147:8080/live/e2a6a1ace352668000aed191a817d143/playlist.m3u8',
            //         url:'https://www.liveflowcpb.com/live/e2a6a1ace352668000aed191a817d143.flv',
            //         poster: this.imgSrc.avatar,
            //         decoder: 'flvplayer-decoder-multiple.js',
            //         debug: true,
            //         live: true,
            //         muted: true,
            //         cors: true,
            //         autoPlay: true,
            //         hasAudio: true,
            //         videoChunk: 1024 * 1024,
            //         audioChunk: 16 * 1024,
            //         width: 960,
            //         height: 540,
            //     });
            // } else {
            //     console.warn('Your browser does not support Flvplayer.js');
            // }

          // this.player = videojs('my-video', {
          //       bigPlayButton: true,
          //       textTrackDisplay: false,
          //       // posterImage: true,
          //       errorDisplay: true,
          //       controls:false,
          //       controlBar: false,
          //       autoDisable: true,
          //       fluid:true,
          //       width: document.documentElement.clientWidth,
          //       notSupportedMessage: '此视频暂无法播放，请稍后再试'
          //   }, function () {
          //       // this.play()
          //
          //   });

            // dom.style.display='none';
            // console.log(videojs);
           //  this.player =  new  HlsPlayer({
           //      id: 'mse',
           //      // url:this.src,
           //      url:'/live/daa28096f9e8879ab3a02b90aa0e2f83/playlist.m3u8',
           //      // url:'http://s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
           //      playsinline: true,
           //      // height: '5.8rem',
           //      // width: window.innerWidth,
           //      fluid: true,
           //      poster:this.imgSrc.avatar,
           //      cors:true,
           //      isLive:true,
           //      // "x5-video-player-type": "h5",
           //      // "x5-video-player-fullscreen": "false",
           //      // "x5-video-orientation": "portraint",
           //     closeVideoClick:true,
           //     closeVideoTouch:true,
           //      // controls:true,
           //     rotate: {
           //         clockwise: true,
           //         innerRotate: true,
           //     },
           //      // danmu: {
           //      //     comments: [
           //      //         {
           //      //             duration: 15000,
           //      //             id: 0,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[0].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 1,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[1].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 2,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[2].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 3,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[3].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 4,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[4].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 5,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[5].text),
           //      //         },  {
           //      //             duration: 15000,
           //      //             id: 6,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[6].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 7,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[7].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 8,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[8].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 9,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[9].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 10,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[10].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 11,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[11].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 12,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[12].text),
           //      //         }
           //      //         ,  {
           //      //             duration: 15000,
           //      //             id: 13,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[13].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 14,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[14].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 15,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[15].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 16,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[16].text),
           //      //         }
           //      //         ,  {
           //      //             duration: 15000,
           //      //             id: 17,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[17].text),
           //      //         },
           //      //         {
           //      //             duration: 15000,
           //      //             id: 18,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[18].text),
           //      //         }
           //      //         ,  {
           //      //             duration: 15000,
           //      //             id: 19,
           //      //             start: 500,
           //      //             el: this.parseDom(this.chatData[19].text),
           //      //         }
           //      //
           //      //     ],
           //      //     "area": {
           //      //         "start": 0/ 4,
           //      //         "end": 4 / 4
           //      //     },
           //      //     "closeDefaultBtn": false,
           //      //     "defaultOff": false,
           //      //     "panel": true
           //      // }
           //  });
           // this.player.on('play',()=> {
           //      let liveTextDom =  document.querySelectorAll('.xgplayer-live');
           //      if(liveTextDom[1]){
           //         liveTextDom[1].style.display = 'none';
           //      }
           // //
           // //     //     setTimeout(()=> {
           // //  //         for(let i=10;i<=19;i++) {
           // //  //             player.danmu.sendComment({  //发送弹幕
           // //  //                 duration: 15000,
           // //  //                 id: i,
           // //  //                 start: 500,
           // //  //                 el: this.parseDom(this.chatData[i].text),
           // //  //             })
           // //  //         }
           // //  //     },2000)
           // //  //     // player.emit('resourceReady', [{ name: '超清', url: '/video/flv/xgplayer-demo-720p.flv' }, { name: '高清', url: '/video/flv/xgplayer-demo-480p.flv' }, { name: '标清', url: '/video/flv/xgplayer-demo-360p.flv' }]);
           // //  //
           //  });
           //
           //  this.player.on('requestFullscreen',()=> {
           //      setTimeout(()=>{
           //          let dom =  document.querySelector('.xgplayer-controls');
           //          dom.style.bottom = '47%';
           //          dom.style.width = '175%';
           //          dom.style.left = '-83%';
           //          dom.style.transform = 'rotate(90deg)';
           //          this.player.rotate(true, true, 1);
           //      },50)
           //  });
           //
           //  this.player.on('exitFullscreen',()=> {
           //      let dom =  document.querySelector('.xgplayer-controls');
           //      dom.style.bottom = '0';
           //      dom.style.width = 'auto';
           //      dom.style.left = '0';
           //      dom.style.transform = '';
           //      this.player.rotate(true, true, 3);
           //  });
           let iosVideo=document.getElementById('iosVideo')
           this.videoSetInterval=setInterval(() => {
              if(!iosVideo.paused){
                  clearInterval( this.videoSetInterval)
                  this.$parent.playHistory()
              }
           },2000);
        },
        methods:{
            parseDom(arg) {
                let objE = document.createElement("div");
                objE.innerHTML = '<div>'+arg+'</div>';
                objE.style.color = '#ff9500';
                objE.style.fontSize = '.38rem';
                return objE;

            },
        },
        destroyed() {
            clearInterval(this.videoSetInterval)
            // console.log(this.$refs);
            // this.$refs.videoPlayer.destroy()
            // console.log(this.player);
            // this.player.dispose();
        },
        computed:{
          // player(){
          //     // return this.$refs.videoPlayer.player
          // }
        },
        components:{
            // videoPlayer
            // videoPlayer
        }

    }
</script>

<style >
   /*.hls .video-js .vjs-big-play-button {*/
   /*    left: 50%!important;*/
   /*    -webkit-transform: translateX(-50%) translateY(-50%)!important;*/
   /*    transform: translateX(-50%) translateY(-50%) !important;*/
   /*    top: 50%!important;*/
   /* }*/
    .cpb-video.hls{
        height: 5.6rem;
        background-size: 100% 100% !important;
    }
   .cpb-video.hls video{
       background-size: 100%!important;
   }
   /*.cpb-video .tvhou::-webkit-media-controls-fullscreen-button {*/
   /*   display: none;*/
   /*}*/

   .cpb-video .tvhou*::--webkit-media-controls-play-button{
       -webkit-appearance: none;
   }


   .cpb-video .flvplayer-app{
       height: 5.8rem;
   }
    .vjs-progress-control,.vjs-remaining-time-display{
        visibility: hidden;
    }
    .hls .video-js{
        background: none ;
    }
    .danmu-switch{
        display: block!important;
    }
    .xgplayer-icon-pause{
        display: none !important;
    }
    .xgplayer-live{
        /*display: none!important;*/
    }
    .vjs-big-play-button{
        top: 67%!important;
        left: 62%!important;
    }
    .vjs-poster{
        width: 100%!important;
        background-size: 100%!important;
    }
</style>