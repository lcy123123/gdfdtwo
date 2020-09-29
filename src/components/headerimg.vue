<template>
  <div class="header">
    <img class="header-img" src="../assets/header.png" alt="未能正确加载" />
    <!-- 头部导航 -->
    <!-- 右侧 -->
    <div class="header-right">
      <span class="xtsz"><i class="el-icon-setting"></i>  系统设置</span>
      <span class="yhm"><i class="el-icon-user"></i> yonghuming <i class="el-icon-arrow-down"></i> </span>
      
    </div>
    <!-- 左侧 -->
    <div class="nac-z">
      <div class="nav nav1" @click="fn"><span>风能资源</span></div>
      <div class="nav nav2" @click="zh"><i class="el-icon-lightning"></i><span>灾害天气</span></div>
      <div class="nav nav3" @click="pg"><span>评估决策</span></div>
    </div>
    <!-- 下拉框 -->
    <div class="xlk-z">
      <div class="nav xlk-1">
        <div>激光雷达</div>
        <div>遥感观测</div>
        <div>数值预报</div>
      </div>
      <div class="nav xlk-2">
        <div>激光雷达</div>
        <div>遥感观测</div>
        <div>数值预报</div>
      </div>
      <div class="nav xlk-3">
        <div>激光雷达</div>
        <div>遥感观测</div>
        <div>数值预报</div>
      </div>
    </div>
   
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      
    }
  },
  methods:{
    fn:function(){
      $('.xlk-1').css('display:block')
     $('.xlk-1').slideToggle(200)
    },
    zh:function(){
      $('.xlk-2').css('display:block')
      $('.xlk-2').slideToggle(200)
    },
    pg:function(){
      $('.xlk-3').css('display:block')
      $('.xlk-3').slideToggle(200)
      
    },
  }
};
</script>
<style scoped>

/* 头部照片 */
.header{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.header-img{
height: 45px;
width: 100%;
overflow: hidden;
}

/* 头部导航 */
.header-right{
  width: 300px;
  height: 50px;
  /* border: 1px solid red; */
  position: absolute;
  top:22px;
  right: 10px;
}
.xtsz{
  color: white;
  margin-right: 10px;
}
.yhm{
  color: white;
  margin-left: 10px;
}
.nav-z{
  position: relative;
  top:10px;
  left:10px;
}
.nav{
  color: white;
  font-size: 16px;
}
.nav1{
  position: absolute;
  top: 19px;
  left: 35px;
  border-bottom: 2px solid #0F53FD;
}
.nav2{
  position: absolute;
  top: 19px;
  left: 130px;
  border-bottom: 2px solid #0F53FD;
}
.nav3{
  position: absolute;
  top: 19px;
  left: 230px;
  border-bottom: 2px solid #0F53FD;
}
/* 导航下拉框 */
.xlk-z{
  width: 310px;
  height: 110px;
  /* border: 1px solid red; */
}
.xlk-1{
  width: 90px; 
  height: 100px;
  position: absolute;
  top:50px;
  left:20px;
  border: 1px solid red;
  background: rgba(29,34,90);
  display: none;
}
.xlk-2{
  width: 90px; 
  height: 100px;
  position: absolute;
  top:50px;
  left:120px;
  border: 1px solid red;
  background: rgba(29,34,90);
  display: none;
}
.xlk-3{
  width: 90px; 
  height: 100px;
  position: absolute;
  top:50px;
  left:220px;
  border: 1px solid red;
  background: rgba(29,34,90);
  display: none;
}

.xlk-1 div,.xlk-2 div,.xlk-3 div{
  margin:10px;
}

.xlk-1>div:hover{
  background-color: #113EBD;
}
.xlk-2>div:hover{
  background-color: #113EBD;
}
.xlk-3>div:hover{
  background-color: #113EBD;
}

</style>