<template>
    <div class="kyqp-container">
        <Header/>
        <myScroll :top="1.5" :bottom='0'>
            <div class="game-container">
                <ul>
                    <li v-for="(vv,index2) in list" :key="index2" @click="goQp(vv)" :class="vv.type" :data-cid="vv.id">
                        <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
                        <i class="close-icon"></i>
                        <div class="g-img" ><img v-lazy="vv.img_url" alt=""></div>
                        <p class="game-name" >{{vv.name}}</p>
                        <span>{{vv.remark}}</span>
                    </li>
                </ul>
            </div>
        </myScroll>
    </div>
</template>

<script>
import Header from '../../components/headerOne'
    export default {
        name: "info",
        components:{
            Header
        },
        data(){
            return {
                list:[]
            }
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
             async goQp(item){
                if (!this.$store.state.userinfo.user_id) {
                    this.$popup();
                    return
                }
                 if(this.$store.state.userinfo.user_id<0){
                    this.$swBox({
                        title: "提示",
                        content: "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức。",
                        leftBtn: "登录",
                        rightBtn:'Đăng ký',
                        clickL: () => {
                            this.$store.commit('SETUSERTOKEN','')
                            this.$router.push('/login');
                        },
                        clickR: () => {
                            this.$store.commit('SETUSERTOKEN','')
                            if(this.noticeType==1){
                                this.$router.push('/register');
                                
                            }else{
                                this.$router.push('/RegisterDl');
                                
                            }
                        }
                    });
                    return
                }
                window.open('/toGame/'+item.type+'/'+item.id);
            },
            async getHotGame(flag) {
                let all = this.$store.state.gameCenter;
                let d = all.find(val=>{
                    return val.name=="开元棋牌"
                });
                if(d) this.list = d.list;
                if(this.list.length>0) return;
                this.$vux.loading.show({text: 'Đang nhận...'});
                let res = await this.$http.get("/api2/user/all-games");
                this.$vux.loading.hide();
                if (res.data && res.data.code == 1) {
                    this.$store.commit('SETGAMECENTER',res.data.data||[])
                    let all = res.data.data || []
                    let d = all.find(val=>{
                        return val.name=="开元棋牌"
                    });
                    this.list = d.list;
                }
            },
        },
        created(){
            this.getHotGame();
        }
    }
</script>

<style scoped lang="less">
.rem(@name,@px){
    @{name}:unit(@px/75,rem)
}


</style>