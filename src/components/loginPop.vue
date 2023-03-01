<template>
  <div class="toLogin" v-if="isLogin" @touchmove.prevent>
    <!-- :class="isLogin?'dh':''" -->
    <div class="ToLogincontent"  :class="[{'dh':isLogin},{'ToLogincontent-golden':$st.state.skin==5}]">
      <h5 v-if="$st.state.lanCode==1">Bạn chưa đăng nhập hoặc đăng 
nhập của bạn đã hết hạn</h5>
 <h5 v-if="$st.state.lanCode==2||$st.state.lanCode==5">You are not logged in or logged in
Your entry has expired</h5>
      <p v-if="$st.state.lanCode==1">Vui lòng đăng nhập trước khi tiếp tục</p>
      <p v-if="$st.state.lanCode==2||$st.state.lanCode==5">Please login before continuing</p>
      <div @click="toLogin">
        <a class="btnLogin" v-if="$st.state.lanCode==2||$st.state.lanCode==5" :class="[{'skin-btn-pink':$st.state.skin ==1},{'skin-btn-blue':$st.state.skin ==2},{'skin-btn-green':$st.state.skin ==3},{'skin-btn-maingreen':$st.state.skin ==4}]">Mobile login</a>
        <a class="btnLogin" v-if="$st.state.lanCode==1" :class="[{'skin-btn-pink':$st.state.skin ==1},{'skin-btn-blue':$st.state.skin ==2},{'skin-btn-green':$st.state.skin ==3},{'skin-btn-maingreen':$st.state.skin ==4}]">Đăng nhập di động</a>
        
      </div>
      <div @click="toRegist" style="margin-bottom:1rem;">
        <a class="btnResgin" v-if="$st.state.lanCode==1" :class="[{'skin-border-pink':$st.state.skin ==1},{'skin-border-blue':$st.state.skin ==2},{'skin-border-green':$st.state.skin ==3},{'skin-border-maingreen':$st.state.skin ==4}]">Đăng ký ngay</a>
         <a class="btnResgin" v-if="$st.state.lanCode==2||$st.state.lanCode==5" :class="[{'skin-border-pink':$st.state.skin ==1},{'skin-border-blue':$st.state.skin ==2},{'skin-border-green':$st.state.skin ==3},{'skin-border-maingreen':$st.state.skin ==4}]">Register now</a>
      </div>
      <span  @click="closeIsLogin" class="closeBtn">
        <img src="../assets/images/chat/11_03.png" alt />
      </span>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "toLogin",
  data(){
      return{
          isLogin:true
      }
  },
  created(){
    console.log(this.$st.state.skin)
  },
  computed: {
    // ...mapState(["skin"])
  },
  methods: {
      closeIsLogin(){
        this.isLogin = false;
      },
      toLogin(){
          this.isLogin = false;
          // location.href = '/login'
          this.$ro.push('/login');
        
        
      },
       toRegist(){
           this.isLogin = false;
           if(this.noticeType==1){
            //  location.href = '/register'
            // console.log(this)
             this.$ro.push('register');
           }else{
            //  location.href = '/RegisterDl'
             this.$ro.push('RegisterDl');
           }

       },
  }
};
</script>

<style scoped lang="less">
.toLogin {
  position: fixed;
  width: 100%;
  height: 124%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000001;
  top: 0;
  left: 0;
  .ToLogincontent {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 28%;
    bottom: auto;
    right: auto;
    width: 80%;
    margin: auto;
    background-color: #ffffff;
    text-align: center;
    border-radius: 8px;
    // position: relative;
    
    h5 {
      padding-top: 1.7em;
      color: #6A86B9;
      font-weight: 500 !important;
      font-size: 0.5rem;
    }
    p {
      // padding: 2.7em 20px 1.7em;
      color: #71819D;
      font-size: 0.42rem;
      line-height: 1rem;
      padding-bottom: 1em;
    }
    div {
      width: 80%;
      position: relative;
      line-height: 1.2rem;
      font-size: 18px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-radius: 99px;
      margin: 0 10% 0.5rem 10%;
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      .btnLogin {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
        font-size: 0.45rem;
        border-radius: 30px;
      }
      .btnResgin {
        display: block;
        width: 99%;
        height: 99%;
        background: #ffffff;
        text-align: center;
        color: #6A86B9;
        border-radius: 99px;
        margin: 1px;
        font-size: 0.45rem;
      }
      // a{
      //     color: #fff;
      //     background: #d7d7d7;
      //     margin: 0 0.55rem 0.6rem 0.55rem;
      //     border-radius: 20px;
      //     font-size: 0.36rem;
      //     height: 1rem;
      //     line-height: 1rem;
      //         display: block;
      //         -webkit-box-flex: 1;
      //             // width: 50%;
      // }
    }
    .closeBtn {
      position: absolute;
      width: 1rem;
      height: 1rem;
      left: 43%;
      bottom: -18%;
    }
    &.ToLogincontent-golden{
      background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
      border: 1px solid #746550;
      h5,p{
        color: #E3CF95;
      }
      div{
        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
        color: #FFFFFF;
        .btnResgin{
          background: #3E372F;
          border: 1px solid #B99D68;
          color: #7D5F1D;
        }
      }
      
    }
  }
}
</style>
