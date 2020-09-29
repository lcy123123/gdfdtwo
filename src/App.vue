<template>
  <div id="app">
    <cesium></cesium>
    <headerimg></headerimg>
    <shouye></shouye>
       <router-view></router-view>
             

  </div>
</template>

<script>
import shouye from './shouye/index.vue'
import cesium from './components/cesium'
import headerimg from './components/headerimg'


export default {
  name: 'App',
 
  components: {
    cesium,
    shouye,
    headerimg,

  }
}
</script>

<style>
html,body{width:100%;overflow:hidden;margin: 0;padding: 0;}
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  color: #000;
  overflow: hidden;
}
</style>
