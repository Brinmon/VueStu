<template>
  <div class="directives-demo">
    <h3>Vue指令示例</h3>
    
    <!-- v-if/v-show 条件渲染 -->
    <div class="demo-section">
      <h4>1. v-if 和 v-show</h4>
      <button @click="toggleVisibility">切换显示</button>
      <p v-if="isVisible" class="v-if-demo">v-if: 我被条件渲染 (DOM会被移除)</p>
      <p v-show="isVisible" class="v-show-demo">v-show: 我被条件显示 (只是CSS display切换)</p>
    </div>
    
    <!-- v-for 列表渲染 -->
    <div class="demo-section">
      <h4>2. v-for 列表渲染</h4>
      <ul>
        <li v-for="(item, index) in demoItems" :key="index">
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </div>
    
    <!-- v-on 事件处理 -->
    <div class="demo-section">
      <h4>3. v-on 事件处理</h4>
      <button @click="handleClick">点击我</button>
      <p>点击次数: {{ clickCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 指令演示相关数据
const isVisible = ref(true);
const demoItems = ref(['苹果', '香蕉', '橙子', '葡萄']);
const clickCount = ref(0);

// 切换显示状态
function toggleVisibility() {
  isVisible.value = !isVisible.value;
}

// 处理点击事件
function handleClick() {
  clickCount.value++;
  demoItems.value.push(`新项目 ${clickCount.value}`);
}
</script>

<style scoped>
/* 指令演示区域样式 */
.directives-demo {
  padding: 20px;
  flex: 1;
}

.demo-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.demo-section h4 {
  margin-top: 0;
  color: #42b983;
}

.v-if-demo {
  color: #e74c3c;
}

.v-show-demo {
  color: #3498db;
}
</style>
