<template>
  <div class="card title-card">
    <h4 class="card-name">{{ name }}</h4>
    <img :src="iconSrc" :alt="name" class="card-icon" />
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

// Dynamically import icon from assets - works with GitHub Pages base path
const iconSrc = computed(() => {
  return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href;
});
</script>

<style scoped>
.title-card {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--space-sm);
  background-color: var(--grey-50);

}

.card-icon {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  margin-bottom: var(--space-sm);
}

.card-name {
  color: var(--navy-100);
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.card-description {
  color: var(--navy-50);
  margin: 0;
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  text-align: center;
}
</style>
