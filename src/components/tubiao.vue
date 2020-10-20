<template>
  <div>
    <!-- 左面第一个图表 -->
    <div class="left-1 bottom-line">
      <div class="div-btn">
        <span class="first-text">风速月变化</span><span class="btn-1">×</span>
      </div>
      <!-- 折线统计图 -->
      <div
        id="main-left-1"
        style="width:340px;height:200px;position:absolute;top:-8px;left:2px"
      ></div>
    </div>
    <!-- 左面第二个图表 -->
    <div class="left-2 bottom-line">
      <div class="div-btn">
        <span class="first-text">风功率密度统计</span
        ><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-2"
        style="width:340px;height:200px;position:absolute;top:-10px;left:10px"
      ></div>
    </div>
    <!-- 左面第三个图表 -->
    <div class="left-3 bottom-line">
      <div class="div-btn">
        <span class="first-text">有效风速</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-3"
        style="width:340px;height:200px;position:absolute;top:-10px;left:10px"
      ></div>
    </div>
    <!-- 右面第一个图表 -->
    <div class="right-1 bottom-line">
      <div class="div-btn">
        <span class="first-text">风向统计</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-4"
        style="width:340px;height:140px;position:absolute;top:22px;right:0px"
      ></div>
    </div>
    <!-- 右面第二个图表 -->
    <div class="right-2 bottom-line">
      <div class="div-btn">
        <span class="first-text">遥感数据对比</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-5"
        style="width:340px;height:200px;position:absolute;top:-10px;right:-12px"
      ></div>
    </div>
    <!-- 右面第三个图表 -->
    <div class="right-3 bottom-line">
      <div class="div-btn">
        <span class="first-text">浮标数据对比</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-6"
        style="width:340px;height:200px;position:absolute;top:-10px;right:-12px"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
import echarts from "echarts";
function load() {
  // 折线统计图
  var mychartsLeft1 = echarts.init(document.getElementById("main-left-1"));
  var optionLeft1 = {
    //图例
    legend: {
      orient: "horizontal",
      x: "center", //可设定图例在左、右、居中
      y: "bottom",
      color: ["white"],
      padding: [0, 50, 25, 0],
      textStyle: {
        //图例文字的样式
        color: "white"
      },
      data: ["平均风速", "风速标准差"]
    },
    //  x轴数据
    xAxis: {
      type: "category",
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      axisLabel: {
        color: "white",
        interval: 0, //坐标轴全部显示
        //x轴文字样式（大小）
        textStyle: {
          fontSize: 11
        }
      },
      //改变坐标轴线颜色（样式）
      axisLine: {
        lineStyle: {
          color: "#215496"
        }
      },
      //去掉坐标轴刻度线
      axisTick: {
        show: false
      },

    },
    // y轴数据
    yAxis: [
      {
        type: "value",
        name: "平均风速m/s", //坐标轴单位文字
        nameTextStyle: { color: "white", fontSize: 10 }, //坐标轴单位样式
        min: 0,
        max: 20,
        interval: 4,
        //坐标轴文字样式
        axisLabel: {
          textStyle: {
            color: "white",
            fontSize: 10
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
        //改变坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
        //去掉坐标轴刻度线
        axisTick: {
        show: false
      },

      },
      {
        type: "value",
        name: "风速标准差m/s",
        nameTextStyle: { color: "white", fontSize: 10 },
        min: 0,
        max: 10,
        interval: 2,
        //坐标轴文字颜色
        axisLabel: {
          textStyle: {
            color: "white",
            fontSize: 11
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
        //改变坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      }
    ],
    // 线的数据
    series: [
      // 第一条折线数据
      {
        name: "平均风速",
        data: [12, 5, 9, 14, 19, 13, 20, 16, 14, 18, 13, 11],
        type: "line",
        color: "#C69C13"
      },
      // 第二条折线的数据
      {
        name: "风速标准差",
        data: [20, 19, 11, 13, 12, 10, 6, 12, 14, 18, 13, 16],
        type: "line",
        color: "#1BA791"
      }
    ]
  };
  mychartsLeft1.setOption(optionLeft1);
  //柱状图1
  var mychartsLeft2 = echarts.init(document.getElementById("main-left-2"));
  var optionLeft2 = {
    //  柱状图颜色
    color: ["#54A8F1"],
    //  图例相关
    legend: {
      orient: "horizontal",
      x: "center", //可设定图例在左、右、居中
      y: "bottom",
      color: ["white"],
      padding: [0, 50, 20, 0],
      textStyle: {
        //图例文字的样式
        color: "white"
      },
      data: ["平均风功率密度"]
    },
    //x轴数据
    xAxis: [
      {
        type: "category",
        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        axisPointer: {
          type: "shadow"
        },
        //坐标轴文字颜色
        axisLabel: {
          color: "white",
          interval: 0, //坐标轴全部显示
          textStyle: {
            fontSize: 11
          }
        },
        //坐标轴线颜色
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
      
    ],
    // y轴数据
    yAxis: [
      {
        type: "value",
        name: "平均风功率密度W/m²",
        nameRotate: "0.1",
        nameTextStyle: { color: "white", fontSize: 10, marginLeft: "20" },
        min: 0,
        max: 1000,
        interval: 200,
        axisLabel: {
          // formatter: '{value}',
          color: "white",
          textStyle: {
            fontSize: 11
          }
        },
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
      {
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      }
    ],

    series: [
      // 柱状图数据
      {
        name: "平均风功率密度",
        type: "bar",
        data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
        // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
      }
    ]
  };
  mychartsLeft2.setOption(optionLeft2);
  //柱状图2
  var mychartsLeft3 = echarts.init(document.getElementById("main-left-3"));
  var optionLeft3 = {
    // 柱状图颜色
    color: ["#54A8F1"],
    //  图例相关
    legend: {
      orient: "horizontal",
      x: "center", //可设定图例在左、右、居中
      y: "bottom",
      // color:['white'],
      padding: [0, 50, 20, 0],
      textStyle: {
        color: "white"
      },
      data: ["有效风速频率"]
    },
    // x轴数据
    xAxis: [
      {
        type: "category",
        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        axisPointer: {
          type: "shadow"
        },
        //坐标轴文字颜色
        axisLabel: {
          color: "white",
          interval: 0, //坐标轴全部显示
          textStyle: {
            fontSize: 11
          }
        },
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
    ],
    // y轴数据
    yAxis: [
      {
        type: "value",
        name: "%",
        nameTextStyle: { color: "white", fontSize: 10 }, //坐标轴单位样式
        // nameRotate:'0.1',
        min: 0,
        max: 1000,
        interval: 200,
        //坐标轴文字颜色
        axisLabel: {
          formatter: "{value}",
          color: "white",
          textStyle: {
            fontSize: 11
          }
        },
        //改变坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
      {
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      }
    ],
    // 柱状图数据
    series: [
      {
        name: "有效风速频率",
        type: "bar",
        data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
        // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330]
      }
    ]
  };
  mychartsLeft3.setOption(optionLeft3);
  //玫瑰图
  var mychartsLeft4 = echarts.init(document.getElementById("main-left-4"));
  var optionLeft4 = {
    //玫瑰图颜色
    color: "#01BA45",
    //圆圈相关(角度轴)
    angleAxis: {
      type: "category",
      data: ["NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],
      //外边圆圈上的刻度值
      axisTick: { show: false },
      //外面圆圈文字的颜色
      axisLabel: { margin: 2, color: "white",fontSize:10,lineStyle:{color:'#020172'} },
      axisLine:{
            lineStyle:{color:'#020172'}
        },
      //网格线的颜色
      splitLine:{
        show:true,
        lineStyle:{color:['#020172']}
      }
    },
    //数轴相关
    radiusAxis: {
      name: "N",
      nameTextStyle: {
        // color: "red" //坐标轴文字颜色
      },
      min:0,
      max:18,
      interval:3,
      axisLabel:{
        color:'white'
      },
      //去掉刻度线
      axisTick:{show:false},
      //坐标轴颜色
      axisLine:{
        lineStyle:{color:'#020172'}
      },
      //网格线的颜色
      splitLine:{
        show:true,
        lineStyle:{color:['#020172']}
      }
    },
    polar: {
      center: ["50%", "50%"]
    },
    //数据
    series: [
      {
        type: "bar",
        data: [1, 2, 3, 4, 3, 5, 1, 3, 4, 5, 6, 7, 8, 9, 1],
        coordinateSystem: "polar",
        stack: "a"
      }
    ],

  };

  mychartsLeft4.setOption(optionLeft4);
  //右侧折线图1
  var mychartsLeft5 = echarts.init(document.getElementById("main-left-5"));
  var optionLeft5 = {
     //  图例相关
    legend: {
      orient: "horizontal",
      x: "center", //可设定图例在左、右、居中
      y: "bottom",
      // color:['white'],
      padding: [0, 50, 20, 0],
      textStyle: {
        color: "white"
      },
      data: ["风速",'风功率密度']
    },
    //x轴数据
    xAxis: {
      type: "category",
      data: ['0','1','2','3',"4","5","6","7","8","9","10","11","12",'13','14','15','16','17','18','19','20','21','22','23'],
      axisLabel: {
        color: "white",
        // interval: 0, //坐标轴全部显示
        textStyle: {
          fontSize: 11
        }
      },
      //改变坐标轴线颜色（样式）
      axisLine: {
        lineStyle: {
          color: "#215496"
        }
      },
        //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
    },
    //y轴数据
    yAxis: [
      {
        name:'风速m/s',
        nameTextStyle:{color:'white',fontSize:10},
        type: "value",
        min:0,
        max:30,
        interval:10,
        //坐标轴文字颜色
        axisLabel: {
          color: "white",
          textStyle: {
            color: "white",
            fontSize: "11"
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
        //改变坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
      {
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      }
    ],
    series: [
      {
        name:'风速',
        data: [20, 12, 10, 14, 19, 13, 20,19,9,12,10,19,22,14,19,24,19,26,16,23,18,19,20,30],
        type: "line",
        color:'#7E01DB',
        // 折现下面的区域样式
        areaStyle: {
          normal: {
             color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                         {offset: 0, color: 'rgba(116,1,194,1)'},
                         {offset: 0.5, color: 'rgba(116,1,194,.7)'},
                         {offset: 1, color: 'rgba(116,1,194,.2)'}
                        ]  )
                  }
        }
      },
      {
        name:'风功率密度',
        data: [10, 10, 8, 9, 16, 12, 10,11,5,9,8,19,12,10,12,24,13,23,11,9,16,12,10,13],
        type: "line",
        color:'#42CF74',
        // 折现下面的样式
        areaStyle: {
               normal: {
             color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                         {offset: 0, color: 'rgba(69,201,130,1)'},
                         {offset: 0.5, color: 'rgba(69,201,130,.7)'},
                         {offset: 1, color: 'rgba(69,201,130,.2)'}
                        ]  )
                  }
        }
      }
    ]
  };
  mychartsLeft5.setOption(optionLeft5);
  //右侧折线图2
  var mychartsLeft6 = echarts.init(document.getElementById("main-left-6"));
  var optionLeft6 = {
    //x轴数据
    xAxis: {
      type: "category",
      data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      //坐标轴文字颜色
      axisLabel: {
        color: "white",
        interval: 0, //坐标轴全部显示
        fontSize: "11"
      },
      //改变坐标轴线颜色（样式）
      axisLine: {
        lineStyle: {
          color: "#215496"
        }
      },
        //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
    },
    //y轴数据
    yAxis: [
      {
        name:'风速m/s',
        //坐标轴名称文字颜色（样式）
        nameTextStyle:{color:'white',fontSize:10},
        type: "value",
        min:0,
        max:30,
        interval:10,
        //坐标轴文字颜色
        axisLabel: {
          textStyle: {
            color: "white",
            fontSize: "11"
          }
        },
        //改变网格线样式
        splitLine: {
          show: true,
          lineStyle: { color: ["#215496"] }
        },
        //改变坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      },
      {
        //坐标轴线颜色（样式）
        axisLine: {
          lineStyle: {
            color: "#215496"
          }
        },
          //去掉坐标轴刻度线
        axisTick: {
        show: false
      },
      }
    ],
    //数据
    series: [
      {
        data: [20, 12, 10, 14, 12, 8, 20,15,10,12,5,20],
        type: "line"
      },
      {
        data: [820, 912, 941, 924, 1290, 1330, 1320],
        type: "line"
      }
    ]
  };
  mychartsLeft6.setOption(optionLeft6);
}
window.onload = load;
</script>

<style scoped>
/* 图表样式 */
.left-1,
.left-2,
.left-3,
.right-1,
.right-2,
.right-3 {
  border: 1px solid #0b1b7a;
  width: 340px;
  height: 170px;
}
.bottom-line {
  background: linear-gradient(to left, #01a2fe, #01a2fe) left bottom no-repeat,
    linear-gradient(to bottom, #01a2fe, #01a2fe) left bottom no-repeat,
    linear-gradient(to left, #01a2fe, #01a2fe) right bottom no-repeat,
    linear-gradient(to bottom, #01a2fe, #01a2fe) right bottom no-repeat;
  background-size: 2px 23px, 23px 2px, 2px 23px, 23px 2px;
}
.left-1 {
  position: absolute;
  top: 50px;
  left: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.left-2 {
  position: absolute;
  top: 235px;
  left: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.left-3 {
  position: absolute;
  top: 420px;
  left: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.right-1 {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.right-2 {
  position: absolute;
  top: 235px;
  right: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.right-3 {
  position: absolute;
  top: 420px;
  right: 20px;
  background-color: rgba(0, 3, 44, 0.5);
}
.div-btn {
  color: white;
  background: rgba(4, 38, 125, 0.5);
}
.btn-1 {
  /* background-color: #092F7A; */
  font-size: 20px;
  color: #03dee4;
  float: right;
  margin-top: -5px;
}
.first-text {
  /* 字体 */
  /* font-family: 黑体; */
  /* color:#00C4E0 ; */
  margin-left: 15px;
  /* 文字颜色渐变 */
  background: linear-gradient(90deg, #0459d3, #84e6f7, #0459d3);
  -webkit-background-clip: text;
  color: transparent;
}
</style>