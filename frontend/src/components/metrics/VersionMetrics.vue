<template>
  <div class="version-metrics-title card version-metrics-container">
    <div class="card-title">
      {{ selectedMetric?.label }} History
    </div>
    <VersionHistoryDiagram :selectedMetric="selectedMetric" :history="mockHistory" />
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
    selectedMetric: Object,
    value: [Number, String]
  },
  computed: {
    mockHistory() {
      // Generate 4 values: latest is real, previous are ±10% random or between 0 and 10 if latest is 0
      const arr = [];
      let latest = typeof this.value === 'number' ? this.value : parseFloat(this.value);
      if (isNaN(latest)) latest = 0;
      arr.push(latest);
      for (let i = 1; i < 4; i++) {
        if (latest === 0) {
          // If the real value is 0, use a random value between 0 and 10
          latest = +(Math.random() * 10).toFixed(2);
        } else {
          // Random between -10% and +10%
          const factor = 1 + (Math.random() * 0.2 - 0.1);
          latest = +(latest * factor).toFixed(2);
        }
        arr.unshift(latest); // older first
      }
      return arr;
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
 .version-metrics-title .card-title {
   margin-bottom: 0;
 }
 .version-metrics-container {
   display: flex;
   flex-direction: column;
   align-items: stretch;
   width: 100%;
   min-height: 0;
   flex: 1 1 0%;
   box-sizing: border-box;
   gap: 0;
 }
</style>
