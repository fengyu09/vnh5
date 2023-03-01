<template>
  <div class="main-footer">
    <ul :class="[{'pink-extend-fotter':$st.state.skin==1},{'blue-extend-fotter':$st.state.skin==2},{'green-extend-fotter':$st.state.skin==3},{'golden-extend-fotter':$st.state.skin==5}]">
      <li @click="getClick('Thống kê đội')">
        <router-link to="/team">
          <i class="icon icon-home"></i>
          <p>{{$t('invite.footer_extend[0]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('Báo cáo thành viên')">
        <router-link to="/memberReport">
          <i class="icon icon-kj"></i>
          <p>{{$t('invite.footer_extend[1]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('Báo cáo phụ')">
        <router-link to="/nextReport">
          <i class="icon icon-guess"></i>
          <p>{{$t('invite.footer_extend[2]')}}</p>
        </router-link>
      </li>
      <li @click="getClick('mời gọi')">
        <router-link to="/invite">
          <i class="icon icon-member"></i>
          <p>{{$t('invite.footer_extend[3]')}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getClickTimes } from '../assets/js/public'
export default {
  name: "foot",
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    getClick(type){
      getClickTimes(type);
    },
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
.main-footer {
  max-width: 750px;
  position: fixed;
  width: 100%;
  height: 1.4rem;
  bottom: 0;
  z-index: 100;
  // box-shadow: 0px -2px 5px #f5f5f5;
  background: #fff;

  ul {
    overflow: hidden;
    > li {
      float: left;
      width: 21.6%;
      text-align: center;
      overflow: hidden;
      &:nth-of-type(2){
        width: 35%;
      }
      .padNone{
        padding-top: 0!important;
      }
      > a {
        display: block;
        font-size: 0.3rem;
        padding: 0.2rem 0;
        p {
          // font-weight: bold;
        }
        > .icon {
          display: inline-block;
          width: 0.54rem;
          height: 0.54rem;
        }
        .icon-home {
          background: url("../assets/images/extend/tdtj.png") no-repeat center;
          background-size: contain;
        }
        .icon-kj {
          background: url("../assets/images/extend/hygl.png") no-repeat center;
          background-size:contain;
        }
        .icon-guess {
          background: url("../assets/images/extend/xjbb.png") no-repeat center;
          background-size:contain;
        }
        .icon-member {
          background: url("../assets/images/extend/yq.png") no-repeat center;
          background-size:contain;
        }

        
        &.router-link-exact-active {
          p{
            color: #1486FF;
          }
          .icon-home{
            background: url("../assets/images/extend/tdtj_active.png") no-repeat center;
            background-size:contain;
          }
          .icon-kj{
            background: url("../assets/images/extend/hygl_active.png") no-repeat center;
            background-size:contain;
          }
          .icon-guess{
            background: url("../assets/images/extend/xjbb_active.png") no-repeat center;
            background-size:contain;
          }
          .icon-member{
            background: url("../assets/images/extend/yq_active.png") no-repeat center;
            background-size:contain;
          }
         
        }
      }
    }
    i {
      display: inline-block;
    }
  }
  .pink-extend-fotter{
    a{
      p{
        color: #E3AAAA;
      }
      .icon-home{
            background: url("../assets/images/skin/pink/tdtj.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/pink/hygl.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/pink/xjbb.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/pink/yq.png") no-repeat center!important;
            background-size:contain!important;
          }
      &.router-link-exact-active {
          p{
            color: #FB796B !important;
          }
          .icon-home{
            background: url("../assets/images/skin/pink/tdtj_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/pink/hygl_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/pink/xjbb_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/pink/yq_active.png") no-repeat center!important;
            background-size:contain!important;
          }
         
        }
    }
      
  }

  .blue-extend-fotter{
    a{
      p{
        color: #72A5C1;
      }
       .icon-home{
            background: url("../assets/images/skin/blue/tdtj.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/blue/hygl.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/blue/xjbb.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/blue/yq.png") no-repeat center!important;
            background-size:contain!important;
          }
      &.router-link-exact-active {
          p{
            color: #0CB6D9 !important;
          }
          .icon-home{
            background: url("../assets/images/skin/blue/tdtj_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/blue/hygl_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/blue/xjbb_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/blue/yq_active.png") no-repeat center!important;
            background-size:contain!important;
          }
         
        }
    }
      
  }

    .green-extend-fotter{
    a{
      p{
        color: #92BCB2;
      }
       .icon-home{
            background: url("../assets/images/skin/green/tdtj.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/green/hygl.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/green/xjbb.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/green/yq.png") no-repeat center!important;
            background-size:contain!important;
          }
      &.router-link-exact-active {
          p{
            color: #1FBF91 !important;
          }
          .icon-home{
            background: url("../assets/images/skin/green/tdtj_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/green/hygl_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/green/xjbb_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/green/yq_active.png") no-repeat center!important;
            background-size:contain!important;
          }
         
        }
    }
      
  }
    .maingreen-extend-fotter{
    a{
      p{
        color: #71929D;
      }
      &.router-link-exact-active {
          p{
            color: #01BE79 !important;
          }
          .icon-home{
            background: url("../assets/images/skin/maingreen/tdtj_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/maingreen/hygl_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/maingreen/xjbb_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/maingreen/yq_active.png") no-repeat center!important;
            background-size:contain!important;
          }
         
        }
        .icon-home{
            background: url("../assets/images/skin/maingreen/tdtj.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/maingreen/hygl.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/maingreen/xjbb.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/maingreen/yq.png") no-repeat center!important;
            background-size:contain!important;
          }
    }
      
  }
    .golden-extend-fotter{
      background: #1F252C;
      box-shadow: 0px 0px 0px #f5f5f5;
    a{
      p{
        color: #928151;
      }
      &.router-link-exact-active {
          p{
          color: #E3CF95!important;
          }
          .icon-home{
            background: url("../assets/images/skin/golden/tdtj_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/golden/hygl_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/golden/xjbb_active.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/golden/yq_active.png") no-repeat center!important;
            background-size:contain!important;
          }
         
        }
        .icon-home{
            background: url("../assets/images/skin/golden/tdtj.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-kj{
            background: url("../assets/images/skin/golden/hygl.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-guess{
            background: url("../assets/images/skin/golden/xjbb.png") no-repeat center!important;
            background-size:contain!important;
          }
          .icon-member{
            background: url("../assets/images/skin/golden/yq.png") no-repeat center!important;
            background-size:contain!important;
          }
    }
      
  }
}
</style>
