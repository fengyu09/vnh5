<template>
    <div class="live-container">
        <div class="live-type" :class="[{'live-type-pink':$st.state.skin ==1},{'live-type-blue':$st.state.skin ==2},{'live-type-green':$st.state.skin ==3},{'live-type-maingreen':$st.state.skin ==4},{'goldenHeader':$st.state.skin ==5}]">
                <span class="active">Phim AV</span>
              <router-link to="/searchVideo" class="mess fr"></router-link> 
        </div>
        <videoCenter/>
        <Footer/>
    </div>
</template>

<script>

import videoCenter from './live/videoCenter'
    export default {
        name: "live",
        data(){
            return{
                currType:0,
            }
        },
        components:{videoCenter},
        watch:{
            currType:function(n){
                this.$store.commit('SETGAMESTATUS',{key:'live',val:n})
            },
           
        },
        methods: {
            goGz(){
                if(this.$store.state.codeToken){
                    this.$router.push('/vipGz')
                }
                
            },
            
           
        },
        created(){
        
          this.currType= localStorage.getItem('currType')&&localStorage.getItem('currType')!='undefined'?localStorage.getItem('currType'):0
          localStorage.setItem('currType','')
        }
    }
</script>

<style scoped lang='less'>
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .live-type{
        padding:0 .2rem ;
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        span{
            color: #71819D;
            .rem(font-size,28);
            padding: 0 .2rem;
            &.active{
                color: #1486FF;
                font-weight: bold;
                .rem(font-size,32);
            }
        }
        &.live-type-pink {
            span{
                &.active{
                   color: #FB796B; 
                }
            }
        }
         &.live-type-blue {
            span{
                &.active{
                   color: #0CB6D9; 
                }
            }
        }
         &.live-type-green {
            span{
                &.active{
                   color: #0B9B71; 
                }
            }
        }
        &.live-type-maingreen {
            span{
                &.active{
                   color: #01BE79; 
                }
            }
        }
       
        .mess,.gz-grade {
            position: absolute;
            right: .2rem;
            top: 0.1rem;
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            background: url("../assets/images/newHome/serch.png") no-repeat center;
            background-size: 64%;
           
        }
        &.goldenHeader{
            span{
                &.active{
                    color: #E3CF95
                }
            } 
            .mess{
                background: url("../assets/images/skin/golden/serch.png") no-repeat center;
                background-size: 64%;
            }
        }
        
    }

       
</style>