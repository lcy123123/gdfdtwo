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
        <img class="i1" src="../assets/i1.png" alt="" /><span class="fnzy"
          >风能资源</span
        >
      </div>
      <div class="nav nav2" @click="zh">
        <img class="i2" src="../assets/i2.png" alt="" /><span class="zhtq"
          >灾害天气</span
        >
      </div>
      <div class="nav nav3" @click="pg">
        <img class="i3" src="../assets/i3.png" alt="" /><span class="pgjc"
          >评估决策</span
        >
      </div>
    </div>
    <!-- 下拉框 -->
    <div class="xlk-z">
      <div class="nav xlk-1">
        <div style="margin:10px 0;text-align:center" @click="jgld">
          激光雷达
        </div>
        <div style="margin:10px 0;text-align:center" @click="yggc">
          遥感观测
        </div>
        <div style="margin:10px 0;text-align:center">数值预报</div>
      </div>
      <div class="nav xlk-2">
        <div style="margin:10px 0;text-align:center">激光雷达</div>
        <div style="margin:10px 0;text-align:center">遥感观测</div>
        <div style="margin:10px 0;text-align:center">数值预报</div>
      </div>
      <div class="nav xlk-3">
        <div style="margin:10px 0;text-align:center">激光雷达</div>
        <div style="margin:10px 0;text-align:center">遥感观测</div>
        <div style="margin:10px 0;text-align:center">数值预报</div>
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
    fn: function() {
      $(".xlk-1").css("display:block");
      $(".xlk-1").slideToggle(200);
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
    zh: function() {
      $(".xlk-2").css("display:block");
      $(".xlk-2").slideToggle(200);
      //点击切换图标
      if ($(".i2").attr("src") == i2) {
        $(".i2").attr("src", i22);
        $(".zhtq").css("color", "#03E2FF");
      } else {
        $(".i2").attr("src", i2);
        $(".zhtq").css("color", "white");
      }
    },
    pg: function() {
      $(".xlk-3").css("display:block");
      $(".xlk-3").slideToggle(200);
      //点击切换图标
      if ($(".i3").attr("src") == i3) {
        $(".i3").attr("src", i33);
        $(".pgjc").css("color", "#03E2FF");
      } else {
        $(".i3").attr("src", i3);
        $(".pgjc").css("color", "white");
      }
    },
    jgld() {
      this.$router.push("/tb");
      //刷新页面
      this.$router.go(0);
    },
    yggc() {
      this.$router.push("/yggc");
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
  overflow: hidden;
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
}
.yhm {
  color: white;
  margin-left: 10px;
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
  border-bottom: 2px solid #0f53fd;
}
.nav2 {
  position: absolute;
  top: 19px;
  left: 130px;
  border-bottom: 2px solid #0f53fd;
}
.nav3 {
  position: absolute;
  top: 19px;
  left: 230px;
  border-bottom: 2px solid #0f53fd;
}
/* 导航下拉框 */
.xlk-z {
  width: 310px;
  height: 110px;
  /* border: 1px solid red; */
}
.xlk-1 {
  width: 84px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 35px;
  /* border: 1px solid red; */
  background: rgba(22, 28, 87, 0.7);
  display: none;
}
.xlk-2 {
  width: 84px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 128px;
  /* border: 1px solid red; */
  background: rgba(22, 28, 87, 0.7);
  display: none;
}
.xlk-3 {
  width: 84px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 228px;
  /* border: 1px solid red; */
  background: rgba(22, 28, 87, 0.7);
  display: none;
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
  /* padding: 0; */
  /* text-align: center; */
  /* margin-top: 8px; */
}
</style>