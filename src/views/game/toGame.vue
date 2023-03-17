<template>
    <div class="game-content" v-show="tygameUrl!=''">

    <!-- <header class="home-header goldenHeader clearfix" >
          <div  class="back-icon" @click="$router.push('/')"></div>
          <span>sport</span>
      </header> -->
        <!-- <iframe :src="tygameUrl" id="myiframe" scrolling="yes" frameborder="0"></iframe> -->
        <Foot />
    </div>
</template>

<script>
import {mapMutations, mapState } from "vuex";
import Foot from "../../components/footer.vue";
    export default {
        name: "toGame",
        components: { Foot },
        data(){
            return{
                // gameUrl:''
            }
        },
        computed: {
        ...mapState(['tygameUrl','tyType']),
        },
        watch: {
           
        },
        created() {
            
        },
        methods:{
             ...mapMutations(["SETISSF","SETTYURL","SETTYSHOW","SETIFRAMELOAD","SETTYTYPE"]),
            async initgame(){
                let id = this.$route.params.id;
                let type = this.$route.params.type;
                if(type=='fh_chess'){
                    this.$vux.loading.show({text: 'Đang chạy...'});
                    let res = await this.$http.post("/api/fhchess/play",{
                        game_id:id-0
                    });
                    this.$vux.loading.hide();
                    if(res && res.data.code==1){
                        location.href=res.data.data.url;
                        // this.gameUrl = res.data.data.url
                    }else{

                        this.$publicPop({
                            title: "",
                            content: res.data.msg,
                            isShowCancelButton:false,
                            clickCancel: () => {},
                            clickConfirm: () => {
                            window.close();
                            }
                        });
                        
                        // this.$vux.confirm.show({
                        //     title:'',
                        //     content:res.data.msg,
                        //     showCancelButton:false,
                        //     confirmText: "Xác nhận",
                        //     onConfirm : () => {
                        //         window.close();
                        //     }
                        // });
                    }
                }
                else if(type=='ag_live'){
                    this.goGameUrl('/api/vendors.ag/play');
                }else if(type=='ag_slot'){
                    this.goGameUrl('ag/play-slot');
                }else if(type=='bg_fish'){
                    this.goGameUrl('bg/play-fishing',id);
                }else if(type=='ky'){
                    this.goGameUrl('ky/play',id);
                }else if(type=='ibc'||type=='ibc_sport'){
                    this.goGameUrl('/api/vendors.ibc/play',id);
                }else if(type=='ag_hunter'){
                    this.goGameUrl('ag/play-hunter',id);
                }else if(type=='im'){
                    this.goGameUrl('/api/vendors.im/play',id);
                }else if(type=='bbin_sport'||type=='bbin'){
                    this.goGameUrl('/api/vendors.bbin/play',id,true);
                }else if(type=='ae_live'||type=='ae'||type=='ae_sport'||type=='ae_slot'){
                    this.goGameUrl('/api/vendors.ae/play',id,true);
                }else if(type=='ael_lottery'){
                    this.goGameUrl('/api/vendors.ael/play',id,true);
                }else if(type=='mg'||type=='mg_slot'){
                    this.goGameUrl('/api/vendors.mg/play',id,true,type);
                }else if(type=='jili'||type=='jili_slot'){
                    this.goGameUrl('/api/vendors.jili/play',id,true,type);
                }else if(type=='qm'||type=='qm_slot'){
                    this.goGameUrl('/api/vendors.qm/play',id,true,type);
                }else if(type=='fc'||type=='fc_slot'){
                    this.goGameUrl('/api/vendors.fc/play',id,true,type);
                }
                else if(type=='rich88'||type=='rich88_slot'){
                    this.goGameUrl('/api/vendors.rich88/play',id,true,type);
                }
                else if(type=='pp'||type=='pp_slot'){
                    this.goGameUrl('/api/vendors.pp/play',id,true,type);
                }
                else if(type=='pg'||type=='pg_slot'){
                    this.goGameUrl('/api/vendors.pg/play',id,true,type);
                }
                else if(type=='pt'||type=='pt_slot'){
                    if(id=='pt_live'){
                        this.goGameUrl('/api/vendors.pt/play','live',true);
                    }
                    else{
                        this.goGameUrl('/api/vendors.pt/play',id,true,type);
                    }
                }
                else if(type=='pt_live'){
                    this.goGameUrl('/api/vendors.pt/play',id,true);
                }
                else if(type=='bbin_live'){
                    this.goGameUrl('/api/vendors.bbin/play',id,true);
                }else if(type=='cmd_sport'||type=='cmd'){
                    this.goGameUrl('/api/vendors.cmd/play',id,true);
                }else if(type=='sbo_sport'||type=='sbo'){
                    this.goGameUrl('/api/vendors.sbo/play',id,true);
                }else if(type=='cq9'||type=='cq9_chess'){
                    this.goGameUrl('/api/vendors.cq9/play',id,true);
                }else if(type=='sa'||type=='sa_live'){
                    this.goGameUrl('/api/vendors.sa/play',id,true);
                }else if(type=='dg'||type=='dg_live'){
                    this.goGameUrl('/api/vendors.dg/play',id,true);
                }else if(type=='ibo'||type=='ibo_live'){
                    this.goGameUrl('/api/vendors.ibo/play',id,true);
                }else if(type=='ebet'||type=='ebet_live'){
                    this.goGameUrl('/api/vendors.ebet/play',id,true);
                }else if(type=='allbet'||type=='allbet_live'){
                    this.goGameUrl('/api/vendors.allbet/play',id,true);
                }else if(type=='allbet'||type=='allbet_live'){
                    this.goGameUrl('/api/vendors.allbet/play',id,true);
                }else if(type=='ezu'||type=='ezu_live'){
                    this.goGameUrl('/api/vendors.ezu/play',id,true);
                }else if(type=='tcg_lottery'){
                    this.goGameUrl('/api/vendors.tcg/play',id,true);
                }else if(type=='jdb_slot'||type=='jdb'){
                    this.goGameUrl('/api/vendors.jdb/play',id,true,type);
                }else if(type=='bg_live'||type=='bg'){
                    this.goGameUrl('/api/vendors.bg/play',id,true);
                }else if(type=='fight_cock'||type=='s128_cock'){
                    this.goGameUrl('/api/vendors.s128/play');//新
                    // this.goGameUrl('/api/vendors.fight/play');//旧
                }else if(type=='aec_race'){
                    this.goGameUrl('/api/vendors.aec/play');
                }else if(type=='cq9_sport'){
                    this.goGameUrl('/api/vendors.cq9/play',id,true);
                }else if(type=='v8_chess'){
                    this.goGameUrl('/api/vendors.v8/play',id,true);
                }
                else if(type=='ky_chess'||type=='ky'){
                    this.goGameUrl('/api/vendors.ky/play',id,true);
                }
                else if(type=='kx_chess'){
                    this.goGameUrl('/api/vendors.kx/play',id,true);
                }
                
            },
            goTogame(){
                document.forms[0].submit();
            },
            async goGameUrl(url,id,flag,type){
                // {text: this.$t('loadingText2')+'...'}
                if(this.$route.params.code==-1){
                    this.SETIFRAMELOAD(true)
                }else{
                    this.$vux.loading.show();
                }
               
                
                let obj={} ;
                if(flag){
                    obj = {
                        game_type:id,
                    }
                    if(type){
                       obj = {
                        game_type:'slot',
                        game_id:id
                       } 
                    }
                }else{
                    obj={
                        game_id:id,
                    }
                }
                if(this.$route.params.code==-1&&this.tygameUrl!=''&&this.tyType==this.$route.params.type){
                    this.$vux.loading.hide();
                    this.SETTYSHOW(true)
                    this.SETIFRAMELOAD(false)
                    return
                }
                // this.SETTYSHOW(false)
                this.SETTYURL('')
                let res=  await this.$http.get(url,{
                    params:obj
                },{timeout:60000});
                this.$vux.loading.hide();
                if(res&&res.data.code==1){
                  if(this.$route.params.code==-1){
                      this.SETTYURL(res.data.data.url)
                      this.SETTYTYPE(this.$route.params.type)
                      this.SETTYSHOW(true)
                  }else{
                     location.href = res.data.data.url;
                  }
                   
                    
                    // console.log(res)
                }else{
                    this.$publicPop({
                        title: "",
                        content: res.data.msg,
                        isShowCancelButton:false,
                        clickCancel: () => {},
                        clickConfirm: () => {
                        window.close();
                        }
                    });
                    
                }
            },
        },
        mounted() {
            this.initgame();
        },
        // destoryed(){
        //     this.SETTYSHOW(false)
        // }
    }
</script>

<style scoped lang="less">
#myiframe {
  width: 100%;
  height: 92%;
  position: absolute;
//   top: 1.2rem;
}
header{
    height: 1.2rem;
}
</style>