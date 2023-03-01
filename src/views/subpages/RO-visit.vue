<template>
    <div class="rovisit">
        <div class="logo"><img src="../../assets/images/qzwh-logo.png" alt=""></div>
        <h3>{{$t('wh[1]')}}</h3>
        <p class="ip">{{$t('wh[2]')}}:{{$st.state.userIp}}</p>
        <div class="tips2"><img src="../../assets/images/fwxz-tips1.png" alt=""></div>
        <p style="text-align: left;">{{$st.state.userGG}}</p>
        <p><a :href="keline" target="_blank">{{$t('wh[4]')}}</a></p>
    </div>
</template>

<script>
// import { Confirm } from "vux";
export default {
    name: "rovisit",
    data() {
        return {
            keline:JSON.parse(this.$st.state.webInitData).customer
        }
    },


};
</script>

<style scoped lang="less">





.rem(@name, @px) {
    @{name}: unit(@px/75, rem)
}
.rovisit{
    text-align: center;
    background: url('../../assets/images/qzwh-bg.jpg')no-repeat;
        background-size: 100% 100%;
        // padding-bottom: 2.5rem;
        position: fixed;
    width: 100%;
    height: 100%;
    max-width: 750px;
}
h3{
    color: #4A5161;
    font-size: .6rem;
}
.logo{
    width:52%;
    margin: 0 auto ;
    padding-top: 2rem ;
}
.tips2{
    width:56%;
    margin: 0 auto;
}
p{
    width: 80%;
    margin: 0.8rem auto;
    .rem(line-height,36);
    font-size: .35rem;
    
    &.ip{
        margin-top: 0.3rem;
        font-size: 0.4rem;
        color: #4A5161;
    }
    a{
        // color: #22BED3;
    }
}
</style>
