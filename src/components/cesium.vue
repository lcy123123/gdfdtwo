<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// import Cesium from 'cesium'
let Cesium = require("cesium/Source/Cesium");
// import widget from 'cesium/Build/Cesium/Widgets/widgets.css'

import TooltipDiv from "../utils/toolTip";

export default {
  name: "CesiumScene",
  data() {
    return {
      //站点数据
      dataList: [],
      viewer: null
    };
  },
  mounted() {
    // 调用请求json数据方法
    this.getdataList();
    //调用初始化地球方法
    this.init();
  },

  methods: {
    //请求本地json方法
    getdataList() {
      this.$axios.get("./station.json").then(res => {
        // 将请求到的数据赋值
        this.dataList = res.data;
        //对请求的数据遍历
        res.data.forEach(params => {
          //调用添加点方法
          this.AddPoint(params);
          //调用鼠标移入方法
        }, this.mouseMove());
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

      this.viewer = viewer;

      // 在地图中添加矢量数据（左下角图）---可执行
      // var colorList = [[120, 0, 136],[90, 0, 184],[70, 0, 245],[0, 170, 225],[0, 200, 200],[0, 200, 125],[195, 255, 0],[255, 255, 0],[255, 155, 0],[255, 0, 0]];
      // var promise1 = Cesium.GeoJsonDataSource.load("./1.json");
      // promise1.then(function(dataSource) {
      //   viewer.dataSources.add(dataSource);

      //   var entities = dataSource.entities.values;
      //   for (var i = 0; i < entities.length; i++) {
      //     var entity = entities[i];
      //     // console.log(entity.properties.value.valueOf());
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
      //是否以此矢量数据定位至中心
      // viewer.flyTo(promise1);

      // viewer._cesiumWidget._creditContainer.style.display="none";
    },

    //声明添加点的方法
    AddPoint(params) {
      console.log(params)
      if (params.lon === undefined || params.lat === undefined) {
        alert("请提供经纬度!");
        return;
      }
      let entity = new Cesium.Entity({
        id: params.dataId || `${params.lon}点`,
        name: params.stationName || "点",
        show: true,
        position: Cesium.Cartesian3.fromDegrees(params.lon, params.lat),
        point: new Cesium.PointGraphics({
          show: true,
          pixelSize: params.pixelSize || 5,
          heightReference: params.pixelSize || Cesium.HeightReference.NONE,
          color: params.color || new Cesium.Color(255, 255, 0, 1),
          outlineColor: params.color || new Cesium.Color(0, 0, 0, 0),
          outlineWidth: params.outlineWidth || 0,
          scaleByDistance:
            params.scaleByDistance || new Cesium.NearFarScalar(0, 1, 5e10, 1),
          translucencyByDistance:
            params.translucencyByDistance ||
            new Cesium.NearFarScalar(0, 1, 5e10, 1),
          distanceDisplayCondition:
            params.translucencyByDistance ||
            new Cesium.DistanceDisplayCondition(0, 4.8e10)
        }),
        //框
        description:
          "<div>位置：" +
          params.stationName +
          "</div><div>经度：" +
          params.lon +
          "</div><div>纬度：" +
          params.lat +
          "</div>"
      });
      this.viewer.entities.add(entity);
      return entity;
    },
    //鼠标移入事件
    mouseMove() {
      var scene = this.viewer.scene;
      var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      TooltipDiv.initTool(this.viewer.cesiumWidget.container);
      // 鼠标移入自定义弹出框
      handler.setInputAction(function(movement) {
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
          var pickedObject = scene.pick(movement.endPosition);
          // console.log(pickedObject, 'gggggg')
          if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
            // console.log(pickedObject.id.description.valueOf());
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
/* .aaa{
  position: absolute;
  top:150px;
  left: 50px;
  color: white;
} */

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