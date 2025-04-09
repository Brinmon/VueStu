<!-- 
 * CustomInput.vue - 自定义输入框组件
 * 功能：实现带验证功能的可复用输入框
 * 特性：
 *   - 支持v-model双向绑定
 *   - 支持多种验证规则
 *   - 实时错误提示
 *   - 可配置标签和占位符
 -->
<template>
  <!-- 表单组容器 - 根据错误状态添加error类 -->
  <div :class="['form-group', { 'error': errorMessage }]">
    <!-- 标签 - 根据label属性动态显示 -->
    <label v-if="label">{{ label }}</label>
    
    <!-- 
     * 输入框
     * :type - 输入框类型(text/email/password等)
     * :value - 绑定当前值
     * @input - 处理输入事件
     * @blur - 失去焦点时触发验证
     * :placeholder - 占位文本
     -->
    <input 
      :type="type" 
      :value="modelValue" 
      @input="handleInput"
      @blur="validate"
      :placeholder="placeholder"
    >
    
    <!-- 错误提示信息 - 有错误时显示 -->
    <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 组件props定义
 * 1. modelValue: 用于v-model绑定的值(支持String/Number)
 * 2. label: 输入框标签文本
 * 3. type: 输入框类型，默认为'text'
 * 4. placeholder: 占位文本
 * 5. rules: 验证规则数组
 */
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  rules: Array
});

/**
 * 组件emits定义
 * update:modelValue - 实现v-model双向绑定的关键事件
 */
const emit = defineEmits(['update:modelValue']);

// 错误消息响应式变量
const errorMessage = ref('');

/**
 * 输入处理函数
 * 1. 触发update:modelValue事件更新父组件数据
 * 2. 如果有错误信息则重新验证
 */
function handleInput(e) {
  emit('update:modelValue', e.target.value);
  // 输入时清除错误信息
  if (errorMessage.value) {
    validate();
  }
}

/**
 * 验证函数
 * 1. 如果没有验证规则直接返回true
 * 2. 依次检查所有验证规则：
 *    - required: 必填验证
 *    - min: 最小长度验证
 *    - max: 最大长度验证
 *    - pattern: 正则表达式验证
 * 3. 返回验证结果并设置错误信息
 */
function validate() {
  if (!props.rules || props.rules.length === 0) {
    errorMessage.value = '';
    return true;
  }

  for (const rule of props.rules) {
    if (rule.required && !props.modelValue) {
      errorMessage.value = rule.message;
      return false;
    }

    if (rule.min && props.modelValue.length < rule.min) {
      errorMessage.value = rule.message;
      return false;
    }

    if (rule.max && props.modelValue.length > rule.max) {
      errorMessage.value = rule.message;
      return false;
    }

    if (rule.pattern && !rule.pattern.test(props.modelValue)) {
      errorMessage.value = rule.message;
      return false;
    }
  }

  errorMessage.value = '';
  return true;
}

/**
 * 暴露给父组件的方法
 * validate - 允许父组件手动触发验证
 */
defineExpose({
  validate
});
</script>

<style scoped>
/* 表单组容器基础样式 */
.form-group {
  margin-bottom: 20px;  /* 底部外边距 */
}

/* 标签样式 */
.form-group label {
  display: block;        /* 块级显示 */
  margin-bottom: 5px;    /* 底部外边距 */
  font-weight: bold;     /* 加粗字体 */
}

/* 输入框基础样式 */
.form-group input {
  width: 100%;          /* 宽度100% */
  padding: 8px;         /* 内边距 */
  border: 1px solid #ddd; /* 边框样式 */
  border-radius: 4px;   /* 圆角边框 */
}

/* 错误状态下的输入框样式 */
.error input {
  border-color: #ff4444; /* 红色边框表示错误 */
}

/* 错误提示信息样式 */
.error-message {
  color: #ff4444;       /* 红色文字 */
  font-size: 12px;      /* 较小字号 */
  display: block;       /* 块级显示 */
  margin-top: 5px;      /* 顶部外边距 */
}
</style>
