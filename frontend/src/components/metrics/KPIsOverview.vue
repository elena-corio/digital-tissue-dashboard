<template>
  <div class="kpis-grid card">
    <div class="card-title">{{ uiText.KPIS.sectionTitle }}</div>
    <div class="kpis-grid-inner">
      <div v-for="(col, i) in columns" :key="i" class="kpi-column">
        <div class="kpi-column-title">{{ uiText.KPIS.kpis[i]?.name }}</div>
          <div
           v-for="(kpi, j) in col"
           :key="kpi.label"
           class="card kpi-card"
           @click="selectKPI(kpi.name)"
           :style="{
             opacity: isSelected(kpi.name) ? 1 : 0.4,
             cursor: 'pointer',
             transition: 'opacity 0.2s, border-color 0.2s, border-width 0.2s',
           }"
           @mouseenter="hoveredKPI = uiText.KPIS.kpis[i]?.metrics[j]?.name"
           @mouseleave="hoveredKPI = null"
          >
            <div class="kpi-label">
              {{ uiText.KPIS.kpis[i]?.metrics[j]?.label || 'KPI' }}
              <span v-if="uiText.KPIS.kpis[i]?.metrics[j]?.unit" class="kpi-unit">{{ uiText.KPIS.kpis[i]?.metrics[j]?.unit }}</span>
              <span v-if="hoveredKPI === uiText.KPIS.kpis[i]?.metrics[j]?.name" class="kpi-hover-value">
                {{ getKPIValue(uiText.KPIS.kpis[i]?.metrics[j]?.name) }}
              </span>
            </div>
          <div class="kpi-bar-wrapper">
            <div class="kpi-bar">
              <!-- Loaded value bar -->
              <span
                class="kpi-loaded-bar"
                :style="getLoadedBarStyle(uiText.KPIS.kpis[i]?.metrics[j]?.name)"
              ></span>
              <!-- Benchmark diamond and value -->
              <span
                class="kpi-diamond"
                :style="{ left: getDiamondPosition(uiText.KPIS.kpis[i]?.metrics[j]?.name) }"
              >◆</span>
            </div>
            <div class="kpi-bar-values">
              <span class="kpi-bar-left">{{ getLeft(uiText.KPIS.kpis[i]?.metrics[j]?.name) }}</span>
              <span class="kpi-bar-right">{{ getRight(uiText.KPIS.kpis[i]?.metrics[j]?.name) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const hoveredKPI = ref(null)
function getKPIValue(metricName) {
  const metric = METRICS[metricName]
  const snakeKey = toSnakeCase(metricName)
  let value = props.speckleData?.data?.properties?.[snakeKey]
  if (typeof value === 'string') value = Number(value)
  if (!metric || value === undefined || isNaN(value)) return ''
  return formatValue(value)
}
import { defineEmits } from 'vue'
const emit = defineEmits(['selectKPI'])

// Accept speckleData as a prop
const props = defineProps({ selectedKPI: String, speckleData: Object })

function selectKPI(name) {
  emit('selectKPI', name)
}

function isSelected(name) {
  return props.selectedKPI === name
}

// Returns style for the loaded bar from left to normalized actual value
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

function getLoadedBarStyle(metricName) {
  const metric = METRICS[metricName]
  const snakeKey = toSnakeCase(metricName)
  let value = props.speckleData?.data?.properties?.[snakeKey]
  if (typeof value === 'string') value = Number(value)
  if (!metric || value === undefined || isNaN(value)) return {}
  const normActual = normalize(value, metric.left, metric.right)
  const normBenchmark = metric.benchmark !== undefined ? normalize(metric.benchmark, metric.left, metric.right) : 0.5
  // Clamp between 0 and 1
  const clamped = Math.max(0, Math.min(normActual, 1));
  const color = clamped >= normBenchmark ? 'var(--color-success)' : 'var(--color-error)';
  return {
    position: 'absolute',
    left: '0%',
    width: `${Math.round(clamped * 100)}%`,
    height: '10px',
    background: color,
    borderRadius: '8px',
    top: '0',
    zIndex: 1,
  }
}
import * as uiText from '../../uiText.js'
import { METRICS } from '../../benchmarks.js'
import { normalize } from '../../utils/normalize.js'

const columns = uiText.KPIS.kpis.map(kpi => kpi.metrics)

function formatValue(val) {
  if (val === '' || val === undefined) return '';
  return Number(val).toFixed(2);
}
function getLeft(metricName) {
  const metric = METRICS[metricName]
  if (!metric) return ''
  return formatValue(metric.left) }

function getRight(metricName) {
  const metric = METRICS[metricName]
  if (!metric) return ''
  return formatValue(metric.right)
}
function getDiamondPosition(metricName) {
  const metric = METRICS[metricName]
  if (!metric || metric.benchmark === undefined) return '0%'
  const norm = normalize(metric.benchmark, metric.left, metric.right)
  const clamped = Math.max(0, Math.min(norm, 1));
  return `${Math.round(clamped * 100)}%`
}

</script>

<style scoped>
.kpi-hover-value {
  display: inline-block;
  background: var(--navy-10, #f0f4fa);
  color: var(--navy-100, #1a2233);
  border-radius: 6px;
  padding: 0.1em 0.5em;
  margin-left: 0.5em;
  font-size: var(--font-size-value);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: absolute;
  z-index: 10;
}
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
  color: var(--navy-50);
  font-size: var(--font-size-caption);
}
.kpi-card {
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.kpi-label {
  color: var(--navy-100);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  font-weight: var(--font-weight-bold);
}
.kpi-unit {
  font-size: var(--font-size-value);
  color: var(--navy-50);
  font-weight: normal;
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
  background: var(--grey-50);
  margin: 0.5rem 0 0 0;
  position: relative;
  overflow: visible;
}
.kpi-loaded-bar {
  position: absolute;
  height: 10px;
  border-radius: 8px;
  top: 0;
  left: 0;
  z-index: 1;
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
.kpi-bar-left,
.kpi-bar-right {
  font-size: var(--font-size-value);
  color: var(--navy-50);
  min-width: 32px;
  text-align: center;
}
.kpi-bar-values {
  width: 100%;
  max-width: 240px;
  display: flex;
  justify-content: space-between;
}
</style>
