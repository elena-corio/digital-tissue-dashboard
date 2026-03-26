<template>
  <div class="toggle-row">
    <ToggleButton label="A" :selected="toggleStates[0]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[0] = !toggleStates[0]" />
    <ToggleButton label="B" :selected="toggleStates[1]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[1] = !toggleStates[1]" />
    <ToggleButton label="C" :selected="toggleStates[2]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[2] = !toggleStates[2]" />
    <ToggleButton label="D" :selected="toggleStates[3]" borderColor="var(--light-blue-100)" @update:selected="toggleStates[3] = !toggleStates[3]" />
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
  gap: var(--space-md);
  margin-top: var(--space-md);
}
</style>
