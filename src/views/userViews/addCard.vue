<template >
  <div class="addCard" id="addCard" :class="skin==5?'addCard-golden':''">
    <!-- <x-header
      style="background-color:transparent;z-index: 9;color:#445779"
      :title="$t('addCard.text[0]')"
      :left-options="{showBack: false}"
    >
      <span>{{$t('addCard.text[0]')}}</span>
      <i class="black-back"></i>
      <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.push('/tx')"></div>
    </x-header> -->
     <header class="home-header clearfix"  :class="skin==5?'goldenHeader':''">
          <div  @click="$router.push('/tx')" class="back-icon"></div>
          <span>{{$t('addCard.text[0]')}}</span>
      </header>
      <myScroll :top="1.2" :bottom="0" :bgColor="skin==5?'161C23':'f5f7fa'" :left="0">
    <div class="addCard-content" :class="skin==5?'goldenForm':''" id="addCardCon" @focusout="inputBlur" @focusin="inputFocus">
       <group label-width="2.2rem">
        <x-input :title="$t('addCard.text[2]')" ref="openName" v-model="realname"  :placeholder="$t('addCard.pla[0]')" @on-blur="checkrealName"></x-input>
      </group>
      <group label-width="2.5rem">
        <x-input :title="$t('addCard.text[3]')" ref="openCard" v-model="khValue" type="tel"  @on-change="regnum" :debounce='1' :placeholder="$t('addCard.pla[1]')"></x-input>
      </group>
      <div class="tishi">
        <p><img src="../../assets/images/ts.png" alt=""> 
        {{$t('addCard.warnText[0]')}}
</p>
<p style="color:#F8473D">{{$t('addCard.warnText[1]')}}</p>
      </div>
      <group label-width="4rem" :label="$t('addCard.text[4]')" class="clearfix">

         <!-- <cell :title="$t('addCard.text[4]')"  is-link ></cell> -->
         <!-- <div style="position: absolute;width: 7.5rem;height: 0.8rem;right: 0;top: 0.4rem;" @click="pickershow=true"></div> -->
        <span class="fl" style="line-height:1.5rem">{{$t('addCard.text[4]')}}</span>
         <div style="margin:0">
            <popup-picker style="width:70%; float:right;" :cancelText="$t('UpdateInforNew.text[27]')" :confirmText="$t('UpdateInforNew.text[0]')" :data="list1" v-model="value3" ref="picker3" @on-change="onChange"></popup-picker>
        </div>
      </group>
     
      <group label-width="2.5rem">
        <x-input :title="$t('addCard.text[5]')" ref="openAds" v-model="wdValue"  :placeholder="$t('addCard.pla[2]')" @on-blur="checkwdValue"></x-input>
      </group>
     
      
      <group label-width="4.5rem">
        <x-input :title="$t('addCard.text[6]')" ref="openPwd" v-model="paypwd" type="password" @on-change="regnum2" :debounce='1' :max='6' :placeholder="$t('addCard.pla[3]')"></x-input>
      </group>
      <group label-width="2rem" v-if="showTimeTip" class="error-group">
        <!-- <p class="error-tip" v-if="showTimeTip">密码输入错误，您还有{{changeTime}}次机会</p> -->
        <p class="error-tip" v-if="showTimeTip">{{$t('addCard.warnText[2]')}} ({{changeTime}}) {{$t('addCard.warnText[3]')}}</p>
         
      </group>

      <!-- <div class="btn-box" style="width: 85%; margin: 1.333rem auto;">
        <x-button
          type="warn"
          style="border-radius:0.6rem;background-color:#ff513e;height:1.2rem"
          @click.native="submitCard"
        >{{$t('addCard.text[1]')}}</x-button>
      </div> -->
       <div class="submit-btn" @click="submitCard" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]">{{$t('addCard.text[1]')}}</div>

    </div>
      </myScroll>
     <picker 
      :data="list1"
      :showToolbar="true"
      :maskClick="true"
       :cancelText="$t('qxText')"
      :confirmText="$t('qdText')"
      @change="pickerconfirm1"
      :visible.sync="pickershow"
      />
       <picker 
      :data="addressData"
      :showToolbar="true"
       :cancelText="$t('qxText')"
      :confirmText="$t('qdText')"
      :maskClick="true"
      @change="pickerconfirm2"
      :visible.sync="pickershow2"
      :layer="2"
      />
   
  </div>
</template>
<script>
import {

  PopupPicker,
  Cell
} from "vux";
import { mapState, mapMutations } from "vuex";
import picker from 'vue-pickers'
import options from '../../assets/js/country-data.js'
export default {
  name: "addCard",
  components: {
    PopupPicker,
    picker,
    Cell
  },
  data() {
    return {
      cardvalue: '',
      // cardvalue: [],
      list1: [[]],
      value3:[this.$t('addCard.text[7]')],
      showPositionValue: false,
      submitMsg: "",
      cityvalue: ["110000","110100"],
      title: "开户城市",
      addressData:[],
      wdValue: "",
      khValue: "",
      province:'',
      city:'',
      realname:'',
      paypwd:'',
      showTimeTip:false,
      changeTime:0,
      timer:null,
      pickershow:false,
      pickershow2:false,
      yhname:"中信银行",
      khname:"北京市",
      allBank:[]
    };
  },
  computed: {
    ...mapState(["skin"]),
  },
  watch:{
  },
  created(){
     options[0].children.forEach(res=>{
				res.children.forEach(res2=>{
					delete res2.children
				})
    })
    this.addressData= options[0].children
  },
  mounted() {
    // this.list1[0].push({ label:this.$t('addCard.text[7]'),value:''});
    this.list1[0].push(this.$t('addCard.text[7]'));
    this.$http.get("/api/v2/Recharge/get_vietnam_bank_list").then(res => {
      this.allBank = res.data.data;
      res.data.data.forEach((item)=>{
          // this.list1[0].push({ label:item.bank,value:item.bank_id});
          this.list1[0].push(item.bank);
      })
    });
  },
  methods: {
    onChange(val) {
      this.value3 == val[0];
      let obj = this.findCardId(val);
      if(typeof obj =='object' ){
        this.cardvalue=this.findCardId(val).bank_id;
      }else{
        this.cardvalue='';
      }
      
    },
    findCardId(val){
      let obj = this.allBank.find(v=>{
        return v.bank == val;
      })
      return obj;
    },
    inputBlur(e) {
      // 首先，判断触发事件的目标元素是否是input输入框，我们只关注输入框的行为。
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
        // 输入框失去焦点，要把IOS键盘推出页面的滚动部分还原。即将页面滚动到视窗顶部对齐
        this.timer = setTimeout(() => {
          window.scrollTo(0,0);
        }, 0)
      }
    },
    inputFocus(e) {
      // 如果focus，则移除上一个输入框的timer
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input'||e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'textarea') {
        clearTimeout(this.timer);
      }
    },
    alertLL(url,title){
      android.show(url,title)
    },
    goOnline(){
      
      window.open(JSON.parse(this.$store.state.webInitData).customer) 
    },
    checkrealName(v){
     
    },
    checkwdValue(v){
     
    },
    ...mapMutations(["SETSAFEPWD"]),
    trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    submitCard() {
    //  console.log(this.cardvalue)
      let reg = /^[\u4e00-\u9fa5]+$/;

      if(this.realname==''){
        this.$vux.toast.hide();
        this.$refs.openName.focus();
        return this.$vux.toast.text(this.$t('addCard.pla[0]'), 'middle')
     };
      
      if(this.khValue==''){
        this.$vux.toast.hide();
        this.$refs.openCard.focus();
         return this.$vux.toast.text(this.$t('addCard.pla[1]'), 'middle')
     };
     if(!this.cardvalue){
       this.$vux.toast.hide();
        // this.$refs.openCard.focus();
        return this.$vux.toast.text(this.$t('addCard.pla[4]'), 'middle');
     }
     if(this.paypwd.length!=6){
       this.$vux.toast.hide();
       this.$refs.openPwd.focus();
       return this.$vux.toast.text(this.$t('addCard.pla[3]'), 'middle')
     };
      this.$vux.loading.show({text:this.$t('loadingText')+'...'});
     
      let d =this.globalPpproach.checkIsEncrypt({
          bank_id:this.cardvalue,

          branch:this.trim(this.wdValue),
          realname:this.trim(this.realname),
          card_num:this.khValue,
          fund_password:this.paypwd
      })
      this.$http.post("/api/user/bindcard",d).then(res => {
         this.$vux.loading.hide();
//          console.log(res)
          if(res.data.code==1){
            this.$publicPop({
                    title: this.$t('addCard.warnText[7]'),
                    content: this.$t('addCard.warnText[8]'),
                    clickCancel: () => {
                        this.$router.push('/tx');
                        this.showPositionValue=false
                    },
                    clickConfirm: () => {
                       this.$router.push('/tx');
                        this.showPositionValue=false
                    }
                });

          }else if(res.data.code==1002){
            if(res.data.data.remain_times>0){
                this.showTimeTip=true;
                this.changeTime=res.data.data.remain_times;
            }else{
                this.SETSAFEPWD(10);
                this.showPositionValue=false;
                this.showTimeTip=false;
                this.$publicPop({
                    title: this.$t('addCard.warnText[9]'),
                    content: this.$t('addCard.warnText[10]'),
                    confirmText:this.$t('addCard.warnText[11]'),
                    clickCancel: () => {
                        this.$router.go(-1);
                     this.showPositionValue=false
                    },
                    clickConfirm: () => {
                       this.showPositionValue=false
                      this.goOnline();
                    }
                });

             
            }
          }else if(res.data.code==1012){
            this.SETSAFEPWD(10);


            this.$publicPop({
                    title: this.$t('addCard.warnText[9]'),
                    content: this.$t('addCard.warnText[10]'),
                    confirmText:this.$t('addCard.warnText[11]'),
                    clickCancel: () => {
                        this.showPositionValue=false
                        this.$router.push('/tx');
                    },
                    clickConfirm: () => {
                       this.showPositionValue=false
                      this.goOnline();
                    }
                });

           
          }else{
            this.$vux.toast.text(res.data.msg, 'middle')
          }
    }).catch(err=>{
        this.$vux.loading.hide();
      });
    },
    onShadowChange(ids, names) {
      this.province=names[0];
      this.city=names[1]
    },
    regnum(value,event){
        this.khValue=value.replace(/[^\d]/g,'')
    },
    regnum2(value,event){
        this.paypwd=value.replace(/[^\d]/g,'')
          if(this.paypwd.length>7){
            this.paypwd=this.paypwd.slice(0,6)
        }
    },
    pickerconfirm1(i){
     this.yhname=i[0].label;
     this.cardvalue=i[0].value;
    },
     pickerconfirm2(i){
      try {
      this.khname=i[0].label+"  "+i[1].label;
      this.province=i[0].value;
      this.city=i[1].value
    } catch (error) {
    }
    }
    //   银行卡验证
  }
};
</script>
<style lang="less">
    .rem(@name,@px){
    @{name}:unit(@px/75,rem)
    }
    .addCard .vux-header .vux-header-title{color: #445779}
    .black-back{display: block;width: 20px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../assets/images/back-left.png') no-repeat;background-size: 100% 100%}
    .addCard-content{padding: 0;
    .weui-cells{font-size: 14px;padding: 0 6%;}
    .weui-cell{padding-left: 0;padding-right: 0;.rem(padding-top,40);.rem(padding-bottom,40)}
    .weui-cells:before{display: none};
    .weui-cells:after{border-bottom: 1px solid #e8e5e5;}
    .vux-cell-value{color:#000}
    .weui-label{color:#000}
    .vux-no-group-title{margin: 0}
    .weui-cell_access .weui-cell__ft:after{transform: rotate(135deg);}
    .weui-cell__ft{color: #000; }
    }
    .submit-btn{
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    color: #fff;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 80%;
    margin: 2rem auto 3rem;
    border-radius: 1rem;
    font-size: 0.4rem;
}
    .addCard{
      .error-tip{
        padding: .8rem 0 0 0;
      }
    }
    .addCard-content>div:last-of-type .weui-cells:after{
      border-bottom: none!important;
    }
    .error-group .weui-cells:after{
      border-bottom: none!important;
    }
    #addCardCon .weui-cell__ft{
    display: block!important;
    }
    .tishi{
      width: 100%;
      padding: 2% 6%;
      background: #fafbfd;
    }
    .tishi img{
     width: 16px;
    position: relative;
    top: 4px;
    }
    .tishi p{
      color:  #1486FF;
      font-size: 0.35rem;
    }
</style>