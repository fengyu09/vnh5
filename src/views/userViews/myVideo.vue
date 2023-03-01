<template>
  <div class="main-search">
    <header class="home-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goBack" class="back-icon"></div>
        <span>{{$t('myVideo.text[0]')}}</span>

    </header>
     <div class="tab-title" :class="$st.state.skin==5?'tab-title-golden':''">
      <!-- <span :class="curIndex =='1'?'active':''" @click="tabType(1)">mua</span> -->
      <span :class="[{'active':$st.state.skin ==0&&curIndex =='2'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='2'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='2'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='2'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='2'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='2'}]" @click="tabType(2)">{{$t('myVideo.text[1]')}}</span>

      <span :class="[{'active':$st.state.skin ==0&&curIndex =='3'},{'skin-btn-pink':$st.state.skin ==1&&curIndex =='3'},{'skin-btn-blue':$st.state.skin ==2&&curIndex =='3'},{'skin-btn-green':$st.state.skin ==3&&curIndex =='3'},{'skin-btn-maingreen':$st.state.skin ==4&&curIndex =='3'},{'skin-btn-golden':$st.state.skin ==5&&curIndex =='3'}]" @click="tabType(3)">{{$t('myVideo.text[2]')}}</span>
    </div>
    <myScroll
           :isLoad="isL"
            :isUp="isUpFlag"
            :isloadUp="isLup"
            :isDown="false"
            :bottom="0"
            :top="$st.state.skin==5?2.6:3"
            :bgColor="$st.state.skin==5?'161C23':'fff'"
            ref="scrollWrapper1"
            :data="playList"
            v-on:func="reLoad"
    >
    <div class="search-result" :class="$st.state.skin==5?'search-result-golden':''">
        <ul class="guess-like-all" v-if="hotHost.length">
          <li class="like-item" v-for="(v,index) in hotHost" :key="index" @click="goPlay($event,v)">
            <div class="like-img"><img v-lazy="v.cover" alt=""></div>
            <div class="like-msg">
              <p class="like-title">
               {{v.title | filterTitle}}
              </p>
              <p class="play-tag"><i v-if="v.tag.length" v-for="(item,i) in v.tag.split(',')" :key="i">{{item}}</i>
               <span class="sc-icon" v-if="curIndex==2"><img src="../../assets/images/video/sc.png" alt=""></span>
               </p>
              <p><i class="play-icon"></i>{{v.reads | filterOnlineNum}} {{$t('myVideo.text[3]')}}</p>
            </div>
          </li>
        </ul>
       <p class="no-search" v-if="isLoading&&hotHost.length<=0">{{$t('myVideo.text[4]')}}</p>
       <!-- <p class="no-data-tip" v-if="deadline&&!isLoading&&allSize">Tôi cũng có giới hạn đó~</p> -->

    </div>
  </myScroll>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "search",
  data() {
    return {
      hotHost:[],
      isload: false,
      isLup: false, //是否显示 上拉加载更多的组件
      isUpFlag: true, //是否开启上拉加载更多 默认不开启
      isL: false, //是否显示 下拉刷新的组件
      isMorePage:false,//是否有下一页
      isLoading:false,
      playList:{},
      curIndex:2,
      page:1,
      limit:100000
    }
  },
  created() {
      this.curIndex = this.$route.query.type || 2;
      // this.search();

  },
  beforeRouteEnter (to, from, next){
  next(vm => {
    // 通过 `vm` 访问组件实例,将值传入fromPath
    vm.fromPath = from.path
    // console.log('00',vm.fromPath)
  })
},
  computed: {
    // myScroll,
    ...mapState(["userinfo"])
  },
  filters:{
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "万";
      }
      return n;
    },
    filterTitle(n){
      if(n.length>35){
      return n.substring(0,35)+'...'
      }else{
        return n
      }
    }
  },
  methods: {
    goBack(){
      if(this.fromPath=='/live'){
        this.$router.push('/live')
      }else{
          this.$router.push('/member')
      }
    },
    async qxSc(v){
      let d = this.globalPpproach.checkIsEncrypt({
             movie:v.moviesid
        })
      let res = await this.$http.post('/video/collect', {
           movie:v.moviesid //影片id
      });

      if (res && res.data.code == 1) {
        let index = this.hotHost.findIndex(value=>{
          return value.moviesid==v.moviesid
        })
        this.hotHost.splice(index,1);
        this.$vux.toast.text(res.data.msg,"middle")

    }else{
        this.$vux.toast.text(res.data.msg,"middle")
    }
  },
  reLoad(data,obj) {
      if (data == "down") {
        this.search(true);
      } else if (data == "up") {
        this.loadMore();
      }else  if(data=='end'){
        // console.log(obj)
        obj.name = this.$route.name;
        this.$store.commit('SETPOSITIONY',obj);
      }
    },
    tabType(t){
      this.curIndex = t;
      this.$router.push("/myVideo?type="+t);
    },
    goPlay(e,v){
      // if(this.curIndex==2){
      //   //收藏
      //   //观看历史
      // }else{
      //   //已经购买过的 可以直接看
      //   this.$router.push('/videoPlay/'+v.moviesid);
      // }
      // this.$router.push('/videoPlay/'+v.moviesid);
      //  console.log(e.target.className);
       if(e.target.className.indexOf('sc-icon')>-1){
         this.qxSc(v);
       }else{
         this.$router.push('/videoPlay/'+v.movie_id);
       }
      
    },
    async search(f){
       if(f){
        this.page = 1;
        this.isL = true;
      }
      let apiUrl = "";
      let obj = {
            page:this.page,
            limit:this.limit
      };
       if(this.curIndex==1){
          apiUrl = "video/buycollectList";
          obj.list_type=4 ;//已购买
      }else if(this.curIndex==2){
          apiUrl = "video/buycollectList";
          obj.list_type=5 ;//已收藏
      }else if(this.curIndex==3){
          apiUrl = "video/playHistory"
           obj.list_type=1 ;//已收藏
      }
      if(!f) this.hotHost = [];
      //搜索中
      this.isLoading = false;
      if(!f) this.$vux.loading.show({ text: this.$t('myVideo.text[5]')});
      let res = await this.$http.get('/api/live/movie/movie_list_type/',{params:{
         page:this.page,
        limit:this.limit,
        list_type:obj.list_type
      }});
      this.isLoading = true;
      this.isL = false;
      this.$vux.loading.hide();
      if(res && res.data.code==1){
        if (res.data.data.length >= this.limit) {
          this.isMorePage = true;
          this.isUpFlag = true;
          this.deadline = false;
        } else {
          this.isMorePage = false;
          this.isUpFlag = false;
          this.deadline = true;
        }
        this.hotHost = res.data.data || [];
      }
    },
      async loadMore() {
      //判断是否有下一页
      if (!this.isMorePage) return;
      //判断节流阀
      if (!this.isUpFlag) return;
      this.isLup = true;
      this.page++;

      let apiUrl = "";
      let obj = {
            page:this.page,
            limit:this.limit
      };
      if(this.curIndex==1){
          apiUrl = "video/buycollectList";
          obj.list_type=4 ;//已购买
      }else if(this.curIndex==2){
          apiUrl = "video/buycollectList";
          obj.list_type=5 ;//已收藏
      }else if(this.curIndex==3){
          apiUrl = "video/playHistory"
           obj.list_type=1 ;//已收藏
      }

     let res = await this.$http.get('/api/live/movie/movie_list_type/',{params:{
         page:this.page,
        limit:this.limit,
        list_type:obj.list_type
      }});
      this.isLup = false;
      if (res && res.data.code == 1) {
        this.hotHost = this.hotHost.concat(res.data.data||[]);
        if (res.data.data.length >= this.limit) {
          this.isMorePage = true;
          this.isUpFlag = true;
          // this.deadline = false;
        } else {
          this.isMorePage = false;
          this.isUpFlag = false;
          // this.deadline = true;
        }
        setTimeout(()=>{
          this.$refs.scrollWrapper1.refresh(); //重新计算高度，刷新滚动条
        },20)

      }else{
        this.isMorePage = false;
        this.isUpFlag = false;
        // this.deadline = true;
      }
    },
  },
  mounted() {},
  watch:{
    curIndex:function(){
      this.search();
    },
     hotHost:function(){
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.$refs.scrollWrapper1.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
            },20)

        })
    }
  }
};
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
      .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }
.main-search{
  .guess-like-all{
    // padding: 0 .3rem;
    padding-bottom: 20px;
    >li{
      display: -webkit-box;
      box-align: center;
      border-bottom: 1px solid #eee;
      padding-bottom:.2rem;
      .rem(margin-top,20);
      .like-img{
        .rem(width,240px);
        .rem(height,140px);
        background: #eee;
        .rem(border-radius,6);
        overflow: hidden;
      }
      .like-msg{
        box-flex: 1;
        flex: 1;
        .rem(margin-left,20);
        >p{
          
          .rem(font-size,18);
        }
        .like-title{
          .rem(font-size,24);
          color: #445779;
          .rem(line-height,30);
        }
        .play-tag{
          .rem(font-size,18);
          
          padding: .2rem 0 .2rem 0;
          >i{
            border:1px solid rgba(153,153,153,1);
            border-radius:3px;
            padding: .01rem .1rem;
            margin-left: .1rem;
          }
          .sc-icon{
            display: inline-block;
            .rem(width,50);
            .rem(height,30);
            img{
              .rem(width,20);
              .rem(height,17);
            }
          }
        }
        .play-icon{
          display: inline-block;
          .rem(width,20);
          .rem(height,20);
          background: url("../../assets/images/video/play_icon.png") no-repeat;
          background-size: contain;
          margin-right: .1rem;
          vertical-align: middle;
        }
      }
    }
  }

  .no-search{
    text-align: center;
    color: #666;
    padding: 1rem 0;
  }
}

//   .tab-title{
//     .rem(height,110);
//     background: #fff;
//     overflow: hidden;
//     box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.03);
//     span{
//       .rem(width,210);
//       .rem(height,64);
//       .rem(line-height,64);
//       .rem(font-size,28);
//       text-align: center;
//       color: #445779;
//       float: left;
//       background: #f5f7fa;
//       .rem(border-radius,30);
//       .rem(margin-left,30);
//       .rem(margin-top,16);
//       &.active{
//         color: #fff;
//             background: linear-gradient(
// 90deg
// , #1486FF 0%, #4BA1FF 100%);
//       }
//     }
//   }
  .search-result{
    padding: .3rem;
    &.search-result-golden{
      .like-item{
        border-bottom: 1px solid #5C564D
      }
      .like-title,i,p{
        color:#cecece !important;
      }
    }
  }
</style>
