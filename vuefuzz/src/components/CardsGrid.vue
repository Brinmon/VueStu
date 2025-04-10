<template>
  <div class="cards-section">
    <div class="cards-matrix">
      <template v-for="(row, rowIndex) in cardMatrix" :key="rowIndex">
        <div class="card-row">
          <div 
            v-for="card in row" 
            :key="card.id" 
            class="card"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
            <div class="card-status" :class="'status-' + card.status.toLowerCase()">
              {{ card.status }}
            </div>
            <div class="card-tags">
              <span v-for="tag in card.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <div class="card-actions">
              <button class="action-btn" @click="toggleMenu(card.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                </svg>
              </button>
              <div class="action-menu" v-show="activeMenu === card.id">
                <button class="menu-item" @click="handleAction(1, card)">功能1</button>
                <button class="menu-item" @click="handleAction(2, card)">功能2</button>
                <button class="menu-item" @click="handleAction(3, card)">功能3</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardMatrix: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeMenu: null
    }
  },
  methods: {
    toggleMenu(cardId) {
      this.activeMenu = this.activeMenu === cardId ? null : cardId
    },
    handleAction(actionNum, card) {
      console.log(`执行功能${actionNum}`, card)
      this.activeMenu = null
    }
  }
}
</script>

<style scoped>
.cards-section {
  flex: 3;
  overflow-y: auto;
}

.cards-matrix {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-row {
  display: flex;
  gap: 15px;
}

.card {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  min-height: 150px;
  position: relative;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  display: flex;
  align-items: center;
  background-color: #e9ecef;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.remove-tag {
  margin-left: 3px;
  color: #868e96;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
}

.tag-input {
  width: 80px;
  padding: 2px 5px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  font-size: 12px;
}

.card-status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-bottom: 8px;
  color: white;
}

.status-待处理 {
  background-color: #6c757d;
}

.status-进行中 {
  background-color: #17a2b8;
}

.status-已完成 {
  background-color: #28a745;
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d;
  padding: 2px;
  border-radius: 4px;
}

.action-btn:hover {
  background-color: #f1f3f5;
}

.action-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 120px;
  overflow: hidden;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #f8f9fa;
}
</style>