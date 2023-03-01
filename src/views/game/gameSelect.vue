<template>
    <div :class='[{"tb-pink":skin==1},{"tb-blue":skin==2},{"tb-green":skin==3},{"tb-maingreen":skin==4}]'>
        <header class="s-header" :class="skin==5?'goldenHeader':''" style="height: 1.5rem">
            <div class="logo fl" @click="goHome()">
                <img v-if="noticeType == 1&&skin==0"  src="../../assets/images/game/logo.png"  alt />
                <img v-if="noticeType == 1&&skin==1"  src="../../assets/images/game/logo-pink.png"  alt />
                <img v-if="noticeType == 1&&skin==2"  src="../../assets/images/game/logo-blue.png"  alt />
                <img v-if="noticeType == 1&&skin==3"  src="../../assets/images/game/logo-green.png"  alt />
                 <img  v-if="noticeType == 1&& skin ==4" src="../../assets/images/login/logo2-maingreen.png" alt="">
                 <img  v-if="noticeType == 1&& skin ==5" src="../../assets/images/login/logo2-golden.png" alt="">
                <img v-if="noticeType == 2&&skin==0"  src="../../assets/images/game/logo1.png"  alt />
                <img v-if="noticeType == 2&&skin==1"  src="../../assets/images/game/logo1-pink.png"  alt />
                <img v-if="noticeType == 2&&skin==2"  src="../../assets/images/game/logo1-blue.png"  alt />
                <img v-if="noticeType == 2&&skin==3"  src="../../assets/images/game/logo1-green.png"  alt />
                <img  v-if="noticeType == 2&&skin==4" src="../../assets/images/login/logo1-maingreen.png" alt="">
                <img  v-if="noticeType == 2&&skin==5" src="../../assets/images/login/logo1-golden.png" alt="">
                </div>
            
            <div class="user fr" v-if="$store.state.codeToken">
                <div class="info fr">
                    <span class="user-name ">{{$store.state.username}} </span>
                    <div @click="look()" style="display:inline-block;">
                        <img class="look" v-if="isLook&&skin==0" src="../../assets/images/game/look.png" alt="">
                        <img class="look" v-if="isLook&&skin==1" src="../../assets/images/game/look-pink.png" alt="">
                        <img class="look" v-if="isLook&&skin==2" src="../../assets/images/game/look-blue.png" alt="">
                        <img class="look" v-if="isLook&&skin==3" src="../../assets/images/game/look-green.png" alt="">
                        <img class="look" v-if="isLook&&skin==4" src="../../assets/images/game/look-green.png" alt="">
                        <img class="shut" v-if="isShut" src="../../assets/images/game/look_1.png" alt="">
                    </div>
                    <p class="vnd">{{$t('moneyDw')}}: <span v-if="isLook">{{amount}}</span> <span v-if="isShut">******</span></p>
                </div>
                <div class="pic fr" @click="goUser()">
                    <img :src="$store.state.avatar" v-if="$store.state.avatar" alt="">
                </div>
            </div>
        </header>
        <div class="nav1 clearfix" :class="skin==5?'nav1-golden':''">
            <myScrollX>
                <ul class="clearfix"  ref="navTab1"  :style="{width:lotteryGames.length*3.1+'rem'}">
                    <li :class="nav1Active==index?'active':''" v-for="(item,index) in lotteryGames" :key="index" @click="nav1Tab(index)">
                        {{item.name}}
                    </li>
                </ul>
            </myScrollX>
        </div>
        <div class="nav2 clearfix" :class="skin==5?'nav2-golden':''">
            <myScrollX>
                <ul ref="navTab2">
                    <li :class="nav2Active==item?'active':''" v-for="(item,index) in nav2" :key="index" @click="nav2Tab(item)">{{item}}</li>
                </ul>
            </myScrollX>
        </div>
        <div class="content" >
            <myScroll :top="skin==5?3.8:4.5" :bgColor="skin==5?'1F252C':''" :bottom="0"  :ref="'scrollWrapper'"  v-on:func="reLoad">
                <div class="floor" :class="skin==5?'floor-golden':''" v-if="nav2Active == (defalutLan=='vi-vn'?'Tất cả':'All')" v-for="(v,index) in lotteryGamesList" :key="index">
                    <h3 class="title" v-if="v.name != 'CN'">{{v.name}}</h3>
                    <h3 class="title" v-if="v.name == 'CN'">CN</h3>
                    <div  class="item clearfix" :class='[{"item-pink":skin==1},{"item-blue":skin==2},{"item-green":skin==3},{"item-golden":skin==5}]'  v-for="(j,index) in v.list" :key="index" @click="goxz(j.code,j.name,j.remark)">    
                        <img  class="item-icon fl" :src="j.img" alt="">
                        <div class="fl">
                            <p class="clearfix">
                                <span class="cp-name fl">{{j.name}}</span>
                                <img class="hot fl" v-if="j.tag == 'hot'" src="../../assets/images/game/hot1.png" alt="">
                                <img class="hot fl" v-if="j.tag == 'new'" src="../../assets/images/game/new1.png" alt="">
                            </p>
                            <p class="draw-time">{{j.remark}}</p>
                        </div>
                        <div class="fr">
                            <button class="enter">{{$t('gameSelect[0]')}}</button>
                            <span class="date">{{j.open_date}}</span>
                        </div>
                    </div>
                </div>
                <div class="floor" v-if="nav2Active == v.name" v-for="(v,index) in lotteryGamesList" :key="index">
                    <div :class='[{"item-pink":skin==1},{"item-blue":skin==2},{"item-green":skin==3},{"item-golden":skin==5}]' class="item clearfix" v-for="(j,index) in v.list" :key="index"   @click="goxz(j.code,j.name,j.remark)">
                        <img  class="item-icon fl" :src="j.img" alt="">
                        <div class="fl">
                            <p class="clearfix">
                                <span class="cp-name fl">{{j.name}}</span>
                                <img class="hot fl" v-if="j.tag == 'hot'" src="../../assets/images/game/hot1.png" alt="">
                                <img class="hot fl" v-if="j.tag == 'new'" src="../../assets/images/game/new1.png" alt="">
                            </p>
                            <p class="draw-time">{{j.remark}}</p>
                        </div>
                        <div class="fr">
                            <button class="enter">{{$t('gameSelect[0]')}}</button>
                            <span class="date">{{j.open_date}}</span>
                        </div>
                    </div>
                </div>
            </myScroll>
           
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
export default {
    data(){
        return{
            nav2:[this.defalutLan=='vi-vn'?'Tất cả':'All','T2','T3','T4','T5','T6','T7','CN'],
            nav2Active:this.defalutLan=='vi-vn'?'Tất cả':'All',
            nav1Active:0,
            ulW:'',
            isLook:true,
            isShut:false,
            lotteryGames:[],
            lotteryGamesList:[],
            amount:'',
        }
    },
    filters: {
        filterTitle(n) {
           
        }
    },
    mounted(){//组件挂载时，调用滚动条 为确保dom渲染了，需要一个定时器  20毫秒再调用
    //   setTimeout(()=>{
    //       this.ScrollX();
    //   },20)
    },
    created() {
        // this.ScrollX();
        if(this.defalutLan=='vi-vn'){
            this.nav2 = ['Tất cả','T2','T3','T4','T5','T6','T7','CN'];
            this.nav2Active='Tất cả';
        }else{
            this.nav2 = ['All','T2','T3','T4','T5','T6','T7','CN'];
            this.nav2Active='All';
        }
        this.getGames();
        this.loadMoney();
    },
      computed: {
    ...mapState(['skin','allYnCp','defalutLan'])
  },
    methods:{
      loadMoney() {
      if (!this.$st.state.codeToken) return;
      this.$http.get("/api/user/balance").then(res => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0"; //显示出来的        
        }
      });
    },
    goUser(){
        if(this.$store.state.codeToken){
            this.$router.push('/member')
        }else{
            this.$router.push('/login') 
        }
    },
        goHome(){
            this.$router.push('/')
        },
         goxz(id,name,mark){
            if(!this.$store.state.codeToken){
                return  this.$popup();
            }
            this.$router.push("/xz/"+id+"?vname="+name+'&mark='+mark)
        },
        look(){
            if(this.isLook){
                 this.isLook =false;
                this.isShut = true;
            }else{
                this.isLook =true;
                this.isShut = false;
            }
        },
        nav1Tab(index){
            this.nav1Active = index;
            this.nav2Active=this.defalutLan=='vi-vn'?'Tất cả':'All';
            this.lotteryGamesList = this.lotteryGames[index].list;
        },
        nav2Tab(item){
            this.nav2Active = item;
        },
        ScrollX(){
            let allzj = document.querySelectorAll('.nav1 ul li');
            let sum2 = 0;
            for(let i=0,len=allzj.length;i<len;i++){
                //console.log(allzj[i].offsetWidth)
                sum2 +=((allzj[i].offsetWidth)+15);
            }
            this.ulW = sum2-0+10;
            //this.$refs.navTab1.style.width = sum2-0+10 + "px";
        },
        reLoad(data,obj) {
            if(data=='end'){
                obj.name = this.$route.name;
                this.$store.commit('SETPOSITIONY',obj)
            }
        },
        async getGames() {
            this.lotteryGames = this.allYnCp||[];
            if(this.lotteryGames.length){
                this.lotteryGamesList = this.lotteryGames[0].list;
            }
            
            let res=  await this.$http.get('/api/lottery/games');
            if (res && res.data.code == 1) {
                this.lotteryGames = res.data.data || [];
                this.lotteryGamesList = this.lotteryGames[0].list;
                this.$st.commit('SETYNLOTTERY',res.data.data||[])
                //  setTimeout(()=>{
                //     this.ScrollX();
                // },20)
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }
    .s-header{
        padding: 10px;
        .logo{
            .rem(width,250);
            img{
                width: 100%;
            }
        }
        .user{
            // width: 50%;
            .rem(font-size,24);
            color: #445779;
            text-align: right;
            .pic{
                .rem(width,80);
                .rem(height,80);
                border-radius: 50%;
                overflow: hidden;
                .rem(margin-right,18);
                display: inline-block;
            }
            .info{
                font-size: .32rem;
                .vnd{
                    display: block;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    .rem(margin-top,10);
                }
                .look,.shut{
                    .rem(width,30);
                    vertical-align: middle;
                    .rem(margin-left,20);
                }
            }
        }
        &.goldenHeader{
            .user{
                color: #cecece;
                .user-name {
                    color: #928151;
                }
            }
        }
    }
    .nav1{
        border-top: 1px solid #F2F6F7;
        padding:10px;
        ul{
            li{
                color: #71819D;
                padding: 0.2rem 0;
                text-align: center;
                // width: 23%;
                width: 3rem;
                background: #F6F7FB;
                float: left;
                .rem(border-radius,55);
                // .rem(margin-right,10);
                margin-right: .1rem;
                font-size: .32rem;
               
                &.active{
                    color: #fff;
                    background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                }
            }
        }
        &.nav1-golden{
            background: #161C23;
            border: none;
            ul{
                li{
                    background: #464B53;
                    color: #cecece;
                    &.active{
                        color: #A85100;
                        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                    }
                }
            }
        }
    }
    .nav2{
        width: 100%;
        border-bottom: 1px solid #F2F6F7;
        ul{
            display: flex;
            li{
                font-size: .32rem;
                flex: 1;
                color: #71819D;
                text-align: center;
                padding: 10px 0 15px;
                position: relative;
                &.active{
                    color: #1486FF;
                    &::before{
                        content: '';
                        .rem(width,50);
                        .rem(height,6);
                        background: #1486FF;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        .rem(border-radius,5);
                    }
                }
            }
        }
        &.nav2-golden{
            background: #1F252C;
            border-bottom: 1px solid #5C564D;
            ul{
                li{

                    color: #928151;
                     &.active{
                        color: #E3CF95;
                        &::before{
                            background: #E3CF95;;
                        }
                    }
                }
            }
        }
    }
    .floor{
        padding: 0 0.3rem;
        .title{
            .rem(font-size,24);
            font-weight: bold;
            color: #445779;
            .rem(padding-top,20);
            .rem(padding-bottom,20);
        }
        .item,.item-pink,.item-blue,.item-green{
            width: 100%;
            background: url('../../assets/images/game/sele_bg.png') no-repeat;
            background-size: contain;
            .rem(padding-top,15);
            .rem(padding-bottom,15);
            .rem(padding-left,30);
            .rem(padding-right,20);
            .rem(margin-bottom,20);
            .rem(font-size,12);
            &.item-pink{
                background: url('../../assets/images/game/sele_bg-pink.png') no-repeat!important;
                background-size: contain!important;
            }
            &.item-blue{
                                background: url('../../assets/images/game/sele_bg-blue.png') no-repeat!important;
                background-size: contain!important;
            }
            &.item-green{
                                background: url('../../assets/images/game/sele_bg-green.png') no-repeat!important;
                background-size: contain!important;
            }
            &.item-golden{
                background: url('../../assets/images/skin/golden/bg.png') no-repeat!important;
                background-size: contain!important;
            }
            .item-icon{
                .rem(width,100);
                .rem(margin-right,32);
            }
            .cp-name{
                .rem(font-size,28);
                color: #445779;
                margin-top: 8px;
            }
            .hot,.new{
                .rem(width,30);
                margin-top: 8px;
                .rem(margin-left,36);
            }
            .draw-time{
                .rem(font-size,24);
                color: #71819D;
                .rem(margin-top,15);
            }
            .enter{
                display: block;
                .rem(width,110);
                .rem(height,40);
                color: #287BE1;
                border: 1px solid #287BE1;
                .rem(border-radius,110);
                .rem(margin-bottom,15);
                background: #fff;
                margin-top: 8px;
                font-size: .3rem;
            }
            .date{
                color: #71819D;
                font-size: .3rem;
            }
        }
        &.floor-golden{
            .title{
                color: #A85100;
            } 
            .item{

                .cp-name{
                    color: #A85100;
                }
                .draw-time{
                    color: #A85100;
                }
                .enter{
                    color: #1F252C;
                    border:1px solid #1F252C;
                }
                .date{
                    color: #A85100;
                }
                
            }
            
        }
    }
    .tb-pink{
        .nav1{
            li.active{
                background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
            }
        }
        .nav2{
            li{
                &.active{
                    color: #FB796B!important;
                    &::before{
                        content: '';
                        background: #FB796B!important;
                    }
                }
            }
        }
        .floor{
            .enter{
                border-color: #FB796B!important;
                color: #FB796B!important;
            }
        }
    }
    .tb-blue{
        
        .nav1{
            li.active{
                background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%)!important;
            }
        }
        .nav2{
            li{
                &.active{
                    color: #0CB6D9!important;
                    &::before{
                        content: '';
                        background: #0CB6D9!important;
                    }
                }
            }
        }
        .floor{
            .enter{
                border-color: #0CB6D9!important;
                color: #0CB6D9!important;
            }
        }
    }
    .tb-green{
        
        .nav1{
            li.active{
                background: linear-gradient(89.97deg, #32C986 0.02%, #59F3B2 99.97%)!important;
            }
        }
        .nav2{
            li{
                &.active{
                    color: #00B681!important;
                    &::before{
                        content: '';
                        background: #00B681!important;
                    }
                }
            }
        }
        .floor{
            .enter{
                border-color: #00B681!important;
                color: #00B681!important;
            }
        }
    }
    .tb-maingreen{
        
        .nav1{
            li.active{
                background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%)!important;
            }
        }
        .nav2{
            li{
                &.active{
                    color: #01B373!important;
                    &::before{
                        content: '';
                        background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%)!important;
                    }
                }
            }
        }
        .floor{
            .enter{
                border-color: #01B373!important;
                color: #01B373!important;
            }
        }
    }
    // 
    @media screen and (max-width: 320px) {
    // .nav1 ul li{
    //     font-size: 10px;
    // }
}
</style>