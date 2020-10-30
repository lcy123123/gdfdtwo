<template>
  
   <!-- 右侧六个小按钮 -->
    <div class="tog-six">
      <div @click="tog" ><img class="tog" src="../assets/up.png" alt="" /></div>
     <div class="ul-five">
        <li><img src="../assets/01.png" alt="" /></li>
        <li><img src="../assets/02.png" alt="" /></li>
        <li><img src="../assets/03.png" alt="" /></li>
        <li><img src="../assets/04.png" alt="" /></li>
        <li><img src="../assets/05.png" alt="" /></li>
     </div>
    </div>
  
</template>

<script>
import $ from 'jquery'
import up from '../assets/up.png'
import down from '../assets/down.jpg';

export default {
  data() {
    return {
      
    };
  },
  methods:{
     tog: function() {
      $(".ul-five").slideToggle(200);
       if($('.tog').attr('src')==up){
        $('.tog').attr('src',down)
      }else{
        $('.tog').attr('src',up)
      }
    },
  }
};
</script>
<style  scoped>
.tog-six{
   position: absolute;
   top:70px;
   right: 382px;
   cursor: pointer;
}
.tog {
  width: 40px;
  height: 20px;
}
.tog > img {
  width: 40px;
  height: 20px;
}
.ul-five{
  display: none;
  margin-right: 6px;
  margin-top: 28px;
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
</style>