<template>
  <div>
    <div class="fivebtn">
       <div class="tog"><img  @click="tog" id="t" src="../assets/down.jpg" alt="" /></div>
      <ul>
        <li @click="first"><img src="../assets/01.png" alt="" /></li>
        <li @click="second"><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
      </ul>
    </div>
    <!-- 上边的 -->
    <div class="right">
      <div class="right-top">
        <!-- <img class="y1" src="../assets/y1.png" alt=""> -->
        <!-- <img class="y1" src="../assets/y2.png" alt=""> -->
        <!-- <img class="y1" :src="'flag? y1:y2'" alt=""> -->
        <img class="y1" :src="flag?y1:y2" alt="">
        <span class="y1-text">遥感观测</span>
        <span @click="Cli1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom">
        <img class="y2" src="../assets/s1.png" alt="">
        <span class="y2-text">数值预报</span>
        <span @click="cli2" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
// 箭头朝下图片
import up from '../assets/up.png'
// 箭头朝上图片
import down from '../assets/down.jpg';
//遥感观测小图标

// import y2 from '../assets/y2.png'
export default {
  data() {
    return {
      flag:true,
      y1: require('../assets/y1.png'),
      y2: require('../assets/y2.png')
    }
  },
  methods:{
  Cli1(){
      $('.right-top').css({'background': 'rgba(3,37,127,.5)'})
      $('.y1-text').css({'color':'#04BFEA'})
      //切换小图标
      if(this.flag==true){
        this.flag=false
      }else{
        this.flag=true
      }
      console.log(this.flag)
    

    },
    cli2(){
      $('.right-bottom').css({'background': 'rgba(3,37,127,.5)'})
      $('.y2-text').css({'color':'#04BFEA'})
      // $('')
      // flag=!flag
      console.log(this.flag,'1234567')

    },
    tog:function(){
      // $('#t').attr('src',up)
      $('ul').slideToggle(200)
      //点击切换图标
      if($('#t').attr('src')==down){
        $('#t').attr('src',up)
      }else{
        $('#t').attr('src',down)
      }
    }
  }
};
</script>
<style>
.right{
  width: 300px;
  height: 420px;
  border: 1px solid red;
  position: absolute;
  right:15px;
  top:65px
}
.fivebtn{
  /* border:1px solid red; */
  /* width: 20px;
  height: 40px; */
  position: absolute;
  top: 65px;
  right: 335px;
}
.tog{
  position: absolute;
  top:3px;
  right: 1px;
}
.right-top{
border: 1px solid red;
/* background: rgba(3,37,127,.5); */
}
.right-bottom{
border: 1px solid red;
/* background: rgba(3,37,127,.5); */
}
.y1,.y2{
  width: 15px;
  height: 15px;
  margin-left: 10px;
  vertical-align: middle;
}
.y1-text,.y2-text{
  color: white;
  margin-left: 5px;
  vertical-align: middle;
}
</style>