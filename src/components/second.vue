<template>
<div class="right-second">
  <!-- 上边的 -->
  <div class="right-second1">
     <img class="y1" src='../assets/y2.png' alt="">
     <span class="y1-text">背景评估</span>
     <span @click="Cli1" class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
  </div>
  <!-- 下边的 -->
  <div class="right-second2">
    <img class="y1" src="../assets/s2.png" alt="">
    <span class="y1-text">综合评估</span>
    <span class="c2" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
  </div>
    <!-- 第二个下拉框 -->
   <div class="second2">
      <el-form>
        <el-form-item label="风能参数:">
          <el-checkbox>最大风速</el-checkbox>
          <el-checkbox>风功率密度</el-checkbox>
          <el-checkbox>第一风向</el-checkbox>
          <el-checkbox>平均风速</el-checkbox>
        </el-form-item>
        <el-form-item class="item2" label="影像要素:">
          
          <el-checkbox>海洋生态保护</el-checkbox>
          <el-checkbox>港口通航</el-checkbox>
          <el-checkbox>海底油气管道</el-checkbox>
          <el-checkbox>海底光/电缆</el-checkbox>
          <el-checkbox>气象灾害天气</el-checkbox>
          <el-checkbox>生态红线</el-checkbox>
          <el-checkbox>已规划风电场</el-checkbox>
          <el-checkbox>自然保护区</el-checkbox>
          <el-checkbox>海洋行政功能区划</el-checkbox>
        </el-form-item>
      </el-form>
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
 
  }
};
</script>
<style>
.right-second {
  width: 350px;
  height: 480px;
  border: 1px solid #0a1a84;
  position: absolute;
  top: 50px;
  right: 80px;
}
.right-second1{
  background: rgba(3,37,127,.5);
  border: 2px solid rgba(8,26,127,.5);
}
.right-second2{
  background: rgba(3,37,127,.5);
  border: 2px solid rgba(8,26,127,.5);
}
.el-form-item__label{
margin:0px 0px 20px 10px;
color: white;
}
.item2>.el-form-item__label{
margin:0px 0px 90px 10px;
color: white;
}
.el-form-item__content{
  line-height: 30px;
  margin-top: 6px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>