<template>
  <div class="right-second">
    <div class="right-t">
      风速和风能频次分布直方图
      <button class="right-1-btn">×</button>
    </div>
    <el-form>
      <el-form-item>
        <el-select size="small" style="margin-left:15px"></el-select>
      </el-form-item>
      <el-form-item label="影像要素:" style="margin-top: 0px;margin-left:30px">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="海洋行政功能区别"></el-checkbox>
          <el-checkbox label="海洋生态保护"></el-checkbox>
          <el-checkbox label="港口通航"></el-checkbox>
          <el-checkbox label="海底汽油管道"></el-checkbox>
          <el-checkbox label="海底光/电缆"></el-checkbox>
          <el-checkbox label="自然保护区"></el-checkbox>
          <el-checkbox label="生态红线"></el-checkbox>
          <!-- <el-checkbox label="已规划风电场"></el-checkbox>
          <el-checkbox label="气象灾害天气"></el-checkbox>-->
        </el-checkbox-group>
      </el-form-item>
      <div style="color:white;font-size:14px;margin-left:30px">专题制图</div>
      <el-form-item label="类型:" style="margin-top: 0px;margin-left:50px">
        <el-select size="small" style="width:90px"></el-select>
        <span style="color:white;margin:0 10px">DPI:</span>
        <el-select size="small" style="width:100px"></el-select>
      </el-form-item>
      <el-button class="last" style="margin-left:20px;margin-top:10px;width:90px" size="small">下载</el-button>
      <el-form-item label="决策发布" style="margin-left:30px">
          <span  class="sp">地址：</span>
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          style="border:1px solid #064F78;margin-top:40px;width:180px;height:25px;color:width; margin-left:60px;"
        >
          <el-button size="small"  style="height:25px;background-color:#047D9E;color:white;position:absolute;top:40px">...</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top:0px">
        <el-select size="small" style="margin-left:15px;"></el-select>
      </el-form-item>
      <el-form-item style="margin-top:0px">
        <el-select size="small" style="margin-left:15px">
          <!-- <option value="">lalalal</option> -->
        </el-select>
      </el-form-item>
    </el-form>
    <!-- <select name="" id="">
      <option value="lalal">opopop</option>
    </select> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: [],
      fileList:''
    };
  },
  methods: {
    handlePreview:function(){},
    handleRemove:function(){},
    beforeRemove:function(){},
    handleExceed:function(){},
  }
};
</script>
<style scoped>
.right-second {
  width: 350px;
  height: 480px;
  border: 1px solid #0a1a84;
  position: absolute;
  top: 50px;
  right: 80px;
}
.el-checkbox-group {
  font-size: 14px;
}
.sp{
    color:white;
    position: absolute;
    left:20px;
    top:32px
}
.el-button--small, .el-button--small.is-round {
    margin-left: 190px;
    /* width: 30px;
    height: 20px; */
}
/* .el-upload{
    position:absolute;
    bottom: -4px;
    right:5px
} */
</style>