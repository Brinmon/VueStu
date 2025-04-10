<template>
  <div id="app">
    <CardManager />
  </div>
</template>

<script>
import CardManager from './components/CardManager.vue'

export default {
  name: 'App',
  components: {
    CardManager
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
