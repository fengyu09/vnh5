<template>
    <div class="dzp-container">
        <div class="remove-dzp" @click="closeToast"></div>
        <!-- 购买次数 -->
        <div class="buy-time" v-if="isBuy">
            <div class="bug-time-content">
                <div class="remove-btn" @click="isBuy=false"></div>
                <p class="buy-tip">购买抽奖次数</p>
                <div class="input-box">
                    <div class="cut-btn" @click="changeTime(0)"></div>
                     <input type="tel" v-model="buyTime" maxlength="9">
                    <div class="add-btn" @click="changeTime(1)"></div>
                </div>
                <div class="total-zs">总计：<i></i>{{buyTime*20}}</div>
                <div class="bug-btn" @click="toBuy">Xác nhận购买</div>
            </div>
        </div>
        <!-- 大转盘 -->

        <div class="container">
            <div class="lucky-wheel">
                <!-- 中奖滚动消息 -->
                <div class="zj-prizeList">
                    <i></i>
                    <marquee scrollAmount="3" scrolldelay="50" direction="left">
                        <span
                                v-for="(v,index) in recordList"
                                :key="index"
                                v-if="recordList.length"
                        >{{v.phone}}&nbsp;&nbsp;&nbsp;抽中&nbsp;&nbsp;&nbsp;{{v.name}}*{{v.number}}</span>
                        <span v-else>暂无中奖记录</span>
                    </marquee>


                </div>
                <div class="wheel-main">
                    <div class="wheel-pointer" @click="beginRotate()"></div>
                    <div class="wheel-bg" :style="rotateStyle">
                    <div class="prize-list">
                        <div
                        class="prize-item"
                        v-for="(item,index) in prizeList"
                        :key="index"
                        :style="item.style"
                        >
                        <div class="prize-pic">
                            <img :src="item.icon" :class="{'wzs':item.name=='钻石','car':item.name=='帝王花车','fhjc':item.name=='凤凰机车','lbjn':item.name=='兰博基尼'}"/>
                        </div>
                        <div class="prize-type" :style="item.name=='谢谢参与'?'padding-top:.4rem':''">{{item.name}}</div>
                        <div class="prize-num"><i v-if="item.name!='钻石'&&item.name!='谢谢参与'">*</i>{{item.number>0?item.number:''}}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- 剩余次数 -->
                <div class="left-time">剩余 <i>{{count}}</i> 次抽奖机会</div>
                <!-- 购买 -->
                <div class="go-buy-btn" @click="isBuy=true">购买抽奖次数</div>
            </div>
            
            <!-- <div class="toast" v-show="prize">
            <div class="toast-container">
                <img :src="toastIcon" class="toast-picture" />
                <div class="close" @click="closeToast()"></div>
                <div class="toast-title">{{toastTitle}}</div>
                <div class="toast-btn">
                <div class="toast-cancel" @click="closeToast">关闭</div>
                </div>
            </div>
            </div>
            <div class="toast-mask" v-show="prize"></div> -->
        </div>

    </div>
</template>

<script>
import {mapState} from "vuex";
const CIRCLE_ANGLE = 360
const config = {
  // 总旋转时间
  duration: 3000,
  // 旋转圈数
  circle: 8,
  mode: 'ease-in-out'
}
    export default {
        name: "dzph",
        data(){
            return{
                isBuy:false,
                buyTime:1,//购买次数

                count: null, // 剩余抽奖次数
                duration: 3000, // 转盘旋转时间
                prizeList: [], // 奖品列表
                rotateAngle: 0, // 旋转角度
                index: 0,
                prize: null,
                prizeObj:{},
                recordList:[],//中奖记录
                isKc:true,
                isLogin:true,
                
            }
        },
        created(){
            // 初始化一些值
            this.angleList = []
            // 是否正在旋转
            this.isRotating = false
            // 基本配置
            this.config = config
            // 获取奖品列表
            this.getGiftList();
            //获取中奖记录
            this.getRecordList();
        },
        computed: {
            rotateStyle () {
            return `
                -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
                transition: transform ${this.config.duration}ms ${this.config.mode};
                -webkit-transform: rotate(${this.rotateAngle}deg);
                    transform: rotate(${this.rotateAngle}deg);`
            },
            ...mapState(["zjArr"])
            
        },
        watch:{
             buyTime: function(n, o) {
                if (n) {
                    this.$nextTick(() => {
                    let i = n.toString();
                
                    this.buyTime = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
                       
                    })
                }
             },
             isBuy:function(){
                 this.$vux.confirm.hide();
             },
            //  zjArr:function(n){
            //     console.log(n);
            //  }
             
        
        },
        methods:{
            //获取中奖记录
            async getRecordList(){
                let res = await this.$http.get(this.versionLive2+'user/turntable_log/',{params:{
                limit:20
            }});
                if(res && res.data.code==1){
                    this.recordList = res.data.data;
                    // console.log(7777,this.recordList)
                }
            },
            toastTitle () {
                let tip='';
                let msg = '';
                if(this.prize.status==1){
                    tip="中奖啦！";
                    msg = "<p style='line-height:.8rem;padding:.3rem 0;color:#333;font-size:.4rem'>恭喜您获得"+this.prize.name+"*"+this.prize.number+"，稍后发放奖品,请耐心等待.</p>";
                }else if(this.prize.status==-1){
                    tip="很遗憾！";
                    msg = "<p style='line-height:.8rem;padding:.3rem 0;color:#333;font-size:.4rem'>此次没有中奖，再接再厉.</p>";
                }
                this.$vux.confirm.show({
                        title:tip,
                        content:msg,
                        showCancelButton:false,
                        confirmText:"知道了",
                        onConfirm : () => {
                        }
                    });
            },
            //获取礼物列表
            async getGiftList(){
                let res = await this.$http.get(this.versionLive2+'user/turntable_list/');
                if(res && res.data.code==1){
                    // this.prizeList = res.data.data;
                    this.prizeList = this.formatPrizeList(res.data.data)
                    this.count = res.data.draws_num;
                }
            },
            changeTime(f){
                 if(f){
                    if(this.buyTime>=999999999){
                        this.buyTime = 999999999;
                        // this.$vux.toast.text('');
                    }
                    else this.buyTime++; 
                 }else{
                     if(this.buyTime<1) this.buyTime=0
                     else this.buyTime--
                 }

            },
            async toBuy(){
                this.$vux.confirm.hide();
                if(this.buyTime<1) return this.$vux.toast.text('至少购买一次','bottom');
                this.$vux.loading.show({ text: "购买中..." });
                let res = await this.$http.post(this.versionLive2+'user/get_turntable_chance/',{
                    times:this.buyTime
                })
                this.$vux.loading.hide();
                if(res && res.data.code==1){
                    this.buyTime = 1;
                    this.count = res.data.data.times_now;
                    this.isBuy = false;
                }
                this.$vux.toast.text(res.data.msg); 
            },
            // 格式化奖品列表，计算每个奖品的位置
            formatPrizeList (list) {
            // 记录每个奖的位置
            const angleList = []

            const l = list.length
            // 计算单个奖项所占的角度
            const average = CIRCLE_ANGLE / l

            const half = average / 2

            // 循环计算给每个奖项添加style属性
            list.forEach((item, i) => {

                // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
                const angle = -((i * average) + half)
                // 增加 style
                item.style = `-webkit-transform: rotate(${angle}deg);
                            transform: rotate(${angle}deg);`

                // 记录每个奖项的角度范围
                angleList.push((i * average) + half )
            })

            this.angleList = angleList

            return list
            },
            async beginRotate() {


                if(!this.$store.state.codeToken){
                    this.$popup({
                        title: "我是标题",
                        content: "我是内容",
                        btnText: "我是按钮",
                        click: () => {
                            this.isLogin = false;
                        }
                        });
                    return;
                }

            // 添加次数校验
            
            if(this.count === 0){
                 this.$vux.confirm.show({
                        title:'',
                        content:'<p>今日的抽奖次数已用完，您可以提高会员等级</p><p>增加每日抽奖次数也可以单独</p><p>购买抽奖次数.</p>',
                        showCancelButton:false,
                        confirmText:"知道了",
                        onConfirm : () => {
                        }
                    });
                return
            } 

            // 开始抽奖
            // 这里这里向服务端发起请求，得到要获得的奖
            // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
            if(!this.isKc) return
            this.isKc = false;
            let res = await this.$http.post(this.versionLive2+'user/get_gift/');
                if(res && res.data.code==1){
                     this.index = res.data.data.id;
                     // 减少剩余抽奖次数
                     this.count = res.data.data.time_now;
                     //中奖信息
                     this.prizeObj = res.data.data;
                     this.rotating();
                }else{
                    this.$vux.confirm.show({
                        title:'',
                        content:res.data.msg,
                        showCancelButton:false,
                        onConfirm : () => {
                        }
                    });
                }

            // 随机获取下标
            // this.index = this.random(this.prizeList.length - 1);

            // 减少剩余抽奖次数
            // this.count--
        
            // 开始旋转
            this.rotating()
            },
            // random (max, min = 0) {
            // return parseInt(Math.random() * (max - min + 1) + min)
            // },
            rotating() {
            const { isRotating, angleList, config, rotateAngle, index } = this

            if (isRotating) return

            this.isRotating = true
            
            // 计算角度
            const angle =
                // 初始角度
                rotateAngle +
                // 多旋转的圈数
                config.circle * CIRCLE_ANGLE +
                // 奖项的角度
                angleList[index-0-1] -
                (rotateAngle % CIRCLE_ANGLE)

                
                this.rotateAngle = angle

                // 旋转结束后，允许再次触发
                setTimeout(() => {
                
                this.rotateOver()
                }, config.duration + 1000)
            },
            rotateOver () {
                this.isRotating = false
                this.isKc = true;
                this.prize = this.prizeObj;

                console.log(this.prize, this.index)
                this.toastTitle();
            },
            //关闭弹窗
            closeToast() {
                // this.prize = null;
                this.$vux.confirm.hide();
                this.$emit("closeFunc",false)
            },
        
        }
        
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
   
    .dzp-container{ 
         position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.5);
            z-index: 2221;
            .remove-dzp{
                .rem(width,37);
                .rem(height,36);
                background: url(../../assets/images/chat/hb-ok-btn.png) no-repeat;
                background-size: contain;
                position: fixed;
                bottom:1rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2222;
            }
        // 购买弹框
        .buy-time{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.5);
            z-index: 2223;
            .bug-time-content{
                position: absolute;
                background: #fff;
                border-radius: .3rem;
                padding: .8rem;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                text-align: center;
                .remove-btn{
                    .rem(width,22);
                    .rem(height,22);
                    background: url(../../assets/images/hmlz-icon2.png);
                    background-size: contain;
                    position: absolute;
                    right: .4rem;
                    top:.4rem;
                }
                .buy-tip{
                    text-align: center;
                    .rem(font-size,32);
                    font-weight: bold;
                    margin-bottom: .5rem;
                }
                .input-box{
                    text-align: center;
                    .rem(height,69);
                    input{
                        display: inline-block;
                        .rem(width,300);
                        .rem(height,68);
                        .rem(line-height,68);
                        border-radius: .1rem;
                        border:1px solid #ddd;
                        margin: 0 .2rem;
                        text-align: center;
                        vertical-align: top;

                    }
                    .add-btn{
                        .rem(width,69);
                        .rem(height,69);
                         display: inline-block;
                        background: url(../../assets/images/seli_button_6_6.png);
                         background-size: contain;
                    }
                    .cut-btn{
                        .rem(width,69);
                        .rem(height,69);
                         display: inline-block;
                          background: url(../../assets/images/dis_button_6_6.png);
                         background-size: contain;
                    }
                }
                .total-zs{
                    margin:.4rem 0;
                    .rem(font-size,30);
                    i{
                        display: inline-block;
                        .rem(width,34);
                        .rem(height,31);
                         background: url(../../assets/images/chat/zuanshi-min.png) no-repeat;
                         background-size: contain;
                         margin-right: .2rem;
                         vertical-align: middle;
                    }
                }
                .bug-btn{
                    background: linear-gradient(90deg, #FF3634, #FF7F66);
                    color: #fff;
                    text-align: center;
                    .rem(width,490);
                    .rem(height,80);
                    .rem(line-height,80);
                    border-radius: 20px;
                    .rem(font-size,32);
                }
                
            }
        }
        //大转盘

        .container {
            z-index: 2222;
            width: 84%;
            position: fixed;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            
            
        }
            .lucky-wheel {
                width: 100%;
                background:url("../../assets/images/chat/bj-min.png") no-repeat
                    center bottom;
                background-size: cover;
                border-radius: .5rem;
                height: 13rem;
                padding:.4rem 0;
                .zj-prizeList{
                    marquee{
                        width: 93%;
                        span{
                            padding-right: .5rem;
                        }
                    }
                    .rem(height,88);
                    .rem(line-height,88);
                    .rem(width,462);
                    background: url(../../assets/images/chat/noticebar.png) no-repeat;
                    background-size: contain;
                    color: #fff;
                    .rem(font-size,18);
                    font-weight: bold;
                    margin: 0 auto .1rem;
                    padding:0 .3rem 0 .9rem;
                    position: relative;
                    i{
                        display: inline-block;
                        .rem(width,34);
                        .rem(height,29);
                        background: url(../../assets/images/chat/lb.png) no-repeat;
                        background-size: contain;
                        position: absolute;
                        left: .4rem;
                        top:.4rem;
                    }
                }
                .go-buy-btn{
                        .rem(height,83);
                        .rem(line-height,83);
                        .rem(width,492);
                        background: url(../../assets/images/chat/gm.png) no-repeat;
                        background-size: contain;
                        color: #fff;
                        .rem(font-size,32);
                        font-weight: bold;
                        text-align: center;
                        margin: 0 auto;
                    }
                .left-time{
                    .rem(height,81);
                    .rem(line-height,81);
                    .rem(width,402);
                    background: url(../../assets/images/chat/time.png) no-repeat;
                    background-size: contain;
                    color: #FAFFFE;
                    .rem(font-size,24);
                    font-weight: 500;
                    text-align: center;
                    margin: .3rem auto;
                    i{
                       padding: 0 .1rem;
                       color: red;
                       font-family: number2;     
                    }
                   
                }
            }
            .wheel-main {
                margin: 0 auto;
                position: relative;
                
                .rem(width,586);
                .rem(height,586);
                }
            .wheel-bg {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: url("../../assets/images/chat/dzp_bg.png") no-repeat center top;
            background-size: 100%;
            color: #fff;
            }
            .wheel-pointer {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
           .rem(width,196);
           .rem(height,216);
            background: url("../../assets/images/chat/zd.png") no-repeat center top;
            background-size: 100%;
            transform: translate3d(-50%, -50%, 0);
            }
            .wheel-bg div {
            text-align: center;
            }
            .prize-list {
            width: 100%;
            height: 100%;
            position: relative;
            }
            .prize-list .prize-item {
            position: absolute;
            .rem(width,190);
            .rem(height,285);
            top: 0;
            left: 50%;
            // margin-left:-47.5px;
            .rem(margin-left,-95);
            // margin-top: .2rem;
            transform-origin: 50% 100%;
            }

            .prize-pic img {
            width: .6rem;
            margin-top: .8rem;
            &.wzs{
                width:.3rem;
                 margin-top: .9rem;
            }
            &.car{
                // width:.9rem;
                // margin-top: 0.8rem;
            }
            &.fhjc{
                // width:1.2rem;
                // margin-top: 0.3rem;
            }
            &.lbjn{
                // width:1.2rem;
                // margin-top: 0.4rem;
            }
            }
            .prize-count {
            font-size: 0.875rem;
            }
            .prize-type {
            .rem(font-size,18);
            }
            .main {
            position: relative;
            width: 100%;
            min-height: 14.25rem;
            background: rgb(243, 109, 86);
            padding-bottom: 1.6875rem;
            }
            .main-bg {
            width: 100%;
            height: 6.5625rem;
            position: absolute;
            top: -3.4375rem;
            left: 0;
            // background: url("../assets/img/luck_bg.png") no-repeat center top;
            // background-size: 100%;
            }

            .tip {
            position: relative;
            margin: 2.5rem auto 0;
            width: 17.5rem;
            border: 1px solid #fbc27f;
            }
            .tip-title {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 1rem;
            color: #fccc6e;
            background: rgb(243, 109, 86);
            padding: 0.3125rem 0.625rem;
            }
            .tip-content {
            padding: 1.5625rem 0.625rem;
            font-size: 0.875rem;
            color: #fff8c5;
            line-height: 1.5;
            }
            .toast-mask {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000;
            width: 100%;
            height: 100%;
            }
            .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 20000;
            transform: translate(-50%, -50%);
            width: 15.4375rem;
            background: #fff;
            border-radius: 0.3125rem;
            padding: 0.3125rem;
            background-color: rgb(252, 244, 224);
            }
            .toast-container {
            position: relative;
            width: 100%;
            height: 100%;
            border: 1px dotted #fccc6e;
            }
            .toast-picture {
            position: absolute;
            top: -6.5rem;
            left: -1.5rem;
            width: 18.75rem;
            height: 8.5625rem;
            }
            .toast-pictrue-change {
            position: absolute;
            top: -1.5rem;
            left: -1.375rem;
            width: 17.5rem;
            height: 3.125rem;
            }
            .toast-title {
            padding: 2.8125rem 0;
            font-size: 18px;
            color: #fc7939;
            text-align: center;
            }
            .toast-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.9375rem;
            }
            .toast-btn div {
            background-image: -moz-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
            );

            background-image: -ms-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
            );
            background-image: -webkit-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
            );
            box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
            width: 4.6875rem;
            height: 1.875rem;
            border-radius: 1.875rem;
            text-align: center;
            line-height: 1.875rem;
            color: #fff;
            }
            .close {
            position: absolute;
            top: -0.9375rem;
            right: -0.9375rem;
            width: 2rem;
            height: 2rem;
            // background: url("../assets/img/close_store.png") no-repeat center top;
            background-size: 100%;
            }






    }
</style>