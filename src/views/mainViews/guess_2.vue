<template>
  <div>
    <!--playList :需要传一个数据进来，因为当数据发生变化时，滚动条也需要refresh刷新 必选-->
    <!--isDown:是否需要下拉刷新 如果为true 那么需要有 isLoad属性 如果为false isLoad不需要-->
    <!--isUp:是否需要上拉加载更多 如果为true 那么需要有 isloadUp属性 如果为false isloadUp不需要-->
    <!--reLoad：回调函数  下拉刷新或者上拉加载更多调用接口-->
      <!-- 标题 -->
      <div class="header">
        <div class="tit">
          <span style="color:#ec91ac;">竞</span>猜中心
        </div>
        <div class="issue">
          <span></span>
          <span>发布竞猜</span>
        </div>
      </div>
    <myScroll
      :top='0'
      ref="scrollWrapper"
      :isDown="true"
      v-on:func="reLoad"
    >
      <!-- 标题 -->
      <!-- <div class="header">
        <div class="tit">
          <span style="color:#ec91ac;">竞</span>猜中心
        </div>
        <div class="issue">
          <span></span>
          <span>发布竞猜</span>
        </div>
      </div> -->
      <!-- 信息 -->
      <div class="info_box clearfix">
        <div class="xin fl">
          <div class="tit">幸运飞艇</div>
          <div class="photo">
            <img src="../../assets/images/chat/2.jpg" alt />
          </div>
          <div class="name">况鸿厚</div>
          <div style="color:#fce2b7;">周盈利</div>
          <div class="ziti pct">4234%</div>
        </div>
        <div class="fucai fl">
          <div class="tit">福利3D</div>
          <div class="photo">
            <img src="../../assets/images/chat/2.jpg" alt />
          </div>
          <div class="name">况鸿厚</div>
          <div style="color:#fce2b7;">周盈利</div>
          <div class="ziti pct">192%</div>
        </div>
        <div class="aozhou fl">
          <div class="tit">澳洲幸运5</div>
          <div class="photo">
            <img src="../../assets/images/chat/2.jpg" alt />
          </div>
          <div class="name">况鸿厚</div>
          <div style="color:#fce2b7;">周盈利</div>
          <div class="ziti pct">34%</div>
        </div>
        <div class="shishi fl">
          <div class="tit">重庆时时彩</div>
          <div class="photo">
            <img src="../../assets/images/chat/2.jpg" alt />
          </div>
          <div class="name">况鸿厚</div>
          <div style="color:#fce2b7;">周盈利</div>
          <div class="ziti pct">553%</div>
        </div>
      </div>
      <!-- 幸运飞艇 -->
      <div class="feiTing_box">
        <div class="title clearfix">
          <div class="tit_left fl">幸运飞艇</div>
          <div class="tit_right fr">
            <span>距离256期   </span>
            <span class="ziti">03:59:48</span>
          </div>
        </div>
        <div class="content_box clearfix">
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="ziti">付费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="footer color clearfix">
          <!-- <ion-icon name="refresh"></ion-icon> -->
          <!-- <x-icon type="ios-refresh" size="30"></x-icon> -->
          <span class="fr">换一换</span>
        </div>
      </div>
      <!-- 幸运飞艇 -->
      <div class="feiTing_box">
        <div class="title clearfix">
          <div class="tit_left fl">幸运飞艇</div>
          <div class="tit_right fr">
            <span>距离256期   </span>
            <span class="ziti">03:59:48</span>
          </div>
        </div>
        <div class="content_box clearfix">
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="color">免费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="one clearfix fl">
            <div class="one_l fl">
              <div class="photo_l">
                <img src="../../assets/images/chat/2.jpg" alt />
              </div>
              <div>白新</div>
            </div>
            <router-link to="/">
              <div class="one_r fr">
                <div>
                  <span></span>
                  <span class="ziti">付费查看</span>
                </div>
                <div class="one_r1">
                  <span>胜率</span>
                  <span class="ziti">59%</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="footer color clearfix">
          <!-- <ion-icon name="refresh"></ion-icon> -->
          <!-- <x-icon type="ios-refresh" size="30"></x-icon> -->
          <span class="fr">换一换</span>
        </div>
      </div>
      <div class="bot">Tôi cũng có giới hạn đó~~</div>
    </myScroll>
    <Loading :show="isToast" />
    <Foot />
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
import { Loading } from "vux";
import Foot from "../../components/footer.vue";
import nodata from "../../components/noData.vue";
export default {
  components: { myScroll, Loading, Foot, nodata },
  name: "guess",
  data() {
    return {
      hotHot: [
        {
          img: "1",
          name: "lisa"
        },
        {
          img: "2",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "1",
          name: "lisa"
        },
        {
          img: "2",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "1",
          name: "lisa"
        },
        {
          img: "2",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "1",
          name: "lisa"
        },
        {
          img: "2",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "3",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        },
        {
          img: "4",
          name: "lisa"
        },
        {
          img: "5",
          name: "lisa"
        }
      ],
      playList: "",
      isL: false, //是否显示 下拉刷新的组件
      isLup: false, //是否显示 上拉加载更多的组件
      page: 0, //页码
      isMorePage: true, //判断是否有下一页
      isToast: false,
      src: "../../assets/images/main/2.jpg" //图片路径
    };
  },
  created() {
    //        模拟数据加载
    //显示loading图标
    // this.isToast = true;
    // setTimeout(() => {
    //   this.playList = this.hotHot;
    //   this.isToast = false;
    // }, 3000);
  },
  mounted() {
    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.enable(); //启动滚动条
    this.$refs.scrollWrapper.disable(); //禁止滚动条
    document.body.addEventListener('touchmove', function (e) {
           e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
       }, {passive: false});
  },
  methods: {
    // reLoad(data) {
    //   if (data == "down") {
    //     this.refreshData(data);
    //   } else if (data == "up") {
    //     this.loadMore(data);
    //   }
    // },
    
    // refreshData(data) {
    //   //模拟数据请求
    //   this.isL = true;
    //   setTimeout(() => {
    //     console.log(data);
    //     this.page = 1;
    //     this.isL = false;
    //   }, 2000);
    // },
    // loadMore(data) {
    //   //使用refresh 方法 来更新scroll 解决无法滚动的问题
    //   //判断是否有下一页
    //   if (this.isMorePage) {
    //     this.isLup = true;
    //     this.page++;

    //   }
    // }
  }
};
</script>

<style scoped lang="less">
// 字体
.ziti {
  font-family: "number2";
  color: #de2715;
}
.color {
  color: #8f9398;
}
.header {
  text-align: center;
  position: relative;
  background-color: #fff;

  .issue {
    position: absolute;
    right: 5%;
    top: 0%;
    display: none;
  }
  .tit {
    letter-spacing: 8px;
    font-size: 0.5rem;
    span {
      font-size: 0.6rem;
    }
  }
}
.info_box {
  padding: 15% 3% 0 5%;
  text-align: center;
  color: #fff;
  margin: 2% 0 10%;
  > div {
    // box-sizing: border-box;
    width: 23%;
    display: inline-block;
    margin-right: 2%;
    background-color: #ee7a7a;
    border-radius: 0 0 15px 15px;
    &:nth-last-child(1) {
      margin-right: 0;
      background-color: #b195fa;
      margin-top: 9%;
      .tit {
        background-color: #b195fa;
      }
    }
    &:nth-child(2) {
      background-color: #fea8a3;
      margin-top: 3%;
      .tit {
        background-color: #fea8a3;
      }
    }
    &:nth-child(3) {
      background-color: #88d8ff;
      margin-top: 6%;
      .tit {
        background-color: #88d8ff;
      }
    }
    .tit {
      padding: 5%;
      width: 110%;
      margin-left: -5%;
      margin-top: -5%;
      border-radius: 15px;
      border: 1px #fff solid;
      background-color: #ee7a7a;
    }
    .photo {
      margin: auto;
      width: 70%;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 25%;
      margin-bottom: 15%;
      box-shadow: 0px 5px 15px #fff;
    }
    .name {
      margin-bottom: 17%;
    }
    .pct {
      margin-top: 8%;
      margin-bottom: 20%;
      font-size: 0.4rem;
    }
  }
}
.feiTing_box {
  margin: 0 5% 0 5%;
  // padding: 0 3% 0 5%;
  .title{
    margin: 0 2% 0 2%;
    .tit_left{
      font-size: 0.5rem;
      color: #000;
    }
    .tit_right{
      font-family: "number2";
      font-size: 0.4rem;
      margin-top: 2%;
    }
  }
  .content_box {
    margin-top: 5%;
    .one {
      width: 48%;
      background-color: #fff;
      box-shadow: 0px 5px 15px #e9e9e9;
      border-radius: 10px;
      margin: 0% 2% 3% 0;
      &:nth-child(2){margin: 0% 0% 3% 0;}
      &:nth-child(4){margin: 0% 0% 3% 0;}
      .one_l {
        width: 40%;
        margin: 8% 3% 11% 3%;
        text-align: center;
        .photo_l {
          width: 80%;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 5% auto;
        }
      }
      .one_r {
        margin: 20% 17% 0 0;
        .one_r1 {
          margin-top: 15%;
        }
      }
    }
  }
  .footer{
    padding:0 3%;
  }
}

.bot{
    text-align: center;
    font-size: 0.3rem;
    color: #666;
    padding: 1rem 0;
}
</style>
  