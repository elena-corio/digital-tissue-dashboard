<template>
  <div class="viewer-legend">
    <div v-for="item in items" :key="item.label" class="legend-item">
      <span class="legend-dot" :style="{ background: item.color }"></span>
      <span class="legend-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true } // [{ color, label }]
})
</script>

<style scoped>
.viewer-legend {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 20;
  background: rgba(255,255,255,0.85);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px 0 rgba(10,26,47,0.08);
  margin: 8px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  border: 1.5px solid #ccc;
}
.legend-label {
  font-size: 0.95rem;
  color: var(--navy-100);
}
</style>
