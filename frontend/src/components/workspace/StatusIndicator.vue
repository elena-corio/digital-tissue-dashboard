<template>
  <div class="status-indicator">
    <span class="status-icon">{{ icon }}</span>
    <span class="status-label">{{ label }}</span>
    <span class="status-value">{{ value }}%</span>
    <span class="status-info-wrapper">
      <svg class="status-info-icon" width="18" height="18" viewBox="0 0 18 18">
        <circle cx="9" cy="9" r="8" fill="#e3f0fc" stroke="#4697e3" stroke-width="1" />
        <text x="9" y="13" text-anchor="middle" font-size="12" fill="#4697e3" font-family="Arial">i</text>
      </svg>
      <span class="status-tooltip">{{ description }}</span>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  description: String,
  value: Number,
  icon: {
    type: String,
    default: '💓'
  }
});
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
  position: relative;
}
.status-info-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
}
.status-info-icon {
  cursor: pointer;
  margin-right: 4px;
}
.status-tooltip {
  display: none;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--white, #fff);
  color: var(--navy-100);
  border: 1px solid var(--grey-100);
  border-radius: var(--radius-md);
  padding: 4px 12px;
  font-size: var(--font-size-caption);
  white-space: nowrap;
  z-index: 10;
  box-shadow: var(--shadow-soft);
}
.status-info-wrapper:hover .status-tooltip {
  display: block;
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
  color: var(--navy-100);
}
</style>
