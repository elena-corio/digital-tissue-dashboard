<template>
  <div class="kpis-grid card">
    <div class="card-title">{{ uitext.KPIS.sectionTitle }}</div>
    <div class="kpis-grid-inner">
      <div v-for="(col, i) in columns" :key="i" class="kpi-column">
        <div class="kpi-column-title">{{ uitext.KPIS.kpis[i]?.name }}</div>
        <div v-for="(kpi, j) in col" :key="kpi.label" class="card kpi-card">
          <div class="kpi-label">{{ uitext.KPIS.kpis[i]?.metrics[j]?.label || 'KPI' }}</div>
          <div class="kpi-bar-wrapper">
            <div class="kpi-bar">
              <span
                class="kpi-diamond"
                :style="{ left: getDiamondPosition(uitext.KPIS.kpis[i]?.metrics[j]?.name) }"
              >◆</span>
              <span
                class="kpi-bar-benchmark"
                :style="{ left: getDiamondPosition(uitext.KPIS.kpis[i]?.metrics[j]?.name) }"
              >{{ getBenchmarkValue(uitext.KPIS.kpis[i]?.metrics[j]?.name) }}</span>
            </div>
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
import { normalize } from '../../utils/normalize.js'

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
function getDiamondPosition(metricName) {
  const metric = METRICS[metricName]
  if (!metric || metric.benchmark === undefined) return '0%'
  const norm = normalize(metric.benchmark, metric.min, metric.max, metric.type)
  return `${Math.round(norm * 100)}%`
}
function getBenchmarkValue(metricName) {
  const metric = METRICS[metricName]
  if (!metric || metric.benchmark === undefined) return ''
  return formatValue(metric.benchmark)
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
  color: var(--navy-100);
  font-size: var(--font-size-body);
}
.kpi-card {
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.kpi-label {
  color: var(--navy-100);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  font-weight: var(--font-weight-bold);
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
  width: 90%;
  height: 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-error), var(--color-success));
  margin: 0.5rem 0 0 0;
  position: relative;
}
.kpi-diamond {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: var(--navy-100);
  z-index: 2;
}
.kpi-bar-benchmark {
  position: absolute;
  top: 120%;
  transform: translate(-50%, 0);
  font-size: var(--font-size-value);
  color: var(--navy-50);
  min-width: 32px;
  text-align: center;
  margin-top: 0.15rem;
}
.kpi-bar-min,
.kpi-bar-max {
  font-size: var(--font-size-value);
  color: var(--navy-50);
  min-width: 32px;
  text-align: center;
}
.kpi-bar-values {
  width: 240px;
  display: flex;
  justify-content: space-between;
}
</style>
