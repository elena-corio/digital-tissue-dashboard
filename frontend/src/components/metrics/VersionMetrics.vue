<template>
  <div class="version-metrics-title card">
    <div class="card-title">
      {{ kpiLabel }} History
    </div>
    <VersionHistoryDiagram :selectedKPI="selectedKPI" />
  
  </div>
</template>

<script>
import * as uitext from '../../uitext.js';
import VersionHistoryDiagram from './VersionHistoryDiagram.vue';

export default {
  name: 'VersionMetrics',
  components: {
    VersionHistoryDiagram
  },
  props: {
    selectedKPI: String
  },
  computed: {
    kpiLabel() {
      for (const section of uitext.KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === this.selectedKPI) {
            return metric.label;
          }
        }
      }
      return this.selectedKPI;
    }
  }
};
</script>

<style scoped>
 .version-metrics-title {
   color: var(--navy-50);
   font-family: var(--font-family);
   position: relative;
 }
</style>
