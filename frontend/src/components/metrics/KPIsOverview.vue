<template>
  <div class="kpis-grid card">
    <div class="card-title">{{ uitext.KPIS.sectionTitle }}</div>
    <div class="kpis-grid-inner">
      <div v-for="(col, i) in columns" :key="i" class="kpi-column">
        <div class="kpi-column-title">{{ uitext.KPIS.kpis[i]?.name }}</div>
        <div v-for="(kpi, j) in col" :key="kpi.label" class="kpi-card">
          {{ uitext.KPIS.kpis[i]?.metrics[j]?.label || 'KPI' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as uitext from '../../uitext.js'

const columns = uitext.KPIS.kpis.map(kpi => kpi.metrics)
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
}
</style>
