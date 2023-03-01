<template>
    <div class="qz-maintain">
        <!-- <div class="tips"><img src="../../assets/images/qzwh-tips2.png" alt=""></div> -->
        <div class="logo"><img src="../../assets/images/qzwh-logo.png" alt=""></div>
        <!-- <div class="tips3"><img src="../../assets/images/tips3.png" alt=""></div> -->
        <h3>{{$t('wh[0]')}}</h3>
        <div class="tips2"><img src="../../assets/images/qzwh-tips.png" alt="">
            <div class="tips3"><img src="../../assets/images/tips3.png" alt=""></div>
        </div>
        <p class="text">{{$st.state.userGG}}</p>
        <span>{{$t('wh[3]')}}</span>
    </div>
</template>

<script>
// import { Confirm } from "vux";
export default {
    name: "swPop",
    data() {
        return {
          
        }
    },
    
    
};
</script>

<style scoped lang="less">







.rem(@name, @px) {
    @{name}: unit(@px/75, rem)
}
.qz-maintain{
    text-align: center;
    background: url('../../assets/images/qzwh-bg.jpg') center center no-repeat;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 750px;
    // padding-bottom: 2.5rem;
}
h3 {
    color: #4A5161;
    font-size: .6rem;
    margin-bottom: 0.5rem;
}

.logo {
    padding-top: 2.8rem;
    width: 52%;
    margin: 0 auto 0 auto;
}

.tips2 {
    width: 56%;
    margin: 0 auto;
    position: relative;
}
.tips3{
    position: absolute;
    width: 45%;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
}
.tips{
    // width: 20%;
    // margin: 2.8rem auto 0 auto;
    // margin: 0 auto 0 auto;
        padding-top: 2.8rem;
}

p {
    width: 80%;
    margin: 0.5rem auto;
    .rem(line-height, 36);
    font-size: .35rem;

    &.text {
        text-align: left;
    }


}
span{
    text-align: right;
        display: block;
        width: 80%;
        font-size: .35rem;
        margin: 0 auto;
}

</style>
