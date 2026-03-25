<template>
  <div class="pie-chart-wrapper">
    <svg
      viewBox="0 0 120 120"
      class="pie-chart"
      @mousemove="onPieMouseMove"
      @mouseleave="onPieMouseLeave"
    >
      <g :transform="'rotate(-90 60 60)'">
        <g v-for="(slice, idx) in slices" :key="slice.label">
          <circle
            class="pie-slice"
            :r="radius"
            :cx="center"
            :cy="center"
            :stroke="slice.color"
            :stroke-width="thickness"
            fill="none"
            :stroke-dasharray="slice.length + ' ' + circumference"
            :stroke-dashoffset="slice.offset"
            :style="{ opacity: hovered === idx || hovered === null ? 1 : 0.4, transition: 'opacity 0.2s' }"
            @mouseenter="hovered = idx"
            @mouseleave="hovered = null"
          />
        </g>
      </g>
    </svg>
    <!-- Floating percentage tooltip next to mouse -->
    <div
      v-if="hovered !== null && tooltip.visible"
      class="pie-thumbnail-tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <span class="pie-thumbnail-value">
        {{ Math.round((slices[hovered].value / total) * 100) }}%
      </span>
    </div>
    <div class="pie-legend legend-2col">
      <div
        v-for="(slice, idx) in slices"
        :key="slice.label"
        class="legend-item"
        :class="{ 'legend-item-col2': true }"
        :style="{ gridColumn: (idx % 2) + 1 }"
      >
        <span class="legend-color" :style="{ background: slice.color }"></span>
        <span class="legend-label">{{ slice.label }} </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { programPalette } from './programPalette.js';
const props = defineProps({
  data: { type: Array, required: true }, // [{ label, value, color }]
});
const hovered = ref(null);
const tooltip = ref({ x: 0, y: 0, visible: false });
// Mouse move handler for pie chart
function onPieMouseMove(e) {
  if (hovered.value !== null) {
    // Find the bounding rect of the wrapper for correct offset
    const wrapper = e.currentTarget.closest('.pie-chart-wrapper');
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      tooltip.value.x = e.clientX - rect.left+12;
      tooltip.value.y = e.clientY - rect.top +12;
      tooltip.value.visible = true;
    }
  }
}
function onPieMouseLeave() {
  tooltip.value.visible = false;
}
const center = 60;
const radius = 44;
const thickness = 18;
const circumference = 2 * Math.PI * radius;
      
const total = computed(() => props.data.reduce((sum, d) => sum + d.value, 0));
const slices = computed(() => {
  let offset = 0;
  return props.data.map((d, idx) => {
    const length = total.value ? (d.value / total.value) * circumference : 0;
    // Use provided color or assign from palette
    const color = d.color || programPalette[idx % programPalette.length];
    const slice = {
      ...d,
      color,
      length,
      offset: -offset,
    };
    offset += length;
    return slice;
  });
});
</script>

<style scoped>
.pie-chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-xl);
  position: relative;
}
.pie-chart {
  width: 240px;
  height: 240px;
  margin-top: var(--space-xl);
  margin-bottom: var(--space-sm);
}
.pie-slice {
  stroke-linecap: butt;
  cursor: pointer;
}
.pie-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xs) var(--space-xl);
  margin-top: var(--space-sm);
}
.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-caption);
}
.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
}
/* Remove duplicate .pie-chart style block that may affect layout */
/* Floating tooltip for pie chart sector */
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