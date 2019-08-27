// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Global from 'Utils/global'
import './style/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// 初始化static配置信息
Global.init().then(() => {
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}).catch((err) => {
  window.alert('global init err' + err)
})
