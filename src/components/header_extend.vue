<template>
    <header class="home-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback()" class="back-icon"></div>
        <span v-if="$route.name=='nextReport'">{{$t('nextReport[0]')}}</span>
        <span v-if="$route.name=='memberReport'">{{$t('memberReport[0]')}}</span>
        <span v-if="$route.name=='team'">{{$t('team[0]')}}</span>
       
        <router-link to="/searchReport" class="mess fr search-icon" :class="$st.state.skin==5?'golden-search-icon':''"></router-link>
    </header>
</template>

<script>
    export default {
        name: "header_extend",
        methods:{
            goback(){
                // this.$router.go(-1);
                this.$router.push('/member');
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
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
        .search-icon {
            position: absolute;
            right: .3rem;
            width: 1.2rem;
            height: 1.2rem;
            display: inline-block;
            background: url("../assets/images/main/home_icon_07.png") no-repeat center right;
            background-size: 45%;
        }
        .golden-search-icon{
            background: url("../assets/images/skin/golden/serch.png") no-repeat center right;
            background-size: 45%;
        }
    }
</style>