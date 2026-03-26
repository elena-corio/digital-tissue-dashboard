<template>
<div v-if="clusters.length" class="bar-chart" style="position:relative;">
  <div
    class="bar"
    v-for="(cluster, idx) in clusters"
    :key="cluster.id"
    :style="{ opacity: hovered === null || hovered === idx ? 1 : 0.35, transition: 'opacity 0.2s' }"
    @mousemove="(e) => onBarEnter(idx, e)"
    @mouseleave="onBarLeave"
  >
    <div class="bar-value">{{ animatedNumbers[idx].toFixed(1) }} m</div>
    <div class="bar-outer">
      <div
        class="bar-inner"
        :style="{
          height: animatedHeights[idx] + 'px',
          background: barColors[idx % barColors.length]
        }"
      ></div>
    </div>
    <div class="bar-label">{{ cluster.name.replace(/^Cluster/i, 'Tower') }}</div>
    <!-- Tooltip -->
    <div v-if="hovered === idx && tooltip.visible" class="bar-tooltip pie-thumbnail-tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
      <span class="pie-thumbnail-value">{{ cluster.count }} floors</span>
    </div>
  </div>
</div>
<div v-else>No cluster data available</div>
      </template>
      

<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps({
  clusters: { type: Array, required: true },
  maxFloors: { type: Number, required: true }
});
const hovered = ref(null);
const tooltip = ref({ x: 0, y: 0, visible: false });
const barColors = [
  'var(--blue-100)',
  'var(--light-blue-100)',
  'var(--orange-100)',
  'var(--yellow-100)'
];
// Animation state
const animatedHeights = ref([]);
const animatedNumbers = ref([]);

function animateBar(idx, targetHeight, targetNumber) {
  const duration = 900;
  const startTime = performance.now();
  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    animatedHeights.value[idx] = Math.round(targetHeight * progress);
    animatedNumbers.value[idx] = (targetNumber * progress);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      animatedHeights.value[idx] = Math.round(targetHeight);
      animatedNumbers.value[idx] = targetNumber;
    }
  }
  requestAnimationFrame(animate);
}

function startAnimation() {
  animatedHeights.value = props.clusters.map(cluster => 0);
  animatedNumbers.value = props.clusters.map(cluster => 0);
  props.clusters.forEach((cluster, idx) => {
    const targetHeight = props.maxFloors ? Math.round((cluster.count / props.maxFloors) * 200) : 0;
    const targetNumber = cluster.count * 4.5;
    animateBar(idx, targetHeight, targetNumber);
  });
}

onMounted(() => {
  startAnimation();
});

// Re-animate if clusters or maxFloors change
watch([() => props.clusters, () => props.maxFloors], () => {
  startAnimation();
});
function onBarEnter(idx, e) {
  hovered.value = idx;
  // Tooltip position: follow mouse, like pie chart
  const chart = e.currentTarget.closest('.bar-chart');
  if (chart) {
    const rect = chart.getBoundingClientRect();
    tooltip.value.x = e.clientX - rect.left + 12;
    tooltip.value.y = e.clientY - rect.top + 12;
    tooltip.value.visible = true;
  }
}
function onBarLeave() {
  hovered.value = null;
  tooltip.value.visible = false;
}
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
/* Tooltip styles (copied from ProgramPieChart.vue) */
.pie-thumbnail-tooltip {
  position: absolute;
  z-index: 9999;
  pointer-events: none;
  background: var(--card-bg, #fff);
  transition: left 0.08s, top 0.08s;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--space-xs) var(--space-sm);
  width: fit-content;
}
.pie-thumbnail-value {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
  white-space: nowrap;
}
</style>
