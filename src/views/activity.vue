<template>
    <div class="preferential">
    <div class="header" :class="skin==5?'goldenHeader':''" v-if="!$store.state.codeToken||$store.state.userinfo.user_id<0||lanCode==2" >
      <div >
        <h3>{{$t('Activities.text[0]')}}</h3>

      </div>
     
    </div>
    <div class=" header"  v-if="$store.state.userinfo.user_id>0 && $store.state.codeToken&&lanCode!=2" :class="[{'skin-header-pink':skin ==1},{'skin-header-blue':skin ==2},{'skin-header-green':skin ==3},{'skin-header-maingreen':skin ==4},{'skin-header-golden':skin ==5},{'goldenHeader':skin==5}]">
        <span @click="changeTab(index)" :class="yhIndex == index ?'active':''" v-for="v,index in [$t('Activities.text[0]'),$t('Activities.text[1]')]" :key="index">{{v}}</span>
    </div>
    <div class="yh-menu" v-show="yhIndex == 0" :class="skin==5?'yh-menu-golden':''">
         <myScrollX >
        <ul :style="{width:menuList.length*1.76+'rem'}" ref="personTab">
            <li  v-for="(item,index) in menuList" :class="[
            {active:menuIndex==item.type && skin == 0},
            {'active-pink':menuIndex==item.type && skin == 1},
            {'active-blue':menuIndex==item.type && skin == 2},
            {'active-green':menuIndex==item.type && skin == 3},
            {'active-maingreen':menuIndex==item.type && skin == 4},
            {'active-golden':menuIndex==item.type && skin == 5},
            ]" 
            :key="index" @click="menuIndex=item.type">
                <!-- <span>{{item.name}}</span> -->
                {{item.name}}
            </li>
        </ul>
         </myScrollX >
    </div>
    <div class="yh-content" v-show="yhIndex == 0" :class="skin==5?'yh-content-golden':''">
    <myScroll
      ref="scrollWrapper"
      :probeType="2"
      :top="2.4"
      :isDown="true"
      v-on:func="reLoad"
      :left="0"
      :bottom="1.4"
      :bgColor="skin==5?'1F252C':'f7f7f7'"
    >
        <ul v-if="dataList.length" class="">
            <li v-for="(item,index) in dataList" :key="index" @click="yhdetail(item)">
                <span> <i :style="item.ishot == 1 ?'color:#60353D':'color:#fff'"> {{item.type_text}}</i><img v-lazy="item.type_icon" alt="" style="width:3.3rem;height:1rem"></span>
                <img :src="item.cover" alt="" srcset="" >
            </li>
        </ul>
        <div v-else style="text-align: center;font-size: 0.38rem;margin-top: 0.5rem;">
            <span>no data~</span>
        </div>
    </myScroll>
    </div>
    <task v-if="yhIndex == 1&&$st.state.lanCode!=2" />
     <Foot />
    </div>
</template>
<script>
import Foot from "../components/footer.vue";
import task from "../views/task/newTask.vue";
import {  mapMutations,mapState } from "vuex";
export default {
    name:'preferential',
    data(){
        return{
            menuList:[],
            menuIndex:0,
            dataList:[],
            yhListData:[],
            typeIndex:0,
            isNew: 0, //皮肤状态
            yhIndex:0,//头部
            
        }
    },
    components:{
        Foot,
        task
    },
     computed: {
            ...mapState(["skin","isPure","lanCode" ,"defalutLan"])
        },
    watch:{
        isPure(){
           if(this.isPure==1){
               this.yhIndex = 0;
               this.$store.commit('SETGAMESTATUS',{key:'activeIndex',val:0})
           }
        
        },
        defalutLan(){
            this.getYhList();
        },
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

                let all = document.querySelectorAll('.yh-menu ul li');
                let sum = 0;
                for(let i=0,len=all.length;i<len;i++){
                    sum +=(all[i].offsetWidth+40);
                   
                }
                this.$refs.personTab.style.width = sum + "px";
            })
        }
    },
    created(){
        this.yhIndex = 0;
        if(this.$store.state.codeToken&&this.$store.state.userinfo.user_id>0){
            this.yhIndex = this.$store.state.gamestatus.activeIndex?this.$store.state.gamestatus.activeIndex:0
        }
        this.dataList = this.$store.state.yhList.data || [];
        if(this.dataList.length){
             this.yhListData = this.dataList;
             this.menuList= this.$store.state.yhList.typeList;
        }else{
            
        }
        this.getYhList();

    },
    methods:{
        ...mapMutations([ "SETPOSITIONY","SETYHDATA"]),
        changeTab(index){
            this.yhIndex = index;
            this.$store.commit('SETGAMESTATUS',{key:'activeIndex',val:index})
        },
        getYhList(type){
            this.$vux.loading.show();
             this.$http.get('/api/live/sport/get_activity_list/',{
             params:{
                code:this.defalutLan,
                 type:type||this.menuIndex,
                 client_type:3,
                 api:this.noticeType==1?1:5,
                 page:1,
                 limit:50
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
                // location.href = item.address
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
    background: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 2.3rem 0 2.3rem;
    &.goldenHeader{
        padding: .05rem 2.3rem 0 2.3rem;
    }
    >span{
        display: inline-block;
        .rem(line-height,70);
        text-align: center;
        .rem(width,200);
        .rem(height,70);
        font-weight: normal;
        color: #1486FF;
        border: 1px solid #1486FF;
        border-radius:4px 0 0 4px ;
        &:nth-last-child(1){
            border-radius: 0 4px 4px 0 ;
        }
        &.active{
            color:#fff;
            background: linear-gradient(90deg, #047EFF 0%, #4BA1FF 100%);
        }

    }
    &.skin-header-pink{
        >span{
            border: 1px solid #FB796B;
            color: #FB796B;
             &.active{
            color:#fff;
            background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%);
            }
        }
    }
    &.skin-header-blue{
        >span{
            border: 1px solid #0CB6D9;
            color: #0CB6D9;
             &.active{
            color:#fff;
            background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%);
            }
        }
    }
    &.skin-header-green{
        >span{
            border: 1px solid #0B9B71;
            color: #0B9B71;
             &.active{
            color:#fff;
            background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%);
            }
        }
    }
    &.skin-header-maingreen{
        >span{
            border: 1px solid #01BE79;
            color: #01BE79;
             &.active{
            color:#fff;
            background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%);
            }
        }
    }
    &.skin-header-golden{
        >span{
            border: 1px solid #AB9B62;
            color: #AB9B62;
             &.active{
            color:#A85100;
            background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%);
            }
        }
    }
    
    .go-back {
      display: block;
      width: 0.26rem;
      height: 0.48rem;
      background: url("../assets/images/gray-back-icon.png") no-repeat;
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
          li{font-size: 0.36rem;height: 1rem;line-height: 1rem;text-align: center;}
          .active,.active-pink,.active-blue,.active-green {
              position: relative;
              font-size: 0.4rem;
              color: #1486FF;
              font-weight: bold;
              &:before{
                  content: '';
                  display: inline-block;
                  position: absolute;
                  width: 80%;
                  height: 4px;
                  background: #1486FF;
                  border-radius: 2px;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
              }
              
          }
          .active-pink{
                   color: #FB796B;
                  &::before{
                    background: #FB796B;
                  }
              }
              .active-blue{
                   color: #0CB6D9;
                  &::before{
                    background: #0CB6D9;
                  }
              }
              .active-green{
                   color: #0B9B71;
                  &::before{
                    background: #0B9B71;
                  }
              }
              .active-maingreen{
                   color: #01BE79;
                  &::before{
                    background: #01BE79;
                  }
              }
              .active-golden{
                   color:  #E3CF95 !important;
                  &::before{
                    background:  #E3CF95 !important;
                  }
              }
          
      }
      &.yh-menu-golden{
        ul{
            background: #1A1A1A;
            li{
                color: #928151
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
                      top: 0.2rem;
                      left: 0;
                      color:#fff;
                      .rem(font-size,20);
                      font-style: italic!important;
                      width: 3.3rem;
                    //   font-style: oblique;
                  }
              }
          }
      }
      &.yh-content-golden{
        ul{
            background: none;
        }
      }
  }
}


</style>