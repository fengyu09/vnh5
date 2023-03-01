<template>
  <div>
      <!--注意：需要在父组件设置可滚动范围的宽度 否则不能滚动 请参考 home.vue的 ScrollX方法-->
    <div ref="personWrap">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'myScrollX',

    data(){
      return{

      }
    },
    props:{
      probeType:{  //是better-scroll的监听属性 设置快速滚动还是缓慢滚动
          type:Number,
          default:10
      },
      click:{ //是否点击事件
          type:Boolean,
          default:true
      },
      LivePreview:{ //需要传一个数据进来，因为当数据发生变化时，滚动条也需要refresh刷新 。否则，当数据发生改变时，不去刷新滚动条的话，可能敬酒滚动不了。
          type:Object,
          default:null
      },
    },
    mounted(){//组件挂载时，调用滚动条 为确保dom渲染了，需要一个定时器  20毫秒再调用
      setTimeout(()=>{
          this.initScroll();
      },20)
    },
    watch:{//监听数据data  当data发生变化变化时，滚动条也需要refresh刷新。否则，当数据改变时，不去刷新滚动条的话，可能就不滚动了
        data(){
            setTimeout(()=>{
                this.initScroll();
            },20)
        }
    },
    methods:{
        initScroll(){ //初始化滚动条
          //确保wrapper存在  因为执行initScroll()时，如果this.$refs.wrapper为undefined就会报错
            if(!this.scroll){
                //初始化MyScrollX
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.personWrap, {
                            startX: 0,
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: "vertical"
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }else if(!this.$refs.personWrap){
                return
            }else{
                this.scroll.refresh();
            }
        },
        //如果Myscroll 存在 就代理better-scroll的enable 方法 。启用better-scroll 默认开启
        enable(){
            this.MyScrollX && this.MyScrollX.enabled();
        },
        disable(){//禁用 better-scroll
            this.MyScrollX && this.MyScrollX.disable();
        },
        refresh(){//刷新滚动条  重新计算高度
            this.MyScrollX && this.MyScrollX.refresh();
        },
        scrollTo(num){
            this.scroll.scrollTo(-num,0)
        }

    }

}
</script>

<style scoped lang="less">
</style>
