/**
 * Vue应用主入口文件
 * 负责初始化Vue应用并挂载到DOM
 */

// 从vue包导入createApp方法 - Vue 3的创建应用方式
import { createApp } from 'vue'
// 导入根组件App
import App from './App.vue'
// 导入Vuex store
import store from './store'

/**
 * 创建Vue应用实例并挂载
 * 1. 使用createApp方法创建应用实例，传入根组件App
 * 2. 使用Vuex store
 * 3. 调用mount方法将应用挂载到id为'app'的DOM元素上
 */
createApp(App)
  .use(store)
  .mount('#app')
