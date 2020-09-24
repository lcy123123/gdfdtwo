<template>
    <div>
        <!-- 右上边 -->
        <div class="right">
           <div class="right-t">风速和风能频次分布直方图<button  class="right-1-btn">×</button></div>
        </div>
         <!-- 图例 -->
         <div class="zy-b">
            <div class="tu">图例</div>
            <div><img class="i1" src="../assets/lv.png" alt=""><span class="s1">建设中</span></div>
            <div><img class="i1" src="../assets/lan.png" alt=""><span class="s1">建设完成</span></div>
        </div>
    </div>
</template>
<script>
// import $ from 'jquery'
export default {
    data () {
        return {
            
        }
    },
    methods: {
       
    }
    
}
</script>
<style  scoped>
.right{
    width: 400px;
    height: 400px;
    position:absolute;
    top:50px;
    right: 70px;
    border: 1px solid red;
}
</style>