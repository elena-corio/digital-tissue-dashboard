<template>
  <div class="organ-selector-group">
    <BtnCard
      v-for="organ in organs"
      :key="organ.name"
      :selected="selected === organ.name"
      :borderColor="organ.color"
      :disabled="organ.name !== 'HB03'"
      @update:selected="organ.name === 'HB03' && selectOrgan(organ.name)"
      class="organ-btn"
      :style="organ.name !== 'HB03' ? 'opacity: 0.5; cursor: not-allowed;' : ''"
    >
      <template #icon>
        <div class="organ-icon-wrapper">
          <img :src="getIconUrl(organ.icon)" :alt="organ.name" class="organ-icon" />
          <span class="organ-label">{{ organ.name }}</span>
        </div>
      </template>
    </BtnCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BtnCard from '../workspace/ToggleButton.vue'
import { ORGANS } from '../../uiText.js'

const selected = ref('HB03')
const selectOrgan = (label) => {
  selected.value = label
}
const organs = Object.values(ORGANS)

function getIconUrl(icon) {
  return new URL(`../../assets/${icon}`, import.meta.url).href;
}
</script>

<style sscoped>
.organ-selector-group {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  align-items: center;
}
.organ-btn .organ-label {
  display: none;
  position: absolute;
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
  background: var(--white, #fff);
  color: var(--navy-100);
  padding: 4px 12px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  font-size: var(--font-size-body);
  white-space: nowrap;
  z-index: 10;
}
.organ-btn:hover .organ-label {
  display: block;
}
.organ-icon-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.organ-icon {
  width: 56px;
  height: 56px;
}
</style>
