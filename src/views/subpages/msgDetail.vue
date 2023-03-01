<template>
    <div class="msgDetail">
       <div class="header" :class="$st.state.skin==5?'goldenHeader':''">
            <div @click="$router.go(-1);">
                <i class="go-back"></i>
            </div>
            <div>
                <h3>{{$t('msgDetail.text[0]')}}</h3>
            </div>
        </div>

        <myScroll
        ref="scrollWrapper"
        :probeType="2"
        :top="1.2"
        :left="0"
        :bottom="0"
        :bgColor="$st.state.skin==5?'1F252C':'f7f7f7'"
        >
        <div class="msgDetail-content" :class="$st.state.skin==5?'msgDetail-content-golden':''">
           <h3>{{detailData.title}}</h3>
           <div v-html="detailData.content">

           </div>
        </div>
     </myScroll>

        
    </div>
</template>
<script>
export default {
    name:'msgDetail',
    data(){
        return{
            detailData:''
        }
    },
    created(){
        this.$vux.loading.show();
        this.$http
          .get("/api/live/sport/get_message/", {
            params: {
             msg_id:this.$route.query.msg_id
            }
          }).then(res=>{
              this.$vux.loading.hide();
              if(res&&res.data.code==1){
                  this.detailData=res.data.data
              }
          })
    }
}
</script>
<style lang="less" scoped>
.msgDetail{
    .header{
         display: flex;
        background: #fff;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.346rem;
        .go-back{display: block;width: 1.25rem;height:1.2rem;background: url('../../assets/images/gray-back-icon.png') left center no-repeat;background-size: 20%;}
        h3{font-weight: 550;font-size: 0.45rem;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        }
    }
    .msgDetail-content{
        // border-top: 1px solid #EEEEEE;
        margin-top: .2rem;
        padding: 0 0.4rem;
        color: #000;
        font-size: 0.32rem;
        line-height: 0.5rem;
        h3{font-size: 0.36rem;font-weight: bold;text-align: center;padding: 0.3rem 0;}
      &.msgDetail-content-golden{
        background: #1F252C;
        border-top: none;
        color: #fff;
      }
    }
}
    
</style>