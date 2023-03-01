<template>
    <header class="home-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback()" class="back-icon"></div>


        <span v-if="$route.name=='regMember'">{{$t('Headertitle[0]')}}</span>
        <span v-if="$route.name=='gameReport'">{{$t('Headertitle[1]')}}</span>

    </header>
</template>

<script>
    export default {
        name: "headerOne",
        methods:{
             goback(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }
</style>