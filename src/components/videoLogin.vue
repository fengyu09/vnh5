<template>
    <!-- 试看弹窗-->
    <div class="sk-pop" v-if="isLogin">
        <div class="sk-pop-content">
            <div class="sk-title">登录提示</div>
            <div class="go-btn go-login" @click="$router.push('/login')">登录观看完整版本</div>
            <div class="go-btn go-see">试看</div>
            <div class="remove-btn" @click="isLogin=false"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "videoLogin",
        data(){
            return {
                isLogin:false
            }
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .sk-pop{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        .sk-pop-content{
            position: absolute;
            left: 50%;
            top:50%;
            transform: translate(-50%,-50%);
            .rem(width,550);
            .rem(height,380);
            .rem(border-radius,20);
            background:#fff;
            padding-top: .6rem;
            .sk-title{
                text-align: center;
                .rem(font-size,30);
                font-weight: 500;
                margin-bottom: .8rem;
            }
            .go-btn{
                margin: .25rem auto 0;
                .rem(width,420);
                .rem(height,70);
                .rem(line-height,70);
                text-align: center;
                .rem(border-radius,35);
            }
            .go-login{
                background:linear-gradient(90deg,rgba(255,51,51,1),rgba(255,127,102,1));
                color: #fff;
            }
            .go-see{
                border:2px solid rgba(255,127,102,1);
            }
        }
        .remove-btn{
            background: url('../assets/images/chat/11_03.png') no-repeat;
            background-size: contain;
            .rem(height,44);
            .rem(width,44);
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>