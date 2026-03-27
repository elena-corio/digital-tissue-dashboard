<template>
  <div class="toggle-row">
    <ToggleButton label="T01" :selected="toggleStates[0]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[0] = !toggleStates[0]" />
    <ToggleButton label="T02" :selected="toggleStates[1]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[1] = !toggleStates[1]" />
    <ToggleButton label="T03" :selected="toggleStates[2]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[2] = !toggleStates[2]" />
    <ToggleButton label="T04" :selected="toggleStates[3]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[3] = !toggleStates[3]" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ToggleButton from '../workspace/ToggleButton.vue';
const toggleStates = ref([false, false, false, false]);
</script>

<style scoped>
.toggle-row {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
  justify-content: center;
}
</style>
