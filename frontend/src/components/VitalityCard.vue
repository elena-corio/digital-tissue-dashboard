<template>
  <div class="vitality-card-parent">
    <h4 class="card-title">{{ uitext.VITALITY.sectionTitle }}</h4>
    <div class="vitality-children-wrapper">
    <div class="vitality-card-child" v-for="card in cards" :key="card">
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
  background: white;
  border: 1.5px solid var(--grey-100);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-soft);
  justify-content: center;
  flex-direction: column;
}
.vitality-children-wrapper {
  display: flex;
  flex-direction: row;
  gap: var(--space-lg);
}
.vitality-card-child {
  min-width: 180px;
  min-height: 120px;
  background:  white;
  border: 1.5px solid var(--grey-100);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s;
}
.vitality-card-child:hover {
  box-shadow: var(--shadow-card);
}
.vitality-label {
  color: var(--navy-50);
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
}
</style>
