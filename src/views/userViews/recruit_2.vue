<template>
  <div>
    <myScroll :top="0" :bottom="0" :isDown="true" ref="scrollWrapper">
      <div class="recruit">
        <div class="bg">
          <img src="../../assets/images/chat/zm_bg-min.png" alt />
          <router-link to="/">
            <div></div>
          </router-link>
        </div>
        <!-- 热门栏 -->
        <div class="show">
          <div class="show_tit">
            <ul class="clearfix">
              <li class="fl">明星主播</li>
              <li class="fl">专家主播</li>
              <li class="fl">人气主播</li>
            </ul>
          </div>
          <div class="show_content">
            <div class="SC_1 clearfix">
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
            </div>
            <div class="SC_2 clearfix">
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
              <div class="SC_img1 fl">
                <div class="img">
                  <img src="../../assets/images/main/web_40.png" alt />
                </div>
                <div class="name">杨洋</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <div class="list">
          <div class="list_tit">
            <h3>极速赛车</h3>
          </div>
          <div class="list_c">
            <ul class="clearfix">
              <li class="fl">
                <router-link to="/">
                  <div class="list_img">
                    <img src="../../assets/images/main/web_40.png" alt />
                    <div class="list_img_1">极速赛车</div>
                    <div class="list_img_2">
                      <div></div>
                      <div>大黄瓜</div>
                    </div>
                    <div class="list_img_3">
                      <div>1231</div>
                    </div>
                  </div>
                  <div class="bto">PK10冲关挑战</div>
                </router-link>
              </li>
              <li class="fl">
                <router-link to="/">
                  <div class="list_img">
                    <img src="../../assets/images/main/web_40.png" alt />
                    <div class="list_img_1">极速赛车</div>
                    <div class="list_img_2">
                      <div></div>
                      <div>大黄瓜</div>
                    </div>
                    <div class="list_img_3">
                      <div>1231</div>
                    </div>
                  </div>
                  <div class="bto">PK10冲关挑战</div>
                </router-link>
              </li>
              <li class="fl">
                <router-link to="/">
                  <div class="list_img">
                    <img src="../../assets/images/main/web_40.png" alt />
                    <div class="list_img_1">极速赛车</div>
                    <div class="list_img_2">
                      <div></div>
                      <div>大黄瓜</div>
                    </div>
                    <div class="list_img_3">
                      <div>1231</div>
                    </div>
                  </div>
                  <div class="bto">PK10冲关挑战</div>
                </router-link>
              </li>
              <li class="fl">
                <router-link to="/">
                  <div class="list_img">
                    <img src="../../assets/images/main/web_40.png" alt />
                    <div class="list_img_1">极速赛车</div>
                    <div class="list_img_2">
                      <div></div>
                      <div>大黄瓜</div>
                    </div>
                    <div class="list_img_3">
                      <div>1231</div>
                    </div>
                  </div>
                  <div class="bto">PK10冲关挑战</div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </myScroll>
  </div>
</template>

<script>
import myScroll from "../../components/myScroll.vue";
export default {
  name: "recruit",
  components: { myScroll },

  mounted() {
    this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
    this.$refs.scrollWrapper.enable(); //启动滚动条
    this.$refs.scrollWrapper.disable(); //禁止滚动条
  }
};
</script>

<style scoped lang="less">
.recruit {
  .bg {
    width: 100%;
    position: relative;
    div {
      position: absolute;
      background: url("../../assets/images/withdrawals/fanhui.png") no-repeat;
      background-size: 100% 100%;
      top: 12%;
      left: 5%;
      width: 0.2rem;
      height: 0.4rem;
    }
  }
  .show {
    color: #fff;
    margin: 0 5%;
    border-radius: 10px;
    overflow: hidden;
    .show_tit {
      background-color: #ff678d;
      text-align: center;
      ul {
        li {
          font-size: 0.4rem;
          width: 33.33%;
          padding: 4% 0;
        }
      }
    }
    .show_content {
      background-color: #f3adb1;
      .SC_img1 {
        width: 25%;
        padding: 4% 4% 0 4%;
        text-align: center;
        .name {
          padding-top: 15%;
        }
        .img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            height: 100%;
            width: auto;
          }
        }
      }
      .SC_2 {
        margin-left: 10%;
        padding-bottom: 5%;
        // text-align: center;
        .SC_img1 {
          margin-left: 3%;
        }
      }
    }
  }
  .list {
    // margin-bottom: 3rem;
    margin: 18% 4% 0 5%;
    .list_tit {
      text-align: center;
      padding-bottom: 12%;
      position: relative;
      margin-left:14%;
      &:before{
         content: '';
         position: absolute;
         top: -75%;
         left: 11%;
         background: url('../../assets/images/main/zm_qiche.png') no-repeat center;
         background-size: contain;
         width: 2.2rem;
         height: 1.8rem;
      }
    }
    .list_c {
      font-size: 0.32rem;
      
      ul {
        li {
          border-radius: 5px;
          width: 48%;
          margin-right: 2%;
          margin-bottom: 4%;
          box-shadow: 0 7px 15px 5px #e9e9e9;
          .list_img {
            position: relative;
            border-radius: 5px 5px 10px 10px;;
            overflow: hidden;
            .list_img_1 {
              font-size: 0.32rem;
              padding: 0.05rem 0.12rem;
              position: absolute;
              left: 0;
              top: 0;
              border-radius: 5px 0 10px 0;
              background: -webkit-gradient(
                linear,
                left top,
                right top,
                from(#ff4444),
                to(#ffc37d)
              );
              background: linear-gradient(to right, #ff4444, #ffc37d);
              color: #fff;
            }
            .list_img_2{
              color: #fff;
              position: absolute;
              bottom: 7%;
              left: 5%;
              div{
                display: inline-block;
                &:nth-child(1){
                  width: 0.2rem;
                  height: 0.2rem;
                  border-radius: 50%;
                  background-color:#41d788 ;
                }
              }
            }
            .list_img_3{
              color: #fff;
              position: absolute;
              right: 6%;
              bottom: 7%;
              &:before{
                content: '';
                position: absolute;
                top: -5%;
                left: -65%;
                width: 0.5rem;
                height: 0.5rem;
                background: url('../../assets/images/main/zm_yanjing.png') no-repeat center;
                background-size: contain;
              }
            }
          }
          .bto{
            padding: 5% 0 8% 5%;
            
          }
        }
      }
    }
  }
}
</style>