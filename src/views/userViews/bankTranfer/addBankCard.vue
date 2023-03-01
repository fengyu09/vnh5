<template>
    <div class="add-bankCard">
        <x-header
                style="background-color:transparent;z-index: 9;color:#000"
                :title="$t('addBankCard[0]')"
                :left-options="{showBack: false}"
                :class="$st.state.skin==5?'goldenHeader':''"
        >
            <span :style="$st.state.skin==5?'color: #E3CF95':'color: #000'">{{$t('addBankCard[0]')}}</span>
            <i class="black-back"></i>
            <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
        </x-header>
        <myScroll :bottom="0" :top="1.2" :bgColor="$st.state.skin==5?'1F252C':''">
            <div class="add-bankCard-content" :class="skin==5?'add-bankCard-content-golden':''">
                <div class="input-item">
                    <span>{{$t('addBankCard[1]')}}</span>
                    <input type="text" :placeholder="$t('addBankCard[2]')" v-model="cardData.name" ref="nameReg" maxlength="20">
                </div>
                <div class="input-item">
                    <span>{{$t('addBankCard[3]')}}</span>
                    <input type="text" maxlength="50" ref="noReg" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')" :placeholder="$t('addBankCard[4]')" v-model="cardData.no">
                </div>
                <div class="input-item">
                    <span>{{$t('addBankCard[5]')}}</span>
                    <input type="text" :placeholder="$t('addBankCard[6]')" v-model="cardData.remark" maxlength="8">
                </div>
            </div>
        <div class="submit-btn" :class="[{'skin-btn-pink':skin ==1},{'skin-btn-blue':skin ==2},{'skin-btn-green':skin ==3},{'skin-btn-maingreen':skin ==4},{'skin-btn-golden':skin ==5}]" @click="postCard">{{$t('addBankCard[7]')}}</div>
        </myScroll>
    </div>
</template>

<script>
import { mapState } from "vuex";
    export default {
        name: "addBankCard",
        data(){
            return{
                cardData:{
                    name:'',
                    no:'',
                    remark:''
                }
            }
        },
        created() {
        },
         computed: {
            ...mapState(["skin"])
        },
        methods:{
            async postCard(){
                //非空
                if(!this.cardData.name){
                    this.$vux.toast.text(this.$t('addBankCard[8]'), 'middle');
                    this.$refs.nameReg.focus();
                    return ;
                }
                if(!this.cardData.no){
                    this.$vux.toast.text(this.$t('addBankCard[9]'), 'middle');
                    this.$refs.noReg.focus();
                    return ;
                }
                this.$vux.loading.show({text:this.$t('addBankCard[10]')});
                 let d = this.globalPpproach.checkIsEncrypt(this.cardData)
                let res = await this.$http.post(this.versionLive2+'/Recharge/add_commonno',d);
                this.$vux.toast.text(res.data.msg, 'middle');
                this.$vux.loading.hide();
                if(res && res.data.code==1){
                   this.$router.push('/bankCardList');
                }else{

                }
            }
        }

    }
</script>

<style scoped lang="less">
.rem(@name,@px){
        @{name}:unit(@px/75,rem)
}
.add-bankCard{
    .vux-header{
        .rem(font-size,32);
        box-shadow: -3px 0px 8px 1px #ccc;
        .vux-header-title{
            color: #000;
        }
        .black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
    }
    .add-bankCard-content{
        .input-item{
            border-bottom: 1px solid #eee;
            padding: .5rem .4rem;
            overflow: hidden;
            span{
                color: #343434;
                .rem(font-size,28);
            }
            input{
                display: inline-block;
                width: 65%;
                padding-left: .7rem;
            }
        }
        &.add-bankCard-content-golden{
            .input-item{
                border-bottom: 1px solid #5C564D;;
                span{
                    color: #928151;
                }
                input{
                    color: #cecece;
                }
            }
        }
    }
    .submit-btn{
        margin: 2rem auto 0;
        // background: #eee;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
        .rem(font-size,32);
        color: #fff;
        .rem(width,680);
        .rem(height,88);
        .rem(line-height,88);
        .rem( border-radius,44);
        text-align: center;
    }
}
</style>