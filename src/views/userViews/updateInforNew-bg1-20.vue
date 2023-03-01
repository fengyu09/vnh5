<template>
  <div>
    <div id="updateInforNew">
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
        <div class="headZl">thông tin cá nhân</div>
        <!-- <div  @click="save('middle')">保存</div> -->
      </div>
      <div class="edit-content">
          <div class="edit-avatar" @click="popShow111()">
              <div class="avatar">
                  <img v-lazy="headerImage" alt="">
                  <i class="photo-icon"></i>
              </div>
              <p>Nhấp để thay đổi hình đại diện</p>
          </div>
          <div class="edit-info ">
            <div class="clearfix edit-nick">
                <div class="fl eb">tên nick</div>
                <div class="nickname fr el edit-sex" @focusout="inputBlur" @focusin="inputFocus">
                    <x-input
                    ref="input1"
                    class="nick1"
                    style="height:1.3em;text-align: right!important"
                    v-model="nickname"
                    placeholder="Mời nhập biệt danh"
                    :min="2"
                    :max="10"
                    ></x-input>
                </div>
            </div>
            <div class="clearfix edit-nick">
                <div class="fl eb">giới tính</div>
                <div class="fr el edit-sex">
                    <group style="margin:0">
                        <popup-picker cancelText='Hủy' confirmText="Xác nhận" :data="list1" v-model="value3" ref="picker3" @on-change="onChange"></popup-picker>
                    </group>
                </div>
                 
            </div>
          </div>
          <div class="edit-sign">
                <p class="eb"> Chữ ký</p>
                <div class="area area1 el " @focusout="inputBlur" @focusin="inputFocus">
                    <x-textarea
                    style="height: 2rem!important;"
                    class="text personal"
                    placeholder="Vui lòng nhập chữ ký của bạ"
                    v-model="connect"
                    :max="50"
                    >{{connect}}</x-textarea>
                </div>
          </div>
      </div>

      <!-- <div style="padding:20px;background: #fff;height: 3.7rem; position: relative;">
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
          style="height:1.3em"
          v-model="nickname"
          placeholder="请输入2-10位数昵称"
          :min="2"
          :max="10"
        ></x-input>
      </div>

      <p class="title">性别：</p>
      <div class="gender">
        <group style="margin:0">
          <popup-picker :data="list1" v-model="value3" ref="picker3" @on-change="onChange"></popup-picker>
        </group>
      </div>
      <p class="title">个性签名：</p>
      <div class="area" @focusout="inputBlur" @focusin="inputFocus">
        <x-textarea
          style="height: 2.6rem!important;"
          class="text personal"
          placeholder="Vui lòng nhập chữ ký của bạ"
          v-model="connect"
          :max="50"
        >{{connect}}</x-textarea>
      </div> -->
      <x-button
        type="warn"
        :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3}]"
        style="border-radius: 99px;margin-bottom: 50px;margin-top:1.2rem;height: 1.2rem;font-size: 0.4rem"
        class="btn"
        @click.native="save('middle')"
      >Ôn lại</x-button>

    </div>
    <div class="pop" v-show="show3" @click="close">
      <div class="popCon">
        <!-- cropper -->
        <!-- <cropper :headerImage="headerImage" @getHeaderImage="newHeaderImage"></cropper> -->
        <p class="posiPic bortop" style="color: #666666;line-height: 3.7em;height: 3.7em;font-size: 1.3em;color: #333333;">Thêm ảnh đại diện</p>
        <p class="posiPic txtClo">
          Chụp ảnh
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
          Chọn từ album di động
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
    ...mapState(["codeToken", "userinfo","skin"])
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
      itemList: [{ text: "Chưa chọn " }],
      msg: "0",
      connect: "",
      position: "default",
      showPositionValue: false,
      showPositionValue1: false,
      showPositionValue2: false,
      nickname: "",
      sex: "Nam",
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
      list1: [["Chưa chọn", "Nam", "Nữ"]],
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
      if (!flag && this.userinfo.bio) {
        (this.nickname = this.userinfo.nickname || "Biệt danh của tôi"),
          (this.connect = this.userinfo.bio || "Chữ ký riêng~"),
          (this.headerImage = this.userinfo.avatar);
        //性别
        if (this.userinfo.gender == "0") {
          this.value3 = ["Chưa chọn"];
        } else if (this.userinfo.gender == "1") {
          this.value3 = ["Nam"];
        } else if (this.userinfo.gender == "2") {
          this.value3 = ["Nữ"];
        }
        return;
      }
      this.isL = true;
      this.$http.get("/api/user/index").then(res => {
        if (res && res.data.code == 1) {
          this.isL = false;
          let gender = res.data.data.gender;
          if (gender == "0") {
            this.value3 = ["Chưa chọn"];
          } else if (gender == "1") {
            this.value3 = ["Nam"];
          } else if (gender == "2") {
            this.value3 = ["Nữ"];
          }

          this.nickname = res.data.data.nickname || "Biệt danh của tôi";
          this.connect = res.data.data.bio || "Chữ ký riêng~";
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
      let res = await this.$http.get("/api/user/index");
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
        this.$vux.toast.text("Chữ ký cá nhân không được để trống", "middle");
      } else if (this.trim(this.nickname) == "") {
        this.$vux.toast.text("Tên người dùng không được để trống", "middle");
      } else {
        let gender = this.value3[0];
        if (gender == "Nữ") {
          gender = 2;
        } else if (gender == "Nam") {
          gender = 1;
        } else if (gender == "Chưa chọn") {
          gender = 0;
        }
        
        this.$vux.loading.show();
        let d = this.globalPpproach.checkIsEncrypt({
           nickname: this.trim(this.nickname),
            email: this.email,
            phone: this.phone,
            bio: this.trim(this.connect),
            gender: gender
        })
        this.$http
          .post("/api/user/profile", d)
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
          .post("/api/common/uploadavatar", {
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
          .post("/api/common/uploadavatar", {
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
              this.$vux.toast.text(res.data.msg)
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
<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
#updateInforNew{
  background:#F1F0F6;
  padding-bottom:3rem;
}

.headZl {
  text-align: center;
  font-size: 0.45rem !important;
  font-weight: 700;
  line-height: 2.6em;
  background: #fff !important;
}
.head  {
    width: 100%;
    height: 1.2rem;
    text-align: center;
    .back-icon{
        position: absolute;
        left: 0;
        top: 0;
        width: 1rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        z-index: 10000001;
        img{
             margin-top: 0.4rem;
        }
    }
}
// .head div.back-icon img {
//   margin-top: 0.4rem;
// }
/* #deupdateInforNewmo {
  background: #fff;
} */
 #button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: white;
}
 .show {
  width: 2.15rem;
  height: 2.15rem;
  /*overflow: hidden;*/
  position: relative;
  border-radius: 50%;
  border: 6px solid #f5f5f5;
  text-align: center;
  margin: 0 auto;
}
 .personal{
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
 .picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%
}
 .container {
  z-index: 1000001;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}

 #image {
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
.posiPic {
  position: relative;
}

.popCon {
    width: 92%;
    position: absolute;
    bottom: 8px;
    margin: 0 15px;
    /* background: #ccc; */
    border-radius: 5px;
    .bortop {
      border-radius: 10px 10px 0 0;
    }
    .borbot {
      border-radius: 0 0 10px 10px;
    }
    .txtClo {
        font-size: 1.3em;
        color: #333333;
    }
    p{  
        width: 100%;
        height: 3.3em;
        background: #fff;
        line-height: 3.3em;
        text-align: center;
        border-bottom: solid 1px #ccc;
        &:last-child {
            border-radius: 10px;
            border: 0;
        }
    }
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
  height: 1.47rem;
  margin: 0 auto;
  background: #fff !important;
  border-radius: 5px !important;
//   text-align: right!important;
  padding: 0 0.5rem 0 0!important;

    div {
        height: 100% !important;
        padding: 0!important;
        input {
            // line-height: 1rem !important;
            // padding-left: 10px !important;
            // font-size: 1.2em !important;
            .rem(font-size,26)!important;
            // text-align: right!important;
            &::-webkit-input-placeholder {
                color: #cccccc;
            }
        }
    }
    > span {
        display: block;
        width: 1rem;
    }
}


// .nickname input ::-webkit-input-placeholder {
//   /* WebKit browsers */

//   color: #cccccc;
// }

.gender {
  width: 81.33%;
  height: 1.1rem;
  margin: 0 auto;
  background: #f5f5f5 !important;
  align-items: center;
  display: flex;
  border-radius: 5px !important;
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
.edit-content{
    padding: 0.268rem;
    .edit-info,.edit-avatar,.edit-sign{
        background: #fff;
        margin-bottom: 0.268rem;
        border-radius: 10px;
        padding: 0 0.268rem;
    }
    .edit-avatar{ 
        height: 3.87rem;      
        padding-top: 0.5rem;
        text-align: center;
        color: #666;
        .rem(font-size,24);
        .avatar{
            width:1.79rem ;
            height: 1.79rem;
            margin: 0 auto;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            i{
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                position: absolute;
                left: 0;
                top: 0;
                border-radius: 50%;
                z-index: 100;
                overflow: hidden;
                &:before{
                    position: absolute;
                    content: '';
                    left: 50%;
                    transform: translateX(-50%);
                    top: 0.65rem;
                    .rem(width,40);
                    .rem(height,34);
                    background: url('../../assets/images/member/photo.png')no-repeat;
                    background-size: contain;
                }
            }
        }
        p{
            padding-top: 0.48rem;
        }
    }
    .edit-info{
      span{
          display: block;
          float: left;
      }
      .edit-nick{
        height: 1.48rem!important;
        line-height: 1.48rem!important;
        &:nth-child(2){
            border-top: 1px solid #EBECEE;
        }
      }
    }
    .edit-sign{
        position: relative;
        padding-right: 0.5rem;
        height: 3.15rem;
        p{
            line-height: 1rem;
        }
        &:before{
            position: absolute;
            content: '';
            right: 3%;
            top: 0.4rem;
            .rem(width,8);
            .rem(height,14);
            background: url('../../assets/images/member/fh.png')no-repeat;
            background-size: contain;

        }
    }
    .edit-sex{
        width: 80%;
        position: relative;
        padding-right: 0.5rem;
        &:before{
            position: absolute;
            content: '';
            right: 0;
            top: 0.66rem;
            .rem(width,8);
            .rem(height,14);
            background: url('../../assets/images/member/fh.png')no-repeat;
            background-size: contain;

        }
    }
}
.eb{
    .rem(font-size,28)!important;
    color: #666!important;
}
.el{
    .rem(font-size,26)!important;
    color: #999!important;
}
</style>