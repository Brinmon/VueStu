<template>
  <div class="home">
    <CardManager />
  </div>
</template>

<script>
import CardManager from '@/components/CardManager.vue'

export default {
  name: 'HomePage',
  components: {
    CardManager
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
</style>