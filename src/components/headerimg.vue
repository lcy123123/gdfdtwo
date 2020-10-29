<template>
  <div class="header">
    <img class="header-img" src="../assets/header.png" alt="未能正确加载" />
    <!-- 头部导航 -->
    <!-- 右侧 -->
    <div class="header-right">
      <span class="xtsz"><i class="el-icon-setting"></i> 系统设置</span>
      <span class="yhm"
        ><i class="el-icon-user"></i> yonghuming
        <i class="el-icon-arrow-down"></i>
      </span>
    </div>
    <!-- 左侧 -->
    <div class="nac-z">
      <!-- <div class="nav nav1" @click="fn"><img class="i1" src="../assets/i1.png" alt=""><span>风能资源</span></div> -->
      
      <div class="nav nav1" @click="fn">
        <img class="i1" src="../assets/i1.png" alt="" /><span class="fnzy">风能资源</span>
        <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div1" style="height:2px;background-color:#0f53fd;display:none"></div>
        <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-1" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
      </div>
      
      <div class="nav nav2" @click="zh">
        <img class="i2" src="../assets/i2.png" alt="" /><span class="zhtq">灾害天气</span>
          <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div2" style="height:2px;background-color:#0f53fd;display:none"></div>
           <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-2" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
      </div>
      <div class="nav nav3" @click="pg">
        <img class="i3" src="../assets/i3.png" alt="" /><span class="pgjc">评估决策</span>
        <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div3" style="height:2px;background-color:#0f53fd;display:none"></div>
           <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-3" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
      </div>
    </div>
    <!-- 下拉框 -->
    <div class="xlk-z">
      <div class="nav xlk-1">
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="jgld">激光雷达</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="yggc">遥感观测</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="szyb">数值预报</div>
      </div>
      <div class="nav xlk-2">
        <div style="margin:10px 0;text-align:center;font-size:13px">激光雷达</div>
        <div style="margin:10px 0;text-align:center;font-size:13px">遥感观测</div>
        <div style="margin:10px 0;text-align:center;font-size:13px">数值预报</div>
      </div>
      <div class="nav xlk-3">
        <div style="margin:10px 0;text-align:center;font-size:13px">激光雷达</div>
        <div style="margin:10px 0;text-align:center;font-size:13px">遥感观测</div>
        <div style="margin:10px 0;text-align:center;font-size:13px">数值预报</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import i1 from "../assets/i1.png";
import i2 from "../assets/i2.png";
import i3 from "../assets/i3.png";
import i11 from "../assets/i11.png";
import i22 from "../assets/i22.png";
import i33 from "../assets/i33.png";
export default {
  data() {
    return {};
  },
  methods: {
    //第一个下拉框（点击事件）
    fn: function() {
      $(".xlk-1").css("display:block");
      $(".xlk-1").slideToggle(200);
      //点击切换下边框
      $('.long-div1').slideToggle(100)
      //点击上滑下滑小三角
      $('.small-1').slideToggle(200)
      //点击切换图标
      if ($(".i1").attr("src") == i1) {
        $(".i1").attr("src", i11);
        $(".fnzy").css("color", "#03E2FF");
      } else {
        $(".i1").attr("src", i1);
        $(".fnzy").css("color", "white");
        console.log($(".fnzy"));
      }
    },
    //第二个下拉框（点击事件）
    zh: function() {
      $(".xlk-2").css("display:block");
      $(".xlk-2").slideToggle(200);
      //点击切换下边框
      $('.long-div2').slideToggle(100)
      //点击上滑下滑小三角
      $('.small-2').slideToggle(200)
      //点击切换图标
      if ($(".i2").attr("src") == i2) {
        $(".i2").attr("src", i22);
        $(".zhtq").css("color", "#03E2FF");
      } else {
        $(".i2").attr("src", i2);
        $(".zhtq").css("color", "white");
      }
    },
    //第三个下拉框（点击事件）
    pg: function() {
      $(".xlk-3").css("display:block");
      $(".xlk-3").slideToggle(200);
      //点击上滑下滑小三角
      $('.small-3').slideToggle(200)
      //点击显示隐藏下边框
      $('.long-div3').slideToggle(100)
      // $()
      //点击切换图标
      if ($(".i3").attr("src") == i3) {
        $(".i3").attr("src", i33);
        $(".pgjc").css("color", "#03E2FF");
      } else {
        $(".i3").attr("src", i3);
        $(".pgjc").css("color", "white");
      }
    },
    //点击跳转激光雷达
    jgld() {
      this.$router.push("/tb");
      //刷新页面
      this.$router.go(0);
    },
    //点击跳转遥感观测
    yggc() {
      this.$router.push("/yggc");
      this.$router.go(0);

    },
    //点击跳转数值预报
    szyb() {
      this.$router.push("/szyb");
      this.$router.go(0);

    }
  }
};
</script>
<style scoped>
/* 头部照片 */
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* overflow: hidden; */
  height: 50px;
}
.header-img {
  height: 45px;
  width: 100%;
  overflow: hidden;
}
.i1 {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
.i2,
.i3 {
  width: 13px;
  height: 13px;
  margin-right: 4px;
}
.fnzy{
  font-size: 13px;
}
.zhtq{
  font-size: 13px;
}
.pgjc{
  font-size: 13px;
}
/* 头部导航 */
.header-right {
  width: 300px;
  height: 50px;
  /* border: 1px solid red; */
  position: absolute;
  top: 22px;
  right: 10px;
}
.xtsz {
  color: white;
  margin-right: 10px;
  font-size: 13px;

}
.yhm {
  color: white;
  margin-left: 10px;
  font-size: 13px;
}
.nav-z {
  position: relative;
  top: 10px;
  left: 10px;
}
.nav {
  color: white;
  font-size: 16px;
}
.nav1 {
  position: absolute;
  top: 19px;
  left: 35px;
  cursor:pointer

}
.nav2 {
  position: absolute;
  top: 19px;
  left: 130px;
  cursor:pointer

}
.nav3 {
  position: absolute;
  top: 19px;
  left: 230px;
  cursor:pointer

}
/* 导航下拉框 */
.xlk-z {
  width: 310px;
  height: 110px;
  /* border: 1px solid red; */
}
.xlk-1 {
  width: 70px;
  height: 90px;
  position: absolute;
  top: 54px;
  left: 35px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}
.xlk-2 {
  width: 70px;
  height: 90px;
  position: absolute;
  top: 54px;
  left: 128px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}
.xlk-3 {
  width: 70px;
  height: 90px;
  position: absolute;
  top: 54px;
  left: 228px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}

.xlk-1 div,
.xlk-2 div,
.xlk-3 div {
  margin: 10px;
}

.xlk-1 > div:hover {
  background-color: #0f3eb9;
}
.xlk-2 > div:hover {
  background-color: #0f3eb9;
}
.xlk-3 > div:hover {
  background-color: #0f3eb9;
}
.three-xlk {
  width: 100%;
  margin: 0;
}
</style>