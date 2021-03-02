<template>
  <div style="width:1680px">
    <!-- <router-view></router-view> -->
    <div class="left-z" style="width:20px">
    <!-- 左面第一个图表 -->
    <div class="left-1 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
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
    <div class="left-2 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
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
    <div class="left-3 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
      <div class="div-btn">
        <span class="first-text">有效风速</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-3"
        style="width:340px;height:200px;position:absolute;top:-10px;left:10px"
      ></div>
    </div>
    </div>
    <div style="position:fixed;right:0px;top:0px;margin-right:10px">
    <!-- 右面第一个图表 -->
    <div class="right-1 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
      <div class="div-btn">
        <span class="first-text">风向统计</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-4"
        style="width:340px;height:140px;position:absolute;top:22px;right:20px"
      ></div>
    </div>
    <!-- 右面第二个图表 -->
    <div class="right-2 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
      <div class="div-btn">
        <span class="first-text">遥感数据对比</span><span class="btn-1">×</span>
        <el-form>
          <el-form-item style="position:absolute;top:18px;right:22px;z-index:1">
             <el-radio-group  v-model="wxvalue" class="wxxx" size="small">
                   <el-radio-button label="ASCAT"></el-radio-button>
                   <el-radio-button label="CFOSAT"></el-radio-button>
                   <el-radio-button label="HY-2B"></el-radio-button>
             </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div
        id="main-left-5"
        style="width:340px;height:200px;position:absolute;top:-10px;right:-12px"
      ></div>
    </div>
    <!-- 右面第三个图表 -->
    <div class="right-3 bottom-line" style="background-color:rgba(0, 3, 44, 0.5)">
      <div class="div-btn">
        <span class="first-text">{{fbsj}}</span><span class="btn-1">×</span>
      </div>
      <div
        id="main-left-6"
        style="width:340px;height:200px;position:absolute;top:-10px;right:-12px"
      ></div>
      </div>
    </div>
    <!-- 高度下拉框 -->
    <div class="gdxlk">
      <el-form>
        <el-form-item label="高度:">
          <el-select v-model="value" @change="changeValue($event)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 站点名字 -->
    <span style="color:#79E5FD;position: fixed;top: 540px;left:380px;">{{zdname}}</span>
  </div>
  
</template>

<script>
import echarts from "echarts";
import bus from '../utils/eventBus'
import $ from 'jquery'

export default {
  created() {
    bus.$on('myid',(id,zdname)=>{
      // 储存站点id以及站点名称
      this.zdname=zdname
      // 将id储存起来
      this.ggpid=[]
      this.ggpid=id[0]
      
      //当id为1或2时 改变标签中文字
      if(id==1||id==2){
        this.fbsj='预报数据对比'
        this.getYuBaoShuJuDuiBi(this.ggpid)

      }else{
        this.fbsj='浮标数据对比'
        this.getfuBiaoShuJuDuiBi(this.ggpid);

    //      this.getfengSuYueBianHua(this.gdyxValue,this.ggpid);
    // this.getfengGongLvMiDuTongJi(this.gdyxValue,this.ggpid);
    // this.getyouXiaoFengSu(this.gdyxValue,this.ggpid);
    // this.getfengXiangTongJi(this.gdyxValue,this.ggpid);
    // this.getyaoGanShuJuDuiBi(this.ggpid);
      }
      //调用加载所有图表方法
    this.getfengSuYueBianHua(this.gdyxValue,this.ggpid);
    this.getfengGongLvMiDuTongJi(this.gdyxValue,this.ggpid);
    this.getyouXiaoFengSu(this.gdyxValue,this.ggpid);
    this.getfengXiangTongJi(this.gdyxValue,this.ggpid);
    this.getyaoGanShuJuDuiBi(this.ggpid);
    })
    //调用请求高度方法
    this.gaodu();
    //调用请求风速月变化方法
    this.getfengSuYueBianHua(this.gdyxValue,this.ggpid);
    //调用请求风功率密度统计方法
    this.getfengGongLvMiDuTongJi(this.gdyxValue,this.ggpid);
    //调用请求有效风速方法
    this.getyouXiaoFengSu(this.gdyxValue,this.ggpid);
    //调用请求风向统计方法
    this.getfengXiangTongJi(this.gdyxValue,this.ggpid);
    //调用请求遥感数据对比方法
    this.getyaoGanShuJuDuiBi(this.ggpid);
    //调用请求浮标数据对比
    this.getfuBiaoShuJuDuiBi(this.ggpid);
    
  },
  data() {
    return {
      //图表x轴间隔
      intervallength:'',
      //站点名称
      zdname:'海试二',
      fbsj:'浮标数据对比',
      //卫星选项值(遥感数据对比中)
      wxvalue:'ASCAT',
      //向后台传入的卫星参数
      wxvalue2:'',
      //广告牌id
      ggpid:'3',
      //高度下拉框数据
      options: [],
      //高度下拉框默认值
      value: "10",
      //高度数据
      gdList: [],
      //平均风速数据
      pjfsList: [],
      //风速标准差数据
      fsbzcList:[],
      //风功率密度统计数据
      fglmdtjList:[],
      //有效风速数据
      yxfsList:[],
      //风向统计数据
      fxtjList:[],
      //雷达风速数据对比数据
      ldfsList:[],
      //遥感风速数据
      ygfsList:[],
      //遥感时间
      ygTime:[],
      //浮标雷达风速数据对比数据
      fbldfsList:[],
      //浮标风速数据
      fbfsList:[],
      //浮标时间
      fbTime:[],
      //高度选中值
      gdyxValue:'10',
      //风速月变化的x轴数据
      fsybhLenth:[],
      //风功率密度统计的x轴数据
      fglmdtjLength:[],
      //有效风速x轴数据
      yxfsLength:[]
    };
  },
  mounted(){
    this.sizeinit()
  },
  methods: {
    
    sizeinit(){$(window).resize(function() {
			

});},
    //高度下拉框 获取选中值
    changeValue(e){
      //获取选中值 并赋值
    this.gdyxValue=e
    //调用 请求风速月变化方法
    this.getfengSuYueBianHua(this.gdyxValue,this.ggpid)
    //调用 请求风功率密度统计方法
    this.getfengGongLvMiDuTongJi(this.gdyxValue,this.ggpid)
    //调用 请求有效风速方法
    this.getyouXiaoFengSu(this.gdyxValue,this.ggpid)
    //调用 请求风向统计方法
    this.getfengXiangTongJi(this.gdyxValue,this.ggpid)
    //调用 请求遥感数据对比方法
    this.getyaoGanShuJuDuiBi(this.ggpid)
    //调用 请求浮标数据对比方法
    this.getfuBiaoShuJuDuiBi(this.ggpid)
    this.getYuBaoShuJuDuiBi(this.ggpid)
    },

    //请求高度数据方法
    gaodu() {
      this.$axios.post("/api/show/level").then(res => {
        //遍历数据
        for (var i = 0; i < res.data.length; i++) {
          //取高（数值）
          this.gdList = res.data[i];
          //获取想要的数据 赋值到options
          this.options.push({
            label: this.gdList.vLev,
            value: this.gdList.vLev,
            key: this.gdList.vLev
          });
        }
      });
    },
    //请求风速月变化方法
    async getfengSuYueBianHua(gdyxValue,ggpid) {
      //将储存平均风速数组至为空,(以便再次发起请求时，将新请求的数据储存在此数组中)
      //请求接口 获取数据
     await this.$axios.post("/api/show/MonthlyVariationWindSpeed", { "local": ggpid||3, "level": gdyxValue||10 }).then(res => {
        //清空原数组
        this.pjfsList=[]
      //将储存风速标准差数组至为空
      this.fsbzcList=[]
      //清空数组原有数据
      this.fsybhLenth=[]
          //遍历
          res.data.forEach((item) => {
            //获取平均风速数据
          this.pjfsList.push(item.vAvg);
          //获取风速标准差数据
          this.fsbzcList.push(item.vStd)
          this.fsybhLenth.push(item.vDate.substring(6,4)+'月')
          console.log(this.pjfsList,this.fsbzcList,this.fsybhLenth,'==')
          });
        });
      
      this.fengSuYueBianHua(this.pjfsList,this.fsbzcList,this.fsybhLenth);
    },
    //加载 风速月变化图表（折现图）
    //接收参数  渲染数据
    fengSuYueBianHua(pjfsList,fsbzcList,fsybhLenth) {
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
          data: fsybhLenth,
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
          }
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
            }
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
            }
          }
        ],
        // 线的数据
        series: [
          // 第一条折线数据
          {
            name: "平均风速",
            data: pjfsList,
            type: "line",
            color: "#C69C13"
          },
          // 第二条折线的数据
          {
            name: "风速标准差",
            data: fsbzcList,
            type: "line",
            color: "#1BA791"
          }
        ]
      };
      mychartsLeft1.setOption(optionLeft1);
    },
    //请求 风功率密度统计
    async getfengGongLvMiDuTongJi(gdyxValue,ggpid) {
     
      //请求接口 获取数据
     await  this.$axios.post("/api/show/WindPowerDensity",{ "local": ggpid||3, "level": gdyxValue||10 }).then(res=>{
        //清空储存风功率密度数组
      this.fglmdtjList=[]
      this.fglmdtjLength=[]

        res.data.forEach(item=>{
          this.fglmdtjList.push(item.vWe);
          this.fglmdtjLength.push(item.vDate.substring(6,4)+'月')
        })
      })
      //调用 风功率密度统计图（柱状图）
      this.fengGongLvMiDuTongJi(this.fglmdtjList,this.fglmdtjLength);
    },
    //加载 风功率密度
    fengGongLvMiDuTongJi(fglmdtjList,fglmdtjLength) {
      //加载风功率密度统计（柱状图）
      var mychartsLeft2 = echarts.init(document.getElementById("main-left-2"));
      //柱状图1
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
            data: fglmdtjLength,
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
            }
          }
        ],
        // y轴数据
        yAxis: [
          {
            type: "value",
            name: "平均风功率密度W/m²",
            nameRotate: "0.1",
            nameTextStyle: { color: "white", fontSize: 10, marginLeft: "20" },
            min: 0,
            max: 600,
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
            }
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
            }
          }
        ],

        series: [
          // 柱状图数据
          {
            name: "平均风功率密度",
            type: "bar",
            // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330],
            data: fglmdtjList,
            //设置柱状图颜色渐变
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,
                  [
                    {
                      offset: 0,
                      color: "#00b0ff"
                    },
                    {
                      offset: 0.8,
                      color: "#7052f4"
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      };
      mychartsLeft2.setOption(optionLeft2);
    },
    //请求有效风速
   async getyouXiaoFengSu(gdyxValue,ggpid) {
  
      //请求接口 获取数据
    await this.$axios.post('/api/show/EffectiveWindSpeed',{"local":ggpid||3,"level":gdyxValue||10}).then(res=>{
      //将储存有效风速数组至为空
     this.yxfsList=[]
     this.yxfsLength=[]
      //遍历数据 获取有效风速数据
        res.data.forEach(item=>{
          
          this.yxfsList.push(item.vFValid*100)
          this.yxfsLength.push(item.vDate.substring(6,4)+'月')
        })
      })
      //调用 加载有效风速
      this.youXiaoFengSu(this.yxfsList,this.yxfsLength);
    },
    //加载有效风速
    youXiaoFengSu(yxfsList,yxfsLength) {
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
            data: yxfsLength,
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
            }
          }
        ],
        // y轴数据
        yAxis: [
          {
            type: "value",
            name: "%",
            nameTextStyle: { color: "white", fontSize: 10 }, //坐标轴单位样式
            // nameRotate:'0.1',
            min: 0,
            max: 100,
            interval: 20,
            //坐标轴文字颜色
            axisLabel: {
              // formatter: "{value}",
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
            }
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
            }
          }
        ],
        // 柱状图数据
        series: [
          {
            name: "有效风速频率",
            type: "bar",
            // data: [120, 149, 170, 232, 256, 767, 435, 562, 326, 200, 364, 330],
            data: yxfsList,
            //设置柱状图颜色渐变
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,
                  [
                    {
                      offset: 0,
                      color: "#00b0ff"
                    },
                    {
                      offset: 0.8,
                      color: "#7052f4"
                    }
                  ],
                  false
                )
              }
            }
          }
        ]
      };
      mychartsLeft3.setOption(optionLeft3);
    },
    //请求风向统计方法
   async getfengXiangTongJi(gdyxValue,ggpid) {
      //请求接口 获取数据
      await this.$axios.post('/api/show/WindDirection',{"local":ggpid||3,"level":gdyxValue||10}).then(res=>{
       //清空原数组
       this.fxtjList=[]
        //判断data是否为空
      if(res.data.length==0){
        //调用 加载风向统计方法
         this.fengXiangTongJi(this.fxtjList);
      }else{
        let a=[]
        a.push(res.data[0])
        a.forEach(item=>{
          this.fxtjList.push(item.vFreE*100,item.vFreEne*100,item.vFreEse*100,item.vFreN*100,item.vFreNe*100,item.vFreNne*100,
                 item.vFreNnw*100,item.vFreNw*100,item.vFreS*100,item.vFreSe*100,item.vFreSse*100,item.vFreSsw*100,
                 item.vFreSw*100,item.vFreW*100,item.vFreWnw*100,item.vFreWsw*100)
        })
         //调用 加载风向统计方法（玫瑰图）
      this.fengXiangTongJi(this.fxtjList);
       }
      })   
    },
    //加载风向统计（玫瑰图）
    fengXiangTongJi(fxtjList) {
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
          min: 0,            //0
          max: 24,         //0.3
          interval: 4,    //0.1
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
            data: fxtjList,
            coordinateSystem: "polar",
            stack: "a"
          }
        ]
      };

      mychartsLeft4.setOption(optionLeft4);
    },
    //请求遥感数据对比
    async getyaoGanShuJuDuiBi(ggpid) {
      
      //请求接口 获取数据
      await this.$axios.post('/api/show/RemoteSensingData',{"id":ggpid||3,"sat":this.wxvalue2||"ascat"}).then(res=>{
        //清楚数组中上一次的值
      this.ldfsList=[]
      this.ygfsList=[]
      this.ygTime=[]
        
        this.intervallength=Math.floor( res.data.length/4)
        if(this.gdyxValue==10){
 //遍历数据 
       res.data.forEach(item=>{
         //获取雷达风速数据
         this.ldfsList.push(item.wsLidar)
         //获取x轴时间
         this.ygTime.push(item.time.substring(0,10))
         //获取遥感数据
          this.ygfsList.push(item.wsAscat)
       })
        }
       
      })
      //调用 加载遥感数据对比（折现图）
      this.yaoGanShuJuDuiBi(this.ldfsList,this.ygfsList,this.ygTime,this.intervallength);
    },
    //加载遥感数据对比
    yaoGanShuJuDuiBi(ldfsList,ygfsList,ygTime,intervallength) {
      //右侧折线图1
      var mychartsLeft5 = echarts.init(document.getElementById("main-left-5"));
      var optionLeft5 = {
        //  图例相关
        legend: {
          orient: "horizontal",
          x: "center", //可设定图例在左、右、居中
          y: "bottom",
          padding: [0, 50, 20, 0],
          textStyle: {
            color: "white"
          },
          data: ["雷达风速", "遥感风速"]
        },
        //x轴数据
        xAxis: {
          type: "category",
          data: ygTime,
          axisLabel: {
            interval:intervallength||20,      //坐标轴是否全部显示
            // rotate:8,        //坐标轴文字倾斜
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
          //去掉坐标轴刻度线
          axisTick: {
            show: false,
            alignWithLabel:true
          }
        },
        //y轴数据
        yAxis: [
          {
            name: "风速m/s",
            nameTextStyle: { color: "white", fontSize: 10 },
            type: "value",
            min: 0,
            max: 18,
            interval: 6,
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
            }
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
            }
          }
        ],
        series: [
          {
            symbol:"none",
            showAllSymbol: true,    //是否全部显示数据
            name: "雷达风速",
            data: ldfsList,
            type: "line",
            color: "#7E01DB",
            // 折现下面的区域样式
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(116,1,194,1)" },
                  { offset: 0.5, color: "rgba(116,1,194,.7)" },
                  { offset: 1, color: "rgba(116,1,194,.2)" }
                ])
              }
            }
          },
          {
            symbol:"none",
            showAllSymbol: true,    //是否全部显示数据
            name: "遥感风速",
            data: ygfsList,
            type: "line",
            color: "#42CF74",
            // 折现下面的样式
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(69,201,130,1)" },
                  { offset: 0.5, color: "rgba(69,201,130,.7)" },
                  { offset: 1, color: "rgba(69,201,130,.2)" }
                ])
              }
            }
          }
        ]
      };
      mychartsLeft5.setOption(optionLeft5);
    },

    // 请求 浮标数据对比
   async getfuBiaoShuJuDuiBi(ggpid) {
     
      //请求接口 获取数据
    await  this.$axios.post('/api/show/BuoyData',{"id":ggpid}).then(res=>{
      //清空数组之前的值
     this.fbldfsList=[]
     this.fbfsList=[]
     this.fbTime=[]
       //判断高度是否为10（只有高度为10的数据）
        this.intervallength=Math.floor( res.data.length/4)
       if(this.gdyxValue==10){
      //遍历数据 获取雷达风速数据
        res.data.forEach(item=>{
          this.fbldfsList.push(item.wsLidar)
          //获取浮标时间
          this.fbTime.push(item.time.substring(0,10))
          //获取浮标数据
          this.fbfsList.push(item.wsBuoy)

        })
       }else{
          this.fbldfsList=[]
          this.fbfsList=[]
          this.fbTime=[]
       }

      })
      //调用 加载浮标数据对比方法
      this.fuBiaiShuJuDuiBi(this.fbldfsList,this.fbfsList,this.fbTime,this.intervallength);
    },
   async getYuBaoShuJuDuiBi(ggpid) {
     
      //请求接口 获取数据
    await  this.$axios.post('/api/show/ForecastRes',{"local":ggpid||3,"level":this.gdyxValue||10}).then(res=>{
      
      //清空数组之前的值
       this.fbldfsList=[]
       this.fbfsList=[]
       this.fbTime=[]
      //获取图表中x轴的显示间隔
        this.intervallength=Math.floor( res.data.length/4)
       //遍历数据 获取雷达风速数据
        res.data.forEach(item=>{
          this.fbldfsList.push(item.wsLidar)
          //获取预报时间
          this.fbTime.push(item.time.substring(0,10))
          //获取预报数据
          this.fbfsList.push(item.wsAscat)
        })
      })
      let textfs='预报风速'
      //调用 加载浮标数据对比方法
      this.fuBiaiShuJuDuiBi(this.fbldfsList,this.fbfsList,this.fbTime,this.intervallength,textfs);
    },
    //加载浮标数据对比
    fuBiaiShuJuDuiBi(fbldfsList,fbfsList,fbTime,intervallength,textfs) {
      //右侧折线图2
      var mychartsLeft6 = echarts.init(document.getElementById("main-left-6"));
      var optionLeft6 = {
        //图例相关
       legend: {
          orient: "horizontal",
          x: "center", //可设定图例在左、右、居中
          y: "bottom",
          padding: [0, 50, 20, 0],
          textStyle: {
            color: "white"
          },
          data: ["雷达风速", textfs||"浮标风速"]
        },

        //x轴数据
        xAxis: {
          type: "category",
          data: fbTime,
          //坐标轴文字颜色
          axisLabel: {
            // showMinLabel: true,
            // showMaxLabel: true,
            interval:intervallength||327,      //坐标轴是否全部显示
            // rotate:8,         //坐标轴文字是否倾斜
            color: "white",
            // interval: 0, //坐标轴全部显示
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
          }
        },
        //y轴数据
        yAxis: [
          {
            name: "风速m/s",
            //坐标轴名称文字颜色（样式）
            nameTextStyle: { color: "white", fontSize: 10 },
            type: "value",
            min: 0,
            max: 18,
            interval: 6,
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
            }
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
            }
          }
        ],
        //数据
        series: [
          {
            showAllSymbol: true,    //是否全部显示数据（点）
            name:'雷达风速',
            data: fbldfsList,
            type: "line",
            symbol: "none",
            color:'#01CCF1'
            
          },
          {
            showAllSymbol:true,    //是否全部显示数据（点）
            name:textfs||"浮标风速",
            data: fbfsList,
            type: "line",
            symbol: "none",
          }
        ]
      };
      mychartsLeft6.setOption(optionLeft6);
    }
  },
  watch:{
     //动态监测路由变化  控制colorBar组件的显示
    // $route(to){
    // if(to.fullPath=='/tb'){
    //   this.getfengSuYueBianHua(this.gdyxValue,this.ggpid);
    // this.getfengGongLvMiDuTongJi(this.gdyxValue,this.ggpid);
    // this.getyouXiaoFengSu(this.gdyxValue,this.ggpid);
    // this.getfengXiangTongJi(this.gdyxValue,this.ggpid);
    // this.getyaoGanShuJuDuiBi(this.ggpid);
    // this.getYuBaoShuJuDuiBi(this.ggpid);
    // this.getfuBiaoShuJuDuiBi(this.ggpid);
    // }
    //  },
     //监听卫星值的变化
     wxvalue(value){
       if(value=='ASCAT'){
         this.wxvalue2='ascat'
       }else if(value=='CFOSAT'){
         this.wxvalue2='cfo'
       }else if(value=='HY-2B'){
         this.wxvalue2='h2b'
       }
    this.getyaoGanShuJuDuiBi(this.ggpid);

     }
     
   },
};
</script>

<style >
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
.gdxlk {
  position: fixed;
  top: 530px;
  right: 378px;
  width: 150px;
  border: 1px solid #0c96cd;
  height: 46px;
  /* background-color: rgba(0, 3, 44, 0.5); */
  /* background: rgba(4, 38, 125, 0.5); */


}
.el-select .el-input__inner{
  width: 100px;
  height: 30px;
}
/* 倒数第二个图表中卫星选则样式 */
.wxxx .el-radio-button--small .el-radio-button__inner{
  padding: 3px 8px;
}
</style>