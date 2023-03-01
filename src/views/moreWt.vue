<template>
    <div class="service-container">
        <header class="home-header clearfix">
            <div @click="goback()" class="back-icon"></div>
            <span>{{title}}</span>

        </header>
        <myScroll :top='1.2' :bottom="0">
            <div v-html="content" class="wt-content"></div>
        </myScroll>
       
        
       
    </div>
</template>

<script>
import { mapMutations } from "vuex";
    export default {
        name: "service",
        components:{
        },
        data(){
            return{
                content:'',
                title:''
             
            }
        },
        created(){
            this.content = localStorage.getItem('keWt')?localStorage.getItem('keWt'):'no data'
            this.title = localStorage.getItem('keWtTitle')?localStorage.getItem('keWtTitle'):'no data'
        },

        methods:{
             goback(){
                this.$router.go(-1);
            },
        }

    }
</script>

<style scoped lang='less'>
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
.wt-content{
    padding: .3rem;
}
</style>