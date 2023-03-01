<template>
    <div class="new-task">
        <header class="home-header">
            <!-- <div @click="$router.go(-1)" class="back-icon"></div> -->
            <span>{{$route.meta.title}}</span>
        </header>
        <div class="task-content" :style="skin==5?'background: #1A1A1A;':''">
            <div class="new-tab"  :class="[
            {'active-pink': skin == 1},
            {'active-blue': skin == 2},
            {'active-green': skin == 3},
            {'active-maingreen': skin == 4},
            {'active-golden': skin == 5},
            ]" ><span >{{$t('Activities.newTask[0]')}}</span> </div>
            <myScroll
                :bgColor="skin==5?'1F252C':'fff'"
                :bottom="1.4"
                :top="2.2"
                ref="scrollWrapper"
                v-on:func="reLoad"
                :isLoad="isL"
                :isDown="false"
                    >
               
                <div class="task-box" :class="skin==5?'task-box-golden':''">
                    <ul>
                        <li class="clearfix" v-for="(v,index) in taskList" :key="index">
                           <span class="fl task-icon"></span>
                           <div class="fl item-li">
                            <span>{{v.title}}</span>
                            <span v-if="v.task_id!=17&&v.task_id!=18">+{{v.reward}}k [ {{v | filtersStatus(lanCode)}} ]</span>
                            <span v-else>{{v | filtersStatus(lanCode)}}</span>
                           </div>
                           <span class="fr btn-item" @click="goDo(v)" :class="v | filterTaskClass(skin)">{{v|filterTaskName(lanCode)}}</span>
                        </li>
                    </ul>
                   
                </div>

            </myScroll>
        </div>
<!--        领取成功弹框-->
        <div class="lq-success" v-if="isLq">
            <div class="lg-success-container">
                <div class="remove-btn" @click="cancelPop"><img src="../../assets/images/newTask/remove.png" alt=""></div>
                <div class="lq-success-content">
                    <h3>{{$t('Activities.newTask[1]')}}</h3>
                    <p v-if="rewardData.gift_type!=4" class="bones-box"><span class="bones-num">{{rewardData.amount}} k</span><i class="bones-icon" :class="rewardData.gift_type | filterGiftType"></i></p>
                    <p v-if="rewardData.gift_type==4" class="bones-box"><span class="bones-num">Bàn xoay lớn x{{parseInt(rewardData.amount)}}</span><i class="bones-icon" :class="rewardData.gift_type | filterGiftType"></i></p>
                    <span>{{$t('Activities.newTask[2]')}} </span>
                </div>
            </div>
        </div>
        <!-- 领取失败 -->
        <div class="lq-success" v-if="lsErroe">
            <div class="lg-success-container lg-error">
                <div class="remove-btn" @click="lsErroe = false"><img src="../../assets/images/newTask/remove.png" alt=""></div>
                <div class="lq-success-content">
                    <span class="qd-btn" @click="lsErroe = false">{{$t('qdText')}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import myScroll from "../../components/myScroll";
    import { mapMutations,mapState } from "vuex";
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
        computed: {
            ...mapState(["skin","lanCode"])
        },
        filters:{
            filterTaskName(n,lanCode){
                let text = '';
                if(lanCode==1){
                    if(n.status>0&&n.status<n.target){
                    //  text = '去完成'
                    text = 'Hoàn thành'
                }else if(n.status==-1){
                    // text = '领取';
                    text = 'Nhận';
                }else if(n.status==-2){
                    // text = '已完成';
                    text = "Hoàn thành"
                }else if(n.status==-3){
                    // text = '已过期';
                     text = 'Đã hết hạn';
                }else if(n.status==-4){
                    // text = '已领取';
                    text = 'Đã nhận';
                }else{
                    if(n.jump==1||n.jump==3||n.jump==4||n.jump==5||n.jump==6||n.jump==7){
                        // text = '去完成';
                        text ='Hoàn thành'
                    }else if(n.jump==2){
                        // text = '去充值';
                        text = 'Nạp';
                    }else{
                        if(n.target>0){
                            text = n.status+'/'+n.target;
                        }
                    }
                }
                }else if(lanCode==2||lanCode==5){
                    if(n.status>0&&n.status<n.target){
                    //  text = '去完成'
                    text = 'To finish'
                }else if(n.status==-1){
                    // text = '领取';
                    text = 'Receive';
                }else if(n.status==-2){
                    // text = '已完成';
                    text = "Finish"
                }else if(n.status==-3){
                    // text = '已过期';
                     text = 'Expired';
                }else if(n.status==-4){
                    // text = '已领取';
                    text = 'Received';
                }else{
                    if(n.jump==1||n.jump==3||n.jump==4||n.jump==5||n.jump==6||n.jump==7){
                        // text = '去完成';
                        text ='To finish'
                    }else if(n.jump==2){
                        // text = '去充值';
                        text = 'Recharge';
                    }else{
                        if(n.target>0){
                            text = n.status+'/'+n.target;
                        }
                    }
                }
                }
                return text;
            },
            filtersStatus(n,lanCode){
                let c = '';
                if(lanCode==1){
                    if(n.status==-1){
                    // c = '未领取';
                    c = 'Chưa nhận';
                }else if(n.status==0){
                    if(n.code=='frc'){
                        // c = '待充值';
                         c = 'Chưa hoàn thành';
                    }else if(n.code=='fwd'){
                        // c = '待提款';
                        c = 'Chưa hoàn thành';
                    }else if(n.code=='fbs'){
                        // c = '未完成';
                        c = 'Chưa hoàn thành';
                    }else if(n.task_id==17||n.task_id==18){
                        // c = '前往升级';
                        c = 'Đi đến nâng cấp';
                    }else{
                        c = n.status+'/'+n.target;
                    }
                    
                }else if(n.status==-2 || n.status==-4){
                    // c = '已领取';
                    c = 'Đã nhận';
                }else if(n.status==-3){
                    // c = '已过期';
                    c = 'Đã hết hạn';
                }else {
                    c = n.status+'/'+n.target
                }
                }else if(lanCode==2||lanCode==5){
                    if(n.status==-1){
                    // c = '未领取';
                    c = 'unaccalimed';
                }else if(n.status==0){
                    if(n.code=='frc'){
                        // c = '待充值';
                         c = 'Unfinished';
                    }else if(n.code=='fwd'){
                        // c = '待提款';
                        c = 'Unfinished';
                    }else if(n.code=='fbs'){
                        // c = '未完成';
                        c = 'Unfinished';
                    }else if(n.task_id==17||n.task_id==18){
                        // c = '前往升级';
                        c = 'Go to upgrade';
                    }else{
                        c = n.status+'/'+n.target;
                    }
                    
                }else if(n.status==-2 || n.status==-4){
                    // c = '已领取';
                    c = 'Received';
                }else if(n.status==-3){
                    // c = '已过期';
                    c = 'Expired';
                }else {
                    c = n.status+'/'+n.target
                }
                }
                return c;
            },
            filterTaskClass(n,s){
                console.log(s)
                let c = '';
                if(n.status==-1){
                    if(s==1){
                         c = 'go-btn-pink';
                    }else if(s==2){
                        c="go-btn-blue"
                    }else if(s==3){
                         c = 'go-btn-green';
                    }else if(s==4){
                         c = 'go-btn-maingreen';
                    }else if(s==5){
                         c = 'go-btn-golden';
                    }else{
                         c = 'go-btn';
                    }
                   
                }else if(n.status==-2 || n.status==-4){
                    // c = 'done-btn';
                     if(s==1){
                         c = 'go-btn-pink-dark';
                        }else if(s==2){
                            c="go-btn-blue-dark"
                        }else if(s==3){
                            c = 'go-btn-green-dark';
                        }else if(s==4){
                            c = 'go-btn-maingreen-dark';
                        }else if(s==5){
                            c = 'go-btn-golden-dark';
                        }else{
                            c = 'done-btn';
                        }
                }else if(n.status==-3){
                    // c = 'done-btn';
                     if(s==1){
                         c = 'go-btn-pink-dark';
                        }else if(s==2){
                            c="go-btn-blue-dark"
                        }else if(s==3){
                            c = 'go-btn-green-dark';
                        }else if(s==4){
                            c = 'go-btn-maingreen-dark';
                        }else if(s==5){
                            c = 'go-btn-golden-dark';
                        }else{
                            c = 'done-btn';
                        }
                }else{
                    if(n.jump>0){
                        if(s==1){
                         c = 'go-btn-pink';
                        }else if(s==2){
                            c="go-btn-blue"
                        }else if(s==3){
                            c = 'go-btn-green';
                        }else if(s==4){
                            c = 'go-btn-maingreen';
                        }else if(s==4){
                            c = 'go-btn-golden';
                        }else if(s==5){
                            c = 'go-btn-golden';
                        }else{
                            c = 'go-btn';
                        }
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
                            this.$router.push('/tx')
                        }else{
                            this.$router.push('/UpdateInforNew')
                        }
                    }else{
                        if(v.jump==1){
                            this.$router.push('/UpdateInforNew')
                        }else if(v.jump==2){
                            if(this.lanCode!=2){
                                this.$router.push('/recharge')
                            }else{
                                this.$router.push('/usdtForm')
                            }
                            
                        }else if(v.jump==3){
                            this.$router.push('/tx')
                        }else if(v.jump==4){
                            this.$router.push('/')
                        }else if(v.jump==5){
                            this.$router.push('/lgLottery')
                        }else if(v.jump==6){
                            this.$router.push('/lgqp')
                        }else if(v.jump==7){
                            this.$router.push('/vipRanking')
                        }
                    }
                   
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
            
            let d = this.globalPpproach.checkIsEncrypt({
                welfare:v.code,
            })
              let res = await this.$http.post('/api/user/taskreward',d)
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
                   
                }
            },
            async getTaskList(){
                this.$vux.loading.show({text:this.$t('Activities.newTask[18]')});
              let res = await this.$http.get('/api/user/tasklist');
                this.$vux.loading.hide();
              if(res&&res.data.code==1){
                  this.taskList = res.data.data||[];
                  this.playList.taskList = this.taskList;
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
        // line-height: 1.31rem;
        color: #fff;
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

        height: 1rem;
        padding-top: .1rem;
        .task-title{
            .rem(min-height,208);
            img{
                display: block;
            }
        }
        .new-tab{
            .rem(font-size,32);
            color: #445779;
            .rem(padding-left,34);
            span{
                position: relative;
                &:before{
                    position: absolute;
                    content: '';
                    width: 1.2rem;
                    height: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -0.2rem;
                    background:  #1486FF;
                }
            }
             &.active-pink{
                span{
                    &::before{
                        background:  #FB796B;
                    }
                }
                   
            }
            &.active-blue{
                span{
                    &::before{
                        background:  #0CB6D9;
                    }
                }  
            }
            &.active-green{
                span{
                    &::before{
                        background:  #0B9B71;
                    }
                }
            }
             &.active-maingreen{
                span{
                    &::before{
                        background:  #01BE79;
                    }
                }
            }
            &.active-golden{
                color: #AB9B62;
                span{
                    &::before{
                        background:  #928151;
                    }
                }
            }

        }
        .task-box{
           
            ul{
                background: #fff;
                .rem(width,716);
                margin: 0 auto;
                li{
                    .rem(height,139);
                    padding-top: 0.4rem;
                     border-bottom: 1px solid #F2F6F7;



                    span{
                        // color: #484646;
                        color: #6A86B9;
                        .rem(font-size,22);

                    }
                    .task-icon{
                        display: block;
                        .rem(width,80);                    
                        .rem(height,80); 
                        background: url('../../assets/images/newTask/task-icon.png')no-repeat;
                        background-size: contain; 
                        margin-right:0.15rem;                  
                        }
                    .item-li{
                        .rem(width,450);
                        >span{
                            display:block;
                            &:nth-child(1){
                                font-weight:bold;
                                // .rem(font-size,20);
                                color:#445779;
                            }
                        }
                    }
                    .btn-item{
                        color: #6A86B9;
                        text-align: center;
                        .rem(width,140);
                        .rem(height,70);
                        .rem(line-height,70);
                        .rem(border-radius,70);
                        color: #fff;
                    }
                    .go-btn{
                        background: linear-gradient(90deg, #4BA1FF 0%, #047EFF 100%);
                       
                    }
                     .go-btn-pink{
                            background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%);
                        }
                    .go-btn-blue{
                            background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%);
                        }
                    .go-btn-green{
                            background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%);
                    }
                    .go-btn-maingreen{
                            background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
                    }
                    .go-btn-golden{
                        background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%);
                        color: #A85100;
                    }
                    .go-btn-green-dark{
                        background: #48ABA1;
                        }
                        .go-btn-maingreen-dark{
                           background: #6AB4B9;
                        }

                        .go-btn-golden-dark{
                            background: linear-gradient(180deg, #AB9A62 0%, #87774A 100%);
                            color: #fff !important;
                        }
                     .go-btn-pink-dark{
                            background:#BB8585;
                        }
                    .go-btn-blue-dark{
                       background: #6A9DB9;
                        }

                    .done-btn{
                        background: #6A86B9;
            
                    }
                    .no-done-btn{
                      background: linear-gradient(90deg, #4BA1FF 0%, #047EFF 100%);
                    }
                }
            }
            &.task-box-golden{
                ul{
                    background: #1F252C;
                    li{
                        border-bottom: 1px solid #5C564D;
                        .item-li>span{
                            color: #928151;
                        }
                        span{
                            color: #928151;
                        }
                        .task-icon{
                            background: url('../../assets/images/newTask/task-icon-golden.png')no-repeat;
                            background-size: contain; 
                        }
                        
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
                    .rem(font-size,25);
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