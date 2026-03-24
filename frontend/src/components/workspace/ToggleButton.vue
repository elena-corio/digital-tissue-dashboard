<template>
  <button
    class="btn btn-card"
    :class="{ selected }"
    :style="selected ? { border: `2px solid ${borderColor || 'var(--light-blue-100)'}` } : {}"
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
  selected: Boolean,
  borderColor: String
})
</script>

<style >
.btn-card {
  filter: grayscale(1);
  opacity: 0.6;
}
.btn-card.selected {
  box-shadow: var(--shadow-glow-blue);
  filter: none;
  opacity:1;
}

.btn-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-card-label {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
}
</style>
