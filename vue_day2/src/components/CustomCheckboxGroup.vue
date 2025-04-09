<!-- 
 * CustomCheckboxGroup.vue - 自定义复选框组组件
 * 功能：实现多选框组，支持v-model绑定数组
 * 特性：
 *   - 支持选项动态渲染
 *   - 支持标签显示
 *   - 支持数组双向绑定
 -->
<template>
  <!-- 表单组容器 -->
  <div class="form-group">
    <!-- 组标签 -->
    <label v-if="label">{{ label }}</label>
    
    <!-- 复选框组容器 -->
    <div class="checkbox-group">
      <!-- 循环渲染每个选项 -->
      <div 
        v-for="option in options" 
        :key="option.value" 
        class="checkbox-item"
      >
        <!-- 
         * 复选框
         * :id - 绑定选项值作为id (v-bind缩写)
         * :value - 绑定选项值 (v-bind缩写)
         * v-model - 双向绑定选中值数组
         * v-bind示例:
         *   :disabled - 动态绑定禁用状态
         *   :data-custom - 绑定自定义数据属性，实际用途包括：
         *     - CSS选择器定位: [data-custom="option-value"]
         *     - 测试自动化定位元素
         *     - JavaScript/DOM操作时识别特定选项
         *     - 存储额外数据供后续处理使用
         -->
        <input 
          type="checkbox" 
          :id="option.value" 
          :value="option.value" 
          v-model="selectedValues"
          :disabled="option.disabled || false"
          :data-custom="'option-' + option.value"
        >
        <!-- 选项标签 -->
        <label :for="option.value">{{ option.text }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

/**
 * 组件props定义
 * 1. modelValue: 用于v-model绑定的选中值数组
 * 2. label: 复选框组标签文本
 * 3. options: 选项数组(必填)，格式: [{value, text}]
 */
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: String,
  options: {
    type: Array,
    required: true
  }
});

/**
 * 组件emits定义
 * update:modelValue - 实现v-model双向绑定的关键事件
 */
const emit = defineEmits(['update:modelValue']);

/**
 * 计算属性 - 实现v-model的双向绑定
 * get: 返回当前选中的值数组
 * set: 触发update:modelValue事件更新父组件数据
 */
const selectedValues = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<style scoped>
/* 复选框组容器样式 */
.checkbox-group {
  display: flex;       /* 弹性布局 */
  flex-wrap: wrap;     /* 允许换行 */
  gap: 10px;          /* 项间距 */
}

/* 单个复选框项样式 */
.checkbox-item {
  display: flex;        /* 弹性布局 */
  align-items: center;  /* 垂直居中 */
  margin-right: 15px;   /* 右边距 */
}

/* 复选框输入框样式 */
.checkbox-item input {
  margin-right: 5px;    /* 与标签间距 */
}
</style>
