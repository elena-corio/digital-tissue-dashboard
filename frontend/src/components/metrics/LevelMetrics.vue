<template>
  <div class="level-metrics-placeholder card">Level Metrics: {{ selectedKPI || 'None' }}</div>
</template>

<script>
export default {
  name: 'LevelMetrics',
  props: {
    selectedKPI: String
  }
};
</script>

<style scoped>
.level-metrics-placeholder {
  text-align: center;
  color: #666;
}
</style>
