<template>
    <div>
        <div class="head">
            <img v-if="noticeType==1" class="logo" src="../assets/images/newLogo.png" alt="">
            <img v-else class="logo" src="../assets/images/newLogoDl.png" alt="">
            <div class="right">
                <img src="../assets/images/Subtract.png" alt="">
                <img src="../assets/images/xx.png" alt="">
            </div>
        </div>

        <div class="main">
            <p class="address">最近访问地址列表</p>
            <div class="list">
                <div class="item zg">
                    <div class="left">
                        <img src="../assets/images/zg.png" alt="">
                        <span>772ms</span>
                    </div>
                    <div class="cen">www.k188.com</div>
                    <div class="rig">
                        <span>迟高</span>
                        
                        <img src="../assets/images/jt.png" alt="">
                    </div>
                </div>
                <div class="item zd">
                    <div class="left">
                        <img src="../assets/images/zd.png" alt="">
                        <span>772ms</span>
                    </div>
                    <div class="cen">www.k188.com</div>
                    <div class="rig">
                        <span>迟高</span>
                        
                        <img src="../assets/images/jt.png" alt="">
                    </div>
                </div>
                <div class="item zg1">
                    <div class="left">
                        <img src="../assets/images/zg1.png" alt="">
                        <span>772ms</span>
                    </div>
                    <div class="cen">www.k188.com</div>
                    <div class="rig">
                        <span>迟高</span>
                        
                        <img src="../assets/images/zdr.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sudu",
        data(){
            return{
                src:''
            }
        },
        created(){
         
        },
        methods: {
          
        },
    }
</script>

<style scoped lang="less">
.head{
    width:100%;
    height: 1.2rem;
    z-index: 1;
    position: relative!important;
    background: linear-gradient(
89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
    text-align: center;
        .logo{
        display: inline-block;
            width: 3.1rem;
            height: 1.06666667rem;
            height: 0.9rem;
            top: 0.15rem;
            position: relative;
        }
        .right{
            position:absolute;
            right: 2%;
    top: 23%;
            img{ width: 0.6rem;margin-left:0.2rem}
           
        }
}



</style>