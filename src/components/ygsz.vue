<template>
      <!-- 遥感观测与数值预报组件 -->
         <!-- 上边的 -->
    <div class="right bottom-line">
      <div class="right-top" @click="Cli1">
        <img class="y1" src='../assets/y2.png' alt="">
        <span class="y1-text">遥感观测</span>
        <span  class="c1" style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-bottom"></i></span>
      </div>
      <!-- 右边第一个下拉框 -->
      <div class="top-1">
        <div class="top-11">
          <el-form>
            <el-form-item>
                 <el-radio-group v-model="Wxinit" size="small" @change='selectWx($event)'>
                   <el-radio-button label="ASCAT"></el-radio-button>
                   <el-radio-button label="WindSat"></el-radio-button>
                   <el-radio-button label="CFOSAT"></el-radio-button>
                   <el-radio-button label="HY-2B"></el-radio-button>
                   <el-radio-button label="HY-2A"></el-radio-button>
                 </el-radio-group>
            </el-form-item>
             <el-radio-group v-model="Wxcsinit" @change="selectWxcs($event)">
             <el-radio class="a1" label="月平均风速"></el-radio>
             <el-radio class="a2" label="月平均风功率密度"></el-radio>
             <el-radio class="a3" label="年平均风速"></el-radio>
             <el-radio class="a4" label="年平均风功率密度"></el-radio>
             </el-radio-group>
            </el-form>
        </div>
      </div>
      <!-- 下边的 -->
      <div class="right-bottom" @click="Cli2">
        <img class="y2" src="../assets/s1.png" alt="">
        <span class="y2-text">数值预报</span>
        <span  class="c2"  style="float:right;margin-right:5px"><i style="color:white" class="el-icon-caret-right"></i></span>
      </div>
         <div class="top-2">
           <el-form>
        <el-radio-group v-model="szybvalue" @change="addimg">
          <!-- 子组件向父组件的传值 -->
           <el-radio class="b1" label="年平均风速"></el-radio>
           <el-radio class="b2" label="月平均风速"></el-radio>
           <el-radio class="b3" label="逐小时年平均风速"> </el-radio>
           <el-radio class="b4" label="逐小时月平均风速"></el-radio>
           <el-radio class="b5" label="年平均风功率密度"> </el-radio>
           <el-radio class="b6" label="月平均风功率密度"></el-radio>
           <el-radio class="b7" label="有效风速时数"></el-radio>
           <el-radio class="b8" label="风切变系数"></el-radio>
           <el-radio class="b9" label="威布尔分布形状参数"></el-radio>
           <el-radio class="b10" label="威布尔分布尺度参数"></el-radio>
           <el-radio class="b11" label="风向分布频率"></el-radio>
           <el-radio class="b12" label="各向风功率密度分布频率"></el-radio>
           <el-radio class="b13" label="各区间风速分布频率"></el-radio>
           <el-radio class="b14" label="各区间风功率密度分布频率"></el-radio>
           <el-radio class="b15" label="格点风参"></el-radio>
           </el-radio-group>
           
           </el-form>
           <!-- 右面的时间轴 -->
            <!-- <div>  <el-slider  class="sli1" v-model="value" min="0" max="200" step="40" range  :marks="marks"></el-slider></div> -->
            <div>  <el-slider  class="sli1" v-model="gdvalue" :min="10" :max="150" :step="10" show-stops :marks="marks" @change="changeGdValue($event)"></el-slider></div>
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
import bus from '../utils/eventBus'

export default {
    data(){
      return{
        //卫星初始数据
        Wxinit: '',
        //卫星参数初始数据
        Wxcsinit:'',
        gdvalue:10,
        szybvalue:'',
        marks:{
          10:'10',
          30:'30',
          50:'50',
          70:'70',
          80:'80',
          90:'90',
          100:'100',
          110:'110',
          120:'120',
          130:'130',
          150:'150',
        },
       
      }
    },
    methods:{
      //选择高度值
      changeGdValue(gdvalue){
        this.gdvalue=gdvalue
        //向其他组件传值
        bus.$emit('gdvalue',gdvalue)
      },
      //选择卫星参数方法
      selectWxcs(Wxcs){ 
        bus.$emit('Wxcs',Wxcs)
        bus.$emit('addimg',"")
      },
      //卫星选择方法
      selectWx(Wx){
        bus.$emit('Wx',Wx)
      },
      //根据卫星以及卫星参数判断前端输入数据方法
      wxAndWxcs(){
        if(this.Wzcs==='月平均风速'||this.Wzcs==='月平均风功率密度'){
          if(this.Wx==='ASCAT'||this.Wx==='WindSat'||this.Wx==='HY-2B'||this.Wx==='CFOSAT'){
            console.log('2019年的')
            
          }else{
            console.log('2017年的')
          }

        }else if(this.Wzcs==='年平均风速'||this.Wzcs==='年平均风功率密度'){
          if(this.Wx==='ASCAT'||this.Wx=='WindSat'){
            console.log('2010-2019年的')
          }else if(this.Wx==='HY-2A'){
            console.log('2012-2018年的')
          }else{
            console.log('2019-2020年的')
          }

        }

      },
      //点击年平均风速 出图片（添加图片方法）
      addimg(){
        bus.$emit('addimg',this.szybvalue)
         bus.$emit('Wxcs','');
         bus.$emit('Wx','')
      },


       //显示此页面时 默认展开第一个（遥感观测）
      Cli1(){
        this.$router.push('/yggc')
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
        this.$router.push('/szyb')
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
<style >

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
  height: 250px;
color: white;
display: none;
background-color:rgba(0,3,44,.5) ;

}

.el-radio{
  margin-top:5px;
  color:white
}
.b1{
margin-left: 10px;
margin-top: 15px;
margin-right: 62px;
}
.b3{
  margin-left: 10px;
  margin-right: 20px;
}
.b5{
  margin-left: 10px;
  margin-right: 20px;
}
.b7{
  margin-left: 10px;
  margin-right: 48px;
}
.b9{
  margin-left: 10px;
  margin-right: 6px;
}
.b11{
  margin-left: 10px;
  margin-right: 48px;
}
.b12{
  margin-right: 0px;
}
.b13{
  margin-left: 10px;
  margin-right: 6px;
}
.b14{
  margin-right: 0px;
}
.b15{
  margin-left: 10px;
  margin-right: 17px;

}
.right-bottom{
background: rgba(3,37,127,.5);
border: 2px solid rgba(8,26,127,.5);
cursor: pointer;
}
.sli1{
  width: 300px;
  margin:10px 30px 30px 30px;
}
.el-radio-button__inner{
  background: none;
  border: 1px solid #0c96cd;
  color:white
}
.el-radio-button--small .el-radio-button__inner{
  padding: 8px 8px;
}
/* HY-2A等样式 */
.a1{
  margin-right: 30px;
}
</style>