<template>
    <div class="service-container">
        <div class="header" :class="skin==5?'goldenHeader':''">
            <div style="text-align: center;">
                <h3>{{$t('service.text[0]')}}</h3>
            </div>
        </div>
        <myScroll :top='1' :bgColor="skin==5?'1A1A1A':''">
            <h3 class="top-banner"  @click="goOnline()" :class="[{'pink-banner':skin==1},{'green-banner':skin==3},{'maingreen-banner':skin==4},{'blue-banner':skin==2}]">
            <p>{{$t('service.text[1]')}}</p>
            <p class="en">Online Customer Service</p>
        </h3>
        <ul class="list-box clearfix" :class="[{'golden-list':skin==5}]">
            <li class="item fl" v-for="(val,x) in serve1" :key="x" @click="showPop(val)">
                <span class="status1 fl">
                    <img v-lazy="val.image" alt="">
                </span>
                <span class="txt fl">{{val.title}}</span>
               
            </li>
            
        </ul>
        <ul class="list-box clearfix" :class="[{'golden-list':skin==5}]">
             <h4 class="h4 fl" v-if="serve2.length">{{$t('service.text[2]')}}</h4>
             <li class="item fl" v-for="(v,i) in serve2" :key="i" @click="showPop(v)">
                <span class="status1 fl">
                    <img v-lazy="v.image" alt="">
                </span>
                <span class="txt fl">{{v.title}}</span>
                <span class="status2 fr">
                    <img src="../assets/images/service/x.png" alt="">
                </span>
            </li>
        </ul>
        <div class="faq"  :class="[{'golden-list':skin==5}]">
            <h5 :class="[{'golden-color':skin==5}]">{{$t('service.text[3]')}}</h5>
            <a  :class="[{'pink-color':skin==1},{'green-color':skin==3},{'blue-color':skin==2},{'golden-color':skin==5}]" v-for="(vv,index1) in serve3" :key="index1" href="javascript:;" @click="gowt(vv.content,vv.title)">{{index1+1}}.{{vv.title}}</a>
            
        </div>
        <div class="faq" >
            <h5 :class="[{'golden-color':skin==5}]">{{$t('service.text[4]')}}</h5>
            <ul class="clearfix" :class="[{'golden-list':skin==5}]">
                <li @click="goOutLink(item.value)" v-for="(item,index2) in serve4" :key="index2">{{item.title}}</li>
               
            </ul>
        </div>
        </myScroll>
       
        
        <Footer/>

      
        <div class="service-pop" v-if="isPop">
            <div class="service-pop-content">
                <div class="remove-btn" @click="isPop=false"></div>
                <h3>{{$t('service.text[5]')}}</h3>
                <div class="code-img"><img v-lazy="currServe.code_image" alt=""></div>
                <p >{{$t('service.text[6]')}}{{currServe.value}}</p>
                <div>
                      <div :class="[{'skin-border-blue':skin==2},{'skin-border-green':skin==3},{'skin-border-pink':skin==1},{'skin-border-golden':skin==5}]" class="copy-btn go-link" @click="goNewLink(currServe.url)">{{$t('service.text[12]')}}</div>  
                      <div :class="[{'blue-bg':skin==2},{'green-bg':skin==3},{'pink-bg':skin==1},{'golden-bg':skin==5}]" class="copy-btn copy-code" @click="open('copy-code',currServe)" data-clipboard-action="copy" :data-clipboard-text="currServe.value">
                    <a >{{$t('service.text[7]')}}</a>
                    </div>
                </div>
              
                <div class="bottom-tip">{{$t('service.text[8]')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
    export default {
        name: "service",
        data(){
            return{
              serve1:[],
               serve2:[],
               serve3:[],
               serve4:[],
                isPop:false,
                currServe:{},
                serviceName:''
            }
        },
        created(){
            this.getCustomerList1();
            this.getCustomerList2();
            this.getCustomerList3();
            this.getCustomerList4();
        },
        watch:{
            currServe:function(n){
                if(n.title.includes('QQ')){
                    this.serviceName = 'QQ'
                }else if(n.title.includes('微信')){
                    this.serviceName='微信'
                }else if(n.title.includes('Flygram')){
                    this.serviceName='Flygram'
                }
            },
            
        },
        computed: {
            ...mapState([
                "skin","lanCode","defalutLan"
                ])
        },
        methods: {
             ...mapMutations(["SETSERVE_1","SETSERVE_2","SETSERVE_3","SETSERVE_4"]),
             goNewLink(url){
                window.open(url)
                },
            goOnline() {
            window.open(JSON.parse(this.$store.state.webInitData).customer)
            },
           
            open(className,v){
                let TIMER;
                clearTimeout(TIMER);
                let _this = this;
                let clipboard = new this.clipboard("."+className);
                // alert(clipboard)
                clipboard.on('success', function () {
                    _this.$vux.toast.show({
                        text: _this.$t('service.text[10]'),
                        position: "middle"
                    });
                    

                });
                clipboard.on('error', function () {
                    _this.$vux.toast.text(_this.$t('service.text[11]'));
                });
            },
           
            goOutLink(url){
                window.open(url)
            },
            gowt(content,title){
                this.$router.push('/moreWt');
                localStorage.setItem('keWt',content?content:'');
                localStorage.setItem('keWtTitle',title?title:'');
            },
            showPop(v){
                this.isPop = true;
                this.currServe = v;
                // console.log(v)
            },
           async getCustomerList1(){
              if(this.$store.state.serve1.length)  this.serve1 = this.$store.state.serve1;
               let res = await this.$http.get('/api/live/user/user_customer_list/',{params:{type:1}});
               this.serve1 = res.data.data;
               this.SETSERVE_1(this.serve1 || [])
            },
            async getCustomerList2(){
                if(this.$store.state.serve2.length)  this.serve2 = this.$store.state.serve2;
               let res = await this.$http.get('/api/live/user/user_customer_list/',{params:{type:2}});
               this.serve2 = res.data.data;
                this.SETSERVE_2(this.serve2 || [])
            },
            async getCustomerList3(){
                if(this.$store.state.serve3.length)  this.serve3 = this.$store.state.serve3;
               let res = await this.$http.get('/api/live/user/user_customer_list/',{params:{type:3}});
               this.serve3 = res.data.data;
                this.SETSERVE_3(this.serve3 || [])
            },
            async getCustomerList4(){
                if(this.$store.state.serve4.length)  this.serve4 = this.$store.state.serve4;
               let res = await this.$http.get('/api/live/user/user_customer_list/',{params:{type:4}});
               this.serve4 = res.data.data;
                this.SETSERVE_4(this.serve4 || [])
            }
        },
    }
</script>

<style scoped lang='less'>
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}
.top-banner{
    .rem(width,726);
    .rem(height,156);
    background: url('../assets/images/service/top-banner.png') no-repeat;
    background-size: 100% 100%;
    .rem(font-size,36);   
    font-family: PingFang SC;
    font-weight: 500;
    color: #FEFEFE;
    margin: 13px auto 0;
    .rem(padding-top,45);
    text-align: center;
    .en{
        .rem(font-size,22);
        font-family: FZBoYaKanSongK;
        font-weight: 400;
        color: #FEFEFE;
    }
}
.pink-banner{
    background: url('../assets/images/service/top-banner-pink.png') no-repeat;
    background-size: 100% 100%;
}
.blue-banner{
    background: url('../assets/images/service/top-banner-blue.png') no-repeat;
    background-size: 100% 100%;
}
.green-banner{
    background: url('../assets/images/service/top-banner-green.png') no-repeat;
    background-size: 100% 100%;
}
.maingreen-banner{
    background: url('../assets/images/service/top-banner-blue.png') no-repeat;
    background-size: 100% 100%;
}
.list-box{
    .rem(padding-left,25);
    .item{
        .rem(width,340);
        .rem(height,110);
        .rem(line-height,50);
        .rem(font-size,24);
        color: #445779;
        background: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        float: left;
        // .rem(padding-top,30);
        .rem(padding-left,20);
        .rem(margin-top,20);
        .rem(margin-right,30);
        display: flex;
        &:nth-of-type(2n){
            .rem(margin-right,0);
        }
        .txt{
            line-height: .4rem;
            .rem(margin-top,23);
        }
        .status1{
            .rem(width,50);
            .rem(height,50);
            .rem(margin-right,23);
            .rem(margin-top,35);
        }
        .status2{
            .rem(width,50);
            .rem(height,50);
            .rem(margin-top,20);
            .rem(margin-right,10);

        
        }
    }
    .h4{
        width: 100%;
        font-weight: bold;
        .rem(font-size,36);
        color: #445779;
        .rem(padding-top,32);
        .rem(padding-bottom,22);
    }
    &.golden-list{
            li{
                background: #464B53 !important; 
                color: #CECECE !important;
            }
            a{
                color: #CECECE !important;
            }
        }
}
.faq{
    .rem(padding-left,25);
    .rem(padding-top,36);
    h5{
        font-weight: bold;
        .rem(font-size,32);
        color: #445779;
    }
    a{
        display: block;
        .rem(font-size,24);
        color: #1486FF;
        .rem(padding-top,30);
    }
    ul{
        li{
            float: left;
            // width: 33.3%;
            text-align: center;
            // width: 220px;

            .rem(height,60);
            // .rem(width,220);
            .rem(line-height,60);
            background: #F6F7FB;
            border-radius: 4px;
            color: #445779;
            .rem(margin-right,24);
            .rem(margin-top,20);
            padding: 0 .2rem;
            &:nth-of-type(3n){
                // margin-right: 0;
            }

        }
        &.golden-list{
            li{
                background: #464B53 !important; 
                color: #CECECE !important;
            }
            a{
                color: #CECECE !important;
            }
        }
    }
}

.service-pop{
    background: rgba(0,0,0,0.5);
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    max-width: 750px;
    min-width: 320px;
    .service-pop-content{
        text-align: center;
        background: #fff;
        border-radius: .3rem;
        width: 85%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: absolute;
        padding: .5rem .4rem;
        .remove-btn{
            position: absolute;
            width: 1rem;
            height: 1rem;
            right: .2rem;
            top:.3rem;
            background: url(../assets/images/hmlz-icon2.png) center no-repeat;
            background-size: 30%;
        }
        h3{
            color: #445779;
            .rem(font-size,32);
            font-weight: 500;
        }
        .code-img{
            .rem(width,234);
            .rem(height,234);
            margin: .2rem auto;
        }
        p{
            color: #445779;
            font-weight: 500;
        }
        .bottom-tip{
            color: #6A86B9;
            .rem(font-size,20);
        }
    }
    .copy-btn{
        background: linear-gradient(90deg, #007CFF 0.06%, #4BA1FF 100%);
        color: #fff;
        .rem(font-size,30);
        .rem(line-height,80);
        .rem(height,80);
        width: 85%;
        display: inline-block;
        margin: .3rem 0;
        border-radius: 20px;
        a{
            display: block;
            color: #fff;
        }
    }
    .go-link{
        background: none;
         color: #007CFF ;
        border: 1px solid #007CFF;
        a{
            color: #007CFF !important;
        }
    }
}
</style>