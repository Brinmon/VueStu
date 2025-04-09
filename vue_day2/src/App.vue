<!-- 
 * App.vue - 应用根组件
 * 功能：包含一个高级表单，集成了多个自定义表单组件
 * 包含组件：
 *   - CustomInput: 自定义输入框
 *   - CustomSelect: 自定义下拉选择器
 *   - CustomCheckboxGroup: 自定义复选框组
 * 数据流：使用v-model实现父子组件双向数据绑定
 -->
<template>
  <!-- 主容器 - 使用flex布局实现三栏布局 -->
  <div class="main-container">
    <!-- 左栏 - 原表单容器 -->
    <div class="advanced-form">
    <!-- 表单标题 -->
    <h2>高级：自定义表单组件</h2>
    
    <!-- 
     * 表单主体
     * @submit.prevent - 阻止默认提交行为并调用handleSubmit方法
     -->
    <form @submit.prevent="handleSubmit">
      <CustomInput 
        v-model="userInfo.name" 
        label="用户名" 
        type="text" 
        :rules="nameRules"
      />
      
      <CustomInput 
        v-model="userInfo.email" 
        label="邮箱" 
        type="email" 
        :rules="emailRules"
      />
      
      <CustomSelect 
        v-model="userInfo.country" 
        label="国家" 
        :options="countries"
      />
      
      <CustomCheckboxGroup 
        v-model="userInfo.interests" 
        label="兴趣爱好" 
        :options="interestOptions"
      />
      
      <button type="submit">提交</button>
    </form>
    
    <div class="output">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(userInfo, null, 2) }}</pre>
    </div>

    </div>
    
    <!-- 中栏 - Vuex状态管理演示 -->
    <VuexDemo />
    
    <!-- 右栏 - 指令演示组件 -->
    <DirectivesDemo />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CustomInput from './components/CustomInput.vue';
import CustomSelect from './components/CustomSelect.vue';
import CustomCheckboxGroup from './components/CustomCheckboxGroup.vue';
import DirectivesDemo from './components/DirectivesDemo.vue';
import VuexDemo from './components/VuexDemo.vue';

/**
 * 表单数据 - 使用ref创建响应式对象
 * 包含字段：
 *   - name: 用户名
 *   - email: 邮箱
 *   - country: 国家
 *   - interests: 兴趣爱好数组
 */
const userInfo = ref({
  name: '',
  email: '',
  country: '',
  interests: []
});

/**
 * 国家选项数据
 * 格式: {value: 值, text: 显示文本}
 */
const countries = [
  { value: 'cn', text: '中国' },
  { value: 'us', text: '美国' },
  { value: 'jp', text: '日本' },
  { value: 'uk', text: '英国' }
];

/**
 * 兴趣爱好选项数据
 * 格式: {value: 值, text: 显示文本}
 */
const interestOptions = [
  { value: 'reading', text: '阅读' },
  { value: 'sports', text: '运动', disabled: true },
  { value: 'music', text: '音乐' },
  { value: 'travel', text: '旅行' }
];

/**
 * 用户名验证规则
 * 1. required: 必填
 * 2. min/max: 长度限制(2-10个字符)
 */
const nameRules = [
  { required: true, message: '用户名不能为空' },
  { min: 2, max: 10, message: '用户名长度在2到10个字符之间' }
];

/**
 * 邮箱验证规则
 * 1. required: 必填
 * 2. pattern: 邮箱格式正则验证
 */
const emailRules = [
  { required: true, message: '邮箱不能为空' },
  { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入有效的邮箱地址' }
];

/**
 * 表单提交处理函数
 * 功能：
 * 1. 显示提交成功提示
 * 2. 在控制台打印提交的数据
 */
function handleSubmit() {
  alert('表单提交成功！');
  console.log('提交的数据：', userInfo.value);
}
</script>

<style scoped>
/* 主容器样式 - 三栏布局 */
.main-container {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 20px auto;
}

/* 各栏基础样式 */
.advanced-form,
.vuex-demo,
.directives-demo {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 主表单容器样式 */
.advanced-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* 提交按钮样式 */
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

/* 表单数据输出区域样式 */
.output {
  margin-top: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
