<template>
  <div class="toggle-row">
    <ToggleButton label="T01" :selected="true" borderColor="var(--light-blue-100)" style="pointer-events: none; opacity: 0.7;" />
    <ToggleButton label="T02" :selected="true" borderColor="var(--light-blue-100)" style="pointer-events: none; opacity: 0.7;" />
    <ToggleButton label="T03" :selected="true" borderColor="var(--light-blue-100)" style="pointer-events: none; opacity: 0.7;" />
    <ToggleButton label="T04" :selected="true" borderColor="var(--light-blue-100)" style="pointer-events: none; opacity: 0.7;" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ToggleButton from '../workspace/ToggleButton.vue';
// All toggles always active and non-interactive
</script>

<style scoped>
.toggle-row {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
  justify-content: center;
}
</style>
