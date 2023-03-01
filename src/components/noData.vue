<template>
  <div class="no-data">
    <ul class="no-data-list">
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div class="img-box"></div>
          <div class="mess-box"></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'noData',
  data(){
      return{

      }
  }

}
</script>

<style scoped lang="less">
  .no-data-list{
    overflow: hidden;
    padding-left: .3rem;
    li{
      float: left;
      width: 50%;
      padding:0 .3rem .3rem 0;
      >a{
        display: block;
        position: relative;
      }
      .img-box{
        height: 3rem;
        background: #ccc;
      }
      .mess-box{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .7rem;
        background:rgba(0,0,0,.5);
      }
    }
  }
</style>
