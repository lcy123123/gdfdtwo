<template>
  <div>
    <!-- 五个小按钮 -->
    <Fiveli></Fiveli>
    <!-- 遥感数据 数值预报组件 -->
    <Ygsz></Ygsz>
  </div>
</template>
<script>
import Fiveli from './fiveli'
// 箭头朝下图片

import Ygsz from './ygsz'
export default {
  components: {
    Fiveli,
    Ygsz
  },
  data() {
    return {
      flag:true,
      // value: 0,   //问题：加双向绑定数据时复选框点不了
        marks: {
          0: '地面',
          40: '40',
          80: '80',
          120: '120',
          160:'160',
          200:'200'
  }}},
};
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

</style>