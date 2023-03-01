<template>
    <div class="kyqp-container">
     <header class="home-header clearfix" :class="$st.state.skin==5?'goldenHeader':''">
        <div @click="goback()" class="back-icon"></div>
        <span>{{title}}</span>

    </header>
        <myScroll :top="$st.state.skin==5?1.2:1.5" :bottom='0' :bgColor="$st.state.skin==5?'161C23':''">
            <div class="game-container" :class="$st.state.skin==5?'game-container-golden':''">
                <ul>
                    <li v-for="(vv,index2) in list" :key="index2" @click="goQp(vv)" :class="vv.type" :data-cid="vv.id">
                        <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                        <i class="close-icon"></i>
                        <div class="g-img" ><img v-lazy="vv.img" alt=""></div>
                        <p class="game-name" >{{vv.name}}</p>
                        <!-- <span>{{vv.remark}}</span> -->
                    </li>
                </ul>
            </div>
        </myScroll>
        
    </div>
</template>

<script>
    export default {
        name: "info",
        components:{
        },
        data(){
            return {
                list:[
                   
                ],
                title:'MG',
                type:'mg'    
            }
        },
        created(){
            this.title = this.$route.query.title||'MG';
            this.type =  this.$route.query.type||'mg';
            this.getHotGame();
        },
        filters:{
            filterTag(n){
                let tag = '';
                if(n=='NEW'){
                    tag = 'tag-new';
                }else if(n=='HOT'){
                    tag = 'tag-hot';
                }
                return tag;
            },
        },
        methods:{
             goback(){
                this.$router.go(-1);
            },
             async getHotGame(flag) {
                   let all = this.$store.state.gameCenter;
                let d = all.find(val=>{
                    return val.name==this.title
                });
                // console.log(d);
                if(d) this.list = d.list;
                if(this.list.length>0) return;
                this.$vux.loading.show({text: 'Đang nhận...'});
                let res = await this.$http.get("/api/vendor/allgames");
                this.$vux.loading.hide();
                if (res.data && res.data.code == 1) {
                     this.$store.commit('SETGAMECENTER',res.data.data||[])
                    let all = res.data.data || []
                    let d = all.find(val=>{
                        return val.name==this.title
                    });
                    this.list = d.list;
                }
            },
             goQp(item){
                if (!this.$store.state.userinfo.user_id) {
                    this.$popup();
                    return
                }
                 if(this.$store.state.userinfo.user_id<0){
                    this.$swBox({
                         title: this.$t('tsTitle'),
                    content: this.$t('swTip'),
                    leftBtn: this.$t('loginText'),
                    rightBtn:this.$t('registerText'),
                        clickL: () => {
                            this.SETUSERTOKEN('')
                            this.$router.push('/login');
                        },
                        clickR: () => {
                            this.SETUSERTOKEN('')
                            if(this.noticeType==1){
                                this.$router.push('/register');
                                
                            }else{
                                this.$router.push('/RegisterDl');
                                
                            }
                        }
                    });
                    return
                }
                window.open('/toGame/'+item.vendor+'/'+item.code+'/0');
            },
        }
    }
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}

    .home-header {
        .rem(font-size,32);
        font-weight: bold;
        line-height: 1.2rem;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
        .back-icon{
            position: absolute;
            width: 1.2rem;
            height: 1.2rem;
            z-index: 2000001;
            left: .3rem;
            background: url("../../assets/images/gray-back-icon.png") no-repeat center left;
            background-size: 25%;
        }
    }
</style>