<template>
  <div>
    <div id="cesiumContainer">
      <!-- <button class="aaa">矢量标记</button> -->
    </div>
  </div>
</template>

<script>
// import Cesium from 'cesium'
let Cesium = require("cesium/Source/Cesium");
// import widget from 'cesium/Build/Cesium/Widgets/widgets.css'



export default {
  // name: "CesiumScene",
  data() {
    return {
      dataList:[]
    };
  },
  mounted() {
    // 调用初始化方法
    this.init();
    this.getdataList()
  },
  beforeDestroy() {},
  methods: {
    //请求本地json方法
    getdataList(){
      this.$axios.get('./station.json').then((res)=>{
        // console.log(res)
       this.dataList=res.data
       console.log(this.dataList)

      })
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
        terrainProvider: Cesium.createWorldTerrain(),
        // 初始化天地图
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url:
            "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
          //  url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=2ce94f67e58faa24beb7cb8a09780552",

          layer: "tdtBasicLayer",
          style: "default",
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      };
      var viewer = new Cesium.Viewer("cesiumContainer", viewerOption);

      // 添加图层
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:
            "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e33757cdce9295f804cb6c77aa22afe3",
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible"
        })
      );
      // 将位置定位到中国 通过给xyz的坐标控制在广东位置
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
        // destination: Cesium.Cartesian3.fromDegrees(116, 20, 1785000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0)
        },
        complete: function callback() {
          // 定位完成之后的回调函数
        }
      });
      //在地图上添加矢量数据
      var promise = Cesium.GeoJsonDataSource.load("./zsc.json", {
        stroke: new Cesium.Color(0.019, 0.156, 0.639, 0), //多边形轮廓线的颜色
        // fill: Cesium.Color.CORNFLOWERBLUE.withAlpha(.7),       //多边形中间的颜色
        // fill: new Cesium.Color(0.019,0.156,0.639,0.7),       //多边形中间的颜色
        fill: new Cesium.Color(0.047, 0.588, 0.807, 0.5), //多边形中间的颜色
        strokeWidth: 5, //多边形的厚度
        markerSymbol: "?" //多边形
      });
      viewer.dataSources.add(promise);
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权

      //在地图上添加标记（点）
        //调用添加点的方法需要的参数
        let params = {
          id: "测试" + 567,
          name: "text",
          lon: 112, //经度
          lat: 23 //纬度
        };
        //声明添加点的方法
        let AddPoint = function(params) {
          //判断参数中经纬度是否为有效值
          if (params.lon === undefined || params.lat === undefined) {
            alert("请提供经纬度!");
            return;
          }
          let entity = new Cesium.Entity({
            // 点的唯一标识
            id: params.id || `${params.lon}点`,
            // 点的名字
            name: params.name || "点",
            // 是否显示
            show: true,
            //点的定位
            position: Cesium.Cartesian3.fromDegrees(params.lon, params.lat),
            //创建出新的点的实例
            point: new Cesium.PointGraphics({
              //是否显示
              show: true,
              //点的大小
              pixelSize: params.pixelSize || 10,
              //相对于地面的位置
              heightReference: params.pixelSize || Cesium.HeightReference.NONE,
              //点的颜色
              color: params.color || new Cesium.Color(255, 255, 0, 1),
              //外边框颜色
              outlineColor: params.color || new Cesium.Color(0, 0, 0, 0),
              //外边框大小
              outlineWidth: params.outlineWidth || 0,
              //不同距离缩放比
              scaleByDistance:params.scaleByDistance ||new Cesium.NearFarScalar(0, 1, 5e10, 1),
              //不同距离透明度
              translucencyByDistance:params.translucencyByDistance ||new Cesium.NearFarScalar(0, 1, 5e10, 1),
              //显示的范围
              distanceDisplayCondition:params.translucencyByDistance ||new Cesium.DistanceDisplayCondition(0, 4.8e10)
            })
          });
          viewer.entities.add(entity);
          console.log(entity,viewer);
          return {entity,viewer};
        };
        //调用添加点的方法
        AddPoint(params);
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
/* .aaa{
  position: absolute;
  top:150px;
  left: 50px;
  color: white;
} */
</style>