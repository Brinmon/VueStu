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
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'TodoListComposition',
  props: {
    msg: String
  },
  setup() {
    const newTodo = ref('')
    const todos = ref([])
    const logs = ref([])
    const todoInput = ref(null)

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ text: newTodo.value })
        logs.value.push(`添加了新待办事项: ${newTodo.value}`)
        newTodo.value = ''
      }
    }

    const removeTodo = (index) => {
      const removed = todos.value.splice(index, 1)
      logs.value.push(`删除了待办事项: ${removed[0].text}`)
    }

    const saveToLocalStorage = () => {
      localStorage.setItem('todos', JSON.stringify(todos.value))
      logs.value.push('数据已保存到localStorage')
    }

    // 加载初始数据
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
      logs.value.push('从localStorage加载数据')
    }
    logs.value.push('组件创建完成')

    // 监听todos变化
    watch(todos, () => {
      logs.value.push('待办事项已更新')
      saveToLocalStorage()
    }, { deep: true })

    // 生命周期钩子
    onMounted(() => {
      todoInput.value.focus()
      logs.value.push('输入框已聚焦')
    })

    onUnmounted(() => {
      saveToLocalStorage()
      logs.value.push('组件卸载前保存数据')
    })

    return {
      newTodo,
      todos,
      logs,
      todoInput,
      addTodo,
      removeTodo
    }
  }
}
</script>

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
