<template>
  <div class="tower-selector-group">
    <ToggleButton
      v-for="tower in towers"
      :key="tower"
      :label="tower"
      :selected="selected === tower"
      @update:selected="selected = tower"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ToggleButton from '../ToggleButton.vue';

const towers = ['Tower 1', 'Tower 2', 'Tower 3', 'Tower 4'];
const selected = ref(towers[0]);
</script>

<style scoped>
.tower-selector-group {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  align-items: center;
}
</style>
