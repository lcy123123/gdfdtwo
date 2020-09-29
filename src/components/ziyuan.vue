<template>
  <div>
    <button class="slsj" @click="fn">矢量数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      //点击方法
    fn: function() {
    
    }
  }
};
</script>
<style>
.zy-b {
  width: 190px;
  height: 100px;
  position: absolute;
  bottom: 50px;
  left: 30px;
  /* background-color: #010C4C; */
  background: rgba(1,12,76,.5);
  color: blanchedalmond;
  border: 1px solid #01caeb;
  padding: 10px;
  /* padding-top: 10px; */
}
.i1 {
  vertical-align: middle;
  margin-right: 20px;
  width: 35px;
  height: 20px;
}
.s1 {
  vertical-align: middle;
}
.tu {
  margin: 10px 0;
}
.tc {
  width: 100px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.slsj {
  position: absolute;
  top: 100px;
}
</style>