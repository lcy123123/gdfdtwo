<template>
  <div>
    <div class="zy-b">
      <div class="tu">图例</div>
      <div>
        <img class="i1" src="../assets/lv.png" alt />
        <span class="s1">建设中</span>
      </div>
      <div>
        <img class="i1" src="../assets/lan.png" alt />
        <span class="s1">建设完成</span>
      </div>
    </div>
    <div class="right">
      <div class="right-t">
        风资源评估与决策
        <button class="right-1-btn">×</button>
      </div>
      <div class="box">
        <span class="t1">风能参数:</span>
        <div class="box-1">
          <el-checkbox class="box1" label="最大风速"></el-checkbox>
          <el-checkbox class="box1" label="第一风向"></el-checkbox>
        </div>
        <div>
          <el-checkbox class="box1" label="风功率密度"></el-checkbox>
          <el-checkbox class="box1" label="平均风速"></el-checkbox>
        </div>
      </div>
      <div class="box">
        <span class="t2">影像要素:</span>
        <div>
          <el-checkbox class="box1" label="海洋行政"></el-checkbox>
          <el-checkbox class="box1" label="港口通航"></el-checkbox>
          <el-checkbox class="box1" label="海底光"></el-checkbox>
          <el-checkbox class="box1" label="生态红线"></el-checkbox>
          <el-checkbox class="box1" label="气象灾害天气"></el-checkbox>
        </div>
        <div class="box-1">
          <el-checkbox class="box1" label="海洋生态保护"></el-checkbox>
          <el-checkbox class="box1" label="海洋油气管道"></el-checkbox>
          <el-checkbox class="box1" label="自然保护区"></el-checkbox>
          <el-checkbox class="box1" label="已规划风电场"></el-checkbox>
        </div>
      </div>
      <!-- 选择日期 -->
      <span class="t3">开始时间:</span>
      <div class="time">
        <el-date-picker v-model="value1" type="date" size="small" placeholder="选择日期"></el-date-picker>
      </div>
      <!-- <div class="block"></div> -->
      <!-- 下拉框 -->
      
     <div class="xlk">
         <span class="t4">选择模型：</span>
         <el-select v-model="value" placeholder="请选择" size='small'>
        <!-- <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option> -->
      </el-select>
     </div>
     <div class="xlk2">
         <span class="t5">评估名称：</span>
         <el-select v-model="value" placeholder="请选择" size='small'>
        <!-- <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option> -->
      </el-select>
     </div>
     <button class="btn">开始评估</button>
    </div>
    <!-- <div class="sjz-z">
        <div>
            <span class="btn-1"><img src="../assets/001.png" alt=""></span>
            <span class="btn-2"><img src="../assets/002.png" alt=""></span>
        </div>
        中间时间轴
        <div class="sjz-middle"><img class="sjz-img" src="../assets/sjz.png" alt="">
         <el-slider v-model="value1"></el-slider>
        </div>
        <div>
          <span class="btn-3"><img src="../assets/003.png" alt=""></span>
          <span class="btn-4"><img src="../assets/004.png" alt=""></span>
          <span class="btn-5"><img src="../assets/005.png" alt=""></span>
          <span class="btn-6"><img src="../assets/006.png" alt=""></span>
          <span class="btn-7"><img src="../assets/007.png" alt=""></span>
        </div>
    </div> -->
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
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      
    };
    
  }
};
</script>
<style scoped>
.zy-b {
  width: 120px;
  height: 100px;
  position: absolute;
  bottom: 50px;
  left: 30px;
  color: blanchedalmond;
  border: 1px solid #01caeb;
  padding: 10px;
  /* padding-top: 10px; */
}
.i1 {
  vertical-align: middle;
  margin-right: 20px;
}
.s1 {
  vertical-align: middle;
}
.tu {
  margin: 10px 0;
}
.right {
  width: 320px;
  height: 420px;
  /* background-color: #04053b; */
  position: absolute;
  top: 40px;
  right: 78px;
  border: 1px solid #01caeb;
}
.box {
  color: white;
  display: flex;
  margin: 10px;
}

label {
  margin-top: 6px;
  margin-right: 0;
  font-size: 10px;
}
.t1 {
  width: 100px;
  height: 30px;
  font-size: 14px;
  margin-top: 6px;
}
.t2 {
  width: 250px;
  height: 30px;
  font-size: 14px;
  margin-top: 6px;
}
.t3 {
  color: white;
  font-size: 14px;
  margin-left: 10px;
}
.t4 {
  color: white;
  font-size: 14px;
  position: absolute;
  bottom: 8px;
  left: -70px;
}
.t5 {
  color: white;
  font-size: 14px;
  position: absolute;
  bottom: 6px;
  left: -70px;
}
.time {
  position: absolute;
  top: 235px;
  left: 78px;
}
.xlk{
    position:absolute;
    bottom: 110px;
    left: 78px;
}
.xlk2{
    position:absolute;
    bottom: 70px;
    left: 78px;
}
.btn{
    width: 80px;
    height: 40px;
    position: absolute;
    bottom:20px;
    left:120px;
    background:#057EA0;
    border-radius: 10%;
    color: white;
}
/* .sjz-z{
    width: 610px;
    height: 50px;
    position:absolute;
    bottom: 20px;
    left:25%;
    border: 1px solid #091673;
    border-radius: 30px;
}
.sjz-middle{
  position: absolute;
  left: 70px;
  top: 10px;
  width: 400px;
  height: 100%;
}
.sjz-img{
    width: 400px;
    height: 17px;
    float: left;
    margin: 0 auto;
}
.btn-1>img{
    width: 20px;
    height: 20px;
    position: absolute;
    left:10px;
    top:18px
}
.btn-2>img{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 36px;
    top:18px
}
.btn-3>img{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 115px;
    top:15px
}
.btn-4>img{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 90px;
    top:15px
}
.btn-5>img{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 65px;
    top:15px
}
.btn-6>img{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 40px;
    top:15px
}
.btn-7>img{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top:15px
} */
</style>