<template>
      <!-- 评估决策页面 -->
    <div>
        <!-- 评估决策组 -->
        <Pgbjjc ref='child'></Pgbjjc>
    </div>
</template>
<script>
import Pgbjjc from './pgbjjc'
export default {
    components:{
        Pgbjjc
    },
    mounted(){
        //调用子组件中的方法
        this.useziFn()
    },
    methods: {
        //使用子组件中方法
        useziFn(){
            this.$refs.child.Cli1()
            this.$refs.child.Cli2()
        }
    }
    
}
</script>

<style  scoped>

</style>