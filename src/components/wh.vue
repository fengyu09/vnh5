<template>
    <div class="wh-page">
       <div class="wh-logo">
            <img src="../assets/images/wh_icon.png" alt="" srcset="">
       </div>
       <h1>{{ $t('home.text[11]')}}</h1>
       <div class="wh-img">
        <img src="../assets/images/wh_img.png" alt="" srcset="">
       </div>
       <div class="wh-text">
            <p>
                {{ $t('home.text[9]')}}
            </p>
            <p style="margin-top: 1rem;text-align: right;">
                {{ $t('home.text[10]')}}
            </p>
       </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'wh',
    data(){
      return{
        
      }
    },
    created(){
  
    },
    methods:{
  
    }
  }
  </script>
  
  <style scoped lang="less">
  .wh-page{
    position: fixed;
    color: #4A5161;
    width: 100%;
    top: 0;
    bottom: 0;
    background:url('../assets/images/wh_bg.jpg') no-repeat;
    background-size: 100% 100%;
    z-index: 999999;
    .wh-logo{
        text-align: center;
        margin-top: 2rem;
        img{
            width: 54%;
        }
    }
    .wh-img{
        text-align: center;
        img{
            width: 66%;
        }
    }
    h1{
        padding: 0.2rem 1.5rem;
        text-align: center;
        color: #4A5161;
    }
    .wh-text{
        padding: 0.2rem 1.2rem;
    }
  }
  </style>
  