<template>
  <div class="about">
    <h2>关于</h2>
    <p>这是路由示例的关于页面</p>
    <router-link to="/" class="nav-link">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about {
  padding: 20px;
}
.nav-link {
  display: inline-block;
  margin-top: 20px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
