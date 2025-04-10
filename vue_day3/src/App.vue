<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="container">
      <div class="left-panel">
        <TodoListComposition msg="生命周期观察器 - 待办事项列表"/>
      </div>
      <div class="middle-panel">
        <VuexDemo />
      </div>
      <div class="right-panel">
        <RouterDemo />
      </div>
    </div>
  </div>
</template>

<script>
import TodoListComposition from './components/TodoListComposition.vue'
import VuexDemo from './components/VuexDemo.vue'
import RouterDemo from './components/RouterDemo.vue'

export default {
  name: 'App',
  components: {
    TodoListComposition,
    VuexDemo,
    RouterDemo
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
  max-width: 1400px;
  margin: 0 auto;
}
.left-panel,
.middle-panel,
.right-panel {
  flex: 1;
  padding: 20px;
}
.left-panel {
  border-right: 1px solid #eee;
}
.middle-panel {
  border-right: 1px solid #eee;
}
</style>
