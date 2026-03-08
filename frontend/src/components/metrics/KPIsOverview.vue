<template>
  <div class="kpis-grid card">
    <div v-for="col in 4" :key="col" class="kpi-column">
      <div v-for="row in 2" :key="row" class="kpi-card">
        KPI {{ (col - 1) * 2 + row }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KPIsOverview',
};
</script>

<style scoped>
.kpis-grid {
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
.kpi-card {
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  padding: 1rem;
  text-align: center;
  color: #666;
}
</style>
