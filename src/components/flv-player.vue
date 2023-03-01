<template>
    <!--    <video class="flv-player"-->
    <!--            name="videoElement" id="videoElement"  :style="{background:'url('+imgSrc.avatar+')'}"></video>-->
    <div class="cpb-video" >

        <!--    <div class="bg-avatar" >-->
        <!--        <img :src="imgSrc.avatar" alt="">-->
        <!--    </div>-->
        <!--       <i class="play" v-if="showVideo==1"   @click="play"></i>-->

        <!--        <div class="flvplayer-app" ></div>-->
        <div id="mse"></div>
        <div class="control-box" v-if="showControl">
        </div>
    </div>

</template>

<script type="text/ecmascript-6">

    import FlvPlayer from  'xgplayer-flv.js'
    // import '../../static/js/danmu'
    export default {
        name: 'flv-player',
        data() {
            return {
                showVideo:1,
                flv:null,
                player:null,
                danmu:null,
                isQ:false,
                showControl:false,
                httpnum:0
            }
        },
        props: {
            imgSrc:Object,
            src:String,
            chatData:Array,
            pushDanmu:Object,
        },


        created: function () {
        },
        mounted: function () {

            // let dom  =  document.querySelector('.cpb-video');
            // let html = '<div id="mse" ></div>';
            // dom.innerHTML = html;

            if(!this.player){
                this.player = new FlvPlayer({
                    id: 'mse',
                    url: this.src,
                    // url: '232323',
                    containerStyle: {
                        zIndex: 100
                    },
                    // url: [{src: '/video/flv/xgplayer-demo-720p.flv', type: 'video/flv'}, {src: '/video/flv/xgplayer-demo-480p.flv', type: 'video/flv'}, {src: '/video/flv/xgplayer-demo-360p.flv', type: 'video/flv'}],
                    playsinline: true,
                    // height: '5.8rem',
                    // width: window.innerWidth,
                    fluid: true,
                    isLive:true,
                    cors:true,
                    poster:this.imgSrc.cover?this.imgSrc.cover:this.imgSrc.avatar,
                    // controls:true,
                    closeVideoClick:true,
                    closeVideoTouch:true,
                    crossOrigin:false,
                    'x5-video-player-type':'h5',
                    rotate: {
                        clockwise: true,
                        innerRotate: true,
                    },
                    lang:'zh-cn'

                    // autoplay:true,
                    // danmu:{
                    //     comments: [
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 0,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[0].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 1,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[1].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 2,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[2].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 3,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[3].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 4,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[4].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 5,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[5].text),
                    //         //         mode: 'top'
                    //         //     },  {
                    //         //         duration: 15000,
                    //         //         id: 6,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[6].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 7,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[7].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 8,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[8].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 9,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[9].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 10,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[10].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 11,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[11].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 12,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[12].text),
                    //         //         mode: 'top'
                    //         //     }
                    //         //     ,  {
                    //         //         duration: 15000,
                    //         //         id: 13,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[13].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 14,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[14].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 15,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[15].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 16,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[16].text),
                    //         //         mode: 'top'
                    //         //     }
                    //         //     ,  {
                    //         //         duration: 15000,
                    //         //         id: 17,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[17].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //     {
                    //         //         duration: 15000,
                    //         //         id: 18,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[18].text),
                    //         //         mode: 'top'
                    //         //     }
                    //         //     ,  {
                    //         //         duration: 15000,
                    //         //         id: 19,
                    //         //         start: 500,
                    //         //         el: this.parseDom(this.chatData[19].text),
                    //         //         mode: 'top'
                    //         //     },
                    //         //
                    //     ],
                    //     "area": {
                    //         "start": 1/4,
                    //         "end": 3/4
                    //     },
                    //     "closeDefaultBtn": false,
                    //     "panel": false
                    // }
                });
            }

            // console.log(danmu);
            this.player.on('play',()=> {
                if(this.httpnum==0){
                    this.httpnum=this.httpnum+1
                    this.$parent.playHistory()
                }
                
                let dom =  document.querySelector('.xgplayer-controls');
                let num=659
                if(dom.childNodes[0].className!='refresh') {
                    let span1 = document.createElement('span');
                    let span2 = document.createElement('span');
                    let span3 = document.createElement('span');
                    let span4 = document.createElement('span');
                    let span5 = document.createElement('span');
                    span5.classList.add('zhuBoName')
                    span4.classList.add('zbuserId')
                    span3.classList.add('onlineNum')
                    span5.innerHTML= this.imgSrc.nickname;
                    span3.innerHTML='在线人数 '+this.imgSrc.online;
                    span4.innerHTML='房间ID '+this.imgSrc.anchor_id
                    span1.classList.add('refresh');
                    span2.classList.add('barrage');
                    span1.addEventListener('click', () => {
                        this.player.src = this.src;
                        console.log(this.$parent.socket.readyState);
                        // if(this.$parent.socket.readyState==3){
                        //     this.$parent.socket = new WebSocket(this.$parent.path);
                        // }
                    });
                    // dom.insertBefore(span1,dom.childNodes[0]);
                    dom.insertBefore(span1, dom.childNodes[0]);
                    dom.appendChild(span3)
                    dom.appendChild(span4)
                    dom.appendChild(span5)
                    // dom.insertBefore(span2, dom.childNodes[1]);
                }
                  this.isQ = true;
                   this.showControl = true;
                // setTimeout(()=> {
                //     let len = this.chatData.length;
                //     for(let i=0;i<len;i++) {
                //         // console.log(this.chatData[i]);
                //         // if(this.chatData[i].text.indexOf('img')>-1){
                //             this.player.danmu.sendComment({
                //                 duration: 10000,
                //                 id:i+1,
                //                 start: 500,
                //                 el: this.parseDom(this.chatData[i].text),
                //                 mode: "scroll",
                //                 // txt: $this.chatData[i].text,
                //             })
                //         // }else{
                //         //     console.log(22);
                //         //     this.player.danmu.sendComment({
                //         //         duration: 10000,
                //         //         id:i+1,
                //         //         start: 500,
                //         //         txt: this.chatData[i].text,
                //         //         mode: "scroll",
                //         //         style:{
                //         //             color:'#ff9500',
                //         //             fontSize:'.38rem'
                //         //         }
                //         //         // txt: $this.chatData[i].text,
                //         //     })
                //         // }
                //
                //     }
                // },500)
                // player.emit('resourceReady', [{ name: '超清', url: '/video/flv/xgplayer-demo-720p.flv' }, { name: '高清', url: '/video/flv/xgplayer-demo-480p.flv' }, { name: '标清', url: '/video/flv/xgplayer-demo-360p.flv' }]);
            });
            this.player.on('error',()=>{
                document.querySelector('.xgplayer-error-refresh').addEventListener('touchstart',()=>{
                    this.player.reload();
                })

            });
            this.player.on('requestFullscreen',()=> {
                this.$parent.childQ = true;
                // alert(this.player.rotateDeg);
                setTimeout(()=>{
                      let dom =  document.querySelector('.cpb-video video');
                    if(dom.offsetWidth<768){
                      if(!window.android){
                        this.player.rotate(true, true, 1);
                        this.isQ = true;
                        let dom =  document.querySelector('.xgplayer-controls');
                        dom.style.bottom = '47%';
                        dom.style.width = '170%';
                        dom.style.left = '-80%';
                        dom.style.transform = 'rotate(90deg)';
                      }

                    }else{
                        this.isQ = false;
                    }

                     },50)
                    });

             this.player.on('exitFullscreen',()=> {
                            let u = navigator.appVersion;
                            let qq = u.split('MQQBrowser/').length > 1 ? 2 : 0;
                            if(qq){
                                return;
                            }

                           if(this.isQ){
                             if(!window.android) {
                               this.player.rotate(true, true, 3);
                               let dom =  document.querySelector('.xgplayer-controls');
                               dom.style.bottom = '0';
                               dom.style.width = 'auto';
                               dom.style.left = '0';
                               dom.style.transform = '';
                             }

                           }else{
                               this.isQ =false;
                           }


                        });

             this.player.on('playing',()=>{
                 
                 setTimeout(()=>{
                     this.showControl = false;
                 },3000)
                 // let dom  =  document.querySelector('.cpb-video video');
                 // dom.style.display = 'block';
             })

            // 监听resize方法
            window.addEventListener("resize", this.renderResize, false)
        },
        methods: {
            renderResize() {
                // 判断横竖屏
                let width = document.documentElement.clientWidth;
                let height = document.documentElement.clientHeight;
                if (width > height) {
                    if(this.isQ){
                        if(!this.player.fullscreen){
                            // setTimeout(()=>{
                            // let dom = document.querySelector('.xgplayer-icon>.xgplayer-icon-requestfull');
                            // if(dom){
                            //     dom.click();
                            // }
                            //   this.player.rotate(true, true, 1);
                            // this.player.getFullscreen(this.player.root);
                            // },500)
                        }else{
                        }

                    }
                }else {
                    if(!this.isQ){
                        this.$emit('watchChild');
                        if(this.player.fullscreen){
                            // this.player.exitFullscreen(this.player.root);
                            // this.player.rotate(true, true, 3);
                        }

                    }

                }
            },
            play(){
                this.flv.play();
                this.showVideo = 2;
                // this.$parent.palyLive()
            },
            parseDom(arg) {
                console.log(arg)
                let  objE = document.createElement("div");
                objE.innerHTML = '<div>'+arg+'</div>';
                objE.innerHTML = arg;
                objE.style.color = '#ff9500';
                objE.style.fontSize = '.38rem';
                // console.log(objE);
                return objE;

            },

        },
        watch:{
            pushDanmu:function (n) {

                // if(!this.danmu){
                //     this.danmu = new window.DanmuJs({
                //         container: document.querySelector('.xgplayer-danmu'),
                //         comments: [
                //         ],
                //         area: {
                //             start: 0,
                //             end: 1
                //         },
                //         defaultOff: true //开启此项后弹幕不会初始化，默认初始化弹幕
                //     });
                // }
                // if(this.player.danmu){
                //     console.log(this.pushDanmu);
                // console.log(this.player.danmu.sendComment);
                // let id = new Date().getTime();
                // this.player.danmu.sendComment({  //发送弹幕
                //          duration:10000,
                //          id:id,
                //          start: 10,
                //          el: this.parseDom(this.pushDanmu.text),
                //      });
                // this.player.danmu.play();
                // setTimeout(()=>{
                //     console.log(this.danmu);
                //     console.log(id);
                //     this.danmu.setCommentDuration(id, 0)
                // },10000)
                // this.player.danmu.pause()

                // }

            },
            chatData:function (n) {
            },

        },
        destroyed() {
            this.player.destroy()
        }
    }

</script>

<style >
    .xgplayer-skin-default video{
        /*width: 100%!important;*/
    }
    .xgplayer-skin-default .xgplayer-enter{
        z-index: 100!important;
    }
    .xgplayer-skin-default{
        background: none!important;
    }
    .danmu-switch{
        display: block!important;
    }
    .video-container video{
        margin-top: 3rem;
        width: 157%;
    }
    .cpb-video{
        position: relative;
    }
    .cpb-video video{
        /*display: none;*/
    }
    .cpb-video .play{
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -.8rem;
        margin-top: -.8rem;
        background: url("../assets/images/chat/TV-Play.png")no-repeat;
        background-size: 100%;
        z-index: 11;
    }
    .cpb-video .control-box{
        position: absolute;
        /*background: #000;*/
        width: 100%;
        /*height: 1rem;*/
        bottom: 0;
        z-index: 1;
        display: flex;
        padding: .1rem;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.37),rgba(0,0,0,.75),rgba(0,0,0,.75));

    }
    .cpb-video .xgplayer-controls{
        display: flex;
        align-items: center;
    }
    .cpb-video .xgplayer-controls>span{
        display: inline-block!important;
        margin: 0 .2rem;
        width: .45rem;
        height: .45rem;
    }
    .cpb-video .xgplayer-controls .play{
        background: url("../assets/images/chat/zanting@2x.png")no-repeat;
        background-size: 100%;
    }
    .cpb-video .xgplayer-controls .refresh{
        background: url("../assets/images/chat/shuaxin@2x.png")no-repeat;
        background-size: 100%;
    }
    .cpb-video .xgplayer-controls .onlineNum{
       color: #fff;
       width: auto;
       margin-top: 0.1rem;
       font-size: 0.32rem;
    }
    .cpb-video .xgplayer-controls .zbuserId{
       color: #fff;
       width: auto;
       margin-top: 0.1rem;
        font-size: 0.32rem;
    }
    .cpb-video .xgplayer-controls .zhuBoName{
       color: #fff;
       width: auto;
       margin-top: 0rem;
       font-size: 0.32rem;
       position: relative;
       top: -0.5rem;
       left: -4.9rem;
    }
    .cpb-video .xgplayer-controls .barrage{
        background: url("../assets/images/chat/danmu@2x.png")no-repeat;
        background-size: 100%;
    }
    .cpb-video .xgplayer-controls .xgplayer-fullscreen{
        width: .45rem;
        height: .45rem;
        position: absolute;
        right: .2rem;
        background: url("../assets/images/chat/quanping@2x.png")no-repeat;
        background-size: 100%;
    }
    .cpb-video .xgplayer-controls .xgplayer-fullscreen svg{
        display: none;
    }
    .cpb-video .bg-avatar{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 11;
    }
    .cpb-video .bg-avatar>img{
        width: 100%;
        height: 100%;
    }
    .xgplayer-placeholder,.xgplayer-live,.xgplayer-volume{
        display: none!important;
    }
    /*.flvplayer-container .flvplayer-player .flvplayer-canvas{*/
    /*    background-color:  none !important;*/
    /*}*/
</style>
