<template>
  <div class="metrics-global-score-card card" :class="{ flipped: isFlipped }">
    <div class="flip-icon" @click.stop="toggleFlip" title="Show formula">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" fill="var(--grey-100)"/>
        <polygon points="7,8 11,4 15,8" fill="#888"/>
        <rect x="9.5" y="10" width="3" height="2" rx="1" fill="#888"/>
        <polygon points="7,14 11,18 15,14" fill="#888"/>
      </svg>
    </div>
    <div v-if="!isFlipped">
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
    <div v-else class="formula-card-back">
      <div class="card-title">{{ selectedMetric?.label }}</div>
      <div class="formula-content">{{ formulaText }}</div>
    </div>
  </div>
</template>

<script>
import { METRICS } from '../../benchmarks.js';
import * as uiText from '../../uiText.js';
export default {
  name: 'GlobalScore',
  props: {
    selectedMetric: {
      type: Object,
      required: true
    },
    value: [Number, String]
  },
  data() {
    return {
      isFlipped: false
    };
  },
  computed: {
    metricValue() {
      if (this.value !== undefined && this.value !== null && this.value !== '') {
        const unit = this.selectedMetric?.unit || '';
        let v = typeof this.value === 'string' ? Number(this.value) : this.value;
        if (typeof v === 'number' && !isNaN(v)) return v.toFixed(2) + (unit ? ' ' + unit : '');
        if (v !== undefined && v !== null) return v + (unit ? ' ' + unit : '');
      }
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.data) return '-';
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
    formulaText() {
      // Find the formula from uiText.KPIS config for the selected metric
      const name = this.selectedMetric?.name;
      if (!name) return '';
      for (const group of uiText.KPIS.kpis) {
        for (const metric of group.metrics) {
          if (metric.name === name) {
            return metric.formula || 'No formula available.';
          }
        }
      }
      return 'No formula available.';
    }
  },
  methods: {
    toggleFlip() {
      this.isFlipped = !this.isFlipped;
    }
  }
};
</script>

<style scoped>
.metrics-global-score-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  min-height: 120px;
  transition: transform 0.4s;
  perspective: 800px;
}
.flip-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2;
  background: none;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.metrics-global-score-card .card-title {
  margin-right: 32px;
}
.metrics-global-score-card.flipped {
  border: 2px solid var(--navy-50);
}
.formula-card-back {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  color: var(--navy-100);
  box-sizing: border-box;
  flex: 1 1 auto;
}
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
</style>
