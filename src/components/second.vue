<template>
<div class="right-second bottom-line">
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
        <el-form-item>

      <!-- 选择日期   开始时间   结束时间 -->
         <div class="block">
           <label class="start">开始时间：</label>
           <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
           <label class="start">结束时间：</label>
           <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
         </div>
        </el-form-item>
          <!-- 第一个下拉框 -->
          <div class="second-xlk">
          <el-form-item label="选择模型：">
            <el-select>
              <!-- <el-option label="风资源评估模型一"></el-option>
              <el-option label="风资源评估模型二"></el-option> -->
            </el-select>
          </el-form-item>
          <!-- 第二个下拉框 -->
          <el-form-item label="评估名称：">
            <el-select>
              <!-- <el-option label="风资源评估模型一"></el-option>
              <el-option label="风资源评估模型二"></el-option> -->
            </el-select>
          </el-form-item>
          </div>
            <!-- 按钮  -->
            <el-form-item>
              <el-button type="primary">开始评估</el-button>
            </el-form-item>

      </el-form>
       
       <!-- 两个下拉框 -->
       
         
   </div>
  </div>
</template>
<script>
export default {
  data() {
  return {
    
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        // value1: '',
      }
    

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
/* 元素下面两个角的边框 */
.bottom-line{
  background: linear-gradient(to left,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to left,#01A2FE,#01A2FE) right bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) right bottom no-repeat;
   background-size: 2px 23px,23px 2px,2px 23px,23px 2px;
}
.right-second1{
  background: rgba(3,37,127,.5);
  border: 2px solid rgba(8,26,127,.5);
}
.right-second2{
  background: rgba(3,37,127,.5);
  border: 1px solid rgba(8,26,127,.5);
}
.second2{
  background-color:rgba(0,3,44,.5) ;
  height: 429px;
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
/* 开始时间和结束时间 文字 */
.start{
  color: white;
  font-size: 14px;
  margin-left: 10px;
}
/* 开始时间和结束时间input */
.el-input__inner{
  background: rgba(3,37,127,0);
  width: 95px;
  height: 26px;
}

.block{
  display: inline-block;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 92px;
}
/* 下边两个下拉框的样式 */
.second-xlk .el-input__inner{
width: 120px;
margin-left: -10px;
/* margin-bottom: 0px; */
}
.second-xlk .el-form-item__label {
  margin: 0px 10px;
}
.el-button--primary{
  width: 97px;
  height: 37px;
  background-color: #027A9D;
  margin-top: 28px;
  margin-left: 126px;
}
</style>