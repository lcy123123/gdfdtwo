<template>
    <div>
        <!-- 评估背景和评估决策组件 -->
        <div class="right bottom-line">
      <div class="right-top" @click="Cli1">
        <img class="y1" src='../assets/y2.png' alt="">
        <span class="y1-text">评估背景</span>
        <span  class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-form>
          <el-radio-group v-model="plist">
          <el-radio label="海洋行政功能区划"></el-radio>
          <!-- 点击实现子组件向父组件传值 -->
          <span @click="addsl"><el-radio class="p2" label="鱼类产卵场"></el-radio></span>
          <el-radio class="p3" label="港口通航"></el-radio>
          <el-radio class="p4" label="海底油气管道"></el-radio>
          <el-radio class="p5" label="海底光/电缆"></el-radio>
          <el-radio class="p6" label="自然保护区"></el-radio>
          <el-radio class="p7" label="生态红线"></el-radio>
          <el-radio class="p8" label="已规划风电场"></el-radio>
          <!-- <el-radio label="十年一遇"></el-radio>
          <el-radio class="radio-san" label="三十年一遇"></el-radio> -->
          </el-radio-group>
          </el-form>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom" @click="Cli2">
        <img class="y2" src="../assets/s1.png" alt="">
        <span class="y2-text">评估决策</span>
        <span  class="c2" :v-model="flag" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
         <div class="top-2">
        <el-form>
          <el-form-item>
            <el-radio class="radio-tfpc" v-model="tf" label="可开发厂址推荐"></el-radio>
          </el-form-item>
        </el-form>
           
        </div>
    </div>
    </div>
</template>

<script>
import $ from 'jquery'

//遥感观测小图标
import y1 from '../assets/y1.png'
import y2 from '../assets/y2.png'
// 数值预报小图标
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'


export default {
    data(){
    return{
      plist:'',
      tf:'',
    }
  },
     methods:{
       //子组件向父组件传值
       addsl(){
         this.$emit('event2')
       },

          //显示此页面时 默认展开第一个（遥感观测）
    Cli1(){
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      if($('.y1').attr('src')==y2){
        //将小图标变成不亮的
        $('.y1').attr('src',y1)
        //将背景变成没有
        $('.right-top').css({'background': ' rgba(8,26,127,0)'})
        //将文字变成不亮的
        $('.y1-text').css({'color':'white'})
        //点击切换后面的小图标
        // $('.c1,.el-icon-caret-bottom').attr('class','el-icon-caret-right')
        $('.c1').find('i').attr('class','el-icon-caret-right')
        console.log($('.c1').find('i'))

      }else{
        //将小图标变成亮的
        $('.y1').attr('src',y2)
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

        if($('.y2').attr('src')==s1){
        //将小图标变成亮的
        $('.y2').attr('src',s2)
        //将背景变成有
        $('.right-bottom').css({'background': 'rgba(8,26,127,.5)'})
        //将文字变成亮的
        $('.y2-text').css({'color':'#04BFEA'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-bottom')

      }else{
        //将小图标变成不亮的
        $('.y2').attr('src',s1)
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
<style  scoped>
.el-radio{
  margin-right: 13px;
  margin-top:10px;
  color: white;
}
.radio-tfpc{
  margin-left: 24px;
  margin-top:32px
}
.radio-san{
  margin-left: 14px;
}


.right{
  width: 360px;
  border: 1px solid rgba(8,26,127,.5);
  position: absolute;
  right:15px;
  top:65px
}
.bottom-line{
  background: linear-gradient(to left,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) left bottom no-repeat,
                linear-gradient(to left,#01A2FE,#01A2FE) right bottom no-repeat,
                linear-gradient(to bottom,#01A2FE,#01A2FE) right bottom no-repeat;
   background-size: 2px 23px,23px 2px,2px 23px,23px 2px;
}
.right-top{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
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
.y1-text{
  color: #04BFEA;
}
.top-11{
  color: white;
  font-size: 14px;
  padding: 20px;
}
.top-11>input{
  margin: 10px;
}
.top-1{
  background-color:rgba(0,3,44,.5) ;
}
.top-2{
  height: 82px;
color: white;
display: none;
background-color:rgba(0,3,44,.5) ;

}



.right-bottom{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.sli1{
  width: 280px;
  margin:10px 30px 30px 30px;
}
.p2{
    margin-left: 10px;
}
.p4{
    margin-left: 66px;
}
.p6{
    margin-left: 46px;
}
.p8{
    margin-left: 66px;
}
</style>