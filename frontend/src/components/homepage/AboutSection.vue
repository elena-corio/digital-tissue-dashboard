<template>
  <div class="page-container">
    <div class="grid-content">
      <div class="cards-grid">
        <!-- First row: Title cards -->
        <TitleCard 
          v-for="(card, key) in uiText.HOMEPAGE.cards"
          :key="`title-${key}`"
          :name="card.name"
          :description="card.description"
          :icon="card.icon"
        />
        
        <!-- Second row: Text cards -->
        <TextCard 
          v-for="(card, key) in uiText.HOMEPAGE.cards"
          :key="`text-${key}`"
          :items="card.bullets" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as uiText from '@/uiText.js';
import TitleCard from '@/components/cards/TitleCard.vue';
import TextCard from '@/components/cards/TextCard.vue';
</script>

<style scoped>
.page-container {
  padding: var(--space-xl);
}
.grid-content {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
}

.grid-title {
  text-align: center;
  margin: 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: var(--space-lg);
  row-gap: var(--space-md);
  width: 100%;
}
</style>