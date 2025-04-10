## Vue.js的核心概念
## 5. 生命周期钩子 (Lifecycle Hooks)
- created - 实例创建后
- mounted - DOM挂载后
- updated - 数据更新后
- destroyed - 实例销毁后

### 1. 组件生命周期概览
在这个 Composition API 示例中，主要使用了以下生命周期钩子：
```js
// 生命周期钩子
onMounted(() => {
  todoInput.value.focus()
  logs.value.push('输入框已聚焦')
})

onUnmounted(() => {
  saveToLocalStorage()
  logs.value.push('组件卸载前保存数据')
})
```
### 2. 各生命周期阶段详解
#### (1) 创建阶段 (Creation)
```js
// setup函数内部开始执行
const savedTodos = localStorage.getItem('todos')
if (savedTodos) {
  todos.value = JSON.parse(savedTodos)
  logs.value.push('从localStorage加载数据')
}
logs.value.push('组件创建完成')
```
**特点**：
- 在 `setup()` 函数执行时开始
- 此时组件实例已创建，但DOM还未生成
- 适合进行数据初始化（如从localStorage加载数据）

#### (2) 挂载阶段 (Mounting)
```js
onMounted(() => {
  todoInput.value.focus()  // DOM操作
  logs.value.push('输入框已聚焦')
})
```
**特点**：
- 组件DOM已挂载到页面
- 可以安全地访问DOM元素（通过ref）
- 示例中用于自动聚焦输入框
- 适合：
    - 操作DOM
    - 添加事件监听器
    - 发起API请求获取数据

#### (3) 更新阶段 (Updating)
```js
// 通过watch监听todos变化
watch(todos, () => {
  logs.value.push('待办事项已更新')
  saveToLocalStorage()
}, { deep: true })
```
**特点**：
- 虽然没有直接使用 `onUpdated`，但通过 `watch` 实现了类似功能
- 当响应式数据变化时触发
- 示例中用于自动保存到localStorage
- 适合：
    - 数据变化后执行操作
    - 根据新状态更新DOM（注意避免无限循环）

#### (4) 卸载阶段 (Unmounting)
```js
onUnmounted(() => {
  saveToLocalStorage()
  logs.value.push('组件卸载前保存数据')
})
```
**特点**：
- 组件即将被销毁时调用
- 适合：
    - 清理定时器
    - 取消事件监听
    - 保存最终状态（如示例中的localStorage保存）
    - 释放资源

### 完整生命周期流程图
```
开始
  │
  ↓
setup()执行
  ├─ 创建响应式数据
  ├─ 从localStorage加载数据
  └─ 设置watch监听
  │
  ↓
onMounted()
  ├─ DOM操作（聚焦输入框）
  └─ 记录日志
  │
  ↓
用户交互（添加/删除）
  ├─ 触发数据更新
  └─ watch回调执行
     ├─ 保存到localStorage
     └─ 记录日志
  │
  ↓
组件即将卸载
  ├─ onUnmounted()
  │   ├─ 最终保存数据
  │   └─ 记录日志
  └─ 清理（本例无）
```
这个待办事项应用很好地展示了生命周期钩子的实际应用场景，特别是在数据持久化和DOM操作方面的典型用法。理解这些生命周期阶段对于构建健壮的Vue应用至关重要。

