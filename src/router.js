import Vue from 'vue'
import Router from 'vue-router'
import Zi from './components/ziyuan.vue'
import Tubiao from './components/tubiao.vue'


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
        }
    ]
})