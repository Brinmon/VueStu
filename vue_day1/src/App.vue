<template>
  <div id="app">
    <h1>商品列表</h1>
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from './components/ProductCard.vue'
import products from './data/products.json'

export default {
  name: 'App',
  components: { ProductCard },
  data() {
    return {
      products: products
    }
  }
}
</script>