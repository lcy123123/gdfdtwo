import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import router from './router'

// import axios from 'axios'

// import Cesium from '../public/Cesium/Cesium'
// Vue.prototype.Cesium=Cesium;

// Vue.prototype.widgets = widgets

// import 'element-ui/lib/theme-chalk/index.css';



//任意位置都可以使用
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// var viewer