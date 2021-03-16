<template>
    <div class="pg-z">
        <!-- 评估背景和评估决策组件 -->
        <div class="right bottom-line">
      <div class="right-top" @click="Cli1">
        <img class="y1" src='../assets/bj2.png' alt="">
        <span class="y1-text">评估背景</span>
        <span  class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-form>
          <el-radio-group v-model="pgbj">
          <el-radio label="海洋行政功能区划"></el-radio>
          <!-- 点击实现子组件向父组件传值 -->
          <el-radio class="p2" label="鱼类产卵场"></el-radio>
          <el-radio class="p3" label="港口通航"></el-radio>
          <el-radio class="p4" label="海底油气管道"></el-radio>
          <el-radio class="p5" label="海底光/电缆"></el-radio>
          <el-radio class="p6" label="自然保护区"></el-radio>
          <el-radio class="p7" label="生态红线"></el-radio>
          <el-radio class="p8" label="已规划风电场"></el-radio>
          </el-radio-group>
          </el-form>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom" @click="Cli2">
        <img class="y2" src="../assets/jc1.png" alt="未能正确加载">
        <span class="y2-text">评估决策</span>
        <span  class="c2" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
         <div class="top-2">
        <el-form>
          <el-form-item>
            <el-radio-group v-model="tf">
            <el-radio class="radio-tfpc"  label="可开发厂址推荐"></el-radio>
            <el-radio class="radio-tfpc"  label="可开发容量"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
           
        </div>
    </div>
    <!-- 近底层和中上层下拉框 -->
    <div class="pgbjgd" style="display:none">
    <el-form class="gdxlk">
      <el-form-item label="高度:">
        <el-select v-model="gdvalue">
         <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
 </el-select>
      </el-form-item>
    </el-form>
    </div>
    </div>
</template>

<script>
import $ from 'jquery'

//遥感观测小图标
import bj1 from '../assets/bj1.png'
import bj2 from '../assets/bj2.png'
// 数值预报小图标
import jc1 from '../assets/jc1.png'
import jc2 from '../assets/jc2.png'

import bus from '../utils/eventBus'
export default {
    data(){
    return{
      pgbj:'',
      tf:'',
        options: [{
          value: '中上层',
          label: '中上层'
        }, {
          value: '近底层',
          label: '近底层'
        }],
        gdvalue: '中上层'
    }
  },
  //监听
     watch:{
       gdvalue(value){
      bus.$emit('zsjd',value)
    },
       tf(value){
        //  隐藏评估背景的高度下拉框
         $('.pgbjgd').hide()
         bus.$emit('pgjc',value)
         bus.$off('szyb','')
         bus.$off('yxbg','')

         bus.$emit('Wx','')
         bus.$emit('Wxcs','')
         bus.$off('yggc')
        //  bus.$off('yggc','')
         
       },
       pgbj(value){
        //  对高度下拉框控制显示隐藏
         if(this.pgbj!=='鱼类产卵场'){
           $('.pgbjgd').hide()
         }else{
           $('.pgbjgd').show()
         }

         bus.$emit('pgbj',value)
         bus.$off('szyb')
        //  bus.$off('yggc')
        //  bus.$off('yggc')
         bus.$off('yxbg')
         bus.$emit('Wx','')
         bus.$emit('Wxcs','')
        //  bus.$off('Wx')
        //  bus.$off('Wxcs')


       }

     },
     methods:{
      

          //显示此页面时 默认展开第一个（遥感观测）
    Cli1(){
      this.$router.push('/pgbj')
    // 点击按钮  判断第一个小图标（如果是亮的 则将小图标变不亮  背景以及文字变不亮）  默认是展开的 （小图标和文字背景是亮的）
      if($('.y1').attr('src')==bj2){
        //将小图标变成不亮的
        $('.y1').attr('src',bj1)
        //将背景变成没有
        $('.right-top').css({'background': ' rgba(8,26,127,0)'})
        //将文字变成不亮的
        $('.y1-text').css({'color':'white'})
        //点击切换后面的小图标
        // $('.c1,.el-icon-caret-bottom').attr('class','el-icon-caret-right')
        $('.c1').find('i').attr('class','el-icon-caret-right')

      }else{
        //将小图标变成亮的
        $('.y1').attr('src',bj2)
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
        this.$router.push('/pgjc')
        if($('.y2').attr('src')==jc1){
        //将小图标变成亮的
        $('.y2').attr('src',jc2)
        //将背景变成有
        $('.right-bottom').css({'background': 'rgba(8,26,127,.5)'})
        //将文字变成亮的
        $('.y2-text').css({'color':'#04BFEA'})
        //改变后面的小三角
        $('.c2').find('i').attr('class','el-icon-caret-bottom')

      }else{
        //将小图标变成不亮的
        $('.y2').attr('src',jc1)
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
.pg-z .el-radio{
  margin-right: 13px;
  margin-top:10px;
  color: white;
}
.pg-z .radio-tfpc{
  margin-left: 24px;
  margin-top:32px
}
.pg-z .radio-san{
  margin-left: 14px;
}


.pg-z .right{
  width: 360px;
  border: 1px solid rgba(8,26,127,.5);
  position: fixed;
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
.pg-z .right-top{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.pg-z .y1,.y2{
  width: 15px;
  height: 15px;
  margin-left: 10px;
  vertical-align: middle;
}
.pg-z .y1-text,.y2-text{
  color: white;
  margin-left: 5px;
  vertical-align: middle;
}
.pg-z .y1-text{
  color: #04BFEA;
}
.pg-z .pg-z .top-11{
  color: white;
  font-size: 14px;
  padding: 20px;
}
.pg-z .top-11>input{
  margin: 10px;
}
.pg-z .top-1{
  background-color:rgba(0,3,44,.5) ;
}
.pg-z .top-2{
  height: 82px;
color: white;
display: none;
background-color:rgba(0,3,44,.5) ;

}



.pg-z .right-bottom{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.pg-z .sli1{
  width: 280px;
  margin:10px 30px 30px 30px;
}
.pg-z .p2{
    margin-left: 10px;
}
.p4{
    margin-left: 66px;
}
.pg-z .p6{
    margin-left: 46px;
}
.pg-z .p8{
    margin-left: 66px;
}
.pg-z .el-select .el-input__inner{
  width: 90px;
  height: 30px;
}
</style>