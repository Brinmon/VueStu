<template>
  <div class="vuex-demo">
    <h2>{{ state.message }}</h2>
    
    <div class="counter">
      <p>{{ getters.formattedCount }}</p>
      <button @click="increment">增加</button>
      <button @click="asyncIncrement">异步增加</button>
    </div>

    <div class="message-control">
      <input v-model="newMessage" placeholder="输入新消息">
      <button @click="updateMessage">更新消息</button>
    </div>

    <div class="state-view">
      <h3>当前状态：</h3>
      <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VuexDemo',
  setup() {
    const store = useStore()
    const newMessage = ref('')

    return {
      state: computed(() => store.state),
      getters: computed(() => store.getters),
      increment: () => store.commit('increment'),
      asyncIncrement: () => store.dispatch('asyncIncrement'),
      newMessage,
      updateMessage: () => {
        store.commit('updateMessage', newMessage.value)
        newMessage.value = ''
      }
    }
  }
}
</script>

<style scoped>
.vuex-demo {
  padding: 20px;
  border-left: 1px solid #eee;
  height: 100%;
}
.counter {
  margin: 20px 0;
}
.counter p {
  font-size: 24px;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  padding: 5px 15px;
}
.message-control {
  margin: 20px 0;
}
.message-control input {
  padding: 5px;
  width: 200px;
  margin-right: 10px;
}
.state-view {
  margin-top: 30px;
  text-align: left;
}
pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
</style>
