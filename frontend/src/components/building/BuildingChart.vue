<template>
  <div class="building-chart">
    <div class="chart-dropdown-wrapper">
      <select v-model="selected" class="chart-dropdown">
        <option value="data">Data</option>
        <option value="program">Program</option>
        <option value="structure">Structure</option>
      </select>
    </div>
    <div class="card-title">Key Insights</div>
    <div class="chart-placeholder">Chart will go here</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const selected = ref('data');
</script>

<style scoped>
/* Layout for header row */

.building-chart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  position: relative;
}
.chart-dropdown-wrapper {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  z-index: 2;
}
.chart-dropdown {
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--grey-100);
  background: var(--grey-50);
  color: var(--navy-100);
  box-shadow: var(--shadow-soft);
  outline: none;
  transition: border 0.2s;
}
.chart-dropdown:focus {
  border: 1.5px solid var(--light-blue-100);
}
.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--navy-100, #222);
  margin-bottom: var(--space-md);
  text-align: left;
  width: 100%;
}
.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--navy-50);
  background: var(--grey-10);
  border-radius: var(--radius-sm);
}
</style>
