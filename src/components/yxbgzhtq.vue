<template>
      <!-- 遥感观测与数值预报组件 -->
         <!-- 上边的 -->
         <div class="zz">
    <div class="right bottom-line">
      <div class="right-top" @click="Cli1">
        <img class="y1" src='../assets/bg2.png' alt="">
        <span class="y1-text">有效波高</span>
        <span  class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-form>
          <el-form-item>
          <el-radio-group v-model="yxbgvalue" @change="addyxbgimg($event)">
          <el-radio label="逐月平均值"></el-radio>
          <el-radio label="逐月最大值"></el-radio>
          <el-radio label="逐月最小值"></el-radio>
          <el-radio label="逐年平均值"></el-radio>
          <el-radio label="逐年最大值"></el-radio>
          <el-radio label="逐年最小值"></el-radio>
          <el-radio label="十年平均值"></el-radio>
          <el-radio label="十年最大值"></el-radio>
          <el-radio label="十年最小值"></el-radio>
          <el-radio label="十年一遇"></el-radio>
          <el-radio class="radio-san" label="三十年一遇"></el-radio>
          <!-- <el-radio class="radio-tfpc" label="台风频次"></el-radio> -->
          </el-radio-group>
          </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom" @click="Cli2">
        <img class="y2" src="../assets/zh1.png" alt="">
        <span class="y2-text">灾害天气</span>
        <span  class="c2" :v-model="flag" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
         <div class="top-2">
           <!-- <el-radio class="radio-tfpc2" @change="tfpc($event)" v-model="tf" label="台风频次"></el-radio> -->
        <el-form>
          <!-- <el-form-item>
             <el-radio @change="tfpc($event)" class="radio-tfpc2" v-model="tf" label="台风频次" style="display:block"></el-radio>            
          </el-form-item> -->
          <div @click="tfpc">
           <el-checkbox  class="singletf" v-model="clickflag"><span class="tfpcstyle">台风频次</span></el-checkbox>
          </div>
        </el-form>
           
        </div>
    </div>
    </div>
</template>
<script>
import $ from 'jquery'

//遥感观测小图标
import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
// 数值预报小图标
import zh1 from '../assets/zh1.png'
import zh2 from '../assets/zh2.png'
import bus from '../utils/eventBus'


export default {
    data(){
    return{
      //复选框状态值
      clickflag:false,
      tfpcvalue:'台风频次',
      //有效波高选中值
      yxbgvalue:'',
      tf:'',
      flag:''
    }
  },
     methods:{
       //台风频次方法（发起组件传值 包括状态值）
       tfpc(){
          bus.$emit('addzhtqimg',this.tfpcvalue,this.clickflag)
       },
       //点击有效波高其中一个触发事件（向cesium传递参数）
       addyxbgimg(yxbgvalue){
         this.yxbgvalue=yxbgvalue
         bus.$emit('addyxbgimg',yxbgvalue)
       },
          //显示此页面时 默认展开第一个（遥感观测）
      Cli1(){
        this.$router.push('/yxbg')
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      if($('.y1').attr('src')==bg2){
        //将小图标变成不亮的
        $('.y1').attr('src',bg1)
        //将背景变成没有
        $('.right-top').css({'background': ' rgba(8,26,127,0)'})
        //将文字变成不亮的
        $('.y1-text').css({'color':'white'})
        //点击切换后面的小图标
        $('.c1').find('i').attr('class','el-icon-caret-right')
       

      }else{
        //将小图标变成亮的
        
        $('.y1').attr('src',bg2)
        //将背景变成蓝色
        $('.right-top').css({'background': 'rgba(3,37,127,.5)'})
        //将文字变成蓝色的
        $('.y1-text').css({'color':'#04BFEA'})
        //点击切换后面小三角
        $('.c1').find('i').attr('class','el-icon-caret-bottom')

      }
      //top1上滑
      $('.top-1').slideToggle(200)

     
    },

    //点击第二个
    Cli2(){   
      this.$router.push('/zhtq')
        if($('.y2').attr('src')==zh1){
        //将小图标变成亮的
        $('.y2').attr('src',zh2)
        //将背景变成有
        $('.right-bottom').css({'background': 'rgba(8,26,127,.5)'})
        //将文字变成亮的
        $('.y2-text').css({'color':'#04BFEA'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-bottom')
      }else{
        //将小图标变成不亮的
        $('.y2').attr('src',zh1)
        //将背景变成无色
        $('.right-bottom').css({'background': 'rgba(3,37,127,0)'})
        //将文字变成白色的
        $('.y2-text').css({'color':'white'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-right')

      }
      //点击上滑
      $('.top-2').slideToggle(200)

    },
  }
}
</script>

<style  >
.zz .right{
  width: 360px;
  border: 1px solid rgba(8,26,127,.5);
  position: fixed;
  right:15px;
  top:65px
}
.zz .el-radio{
  margin-right: 13px;
  margin-top:10px;
  color: white;
}
.zz .radio-tfpc{
  margin-left: 24px;
  margin-top:32px;
  bottom: -42px;
  left: -23px;
  display: none;
}
.zz .radio-tfpc2{
  margin-left: 44px;
  margin-top:32px;
  bottom: 0px;
  left: -23px;
  /* display: none; */
}
.zz .radio-san{
  margin-left: 14px;
}


.bottom-line{
  background: linear-gradient(to left,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to left,#01A2FE,#01A2FE) right bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) right bottom no-repeat;
   background-size: 2px 23px,23px 2px,2px 23px,23px 2px;
}
.zz .right-top{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.zz .y1,.y2{
  width: 15px;
  height: 15px;
  margin-left: 10px;
  vertical-align: middle;
}
.zz .y1-text,.y2-text{
  color: white;
  margin-left: 5px;
  vertical-align: middle;
}
.zz .y1-text{
  color: #04BFEA;
}
.zz .top-11{
  color: white;
  font-size: 14px;
  padding: 20px;
  
}
.zz .top-11>input{
  margin: 10px;
}
.zz .top-1{
  background-color:rgba(0,3,44,.5) ;
  height: 140px;
}
.zz .top-2{
  height: 82px;
color: white;
display: none;
background-color:rgba(0,3,44,.5) ;

}



.zz .right-bottom{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.zz .sli1{
  width: 280px;
  margin:10px 30px 30px 30px;
}
/* 台风频次复选框样式 */
.singletf .el-checkbox__inner{
  width: 13px;
  height: 13px;
  background-color: rgb(255, 255, 255,0);
  border-radius: 0;
  margin-left: 20px;
  margin-top: 26px;
}
/* 台风频次字样 样式 */
.tfpcstyle{
  font-size: 14px;
  margin-left: 3px;
  position: fixed;
  margin-top:-2px;
}
</style>