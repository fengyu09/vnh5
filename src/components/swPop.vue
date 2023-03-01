<template>
  <div class="git-list-box-bg" v-if="isSW" @touchmove.prevent :class="$st.state.skin==5?'git-list-box-bg-golden':''">
        <div class="git-list-box" >
            <i class="close-icon" @click="closeIsLogin"></i>
            <h3>{{title}}</h3>
            <!-- <p>当前系统仅开放彩票游戏试玩，如有</p>
            <p>其他需要请登录正式账户。</p> -->
            <div class="sw-content-text">{{content}}</div>
            <div class="dialog_ft clearfix">
                <!-- <span class="fl" @click="toLogin">登录</span>
                <span class="fr" @click="toRegist">注册</span> -->
                <span class="fl" @click="leftClick">{{leftBtn}}</span>
                <span class="fr" :class="[{'skin-btn-pink':$st.state.skin ==1},{'skin-btn-blue':$st.state.skin ==2},{'skin-btn-green':$st.state.skin ==3},{'skin-btn-maingreen':$st.state.skin ==4},{'skin-btn-golden':$st.state.skin ==5}]" @click="rightClick">{{rightBtn}}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "swPop",
  data(){
      return{
          isSW:true,
          title:'',
          content:'',
          leftBtn:'',
          rightBtn:''
      }
  },

  methods: {
    leftClick() {
        this.clickL();
        this.isSW = false
    },
    rightClick() {
        this.clickR();
        this.isSW = false
    },
    closeIsLogin(){
    this.isSW = false;
    },
    toLogin(){
        this.isSW = false;
        // location.href = '/login'
        this.$ro.push('/login');
    
    },
    toRegist(){
        this.isSW = false;
        if(this.noticeType==1){
            this.$ro.push('/register');
        }else{
            this.$ro.push('/RegisterDl');
        }

       },
  }
};
</script>

<style scoped lang="less">
    .rem(@name,@px){
        @{name}:unit(@px/75,rem)
    }

   .git-list-box-bg{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background:rgba(0,0,0,.5);
        z-index: 1001;
        min-width: 320px;
        max-width: 750px;
    }
    .git-list-box{
        max-width: 750px;
        min-width: 320px;
        position: fixed;
        .rem(width,630);
        // .rem(height,467);
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        background: #fff;
        z-index: 1001;
        border-radius: .22rem;
        padding:0 .5rem .5rem 0.5rem;
        .close-icon{
            display: block;
            .rem(width,25);
            .rem(height,25);
            position: absolute;
            right: 10px;
            top: 10px;
            background: url('../assets/images/hmlz-icon2.png')no-repeat;
            background-size: contain;
        }
        h3{
            text-align: center;
            .rem(font-size,32);
            color:#333333;
            .rem(margin-top,38);
            .rem(margin-bottom,80);
            font-weight: bold;
        }
        .sw-content-text{
            text-align: center;
            color:#666666;
            .rem(font-size,32);
            .rem(line-height,45);
            .rem(margin-bottom,62);
        }
        .dialog_ft {
            span{
                color: #666666;
                background: #d7d7d7;
                margin: .4rem 0.4rem 0 0.4rem;
                border-radius: 20px;
                font-size: 0.38rem;
                .rem(height,80);
                .rem(line-height,80);
                .rem(width,210);
                text-align: center;
            }
            span:nth-last-of-type(1){
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                color:#fff;
            }
        }
    }
    .git-list-box-bg-golden{
        .git-list-box{
            border: 1px solid #746550;
            background: linear-gradient(90deg, #2D2D2D 2.25%, #2E2E2E 100%);
            h3{
                color: #E3CF95;
            }
            .sw-content-text{
                color:#cecece;
            }
            .dialog_ft{
                span{
                    color: #cecece;
                    background: #464B53;
                }
            }
        }
    }
</style>
