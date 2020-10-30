<template>
    <div>
        <!-- 中间组件  风参数信息 -->
        <div class="fcsxx">
          <!-- 上面标题 -->
      <div class="div-btn"><span class="first-text">风参数信息</span><span class="btn-1" @click="Gb">×</span></div>
       <div class="fcsxx-z">
        <!-- 左面 -->
        <div class="fcsxx-left">
          <div class="fcsxx-left-text">
            <div>经度：123.9697°E</div>
            <div>纬度：30.7513°N</div>
            <div>高程：-56.0m</div>
            <div>风速：7.34m/s</div>
            <div>空气密度：1.199kg/m³</div>
            <div>推荐机型：GW140-2.5</div>
            <div>年发电量：904.39万kWh</div>
            <div>等效小时数：3617.57h</div>
          </div>
        </div>
        <!-- 中间占位 -->
        <div class="middle"></div>
        <!-- 右面 -->
        <div class="fcsxx-right">
          <div class="fcsxx-right-text">
            <div class="fmgtext" @click="Fmg">风玫瑰图</div>
            <div class="wbetext" @click="Wbetb">韦布尔分布图</div>
          </div>
          
          <!-- 统计图 -->
          <!-- 两个小文字 -->
          <div class="small-text">
            <span>A=8.16</span>
            <span>K=2.00</span>
          </div>
          <div id="main-1" v-show="wbeflag"  style="width:330px;height:230px;position:absolute;left:200px;top:100px;"></div>
          <div id="main-2"  v-show="!fmgflag" style="width:330px;height:230px;position:absolute;left:200px;top:100px;display:none"></div>
        </div>
       </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import echarts from 'echarts'

export default {
    data(){
        return{
      //风玫瑰状态值
      fmgflag:false,
      // 韦布尔状态值
      wbeflag:true,
        }
    },
    //钩子函数（加载完dom后调用加载图表方法）
  mounted(){
    //调用加载韦布尔图表方法
   this.Wbetb()
  },

    methods:{
        //点击关闭风参数(收起风参数)
    Gb:function(){
      //上滑风参数元素
      $('.fcsxx').slideToggle(400)
    },

     //点击出现风玫瑰图
    Fmg:function(){
      console.log(123)
      //判断flag的值 改变背景以及文字颜色  初始为false
      if(this.fmgflag==false){
        $('.fmgtext').css('color','#01DFDF')
        $('.fmgtext').css('background','rgba(0,164,253,.5)')

        //改变兄弟文字 白颜色 背景深颜色
        $('.fmgtext').siblings().css('background','rgba(3,8,90,.5)')
        $('.fmgtext').siblings().css('color','white')
        //隐藏另一个 显示自己的
        $('#main-1').hide()
        $('#main-2').show()

      }
        //渲染图表
        var mychart2=echarts.init(document.getElementById("main-2"));
        var options2={
                xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                 },
                yAxis: {
                type: 'value'
                 },
               series: [{
                     data: [820, 932, 901, 934, 1290, 1330, 1320],
                     type: 'line',
                     smooth: true
                 }]
              }
        mychart2.setOption(options2)
        
        
    },
//加载图表方法(已在mounted中调用)
  Wbetb:function(){
       //判断自己的flag  初始为true
    if(this.wbeflag==true){
      //如果为真（代表亮着的） 将文字背景变亮
        $('.wbetext').css({background:'rgba(0,164,253,.5)',color:'#01DFDF'})
        $('.wbetext').siblings().css({background:'rgba(3,8,90,0.5)',color:'white'})
       //隐藏另一个显示自己的
       $('#main-1').show()
       $('#main-2').hide()
    }
    
   //为图表设定容器
   var mychart1=echarts.init(document.getElementById("main-1"))
   //设置图表属性（图表配置项）
   var option={
        grid: {
                left: '0%',
                right: '18%',
                bottom: '10%',
                containLabel: true
            },
       color:'#3A97DB',
    xAxis: {
        name:"风速(m/s)",
        // nameTextStyle:{color:"white",fontSize:10,padding:[0,0,0,0]},
        nameTextStyle:{color:"white",fontSize:10,margin:[0,0,0,40]},
        nameRotate:"0.1",
        type: 'category',
        boundaryGap: false,
        data: ['0', '2', '4', '6', '8', '10', '12','14','16','18','20','22','24'],
        axisLabel:{
          color:'white',
        },
                 

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
    yAxis: {
        type: 'value',
        name:'风频率',
        nameTextStyle:{color:'white',fontSize:10},
        min:0,
        max:0.08,
        interval:0.02,
        //改变y轴文字颜色
        axisLabel:{
          color:'white',
          // textStyle:{
          //   color:'red'
          // }
        },
        //改变坐标轴线的颜色
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
    series: [{
        data: [0, 0.02, 0.01, 0.04, 0.05, 0.06, 0.05,0.03,0.04,0.05,0.06,0.07,0.08],
        type: 'line',
        //折现下面区域颜色的渐变
        areaStyle: {
          normal: {
             color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[
                         {offset: 0, color: 'rgba(9,109,221,1)'},
                        {offset: 0.5, color: 'rgba(9,109,221,.8)'},
                         {offset: 1, color: 'rgba(9,109,221,.2)'}
                        ]  )
                  }
        },
        //折线是否圆滑
        smooth:true
    }]
};
    //将设置好的图表配置项添加到容器中
  mychart1.setOption(option)
  }
  },
    
}
</script>
<style  scoped>
.fcsxx{
  width: 530px;
  height: 330px;
  /* border: 1px solid red; */
  position: absolute;
  top:100px;
  left: 320px;
  border:1px solid #0B1B7A;
  background: linear-gradient(to left,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to left,#01A2FE,#01A2FE) right bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) right bottom no-repeat;
  background-size: 2px 23px,23px 2px,2px 23px,23px 2px;
  background-color:rgba(0,3,44,.5) ;

}
.div-btn{
  color: white;
  background:rgba(4,38,125,.5);
}
.first-text{
  /* color:#00C4E0 ; */
  margin-left: 15px;
  /* 文字颜色渐变 */
  background: linear-gradient(90deg,#0459D3,#84E6F7,#0459D3);
  -webkit-background-clip: text;
  color: transparent;
  
}
.fcsxx-z{
  width: 100%;
  height: 308px;
  /* border: 1px solid red; */
  /* background-color:rgba(0,3,44,.5) ; */

}
.fcsxx-left{
  width: 180px;
  height: 308px;
  float: left;
  /* display: inline-block; */
  /* border: 1px solid red ; */
}
.fcsxx-left-text{
  margin-top: 40px;
  margin-left: 5px;
}
.fcsxx-left-text div{
color: white;
font-size: 13px;
margin: 10px;
}
.middle{
  width: 2px;
  height: 300px;
  /* border: 1px solid red; */
  background-color: #015388;
  float: left;
  margin-left: 6px;
  margin-top: 5px;
}
.fcsxx-right{
  width: 335px;
  height: 308px;
  float: right;
  /* margin-right: -15px ; */
  /* border: 1px solid green; */
}
.fcsxx-right-text{
  width: 230px;
  height: 34px;
  margin-left: 46px;
  margin-top: 20px;
}
.fcsxx-right-text div{
  display: inline-block;
  /* color: white; */
  width: 110px;
  height: 34px;
  line-height: 34px;
  border:1px solid #0B1B7A;
  text-align: center;
}
.fmgtext{
  background: rgba(3,8,90,.5);
  color: white;
  cursor:pointer
}
.wbetext{
  background: rgba(0,164,253,.5);
  color: #01DFDF;
  cursor:pointer

}
.small-text{
color: white;
margin-left: 100px;
margin-top: 30px;
}
.small-text span{
  margin-right: 5px;
  font-size: 13px;
}
</style>