import Vue from 'vue'
import store from "../store/index";
import VueI18n from 'vue-i18n'

// 自定义的语言包
import English from './en'//英文
import Vietnam from './vn'//越南
import Thai from './th'//泰语
import Cn from './cn'//中文



//开发环境设置默认语言，编译时请去除
//const Language = 开发环境到 config/env.development.js 更改
// import { baseApi,language } from '@/config'

/*初始化 vux 多语言*/
// const lang = localStorage['Language'] || (Language || language)
const lang = localStorage['Language'] || 'vi-vn'


Vue.use(VueI18n)
//自定义语言包配置
const i18n = new VueI18n({
  messages: {
    "en": English,
    "vi-vn": Vietnam,
    "th": Thai,
  }
})

/*切換*/
export function SetLanguage (lang) {
  console.log(lang)
  i18n.locale = lang
  switch(lang){
    case 'th':
      store.commit('SETDEFAULTLAN','th')
      store.commit('SETLANDCODE',4)
      localStorage['Language'] = 'th'
      // Locale.use(thTH)
      break;
    case 'en':
      store.commit('SETDEFAULTLAN','en')
      store.commit('SETLANDCODE',5)
      localStorage['Language'] = 'en'
      // Locale.use(enUS)
      break;
    case 'vi-vn':
      store.commit('SETDEFAULTLAN','vi-vn')
      store.commit('SETLANDCODE',1)
      localStorage['Language'] = 'vi-vn'
      // Locale.use(viVN)
      break;
   
  }
}
export default i18n
