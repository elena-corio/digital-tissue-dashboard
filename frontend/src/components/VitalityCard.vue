<template>
  <div class="card vitality-card-parent">
    <div class="card-title">{{ uitext.VITALITY.sectionTitle }}</div>
    <div class="vitality-children-wrapper">
      <div class="card vitality-card-child" v-for="card in cards" :key="card">
        <span class="vitality-label">{{ card }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  uitext.VITALITY.cards.metabolic,
  uitext.VITALITY.cards.regeneration,
  uitext.VITALITY.cards.expansion
]
import * as uitext from '../uitext.js'
</script>

<style scoped>
.vitality-card-parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.vitality-children-wrapper {
  display: flex;
  flex-direction: row;
  gap: var(--space-md);
}
.vitality-card-child {
  min-width: 180px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vitality-label {
  color: var(--navy-50);
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
}
</style>
