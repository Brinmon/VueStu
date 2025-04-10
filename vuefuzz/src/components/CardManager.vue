<template>
  <div class="card-filter-container">
    <!-- 数据展示区和创建按钮 -->
    <div class="header-section">
      <StatsDisplay :cards="cards" />
      <button class="add-card-btn" @click="showAddCardForm = true">
        <span class="plus-icon">+</span>
      </button>
    </div>

    <!-- 添加卡片表单 -->
    <div v-if="showAddCardForm" class="modal-overlay">
      <div class="add-card-form">
        <h3>创建新卡片</h3>
        <div class="form-group">
          <label>标题</label>
          <input v-model="newCard.title" placeholder="输入卡片标题">
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="newCard.description" placeholder="输入卡片描述"></textarea>
        </div>
        <div class="form-group">
          <label>状态</label>
          <select v-model="newCard.status">
            <option value="待处理">待处理</option>
            <option value="进行中">进行中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div class="form-actions">
          <button @click="showAddCardForm = false">取消</button>
          <button @click="addNewCard">创建</button>
        </div>
      </div>
    </div>

    <div class="main-layout">
      <!-- 卡片网格区域 -->
      <div class="cards-area">
        <CardsGrid :card-matrix="cardMatrix" />
      </div>

      <!-- 预设面板区域 -->
      <div class="presets-area">
        <PresetsPanel
          :presets="presets"
          :show-add-preset="showAddPreset"
          :new-preset-name="newPresetName"
          @apply-preset="applyPreset"
          @show-add-preset="showAddPreset = true"
          @hide-add-preset="showAddPreset = false"
          @add-preset="addPreset"
          @update:newPresetName="val => newPresetName = val"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardsGrid from './CardsGrid.vue'
import PresetsPanel from './PresetsPanel.vue'
import StatsDisplay from './StatsDisplay.vue'

export default {
  components: {
    CardsGrid,
    PresetsPanel,
    StatsDisplay
  },
  data() {
    return {
      selectedTags: [],
      newTag: '',
      newPresetName: '',
      showAddPreset: false,
      showAddCardForm: false,
      newCard: {
        title: '',
        description: '',
        tags: [],
        status: '待处理'
      },
      presets: [
        { name: '全部标签', tags: [] },
        { name: '前端开发', tags: ['JavaScript', 'Vue', 'CSS'] },
        { name: '后端开发', tags: ['Java', 'Spring', 'MySQL'] },
        { name: '全栈开发', tags: ['JavaScript', 'Node.js', 'MongoDB'] },
        { name: 'UI设计', tags: ['Figma', 'PS', '色彩'] },
        { name: '常用组合', tags: ['标签1', '标签2'] }
      ],
      cards: [
        { id: 1, title: '卡片1', description: '卡片1描述内容', tags: ['标签1', '标签2'], newTag: '', status: '进行中' },
        { id: 2, title: '卡片2', description: '卡片2描述内容', tags: ['标签2', '标签3'], newTag: '', status: '已完成' },
        { id: 3, title: '卡片3', description: '卡片3描述内容', tags: ['标签1', '标签3'], newTag: '', status: '待处理' },
        { id: 4, title: '卡片4', description: '卡片4描述内容', tags: ['标签4'], newTag: '', status: '进行中' },
        { id: 5, title: '卡片5', description: '卡片5描述内容', tags: ['标签1', '标签4'], newTag: '', status: '已完成' },
        { id: 6, title: '卡片6', description: '卡片6描述内容', tags: ['标签2', '标签4'], newTag: '', status: '待处理' },
        { id: 7, title: '卡片7', description: '卡片7描述内容', tags: ['标签3'], newTag: '', status: '进行中' },
        { id: 8, title: '卡片8', description: '卡片8描述内容', tags: ['标签1', '标签2'], newTag: '', status: '已完成' },
        { id: 9, title: '卡片9', description: '卡片9描述内容', tags: ['标签2', '标签3'], newTag: '', status: '待处理' },
        { id: 10, title: '卡片10', description: '卡片10描述内容', tags: ['标签1', '标签3'], newTag: '', status: '进行中' },
        { id: 11, title: '卡片11', description: '卡片11描述内容', tags: ['标签4'], newTag: '', status: '已完成' },
        { id: 12, title: '卡片12', description: '卡片12描述内容', tags: ['标签1', '标签4'], newTag: '', status: '待处理' },
        { id: 13, title: '卡片13', description: '卡片13描述内容', tags: ['标签2', '标签4'], newTag: '', status: '进行中' },
        { id: 14, title: '卡片14', description: '卡片14描述内容', tags: ['标签3'], newTag: '', status: '已完成' }
      ]
    }
  },
  computed: {
    allTags() {
      const tags = new Set()
      this.cards.forEach(card => {
        card.tags.forEach(tag => tags.add(tag))
      })
      return Array.from(tags)
    },
    filteredCards() {
      if (this.selectedTags.length === 0) return this.cards
      return this.cards.filter(card =>
        this.selectedTags.every(selectedTag => card.tags.includes(selectedTag))
      )
    },
    cardMatrix() {
      const matrix = []
      const cardsPerRow = 3
      
      for (let i = 0; i < this.filteredCards.length; i += cardsPerRow) {
        matrix.push(this.filteredCards.slice(i, i + cardsPerRow))
      }
      
      return matrix
    }
  },
  methods: {
    addNewCard() {
      if (this.newCard.title) {
        this.cards.push({
          id: this.cards.length + 1,
          title: this.newCard.title,
          description: this.newCard.description,
          tags: [...this.newCard.tags],
          status: this.newCard.status,
          newTag: ''
        })
        this.newCard = {
          title: '',
          description: '',
          tags: [],
          status: '待处理'
        }
        this.showAddCardForm = false
      }
    },
    addTag() {
      if (this.newTag && !this.allTags.includes(this.newTag)) {
        this.allTags.push(this.newTag)
        this.filteredTagList.push(this.newTag)
        this.newTag = ''
      }
    },
    applyPreset(preset) {
      this.selectedTags = [...preset.tags]
    },
    addPreset(preset) {
      if (preset.name) {
        if (this.editingPreset) {
          const index = this.presets.findIndex(p => p.name === this.editingPreset.name);
          if (index !== -1) {
            this.presets.splice(index, 1, {
              name: preset.name,
              tags: [...preset.tags]
            });
          }
          this.editingPreset = null;
        } else {
          this.presets.push({
            name: preset.name,
            tags: [...preset.tags]
          });
        }
      }
    },
    deletePreset(preset) {
      const index = this.presets.findIndex(p => p.name === preset.name);
      if (index !== -1) {
        this.presets.splice(index, 1);
      }
      this.newPresetName = '';
      this.showAddPreset = false;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.card-filter-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f8f9fa;
}

.search-header {
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.tag-search {
  margin: 10px 0;
}

.tag-search input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 14px;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag-filters label {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.main-layout {
  display: flex;
  flex: 1;
  gap: 20px;
  overflow: hidden;
}

.cards-area {
  flex: 3;
  overflow-y: auto;
  padding-right: 10px;
}

.presets-area {
  flex: 1;
  min-width: 300px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
  
  .cards-area, .presets-area {
    width: 100%;
    min-width: auto;
  }
}

.header-section {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.add-card-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.add-card-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.plus-icon {
  display: block;
  line-height: 50px;
}

/* 添加卡片表单样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.add-card-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.form-actions button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button:last-child {
  background-color: #3498db;
  color: white;
  border: none;
}
</style>