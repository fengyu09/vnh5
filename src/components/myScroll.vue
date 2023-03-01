<template>
  <div>
    <!-- <div class="down-tip" v-if="dropDown">下拉刷新</div> -->
    <div class="down-tip" v-if="dropDown">Đang nhận ...</div>
    <Spinner class="loading-tip" :type="phoneType" v-if="isLoad"></Spinner>
    <Spinner class="loading-tip-down" :type="phoneType" v-if="isloadUp"></Spinner>
    <!-- <div class="up-tip" v-if="pullUp" :style="'bottom:'+uptipBottom+'rem'">上拉加载更多...</div> -->
    <div class="up-tip" v-if="pullUp" :style="'bottom:'+uptipBottom+'rem'">Đang nhận ...</div>
    <!-- :class="isScrollY?'wrapperY':'wrapperX'" -->
    <div ref="wrapper" class="wrapper"  :class="[{'wrapperY':isScrollY},{'wrapperX':!isScrollY},{'goldenSkin':$st.state.skin==5}]" :style="'top:'+top+'rem;bottom:'+bottom+'rem;left:'+left+'rem;background:#'+bgColor+';z-index:'+zIndex">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
import { Spinner } from 'vux'
// import Spinner  from 'vux/src/components/spinner/index.vue'
export default {
    name: 'myScroll',
    components: {
        Spinner
    },
    data(){
      return{
        satrY:0,
          pullUp:false,//上拉组件提示
          dropDown:false,//下拉组件提示
          phoneType:this.isPhoneAgent() || 'ios', //手机系统类型  安卓  ios
          maxScrollY:0
      }
    },
    props:{
      probeType:{  //是better-scroll的监听属性 设置快速滚动还是缓慢滚动
          type:Number,
          default:3
      },
      click:{ //是否点击事件
          type:Boolean,
          default:false
      },
      playList:{ //需要传一个数据进来，因为当数据发生变化时，滚动条也需要refresh刷新 。否则，当数据发生改变时，不去刷新滚动条的话，可能敬酒滚动不了。
          type:Object,
          default:null
      },
      isDown:{ //是否需要下拉刷新
        type:Boolean,
        default:false
      },
      isUp:{//是否需要上拉加载更多
          type:Boolean,
          default:false
      },
      isLoad:{//是否显示下拉刷新的loading
          type:Boolean,
          default:false
      },
      isloadUp:{//是否显示上拉加载更多的loading
          type:Boolean,
          default:false
      },
      top:{ //设置top值
          type:Number,
          default:1.2
      },
      bottom:{ //设置bottom值
        type:Number,
        default:1.4
      },
      bgColor:{
        type:String,
        default:'fff'
      },
      left:{
        default:null
      },
      isScrollY:{
          type:Boolean,
          default:true
      },
      scrollToEndFlag: { //是否开启滚动到最底部
        type: Boolean,
        default: false
      },
      scrollToTopFlag :{
        type: Boolean,
        default: false
      },
      uptipBottom:{
        type:Number,
        default:2.5
      },
      zIndex:{
        type:Number,
        default:1
      }
    },
    mounted(){//组件挂载时，调用滚动条 为确保dom渲染了，需要一个定时器  20毫秒再调用
      setTimeout(()=>{
        this.initScroll();
        //是否滚动到底部
          setTimeout(()=> {
            if(this.scrollToEndFlag) {
              this.Myscroll.scrollTo(0,this.Myscroll.maxScrollY);
            }
            if(this.scrollToTopFlag){
              this.Myscroll.scrollTo(0,0);
            }
          },20)
      },20)
    },
    watch:{//监听数据data  当data发生变化变化时，滚动条也需要refresh刷新。否则，当数据改变时，不去刷新滚动条的话，可能就不滚动了
        data(){
            setTimeout(()=>{
              this.initScroll();
                setTimeout(()=>{
                  if(this.scrollToEndFlag){
                    this.Myscroll.scrollTo(0,this.Myscroll.maxScrollY);
                  }
                  if(this.scrollToTopFlag){
                    this.Myscroll.scrollTo(0,0);
                  }
                },10)
            },10)
        },

    },
    methods:{
          initScroll(){ //初始化滚动条
          //确保wrapper存在  因为执行initScroll()时，如果this.$refs.wrapper为undefined就会报错
            if(!this.Myscroll){
                //初始化Myscroll

//                let cliW = this.$refs.wrapper.clientWidth;//需要获取当前屏幕的宽度，这样可以让我们没有超出内容部分的在横向滚动时不会滚动
//                this.$refs.wrapper.style.width = cliW + 'px';
//                console.log(cliW);

                this.Myscroll = new BScroll(this.$refs.wrapper,{
//                    pullUpLoad:true,
                    probeType:this.probeType,
                    click:this.click,
                    tap:false,
                    startY:this.satrY,//调用上次加载后底部y轴的位置    ---**重点** starY在data里面初始值设置为0
                    scrollY:this.isScrollY,
                    eventPassthrough:this.isScrollY?'horizontal':'vertical',
                });
                
                this.Myscroll.on('scroll', (pos) => {
                  this.maxScrollY=this.Myscroll.maxScrollY
                  this.scrollCourse(pos)
                  if (pos.y > 30 && this.isDown) {  //下拉高度大于50 (看自己需要)
                        this.dropDown = true  //逻辑操作，显示下拉提示组件
                    }else if(this.Myscroll.maxScrollY > pos.y + 30 &&this.isUp){
                        this.pullUp = true; //逻辑操作，显示上拉加载更多提示组件
                    } else {


                    if(Math.abs(pos.y)>110){
                      // console.log(12)
                      this.scrollLingDown();
                    }else{
                      this.scrollLingUp();
                    }
//                        this.dropDown = this.isLoading ? true : false  //isloading 表示正在加载数据(loading也显示下拉提示组件)
                    }
                });
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.Myscroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (pos.y > 30 && this.isDown && this.dropDown) {
                        this.dropDown = false;
                        //下拉重新加载数据
                        this.refreshDownData();
                    }
                    //上拉加载 总高度>下拉的高度+数值(20仅供参考) 触发加载更多
                    if (this.Myscroll.maxScrollY > pos.y + 20 && this.isUp && this.pullUp) {
                        this.pullUp = false;
                        //加载跟多数据
                        this.satrY = this.Myscroll.startY;//记录上次加载后底部y轴的位置    ---**重点**
                        // console.log(this.satrY)
                       this.LoadMoreUpData();
//                        this.Myscroll.refresh();
                        this.Myscroll.finishPullUp();
                        // console.log(this.isloadUp);

                    }
                })
                this.Myscroll.on('scrollEnd', (pos) => {
                  // console.log(555,pos);
                  this.sendXY(pos);
                  
                })
            }else if(!this.$refs.wrapper){
                return
            }else{
                this.Myscroll.refresh();
                this.Myscroll.finishPullUp();
            }
        },
        //如果Myscroll 存在 就代理better-scroll的enable 方法 。启用better-scroll 默认开启
        enable(){
            this.Myscroll && this.Myscroll.enable();
        },
        disable(){//禁用 better-scroll
            this.Myscroll && this.Myscroll.disable();
        },
        refresh(){//刷新滚动条  重新计算高度
            this.Myscroll && this.Myscroll.refresh();
        },
       finishPullUp(){
        this.Myscroll && this.Myscroll.finishPullUp();
       },
      scrollTo(x, y) {
        this.Myscroll.scrollTo(x, y,500);
      },
      scrollBottom(){
        this.Myscroll.scrollTo(0,this.Myscroll.maxScrollY,500);
      },
        /**
         * 判断是苹果机还是安卓机
         * @returns {*}
         */
        isPhoneAgent(){
            let u = navigator.userAgent, app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                //这个是安卓操作系统
                return 'android'
            }
            if (isIOS) {
                //这个是ios操作系统
                return 'ios'
            }
        },
        refreshDownData() {
            // 通过$emit方法触发函数执行
            this.$emit('func', 'down') // 后面依次传入参数，在父组件接收
        },
        sendXY(obj){
           this.$emit('func','end',obj)
        },
        LoadMoreUpData(){
            // 通过$emit方法触发函数执行
            this.$emit('func', 'up') // 后面依次传入参数，在父组件接收
        },
        scrollCourse(obj){
          this.$emit('isScroll', obj)
        },
        scrollLingDown(){
          this.$emit('func', 'scrollDwon') // 后面依次传入参数，在父组件接收
        },
        scrollLingUp(){
          this.$emit('func', 'scrollUp') // 后面依次传入参数，在父组件接收
        }

    }

}
</script>

<style scoped lang="less">
  .goldenSkin{
    // background: #1A1A1A !important;
  }
  .right-content{
    .wrapperY{
      width: 7.9rem;
    }
  }
  .left-nav{
      .wrapperY{
      width: 1.5rem;
    }
  }
  .wrapperY{
    width: 100%;
    position: absolute;
    /*top: 1.2rem;*/
    /*bottom: 1.4rem;  !*关键*!*/
    overflow: hidden;
    max-width: 750px;
    /* min-width: 320px; */
    z-index: 1;
  }
  .wrapperX{
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
  }
  .down-tip{
    text-align: center;
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .up-tip{
    text-align: center;
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .loading-tip{
    position: absolute;
    top: 1rem;
    z-index: 1001;
    color: #f06;
    left: 50%;
    transform: translateX(-50%);
  }
  .loading-tip-down{
    position: absolute;
    z-index: 1001;
    color: #f06;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
  }
</style>
