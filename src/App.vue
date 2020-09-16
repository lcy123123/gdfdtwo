<template>
  <div id="app">
    <shouye></shouye>
    <router-link to='/zi'></router-link>
       <router-view></router-view>
  </div>
</template>

<script>
import shouye from './shouye/index.vue'

export default {
  name: 'App',
  components: {
    shouye
  }
}
</script>

<style>

</style>
