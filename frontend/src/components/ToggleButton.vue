<template>
  <button
    class="btn-card"
    :class="{ selected }"
    @click="$emit('update:selected', label)"
    type="button"
  >
    <span class="btn-card-icon">
      <slot name="icon" :selected="selected" />
    </span>
    <span class="btn-card-label">{{ label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
  selected: Boolean
})
</script>

<style scoped>
.btn-card {
  background: var(--white, #fff);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-md) var(--space-lg);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s, filter 0.2s;
  filter: grayscale(1);
}
.btn-card.selected {
  border: 2px solid var(--blue-100);
  box-shadow: var(--shadow-glow-blue);
  filter: none;
}
.btn-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-card-label {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
</style>
