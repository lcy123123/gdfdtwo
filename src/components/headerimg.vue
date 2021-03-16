<template>
  <div class="header" style="z-index:99">
    <img class="header-img" src="../assets/header.png" alt="未能正确加载" />
    <!-- 头部导航 -->
    <!-- 右侧 -->
    <div class="header-right">
      <!-- <span @mouseover="xtover" @mouseleave="xtleave" style="width:79px;display:inline-block;height:30px"> -->
      <!-- <span class="xtsz" ><i class="el-icon-setting" ></i> 系统设置</span>      -->
      <!-- 下边框(下拉框下面的长div) --> 
        <!-- <span class="long-div4" style="height:2px;width:70px;background-color:#0f53fd;display:block"></span> -->

      <!-- <div class="nav xlk-4"> -->
      <!-- <i class="el-icon-caret-bottom small-4" style="position:absolute;top:-12px;left:26px;color:#3F9FEA;display:block"></i> -->

        <!-- <div @click="twodt" style="margin:10px 0;text-align:center;font-size:13px">二维地图</div> -->
        <!-- <div @click="threedt" style="margin:10px 0;text-align:center;font-size:13px">三维地球</div> -->
      <!-- </div> -->
      <!-- </span> -->
      <span class="yhm" 
        ><i class="el-icon-user"></i> yonghuming
        <i class="el-icon-arrow-down"></i>
      </span>
    </div>

    <!-- 左侧 -->
    <div class="nac-z"> 
      <!-- 第一个 -->
      <span>
      <div class="nav nav1" @mouseover="firstover" @mouseleave="firstleave">
        <img class="i1" src="../assets/i1.png" alt="" /><span class="fnzy">风能资源</span>
        <!-- <span class="first" style="width:100px;height:100px"> -->

        <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div1" style="height:2px;background-color:#0f53fd;display:none;width:72px"></div>
        <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-1" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
      <div class="xlk-z">
      <div class="nav xlk-1">
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="jgld">激光雷达</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="yggc">遥感观测</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="szyb">数值预报</div>
      </div>
      </div>
      </div>
      </span>

      <!-- 第二个 -->
      <div class="nav nav2" @mouseover="secondover" @mouseleave="secondleave">
        <img class="i2" src="../assets/i2.png" alt="" /><span class="zhtq">风险评估</span>
          <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div2" style="height:2px;background-color:#0f53fd;display:none"></div>
           <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-2" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
        <div class="nav xlk-2">
        <div @click="yxbgFn" style="margin:10px 0;text-align:center;font-size:13px">有效波高</div>
        <div @click="zhtqFn" style="margin:10px 0;text-align:center;font-size:13px">灾害天气</div>
      </div>
      </div>
      <!-- 第三个 -->
      <div class="nav nav3" @mouseover="threeover" @mouseleave="threeleave">
        <img class="i3" src="../assets/i3.png" alt="" /><span class="pgjc">评估决策</span>
        <!-- 下边框(下拉框下面的长div) -->
        <div class="long-div3" style="height:2px;background-color:#0f53fd;display:none"></div>
           <!-- i标签（小三角） -->
      <i class="el-icon-caret-bottom small-3" style="position:absolute;top:21px;left:26px;color:#3F9FEA;display:none"></i>
      <div class="nav xlk-3">
        <div @click="pgbjFn" style="margin:10px 0;text-align:center;font-size:13px">评估背景</div>
        <div @click="pgjcFn" style="margin:10px 0;text-align:center;font-size:13px">评估决策</div>
      </div>
      </div>
    </div>
    <!-- 下拉框 -->
    <!-- <div class="xlk-z">
      <div class="nav xlk-1">
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="jgld">激光雷达</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="yggc">遥感观测</div>
        <div style="margin:10px 0;text-align:center;font-size:13px" @click="szyb">数值预报</div>
      </div> -->
      <!-- <div class="nav xlk-2">
        <div @click="yxbgFn" style="margin:10px 0;text-align:center;font-size:13px">有效波高</div>
        <div @click="zhtqFn" style="margin:10px 0;text-align:center;font-size:13px">灾害天气</div>
      </div> -->
      <!-- <div class="nav xlk-3">
        <div @click="pgbjFn" style="margin:10px 0;text-align:center;font-size:13px">评估背景</div>
        <div @click="pgjcFn" style="margin:10px 0;text-align:center;font-size:13px">评估决策</div>
      </div> -->

      
    
    <!-- <router-view></router-view> -->
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
// import bus from '../utils/eventBus'
export default {
  data() {
    return {
    };
  },
  // mounted(){this.c()},
  methods: {
    // 第一个鼠标经过方法
    firstover(){
        $('.xlk-1').show()
        $('.i1').attr('src',i11)
        $('.small-1').show()
        $('.long-div1').show()
    },
    firstleave(){
        $('.xlk-1').hide()
        $('.i1').attr('src',i1)
        $('.small-1').hide()
        $('.long-div1').hide()
    },
    secondover(){
      $('.xlk-2').show()
      $('.i2').attr('src',i22)
      $('.small-2').show()
      $('.long-div2').show()
    },
    secondleave(){
      $('.xlk-2').hide()
      $('.i2').attr('src',i2)
      $('.small-2').hide()
      $('.long-div2').hide()
    },
    threeover(){
      $('.xlk-3').show()
      $('.i3').attr('src',i33)
      $('.small-3').show()
      $('.long-div3').show()
    },
    threeleave(){
      $('.xlk-3').hide()
      $('.i3').attr('src',i3)
      $('.small-3').hide()
      $('.long-div3').hide()
    },
  // 点击二维地图方法
  //  twodt(){
  //    bus.$emit('twodt')
  //  },
  //  //点击三维地球方法
  //  threedt(){
  //    bus.$emit('threedt')
  //  },
    // xtover(){
    //   $('.xlk-4').show()
    // },
    // xtleave(){
    //   $('.xlk-4').hide()
    // },
    //三个下拉框调用同一个方法
    // tabclick(e){
    //   //得到点击元素内容
    //   let a=e.target.textContent
    //   if(a==='风能资源'){
    //     //判断是否有class名 （二次点击隐藏）
    //     if($('.fnzy').hasClass('textcolor')==true){
    //     $('.xlk-1').hide()
    //     $('.small-1').hide()
    //     $('.long-div1').hide()
    //     $('.i1').attr('src',i1)
    //     $('.fnzy').removeClass('textcolor')
    //     }
    //     else{
    //     //显示自己的样式 并恢复其他元素的样式
    //     $('.fnzy').addClass('textcolor')
    //     $('.pgjc').removeClass('textcolor')
    //     $('.zhtq').removeClass('textcolor')
    //     //显示自己的小三角 并隐藏其他的小三角
    //     $('.small-1').show()
    //     $('.small-2').hide()
    //     $('.small-3').hide()
    //     //显示自己的下边框 并隐藏其他的下边框
    //     $('.long-div1').show()
    //     $('.long-div2').hide()
    //     $('.long-div3').hide()
    //     //显示自己的下拉框 并隐藏其他的下拉框
    //     $('.xlk-1').show()
    //     $('.xlk-2').hide()
    //     $('.xlk-3').hide()
    //     //显示自己图片 隐藏其他的图片
    //     $('.i1').attr('src',i11)
    //     $('.i2').attr('src',i2)
    //     $('.i3').attr('src',i3)
    //     }
    //   }else if(a==='风险评估'){
    //     //判断是否有class类名 （二次点击隐藏自己）
    //     if($('.zhtq').hasClass('textcolor')==true){
    //     $('.xlk-2').hide()
    //     $('.small-2').hide()
    //     $('.long-div2').hide()
    //     $('.i2').attr('src',i2)
    //     $('.zhtq').removeClass('textcolor')
    //     }else{
    //     //显示自己的样式 并恢复其他元素的样式
    //     $('.zhtq').addClass('textcolor')
    //     $('.fnzy').removeClass('textcolor')
    //     $('.fxpg').removeClass('textcolor')
    //     //显示自己的小三角 并隐藏其他的小三角
    //     $('.small-1').hide()
    //     $('.small-2').show()
    //     $('.small-3').hide()
    //     //显示自己的下边框 并隐藏其他的下边框
    //     $('.long-div2').show()
    //     $('.long-div1').hide()
    //     $('.long-div3').hide()
    //     //显示自己下拉框 并隐藏其他的下拉框
    //     $('.xlk-1').hide()
    //     $('.xlk-2').show()
    //     $('.xlk-3').hide()
    //     //显示自己的图片 并隐藏其他的图片
    //     $('.i2').attr('src',i22)
    //     $('.i1').attr('src',i1)
    //     $('.i3').attr('src',i3)
    //     }
    //   }else if(a==='评估决策'){
    //     //判断是否有class类名 （二次点击隐藏自己）
    //     if($('.pgjc').hasClass('textcolor')==true){
    //     $('.xlk-3').hide()
    //     $('.small-3').hide()
    //     $('.long-div3').hide()
    //     $('.i3').attr('src',i3)
    //     $('.pgjc').removeClass('textcolor')
    //     }else{
    //     //显示自己的样式 并恢复其他元素的样式
    //     $('.pgjc').addClass('textcolor')
    //     $('.fnzy').removeClass('textcolor')
    //     $('.zhtq').removeClass('textcolor')
    //     //显示自己的小三角 并隐藏其他的小三角
    //     $('.small-1').hide()
    //     $('.small-2').hide()
    //     $('.small-3').show()
    //     //显示自己的下边框 并隐藏其他元素的下边框
    //     $('.long-div3').show()
    //     $('.long-div2').hide()
    //     $('.long-div1').hide()
    //     //显示自己的下拉框 并隐藏其他的下拉框
    //     $('.xlk-1').hide()
    //     $('.xlk-2').hide()
    //     $('.xlk-3').show()
    //     //显示自己的图片 并隐藏其他的图片
    //     $('.i3').attr('src',i33)
    //     $('.i2').attr('src',i2)
    //     $('.i1').attr('src',i1)
    //     }
    //   }
    // },

    //点击跳转激光雷达
    jgld() {
      this.$router.push("/tb");
      //刷新页面
      // this.$router.go(0);
    },
    //点击跳转遥感观测
    yggc() {
      this.$router.push("/yggc");
      //刷新页面
      // this.$router.go(0);

    },
    //点击跳转数值预报
    szyb() {
      this.$router.push("/szyb");
      //刷新页面
      // this.$router.go(0);

    },
    //点击跳转有效波高
    yxbgFn(){
      this.$router.push('/yxbg')
    },
    zhtqFn(){
      this.$router.push('/zhtq')
    },
    pgjcFn(){
      this.$router.push('/pgjc')
    },
    pgbjFn(){
      this.$router.push('/pgbj')
    },
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
.fnzy,.zhtq,.pgjc{
  font-size: 13px;
}

/* 头部导航 */
.header-right {
  width: 210px;
  height: 50px;
  /* border: 1px solid red; */
  position: fixed;
  top: 22px;
  right: 0px;
  margin-right: 1px;
}
.xtsz {
  color: white;
  margin-right: 10px;
  font-size: 13px;

}
.yhm {
  color: white;
  margin-left: 50px;
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
  width: 72px;
  height: 33px;
  cursor:pointer

}
.nav2 {
  position: absolute;
  top: 19px;
  left: 130px;
  width: 72px;
  height: 33px;
  cursor:pointer

}
.nav3 {
  position: absolute;
  top: 19px;
  left: 230px;
  width: 72px;
  height: 33px;
  cursor:pointer

}
/* 导航下拉框 */
.xlk-z {
  width: 310px;
  /* height: 110px; */
  /* border: 1px solid red; */
}
.xlk-1 {
  width: 70px;
  height: 90px;
  position: absolute;
  top: 32px;
  left: 0px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}
.xlk-2 {
  width: 70px;
  height: 65px;
  position: absolute;
  top: 32px;
  left: 0px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}
.xlk-3 {
  width: 70px;
  height: 65px;
  position: absolute;
  top: 32px;
  left: 0px;
  background: rgba(22, 28, 87, 0.7);
  display: none;
  /* 解决页面中定位用的次数多时的层次问题 */
  z-index: 9;
  cursor:pointer

}
.xlk-4 {
  width: 70px;
  height: 65px;
  position: absolute;
  top: 30px;
  right: 140px;
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
.textcolor{
  color: #03E2FF;
}
</style>