<template>
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
      

<script setup>

const props = defineProps({
  clusters: { type: Array, required: true }, // [{ clusters, maxFloors }]
  maxFloors: { type: Number, required: true }
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
