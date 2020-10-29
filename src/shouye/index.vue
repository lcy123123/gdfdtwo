<template>
  <div>
      <!-- 五个小按钮 -->
      <!-- <div class="five-btn" > -->
        <Fiveli style="position:absolute;right:22px;top:60px"></Fiveli>
      <!-- </div> -->
      <!-- 下面时间轴和输入框总div -->
    <div class="sjz-srk-z">
      <!-- 时间轴上面的输入框 -->
      <div class="sjz-srk">
        <el-form>
          <el-form-item>
           <el-select v-model="value" placeholder="请选择">
         <el-option
         v-for="item in options"
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
        <el-slider  v-model="value1"></el-slider>
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
    <div class="zy-b" v-if="(this.$route.path=='/'||this.$route.path=='/first')?true:false">
            <div class="tu">图例</div>
              <div class="zscdiv"></div>
              <div class="s1">中上层鱼类产卵场</div>
        </div>
  </div>
</template>
<script>
import Fiveli from '../components/fiveli'
export default {
  components: {
    Fiveli
  },
  data() {
    return {
      value1: 0,
      //风玫瑰状态值
      fmgflag:false,
      // 韦布尔状态值
      wbeflag:true,
     options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  },
  methods: {
    //点击跳转其他页面
    second: function() {
      // 跳转页面
      this.$router.push("/second");
    },
  
  },

  //钩子函数（加载完dom后调用加载图表方法）
  mounted(){
    //调用加载韦布尔图表方法
  //  this.Wbetb()
  }
}

</script>
<style>
/* 五个按钮的位置 */
.sjz-srk-z{
  /* border: 2px solid red; */
  position: relative;
  bottom: 240px;
  left:200px;
  /* height: 190px; */
  /* width: 900px; */
  display: block;
}
.sjz-srk{
  border: 2px solid rgb(0, 140, 255);
  /* height: 120px; */
  width: 105px;
  margin-left: 120px;
  position: absolute;
  bottom:-82px;
  left:42px
}


.small {
  width: 15px;
  height: 15px;
  background-color: #1e4292;
  /* background-color: rgb(230, 109, 109); */
  position: absolute;
  top: 60px;
  left: 70px;
  transform: rotate(45deg);
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
.el-slider__runway {
  height: 3px;
}
.el-slider__button {
  width: 12px;
  height: 12px;
}
.zscdiv{
  width: 40px;
  height: 15px;
  /* border:1px solid rgb(12, 150, 205); */
  border:1px solid #084C79;
  display: inline-block;
  margin-right: 5px;
  top:20px;
  vertical-align: bottom;
  background-color: #0C96CD;

}
.s1{
  display: inline-block;
  vertical-align: bottom;
}

.btn-1{
  font-size: 20px;
  color: #03DEE4;
  float:right;
  margin-top:-5px;
  /* 变小手 */
  cursor: pointer;
}

</style> 