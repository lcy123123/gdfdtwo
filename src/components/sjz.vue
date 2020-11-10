<template>
    <div class="sjz-srk-z">
      <!-- 时间轴上面的输入框 -->
      <div class="sjz-srk">
        <el-form>
          <el-form-item label="年份:">
           <el-select v-model="value1" placeholder="请选择">
         <el-option
         v-for="item in options1"
         :key="item.value"
         :label="item.label"
         :value="item.value">
         </el-option>
         </el-select>
          </el-form-item>
          
          <el-form-item label="月份:">
           <el-select v-model="value2" placeholder="请选择">
         <el-option
         v-for="item in options2"
         :key="item.value"
         :label="item.label"
         :value="item.value">
         </el-option>
         </el-select>
          </el-form-item>
        </el-form>
        
      </div>
    <!-- 时间轴 -->
    <div class="sjz-z" v-if="this.$route.path!='/tb'?true:false">
      <div>
        <span class="btn-1"><img src="../assets/001.png" alt=""/></span>
        <span class="btn-2"><img src="../assets/002.png" alt=""/></span>
      </div>
      <!-- 中间时间轴 -->
      <div class="sjz-middle">
        <img class="sjz-img" src="../assets/sjz.png" alt="" />
        <el-slider  v-model="value"></el-slider>
      </div>
      <div>
        <span class="btn-3"><img src="../assets/003.png" alt=""/></span>
        <span class="btn-4"><img src="../assets/004.png" alt=""/></span>
        <span class="btn-5"><img src="../assets/005.png" alt=""/></span>
        <span class="btn-6"><img src="../assets/006.png" alt=""/></span>
        <span class="btn-7"><img src="../assets/007.png" alt=""/></span>
      </div>
    </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
        value1: 2019,
        options1:[],
        value2: 1,
        options2:[],
       
    };
  },
  methods:{
      //动态option复制
      initOption:function(){
          //1.当前年份
          let year=new Date().getFullYear();
          console.log(year)
          for(var i=2010;i<=year;i++){
              this.options1.push({label:i,value:i,key:i})

          }
          let month=new Date().getMonth()+3;
          for(var j=1;j<=month;j++){
            this.options2.push({label:j,value:j,key:j})
          }
      }
  },
  mounted(){
      this.initOption()
  }
}
</script>
<style>
.sjz-srk-z{
  position: relative;
  bottom: 240px;
  left:200px;
  display: block;
}
.sjz-srk{
  border: 2px solid rgb(0, 140, 255);
  height: 120px;
  width: 152px;
  margin-left: 120px;
  position: absolute;
  bottom:-82px;
  left:42px
}
.sjz-z {
  width: 610px;
  height: 50px;
  position: absolute;
  bottom: -140px;
  left: 12%;
  border: 1px solid #091673;
  border-radius: 30px;
}
.sjz-middle {
  position: absolute;
  left: 70px;
  top: 10px;
  width: 400px;
  height: 100%;
}
.sjz-img {
  width: 400px;
  height: 17px;
  float: left;
  margin: 0 auto;
}
.btn-1 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 18px;
}
.btn-2 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 36px;
  top: 18px;
}
.btn-3 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 115px;
  top: 15px;
}
.btn-4 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 90px;
  top: 15px;
}
.btn-5 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 65px;
  top: 15px;
}
.btn-6 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 40px;
  top: 15px;
}
.btn-7 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.el-form-item__label{
  margin: 0px 0px 7px 2px;
}

</style>