<template>
    <div>
        <div class="main-mess">
            <h3 class="title">请确认详细注单</h3>
            <myScroll ref="scrollWrapper" :top="1.4" :bgColor="'fff'" :data="playList" :bottom="0">
                <dl class="msg-list">
                    <dt><span>玩法</span><span>号码</span><span>赔率</span><span>金额</span></dt>
                    <dd v-for="(item,index) in mess" :key="index">
                        <span>{{item.name}}</span><span>{{item.cname}}</span><span class="odds">{{item.odds}}</span><span class="money"><strong>{{item.sum}}</strong></span>
                    </dd>
                </dl>

            </myScroll>
        </div>
    </div>
</template>

<script>
    import myScroll from '../components/myScroll.vue' //纵向滚动
    export default {
        data(){
            return{
                playList:{

                },
                mess:[
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'},
                    {odds:1,name:'冠亚和',sum:100,cname:'冠亚和'}
                ]
            }
        },
      props:{
          
      },
        created(){
            this.playList.mess = this.mess;
        },
        components:{
            myScroll,
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
    }
</script>

<style lang="less">
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }
    .title{
        .rem(height,100);
        .rem(line-height,100);
        .rem(font-size,32);
        font-weight: bold;
        color: #445779;
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
    }
    .msg-list{
        dt{
            border-bottom: 1px solid #eee;
            overflow: hidden;
            span{
                display: block;
                width: 25%;
                .rem(font-size,24);
                .rem(padding-top,18);
                .rem(padding-bottom,18);
                
                text-align: center;
                float: left;
               
            }
        }
        dd{
            border-bottom: 1px solid #eee;
            overflow: hidden;
            &:last-of-type{
                border-bottom: none;
            }
            span{
                display: block;
                width: 25%;
                .rem(font-size,28);
                .rem(line-height,50);
                .rem(padding-top,20);
                .rem(padding-bottom,20);
                color: #445779;
                text-align: center;
                float: left;
                &.odds{
                    
                }
                &.money{
                    strong{
                        display: block;
                        .rem(width,140);
                        .rem(height,50);
                        .rem(line-height,50);
                        color: #FF513E;
                        background: #F5F5F5;
                        -webkit-border-radius: 25px;
                        -moz-border-radius: 25px;
                        border-radius: 25px;
                    }
                }
            }
        }
    }
</style>