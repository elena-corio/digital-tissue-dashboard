<template>
  <div class="card growth-cycles">
    <div class="card-title">{{ uitext.GROWTH_PHASES.title }}</div>
    <div class="growth-nails">
      <div
        v-for="(phase, idx) in uitext.GROWTH_PHASES.phases"
        :key="phase.label"
        class="growth-nail"
        :class="{ selected: idx === selectedIdx }"
        @click="selectNail(idx)"
      >
        <div class="growth-nail-hole"></div>
        <div class="growth-nail-label" :class="{ selected: idx === selectedIdx }">{{ phase.label }}</div>
      </div>
    </div>
    <div v-if="uitext.GROWTH_PHASES.phases[selectedIdx]" class="growth-phase-details">
      <div class="growth-phase-title">{{ uitext.GROWTH_PHASES.phases[selectedIdx].title }}</div>
      <div class="growth-phase-desc">{{ uitext.GROWTH_PHASES.phases[selectedIdx].description }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import * as uitext from '../uitext.js'
const selectedIdx = ref(6)
function selectNail(idx) {
  selectedIdx.value = idx
}
</script>

<style scoped>
.growth-nails {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  justify-content: center;
}
.growth-nail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36px;
  height: 64px;
  border-radius: var(--radius-md);
  background: var(--grey-50);
  border-color: var(--grey-100);
  cursor: pointer;
  position: relative;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-soft);
}
.growth-nail:hover {
  background: var(--grey-100);
	box-shadow: var(--shadow-soft);
}
.growth-nail.selected {
  background: var(--blue-100);
  box-shadow:var(--shadow-glow-blue);
}
.growth-nail-hole {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background:white;
  border: 2px solid var(--grey-100);
  margin-top: 8px;
  margin-bottom: auto;
  box-shadow: var(--shadow-soft);
}
.growth-nail.selected .growth-nail-hole {
  border-color: var(--blue-100);
}
.growth-nail-label {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: var(--navy-50);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px auto;
  margin-top: auto;
  transition: color 0.2s, background 0.2s;
}
.growth-nail.selected .growth-nail-label {
  background: white;
  color: var(--blue-100);
}

.growth-phase-details {
  margin-top: var(--space-md);
  text-align: left;
}
.growth-phase-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
.growth-phase-desc {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
  margin-top: 2px;
}
</style>
