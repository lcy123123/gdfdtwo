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

export default {
  // name: "CesiumScene",
  data() {
    return {
      //站点数据
      dataList: [],
      viewer: null,
      ggpid: [],
      //其他组件传过来的值（鱼类产卵场）
      ylclc: "",
      //其他组件传过来的值（年平均风速）
      szybvalue: "",
      // 图片路径
      // imgList: ['./1.png','./2.png','./3.png','./4.png'],
      imgList:[],
      // 月平均值数组
      monthAvg:[],
      //年平均值
      yearAvg:[],
      // lj10:'',
      maxLon:[],
      maxLat:[],
      minLon:[],
      minLat:[],
      gdvalue:'',
      yggcImg:[]
    
    };
  },
  mounted() {
    // this.AddSl2(this.viewer)
    //接收组件传值
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
    this.getdataList();
    //调用初始化地球方法
    this.init();
    //接收数值预报组件传过来的值
    bus.$on("addimg", szybvalue => {
      // 调用加载图片方法
      this.szybvalue = szybvalue;
      //调用添加图片方法并传参
      this.AddImg(this.viewer, this.szybvalue);
    });
    //加载矢量数据方法
    bus.$on("event2", pgbjvalue => {
      this.ylclc = pgbjvalue;
      this.AddSl(this.viewer, this.ylclc);
     this.AddSl2(this.viewer,this.ylclc)

    });
    //接收有效波高传过来的值
    bus.$on('addyxbgimg',yxbgvalue=>{
      this.AddImg(this.viewer,yxbgvalue)
    })
    bus.$on('addzhtqimg',yxbgvalue=>{
      this.AddImg(this.viewer,yxbgvalue)
    })
    //接收遥感观测传过来的参数
    bus.$on('yggc',()=>{
      // console.log(yxbgvalue,wx)
      this.AddImg(this.viewer)
    })
    //调用添加广告牌方法
    this.Addggp();
    
  },

  methods: {
    //请求本地json方法 (站点)
    async getdataList() {
      await this.$axios.get("./station_GD.json").then(res => {
        // 将请求到的数据赋值
        // console.log(res.data);
        this.dataList = res.data;
        //对请求的数据遍历
        res.data.forEach(
          params => {
            //调用添加点方法
            this.Addggp(params);
            //调用鼠标移入方法
          },
          this.mouseMove(),
          this.ChuanId()
        );
      });
    },
    //初始化方法
    init() {
      let viewerOption = {
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        baseLayerPicker: false, // 底图切换控件
        animation: false, // 控制场景动画的播放速度控件
        // terrainProvider: Cesium.createWorldTerrain(),
              //将三维地图转化为二维地图
          //   sceneMode : Cesium.SceneMode.SCENE2D,
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


      // 将位置定位到中国 通过给xyz的坐标控制在广东位置
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
        // destination: Cesium.Cartesian3.fromDegrees(116, 20, 1785000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0)
        },
        complete: function callback() {}
      });

      this.viewer = viewer;

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
    AddSl(viewer, ylclc) {
      var promise = Cesium.GeoJsonDataSource.load("./zsc.json", {
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

    //抽离加载图片方法
    AddImg(viewer,szybvalue,gdvalue) {
      //清除图层
     this.clearImg()
        var img1;

        if(szybvalue === "年平均风速"){

           this.imgList=[]
           this.$axios.post('/api/wind/GetData',{"ele":"WSPD_YR","level":gdvalue||0}).then(res=>{
           res.data.forEach(item=>{
           this.imgList.push(item.processPath)
         })
       })
      //对传过来的参数进行判断  符合则添加图层 不符合则移除图层
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      //  console.log("index:"+index)
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "月平均风速"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"WSPD_MN","level":gdvalue||0}).then(res=>{
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })
       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
    }else if(szybvalue === "逐小时年平均风速"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"WSPD_HY","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "逐小时月平均风速"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"WSPD_HM","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "年平均风功率密度"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"Dwp","level":gdvalue||1}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "月平均风功率密度"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"DWP_MN","level":gdvalue||1}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })
       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "有效风速时数"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"NSIGHR","level":gdvalue||1}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "风切变系数"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"ALPHA_ALL","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "威布尔分布形状参数"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"SHAPE","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "威布尔分布尺度参数"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"SCALE","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "威布尔分布形状参数"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"SHAPE","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "各区间风速分布频率"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"FWS","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }else if(szybvalue === "各区间风功率密度分布频率"){
       this.imgList=[]
       this.$axios.post('/api/wind/GetData',{"ele":"FWE","level":gdvalue||0}).then(res=>{
        
         res.data.forEach(item=>{
          this.imgList.push(item.processPath)
         })

       })
      bus.$on('szyb',index=>{
      if(index==0){
       this.clearImg()
      }
      
        //将已经创建好的图层添加
          img1 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[index],
          rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img1);
        })
      
    }
    

     else if(szybvalue === "逐月平均值"){
       this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'MONTH_AVG'}).then(res=>{
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
          }) 
        })
    }else if(szybvalue === "逐月最大值"){
      this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'MONTH_MAX'}).then(res=>{
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
          }) 
        })
     
    }else if(szybvalue === "逐月最小值"){
      this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'MONTH_MIN'}).then(res=>{
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
          }) 
        })
     
// let staticValue=[
//   {"逐年平均值":{"url":'/api/swh/GetData',"para":"{'ele':'YEAR_AVG'}"},
//   "逐月最小值":{"url":'/api/swh/GetData',"para":"{'ele':'YEAR_AVG'}"}
// }],

// if(staticValue.hasOwnProperty(szybvalue))


    }else if(szybvalue === "逐年平均值"){
      this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'YEAR_AVG'}).then(res=>{
          // console.log(res.data,'------12345678')
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
          }) 
        })
        
     
    }else if(szybvalue === "逐年最大值"){
      this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'YEAR_MAX'}).then(res=>{
          console.log(res.data,'------')
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
           
          }) 
        })
     
    }else if(szybvalue === "逐年最小值"){
      this.monthAvg=[]
      this.$axios.post('/api/swh/GetData',{"ele":'YEAR_MIN'}).then(res=>{
          // console.log(res.data,'------')
          res.data.forEach(item=>{
            this.monthAvg.push(item.processPath)
            this.maxLon.push(item.maxLon)
            this.maxLat.push(item.maxLat)
            this.minLon.push(item.minLon)
            this.minLat.push(item.minLat)
          }) 
        })
     
    }

    else if(szybvalue === "十年平均值"){
       var img7
        this.$axios.post('/api/swh/GetData',{"ele":'YEARS_AVG'}).then(res=>{
          img7 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img7);
        })
    }else if(szybvalue === "十年最大值"){
     var img8
        this.$axios.post('/api/swh/GetData',{"ele":'YEARS_MAX'}).then(res=>{
          console.log(res.data[0].processPath,'----')
          img8 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img8);
        })
    }else if(szybvalue === "十年最小值"){
      
      var img9
        this.$axios.post('/api/swh/GetData',{"ele":'YEARS_MIN'}).then(res=>{
          img9 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img9);
        })
    }
    else if(szybvalue === "十年一遇"){
        var img10
        this.$axios.post('/api/swh/GetData',{"ele":'PEAK30'}).then(res=>{
          img10 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
        });
        viewer.imageryLayers.addImageryProvider(img10);
        })
    }else if(szybvalue === "三十年一遇"){
       var img11
        this.$axios.post('/api/swh/GetData',{"ele":'PEAK30'}).then(res=>{
          img11 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img11);
        })
    }else if(szybvalue === "台风频次"){
      var img12
        this.$axios.post('/api/swh/GetData',{"ele":'TYPHOON'}).then(res=>{
          img12 = new Cesium.SingleTileImageryProvider({
          url: '/static'+res.data[0].processPath,
          // url: './44.png',
          // rectangle: Cesium.Rectangle.fromDegrees(107.98, 17.8, 118.39, 24.57),
          // rectangle: Cesium.Rectangle.fromDegrees(107.875, 17.625, 118.625, 26.375),
          rectangle: Cesium.Rectangle.fromDegrees(res.data[0].minLon, res.data[0].minLat, res.data[0].maxLon, res.data[0].maxLat),
          show: false
        });
        viewer.imageryLayers.addImageryProvider(img12);
        })
    }
    //接收数据 添加图层
     bus.$on('yxbg',index=>{
      //  console.log(this.maxLon,this.minLon)
        if(index==0){
          this.clearImg()
        }
         var img7
          img7 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.monthAvg[index],
          rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img7);
      })
        //遥感观测传过来的参数
        bus.$on('yggc',(Wx,Wxcs)=>{
          this.clearImg()
          bus.$on('yggc1',index=>{

          console.log(index,'12345678')
          if(index==0){
          this.clearImg()
        }
        if(Wx!=null&&Wxcs!=null){
          console.log(Wx,Wxcs,'--')
          if(Wx=='ASCAT' && Wxcs=='月平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"ASCAT_WSP_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })
              
              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
      
            })
          }else if(Wx=='ASCAT' && Wxcs=='月平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"ASCAT_WPW_MN"}).then(res=>{
               res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })

          }else if(Wx=='ASCAT' && Wxcs=='年平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"ASCAT_WSP_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='ASCAT' && Wxcs=='年平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"ASCAT_WPW_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='WindSat' && Wxcs=='月平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"WINDSAT_WSP_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='WindSat' && Wxcs=='月平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"WINDSAT_WPW_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='WindSat' && Wxcs=='年平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"WINDSAT_WSP_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='WindSat' && Wxcs=='年平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"WINDSAT_WPW_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='HY-2A' && Wxcs=='月平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WSP_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='HY-2A' && Wxcs=='月平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='HY-2A' && Wxcs=='年平均风速'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WSP_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='HY-2A' && Wxcs=='年平均风功率密度'){
            this.yggcImg=[]
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }


     //以下还没有接口文档（没有替换参数）

          else if(Wx=='HY-2B' && Wxcs=='月平均风速'){
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_YR"}).then(res=>{
              console.log(res.data,'------')
            })
          }else if(Wx=='HY-2B' && Wxcs=='月平均风功率密度'){
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_YR"}).then(res=>{
              console.log(res.data,'------')
            })
          }else if(Wx=='HY-2B' && Wxcs=='年平均风速'){
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_YR"}).then(res=>{
              console.log(res.data,'------')
            })
          }else if(Wx=='HY-2B' && Wxcs=='年平均风功率密度'){
            this.$axios.post('/api/swh/GetData',{"ele":"H2A_WPW_YR"}).then(res=>{
              console.log(res.data,'------')
            })
          }else if(Wx=='CFOSAT' && Wxcs=='月平均风速'){
            this.$axios.post('/api/swh/GetData',{"ele":"CFO_WSP_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })

              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='CFOSAT' && Wxcs=='月平均风功率密度'){
            this.$axios.post('/api/swh/GetData',{"ele":"CFO_WPW_MN"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })
              console.log(res.data,'==========')
              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[0],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='CFOSAT' && Wxcs=='年平均风速'){
            this.$axios.post('/api/swh/GetData',{"ele":"CFO_WSP_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })
            
              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }else if(Wx=='CFOSAT' && Wxcs=='年平均风功率密度'){
            this.$axios.post('/api/swh/GetData',{"ele":"CFO_WPW_YR"}).then(res=>{
              res.data.forEach(item=>{
                this.yggcImg.push(item.processPath)
                this.minLon.push(item.minLon)
                this.minLat.push(item.minLat)
                this.maxLon.push(item.maxLon)
                this.maxLat.push(item.maxLat)
              })
              
              let img3
              img3 = new Cesium.SingleTileImageryProvider({
              url:'/static'+this.yggcImg[index],
              rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
              // show: false
              });
              viewer.imageryLayers.addImageryProvider(img3);
            })
          }
        }

          let img3
          img3 = new Cesium.SingleTileImageryProvider({
          url:'/static'+this.imgList[0],
          rectangle: Cesium.Rectangle.fromDegrees(this.minLon[0],this.minLat[0],this.maxLon[0],this.maxLat[0]),
          // show: false
        });
        viewer.imageryLayers.addImageryProvider(img3);
        })
        })

  },
    //添加广告牌
    Addggp(params) {
      let ggp = new Cesium.Entity({
        id: params.dataId,
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

      this.viewer.entities.add(ggp);

      //点击事件获取id
      // var handlerVideo = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      // console.log(11)
      //         handlerVideo.setInputAction( (click) =>{
      //             var pick = this.viewer.scene.pick(click.position);
      //             // console.log(pick.id.id)
      //             if (pick.id.id) {
      //             // 将原来数组置为空
      //             this.ggpid=[]
      //             //将点击的id储存起来
      //             this.ggpid.push(pick.id.id)
      //             //向兄弟传递参数
      //             bus.$emit('myid',this.ggpid)
      //             console.log()
      //             } else {
      //                 return;
      //             }
      //         }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

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
          //向兄弟传递参数
          bus.$emit("myid", this.ggpid);
          // console.log();
        } else {
          return;
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    // 声明添加点的方法
    // AddPoint(params) {
    //   // console.log(params,'========')
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

    //鼠标移入事件
    mouseMove() {
      var scene = this.viewer.scene;
      var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      TooltipDiv.initTool(this.viewer.cesiumWidget.container);
      //   // 鼠标移入自定义弹出框
      handler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
          var pickedObject = scene.pick(movement.endPosition);
          // console.log(pickedObject, 'gggggg')
          if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
            // console.log(pickedObject.id.id);
            TooltipDiv.showAt(
              movement.endPosition,
              '<div style="color: white;border:1px solid #008CFF;font-size:14px;padding:5px;background:rgba(8,26,127,.5)">' +
                pickedObject.id.description +
                "</div>"
            );
          } else {
            TooltipDiv.setVisible(false);
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }
};
</script>

<style scoped>
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
.toolTip-left {
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
}
.con {
  font-size: 28px;
  color: #ffff;
  line-height: 80px;
}
</style>