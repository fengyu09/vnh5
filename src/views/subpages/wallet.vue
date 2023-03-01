<template>
    <div class="wallet" :class="$st.state.skin==5?'golden-wallet-body':''">
        <div class="header" :class="$st.state.skin==5?'goldenHeader':''">
            <div v-if="$st.state.skin!=5" @click="$router.go(-1);">
                <i  class="go-back"></i>
            </div>
            <div  v-if="$st.state.skin==5" @click="$router.go(-1);">
                <img  style="width: 0.3rem;"  src="../../assets/images/skin/golden/goBack.png" alt="" />
            </div>
            <div>
                <h3 :class="$st.state.skin==5?'golden-color':''">{{$t('wallet.text[0]')}}</h3>
            </div>
            <div class="huishou">
                <i :class="[{'ts-pink':skin == 1},{'ts-blue':skin == 2},{'ts-green':skin == 3},{'ts-maingreen':skin == 4},{'ts-golden':skin == 5}]" class="ts-btn"   @click="huishouShow=!huishouShow" ></i>
            </div>
            <div class="huishou-point" v-show="huishouShow"><span>{{$t('wallet.text[1]')}}</span></div>
        </div>
        <myScroll :bottom="0" :top="1.2" :bgColor="skin==5?'161C23':'fff'">
             <div class="qb-box">
                <div class="qb-title">
                    <h3 class="fl">{{$t('wallet.text[2]')}}<i :class="[{'re-pink':skin == 1},{'re-blue':skin == 2},{'re-green':skin == 3},{'re-maingreen':skin == 4},{'re-golden':skin == 5}]" class="refurbish" @click="refurbish()"></i></h3>
                    <span class="fr" @click="hsMoney">{{$t('wallet.text[3]')}} </span>
                </div>
                <div class="qb-content">
                    <div>
                        <p>
                            <img v-if="skin!=5" src="../../assets/images/member/qb_icon.png" alt=""> 
                            <img v-if="skin==5" src="../../assets/images/skin/golden/qb_icon.png" alt=""> 
                            {{$t('wallet.text[4]')}}
                        </p>
                        <p> 
                           
                            <span v-if="totalBalance||totalBalance==0" :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]">{{totalBalance}}</span>
                            <span :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]" v-else >{{$t('wallet.text[5]')}}</span>
                             </p>
                    </div>
                    <div>
                        <p>
                            <img v-if="skin!=5" src="../../assets/images/member/qb_icon.png" alt=""> 
                            <img v-if="skin==5" src="../../assets/images/skin/golden/qb_icon.png" alt=""> 
                            {{$t('wallet.text[6]')}}
                        </p>
                        <p>
                           
                             <span :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]" v-if="total_vendor_bl||total_vendor_bl==0">{{total_vendor_bl}}</span>
                             <span :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]" v-else>{{$t('wallet.text[5]')}}</span> 
                        </p>
                    </div>
                </div>
                <div class="qb-list">
                    <ul style="display:flex;height: 1.9rem;overflow: hidden;margin-top:0.2rem;padding-bottom: 0.2rem;" ref="gameList">
                    
                      
                        
                        <li v-for="(item,index) in singleVenderMoney"  :key="index">
                            <p>{{item.name}}</p>
                            <p :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]" v-if="!isNaN(item.balance)">{{item.balance}}</p>
                            <p :class="[{'pink-color':skin ==1},{'blue-color':skin ==2},{'green-color':skin ==3},{'maingreen-color':skin ==4},{'golden-color':skin ==5}]" v-else>{{$t('wallet.text[7]')}}</p>
                        </li>
                    </ul>

                    <div @click="isMore=!isMore" v-if="isMore" class="more-btn">
                            <!-- <p><span v-show="isMore">收 起</span></p> -->
                            <p> 
                                <img v-if="skin==0" src="../../assets/images/member/more_icon2.png" alt="" srcset="" style="width: 0.6rem;" v-show="isMore">
                                <img v-if="skin==1" src="../../assets/images/skin/pink/more_icon2-pink.png"   alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="isMore">
                                <img v-if="skin==2" src="../../assets/images/skin/blue/more_icon2-blue.png"   alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="isMore">
                                <img v-if="skin==3" src="../../assets/images/skin/green/more_icon2-green.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="isMore">
                                 <img v-if="skin==4" src="../../assets/images/skin/maingreen/more_icon2-maingreen.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="isMore">
                                 <img v-if="skin==5" src="../../assets/images/skin/golden/more_icon2-golden.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="isMore">
                            </p>
                    </div>

                    <div @click="isMore=!isMore" v-if="!isMore" class="more-btn">
                            <!-- <p> <span v-show="!isMore">更 多</span></p> -->
                            <p> 
                                <img v-if="skin==0" src="../../assets/images/member/more_icon.png" alt="" srcset="" style="width: 0.6rem;" v-show="!isMore">
                                <img v-if="skin==1" src="../../assets/images/skin/pink/more_icon-pink.png"  alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="!isMore">
                                <img v-if="skin==2" src="../../assets/images/skin/blue/more_icon-blue.png"  alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="!isMore">
                                <img v-if="skin==3" src="../../assets/images/skin/green/more_icon-green.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="!isMore">
                                <img v-if="skin==4" src="../../assets/images/skin/maingreen/more_icon-maingreen.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="!isMore">
                                <img v-if="skin==5" src="../../assets/images/skin/golden/more_icon-golden.png" alt="" srcset="" style="width: 0.4rem;margin-top: 0.2rem;" v-show="!isMore">
                            </p>
                        </div>
                </div>
             </div>
            <div class="zd-change">
                <p  :class="[{'golden-color':skin ==5}]">{{$t('wallet.text[8]')}}<span>({{$t('wallet.text[9]')}})</span></p>
                <div class="zd-switch" @click="changeSwitch()">
                <img v-show="active" v-if="skin==0" class="select" src="../../assets/images/newMine/active.png" alt />
                <img v-show="active" v-if="skin==1" class="select" src="../../assets/images/skin/pink/active-pink.png" alt />
                <img v-show="active" v-if="skin==2" class="select" src="../../assets/images/skin/blue/active-blue.png" alt />
                <img v-show="active" v-if="skin==3" class="select" src="../../assets/images/skin/green/active-green.png" alt />
                <img v-show="active" v-if="skin==4" class="select" src="../../assets/images/skin/green/active-green.png" alt />
                <img v-show="active" v-if="skin==5" class="select" src="../../assets/images/skin/golden/active-golden.png" alt />
                <img v-show="!active" class="select" src="../../assets/images/member/unActive.png" alt />
                </div>
            </div>
            <div class="change-wallet">
                <div class="change-content">
                    <div class="zhuanchu" @click="pickershow1=true">
                        <span :class="[{'golden-color':skin ==5}]">{{$t('wallet.text[10]')}}</span>
                        <div>
                            <span>{{zhuanchu}} 
                                <img v-if="skin==0" src="../../assets/images/member/select_icon.png" alt="">
                                <img v-if="skin==1" src="../../assets/images/skin/pink/select_icon-pink.png" alt="">
                                <img v-if="skin==2" src="../../assets/images/skin/blue/select_icon-blue.png" alt="">
                                <img v-if="skin==3" src="../../assets/images/skin/green/select_icon-green.png" alt="">
                                <img v-if="skin==4" src="../../assets/images/skin/green/select_icon-green.png" alt="">
                                <img v-if="skin==5" src="../../assets/images/skin/golden/select_icon-golden.png" alt="">
                                </span>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 0.58rem;">
                        <img v-if="skin==0" src="../../assets/images/member/zhuanhuan.png" alt="">
                        <img v-if="skin==1"  src="../../assets/images/skin/pink/zhuanhuan-pink.png" alt="">
                        <img v-if="skin==2" src="../../assets/images/skin/blue/zhuanhuan-blue.png" alt="">
                        <img v-if="skin==3" src="../../assets/images/skin/green/zhuanhuan-green.png" alt="">
                        <img v-if="skin==4" src="../../assets/images/skin/maingreen/zhuanhuan-maingreen.png" alt="">
                        <img v-if="skin==5" src="../../assets/images/skin/golden/zhuanhuan-golden.png" alt="">
                        
                    </div>
                    <div  style="text-align: right;">
                        <span  :class="[{'golden-color':skin ==5}]">{{$t('wallet.text[11]')}}</span>
                        <div @click="pickershow2=true">
                            <span>{{zhuanru}}
                                <img v-if="skin==0" src="../../assets/images/member/select_icon.png" alt="">
                                <img v-if="skin==1"  src="../../assets/images/skin/pink/select_icon-pink.png" alt="">
                                <img v-if="skin==2" src="../../assets/images/skin/blue/select_icon-blue.png" alt="">
                                <img v-if="skin==3" src="../../assets/images/skin/green/select_icon-green.png" alt="">
                                <img v-if="skin==4" src="../../assets/images/skin/green/select_icon-green.png" alt="">
                                <img v-if="skin==5" src="../../assets/images/skin/golden/select_icon-golden.png" alt="">
                                </span>
                        </div>
                    </div>
                </div>
                <div style="margin: 0 0.3rem;margin-top: 0.4rem;">
                    <p  :class="[{'golden-color':skin ==5}]">{{$t('wallet.text[12]')}}</p>
                    <div class="change-money">
                        <span> </span>
                        <input type="text" v-model="zzMoney" :placeholder="$t('wallet.text[13]')">
                        <span class="change-money-span" style="" @click="allMoney">{{$t('wallet.text[14]')}}</span>
                        <p v-show="showPoint">{{$t('wallet.text[15]')}}</p>
                    </div>
                </div>
                <div class="zz-btn" @click="moveQb" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]" >{{$t('wallet.text[16]')}}</div>
                <p style="text-align: center;margin-top:0.6rem"> <span class="last-text"  @click="goOnline">{{$t('wallet.text[17]')}}</span> </p>
            </div>
        </myScroll>
    <picker
	  :data="selectGame1"
	  :showToolbar="true"
	  :maskClick="true"
      :cancelText="$t('qxText')"
      :confirmText="$t('qdText')"
	  @confirm="pickerConfirm"
	  :visible.sync="pickershow1"
	/>
    <picker
	  :data="selectGame2"
     :cancelText="$t('qxText')"
      :confirmText="$t('qdText')"
	  :showToolbar="true"
	  :maskClick="true"
	  @confirm="pickerConfirm2"
	  :visible.sync="pickershow2"
	/>
    </div>
</template>
<script>
import picker from "vue-pickers";
import { mapState, mapMutations } from "vuex";
let math = require('mathjs');
export default {
    name:"wallet",
    data(){
        return{
            selectGame1:[[
            ]],
            selectList:[
            ],
            pickershow1:false,
            selectGame2:[[
            {label:'乐购棋牌',value:2},
            {label:'AG游戏',value:3},
            ]],
            pickershow2:false,
            zzMoney:'',
            showPoint:false,
            huishouShow:false,
            zhuanchu:'balance',
            zhuanru:'AG',
            zcAccount:1,
            zrAccount:2,
            maxMoney:0,
            zzUrl:'/ag/transfer-out',
            customer:'',
            refurbishTime:0,
            refurbishInterval:'',
            hsTime:0,
            hsInterval:'',
            cgMoney:0,
            aeMoney:'',
            active:false,
            zcpt:'balance',
            zrpt:'ag',
            isChangeSwitch:true,
            isMore:false,
            gameMoney:{},
            singleVenderMoney:[],
            allVenderMoney:{},
            totalBalance:'',
            total_vendor_bl:'',
            
        }
    },
     computed: {
        ...mapState(["openZdzz","webInitData","skin"])
    },
    components:{
        picker
    },
    filters:{
       
    },
    watch:{
         zzMoney:function(n,v){
        n=n+'';
        // if(n.charAt(n.length-1).indexOf('.')>-1&&v.indexOf('.')>-1){
        //         return this.zzMoney=n.slice(0,n.length-1);
        // }
        this.zzMoney =n.replace(/[^\d.]/g,'').replace(/\.{2,}/g,".").replace(/^[0,.]{1,}/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        if (this.zzMoney - 0 > this.gameMoney[this.zcpt+'Money'] - 0) {
          this.showPoint = true;
        } else {
          this.showPoint = false;
        }
        
       
      },
      isMore:function(i){
          if(i){
              this.$refs.gameList.style.height='auto';
            setTimeout(()=>{
                 let num =parseInt (this.$refs.gameList.children.length/4);
                [].slice.call(this.$refs.gameList.children).forEach((item,index)=>{
                  item.style.borderBottom="1px solid #eee"
                  if(index+1>num*3){
                    // item.style.borderBottom="none"
                  }
                  if((index+1)%3==0){
                      item.style.borderRight="none"
                  }else{
                       item.style.borderRight="1px solid #eee"
                  }
              },200)
            })
          }
          else{
              this.$refs.gameList.style.height='1.9rem';
              [].slice.call(this.$refs.gameList.children).forEach((item,index)=>{
                 item.style.border="none"
              },200)
          }
      },
      zcAccount:function(i){
          this.zzMoney='';
      },
    },
    created(){
        
        try {
             this.customer = JSON.parse(this.webInitData).customer;
        } catch (error) {
            
        }
        this.getGameList();
        this.autoChange();
        this.getvenderBalance();
    },
    mounted(){
    },
    methods:{
        ...mapMutations(["SETOPENZDZZ",]),
        async getvenderBalance(){
            let res = await this.$http.get('/api/vendor/balance',{params:{is_new_format:1}},{ timeout: 60000 })
            this.allVenderMoney = res.data.data;
            // this.SETBALANCE(res.data.data.balance);
            // this.SETVENDELBL(res.data.data.vendor_bl);
            // this.$forceUpdate();
            this.singleVenderMoney = [];
            // for(let k in this.allVenderMoney){
            //     if(k=="balance"||k=='vendor_bl'){
                
            //     }else{
            //     this.singleVenderMoney.push({name:k.toString().toUpperCase(),value:this.allVenderMoney[k],nameTransfer:k})
            //     }
                
            // }

            for(let i=0,len=this.allVenderMoney.length;i<len;i++ ){
                if(this.allVenderMoney[i].code=="balance"||this.allVenderMoney[i].code=='vendor_bl'){
                    if(this.allVenderMoney[i].code=="balance"){
                        this.totalBalance = this.allVenderMoney[i].balance;
                    }else{
                        
                        this.total_vendor_bl = this.allVenderMoney[i].balance;
                        // console.log(8989,this.total_vendor_bl)
                    }
                }else{
                    this.singleVenderMoney.push(this.allVenderMoney[i])
                // arr.push(this.allVenderMoney[i])
                }
            }
            console.log(this.singleVenderMoney)
            // this.SETALLVENDELBL(this.singleVenderMoney);
        
        },
        pickerConfirm(i){
        this.zcAccount=i[0].value
        this.zhuanchu=i[0].label
        this.zcpt=i[0].name
        let newPickerarr=this.selectList.filter(function check(v) {
         return v.value != i[0].value
        })
        this.$set(
            this.selectGame2,
            0,
            newPickerarr
        )
         if(this.zcAccount==this.zrAccount){
            this.zhuanru=this.selectGame2[0][0].label;
            this.zrAccount=this.selectGame2[0][0].value;
            this.zrpt=this.selectGame2[0][0].name
        }
        },
        pickerConfirm2(i){
            this.zhuanru=i[0].label;
            this.zrAccount=i[0].value;
            this.zrpt=i[0].name
       
        },
        moveQb(){
            if(this.showPoint){
               return
            }
            if(this.zzMoney<1){
                // {{$t('wallet.text[18]')}}
                this.$vux.toast.text(this.$t('wallet.text[18]'), 'middle')
                return
            }
            this.$vux.loading.show({ text: this.$t('wallet.text[5]') });
            // console.log({out:this.zcpt,amount:this.zzMoney,in:this.zrpt})
             let d = this.globalPpproach.checkIsEncrypt({out:this.zcpt,amount:this.zzMoney,in:this.zrpt})
            this.$http.post("/api/vendor/transfer",d).then(res=>{
                 this.$vux.loading.hide() 
                if(res && res.data.code==1){
                    this.getvenderBalance();
                   
                }
                this.$vux.toast.text(res.data.msg, 'middle')
                }
                )
            
        },
        
        allMoney(){
            if (this.gameMoney[this.zcpt+'Money'] - 0 < 1)
            return this.$vux.toast.text(this.$t('wallet.text[19]'), 'middle')
        this.zzMoney =parseFloat(this.gameMoney[this.zcpt+'Money']);
           
        },
       
         goOnline() {
           
            window.open(this.customer);
            },
        async hsMoney(){
            this.$vux.loading.show({ text: this.$t('wallet.text[5]') });
            this.$http.post("/api/vendor/transferinall",{},{timeout:60000}).then(res=>{
                this.$vux.loading.hide()
                 this.$vux.toast.text(res.data.msg, 'middle')
                 if(res.data.code == 1){
               
                this.getvenderBalance();
                }
            }).catch((res)=>{
                this.$vux.loading.hide()
                this.$vux.toast.text(res.data.msg, 'middle');
                
            })
        },
        refurbish(){
            clearInterval(this.refurbishInterval)
            this.refurbishInterval= setInterval(() => {
                this.refurbishTime++
            if(this.refurbishTime==100){
                clearInterval(this.refurbishInterval)
                this.refurbishTime=0
            }
            }, 100);
            if(this.refurbishTime==0){
                this.getvenderBalance();
            }else{
                this.$vux.toast.text(this.$t('wallet.text[20]'), 'middle')
            }
        },
        getGameList(){
             this.$http.get("/api/vendor/index").then(res=>{
                 if(res && res.data.code==1){
                    var listIndex =res.data.data.findIndex(i=>{
                          return i.name_cn=='balance'
                     })
                   if(listIndex==-1){
                       this.selectList.push({label:"balance",value:1,name:"balance"})
                   }
                    res.data.data.forEach((item,index) => {
                        if(listIndex==-1){
                            this.selectList.push({label:item.name,value:index+2,name:item.code})
                        }else{
                            this.selectList.push({label:item.name,value:index+1,name:item.code})
                        }
                    });
                    var this_=this
                    this.$set(
                    this_.selectGame1,
                    0,
                    this_.selectList
                    )
                     this.$set(
                    this_.selectGame2,
                    0,
                    this_.selectList.slice(1)
                    )
                 }
             })
        },
   
        changeSwitch(){
             if(this.isChangeSwitch){
                return
            }
            this.isChangeSwitch=true;
            if(this.active){
                 this.$publicPop({
                    title: this.$t('wallet.text[21]'),
                    content: this.$t('wallet.text[22]'),
                    clickCancel: () => {
                        this.isChangeSwitch=false
                    },
                    clickConfirm: () => {
                        this.autoChange(1)
                    }
                });
               
            }else{
                this.autoChange(1)
            }
        },
        autoChange(v){
            if(v){
            this.$http.post("/api/vendor/autotransfer").then(res=>{
                if(res&&res.data.code==1){
                    this.active=res.data.data==1?true:false
                }else{
                    this.$vux.toast.text(res.data.msg, 'middle')
                }
                this.isChangeSwitch=false
            })
            }else{
                this.$http.get("/api/vendor/autotransfer").then(res=>{
                if(res&&res.data.code==1){
                    this.active=res.data.data==1?true:false
                }else{
                    this.$vux.toast.text(res.data.msg, 'middle')
                }
                this.isChangeSwitch=false
            })
            }
        }
    }
}
</script>
<style lang="less" scoped>
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
.wallet{
    background: #f1f0f6;
    padding-top: 0.2rem;
    .header{
        display: flex;
        background: #fff;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.346rem;
        .go-back{display: block;width: 0.26rem;height:0.48rem;background: url('../../assets/images/gray-back-icon.png') no-repeat;background-size: cover;}
        h3{font-weight: 550;font-size: 0.45rem;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: #445779;
         
        }
        .huishou{
            color: #6A86B9;
            .ts-btn{display: inline-block;
                .rem(width,40);
                .rem(height,40);
                background: url('../../assets/images/member/ts_icon.png') no-repeat;
                background-size: cover;
                float: right;
                margin-top: 0.2rem;
                margin-left: 0.1rem;
                &.ts-pink{
                    background: url('../../assets/images/skin/pink/ts_icon-pink.png') no-repeat!important;
                    background-size: cover!important;
                }
                &.ts-blue{
                    background: url('../../assets/images/skin/blue/ts_icon-blue.png') no-repeat!important;
                    background-size: cover!important;
                }
                &.ts-green{
                    background: url('../../assets/images/skin/green/ts_icon-green.png') no-repeat!important;
                    background-size: cover!important;
                }
                &.ts-maingreen{
                    background: url('../../assets/images/skin/maingreen/ts_icon-maingreen.png') no-repeat!important;
                    background-size: cover!important;
                }
                &.ts-golden{
                    background: url('../../assets/images/skin/golden/ts_icon-golden.png') no-repeat!important;
                    background-size: cover!important;
                }
            }
        }
        .huishou-point{
            line-height: 0.32rem;
            position: absolute;
            right: 0.3rem;
            top: 1rem;
            font-size: 0.32rem;
            padding: 0.1rem 0.12rem;
            background: #F1F0F6FF;
            border-radius: 0.05rem;
            color: #666666FF;
            width: 50%;
            &:after{
                content: '';
                display: block;
                width: 0;
                height: 0;
                border-left: 0.15rem solid transparent;
                border-right: 0.15rem solid transparent;
                border-bottom: 0.2rem solid #F1F0F6FF;
                position: absolute;
                top: -0.1rem;
                right: 0.1rem;
            }
        }
    }
    .qb-box{
   
       overflow: hidden;
       width:100%;
       z-index:99;
       background-color: #fff;
       border-top: .2rem solid #f5f5f5;
       border-bottom: .2rem solid #f5f5f5;
       .qb-title{
           overflow: hidden;
           margin-top: 0.4rem;
           padding-left: 2.5%;
           padding-right: 2.5%;
           padding-bottom: 0.4rem;
           position: relative;
            &:after{content: '';display: inline-block;width: 95%;height: 1px;background: #eee;position: absolute;bottom: 0;left: 2.5%;}
           h3{
            .rem(font-size,28);
           }
           .refurbish{
               display: inline-block;
               width: 0.35rem;
               height: 0.35rem;
               background: url('../../assets/images/member/sx_icon2.png') no-repeat;
               background-size: contain;
               margin-left: 0.2rem;
               &.re-pink{
                   background:url('../../assets/images/skin/pink/sx_icon-pink.png')no-repeat!important;
                   background-size: contain!important;
               }
               &.re-blue{
                   background:url('../../assets/images/skin/blue/sx_icon-blue.png')no-repeat!important;
                   background-size: contain!important;
               }
               &.re-green{
                   background:url('../../assets/images/skin/green/sx_icon-green.png')no-repeat!important;
                   background-size: contain!important;
               }

               &.re-maingreen{
                   background:url('../../assets/images/skin/maingreen/sx_icon-maingreen.png')no-repeat!important;
                   background-size: contain!important;
               }
               &.re-golden{
                   background:url('../../assets/images/skin/golden/sx_icon.png')no-repeat!important;
                   background-size: contain!important;
               }
            }
            >span{
                .rem(font-size,24);
                color:#6A86B9;
                .rem(margin-top,5);
            }
       }
        .qb-content{
            display: flex;justify-content: space-evenly;font-size: 0.37rem;color:#445779;margin-top:0.2rem;padding-bottom: 0.2rem;position:relative;
            &:after{content: '';display: inline-block;width: 95%;height: 1px;background: #eee;position: absolute;bottom: 0;left: 2.5%;}
            >div{width: 50%;text-align: center;padding-top: 0.2rem;
            &:first-child{border-right: 1px solid #eee;}
            }
            p{
                img{
                    .rem(width,36);
                    .rem(height,36);
                    vertical-align: middle;
                }
                span{font-family: "PingFang-SC";font-weight: bold;font-size: 0.32rem;color: #1486FF;
            }
            }
        }
        .qb-list{
            // margin-top: 0.4rem;
            position: relative;
            ul{
                display: flex;flex-wrap: wrap; flex-direction: row;
                padding-left:2.5%;
                padding-right:2.5%;
                li{
                    width: 33.33%;
                    padding: 0.25rem 0;
                    text-align: center;font-size: 0.32rem;color: #445779;line-height: 0.56rem;
                    border-color: #eee;
                    span{font-weight: bold;color: #6A86B9;}
                }
            }
            .more-btn{
                position: absolute;
                width: 100%;
                height: .7rem;
                bottom:0;
                text-align: center;
                img{
                    width: 100%;
                }
            }
        }
    }
    .change-wallet{
        margin-top: 0.2rem;background: #fff;
        color:#445779;
        .change-content{
            display: flex;justify-content: space-between;
            padding: 0.1rem 0.3rem;
            border-bottom: 1px solid #F1F0F6;
            >div{
                img{width: 0.56rem;}
                span{font-size:0.32rem ; color: #6A86B9;}
                >div{
                    margin-top: 0.3rem;
                    img{
                        width: 0.266rem;
                        vertical-align: middle;
                    }
                    span{font-size: 0.37rem;color: #445779;}
                }
                p{color: #9A9A9A;font-size:0.24rem;}
            }
            
        }
    }
    .zd-change{
        background: #fff;
        color:#445779;
        // margin-top: 5.6rem;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        height: 1.4rem;
        padding: 0.1rem 0.3rem .1rem .3rem;
        border-bottom:.2rem solid #f5f5f5 ;
        p{
            font-size: 0.37rem;
            span{
                font-size: 0.26rem;
                color: #6A86B9;
            }
        }
        .zd-switch{
            img{width: 1rem;}
        }
    }
    .change-money{
        padding: 0.2rem 0;
        border-bottom: 1px solid #eee;
        position: relative;;
        input{height: 0.8rem;font-size: 0.4rem;}
        p{color: rgb(255, 50, 50);position: absolute;bottom: -0.5rem;}
        .change-money-span{
float: right;margin-top: 0.15rem;font-size: 0.37rem;color: #445779;
        }
        
    }
    .zz-btn{margin: 1rem auto 0; width:92%;height: 1.06rem;background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);color: #fff;border-radius: 0.533rem;text-align: center;line-height: 1.06rem;font-size: 0.37rem;}
    .last-text{
        color:#6A86B9;
    }
}
.golden-wallet-body{
    color: #CECECE!important;
    border-color: #5C564D!important;
    .qb-box{
        background: none!important;
        border-top: 0.2rem solid #1A1A1A!important;
        border-bottom: 0.2rem solid #1A1A1A!important;
        .qb-title > span{
            color: #CECECE!important;
         }
         .qb-content{
            color: #CECECE!important;
         }
         ul li{
            color: #CECECE!important;
         }
    }
    .zd-change{
        background: none!important;
        //border-top: 0.2rem solid #1A1A1A!important;
        border-bottom: 0.2rem solid #1A1A1A!important;
         p span{
            color: #CECECE!important;
         }
    }
    .change-wallet{
        background: none!important;
        color: #CECECE!important;
        border-color: #5C564D!important;
        
        .change-content > div > div span{
            color: #CECECE!important;
        }
        .change-money,.change-content{
            border-color: #5C564D!important;
        }
    }
    .last-text{
         color: #CECECE!important;
    }
    .change-money-span{
         color: #CECECE!important;
    }
    .qb-title:after,.qb-content:after{
        background: #5C564D!important;
    }
    .qb-box .qb-content > div:first-child{
        border-color: #5C564D!important;
    }
    .qb-box .qb-list ul li{
         border-color: #5C564D!important;
    }
}
</style>