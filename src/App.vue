<template>
  <div id="app">
    <cesium></cesium>
    <shouye></shouye>
    
    <router-link to='/zi'></router-link>
       <router-view></router-view>
             

  </div>
</template>

<script>
import shouye from './shouye/index.vue'
import cesium from './components/cesium'

export default {
  name: 'App',
 
  components: {
    cesium,
    shouye
    
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  color: #000;
  overflow: hidden;
}
</style>
