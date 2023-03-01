<template>
  <div>
    <div id="demo">
      <!-- 遮罩层 -->
      <div class="container" v-show="panel">
        <div>
          <img id="image" :src="url" alt="Picture" />
        </div>

        <button type="button" id="button" @click="crop">Xác nhận</button>
      </div>

      <div class="head">
        <div @click="goback" class="back-icon">
          <img style="width: 0.25rem;" src="../../assets/images/gray-back-icon.png" alt />
        </div>
        <div class="headZl">Tư liệu cá nhân </div>
        <!-- <div  @click="save('middle')">保存</div> -->
      </div>
      <!-- <x-header title="use prop:个人资料"></x-header> -->
      <div style="padding:20px;background: #fff;height: 3.7rem; position: relative;">
        <div class="show" @click="popShow111()">
          <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
          <div class="txtTrue">
            <span>
              <img src="../../assets/images/member/pz.png" />
            </span>
          </div>
        </div>
      </div>
      <p class="title">昵称:</p>
      <div class="nickname" @focusout="inputBlur" @focusin="inputFocus">
        <x-input
          ref="input1"
          class="nick"
          style="height:1.3em;text-align: left!important"
          v-model="nickname"
          placeholder="请输入2-10位数昵称"
          :min="2"
          :max="10"
        ></x-input>
        <!--<input style="height:1rem;padding-left: .4rem" v-model="nickname" type="text" maxlength="10" placeholder="请输入昵称" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">-->
      </div>

      <p class="title">性别：</p>
      <div class="gender">
        <group style="margin:0">
          <popup-picker :data="list1" v-model="value3" ref="picker3" @on-change="onChange"></popup-picker>
        </group>
      </div>
      <p class="title">Chữ ký riêng：</p>
      <div class="area" @focusout="inputBlur" @focusin="inputFocus">
        <x-textarea
          style="height: 2.6rem!important;"
          class="text personal"
          placeholder="Vui lòng nhập chữ ký của bạ"
          v-model="connect"
          :max="50"
        >{{connect}}</x-textarea>
      </div>
      <x-button
        type="warn"
        style="border-radius: 99px;margin-bottom: 50px;margin-top:1.2rem;height: 1.2rem;font-size: 0.4rem"
        class="btn"
        @click.native="save('middle')"
      >保存</x-button>
      <!--<toast
      v-model="showPositionValue2"
      width="3rem"
      type="text"
      :time="800"
      is-show-mask
     text="昵称不能为空"
      :position="position"
     &gt;</toast>
      <!--<toast-->
      <!--v-model="showPositionValue"-->
      <!--width="3rem"-->
      <!--type="text"-->
      <!--:time="800"-->
      <!--is-show-mask-->
      <!--text="签名不能为空"-->
      <!--:position="position"-->
      <!--&gt;</toast>-->
      <!--<toast-->
      <!--v-model="showPositionValue1"-->
      <!--width="3rem"-->
      <!--type="success"-->
      <!--:time="800"-->
      <!--is-show-mask-->
      <!--text="保存成功"-->
      <!--:position="position"-->
      <!--&gt;</toast>-->
    </div>
    <div class="pop" v-show="show3" @click="close">
      <div class="popCon">
        <!-- cropper -->
        <!-- <cropper :headerImage="headerImage" @getHeaderImage="newHeaderImage"></cropper> -->
        <p class="posiPic bortop" style="color: #666666;line-height: 3.7em;height: 3.7em;">添加头像</p>
        <p class="posiPic txtClo">
          拍摄
          <input
            type="file"
            id="photo"
            ref="uploadInput"
            accept="image/*"
            capture="camera"
            @change="change"
          />
          <label for="change"></label>
        </p>
        <p class="posiPic borbot txtClo" style="margin-bottom: 0.5em;">
          从手机相册选择
          <input
            type="file"
            id="change"
            accept="image/png, image/jpeg, image/gif"
            @change="change"
            ref="uploadInput1"
          />
          <label for="change"></label>
        </p>
        <p class="txtClo" @click="close">Hủy</p>
      </div>
    </div>
  </div>
</template>
   
  <script>
import {
  //  XInput,
  XTextarea,
  TransferDom,
  Actionsheet,
  //  Group,
  //  Toast,
  //  XButton,
  //  Selector,
  PopupPicker
  //  Loading
} from "vux";
import Cropper from "cropperjs";
//import Axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["codeToken", "userinfo"])
  },
  components: {
    //    XInput,
    XTextarea,
    //    Group,
    //    Toast,
    //    XButton,
    //    Selector,
    PopupPicker
    //    Loading
    // Xheader,
  },
  data() {
    return {
      activeClass: 0,
      itemList: [{ text: "未选中" }],
      msg: "0",
      connect: "",
      position: "default",
      showPositionValue: false,
      showPositionValue1: false,
      showPositionValue2: false,
      nickname: "",
      sex: "男",
      show: false,
      show2: false,
      show3: false,
      headerImage: "",
      newHeaderImage: "",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      value3: ["Chưa chọn"],
      list1: [["Chưa chọn", "男", "女"]],
      url: "",
      timer:null,
      times:1,
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  mounted() {
    //    this.timer = setInterval(() => {
    //      console.log(this.$vux.loading.isVisible())
    //    }, 1000)

    //初始化这个裁剪框
    var self = this;
    var image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      autoCropArea: 0.8,
      ready: function() {
        self.croppable = true;
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created() {
    this.convert();
  },
  methods: {
    ...mapMutations(["SETPIC", "SETUSERNAME", "SETUSERINFO"]),
    trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐

        //  var changeName = localStorage.getItem('changeName');   // 昵称修改两次及两次以上需要收费的的判断
        //  if(changeName==2){
        //     this.$vux.toast.text("昵称修改两次及两次以上需要收费的哦", "middle");
        //   }
        this.timer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    },
    inputFocus(e) {
      // 如果focus，则移除上一个输入框的timer
      if (
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "input") ||
        (e &&
          e.target &&
          e.target.tagName &&
          e.target.tagName.toLowerCase() === "textarea")
      ) {
        clearTimeout(this.timer);
      }
    },

    onChange(val) {
      this.value3 == val[0];
    },

    showLoading() {
      this.$vux.loading.show({
        text: "Loading"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
      }, 2000);
    },
    //获取用户个人信息
    getUserInfo(flag) {
      if (!this.codeToken) return;

      //缓存个人资料
      if (!flag && this.userinfo.profile) {
        (this.nickname = this.userinfo.nickname || "我的昵称"),
          (this.connect = this.userinfo.profile || "Chữ ký riêng~"),
          (this.headerImage = this.userinfo.avatar);
        //性别
        if (this.userinfo.gender == "0") {
          this.value3 = ["Chưa chọn"];
        } else if (this.userinfo.gender == "1") {
          this.value3 = ["男"];
        } else if (this.userinfo.gender == "2") {
          this.value3 = ["女"];
        }
        return;
      }
      this.isL = true;
      this.$http.get("/api2/index/index").then(res => {
        if (res && res.data.code == 1) {
          this.isL = false;
          let gender = res.data.data.gender;
          if (gender == "0") {
            this.value3 = ["未选择"];
          } else if (gender == "1") {
            this.value3 = ["男"];
          } else if (gender == "2") {
            this.value3 = ["女"];
          }

          this.nickname = res.data.data.nickname || "我的昵称";
          this.connect = res.data.data.profile || "Chữ ký riêng~";
          // this.amount = "1000";
          this.headerImage =
            res.data.data.avatar == null
              ? "../../assets/images/main/1.jpg"
              : res.data.data.avatar;
          //更新个人信息
          this.SETUSERINFO(res.data.data);
        }
      });
    },
    async refreshPic() {
      let res = await this.$http.get("/api2/index/index");
      if (res && res.data.code == 1) {
        this.SETPIC(res.data.data.avatar);
        this.SETUSERINFO(res.data.data);
      }
    },
    getCouponSelected() {
//      console.log(this.couponSelected);
    },
    reload() {
      window.reload();
    },
    goback() {
      // this.$ro.push("/member");
      this.$ro.go(-1);
    },
    //    // 选择性别
    //    getItem(index) {
    //      this.activeClass = index;
    //    },

    //修改个人信息
    save(position) {
      this.position = position;
      if (this.trim(this.connect) == "") {
        this.$vux.toast.text("签名不能为空", "middle");
      } else if (this.trim(this.nickname) == "") {
        this.$vux.toast.text("昵称不能为空", "middle");
      } else {
        let gender = this.value3[0];
        if (gender == "女") {
          gender = 2;
        } else if (gender == "男") {
          gender = 1;
        } else if (gender == "Chưa chọn") {
          gender = 0;
        }
        
        this.$vux.loading.show();
        this.$http
          .post("/api2/index/edit", {
            nickname: this.trim(this.nickname),
            email: this.email,
            phone: this.phone,
            profile: this.trim(this.connect),
            gender: gender
          })
          .then(res => {
            this.$vux.loading.hide();
            if (res && res.data.code == 1) {
              this.SETUSERNAME(this.nickname);
              this.getUserInfo(true);
              // this.times++   //更改超过两次
              // window.localStorage.setItem('changeName',this.times.toString());

//              this.$vux.toast.text("", "middle");    
              this.$vux.toast.show({
                text: res.data.msg,
                position: "middle"
              });
              setTimeout(() => {
                this.$ro.push("/member");
              }, 1000);
            } else if(res) {
              this.$vux.toast.text(res.data.msg, "middle");
              // setTimeout(() => {
              //   this.$ro.push("/member");
              // }, 1000);
            }
          }).catch(res=>{
            this.$vux.loading.hide();
        });
      }
    },
    popShow111() {
      this.show3 = true;
    },
    close() {
      this.show3 = false;
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];

      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    crop() {
      this.panel = false;
      this.show3 = false;
      let croppedCanvas;
      let roundedCanvas;
      if (!this.croppable) {
        return;
      }
      croppedCanvas = this.cropper.getCroppedCanvas();

      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      //  let base64 = roundedCanvas.toDataURL()
      //  let callback;
      // this.dealImag(base64,300,callback);

      //      this.headerImage = roundedCanvas.toDataURL();
      let str = roundedCanvas.toDataURL().replace("data:image/png;base64,", "");
      let equalIndex = str.indexOf("=");
      if (str.indexOf("=") > 0) {
        str = str.substring(0, equalIndex);
      }
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2);
      // 由字节转换为MB
      let size = "";
      size = (fileLength / (1024 * 1024)).toFixed(2);
      let sizeStr = size + ""; //转成字符串
      let index = sizeStr.indexOf("."); //获取小数点处的索引
      let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
      // if (dou == "00") {
      //   //判断后两位是否为00，如果是则删除00
      //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      // }
      let sizeNum = parseInt(size);
      if (sizeNum > 2) {
        let quality = 0.6;
        let base = roundedCanvas.toDataURL("image/jpeg", quality);
        this.$vux.loading.show();
        this.$http
          .post("/api2/index/upload-avatar", {
            avatar:base
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.$vux.toast.show({
                text: res.data.msg
              });
              this.headerImage = roundedCanvas.toDataURL();
              this.refreshPic();
              this.$vux.loading.hide();
            } else {
              this.$vux.loading.hide();
            }
          });
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   content: "上传头像不得大于2M，请重新选择图片上传!",
        //   onConfirm: function() {}
        // });
      } else {
        this.$vux.loading.show();
        this.$http
          .post("/api2/index/upload-avatar", {
            avatar: roundedCanvas.toDataURL()
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.$vux.toast.show({
                text: res.data.msg
              });
              this.headerImage = roundedCanvas.toDataURL();
              this.refreshPic();
              this.$vux.loading.hide();
            } else {
              this.$vux.loading.hide();
            }
          });
      }

      // }
    },
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();

      return canvas;
    },
    convert: function() {
      this.getUserInfo();
    }
  },
  watch:{
    nickname:function (n) {
      this.$nextTick(()=>{
        this.nickname = n.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,'');
    })
    },
    connect:function (n) {
     this.$nextTick(()=>{
       this.connect = n.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,'');
     })
    }
  }
};
</script>
<style scoped>
.head {
  width: 100%;
  height: 1.2rem;
  text-align: center;
  /* border-bottom: solid 1px #ccc; */
}
.headZl {
  text-align: center;
  font-size: 0.45rem !important;
  font-weight: 700;
  line-height: 2.6em;
}
.head div.back-icon {
  /*float: left;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  z-index: 10000001;
  /* line-height: 4em  */
}
.head div.back-icon img {
  margin-top: 0.4rem;
}
#demo {
  background: #fff;
}
#demo #button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: white;
}
#demo .show {
  width: 2.15rem;
  height: 2.15rem;
  /*overflow: hidden;*/
  position: relative;
  border-radius: 50%;
  border: 6px solid #f5f5f5;
  text-align: center;
  margin: 0 auto;
}
#demo .personal{
  padding: 10px 15px;
}
.txtTrue {
  width: 1.7em;
  height: 1.7em;
  position: absolute;
  bottom: -0.2rem;
  right: 0;
  z-index: 10;
}
#demo .picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%
}
#demo .container {
  z-index: 1000001;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}

#demo #image {
  max-width: 100%;
}

.pop {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 100001;
  min-width: 320px;
  max-width: 750px;
}
.popCon {
  width: 92%;
  position: absolute;
  bottom: 8px;
  margin: 0 15px;
  /* background: #ccc; */
  border-radius: 5px;
}
.posiPic {
  position: relative;
}
.popCon p {
  width: 100%;
  height: 3.3em;
  background: #fff;
  line-height: 3.3em;
  text-align: center;
  border-bottom: solid 1px #ccc;
}

.popCon .bortop {
  border-radius: 10px 10px 0 0;
}

.popCon .borbot {
  border-radius: 0 0 10px 10px;
}
.popCon .txtClo {
  font-size: 1.3em;
  color: #333333;
}
.popCon p:last-child {
  border-radius: 10px;
  border: 0;
}
#change {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 3.8em;
  opacity: 0;
  z-index: 1000001;
}

#photo {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 3.8em;
  opacity: 0;
  z-index: 1000001;
}

.nickname {
  width: 81.33%;
  height: 1.1rem;
  margin: 0 auto;
  background: #f5f5f5 !important;
  border-radius: 5px !important;
}

.nickname div {
  height: 100% !important;
}
.nickname div input {
  line-height: 1rem !important;
  padding-left: 10px !important;
  font-size: 1.2em !important;
}

.nickname input ::-webkit-input-placeholder {
  /* WebKit browsers */

  color: #cccccc;
}

.gender {
  width: 81.33%;
  height: 1.1rem;
  margin: 0 auto;
  background: #f5f5f5 !important;
  align-items: center;
  display: flex;
  border-radius: 5px !important;
}

.nickname > span {
  display: block;
  width: 1rem;
}

.weui-cell__ft {
  top: 3px;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #cccccc;
  font-size: 1em;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
  font-size: 1em;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #cccccc;
  font-size: 1em;
}

::-webkit-textarea-placeholder {
  /* WebKit browsers */
  color: #cccccc;
  font-size: 1em;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
  font-size: 1em;
}

:-ms-textarea-placeholder {
  /* Internet Explorer 10+ */
  color: #cccccc;
  font-size: 1em;
}

.active {
  color: red;
}

.text {
  width: 100%;

  /* border: 1px solid #ccc; */
}
.title {
  width: 81.33%;
  margin: 0 auto;
  font-size: 1.2em;
  padding: 0.5em 0 0.5em 1em;
  font-weight: 500;
}

.btn {
  width: 81.33% !important;
  margin: 0 auto;
  background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
}
</style>