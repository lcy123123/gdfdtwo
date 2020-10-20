<template>
  <div>
    <!-- 右侧六个小按钮 -->
    <div class="tog-six" v-if="(this.$route.path=='/tb'||this.$route.path=='/yggc'||this.$route.path=='/szyb')?false:true">
      <div @click="tog" ><img class="tog" src="../assets/up.png" alt="" /></div>
      <ul>
        <li><img src="../assets/01.png" alt="" /></li>
        <li @click="second"><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
      </ul>
    </div>
    <!-- 时间轴 -->
    <div class="sjz-z" v-if="this.$route.path!='/tb'?true:false">
      <div>
        <span class="btn-1"><img src="../assets/001.png" alt=""/></span>
        <span class="btn-2"><img src="../assets/002.png" alt=""/></span>
      </div>
      <!-- 中间时间轴 -->
      <div class="sjz-middle">
        <img class="sjz-img" src="../assets/sjz.png" alt="" />
        <el-slider  v-model="value1"></el-slider>
      </div>
      <div>
        <span class="btn-3"><img src="../assets/003.png" alt=""/></span>
        <span class="btn-4"><img src="../assets/004.png" alt=""/></span>
        <span class="btn-5"><img src="../assets/005.png" alt=""/></span>
        <span class="btn-6"><img src="../assets/006.png" alt=""/></span>
        <span class="btn-7"><img src="../assets/007.png" alt=""/></span>
      </div>
    </div>
    <div class="zy-b" v-if="(this.$route.path=='/'||this.$route.path=='/first')?true:false">
            <div class="tu">图例</div>
              <div class="zscdiv"></div>
              <div class="s1">中上层鱼类产卵场</div>
            <!-- </div> -->
        </div>

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
            <div class="wbetext" @click="Wbe">韦布尔分布图</div>
          </div>
          
          <!-- 统计图 -->
          <!-- <div id="main-1" style="width:330px;height:250px;border:1px solid red"></div> -->
          <!-- 两个小文字 -->
          <div class="small-text">
            <span>A=8.16</span>
            <span>K=2.00</span>
          </div>
          <div id="main-1" style="width:330px;height:230px;position:absolute;left:200px;top:100px"></div>
        </div>
       </div>
        </div>

  </div>
</template>
<script>
import $ from "jquery";
import up from '../assets/up.png'
import down from '../assets/down.jpg'
import echarts from 'echarts'

export default {
  data() {
    return {
      value1: 0,
      fmgflag:false,
      wbeflag:true
    };
  },
  methods: {
    //点击切换五个li的按钮的背景图片
    tog: function() {
      $("ul").slideToggle(200);
       if($('.tog').attr('src')==up){
        $('.tog').attr('src',down)
      }else{
        $('.tog').attr('src',up)
      }
    },
    //点击跳转其他页面
    second: function() {
      // 跳转页面
      this.$router.push("/second");
    },
    //点击关闭风参数(收起风参数)
    Gb:function(){
      //上滑风参数元素
      $('.fcsxx').slideToggle(400)
    },

    //点击出现风玫瑰图
    Fmg:function(){
      //判断flag的值 改变背景以及文字颜色
      if(this.fmgflag==false){
        $('.fmgtext').css('color','#01DFDF')
        $('.fmgtext').css('background','rgba(0,164,253,.5)')
        this.fmgflag=!this.fmgflag

        //改变兄弟文字 白颜色 背景深颜色
        $('.fmgtext').siblings().css('background','rgba(3,8,90,.5)')
        $('.fmgtext').siblings().css('color','white')
      }else{
        $('.fmgtext').css('color','white')
        this.fmgflag=!this.fmgflag
        $('.fmgtext').css('background','rgba(3,8,90,.5)')

        $('.fmgtext').siblings().css('background','rgba(0,164,253,.5)')
        $('.fmgtext').siblings().css('color','#01DFDF')
        
        }
    },
    //点击出现韦布尔分布图
      Wbe:function(){
        //判断自己的flag
    if(this.wbeflag==true){
        $('.wbetext').css('color','white')
        $('.wbetext').css('background','rgba(3,8,90,.5)')
        this.wbeflag=!this.wbeflag

        $('.wbetext').siblings().css('background','rgba(0,164,253,.5)')
        $('.wbetext').siblings().css('color','#01DFDF')
       
    }else{
        $('.wbetext').css('color','#01DFDF')
        this.wbeflag=!this.wbeflag
        $('.wbetext').css('background','rgba(0,164,253,.5)')

        //改变文字变白 颜色变深
        $('.wbetext').siblings().css('background','rgba(3,8,90,.5)')
        $('.wbetext').siblings().css('color','white')
    } 

  },
  //加载图表方法
  Wbetb:function(){
    
   var mychart1=echarts.init(document.getElementById("main-1"))

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
        // data:[0,0.02,0.04,0.06,0.08]
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

  mychart1.setOption(option)
  }
  },
  mounted(){
   this.Wbetb()
  }
}


</script>
<style>
.tog-six{
   position: absolute;
   top:70px;
   right: 15px;
}
.tog {
  width: 40px;
  height: 20px;
}
.tog > img {
  width: 40px;
  height: 20px;
}
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

ul {
  position: absolute;
  right: 5px;
  top: 10px;
}
li {
  font-size: 5px;
  list-style-type: none;
  cursor: pointer;
}
img {
  width: 30px;
  height: 30px;
}

.sjz-z {
  width: 610px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 25%;
  border: 1px solid #091673;
  border-radius: 30px;
}
.sjz-middle {
  position: absolute;
  left: 70px;
  top: 10px;
  width: 400px;
  height: 100%;
}
.sjz-img {
  width: 400px;
  height: 17px;
  float: left;
  margin: 0 auto;
}
.btn-1 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 18px;
}
.btn-2 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 36px;
  top: 18px;
}
.btn-3 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 115px;
  top: 15px;
}
.btn-4 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 90px;
  top: 15px;
}
.btn-5 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 65px;
  top: 15px;
}
.btn-6 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 40px;
  top: 15px;
}
.btn-7 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
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
/* 中间组件 风参数信息 */
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
.btn-1{
  font-size: 20px;
  color: #03DEE4;
  float:right;
  margin-top:-5px;
  /* 变小手 */
  cursor: pointer;
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
.fcsxx-right{
  width: 335px;
  height: 308px;
  float: right;
  /* margin-right: -15px ; */
  /* border: 1px solid green; */
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
.fcsxx-left-text{
  margin-top: 40px;
  margin-left: 5px;
}
.fcsxx-left-text div{
color: white;
font-size: 13px;
margin: 10px;
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
}
.wbetext{
  background: rgba(0,164,253,.5);
  color: #01DFDF;
}
/* .wbetext{
  background: rgba(0,164,253,.5);
} */
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