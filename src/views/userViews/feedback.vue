<template>
  <div>
      <flexbox class="infoHead" :class="$st.state.skin==5?'goldenHeader':''">
          <flexbox-item :span="1/10"><div @click="$router.go(-1)" class="flex-demo" style="padding-top: 0.7em; z-index: 10000001;">
          <img v-if="$st.state.skin!=5" src="../../assets/images/gray-back-icon.png" alt="">
          <img v-if="$st.state.skin==5" src="../../assets/images/skin/golden/goBack.png" alt="">
        </div></flexbox-item>
          <flexbox-item ><div class="flex-demo  tickling">{{$t('Feedback.text[4]')}}</div></flexbox-item>
          <flexbox-item :span="1/10"><div class="flex-demo"></div></flexbox-item>
      </flexbox>

        
          <myScroll
            :bgColor="$st.state.skin==5?'161C23':'F0F0F0'"
            :top="1.2" :bottom="0"
          >
          <div class="feedback">
              <textarea v-model="msg" @input="maximum" id="submitFeedback" style="width:100%;" :style="$st.state.skin==5?'background: #464B53;color: #CECECE':''" :placeholder="$t('Feedback.text[0]')" >{{msg}}</textarea>
              <div class="count" :style="$st.state.skin==5?'background: #464B53;':''">/500<span id="countNum">{{num}}</span></div>
            </div>

        <div class="submit">
            <x-button @click.native="showPosition('middle')" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]" style="border-radius:1rem;backgroundColor:#1486FF;color:white;line-height: 1.2rem">{{$t('Feedback.text[1]')}}</x-button>
        </div>

            </myScroll>
           

      

  </div>
</template>

<script>
import { mapState } from "vuex";
import { Flexbox,
  FlexboxItem ,
//  XButton,
//  Toast
} from 'vux'
export default {
  name: 'feedback',
  components: {
    Flexbox,
    FlexboxItem,
//    XButton,
//    Toast,
  },
  data(){
    return{
      msg:"",
      num:0,
      position: 'middle',
      text:'',
      showPositionValue: false,
      showPositionValue1: false, 
    }
  },
   methods: {
    maximum(){
        if(this.msg.length<501){
        this.num=this.msg.length
        this.msg = this.msg.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,'');
      }else{
        this.msg=this.msg.slice(0,500);  //截取500字
        this.num=this.msg.length
        return this.$vux.toast.text('反馈内容最多500字', 'middle')
//        this.showPositionValue = true
//        this.text="反馈内容最多500字"
      }
    },

    showPosition (position) {
        if(this.msg.length<501){
          this.position = position
          if(this.msg==''){
              this.$vux.toast.text(this.$t('Feedback.text[2]'), 'middle')
//              this.showPositionValue = true
//              this.text="反馈内容不能为空"
          }else{
              this.$http.get(this.versionLive2+'user/user_feedback', {
                params:{
                  user_id:this.$store.state.userinfo.user_id,
                  text:this.msg
                }    
            }).then(res => {
               if(res && res.data.code==1){
                 this.$vux.toast.text(res.data.msg, 'middle')
//                 this.showPositionValue1 = true
//                 this.text="提交成功"
                 this.msg=''
                 this.num=this.msg.length
               }else{
                 this.$vux.toast.text(res.data.msg, 'middle')
               }

            })
          
          }
        }else{
//          this.showPositionValue = true
//          this.text="反馈内容最多500字"
          this.$vux.toast.text(this.$t('Feedback.text[3]'), 'middle')
        }

    },

  },
    computed: {
    ...mapState(["skin"])
  },
}
</script>

<style scoped lang="less">
.infoHead{
  height: 1.2rem;
  line-height: 1.2rem;
}
.flex-demo {
  text-align: center;
  img{
      width: .25rem;
  }
}
.tickling{
  font-weight: 550;
  font-size: .45rem;
}

.feedback{
  width: 81.3%;
  margin:.9rem auto;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  height: 3.83rem;
  background: #f6f6f6;
}
#submitFeedback{
   padding:.2rem .3rem;
   height: 3.33rem;
   font-size: .36rem;
}
.feedback .count{
  position: absolute;
  right:0;
  bottom:0;
  height: .5rem;
  width: 100%;
  color:#CCCCCC; 
  padding-right: 0.1rem;
  padding-bottom: 0.1rem;
  flex-direction:row-reverse;
  display: flex;
}
textarea{
  outline:none;
  resize:none;
  border:none;
}
.submit{
  width: 81.3%;
  margin:1.2rem auto;
}
</style>
