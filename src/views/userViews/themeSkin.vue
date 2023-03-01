<template>
  <div class="themeSkin">
    <flexbox class="infoHead" :class="$st.state.skin==5?'goldenHeader':''">
      <flexbox-item :span="1 / 10"
        ><div
          @click="fanhui()"
          class="flex-demo"
          style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img v-if="$st.state.skin==5" src="../../assets/images/skin/golden/goBack.png" alt="" />
          <img v-else src="../../assets/images/gray-back-icon.png" alt="" />
          </div
          ></flexbox-item>
      <flexbox-item
        ><div class="flex-demo  tickling">{{$t('themeSkin.text[0]')}}</div></flexbox-item
      >
      <flexbox-item :span="1 / 10"><div class="flex-demo"></div></flexbox-item>
    </flexbox>
    <myScroll :bgColor="$st.state.skin==5?'1F252C':'f5f7fa'" :bottom="0">
      <div class="skin-box clearfix" v-if="skinList.length">
        <div class="skin fl" v-for="(v,index) in skinList" :key="index" @click="getselect(index,v.id,v)">
          <span class="skin-bg"
            ><img v-lazy="v.cover" alt=""
          /></span>
          <p class="curr-user" v-show="index1 == v.id">
            <span class="skin-win" v-show="index1 == v.id"
            ><img src="../../assets/images/skin/select.png" alt=""
          /></span>
          <span class="skin-now" style="padding-left:.6rem" >{{$t('themeSkin.text[1]')}}</span>
          </p>
          <span class="skin-kind">{{v.id |filterSkinName(lanCode)}}</span>
          <span class="skin-num" v-if="v.type!='default'">{{v.users}}</span>
          <span class="skin-num" v-if="v.type=='default'">{{$t('themeSkin.text[5]')}}</span>
        </div>      
      </div>
      <div class="skin-box clearfix" v-if="!skinList.length">
        <div class="skin fl no-skin"></div>
        <div class="skin fl no-skin"></div>
      </div>
    </myScroll>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
import myScroll from "../../components/myScroll";
import {mapState, mapMutations } from "vuex";
export default {
  name: "themeSkin",
  components: {
    Flexbox,
    FlexboxItem,
    myScroll
  },

  data() {
    return {
      select: 0,
      select1: false,
      index1: 0,
      skinList:[{
        cover: require("../../assets/images/skin/theme-color.png"),
        id: 0,
        name: "默认颜色",
        nameVin:this.$t('themeSkin.text[0]'),
        type: "default",
        users: 95,
      },{
        cover: require("../../assets/images/skin/pink.png"),
        id:1,
        name: "樱花粉",
        nameVin:this.$t('themeSkin.text[2]'),
        type: "pink",
        users: 119,
      },{
        cover: require("../../assets/images/skin/blue.png"),
        id: 2,
        name: "水川蓝",
        nameVin:this.$t('themeSkin.text[3]'),
        type: "blue",
        users: 115,
      },{
        cover: require("../../assets/images/skin/green.png"),
        id: 3,
        name: "青草绿",
        nameVin:this.$t('themeSkin.text[4]'),
        type: "green",
        users: 195,
      },{
        cover: require("../../assets/images/skin/maingreen.png"),
        id: 4,
        name: "翡翠绿",
        nameVin:this.$t('themeSkin.text[6]'),
        type: "maingreen",
        users: 256,
      },
      {
        cover: require("../../assets/images/skin/golden.png"),
        id: 5,
        name: "黑",
        nameVin:this.$t('themeSkin.text[6]'),
        type: "golden",
        users: 232,
      }
    ]
    };
  },
  computed: {
    ...mapState([
      "skin","skinData","skinListStore","lanCode"
    ])
    
  },
  mounted () {
    // this.getSkin();
  },
  created () {
    this.index1 = this.skin;
    if(this.skinListStore.length){
      this.skinList = this.skinListStore;
    }
  },
  filters:{
    filterSkinName(id,lanCode){
      let name = ''
     if(lanCode==1){
        if(id==0){
        name = "Màu chủ đề"
      }else if(id==1){
        name = "Màu hoa anh đào"
      }else if(id==2){
        name = "Màu xanh lam"
      }else if(id==3){
        name = "Màu xanh lá"
      }else if(id==4){
        name = "Màu xanh ngọc bích"
      }else if(id==5){
        name = "Đêm vàng"
      }
     }else if(lanCode==2||lanCode==5){
        if(id==0){
        name = "theme color"
      }else if(id==1){
        name = "sakura color"
      }else if(id==2){
        name = "blue"
      }else if(id==3){
        name = "green"
      }else if(id==4){
        name = "maingreen"
      }else if(id==5){
        name = "Night Gold"
      }
     }
      return name;
    }
  },
   beforeRouteEnter (to, from, next){
          next(vm => {
            // 通过 `vm` 访问组件实例,将值传入fromPath
            vm.fromPath = from.path
            // console.log('00',vm.fromPath)
          })
        },
  methods: {
    ...mapMutations([
      'SETSKINDATA','SETSKINDATA1','SETSKINLIST','SETHOMEGAME'
    ]),
    getSkin(id){
      if(this.skinData.length) return this.skinList = this.skinData;
      this.$http
        .get("/api/common/get_skin_list/", {
          params:id
        }).then(res=>{
          if(res && res.data.code == 1){
            this.skinList = res.data.data
            this.SETSKINDATA1(this.skinList);
          }        
        }).catch(err=>{console.log(err)})
    },
    getselect(index,id,v){

      this.SETSKINDATA(id);
      this.SETHOMEGAME([])
      this.index1 = id ;
      this.skinList[index].users = v.users-0+1;
      this.$router.push('/member')
      // console.log(this.skinList)
      this.SETSKINLIST(this.skinList);
    },
    fanhui(){
       if(this.fromPath.indexOf('/xz')>-1){
          this.$router.go(-1);
        }else{
            this.$router.push('/member');
        }
    }
  }
};
</script>

<style scoped lang="less">
.themeSkin {
  background-color: #f5f7fa;
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
.skin-box {
  color: #fff;
  width: 92%;
  margin: 0 auto;
  // width: 96%;
  // margin-left: 0.4rem;
  a{
    color: #fff;
    height: 100%;
    width: 100%;
    display: block;
  }
  .curr-user{
    position: absolute;
    top: 0.4rem;
    left: 0.27rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: .5rem;
    width: 3rem;
    height: .6rem;
    line-height: .6rem;

  }
}
.skin-bg{
  img{
    height: 100%;
    width: auto;
  }
}
.no-skin{
  background: #eee;
  height: 213px;
}
.skin {
  position: relative;
  border-radius: 5px;
  width: 47.826%;
  // margin-top: 0.4rem;

  // width: 45.83%;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
  margin-bottom: -0.7%;
  height: 4.6rem;
  overflow: hidden;
  &:nth-of-type(2n){
    margin-right: 0;
  }

  .skin-win { 
    position: absolute;
    width: .4rem;
    top: 0.1rem;
    left: 0.1rem;
  }
  .skin-now {
    // position: absolute;
    // left: 10%;
    // top: 0.4rem;
    // left: 0.8rem;
  }
  .skin-now1 {
    display: none;
    width: 0 !important;
  }
  .skin-kind {
    display: block;
    position: absolute;
    bottom: 1.12rem;
    left: 0.27rem;
    font-weight: bold;
    font-size: 0.36rem;
    font-family: "PingFang-SC-Bold";
  }
  .skin-num {
    position: absolute;
    bottom: 0.27rem;
    left: 0.27rem;
    background: rgba(0, 0, 0, 0.1);
    height: 0.59rem;
    line-height: 0.59rem;
    padding: 0 0.27rem;
    border-radius: 40px;
    font-family: "PingFang-SC";
  }
}
</style>
