<template>
    <div class="cardRecharge" id="cardRecharge" :class="skin == 5 ? 'cardRecharge-golden' : ''">
        <x-header style="background-color:transparent;z-index: 9;color:#445779" title="银行卡转账"
            :left-options="{ showBack: false }" :class="skin == 5 ? 'goldenHeader' : ''">
            <span :style="skin == 5 ? 'color:#E3CF95' : 'color:#445779'">{{ $t('cardRecharge[0]') }}</span>
            <i class="black-back"></i>
            <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;"
                @click="$router.go(-1)"></div>
            <p class="show-card" @click="$router.push('/bankCardList')">{{ $t('cardRecharge[1]') }}</p>
        </x-header>
        <myScroll :isDown="false" :top="1.2" :bottom="0" :left="0" :bgColor="skin == 5 ? '1F252C' : ''">
            <div class="card-info">
                <p style="font-size:0.38rem;" class="step-title">1、{{ $t('cardRecharge[2]') }}:</p>
                
                <div class="bank-type" v-if="ismomo">
                    <!-- :class="czCardInfo.bank_id==item.bank_id?'active':''" -->
                    <span v-for="item, index in allBank" :key="index" :class="[
                        { 'active': czCardInfo.id == item.id && skin == 0 },
                        { 'active-pink': czCardInfo.id == item.id && skin == 1 },
                        { 'active-blue': czCardInfo.id == item.id && skin == 2 },
                    
                    
                        { 'active-golden': czCardInfo.id == item.id && skin == 5 },
                    ]" @click="changeCard(item)">
                        <!-- <em v-if="item.pay_name != 'momo'">{{ item.pay_name }}</em> -->
                        <img style="width: 1.4rem;position: relative;top: 0.1rem;"  src="../../assets/images/withdrawals/momo_icon.png" alt="" srcset="">
                    </span>
                </div>
                <div class="bank-type" v-else>
                    <!-- :class="czCardInfo.bank_id==item.bank_id?'active':''" -->
                    <span v-for="item, index in allBank" :key="index" :class="[
                        { 'active': czCardInfo.bank_id == item.bank_id && skin == 0 },
                        { 'active-pink': czCardInfo.bank_id == item.bank_id && skin == 1 },
                        { 'active-blue': czCardInfo.bank_id == item.bank_id && skin == 2 },
                    
                    
                        { 'active-golden': czCardInfo.bank_id == item.bank_id && skin == 5 },
                    ]" @click="changeCard(item)">
                        <em >{{ item.bank }}</em>
                        <!-- <img style="width: 1.4rem;
    position: relative;
    top: 0.25rem;" v-else src="../../assets/images/withdrawals/momo_icon.png" alt="" srcset=""> -->
                    </span>
                </div>
                <div v-if="ismomo">
                <ul class="info-list" v-show="czCardInfo.id == item.id" v-for="(item, index) in allBank"
                    :key="index">
                    <li><span>{{ $t('cardRecharge[27]') }}: {{ item.account }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.account)">{{ $t('cardRecharge[3]') }}</i></li>

                    <!-- <li><span>{{ $t('cardRecharge[4]') }}: {{ item.name }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.name)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[5]') }}: {{ item.no }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.no)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[6]') }}: {{ item.openbank }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.openbank)">{{ $t('cardRecharge[3]') }}</i></li> -->

                    <li><span>{{ $t('cardRecharge[7]') }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="showQR(item)">{{ $t('cardRecharge[8]') }}</i></li>
                    <li><span :style="skin == 5 ? 'color:#E3CF95' : 'color:#1486FF'"
                            style="font-size:0.36rem">*{{ $t('cardRecharge[9]') }} {{ item.low_money }} ~ {{ item.high_money }}
                            {{ $t('moneyDw') }}</span></li>
                </ul>
               </div>
               <div v-else>
                <ul class="info-list" v-show="czCardInfo.bank_id == item.bank_id" v-for="(item, index) in allBank"
                    :key="index">
                    <li><span>{{ $t('cardRecharge[26]') }}: {{ item.bank }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.bank)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[4]') }}: {{ item.name }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.name)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[5]') }}: {{ item.no }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.no)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[6]') }}: {{ item.openbank }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="copy(item.openbank)">{{ $t('cardRecharge[3]') }}</i></li>

                    <li><span>{{ $t('cardRecharge[7]') }}</span> <i
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-golden': skin == 5 }, { 'skin-btn-maingreen': skin == 4 }]"
                            @click="showQR(item)">{{ $t('cardRecharge[8]') }}</i></li>
                    <!-- <li><span>{{czCardInfo.rate}}</span></li> -->
                    <li><span :style="skin == 5 ? 'color:#E3CF95' : 'color:#1486FF'"
                            style="font-size:0.36rem">*{{ $t('cardRecharge[9]') }} {{ item.low_money }} ~ {{ item.high_money }}
                            {{ $t('moneyDw') }}</span></li>
                </ul>
               </div>
            </div>
            <div class="info-title">
                <p class="step-title">2、{{ $t('cardRecharge[10]') }}:</p>
            </div>
            <div class="userCard-info">
                <ul>
                    <li>
                        <span>{{ $t('cardRecharge[11]') }}
                        </span> <input type="text" v-model="userName" style="padding-left:45%" maxlength="50"
                            :placeholder="$t('cardRecharge[12]')">
                        <i class="" v-show="oftenName.length" @click="pickershow2 = true"
                            style="height: 0.6rem;width: 0.6rem;top: 0.1rem;"></i>
                    </li>
                    <li @click="pickershow1 = true" v-if="!ismomo">
                        <span>{{ $t('cardRecharge[13]') }}</span>
                        <p class="sj-code" style="padding-left:10%;line-height:.5rem">{{ userBank }}</p>
                        <i class=""></i>
                    </li>
                    <li>
                        <span>{{ $t('cardRecharge[14]') }}</span> <input type="text" maxlength="50" v-model="cardNum"
                            onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')" style="padding-left:45%"
                            :placeholder="$t('cardRecharge[15]')">
                        <i class="" v-show="oftenCard.length" @click="pickershow3 = true"
                            style="height: 0.6rem;width: 0.6rem;top: 0.1rem;"></i>
                    </li>
                    <li>
                        <span>{{ $t('cardRecharge[16]') }}</span> <input type="text" v-model="czMoney"
                            style="padding-left:45%" :placeholder="$t('cardRecharge[17]')">
                    </li>
                    <li>
                        <span>{{ $t('cardRecharge[18]') }}</span> <input type="text" v-model="timeValue2" placeholder=""
                            style="padding-left:45%" readonly> <i></i>
                        <datetime style="height: 1rem;position: absolute;width: 100%;top: 0;left:0" v-model="timeValue"
                            @on-confirm="getCzTime()" format="YYYY-MM-DD HH:mm" :start-date="startDate"
                            :confirm-text="$t('qdText')" :cancel-text="$t('qxText')"></datetime>
                    </li>
                    <li>
                        <span>{{ $t('cardRecharge[19]') }}</span>
                        <p class="sj-code">{{ sjCode }}</p>
                        <i class="copy-sj-btn"
                            :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-maingreen': skin == 4 }, { 'skin-btn-golden': skin == 5 }]"
                            @click="copy(sjCode)">{{ $t('cardRecharge[3]') }}</i>
                    </li>

                </ul>
                <p class="tip">*{{ $t('cardRecharge[20]') }}</p>
                <div class="recharge-btn"
                    :class="[{ 'skin-btn-pink': skin == 1 }, { 'skin-btn-blue': skin == 2 }, { 'skin-btn-green': skin == 3 }, { 'skin-btn-maingreen': skin == 4 }, { 'skin-btn-golden': skin == 5 }]"
                    @click="torecharge"><span>{{ $t('cardRecharge[21]') }}</span></div>
            </div>
        </myScroll>

        <picker :data="selectGame1" :showToolbar="true" :maskClick="true" :cancelText="$t('qxText')"
            :confirmText="$t('qdText')" @confirm="pickerConfirm" :visible.sync="pickershow1" />
        <picker :data="selectGame2" :showToolbar="true" :maskClick="true" :cancelText="$t('qxText')"
            :confirmText="$t('qdText')" @confirm="pickerConfirm2" :visible.sync="pickershow2" />
        <picker :data="selectGame3" :showToolbar="true" :maskClick="true" :cancelText="$t('qxText')"
            :confirmText="$t('qdText')" @confirm="pickerConfirm3" :visible.sync="pickershow3" />
        <x-dialog v-model="showScrollBox" hide-on-blur class="dialog-demo">
            <div style="padding: 0.3rem 0.4rem;">
                <p class="dialog-title" style="color: rgb(20, 134, 255);">{{ $t('cardRecharge[22]') }}</p>
                <div style="margin: 0.4rem 0;">
                    <img :src="qrCode" alt="">
                </div>
                <div @click="showScrollBox = false">
                    <img src="../../assets/images/x-min.png" alt="" srcset="" style="width:0.8rem">
                </div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import { Datetime, XDialog } from 'vux';
import { mapState, mapMutations } from "vuex";
import picker from "vue-pickers";
export default {
    name: "cardRecharge",
    data() {
        return {

            czCardInfo: {},
            allBank: [],
            userName: '',
            cardNum: '',
            userBank: this.$t('cardRecharge[23]'),
            user_bank_id: '',
            czMoney: '',
            sjCode: '909090',
            startDate: '',
            timeValue: '',
            timeValue2: '',
            fName: '',
            pickershow1: false,
            selectGame1: [[
            ]],
            selectGame2: [[
            ]],
            selectGame3: [[
            ]],
            showScrollBox: false,
            qrCode: '',
            pickershow2: false,
            pickershow3: false,
        }
    },
    components: {
        Datetime,
        picker,
        XDialog
    },
    computed: {
        ...mapState(["skin", "oftenName", "oftenCard"])
    },
    watch: {
        czMoney: function (n, v) {
            n = n + '';
            if (n.charAt(n.length - 1).indexOf('.') > -1 && v.indexOf('.') > -1) {
                return this.czMoney = n.slice(0, n.length - 1);
            }
            this.czMoney = n.replace(/[^\d.]/g, '').replace(/\.{2,}/g, ".").replace(/^[0,.]{1,}/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
    },
    created() {
        this.ismomo=this.$route.query.type
        this.getCardList();//我们收款的卡
        this.getUserCardList();//用户选择入款的卡
        this.getSjm();
        this.formatOften()//格式化常用卡号
       
        // console.log(this.$route.query.type)
        let obj = localStorage.getItem('currCommonCard') ? JSON.parse(localStorage.getItem('currCommonCard')) : '';
        if (typeof (obj) == 'object' && obj.name) {
            this.userName = obj.name;
            this.cardNum = obj.no;
        }
        
    },
    mounted() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = m < 10 ? "0" + m : m; //月小于10，加0
        d = d < 10 ? "0" + d : d; //day小于10，加0
        this.startDate = y - 1 + "-" + m + "-" + d;
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {          //  这里的vm指的就是vue实例，可以用来当做this使用
            // console.log(to.name,222)
            // console.log(from.name,222)
            vm.fName = from.name

        })
    },
    methods: {
        ...mapMutations(["SETOFTENNAME", "SETOFTENCARD"]),
        formatOften() {
            let pname = [];
            let pcard = []
            for (let i = 0; i < this.oftenName.length; i++) {
                pname.push({
                    label: this.oftenName[i],
                    value: this.oftenName[i]
                })
            }
            for (let i = 0; i < this.oftenCard.length; i++) {
                pcard.push({
                    label: this.oftenCard[i],
                    value: this.oftenCard[i]
                })
            }
            this.selectGame2 = [pname]
            this.selectGame3 = [pcard]
        },
        showQR(i) {
            this.showScrollBox = true
            this.qrCode = i.qrcode
        },
        // 获取随机码
        async getSjm() {
            // sjCode
            let res = await this.$http.get(this.versionLive2 + 'Recharge/get_random_code/')
            if (res.data.code == 1) {
                this.sjCode = res.data.random_code
            } else {
                this.$vux.toast.text(res.data.msg, 'middle');
            }
        },
        pickerConfirm(i) {
            // console.log(i)
            this.userBank = i[0].label;
            this.user_bank_id = i[0].value
        },
        pickerConfirm2(i) {
            this.userName = i[0].value
        },
        pickerConfirm3(i) {
            this.cardNum = i[0].value
        },
        //获取用户卡列表
        async getUserCardList() {
            let res = await this.$http.get(this.versionLive2 + '/Recharge/get_vietnam_bank_list')
            let tdata = [];
            for (let i = 0; i < res.data.data.length; i++) {
                tdata.push({
                    label: res.data.data[i].bank,
                    value: res.data.data[i].bank_id
                })
            }
            this.selectGame1 = [tdata]
        },
        changeCard(item) {
            this.czCardInfo = item;
        },
        getCardList() {
            this.$vux.loading.show({ text: this.$t('cardRecharge[24]') });
            let czUrl=''
            if(this.ismomo){
                czUrl='Recharge/thridAccoutList'
                
            }else{
                czUrl='Recharge/bankList/'
            }
            this.$http.post(this.versionLive2 +czUrl).then(res => {
                if (res.data.code == 1) {
                    if (res.data.data.length != 0) {
                        // if (this.$route.query.type) {
                        //     this.czCardInfo = res.data.data[2];
                        // }
                        // else {
                            this.czCardInfo = res.data.data[0];
                        // }
                        this.allBank = res.data.data;
                    }

                } else {
                    this.$vux.toast.text(res.data.msg, 'middle');
                }
                this.$vux.loading.hide()
            })
        //     this.$http.post(this.versionLive2 + 'Recharge/thridAccoutList').then(res => {
        //         this.allBank = res.data.data;
        //         this.czCardInfo = res.data.data[0];
        //         this.$vux.loading.hide()
        // })

        },
        copy(data) {
            let url = data;
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select();
            document.execCommand("Copy");
            this.$vux.toast.text('copy success', 'middle');
            oInput.remove()
        },
        torecharge() {
            if (this.userName == '') {
                this.$vux.toast.text(this.$t('cardRecharge[12]'), 'middle');
                return
            }
            if (this.cardNum == '') {
                this.$vux.toast.text(this.$t('cardRecharge[15]'), 'middle');
                return
            }
            if (this.czMoney == '') {
                this.$vux.toast.text(this.$t('cardRecharge[17]'), 'middle');
                return
            }
            //    if(parseInt(this.czMoney)<this.czCardInfo.low_money||parseInt(this.czMoney)>this.czCardInfo.high_money){
            //       this.$vux.toast.text('充值金额('+this.czCardInfo.low_money+'~'+this.czCardInfo.high_money+')', 'middle');
            //       return
            //   }
            if (this.timeValue2 == '') {
                this.$vux.toast.text(this.$t('cardRecharge[18]'), 'middle');
                return
            }


            let d = this.globalPpproach.checkIsEncrypt({
                bank_id: parseInt(this.czCardInfo.bank_id),//用户选择的收款银行
                pay_user: this.userName,
                pay_no: this.cardNum,
                pay_amount: this.czMoney,
                random_code: this.sjCode,//随机码
                user_bank_id: this.user_bank_id,//用户选择入款银行
                pay_time: parseInt(new Date(this.timeValue.replace(/-/g, '/')).getTime().toString().substr(0, 10))
            })

            this.$vux.loading.show({ text: this.$t('cardRecharge[24]') });
            let dd = this.globalPpproach.checkIsEncrypt({
                bank_id: parseInt(this.czCardInfo.bank_id),//用户选择的收款银行
                pay_user: this.userName,
                pay_no: this.cardNum,
                pay_amount: this.czMoney,
                random_code: this.sjCode,//随机码
                user_bank_id: this.user_bank_id,//用户选择入款银行
                pay_time: parseInt(new Date(this.timeValue.replace(/-/g, '/')).getTime().toString().substr(0, 10))
            });
            if(this.ismomo){
                dd=this.globalPpproach.checkIsEncrypt({
                id: parseInt(this.czCardInfo.id),//用户选择的收款银行
                pay_user: this.userName,
                pay_no: this.cardNum,
                pay_amount: this.czMoney,
                random_code: this.sjCode,//随机码
                // user_bank_id: this.user_bank_id,//用户选择入款银行
                pay_time: parseInt(new Date(this.timeValue.replace(/-/g, '/')).getTime().toString().substr(0, 10))
            });
            }
            let czUrl=''
            if(this.ismomo){
                czUrl='Recharge/offline_third_recharge/'
            }else{
                czUrl='Recharge/bank_recharge/'
            }
            this.$http.post(this.versionLive2 + czUrl, dd).then(res => {
                let nameIdx = this.oftenName.findIndex((r, id) => {
                    return r == this.userName
                })
                let cardIdx = this.oftenCard.findIndex((r, id) => {
                    return r == this.cardNum
                })
                if (nameIdx > -1) {
                    this.oftenName.splice(nameIdx, 1)
                }
                if (cardIdx > -1) {
                    this.oftenCard.splice(cardIdx, 1)
                }
                this.oftenName.unshift(this.userName)
                this.oftenCard.unshift(this.cardNum)
                this.SETOFTENNAME(this.oftenName)
                this.SETOFTENCARD(this.oftenCard)
                this.formatOften()
                if (res && res.data.code == 1) {
                    this.$vux.alert.show({
                        title: this.$t('cardRecharge[25]'),
                        content: '<span style="color:#333333">' + res.data.msg + '</span>',
                        buttonText: this.$t('qdText'),
                        onConfirm: () => {
                        }
                    });
                    this.userName = ''
                    this.czMoney = ''
                    this.cardNum = ''
                    this.timeValue2 = ''
                    this.user_bank_id = ''
                    this.userBank = this.$t('cardRecharge[23]')
                    this.getSjm();
                } else {
                    this.$vux.alert.show({
                        title: this.$t('cardRecharge[25]'),
                        content: res.data.msg,
                        onConfirm: () => {
                        }
                    });
                }
                this.$vux.loading.hide()
            })
        },
        getCzTime() {
            this.timeValue2 = this.timeValue

        }
    }

}
</script>
<style lang="less" >
.rem(@name, @px) {
    @{name}: unit(@px/75, rem)
}

.cardRecharge {
    font-size: 0.32rem;

    // .vux-header{box-shadow: -3px 0px 8px 1px #ccc;}
    .show-card {
        .rem(font-size, 24);
        color: #445779;
        position: absolute;
        right: .3rem;
        top: .1rem;
    }

    .goldenHeader {
        .show-card {
            color: #AB9B62;
        }
    }
}

.cardRecharge .vux-header .vux-header-title {
    color: #000;
    margin: 0;
    width: 100%;
}

.black-back {
    display: block;
    width: 12px;
    height: 20px;
    position: absolute;
    background: #ccc;
    top: 12px;
    left: 12px;
    background: url('../../assets/images/withdrawals/fanhui.png') no-repeat;
    background-size: 100% 100%
}

.card-info {
    // background:#FF383A;
    color: #445779;
    margin-top: 0.2rem;
    padding: 0.3rem 0.34rem 0 0.34rem;

    p {
        font-weight: bold;
    }

    .bank-type {
        margin-top: .3rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        span {
            // border: 1px solid #445779;
            border-radius: 4px;
            padding: 0 .3rem;
            margin-right: .2rem;
            background: #c4c4c4;
            color: #fff;
            height: 0.9rem;
    line-height: 0.9rem;
    margin-bottom: 0.2rem;
            &.active {
                // background: #445779;
                background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);

            }

            &.active-pink {
                background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%);
            }

            &.active-blue {
                background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%);
            }

            &.active-green {
                background: linear-gradient(89.97deg, #329BC9 0.02%, #59F3B2 99.97%);
            }

            &.active-golden {
                background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                color: #A85100;
            }
        }
    }

    .info-list {
        li {
            font-size: 0.38rem;
            display: flex;
            justify-content: space-between;
            // margin-top: 0.58rem;
            align-items: center;
            // .rem(height,109);
            // .rem(line-height,109);
            border-bottom: 1px solid #eee;
            padding: .3rem 0;

            &:nth-last-child(1) {
                border-bottom: none;
            }

            i {
                // background: #1486FF;
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                color: #fff;
                text-align: center;
                // padding: 0.02rem 0.1rem;
                .rem(height, 50);
                .rem(line-height, 50);
                // .rem(width,100);
                padding: 0 .1rem;
                min-width: 2rem;

                border-radius: 2px;
            }

            &:nth-child(1) {
                margin-top: 0.2rem;
            }
        }

    }
}

.info-title {
    color: #445779;
    font-size: 0.38rem;
    // .rem(font-size,32);
    // text-align: center;
    position: relative;
    margin: 0 0 0.36rem 0.26rem;
    // &:before{
    //     content: '';
    //     width: 30%;
    //     height: 1px;
    //     background: #CCCCCC;
    //     position: absolute;
    //     left: 0;
    //     top: 50%;
    // }
    //  &:after{
    //     content: '';
    //     width: 30%;
    //     height: 1px;
    //     background: #CCCCCC;
    //     position: absolute;
    //     right: 0;
    //     top: 50%;
    // }
}

.userCard-info {
    padding: 0 0.34rem;
    padding-bottom: 0.2rem;

    .tip {
        color: #F40C1E;
        padding: 0 0 .3rem 0;
    }

    ul {
        li {
            position: relative;
            margin-bottom: 0.53rem;
            height: 1rem;
            border: 1px solid #445779;
            border-radius: 4px;
            text-align: center;
            line-height: 1rem;

            span {
                color: #445779;
                font-size: 0.37rem;
                position: absolute;
                left: 0.3rem;
            }

            p {
                display: inline-block;
            }

            input {
                width: 100%;
                height: 1rem;
                // .rem(height,100);
                // .rem(line-height,100);
                // border: 1px solid #CCCCCC;
                // border: 1px solid #445779;
                border-radius: 4px;
            }

            input:focus {
                border: 1px dashed #666666;
            }

            i {
                display: block;
                .rem(width, 28);
                .rem(height, 28);
                background: url('../../assets/images/down_icon.png') no-repeat;
                background-size: cover;
                position: absolute;
                top: 0.28rem;
                right: 0.3rem;
            }

            i.copy-sj-btn {
                background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                border-radius: 44px;
                text-align: center;
                color: #fff;
                position: absolute;
                right: .2rem;
                height: .7rem;
                line-height: .7rem;
                width: 2rem;
                top: .1rem;
            }
        }
    }

    .recharge-btn {
        .rem(height, 96);
        .rem(line-height, 96);
        .rem(font-size, 32);
        background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
        color: #fff;
        text-align: center;
        border-radius: 0.08rem;
        border-radius: 2rem;
    }
}

.goldenSkin {
    .step-title {
        color: #AB9B62;
    }

    .card-info {
        color: #cecece;

        .info-list {
            li {
                border-bottom: 1px solid #5C564D;
            }
        }

        .bank-typ {
            span {
                background: #464B53;
            }
        }
    }

    .userCard-info {
        ul {
            li {
                background: #464B53;
                border: 1px solid #464B53;

                span {
                    color: #928151;
                }

                .sj-code {
                    color: #cecece;
                }

                input {
                    color: #cecece;
                }
            }
        }
    }
}
</style>