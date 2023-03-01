
<template>

  
    <div class="allInfo">     
        <flexbox class="infoHead">
            <flexbox-item :span="1/10"><div @click="goback" class="flex-demo" style=" z-index: 10000001;"><x-icon type="ios-arrow-back" size="20"></x-icon></div></flexbox-item>
            <flexbox-item ><div class="flex-demo">个人资料</div></flexbox-item>
            <flexbox-item :span="1/10" @click.native="save('middle')"><div  class="flex-demo">保存</div></flexbox-item>
        </flexbox>
  
      <div class="all">
        <div class="infoPortrait">
            <p></p><p @click="profilePhoto"><span>修改头像</span><x-icon type="ios-arrow-forward" class="infoPortrait-icon" size="30"></x-icon></p>
        </div>
  
        <div id="zhe">
           <div id="updata">
             <P><router-link to>拍摄</router-link></P>
             <P><router-link to>从手机相册选择</router-link></P>
             <P @click="cancel">取消</P>
           </div>
        </div>
  
  
        
         <div class="nickname">
              <span>Biệt danh</span>
              <x-input id='nick' placeholder="" :min="2" :max="5" ></x-input>
          </div>
         <div class="gender">
            <p>Giới tính</p>      
            <p :class="activeClass == index ? 'active':''" v-for="(item,index) in itemList" :key="index" @click="getItem(index)">
                {{item.text}}
            </p>
         </div>
         <div class="signature"><span>Chữ ký riêng</span></div>
  
          <div class="area" style="width:100%; height:4rem">
             <group >
                 <x-textarea class="text"  v-model="connect" :max="50" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')">{{connect}}</x-textarea>
            </group>
          </div>
  
          <toast v-model="showPositionValue" width='3rem' type="text" :time="800" is-show-mask text="签名不能为空" :position="position"></toast>
          <toast v-model="showPositionValue1" width='3rem' type="success" :time="800" is-show-mask text="保存成功" :position="position"></toast>
  
      </div>
  
    </div>
  </template>
  
  <script>
  
  import {XInput, Flexbox, FlexboxItem,XTextarea, TransferDom, Actionsheet, Group, XSwitch, Toast,XButton} from 'vux'
  
  export default {
    name: 'updateInfor',
     components: {
      XInput,
      Flexbox,
      FlexboxItem,
       XTextarea,
       Group,
       Toast,
       XButton,
       XSwitch,
       Actionsheet,
    },
    data(){
      return{
        activeClass: 0,
        itemList:[
            {text:"未选中"},
            {text:"男"},
            {text:"女"}, 
        ],
        msg:"0",
        connect:'',
        position: 'default',
        showPositionValue: false,
        showPositionValue1: false,
        show: false,
      }
    },
    mounted(){
    
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
       profilePhoto(){
          zhe.style.display="block"
       },
       cancel(){
           zhe.style.display="none"
       },
  
  
        onEvent (event) {
        console.log('on', event)   
      },
  
        // 选择性别
        getItem(index){
            this.activeClass = index;  
          }, 
  
        save(position){
          this.position = position
          if(this.connect==''){      //先只判断个性签名不能玩为空    其他的待定
              this.showPositionValue = true
          }else{
              this.showPositionValue1 = true
              this.connect=''
              
          }
        }
   
    },
  
  }
  </script>
  
  <style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  
  .infoHead{
    height: 1rem;
    background: #fff;
    border-bottom: 1px solid #000;
  }
  .flex-demo {
    text-align: center;
  }
  
  .all{
    width: 100%;
    padding:0 0.5rem;
    background-color: #fff;
    position: absolute;
    left:0;
    top:1rem;
    bottom:0;
  }
  
  
  .infoPortrait{
     height: 3.3rem;
     line-height: 3.3rem;
  }
  .infoPortrait p:first-child{
    float: left;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid #000;
    margin-top: .4rem;
  }
  .infoPortrait p:last-child{
    float: right;
    font-size: .5rem;
    text-align: center;
  }
  .infoPortrait-icon{
    padding-top: .5rem;
  }
  
  
  
  .nickname,.gender,.signature{
    height: 1.5rem;
    border-top: 1px solid #000;
    font-size: .4rem;
    align-items: center; 
    display:flex;
  }
  .nickname>span{
    width:1rem ;
  }
  .gender{
    justify-content : space-between;
  }
  .gender>p:first-child{
     width: 6rem;
  }
  
  #nick{
    width: 7.5rem;
    height: 1.4rem;
    font-size: .5rem;
  }
  
  
  
  .active {
    color:red;
  }
  
  
  .text{
    width: 100%;
    border: 1px solid #000;
  }
  
  #zhe{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background: rgba(0,0,0,0.3);
    z-index: 100;
    display: none;
    }
  
  #updata{
    width: 100%;
    position: absolute;
    left:0;
    bottom:-4.5rem;
    animation:fireworksUp 0.5s ease 0s normal forwards;
  }
  #updata>P{
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-size: .5rem;
    border-top: 1px solid #000;
    background-color: #fff;
  }
  
  @keyframes fireworksUp {
      0% {
          transform:translateY(0);      
      }
      100% {
          transform:translateY(-4.5rem);
      }
  }
  
  
  
  
  </style>