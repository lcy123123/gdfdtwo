<template>
    <div>
      <!-- 风参数信息 -->
      <Fcsxx></Fcsxx>
    <!-- 五个小按钮 -->
    <Fiveli></Fiveli>
    <!-- 上边的 -->
    <Ygsz ref="child"></Ygsz>
  </div>
</template>
<script>
import Fiveli from './fiveli'
import Fcsxx from './fcsxx'
import Ygsz from './ygsz'

export default {
  components: {
     Fcsxx,
     Fiveli,
     Ygsz
   },
   mounted(){
     this.fn()
   },
 data () {
   
     return {
         a: [''],   //问题：加双向数据绑定时复选框点击不了
         marks: {
          '0': '地面',
          '40': '40',
          '80': '80',
          '120': '120',
          '160':'160',
          '200':'200'
        }

     }
 },
 methods:{
   fn(){
     this.$refs.child.Cli1();
     this.$refs.child.Cli2();
   }
 }
  
}
</script>
<style>

.fivebtn{
  position: absolute;
  top: 65px;
  right: 385px;
}
ul{
  display: none;
}
.tog{
  position: absolute;
  top:3px;
  right: 1px;
}

.el-checkbox__label {
  color: white;
  font-size: 12px;
  margin-left: -3px;

}
/* .top-1{
  display: none
} */
/* .right-top img{
background: url(../assets/y1.png);
}
.y1-text{
  color: white
} */
</style>