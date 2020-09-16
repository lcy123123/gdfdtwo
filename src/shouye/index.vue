<template>
    <div style="">
        <div class="z">
            <div class="small"></div>
        <!-- 上边的按钮 -->
        <button class="b1">评估数据展示台</button>
        <button class="b2">评估与决策平台</button>
        </div>
        
        <!-- 右上边的盒子 -->
          <div class="right-1">
              <div class="right-t">风速和风能频次分布直方图<button class="right-1-btn">×</button></div>
              <div id='main-top' style="width:350px;height:250px"></div>
          </div>
          <!-- 右下面的盒子 -->
          <div class="right-2">
                  <div class="right-t">风速和风功率密度日变化折线图<button class="right-2-btn">×</button></div>
              <div id='main-bottom' style="width:350px;height:250px;"></div>
          </div>
          <!-- 左上角两个div -->
          <div class="div-z">
              <div class="div1" @click="cs" >风资源参数展示</div>
              <div class="div2" @click="tb">风资源统计图表展示</div>
          </div>
          <!-- 底部玫瑰图 -->
          <div class="bottom">
              <div class="bottom-t">风速风向玫瑰图<button class="bottom-btn">×</button></div>
             <div class="a">
                  <div class="title-1">博贺ZephlR300激光雷达</div>
                  <div class="title-2">30米水平风速风向（1/17~2/16）</div>
             </div>

              <div class="b">
              <div class="title-1">博贺ZephlR300激光雷达</div>
              <div class="title-2">130米水平风速风向（1/17~2/16）</div>
              </div>
              <div class="c">
                  <div class="title-1">博贺ZephlR300激光雷达</div>
                   <div class="title-2">50米水平风速风向（1/17~2/16）</div>
              </div>
              <div>
              <div id="main-1" style="width: 250px;height:400px;float:left"></div>
              <div id="main-2" style="width: 250px;height:400px;float:left"></div>
              <div id="main-3" style="width: 250px;height:400px;float:left"></div>
             </div>
          </div>
          <!-- 右侧六个小按钮 -->
          <ul>
          <li class="btn-1"><img src="../assets/1.png" alt=""></li>
          <li class="btn-3"><img src="../assets/2.png" alt=""></li>
          <li class="btn-4"><img src="../assets/3.png" alt=""></li>
          <li class="btn-5"><img src="../assets/4.png" alt=""></li>
          <li class="btn-6"><img src="../assets/5.png" alt=""></li>
          <li class="btn-6"><img src="../assets/6.png" alt=""></li>
        </ul>
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
        cs:function(){
            // 跳转资源页
            this.$router.push('/zi')

        },
        tb:function(){
            // 跳转图表页
            this.$router.push('/tb')
        }
    }
    
}

//保证dom加载完成后获取dom元素
function load(){
//玫瑰图
  var myChart1 = echarts.init(document.getElementById('main-1'));

var option1={
    //触发提示框的
    // tooltip: {
    //     trigger: 'axis'
    // },
    //调整图表位置
    legend: {
        orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
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
            center: ['50%', '35%'],
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
        // bottom: '',
         orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',   
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
            center: ['50%', '35%'],
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
        data: ['平均风率'],
         orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',   
        padding:[0,0,150,0],
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
            center: ['50%', '35%'],
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
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        data: ['风速', '风功率密度'],
           orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',   
    },
    grid: {
        // left: '3%',
        // right: '4%',
        bottom: '10%',
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
            name: '风速',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '风功率密度',
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
      legend: {
        data: ['风速', '风能'],
        orient: 'horizontal',
        x:'center',      //可设定图例在左、右、居中
        y:'bottom',   
    },
    // calculable: true,
    xAxis: [
        {
            name:'m/s',
            type: 'category',
            data: ['<0.5', '2', '4', '6', '8', '10', '12', '14', '16', '18'],
            axisTick: {
           show: false
         }
        }
    ],
    yAxis: [
        {
            name:'%',
            type: 'value',
            // data:['0','2','4','6','8','10','12','14'],
            axisTick: {
             show: false
              }
        }
    ],
    series: [
        {
            name: '风速',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    
        },
        {
            name: '风能',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
           
        }
    ]
}

myEchartTop.setOption(optionTop)

 } 

 

window.onload = load;
</script>
<style>
body{
    background: #070628;
    background:rgba(7,6,40)
}
.b1{
    background-color: #1E4292;
    width: 140px;
    height: 30px;
    color: #F4F4F5;
    position: absolute;
    top:40px;
    left: 18px;
    border-radius: 10%;

}
.b2{
    background-color: #0E388D;
    background: rgba(14,56,141);
     width: 140px;
    height: 30px;
    color: #F4F4F5;
    position: absolute;
    top:40px;
    left: 170px;
}
.small{
    width: 15px;
    height: 15px;
    background-color: #1E4292;
    /* background-color: rgb(230, 109, 109); */
    position: absolute;
    top:60px;
    left: 70px;
    transform: rotate(45deg);
}
.right-1{
   
    background-color: #04053B;
    background:rgba(4,5,59);
   
    opacity: 1;
    height: 280px;
    width: 350px;
    /* float: right; */
    position: absolute;
    top:40px;
    right: 78px;
    border: 2px solid #01CAEB;
    /* display: none;  */
}
/* .right-1-btn{
    float: right;
    background-color: #035198;
    color: #02F0F5;
} */
.right-t{
    height: 26px;
    background-color: #052484;
    color: #01CAEB;
    line-height: 26px;
}
.right-2{
    background-color: #04053B;
    background:rgba(4,5,59);
    border: 2px solid #01CAEB;
    height: 280px;
    width: 350px;
    position: absolute;
    /* bottom:100px; */
    top:330px;
    right: 70px;
    /* margin-top: 40px; */
    /* margin: 10px; */
    margin-right: 8px;
    /* overflow: hidden; */
    /* display: none;  */
}
.right-2-btn,.right-1-btn{
    width: 26px;
    height: 26px;
    float: right;
    background-color: #035198;
    color: #02F0F5;
}
.bottom{
    width: 800px;
    height: 280px;
    /* background-color: white; */
    opacity: 1;
    border: 2px solid #01CAEB;
    /* background:rgba(255,255,255,.5); */
    background-color: #04053B;
    background:rgba(4,5,59);
    position:absolute;
    bottom:0px;
    /* left:0 */
    /* top:400px */
    /* overflow: hidden; */
    /* display: none;  */
    
}
.title-1{
    width: 180px;
    height: 20px;
    color: #00DCD8;
}
.title-2{
    width: 260px;
    height: 18px;
    
    color: #00DCD8;
}
.a{
    position: absolute;
    top:40px;
    left:50px
}

.c{
    position: absolute;
    top:40px;
    left:306px
}
.b{
    position: absolute;
    top:40px;
    left:550px
}
.bottom-btn{
    float: right;
    background-color: #035198;
    color: #02F0F5;
    width: 26px;
    height: 26px;
    /* display: none;  */
}
.bottom-t{
    height: 26px;
    line-height: 26px;
    color: #01CAEB;
    background-color: #052484;
    /* display: none; */
}
.div-z{
    background-color: #132650;
    position: absolute;
    top:85px;
    left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    /* display: none; */
    
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
    background-color:#068BBE ;
}
.div2:hover{
    background-color:#068BBE ;
}
ul{
    position:absolute;
    right:25px;
    top:4px;
    
}
li{
    font-size: 5px;
    list-style-type:none;
      cursor:pointer;
}
img{
    width: 30px;
    height: 30px;
}
</style>