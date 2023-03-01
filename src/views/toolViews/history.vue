<template>
  <div>
      <header>历史开奖</header>
      <myScroll  ref="scrollWrapper" :data="playList" :isDown="false" :isUp="true"  v-on:func="reLoad" :isLoad="isL" :isloadUp="isLup">
          <ul v-if="currType=='ssc'">
              <li></li>
          </ul>
      </myScroll>
  </div>
</template>

<script>
import myScroll from '../../components/myScroll.vue'
export default {
  name: 'history',
  components: { myScroll },
  data(){
      return {
          currType:'',
          playList:'',
          isL:false,//是否显示 下拉刷新的组件
          isLup:false,//是否显示 上拉加载更多的组件
          page:0,//页码
          isMorePage:true,//判断是否有下一页
      }
  },
  created(){
      this.currType = this.getType(this.$route.params.type);
    //   console.log(this.currType);
  },
  methods:{
      getType(n){
          let t = "";
          switch (n){
              case "bjsc":
              case "xyft":
                  t="pk10";
                  break;
              case "ahk3":
              case "gsk3":
              case "hubk3":
              case "hbk3":
                  t="k3";
                  break;
              case "cqssc":
                  t="ssc";
                  break;
              case "cqxync":
                  t="xync";
                  break;
              case "gdklsf":
                  t="klsf";
                  break;
              case "jx11x5":
                  t="11x5";
                  break;
              case "fc3d":
                  t="fc3d";
                  break;
              case "bjkl8":
                  t="kl8";
                  break;
              case "xglhc":
                  t="lhc";
                  break;
              default:
                  break;
          }
          return t;
      },
      reLoad(data){
          if(data=='down'){
              this.refreshData(data)
          }else if(data=='up'){
              this.loadMore(data)
          }
      },
      refreshData(data){
          //模拟数据请求
          this.isL = true;
          setTimeout(()=>{
            //   console.log(data);
              this.page = 1;
              this.isL = false;
          },2000);
      },
      loadMore(data){
          //使用refresh 方法 来更新scroll 解决无法滚动的问题
          //判断是否有下一页
          if(this.isMorePage){
              this.isLup = true;
              this.page++;
              setTimeout(()=>{
                  console.log(data);
                  this.isLup = false;
                  this.playList = [
                      {
                          img:'1',
                          name:'lisa'
                      },
                      {
                          img:'2',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'1',
                          name:'lisa'
                      },
                      {
                          img:'2',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'1',
                          name:'lisa'
                      },
                      {
                          img:'2',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'1',
                          name:'lisa'
                      },
                      {
                          img:'2',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'3',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      },
                      {
                          img:'4',
                          name:'lisa'
                      },
                      {
                          img:'5',
                          name:'lisa'
                      }
                  ],
                      this.$refs.scrollWrapper.refresh()  //重新计算高度，刷新滚动条
              },2000);
          }
      }
  },
  mounted() {
      this.$refs.scrollWrapper.refresh()  //重新计算高度，刷新滚动条
      this.$refs.scrollWrapper.enable()  //启动滚动条
      this.$refs.scrollWrapper.disable()  //禁止滚动条
  },
}
</script>

<style scoped lang="less">

</style>
