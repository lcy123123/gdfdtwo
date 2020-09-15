<template>
    <div style="">
          <div class="right-1">
              <div id='main-top' style="width:400px;height:300px"></div>
          </div>
          <div class="right-2">
              <div id='main-bottom' style="width:400px;height:300px;"></div>
          </div>
          
          <div class="btn">
              <div class="div1" >风资源参数展示</div>
              <div class="div2">风资源统计图表展示</div>
          </div>
          <div class="bottom">
              <div>
              <div id="main-1" style="width: 250px;height:400px;float:left"></div>
              <div id="main-2" style="width: 250px;height:400px;float:left"></div>
              <div id="main-3" style="width: 250px;height:400px;float:left"></div>
             </div>
          </div>

 
 
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data () {
        return {
            
        }
    },
    methods: {
        
    }
    
}

//保证dom加载完成后获取dom元素
function load(){
//玫瑰图
  var myChart1 = echarts.init(document.getElementById('main-1'));

var option1={
     title: {
        text: '风速风向玫瑰图'
    },
    //触发提示框的
    // tooltip: {
    //     trigger: 'axis'
    // },
    //调整图表位置
    legend: {
         orient: 'vertical',
         x:'left',
         y:'bottom',
         padding:[0,50,0,0]
        // data: ['平均风率']
    },
    radar: [
       
       
        {
            indicator: (function (){
                var res = [];
                for (var i = 1; i <= 16; i++) {
                    res.push({max: 100});
                }
                return res;
            })(),
            center: ['50%', '40%'],
            radius: 80
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            areaStyle: {},
            data: [
                {
                    // value: [60, 73, 85, 40],
                    // name: '平均风率'
                }
            ]
        },
        {
            type: 'radar',
            radarIndex: 1,
            areaStyle: {},
            data: [
            
            ]
        },
        {
            type: 'radar',
            radarIndex: 2,
            areaStyle: {},
            data: [
                // {
                //     name: '降水量',
                //     value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                // },
                // {
                //     name: '蒸发量',
                //     value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                // }
            ]
        }
    ]
}
myChart1.setOption(option1)

 var myChart2 = echarts.init(document.getElementById('main-2'));

var option2={
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        bottom: '',
        // data: ['平均风率']
    },
    radar: [
       
       
        {
            indicator: (function (){
                var res = [];
                for (var i = 1; i <= 16; i++) {
                    res.push({max: 100});
                }
                return res;
            })(),
            center: ['50%', '40%'],
            radius: 80
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            areaStyle: {},
            data: [
                {
                    // value: [60, 73, 85, 40],
                    // name: '平均风率'
                }
            ]
        },
        {
            type: 'radar',
            radarIndex: 1,
            areaStyle: {},
            data: [
            
            ]
        },
        {
            type: 'radar',
            radarIndex: 2,
            areaStyle: {},
            data: [
                // {
                //     name: '降水量',
                //     value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                // },
                // {
                //     name: '蒸发量',
                //     value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                // }
            ]
        }
    ]
}
myChart2.setOption(option2)
var myChart3 = echarts.init(document.getElementById('main-3'));


var option3={
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        center: '',
        data: ['平均风率']
    },
    radar: [
       
       
        {
            indicator: (function (){
                var res = [];
                for (var i = 1; i <= 16; i++) {
                    res.push({max: 100});
                }
                return res;
            })(),
            center: ['50%', '40%'],
            radius: 80
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item'
            },
            areaStyle: {},
            data: [
                {
                    value: [60, 73, 85, 40],
                    name: '平均风率'
                }
            ]
        },
        {
            type: 'radar',
            radarIndex: 1,
            areaStyle: {},
            data: [
            
            ]
        },
        {
            type: 'radar',
            radarIndex: 2,
            areaStyle: {},
            data: [
                // {
                //     name: '降水量',
                //     value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                // },
                // {
                //     name: '蒸发量',
                //     value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                // }
            ]
        }
    ]
}
myChart3.setOption(option3)

//折线图
var myEchartBottom=echarts.init(document.getElementById('main-bottom'));
var optionBottom={
      title: {
        text: '风速和风功率密度日变化折线图'
    },
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        data: ['邮件营销', '联盟广告']
    },
    grid: {
        // left: '3%',
        // right: '4%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0', '2', '4', '6', '8', '10', '12'],
        axisTick:{show:false}
    },
    yAxis: {
        type: 'value',
        data:['0','2','4','6','8','10']

    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        
    ]
}
myEchartBottom.setOption(optionBottom)

//柱状图
var myEchartTop=echarts.init(document.getElementById('main-top'))
var optionTop={
     legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
}

myEchartTop.setOption(optionTop)

 } 

 

window.onload = load;
</script>
<style>
.right-1{
    background-color: cornflowerblue;
    height: 300px;
    width: 400px;
    /* float: right; */
    position: absolute;
    /* top:0px; */
    right: 8px;
}
.right-2{
    background-color: cornflowerblue;
    height: 300px;
    width: 400px;
    position: absolute;
    /* bottom:100px; */
    top:310px;
    right: 0px;
    /* margin-top: 40px; */
    /* margin: 10px; */
    margin-right: 8px;
    /* overflow: hidden; */
}
.bottom{
    width: 800px;
    height: 300px;
    background-color: cornflowerblue;
    position:absolute;
    bottom:0px;
    /* left:0 */
    /* top:400px */
    /* overflow: hidden; */
    
}
.btn{
    background-color: rgb(9, 9, 121);
    position: absolute;
    top:15px;
    left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    
}
.div1{
    padding: 5px;
    color: white;
    cursor:pointer;
}
.div2{
    padding: 5px;
    color: white;
    cursor:pointer;
}
.div1:hover{
    background-color:cornflowerblue ;
}
.div2:hover{
    background-color:cornflowerblue ;
}
</style>