<template>
    <div >
         <div class="chat-box" :style="{top:chatTop}" >
         <div :class="[{'chat-title':true,iszk:chatTop==0},{'skin-btn-pink':skin==1&&chatTop==0}, {'skin-btn-blue':skin==2&&chatTop==0}, {'skin-btn-green':skin==3&&chatTop==0},{'skin-btn-maingreen':skin==4&&chatTop==0},{'skin-btn-golden-room':skin==5&&chatTop==0}]" >
           <div class="sq" v-if="chatTop">
             <div class="ds-btn" :class="[{'skin-btn-pink':skin==1}, {'skin-btn-blue':skin==2}, {'skin-btn-green':skin==3}, {'skin-btn-maingreen':skin==4},{'skin-btn-golden-room':skin==5}]">
                {{$t('chatRoom[8]')}}
             </div>
             <div @click="chatTop=0">
               <img src="../../assets/images/fhemoji/icon_zk.png" alt=""  srcset="" style="width:0.72rem">
             </div>
           </div>
           <div class="zk" v-else>
              <i class="return-icon" @click="setChat2()"></i>
             <div>
               {{$t('chatRoom[0]')}}
             </div>
              <div @click="chatTop='auto'">
               <img v-if="skin==5" src="../../assets/images/skin/golden/icon_zk.png" alt=""  srcset="" style="width:0.72rem">
               <img v-else src="../../assets/images/fhemoji/icon_sq.png" alt=""  srcset="" style="width:0.72rem">
             </div>
            
           </div>
         </div>
         <div class="chat-main">
             <myScroll ref="chatScroll"  :bottom="1.68" :bgColor="'F3F4F5'">
              <ul :class="skin==5?'mess-golden-list':''">
                <li v-for="(item,index) in msgList" :key="index" :class="{selfMsg:item.user_id==$store.state.userinfo.user_id}">
                  <div class="avatarBox"  @touchstart="gomousedown(item,true)" @touchmove="gomousemove" @touchend="gomouseup(item,true)" v-if="item.type!='getpaper'">
                    <img :src="item.avatar" srcset="" >
                  </div>
                  <div class="msg-content" v-if="item.type!='getpaper'">
                    <div class="msg-name"  >
                      <span v-if="item.type=='expert_prediction'&&defalutLan=='en'">{{item.nickname_en}}</span> 
                      <span v-else>{{item.nickname}}</span> 
                    <img  v-if="item.vip&&item.type!='redpaper'" :src="vipIcons[item.vip-1]" alt="" srcset="" style="width:1.25rem;height:0.38rem">
                    <i  v-if="item.win_rate!=0&&item.type!='redpaper'"> {{$t('chatRoom[9]')}}{{item.win_rate}}%</i>
                    </div>
                 
                    <!-- djsTime=='--:--'||item.content.issue!=currOpend.next_issue|| -->
                    <div class="msg-text" v-if="item.type!='redpaper'&&item.type!='image'&&item.type!='expert_prediction'&&item.type!='share_profit'" :class="{sharePlan:item.msg_type=='share_plan'||item.type=='share_plan',expireBtn:$store.state.userinfo.user_id==item.user_id}" @touchstart="gomousedown(item)" @touchmove="gomousemove" @touchend="gomouseup(item)">
                      <div v-if="item.type=='share_plan'">
                        <p>{{item.content.lottery_id|ynGameName(allLottery,defalutLan)}}</p>
                        <p>{{item.content.issue}}</p>
                        <div v-for="(it1,idx1) in item.content.items"  v-if="idx1<item.maxHeight" :key="idx1+'c'">
                        <p > {{$t('chatRoom[10]')}}{{it1.play_name}}</p>
                        <p style="word-wrap: break-word;"> {{$t('chatRoom[11]')}}{{it1.item_name}}</p>
                        <p> {{$t('chatRoom[12]')}}{{it1.amount}}</p>
                        </div>
                        <div v-if="item.content.items.length>4" class="zk-msg" @click="moreList(item)" style="width: 0.8rem;text-align: center;margin: 0 auto;padding-top: 0.2rem;">
                          <img src="../../assets/images/x@2x.png" alt="" srcset="" :style="{transform:item.maxHeight==4?'rotate(0deg)':'rotate(180deg)',width:'100%'}">
                        </div>
                        <p> {{$t('chatRoom[13]')}}{{item.content.items|orderAll}}{{$t('moneyDw')}}</p>
                        <div :class="{orderBtn:true}" style="text-align: center;">
                           <span @click="shareItem=JSON.parse(JSON.stringify(item.content));showShare2=true;showChatOrder=true;shareOrderNum=item.content.order_no"> {{$t('chatRoom[14]')}}</span>
                        </div>
                      </div>
                      <p v-if="item.type=='chat'" v-html="item.content"  ></p>
                      <!-- <div v-if="item.type=='image'">
                          <img :src="item.content" alt="" srcset="" style="width: auto;max-width:3rem">
                      </div> -->
                    <i class="chat-time">{{item.send_time_txt}}</i>
                    
                    </div>
                    <!-- 红包消息 -->
                     <div class="msg-text" style="padding: 0;" v-if="item.type=='redpaper'">
                     <div @click="showHb(item.content.rid)">
                       <img v-if="lanCode==1" src="../../assets/images/chat/hb_bg.png" alt="" srcset="">
                       <img v-if="lanCode==2||lanCode==5" src="../../assets/images/chat/hb_bg_en.png" alt="" srcset="">
                     </div>
                    <i class="chat-time">{{item.send_time_txt}}</i>
                    </div>
                     <div v-if="item.type=='image'" class="msg-text" style="padding: 0;background: none;" @touchstart="gomousedown(item)" @touchmove="gomousemove" @touchend="gomouseup(item)">
                     <div >
                      <!-- <img :src="item.content" :preview="item.chat_id"  style="width: auto;max-width:5.7rem;pointer-events: all;"> -->
                       <img v-preview="item.content" :src="item.content"   preview-title-enable="true" preview-nav-enable="false"  style="width: auto;max-width:5.7rem;pointer-events: all;"> 
                     </div>
                    <i class="chat-time">{{item.send_time_txt}}</i>
                    </div>
                  <div v-if="item.type=='expert_prediction'||item.type=='share_profit'" class="msg-text" style="width:80%;max-width: 80%;">
                   <div class="calculate" v-if="item.type=='expert_prediction'">
                     <div style="justify-content: space-between;">
                       <span>{{defalutLan=='en'?item.content[item.calculateNum].lottery_name_en:item.content[item.calculateNum].lottery_name}}</span>
                       <span>{{item.content[item.calculateNum].issue}}</span>
                     </div>
                     <div class="menu">
                      <span v-for="(item1,index1) in item.content" :class="{active:index1==item.calculateNum}" :key="index1" @click="item.calculateNum=index1;$forceUpdate()">{{item1.name}}</span>
                     </div>
                     <div>
                      {{$t('chatRoom[15]')}}
                     </div>
                     <div class="play-code">
                       <span>{{$t('chatRoom[16]')}}</span>
                        <i v-for="(item2,index2) in item.content[item.calculateNum].item_code.split(',')" :key="index2">{{item2}}</i>
                     </div>
                     <div class="orderBtn"  style="justify-content: center;">
                       <span :class="skin==5?'skin-btn-golden':''" @click="calculatePlay(item.content[item.calculateNum])">{{$t('chatRoom[17]')}}</span>
                     </div>
                   </div>
                    <div class="calculate" v-else>
                            <p>{{defalutLan=='en'?item.content.lottery_name_en:item.content.lottery_name}}</p>
                            <p>{{$t('chatRoom[18]')}} <span style="color:red">{{item.content.prize}}</span></p>
                            <p>{{$t('chatRoom[19]')}} {{item.content.follow_user_nums}}</p>
                            <p>{{$t('chatRoom[20]')}}<span style="color:red">{{item.content.tip}}</span></p>
                            <div class="orderBtn" style="justify-content: center;">
                              <span @click="getprofitdetail(item.content.order_no)">{{$t('chatRoom[21]')}}</span>
                            </div>
                          </div>
                    <i class="chat-time">{{item.send_time_txt}}</i>
                    </div>
                     <!-- 红包消息 -->
                  </div>
                  <div class="hb-info" v-if="item.type=='getpaper'">
                         <span>{{$t('chatRoom[22]')}} <i>{{item.username}}</i> {{$t('chatRoom[23]')}} <i>{{item.amount}}</i>{{$t('moneyDw')}} {{$t('chatRoom[24]')}}</span>
                  </div>
                 
                </li>

              </ul>
             </myScroll>
         </div>
         <div class="send-msg">
            <!-- <input type="text" placeholder="Vui lòng nhập nội dung trò chuyện"> -->
			<!--  -->
			 <div v-if="$store.state.userinfo.user_type==1"  class="mute" :class="isMute ? 'active' : 'mute1'"  @click="allMute"></div>
        <div @click="handInput">
                <img src="../../assets/images/chat/sc_icon.jpeg" alt="" srcset="" style="width:0.7rem;">
            </div>  
            <div  class="emojiText needsclick"
                  contenteditable="true"
                  ref="edit"
                  @focus="emojiShow=false"
                   :class="lanCode==2||lanCode==5?'textEn':''"
                  placeholder="请输入内容">

            </div>
             <div @click="emojiShow=!emojiShow">
               <img src="../../assets/images/fhemoji/bq_icon.png" alt=""  srcset="" style="width:0.72rem">
             </div>
             <div @click="sendMsg">
               <img v-if="skin==0" src="../../assets/images/fhemoji/icon_send.png" alt=""  srcset="" style="width:0.72rem">
               <img v-if="skin==1" src="../../assets/images/fhemoji/icon_send-pink.png" alt=""  srcset="" style="width:0.72rem">
               <img v-if="skin==2" src="../../assets/images/fhemoji/icon_send-blue.png" alt=""  srcset="" style="width:0.72rem">
               <img v-if="skin==3" src="../../assets/images/fhemoji/icon_send-green.png" alt=""  srcset="" style="width:0.72rem">
               <img v-if="skin==4" src="../../assets/images/fhemoji/icon_send-maingreen.png" alt=""  srcset="" style="width:0.72rem">
               <img v-if="skin==5" src="../../assets/images/fhemoji/icon_send-golden.png" alt=""  srcset="" style="width:0.72rem">
               
             </div>
         </div>
         <div class="emoji-box" v-show="emojiShow">
           <ul>
             <li v-for="(item,index) in emojiData" :key="index" @click="getEmojis(item)">
               <img :src="item.path"  alt="" srcset="">
             </li>
           </ul>
         </div>
         <div class="go-down" @click="goDown">
           <img src="../../assets/images/fhemoji/go_down.png" alt="" srcset="">
         </div>
       </div>
       <!-- 聊天室弹窗 -->
       <div class="chat-order" v-if="showChatOrder" :class="skin==5?'chat-order-golden':''">
          <div class="order-info">
              <div class="title">
                
                  <h2>{{$t('chatRoom[49]')}}</h2>
                  <p>{{shareItem.issue}}</p>
              </div>
              <div class="order-content">
                  <p><strong>{{$t('chatRoom[50]')}}</strong> {{shareItem.lottery_id|ynGameName(allLottery,defalutLan)}}</p>
                  <p><strong></strong>{{$t('chatRoom[51]')}}<strong :style="skin==5?'color:#E6AE18;':'color:#287BE1'">{{userAmount}}</strong>{{$t('moneyDw')}}</p>
                <div style="height: 3.8rem;position: relative;">
                  <table width="100%" style="margin-bottom:0">
                    <tr>
                      <th width="50%">{{$t('chatRoom[52]')}}</th>
                      <th width="30%">{{$t('chatRoom[53]')}}</th>
                      <th width="20%">{{$t('chatRoom[54]')}}</th>
                    </tr>
                  </table>
                   <myScroll ref="shareScroll" :top="0.7"  :bottom="0" :bgColor="'#fff'">
                  <table width="100%" style="margin-top:0;border-top: none;">
                    <tr v-for="(it,idx) in shareItem.items" :key="idx+'b'" style="border-bottom: 1px solid #017CFF;">
                      <td  width="50%" ><span style="overflow-wrap: break-word;width:4.2rem;display: block;">{{it.play_name}}-{{it.item_name}}</span></td>
                      <td  width="30%">{{it.oneAmount*it.multiple*it.nums}}{{$t('moneyDw')}}</td>
                      <td  width="20%">
                        <input type="text" @keyup="it.amount=$event.target.value.replace(/\D/g, '')" v-model="it.multiple">
                      </td>
                    </tr>
                  </table>
                   </myScroll>
                </div>
                 <div v-if="showShare2">
                    <p><strong>{{$t('chatRoom[55]')}}</strong><strong :style="skin==5?'color:#E6AE18;':'color:#287BE1'">{{shareItem.items.length}}</strong></p>
                  <p><strong>{{$t('chatRoom[56]')}}</strong> <strong :style="skin==5?'color:#E6AE18;':'color:#287BE1'">{{shareItem.items|orderAll}}</strong>{{$t('moneyDw')}}</p>
                 </div >
                  <div v-else>
                    <p><strong>{{$t('chatRoom[57]')}}</strong><strong :style="skin==5?'color:#E6AE18;':'color:#287BE1'">{{shareItem.items[0].item_code.split(',').length}}</strong></p>
                  <p><strong>{{$t('chatRoom[58]')}}</strong> <strong :style="skin==5?'color:#E6AE18;':'color:#287BE1'">{{shareItem.items[0].item_code.split(',').length*shareItem.items[0].multiple}}</strong>{{$t('moneyDw')}}</p>
                 </div>
                 
                  <p class="share-order" v-if="showShare2">
                   <i @click="isShare=!isShare">
                     <img src="../../assets/images/fhemoji/Vector (2).png" alt="" srcset="" v-if="isShare">
                     <img src="../../assets/images/fhemoji/Vector.png" alt="" srcset="" v-else>
                     </i> 
                   <span @click="alert(1)"> {{$t('chatRoom[59]')}}</span>
                   <i @click="showShareRule=true"> 
                     <img src="../../assets/images/fhemoji/Group 287.png" alt="" srcset="">
                     </i>
                  </p>
              </div>
              <div class="btns">
                  <span style="background: #D8D8D8;" @click="showChatOrder=false">{{$t('chatRoom[60]')}}</span>
                  <span @click="sharePlay" :style="skin==5?'background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);color: #A85100;':''">{{$t('chatRoom[61]')}}</span>
              </div>
          </div>
          <div class="share-rule" v-if="showShareRule">
            <div>
                <p>{{$t('chatRoom[62]')}}
                </p>
                <div class="btn" @click="showShareRule=false">
                    <span>{{$t('chatRoom[63]')}}</span>
                </div>
            </div>
          </div>
       </div>
       <!-- 禁言弹窗 -->
       <div class="prohibit" v-if="manageShow">
         <div>
            <div class="touxiang">
              <img :src="manageItem.avatar" alt="" style="width:1.333rem;height:1.333rem;border-radius: 50%;">
              <img v-if="manageItem.vip" :src="vipIcons[manageItem.vip-1]" alt="" srcset="" style="width:1.25rem">
              <span>{{manageItem.nickname}}</span>
          </div>
          <div class="manage-time">
              <div  @click="manageListShow=!manageListShow">
                <span>{{manageTime}}{{$t('chatRoom[64]')}}</span>
              <img :style="{transform:manageListShow?'rotate(180deg)':'rotate(0deg)'}" src="../../assets/images/fhemoji/Polygon 5.png" alt="" srcset="">
              </div>
          <ul v-show="manageListShow">
            <li v-for="item in manageTimeArr" :key="item" @click="manageTime=item;manageListShow=false">{{item}}{{$t('chatRoom[65]')}}
              <i v-if="item==manageTime">✔</i>
            </li>
          </ul>
          </div>
           <div class="btn" @click="jinyan">
                    <span>{{$t('chatRoom[66]')}}</span>
            </div>
          <div class="close-btn" @click="manageShow=false;manageListShow=false">
            <img src="../../assets/images/fhemoji/-s-x.png" alt="" srcset="" style="width:0.93rem">
          </div>
         </div>
         
       </div>
       <!-- v-if="$route.name!='xz'" -->
       <div class="to-game"  @click="toGame" v-if="lanCode!=2" :class="skin==5?'to-game-golden':''">
         <img src="../../assets/images/chat/icon_touzhu.png" alt="" srcset="">
          {{$t('chatRoom[67]')}}   &nbsp;&nbsp;
       </div>
       <div class="hb-point" v-if="hbPoint.length" @click="showHb(hbPoint[0].id)">
          <img v-if="lanCode==1" src="../../assets/images/chat/Group 304.png" alt="" srcset="">
          <img v-if="lanCode==2||lanCode==5" src="../../assets/images/chat/hongbao-en.png" alt="" srcset="">
       </div>
       <div class="hb-bg" v-if="hbShow">
         <div class="hb-bg2" v-if="!fruitShow">
                <img v-if="lanCode==1" src="../../assets/images/chat/hb_bg2.png" @click="openHb" alt="" srcset="">
                <img v-if="lanCode==2||lanCode==5" src="../../assets/images/chat/hb_bg2_en.png" @click="openHb" alt="" srcset="">
            </div>
            <div class="hb-bg1" v-else>
              <img v-if="lanCode==1" src="../../assets/images/chat/hb_bg1.png" alt="" srcset="">
              <img v-if="lanCode==2||lanCode==5" src="../../assets/images/chat/hb_bg1_en.png" alt="" srcset="">
               <div class="hb-fruit">
                 <p v-if="hbMoney==0">
                   {{hbMsgText}}
                  </p>
                 <div v-else>
                  <p>
                    {{$t('chatRoom[44]')}}
                  </p>
                  <h2>{{hbMoney}}{{$t('moneyDW')}}</h2>
                  </div>
               
                 
              </div>
            </div>
          <div class="close-btn" @click="hbShow=false;fruitShow=false">
              <img src="../../assets/images/chat/close.png" alt="" srcset="">
            </div>
       </div>
       <div class="tc-bg" v-if="JSON.stringify(profitData)!='{}'">
          <div class="profitdetail" style="height: 7.2rem;">
              <p v-if="$st.state.defalutLan=='en'">{{profitData.detail.lottery_name_en}}</p>
              <p v-else>{{profitData.detail.lottery_name}}</p>
              <p>{{profitData.detail.issue}}</p>
              <p>{{$t('chatRoom[68]')}}{{profitData.detail.play_name}}</p>
              <p>{{$t('chatRoom[69]')}}{{profitData.detail.item_name}}</p>
              <p>{{$t('chatRoom[70]')}}<span style="color:red">{{profitData.detail.amount}}</span></p>
              <p style="margin-bottom:16px">{{$t('chatRoom[71]')}}<span style="color:red">{{profitData.detail.prize}}{{$t('moneyDw')}}</span></p>
          <div class="close" @click="profitData={}">
            ×
          </div>
            <!-- <el-scrollbar style="height:192px" v-if="profitData.follows.length"> -->
          <myScroll ref="shareScroll" :top="4"  :bottom="0" :left="0" :bgColor="'#fff'">
          <ul v-if="profitData.follows.length">
              <li v-for="(item,index) in profitData.follows" :key="index">
				 <img :src="item.avatar" alt="" srcset="">
				  <span>{{item.nickname}}</span>
				  <span>{{item.amount}}</span>
               </li>
          </ul>
          <div v-else style="height: 3rem;text-align: center; pointer-events: auto;font-size: 0.4rem;padding-top: 0.8rem;">
            <span>
             {{$t('chatRoom[7]')}}
            </span>
          </div>
            </myScroll>
          </div>
        </div>
       <input style="dispaly:none;opacity: 0;" class="upload" ref="uploadFile" @change="addImg"  type="file">
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
import { removeAllactive,getSiblings,getRank } from "../../assets/js/public"
let emojiArr=[]
let vipIcons=[]
for (let index = 1; index < 20; index++) {
 emojiArr.push({name:'emoji'+index,path:require("../../assets/images/fhemoji/m"+index+".png")})
  if(index<9){
     vipIcons.push(require("../../assets/images/fhemoji/VIP"+index+".png"))
  }
}
export default {
    name: "chatRoom",
    data(){
        return{
        userAmount:0,
        profitData:{},
        showShare2:true,
        calculateNum:0,
        fruitShow:false,
        hbShow:false,
        allLottery:[],
        sharePurview:'',
        voicePpurview:'',
        showItemNum:4,
        timeOutEvent:0,
        isClick:true,
        isMute:false,
        chatSettings:{},
        manageListShow:false,
        manageTimeArr:[10,30,60,120],
        manageTime:10,
        manageShow:false,
        manageItem:{},
        shareOrderNum:'',
        shareItem:{},
        chatSocket:'ws://54.255.11.229:18305/wss',
        websock:null,
        pingInterval:null,
        showChatOrder:false,
        showShareRule:false,
        isShare:false,
        msgList:[],//消息列表
        chatTop:0,
        emojiShow:false,
        emojiData:emojiArr,//表情数据
        vipIcons:vipIcons,
        deleteId:0,
        hbMoney:0,
         imgData:{  
            accept: 'image/gif, image/jpeg, image/png, image/jpg',  
        },
        hbMsgText:this.$t('chatRoom[6]'),
        hbPoint:[],
        }
    },
    computed: {
    ...mapState([
        "skin",
        "historyGame",
        "chatShow",
        "lanCode",
        "defalutLan"
        ])
    },
    created(){
      this.getGame();
      this.initWebSocket()
      this.getChat()
      this.getHbNum()
      this.loadMoney()
     
    },
    mounted(){
  
    },
     beforeDestroy(){
        clearInterval(this.pingInterval)
         if(this.websock){
            this.websock.close()
         }
        },
    filters:{
          orderAll(c){
      let a=0
      c.forEach((i,d)=>{
        a+=i.oneAmount*i.nums*i.multiple
      })
      return a
    },
    ynGameName(c,allLottery,lan){
      let a=''
      allLottery.forEach((i,d)=>{
        if(c==i.lottery_id){
          a= lan=='en'?i.ename:i.vname
          // a=i.vname
        }
      })
     
      return a
    }
        },
     watch:{
          msgList:function(i){
            i.forEach((v,c)=>{
              if(!v.maxHeight){
                v.maxHeight=4
              }
            })
          },
           chatShow:function(i){
            if(i){
              setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
            }
          },
          chatTop:function(){
                setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
              },

        },
    methods:{
        ...mapMutations(["SETCHAT","SETMSGPOINT"]),
      loadMoney() {
            if (!this.$store.state.codeToken) return;
            this.$http.get("/api/user/balance").then(res => {
              if (res && res.data.code == 1) {
               this.userAmount = res.data.data.balance
              }
            });
          },
     getprofitdetail(order){
      this.$http.get("/api/guess/profitdetail", {
        params: {
          order_no:order,
        },
      }).then(res=>{
        if(res.data.code==1){
          this.profitData=res.data
        }else{
           this.$vux.toast.text(res.data.msg,'middle');
        }
      })
    },
    calculatePlay(val){
      console.log(val)
      this.showShare2=false
      this.shareOrderNum=''
      let obj={
        issue:val.issue,
        lottery_id:val.lottery_id,
        items:[{amount:1,play_code:val.play_code,item_code:val.item_code,multiple:1,nums:1,play_name:this.defalutLan=='en'?'Tail':'Đuôi',item_name:val.item_code,oneAmount:1}],
        is_follow_plan:1
      }
       // val.item_code.split(',').length
      this.shareItem=obj
      this.showChatOrder=true

    },
    getHbNum(){
      this.$http.post('/api/live/sport/unreceive_red/').then(res=>{
       if(res.data.code==1){
         this.hbPoint=res.data.data
       }
      })
    },
    handInput(){
       this.$refs.uploadFile.dispatchEvent(new MouseEvent('click'))
    },
    addImg(e){    
      let that=this
            let reader =new FileReader();  
            let img1=e.target.files[0];  
            let type=img1.type;//文件的类型，判断是否是图片  
            let size=img1.size;//文件的大小，判断图片的大小  
            if(this.imgData.accept.indexOf(type) == -1){  
                alert('请选择我们支持的图片格式！');  
                return false;  
            }  
              reader.readAsDataURL(img1);
              reader.onloadend = function () {  
              let result = this.result;  
             let img = new Image();  
             img.src = result;  
             if (this.result.length <= (100 * 1024)) {  
                that.uploadImg(result)
             }else {  
                 img.onload = function () {
                     let src =that.compress(img);
                    that.uploadImg(src);
                  }  
              }  
          }   
},
 compress(img) {  
      let canvas = document.createElement("canvas");  
      let ctx = canvas.getContext('2d');  
     let tCanvas = document.createElement("canvas");  
      let tctx = tCanvas.getContext("2d");  
     let initSize = img.src.length;  
      let width = img.width;  
      let height = img.height;  
     let ratio;  
      if ((ratio = width * height / 4000000) > 1) {  
          ratio = Math.sqrt(ratio);  
          width /= ratio;  
         height /= ratio;  
      } else {  
          ratio = 1;  
      }  
      canvas.width = width;  
      canvas.height = height;   
      ctx.fillStyle = "#fff";  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      let count;  
      if ((count = width * height / 1000000) > 1) {  
          count = ~~(Math.sqrt(count) + 1); 
          let nw = ~~(width / count);  
          let nh = ~~(height / count);  
          tCanvas.width = nw;  
          tCanvas.height = nh;  
          for (let i = 0; i < count; i++) {  
          for (let j = 0; j < count; j++) {  
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
          }  
          }  
      } else {  
          ctx.drawImage(img, 0, 0, width, height);  
      }   
      let ndata = canvas.toDataURL('image/jpeg', 0.3);  
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
      return ndata;  
       },
uploadImg(Base64Val){
      this.$http.post('/api/chatroom/sendimg', {image:Base64Val}).then(res=>{
                    
                    if(res.data.code!=1){
                      this.$publicPop({
                      title: "",
                      content: res.data.msg,
                      isShowCancelButton:false
                  });
                    }
                    }).catch(err=>{
                     
                    })
},
    moreList(item){
      item.maxHeight==4?item.maxHeight=item.content.items.length:item.maxHeight=4;
      this.$forceUpdate()
    },
        openHb(){
     let c={
              user_id:this.$store.state.userinfo.user_id,
              rid:this.redId
            }
             let d = this.globalPpproach.checkIsEncrypt(c)
       this.$http.post('/api/live/sport/receive_red/', d).then(res=>{
         this.fruitShow=true
         let hbIndex=this.hbPoint.findIndex((v)=>v.id==this.redId)
         if(res.data.code==1){
           this.hbMoney=res.data.data.amount
            this.hbPoint.splice(hbIndex,1)
         }else if(res.data.code==0){
            this.fruitShow=false
            this.$publicPop({
                      title: this.$t('chatRoom[5]'),
                      content:res.data.msg,
                      isShowCancelButton:false
                  });
         }else{
          this.hbMoney=0
          this.hbMsgText=res.data.msg
           this.hbPoint.splice(hbIndex,1)
         }
       })
     
    },
        showHb(i){
          this.redId=i
          this.hbShow=true
        },
        toGame(){
          this.SETCHAT(false)
           if(this.historyGame.id){
            this.$router.push("/xz/"+this.historyGame.id+"?vname="+this.historyGame.vname+'&mark='+this.historyGame.remark+'&isChat=1')
          }else{
              this.$router.push("/xz/1?vname=Miền Bắc&mark=mở thưởng hàng ngày&isChat=1")
          }
        },
        submitDelete(){
      let c={
              action:'delete_one',
              chat_id:this.deleteId
            }
             let d = this.globalPpproach.checkIsEncrypt(c)
       this.$http.post('/api/chatroom/operate', d).then(res=>{
        if(res.data.code==1){
          let idx=this.msgList.findIndex((i)=>i.chat_id==this.deleteId)
        }else{
           this.$publicPop({
                      title: "",
                      content: res.data.msg,
                      isShowCancelButton:false
                  });
        }
       }
       )
      
    },
        setChat2(){
          this.SETCHAT(false)
        },
         async getGame() {
            let res = await this.$http.get("/api/lottery/allsort/");
            if (res && res.data.code == 1) {
              this.allLottery = res.data.data || [];
            }
          },
           gomousedown(it,flag){
			   clearTimeout(this.timeOutEvent);
         this.timeOutEvent = 0;
          if(flag){
          this.isClick=true
			   this.timeOutEvent = setTimeout(() => {
			    this.$refs.edit.innerHTML+="@"+it.nickname+' '
			    this.isClick=false
			   }, 800);
          }else{
            if(it.type=='share_plan'){
              return
            }
             if(this.$store.state.userinfo.user_type!=1){
              return
            }
			   this.timeOutEvent = setTimeout(() => {
          //  console.log(it)
          //  删除不了没有chat_id
           this.deleteId=it.chat_id
			    this.$publicPop({
                    title: "tip",
                    content: this.$t('chatRoom[72]'),
                    clickConfirm: () => {
                      this.submitDelete()
                    }
                });
			   }, 800);
          }
			 },
			      
			gomouseup(it,flag){
			    clearTimeout(this.timeOutEvent);
			    if(flag){
            if(this.isClick){
			      this.manage(it)
			    }
          }
			},
			 
			gomousemove(){
			     clearTimeout(this.timeOutEvent);
			     this.timeOutEvent = 0;
			     this.isClick=false
			},
      	allMute(){
			      if(this.isMute){
             this.removeMute()
			        return
			      }
			      // this.manageShow=true
			      this.jinyan()
			    },
      removeMute(){
        let c={
              action:'all_unmute',
            }
         let d = this.globalPpproach.checkIsEncrypt(c)
             this.$http.post('/api/chatroom/operate', d).then(res=>{
               if(res.data.code==1){
                  // this.isMute=false
               }
             })
      },
      jinyan(){
            let c={
              action:this.manageItem.user_id?'mute':'all_mute',
              user_id:this.manageItem.user_id?this.manageItem.user_id:'',
              duration:this.manageTime
            }
             let d = this.globalPpproach.checkIsEncrypt(c)
             this.$http.post('/api/chatroom/operate', d).then(res=>{
              //  console.log(res)
               if(res.data.code==1){
				    if(!this.manageItem.user_id){
				            this.isMute=true
				       }
                  this.$vux.toast.text(res.data.msg,'middle');
                  this.manageTime=10;
                  this.manageItem={};
                  this.manageShow=false
               }else{
              //    this.$vux.confirm.show({
              //       title: '',
              //       content: res.data.msg,
              //       confirmText: "Xác nhận",
              //       showCancelButton: false,
              //       onConfirm: () => {
              //       }
              // });
                  this.$publicPop({
                      title: "",
                      content: res.data.msg,
                      isShowCancelButton:false
                  });
               }
             })
          },
           manage(i){
           if(this.$store.state.userinfo.user_type!=1){
             return
           }
           if(i.user_type==1){
             return
           }
            this.manageItem=i
            this.manageShow=true
          },
          sharePlay(){
          this.shareItem.follow_order_no=this.shareOrderNum
          let isok=false
          this.shareItem.items.forEach((i,d)=>{
            if(i.multiple<1){
              isok=true
            }
          })
          if(isok){
            this.$publicPop({
                      title: "",
                      content: this.$t('chatRoom[73]'),
                      isShowCancelButton:false
             });
            //  this.$vux.confirm.show({
            //         title: '',
            //         content: '乘数不能小于1',
            //         confirmText: "Xác nhận",
            //         showCancelButton: false,
            //         onConfirm: () => {
            //         }
            //   });
            return 
          } 
          this.$vux.loading.show()
          let a=JSON.parse(JSON.stringify(this.shareItem))
          let c=JSON.parse(JSON.stringify(this.shareItem))
          c.items.forEach((i,v)=>{
            i.amount=i.multiple
          })
          a.items = JSON.stringify(a.items)
          c.items = JSON.stringify(c.items)
          console.log(c)
          let d = this.globalPpproach.checkIsEncrypt(c)
          this.$http.post('/api/guess/play', d,{timeout:60000}).then(res=>{
           this.$vux.loading.hide()
            if(res.data.code==1){
              this.$vux.toast.text(res.data.msg)
              this.showChatOrder=false;
              if(this.isShare){
                this.shareOrder(a)
              }
              this.loadMoney();
            }
            else{
              // this.$vux.confirm.show({
              //       title: 'tip',
              //       content: res.data.msg,
              //       confirmText: "Xác nhận",
              //       showCancelButton: false,
              //       onConfirm: () => {
              //       }
              // });
              this.$publicPop({
                    title: "",
                    content: res.data.msg,
                    isShowCancelButton:false
             });
            }
          })
          },
           shareOrder(i){
            this.$vux.loading.show()
            // console.log(i)
            i.order_no=this.shareOrderNum
            let d = this.globalPpproach.checkIsEncrypt(i)
            this.$http.post('/api/chatroom/share', d).then(res=>{
              this.$vux.loading.hide()
              this.$vux.toast.text(res.data.msg,'middle')
            })
          },
          goDown(){
             this.$refs.chatScroll.scrollBottom()
          },
           initWebSocket(){
            // let wsServer = `${location.protocol == 'https:' ? 'wss' : 'ws'}://${location.host}/wss_notice`;
            let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
            //  let wsServer =this.chatSocket
            this.websock = new WebSocket(wsServer);
            this.websock.onmessage=this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
         websocketonmessage:function(e){
            let socketData=JSON.parse(e.data)
            // console.log(socketData)
            if(socketData.type=='connected'){
          let loginData={type:'login',client_id:socketData.client_id,user_id:this.$store.state.userinfo.user_id?this.$store.state.userinfo.user_id:0,client_type:'1'}
          this.websocketsend(loginData)
        }
        if(socketData.type=='chat'){
          if(socketData.code!=1){
              this.$publicPop({
                    title: "",
                    content: socketData.msg,
                    isShowCancelButton:false
             });
            return
          }
          if(socketData.user_id==this.$store.state.userinfo.user_id){
            localStorage.setItem("speakTime",Date.parse(new Date())/1000)
          }
          socketData.content=this.HTMLDecode(socketData.content)
          this.msgList.push(socketData)
           setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        if(socketData.msg_type=='share_plan'){
          if(socketData.code!=1){
            return
          }
         let share_plan=socketData.data
         share_plan.msg_type="share_plan"
          this.msgList.push(socketData.data)
           setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        if(socketData.msg_type=='chatroom_del_log'){
          if(socketData.code!=1){
            return
          }
          let idx=this.msgList.findIndex((i)=>i.chat_id==socketData.data.ids)
          this.msgList.splice(idx,1)
        }
         if(socketData.msg_type=='redpaper'){
          if(socketData.code!=1){
            this.$publicPop({
                    title: "",
                    content: socketData.msg,
                    isShowCancelButton:false
             });
            return
          }
          let c=socketData.data
          c.type="redpaper"
          c.content={
            rid:socketData.data.rid
          }
         this.msgList.push(c)
        setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                  this.getHbNum()
                },300)
        }
        if(socketData.msg_type=='image'){
          if(socketData.code!=1){
            return
          }
         this.msgList.push(socketData.data)
          setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        if(socketData.msg_type=='unmute_all'){
          if(socketData.code!=1){
            return
          }
          this.isMute=false
        }
        if(socketData.msg_type=='getpaper'){
          if(socketData.code!=1){
            return
          }
          let msgData=socketData.data
          msgData.type='getpaper'
          this.msgList.push(msgData)
          setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        if(socketData.msg_type=='expert_prediction'){
          if(socketData.code!=1){
            return
          }
          let msgData=socketData.data
          msgData.type='expert_prediction'
          msgData.calculateNum=0
          this.msgList.push(msgData)
        setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        if(socketData.msg_type=='share_profit'){
          if(socketData.code!=1){
            return
          }
          let msgData=socketData.data
          msgData.type='share_profit'
          this.msgList.push(msgData)
          setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                },300)
        }
        },
         websocketsend(Data) {//数据发送
          this.websock.send( JSON.stringify(Data))
        },
         websocketonopen(e){
           clearInterval(this.pingInterval)
           this.pingInterval=setInterval(() => {
             if(this.websock.readyState==1||this.websock.readyState==2){
               let pingData={type:'pong'}
              this.websocketsend(pingData)
              }else if(this.websock.readyState==3){
                this.initWebSocket()
              }
           }, 30000);
          console.log('open')
        },
        websocketonerror(){
        console.log('Socket error')
        },
       websocketclose(){
        console.log('close')
        },
         HTMLDecode(text) { 
          var temp = document.createElement("div"); 
          temp.innerHTML = text; 
          var output = temp.innerText || temp.textContent; 
          temp = null; 
          return output; 
        } ,
        getChat(){
          this.$vux.loading.show()
          this.$http.get('/api/chatroom/config').then(res=>{
          this.$vux.loading.hide()
            if(res.data.code==1){
              this.msgList=res.data.chat_log
              this.chatSettings=res.data.settings
               if(this.chatSettings.voice_purview=='none'){
                this.isMute=true
              }
              this.sharePurview=res.data.settings.share_purview.replace(/[^0-9]/ig,"")
              this.voicePpurview=res.data.settings.voice_purview.replace(/[^0-9]/ig,"")
              this.msgList.forEach((c,i)=>{
                if(c.type=="share_plan"||c.type=="redpaper"||c.type=="expert_prediction"||c.type=="share_profit"){
                   if(c.type=="expert_prediction"){
                    c.calculateNum=0
                  }
                  c.content=JSON.parse(c.content)
                }else{
                  c.content=this.HTMLDecode(c.content)
                }
                
              })
               setTimeout(()=>{
                  this.$refs.chatScroll.refresh()
                  this.$refs.chatScroll.scrollBottom()
                  
                },300)
              this.SETMSGPOINT(false)
            }
          })
        },
          getEmojis(i){
             let Img = `<img src="${i.path}" style='width:0.5rem;vertical-align: middle;'>`;
             this.$refs.edit.innerHTML+=Img
          },
          sendMsg(){
            // let voicevipNum= this.chatSettings.voice_purview.replace(/[^0-9]/ig,"")
            // if(this.$store.state.userinfo.vip<voicevipNum){
            //   return this.$vux.toast.text(this.chatSettings.voice_purview+'才能发言', 'bottom')
            // }
            if(/^\d+$/.test(this.$refs.edit.innerHTML)){
              return this.$vux.toast.text(this.$t('chatRoom[1]'), 'bottom')
            }
            if(!this.$refs.edit.innerHTML){
              return this.$vux.toast.text(this.$t('chatRoom[2]'), 'bottom')
            }
            
            if(Date.parse(new Date())/1000-localStorage.getItem('speakTime')<this.chatSettings.voice_rate&&localStorage.getItem('speakTime')){
              return this.$vux.toast.text(this.$t('chatRoom[3]')+this.chatSettings.voice_rate+this.$t('chatRoom[4]'), 'bottom')
            }
            let msgData={type:'chat',
            content:this.$refs.edit.innerHTML,
            user_id:this.$store.state.userinfo.user_id,
            nickname:this.$store.state.userinfo.nickname,
            user_type:this.$store.state.userinfo.user_type,
            avatar:this.$store.state.userinfo.avatar,
            vip:this.$store.state.userinfo.vip,
            win_rate:this.$store.state.userinfo.win_rate,
            }
           
            this.websocketsend(msgData)
            this.$refs.edit.innerHTML=''
            this.emojiShow=false
            // let id=Math.floor(Math.random()*3)+1
            // this.msgList.push({name:'用户'+id,text:this.$refs.edit.innerHTML,userId:id})
            // this.$refs.edit.innerHTML=''
            // this.emojiShow=false
            // this.$vux.toast.text('发送成功', 'bottom')
            
          },
           
    }
}
</script>
<style lang="less" scoped>

.rem(@name,@px){
    @{name}:unit(@px/75,rem)
  }
    .chat-box{
    position: fixed;
    z-index: 999;
    bottom: 0;
    background:#F6F6F6;
    width: 100%;
    .chat-title{
      .return-icon{
          .rem(width,34);
          .rem(height,42);
          background: url('../../assets/images/ynxz/left-return.png')no-repeat;
          background-size: contain;
          
        }
      .rem(height,90);
      border-bottom: 0.5px solid #d9d2d2;
      padding-top: 0.16rem;
      &.iszk{
         border-bottom: none;
         background: #1B74C8;
      }
      >div{
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sq{
        .ds-btn{
          .rem(width,164);
          .rem(height,60);
          text-align: center;
          color: #fff;
          font-size: 0.37rem;
          background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
          border-radius: 5px;
          line-height: 0.8rem;
        }
      }
      .zk{
       
        color: #fff;
        font-size:0.53rem
      }
      &.skin-btn-golden-room{
        >div{
          color: #E3CF95;
        }
        .return-icon{
          background: url('../../assets/images/skin/golden/goBack.png') no-repeat;

          background-size: contain;
        }
      }
    }
    .chat-main{
      .rem(height,488);
      ul{
        padding: 0.2rem;
        li{
          margin-bottom: 0.3rem;
          display: flex;
          .hb-info{
              width: 100%;
              text-align: center;
              span{
                border-radius: 4px;
                display: inline-block;
                padding: 4px 6px;
                background: rgba(0, 0, 0, 0.1);
              }
              color: #666666;
              i{color: #FF5640;}
            }
          // align-items: center;
          &.selfMsg{
           flex-direction: row-reverse;
            // span{
            //   margin-left: auto;
            // }
            .avatarBox{
             margin-left:0.2rem;
             margin-right: 0;
          }
             .msg-name{
              display: flex;
               flex-direction: row-reverse;
          }
            .msg-text{
               margin-left: auto;
               background:#48A0FF;
               margin-right: inherit;
               color: #fff;
               .chat-time{
              left: -0.8rem;
              right: none;
             }
             .orderBtn{
               padding: 0.2rem 0;
                color: #000;
               span{
                padding: 0.1rem 0.5rem;
                background:#fff;
                border-radius:1rem;
               }
             }
               img{
                 width:0.5rem;
                 vertical-align: middle;
               }
            }
          }

          .msg-content{width: 100%;display: flex;flex-direction: column;}
          .avatarBox{
             margin-right:0.2rem;
            img{
             .rem(width,100);
             .rem(height,100);
             border-radius: 50%;
          }
          }
          
          .msg-name{
            display: flex;
            span{
            color: #666;
            font-size: 0.32rem;
          }
          >img{margin: 0 0.2rem;}
          i{font-size:0.26rem;color: #FF5640;}
          }
          
          .msg-text{
     

            position: relative;
            margin-right: auto;
            background:#fff;
            color: #000;
             font-size: 0.37rem;
             padding: 0.15rem 0.2rem;
             border-radius: 0.16rem;
             max-width: 70%;
             p{
                              -webkit-touch-callout:none;
          -webkit-user-select:none;
          -khtml-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
             }
             img{
               pointer-events: none;
             }
             .chat-time{
              position: absolute;
              right: -0.8rem;
              bottom: 0;
              font-size: 0.26rem;
              color: #777777;
             }
			 &.sharePlan{
				 &.expireBtn{
				 				 background: #EEEEEE;
				 				 color: #222222;
				 				 .orderBtn{
				 					 span{
				 						 background: #C4C4C4;
				 						 color: #fff;
				 						 pointer-events: none;
				 					 }
				 				 }
				 }
			 }
			 
             .orderBtn{
               padding: 0.2rem 0;
                color: #fff;
               span{
                padding: 0.1rem 0.5rem;
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                border-radius:1rem;
               }
               
             }
             .calculate{
               font-size: 0.32rem;
               >div{
                 display: flex;
               }
               .menu{
                 margin: 0.15rem 0;
                 span{
                   width: 25%;
                   text-align: center;
                   border: 0.5px solid #abb1bd;
                   border-right: none;
                   line-height: 0.46rem;
                   &.active{
                     background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                     color: #fff;
                    border-color: #1489ef;
                   }
                   &:last-child{
                     border-right:0.5px solid #abb1bd;
                   }
                 }
               }
               .play-code{
                 margin-top: 0.15rem;
                 align-items: baseline;
                 span{
                   margin-right: 0.3rem;
                 }
                 i{
                   background: linear-gradient(180deg, #78DCFF 0%, #4DA1FF 100%);
                   margin: 0 0.06rem;
                    width: 0.5rem;
                    height: 0.5rem;
                    text-align: center;
                    color: #fff;
                    line-height: 0.5rem;
                    border-radius: 50%;
                 }
               }
             }
          }
          
        }
        &.mess-golden-list{
          li{
            &.selfMsg{
              .msg-text{
                background: linear-gradient(180deg, #A08779 0%, #9E8577 100%);
              }
            }
          }
        }
      }
      
    }
    .send-msg{
      position: fixed;
    bottom: 0;
    width: 100%;
      display: flex;
      justify-content: space-around;;
      align-items: center;
      border-top: 0.5px solid #d9d2d2;
      .rem(height,126);
      >div{margin: 0 0.1rem}
      .emojiText{
        .rem(height,70);
         width: 100%;
        background: #fff;
        border-radius: 0.2rem;
        padding: 0 0.1rem;
        color: #A2A2A2;
        font-size: 14px;
        -webkit-user-select:text;
        outline: none;
        overflow: hidden;
        &:empty::before{
          content: 'Vui lòng nhập nội dung trò chuyện';
          color: #ccc;
        }
        &:focus::before{

          content: none;
          color: #ccc;
        }
      }
       .textEn{
           &:empty::before{
          content: 'Please enter chat text';
          color: #ccc;
           }
        }
	  .mute{
		  width: 1.2rem;
		  .rem(height,56);
		   &.mute1{
		                  background: url('../../assets/images/fhemoji/mute-1.png') no-repeat;
		                  background-size: 100% 100%;
		           }
		              &.active{
		                  background: url('../../assets/images/fhemoji/mute.png') no-repeat;
		                  background-size: 100% 100%;
		              }
	  }
    }
    .emoji-box{
      position: fixed;
      bottom: 1.68rem;
      width: 100%;
      padding: 0.1rem;
      background:#fff;
      z-index: 9;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          padding: 0.1rem;
          margin:0 0.1rem;
          img{ .rem(width,60);}
        }
      }
    }
    .go-down{
      position: fixed;
      bottom: 2.1rem;
      right: 0.2rem;
      width: 0.93rem;
      height: 0.93rem;
      z-index: 11;
      img{width: 100%;}
    }
  }
   .chat-order{
    
   position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .order-info{
      width: 94%;
      background: #fff;
      position: absolute;
      left: 3%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      .title{
        text-align: center;
        padding: 0.12rem 0;
        border-bottom: 1px solid #E9E9E9;
        color: #6A86B9;
        h2{
          color: #445779;
          font-size: 0.53rem;
          margin-bottom: 0.05rem;
        }
      }
      .order-content{
        padding:0.2rem 0.4rem;
        color: #445779;
        font-size: 0.37rem;
        p{
          padding-bottom: 0.1rem;
        }
        .share-order{
          text-align: center;
          img{
            width: 0.42rem;
            vertical-align: text-bottom;
          }
        }
        table{
          border: 1px solid #017CFF;
          border-radius: 4px;
          border-collapse:collapse;
          margin-bottom: 0.2rem;
          margin-top: 0.1rem;
          tr{
            text-align: center;
            td{
              border-right: 1px solid #017CFF;
              padding: 0.1rem 0;
              input{
                width: 80%;
                border: 1px solid #666666;
                border-radius: 4px;
                padding-left: 0.1rem;
                background: url('../../assets/images/fhemoji/Group 279.png') no-repeat;
                background-size: 0.3rem 0.3rem;
                background-position: center right 6px;
                
              }
            }
            th{
              background:  #F2F2F2;
              color: #287BE1;
              border-bottom: 1px solid #017CFF;
              border-right: 1px solid #017CFF;
              padding: 0.1rem 0;
            }
          }
        }
      }
      .btns{
        display: flex;
        justify-content: space-around;
        margin-bottom: 0.36rem;
        span{
          display: block;
          .rem(width,270);
          .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
         .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
        }
      }
    }
    .share-rule{
     position: absolute;
     top: 0;
     bottom: 0;
     width: 100%;
     background: rgba(0, 0, 0, 0.5);
     >div{
      font-size: 0.37rem;
      width: 80%;
      background: #fff;
      position: absolute;
      left: 10%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      padding: 0.3rem;
      padding-top: 0.5rem;
      .btn{

        .rem(width,270);
        .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
        .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
         margin: 0 auto;
        margin-top: 0.4rem;
      }
     }
    }
    &.chat-order-golden{
      .order-info{
        .order-content{
          table{
            border: 1px solid #385068;
            
            
            tr{
              border-bottom: 1px solid #385068 !important;
              th{
                border-right: 1px solid #385068;
                border-bottom: 1px solid #385068;
                background: #F2F2F2;
                color: #E6AE18 !important;
              }
              td{
                border-right: 1px solid #385068;
              }
            }

          }
        }
      }
    }
  }
   .prohibit{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    >div{
      font-size: 0.37rem;
      width: 70%;
      background: #fff;
      position: absolute;
      left: 15%;
      top: 50%;
      transform: translateY(-50%);
      border-radius:0.13rem;
      padding: 0.4rem;
      .touxiang{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .manage-time{
        margin-top: 0.3rem;
        position: relative;
         color: #666666;
        font-size: 0.37rem;
        .rem(line-height,60);
        >div{
           position: relative;
          .rem(height,60);
        width:84%;
        border-radius: 8px;
        .rem(line-height,60);
        border: 1px solid #222222;
        margin-left: 8%;
        padding-left: 0.3rem;
        img{
          width: 0.3rem;
          position: absolute;
          right: 0.3rem;
          top: 0.3rem;
        }
        }
        ul{
          position: absolute;
          background: #fff;
          width: 84%;
          left: 8%;
          border-radius: 6px;
          z-index: 9;
          top: 0.9rem;
          box-shadow: 0 -2px 4px 0px #d9d9d9;
          li{
            width: 82%;
            margin-left: 15%;
            border-bottom: 1px solid #F5F7FA;
            position: relative;
            i{position: absolute;
            color: #479FFF;
            left: -0.5rem;}
          }
        }
      }
      .btn{

        .rem(width,270);
        .rem(height,70);
         background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
         border-radius: 0.53rem;
         text-align: center;
        .rem(line-height,70);
         color: #fff;
         font-size: 0.42rem;
         margin: 0 auto;
        margin-top: 0.4rem;
      }
      .close-btn{
       position: absolute;
        bottom: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
  }
  .to-game{
    position: fixed;
    bottom: 4rem;
    right: -0.4rem;
    padding: 0.15rem 0.2rem;
    background: -webkit-gradient(linear, left top, right top, from(#1486FF), to(#4BA1FF));
    background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
    border-radius: 1rem;
    z-index: 999;
    color: #fff;
    font-size: 0.32rem;
    img{
      width: 0.54rem;
    vertical-align: middle;
    }
    &.to-game-golden{
      background: linear-gradient(180deg, #A08779 0%, #9E8577 100%);
    }

  }
  .hb-point{
     position: fixed;
    top: 2rem;
    right: 0.2rem;
    z-index: 999;
    img{
      width: 1.4rem;
       animation:move 3s 0s infinite;-webkit-animation:moveHb 3s 0s infinite;
    }
  }
  .tc-bg{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    .profitdetail{
       background: #fff;
          padding: 10px 8px;
          width: 76%;
          border-radius: 10px;
          position: absolute;
          left: 12%;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.37rem;
          // line-height: 24px;
           .close{
            font-size: 40px;
            position: absolute;
            right: 4px;
            top: -6px;
            padding: 4px;
            cursor: pointer;
          }
          ul{
            padding: 0px 8px;
            li{
              font-size:  0.34rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 6px 0;
              border-bottom: 1px solid #ccc;
              img{
                width: 0.48rem;
                height: 0.48rem;
                border-radius: 50%;
              }
            }
          }
    }
  }
  .hb-bg{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    .hb-bg2{
          text-align: center;
          margin-top: 1.8rem;
          img{
            width: 80%;
            pointer-events: all;
          }
          
        }
        .hb-bg1{
          position: relative;
           text-align: center;
          margin-top: 1.8rem;
          img{
            width: 80%;
           
          }
          .hb-fruit{
            position: absolute;
            width: 4rem;
            top: 2.2rem;
            left: 3.2rem;
            p{
              font-size: 0.48rem;
              line-height: 0.5rem;
              color: #B87536;
            }
            h2{
              font-weight: bold;
              font-size: 28px;
              line-height: 42px;
              color: #F9504D;
            }
          }
        }
    .close-btn{
         position: absolute;
          cursor: pointer;
          left: 45%;
        }
    @keyframes moveHb
{
	0%, 65%{ 
	  -webkit-transform:rotate(0deg);
	  transform:rotate(0deg);
	}
	70% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(8deg);
	}
	75% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	80% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(6deg);
	}
	85% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	90% {  
	  -webkit-transform:rotate(8deg);
	  transform:rotate(8deg);
	}
	95% {  
	  -webkit-transform:rotate(-8deg);
	  transform:rotate(-8deg);
	}
	100% {  
	  -webkit-transform:rotate(0deg);
	  transform:rotate(0deg);
	}
}
  }
</style>