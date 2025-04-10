## 初级：基础表单绑定
### 1. 基础文本绑定
```vue
<template>
  <div class="basic-form">
    <h2>初级：基础表单绑定</h2>
    <div>
      <label>用户名：</label>
      <input type="text" v-model="username" placeholder="请输入用户名">
    </div>
    <div>
      <label>密码：</label>
      <input type="password" v-model="password" placeholder="请输入密码">
    </div>
    <button @click="submit">提交</button>
    <div class="output">
      <p>用户名：{{ username }}</p>
      <p>密码：{{ password }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

function submit() {
  alert(`提交数据：用户名=${username.value}\n密码=${password.value}`);
}
</script>

<style scoped>
.basic-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.basic-form div {
  margin-bottom: 15px;
}
.basic-form label {
  display: inline-block;
  width: 80px;
}
.basic-form input {
  padding: 8px;
  width: 200px;
}
.output {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

### 2. 复选框和单选按钮
```vue
<template>
  <div class="basic-form">
    <h2>初级：复选框和单选按钮</h2>
    <div>
      <label>选择你喜欢的编程语言：</label>
      <div>
        <input type="checkbox" id="javascript" value="JavaScript" v-model="languages">
        <label for="javascript">JavaScript</label>
      </div>
      <div>
        <input type="checkbox" id="python" value="Python" v-model="languages">
        <label for="python">Python</label>
      </div>
      <div>
        <input type="checkbox" id="java" value="Java" v-model="languages">
        <label for="java">Java</label> //这个 label 是绑定给 id 为 "java" 的元素用的
      </div>
    </div>
    
    <div>
      <label>选择你的经验水平：</label>
      <div>
        <input type="radio" id="beginner" value="beginner" v-model="experience">
        <label for="beginner">初级</label>
      </div>
      <div>
        <input type="radio" id="intermediate" value="intermediate" v-model="experience">
        <label for="intermediate">中级</label>
      </div>
      <div>
        <input type="radio" id="advanced" value="advanced" v-model="experience">
        <label for="advanced">高级</label>
      </div>
    </div>
    
    <div class="output">
      <p>选择的语言：{{ languages }}</p>
      <p>经验水平：{{ experience }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const languages = ref([]);
const experience = ref('');
</script>

<style scoped>
.basic-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.basic-form div {
  margin-bottom: 15px;
}
.basic-form label {
  display: inline-block;
  width: 80px;
}
.basic-form input {
  padding: 8px;
  width: 200px;
}
.output {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

## 中级：表单验证和修饰符
### 1. 表单验证案例
```vue
<template>
  <div class="intermediate-form">
    <h2>中级：表单验证</h2>
    <form @submit.prevent="submitForm">
      <div :class="{ 'form-group': true, 'error': errors.name }">
        <label>姓名：</label>
        <input 
          type="text" 
          v-model.trim="formData.name" 
          @blur="validateName"
          placeholder="请输入2-10个字符">
        <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
      </div>
      
      <div :class="{ 'form-group': true, 'error': errors.email }">
        <label>邮箱：</label>
        <input 
          type="email" 
          v-model.lazy="formData.email" 
          @blur="validateEmail"
          placeholder="请输入有效邮箱">
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>
      
      <div :class="{ 'form-group': true, 'error': errors.password }">
        <label>密码：</label>
        <input 
          type="password" 
          v-model="formData.password" 
          @input="validatePassword"
          placeholder="至少6位字符">
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <button type="submit" :disabled="!isFormValid">提交</button>
    </form>
    
    <div class="output">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const formData = ref({
  name: '',
  email: '',
  password: ''
});

const errors = ref({
  name: '',
  email: '',
  password: ''
});

const isFormValid = computed(() => {
  return Object.values(errors.value).every(error => !error) && 
         Object.values(formData.value).every(field => field);
});

function validateName() {
  const name = formData.value.name;
  if (!name) {
    errors.value.name = '姓名不能为空';
  } else if (name.length < 2 || name.length > 10) {
    errors.value.name = '姓名长度必须在2-10个字符之间';
  } else {
    errors.value.name = '';
  }
}

function validateEmail() {
  const email = formData.value.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    errors.value.email = '邮箱不能为空';
  } else if (!emailRegex.test(email)) {
    errors.value.email = '请输入有效的邮箱地址';
  } else {
    errors.value.email = '';
  }
}

function validatePassword() {
  const password = formData.value.password;
  if (!password) {
    errors.value.password = '密码不能为空';
  } else if (password.length < 6) {
    errors.value.password = '密码长度不能少于6个字符';
  } else {
    errors.value.password = '';
  }
}

function submitForm() {
  validateName();
  validateEmail();
  validatePassword();
  
  if (isFormValid.value) {
    alert('表单提交成功！');
    console.log('提交的数据：', formData.value);
  }
}
</script>

<style scoped>
.intermediate-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error input {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.output {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

#### 基础语法回顾：`:class`
对象形式：
```
:class="{ 
    className1: true, // 始终应用 class "form-group"
    className2: someCondition  // 当 errors.password 有值（即报错时）才添加 class "error"
}"
```
这表示：
- **`className1` 会永远加上**
- **`className2` 只有在 `someCondition` 为真时才会加上**

什么是 `v-if`？
```
<p v-if="isLoggedIn">欢迎回来！</p>
```
如果 `isLoggedIn === true`，这个 `<p>` 就会出现在页面上； 否则，它**根本不会存在于 DOM 中**。



#### 基础先回顾：v-model 是啥？
`v-model` 是 Vue 提供的一个指令，用来实现**双向绑定**

| 输入框类型 | 写法             | 使用的修饰符  | 行为说明         | 作用       | 场景            |
| ----- | -------------- | ------- | ------------ | -------- | ------------- |
| 姓名    | `v-model.trim` | `.trim` | 自动去掉前后空格     | 自动去除首尾空格 | 适用于姓名、用户名、邮箱等 |
| 邮箱    | `v-model.lazy` | `.lazy` | 只有在“失焦”时才同步值 | 等失焦再更新数据 | 适合不需要实时处理的输入  |
| 密码    | `v-model`      | （无）     | 每次输入就同步值     | 每次输入就更新  | 用于实时反馈、验证等    |

#### `@blur` 是什么？
`blur` 是 HTML 元素的原生事件，意思是：当一个输入框 **失去焦点（focus）时**，就会触发 `blur` 事件。

用户点到输入框 ➜ 输入完 ➜ 点到别的地方，就叫“失焦”，这时候就触发了 `blur` 事件。

