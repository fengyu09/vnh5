<template>
    <div class="game-content">
        <div v-html="gameUrl"></div>
    </div>
</template>

<script>
import {mapMutations, mapState } from "vuex";
    export default {
        name: "goSS",
        data(){
            return{
                gameUrl:''
            }
        },
        watch: {
            gameUrl:function () {
                this.$nextTick(() => {
                    location.href = document.forms[0].getAttribute('action')
                });
            }
        },
        created() {
            // let url = localStorage.getItem('GOSS');
            // window.location.href = url;
            let type=this.$route.query.type;
            this.getUrl(type);
            

        },
        methods:{
            getUrl(type){
                 this.$vux.loading.show({ text: "Đang nhận..." });
                if(type){
                    if(type=='im'){
                        this.goGameUrl('im/play');
                    }else if(type=='bbin'){
                        this.goGameUrl('bbin/play','sport');
                    }else if(type=='cmd'){
                        this.goGameUrl('cmd/play','sport');
                    }else if(type=='sb'){
                        this.goGameUrl('ibc/play','sport');
                    }else if(type=='sbo'){
                        this.goGameUrl('sbo/play','sport');
                    }
                }else{
                    this.$http.get('/api2/platform/rand-sport-play',{ params:{
                        game_type:'sport',
                        is_mobile:1
                    }}).then(res=>{
                        this.$vux.loading.hide()
                        if(res.data.code == 1){
                            this.$vux.loading.hide();
                            window.location.href = res.data.data.url;
                        }else{
                            this.$vux.confirm.show({
                                title:'',
                                content:res.data.msg,
                                showCancelButton:false,
                                onConfirm : () => {
                                    window.close();
                                }
                            });
                        }
                        
                    }).catch(()=>{
                        this.$vux.loading.hide();
                        this.$vux.toast.text(res.data.msg, 'middle');
                    })
                }
 
            },
             async goGameUrl(url,type){
                let res=  await this.$http.get('/api2/'+url,{
                    params:{game_type:type}
                });
                this.$vux.loading.hide();
                if(res&&res.data.code==1){
                    location.href = res.data.data.url;
                }else{
                    this.$vux.confirm.show({
                        title:'',
                        content:res.data.msg,
                        showCancelButton:false,
                        onConfirm : () => {
                            window.close();
                        }
                    });
                }
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">

</style>