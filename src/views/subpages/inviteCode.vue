<template>
    <div>
        <div class="inviteCode" ref="imageTofile" id="inviteCode">
            <div class="title-img">
              <img  :src="require('../../assets/images/extend/title'+tpNum+'.png')" alt="">
            </div>
            <div class="title-tip">
                <img v-if="lanCode==1" src="../../assets/images/extend/titletip.png" alt="">
                <img v-if="lanCode==2||lanCode==5" src="../../assets/images/extend/titleTipEn.png" alt="">
              </div>
            <!--  -->
            <div class="code-container">
                <div class="code-item">
                    <span v-for="(v,index) in yqCode" :key="index">{{v}}</span>
                </div>
                <div class="code-img">
                    <vue-qr :logoSrc="qrcode.logo" :text="qrcode.value" :size="150" :margin='0'></vue-qr>
                    <p>{{$t('inviteCode.text[5]')}}</p>
                </div>
            </div>
            <div class="code-footer">
                <p>{{$t('inviteCode.text[4]')}}</p>
                <p>{{homeUrl}}</p>
            </div>
        </div>
        <div class="inviteCode">
            <div class="back-icon" @click="goback"><img src="../../assets/images/white-back-icon.png" alt=""></div>
            <div class="code-title">{{$t('inviteCode.text[0]')}}</div>
            <div class="change-icon" @click="sj">{{$t('inviteCode.text[1]')}} </div>
            
            <div class="title-img">
              <img  :src="require('../../assets/images/extend/title'+tpNum+'.png')" alt="">
             
            </div>
            <!-- <myScroll :top="1.2"> -->
              <div class="title-tip">
                <img v-if="lanCode==1" src="../../assets/images/extend/titletip.png" alt="">
                <img v-if="lanCode==2||lanCode==5" src="../../assets/images/extend/titleTipEn.png" alt="">
              </div>
            <div class="code-container">
                <div class="code-item">
                    <span v-for="(v,index) in yqCode" :key="index">{{v}}</span>
                </div>
                <div class="code-img">
                    <vue-qr :logoSrc="qrcode.logo" :text="qrcode.value" :size="400" :logoScale="0.2" :margin='0'></vue-qr>
                    <p>{{$t('inviteCode.text[2]')}}</p>
                </div>
            </div>
            <div class="send-hb">
                <div class="send-btn copy-img" @click="toImage">{{$t('inviteCode.text[3]')}}</div>
                <div class="send-btn copy-link" v-if="lanCode==1" data-clipboard-action="copy" :data-clipboard-text="qrcode.value" @click="copyLink">sao chép
<br>đường dẫn</div>
<div class="send-btn copy-link" style="line-height:1rem" v-if="lanCode==2 ||lanCode==5" data-clipboard-action="copy" :data-clipboard-text="qrcode.value" @click="copyLink">Copy URL</div>
            </div>
            <div class="code-footer">
                <p>{{$t('inviteCode.text[4]')}}</p>
                <p>{{homeUrl}}</p>
            </div>
            <!-- </myScroll> -->
        </div>
        
    </div>

</template>

<script>
import html2canvas from 'html2canvas'
import { mapState } from "vuex";
import VueQr from 'vue-qr'
export default {
  name: "inviteCode",
  components: {
     // html2canvas,
     VueQr
  },
  data() {
    return {
        homeUrl:'',
      yqCode:[],
      qrcode:{
        value:'',
        logo:this.lanCode==2?require('../../assets/images/extend/codeLogoEn.png'):require('../../assets/images/extend/codeLogo.png'),    
      },
        lSrc:'',
        tpNum:1
    };
  },
   computed: {
            ...mapState([
               
                "lanCode"
            ])
        },
  methods:{
      //获取邀请码
      getInviteCode(){
          this.$http.get('/api/market/index').then(res=>{
              this.yqCode = res.data.data.market_code.split('');
              this.qrcode.value = res.data.data.market_url;
              this.homeUrl = res.data.data.homepage_url;
          })
      },
    goback(){
      this.$router.go(-1);
    },
    copyLink() {
         let _this = this;
         let clipboard = new this.clipboard(".copy-link");
         clipboard.on('success', function () {
             _this.$vux.toast.show({
                 text: "Sao chép thành công",
                 position: "middle"
             });
          });
          clipboard.on('error', function () {
              _this.$vux.toast.text(' Sao chép không thành công, vui lòng thử lại sau');
          });
    },
      // 页面元素转图片
      toImage () {
          let shareContent = document.getElementById("inviteCode");
          //配置参数
          let opts = {
              useCORS: true// 如果的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
          };
          // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
          html2canvas(shareContent,opts).then((canvas) => {
              var dataUrl = canvas.toDataURL('image/jpeg', 1.0);
              this.lSrc = dataUrl;
              // this.savePicture(document.getElementById('picurl').getAttribute('src'));
              this.savePicture(dataUrl);
          })
      },
      savePicture(Url) {
          let blob = new Blob([''], {type: 'application/octet-stream'});
          let url = URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = Url;
          a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];
          let e = document.createEvent('MouseEvents');
          e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
          URL.revokeObjectURL(url);
      },
      sj(){
        var str = [1,2,3,4]
        var r = "";
        for(var i = 0; i < str.length ; i ++) {
            // var r = Math.ceil(Math.random()*4);
            r= Math.ceil(Math.random()*4);
            // res += str[id];
        }
        // console.log(r)
        // 
        if(this.tpNum == r){
           this.sj();
        }else{
           this.tpNum = r;
        }
        // return res;
        // console.log(this.tpNum)
      },
  },
    mounted() {

    },
    created() {
      this.getInviteCode();
      this.sj();
    }
};
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
 
 .title-tip{
   position: absolute;
   top: 3rem;
   width: 100%;
 }
  .inviteCode{
    .title-img{
      width: 100%;
      // width: 50%;
      margin: -.2rem auto 0;
      display: block;
      img{
        width: 100%;
      }
      .title1{
        width: 100%;
        background: url('../../assets/images/extend/title1.png')no-repeat;
        background-size: contain;
      }
    }
    .back-icon{
      position: fixed;
      top:.4rem;
      left: .4rem;
      img{
        width: 60%;
      }
    }
    .code-title{
       position: fixed;
      top:.4rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: .45rem;
      font-weight: bold;
      color: #fff;
    }
    .change-icon{
       position: fixed;
      top:.4rem;
      right: 0.5rem;
      .rem(font-size,24);
      color:#fff;
      padding-left: 0.5rem;
      &:before{
        position: absolute;
        content: '';
        background: url('../../assets/images/extend/change-icon.png')no-repeat;
        background-size: cover;
        .rem(width,24);
        .rem(height,24);
        left: 0;
        top: 0.08rem;
      }
    }
    .send-hb{
      position: absolute;
    bottom: 2rem;
      margin-left: 8.5%;
      .rem(margin-top,30);
      // overflow: hidden;
      .send-btn{
        .rem(width,290);
        .rem(font-size,32);
        .rem(height,75);
        .rem(line-height,75);
        color: #2F3490;
        text-align: center;
        // background:linear-gradient(90deg,rgba(255,49,49,1) 0%,rgba(255,128,103,1) 100%);
        background: linear-gradient(90deg, #a7dafc 0%, #dcf2ff 100%);
        // box-shadow:0px 2px 9px 0px rgba(167,0,0,0.3);
        border-radius:50px;
        float: left;
      }
      .copy-img{
        // background: linear-gradient(90deg, #007CFF 0%, #4BA1FF 100%);
      }
      .copy-link{
        .rem(margin-left,35);
        line-height: .5rem;
        // color: #6A86B9;
        // border: 1px solid #6A86B9;
        // background: rgba(0,0,0,0);
      }
    }
     position: fixed;
     width: 100%;
     height: 100%;
    //  f8f9fe 
    // background: url("../../assets/images/extend/3.3.jpg") #f8f9fe  center .5rem no-repeat;
      // background:linear-gradient(180deg,#f8f9fe 0%,#ecf7ff 100%);
      background:url('../../assets/images/extend/newbg.png') #182243;
      background-size: 100% 100%;
    //  background-size: 80%;
    .golden-box{
      position: absolute;
      width: 82%;
      left: .8rem;
      top: 4rem;
    }
    .code-container{
      text-align: center;
      position: absolute;
      border-top: 4rem;
      left: 50%;
      bottom: 3.5rem;
      transform: translateX(-50%);
      width: 70%;
      margin: -0.15rem auto 0;
      // background:linear-gradient(180deg,#f6f4e7 0%,#f3eecd 100%);
      background:linear-gradient(180deg,#ddf3fe 0%,#a7dafc 100%);
      border-radius: 5px;
      // box-shadow: 1px 1px 5px #eee;
      padding: .35rem .7rem;
      text-align: center;
      // border: 1px solid #ebeef0;
      h3{
        .rem(font-size,31);
        font-weight: bold;
      }
      .code-item{
        padding:0 0 .45rem 0;
        span{
          background: #f5f7fa;
          display: inline-block;
          .rem(margin-left,10);
          .rem(font-size,28);
          // color: #FF513E;
          color: #2F3490;
          border-radius: 2px;
          padding: .1rem .2rem;
          font-weight: normal;
        }
      }
      .code-img{
        text-align: center;
        img{
          display: inline-block;
          // width: 47%;
          // .rem(width,268);
          .rem(width,210);
          padding: 0.2rem;
          background: #fff;

        }
        p{
          color: #2F3490;
          // letter-spacing: 6px;
          .rem(margin-top,10);
        }
      }
    }
    .code-footer{
      color: #F6FF00;
      text-align: center;
      // letter-spacing: 1px;
      position: absolute;
      width: 90%;
      .rem(bottom,10);
      .rem(line-height,40);
      left: 50%;
      transform: translateX(-50%);
      p{
        line-height: .5rem;
      }
    }
  }
  //  #inviteCode{
  //   position: fixed;
  //    background: url("../../assets/images/extend/3.3.jpg") #f8f9fe  center .5rem no-repeat;
  //    background-size: cover;
  // }
</style>
