<template>
  <div class="tissue-canvas-placeholder">
    <span class="tissue-label">Tissue Canvas Placeholder</span>
  </div>
</template>

<script setup>
</script>

<style scoped>
.tissue-canvas-placeholder {
  width: 100%;
  flex: 1 1 0%;
  min-height: 400px;
  background: var(--grey-50);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-soft);
  margin-bottom: var(--space-md);
}
.tissue-label {
  color: var(--navy-50);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
}
</style>
