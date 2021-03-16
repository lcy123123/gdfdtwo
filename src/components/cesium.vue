<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import bus from "../utils/eventBus";
// import Cesium from 'cesium'
let Cesium = require("cesium/Source/Cesium");

import TooltipDiv from "../utils/toolTip";
import $ from 'jquery'

export default {
  // name: "CesiumScene",
  data() {
    return {
      zsjdvalue:'中上层',
      clickLon:"",
      clickLat:"",
      //站点数据
      dataList: [],
      viewer: null,
      ggpid: [],
      //其他组件传过来的值（鱼类产卵场）
      ylclc: "",
      //其他组件传过来的值（年平均风速）
      szybvalue: "",
      // 图片路径（数值预报）
      imgList:[],
      // 月平均值数组
      monthAvg:[],
      //年平均值
      yearAvg:[],
      maxLon:'',
      maxLat:'',
      minLon:'',
      minLat:'',
      gdvalue:'',
      yggcImg:[],
      //传过来的 年份
      value1:'',
      //存取 根据年份 轴为12个月的图片路径数组 
      sliderList:[],
      //存取 根据年份 轴为0-23小时的图片路径数组
      hourList:[],
      //存取 根据年份 轴为1-30图片路径数组 
      thirtyList:[],
      //逐小时月平均风速
      hourMounthList:[],
      //单张图片
      singleImgList:'',
      singlemaxLon:'',
      singlemaxLat:'',
      singleminLon:'',
      singleminLat:'',
      //台风频次
      tfpcimg:'',
      tfpcmaxLat:'',
      tfpcmaxLon:'',
      tfpcminLat:'',
      tfpcminLon:'',
      //年份的 图片数组（数值预报）
      yearPicList:[],
      //有效波高中有轴的
     routePic :{"逐年平均值":'YEAR_AVG',"逐年最大值":'YEAR_MAX',"逐年最小值":'YEAR_MIN',"逐月平均值":'MONTH_AVG','逐月最大值':'MONTH_MAX','逐月最小值':'MONTH_MIN'},
     //有效波高中单张图片的
     singlePic:{'十年平均值':'YEARS_AVG','十年最大值':'YEARS_MAX','十年最小值':'YEARS_MIN','十年一遇':'PEAK10','三十年一遇':'PEAK30'},
     //数值预报中 开始年份 结束年份的
     startEndYearPic:{'风向分布频率':'FWDS','各向风功率密度分布频率':'FWES','年平均风速':'WSPD_YR','年平均风功率密度':'Dwp','有效风速时数':'NSIGHR','风切变系数':'ALPHA_ALL','威布尔分布形状参数':'SHAPE','威布尔分布尺度参数':'SCALE'},
     //年份 （数值预报）
     YearPic:{'月平均风速':'WSPD_MN','逐小时年平均风速':'WSPD_HY','月平均风功率密度':'DWP_MN','各区间风速分布频率':'FWS','各区间风功率密度分布频率':'FWE'},
     //轴为1-12月（遥感观测）
     yggcImgList:[],
     hander:""
    };
  },

  mounted() {
    //接收中上层 近底层参数 并调用加载矢量数据方法
    bus.$on('zsjd',(zsjdvalue)=>{
      this.zsjdvalue=zsjdvalue
      this.clearSl()
      if(zsjdvalue=='中上层'){
        this.AddSl(this.viewer,this.ylclc,zsjdvalue)
      }else{
        this.AddSl(this.viewer,this.ylclc,zsjdvalue)
      }
    })
    //调用初始化地球方法
    this.init();
      this.viewer.scene.morphTo2D(1);

    //接收切换二维地图
    // bus.$on('twodt',()=>{
    //   // 将三维地球转换为二维地图
    //   this.viewer.scene.morphTo2D(1);
    //  //调用自定义切换二三维地图方法
    //   this.setViewType('二维视图')

    // })
    //接收切换三维地球
    // bus.$on('threedt',()=>{
    //   // 将二维地图转换为三维
    //   this.viewer.scene.morphTo3D(1)
    //   //调用自定义切换二三维地图方法
    //   this.setViewType('三维视图')
    // })
    //接收参数 隐藏广告牌
    bus.$on('hideggp',()=>{
      this.hander.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          // if(this.viewer.entities.getById(`5`)) {
            this.viewer.entities.remove({id: '5'})  
    })
    
    // this.AddSl2(this.viewer)
    //接收组件传值(高度)
    bus.$on('gdvalue',(gdvalue1)=>{
      this.gdvalue=gdvalue1
      let gdvalue=''
      if(gdvalue1=='10'){
        gdvalue=0
      }else if(gdvalue1=='30'){
        gdvalue=1
      }else if(gdvalue1=='50'){
        gdvalue=2
      }else if(gdvalue1=='70'){
        gdvalue=3
      }else if(gdvalue1=='80'){
        gdvalue=4
      }else if(gdvalue1=='90'){
        gdvalue=5
      }else if(gdvalue1=='100'){
        gdvalue=6
      }else if(gdvalue1=='110'){
        gdvalue=7
      }else if(gdvalue1=='120'){
        gdvalue=8
      }else if(gdvalue1=='130'){
        gdvalue=9
      }
      else if(gdvalue1=='150'){
        gdvalue=10
      }
      this.AddImg(this.viewer,this.szybvalue,gdvalue)
    })
    
    // 调用请求json数据方法
    // this.getdataList();
    
    //接收数值预报组件传过来的值
    bus.$on("addimg", szybvalue => {
      bus.$off("szyb");
      bus.$off("yxbg");
      bus.$off("yggc");
      // bus.$off("tfpc");
      // 调用加载图片方法
      this.szybvalue = szybvalue;
      //调用添加图片方法并传参
      this.AddImg(this.viewer, this.szybvalue);
      
    });
    //加载矢量数据方法（评估背景）
    bus.$on("pgbj", pgbjvalue => {
    
      this.clearImg()
      this.ylclc = pgbjvalue;
      this.AddSl(this.viewer, this.ylclc,this.zsjdvalue);
      //海岸线矢量
    //  this.AddSl2(this.viewer,this.ylclc)

    });
    //接收传值（评估决策）
    bus.$on('pgjc',(pgjc)=>{
      //清除图片
      this.clearImg()
      //清除矢量
      this.clearSl()
      if(pgjc==='可开发厂址推荐'){
      this.farmall(this.viewer)
      }else{
      this.allsites(this.viewer)
      let params={material:'RED'}
      this.AddSlxian(this.viewer,pgjc,params)
      }
      // this.mouseMove()

    })
    //接收有效波高传过来的值
    bus.$on('addyxbgimg',(szybvalue)=>{
      bus.$off("szyb");
      bus.$off("yxbg");
      bus.$off("yggc");
      
      this.AddImg(this.viewer,szybvalue)
    })

      bus.$on('addzhtqimg',(szybvalue,flag)=>{
        //接收台风频次以及标志量（flase为显示 true为不显示）
        if(flag){
          //不显示  清除图层
        this.clearImg()
        }else{
          //显示 调用加载图片方法
         bus.$off("szyb");
         bus.$off("yxbg");
         bus.$off("yggc"); 
        this.AddImg(this.viewer,szybvalue)
        } 
      })

    //接收遥感观测传过来的参数
    bus.$on('yggc',()=>{
      bus.$off("szyb");
      bus.$off("yxbg");
      bus.$off("yggc");
      this.AddImg(this.viewer)
    })
    //调用添加广告牌方法
    // this.Addggp();   
  },

  methods: {
    //请求本地json方法 (站点)
    async getdataList() {
      await this.$axios.get("./station_GD.json").then(res => {
        // 将请求到的数据赋值
        this.dataList = res.data;
        //对请求的数据遍历
        res.data.forEach(
          params => {
            //调用添加广告牌方法
            this.Addggp(params);
          },
          this.mouseMove(),
          this.ChuanId()
        );
      });
    },
    //初始化方法
    init() {
      let viewerOption = {
        // sceneModePicker : false, //是否显示二三维转换按钮
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        // 只在三维加载矢量数据
        // scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        baseLayerPicker: false, // 底图切换控件
        animation: false, // 控制场景动画的播放速度控件
        
        
        // terrainProvider: Cesium.createWorldTerrain(),
              //将三维地图转化为二维地图
            // sceneMode : Cesium.SceneMode.SCENE2D,
            //图片显示是否倾斜
          //  mapMode2D : Cesium.MapMode2D.ROTATE,


        // 初始化天地图
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          // url: "/web/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
          url:
            "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=0d330c6c4d21dd7d90082a89bc1e7cab",
          layer: "tdtBasicLayer",
          style: "default",
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      };
      
      var viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
      
     //取消二三维转换的动画
      viewer.sceneModePicker.viewModel.duration = 0.0

      // 将位置定位到中国 通过给xyz的坐标控制在广东位置
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
        
        // orientation: {
        //   heading: Cesium.Math.toRadians(348.4202942851978),
        //   pitch: Cesium.Math.toRadians(-89.74026687972041),
        //   roll: Cesium.Math.toRadians(0)
        // },
        // complete: function callback() {}
      });


      this.viewer = viewer;
      //调用点击获取经纬度坐标
      // this.dbClick(this.viewer)
      
      // // 在地图中添加矢量数据（左下角图）---可执行
      // var colorList = [[120, 0, 136],[90, 0, 184],[70, 0, 245],[0, 170, 225],[0, 200, 200],[0, 200, 125],[195, 255, 0],[255, 255, 0],[255, 155, 0],[255, 0, 0]];
      // var promise1 = Cesium.GeoJsonDataSource.load("./1.json");
      // promise1.then(function(dataSource) {
      //   viewer.dataSources.add(dataSource);

      //   var entities = dataSource.entities.values;
      //   for (var i = 0; i < entities.length; i++) {
      //     var entity = entities[i];
      //     console.log(entity.properties.value.valueOf());
      //     let colorIndex = entity.properties.value.valueOf();
      //     entity.polygon.material = new Cesium.Color(
      //       colorList[colorIndex][0] / 255,
      //       colorList[colorIndex][1] / 255,
      //       colorList[colorIndex][2] / 255,
      //       0.7
      //     );
      //     entity.polygon.outline = true;
      //     // entity.polygon.extrudedHeight =5000.0;
      //   }
      // });
      // 是否以此矢量数据定位至中心
      // viewer.flyTo(promise1);

      viewer._cesiumWidget._creditContainer.style.display = "none";
    },
    //自定义转换二三维地图方法
    setViewType (viewType) {
       var scene = this.viewer.scene;
        switch (viewType) {
        case "三维视图":
          //如果参数是三维地图则转成三维并重新定位 
            scene.morphTo3D(0);
            $(".cesium-sceneModePicker-wrapper").hide();
            $(".cesium-sceneModePicker-wrapper").toggle(50);
            //重新定位
           this.viewer.camera.flyTo({
             destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
            //   orientation: {
            //   heading: Cesium.Math.toRadians(348.4202942851978),
            //   pitch: Cesium.Math.toRadians(-89.74026687972041),
            //   roll: Cesium.Math.toRadians(0)
            // },
            // complete: function callback() {}
             });
            break;
        case "二维视图":
          //转成二维
            scene.morphTo2D(0);
            $(".cesium-sceneModePicker-wrapper").hide();
            $(".cesium-sceneModePicker-wrapper").toggle(50);
            //重新定位
            this.viewer.camera.flyTo({
             destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
            //  orientation: {
            //  heading: Cesium.Math.toRadians(348.4202942851978),
            //  pitch: Cesium.Math.toRadians(-89.74026687972041),
            //  roll: Cesium.Math.toRadians(0)
            //  },
              // complete: function callback() {}
               });
            break;
    }
},






    //清除图层
    clearImg(){
     //获取所有图层的长度
        var len2 = this.viewer.imageryLayers.length;
        //如果有图层则则获取图层并移除
    
        if (len2 > 0) {
          //注意 i要从1开始取（因为，原本天地图图中有一层）
          for (var i2 = 0; i2 <len2; i2++) {
            //获取图层
            var imageryLayer2 = this.viewer.imageryLayers.get(1);
            // 移除（方法：viewer.imageryLayers.remove）
            this.viewer.imageryLayers.remove(imageryLayer2);
          }
          //没有则结束
        } else {
          return;
        }
    },
    //添加矢量数据
    AddSl(viewer, ylclc,zsjdvalue) {
      this.clearSl()
      var promisezs = Cesium.GeoJsonDataSource.load("./zsc.json", {
      // var promise = Cesium.GeoJsonDataSource.load("./jdc.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?", //多边形
        show: true
      });
      var promisejd = Cesium.GeoJsonDataSource.load("./jdc.json", {
      // var promise = Cesium.GeoJsonDataSource.load("./jdc.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?", //多边形
        show: true
      });
      //判断被点击是不是鱼类产卵场 是则将创建好的矢量是加载上 不是则判断是否有矢量数据 如果有则取消
      //判断渔场为中上层还是近底层 并加载不同json文件
      if (ylclc === "鱼类产卵场"&&zsjdvalue=='中上层') {
        viewer.dataSources.add(promisezs);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      } else if(ylclc === "鱼类产卵场"&&zsjdvalue=='近底层'){
        viewer.dataSources.add(promisejd);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      }
    },
     //添加矢量数据（沿海线）
    AddSl2(viewer, ylclc) {
      var promise = Cesium.GeoJsonDataSource.load("./zg.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?", //多边形
        show: true
      });
      //判断被点击是不是鱼类产卵场 是则将创建好的矢量是加载上 不是则判断是否有矢量数据 如果有则取消
      if (ylclc === "鱼类产卵场") {
        viewer.dataSources.add(promise);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      } else {
        var len = viewer.dataSources.length;
        //判断数量数据是否有
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            //获取到矢量数据
            var dataSource = viewer.dataSources.get(i);
            //移除矢量数据
            viewer.dataSources.remove(dataSource);
          }
        } else {
          return;
        }
      }
    },
    //可开发容量
    allsites(viewer) {
      this.clearSl()
      var promise = Cesium.GeoJsonDataSource.load("./allsites.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?", //多边形
        show: true
      });
      //判断被点击是不是鱼类产卵场 是则将创建好的矢量是加载上 不是则判断是否有矢量数据 如果有则取消
      // if(ylclc=='可开发容量'){
        viewer.dataSources.add(promise);
        viewer._cesiumWidget._creditContainer.style.display = "none";

        // 在地图中添加矢量数据（左下角图）---可执行
      var colorMap = {'30':[214,214,255],'40':[188,190,245],'50':[166,171,237],'60':[143,151,227],'80':[123,136,219],'100':[102,120,209],'110':[85,108,201],'120':[67,96,191],'150':[51,87,184],'160':[36,78,173],'180':[23,71,166],'450':[11,64,156],'670':[0,57,148]} 
      // var colorList = [[120, 0, 136],[90, 0, 184],[70, 0, 245],[0, 170, 225],[0, 200, 200],[0, 200, 125],[195, 255, 0],[255, 255, 0],[255, 155, 0],[255, 0, 0]];
      var promise1 = Cesium.GeoJsonDataSource.load("./allsites.json");
      promise1.then(function(dataSource) {
        viewer.dataSources.add(dataSource);

        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          let colorIndex = entity.properties.Capacity.valueOf();
          entity.polygon.material = new Cesium.Color(
            colorMap[colorIndex][0] / 255,
            colorMap[colorIndex][1] / 255,
            colorMap[colorIndex][2] / 255,
            0.7
          );
          entity.polygon.outline = false;
          // entity.polygon.extrudedHeight =5000.0;
        }
      });
      // 是否以此矢量数据定位至中心
      // viewer.flyTo(promise1);
      // }
      
    },
   //清除矢量
    clearSl(){
    var len = this.viewer.dataSources.length;
        //判断数量数据是否有
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            //获取到矢量数据
            // var dataSource = this.viewer.dataSources.get(i);
            //移除矢量数据
            // this.viewer.dataSources.remove(dataSource);
            // console.log(dataSource)
            // 清除所有矢量
            this.viewer.dataSources.removeAll();
          }
        } else {
          return;
        }
    },
  //可开发厂址推荐
    farmall(viewer) {
      this.clearSl()
      var promise = Cesium.GeoJsonDataSource.load("./farmall.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?", //多边形
        show: true
      });
      //判断被点击是不是鱼类产卵场 是则将创建好的矢量是加载上 不是则判断是否有矢量数据 如果有则取消
      // if(ylclc=='可开发厂址推荐'){
        viewer.dataSources.add(promise);
        viewer._cesiumWidget._creditContainer.style.display = "none";
      // }
     
    },
//线的矢量
 AddSlxian(viewer, ylclc) {
   
var promise = Cesium.GeoJsonDataSource.load("./seedepth50mline_GD.json");
      promise.then(function(dataSource) {
      viewer.entities.add({
        name:"seedepth50mline_GD",
        polyline: {
                positions:dataSource.entities.values,
                width: 10,
                arcType: Cesium.ArcType.NONE,
                material: new Cesium.PolylineArrowMaterialProperty(
                  Cesium.Color.PURPLE
                )   ,
                Color:Cesium.Color.RED
              }
          })
        }) 
      
      // viewer.entities.add(entity);
      // });
        // viewer.entities.add(entity);
      // var promise = Cesium.GeoJsonDataSource.load("./seedepth50mline_GD.json", {
      //   stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
      //   // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
      //   // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
      //   fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
      //   strokeWidth: 5, //多边形的厚度
      //   // markerSymbol: "?", //多边形
      //   show: true
      // });
      //判断被点击是不是鱼类产卵场 是则将创建好的矢量是加载上 不是则判断是否有矢量数据 如果有则取消
      if (ylclc === "可开发容量") {
        viewer.dataSources.add(promise);
        viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      } else {
        var len = viewer.dataSources.length;
        //判断数量数据是否有
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            //获取到矢量数据
            var dataSource = viewer.dataSources.get(i);
            //移除矢量数据
            viewer.dataSources.remove(dataSource);
          }
        } else {
          return;
        }
      }
    },

 async getyggc(Wx,Wxcs){
        var ele=''
        this.yggcImg=[]
        if(Wx=='ASCAT'){
            if(Wxcs=='月平均风速'||Wxcs=='月平均风功率密度'){
              if(Wxcs=='月平均风速'){
                ele='ASCAT_WSP_MN'
              }else if(Wxcs=='月平均风功率密度'){
                ele='ASCAT_WPW_MN'
              }
                 this.yggcImg=[]
              await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              // console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            
            } else{
              if(Wxcs=='年平均风速'){
                ele='ASCAT_WSP_YR'
              }else{
                ele='ASCAT_WPW_YR'
              }
                 this.yggcImg=[]
               await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            }
          }else if(Wx=='WindSat'){
            if(Wxcs=='月平均风速'||Wxcs=='月平均风功率密度'){
              if(Wxcs=='月平均风速'){
                ele='WINDSAT_WSP_MN'
              }else if(Wxcs=='月平均风功率密度'){
                ele='WINDSAT_WPW_MN'
              }
                 this.yggcImg=[]
              await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              // console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            
            } else{
              if(Wxcs=='年平均风速'){
                ele='WINDSAT_WSP_YR'
              }else{
                ele='WINDSAT_WPW_YR'
              }
                 this.yggcImg=[]
               await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            }
          }else if(Wx=='CFOSAT'){
            if(Wxcs=='月平均风速'||Wxcs=='月平均风功率密度'){
              if(Wxcs=='月平均风速'){
                ele='CFO_WSP_MN'
              }else if(Wxcs=='月平均风功率密度'){
                ele='CFO_WPW_MN'
              }
                 this.yggcImg=[]
              await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              // console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            
            } else{
              if(Wxcs=='年平均风速'){
                ele='CFO_WSP_YR'
              }else{
                ele='CFO_WPW_YR'
              }
                 this.yggcImg=[]
               await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            }
          }else if(Wx=='HY-2B'){
            if(Wxcs=='月平均风速'||Wxcs=='月平均风功率密度'){
              if(Wxcs=='月平均风速'){
                ele='H2B_WSP_MN'
              }else if(Wxcs=='月平均风功率密度'){
                ele='H2B_WPW_MN'
              }
                 this.yggcImg=[]
              await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              // console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            
            } else{
              if(Wxcs=='年平均风速'){
                ele='H2B_WSP_YR'
              }else{
                ele='H2B_WPW_YR'
              }
                 this.yggcImg=[]
               await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            }
          }else if(Wx=='HY-2A'){
            if(Wxcs=='月平均风速'||Wxcs=='月平均风功率密度'){
              if(Wxcs=='月平均风速'){
                ele='H2A_WSP_MN'
              }else if(Wxcs=='月平均风功率密度'){
                ele='H2A_WPW_MN'
              }
                 this.yggcImg=[]
              await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            
            } else{
              if(Wxcs=='年平均风速'){
                ele='H2A_WSP_YR'
              }else{
                ele='H2A_WPW_YR'
              }
                 this.yggcImg=[]
               await this.$axios.post('/api/swh/GetData',{"ele":ele}).then(res=>{
              // console.log(res.data,'--')
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon=item.minLon
                this.minLat=item.minLat
                this.maxLon=item.maxLon
                this.maxLat=item.maxLat
              })
               
            })
            }
          }
},


    //抽离加载图片方法
   async AddImg(viewer,szybvalue,gdvalue) {
     //清除矢量
     this.clearSl()
    //  this.clearSl()
        //清除图层
     this.clearImg()
        var img1;

        if(szybvalue === "年平均风速"||szybvalue === "年平均风功率密度"||szybvalue === "有效风速时数"||szybvalue === "风切变系数"||szybvalue === "威布尔分布形状参数"||szybvalue === "威布尔分布尺度参数"||szybvalue === "风向分布频率"||szybvalue === "各向风功率密度分布频率"){
          this.getstartEndRearPic(szybvalue,gdvalue)
        
         //对传过来的参数进行判断  符合则添加图层 不符合则移除图层
          bus.$on('szyb',index=>{
            //如果是玫瑰图则一次一清
            if(szybvalue=='风向分布频率'||szybvalue=='各向风功率密度分布频率'){
             this.clearImg()
             }
             //如果是其他的则一个轮回一清
          if(index==0){
          this.clearImg()
          }
         //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          // rectangle: Cesium.Rectangle.fromDegrees(this.minLon, this.minLat, this.maxLon, this.maxLat),
          show: false
         });
         viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "逐小时月平均风速"){
       this.gethourMounthList(gdvalue)
        
      bus.$on('szyb',(index,value1,value2)=>{
        // console.log(index,'index')
        //记录开始位置
          var startindexList
          for(let i=0;i<this.hourMounthList.length;i++){
            //截取年
          let Year=this.hourMounthList[i].split("/")[3]
            //截取月
          let Mounth=this.hourMounthList[i].split('_')[1]
            //如果年和月符合选择的则记录开始位置
         if(Year==value1&&Mounth==value2){
           startindexList=i
           break;
         }
          
       }
            //存储从开始位置到结束位置路径
          this.imgList=this.hourMounthList.slice(startindexList,24+startindexList)

          if(index==0){
            this.clearImg()
              }
           console.log(index,'index2')
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        console.log(index,'index3')

        })
      
    }

    else if(szybvalue === "各区间风功率密度分布频率"||szybvalue === "各区间风速分布频率"||szybvalue === "月平均风速"||szybvalue === "逐小时年平均风速"||szybvalue === "月平均风功率密度"){
      //调用请求接口方法
      this.getYearPic(szybvalue,gdvalue)
      //存取index
      var startindex
      //接收传参（数值预报）
      bus.$on('szyb',(index,value)=>{
        //截取数组中图片路径年份
        for(let i=0;i<this.yearPicList.length;i++){
          //以 / 为区分截取第三个 Year存取年份
          let Year=this.yearPicList[i].split("/")[3]
          if(Year==value){
            startindex=i;
            break
          }
         }
         //slice为删除数组中的值（从开始年份到以后的12个）
          this.sliderList = this.yearPicList.slice(startindex,12+startindex);
          this.hourList=this.yearPicList.slice(startindex,24+startindex);
          this.thirtyList=this.yearPicList.slice(startindex,30+startindex)
        // this.value1=value
        //逐小时年平均风速的index是0 其他是1
        if(szybvalue==='逐小时年平均风速'){
          //清除图片
          if(index==0){
            this.clearImg()
          }
          //添加图片
           img1 = new Cesium.SingleTileImageryProvider({
          url:this.hourList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
           });
           viewer.imageryLayers.addImageryProvider(img1);
        }
        else if(szybvalue=='月平均风速'||szybvalue=='月平均风功率密度'){

          //清除图片
          if(index==1){
            this.clearImg()
          }
          //添加图片
           img1 = new Cesium.SingleTileImageryProvider({
          url:this.sliderList[index-1],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
           });
           viewer.imageryLayers.addImageryProvider(img1);
        }else{
          if(index==1){
            this.clearImg()
          }
          //添加图片
           img1 = new Cesium.SingleTileImageryProvider({
          url:this.thirtyList[index-1],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
           });
           viewer.imageryLayers.addImageryProvider(img1);
        }
     })
      
    }
    else if(szybvalue === "逐年平均值" ||szybvalue === "逐年最大值"||szybvalue === "逐年最小值"||szybvalue === "逐月平均值"||szybvalue === "逐月最大值"||szybvalue === "逐月最小值"){
      
      this.clearImg()
      this.getRoutePic(szybvalue);

    //接收数据 添加图层
     bus.$on('yxbg',index=>{
       //index从0开始传
       if(szybvalue === "逐年平均值" ||szybvalue === "逐年最大值"||szybvalue === "逐年最小值"){
         if(index==0){
          this.clearImg()
        }
        if(szybvalue === "逐年最小值"){
        for(let i=0;i<this.monthAvg.length;i++){
          console.log(this.monthAvg.length)
         this.clearImg()
        }
      }
      console.log(this.monthAvg,'==')
        img1 = new Cesium.SingleTileImageryProvider({
          url:this.monthAvg[index],
          rectangle: Cesium.Rectangle.fromDegrees(this.minLon,this.minLat,this.maxLon,this.maxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        //index从1开始传
       }else{
         if(index==1){
          this.clearImg()
        }
          img1 = new Cesium.SingleTileImageryProvider({
          url:this.monthAvg[index-1],
          rectangle: Cesium.Rectangle.fromDegrees(this.minLon,this.minLat,this.maxLon,this.maxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
       }
        
      })
    }

  else if(szybvalue === "十年最大值"||szybvalue === "十年最小值"||szybvalue === "十年平均值"||szybvalue === "十年一遇"||szybvalue === "三十年一遇"){
   this.clearImg()
    //调用请求
   this.getSingleImg(szybvalue)
    
    //接收数据 添加图层
     bus.$on('yxbg',()=>{
          img1 = new Cesium.SingleTileImageryProvider({
          url:this.singleImgList,
          rectangle: Cesium.Rectangle.fromDegrees(this.singleminLon,this.singleminLat,this.singlemaxLon,this.singlemaxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
      })
      }else if(szybvalue=='台风频次'){
         await  this.Tfpc()
          img1 = new Cesium.SingleTileImageryProvider({
          url:this.tfpcimg,
          // url:'./29.png',
          rectangle: Cesium.Rectangle.fromDegrees(this.tfpcminLon,this.tfpcminLat,this.tfpcmaxLon,this.tfpcmaxLat),
          // rectangle: Cesium.Rectangle.fromDegrees(106,18,122,26),
          // show: false
        });
        this.viewer.imageryLayers.addImageryProvider(img1);

    }

        //遥感观测传过来的参数
    bus.$on('yggc',(Wx,Wxcs)=>{
      if(Wx!=='' && Wx!==null && Wxcs!=='' && Wxcs!== null){
         var img1
          this.clearImg()
          
         this.getyggc(Wx,Wxcs)
         
        bus.$on('yggc1',(index,value1)=>{
          
           var startindexList
          if(index==0){
          this.clearImg()
            }
          if(Wxcs=='月平均风功率密度'||Wxcs=='月平均风速'){
            for(let i=0;i<this.yggcImg.length;i++){
              this.clearImg()
            }
              for(let i=0;i<this.yggcImg.length;i++){
                let Year=this.yggcImg[i].split('_')[2]
               if(Year==value1){
                    startindexList=i
                    break;
                   }
              }
              
              this.yggcImgList=this.yggcImg.slice(startindexList,12+startindexList)
          
              img1 = new Cesium.SingleTileImageryProvider({
              url:this.yggcImgList[index-1],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon,this.minLat,this.maxLon,this.maxLat),
              show: false
              });
              viewer.imageryLayers.addImageryProvider(img1);
          
          }else{
            
            for(let i=0;i<this.yggcImg.length;i++){
              this.clearImg()
            }
            img1 = new Cesium.SingleTileImageryProvider({
              url:this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon,this.minLat,this.maxLon,this.maxLat),
              show: false
              });
              viewer.imageryLayers.addImageryProvider(img1);
          }
        })
      }
    })
  },
    //添加广告牌
    Addggp(params) {
      let ggp = new Cesium.Entity({
        id: params.dataId||1,
        name: params.stationName || "name",
        position: Cesium.Cartesian3.fromDegrees(params.lon, params.lat),
        billboard: {
          image: "./ggp.png",
          pixelSize: 1,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 1,
          disableDepthTestDistance: 0, //广告牌不进行深度检测
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },

        //点击出现广告牌的框
        description:
          "<div>位置：" +
          params.stationName +
          "</div><div>经度：" +
          params.lon +
          "</div><div>纬度：" +
          params.lat +
          "</div>"
      });
      //禁止双击放大广告牌
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.viewer.entities.add(ggp);

    },
    //台风频次请求方法
    async Tfpc(){
        
        await this.$axios.post('/api/swh/GetData',{ele:'TYPHOON'}).then(res=>{
           this.tfpcimg=res.data[0].processPath;
          
           this.tfpcmaxLat=res.data[0].maxLat;
           this.tfpcmaxLon=res.data[0].maxLon;
           this.tfpcminLat=res.data[0].minLat;
           this.tfpcminLon=res.data[0].minLon;
         })
       },

//请求风玫瑰图方法
// getRouse(){
//  this.$axios.post('/api/rose/GetData',{'ele'})
// },
     async gethourMounthList(gdvalue){
      await this.$axios.post('/api/wind/GetData',{"ele":"WSPD_HM","level":gdvalue||0}).then(res=>{
       res.data.forEach(item=>{
          this.hourMounthList.push(item.processPath)
         })
       })
    },
    //年份 （数值预报）
    getYearPic(szybvalue,gdvalue){
      this.yearPicList=[]
       this.$axios.post('/api/wind/GetData',{"ele":this.YearPic[szybvalue],"level":gdvalue||0}).then(res=>{
         res.data.forEach(item=>{
          this.yearPicList.push(item.processPath)
         })
       })
    },
    //开始年份 结束年份（数值预报）
    getstartEndRearPic(szybvalue,gdvalue){
        this.imgList=[]
        this.$axios.post('/api/wind/GetData',{"ele":this.startEndYearPic[szybvalue],"level":gdvalue||0}).then(res=>{
        console.log(res.data,'-=-=-=-=')
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })
       })
    },
    //获取带时间轴的数据(有效波高)
    getRoutePic:function(szybvalue){

          this.monthAvg=[]
          this.$axios.post('/api/swh/GetData',{"ele":this.routePic[szybvalue]}).then(res=>{
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon=item.maxLon
            this.maxLat=item.maxLat
            this.minLon=item.minLon
            this.minLat=item.minLat
          }) 
        })
        },

        //获取单张图片数据（有效波高）
      async getSingleImg(szybvalue){
           this.singleImgList=[]
          await this.$axios.post('/api/swh/GetData',{"ele":this.singlePic[szybvalue]}).then(res=>{
          res.data.forEach(item=>{
             this.singleImgList=item.processPath
             this.singlemaxLon=item.maxLon
             this.singlemaxLat=item.maxLat
             this.singleminLon=item.minLon
             this.singleminLat=item.minLat
          })
        })
      },
      //传id
    ChuanId() {
         var handlerVideo = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
        );
        handlerVideo.setInputAction(click => {
        var pick = this.viewer.scene.pick(click.position);
        if (pick.id.id) {
          // 将原来数组置为空
          this.ggpid = [];
          //将点击的id储存起来
          this.ggpid.push(pick.id.id);
          //向兄弟传递参数(站点id以及名字)
          bus.$emit("myid", this.ggpid,pick.id.name);
        } else {
          return;
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },

    // 声明添加点的方法
     // AddPoint(params) {
     //   if (params.lon === undefined || params.lat === undefined) {
     //     alert("请提供经纬度!");
     //     return;
     //   }
     //   let entity = new Cesium.Entity({
     //     id: params.dataId || `${params.lon}点`,
     //     name: params.stationName || "点",
     //     show: true,
     //     position: Cesium.Cartesian3.fromDegrees(params.lon, params.lat),
     //     point: new Cesium.PointGraphics({
     //       show: true,
     //       pixelSize: params.pixelSize || 5,
     //       heightReference: params.pixelSize || Cesium.HeightReference.NONE,
     //       color: params.color || new Cesium.Color(255, 255, 0, 1),
     //       outlineColor: params.color || new Cesium.Color(0, 0, 0, 0),
     //       outlineWidth: params.outlineWidth || 0,
     //       scaleByDistance:
     //         params.scaleByDistance || new Cesium.NearFarScalar(0, 1, 5e10, 1),
     //       translucencyByDistance:
     //         params.translucencyByDistance ||
     //         new Cesium.NearFarScalar(0, 1, 5e10, 1),
     //       distanceDisplayCondition:
     //         params.translucencyByDistance ||
     //         new Cesium.DistanceDisplayCondition(0, 4.8e10),
     //     }),
     //     //框
     //     description:
     //       "<div>位置：" +
     //       params.stationName +
     //       "</div><div>经度：" +
     //       params.lon +
     //       "</div><div>纬度：" +
     //       params.lat +
     //       "</div>"
     //   });
     //   return entity;
     // },
    //点击获取经纬度方法
   dbClick(viewer) {
      // var clickLon
      // var clickLat
      var $this=this
    var handler= new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (event) {
     var earthPosition  = viewer.camera.pickEllipsoid(event.position,viewer.scene.globe.ellipsoid);
     var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
     //点击获取经纬度
     var lat=Cesium.Math.toDegrees(cartographic.latitude);
     var lon=Cesium.Math.toDegrees(cartographic.longitude);
     //经度
     $this.clickLon=lon;
    //纬度
    $this.clickLat=lat

     //调用加载广告牌方法
     if(viewer.entities.getById(`5`)) {
       viewer.entities.remove({id: '5'})  
       }
       //添加新的广告牌
       var ggp=new Cesium.Entity({
       id:'5',
       position:Cesium.Cartesian3.fromDegrees(lon,lat),
       billboard:{
         image:'./ggpgdfc.png',
         pixelSize: 1,
         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
         verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
         scale: 1,
         disableDepthTestDistance: 0, //广告牌不进行深度检测
        //  heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND 
       }
     });
    //二维地图添加广告牌
    // viewer.pixelOffset = new Cesium.Cartesian2(0.0, 1.0);
    // viewer.pixelOffsetScaleByDistance = new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0);


     //将创建好的广告牌添加上
     viewer.entities.add(ggp)
    // console.log(viewer.entities.ggp2)

     bus.$emit('lonAndlat',lon,lat)

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.hander = handler;
   },

    //鼠标移入事件
    mouseMove() {
      var scene = this.viewer.scene;
      var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      TooltipDiv.initTool(this.viewer.cesiumWidget.container);
      //   // 鼠标移入自定义弹出框
      handler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
          var pickedObject = scene.pick(movement.endPosition);
          if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
            TooltipDiv.showAt(
              movement.endPosition,
              '<div style="color: white;border:1px solid #008CFF;font-size:14px;padding:5px;background:rgba(8,26,127,.5)">' +
                pickedObject.id.description+
                "</div>"
            );
          } else {
            TooltipDiv.setVisible(false);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  },
  watch: {
  $route: {
    handler: function(val,oldval){
      
      //监听路由变化 加载广告牌
      if(val.fullPath==='/tb'){
        //请求站点数据
        this.getdataList()
      }else{
        //如果不是图表页 就清除广告牌
       this.viewer.entities.remove({id: '1'})  
       this.viewer.entities.remove({id: '2'})  
       this.viewer.entities.remove({id: '3'})  
       this.viewer.entities.remove({id: '4'}) 
      }
      //判断是否切换页面 切换页面时清除上个页面的图片
      if(val.fullPath!==oldval.fullPath){
        //如果切换页面 则清除之前的图片 和矢量
        this.clearImg()
        this.clearSl()
        if(val.fullPath==='/tb'){
        //请求站点数据
        this.getdataList()
      }else{
        //如果不是图表页 就清除广告牌
       this.viewer.entities.remove({id: '1'})  
       this.viewer.entities.remove({id: '2'})  
       this.viewer.entities.remove({id: '3'})  
       this.viewer.entities.remove({id: '4'}) 
      }
        return
      }
      
       //数值预报中格点风参（是则调用添加广告牌）
       bus.$on('ok',(gdfc)=>{
        if(val.fullPath==='/szyb'&&gdfc==='格点风参'){
        this.dbClick(this.viewer)
        }else{
           this.hander.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          // if(this.viewer.entities.getById(`5`)) {
            this.viewer.entities.remove({id: '5'})  
        // }
        return
        }
      })

    },
     //是否为第一次监听
     immediate:true,
     // 深度观察监听
     deep: true
  }
},
};

</script>

<style >
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.tooltipdiv-inner {
  padding: 3px 8px;
}
/* 向左 */
/* .toolTip-left {
  position: absolute;
  width: 300px;
  min-height: 80px;
  border: 4px solid rgba(19, 159, 255, 1);
  border-radius: 20px;
  background-color: rgba(30, 49, 74, 0.6);
} 
 .toolTip-left:before {
  content: "";
  display: block;
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid rgba(19, 159, 255, 1);
} */
.con {
  font-size: 28px;
  color: #ffff;
  line-height: 80px;
}
.cesium-toolbar-button{
  z-index:999;
  height: 25px;
  right: 110px;
  top: 8px;
  border: 0px;
}
.cesium-button{
  background: rgba(49, 49, 109, 0.3);
}


</style>