<template>
  <div class="vuex-demo">
    <h3>Vuex状态管理</h3>
    
    <div class="demo-section">
      <h4>State & Mutations</h4>
      <p>计数器: {{ $store.state.count }}</p>
      <button @click="$store.commit('increment')">增加计数</button>
    </div>

    <div class="demo-section">
      <h4>Actions</h4>
      <button @click="$store.dispatch('asyncIncrement')">异步增加计数</button>
    </div>

    <div class="demo-section">
      <h4>Getters</h4>
      <p>已完成任务: {{ $store.getters.doneTodos.length }}</p>
      <p>未完成任务: {{ $store.getters.activeTodosCount }}</p>
    </div>

    <div class="demo-section">
      <h4>修改消息</h4>
      <input v-model="newMessage" placeholder="输入新消息">
      <button @click="updateStoreMessage">更新消息</button>
      <p>当前消息: {{ $store.state.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const newMessage = ref('')

function updateStoreMessage() {
  store.commit('updateMessage', newMessage.value)
  newMessage.value = ''
}
</script>

<style scoped>
.vuex-demo {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

.demo-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.demo-section:last-child {
  border-bottom: none;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
