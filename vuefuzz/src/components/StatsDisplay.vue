<template>
  <div class="stats-display">
    <div class="stats-card">
      <h3>卡片总数</h3>
      <div class="stat-value">{{ totalCards }}</div>
    </div>
    
    <div class="stats-card">
      <h3>标签总数</h3>
      <div class="stat-value">{{ totalTags }}</div>
    </div>
    
    <div class="stats-card">
      <h3>卡片状态分布</h3>
      <div class="status-distribution">
        <div v-for="(count, status) in statusDistribution" 
             :key="status" 
             class="status-item">
          <span class="status-label">{{ status }}:</span>
          <span class="status-count">{{ count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalCards() {
      return this.cards.length
    },
    totalTags() {
      const tags = new Set()
      this.cards.forEach(card => {
        card.tags.forEach(tag => tags.add(tag))
      })
      return tags.size
    },
    statusDistribution() {
      const distribution = {}
      this.cards.forEach(card => {
        const status = card.status || '未分类'
        distribution[status] = (distribution[status] || 0) + 1
      })
      return distribution
    }
  }
}
</script>

<style scoped>
.stats-display {
  display: flex;
  gap: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stats-card {
  flex: 1;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
}

.status-distribution {
  margin-top: 10px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.status-item:last-child {
  border-bottom: none;
}

.status-label {
  color: #666;
}

.status-count {
  font-weight: bold;
}
</style>