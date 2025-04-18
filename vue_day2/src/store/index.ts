import { createStore } from 'vuex'

// 定义state类型
interface State {
  count: number;
  message: string;
  todos: Array<{
    id: number;
    text: string;
    done: boolean;
  }>;
}

// 创建Vuex store实例
export default createStore<State>({
  state() {
    return {
      count: 0,
      message: 'Hello from Vuex!',
      todos: [
        { id: 1, text: '学习Vuex', done: true },
        { id: 2, text: '完成项目', done: false }
      ]
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateMessage(state, newMessage) {
      state.message = newMessage
    },
    addTodo(state, todo) {
      state.todos.push(todo)
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
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    }
  }
})
