<template>
  <div>
    <!-- 五个小按钮 -->
    <div class="fivebtn">
       <div class="tog"><img  @click="tog" id="t" src="../assets/down.jpg" alt="" /></div>
      <ul>
        <li @click="first"><img src="../assets/01.png" alt="" /></li>
        <li @click="second"><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
      </ul>
    </div>
    <!-- 上边的 -->
    <div class="right">
      <div class="right-top">
        <img class="y1" src='../assets/y2.png' alt="">
        <span class="y1-text">遥感观测</span>
        <span @click="Cli1" class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-checkbox>平均风速</el-checkbox>
          <el-checkbox>平均风功率密度</el-checkbox>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom">
        <img class="y2" src="../assets/s2.png" alt="">
        <span class="y2-text">数值预报</span>
        <span @click="Cli2"  class="c2" :v-model="flag" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
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
            <div>  <el-slider  class="sli1" v-model="value" min="0" max="200" step="40" range  :marks="marks"></el-slider></div>
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
      value: 0,
        marks: {
          0: '地面',
          40: '40',
          80: '80',
          120: '120',
          160:'160',
          200:'200'
  }}},
  methods:{
  Cli1(){
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      if($('.y1').attr('src')==y2){
        //将小图标变成不亮的
        $('.y1').attr('src',y1)
        //将背景变成没有
        $('.right-top').css({'background': ''})
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

        if($('.y2').attr('src')==s2){
        //将小图标变成不亮的
        $('.y2').attr('src',s1)
        //将背景变成没有
        $('.right-bottom').css({'background': ''})
        //将文字变成不亮的
        $('.y2-text').css({'color':'white'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-right')

      }else{
        //将小图标变成亮的
        $('.y2').attr('src',s2)
        //将背景变成蓝色
        $('.right-top').css({'background': 'rgba(3,37,127,.5)'})
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
      if($('#t').attr('src')==down){
        $('#t').attr('src',up)
      }else{
        $('#t').attr('src',down)
      }
    }
  }
};
</script>
<style>
.right{
  width: 360px;
  /* height: 300px; */
  border: 2px solid rgba(8,26,127,.5);
  position: absolute;
  right:15px;
  top:65px
}
.fivebtn{
  /* border:1px solid red; */
  /* width: 20px;
  height: 40px; */
  position: absolute;
  top: 65px;
  right: 385px;
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
/* border: 1px solid red; */
/* background: rgba(3,37,127,.5); */
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
  color: #04BFEA;
}

.top-11{
  color: white;
  font-size: 14px;
  margin: 20px;
  /* display: flex; */
}
.top-11>input{
  /* flex: 1; */
  margin: 10px;
}
.top-2{
color: white;
}
.b1{
margin-left: 10px;
margin-top: 15px;
margin-right: 108px;
}
.b3{
  margin-left: 10px;
  margin-right: 82px;
}
.b5{
  margin-left: 10px;
  margin-right: 43px;
}
.b7{
  margin-left: 10px;
  margin-right: 17px;
}
.b9{
  margin-left: 10px;
  margin-right: 4px;

}

 
.el-checkbox__label {
  color: white;
  font-size: 13px;
  margin-left: -3px;

}
.sli1{
  width: 280px;
  margin:10px 30px 30px 30px;
}
</style>