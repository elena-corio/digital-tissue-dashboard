<template>
  <div class="status-indicator">
    <span class="status-icon">💓</span>
    <span class="status-label">{{ uitext.PULSE.label }}</span>
    <span class="status-value">{{ uitext.PULSE.value }}</span>
    <span class="status-desc">- {{ uitext.PULSE.status }}</span>
  </div>
</template>

<script setup>
import * as uitext from '../uitext.js'
</script>

<style scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-body);
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--grey-100);
  margin-left: var(--space-lg);
}

.status-indicator:hover {
   box-shadow: var(--shadow-card);
}

.status-icon {
  font-size: 1.5rem;
}
.status-label {
  font-weight: 600;
  color: var(--navy-100);
}
.status-value {
  font-weight: 500;
  color: var(--blue-100);
}
.status-desc {
  font-size: 0.95rem;
  color: var(--navy-50);
}
</style>
