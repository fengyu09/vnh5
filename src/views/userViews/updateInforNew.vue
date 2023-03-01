<template>
  <div>
    <div id="updateInforNew">
      <!-- 遮罩层 -->
      <div class="container" v-show="panel">
        <div>
          <img id="image" :src="url" alt="Picture" />
        </div>

        <button type="button" id="button" @click="crop">{{$t('UpdateInforNew.text[0]')}}</button>
      </div>
       <div class="head" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback" class="back-icon1">
          <img v-if="$st.state.skin!=5" style="width: 0.25rem;" src="../../assets/images/gray-back-icon.png" alt />
          <img v-if="$st.state.skin==5" style="width: 0.25rem;" src="../../assets/images/skin/golden/goBack.png" alt />
        </div>
        <div class="headZl">{{$t('UpdateInforNew.text[1]')}}</div>
        <!-- <div  @click="save('middle')">保存</div> -->
      </div>
     <myScroll :bottom='0'  :bgColor="skin==5?'161C23':'f1f0f6'">
       
      <div class="edit-content" :class="[{'edit-golden':skin==5}]">
          <div class="edit-avatar" @click="popShow111()">
              <div class="avatar">
                  <img v-lazy="headerImage" alt="">
                  <i class="photo-icon"></i>
              </div>
              <p>{{$t('UpdateInforNew.text[2]')}}</p>
          </div>
          <div class="edit-info ">
            <div class="clearfix edit-nick">
                <div class="fl eb">{{$t('UpdateInforNew.text[3]')}}</div>
                <div class="nickname fr el edit-sex" @focusout="inputBlur" @focusin="inputFocus">
                    <x-input
                    ref="input1"
                    class="nick1"
                    style="height:1.3em;text-align: right!important"
                    v-model="nickname"
                    :placeholder="$t('UpdateInforNew.text[28]')"
                    :min="2"
                    :max="10"
                    ></x-input>
                </div>
            </div>
            <div class="clearfix edit-nick">
                <div class="fl eb">{{$t('UpdateInforNew.text[4]')}}</div>
                <div class="fr el edit-sex">
                    <group style="margin:0">
                        <popup-picker :cancelText="$t('UpdateInforNew.text[27]')" :confirmText="$t('UpdateInforNew.text[0]')" :data="list1" v-model="value3" ref="picker3" @on-change="onChange" ></popup-picker>
                    </group>
                </div>
                 
            </div>
            <!-- email -->
            <div class="clearfix edit-nick">
                <div class="fl eb">{{$t('UpdateInforNew.text1[0]')}}</div>
                <div v-if="!emailDisabled" class="email fr el" @focusout="inputBlur" @focusin="inputFocus">
                    <x-input
                    v-if="emailPrompt !=true"
                    ref="email"
                    style="height:2;text-align: right!important"
                    placeholder=""
                    v-model="email"
                    :disabled="emailDisabled"
                    ></x-input>
                    
                    <p class="prompt" v-if="emailPrompt" @click="emailClick()">{{$t('UpdateInforNew.text[5]')}}</p>
                </div>
                <div class="email fr el" v-if="emailDisabled"><span >{{email}}</span></div>
            </div>
            <!-- phone -->
            <div class="clearfix edit-nick" v-if="lanCode==1">
                <div class="fl eb" style="line-height:1.4;margin-top:0.2rem;">{{$t('UpdateInforNew.text[6]')}}<br> {{$t('UpdateInforNew.text[7]')}}</div>
                <div class="phone fr el" v-if="!phoneDisabled" @focusout="inputBlur" @focusin="inputFocus">
                    <span style="color:#666">+84</span>
                    <x-input
                    v-if="telPrompt != true"
                    ref="phone"
                    style="height:2;text-align: right!important"
                    v-model="phone"
                    :max="10"
                    :disabled="phoneDisabled"
                    ></x-input>
                    <p class="prompt" v-if="telPrompt" @click="telClick()">{{$t('UpdateInforNew.text[8]')}}</p>
                </div>
                <div class="phone fr el" v-if="phoneDisabled"><span style="color:#666">+84</span><span>{{phone}}</span></div>
            </div>
            <div class="clearfix edit-nick" v-if="lanCode==2||lanCode==5">
                <div class="fl eb" style="">{{$t('UpdateInforNew.text[6]')}}<br> {{$t('UpdateInforNew.text[7]')}}</div>
                <div class="phone fr el"  v-if="!phoneDisabled" @focusout="inputBlur" @focusin="inputFocus" style="width: 65%;">
                    <span style="color:#666">+84</span>
                    <x-input
                    v-if="telPrompt != true"
                    ref="phone"
                    style="height:2;text-align: right!important"
                    v-model="phone"
                    :max="20"
                    :disabled="phoneDisabled"
                    ></x-input>
                    <p class="prompt" v-if="telPrompt" @click="telClick()">{{$t('UpdateInforNew.text[8]')}}</p>
                </div>
                <div class="phone fr el" v-if="phoneDisabled"><span style="color:#666">+84</span><span>{{phone}}</span></div>
            </div>
          </div>
          <div class="edit-sign">
                <p class="eb"> {{$t('UpdateInforNew.text[9]')}}</p>
                <div class="area area1 el " :class="skin==5?'area-golden':''" @focusout="inputBlur" @focusin="inputFocus">
                    <x-textarea
                    style="height: 2rem!important;"
                    class="text personal"
                    :placeholder="$t('UpdateInforNew.text[10]')"
                    v-model="connect"
                    :max="50"
                    >{{connect}}</x-textarea>
                </div>
          </div>
      </div>

      <x-button
        type="warn"
        :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]"
        style="border-radius: 99px;margin-bottom: 50px;margin-top:1.2rem;height: 1.2rem;font-size: 0.4rem"
        class="btn"
        @click.native="save('middle')"
      >{{$t('UpdateInforNew.text1[1]')}}</x-button>
     </myScroll>

    </div>
    <div class="pop" v-show="show3" @click="close">
      <div class="popCon">
      
        <p class="posiPic bortop" style="color: #666666;line-height: 3.7em;height: 3.7em;font-size: 1.3em;color: #333333;">{{$t('UpdateInforNew.text[24]')}}</p>
        <p class="posiPic txtClo">
          {{$t('UpdateInforNew.text[12]')}}
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
          {{$t('UpdateInforNew.text[13]')}}
          <input
            type="file"
            id="change"
            accept="image/png, image/jpeg, image/gif"
            @change="change"
            ref="uploadInput1"
          />
          <label for="change"></label>
        </p>
        <p class="txtClo" @click="close">{{$t('UpdateInforNew.text[14]')}}</p>
      </div>
    </div>
    <!-- 电话&邮箱未填提示 -->
    <div class="layer-bg" v-if="telUnbound">
      <div class="layer-main">
          <img class="icon" src="../../assets/images/member/tip.png" alt="">
          <p>{{$t('UpdateInforNew.text[15]')}} </p>
          <button :class="$st.state.skin==5?'skin-btn-golden':''"  @click="telUnbound = false">{{$t('UpdateInforNew.text[16]')}}</button>
          <span class="close" @click="telUnbound = false"><img src="../../assets/images/member/x.png" alt=""></span>
      </div>
    </div>
  </div>
</template>
   
<script>
import {
  XTextarea,


  PopupPicker
} from "vux";
import Cropper from "cropperjs";
//import Axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["codeToken", "userinfo","skin","lanCode"])
  },
  components: {
    XTextarea,

    PopupPicker
  },
  data() {
    return {
      activeClass: 0,
      itemList: [{ text: this.$t('UpdateInforNew.text[17]') }],
      msg: "0",
      connect: "",
      position: "default",
      showPositionValue: false,
      showPositionValue1: false,
      showPositionValue2: false,
      nickname: "",
      sex: "Nam",
      phone:'',
      email:'',
      show: false,
      show2: false,
      show3: false,
      headerImage: "",
      newHeaderImage: "",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      value3: [this.$t('UpdateInforNew.text[17]')],
      list1: [[this.$t('UpdateInforNew.text[17]'), this.$t('UpdateInforNew.text[18]'), this.$t('UpdateInforNew.text[19]')]],
      url: "",
      timer:null,
      times:1,
      telUnbound:false,
      telPrompt:false,
      emailPrompt:false,
      phoneDisabled:false,
      emailDisabled:false,
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
        (this.nickname = this.userinfo.nickname || this.$t('UpdateInforNew.text[20]')),
          (this.connect = this.userinfo.bio || this.$t('UpdateInforNew.text[21]')),
          (this.headerImage = this.userinfo.avatar);
           this.phone = this.userinfo.mobile;
          this.email = this.userinfo.email;
        //性别
        if (this.userinfo.gender == "0") {
          this.value3 = [this.$t('UpdateInforNew.text[17]')];
        } else if (this.userinfo.gender == "1") {
          this.value3 = [this.$t('UpdateInforNew.text[18]')];
        } else if (this.userinfo.gender == "2") {
          this.value3 = [$t('UpdateInforNew.text[19]')];
        }
        if(this.userinfo.mobile != null ){
          this.phoneDisabled=true;
        }
        if(this.userinfo.email != null){
          this.emailDisabled=true;
        }
        return;
      }
      this.isL = true;
      this.$http.get("/api/user/index").then(res => {
        // console.log(res);
        if (res && res.data.code == 1) {
          this.isL = false;
          let gender = res.data.data.gender;
          if (gender == "0") {
            this.value3 = [this.$t('UpdateInforNew.text[17]')];
          } else if (gender == "1") {
            this.value3 = [this.$t('UpdateInforNew.text[18]')];
          } else if (gender == "2") {
            this.value3 = [this.$t('UpdateInforNew.text[19]')];
          }

          this.nickname = res.data.data.nickname || this.$t('UpdateInforNew.text[20]');
          this.connect = res.data.data.bio || this.$t('UpdateInforNew.text[21]');
          this.phone = res.data.data.mobile;
          this.email = res.data.data.email;
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


    emailClick(){
      this.emailPrompt = false;
      this.$nextTick(()=>{
        this.$refs.email.focus();
      })
    },
    telClick(){
      this.telPrompt = false;
      this.$nextTick(()=>{
        this.$refs.phone.focus();
      })
    },
    //修改个人信息
    save(position) {
      console.log(this.email);
      // this.position = position;
      // if(this.phone==null && this.email == null){
      //   this.telUnbound = true;
      //   this.telPrompt = true;
      //   this.emailPrompt = true;
      //   return
      // }else if(this.phone==null){
      //   this.telPrompt = true;
      //   return
      // }else if(this.email==null){
      //   this.emailPrompt = true;
      //   return
      // }
      //
      if(this.email==null){
        this.emailPrompt = true;
        return
      }else if(this.phone==null){
        this.telPrompt = true;
        return
      }

      if(this.lanCode==1){
          if(this.phone.length<8 || this.phone.length == 8 || this.phone.length<10  ||  this.phone.length == 10){
          let tel = '+84'+this.phone
          if(!/^(?:(?:\+|00)84)?\d{8,10}$/.test(tel)){
            this.$vux.toast.text("Vui lòng nhập số điện thoại chính xác", "middle");
            this.$nextTick(()=>{
              this.$refs.phone.focus();
            })
            return
          }
        }
      }else if(this.lanCode==5){
          if(this.phone.length<8 || this.phone.length == 8 || this.phone.length<10  ||  this.phone.length == 10){
          let tel = '+84'+this.phone
          if(!/^(?:(?:\+|00)84)?\d{8,10}$/.test(tel)){
            this.$vux.toast.text("Please enter the correct phone number", "middle");
            this.$nextTick(()=>{
              this.$refs.phone.focus();
            })
            return
          }
        }
      }

      if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)){

        
      // if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
          // this.emailPrompt = true;
          this.$vux.toast.text(this.$t('UpdateInforNew.text[15]'), "middle");
          this.$nextTick(()=>{
            this.$refs.email.focus();
          })
          return
      }
      if (this.trim(this.connect) == "") {
        this.$vux.toast.text(this.$t('UpdateInforNew.text[22]'), "middle");
      } else if (this.trim(this.nickname) == "") {
        this.$vux.toast.text(this.$t('UpdateInforNew.text[23]'), "middle");
      } else {
        let gender = this.value3[0];
        if (gender == this.$t('UpdateInforNew.text[19]')) {
          gender = 2;
        } else if (gender == this.$t('UpdateInforNew.text[18]')) {
          gender = 1;
        } else if (gender == this.$t('UpdateInforNew.text[17]')) {
          gender = 0;
        }
        
        this.$vux.loading.show();
        let d = this.globalPpproach.checkIsEncrypt({
           nickname: this.trim(this.nickname),
            email: this.email,
            mobile: this.phone,
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
    
              this.$vux.toast.show({
                text: res.data.msg,
                position: "middle"
              });
              setTimeout(() => {
                this.$ro.push("/member");
              }, 1000);
            } else if(res) {
              this.$vux.toast.text(res.data.msg, "middle");
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
  //background: #fff !important;
}
.head  {
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background: #fff;
    .back-icon1{
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
// .head div.back-icon1 img {
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
.layer-bg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 100001;
  min-width: 320px;
  max-width: 750px;
}
.layer-main{
    width: 90%;
    height: 5.5rem;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .icon{
      width: 1.8rem;
      margin-top: 0.3rem;
    }
    .close{
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      bottom: -70px;
      left: 50%;
      transform: translate(-50%, 0);
      margin: 30px auto;
    }
    p{
      font-size: 0.36rem;
      color: #71819D;
      margin: 0.5rem auto;
    }
    button{
      width: 70%;
      height: 1.2rem;
      color: #fff;
      border: none;
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      border-radius: 66px;
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
        padding: 0 0.25rem;
    }
    &.edit-golden{
      .edit-info,
        .edit-avatar,
        .edit-sign{
          >p{
            color: #CECECE;
          }
           background: #1F252C;
           .edit-sex{
            background: #1F252C!important;
            .weui-cells{
              background-color: #1F252C !important;
            }
           }
           >div{
            &:nth-child(1){
              border-top: none!important;
            }
            border-top: 1px solid #5C564D;
           }
           .eb{
            color: #AB9B62!important;
           }
           .el{
            color: #CECECE!important;
           }
           input{
            color: #CECECE!important;
           }
        }
      
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
        overflow: hidden;
        border-top: 1px solid #EBECEE;
      }
      .email,.phone{
        width: 80%;
        height: 1.5rem;
        color: #6A86B9 !important;
        .weui-input{
          height: 1.5rem;
          color: #6A86B9 !important;
        }
        .prompt{
          font-size: 10px;
          line-height: 1.4;
          color: #E51A11;
          padding-top: 0.3rem;
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
        width: 75%;
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
.area-golden{
  background: #464B53!important;
  color: #CECECE!important;
}
</style>