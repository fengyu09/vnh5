<template>
  <div class="video-more">
      <header :class="skin==5?'goldenHeader':''">
          <i class="back-icon" @click="goBack()"></i>
          <span>{{$t('videoMore.text[0]')}}</span>
          <i class="search-icon" @click="$router.push('/searchVideo')"></i>
      </header>
      <div class="more-menu" :class="skin==5?'menu-golden':''">
          <div class="menu1" >
              <span :class="[{active:menuActive==item.typeId},{'pink-color':skin==1&& menuActive==item.typeId},{'green-color':skin==3&&menuActive==item.typeId},{'maingreen-color':skin==4&&menuActive==item.typeId},{'blue-color':skin==2&&menuActive==item.typeId}]" v-for="(item,index) in videoTopMenu" v-if="index<4" :key="index" @click="changeMenuActive(item)">{{item.name}}</span>
              <i v-if="isFl" :class="{moreActive:moreActive}" @click="moreActive=!moreActive;openMenu=!openMenu"></i>
          </div>
          <div class="menu2">
              <span :class="[{active:menuActive2==item.column},{'pink-bg':skin==1&& menuActive2==item.column},{'green-bg':skin==3&&menuActive2==item.column},{'maingreen-bg':skin==4&&menuActive2==item.column},{'blue-bg':skin==2&&menuActive2==item.column}]" v-for="(item,index) in videoMenu2" :key="index" @click="changeMenu2(item)">{{item.name}}</span>
          </div>
      </div>
<!--      全部分类-->
      <div class="allFl-box" :class="skin==5?'allFl-box-golden':''">
          <myScrollX v-if="allFl.length" >
              <div class="menu3 clearfix preview-list" ref="personTab">
<!--                  <span>全部分类</span>-->
<!--                  <div  v-for="(item,index) in allFl" :key="index" :data-id="item.id" @click="menuActive3=item.id" :class="{active:menuActive3==item.id}">-->
                  <div  v-for="(item,index) in allFl" :key="index" @click="changeLtype(item)" 
                  :class="[{active:menuActive3==item.id},{'pink-bg':skin==1&&menuActive3==item.id},{'green-bg':skin==3&&menuActive3==item.id},{'maingreen-bg':skin==4&&menuActive3==item.id},{'blue-bg':skin==2&&menuActive3==item.id},{'golden-bg':skin==5&&menuActive3==item.id}]" 
                  v-if="item.typeId==menuActive">
                      <span >{{item.name}}</span>
                  </div>
              </div>
          </myScrollX>
      </div>
      <myScroll
            ref="scrollWrapper"
            :probeType="2"
            :top="$st.state.skin==5?'3.8':'4.2'"
            :bottom="0"
            :data="playList"
            :isUp="isUpFlag"
            :isloadUp="isLup"
            v-on:func="reLoad"
            :bgColor="$st.state.skin==5?'1F252C':''"
          >
       <div class="video-main">
        <div class="video-box">
            <div class="video-list">
                <div class="list-item" v-for="(item,index) in moreList" :key="index" @click="toPlay(item)">
                    <div class="item-img">
                        <div class="img-box" style="background: #f5f5f5">
                            <img v-lazy="item.cover" alt="">
                        </div>
                        <div class="video-describe">
                            <div>
                                <i><img src="../../assets/images/video/bf-icon.png" alt="" srcset=""></i> <span>{{item.reads | filterOnlineNum}}</span>
                            </div>
                            <div>
                                <span>{{item.play_time | filterSecond}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-name">
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
            <p style="text-align: center" v-if="isloadingMovie&&!moreList.length">{{$t('videoMore.text[1]')}}</p>
            <div v-if="!moreList.length&&!isloadingMovie" class="no-video-tip">
                <img src="../../assets/images/video/no_video_icon.png" alt="">
                <p style="text-align: center">{{$t('videoMore.text[2]')}}</p> 
            </div>
            
        </div>
       </div>
          <p class="no-data-tip" v-if="deadline&&!isLoading&&moreList.length&&moreList.length>moreData.perPage">{{$t('videoMore.text[3]')}}</p>
     </myScroll>
      <myScroll
              ref="scrollWrapper2"
              :top="2"
              :bottom="0"
              :bgColor="$st.state.skin==5?'1F252C':''"
              v-show="openMenu"
      >
          <div class="more-menu-list" :class="skin==5?'more-menu-golden':''">
              <div class="menu-gc" v-for="(item,key) in videoMenu" :key="key" >
                  <div class="list-title"> <i :class="[{'blue-bg':skin==2},{'green-bg':skin==3},{'maingreen-bg':skin==4},{'golden-bg':skin==5},{'pink-bg':skin==1}]"></i> {{item.name}}</div>
                  <div class="menu-list">
                      <span v-for="(v,index) in item.children" :class="[{'active':menuActive3==v.id },{'skin-border-blue':skin==2},{'skin-border-green':skin==3},{'skin-border-maingreen':skin==4},{'skin-border-pink':skin==1},{'skin-border-goledn':skin==5}]" :key="index" @click="changeType($event,item,v)">{{v.name}}</span>
                      <!-- <span v-for="(v,index) in item.children" :class="[{'active':menuActive3==v.id }]" :key="index" @click="changeType($event,item,v)">{{v.name}}</span> -->
                  </div>
              </div>

          </div>
      </myScroll>
 <div class="look-remind" v-show="showRemind">
     <div class="remind-box">
        <div class="title">{{$t('videoMore.text[4]')}}</div>
        <div class="confirm-btn" @click="$router.push('/login')">{{$t('videoMore.text[5]')}}</div>
        <div class="cancel-btn" @click="testLook()">{{$t('videoMore.text[6]')}}</div>
        <div class="closeBtn" @click="showRemind=false"></div>
     </div>
 </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {removeAllactive} from '../../assets/js/public.js'
import { setToken,getToken } from '../../store/cookie';
export default {
     name:'videoHome',
    data(){
        return{
            isNew:0,//,
            nNum: 0,
            openMenu:false,//是否显示下拉菜单
            moreActive:false,//下拉按钮是否选中
            menuActive:'',//当前选中大分类
            menuActive2:'updated',//当前中最新
            menuActive3:0,//当前选中小分类
            videoMenu2:[{name:this.$t('videoMore.text[7]'),column:'updated'},{name:this.$t('videoMore.text[8]'),column:'reads'},{name:this.$t('videoMore.text[9]'),column:'praise'}],
            allFl:[],//全部分类
            showRemind:false,
            videoMenu:{},//下拉分类列表
            videoTopMenu:[],//头部大分类菜单
            isFl:false,
            moreList:[],//更多数据列表
            isloadingMovie:true,
            isUpFlag:true,/////
            isNotMore:false,
            isLup:false,
            isMorePage:false,
            deadline:false,
            isLoading:false,
            playList:{},
            moreData:{
                column:'updated',
                tag:'',
                typeId:1,
                page:1,
                cid:8,
                limit:30,
                code:this.defalutLan
            },
            currClick:{},
            lastRoute:''
        }
    },
    components:{
        
    },
    filters:{
        filterMenuClass(n){
            let c = "";
            switch (n) {
                case "Tác phẩm chất lượng":
                    c="menu-gc";
                    break;
                case "Cấp 3":
                    c="menu-sj";
                    break;
                case "Âu Mĩ":
                    c="menu-om";
                    break;
                case "Trung Quốc":
                    c="menu-rh";
                    break;
                case "phim hoạt hình":
                    c="menu-dm";
                    break;
                default:
                    break;
            }
            return c;
        }
    },
     computed: {
    ...mapState([
      "codeToken",
      "skin",
      "hcData",
      "defalutLan"
    ])
  },
    created(){
         this.getFl();
      
    },
    watch:{
        moreList:function(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                },20)

            })
        },
        allFl: function() {
            this.$nextTick(() => {
                this.ScrollX();
            });
        },
        //小分类改变
        menuActive3:function (n) {
            this.moreData.cid = n-0;
            this.moreData.page = 1;
           
        },
        //最新改变
        menuActive2:function (n) {
            this.moreData.column = n;
            this.moreData.page = 1;
        },
        //大分类改变
        menuActive:function (n) {
            this.moreData.typeId = n;
            this.moreData.page = 1;
             this.$nextTick(() => {
                this.ScrollX();
            });
        }
    },
    methods:{
         ...mapMutations(["SETPOSITIONY","SETHCDATA"]), 
        goBack(){
            this.$router.history.go(-1)
            localStorage.setItem('currType',1)
        },
         //
        changeMenu2(item){
            this.menuActive2=item.column;
            this.moreData.column = item.column;
            // this.$router.push('/videoMore/'+this.menuActive+'/'+this.menuActive3);
            this.getMoreList(item.column,this.moreData.cid,this.moreData.typeId);
            this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
        },
        // 大分类改变
         changeMenuActive(item){
           this.menuActive = item.typeId-0;
             this.moreData.typeId = item.typeId-0;
             this.moreData.cid = null;
             this.menuActive3 = null;
             this.moreData.page = 1;
             this.moreActive = false;
             this.openMenu = false;
             this.getMoreList(this.moreData.column,this.moreData.cid,item.typeId-0);
             this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
         },
        //小分类改变
        changeLtype(item){
            this.menuActive3 = item.id-0;
            this.menuActive = item.typeId-0;
            this.moreData.cid = item.id;
            this.moreData.page = 1;
            this.getMoreList(this.moreData.column,item.id,this.moreData.typeId);
            this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
        },
        ScrollX() {
            let all = document.querySelectorAll('.menu3>div');
            let sum = 0;
            for(let i=0,len=all.length;i<len;i++){
                sum +=(all[i].offsetWidth+16);
            }
            sum=sum+16
            let one = document.querySelector('.menu3>div.active');
            this.$refs.personTab.style.width = sum + "px";
        },
        changeMenu(item,index){
            this.menuActive=index;
            this.openMenu = false;
        },
        changeType(e,item,v){
            //改变样式
            let curr = e.currentTarget;
            removeAllactive(document.querySelectorAll('.menu-list>span'));
            if(this.skin == 7){
                curr.classList.add('uefa-active');
                // console.log(111)
            }else if(this.skin==5){
                curr.classList.add('sdj-active');
            }else{
                 curr.classList.add('active');
            }
            this.moreActive=!this.moreActive;
            this.moreData.cid = v.id-0;
            this.moreData.page = 1;
            this.moreData.typeId = item.id-0;
            //this.$router.push('/videoMore/'+item.id+'/'+v.id);
            this.menuActive3 = v.id;
            let index = this.allFl.findIndex((value,index)=>{
                return value.id == v.id;
            })
            let one = document.querySelectorAll('.menu3>div')[index];
            let left = 0;
           
            this.openMenu=!this.openMenu;
             this.menuActive=item.id
            //重新请求数据
             this.getMoreList();
        },
        async getInitData(){
            this.moreData.cid = this.$route.params.cid;
            this.moreData.typeId = this.$route.params.typeId;
            this.menuActive3 = this.$route.params.cid;
            this.menuActive = this.$route.params.typeId;
            this.moreData.code = this.defalutLan;
            setToken('typeId',this.moreData.typeId);
            setToken('column',this.moreData.column);
            if(this.moreData.cid) setToken('cid',this.moreData.cid)
            else setToken('cid','0')
             let d = this.globalPpproach.checkIsEncrypt(this.moreData)
            let res = await this.$http.post('/api/live/movie/MostSeries/',this.moreData);
            // console.log(res)
            this.isloadingMovie = false;
            if(res && res.data.code==1){
                this.moreList = res.data.data.list || [];
                this.SETHCDATA({name:this.moreData.typeId+this.moreData.column+(this.moreData.cid?this.moreData.cid:'0'),data:this.moreList})
                this.playList.moreList = this.moreList;
                this.$refs.scrollWrapper.Myscroll.scrollTo(0,0);
            }else {
                this.$vux.toast.text(res.data.msg, 'middle');
            }
        },
        //获取更多
        async getMoreList(col,c,tid){
            // console.log(col,c,tid)
            //初始化
            let cid = '';
            let typeId = '';
            let column = "";
            if(col||c||tid){
                 cid = c;
                 typeId = tid;
                 column = col;
            } else if(getToken('typeId')){
                this.menuActive3 = getToken('cid');
                this.menuActive = getToken('typeId');
                this.menuActive2 = getToken('column');
                cid = getToken('cid');
                typeId = getToken('typeId');
                column = getToken('column');
             }else{
                this.menuActive3 = this.$route.params.cid;
                this.menuActive = this.$route.params.typeId;
                cid = this.menuActive3 ;
                typeId = this.menuActive;
                // column = this.moreData.column;
             }
            setToken('typeId',typeId);
            setToken('column',column);
             if(cid) setToken('cid',cid)
            else setToken('cid','0')
            // console.log(this.hcData[typeId+column+cid])
            if(this.hcData[typeId+column+cid]&&this.hcData[typeId+column+cid].length){
                this.isL=false;
                this.moreList = this.hcData[typeId+column+cid];
                this.playList.moreList = this.moreList;
                setTimeout(() => {
                this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                }, 200);
                return 
            } 
             this.isloadingMovie = true;
             let d = this.globalPpproach.checkIsEncrypt(this.moreData)
            let res = await this.$http.post('/api/live/movie/MostSeries/',this.moreData);
          
            this.isloadingMovie = false;
            if(res && res.data.code==1){
                //this.moreList = res.data.data || [];
                if(res.data.data.code == 0){
                    this.moreList = [];
                }else{
                    this.moreList = res.data.data;
                }
                this.SETHCDATA({name:typeId+column+cid,data:this.moreList})
                this.playList.moreList = this.moreList
            }else {
                this.$vux.toast.text(res.data.msg, 'middle');
            }
        },
        async getFl(){
            if(this.hcData.videoMenu&&this.hcData.videoMenu.length){
                this.isFl = true;
                this.videoMenu = this.hcData.videoMenu;
                this.menuActive = (getToken('typeId')?getToken('typeId'):this.$route.params.typeId) || this.videoMenu[0].id;
                for(let k in this.videoMenu){
                    this.videoTopMenu.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id});
                    for(let i=0,len=this.videoMenu[k].children.length;i<len;i++){
                        this.allFl.push({id:this.videoMenu[k].children[i].id,name:this.videoMenu[k].children[i].name,typeId:this.videoMenu[k].id})
                    }
                }
                return
            }
            let res = await this.$http.get('/api/live/movie/get_movie_sort/',{params:{code:this.defalutLan}}) ;
            if(res && res.data.code==1){
                this.isFl = true;
                this.videoMenu = res.data.data;
                this.menuActive = (getToken('typeId')?getToken('typeId'):this.$route.params.typeId) || this.videoMenu[0].id;
                for(let k in this.videoMenu){
                    this.videoTopMenu.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id});
                    for(let i=0,len=this.videoMenu[k].children.length;i<len;i++){
                        this.allFl.push({id:this.videoMenu[k].children[i].id,name:this.videoMenu[k].children[i].name,typeId:this.videoMenu[k].id})
                    }
                }
                // console.log(this.allFl)
            }
        },
        toPlay(v){
             if (!this.codeToken) {
                 this.showRemind=true;
                 this.currClick = v;
            }else{
              this.$router.push('/videoPlay/' + v.id);
            }
        },
        testLook(){
            this.$router.push('/videoPlay/'+ this.currClick.id);
        },
        async loadMore() {
            //判断是否有下一页
            if (this.isMorePage) return;
            //判断节流阀
            if (!this.isUpFlag) return;
            this.isLup = true;
            this.moreData.page++;
            let res = await this.$http.post("/api/live/movie/MostSeries/",this.moreData);
            this.isLup = false;
            if (res && res.data.code == 1) {
                if (res.data.data.length >= this.moreData.perPage) {
                    this.isMorePage = false;
                    this.isUpFlag = true;
                    this.deadline = false;
                } else {
                    this.isMorePage = true;
                    this.isUpFlag = false;
                    this.deadline = true;
                }
                this.moreList = this.moreList.concat(res.data.data);
                
                this.SETHCDATA({name:this.moreData.typeId+this.moreData.column+this.moreData.cid,data:this.moreList})
                this.playList.moreList = this.moreList;
                setTimeout(()=>{
                    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
                },20)
            }
        },
        reLoad(data,obj) {
            if (data == "down") {
                //this.refreshData(data)
            } else if (data == "up") {
                this.loadMore();
            } else if(data == 'end'){
                obj.name = this.$route.name;
                this.SETPOSITIONY(obj)
            }
        },
    },
    mounted() {
        
        //        到时候放App全局
        document.body.addEventListener(
            "touchmove",
            function(e) {
                e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
        );
        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        this.$refs.scrollWrapper.enable(); //启动滚动条
        this.$refs.scrollWrapper.disable(); //禁止滚动条
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{  //  这里的vm指的就是vue实例，可以用来当做this使用
            // console.log(to)
            // console.log(from.name)
            if(from.name =='movie'){
                vm.getInitData();
            }else{
                vm.getMoreList();
            }
            vm.lastRoute = from.name;
        })
  },
}
</script>

<style lang="less" scoped>
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
.video-more {
    header {
        position: relative;
        text-align: center;
        font-size: 0.42rem;
        line-height: 1rem;

        i.back-icon {
            position: absolute;
            .rem(width, 23);
            .rem(height, 42);
            background: url("../../assets/images/gray-back-icon.png") no-repeat center;
            background-size: contain;
            top: .2rem;
            left: .3rem;
        }

        i.search-icon {
            display: block;
            width: 0.53rem;
            height: 0.53rem;
            background: url("../../assets/images/video/video-serch2.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            right: 0.4rem;
            top: 0.25rem;
        }
        &.goldenHeader{
            border-bottom: 1px solid #cecece;
            i.search-icon{
                background: url("../../assets/images/skin/golden/serch.png") no-repeat;
            background-size: 100% 100%;
            }
            i.back-icon {
                background: url("../../assets/images/skin/golden/goBack.png") no-repeat  !important;
                background-size: 100% 100% !important;
            }
        }
    }

    .more-menu
    {
        letter-spacing: 1px;
        font-size: 0.4rem;

        > div {
            display: flex;
            margin: 0.36rem 0;
        }

        .menu1 {
            align-items: center;
            justify-content: space-around;

            span {
                font-weight: 500;
                .rem(font-size, 30);
                letter-spacing: 1px;
            }

            i {
                display: inline-block;
                width: 0.58rem;
                height: 0.4rem;
                background: url("../../assets/images/video/more1.png") no-repeat;
                background-size: 100% 100%;
            }

            .active {
                font-size: 0.42rem;
                color: #1486FF;
            }
        }

        .menu2 {
            font-size: 0.36rem;
            color: #333333;

            span {
                display: inline-block;
                .rem(font-size, 24);
                padding: .08rem .3rem .09rem .3rem;
                background: #F5F7FA;
                margin: 0 0.2rem;
                border-radius: 0.3rem;
                // letter-spacing: 2px;
            }

            .active {
                background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                color: #fff;
            }
        }
        &.menu-golden{
            background: #252A31;
            > div {
                display: flex;
                margin: 0 ;
                
            }
            .menu1{
                // margin: 0;
                padding: .32rem 0 .2rem 0;
                i{
                    background: url("../../assets/images/skin/golden/more.png") no-repeat;
                background-size: 100% 100%;
                }
                span{
                    color: #928151;;
                }
                .active {
                font-size: 0.42rem;
                color: #E3CF95;
            }
            }
            .menu2{
                padding: .1rem 0 .2rem 0;
                span{
                    background: #464B53;
                    color: #cecece;
                }
                .active{
                    background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%);
                    color: #A85100;
                }
            }
        }
      
    }

    .allFl-box {
        overflow: hidden;
       
        .menu3 {
            color: #666666;
            font-size: 0.36rem;
            padding: 0 0.15rem;

            > div {
                display: inline-block;
                padding: .07rem .3rem .085rem .3rem;
                border-radius: 0.3rem;
                .rem(margin-right,10);
                letter-spacing: 2px;
                &.active {
                    background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                    color: #fff;
                }
            }

            span {
                .rem(font-size, 24);
            }

        }
        &.allFl-box-golden{
            background: #252A31;
            padding: .15rem 0 .3rem 0;
            .menu3{
                >div{
                    background: #464B53;
                    color: #cecece;
                    &.active{
                        background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%);
                        color: #A85100;
                    }
                }
            }
        }
    }

    .video-main {
        padding: 0 0.266rem;
        // background: #F5F7FA;
        .video-box {
            .list-title {
                font-size: 0.42rem;
                position: relative;
                margin: 0.26rem 0;

                .list-name {
                    padding-left: 0.2rem;
                    position: relative;

                    &:before {
                        content: '';
                        display: block;
                        width: 0.08rem;
                        height: 0.4rem;
                        position: absolute;
                        background-color: #FD614B;
                        left: 0;
                        top: 0.09rem;
                    }
                }

                .lits-more {
                    color: #999999;
                    position: absolute;
                    right: 0;
                    top: 0.04rem;
                }
            }

            .video-list {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                .list-item {
                    box-shadow: 0px 5px 5px 0px rgba(102, 102, 102, 0.05);
                    border-radius: 6px 6px 0px 0px;
                    overflow: hidden;
                    margin-bottom: 0.35rem;
                    width: 2.93333333rem;

                    .item-name {
                        padding: 0.1rem;
                        .rem(font-size, 24);

                        span {
                            display: inline-block;
                            width: 95%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }

                    .item-img {
                        position: relative;

                        .img-box {
                            position: relative;
                            .rem(height, 300);
                            .rem(width, 220);
                            overflow: hidden;
                            text-align: center;
                             overflow: hidden;
                            img {
                                height: 130%;
                                width: auto;
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                            }
                        }

                        .video-describe {
                            display: flex;
                            width: 100%;
                            position: absolute;
                            bottom: 0.1rem;
                            justify-content: space-between;
                            padding: 0 0.15rem;
                            color: #fff;
                            .rem(font-size, 18);

                            img {
                                .rem(height, 22);
                                .rem(width, 22);
                                vertical-align: bottom;
                            }
                        }
                    }
                }

            }

            .change-list {
                text-align: center;
                color: #666666;
                font-size: 0.38rem;

                span {
                    padding: 0.1rem;
                }
            }
        }
    }

    .look-remind {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;

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

    .more-menu-list {
        background: #fff;
        font-size: 0.42rem;
        padding: .1rem .2rem 1rem 0.2rem;
        box-sizing: border-box;

        i {
            display: inline-block;
            width: 0.1rem;
            height: 0.4rem;
            background: #1486FF;
            float: left;
            margin-top: 0rem;
            margin-right: 0.1rem;
            border-radius: 0.1rem;
        }

        .list-title {
            margin: 0.4rem 0;
            .rem(font-size, 28)
        }

        .menu-list {
            /*display: flex; flex-wrap:wrap;justify-content: space-between;*/

            span {
                padding: 0.06rem 0.2rem;
                text-align: center;
                .rem(font-size, 24);
                border: 1px solid #1486FF;
                color: #666666;
                border-radius: 0.32rem;
                margin: 0.35em .2rem .1rem 0;
                display: inline-block
            }

            .active {
                background: #1486FF;
                color: #fff;
            }
            .uefa-active{
                background:linear-gradient(90deg,#5284ff,#4c61de)!important;
                color: #fff!important;
                border:solid 1px #5284FF!important;
            }
              .sdj-active{
                background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%)!important;
                color: #A85100!important;
                border:none!important;
            }
        }

        .menu-sj {
            i {
                background-color: #0048FF;
            }

            .menu-list {
                span {
                    border-color: #0048FF;
                }

                .active {
                    background: #0048FF;
                    color: #fff;
                }
            }
        }

        .menu-om {
            i {
                background-color: #C100D8;
            }

            .menu-list {
                span {
                    border-color: #C100D8;
                }

                .active {
                    background: #C100D8;
                    color: #fff;
                }
            }
        }

        .menu-rh {
            i {
                background-color: #FADA00;
            }

            .menu-list {
                span {
                    border-color: #FADA00;
                }

                .active {
                    background: #FADA00;
                    color: #fff;
                }
            }
        }
        .menu-dm{
            i {
                background-color: #FADA00;
            }

            .menu-list {
                span {
                    border-color: #05D700;
                }

                .active {
                    background: #05D700;
                    color: #fff;
                }
            }
        }
        &.more-menu-golden{
          background: #1F252C;
          .list-title{
            color: #CECECE;
          }
          span{
            color: #CECECE !important;
            background: #464B53 !important;
            border: 1px solid #464B53 !important;
          }
        }
    }
}
    .no-video-tip{
        text-align: center;
        margin: 0 auto;
        img{
            .rem(width,340);
            .rem(height,234);
            margin: 3rem auto 2rem;
        }
        p{
            .rem(font-size,24);
            
        }
    }
</style>