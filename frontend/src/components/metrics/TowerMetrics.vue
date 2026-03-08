<template>
  <div class="tower-metrics-placeholder card">Tower Metrics: {{ selectedKPI || 'None' }}</div>
</template>

<script>
export default {
  name: 'TowerMetrics',
  props: {
    selectedKPI: String
  }
};
</script>

<style scoped>
.tower-metrics-placeholder {
  text-align: center;
  color: #666;
}
</style>
