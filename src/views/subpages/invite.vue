<template>
  <div class="invite">
    <div class="infoHead"  :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback()" class="flex-demo" style="padding-top: 0.3em; z-index: 10000001;width: 1rem;">
          <img v-if="$st.state.skin!=5" src="../../assets/images/gray-back-icon.png" alt="" />
          <img v-if="$st.state.skin==5" src="../../assets/images/skin/golden/goBack.png" alt="" />
        </div>
        <div class="tickling" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]">{{$t('invite.text[79]')}}</div>
      
        <div style="position: absolute;top: 0;right: 0.25rem;font-size: 0.38rem;font-weight: bold;" @click="showShare=true" v-if="isInvite && isLoading">
            <span>{{$t('invite.text[4]')}}</span>
        </div>
        <div style="position: absolute;top: 0;right: 0.25rem;font-size: 0.38rem;font-weight: bold;" @click="applayMen()" v-if="!isInvite && isLoading">
            <span :class="[{'golden-color-xi':$st.state.skin==5}]">{{$t('invite.text[78]')}}</span>
        </div>
    
    </div>
      
    <myScroll 
     :bgColor="skin==5?'161C23':'EDF4FF'" ref="scrollWrapper" :probeType="2" class="invite-content" :isDown="true"
              :isLoad="isL" v-on:func="reLoad">
        <div class="top-img">
          <div class="grade-box clearfix">
            <span class="grade1"  :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]">{{isInvite?currCodeMsg.level_name:currCodeMsg.level_name}}</span>
            <div class="grade-progress" :class="[{'skin-border-b-pink':$st.state.skin==1},{'skin-border-b-blue':$st.state.skin==2},{'skin-border-b-green':$st.state.skin==3},{'skin-border-b-maingreen':$st.state.skin==4},{'skin-border-b-golden':$st.state.skin==5}]"><div class="grade-curr" :class="[{'skin-btn-pink':$st.state.skin==1},{'skin-btn-blue':$st.state.skin==2},{'skin-btn-green':$st.state.skin==3},{'skin-btn-maingreen':$st.state.skin==4},{'skin-btn-golden':$st.state.skin==5}]" :style="'width:'+currPersent+'%'"></div></div>
            <span class="grade2"  :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4},{'golden-color':$st.state.skin==5}]">{{isInvite?currCodeMsg.next_level_name:currCodeMsg.next_level_name}}</span>
          </div>
            <div class="grade-msg" :class="[{'grade-msg-golden':skin==5}]">
                <p v-if="!isInvite">{{$t('invite.text[77]')}}</p>
              
                <p v-if="isInvite">{{currCodeMsg.invitee_num}}{{$t('invite.text[7]')}}{{currCodeMsg.rebate*100}}%，{{$t('invite.text[8]')}} {{currCodeMsg.next_level_diff}} {{$t('invite.text[9]')}}</p>
            </div>
             <div class="img-box" style="padding-top: 1.8rem;"><img src="../../assets/images/extend/4.png" alt=""></div>
        </div>
        
        <div class="yq-fl" :class="[{'skin-yq-fl-pink':$st.state.skin==1},{'skin-yq-fl-blue':$st.state.skin==2},{'skin-yq-fl-green':$st.state.skin==3},{'skin-yq-fl-maingreen':$st.state.skin==4},{'skin-yq-fl-golden':$st.state.skin==5}]">
          
          <ul class="yg-title1 clearfix" :class="$st.state.defalutLan=='en'?'yg-title1-en':''">
              <li :class="[{'active':titleIndex == index && $st.state.skin ==0},{'active-pink':titleIndex == index && $st.state.skin ==1},{'active-blue':titleIndex == index && $st.state.skin ==2},{'active-green':titleIndex == index && $st.state.skin ==3},{'active-maingreen':titleIndex == index && $st.state.skin ==4},{'active-golden':titleIndex == index && $st.state.skin ==5}]" v-for="(v,index) in tabList" :key="index" class="fl" @click="changeIndex(index)">
                  {{v}}
              </li>
          </ul>
          <p v-if="titleIndex==3">
             {{$t('invite.text[10]')}}
          </p>
          <div class="tydl"  v-if="titleIndex==0" >
              <!-- <p class="tydl-p" >{{$t('invite.text[11]')}}</p> -->
              <p class="tydl-p" >{{$t('invite.text[80]')}}</p>
              <p class="tydl-p" >
                <span>{{$t('invite.text[81]')}}</span>
              {{$t('invite.text[82]')}}
              </p>
               
                <table class="yjbl">
                    <tr class="table-title" :class="[{'pink-table-title':$st.state.skin==1},{'blue-table-title':$st.state.skin==2},{'green-table-title':$st.state.skin==3},{'maingreen-table-title':$st.state.skin==4},{'golden-table-title':$st.state.skin==5}]" >
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''" class="">{{$t('invite.text[100]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[101]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[102]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[103]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[104]')}}</th>
                    </tr>
                    <tr>
                        <td>1,000k-150,000k</td>
                        <td>3</td>
                       <td>20%</td>
                        <td>10%</td> 
                         <td rowspan="6">{{$t('invite.text[106]')}}</td>
                        <!-- <td></td>  -->
                    </tr>
                    <tr>
                       <td>150,000k-500,000k</td>
                        <td>5</td>
                        <td>25%</td>
                        <td>15%</td>
                        <!-- <td></td> -->
                    </tr>
                    <tr>
                        <td>500,000k-1000,000k</td>
                        <td>7</td>
                        <td>30%</td>
                        <td>20%</td> 
                        <!-- <td></td> -->
                    </tr>
                    <tr>
                        <td>1000,000k-2000,000k</td>
                        <td>9</td>
                        <td>35%</td>
                        <td>25%</td>
                        <!-- <td></td> -->
                       
                    </tr>
                    <tr>
                        <td>2000,000k-3000,000k</td>
                        <td>15</td>
                        <td>45%</td>  
                        <td>30%</td> 
                        <!-- <td></td>  -->
                    </tr>
                    <tr>
                        <td>{{$t('invite.text[105]')}}3000,000k</td> 
                         <td>20</td>
                         <td>55%</td>
                         <td>35%</td>
                        
                    </tr>
                    <!-- <tr>
                       
                    </tr> -->
    
                </table>
                <!-- <table class="yjbl">
                    <tr class="table-title" :class="[{'pink-table-title':$st.state.skin==1},{'blue-table-title':$st.state.skin==2},{'green-table-title':$st.state.skin==3},{'maingreen-table-title':$st.state.skin==4},{'golden-table-title':$st.state.skin==5}]" >
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''" class="">{{$t('invite.text[12]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[13]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[14]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[15]')}}</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1-40000</td>
                        <td>5</td>
                        <td>30%</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>40001-150000</td>
                        <td>10</td>
                        <td>35%</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>150001-300000</td>
                        <td>15</td>
                        <td>40%</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>300001-500000</td>
                        <td>25</td>
                        <td>45%</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>500001-1000000</td>
                        <td>35</td>
                        <td>50%</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>>1000001</td>
                        <td>50</td>
                        <td>55%</td>
                    </tr>
                </table> -->
                <!-- <p class="table-title" :class="[{'pink-table-title':$st.state.skin==1},{'blue-table-title':$st.state.skin==2},{'green-table-title':$st.state.skin==3},{'maingreen-table-title':$st.state.skin==4},{'golden-table-title':$st.state.skin==5}]">{{$t('invite.text[76]')}}</p> -->
                <!-- <table class="yjjs">
                    <tr >
                        <td class="yjjs-title">{{$t('invite.text[16]')}}</td>
                        <td class="yjjs-content">{{$t('invite.text[17]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[18]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[19]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[20]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[21]')}}</td>
                    </tr>
                    <tr>
                        <td class="yjjs-title">{{$t('invite.text[22]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[23]')}}
                        </td>
                    </tr>
                    <tr>
                        <td class="yjjs-title">{{$t('invite.text[24]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[25]')}}
                        </td>
                    </tr>
                    <tr>
                        <td class="yjjs-title">{{$t('invite.text[26]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[27]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[28]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[29]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[30]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[31]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[32]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[33]')}}</td>
                    </tr>
                     <tr>
                        <td class="yjjs-title">{{$t('invite.text[34]')}}</td>
                        <td  class="yjjs-content">{{$t('invite.text[35]')}}
                        </td>
                    </tr>
                </table> -->
              <p class="tydl-p" ><span>{{$t('invite.text[83]')}}</span>{{$t('invite.text[84]')}}</p>
              <p class="tydl-p" ><span>{{$t('invite.text[85]')}}</span>{{$t('invite.text[86]')}}</p>
          </div>
          <div class="yxdl" v-if="titleIndex==1">
               <p class="font-bold">{{$t('invite.text[36]')}}</p>
            <div style="padding-left:0.2rem" class="yxdl-content">
                <p>{{$t('invite.text[37]')}}</p>
                <p>{{$t('invite.text[38]')}}</p>
                <p>{{$t('invite.text[39]')}}</p>
                <p>{{$t('invite.text[40]')}}</p>
                <p>{{$t('invite.text[41]')}}</p>
            </div>
          </div>
          <div class="dlfc" v-if="titleIndex==2">
            <p>{{$t('invite.text[42]')}}</p>
            <p>{{$t('invite.text[43]')}}</p>
            <p>{{$t('invite.text[44]')}}</p>
            <p>{{$t('invite.text[45]')}}</p>
            <p>{{$t('invite.text[46]')}}</p>
            <p>{{$t('invite.text[47]')}}</p>
            <p>{{$t('invite.text[48]')}}</p>
          </div>
        </div>
        <div class="tg-list" :class="[{'skin-tg-list-pink':$st.state.skin==1},{'skin-tg-list-blue':$st.state.skin==2},{'skin-tg-list-green':$st.state.skin==3},{'skin-tg-list-maingreen':$st.state.skin==4},{'skin-tg-list-golden':$st.state.skin==5}]">
          <!-- <ul>
            <li v-for="(v,index) in marketList" :key="index">
              <div class="grade-item">
                  <span :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3},{'maingreen-color':$st.state.skin==4}]">{{v.invitee_num}}</span></div>
                
              <p>{{$t('invite.text[49]')}} {{v.reward}} {{$t('moneyDw')}}</p>
            </li>
          </ul> -->
          <p style="text-align:center"> <span>{{$t('invite.text[87]')}}</span> </p>    
            <table class="yjbl">
                    <tr class="table-title" :class="[{'pink-table-title':$st.state.skin==1},{'blue-table-title':$st.state.skin==2},{'green-table-title':$st.state.skin==3},{'maingreen-table-title':$st.state.skin==4},{'golden-table-title':$st.state.skin==5}]" >
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''" class="">{{$t('invite.text[95]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[96]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[97]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[98]')}}</th>
                        <th :style="$st.state.defalutLan=='en'?'line-height:.4rem':''">{{$t('invite.text[99]')}}</th>
                    </tr>
                    <tr>
                        <td>8%</td>
                        <td>13%</td>
                        <td>9%</td>
                        <td>8%</td>
                        <td>14%</td>
                    </tr>
                </table>      
          <p > <span>{{$t('invite.text[88]')}}</span>{{$t('invite.text[89]')}} </p>          
          <p > <span>{{$t('invite.text[90]')}}</span>{{$t('invite.text[91]')}} </p>          
          <p > <span>{{$t('invite.text[92]')}}</span>{{$t('invite.text[93]')}} </br>{{$t('invite.text[94]')}} </p>          

          <!-- <p style="padding:.3rem 0">{{$t('invite.text[50]')}}</p> -->
        </div>
       

    </myScroll>
    <footerExtend/>
    <!--分享弹窗-->
    <div class="share-box" v-if="showShare" @click="showShare=false">
          <div class="share-box-content">
              <div class="title">{{$t('invite.text[51]')}} <i>{{currCodeMsg.market_code}}</i></div>
<!--              <dl class="copy-link" @click="copyUrl">-->
              <dl class="copy-link" @click="copyLink('copy-link')" data-clipboard-action="copy" :data-clipboard-text="currCodeMsg.market_url">
                  <dt></dt>
                  <dd>{{$t('invite.text[52]')}}</dd>
              </dl>
              <dl class="copy-code" @click="copyLink('copy-code')" data-clipboard-action="copy" :data-clipboard-text="currCodeMsg.market_code">
                  <dt></dt>
                  <dd>{{$t('invite.text[53]')}}</dd>
              </dl>
              <dl class="extend-pic" @click="$router.push('/inviteCode')">
                  <dt></dt>
                  <dd>{{$t('invite.text[54]')}}</dd>
              </dl>
          </div>

    </div>
    <!-- 推广员申请表 -->
    <div class="tg-sqb" v-if="tgBox" @click="tgBox=false"></div>
    <div class="tg-box" v-if="tgBox" :class="skin==5?'skin-btn-golden-cs':''">
        <h3>{{$t('invite.text[78]')}}</h3>
        <p class="input-box">
            <input type="text" v-model="qqContent" maxlength="10">
        </p>
        <p class="huiColor">{{$t('invite.text[56]')}}</p>
        <div class="tg-btn" :class="[{'blue-bg':skin==2},{'green-bg':skin==3},{'maingreen-bg':skin==4},{'pink-bg':skin==1},{'golden-bg':skin==5}]" @click="applyCode()">{{$t('invite.text[57]')}}</div>
    </div>
  </div>

</template>

<script>
  import myScroll from "../../components/myScroll";
  import footerExtend from "../../components/footer_extend";
  import { mapState } from 'vuex';
export default {
  name: "invite",
  components: {
    myScroll,footerExtend
  },
  data() {
    return {
      showShare:false,
      tgBox:false,
      qqContent:'',
      isInvite:false,
        isLoading:false,
        currHref:location.origin,
        currCodeMsg:{},//推广码
        marketList:[],
        currPersent:'',
        isL: false, //是否显示 下拉刷新的组件,
        titleIndex:0,
        tabList:[this.$t('invite.text[0]'),this.$t('invite.text[1]'),this.$t('invite.text[2]'),this.$t('invite.text[3]')],
        // tabIndex:0

    };
  },
  computed:{
     ...mapState(["userinfo","webInitData","skin"])
  },
  watch:{
    qqContent: function(n, o) {
      if (n) {
        this.$nextTick(() => {     
          let i = n.toString();
          // console.log(this.zsMount.toString().length)
          this.qqContent = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
   
        });
      }
    },
  },
  created(){
    this.getInviteCode();
      this.getList();
  },
   beforeRouteEnter (to, from, next){
    next(vm => {
        // 通过 `vm` 访问组件实例,将值传入fromPath
        vm.fromPath = from.path
        // console.log('00',vm.fromPath)
    })
   },
  methods:{
      copyUrl(){
          var ele = document.getElementById("url");
          ele.select();
          document.execCommand("Copy");
          // alert("复制链接成功！");
          this.$vux.toast.show({
              text: this.$t('invite.text[58]'),
              position: "middle"
          });
      },
    goback(){
      // this.$router.go(-1);
      if(this.fromPath=='/live'){
          this.$router.push('/live');
      }if(this.fromPath=='/'){
          this.$router.push('/');
      }else{
          this.$router.push('/member');
      }
      
    },
      reLoad(data) {
          if (data == "down") {
              this.getInviteCode(true);
          } else if (data == "up") {
          }
      },
      applayMen(){
        if(this.currCodeMsg.status==9){
           
            this.$publicPop({
                  title: this.$t('invite.text[65]'),
                  content: '<p style="line-height: .7rem;font-weight: 500;color: #999">'+this.$t('invite.text[66]')+'!</p>',
                  isShowCancelButton:false,
                  clickCancel: () => {},
                  clickConfirm: () => {
                     
                  }
              });
        }else{
            this.tgBox = true;
        }
      },
      copyLink(className) {
          let _this = this;
          let clipboard = new this.clipboard("."+className);
          // alert(clipboard)
          clipboard.on('success', function () {
              _this.$vux.toast.show({
                  text: _this.$t('invite.text[58]'),
                  position: "middle"
              });
              localStorage.setItem('market_code',_this.currCodeMsg.market_code);
          });
          clipboard.on('error', function () {
              _this.$vux.toast.text(_this.$t('invite.text[63]'));
          });
      },
      //获取邀请码
      getInviteCode(flag){
          this.isLoading = false;
          if(flag) this.isL = true
          this.$http.get('/api/market/index').then(res=>{
              this.isL = false;
              this.isLoading = true;
              if(res && res.data.code==1){
                  this.currCodeMsg = res.data.data;
                  this.isInvite = this.currCodeMsg.status==10?true:false;
                  this.currPersent = (this.currCodeMsg.invitee_num/((this.currCodeMsg.invitee_num-0) + (this.currCodeMsg.next_level_diff-0)))*100;
              }
          })
      },
      //申请邀请码
      applyCode(){
          if(this.qqContent == '') return this.$vux.toast.text(this.$t('invite.text[75]'), 'top');
        //   if(this.qqContent)
        let d = this.globalPpproach.checkIsEncrypt({
            mobile: this.qqContent,
        })
          this.$http.post('/api/market/apply',d).then(res=>{
            //   console.log(res);
              if(res && res.data.code==1){
              

                    this.$publicPop({
                        title: this.$t('invite.text[65]'),
                        content: '<p style="line-height: .7rem;font-weight: 500;color: #999">'+this.$t('invite.text[66]')+'!</p>',
                        isShowCancelButton:false,
                        clickCancel: () => {},
                        clickConfirm: () => {
                            
                        }
                    });

              }else if(res.data.code==15){
                

                this.$publicPop({
                    title: this.$t('invite.text[68]'),
                    content: '<p style="line-height: .7rem;font-weight: 500;color: #999">'+this.$t('invite.text[69]')+'<br/> '+this.$t('invite.text[70]')+'</p>',
                    isShowCancelButton:false,
                    clickCancel: () => {},
                    clickConfirm: () => {
                        
                    }
                });

              }else{
               

                this.$publicPop({
                    title: this.$t('invite.text[71]'),
                    content: '<p style="line-height: .7rem;font-weight: 500;color: #999">'+this.$t('invite.text[72]')+' <br/> '+this.$t('invite.text[73]')+'</p>',
                    isShowCancelButton:false,
                    confirmText:this.$t('invite.text[74]'),
                    clickCancel: () => {},
                    clickConfirm: () => {
                        window.open(JSON.parse(this.webInitData).customer) ;
                    }
                });
              }

            this.tgBox = false;
          })
      },
      //推广级别列表
      async getList(){
        let res = await this.$http.get('/api/market/levellist');
        if(res && res.data.code == 1){
            this.marketList= res.data.data;
            setTimeout(()=>{
                 this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
            },20)

        }
      },
      changeIndex(index){
          this.titleIndex = index;
      },
  },
    mounted() {
        //        到时候放App全局
        document.body.addEventListener(
            "touchmove",
            function(e) {
                e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            },
            { passive: false }
        );

        this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
        this.$refs.scrollWrapper.enable(); //启动滚动条
        this.$refs.scrollWrapper.disable(); //禁止滚动条
    },



};
</script>

<style scoped lang="less"
>
.rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .infoHead {
        height: 1.2rem;
        line-height: 1.2rem;
        background: #fff;
        text-align: center;
    }
    .flex-demo {
        text-align: center;
        position: fixed;
    }
    .flex-demo img {
        width: 0.3rem;
    }
    .tickling {
        font-weight: 550;
        font-size: 0.45rem;
        color:#1486FF;
    }
    .top-img{
        text-align: center;
        color: #fff;
        p{
            margin-top: .2rem;
            letter-spacing: 1px;
        }
        .grade-box{
            width: 75%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top:1rem;
            color: #1486FF;
            >span{
                position: absolute;
                top:0;
                .rem(font-size,28)
            }
            .grade1{
                left: -.2rem;
            }
            .grade2{
                // right: 0;
                right: -12px;
            }
        }
        .grade-msg{
            width: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top:1.6rem;
            text-align: center;
            color: #445779;
            &.grade-msg-golden{
                color: #928151;
            }
        }
        .grade-progress{
            width: 72%;
            .rem(height,28);
            background: #BAC5D2;
            border-radius: 30px;
            margin: .1rem auto 0;
            position: relative;
            overflow: hidden;
            border: 1px solid #58A5FF;
            .grade-curr{
                position: absolute;
                left: 0;
                background: linear-gradient(180deg, #5FABFF 0%, #007CFF 100%);
                
                height: 100%;
                border-radius: 30px;
            }
        }
    }
    .yq-fl{
        position: relative;
        width: 92%;
        margin: -1.4rem auto 0;
        background: #fff;
        // .rem(padding-top,60);
        .rem(padding-left,20);
        .rem(padding-right,20);
        .rem(padding-bottom,20);
        border-radius: 5px;
        box-shadow: 0 0 6px #ccc;
        .yg-title{
            width: 102%;
            position: relative;
            top: -0.2rem;
            display: flex;
            margin-left: -0.1rem;
            li{
                width: 25%;
            }
        }
        .yg-title1{
             position: relative;
            top: -0.2rem;
          li{
                .rem(height,60);
                background: url('../../assets/images/extend/tabbg.png') no-repeat;
                background-size: contain;
                color:#445779;
                width: 25%;
                padding: 0 3%;
                text-align: center;
                &.active{
                    background: url('../../assets/images/extend/tabbg-active.png') no-repeat!important;
                    background-size: contain!important;
                    color:#fff!important;
                }
                &.active-pink{
                    background: url('../../assets/images/extend/tabbg-pink.png') no-repeat!important;
                    background-size: contain!important;
                     color:#fff!important;
                }
                &.active-blue{
                    background: url('../../assets/images/extend/tabbg-blue.png') no-repeat!important;
                    background-size: contain!important;
                     color:#fff!important;
                }
                &.active-green{
                    background: url('../../assets/images/extend/tabbg-green.png') no-repeat!important;
                    background-size: contain!important;
                     color:#fff!important;
                }
                &.active-maingreen{
                    background: url('../../assets/images/extend/tabbg-maingreen.png') no-repeat!important;
                    background-size: contain!important;
                     color:#fff!important;
                }
                &.active-golden{
                    background: url('../../assets/images/extend/tabbg-golden.png') no-repeat!important;
                    background-size: contain!important;
                     color: #A85100!important;
                }
          }
          &.yg-title1-en{
            li{
                font-size: .3rem;
                line-height: .35rem;
            }
          }
        }
        p{
            font-size: 0.32rem;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .tydl{
            .table-title{
                font-weight: normal;
                .rem(line-height,60);
                color: #fff;
                text-align: center;
                background: linear-gradient(180deg, #5FABFF 0%, #007CFF 100%);
                border-radius: 0.2rem 0.2rem 0 0;
                .rem(margin-top,40);
            }
            .pink-table-title{
                background: linear-gradient(1.1deg, #FB6E6D 1.1%, #FFCAA2 95.14%)!important;
            }
             .blue-table-title{
                background: linear-gradient(1.1deg, #06B4D8 1.15%, #75DFF2 99.28%)!important;
            }
             .green-table-title{
                background: linear-gradient(1.1deg, #32C986 -11.06%, #59F3B2 103.42%)!important;
            }
            .maingreen-table-title{
                background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%)!important;
            }
            .golden-table-title{
                background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%)!important;
                color: #A85100!important;
            }
            .tydl-p{
               //text-align: center;
                text-align: left;
                margin-bottom: 0.2rem;
                    letter-spacing: 0;
                    font-size: 0.3rem;
                    color: #445779;
                    span{
                        color: #1486FF;
                    }
            }
            table{
                border: 1px solid #1486FF;
                color: #445779;
                border-collapse:collapse;
                tr th{
                    .rem(line-height,60);
                    .rem(font-size,24);
                    font-weight: normal;
                    &:first-of-type{
                        border-top-left-radius: 0.2rem;
                    }
                    &:last-of-type{
                        border-top-right-radius: 0.2rem;
                    }
                }
                tr,tr td{
                    border: 1px solid #1486FF;
                }
            }
            .yjbl{
                width: 100%;
                text-align: center;
                border-top-left-radius: 0.2rem;
                .rem(margin-top,30);
                border: none;
                tr{
                    &:first-of-type{
                        border: none;
                    }
                    td{
                         padding: 0.2rem 0.1rem;
                    }
                }
               
            }
            .yjjs{
                background: #fff;
                tr{
                    .yjjs-title{
                        width:25%;
                        border-right: 1px solid #1486FF;
                        text-align: center;
                    }
                    .yjjs-content{
                        // width: 75%;
                        padding:  0.1rem;
                    }
                    
                }
            }
       } 
        .yxdl{
            .yxdl-content{
                p{font-size: 0.28rem;font-weight: normal;}
            }
        }
        .dlfc{
            p{
                font-size: 0.28rem;
                font-weight: normal;
            }
        }
    }

    .sq-tg{
        width: 81.33%;
        position: fixed;
        // top:14rem;
        bottom:3rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        background:linear-gradient(90deg,#ff3131,#ff8067);
        .rem(height,90);
        .rem(line-height,90);
        border-radius: 30px;
        color: #fff;
        text-align: center;
        .rem(font-size,32);
        font-weight: bold;

    }
    .tg-list{
        /*position: absolute;*/
        top:13.6rem;
        min-height: 11.5rem;
        background: #fff;
        box-shadow: 0 0 6px #ccc;
        .rem(padding-top,10);
        .rem(padding-left,30);
        .rem(padding-right,30);
        border-radius: 5px;
        width: 92%;
        margin: .5rem auto 1rem;
        p{
            margin-bottom: 0.2rem;
            span{
                color: #1486FF;
            }
        }
        .yjbl{
                width: 100%;
                text-align: center;
                border-top-left-radius: 0.2rem;
                .rem(margin-top,30);
                border: none;
                tr{
                    &:first-of-type{
                        border: none;
                    }
                    td{
                         padding: 0.2rem 0.1rem;
                    }
                }
               
            }
        li{
            border-bottom: 1px dashed #BAC5D2;
            .rem(padding-top,30);
            .rem(padding-bottom,30);
            p{
                color: #445779;
            }
            .grade-item{
                .rem(padding-bottom,10);
                i{
                    display: inline-block;
                    .rem(width,90);
                    .rem(height,36);
                    vertical-align: bottom;
                }
                span{
                    .rem(font-size,28);
                    // .rem(margin-left,35);
                    color:#1486FF;

                }
            }
        }
    }
    .dl-share{
    position: relative;
    background: #e8f7fe;
    padding-top: 0.8rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-bottom: 0.2rem;
    border-radius: 5px;
    width: 92%;
    margin: 0.5rem auto 0.6rem;
    .font-bold{font-weight: bold;font-size: 0.37rem}
    .title{position: absolute;  .rem(width,285);.rem(height,59); left: 29%;top: -.25rem;}
    .title1{
        background: url("../../assets/images/extend/invite_title1.png") no-repeat;background-size: 100% 100%;
    }
    .title2{
        background: url("../../assets/images/extend/invite_title2.png") no-repeat;background-size: 100% 100%;
    }
    }
    .share-box{
        background: rgba(0,0,0,.5);
        position: fixed;
        width: 100%;
        height: 100%;
        max-width: 750px;
        z-index: 200;
        .share-box-content{
            position: absolute;
            bottom: 0;
            width: 100%;
            max-width: 750px;
            background: #fff;
            border-radius: 5px 5px 0 0;
            .rem(padding-bottom,150);
            .title{
                text-align: center;
                .rem(font-size,28);
                border-bottom: 1px solid #eee;
                .rem(padding-top,40);
                .rem(padding-bottom,40);
                font-weight: bold;
                i{
                    color: #FF513E;
                }
            }

            dl{
                display: inline-block;
                text-align: center;
                width: 32%;
                .rem(padding-top,50);

            }
            dt{
                .rem(width,80);
                .rem(height,80);
                display: inline-block;
            }
            dd{
                
                .rem(padding-top,10);
            }
            .copy-link dt{
                background: url("../../assets/images/extend/copy_link.png") no-repeat;
                background-size: contain;
            }
            .copy-code dt{
                background: url("../../assets/images/extend/yqlogo.png") no-repeat;
                background-size: contain;
            }
            .extend-pic dt{
                background: url("../../assets/images/extend/copy_pic.png") no-repeat;
                background-size: contain;
            }
        }
    }
    .tg-sqb{
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.3);
        z-index: 100;
        

    }
    .tg-box{
        background-color: #fff;
        .rem(width,630);
        .rem(height,455);
        position: fixed;
        z-index: 101;
        left: 50%;
        transform: translateX(-50%);
        top: 50%;
        margin-top: -50%;
        border-radius: 10px;
        h3{
            text-align: center;
            font-weight: bold;
            .rem(font-size,32);
            .rem(margin-top,58);
            .rem(margin-bottom,39);

        }
        .input-box{
            margin: 0 auto;
            .rem(width,490);
        }
        input{
            .rem(width,490);
            .rem(height,80);
            .rem(line-height,80);
            background-color: #F6F6F6;
            border-radius:5px;
            .rem(padding-left,20);
            // margin: 0 auto;
        }
        p{
            margin: 0 auto;
            .rem(margin-top,20);
            .rem(margin-bottom,50);
            .rem(width,490);
        }
        .tg-btn{
            color: #fff;
            background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
            border-radius: 50px;
            .rem(width,490);
            .rem(height,80);
            .rem(line-height,80);
            margin: 0 auto;
            text-align: center;
            font-weight: bold;
            .rem(font-size,32);
        }

    }
      table{
                border: 1px solid #1486FF;
                color: #445779;
                border-collapse:collapse;
                tr th{
                    .rem(line-height,60);
                    .rem(font-size,24);
                    font-weight: normal;
                    &:first-of-type{
                        border-top-left-radius: 0.2rem;
                    }
                    &:last-of-type{
                        border-top-right-radius: 0.2rem;
                    }
                }
                tr,tr td{
                    border: 1px solid #1486FF;
                }
            }
      .yjbl{
                width: 100%;
                text-align: center;
                border-top-left-radius: 0.2rem;
                .rem(margin-top,30);
                border: none;
                tr{
                    &:first-of-type{
                        border: none;
                    }
                    td{
                         padding: 0.2rem 0.1rem;
                    }
                }
               
            }
                    .tydl{
            .table-title{
                font-weight: normal;
                .rem(line-height,60);
                color: #fff;
                text-align: center;
                background: linear-gradient(180deg, #5FABFF 0%, #007CFF 100%);
                border-radius: 0.2rem 0.2rem 0 0;
                .rem(margin-top,40);
            }
            .pink-table-title{
                background: linear-gradient(1.1deg, #FB6E6D 1.1%, #FFCAA2 95.14%)!important;
            }
             .blue-table-title{
                background: linear-gradient(1.1deg, #06B4D8 1.15%, #75DFF2 99.28%)!important;
            }
             .green-table-title{
                background: linear-gradient(1.1deg, #32C986 -11.06%, #59F3B2 103.42%)!important;
            }
            .maingreen-table-title{
                background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%)!important;
            }
            .golden-table-title{
                background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%)!important;
                color: #A85100!important;
            }
            .tydl-p{
               //text-align: center;
                text-align: left;
                margin-bottom: 0.2rem;
                    letter-spacing: 0;
                    font-size: 0.3rem;
                    color: #445779;
                    span{
                        color: #1486FF;
                    }
            }
            table{
                border: 1px solid #1486FF;
                color: #445779;
                border-collapse:collapse;
                tr th{
                    .rem(line-height,60);
                    .rem(font-size,24);
                    font-weight: normal;
                    &:first-of-type{
                        border-top-left-radius: 0.2rem;
                    }
                    &:last-of-type{
                        border-top-right-radius: 0.2rem;
                    }
                }
                tr,tr td{
                    border: 1px solid #1486FF;
                }
            }
            .yjbl{
                width: 100%;
                text-align: center;
                border-top-left-radius: 0.2rem;
                .rem(margin-top,30);
                border: none;
                tr{
                    &:first-of-type{
                        border: none;
                    }
                    td{
                         padding: 0.2rem 0.1rem;
                    }
                }
               
            }
            .yjjs{
                background: #fff;
                tr{
                    .yjjs-title{
                        width:25%;
                        border-right: 1px solid #1486FF;
                        text-align: center;
                    }
                    .yjjs-content{
                        // width: 75%;
                        padding:  0.1rem;
                    }
                    
                }
            }
       } 
           .skin-yq-fl-green{
            p>span{
                color: #0B9B71 !important;
            }
        table{
            td{
                border: 1px solid #0B9B71 !important;
            }
        }
    }
    .skin-yq-fl-maingreen{
        p>span{
            color: #01B373 !important;
        }
        table{
            td{
                border: 1px solid #01B373 !important;
            }
        }
    }
    .skin-yq-fl-pink{
           p>span{
                color:  #FB796B !important;
            }
        table{
            td{
                border: 1px solid #FB796B !important;
            }
        }
    }
    .skin-yq-fl-blue{
         p>span{
                color: #0CB6D9 !important;
            }
        table{
            td{
                border: 1px solid #0CB6D9 !important;
            }
        }
    }
    .skin-yq-fl-golden,.skin-tg-list-golden{
        background: #464B53!important;
        color: #CECECE!important;
        box-shadow:0px 0px 0px !important;;
        p{
            span{
                    color: #AB9B62 !important;
            }
        }
        .tydl,.yjbl{
            .tydl-p{
                color: #CECECE !important;
            }
                        .yjjs{
                            background: none;
                        }
            table {
                    color: #CECECE !important;
                    td {
                        border: 1px solid #928151 !important;
                    }
                }
        }
        
    }
    .skin-tg-list-golden{
        background: #464B53 !important;
        color: #CECECE !important;
        box-shadow: 0px 0px 0px!important;
        table{
           color: #CECECE !important;
           tr{
               border-color: #928151 !important;
               td{
                border-color: #928151 !important;
               }
           }
          
        }
        ul{
            li .grade-item span{
                color: #E3CF95!important;
            }
            li p{
                color: #CECECE !important;
            }
        }
    }
    .skin-tg-list-pink{
          p>span{
            color: #01B373 #FB796B !important;
        }
        table{
           tr{
               border-color: #FB796B !important;
               td{
                border-color: #FB796B !important;
               }
           }
          
        }
    }
    .skin-tg-list-green{
          p>span{
            color: #0B9B71 !important;
        }
        table{
           tr{
               border-color: #0B9B71 !important;
               td{
                border-color: #0B9B71 !important;
               }
           }
          
        }
    }
    .skin-tg-list-maingreen{
          p>span{
            color: #01B373 !important;
        }
        table{
           tr{
               border-color: #01B373 !important;
               td{
                border-color: #01B373 !important;
               }
           }
          
        }
    }
    .skin-tg-list-blue{
           p>span{
            color: #0CB6D9 !important;
        }
        table{
           tr{
               border-color: #0CB6D9 !important;
               td{
                border-color: #0CB6D9 !important;
               }
           }
          
        }
    }

            .tydl,.yjbl{
            .table-title{
                font-weight: normal;
                .rem(line-height,60);
                color: #fff;
                text-align: center;
                background: linear-gradient(180deg, #5FABFF 0%, #007CFF 100%);
                border-radius: 0.2rem 0.2rem 0 0;
                .rem(margin-top,40);
            }
            .pink-table-title{
                background: linear-gradient(1.1deg, #FB6E6D 1.1%, #FFCAA2 95.14%)!important;
            }
             .blue-table-title{
                background: linear-gradient(1.1deg, #06B4D8 1.15%, #75DFF2 99.28%)!important;
            }
             .green-table-title{
                background: linear-gradient(1.1deg, #32C986 -11.06%, #59F3B2 103.42%)!important;
            }
            .maingreen-table-title{
                background: linear-gradient(1.76deg, #008258 0.65%, #00BF7A 97.68%)!important;
            }
            .golden-table-title{
                background: linear-gradient(180deg, #FAF4E5 0%, #D6B966 80.21%)!important;
                color: #A85100!important;
            }
            .tydl-p{
               //text-align: center;
                text-align: left;
                margin-bottom: 0.2rem;
                    letter-spacing: 0;
                    font-size: 0.3rem;
                    color: #445779;
                    span{
                        color: #1486FF;
                    }
            }
            table{
                border: 1px solid #1486FF;
                color: #445779;
                border-collapse:collapse;
                tr th{
                    .rem(line-height,60);
                    .rem(font-size,24);
                    font-weight: normal;
                    &:first-of-type{
                        border-top-left-radius: 0.2rem;
                    }
                    &:last-of-type{
                        border-top-right-radius: 0.2rem;
                    }
                }
                tr,tr td{
                    border: 1px solid #1486FF;
                }
            }
            .yjbl{
                width: 100%;
                text-align: center;
                border-top-left-radius: 0.2rem;
                .rem(margin-top,30);
                border: none;
                tr{
                    &:first-of-type{
                        border: none;
                    }
                    td{
                         padding: 0.2rem 0.1rem;
                    }
                }
               
            }
            .yjjs{
                background: #fff;
                tr{
                    .yjjs-title{
                        width:25%;
                        border-right: 1px solid #1486FF;
                        text-align: center;
                    }
                    .yjjs-content{
                        // width: 75%;
                        padding:  0.1rem;
                    }
                    
                }
            }
       } 
</style>
