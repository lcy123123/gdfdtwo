<template>
   <!-- 评估背景页面 -->
    <div>
        <!-- 评估背景组件 -->
        <!-- 接收子组件传过来的值 -->
        <Pgbj @event2='addsl'></Pgbj>
    </div>
</template>
<script>
import Pgbj from './pgbjjc'
import bus from '../utils/eventBus'
export default {
    methods: {
        //接收子组件传过来的值
        addsl(){
            //发起兄弟组件的传值
            bus.$emit('addsl')
        }
    },
    components:{
        Pgbj
    }
    
}
</script>
<style  scoped>

</style>