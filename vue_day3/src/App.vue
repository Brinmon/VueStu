<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="container">
      <div class="left-panel">
        <TodoListComposition msg="生命周期观察器 - 待办事项列表"/>
      </div>
      <div class="right-panel">
        <VuexDemo />
      </div>
    </div>
  </div>
</template>

<script>
import TodoListComposition from './components/TodoListComposition.vue'
import VuexDemo from './components/VuexDemo.vue'

export default {
  name: 'App',
  components: {
    TodoListComposition,
    VuexDemo
  },
  created() {
    console.log('App组件被创建');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
.left-panel {
  flex: 1;
  padding: 20px;
  border-right: 1px solid #eee;
}
.right-panel {
  flex: 1;
  padding: 20px;
}
</style>
