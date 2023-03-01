<template>
    <div class="preferential">
    <div class="header" :class="[{'header-kj':isNew==0},
                    {headerbg:isNew==1},
                    {'header-dw':isNew==2},
                    {'header-qrj':isNew==3},
                    {'header-gq':isNew==4},
                    {'header-sdj':isNew==5},
                    {'header-ox':isNew==6},
                    {'header-uefa':isNew==7},
                    {'whiteColor':isNew==2 || isNew==3|| isNew==4}
                    ]">
      <!-- <div @click="$router.go(-1)" style="padding: 0.1rem 0.2rem;margin-left: -0.2rem;">
        <i class="go-back"></i>
      </div> -->
      <div >
        <h3>优惠活动</h3>
      </div>
    </div>
    <div class="yh-menu">
         <myScrollX >
        <ul :style="{width:menuList.length*1.76+'rem'}">
            <li  v-for="(item,index) in menuList" :class="[{active:menuIndex==item.type && isNew == 0},
            {'active-uefa':menuIndex==item.type && isNew == 7},
            {'active':menuIndex==item.type && isNew == 1},
            {'active-dw':menuIndex==item.type && isNew == 2},
            {'active-qrj':menuIndex==item.type && isNew == 3},
            {'active-gq':menuIndex==item.type && isNew == 4},
            {'active-sdj':menuIndex==item.type && isNew == 5},
            {'active-ox':menuIndex==item.type && isNew == 6},
            ]" 
            :key="index" @click="menuIndex=item.type">
                <span>{{item.name}}</span>
            </li>
        </ul>
         </myScrollX >
    </div>
    <div class="yh-content">
    <myScroll
      ref="scrollWrapper"
      :probeType="2"
      :top="2.6"
      :isDown="true"
      v-on:func="reLoad"
      :left="0"
      :bottom="1.4"
      bgColor='f7f7f7'
    >
        <ul v-if="dataList.length" class="">
            <li v-for="(item,index) in dataList" :key="index" @click="yhdetail(item)">
                <span> <i :style="item.ishot == 1 ?'color:#60353D':'color:#fff'"> {{item.type_text}}</i><img :src="item.type_icon" alt=""></span>
                <img :src="item.cover" alt="" srcset="" >
            </li>
        </ul>
        <div v-else style="text-align: center;font-size: 0.38rem;margin-top: 0.5rem;">
            <span>暂无当前优惠~</span>
        </div>
    </myScroll>
    </div>
     <Foot />
    </div>
</template>
<script>
import myScroll from "../../components/myScroll.vue";
import myScrollX from "../../components/myScrollX.vue"; //横向滚动
import Foot from "../../components/footer.vue";
import {  mapMutations,mapState } from "vuex";
export default {
    name:'preferential',
    data(){
        return{
            menuList:['全部优惠','全部优惠','全部优惠','全部优惠','全部优惠',],
            menuIndex:0,
            dataList:[],
            yhListData:[],
            typeIndex:0,
            isNew: 0, //皮肤状态
        }
    },
    components:{
        myScroll,
        Foot,
        myScrollX
    },
     computed: {
            ...mapState(["skin" ])
        },
    watch:{
        menuIndex:function(type){
            // this.getYhList()
            if(type==0) return this.dataList = this.yhListData
            let arr = [];
            for(let i=0,len=this.yhListData.length;i<len;i++){
                 if(this.yhListData[i].type==type){
                     arr.push(this.yhListData[i])
                 }   
            }
             this.dataList=arr;
        },
        dataList:function(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.$refs.scrollWrapper.Myscroll.scrollTo(0,this.$store.state.scrollYPosition[this.$route.name]?this.$store.state.scrollYPosition[this.$route.name]:0);
                },20)

            })
        }
    },
    created(){
        this.isNew = this.skin; //皮肤
        this.dataList = this.$store.state.yhList.data || [];
        if(this.dataList.length){
             this.yhListData = this.dataList;
             this.menuList= this.$store.state.yhList.typeList;
        }else{
            this.getYhList();
        }
        
    },
    methods:{
        ...mapMutations([ "SETPOSITIONY","SETYHDATA"]),
        getYhList(type){
            this.$vux.loading.show();
             this.$http.get(this.versionLive2+'live/get_activity_list/',{
             params:{
                //  type:this.menuList[this.menuIndex].type==undefined?0:this.menuList[this.menuIndex].type,
                type:type||this.menuIndex,
                 client_type:3,
                 api:this.noticeType==1?1:5,
                 page:1,
                 limit:100
             }
         }).then(res=>{
             if(res&&res.data.code==1){
                 this.menuList=res.data.typeList;
                 this.dataList=res.data.data||[];
                 this.yhListData = res.data.data||[];
                 this.SETYHDATA(res.data||[]);
             }
             this.$vux.loading.hide();
         })
        },
        yhdetail(item){
            if(item.action==1){
            window.localStorage.setItem('yhDetail',JSON.stringify(item))
            this.$router.push('yhDetail')
            }else{
                window.open(item.address) 
            }
        },
        reLoad(data,obj) {
            if(data=='end'){
                obj.name = this.$route.name;
                this.SETPOSITIONY(obj)
            }else if (data == "down") {
                this.getYhList('0');
                this.menuIndex = 0;
             }
        },
    }
}
</script>
<style lang="less" >
.rem(@name,@px){
  @{name}:unit(@px/75,rem)
}
.preferential{
    .header {
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.346rem;
    .go-back {
      display: block;
      width: 0.26rem;
      height: 0.48rem;
      background: url("../../assets/images/gray-back-icon.png") no-repeat;
      background-size: cover;
    }
    h3 {
      font-weight: 550;
      font-size: 0.45rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .yh-menu{
      overflow: hidden;
      margin-top: 1.2rem;
      ul{
          display: flex;
          height:1.2rem;
          justify-content: space-around;
          li{font-size: 0.36rem;height: 1rem;line-height: 1rem;}
          .active,.active-uefa,.active-qrj,.active-sdj,.active-ox,.active-dw,.active-gq {
              position: relative;
              font-size: 0.4rem;
              color: #F7423DFF;
              font-weight: bold;
              &:before{
                  content: '';
                  display: inline-block;
                  position: absolute;
                  width: 80%;
                  height: 4px;
                  background: #F7423DFF;
                  border-radius: 2px;
                  bottom: 0;
                  left: 10%;
              }
          }
          .active-uefa{
              color: #5284FF;
              &:before{
                background: #5284FF;
              }
          }
          .active-dw{
              color: #8EB917;
              &:before{
                background: #8EB917;
              }
          }
          .active-qrj{
              color: #7E26F2;
              &:before{
                background: #7E26F2;
              }
          }
          .active-sdj{
              color: #94EFFF;
              &:before{
                background: #94EFFF;
              }
          }
          .active-ox{
              color: #ee3c1a;
              &:before{
                background: #ee3c1a;
              }
          }
          .active-gq {
              color: #e99c00;
              &:before{
                background: #e99c00;
              }
          }
      }
  }
  .yh-content{
      ul{
          background: #f7f7f7;
          li{
              margin-bottom: 0.1rem;
              text-align: center;
              >img{width: 97.3%;}
              position: relative;
              span{
                  display: block;
                  position: absolute;
                  left: 3%;
                  top: -0.1rem;
                  .rem(width,120);
                  .rem(height,53);
                  i{  display: block;
                      position: absolute;
                      top: 0.1rem;
                      left: 15%;
                      color:#fff;
                      .rem(font-size,20);
                      font-style: italic!important;
                    //   font-style: oblique;
                  }
              }
          }
      }
  }
}
</style>