<template>
  <div class="product-card">
    <h3>{{ product.title }}</h3>
    <p>价格：{{ product.price }}元</p>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>