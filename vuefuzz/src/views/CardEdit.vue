<template>
  <div class="card-edit">
    <h1>创建模糊测试卡片</h1>
    
    <div class="editor-layout">
      <div class="form-section">
        <div class="form-group">
          <label>项目ID (确保唯一)</label>
          <input v-model="projectId" placeholder="例如: 8">
        </div>
        
        <div class="form-group">
          <label>任务名称</label>
          <input v-model="programName" placeholder="例如: LibTIFF">
        </div>
        
        <div class="form-group">
          <label>上传文件路径</label>
          <input v-model="uploadFile" placeholder="例如: /home/ub22/Work/open_fuzz/ExampleFile/LibTIFF_task.zip">
        </div>
        
        <div class="form-group">
          <label>下载URL (可选)</label>
          <input v-model="urls" placeholder="例如: https://download.osgeo.org/libtiff/tiff-4.0.4.tar.gz">
        </div>
        
        <div class="form-group">
          <label>模糊测试时间(秒)</label>
          <input v-model="fuzzTime" placeholder="例如: 40">
        </div>
        
        <div class="form-group">
          <label>二进制命令</label>
          <input v-model="binCmd" placeholder="例如: tiffinfo -D -j -c -r -s -w @@">
        </div>
        
        <div class="form-group">
          <label>文件夹名称</label>
          <input v-model="folderName" placeholder="输入工作目录名称">
        </div>
        
        <button @click="createCardFolder" class="save-btn">
          创建卡片
        </button>
      </div>
      
      <div class="editor-section">
        <div class="file-editor">
          <div class="file-selector">
            <button
              @click="currentFile = 'fuzzconfig'"
              :class="{ active: currentFile === 'fuzzconfig' }"
            >
              编辑fuzzconfig.json
            </button>
            <button
              @click="currentFile = 'build'"
              :class="{ active: currentFile === 'build' }"
            >
              编辑build.sh
            </button>
          </div>
          
          <div class="file-content">
            <textarea
              v-if="currentFile === 'fuzzconfig'"
              v-model="fuzzConfigContent"
              class="file-textarea"
            ></textarea>
            <textarea
              v-else
              v-model="buildScriptContent"
              class="file-textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CardEdit',
  setup() {
    const projectId = ref('')
    const programName = ref('')
    const uploadFile = ref('')
    const urls = ref('')
    const fuzzTime = ref('')
    const binCmd = ref('')
    const folderName = ref('')
    const currentFile = ref('fuzzconfig')
    const buildScriptContent = ref('#!/bin/bash\n\n# 模糊测试构建脚本')
    const router = useRouter()

    const fuzzConfigContent = computed(() => {
      return JSON.stringify({
        project_id: projectId.value,
        program_name: programName.value,
        UpladFile: uploadFile.value,
        Urls: urls.value,
        fuzz_time: fuzzTime.value,
        bin_cmd: binCmd.value
      }, null, 2)
    })

    const createCardFolder = async () => {
      try {
        if (!folderName.value || !projectId.value || !programName.value ||
            !uploadFile.value || !fuzzTime.value || !binCmd.value) {
          alert('请填写所有必填字段')
          return
        }

        // 创建卡片文件夹
        const folderPath = `/home/ub20/VueStu/vuefuzz/cards/${folderName.value}`
        
        // 创建文件夹
        await window.electronAPI.createFolder(folderPath)
        
        // 创建fuzzconfig.json
        await window.electronAPI.writeFile(
          `${folderPath}/fuzzconfig.json`,
          fuzzConfigContent.value
        )
        
        // 创建build.sh
        await window.electronAPI.writeFile(
          `${folderPath}/build.sh`,
          buildScriptContent.value
        )
        
        alert('创建成功！')
        router.push('/')
      } catch (error) {
        console.error('创建失败:', error)
        alert('创建失败: ' + error.message)
      }
    }

    return {
      projectId,
      programName,
      uploadFile,
      urls,
      fuzzTime,
      binCmd,
      folderName,
      currentFile,
      fuzzConfigContent,
      buildScriptContent,
      createCardFolder
    }
  }
}
</script>

<style scoped>
.card-edit {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.editor-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.form-section {
  flex: 1;
  min-width: 400px;
}

.editor-section {
  flex: 1;
  min-width: 400px;
}

.form-group {
  margin-bottom: 15px;
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

.file-editor {
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.file-selector {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.file-selector button {
  flex: 1;
  padding: 10px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
}

.file-selector button.active {
  background: #42b983;
  color: white;
}

.file-content {
  padding: 10px;
  flex-grow: 1;
}

.file-textarea {
  width: 100%;
  height: 100%;
  min-height: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  resize: vertical;
}

.save-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn:hover {
  background-color: #3aa876;
}

@media (max-width: 900px) {
  .editor-layout {
    flex-direction: column;
  }
  
  .form-section, .editor-section {
    min-width: auto;
  }
}
</style>