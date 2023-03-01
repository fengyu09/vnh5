<template>
  <div class="git-list-box-bg"  :class="$st.state.skin==5?'golden':''" v-if="isSW" @touchmove.prevent>
         <!-- 弹框填写地址和备注 -->
    <div class="black-bj" @click="closeIsLogin"></div>
    <div class="input-box-container">
        <h3 v-if="$st.state.lanCode==1">Thêm địa chỉ</h3>
        <h3 v-if="$st.state.lanCode==2||$st.state.lanCode==5">Add address</h3>
        <div class="remove-btn" @click="closeIsLogin"></div>
        <div class="input-content">
            <div class="input-item" v-if="$st.state.lanCode==1">
                <p>Địa chỉ chuyển Token</p>
                <input type="text" placeholder="Vui lòng nhập địa chỉ Token" v-model="no">
            </div>
            <div class="input-item" v-if="$st.state.lanCode==2||$st.state.lanCode==5">
                <p>Token transfer address</p>
                <input type="text" placeholder="Please enter Token address" v-model="no">
            </div>
            <div class="input-item" v-if="$st.state.lanCode==1">
                <p>Chú thích</p>
                <input type="text" v-model="remark" placeholder="Vui lòng nhập nhận xét (trong vòng 5 ký tự)" maxlength="5">
            </div>
            <div class="input-item" v-if="$st.state.lanCode==2||$st.state.lanCode==5">
                <p>Note</p>
                <input type="text" v-model="remark" placeholder="Please enter a comment (within 5 characters)" maxlength="5">
            </div>
        </div>
        <div v-if="$st.state.lanCode==1" class="add-btn" :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':skin==4},{'skin-btn-golden':skin==5}]" @click="addUsdt">Thêm</div>
         <div v-if="$st.state.lanCode==2||$st.state.lanCode==5" class="add-btn" :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':skin==4},{'skin-btn-golden':skin==5}]" @click="addUsdt">Add to</div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "inputPop",
  data(){
      return{
          isSW:true,
          remark:'',
          no:null,
          isAdd:false

      }
  },
  created(){
      if(this.no) this.isAdd = true
  },
  methods: {
    addUsdt(){
        if(!this.remark || !this.no){
            this.$vux.toast.hide();
            if(this.$st.state.lanCode==1){
                this.$vux.toast.text('Vui lòng nhập thông tin đầy đủ', 'middle');
            }else if(this.$st.state.lanCode==2||this.$st.state.lanCode==5){
                this.$vux.toast.text('Please enter complete information', 'middle');
            }

            return;
        }
        this.addOneAdr();
    },
    async addOneAdr(){
        
         if(this.$st.state.lanCode==1){
             this.$vux.loading.show('Thêm...')
         }else if(this.$st.state.lanCode==2||this.$st.state.lanCode==5){
             this.$vux.loading.show('Add to...')
         }
        let d = this.globalPpproach.checkIsEncrypt({no:this.no,remark:this.remark,type:2})
        let res = await this.$http.post("/api/v2/Recharge/add_commonno",d)
        this.$vux.loading.hide();
        if(res.data.code==1){
             this.isSW = false;
             if(!this.isAdd){
                 //跳转到常用地址
                 Vue.prototype.$ro.push('/addUsdt')
             }
             Vue.prototype.$st.dispatch('getUsdtAdressList');
        }
        this.$vux.toast.text(res.data.msg, 'middle');
    },
    closeIsLogin(){
        this.isSW = false;
    },

  }
};
</script>

<style scoped lang="less">
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }

.black-bj{
    position: fixed;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,.5);
    z-index: 998;
    top: 0;
    left: 0;
}
.golden{
.input-box-container{
    background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
    border: 1px solid #746550;
    h3{
        color: #E3CF95;
    }
    .input-content .input-item{
        border-bottom: 1px solid #5C564D;
       input{
        color: #CECECE;
       }
       p{
        color: #b5af9b;
       }
    }
    
   .add-btn{
    background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
    color: #A85100 !important;
   }
}
}
.input-box-container{
    position: fixed;
    z-index: 999;
    width: 84%;
    padding: .5rem .3rem 1rem .3rem;
    background: #fff;
    border-radius: 8px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    h3{
        text-align: center;
        font-weight: bold;
        .rem(font-size,32);
        padding-bottom: .3rem;
    }
    .remove-btn{
        position: absolute;
        .rem(width,41);
        .rem(height,41);
        background: url(../assets/images/gray_close_btn.png) no-repeat;
        background-size: 60%;
        right: .3rem;
        top: .5rem;
        
    }
    .input-content{
        margin-bottom: .5rem;
        .input-item{
            border-bottom: 1px solid #eee;
            margin-bottom: .2rem;
            p{
                .rem(font-size,24);
                font-weight: bold;
                padding: .2rem 0;
            }
            input{
                .rem(font-size,24);
                .rem(line-height,40);
                padding-bottom: .15rem;
            }
        }
    }
    .add-btn{
        font-weight: bold;
        .rem(font-size,32);
        color: #fff;
        // background: #FF5251;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
        .rem(height,80);
        .rem(line-height,80);
        text-align: center;
        border-radius: 20px;
        width: 90%;
        margin: 0 auto;
        
    }
}
</style>
