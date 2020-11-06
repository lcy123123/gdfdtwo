<template>
     <!-- 天气灾害页面 -->
    <div>
        <!-- 天气灾害组件 -->
        <Zhtq ref="child"></Zhtq>
    </div>
</template>

<script>
import Zhtq from './yxbgzhtq'
export default {
    mounted(){
        //调用子组件中方法
        this.useziFn()
    },
    components:{
        Zhtq
    },
    methods: {
        //使用子组件中的方法
        useziFn(){
            this.$refs.child.Cli1()
            this.$refs.child.Cli2()
        }
    }
}
</script>

<style  scoped>

</style>