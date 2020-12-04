<template>
  <div v-drag class="fcsxx-z" style="display:none">
    <!-- 中间组件  风参数信息 -->
    <div class="fcsxx">
      <!-- 上面标题 -->
      <div class="div-btn">
        <span class="first-text">风参数信息</span>
        <span class="btn-1" @click="Gb">×</span>
      </div>
      <div class="fcsxx-z">
        <!-- 左面 -->
        <div class="fcsxx-left">
          <div class="fcsxx-left-text">
            <div>经度：{{clickLon}}°E</div>
            <div>纬度：{{clickLat}}°N</div>
            <div>高度：-56.0m</div>
            <div>风速：{{windSpeed}}</div>
            <div>风功率密度：{{windDensity}}</div>
            <div>有效风速时数: {{sighr}}</div>
            <div>50年一遇最大风速: {{windMaxSpeed}}</div>
          </div>
        </div>
        <!-- 中间占位 -->
        <div class="middle"></div>
        <!-- 右面 -->
        <div class="fcsxx-right">
          <div class="fcsxx-right-text">
            <div class="fmgtext" @click="Fmg">风玫瑰图</div>
            <div class="fglmd" style="position:absolute" @click="fglmd">
              各向风功率
            </div>
            <div class="wbetext" @click="Wbetb">韦布尔分布图</div>
          </div>

          <!-- 统计图 -->
          <!-- 两个小文字 -->
          <div class="small-text">
            <div class="KC">
              <span>K=8.16</span>
              <span>C=2.00</span>
            </div>
          </div>
          <div
            id="main-1"
            
            style="width:330px;height:230px;position:absolute;left:200px;top:100px;"
          ></div>
          <div
            id="main-2"
            
            style="width:330px;height:230px;position:absolute;left:200px;top:100px;display:none"
          ></div>
          <div
            id="main-3"
            
            style="width:330px;height:230px;position:absolute;left:200px;top:100px;display:none"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import echarts from "echarts";
import bus from "../utils/eventBus";

export default {
  data() {
    return {
      szyb: "",
      //经度
      clickLon: "",
      //纬度
      clickLat: "",
      //储存风玫瑰风能
      fmgfn:[],
      //储存风玫瑰风向
      fmgfx:[],
      //风速
      windSpeed:'',
      //风功率密度
      windDensity:'',
      //有效风速时数
      sighr:'',
      //五十年一遇极大风速
      windMaxSpeed:'',

    };
  },
  //钩子函数（加载完dom后调用加载图表方法）
  mounted() {
    //调用加载韦布尔图表方法
    this.Wbetb();
    //调用接收经纬度方法
    this.getLonAndLat()
    //调用接收格点风参方法
    this.getgdfc();
    this.getData()

  },
  // 自定义指令（拖动div移动）
        directives:{
            drag(el){
                el.onmousedown = function(e){
                    var disx = e.pageX - el.offsetLeft;
                    var disy = e.pageY - el.offsetTop;
                    document.onmousemove = function (e){
                        el.style.left = e.pageX - disx+'px';
                        el.style.top = e.pageY - disy+'px';
                    }
                    document.onmouseup = function(){
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            }
        },
  methods: {
    //接收格点风参
    getgdfc() {
      bus.$on("addimg", szyb => {
        this.szyb = szyb;
        if (
          this.clickLon !== "" &&
          this.clickLat !== "" &&
          this.szyb == "格点风参"
        ) {
          $(".fcsxx-z").show();
        } else {
          $(".fcsxx-z").hide();
          this.clickLon = "";
          this.clickLat = "";
        }

      });
    },
    //接收经纬度并判断
    getLonAndLat(){
       bus.$on("lonAndlat", (clickLon, clickLat) => {
      // this.clickLon = clickLon;
      // this.clickLat = clickLat;
      //如果是格点风参并且经纬度不为空则显示组件
      if (clickLon !== "" && clickLat !== "" && this.szyb == "格点风参") {
        console.log(this.clickLon,this.clickLat,'===---')
        let lon=clickLon.toString()
        let lat=clickLat.toString()
        this.clickLon=lon.substring(0,lon.indexOf('.')+5)
        this.clickLat=lat.substring(0,lat.indexOf('.')+5)
        $(".fcsxx-z").show();
        //调用获取数据方法
        this.getData()
        //调用风玫瑰（后期对加载图表进行抽离  替换）
        this.addFmg()
        //如果不是格点风参则清除经纬度
      } else {
        $(".fcsxx-z").hide();
        this.clickLon='';
        this.clickLat='';
      }
    });
    },
    //点击关闭风参数(收起风参数)
    Gb: function() {
      //上滑风参数元素
      $(".fcsxx-z").hide();
    },
    //请求图表数据方法
   async getData(){
     console.log(this.clickLon,this.clickLat,'=-=-=-=111')
      //请求数据（风玫瑰）
    //  await this.$axios.post('/api/param/GetData',{"lon":"118.389084","lat":"17.9811","level":1}).then(res=>{
     await this.$axios.post('/api/param/GetData',{"lon":this.clickLon,"lat":this.clickLat,"level":1}).then(res=>{
        console.log(res.data,'===')
        // console.log(res.data,'===')
        for(let i=0;i<16;i++){
        //风能频率
         this.fmgfn.push(res.data.windFre.split(';')[i])
         //风向频率
         this.fmgfx.push(res.data.windFwd.split(';')[i])
        }
        //风速
        let Speed=res.data.windSpeed.toString()
       this.windSpeed=Speed.substring(0,Speed.indexOf('.')+3);
       //风功率密度
       let Density=res.data.windDensity.toString()
       this.windDensity=Density.substring(0,Density.indexOf('.')+3);
       //有效风速时数
       this.sighr=res.data.sighr;
       //五十年一遇极大风速
       let MaxSpeed=res.data.windMaxSpeed.toString()
       this.windMaxSpeed=MaxSpeed.substring(0,MaxSpeed.indexOf('.')+3);
       
      })
    },
    //点击出现风玫瑰图
    async Fmg() {
      //判断flag的值 改变背景以及文字颜色  初始为false
        $(".wbetext").removeClass("clickcss");
        $(".fglmd").removeClass("clickcss");
        $(".fmgtext").addClass("clickcss");
        $('.KC').css('display','none')
        
        //隐藏另一个 显示自己的
        $("#main-1").hide();
        $("#main-3").hide();
        $("#main-2").show();
        //将点击的经纬度添加到页面上
        
      //调用请求数据方法
      await this.getData()
      await this.addFmg()

      
    },
      //渲染图表(风玫瑰图)
    addFmg(){
      var mychart2 = echarts.init(document.getElementById("main-2"));
      var options2 = {
        //玫瑰图颜色
        color: "#01BA45",
        //圆圈相关(角度轴)
        angleAxis: {
          type: "category",
          data: [
            'N',
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW"
          ],
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
          // name: "N",
          nameTextStyle: {
            // color: "red" //坐标轴文字颜色
          },
          min: 0, //0
          max: 0.6, //0.3
          interval: 0.15, //0.1
          axisLabel: {
            color: "white"
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
        polar: {
          center: ["50%", "50%"]
        },
        //数据
        series: [
          {
            type: "bar",
            // data: [1, 2, 3, 4, 3, 5, 1, 3, 4, 5, 6, 7, 8, 9, 1],
            data: this.fmgfn,
            // data: fxtjList,
            coordinateSystem: "polar",
            stack: "a"
          }
        ]
      };
      mychart2.setOption(options2);
    },
    //点击出现风功率密度
   async fglmd() {
      //添加样式
      $(".fglmd").addClass("clickcss");
      $(".fmgtext").removeClass("clickcss");
      $(".wbetext").removeClass("clickcss");
      $('.KC').css('display','none')

      //出现对应图表
      $('#main-1').hide()
      $('#main-2').hide()
      $('#main-3').show()
     await this.getData()

      //风功率密度图表
      var mychart3 = echarts.init(document.getElementById("main-3"));
      var options3 = {
        //玫瑰图颜色
        color: "#01BA45",
        //圆圈相关(角度轴)
        angleAxis: {
          type: "category",
          data: [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW"
          ],
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
          name: "N",
          nameTextStyle: {
            // color: "red" //坐标轴文字颜色
          },
          min: 0, //0
          max: 0.6, //0.3
          interval: 0.15, //0.1
          axisLabel: {
            color: "white"
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
        polar: {
          center: ["50%", "50%"]
        },
        //数据
        series: [
          {
            type: "bar",
            // data: [4, 4, 5, 1, 1, 5, 1, 3, 4, 5, 1, 2, 3, 4, 9],
            data: this.fmgfx,
            // data: fxtjList,
            coordinateSystem: "polar",
            stack: "a"
          }
        ]
      };
      mychart3.setOption(options3);
    },
    //加载图表方法(已在mounted中调用)
    Wbetb() {
        $(".wbetext").addClass("clickcss");
        $(".fmgtext").removeClass("clickcss");
        $(".fglmd").removeClass("clickcss");
        $('.KC').css('display','block')
        //隐藏另两个显示自己的
        $("#main-1").show();
        $("#main-2").hide();
        $("#main-3").hide();
        

      //为图表设定容器
      var mychart1 = echarts.init(document.getElementById("main-1"));
      //设置图表属性（图表配置项）
      var option = {
        grid: {
          left: "0%",
          right: "18%",
          bottom: "10%",
          containLabel: true
        },
        color: "#3A97DB",
        xAxis: {
          name: "风速(m/s)",
          // nameTextStyle:{color:"white",fontSize:10,padding:[0,0,0,0]},
          nameTextStyle: {
            color: "white",
            fontSize: 10,
            margin: [0, 0, 0, 40]
          },
          nameRotate: "0.1",
          type: "category",
          boundaryGap: false,
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24"
          ],
          axisLabel: {
            color: "white"
          },

          axisLine: {
            lineStyle: {
              color: "#215496"
            }
          },
          //去掉坐标轴刻度线
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          name: "风频率",
          nameTextStyle: { color: "white", fontSize: 10 },
          min: 0,
          max: 0.08,
          interval: 0.02,
          //改变y轴文字颜色
          axisLabel: {
            color: "white"
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
          }
        },
        series: [
          {
            data: [
              0,
              0.02,
              0.01,
              0.04,
              0.05,
              0.06,
              0.05,
              0.03,
              0.04,
              0.05,
              0.06,
              0.07,
              0.08
            ],
            type: "line",
            //折现下面区域颜色的渐变
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(9,109,221,1)" },
                  { offset: 0.5, color: "rgba(9,109,221,.8)" },
                  { offset: 1, color: "rgba(9,109,221,.2)" }
                ])
              }
            },
            //折线是否圆滑
            smooth: true
          }
        ]
      };
      //将设置好的图表配置项添加到容器中
      mychart1.setOption(option);
    }
  }
};
</script>
<style  scoped>
.fcsxx {
  width: 530px;
  height: 330px;
  /* border: 1px solid red; */
  position: absolute;
  top: 100px;
  left: 320px;
  border: 1px solid #0b1b7a;
  background: linear-gradient(to left, #01a2fe, #01a2fe) left bottom no-repeat,
    linear-gradient(to bottom, #01a2fe, #01a2fe) left bottom no-repeat,
    linear-gradient(to left, #01a2fe, #01a2fe) right bottom no-repeat,
    linear-gradient(to bottom, #01a2fe, #01a2fe) right bottom no-repeat;
  background-size: 2px 23px, 23px 2px, 2px 23px, 23px 2px;
  background-color: rgba(0, 3, 44, 0.5);
}
.div-btn {
  color: white;
  background: rgba(4, 38, 125, 0.5);
}
.first-text {
  /* color:#00C4E0 ; */
  margin-left: 15px;
  /* 文字颜色渐变 */
  background: linear-gradient(90deg, #0459d3, #84e6f7, #0459d3);
  -webkit-background-clip: text;
  color: transparent;
}
.fcsxx-z {
  width: 100%;
  height: 308px;
  position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    /* z-index: 1; */
  /* border: 1px solid red; */
  /* background-color:rgba(0,3,44,.5) ; */
}
.fcsxx-left {
  width: 180px;
  height: 308px;
  float: left;
  /* display: inline-block; */
  /* border: 1px solid red ; */
}
.fcsxx-left-text {
  margin-top: 40px;
  margin-left: 5px;
}
.fcsxx-left-text div {
  color: white;
  font-size: 13px;
  margin: 10px;
}
.middle {
  width: 2px;
  height: 300px;
  /* border: 1px solid red; */
  background-color: #015388;
  float: left;
  margin-left: 6px;
  margin-top: 5px;
}
.fcsxx-right {
  width: 335px;
  height: 308px;
  float: right;
  /* margin-right: -15px ; */
  /* border: 1px solid green; */
}
.fcsxx-right-text {
  width: 230px;
  height: 34px;
  margin-left: -4px;
  margin-top: 20px;
}
.fcsxx-right-text div {
  display: inline-block;
  /* color: white; */
  width: 110px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #0b1b7a;
  text-align: center;
}
.fmgtext,
.fglmd {
  background: rgba(3, 8, 90, 0.5);
  color: white;
  cursor: pointer;
}
.wbetext {
  background: rgba(3, 8, 90, 0.5);
  color: white;
  cursor: pointer;
  position: absolute;
  right: 3px;
}
.small-text {
  color: white;
  margin-left: 100px;
  margin-top: 30px;
}
.small-text span {
  margin-right: 5px;
  font-size: 13px;
}
/* 两套css样式 */
.clickcss {
  color: #01dfdfdf;
  background: rgba(0, 164, 253, 0.5);
}
.KC{
  position: absolute;
  right: 20px;
  top:80px
}
</style>