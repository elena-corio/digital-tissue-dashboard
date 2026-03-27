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
        <DataBarChart
          :clusters="clusters"
          :maxFloors="maxFloors"
          :key="clustersKey"
        />
      </template>
      <template v-else-if="selected === 'program'">
        <ProgramPieChart :data="programData" />
      </template>
      <template v-else-if="selected === 'structure'">
        <StructurePieChart :data="structureData" />
      </template>
      <template v-if="selected === 'program'">
        <ViewerPanel
          v-if="programCategories.length > 0"
          :program-categories="programCategories"
          v-bind="$attrs"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSpeckleData } from '../../composables/useSpeckleData.js';
import DataBarChart from './DataBarChart.vue';
import ProgramPieChart from './ProgramPieChart.vue';
import StructurePieChart from './StructurePieChart.vue';

import ViewerPanel from '../metrics/ViewerPanel.vue';

// Compute material type distribution from properties starting with 'materialtype.'
const structureData = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  // Aggregate all materialtype.* properties from all clusters
  const materialCounts = {};
  let total = 0;
  latest.data.elements.forEach(cluster => {
    if (cluster && cluster.properties) {
      Object.keys(cluster.properties).forEach(key => {
        if (key.startsWith('materialtype.')) {
          const mat = key.split('.')[1];
          const val = Number(cluster.properties[key]) || 0;
          if (val > 0) {
            materialCounts[mat] = (materialCounts[mat] || 0) + val;
            total += val;
          }
        }
      });
    }
  });
  // Convert to array with percentage and color
  return Object.entries(materialCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value], idx) => {
      let color = barColors[idx % barColors.length];
      if (label.toLowerCase() === 'concrete') color = '#3b479f'; // blue
      if (label.toLowerCase() === 'steel') color = '#bdbdbd'; // grey
      return {
        label,
        value,
        percent: total > 0 ? (value / total) * 100 : 0,
        color
      };
    });
});
// Use the same colors as DataBarChart (towers)
const barColors = [
  'var(--blue-100)',
  'var(--light-blue-100)',
  'var(--orange-100)',
  'var(--yellow-100)'
];

// Compute program distribution
const programData = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  // Flatten all elements in all clusters
  const allElements = latest.data.elements.flatMap(cluster => Array.isArray(cluster.elements) ? cluster.elements : []);
  // Count by program (use el.properties.program)
  const counts = {};
  allElements.forEach(el => {
    const program = el?.properties?.program || 'Unknown';
    counts[program] = (counts[program] || 0) + 1;
  });
  // Map to array with color
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value], idx) => ({
      label,
      value,
      color: programPalette[idx % programPalette.length]
    }));
});

// Sorted program categories for color mapping
const programCategories = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  const allElements = latest.data.elements.flatMap(cluster => Array.isArray(cluster.elements) ? cluster.elements : []);
  const unique = Array.from(new Set(allElements.map(el => el?.properties?.program || 'Unknown')));
  // Sort alphabetically, move 'Unknown' to end if present
  const filtered = unique.filter(v => v !== 'Unknown').sort((a, b) => a.localeCompare(b));
  if (unique.includes('Unknown')) filtered.push('Unknown');
  return filtered;
});

const selected = ref('data');

// Key for DataBarChart to force remount on data change
const clustersKey = computed(() => {
  // Use a hash of clusters and maxFloors for uniqueness
  const clustersStr = JSON.stringify(clusters.value);
  return `${clustersStr}-${maxFloors.value}`;
});

// Get clusters (towers) and their floor counts
const { data: speckleData } = useSpeckleData();
const clusters = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  // Always return an array, never undefined or 1
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
  margin-bottom: var(--space-xl);
  text-align: left;
  width: 100%;
}
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

</style>
