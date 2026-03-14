<template>
  <div class="metrics-global-score-card card">
    <div class="card-title">{{ selectedMetric?.label }}</div>
    <ul class="metrics-score-list">
      <li class="metrics-score-item">
        <span class="metrics-score-label">Global Value</span>
        <span class="metrics-score-value">{{ metricValue }}</span>
      </li>
      <li class="metrics-score-item">
        <span class="metrics-score-label">Benchmark</span>
        <span class="metrics-score-value">{{ benchmarkValue }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GlobalScore',
  props: {
    selectedMetric: {
      type: Object,
      required: true
    },
    value: [Number, String]
  },
  computed: {
    metricValue() {
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.data) return '-';
      // Convert metric name to snake_case
      const snakeKey = this.selectedMetric.name.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
      let value = this.speckleData.data.properties?.[snakeKey];
      const unit = this.selectedMetric.unit || '';
      if (typeof value === 'string') value = Number(value);
      if (typeof value === 'number') return value.toFixed(2) + (unit ? ' ' + unit : '');
      if (value !== undefined && value !== null) return value + (unit ? ' ' + unit : '');
      return '-';
    },
    benchmarkValue() {
      if (!this.selectedMetric) return '-';
      const bm = this.selectedMetric.benchmark;
      const unit = this.selectedMetric.unit || '';
      if (typeof bm === 'number') return bm.toFixed(2) + (unit ? ' ' + unit : '');
      return bm ?? '-';
    },
    displayValue() {
      return this.value;
    }
  }
};
</script>

<style scoped>
.metrics-score-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.metrics-score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--grey-100);
  font-size: var(--font-size-body);
}
.metrics-score-item:last-child {
  border-bottom: none;
}
.metrics-score-label {
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
.metrics-score-value {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
  font-weight: var(--font-weight-regular);
}
.metrics-global-score-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
