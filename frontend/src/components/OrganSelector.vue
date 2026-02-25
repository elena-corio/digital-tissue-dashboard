<template>
  <div class="organ-selector-group">
    <BtnCard
      v-for="organ in organs"
      :key="organ.label"
      :label="organ.label"
      :selected="selected === organ.label"
      @update:selected="selectOrgan"
    >
      <template #icon>
        <span v-html="selected === organ.label ? organ.svgColor : organ.svgGrey" />
      </template>
    </BtnCard>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BtnCard from './ToggleButton.vue'

const selected = ref('Tissue')
const selectOrgan = (label) => {
  selected.value = label
}

const organs = [
  {
    label: 'Lungs',
    svgColor: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="10" cy="18" rx="6" ry="10" fill="#b3bad8"/><ellipse cx="22" cy="18" rx="6" ry="10" fill="#b3bad8"/><rect x="14" y="14" width="4" height="12" rx="2" fill="#7d81ac"/></svg>`,
    svgGrey: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="10" cy="18" rx="6" ry="10" fill="#dadad9"/><ellipse cx="22" cy="18" rx="6" ry="10" fill="#dadad9"/><rect x="14" y="14" width="4" height="12" rx="2" fill="#b3bad8"/></svg>`
  },
  {
    label: 'Heart',
    svgColor: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 28s-8-6.5-8-12A6 6 0 0 1 16 10a6 6 0 0 1 8 6c0 5.5-8 12-8 12z" fill="#e9268c"/><circle cx="12" cy="16" r="2" fill="#f19fcb"/><circle cx="20" cy="16" r="2" fill="#f19fcb"/></svg>`,
    svgGrey: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 28s-8-6.5-8-12A6 6 0 0 1 16 10a6 6 0 0 1 8 6c0 5.5-8 12-8 12z" fill="#dadad9"/><circle cx="12" cy="16" r="2" fill="#b3bad8"/><circle cx="20" cy="16" r="2" fill="#b3bad8"/></svg>`
  },
  {
    label: 'Tissue',
    svgColor: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="10" width="20" height="12" rx="6" fill="#d8d9ed"/><circle cx="12" cy="16" r="3" fill="#7d81ac"/><circle cx="20" cy="16" r="3" fill="#7d81ac"/></svg>`,
    svgGrey: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="10" width="20" height="12" rx="6" fill="#dadad9"/><circle cx="12" cy="16" r="3" fill="#b3bad8"/><circle cx="20" cy="16" r="3" fill="#b3bad8"/></svg>`
  }
]
</script>

<style scoped>
.organ-selector-group {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  align-items: center;
}
</style>
