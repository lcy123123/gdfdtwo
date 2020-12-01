<template>
     <!-- 天气灾害页面 -->
    <div>
        <!-- 天气灾害组件 -->
        <Zhtq ref="child"></Zhtq>
        <!-- 时间轴 -->
        <Sjz style='display:none'></Sjz>
        <ColorBar/>
    </div>
</template>

<script>
import Zhtq from './yxbgzhtq'
import Sjz from './sjz'
import ColorBar from './colorBar'

export default {
    mounted(){
        //调用子组件中方法
        this.useziFn()
    },
    components:{
        Zhtq,
        Sjz,
        ColorBar
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
.radio-tfpc{
  margin-left: 24px;
  margin-top:32px;
  bottom: -42px;
  left: -23px;
  display: block;
}
</style>