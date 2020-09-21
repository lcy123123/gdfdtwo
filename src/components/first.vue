<template>
  <div>
    <!-- 右边表单 -->
    <div class="right-top">
      <div class="right-t">
        评估数据统计图展示
        <button class="right-1-btn">×</button>
      </div>
      <el-form>
        <!-- <div class="form-first"> -->
        <el-form-item label="数据类型:" size="small">
          <el-select placeholder="请选择活动区域"></el-select>
        </el-form-item>
        <el-form-item label="频次选择:">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="年"></el-checkbox>
            <el-checkbox label="季"></el-checkbox>
            <el-checkbox label="月"></el-checkbox>
            <el-checkbox label="旬"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            checkList:[]
        }
    }
};
</script>
<style>
.right-top {
  width: 350px;
  height: 350px;
  position: absolute;
  top: 50px;
  right: 100px;
  border: 1px solid #0b1c72;
  /* color: white; */
}
.el-form-item__label {
  color: white;
}
/* .form-first{
    position: absolute;
    top:20px;
    left:10px
} */
.el-form-item {
  margin-top: 20px;
  margin-bottom: 0;
  margin-left: 15px;
}
.el-checkbox__label{
    color: white;
}
</style>