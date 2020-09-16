import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import echarts from 'echarts'
import router from './router'


//任意位置都可以使用
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
