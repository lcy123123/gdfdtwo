<template>
  <div>
      <!-- 五个小按钮 -->
        <Fiveli style="position:absolute;right:22px;top:60px"></Fiveli>

         <!-- 下面时间轴和输入框总div -->
            <Sjz></Sjz>
         <!-- 图例 -->
          <div class="zy-b">
            <div class="tu">图例</div>
              <div class="zscdiv"></div>
              <div class="s1">中上层鱼类产卵场</div>
        </div>
  </div>
</template>
<script>
import Fiveli from '../components/fiveli'
import Sjz from '../components/sjz'
export default {
  components: {
    Fiveli,
    Sjz
  },
  data(){},
  methods: {
    initOption: function(){
      //1.当前年份
      let year=new Date().getFullYear;
      for(var i=2010;i<=year;i++){
        this.options.push("{label:"+i+"value:"+i+"}");
      }
    }
  
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
ul{
  display: block;
}
.el-radio__inner{
  border-radius: 0;
}
.el-radio__inner{
  background:rgba(1,58,181,0);
  /* background-color: red; */
  width: 13px;
  height: 13px;
}
.el-select .el-input__inner{
  /* width: 100px; */
  height: 30px;
}
</style> 