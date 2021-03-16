<template>
<div class="colorbar">
     <div id="temp_legend">
      <span class="temp_legend1" style="position:absolute;right:70px;width:22px;height:100px;top:-180px"></span>
        <span class="span1"  style="position:absolute;top:-185px;margin-left:-70px;color:rgb(255,255,255,.7)">{{maxvalue}}</span><br />
        <span class="span2" style="position:absolute;top:-99px;margin-left:-69px;color:rgb(255,255,255,.7)">{{minvalue}}</span><br />
       <span style="position:absolute;top:-210px;margin-left:-102px;color:rgb(255,255,255,.7)">{{dw}}</span>
    </div>
    <!-- 右下角图表 -->
    <div id="main-rightBottom" style="position:absolute;top:430px;right:20px;height:160px;width:160px"></div>
</div>
</template>
<script>
import bus from '../utils/eventBus'
import echarts from "echarts";
import $ from 'jquery'

export default {
  data(){
    return{
      maxvalue:12,
      minvalue:0,
      dw:'(m/s)'
    }
  },
 
  mounted(){
        $('#temp_legend').hide()

    //接收台风频次 设置colorbar最大值
    bus.$on('addzhtqimg',tfpc=>{      
        if(tfpc==='台风频次'){
          this.maxvalue=25
          this.minvalue=0
           this.dw='(次)'
        $('#temp_legend').show()
        $('#main-rightBottom').hide()


        }
    })
    //接收卫星参数
    bus.$on('Wxcs',Wxcs=>{

      if(Wxcs=='月平均风速'||Wxcs=='年平均风速'){
      this.maxvalue=12
      this.minvalue=0
      this.dw='(m/s)'
      $('#temp_legend').show()
      $('#main-rightBottom').hide()
      }else if(Wxcs=='月平均风功率密度'||Wxcs=='年平均风功率密度'){
      this.maxvalue=12
      this.minvalue=0
      this.dw='(W/m²)'
      $('#temp_legend').show()
      $('#main-rightBottom').hide()
      }
    })
    //接收有效波高  设置colorbar最大值（最大值都一样）
    bus.$on('addyxbgimg',(yxbgvalue)=>{
      
      if(yxbgvalue=='逐月平均值'){
        this.maxvalue=2.5
        this.minvalue=0.5
      }else if(yxbgvalue=='逐月最大值'){
        this.maxvalue=7.5
        this.minvalue=1.5
      }else if(yxbgvalue=='逐月最小值'){
        this.maxvalue=1.5
        this.minvalue=0
      }else if(yxbgvalue=='逐年平均值'){
        this.maxvalue=2.5
        this.minvalue=0
      }else if(yxbgvalue=='逐年最大值'){
        this.maxvalue=7
        this.minvalue=2
      }else if(yxbgvalue=='逐年最小值'){
        this.maxvalue=1.5
        this.minvalue=0
      }else if(yxbgvalue=='十年平均值'){
        this.maxvalue=2
        this.minvalue=1
      }else if(yxbgvalue=='十年最大值'){
        this.maxvalue=7.5
        this.minvalue=4.5
      }else if(yxbgvalue=='十年最小值'){
        this.maxvalue=0.4
        this.minvalue=0
      }else if(yxbgvalue=='十年一遇'){
        this.maxvalue=7
        this.minvalue=4
      }else if(yxbgvalue=='三十年一遇'){
        this.maxvalue=7
        this.minvalue=4
      }
      
      this.dw='（m）'
      $('#temp_legend').show()
      $('#main-rightBottom').hide()
    })
    //接收数值预报  设置colorbar最大值
    bus.$on('addimg',szyb=>{
      if(szyb=='年平均风速'){
        $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=12;
        this.minvalue=0;
        this.dw='(m/s)';
      }else if(szyb=='月平均风速'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=15;
        this.minvalue=0;
        this.dw='(m/s)';
      }else if(szyb=='逐小时年平均风速'||szyb=='逐小时月平均风速'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=15;
        this.minvalue=0;
        this.dw='(m/s)';
      }else if(szyb=='年平均风功率密度'||szyb=='月平均风功率密度'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=1000;
        this.minvalue=0;
        this.dw='(W/m²)';
      }else if(szyb=='有效风速时数'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=8000;
        this.minvalue=5000;
        this.dw='（h）';
      }else if(szyb=='风切变系数'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=0.1;
        this.minvalue=0;
        this.dw=''
      }else if(szyb=='威布尔分布形状参数'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=3.5;
        this.minvalue=0;
        this.dw='';
      }else if(szyb=='威布尔分布尺度参数'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=11;
        this.minvalue=0;
        this.dw='(m/s)'
      }else if(szyb=='各区间风速分布频率'||szyb=='各区间风功率密度分布频率'){
         $('#main-rightBottom').hide()
        $('#temp_legend').show()
        this.maxvalue=15;
        this.minvalue=0;
        this.dw='（%）'
      }else if(szyb=='格点风参'){
         $('#main-rightBottom').hide()
        $('#temp_legend').hide()
        this.maxvalue=15;
        this.minvalue=0;
        this.dw='（%）'
        
      }
      else if(szyb=='风向分布频率'||szyb=='各向风功率密度分布频率'){
         $('#main-rightBottom').show()
        $('#temp_legend').hide()
        var mychartsLeft9 = echarts.init(document.getElementById("main-rightBottom"));
      var optionLeft9 = {
        //圆圈相关(角度轴)
        angleAxis: { 
          boundaryGap:false,      //圆轴外面的文字对其
          data: ["北","东","南","西"],
          //外边圆圈上的刻度值
          axisTick: { show: false },
          //外面圆圈文字的颜色
          axisLabel: {
            margin: 2,
            color: "white",
            fontSize: 10,
            lineStyle: { color: "#020172" }
          },
          axisLine: {
            lineStyle: { color: "#020172" }
          },
          //网格线的颜色
          splitLine: {
            show: true,
            lineStyle: { color: ["#020172"] }
          }
        },
        //数轴相关
        radiusAxis: {
          min: 0,         
          max: 0.5,        
          interval: 0.125,
          // data:['0','','','','0.5'],
          axisLabel: {
            color: "white",
            fontSize:10
          },
          //去掉刻度线
          axisTick: { show: false },
          //坐标轴颜色
          axisLine: {
            lineStyle: { color: "#020172" }
          },
          //网格线的颜色
          splitLine: {
            show: true,
            lineStyle: { color: ["#020172"] }
          }
        },
        //图表整体位置
        polar: {
          center: ["50%", "50%"]
        },
        //数据
        series: []
      };

      mychartsLeft9.setOption(optionLeft9);

      }
      else{
        return
      }
    })

  },
  watch:{
     //动态监测路由变化  控制colorBar组件的显示
    $route: {
    handler: function(val){
      if(val.fullPath=='/pgbj'||val.fullPath=='/pgjc'||val.fullPath=='/tb'||val.fullPath=='/index'||val.fullPath=='/szyb'||val.fullPath=='/yggc'||val.fullPath=='/yxbg'||val.fullPath=='/zhtq'){
        $('#temp_legend').hide()
      
    }
  },
      //从第一次开始监听
     immediate:true,
    // 深度观察监听
     deep: true,
     
     
   },
   },
    
}
</script>
<style  scoped>
#main-rightBottom canvas{
  width: 160px;
  height: 160px;
}
.temp_legend1 {
  background-image: linear-gradient(
    0deg,
    rgb(144, 0, 111,.5) 0%,
    rgb(141, 0, 114,.5) 0.4%,
    rgb(138, 0, 117,.5) 0.79%,
    rgb(135, 0, 120,.5) 1.19%,
    rgb(132, 0, 123,.5) 1.58%,
    rgb(129, 0, 126,.5) 1.98%,
    rgb(126, 0, 129,.5) 2.37%,
    rgb(123, 0, 132,.5) 2.77%,
    rgb(120, 0, 135,.5) 3.16%,
    rgb(117, 0, 138,.5) 3.56%,
    rgb(114, 0, 141,.5) 3.95%,
    rgb(111, 0, 144,.5) 4.35%,
    rgb(108, 0, 147,.5) 4.74%,
    rgb(105, 0, 150,.5) 5.14%,
    rgb(102, 0, 153,.5) 5.53%,
    rgb(99, 0, 156,.5) 5.93%,
    rgb(96, 0, 159,.5) 6.32%,
    rgb(93, 0, 162,.5) 6.72%,
    rgb(90, 0, 165,.5) 7.11%,
    rgb(87, 0, 168,.5) 7.51%,
    rgb(84, 0, 171,.5) 7.91%,
    rgb(81, 0, 174,.5) 8.3%,
    rgb(78, 0, 177,.5) 8.7%,
    rgb(75, 0, 180,.5) 9.09%,
    rgb(72, 0, 183,.5) 9.49%,
    rgb(69, 0, 186,.5) 9.88%,
    rgb(66, 0, 189,.5) 10.28%,
    rgb(63, 0, 192,.5) 10.67%,
    rgb(60, 0, 195,.5) 11.07%,
    rgb(57, 0, 198,.5) 11.46%,
    rgb(54, 0, 201,.5) 11.86%,
    rgb(51, 0, 204,.5) 12.25%,
    rgb(48, 0, 207,.5) 12.65%,
    rgb(45, 0, 210,.5) 13.04%,
    rgb(42, 0, 213,.5) 13.44%,
    rgb(39, 0, 216,.5) 13.83%,
    rgb(36, 0, 219,.5) 14.23%,
    rgb(33, 0, 222,.5) 14.62%,
    rgb(30, 0, 225,.5) 15.02%,
    rgb(27, 0, 228,.5) 15.42%,
    rgb(24, 0, 231,.5) 15.81%,
    rgb(21, 0, 234,.5) 16.21%,
    rgb(18, 0, 237,.5) 16.6%,
    rgb(15, 0, 240,.5) 17%,
    rgb(12, 0, 243,.5) 17.39%,
    rgb(9, 0, 246,.5) 17.79%,
    rgb(6, 0, 249,.5) 18.18%,
    rgb(0, 0, 252,.5) 18.58%,
    rgb(0, 0, 255,.5) 18.97%,
    rgb(0, 5, 255,.5) 19.37%,
    rgb(0, 10, 255,.5) 19.76%,
    rgb(0, 16, 255,.5) 20.16%,
    rgb(0, 21, 255,.5) 20.55%,
    rgb(0, 26, 255,.5) 20.95%,
    rgb(0, 32, 255,.5) 21.34%,
    rgb(0, 37, 255,.5) 21.74%,
    rgb(0, 42, 255,.5) 22.13%,
    rgb(0, 48, 255,.5) 22.53%,
    rgb(0, 53, 255,.5) 22.92%,
    rgb(0, 58, 255,.5) 23.32%,
    rgb(0, 64, 255,.5) 23.72%,
    rgb(0, 69, 255,.5) 24.11%,
    rgb(0, 74, 255,.5) 24.51%,
    rgb(0, 80, 255,.5) 24.9%,
    rgb(0, 85, 255,.5) 25.3%,
    rgb(0, 90, 255,.5) 25.69%,
    rgb(0, 96, 255,.5) 26.09%,
    rgb(0, 101, 255,.5) 26.48%,
    rgb(0, 106, 255,.5) 26.88%,
    rgb(0, 112, 255,.5) 27.27%,
    rgb(0, 117, 255,.5) 27.67%,
    rgb(0, 122, 255,.5) 28.06%,
    rgb(0, 128, 255,.5) 28.46%,
    rgb(0, 133, 255,.5) 28.85%,
    rgb(0, 138, 255,.5) 29.25%,
    rgb(0, 144, 255,.5) 29.64%,
    rgb(0, 149, 255,.5) 30.04%,
    rgb(0, 154, 255,.5) 30.43%,
    rgb(0, 160, 255,.5) 30.83%,
    rgb(0, 165, 255,.5) 31.23%,
    rgb(0, 170, 255,.5) 31.62%,
    rgb(0, 176, 255,.5) 32.02%,
    rgb(0, 181, 255,.5) 32.41%,
    rgb(0, 186, 255,.5) 32.81%,
    rgb(0, 192, 255,.5) 33.2%,
    rgb(0, 197, 255,.5) 33.6%,
    rgb(0, 202, 255,.5) 33.99%,
    rgb(0, 208, 255,.5) 34.39%,
    rgb(0, 213, 255,.5) 34.78%,
    rgb(0, 218, 255,.5) 35.18%,
    rgb(0, 224, 255,.5) 35.57%,
    rgb(0, 229, 255,.5) 35.97%,
    rgb(0, 234, 255,.5) 36.36%,
    rgb(0, 240, 255,.5) 36.76%,
    rgb(0, 245, 255,.5) 37.15%,
    rgb(0, 250, 255,.5) 37.55%,
    rgb(0, 255, 255,.5) 37.94%,
    rgb(0, 255, 247,.5) 38.34%,
    rgb(0, 255, 239,.5) 38.74%,
    rgb(0, 255, 231,.5) 39.13%,
    rgb(0, 255, 223,.5) 39.53%,
    rgb(0, 255, 215,.5) 39.92%,
    rgb(0, 255, 207,.5) 40.32%,
    rgb(0, 255, 199,.5) 40.71%,
    rgb(0, 255, 191,.5) 41.11%,
    rgb(0, 255, 183,.5) 41.5%,
    rgb(0, 255, 175,.5) 41.9%,
    rgb(0, 255, 167,.5) 42.29%,
    rgb(0, 255, 159,.5) 42.69%,
    rgb(0, 255, 151,.5) 43.08%,
    rgb(0, 255, 143,.5) 43.48%,
    rgb(0, 255, 135,.5) 43.87%,
    rgb(0, 255, 127,.5) 44.27%,
    rgb(0, 255, 119,.5) 44.66%,
    rgb(0, 255, 111,.5) 45.06%,
    rgb(0, 255, 103,.5) 45.45%,
    rgb(0, 255, 95,.5) 45.85%,
    rgb(0, 255, 87,.5) 46.25%,
    rgb(0, 255, 79,.5) 46.64%,
    rgb(0, 255, 71,.5) 47.04%,
    rgb(0, 255, 63,.5) 47.43%,
    rgb(0, 255, 55,.5) 47.83%,
    rgb(0, 255, 47,.5) 48.22%,
    rgb(0, 255, 39,.5) 48.62%,
    rgb(0, 255, 31,.5) 49.01%,
    rgb(0, 255, 23,.5) 49.41%,
    rgb(0, 255, 15,.5) 49.8%,
    rgb(0, 255, 0,.5) 50.2%,
    rgb(8, 255, 0,.5) 50.59%,
    rgb(16, 255, 0,.5) 50.99%,
    rgb(24, 255, 0,.5) 51.38%,
    rgb(32, 255, 0,.5) 51.78%,
    rgb(40, 255, 0,.5) 52.17%,
    rgb(48, 255, 0,.5) 52.57%,
    rgb(56, 255, 0,.5) 52.96%,
    rgb(64, 255, 0,.5) 53.36%,
    rgb(72, 255, 0,.5) 53.75%,
    rgb(80, 255, 0,.5) 54.15%,
    rgb(88, 255, 0,.5) 54.55%,
    rgb(96, 255, 0,.5) 54.94%,
    rgb(104, 255, 0,.5) 55.34%,
    rgb(112, 255, 0,.5) 55.73%,
    rgb(120, 255, 0,.5) 56.13%,
    rgb(128, 255, 0,.5) 56.52%,
    rgb(136, 255, 0,.5) 56.92%,
    rgb(144, 255, 0,.5) 57.31%,
    rgb(152, 255, 0,.5) 57.71%,
    rgb(160, 255, 0,.5) 58.1%,
    rgb(168, 255, 0,.5) 58.5%,
    rgb(176, 255, 0,.5) 58.89%,
    rgb(184, 255, 0,.5) 59.29%,
    rgb(192, 255, 0,.5) 59.68%,
    rgb(200, 255, 0,.5) 60.08%,
    rgb(208, 255, 0,.5) 60.47%,
    rgb(216, 255, 0,.5) 60.87%,
    rgb(224, 255, 0,.5) 61.26%,
    rgb(232, 255, 0,.5) 61.66%,
    rgb(240, 255, 0,.5) 62.06%,
    rgb(248, 255, 0,.5) 62.45%,
    rgb(255, 255, 0,.5) 62.85%,
    rgb(255, 251, 0,.5) 63.24%,
    rgb(255, 247, 0,.5) 63.64%,
    rgb(255, 243, 0,.5) 64.03%,
    rgb(255, 239, 0,.5) 64.43%,
    rgb(255, 235, 0,.5) 64.82%,
    rgb(255, 231, 0,.5) 65.22%,
    rgb(255, 227, 0,.5) 65.61%,
    rgb(255, 223, 0,.5) 66.01%,
    rgb(255, 219, 0,.5) 66.4%,
    rgb(255, 215, 0,.5) 66.8%,
    rgb(255, 211, 0,.5) 67.19%,
    rgb(255, 207, 0,.5) 67.59%,
    rgb(255, 203, 0,.5) 67.98%,
    rgb(255, 199, 0,.5) 68.38%,
    rgb(255, 195, 0,.5) 68.77%,
    rgb(255, 191, 0,.5) 69.17%,
    rgb(255, 187, 0,.5) 69.57%,
    rgb(255, 183, 0,.5) 69.96%,
    rgb(255, 179, 0,.5) 70.36%,
    rgb(255, 175, 0,.5) 70.75%,
    rgb(255, 171, 0,.5) 71.15%,
    rgb(255, 167, 0,.5) 71.54%,
    rgb(255, 163, 0,.5) 71.94%,
    rgb(255, 159, 0,.5) 72.33%,
    rgb(255, 155, 0,.5) 72.73%,
    rgb(255, 151, 0,.5) 73.12%,
    rgb(255, 147, 0,.5) 73.52%,
    rgb(255, 143, 0,.5) 73.91%,
    rgb(255, 139, 0,.5) 74.31%,
    rgb(255, 135, 0,.5) 74.7%,
    rgb(255, 131, 0,.5) 75.1%,
    rgb(255, 127, 0,.5) 75.49%,
    rgb(255, 123, 0,.5) 75.89%,
    rgb(255, 119, 0,.5) 76.28%,
    rgb(255, 115, 0,.5) 76.68%,
    rgb(255, 111, 0,.5) 77.08%,
    rgb(255, 107, 0,.5) 77.47%,
    rgb(255, 103, 0,.5) 77.87%,
    rgb(255, 99, 0,.5) 78.26%,
    rgb(255, 95, 0,.5) 78.66%,
    rgb(255, 91, 0,.5) 79.05%,
    rgb(255, 87, 0,.5) 79.45%,
    rgb(255, 83, 0,.5) 79.84%,
    rgb(255, 79, 0,.5) 80.24%,
    rgb(255, 75, 0,.5) 80.63%,
    rgb(255, 71, 0,.5) 81.03%,
    rgb(255, 67, 0,.5) 81.42%,
    rgb(255, 63, 0,.5) 81.82%,
    rgb(255, 59, 0,.5) 82.21%,
    rgb(255, 55, 0,.5) 82.61%,
    rgb(255, 51, 0,.5) 83%,
    rgb(255, 47, 0,.5) 83.4%,
    rgb(255, 43, 0,.5) 83.79%,
    rgb(255, 39, 0,.5) 84.19%,
    rgb(255, 35, 0,.5) 84.58%,
    rgb(255, 31, 0,.5) 84.98%,
    rgb(255, 27, 0,.5) 85.38%,
    rgb(255, 23, 0,.5) 85.77%,
    rgb(255, 19, 0,.5) 86.17%,
    rgb(255, 15, 0,.5) 86.56%,
    rgb(255, 11, 0,.5) 86.96%,
    rgb(255, 7, 0,.5) 87.35%,
    rgb(255, 3, 0,.5) 87.75%,
    rgb(255, 0, 0,.5) 88.14%,
    rgb(250, 0, 0,.5) 88.54%,
    rgb(245, 0, 0,.5) 88.93%,
    rgb(240, 0, 0,.5) 89.33%,
    rgb(235, 0, 0,.5) 89.72%,
    rgb(230, 0, 0,.5) 90.12%,
    rgb(225, 0, 0,.5) 90.51%,
    rgb(220, 0, 0,.5) 90.91%,
    rgb(215, 0, 0,.5) 91.3%,
    rgb(210, 0, 0,.5) 91.7%,
    rgb(205, 0, 0,.5) 92.09%,
    rgb(200, 0, 0,.5) 92.49%,
    rgb(195, 0, 0,.5) 92.89%,
    rgb(190, 0, 0,.5) 93.28%,
    rgb(185, 0, 0,.5) 93.68%, 
    rgb(180, 0, 0,.5) 94.07%,
    rgb(175, 0, 0,.5) 94.47%,
    rgb(170, 0, 0,.5) 94.86%,
    rgb(165, 0, 0,.5) 95.26%,
    rgb(160, 0, 0,.5) 95.65%,
    rgb(155, 0, 0,.5) 96.05%,
    rgb(150, 0, 0,.5) 96.44%,
    rgb(145, 0, 0,.5) 96.84%,
    rgb(140, 0, 0,.5) 97.23%,
    rgb(135, 0, 0,.5) 97.63%,
    rgb(130, 0, 0,.5) 98.02%,
    rgb(125, 0, 0,.5) 98.42%,
    rgb(120, 0, 0,.5) 98.81%,
    rgb(115, 0, 0,.5) 99.21%,
    rgb(110, 0, 0,.5) 99.6%,
    rgb(105, 0, 0,.5) 100%
  );
}
</style>