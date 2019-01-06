// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'                        //请求
Vue.prototype.$axios=axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import VueLazyLoad from 'vue-lazyload'           //懒加载
Vue.use(VueLazyLoad,{
    error:'../static/imgs/lose.jpg',
    loading:'../static/imgs/loading.gif'
})
import Viewer from 'v-viewer'       //加载viewer图片预览器
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
