<template>
  <div id="cesiumContainer"></div>
</template>

<script>
// import Cesium from 'cesium'
let Cesium = require("cesium/Source/Cesium");
// import widget from 'cesium/Build/Cesium/Widgets/widgets.css'

export default {
  // name: "CesiumScene",
  data() {
    return {};
  },
  mounted() {
    // 调用初始化方法
    this.init();
  },
  beforeDestroy() {},
  methods: {
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
          url:"http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
        //  url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=2ce94f67e58faa24beb7cb8a09780552",

          layer: "tdtBasicLayer",
          style: "default",
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      };
      let viewer = new Cesium.Viewer("cesiumContainer", viewerOption);
      // 添加图层

      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e33757cdce9295f804cb6c77aa22afe3",
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible"
        })
      );

      viewer.camera.flyTo({
        // 将位置定位到中国 通过给xyz的坐标控制在广东位置
        destination: Cesium.Cartesian3.fromDegrees(112, 23, 1785000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0)
        },
        complete: function callback() {
          // 定位完成之后的回调函数
        }
      });
      viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
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

</style>