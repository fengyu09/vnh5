<template>
    <div class="gamePlay">
        <!-- <flexbox class="infoHead" :class="$st.state.skin==5?'goldenHeader':''">
            <flexbox-item :span="1 / 10">
                <div
                @click="$router.go(-1)"
                class="flex-demo"
                style="padding-top: 0.7em; z-index: 10000001;"
                >
                    <img v-if="$st.state.skin==5 " src="../../assets/images/skin/golden/goBack.png" alt />
                    <img v-else src="../../assets/images/gray-back-icon.png" alt />
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo tickling">{{$t('gameplay.text[0]')}}</div>
            </flexbox-item>
            <flexbox-item :span="1 / 10">
                <div class="flex-demo"></div>
            </flexbox-item>
        </flexbox> -->
        <myScroll :top="0" :bottom="0" :ref="'scrollWrapper'" :bgColor="$st.state.skin==5?'000':'F3F4F5'"  v-on:func="reLoad">
            <div class="floor" :class="$st.state.skin==5?'floor-golden':''" v-for="(v,index) in categoriesList" :key="index">
                <h3 class="title" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]">{{index}}</h3>
                <ul class="list clearfix" >
                    <li class="fl" v-for="(j,index) in v" :class="[{'active':currentId==j.lottery_id },{'skin-btn-pink':currentId==j.lottery_id&&$st.state.skin==1 },{'skin-btn-blue':currentId==j.lottery_id&&$st.state.skin==2 },{'skin-btn-green':currentId==j.lottery_id&&$st.state.skin==3},{'skin-btn-maingreen':currentId==j.lottery_id&&$st.state.skin==4},,{'skin-btn-golden':currentId==j.lottery_id&&$st.state.skin==5},{'lessPadding':j.lottery_id==43}]" :key="index" @click="category(j)">
                        <span>{{j.vname}}</span>
                        <span class="time" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]" v-if="j.next_closetime>0">{{j.next_closetime | returnCount}}</span>
                        <span class="time" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]" v-else>--:--</span>
                    </li>
                </ul>
            </div>
        </myScroll>
        
    </div>
</template>
<script>
import { Flexbox,FlexboxItem } from "vux";
import {mapMutations } from "vuex";
export default {
    data() {
        return {
            currentId:1,
            categoriesList:{},
            currInfo:{}
        }
    },
    created() {
        // this.currentId = this.$route.query.id || 1;
        this.currentId = this.faCid || 1;
        this.getCategories();
    },
    props:['faCid'],
    filters:{
        returnCount(time){
            let t = "";
            let h = "";
            let d = "";
            let min = "";
            let second = "";
            if (time > 60) {
                second = parseInt(time) % 60;
                min = parseInt((time / 60) % 60);
                h = parseInt((parseInt(time / 60) / 60) );
                d = parseInt(parseInt(time / 60) / 60 / 24);
                second = second >= 10 ? second : "0" + second;
                min = min >= 10 ? min : "0" + min;
                if (!h) h = "";
                else h = h >= 10 ? h : "0" + h ;
                if(h>=1){
                    t = h + ":"  + min + ":" + second;
                } else{
                    t =  min + ":" + second;
                }
                
            } else {
                t = "00:" + (time >= 10 ? time : "0" + time);
            }
            return t;
        },
  },
    methods:{
         ...mapMutations([
                "SETPOSITIONY",
            ]),
         reLoad(data,obj) {
            if(data=='end'){
                obj.name = this.$route.name;
                this.$store.commit('SETPOSITIONY',obj)
            }
        }, 
        async getCategories() {
            this.categoriesList = this.$st.state.allLotteryGame || [];
            let res=  await this.$http.get('/api/lottery/categories/');
            if (res && res.data.code == 1) {
                this.categoriesList = res.data.data || [];
                this.$st.commit('SETLOTTERY',this.categoriesList)
                //开奖时间
                for(let key  in this.categoriesList){
                    for(let j in this.categoriesList[key]){
                        this.timer(this.categoriesList[key][j].next_closetime);
                    }
                }
            }
        },
        category(j){
            this.currentId = j.lottery_id;
            this.$router.push("/xz/"+j.lottery_id+"?vname="+j.vname+'&mark='+j.remark)
        },
        //倒计时
        count(time) {
            let t = "";
            let h = "";
            let d = "";
            let min = "";
            let second = "";
                if (time > 60) {
                second = parseInt(time) % 60;
                min = parseInt((time / 60) % 60);
                h = parseInt((parseInt(time / 60) / 60) );
                d = parseInt(parseInt(time / 60) / 60 / 24);
                second = second >= 10 ? second : "0" + second;
                min = min >= 10 ? min : "0" + min;
                if (!h) h = "";
                else h = h >= 10 ? h : "0" + h ;
                if(h>=1){
                    t = h + ":"  + min + ":" + second;
                } else{
                    t =  min + ":" + second;
                }
                
            } else {
                t = "00:" + (time >= 10 ? time : "0" + time);
            }
            return t;
        },
        timer(t) {
            if (window.timer1) clearInterval(window.timer1);
            window.timer1 = setInterval(() => {
                for(let key  in this.categoriesList){
                    for(let j in this.categoriesList[key]){
                        if(this.categoriesList[key][j].next_closetime>0){
                            this.categoriesList[key][j].next_closetime--
                        }else{
                            this.getCategories();
                            return
                        }
                    }
                }
            }, 1000);
        },
    },
    components: {
        Flexbox,
        FlexboxItem,
    }
}
</script>
<style lang="less" scoped>
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }
    .game-play{
        height: 100%;
        background: #F3F4F5;
        padding-bottom: 3rem;
    }
    .infoHead {
        height: 1.2rem;
        line-height: 1.2rem;
        background: #fff;
    }
    .flex-demo {
        text-align: center;
        img {
            width: 0.25rem;
        }
    }
    .tickling {
        font-weight: 550;
        font-size: 0.45rem;
    }
    .floor{
        background: #fff;
        .rem(margin-bottom,20);
        .title{
            border-bottom: 1px solid#F3F4F5;
            position: relative;
            .rem(line-height,72);
            .rem(padding-left,50);
            .rem(font-size,32);
            font-weight: bold;
            color: #287BE1;
            &.pink-color{
                &::after{
                   background: #FB796B ; 
                }
            }
             &.blue-color{
                &::after{
                   background: #0CB6D9 ; 
                }
            }
             &.green-color{
                &::after{
                   background: #00B681 ; 
                }
            }
            &.maingreen-color{
                &::after{
                   background: #00B681 ; 
                }
            }
            &.golden-color{
                &::after{
                    background: #928151;
                }
            }
            &::after{
                content: '';
                .rem(width,6);
                .rem(height,40);
                .rem(border-radius,10);
                background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                position: absolute;
                .rem(left,30);
                .rem(top,16);
            }
        }
        .list{
            .rem(padding-left,20);
            .rem(padding-right,20);
            .rem(padding-top,20);
            li{
                width: 32%;
                border: 1px solid #E4E3E3;
                .rem(font-size,26);
                color: #555; 
                .rem(border-radius,18); 
                .rem(margin-right,10); 
                .rem(margin-bottom,20); 
                text-align: center;
                padding: 0.35rem 0 0 0;
                height: 1.5rem;
                &:nth-child(3n+0){
                    margin-right: 0;
                }
                &.skin-btn-pink,&.skin-btn-blue,&.skin-btn-green{
                    .time{
                        color: #fff !important;
                    }
                }
                &.lessPadding{
                   padding: 0.15rem 0 0 0; 
                }
                .time{
                    display: block;
                    .rem(font-size,24);
                    .rem(height,20);
                    color: #1486FF;
                }
                 &.active{
                    color: #fff;
                   background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                   .time{
                       color: #fff;
                   }
                }
            }
            .list-golden{

            }
        }
        &.floor-golden{
            background: #1F252C;
            .title{
                border-bottom: 1px solid #5C564D;
                
            }
            li{
                color: #CECECE;
                background: #464B53;
                border: 1px solid #464B53;
                &.skin-btn-golden{
                    background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
                    color: #A85100 !important;
                    .time{
                        color: #A85100 !important;
                    }
                }
            }
        }
    }
    
    
</style>
