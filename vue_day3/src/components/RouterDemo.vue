<template>
  <div class="router-demo">
    <h2>路由导航</h2>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <div class="router-view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouterDemo'
}
</script>

<style scoped>
.router-demo {
  padding: 20px;
  height: 100%;
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  padding: 5px 10px;
  text-decoration: none;
  color: #2c3e50;
  border: 1px solid #42b983;
  border-radius: 4px;
}
nav a.router-link-exact-active {
  color: white;
  background: #42b983;
}
.router-view-container {
  border: 1px solid #eee;
  padding: 20px;
  min-height: 200px;
}
</style>
