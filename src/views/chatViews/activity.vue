<template>
    <div class="active-container">
        <div class="back-icon" @click="$router.go(-1)"><img src="../../assets/images/white-back-icon.png" alt=""></div>
        <myScroll
                :bgColor="'1d4e89'"
                :bottom="0"
                :top="0"
                ref="scrollWrapper"
        >
            <div class="session-one"><img src="../../assets/images/activity/at_01-min.png" alt=""></div>
            <div class="session-one"><img src="../../assets/images/activity/at_02-min.png" alt=""></div>
            <div class="session-one"><img src="../../assets/images/activity/at_03-min.png" alt=""></div>
            <div class="session-one"><img src="../../assets/images/activity/at_04-min.png" alt=""></div>
        </myScroll>

    </div>
</template>

<script>
    import myScroll from "../../components/myScroll";
    export default {
        name: "activity",
        components: {
            myScroll
        },
    }
</script>

<style scoped lang="less">
    .back-icon{
        width: .4rem;
        position: fixed;
        left: .3rem;
        top:.2rem;
        z-index: 10;
    }
    .active-container{
        background: #1d4e89;
        img{
            display: block;
        }
    }
</style>