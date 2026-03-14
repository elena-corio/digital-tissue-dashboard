<template>
  <div :class="['card', 'action-required-placeholder', statusClass]">
    <div class="card-title">{{ statusClass === 'success' ? 'On track' : 'Action Required' }}</div>
    <div v-if="statusClass === 'success'">
      The {{ selectedMetric?.label }} meets the benchmark. Keep up the good work.
    </div>
    <div v-else>
      The {{ selectedMetric?.label }} does not meet the benchmark. {{ selectedMetric?.action || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionRequired',
  props: {
    selectedMetric: Object,
    value: [Number, String]
  },
  computed: {
    statusClass() {
      if (!this.selectedMetric || this.value === undefined) return '';
      if (this.selectedMetric.left < this.selectedMetric.right) {
        return this.value >= this.selectedMetric.benchmark ? 'success' : 'warning';
      } else {
        return this.value <= this.selectedMetric.benchmark ? 'success' : 'warning';
      }
    }
  }
};
</script>

<style scoped>
.action-required-placeholder {
  color: var(--navy-100);
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  transition: box-shadow 0.2s;
  gap: var(--space-md);
}
.success {
  background: color-mix(in srgb, var(--color-success) 20%, transparent);
  border-color: var(--color-success);
}
.warning {
  background: color-mix(in srgb, var(--color-error) 20%, transparent);
  border-color: var(--color-error);
}
</style>
