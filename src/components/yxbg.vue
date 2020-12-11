<template>
    <div>
      <!-- 有效波高 -->
      <Yxbg></Yxbg>
      <!-- 时间轴 -->
      <Sjz style="display:none"></Sjz>
    </div>
</template>

<script>

import Yxbg from './yxbgzhtq'
import Sjz from './sjz'

export default {
  components:{
    Yxbg,
    Sjz,
  },
    methods:{

  
  }
}
</script>
<style  scoped>
.el-radio{
  margin-right: 11px;
  margin-top:10px;
  color: white;
}
.radio-tfpc{
  margin-left: 24px;
  margin-top:32px;
  bottom: -42px;
  left: -23px;
  display: block;
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
</style>