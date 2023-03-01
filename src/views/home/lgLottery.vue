<template>
    <div class="kyqp-container" :class="zjwg.list.length?'zjPlay-container':''">
        <header class="home-header clearfix">
            <div @click="goback()" class="back-icon"></div>
            <span>{{$route.meta.title}}</span>
            <router-link to='/kLotteryOne'>开奖中心</router-link>

        </header>
       <div class="game-container qp-container one-container">
            <h3 v-show="zjwg.list.length">最近玩过</h3>
            <myScrollX v-show="zjwg.list.length">
                <ul class="zj-list" ref="personTab2" :style="'width'+ulW+'px'">
                    <li v-for="(vv,index1) in zjwg.list" :key="index1" @click="goQp(vv)" :class="vv.type" :data-cid="vv.id">
                        <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                        <i class="close-icon"></i>
                        <div class="g-img" ><img v-lazy="vv.img_url" alt=""></div>
                        <p class="game-name" >{{vv.name}}</p>
                        <span>{{vv.remark}}</span>
                    </li>
                </ul>
            </myScrollX>
        </div>


        <van-tabs animated swipeable color="#1486FF" v-show="list.length">
            <van-tab v-for="(v,index) in list" :title="v.name" :key="index" >
                <myScroll :top="0.2" :bottom="0" style="height:15.4rem;" :ref="'scrollWrapper'+index" v-on:func="reLoad">
                    <div class="game-container">
                        <ul>
                            <li v-for="(vv,index2) in v.list" :key="index2" @click="goQp(vv)" :class="vv.type" :data-cid="vv.id">
                                <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                                <i class="close-icon"></i>
                                <div class="g-img" ><img v-lazy="vv.img_url" alt=""></div>
                                <p class="game-name" >{{vv.name}}</p>
                                <span>{{vv.remark}}</span>
                            </li>
                        </ul>
                    </div>
                </myScroll>
            </van-tab>
        </van-tabs>
               
           
    </div>
</template>

<script>
import { mapState } from "vuex";
import { removeAllactive } from "../../assets/js/public"
    export default {
        name: "info",
        components:{
            
        },
        data(){
            return {
                list:[ ],
                zjwg:{list:[]},
                ulW:'',
            }
        },
        filters:{
            filterTag(n){
                let tag = '';
                if(n=='NEW'){
                    tag = 'tag-new';
                }else if(n=='HOT'){
                    tag = 'tag-hot';
                }
                return tag;
            },
        },
        watch:{
            closeData:function(n,o){
                if(n&&n.length){
                    this.findClose(n)
                }
            },
            list: function() {
                this.$nextTick(() => {
                    this.ScrollX();
                    setTimeout(()=>{
                        // if(this.$store.state.scrollYPosition['curr']) this.currType = this.$store.state.scrollYPosition["curr"]
                        // console.log(this.$refs.scrollWrapper0)
                        // this.$refs.scrollWrapper0.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                    },50)
                });
            },
        },
        computed: {
            ...mapState(["closeData"])
        },
        created(){
            this.getHotGame();
        },
        methods:{
            findClose(d){
                let allLot = document.querySelectorAll('.lott');
                removeAllactive(allLot)
                for(let i=0,len=d.length;i<len;i++){
                    for(let j=0,lenj=allLot.length;j<lenj;j++){
                        if(allLot[j].dataset.cid==d[i].lotteryId){
                            allLot[j].classList.add('active');
                        }
                    }
                }

            },
             async getHotGame(flag) {
                  let allList = this.$store.state.gameCenterLgQp;
                  if(allList.length){
                      this.list = allList.slice(1,allList.length);
                      this.zjwg = allList[0];
                  }
                  
                if(allList.length==0) this.$vux.loading.show({text: 'Đang nhận...'});
                let res = await this.$http.get("/api2/user/all-games?style=1&type=lott");
                this.$vux.loading.hide();
                if (res.data && res.data.code == 1) {
                    this.$store.commit('SETGAMECENTERLGQP',res.data.data.list || [])
                    let all = res.data.data.list || [];
                    this.list = all.slice(1,all.length);
                    this.zjwg = all[0];
                    setTimeout(() => {
                    this.$refs.scrollWrapper0.Myscroll.refresh(); //重新计算高度，刷新滚动条
                }, 50);
                }
            },
            ScrollX(){
                let allzj = document.querySelectorAll('.game-container .zj-list li');
                let sum2 = 0;
                for(let i=0,len=allzj.length;i<len;i++){
                    // console.log(allzj[i].offsetWidth)
                    sum2 +=((allzj[i].offsetWidth)+15);
                }
                // console.log(sum2)
                this.ulW = sum2-0+10;
                this.$refs.personTab2.style.width = sum2-0+10 + "px";
            },
             goback(){
                this.$router.go(-1);
            },
             async goQp(item){
                if (!this.$store.state.userinfo.user_id) {
                    this.$popup();
                    return
                }
                this.$router.push('/betting/'+item.id)
            },
            reLoad(data,obj) {
               if(data=='end'){
                    obj.name = this.$route.name;
                    this.$store.commit('SETPOSITIONY',obj)
                    // console.log(obj)
                }
            },
        }
    }
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}

.home-header{
  .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
        position:relative;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }  
        a{
            position:absolute;
            right:.3rem;
            height: 100%;
            .rem(font-size,24);
            font-weight: normal;
        }
}
/deep/.van-tab--active{
    color: #1486ff!important;;
}
/deep/.van-tab{
    color: #6A86B9;
}
.one-container {
    padding-left:.3rem ;
    ul{
        li{
            width: 2.8rem;
        }
    }
}
.one-container .zj-list li{
    margin-right:15px;
}

</style>