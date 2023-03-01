import axios from 'axios'
import Vue from 'vue'
const actions = {
  // action 也有一个固有参数 context，但是 context 是 state 的父级，包含  state、getters
   //获取余额
   getYe (context) {
    //  console.log(context.state)
    Vue.prototype.$http.get('/api2/index/balance').then(function(res){
      // console.log(this)
      }.bind(this))
      .catch(function(err){
        // console.log(err)
      })
  },
  getHotZb (context) {
    //  console.log(context.state)
    Vue.prototype.$http.get(Vue.prototype.versionLive2+'live/get_hot_list/').then(function(res){
      // console.log(this)
      }.bind(this))
      .catch(function(err){
        // console.log(err)
      })
  },
  getUsdtAdressList(context,obj){
    if(Object.prototype.toString.call(obj) === '[object Object]'&&obj.flag) Vue.$vux.loading.show({text:'Đang nhận...'});
    Vue.prototype.$http.get(Vue.prototype.versionLive2+'Recharge/get_commonno',{
      params:{
        type:2
      }
    }).then(function(res){
      if(res.data.code==1){
        context.commit('SETUSDTLIST',res.data.data)
      }else{
        Vue.$vux.toast.text(res.data.msg,'middle');
      }
      
      // SETUSDTLIST
      Vue.$vux.loading.hide();
      }.bind(this))
      .catch(function(err){
        Vue.$vux.loading.hide();
        // console.log(err)
      })
  },
  getCardAdressList(context){
    Vue.prototype.$http.get(Vue.prototype.versionLive2+'Recharge/get_vrwallet_list/').then(function(res){
      context.commit('SETCARDLIST',res.data.data)
      }.bind(this))
      .catch(function(err){
        // console.log(err)
      })
  },
  getCzTypeList(context){
    Vue.prototype.$http.post(Vue.prototype.versionLive2+'Recharge/getList').then(function(res){
      context.commit('SETCZTYPE',res.data.data);
      Vue.$vux.loading.hide();
      }.bind(this))
      .catch(function(err){
        // console.log(err)
        Vue.$vux.loading.hide();
      })
  }

}



export default actions    

