import Vue from 'vue'
import Router from 'vue-router'
import Zi from './components/ziyuan.vue'
import Tubiao from './components/tubiao.vue'
import Yggc from './components/yggc.vue'
import Yxbg from './components/yxbg.vue'
import Szyb from './components/szyb.vue'
import Index from './shouye/index'
import Zhtq from './components/zhtq'
import Pgbj from './components/pgbj'
import Pgjc from './components/pgjc'



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
            path:'/yxbg',
            component:Yxbg
        },
        {
            path:'/zhtq',
            component:Zhtq
        },
        {
            path:'/szyb',
            component:Szyb
        },
        {
            path:'/pgjc',
            component:Pgjc
        },
        {
            path:'/pgbj',
            component:Pgbj
        },
    ]
})