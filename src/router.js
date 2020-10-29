import Vue from 'vue'
import Router from 'vue-router'
import Zi from './components/ziyuan.vue'
import Tubiao from './components/tubiao.vue'
import Yggc from './components/yggc.vue'
import Second from './components/second.vue'
import Three from './components/three.vue'
import Szyb from './components/szyb.vue'
import Index from './shouye/index'



//使用路由
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/index'
        },
        {
            path:'/index',
            component:Index
        },
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
        },
        {
            path:'/szyb',
            component:Szyb
        },
    ]
})