<template>
  <div class="version-metrics-title card version-metrics-container">
    <div class="card-title">
      {{ selectedMetric?.label }} History
    </div>
    <div style="margin-top: 1.5rem; width: 100%; flex: 1 1 0%; min-height: 0; display: flex; flex-direction: column;">
      <VersionHistoryDiagram :selectedMetric="selectedMetric" />
    </div>
  </div>
</template>

<script>
import VersionHistoryDiagram from './VersionHistoryDiagram.vue';

export default {
  name: 'VersionMetrics',
  components: {
    VersionHistoryDiagram
  },
  props: {
    selectedMetric: Object
  }
};
</script>

<style scoped>
 .version-metrics-title {
   color: var(--navy-50);
   font-family: var(--font-family);
   position: relative;
 }
 .version-metrics-container {
   display: flex;
   flex-direction: column;
   align-items: stretch;
   width: 100%;
   min-height: 0;
   flex: 1 1 0%;
   box-sizing: border-box;
 }
</style>
