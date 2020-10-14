<template>
  <div>
    <!-- 五个小按钮 -->
    <div class="fivebtn">
       <div class="tog"><img  @click="tog" id="t" src="../assets/up.png" alt="" /></div>
      <ul>
        <li @click="first"><img src="../assets/01.png" alt="" /></li>
        <li @click="second"><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
      </ul>
    </div>
    <!-- 上边的 -->
    <div class="right bottom-line">
      <div class="right-top">
        <img class="y1" src='../assets/y2.png' alt="">
        <span class="y1-text">遥感观测</span>
        <span @click="Cli1" class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
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
      <div class="right-bottom">
        <img class="y2" src="../assets/s1.png" alt="">
        <span class="y2-text">数值预报</span>
        <span @click="Cli2"  class="c2" :v-model="flag" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
         <div class="top-2">
        
           <el-checkbox class="b1">平均风速</el-checkbox>
           <el-checkbox class="b2">平均风功率</el-checkbox>
           <el-checkbox class="b3">有效风速时数 </el-checkbox>
           <el-checkbox class="b4">威布尔分布形状参数</el-checkbox>
           <el-checkbox class="b5">威布尔分布尺度系数 </el-checkbox>
           <el-checkbox class="b6">风向频率分布</el-checkbox>
           <el-checkbox class="b7">各项风功率密度分布频率</el-checkbox>
           <el-checkbox class="b8">各风速区间频率分布</el-checkbox>
           <el-checkbox class="b9">各风速区间风功率密度频率</el-checkbox>
           <el-checkbox class="b10">格点风参</el-checkbox>
           <!-- 右面的时间轴 -->
            <!-- <div>  <el-slider  class="sli1" v-model="value" min="0" max="200" step="40" range  :marks="marks"></el-slider></div> -->
            <div>  <el-slider  class="sli1" v-model="value"  max="200" step="40" range  :marks="marks"></el-slider></div>
        </div>
    </div>
  </div>
</template>
<script>
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
  data() {
    return {
      flag:true,
      // y1: require('../assets/y1.png'),
      // y2: require('../assets/y2.png'),

      // value: 0,   //问题：加双向绑定数据时复选框点不了
        marks: {
          0: '地面',
          40: '40',
          80: '80',
          120: '120',
          160:'160',
          200:'200'
  }}},
  methods:{
          //显示此页面时 默认展开第一个（遥感观测）
    Cli1(){
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      if($('.y1').attr('src')==y2){
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

      }else{
        //将小图标变成亮的
        $('.y1').attr('src',y2)
        //将背景变成蓝色
        $('.right-top').css({'background': 'rgba(3,37,127,.5)'})
        //将文字变成蓝色的
        $('.y1-text').css({'color':'#04BFEA'})
        //点击切换后面小三角
        $('.c1').find('i').attr('class','el-icon-caret-bottom')

      }
      //top1上滑
      $('.top-1').slideToggle(200)

     
  
    },


    //点击第二个
    Cli2(){

        if($('.y2').attr('src')==s1){
        //将小图标变成亮的
        $('.y2').attr('src',s2)
        //将背景变成有
        $('.right-bottom').css({'background': 'rgba(8,26,127,.5)'})
        //将文字变成亮的
        $('.y2-text').css({'color':'#04BFEA'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-bottom')

      }else{
        //将小图标变成不亮的
        $('.y2').attr('src',s1)
        //将背景变成无色
        $('.right-bottom').css({'background': 'rgba(3,37,127,0)'})
        //将文字变成白色的
        $('.y2-text').css({'color':'white'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-right')
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
};
</script>
<style>
.right{
  width: 360px;
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
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
}
.right-bottom{
border: 2px solid rgba(8,26,127,.5);
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
}
.y1-text{
  color: #04BFEA;
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
  background-color:rgba(0,3,44,.5) ;
}
.top-2{
  height: 190px;
color: white;
display: none;
background-color:rgba(0,3,44,.5) ;

}
.b1{
margin-left: 10px;
margin-top: 15px;
margin-right: 108px;
}
.b3{
  margin-left: 10px;
  margin-right: 84px;
}
.b5{
  margin-left: 10px;
  margin-right: 48px;
}
.b7{
  margin-left: 10px;
  margin-right: 24px;
}
.b9{
  margin-left: 10px;
  margin-right: 12px;
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