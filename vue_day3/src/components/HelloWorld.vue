<template>
  <div class="todo-app">
    <h1>{{ msg }}</h1>
    <div class="input-area">
      <input 
        ref="todoInput"
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="输入待办事项"
      >
      <button @click="addTodo">添加</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index">
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(index)">删除</button>
      </li>
    </ul>
    <div class="logs">
      <h3>生命周期日志</h3>
      <ul>
        <li v-for="(log, index) in logs" :key="'log'+index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList', //定义组件名称，用于调试和递归组件
  props: {
    msg: String     // 定义接收的父组件属性，这里接收一个 msg 字符串属性
  },
  data() {        //定义了组件的响应式数据
    return {
      newTodo: '', 
      todos: [],
      logs: []
    }
  },
  methods: {   //方法选项 (methods)
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo })
        this.newTodo = ''
        this.logs.push(`添加了新待办事项: ${this.todos[this.todos.length-1].text}`)
      }
    },
    removeTodo(index) {
      const removed = this.todos.splice(index, 1)
      this.logs.push(`删除了待办事项: ${removed[0].text}`)
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.logs.push('数据已保存到localStorage')
    }
  },
  created() {   //生命周期钩子created
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos)
      this.logs.push('从localStorage加载数据')
    }
    this.logs.push('组件创建完成')
  },
  mounted() {   //生命周期钩子mounted
    this.$refs.todoInput.focus()
    this.logs.push('输入框已聚焦')
  },
  watch: {  //侦听器 (watch)
    todos: {  //监听 todos 数组的变化
      handler() {
        this.logs.push('待办事项已更新')
        this.saveToLocalStorage()
      },
      deep: true
    }
  },
  unmounted() {  //生命周期钩子unmounted
    this.saveToLocalStorage()
    this.logs.push('组件卸载前保存数据')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.input-area {
  margin: 20px 0;
}
.input-area input {
  padding: 8px;
  width: 300px;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
  margin: 5px 0;
}
.todo-list button {
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.logs {
  margin-top: 30px;
  text-align: left;
  border-top: 1px solid #eee;
  padding-top: 20px;
}
.logs ul {
  max-height: 200px;
  overflow-y: auto;
}
.logs li {
  padding: 5px 0;
  border-bottom: 1px dashed #eee;
}
</style>
