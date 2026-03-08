<template>
  <div class="kpis-grid card">
    <div class="card-title">{{ uitext.KPIS.sectionTitle }}</div>
    <div class="kpis-grid-inner">
      <div v-for="(col, i) in columns" :key="i" class="kpi-column">
        <div class="kpi-column-title">{{ uitext.KPIS.kpis[i]?.name }}</div>
        <div v-for="(kpi, j) in col" :key="kpi.label" class="kpi-card">
          <div class="kpi-label">{{ uitext.KPIS.kpis[i]?.metrics[j]?.label || 'KPI' }}</div>
          <div class="kpi-bar-wrapper">
            <div class="kpi-bar"></div>
            <div class="kpi-bar-values">
              <span class="kpi-bar-min">{{ getMin(uitext.KPIS.kpis[i]?.metrics[j]?.name) }}</span>
              <span class="kpi-bar-max">{{ getMax(uitext.KPIS.kpis[i]?.metrics[j]?.name) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as uitext from '../../uitext.js'
import { METRICS } from '../../benchmarks.js'

const columns = uitext.KPIS.kpis.map(kpi => kpi.metrics)

function formatValue(val) {
  if (val === '' || val === undefined) return '';
  return Number(val).toFixed(2);
}
function getMin(metricName) {
  const metric = METRICS[metricName]
  if (!metric) return ''
  return formatValue(metric.type === 'higher-is-better' ? metric.min : metric.max)
}
function getMax(metricName) {
  const metric = METRICS[metricName]
  if (!metric) return ''
  return formatValue(metric.type === 'higher-is-better' ? metric.max : metric.min)
}
</script>

<style scoped>
.kpis-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kpis-grid-inner {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.kpi-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.kpi-column-title {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-medium);
  color: var(--navy-50);
  margin-bottom: 0.25rem;
  text-align: center;
}
.kpi-card {
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  padding: 1rem;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.kpi-label {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
}
.kpi-bar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
.kpi-bar {
  width: 100%;
  height: 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-error), var(--color-success));
  margin: 0.5rem 0 0 0;
}
.kpi-bar-min,
.kpi-bar-max {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
  min-width: 40px;
  text-align: center;
  margin-top: 0.25rem;
}
.kpi-bar-values {
  width: 240px;
  display: flex;
  justify-content: space-between;
}
</style>
