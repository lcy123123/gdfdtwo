<template>
  <div>
    <!-- 右侧六个小按钮 -->
    <div class="tog-six" v-if="(this.$route.path=='/tb'||this.$route.path=='/first')?false:true">
      <div @click="tog" ><img class="tog" src="../assets/down.jpg" alt="" /></div>
      <ul>
        <li @click="first"><img src="../assets/01.png" alt="" /></li>
        <li @click="second"><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
      </ul>
    </div>
    <!-- 时间轴 -->
    <div class="sjz-z" v-if="this.$route.path!='/tb'?true:false">
      <div>
        <span class="btn-1"><img src="../assets/001.png" alt=""/></span>
        <span class="btn-2"><img src="../assets/002.png" alt=""/></span>
      </div>
      <!-- 中间时间轴 -->
      <div class="sjz-middle">
        <img class="sjz-img" src="../assets/sjz.png" alt="" />
        <el-slider  v-model="value1"></el-slider>
      </div>
      <div>
        <span class="btn-3"><img src="../assets/003.png" alt=""/></span>
        <span class="btn-4"><img src="../assets/004.png" alt=""/></span>
        <span class="btn-5"><img src="../assets/005.png" alt=""/></span>
        <span class="btn-6"><img src="../assets/006.png" alt=""/></span>
        <span class="btn-7"><img src="../assets/007.png" alt=""/></span>
      </div>
    </div>
    <div class="zy-b" v-if="(this.$route.path=='/'||this.$route.path=='/first')?true:false">
            <div class="tu">图例</div>
              <div class="zscdiv"></div>
              <div class="s1">中上层鱼类产卵场</div>
            <!-- </div> -->
        </div>
  </div>
</template>
<script>
import $ from "jquery";
// import echarts from 'echarts'
import up from '../assets/up.png'
import down from '../assets/down.jpg'
export default {
  data() {
    return {
      value1: 0
    };
  },
  methods: {
    tog: function() {
      $("ul").slideToggle(200);
       if($('.tog').attr('src')==down){
        $('.tog').attr('src',up)
      }else{
        $('.tog').attr('src',down)
      }
    },
    first: function() {
      // 跳转页面
      this.$router.push("/first");
    },
    second: function() {
      // 跳转页面
      this.$router.push("/second");
    }
  }
};

//保证dom加载完成后获取dom元素
function load() {}
window.onload = load;
</script>
<style>
.tog-six{
   position: absolute;
   top:70px;
   right: 15px;
}
.tog {
  width: 40px;
  height: 20px;
  /* position: absolute;
  top: 55px;
  right: 20px; */
  /* border: 1px solid red; */
}
.tog > img {
  width: 40px;
  height: 20px;
}
.small {
  width: 15px;
  height: 15px;
  background-color: #1e4292;
  /* background-color: rgb(230, 109, 109); */
  position: absolute;
  top: 60px;
  left: 70px;
  transform: rotate(45deg);
}

ul {
  position: absolute;
  right: 5px;
  top: 10px;
}
li {
  font-size: 5px;
  list-style-type: none;
  cursor: pointer;
}
img {
  width: 30px;
  height: 30px;
}

.sjz-z {
  width: 610px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 25%;
  border: 1px solid #091673;
  border-radius: 30px;
}
.sjz-middle {
  position: absolute;
  left: 70px;
  top: 10px;
  width: 400px;
  height: 100%;
}
.sjz-img {
  width: 400px;
  height: 17px;
  float: left;
  margin: 0 auto;
}
.btn-1 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 18px;
}
.btn-2 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 36px;
  top: 18px;
}
.btn-3 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 115px;
  top: 15px;
}
.btn-4 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 90px;
  top: 15px;
}
.btn-5 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 65px;
  top: 15px;
}
.btn-6 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 40px;
  top: 15px;
}
.btn-7 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.el-slider__runway {
  height: 3px;
}
.el-slider__button {
  width: 12px;
  height: 12px;
}
.zscdiv{
  width: 40px;
  height: 15px;
  /* border:1px solid rgb(12, 150, 205); */
  border:1px solid #084C79;
  display: inline-block;
  margin-right: 5px;
  top:20px;
  vertical-align: bottom;
  background-color: #0C96CD;

}
.s1{
  display: inline-block;
  vertical-align: bottom;
}
</style> 