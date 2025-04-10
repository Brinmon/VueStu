<template>
  <div class="home">
    <h2>首页</h2>
    <p>这是路由示例的首页</p>
    <router-link to="/about" class="nav-link">前往关于页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
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
