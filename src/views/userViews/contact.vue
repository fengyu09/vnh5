<template>
    <div>
        <div class="head">
            <div @click="goback" style="z-index: 10000001;">
                <img style="width: 0.31rem;margin-top: .3rem" src="../../assets/images/gray-back-icon.png" alt="">
            </div>
            <span>Nhóm giao lưu</span>
        </div>
        <ul class="contact-list-item">
            <li  v-for="(item,index) in contactList" @click="toContact(item.url)" :key="index">
                <img :src="item.icon" alt="" srcset="">
                <span>{{item.title}}</span>
            </li>
            <!-- <li class="fj-contact">
                <span>官方飞机群</span>
            </li>
            <li class="wechat-contact">
                <span>官方微信群</span>
            </li>
            <li class="qq-contact">
                <span>官方QQ群</span>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "contact",
        data(){
            return{
                contactList:[]
            }
        },
        created(){
             this.$http.get(this.versionLive2+"live/contact/").then(res=>{
                 if(res.data.code==1){
                     this.contactList=res.data.data
                 }
             })
        },
        methods:{
            goback() {
                this.$router.push('/member');
            },
            toContact(url){
                window.open(url)
            }
        }
    }
</script>

<style scoped lang="less">
    .head {
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        position: relative;
        font-size: 0.42rem;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }
    .head>div {
        position: absolute;
        top: 0rem;
        left: .35rem;
        width: 1rem;
        height: 100%;
        text-align: left;
    }
    .contact-list-item{
        li{
            border-bottom: 1px solid #ddd;
            margin: 0 .3rem;
            padding: .35rem 0;
            position: relative;
            img{width: 0.7rem;
                position: absolute;
                top: 0.25rem;}
            span{
                font-size: .38rem;
                padding-left: 1rem;
                font-weight: 500;
            }
            &.fj-contact{
                background: url("../../assets/images/contact/fj@2x.png") left center no-repeat;
                background-size: 7%;
            }
            &.wechat-contact{
                background: url("../../assets/images/contact/wx@2x.png") left center no-repeat;
                background-size: 7%;
            }
            &.qq-contact{
                background: url("../../assets/images/contact/qq@2x.png") left center no-repeat;
                background-size: 7%;
            }
            &.td-contact{
                background: url("../../assets/images/contact/td@2x.png") left center no-repeat;
                background-size: 7%;
            }
            &:after{
                position: absolute;
                content: '';
                background: url("../../assets/images/enter-seeding.png") center no-repeat;
                background-size: contain;
                width: .5rem;
                height: .5rem;
                right: 0;
                top:.3rem ;
            }
        }

    }
</style>