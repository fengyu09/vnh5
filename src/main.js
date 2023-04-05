import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import axios from "../node_modules/axios";
import CryptoJS from "crypto-js";
import router from "./router";
import i18n, { SetLanguage } from "./i18n/index";
Vue.prototype.$SetLanguage = SetLanguage;

//样式初始化
import "./assets/css/common.css";
import "fetch-detector";
import "fetch-ie8";
import "./assets/js/flexible.js";
import filters from "./filters/fliters.js";
import VueKonva from "vue-konva";
// import preview from "vue-photo-preview";
// Vue.use(preview, options);
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import "videojs-contrib-hls";
import Tool from "./assets/js/tool";
import vuePicturePreview from 'vue-picture-preview' 
import VueTouch from 'kim-vue-touch'
Vue.use(VueTouch)
Vue.use(vuePicturePreview);
Vue.prototype.globalPpproach = Tool;
Vue.prototype.$video = videojs;

var options = {
  showHideOpacity: true,
  hideAnimationDuration: 0,
  showAnimationDuration: 0,
  tapToClose: true,
  arrowEl: false,
  fullscreenEl: false,
  zoomEl: false,
};

Vue.use(VueKonva);

for (let k in filters) {
  Vue.filter(k, filters[k]);
}

const FastClick = require("fastclick");
FastClick.attach(document.body);
document.addEventListener("visibilitychange", function(e) { 
  if(store.state.userinfo.id){
    if(document.visibilityState=='hidden'){
      axios.post('/nodeapi/setOnline/',{id:store.state.userinfo.id,onLine:0}).then(res=>{
        });
    }else{
      axios.post('/nodeapi/setOnline/',{id:store.state.userinfo.id,onLine:1}).then(res=>{
      });
    }
  }
})
import LoadingPlugin from "vux/src/plugins/loading/index.js";
import ToastPlugin from "vux/src/plugins/toast/index.js";
import AlertPlugin from "vux/src/plugins/alert/index.js";
import ConfirmPlugin from "vux/src/plugins/confirm/index.js";
import XButton from "vux/src/components/x-button/index.vue";
import XHeader from "vux/src/components/x-header/index.vue";
import Group from "vux/src/components/group/index.vue";
import XInput from "vux/src/components/x-input/index.vue";
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin, { position: "middle", time: 2000 });
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
import { Icon } from 'vux'

Vue.component('icon', Icon)
Vue.component("x-button", XButton);
Vue.component("x-header", XHeader);
Vue.component("group", Group);
Vue.component("x-input", XInput);

import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  error: require("./static/site/imgs/load.jpg"),
  loading: require("./static/site/imgs/load.jpg"),
});

import Popup from "./components/mackjs.js";
Vue.prototype.$popup = Popup.install;
Vue.prototype.$swBox = Popup.sw;
Vue.prototype.$inputBox = Popup.srk;
Vue.prototype.$publicPop = Popup.pbpop;

import myScroll from "./components/myScroll";
import myScrollX from "./components/myScrollX";
import Footer from "./components/footer";
// import Banner from "./components/banner";
Vue.component("myScroll", myScroll);
Vue.component("myScrollX", myScrollX);
Vue.component("Footer", Footer);
// Vue.component("Banner", Banner);

Vue.config.productionTip = false;
Vue.prototype.$st = store;
Vue.prototype.$ro = router;
Vue.prototype.$http = axios;
Vue.prototype.versionLive = "/odds/"; //直播api 体育队伍信息
Vue.prototype.versionLive2 = "/api/v2/"; //直播api2  现在用这个
Vue.prototype.version = "/api/user/"; //用户中心

//打包需要切换
// Vue.prototype.noticeType = 2; //代理
Vue.prototype.noticeType = 1 //官方111


// Vue.prototype.defalutLan = 'vi-vn'; //默认语言 越南
// Vue.prototype.defalutLan = 'en'; //默认语言 英文

// Vue.prototype.lanCode = 1; // 暂时只用到1  什么版本 2 66w.vip英文版本  1 k188.bet kiss588越南文版本  3中文版本  4 泰文版本 5 k188.bet英文版本


//还有index.html

import "vant/lib/index.css";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);

import clipboard from "clipboard";
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

//请求次数
Vue.prototype.$http.defaults.retry = 3;
//请求间隙
Vue.prototype.$http.defaults.retryDelay = 2000;
//超时时间
Vue.prototype.$http.defaults.timeout = 30000;
//请求头 直播那边 统一
Vue.prototype.$http.defaults.headers["token"] = store.state.codeToken;

let reMethod = "";
// Vue.prototype.isEncrypt = 0;
// 请求拦截
Vue.prototype.$http.interceptors.request.use(
  (request) => {
    //终止node请求
    // if(request.url.indexOf('/nodeapi')>-1){
    //   return false
    // }
    reMethod = request.method;
    if (request.method == "get") {
     
      //添加时间戳
      request.params = {
        t: Date.now(),
        code: localStorage.getItem("defalutLan") || Vue.prototype.defalutLan,
        // code: Vue.prototype.defalutLan,
        ...request.params,
      };
    } else if (request.method == "post") {
      let data = request.data;
      
      (request.data = {
        // code: Vue.prototype.defalutLan, //追加的参数
        code: localStorage.getItem("defalutLan") || Vue.prototype.defalutLan,
        ...data, //拼接参数
      }),
        (request.params = {
          // code:  Vue.prototype.defalutLan,
          code: localStorage.getItem("defalutLan") || Vue.prototype.defalutLan,
          ...request.params, //拼接参数
        });
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

var ECBOptions = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
  iv: "",
};
const keySize = 128;
// Qez8L4xSH9TCmlXM
// 1c15a7
const fillKey = (key) => {
  const filledKey = Buffer.alloc(keySize / 8);
  const keys = Buffer.from(key);
  if (keys.length < filledKey.length) {
    filledKey.map((b, i) => (filledKey[i] = keys[i]));
  }
  return filledKey;
};
// let key = CryptoJS.enc.Utf8.parse('216f22c3fd9c5596'); //对内测试
// let key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
// let key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
let key = CryptoJS.enc.Utf8.parse("e7df4a1a61d61204"); //k188生产环境0
// let key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南版恭喜发财生产环境
// 加密
Vue.prototype.encrypt = function(data, type) {
  // console.log(this.$store.state.userinfo.user_id)
  if (store.state.decipher_str && store.state.codeToken && !type) {
    key = CryptoJS.enc.Utf8.parse(this.$st.state.decipher_str);
  } else {
    // key = CryptoJS.enc.Utf8.parse('216f22c3fd9c5596'); //对内测试
    // key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
    //  key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
    key = CryptoJS.enc.Utf8.parse("e7df4a1a61d61204"); //k188生产环境
    // key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南版恭喜发财生产环境
  }
  if (typeof data == "object") {
    data.timestamp = new Date()
      .getTime()
      .toString()
      .substring(0, 10);
  }
  let scrs = JSON.stringify(data);
  let encrypted = CryptoJS.AES.encrypt(scrs, key, ECBOptions);
  // var Base64Text= CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  const base64Cipher = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return base64Cipher;
};
// 解密
Vue.prototype.decrypt = function(data, type) {
  if (store.state.decipher_str && store.state.userinfo.user_id && !type) {
    key = CryptoJS.enc.Utf8.parse(store.state.decipher_str);
  } else {
    // key = CryptoJS.enc.Utf8.parse('216f22c3fd9c5596'); //对内测试
    // key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
    // key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
    key = CryptoJS.enc.Utf8.parse("e7df4a1a61d61204"); //k188生产环境
    // key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南版恭喜发财生产环境
  }
  var bytes = CryptoJS.AES.decrypt(data, key, ECBOptions);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};


function noLogin() {
  Vue.prototype.$http.defaults.headers["token"] = "";
  store.commit("SETUSERTOKEN", "");
  store.commit("SETUSERINFO", "");
  store.commit("SETUSERNAME", "");
  store.commit("SETSAFEPWD", "");
  store.commit("SETPIC", "");
  store.commit("SETUSERVIP", "");
  store.commit("SETDIAMOND", "");
  store.commit("SETHDNOTICESCONTENT", "");
  store.commit("SETRAIN", false);
  localStorage.setItem("currCommonCard", "");
  localStorage.setItem("home_tab_nav", "");
  store.commit("SETHOMENAV", "");
  store.commit("SETUSDTLIST", []);
  store.commit("SETSDTYPE", "");
  store.commit("SETSDADR", "");
  localStorage.setItem("vtList", "");
}

function removeAllactive(allA) {
  for (let i = 0, len = allA.length; i < len; i++) {
    document.body.removeChild(allA[i]);
  }
}
//响应拦截
Vue.prototype.$http.interceptors.response.use(
  (response) => {
    if (response.status != 200) {
      Vue.$vux.loading.hide();
      return Promise.resolve();
    } else {
      if (
        response.data.code == 2003 ||
        response.data.code == 2001 ||
        response.data.data == 401
      ) {
       
      } else if (
        response.data.code == 2002 ||
        response.data.data == 401 ||
        response.data.code == 2000
      ) {
        //未登录或被挤掉
        if (
          response.config.url == "/api/live/sport/get_message_count/" || response.config.url == Vue.prototype.versionLive2 + "Recharge/get_commonno"
        ) {
          noLogin();
          Vue.prototype.$popup();
          let arrItem = document.querySelectorAll(".toLogin");
          let arrLen = arrItem.length;
          if (arrLen > 1) {
            removeAllactive(arrItem);
          }
          if (document.querySelector(".loading-tip"))
            document.querySelector(".loading-tip").style.display = "none";
        } else {
          setTimeout(function() {
            noLogin();
            if (document.querySelector(".loading-tip"))
              document.querySelector(".loading-tip").style.display = "none";
          }, 3000);
        }
      } else if (response.data.code == 1001) {
        //需要改回1001
        //用户异常
       if(Vue.prototype.lanCode==1){
        Vue.$vux.confirm.show({
          title: "Tài khoản bất thường",
          content:
            "Nếu muốn tiến hành thao tác mời liên hệ với bộ phận Chăm sóc khách hàng",
          confirmText: "Liên hệ bộ phận chăm sóc khách hàng",
          cancelText: "Hủy",
          onCancel: () => {
            noLogin();
           
            Vue.prototype.$ro.push("/login");
          },
          onConfirm: () => {
            window.open(JSON.parse(store.state.webInitData).customer);
          },
        });
       }else if(Vue.prototype.lanCode==2||Vue.prototype.lanCode==5){
        Vue.$vux.confirm.show({
          title: "Unusual account",
          content:
            "If you want to proceed with the operation, please contact Customer Care",
          confirmText: "Contact customer service",
          cancelText: "Cancel",
          onCancel: () => {
            noLogin();
           
            Vue.prototype.$ro.push("/login");
          },
          onConfirm: () => {
            window.open(JSON.parse(store.state.webInitData).customer);
          },
        });
       }
      } else {
        if(response.config.url.indexOf('user/balance')>-1){
          let pdata=response.data.data
          pdata.name=store.state.userinfo.username
          pdata.id=store.state.userinfo.id
          axios.post('/nodeapi/setuser/',pdata).then(res=>{
          //  console.log(res)
          });
          if(localStorage.getItem('isLogin')=='true'){
            noLogin()
          }
         }
        return response;
      }
    }
  },
  (error) => {
    //请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1 &&
      reMethod == "get"
    ) {
      var config = error.config;
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= config.retry) {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.text("timeout", "middle");
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // console.log(config.__retryCount)

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          //console.log('resolve');
          resolve();
        }, config.retryDelay || 1);
      });

      return backoff.then(function() {
        return axios(config);
      });
    } else if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1 &&
      reMethod == "post"
    ) {
      Vue.$vux.loading.hide();
      Vue.$vux.toast.text("timeout", "middle");
      return Promise.reject(error);
    } else if (error.response && error.response.status) {
      switch (
        error.response.status //根据状态码提示对应消息
      ) {
        case 401:
          if(Vue.prototype.lanCode==1){
            Vue.$vux.confirm.show({
              title: "Nhắc nhở",
              content:
                '<p style="font-size: 14px;padding-bottom: .2rem;padding-top: .2rem;color: #445779;font-weight: 500">Tài khoản của bạn đã được đăng nhập trên một thiết bị khác</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">Nếu bạn không phải là bạn, vui lòng liên hệ với bộ phận chăm sóc khách hàng</p>',
              confirmText: "Xác nhận",
              showCancelButton: false,
              onConfirm: () => {
                Vue.prototype.$st.commit('SETCHAT',false)
                Vue.prototype.$ro.push("/login");
              },
            });
          }else if(Vue.prototype.lanCode==2||Vue.prototype.lanCode==5){
            Vue.$vux.confirm.show({
              title: "Remind",
              content:
                '<p style="font-size: 14px;padding-bottom: .2rem;padding-top: .2rem;color: #445779;font-weight: 500">Your account is already logged in on another device</p><p style="font-size: 14px;padding-bottom: .2rem;color: #445779;font-weight: 500">If you are not, please contact customer service</p>',
              confirmText: "Confirm",
              showCancelButton: false,
              onConfirm: () => {
                Vue.prototype.$st.commit('SETCHAT',false)
                Vue.prototype.$ro.push("/login");
              },
            });
          }
          
          noLogin();
          break;
        case 404:
          
          break;
        case 500:
          if(Vue.prototype.lanCode==1){
            Vue.prototype.$publicPop({
              title: "",
              content: "Máy chủ đang bận, vui lòng thử lại sau",
              isShowCancelButton: false,
              clickCancel: () => {},
              clickConfirm: () => {},
            });
          }else if(Vue.prototype.lanCode==2||Vue.prototype.lanCode==5){
            Vue.prototype.$publicPop({
              title: "",
              content: "Server is busy, please try again later",
              isShowCancelButton: false,
              clickCancel: () => {},
              clickConfirm: () => {},
            });
          }
         
          break;
        case 504:
          if(Vue.prototype.lanCode==1){
            Vue.$vux.alert.show({
              title: "Nhắc nhở",
              content: "Hết thời gian chờ, vui lòng làm mới và thử lại",
            });
          }else if(Vue.prototype.lanCode==2||Vue.prototype.lanCode==5){
            Vue.$vux.alert.show({
              title: "Remind",
              content: "Timeout, please refresh and try again",
            });
          }
          
          break;
        default:
      }
    } else {
      console.error(error.response, "错误");
      Vue.$vux.loading.hide();
      return Promise.resolve();
    }
  }
);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
