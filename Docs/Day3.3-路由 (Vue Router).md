## Vue Router 路由管理详解
Vue Router 是 Vue.js 官方的路由管理器，用于构建单页面应用(SPA)。下面我将结合你提供的代码，详细讲解 Vue Router 的核心概念和使用方法。

首先需要安装 Vue Router：
```
npm install vue-router@4 --save
```

### 路由配置文件 (`router/index.js`)
```js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

### 在 main.js 中引入路由
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 导入路由配置

createApp(App)
  .use(router) // 使用路由
  .mount('#app')
```

### 路由核心概念解析
#### 1. 路由视图 `<router-view>`
`<router-view>` 是路由的出口，匹配到的组件将渲染在这里。在你的 `App.vue` 中，可以这样使用：
```vue
<template>
  <div id="app">
    <!-- 导航链接 -->
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </nav>
    
    <!-- 路由视图出口 -->
    <router-view/>
  </div>
</template>
```

#### 2. 导航链接 `<router-link>`
`<router-link>` 是 Vue Router 提供的导航组件，用于取代传统的 `<a>` 标签：
```
<router-link to="/about" class="nav-link">前往关于页面</router-link>
```

#### 3. 动态路由匹配
可以在路由路径中使用动态参数：
```
const routes = [
  {
    path: '/user/:id',
    component: UserPage
  }
]
```

在组件中通过 $route.params.id 或组合式API的 useRoute() 访问参数：
```
// 选项式API
this.$route.params.id

// 组合式API
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id)
```

#### 4. 编程式导航
除了使用 `<router-link>`，还可以通过代码进行导航：
```
// 选项式API
this.$router.push('/about')

// 组合式API
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/about')
```


## Vue Router 的核心要点
Vue Router 的核心要点：
1. **安装与配置**：通过 `createRouter` 创建路由实例，配置路由表
2. **路由视图**：使用 `<router-view>` 作为组件渲染出口
3. **导航方式**：`<router-link>` 或编程式导航 (`router.push`)
4. **动态路由**：使用参数匹配动态路径 (`/user/:id`)
5. **嵌套路由**：通过 `children` 配置实现嵌套视图
6. **导航守卫**：控制路由跳转的权限和逻辑
7. **懒加载**：提升应用性能的重要技术

通过合理使用 Vue Router，可以构建出结构清晰、导航流畅的单页面应用程序。

