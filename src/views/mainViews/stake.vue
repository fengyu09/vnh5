<template>
  <div class="stake">
    <div class="head">
      <span @click="goback" class="headPic">
        <img style="width: 0.25rem;" src="../../assets/images/gray-back-icon.png" alt />
      </span>
      <span class="headZl">购彩</span>
      <!-- <div  @click="save('middle')">保存</div> -->
    </div>
    <myScroll :bottom="0" id="con">
      <iframe :src="src" id="myiframe" scrolling="no" frameborder="0"></iframe>
    </myScroll>
    <!-- <Foot /> -->
  </div>
</template>


<script>
// import Foot from "../../components/footer.vue";
import myScroll from "../../components/myScroll.vue";
export default {
  name: "stake",
  data() {
    return {
      src: "https://www.h7398.com/?f=593878"
    };
  },
  props: {},
  components: {
    myScroll
    // Foot
  },

  mounted() {},
  computed: {},
  mounted() {},
  created() {
    // this.init();
  },
  methods: {
    goback() {
      this.$ro.push("/");
    }
  }
};
</script>

<style scoped lang="less">
.head {
  width: 100%;
  height: 45px;
  display: block;
  line-height: 45px;
  position: relative;
  .headPic {
   position: absolute;
    left:0;
    text-align: center;
    width:1rem;
    height: 100%;
    display: block;
    margin-top: 0.3em;
  }
  .headZl {
    text-align: center;
    font-size: 1.3em !important;
    font-weight: 700;
    display: block;
    overflow: hidden;
  }
}

#con {
  div {
    .content {
      height: 100% !important;
    }
  }
}

#myiframe {
  width: 100%;
  height: 100%;
}
</style>
