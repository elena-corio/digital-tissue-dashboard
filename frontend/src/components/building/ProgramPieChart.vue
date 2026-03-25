<template>
  <div class="pie-chart-wrapper">
    <svg viewBox="0 0 120 120" class="pie-chart">
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
  .pie-chart {
    width: 220px;
    height: 220px;
    margin-bottom: var(--space-sm);
  }
</style>