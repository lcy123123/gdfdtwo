<template>
  <div>
    <!-- 左面第一个图表 -->
    <div class="left-1">
      <div class="div-btn">风速月变化<button class="btn-1">×</button></div>
      <!-- 折线统计图 -->
      <div id="main-left-1" style="width:320px;height:200px;position:absolute;top:-20px;left:20px"></div>
    </div>
    <!-- 左面第二个图表 -->
    <div class="left-2">
      <div class="div-btn">风功率密度统计<button class="btn-1">×</button></div>
      <div id="main-left-2" style="width:320px;height:200px;position:absolute;top:-10px;left:20px"></div>


    </div>
    <!-- 左面第三个图表 -->
    <div class="left-3">
      <div class="div-btn">有效风速<button class="btn-1">×</button></div>
      <div id="main-left-3" style="width:320px;height:200px;position:absolute;top:-10px;left:20px"></div>


    </div>
    <!-- 右面第一个图表 -->
    <div class="right-1">
           <div class="div-btn">风向统计<button class="btn-1">×</button></div>
           <div id="main-left-4" style="width:300px;height:140px;position:absolute;top:22px;right:0px"></div>
          


    </div>
    <!-- 右面第二个图表 -->
    <div class="right-2">
      <div class="div-btn">遥感数据对比<button class="btn-1">×</button></div>
      <div id="main-left-5" style="width:320px;height:200px;position:absolute;top:-10px;right:0px"></div>


    </div>
    <!-- 右面第三个图表 -->
    <div class="right-3">
      <div class="div-btn">浮标数据对比<button class="btn-1">×</button></div>
      <div id="main-left-6" style="width:320px;height:200px;position:absolute;top:-10px;right:0px"></div>


    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  }

}
import echarts from 'echarts';
function load(){
  // 折线统计图
var mychartsLeft1=echarts.init(document.getElementById("main-left-1"))
var optionLeft1={
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel:{
          color:'white'
        }
    },
    yAxis: {
        type: 'value',
        axisLabel:{
          color:'white',
          textStyle:{
            color:'white'
          }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
mychartsLeft1.setOption(optionLeft1)
//柱状图1
var mychartsLeft2=echarts.init(document.getElementById("main-left-2"))
var optionLeft2={
   color:['#54A8F1'],
    legend: {
        orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',  
        color:['white'],
         padding:[0,50,20,0],
           textStyle: { //图例文字的样式
                            color: 'white',
                        },
        data: ['平均风功率密度'],
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel:{
              color:'white'
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '平均风功率密度统计W/m²',
            min: 0,
            max: 1000,
            interval: 200,
            axisLabel: {
                formatter: '{value}',
                color:'white',
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
    ],
    series: [
        {
            name: '平均风功率密度',
            type: 'bar',
            data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
            // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
        },
    ],
    
};
mychartsLeft2.setOption(optionLeft2)
//柱状图2
var mychartsLeft3=echarts.init(document.getElementById("main-left-3"))
var optionLeft3={
   color:['#54A8F1'],
    legend: {
        orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',  
        // color:['white'],
         padding:[0,50,20,0],
         textStyle:{
             color:'white'
         },
        data: ['有效风速频率'],
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel:{
              color:'white'
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '平均风功率密度统计W/m²',
            min: 0,
            max: 1000,
            interval: 200,
            axisLabel: {
                formatter: '{value}',
                color:'white',
            },
            axisLine:{
                lineStyle:{
                    color:'white'
                }
            }
        },
        {
           
            
        }
    ],
    series: [
        {
            name: '有效风速频率',
            type: 'bar',
            data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
            // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
        },
       
    ]
};
mychartsLeft3.setOption(optionLeft3)
//玫瑰图
var mychartsLeft4=echarts.init(document.getElementById("main-left-4"))
var optionLeft4= {
    color:'green',
    angleAxis: {
        type: 'category',
        data: ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'],
        min:0,
        max:14,
        axisTick:{show:false},
        axisLabel:{margin:2,color:'white'}
    },
    radiusAxis: {
         name:'N',
         nameTextStyle:{
            color:'red'     //坐标轴文字颜色
        }
    },
    polar: {
         center: ['50%', '50%']
    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 3, 5, 1,3,4,5,6,7,8,9,9,2],
        coordinateSystem: 'polar',
        stack: 'a'
    }],
    legend: {
        show: true,
        data: ['A', 'B', 'C']
    }
};
   

mychartsLeft4.setOption(optionLeft4)
//右侧折线图1
var mychartsLeft5=echarts.init(document.getElementById("main-left-5"))
var optionLeft5={
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel:{
          color:'white'
        }
    },
    yAxis: {
        type: 'value',
        axisLabel:{
          color:'white',
          textStyle:{
            color:'white'
          }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};
mychartsLeft5.setOption(optionLeft5)
//右侧折线图2
var mychartsLeft6=echarts.init(document.getElementById("main-left-6"))
var optionLeft6={
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel:{
          color:'white'
        }
    },
    yAxis: {
        type: 'value',
        axisLabel:{
          color:'white',
          textStyle:{
            color:'white'
          }
        }
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    },{
        data: [820, 912, 941, 924, 1290, 1330, 1320],
        type: 'line',
    }]
};
mychartsLeft6.setOption(optionLeft6)

  }
window.onload=load;
</script>

<style scoped>
/* 图表样式 */
.left-1,.left-2,.left-3,.right-1,.right-2,.right-3{
  border:1px solid #0B1B7A;
  /* border-left:3px solid red;  */

  width: 340px;
  height: 170px;
}
.left-1{
  position: absolute;
  top:50px;
  left:20px
}
.left-2{
  position: absolute;
  top:235px;
  left:20px
}
.left-3{
  position: absolute;
  top:420px;
  left:20px
}
.right-1{
  position: absolute;
  top:50px;
  right:20px
}
.right-2{
  position: absolute;
  top:235px;
  right:20px
}
.right-3{
  position: absolute;
  top:420px;
  right:20px
}
.div-btn{
  color: white;
  background-color: #092F7A;
}
.btn-1{
  background-color: #092F7A;
  color: #03DEE4;
  float:right;
}

</style>