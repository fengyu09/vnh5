<template>
  <div class="can-not-find">
      <div class="img-not-find"><img src="../assets/images/404.jpg" alt=""></div>
      <p>这里什么都没有。<i>{{count}}</i>秒后自动跳转到首页</p>
  </div>
</template>

<script>
export default {
  name: 'noFund',
  data(){
    return {
      count:5
    }
  },
  mounted(){
    let trv=setInterval(()=>{
      this.count--;
      if(this.count==0){
        clearInterval(trv);
        this.$router.push("/");
      }
    },1000);
  }
}
</script>

<style scoped lang="less">
    .can-not-find{
        text-align: center;
        .img-not-find{
            display: inline-block;
            width: 50%;
        }
        margin: 40% auto 0;
        p{
            font-size: .38rem;
            line-height: .6rem;
            i{
                color: #ff513e;
                font-family: number1;
                font-weight: bold;
                padding:0 .1rem;
            }
        }
    }
</style>
