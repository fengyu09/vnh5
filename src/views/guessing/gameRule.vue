<template>
    <div>
        <header :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3},{'maingreen-bg':skin==4},{'goldenHeader':skin==5}]">
         <i class="return-icon" @click="$router.go(-1)"></i>
         <div class="title"  >
             {{titleName}}
           <i class="title-down" @click="showTitle = !showTitle" :class="showTitle == true ? 'title-up':''"></i>
          <!-- <i class="quick-icon" @click="isQuickMenu=true"></i> -->
         </div>
       </header>
       <!-- 头部导航弹窗 -->
        <div class="title-list-box" v-if="showTitle" :class="$st.state.skin==5?'title-list-box-golden':''">
            <div class="title-list" :class='[{"title-pink":skin==1},{"title-blue":skin==2},{"title-green":skin==3},{"title-maingreen":skin==4},{"title-golden":skin==5}]'>
                <div class="sort-list fl" :class='[{"sort-list-pink":skin==1},{"sort-list-blue":skin==2},{"sort-list-green":skin==3},{"sort-list-maingreen":skin==4},{"sort-list-golden":skin==5}]'>
                    <span :class="[{'active':item.code == gameNameIndex},{'pink-bg':item.code == gameNameIndex&&$st.state.skin==1},{'blue-bg':item.code == gameNameIndex&&$st.state.skin==2},{'green-bg':item.code == gameNameIndex&& $st.state.skin==3},{'maingreen-bg':item.code == gameNameIndex&& $st.state.skin==4},{'golden-bg':item.code == gameNameIndex&& $st.state.skin==5}]"   @click="gameName(index,item)"  v-for="(item,index) in ruleList" :key="index" >{{item.name}}</span>
                </div>
                <div class="rule-type clearfix fl">
                    <ul  class="">
                        <li class="fl" :class="[{'active':v.code == slelectIndex},{'pink-bg':v.code == slelectIndex&&$st.state.skin==1},{'blue-bg':v.code == slelectIndex&&$st.state.skin==2},{'green-bg':v.code == slelectIndex&& $st.state.skin==3},{'golden-bg':v.code == slelectIndex&& $st.state.skin==5},{'maingreen-bg':v.code == slelectIndex&& $st.state.skin==4},{'skin-border-b-green':skin==3},{'skin-border-b-maingreen':skin==4},{'skin-border-b-blue':skin==2},{'skin-border-b-pink':skin==1},{'skin-border-b-golden':skin==5}]"  v-for="(v,index) in gameNameList" @click="changeRule(index,v)" :key="index" >{{v.name}}</li>
                    </ul>
                </div>
                
            </div>
        </div>
        
        <!-- 规则内容 -->
        <div class="ruleContent clearfix" >
            <div  v-if="ruleContent != ''">
                <myScroll ref="scrollWrapper" :top="skin==5?1.1:1.3" :left="skin==5?0:''"  :bottom="0.2" :bgColor="skin==5?'1F252C':'fff'" >
                    <div v-html="ruleContent" :style="skin==5?'color: #AB9B62;':''" v-if="ruleContent != ''" style="font-size:0.8em;line-height:25px;padding-right:.4rem"></div>
                    <div class="prevue-content-no" v-else>Đang nhận... <i class="el-icon-loading"></i></div>
                </myScroll>
            </div>
         </div>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
export default {
    data(){
        return{
            is_merge:0,
            showTitle:false,
            isQuickMenu:false,
            amount:'',//用户金额
            skinList:[{
                cover: require("../../assets/images/skin/theme-color.png"),
                id: 0,
                name: "默认颜色",
                nameVin:'Màu chủ đề',
                type: "default",
                users: 95,
            },{
                cover: require("../../assets/images/skin/pink.png"),
                id:1,
                name: "樱花粉",
                nameVin:'Màu hoa anh đào',
                type: "pink",
                users: 119,
            },{
                cover: require("../../assets/images/skin/blue.png"),
                id: 2,
                name: "水川蓝",
                nameVin:'Màu xanh lam',
                type: "blue",
                users: 115,
            },{
                cover: require("../../assets/images/skin/green.png"),
                id: 3,
                name: "青草绿",
                nameVin:'Màu xanh lá',
                type: "green",
                users: 195,
            }],
            skinIndex:0,
            showSkin:false,
            ruleList:{},
            ruleContent:'',//规则
            gameNameList:{},
            gameNameIndex:0,
            lotteryId:'',
            titleName:''
        }
    },
    filters:{
        filterSkinName(id){
            let name = ''
            if(id==0){
              name = "Màu chủ đề"
            }else if(id==1){
              name = "Màu hoa anh đào"
            }else if(id==2){
              name = "Màu xanh lam"
            }else if(id==3){
              name = "Màu xanh lá"
            }
            return name;
          }
    },
    created(){
        this.titleName = this.$route.query.vname;
        this.lotteryId = this.$route.params.id;
        // this.loadMoney();
        this.getRuleList();
        if(this.lotteryId==1){
            this.gameNameIndex = 1;
        }else if(this.lotteryId==37){
            this.gameNameIndex = 4;
        }else if(this.lotteryId>1&&this.lotteryId<16){
            this.gameNameIndex = 2;
        }else if(this.lotteryId>15&&this.lotteryId<37){
            this.gameNameIndex = 3;
        }else if(this.lotteryId>=45&&this.lotteryId<=50){
            this.gameNameIndex = 5;
        }else if(this.lotteryId>37){
            this.gameNameIndex = 0;
        } 
        this.slelectIndex = this.$route.params.id;
    },
    computed: {
        ...mapState([
            "skin",
            "chatShow",
            'skinData',
            'skinListStore'
        ])
    },
    methods:{
        ...mapMutations(["SETHISTORYGAME","SETUSERTOKEN","SETCHAT","SETSKINDATA",'SETSKINLIST']),
        loadMoney() {
            if (!this.$store.state.codeToken) return;
            this.$http.get("/api/user/balance").then(res => {
              if (res && res.data.code == 1) {
               this.amount = res.data.data.balance
              }
            });
          },
        getselect(index,id,v){
            this.SETSKINDATA(id);
            this.skinIndex = id ;
            this.skinList[index].users = v.users-0+1;
            this.SETSKINLIST(this.skinList);
            this.isQuickMenu = false;
        },
        async  getRuleList(){
            let res = await this.$http.get('/api/lottery/rule');
            this.ruleList = res.data.data; 
            if(this.lotteryId==37){
                this.gameNameList = this.ruleList[3].list;
                this.ruleContent = this.gameNameList[0].content;

            }else if(this.lotteryId>37){
                this.gameNameList = this.ruleList[4].list;
                this.ruleContent = this.gameNameList[0].content;

            }else{
                this.gameNameList = this.ruleList[this.gameNameIndex-1].list;
                let index = this.gameNameList.findIndex(v=>{
                return v.code==this.lotteryId
                })
                this.ruleContent = this.gameNameList[index].content;
            }
        },
        gameName(index,item){
            this.gameNameIndex = item.code;
            if(item.code==0){
                this.gameNameList = item.list;
            }else{
                this.gameNameList = this.ruleList[this.gameNameIndex-1].list;
            }
        },
        changeRule(index,item){
            this.slelectIndex = item.code;
            this.ruleContent =item.content;
            this.titleName = item.name;
            this.showTitle = false;
            this.$refs.scrollWrapper.Myscroll.scrollTo(0,0)
        },
    }
}
</script>
<style lang="less"  scoped>
 .rem(@name,@px){
    @{name}:unit(@px/75,rem)
  }
    header{
        height: 1.18rem;
        line-height: 1.18rem;
        background: #1B74C8;
        position: relative;
        i{
        position: absolute;
        display: block;
        .rem(top,22);
        &.return-icon{
            .rem(width,34);
            .rem(height,42);
            background: url('../../assets/images/ynxz/left-return.png')no-repeat;
            background-size: contain;
            left: 0.453rem;
        }
        &.more-icon{
            .rem(width,44);
            .rem(height,44);
            background: url('../../assets/images/ynxz/chat_icon.png')no-repeat;
            background-size: contain;
            right: 1.15rem;
        }
        &.msg-icon{
            .rem(width,48);
            .rem(height,36);
            background: url('../../assets/images/ynxz/more_icon.png') no-repeat;
            background-size: contain;
            right: 0.22rem;
            top: 0.35rem;

        }
        }
    .title{
        
        color:#fff;
        text-align: center;
        font-size: 0.48rem;
        i{
        &.title-down{
            display: inline-block;
            .rem(width,40);
            .rem(height,40);
            background: url('../../assets/images/ynxz/w_Subtract.png')no-repeat;
            background-size: contain;
            vertical-align: middle;
            margin-left: 0.2rem;
        }
        &.quick-icon{
            .rem(width,40);
            .rem(height,40);
            background: url('../../assets/images/ynxz/quick-icon.png')no-repeat;
            background-size: 100% 100%;
            right: 0.2rem;
            top: 0.35rem;
        }
        &.title-up{
            display: inline-block;
            .rem(width,40);
            .rem(height,40);
            background: url('../../assets/images/ynxz/Subtract (3) (1).png')no-repeat;
            background-size: contain;
            vertical-align: middle;
            margin-left: 0.2rem;
        }
        }
    }
    &.goldenHeader{
        .title{
            color: #E3CF95;      
        }
        .title-down{
            background: url('../../assets/images/skin/golden/donw.png')no-repeat !important;
            background-size: contain !important;
        }
        .title-up{
            background: url('../../assets/images/skin/golden/up.png')no-repeat !important;
            background-size: contain !important;
        }
    }
    }
    .title-list-box{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 1.18rem;
        color: #555;
        background: rgba(0,0,0,0.4);
        z-index: 100;
        .title-list{
            display: flex;
            height: 80%;
            background: #fff;
            overflow: hidden;
            position: relative;
            .sort-list{
                width: 25%;
                padding-top: 0.4rem;
                padding-left: 0.1rem;
                will-change: scroll-position;
                position: relative;
                &::after{
                    display: block;
                    content: "";
                    height: 100%;
                    width: 1px;
                    background-color: #3a81e5;
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 9;
                    transition-property: background,color,translate3d,border,box-shadow;
                }
               
                span{
                    display: block;
                    font-size: 0.32rem;
                    color:#555;
                    .rem(line-height,70);
                    padding-left: 0.2rem;
                    margin-bottom: 0.3rem;
                    // text-shadow: 1px 1px 1px #fff;
                    position: relative;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ddd;
                        border-right-width: 0;
                        border-radius: 3px 0 0 3px;
                        box-sizing: border-box;
                    }
                    &.active{
                        // border-right: #fff;
                        border-width: 0;
                        font-weight: 600;
                        background: #3a81e5;
                        z-index: 10;
                        color: #fff;
                        &:after {
                            z-index: 10;
                            border-color: #3a81e5;
                            transition-property: background,color,translate3d,border,box-shadow;
                        }

                       
                    }
                   

                }
                &.sort-list-green{
                     &::after{
                         background-color: #0B9B71;
                     }
                     span.active{
                         &::after{
                             border-color: #0B9B71;
                         }
                     }
                }
                 &.sort-list-maingreen{
                     &::after{
                         background-color: #0B9B71;
                     }
                     span.active{
                         &::after{
                             border-color: #0B9B71;
                         }
                     }
                }
                &.sort-list-golden{
                    &::after{
                        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%);
                     }
                     span{
                        background: #464B53;
                        color:#cecece;
                        &::after{
                            border-color: #464B53 ;
                        }
                     }
                     span.active{
                        color: #A85100 !important;
                         &::after{
                             border-color: #D6B966 !important;
                         }
                     }
                }
                 &.sort-list-blue{
                     &::after{
                         background-color: #0CB6D9;
                     }
                     span.active{
                         &::after{
                             border-color: #0CB6D9;
                         }
                     }
                }
                 &.sort-list-pink{
                     &::after{
                         background-color: #FB796B;
                     }
                     span.active{
                         &::after{
                             border-color: #FB796B;
                         }
                     }
                }
            }
            .rule-type{
                width: 71%;
                height: 100%;
                margin-left: 0.4rem;
                padding-top: 0.4rem;
                overflow-y: auto;
                padding-bottom: 8px;
                li{
                    width: 43%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 0 0.2rem;
                    .rem(height,70);
                    .rem(line-height,70);
                    text-align: center;
                    border: 1px solid #287BE1;
                    box-sizing: border-box;
                    border-radius: 4px;
                    .rem(margin-right,35);
                    .rem(margin-bottom,26);
                    &:nth-of-type(2n){
                        margin-right: 0;
                    }
                    &.active{
                        background: #287BE1;
                        border: 1px solid #287BE1;
                        color: #fff;
                    }
                    &.pink-bg{
                        border: 1px solid #FB796B !important;
                    }
                    &.blue-bg{
                        border: 1px solid #0CB6D9 !important;
                    }
                    &.green-bg{
                        border: 1px solid #0B9B71 !important;
                    }
                    &.golden-bg{
                        border: 1px solid #D6B966 !important;
                        color: #A85100 !important;
                    }
                }
            }
            .title-pink{
                .sort-list{
                    >span{
                        color: #FB796B!important;
                    }
                }
                ul{
                    li.active{
                        background: linear-gradient(89.97deg, #FB6E6D 0.02%, #FFCAA2 99.97%)!important;
                        border-color: #FB796B!important;
                    }
                }
            }
            .title-blue{
                .sort-list{
                    >span{
                        color: #0CB6D9!important;
                    }
                }
                ul{
                    li.active{
                    background: linear-gradient(89.97deg, #06B4D8 0.02%, #75DFF2 99.97%)!important;
                    border-color: #0CB6D9!important;
                    }
                }
            }
            .title-green{
                .sort-list{
                    >span{
                    color: #00B681!important;
                    }
                }
                ul{
                    li.active{
                    background: linear-gradient(89.97deg, #32C986 0.02%, #59F3B2 99.97%)!important;
                    border-color: #00B681!important;
                    }
                }
            }
            .title-maingreen{
                .sort-list{
                    >span{
                    color: #00B681!important;
                    }
                }
                ul{
                    li.active{
                    background: linear-gradient(89.97deg, #008258 0.02%, #00BF7A 99.97%) !important;
                    border-color: #00B681!important;
                    }
                }
            }
            .title-golden{
                .sort-list{
                    >span{
                    color: #cecece!important;
                    background: #464B53 !important;
                    }
                }
                ul{
                    li.active{
                        background: linear-gradient(180deg, #FBF5E6 0%, #E6D29C 39.58%, #D6B966 100%) !important;
                        border-color: #00B681 !important;
                        color: #A85100 !important;
                    }
                }
            }
        }
        &.title-list-box-golden{
            .title-list{
                background: #161C23;
                .rule-type{
                    li{
                        &.skin-border-b-golden{
                            background: #464B53;
                            color: #cecece;
                            border: 1px solid #464B53 !important;
                        }
                    }

                }
            }
            
        }
    }   
   
    .ruleContent{
        padding: 0.3rem 0.2rem;
        p{
            margin: 0 0.4em 0 0;
            font-size: .8em;
        }
    }
    .quickInfo-box{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        z-index: 100;
        .quick-close{
        width:49%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        // background: pink;
        }
        .quick-content{
        width:50%;
        height: 100%;
        color: #555;
        background: #fff;
        position: relative;
        left: 50%;
        top: 0;
        z-index: 101;
        .user-info{
            background: url('../../assets/images/ynxz/user-bg.png')no-repeat;
            background-size: 100% 100%;
            .rem(padding-top,30);
            .rem(padding-left,15);
            .rem(padding-right,15);
            .rem(padding-bottom,20);
            color: #fff;
            &.user-info-pink{
            background: url('../../assets/images/skin/pink/user-bg.png')no-repeat!important;
            background-size: 100% 100%!important;
            }
            &.user-info-blue{
            background: url('../../assets/images/skin/blue/user-bg.png')no-repeat!important;
            background-size: 100% 100%!important;
            }
            &.user-info-green{
            background: url('../../assets/images/skin/green/user-bg.png')no-repeat!important;
            background-size: 100% 100%!important;
            }
            img{
            .rem(width,100);
            .rem(height,100);
            .rem(margin-right,10);
            .rem(margin-bottom,20);
            border-radius: 50%;
            }
            .name{
            display: block;
            font-weight: bold;
            .rem(font-size,32);
            .rem(margin-top,20);
            }
            .money{
            .rem(font-size,24);
            }
            .btn-group{
            border-top: 1px solid #fff;
            .rem(padding-top,20);
            .home,.recharge{
                display: inline-block;
                .rem(width,160);
                .rem(line-height,50);
                .rem(height,50);
                .rem(font-size,28);
                color: #fff;
                text-align: center;
                border-radius: 5px;
                border: none;
                &.home{
                background: linear-gradient(180deg, #ABE1FF 0%, #2096EB 100%);
                .rem(margin-right,15);
                }
                &.recharge{
                background: linear-gradient(180deg, #FFED46 0%, #FF8D24 100%);
                }
            }
            }
        }
        .quick-list{
            .rem(padding-top,30);
            .rem(padding-left,30);
            .rem(padding-right,20);
            li{
            .rem(font-size,28);
            background: url('../../assets/images/ynxz/right-arrow.png')no-repeat right center;
            background-size: 6%;
            .rem(padding-top,25);
            .rem(padding-bottom,25);
            a{
                color: #555;
            }
            img{
                .rem(width,44);
                .rem(margin-right,24);
                vertical-align: middle;
            }
            }
        }
        .skin-list{
            border-top:1px solid #e9e9e9;
            border-bottom:1px solid #e9e9e9;
            .rem(margin-left,30);
            .rem(margin-right,20);
            .rem(padding-top,16);
            .rem(padding-bottom,16);
            color:#888;
            li{
            .rem(margin-bottom,32);
            &:nth-last-child(1){
                margin-bottom:0;
            }
            
            }
            span{
            display:inline-block;
            }
            img{
            .rem(width,40);
            .rem(height,40);
            .rem(margin-right,8);
            vertical-align: middle;
            border-radius: 2px;
            }
        }
        }
    }
</style>