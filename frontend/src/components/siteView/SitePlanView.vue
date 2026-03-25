

<template>
  <div class="site-plan-view">
    <div class="card-title">Plan View</div>
    <svg
      viewBox="0 0 141.73 141.73"
      class="svg-plot-img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Areas: st0 = hb03, st1 = hb02, st2 = hb01 -->
      <path
        :class="['st0', !activeAreas[2] ? 'inactive' : '']"
        d="M23.31,50.99L0,99.36l41.66,36.34,29.38-58.3-47.73-26.41Z"
        @mouseenter="() => handleAreaHover('hb03', 2)"
        @mouseleave="handleAreaLeave"
      />
      <path
        :class="['st1', !activeAreas[1] ? 'inactive' : '']"
        d="M141.73,59.67l-30.04-34.28-40.65,52.01-29.38,58.3,43.82-38.19,56.25-37.84Z"
        @mouseenter="() => handleAreaHover('hb02', 1)"
        @mouseleave="handleAreaLeave"
      />
      <path
        :class="['st2', !activeAreas[0] ? 'inactive' : '']"
        d="M44.96,6.03l66.74,19.36-40.65,52.01-47.73-26.41L44.96,6.03Z"
        @mouseenter="() => handleAreaHover('hb01', 0)"
        @mouseleave="handleAreaLeave"
      />

      <!-- Callout lines and tags (hardcoded centroids and tag positions for demo) -->
      <!-- Blue (st0): left horizontal callout -->
      <line class="area-line" x1="35" y1="90" x2="-20" y2="90" />
      <text class="area-label" x="-20" y="87">HB3</text>
      <text class="area-sqm" x="-20" y="97">{{ uiText.SITE.hypersArea.hb03.toLocaleString() }} m²</text>
      <!-- Fucsia (st1): right horizontal callout -->
      <line class="area-line" x1="100" y1="70" x2="160" y2="70" />
      <text class="area-label" x="160" y="67">HB2</text>
      <text class="area-sqm" x="160" y="77">{{ uiText.SITE.hypersArea.hb02.toLocaleString() }} m²</text>
      <!-- Yellow (st2): left horizontal callout -->
      <line class="area-line" x1="70" y1="30" x2="-20" y2="30" />
      <text class="area-label" x="-20" y="27">HB1</text>
      <text class="area-sqm" x="-20" y="37">{{ uiText.SITE.hypersArea.hb01.toLocaleString() }} m²</text>
    </svg>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import * as uiText from '@/uiText.js';

const props = defineProps({
  activeAreas: {
    type: Array,
    default: () => [false, false, false]
  }
});

const emit = defineEmits(['area-hover', 'area-leave']);

function handleAreaHover(areaKey, idx) {
  if (props.activeAreas[idx]) {
    emit('area-hover', { areaKey, idx });
  }
}
function handleAreaLeave() {
  emit('area-leave');
}
</script>

<style scoped>
.site-plan-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
}
.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--navy-100, #222);
  margin-bottom:var(--space-md);
  text-align: left;
  width: 100%;
}
.svg-plot-img {
  max-width: 100%;
  max-height: 300px;
  height: auto;
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0 !important;
}
</style>

<style>
.st0 {
  fill: var(--light-blue-100);
  stroke: #fff;
  fill-opacity: 0.5;
  transition: fill-opacity 0.2s;
}
.st1 {
  fill: var(--fucsia-100);
  stroke: #fff;
  fill-opacity: 0.5;
  transition: fill-opacity 0.2s;
}
.st2 {
  fill: var(--yellow-100);
  stroke: #fff;
  fill-opacity: 0.5;
  transition: fill-opacity 0.2s;
}
.st0:hover, .st1:hover, .st2:hover {
  fill-opacity: 1;
  cursor: pointer;
}
/* Inactive state for hidden/faded buildings */
.inactive {
  pointer-events: none;
  transition: opacity 0.2s;
}
.area-line {
  stroke: var(--navy-100);
  stroke-width: 1;
  stroke-dasharray: 3,2;
}
.area-label {
  font-size: 8px;
  font-weight: 600;
  fill: var(--navy-100);
  text-anchor: middle;
  dominant-baseline: baseline;
}
.area-sqm {
  font-size: 7px;
  fill: var(--navy-50);
  text-anchor: middle;
  dominant-baseline: baseline;
}
</style>
