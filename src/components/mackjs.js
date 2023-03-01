import Vue from 'vue'
import Popup from './loginPop.vue'
import swPopup from './swPop.vue'
import inputPopup from './inputPop.vue'
import publicPop from './publicPop.vue'

const PopupBox = Vue.extend(Popup)
const PopupSW = Vue.extend(swPopup)
const PopupInput = Vue.extend(inputPopup)
const PublicPop = Vue.extend(publicPop)

Popup.install = function (data) {
  let instance = new PopupBox({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}
Popup.sw = function (data) {
  let instance = new PopupSW({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

Popup.srk = function (data) {
  let instance = new PopupInput({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

Popup.pbpop = function (data) {
  let instance = new PublicPop({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

export default Popup
