<template>
    <div class="new-task">
        <header class="home-header">
            <div @click="$router.go(-1)" class="back-icon"></div>
            <span>{{$route.meta.title}}</span>
        </header>
        <div class="task-content">
            <myScroll
                :bgColor="'8cc4ff'"
                :bottom="0"
                :top="1.3"
                ref="scrollWrapper"
                :data="playList"
                v-on:func="reLoad"
                :isLoad="isL"
                :isDown="true"
                    >
                <div class="task-title">
                    <img src="../../assets/images/newTask/new_03-min.jpg" alt="">
                </div>
                <div class="task-box">
                    <ul>
                        <li class="clearfix" v-for="(v,index) in taskList" :key="index">
                           <span class="fl item-li">{{v.title}}</span>
                           <span class="fr btn-item" @click="goDo(v)" :class="v | filterTaskClass">{{v|filterTaskName}}</span>
                        </li>
                    </ul>
                    <div class="task-logo"><img src="../../assets/images/newTask/logo.png" alt=""></div>
                </div>

            </myScroll>
        </div>
<!--        领取成功弹框-->
        <div class="lq-success" v-if="isLq">
            <div class="lg-success-container">
                <div class="remove-btn" @click="cancelPop"><img src="../../assets/images/newTask/remove.png" alt=""></div>
                <div class="lq-success-content">
                    <h3>Nhắc nhở</h3>
                    <p class="bones-box"><span class="bones-num">{{rewardData.amount}}</span><i class="bones-icon" :class="rewardData.gift_type | filterGiftType"></i></p>
                    <span>恭喜您成功领取</span>
                </div>
            </div>
        </div>
        <!-- 领取失败 -->
        <div class="lq-success" v-if="lsErroe">
            <div class="lg-success-container lg-error">
                <div class="remove-btn" @click="lsErroe = false"><img src="../../assets/images/newTask/remove.png" alt=""></div>
                <div class="lq-success-content">
                    <span class="qd-btn" @click="lsErroe = false">Xác nhận</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import myScroll from "../../components/myScroll";
    import { mapMutations } from "vuex";
    export default {
        name: "newTask",
        components: {
            myScroll
        },
        data(){
          return {
              isL: false, //是否显示 下拉刷新的组件
              playList:{},
              isLq:false,
              taskList:[],
              rewardData:{},
              currTastId:'',
              lsErroe:false,
              lsErroeGB:false
          }
        },
        filters:{
            filterTaskName(n){
                let text = '';
                if(n.status==-1){
                    text = '领取';
                }else if(n.status==-2){
                    text = '已完成';
                }else if(n.status==-3){
                    text = '已过期';
                }else if(n.status==-4){
                    text = '已领取';
                }else{
                    if(n.jump==1){
                        text = '去完成';
                    }else if(n.jump==2){
                        text = '去充值';
                    }else{
                        if(n.target>0){
                            text = n.status+'/'+n.target;
                        }
                    }
                }
                return text;
            },
            filterTaskClass(n){
                let c = '';
                if(n.status==-1){
                    c = 'go-btn';
                }else if(n.status==-2 || n.status==-4){
                    c = 'done-btn';
                }else if(n.status==-3){
                    c = 'done-btn';
                }else{
                    if(n.jump>0){
                        c = 'go-btn'
                    }else{
                        c = 'no-done-btn'
                    }

                }
                return c;
            },
            filterGiftType(n){
                let c='';
                if(n==1){
                    c='lw-icon';
                }else if(n==2){
                    c='hb-icon';
                }else if(n==3){
                    c='cj-icon';
                }else if(n==0){
                    c='zs-icon';
                }else{
                    // c='zs-icon';
                }
                return c;
            }
        },
        methods:{
            ...mapMutations([
                'SETTASK'
            ]),
            goDo(v){
                //先判断状态
                if(v.status==-1){
                    //可领取
                    this.getReward(v);
                }else if(v.status==-2){
                    //已领取

                }else if(v.status==-3){
                    //已过期
                }else{
                    if(v.task_id==1){
                        if(v.archive==1){
                            this.$router.push('/withdrawalTopUp/0')
                        }else{
                            this.$router.push('/UpdateInfor')
                        }
                    }else{
                        if(v.jump==2){
                            this.$router.push('/withdrawalTopUp/1')
                        }
                    }
                    // if(v.jump==1){
                    //     this.$router.push('/UpdateInfor')
                    // }else if(v.jump==2){
                    //     this.$router.push('/withdrawalTopUp/1')
                    // }
                }

            },
            cancelPop(){
                this.isLq = false;
                if(this.currTastId==4){
                    this.getTaskList();
                }
            },
            async getReward(v){
                this.currTastId = v.task_id;
              let res = await this.$http.post(this.versionLive2+'/live/task_reward/',{
                  task_id:v.task_id
              })
                if(res && res.data.code==1){
                    if(v.task_id!=4){
                        v.status = -2;
                    }
                    //弹出领取弹框
                    this.isLq = true;
                    this.rewardData = res.data.data;
                }else{
                    //失败了
                    this.lsErroe = true;
                    // this.$vux.confirm.show({
                    //     title:'提示',
                    //     content:res.data.msg,
                    //     showCancelButton:false,
                    //     onConfirm : () => {
                    //     }
                    // });
                }
            },
            async getTaskList(){
                this.$vux.loading.show({text:'Đang nhận...'});
              let res = await this.$http.get('/api2/user/task-list');
                this.$vux.loading.hide();
              if(res&&res.data.code==1){
                  this.taskList = res.data.data||[];
              }
            },
            reLoad(data){
                //下拉刷新
                if (data == "down") {
                   this.getTaskList();
                }
            }
        },
        created() {
            this.getTaskList();
            this.SETTASK(true);
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.31rem;
        color: #fff;
        background: url("../../assets/images/newTask/new_02-min.jpg") no-repeat;
        background-size: cover;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/white-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }
    .task-content{
        .task-title{
            .rem(min-height,208);
            img{
                display: block;
            }
        }
        .task-box{
            /*background-image: linear-gradient(#fc894a, #f73b3b);*/
            background: url("../../assets/images/newTask/newbg.jpg") no-repeat;
            background-size: cover;
            ul{
                background: #fff;
                .rem(width,690);
                //.rem(height,690);
                min-height: 9rem;
                margin: 0 auto;
                .rem(padding-left,30);
                .rem(padding-right,30);
                .rem(padding-top,25);
                .rem(padding-bottom,10);
                li{
                    .rem(margin-bottom,30);
                    span{
                        color: #484646;
                        .rem(font-size,22);

                    }
                    .item-li{
                        .rem(width,510);
                    }
                    .btn-item{
                        color: #fff;
                        text-align: center;
                        .rem(width,98);
                        .rem(height,40);
                        .rem(line-height,39);
                        .rem(border-radius,10);
                    }
                    .go-btn{
                        // background:linear-gradient(90deg,rgba(247,59,59,1),rgba(252,137,74,1));
                        background:linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);;
                    }
                    .done-btn{
                        background: #BFBFBF;
                        // border:1px solid #1486FF;
                        // color: #1486FF;
                    }
                    .no-done-btn{
                        // border:1px solid #FF513E;
                        // color: #FF513E;
                        border:1px solid #1486FF;
                        color: #1486FF;
                    }
                }
            }
        }
        .task-logo{
            text-align: center;
            padding: .2rem 0;
            img{
                .rem(width,170)
            }
        }
    }
    .lq-success{
        position: fixed;
        background: rgba(0,0,0,.5);
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        max-width: 750px;
        z-index: 100;
        .lg-success-container{
            position: relative;
            background: url("../../assets/images/newTask/bg.png") no-repeat;
            background-size: cover;
            .rem(width,650);
            .rem(height,663);
            // margin: 30% 11% 0;
            margin: 30% 6% 0;
            text-align: center;
           
            .remove-btn{
                position: absolute;
                right: .5rem;
                top: 1.3rem;
                .rem(width,30);
                .rem(height,31);
            }
            .lq-success-content{
                padding-top: 40%;
                // padding-right: .5rem;
                .bones-box{
                    color: #1486FF;
                    .rem(font-size,100);
                    font-weight: bold;
                    padding: .5rem 0;
                    .bones-icon{
                        margin-left: .1rem;
                        .rem(width,80);
                        .rem(height,69);
                        display: inline-block;
                    }
                    .zs-icon{
                        background: url("../../assets/images/newTask/diamon-min.png") no-repeat;
                        background-size: cover;
                    }
                    .cj-icon{
                        background: url("../../assets/images/newTask/red-min.png") no-repeat;
                        background-size: cover;
                    }
                    .lw-icon{
                        background: url("../../assets/images/newTask/zd-min.png") no-repeat;
                        background-size: cover;
                    }
                    .hb-icon{
                        background: url("../../assets/images/newTask/red-min.png") no-repeat;
                        background-size: cover;
                    }
                }
                >h3{
                    .rem(font-size,40);
                    color: #445779;
                    font-weight: bold;
                }
                >span{
                    color: #1486FF;
                    .rem(font-size,50);
                    font-weight: bold;
                }
            }
             &.lg-error{
                 background: url("../../assets/images/newTask/bg1.png") no-repeat;
                 background-size: cover;
                 .rem(width,526);
                 .rem(height,561);
                  margin: 40% auto 0;
                  .remove-btn{
                      top: 0;
                      right: -0.4rem;
                  }
                  .qd-btn{
                      display: block;
                      .rem(width,229);
                        .rem(height,73);
                        background: #1486FF;
                        color:#fff;
                        .rem(font-size,46);
                        border-radius: 5px;
                        font-weight: normal;
                        position: absolute;
                        bottom: 0.5rem;
                        left: 50%;
                        transform: translateX(-50%);



                  }
            }
        }
    }
</style>