<!-- 
 * CustomSelect.vue - 自定义下拉选择组件
 * 功能：实现一个带标签的可复用下拉选择器
 * 特性：
 *   - 支持v-model双向绑定
 *   - 可配置选项列表
 *   - 可选的标签显示
 -->
<template>
  <!-- 表单组容器 -->
  <div class="form-group">
    <!-- 标签 - 根据label属性动态显示 -->
    <label v-if="label">{{ label }}</label>
    
    <!-- 
     * 下拉选择框
     * :value - 绑定当前选中值
     * @input - 触发update:modelValue事件实现v-model
     -->
    <select 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control"
    >
      <!-- 默认空选项 -->
      <option value="">请选择</option>
      
      <!-- 动态生成选项 -->
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
/**
 * 组件props定义
 * 1. modelValue: 用于v-model绑定的值
 * 2. label: 选择框标签文本
 * 3. options: 下拉选项数组，格式: [{value, text}]
 */
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  }
});

/**
 * 组件emits定义
 * update:modelValue - 实现v-model双向绑定的关键事件
 */
defineEmits(['update:modelValue']);
</script>

<style scoped>
/* 表单组容器样式 */
.form-group {
  margin-bottom: 1rem;  /* 底部外边距 */
}

/* 标签样式 */
label {
  display: block;        /* 块级显示 */
  margin-bottom: 0.5rem; /* 底部外边距 */
  font-weight: bold;     /* 加粗字体 */
}

/* 下拉框样式 */
.form-control {
  width: 100%;          /* 宽度100% */
  padding: 8px;         /* 内边距 */
  border: 1px solid #ddd; /* 边框样式 */
  border-radius: 4px;   /* 圆角边框 */
  font-size: 1rem;      /* 字体大小 */
}
</style>
