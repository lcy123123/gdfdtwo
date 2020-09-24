<template>
  <div>
    <!-- 右边表单 -->
    <div class="right-top">
      <div class="right-t">
        评估数据统计图展示
        <button class="right-1-btn">×</button>
      </div>
      <el-form ref="form" :model="form">
        <!-- <div class="form-first"> -->
        <el-form-item v-model="form.region" label="数据类型:" size="small">
          <el-select placeholder="请选择数据类型">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预报数据:" size="small">
          <el-select placeholder="请选择预报数据">
             <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频次选择:" style="margin-top: -10px;">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="年"></el-checkbox>
            <el-checkbox label="季"></el-checkbox>
            <el-checkbox label="月"></el-checkbox>
            <el-checkbox label="旬"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时间：" style="margin-top: 0px;">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              size="small"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 时间轴 -->
        <el-form-item label="层高：" style="margin-top: 0px;">
          <div class="block">
      
            <el-slider  style=" width: 70%;" class="sli" v-model="value1"  :marks="marks" show-stops="false"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="统计类别:" size="small" style="margin-top:3px">
          <el-select placeholder="请选择统计类别">
             <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="last" size="small">开始播放</el-button>
        </el-form-item>
      </el-form>
    </div>
     <div class="zy-b">
            <div class="tu">图例</div>
            <div><img class="i1" src="../assets/lv.png" alt=""><span class="s1">可规划</span></div>
            <div><img class="i1" src="../assets/lan.png" alt=""><span class="s1">未规划</span></div>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      checkList: [],
      value1:0,
      marks:{
        10:'10',
        30:'30',
        50:'50',
        70:'70',
        90:'90',
        100:'100',
      }
    };
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
  margin-top: 15px;
  margin-bottom: 0;
  margin-left: 15px;
}
.el-checkbox__label {
  color: white;
}
.el-range-editor--small.el-input__inner {
  width: 270px;
}

.sli{
  position: absolute;
  left: 60px;
  width: 300px;
  height: 6px;
  /* opacity: 0.5; */
}
.el-slider__marks-text{
  margin-top: -5px;
}
.last{
  position: absolute;
  left:120px;
  background-color: #047D9E;
  color: white;

}
.el-input__inner{
  background: rgba(0,0,0,0.4);
  border: 1px solid #045379;
}
.el-checkbox__inner {
  background: rgba(0,0,0,0.4);
  border: 1px solid #045379;
}
.el-date-editor .el-range-input {
  background: rgba(0,0,0,0.4);
  /* border: 1px solid #045379; */
}
</style>