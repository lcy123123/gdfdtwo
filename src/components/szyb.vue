<template>
    <div>
      <!-- 风参数信息 -->
      <Fcsxx></Fcsxx>
    <!-- 五个小按钮 -->
    <Fiveli></Fiveli>
    <!-- 上边的 -->
    <div class="right bottom-line">
      <div class="right-top" @click="Cli1">
        <img class="y1" src='../assets/y1.png' alt="">
        <span class="y1-text">遥感观测</span>
        <span  class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-form>
          <el-form-item>
          <el-checkbox>平均风速</el-checkbox>
          <el-checkbox>平均风功率密度</el-checkbox>
          </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom" @click="Cli2" >
        <img class="y2" src="../assets/s2.png" alt="">
        <span class="y2-text">数值预报</span>
        <span  class="c2"  style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
         <div class="top-2">
        
           <el-checkbox class="b1">年平均风速</el-checkbox>
           <el-checkbox class="b2">月平均风速</el-checkbox>
           <el-checkbox class="b3">逐小时年平均风速 </el-checkbox>
           <el-checkbox class="b4">逐小时月平均风速</el-checkbox>
           <el-checkbox class="b5">年平均风功率密度 </el-checkbox>
           <el-checkbox class="b6">月平均风功率密度</el-checkbox>
           <el-checkbox class="b7">有效风速时数</el-checkbox>
           <el-checkbox class="b8">风切变系数</el-checkbox>
           <el-checkbox class="b9">威布尔分布形状参数</el-checkbox>
           <el-checkbox class="b10">威布尔分布尺度参数</el-checkbox>
           <el-checkbox class="b11">风向分布频率</el-checkbox>
           <el-checkbox class="b12">各向风功率密度分布频率</el-checkbox>
           <el-checkbox class="b13">各区间风速分布频率</el-checkbox>
           <el-checkbox class="b14">各区间风功率密度分布频率</el-checkbox>
           <el-checkbox class="b15">格点风参</el-checkbox>
           <!-- 右面的时间轴 -->
            <!-- <div>  <el-slider  class="sli1" v-model="a" min="0" max="200" step="40" range  :marks="marks"></el-slider></div> -->
            <div>  <el-slider  class="sli1" v-model="this.a" :max='200'  :step='40'   :marks="marks"></el-slider></div>
        </div>
    </div>
  </div>
</template>
<script>
import Fiveli from './fiveli'
import Fcsxx from './fcsxx'
import $ from 'jquery'
// 箭头朝下图片
import up from '../assets/up.png'
// 箭头朝上图片
import down from '../assets/down.jpg';
//遥感观测小图标
import y1 from '../assets/y1.png'
import y2 from '../assets/y2.png'
// 数值预报小图标
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
export default {
  components: {
     Fcsxx,
     Fiveli
   },
 data () {
   
     return {
         a: [''],   //问题：加双向数据绑定时复选框点击不了
         marks: {
          '0': '地面',
          '40': '40',
          '80': '80',
          '120': '120',
          '160':'160',
          '200':'200'
        }

     }
 },
  methods:{
  Cli1(){
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      
      if($('.y1').attr('src')==y1){
        //将小图标变成亮的
        $('.y1').attr('src',y2)
        //将背景变成蓝色
        $('.right-top').css({'background': 'rgba(3,37,127,.5)'})
        //将文字变成蓝色的
        $('.y1-text').css({'color':'#04BFEA'})
        //点击切换后面小三角
        $('.c1').find('i').attr('class','el-icon-caret-bottom')
      }else{
        //将小图标变成不亮的
        $('.y1').attr('src',y1)
        //将背景变成没有
        $('.right-top').css({'background': ' rgba(8,26,127,0)'})
        //将文字变成不亮的
        $('.y1-text').css({'color':'white'})
        //点击切换后面的小图标
        // $('.c1,.el-icon-caret-bottom').attr('class','el-icon-caret-right')
        $('.c1').find('i').attr('class','el-icon-caret-right')
        console.log($('.c1').find('i'))
      }
      //top1上滑
      $('.top-1').slideToggle(200)
     
    },
    //点击第二个
    Cli2(){
        if($('.y2').attr('src')==s2){
        //将小图标变成不亮的
        $('.y2').attr('src',s1)
        //将背景变成没有
        $('.right-bottom').css({'background': 'rgba(8,26,127,0)'})
        //将文字变成不亮的
        $('.y2-text').css({'color':'white'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-right')
      }else{
        //将小图标变成亮的
        $('.y2').attr('src',s2)
        //将背景变成蓝色
        $('.right-bottom').css({'background': 'rgba(3,37,127,.5)'})
        //将文字变成蓝色的
        $('.y2-text').css({'color':'#04BFEA'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-bottom')
      }
      //点击上滑
      $('.top-2').slideToggle(200)
    },
    tog(){
      // $('#t').attr('src',up)
      $('ul').slideToggle(200)
      //点击切换图标
      if($('#t').attr('src')==up){
        $('#t').attr('src',down)
      }else{
        $('#t').attr('src',up)
      }
    }
  }
}
</script>
<style  scoped>
.right{
  width: 360px;
  /* height: 300px; */
  border: 1px solid rgba(8,26,127,.5);
  position: absolute;
  right:15px;
  top:65px
}
.bottom-line{
  background: linear-gradient(to left,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to left,#01A2FE,#01A2FE) right bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) right bottom no-repeat;
   background-size: 2px 23px,23px 2px,2px 23px,23px 2px;
}
.fivebtn{
  position: absolute;
  top: 65px;
  right: 385px;
}
ul{
  display: none;
}
.tog{
  position: absolute;
  top:3px;
  right: 1px;
}
.right-top{
background: rgba(3,37,127,0);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.right-bottom{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.y1,.y2{
  width: 15px;
  height: 15px;
  margin-left: 10px;
  vertical-align: middle;
}
.y1-text,.y2-text{
  color: white;
  margin-left: 5px;
  vertical-align: middle;
  /* color: #04BFEA; */
}
.y2-text{
    color:#04BFEA ;
}
.top-11{
  color: white;
  font-size: 14px;
  padding: 20px;
}
.top-11>input{
  margin: 10px;
}
.top-1{
  display: none;
}
.top-2{
color: white;
display: block;
height: 250px;
}
.b1{
margin-left: 10px;
margin-top: 15px;
margin-right: 65px;
}
.b3{
  margin-left: 10px;
  margin-right: 29px;
}
.b5{
  margin-left: 10px;
  margin-right: 29px;
}
.b7{
  margin-left: 10px;
  margin-right: 53px;
}
.b9{
  margin-left: 10px;
  margin-right: 17px;

}
.b11{
  margin-left: 10px;
  margin-right: 53px;

}
.b13{
  margin-left: 10px;
  margin-right: 17px;

}
.b15{
  margin-left: 10px;
  margin-right: 17px;

}
.el-checkbox__label {
  color: white;
  font-size: 12px;
  margin-left: -3px;

}
.sli1{
  width: 280px;
  margin:10px 30px 30px 30px;
}
</style>