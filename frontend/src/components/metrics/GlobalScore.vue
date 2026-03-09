<template>
  <div class="metrics-global-score-card card">
    <div class="card-title">{{ getKpiLabel(selectedKPI) }}</div>
    <ul class="metrics-score-list">
      <li class="metrics-score-item">
        <span class="metrics-score-label">Global Value</span>
        <span class="metrics-score-value">{{ getMetricValue(selectedKPI) }}</span>
      </li>
      <li class="metrics-score-item">
        <span class="metrics-score-label">{{ getPrefix(selectedKPI) }} Benchmark</span>
        <span class="metrics-score-value">{{ getBenchmark(selectedKPI) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { KPIS } from '../../uitext.js';
import { METRICS } from '../../benchmarks.js';
import cacheData from '../../assets/cache/data.json';

export default {
  name: 'GlobalScore',
  props: {
    selectedKPI: {
      type: String,
      required: true
    }
  },
  methods: {
    getKpiLabel(name) {
      for (const section of KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === name) {
            return metric.label;
          }
        }
      }
      return name;
    },
    getUnit(name) {
      for (const section of KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === name) {
            return metric.unit || '';
          }
        }
      }
      return '';
    },
    getMetricValue(name) {
      const value = cacheData.project[name];
      const unit = this.getUnit(name);
      if (typeof value === 'number') return value.toFixed(2) + (unit ? ' ' + unit : '');
      if (value !== undefined && value !== null) return value + (unit ? ' ' + unit : '');
      return '-' + (unit ? ' ' + unit : '');
    },
    getPrefix(name) {
      const metric = METRICS[name];
      if (!metric) return '';
      if (metric.left > metric.right) return 'Upper';
      else if (metric.left < metric.right) return 'Lower';
      return '';
    },
    getBenchmark(name) {
      const metric = METRICS[name];
      const unit = this.getUnit(name);
      if (!metric) return '-';
      if (typeof metric.benchmark === 'number') return metric.benchmark.toFixed(2) + (unit ? ' ' + unit : '');
      return metric.benchmark ?? '-' + (unit ? ' ' + unit : '');
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
