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