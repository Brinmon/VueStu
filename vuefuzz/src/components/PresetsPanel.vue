<template>
  <div class="presets-section">
    <div class="preset-filters">
      <h3>预设筛选组合</h3>
      <button 
        @click="$emit('show-add-preset')" 
        class="add-preset-btn"
      >
        + 新增组合
      </button>
      <div v-for="preset in presets" :key="preset.name" class="preset-item">
        <button
          @click="$emit('apply-preset', preset)"
          class="preset-btn"
        >
          {{ preset.name }}
        </button>
        <div class="preset-actions">
          <button @click.stop="showEditPreset(preset)" class="edit-btn">✏️</button>
          <button @click.stop="confirmDeletePreset(preset)" class="delete-btn">🗑️</button>
        </div>
      </div>

      <div v-if="showAddPreset" class="add-preset-form">
        <input
          :value="localNewPresetName"
          @input="updatePresetName($event.target.value)"
          placeholder="组合名称"
          class="preset-input"
          @keyup.enter="handleAddPreset"
        >
        
        <div class="tag-selection">
          <h4>选择标签</h4>
          <div class="tag-options">
            <label v-for="tag in availableTags" :key="tag">
              <input
                type="checkbox"
                v-model="selectedTags"
                :value="tag"
              >
              {{ tag }}
            </label>
          </div>
        </div>
        
        <div class="preset-form-actions">
          <button @click="handleAddPreset" class="save-btn">{{ editingPreset ? '完成' : '保存' }}</button>
          <button @click="cancelEdit" class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    presets: {
      type: Array,
      required: true
    },
    showAddPreset: {
      type: Boolean,
      default: false
    },
    newPresetName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localNewPresetName: this.newPresetName,
      selectedTags: [],
      availableTags: ['JavaScript', 'Vue', 'CSS', 'Java', 'Spring', 'MySQL', 'Node.js', 'MongoDB', 'Figma', 'PS', '色彩','123','456','789','101112','131415','161718','192021','222324','252627','282930']
    }
  },
  methods: {
    updatePresetName(value) {
      this.localNewPresetName = value
      this.$emit('update:newPresetName', value)
    },
    handleAddPreset() {
      this.$emit('add-preset', {
        name: this.localNewPresetName,
        tags: [...this.selectedTags]
      })
      this.selectedTags = []
      this.$emit('hide-add-preset')
    },
    showEditPreset(preset) {
      this.editingPreset = preset
      this.localNewPresetName = preset.name
      this.selectedTags = [...preset.tags]
      this.$emit('show-add-preset')
    },
    cancelEdit() {
      this.editingPreset = null
      this.$emit('hide-add-preset')
    },
    confirmDeletePreset(preset) {
      if (confirm(`确定要删除"${preset.name}"组合吗？`)) {
        this.$emit('delete-preset', preset)
      }
    }
  }
}
</script>

<style scoped>
.presets-section {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.preset-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preset-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.preset-btn, .add-preset-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
  text-align: left;
}

.preset-btn:hover, .add-preset-btn:hover {
  background-color: #e9ecef;
}

.preset-actions {
  display: flex;
  gap: 2px;
}

.edit-btn, .delete-btn {
  padding: 5px 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn:hover {
  color: #4CAF50;
}

.delete-btn:hover {
  color: #f44336;
}

.add-preset-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.tag-selection {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 5px;
}

.tag-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.preset-input {
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.preset-form-actions {
  display: flex;
  gap: 10px;
}

.save-btn, .cancel-btn {
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
</style>