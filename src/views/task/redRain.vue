<template>
    <div class="red-rain" v-show="showBig">
        <div class="close-red" style="width: 0.6rem;
    position: absolute;
    right: 0.3rem;
    top: 0.2rem;z-index: 111;" @click="closeHb">
            <img src="../../assets/images/newTask/remove.png" alt="" srcset="">
        </div>
<!--    <div class="red-rain">-->
    <div>
        <img src="../../assets/images/newTask/light.png" alt=""srcset="">
    </div>
        <div class="ser_home" v-if="showRrain">
            <ul class="red_packet" id="red_packet">
                <template v-for="(item, index) in liParams">
<!--                    <li :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"-->
<!--                        :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">-->
                    <li :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                        :class="item.cls" :data-index="index" >
                        <a href='javascript:;'>
                            <i :style="{ transform: item.transforms, webkitTransform: item.transforms}" @click="showR">
                                <img src="../../assets/images/newTask/hb_icon.png" alt="" srcset="">
                            </i>
                        </a>
                    </li>
                </template>
            </ul>
        </div>
        <div class="djs-rain" v-if="djsNum>0">
            <div class="djs-text">
                <img src="../../assets/images/newTask/hb_title.png"   alt="" srcset="" style="width:50%">
                <p>{{djsNum}} S</p>
            </div>
            <div>
                <img src="../../assets/images/newTask/djs_hb.png" alt=""  srcset="">
            </div>
        </div>
<!--        领取大红包-->

        <!-- <div class="red-pack" v-if="showRed">
            <div class="red-pack-content">
                <img src="../../assets/images/newTask/lqred-min.png" alt="">
                <div class="red-pack-mess">
                    <h4>恭喜发财</h4>
                    <span>{{count}}元</span>
                    <p>{{$store.state.username}}获得{{count}}元红包</p>
                </div>
                <div class="remove-btn" @click="showRed=false;showBig=false"></div>
            </div>
            <div class="guang-box">
                <div class="g-item"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item1"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item2"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item3"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item4"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item5"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item6"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item7"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item8"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item9"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item10"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item11"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item12"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item13"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item14"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item15"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item16"><img src="../../assets/images/newTask/guang.png" alt=""></div>
                <div class="g-item g-item17"><img src="../../assets/images/newTask/guang.png" alt=""></div>
            </div>
        </div> -->
        <div class="hb-outcome" v-if="showRed">
            <div class="hb-num">
                 <p v-if="count">{{count}}</p>
                <img src="../../assets/images/newTask/hb_text3.png" v-else alt="" srcset="">
            </div>
            <div class="hb-btn" v-if="count" @click="drawHb">
                <div>
                   <img src="../../assets/images/newTask/hb_text1.png" alt="" srcset="">
                </div>
            </div>
             <div class="hb-btn" v-else @click="showRrain=true;showRed=false">
                <div>
                   <img src="../../assets/images/newTask/hb_text2.png" alt="" srcset="">
                </div>
            </div>
            <div class="guang-box" v-if="count">
               
            </div>
        </div>
    </div>
</template>
<!--username-->
<script>
    import { mapState, mapMutations } from "vuex";
    export default {
        name: "redRain",
        data(){
            return{
                showBig:true,
                showRrain:false,
                showRed:false,
                liParams: [],
                timer: null,
                timer2: null,
                count:'',
                duration: 1000*60*24, // 定义时间
                djsNum:5,

            }
        },
        mounted () {
            this.startRedPacket();
            this.checkRed();
            this.timer2=setInterval (()=>{
                if(this.djsNum==0){
                    this.showRrain=true
                    clearInterval(this.timer2)
                }else{
                    this.djsNum=this.djsNum-1
                }
                
            },1000)
        },
        created(){

        },
        watch:{
            $route:function () {
                this.checkRed();
            }
        },
        computed: {
            ...mapState([
                "isClickRain"
            ])
        },
        methods:{
            ...mapMutations([
                "SETRAIN",
            ]),
            /**
             * 开启动画
             */
            closeHb(){
                this.$emit('update:showHbValue',false)
            },
            startRedPacket() {
                let win = document.documentElement.clientWidth || document.body.clientWidth
                let left = parseInt(Math.random() * (win - 50) + 0);

                let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; // 旋转角度
                let scales = (Math.random() * (10 - 6 + 1) + 6) * 0.1; // 图片尺寸
                let durTime = (Math.random() * (3.5 - 2.2 + 2) + 3.2) + 's'; // 时间 1.2和1.2这个数值保持一样
                // console.log(durTime)
                // rotate('+ rotate +')
                this.liParams.push({left: left+'px', cls:Math.round(Math.random())?'move_1':'move_2', transforms: ' scale('+ scales +')' , durTime: durTime})


                setTimeout( () => { // 多少时间结束
                    clearTimeout(this.timer)
                    return;
                }, this.duration)


                this.timer = setTimeout( () => {
                    this.startRedPacket()
                },500)
            },
            /**
             * 回收dom节点
             */
            removeDom (e) {
                let target = e.currentTarget;
                document.querySelector('#red_packet').removeChild(target)
            },
            showR(){
                this.getHb();
                this.showRrain= false;
                clearTimeout(this.timer);
            },
            async checkRed(){
                // if(!this.$store.state.codeToken&&this.$store.state.userinfo.user_id<0) return
                // if(this.isClickRain) return;
                let res = await this.$http.get(this.versionLive2+'/user/is_red_rain/');
                if(res && res.data.code==1){
                    // this.showRrain = true;
                    this.showBig = true;
                }else if(res && res.data.code==0){
                    this.SETRAIN(true)
                }else{
                    localStorage.setItem('showRain',false)
                }
            },
            async getHb(){
                this.$vux.loading.show({text:'领取中...'});
                let res = await this.$http.post(this.versionLive2+'/user/user_red_rain/',{},{timeout:60000});
                this.$vux.loading.hide();
                this.SETRAIN(true)
                if(res && res.data.code==1){
                    this.showRed = true;
                    this.count = res.data.data.amount;
                    this.$emit('update:showHbdjs',false)
                }else if(res&& res.data.code!=1){
                    // this.showBig = false;
                     this.$emit('update:showHbValue',false)
                    //失败了
                    this.$vux.confirm.show({
                        title:'提示',
                        content:res.data.msg,
                        showCancelButton:false,
                        onConfirm : () => {
                        }
                    });
                }else{
                    // this.showBig = false;
                     this.$emit('update:showHbValue',false)
                }
                this.showRrain=false
            },
            drawHb(){
                 this.$emit('update:showHbValue',false);
                this.$vux.toast.text('领取成功', 'middle');
            }
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
.red-rain{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 750px;
   background: url('../../assets/images/newTask/hb_bg.png') no-repeat;background-size: contain;
    z-index: 100;
}
.djs-rain{margin-top: -3rem;text-align: center;
.djs-text{
    padding-bottom: 3rem;
    p{font-size: 0.58rem;color: #fffae5;font-weight: bold;}
}
}
.hb-outcome{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    padding-top: 42%;
     background: rgba(0,0,0,.5);
     .guang-box{
         width: 8rem;
         height:8rem ;
        background: url('../../assets/images/newTask/shining-min.png') no-repeat;background-size: 100% 100%;
        position: absolute;
        top: 2rem;
        left: 1rem;
        animation: xz 4s linear  infinite;
    }
    .hb-num{
         margin: 0 auto;
    .rem(width,440);
    .rem(height, 584);
    background: url('../../assets/images/newTask/hb_bg2.png') no-repeat;background-size: 100% 100%;
    text-align: center;
    position: relative;
    z-index: 9;
    img{
        width: 44%;
    margin-top: 0.6rem;
    }
     p{
        font-size: 1.2rem;
        font-weight: bold;
        transform: rotateZ(2deg);
        padding-top: 0.65rem;
         background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow); 
        -webkit-background-clip:text; 
        -webkit-text-fill-color:transparent; 
    }
    }
   
    .hb-btn{
    margin: 0 auto;
    margin-top: 1rem;
    .rem(width,525);
    .rem(height, 128);
    background: url('../../assets/images/newTask/hb_btn.png') no-repeat;background-size: 100% 100%;
    line-height: 1.7rem;
    text-align: center;
    font-size: 0.5rem;
    font-weight: bold;
    img{
        width: 38%
    }
    }
}
.red-pack{
    .rem(width,750);
    position: absolute;
    top:0;
    left: 50%;
    transform: translateX(-50%);
    

    .red-pack-content{
        animation:sf .3s;
        animation-fill-mode :forwards;
        position: relative;
        z-index: 101;
    }
    .red-pack-mess{
        margin-top: -3.5rem;
        text-align: center;
        color: #fff;
        h4{
            .rem(font-size,30);
        }
        span{
            display: inline-block;
            .rem(font-size,48);
            font-weight: bold;
            color: #EFC721;
            margin: .2rem 0 .4rem 0;
        }
        p{
            .rem(font-size,24);
        }
    }
    .remove-btn{
        width: 0.58rem;
        height: 0.58rem;
        background: url('../../assets/images/chat/11_03.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: -2.5rem;
        left: 46%;
    }
}
@keyframes sf {
        from{
            transform:scale(0)
        }to{
            transform:scale(1)
        }
    }


    .ser_home {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,.5);
        top:0;
        left: 0;
        z-index: 100;
    }
    .red_packet {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        i {
            .rem(width,126);
            .rem(height,62);
            display: block;
            img{
                width: 100%;
                position: absolute;
                z-index: 99;
            }
            // background: url('../../assets/images/newTask/hb_icon.png') no-repeat;
            // background-size: contain;
            position: relative;
            z-index: 99;
            &:before{
                content: '';
                display: block;
                .rem(width,53);
                .rem(height,34);
                background: url('../../assets/images/newTask/hongbao_left.png') no-repeat; background-size: contain;
                position: absolute;
                left: -0.6rem;
                top: 0.5rem;
                z-index: 9;
                 animation: hbcb2 .4s linear alternate infinite;
            }
             &:after{
                content: '';
                display: block;
                .rem(width,53);
                .rem(height,34);
                background: url('../../assets/images/newTask/hongbao_right.png') no-repeat; background-size: contain;
                position: absolute;
                right: -0.6rem;
                top: 0.5rem;
                z-index: 9;
                animation: hbcb .4s linear alternate infinite;
            }
        }
        li {
            position: absolute;
            animation: all 3s linear;
            top:-100px;
            z-index: 10;
            &.move_1 {
                -webkit-animation: aim_move 8s linear 1 forwards;
                animation: aim_move 8s linear 1 forwards;
            }
            &.move_2 {
                -webkit-animation: aim_move2 8s linear 1 forwards;
                animation: aim_move2 8s linear 1 forwards;
            }
        }
        a {
            display: block;
        }
    }


    @keyframes aim_move {
        0% {
            -webkit-transform: translateY(0) translateX(0);
            transform: translateY(0) translateX(0);
        }
        25% {
           -webkit-transform: translateY(30vh) translateX(10vh);
            transform: translateY(30vh) translateX(10vh);
        }
        50% {
           -webkit-transform: translateY(60vh) translateX(0vh);
            transform: translateY(60vh) translateX(0vh);
        }
         75% {
           -webkit-transform: translateY(90vh) translateX(-10vh);
            transform: translateY(90vh) translateX(-10vh);
        }
        100% {
            -webkit-transform: translateY(120vh) translateX(0);
            transform: translateY(120vh) translateX(0);
        }
    }
    @keyframes aim_move2 {
        0% {
            -webkit-transform: translateY(0) translateX(0);
            transform: translateY(0) translateX(0);
        }
        25% {
           -webkit-transform: translateY(30vh) translateX(-10vh);
            transform: translateY(30vh) translateX(-10vh);
        }
        50% {
           -webkit-transform: translateY(60vh) translateX(0vh);
            transform: translateY(60vh) translateX(0vh);
        }
         75% {
           -webkit-transform: translateY(90vh) translateX(10vh);
            transform: translateY(90vh) translateX(10vh);
        }
        100% {
            -webkit-transform: translateY(120vh) translateX(0);
            transform: translateY(120vh) translateX(0);
        }
    }
    @keyframes xz {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes hbcb {
        0% {
           
            transform: rotate(-20deg);
        }
        100% {
          
            transform: rotate(10deg) 
        }
    }
    @keyframes hbcb2 {
        0% {
           
            transform: rotate(20deg) 
        }
        100% {
            transform: rotate(-10deg);
           
        }
    }

</style>