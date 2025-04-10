import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    message: 'Vuex状态管理示例'
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateMessage(state, newMessage) {
      state.message = newMessage
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    formattedCount: state => `当前计数: ${state.count}`
  }
})
