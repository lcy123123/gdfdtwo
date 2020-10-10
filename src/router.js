import Vue from 'vue'
import Router from 'vue-router'
import Zi from './components/ziyuan.vue'
import Tubiao from './components/tubiao.vue'
import Yggc from './components/yggc.vue'
import Second from './components/second.vue'
import Three from './components/three.vue'
// import Cesium from './components/cesium'


//使用路由
Vue.use(Router)

export default new Router({
    routes:[
        // {
        //     path:'*'
        // },
        {
            path:'/zi',
            component:Zi
        },
        {
            path:'/tb',
            component:Tubiao
        },
        {
            path:'/yggc',
            component:Yggc
        },
        {
            path:'/second',
            component:Second
        },
        {
            path:'/three',
            component:Three
        }
    ]
})