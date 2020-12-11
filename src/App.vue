<template>
  <div id="app">
    <!-- cesium组件 -->
    <Cesium class="cesiumys" style="height:100%"></Cesium>
    <!-- 头部组件 -->
    <Headerimg></Headerimg>
    <!-- colorBar组件 -->
    <ColorBar v-show='colorFlag'></ColorBar>

    <!-- 保证原来的页面正常保留 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import $ from "jquery";
import Cesium from "./components/cesium";
import Headerimg from "./components/headerimg";
import ColorBar from "./components/colorBar";

export default {
  name: "App",

  components: {
    Cesium,
    Headerimg,
    ColorBar
  },
  
  data() {
    return {
      screenWidth: "",
      screenHeight: "",
      colorFlag: ''
    };
  },
   watch:{
     //动态监测路由变化  控制colorBar组件的显示
    $route(to){
    if(to.fullPath=='/pgbj'||to.fullPath=='/pgjc'||to.fullPath=='/tb'||to.fullPath=='/index'){
      this.colorFlag=false
    }else{
      this.colorFlag=true
    }
     },
     immediate:true
   },
  mounted() {
    //调用获取屏幕尺寸
    this.changeSize();
    window.onresize = () => {
      return (() => {
        this.changeSize();
      })();
    };
  },
  methods: {
     //获取屏幕尺寸（判断是pc端还是移动端）
    changeSize() {
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;

      if (this.screenWidth < "1000") {
        //移动端
        $("body").css("overflow", "auto");
        $("body").css("width", "1680px");
        $("#app").css("width", "1680px");
        $(".header").css("width", "1680px");
        $("cesium").css("height", "1680px");
        $("cesium").css("width", "1680px");
        //colorBar
        $("#temp_legend").css("position", "fixed");
        $("#temp_legend").css("right", "20px");
      } else {
        //pc端
        $("body").css("overflow", "hidden");
        $("body").css("width", "100%");
        $("#app").css("width", "100%");
        $("#app").css("height", "100%");
        $(".header").css("width", "100%");
        $("cesium").css("height", "100%");
        $("cesium").css("width", "100%");
        //colorBar
        $("#temp_legend").css("position", "fixed");
        $("#temp_legend").css("right", "20px");
      }
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  overflow: hidden;
  /* width: 1280px;
  height: 650px; */
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  /* height: 650px; */
  width: 100%;
  /* width: 1280px; */
  padding: 0;
  margin: 0;
  color: #000;
  overflow: hidden;
}
</style>
