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
    <div class="chart-placeholder">
      <template v-if="selected === 'data'">
        <div v-if="clusters.length" class="bar-chart">
          <div class="bar" v-for="(cluster, idx) in clusters" :key="cluster.id">
            <div class="bar-value">{{ cluster.count }} floors</div>
            <div class="bar-outer">
              <div
                class="bar-inner"
                :style="{
                  height: (maxFloors ? Math.round((cluster.count / maxFloors) * 200) : 0) + 'px',
                  background: barColors[idx % barColors.length]
                }"
              ></div>
            </div>
            <div class="bar-label">{{ cluster.name.replace(/^Cluster/i, 'Tower') }}</div>
          </div>
        </div>
        <div v-else>No cluster data available</div>
      </template>
      <template v-else-if="selected === 'program'">
        <span>Program chart content</span>
      </template>
      <template v-else-if="selected === 'structure'">
        <span>Structure chart content</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSpeckleData } from '../../composables/useSpeckleData';
const selected = ref('data');

// Get clusters (towers) and their floor counts
const { data: speckleData } = useSpeckleData();
const clusters = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  return latest.data.elements.map(cluster => ({
    id: cluster.id,
    name: cluster.name,
    count: Array.isArray(cluster.elements) ? cluster.elements.length : 0
  }));
});

const maxFloors = computed(() => {
  if (!clusters.value.length) return 1;
  return Math.max(...clusters.value.map(c => c.count), 1);
});
// Bar colors: blue, light-blue, orange, yellow
const barColors = [
  'var(--blue-100)',
  'var(--light-blue-100)',
  'var(--orange-100)',
  'var(--yellow-100)'
];
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
/* Bar chart styles */
.chart-placeholder {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 220px;
  color: var(--navy-50);
  background: var(--grey-10);
  border-radius: var(--radius-sm);
  margin-top: var(--space-xl);
}
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: var(--space-lg);
  height: 100%;
}
.bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-width: 52px;
}
.bar-label {
  font-size: var(--font-size-caption);
  color: var(--navy-100);
  margin-top: var(--space-sm);
}
.bar-outer {
  width: 36px;
  height: 200px;
  background: var(--grey-50);
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}
.bar-inner {
  width: 100%;
  background: var(--light-blue-100);
  border-radius: 8px 8px 0 0;
  transition: height 0.3s;
}
.bar-value {
  font-size: var(--font-size-value);
  color: var(--navy-50);
  margin-bottom: var(--space-sm);
}
</style>
