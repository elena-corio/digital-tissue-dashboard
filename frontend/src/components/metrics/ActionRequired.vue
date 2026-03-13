<template>
  <div :class="['card', 'action-required-placeholder', statusClass]">
    <div class="card-title">{{ statusClass === 'success' ? 'On track' : 'Action Required' }}</div>
    <div v-if="statusClass === 'success'">
      The {{ getLabel(selectedKPI) }} meets the benchmark. Keep up the good work.
    </div>
    <div v-else>
      The {{ getLabel(selectedKPI) }} does not meet the benchmark. {{ getAction(selectedKPI) }}
    </div>
  </div>
</template>

<script>
import { KPIS } from '../../uitext.js';
import { METRICS } from '../../benchmarks.js';
import cacheData from '../../assets/cache/data.json';
export default {
    methods: {
      getLabel(name) {
        for (const section of KPIS.kpis) {
          for (const metric of section.metrics) {
            if (metric.name === name) return metric.label;
          }
        }
        return name;
      },
      getAction(name) {
        for (const section of KPIS.kpis) {
          for (const metric of section.metrics) {
            if (metric.name === name) return metric.action || '';
          }
        }
        return '';
      }
    },
  name: 'ActionRequired',
  props: {
    selectedKPI: String
  },
  computed: {
    statusClass() {
      if (!this.selectedKPI) return '';
      const metric = METRICS[this.selectedKPI];
      const value = cacheData.project[this.selectedKPI];
      if (!metric || value === undefined) return '';
      // If left < right, success if value >= benchmark, else error
      // If left > right, success if value <= benchmark, else error
      if (metric.left < metric.right) {
        return value >= metric.benchmark ? 'success' : 'warning';
      } else {
        return value <= metric.benchmark ? 'success' : 'warning';
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
