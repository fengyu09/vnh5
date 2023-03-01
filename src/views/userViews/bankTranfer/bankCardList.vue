<template>
    <div class="bank-cardList">
        <x-header
                style="background-color:transparent;z-index: 9;color:#445779"
                :title="$t('bankCardList[0]')"
                :left-options="{showBack: false}"
                :class="$st.state.skin==5?'goldenHeader':''"
        >
            <span :style="$st.state.skin==5?'color: #E3CF95':'color: #445779'">{{$t('bankCardList[0]')}}</span>
            <i class="black-back"></i>
            <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
            <p class="show-card" @click="$router.push('/addBankCard')">{{$t('bankCardList[1]')}}</p>
        </x-header>
        <myScroll :bottom="0" :bgColor="$st.state.skin==5?'1F252C':''">
            <ul class="card-list" v-if="cardList.length" :class="$st.state.skin==5?'card-list-golden':''">
                <li class="list-item" v-for="(v,i) in cardList" :key="i" data-type="0">
                    <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                        <div class="detail">
                            <span>{{$t('bankCardList[2]')}}: {{v.name}}</span>
                            <span style="padding-left: 1rem">{{v.remark}}</span>
                            <p>{{$t('bankCardList[3]')}}:{{v.no}}</p>
                            <div class="use-btn" @click="useOne(v)">{{$t('bankCardList[4]')}}</div>
                            <div class="delete" @click="deleteItem" :data-index="i" :data-id="v.id"><p class="deleteMenu">{{$t('bankCardList[5]')}}</p></div>
                        </div>
                    </div>
                </li>
            </ul>
            <p v-if="!cardList.length&&isLoading" class="no-card-tip">{{$t('bankCardList[6]')}}</p>
        </myScroll>
    </div>
</template>

<script>
    export default {
        name: "bankCardList",
        data(){
            return{
                cardList:[],
                isLoading:false,
                startX : 0 ,
                endX : 0 ,
            }
        },
        created() {
            this.getCommonCard();
        },
        methods:{
            async getCommonCard(){
                this.$vux.loading.show({text:this.$t('bankCardList[7]')});
                let res = await this.$http.get(this.versionLive2+'/Recharge/get_commonno');
                this.$vux.loading.hide();
                this.isLoading = true;
                if(res&&res.data.code==1){
                   this.cardList = res.data.data;
                }else {

                }

            },
            useOne(v){
                let obj = this.cardList.find((value,i)=>{
                    return v.id == value.id
                })
                if(typeof(obj)=='object'){
                    localStorage.setItem('currCommonCard',JSON.stringify(obj));
                    this.$router.push('/cardRecharge');
                }else{
                    this.$vux.toast.text(this.$t('bankCardList[8]'), 'middle');
                }
            },
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 50 ){
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -50 ){
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;
            },
            deleteItem(e){
                // 当前索引
                let index = e.currentTarget.dataset.index;
                let id = e.currentTarget.dataset.id;
                // 复位
                this.restSlide();
                // var arr=this.list[index]

               //接口
                this.$vux.loading.show({ text: this.$t('bankCardList[8]') });
                 let d = this.globalPpproach.checkIsEncrypt({id:id})
                this.$http.post(this.versionLive2+'Recharge/del_commonno',d).then(res=>{
                    this.$vux.toast.text(res.data.msg, 'middle');
                    this.$vux.loading.hide();
                    if(res.data.code==1){
                        //取消本地的
                        this.cardList.splice(index,1);
                        if(this.cardList.length==0){
                            this.isLoading=true  //没有卡了
                            localStorage.setItem('currCommonCard',JSON.stringify({}));
                        }
                    }
                }).catch(res=>{
                    this.$vux.toast.text(res.data.msg, 'middle');
                    this.$vux.loading.close();
                });



            },
            //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },

        }

    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .bank-cardList{
        .vux-header{
            .rem(font-size,32);
            // box-shadow: -3px 0px 8px 1px #ccc;
            .vux-header-title{
                color: #000;
            }
            .black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
        }
        .show-card{
            .rem(font-size,24);
            color: #445779;
            position: absolute;
            right: .3rem;
            top:.1rem;
        }
        .goldenHeader{
            .show-card{
                color: #928151;
            }
        }
        .list-item{
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
        }
        .list-item[data-type="0"]{
            transform: translate3d(0,0,0);
        }
        .list-item[data-type="1"]{
            transform: translate3d(-1.9rem,0,0);
        }
        ul.card-list{
            li{
                .rem(width,710);
                .rem(font-size,24);
                .rem(border-radius,10);
                margin: .2rem auto 0;
                background: #fff;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.08);
                .rem(padding-left,20);
                .rem(padding-right,20);
                .rem(padding-top,30);
                .rem(padding-bottom,30);
                /*overflow: hidden;*/
                .detail{
                    /*position: relative;*/
                    /*height: 100%;*/
                    color: #445779;
                    .rem(font-size,26);
                    p{
                        color:#6A86B9;
                        .rem(font-size,24);
                    }

                }
                p{
                    .rem(padding-top,30);
                    word-break: break-all;
                }
                .use-btn{
                       width: 2.13333333rem;
    height: 0.9rem;
    line-height: 0.35rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: #fff;
    text-align: center;
    position: absolute;
    right: 0.5rem;
    top: 0.7rem;
    background: linear-gradient(
89.97deg
, #007CFF 0.02%, #4BA1FF 99.97%);
    border-radius: 50px;
    padding-top: 0.1rem;
                }
                -webkit-transition: all 0.2s;
                transition: all 0.2s;
                .delete{
                    width: 2.7rem;
                    height: 100%;
                    background: #ff513e;
                    font-size: 0.4rem;
                    color: #fff;
                    text-align: left;
                    position: absolute;
                    top: 0;
                    right: -3rem;
                    .deleteMenu{
                        padding-top:.75rem;
                        padding-left:.6rem;
                    }
                }
            }
            &.card-list-golden{
                li{
                    background: #464B53;
                    color: #cecece;
                    .detail{
                        color: #928151;
                        p{
                            color: #cecece;
                        }
                    }
                    .use-btn{
                        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                        color: #A85100;
                    }
                }
            }
        }
        .no-card-tip{
            text-align: center;
            .rem(font-size,24);
            color: #666;
            padding-top: 6rem;
        }
    }
</style>