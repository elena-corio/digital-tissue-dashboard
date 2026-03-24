<template>
  <div v-if="loading" class="metrics-loading">Loading Speckle data...</div>
  <div v-else-if="error" class="metrics-error">Error loading Speckle data: {{ error.message }}</div>
  <div v-else-if="!speckleData || !speckleData.latest">No data available</div>  
  <div v-else class="metrics-main">
    <!-- Left Column -->
    <section class="metrics-left metrics-col">
      <div class="metrics-left-stack">
        <div class="speckle-tower-wrapper">
          <!-- Global Score + Action Required Row -->
          <div class="metrics-top-row">
            <GlobalScore :selectedMetric="selectedMetric" :value="selectedMetricValue" />
            <ActionRequired :selectedMetric="selectedMetric" :value="selectedMetricValue" />
          </div>
          <!-- Viewer Card -->
          <div class="metrics-explorer-card card">
            <div class="card-title"><span v-if="selectedKPI">3D Viewer </span></div>
            <ViewerPanel
              v-model:modelIds="inputModelId"
              :projectId="projectId"
              :authToken="speckleToken"
              :filterConfig="selectedFilterConfig"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- Right Column -->
    <section class="metrics-right metrics-col">
      <div class="metrics-right-stack">
        <div class="metrics-kpis-wrapper">
          <KPIsOverview @selectKPI="onSelectKPI" :selectedKPI="selectedKPI" :speckleData="speckleData.latest" />
        </div>
        <div class="metrics-detail-wrapper">
          <div class="metrics-detail-left">
            <TowerMetrics :selectedMetric="selectedMetric" :speckleData="speckleData.latest" />
          </div>
          <div class="metrics-detail-right">
            <VersionMetrics :selectedMetric="selectedMetric" :value="selectedMetricValue" :history="metricHistory" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import KPIsOverview from '../components/metrics/KPIsOverview.vue';
import TowerMetrics from '../components/metrics/TowerMetrics.vue';
import VersionMetrics from '../components/metrics/VersionMetrics.vue';
import ActionRequired from '../components/metrics/ActionRequired.vue';
import GlobalScore from '../components/metrics/GlobalScore.vue';
import ViewerPanel from '../components/metrics/ViewerPanel.vue';

// (no ref import needed)
import { useSpeckleData } from '../composables/useSpeckleData';
import { speckleModels, speckleToken } from '../config/speckleConfig.js';
import * as uiText from '../uiText.js';
import { onMounted, watch, computed } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { METRICS } from '../benchmarks.js';

export default {
  name: 'MetricsView',
  components: {
    KPIsOverview,
    TowerMetrics,
    VersionMetrics,
    ActionRequired,
    GlobalScore,
    ViewerPanel,
  },
  data() {
    const { data: speckleData, loading, error, refresh, kpiStatus } = useSpeckleData();
    return {
      uiText,
      selectedKPI: uiText.KPIS.kpis[0]?.metrics[0]?.name || null,
      projectId: speckleModels.metrics.projectId,
      inputModelId: [speckleModels.metrics.modelId],
      speckleToken: speckleToken,
      speckleData,
      loading,
      error,
      refresh,
      kpiStatus

    };
  },
  computed: {
    selectedMetric() {
      for (const section of uiText.KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === this.selectedKPI) {
            const bm = METRICS[metric.name] || {};
            return { ...metric, left: bm.left, right: bm.right, benchmark: bm.benchmark };
          }
        }
      }
      return null;
    },
    selectedMetricValue() {
      // Use the latest version's properties
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.latest || !this.speckleData.latest.data || !this.speckleData.latest.data.properties) return undefined;
      const metricName = this.selectedMetric.name;
      const snakeKey = metricName ? metricName.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`) : '';
      return this.speckleData.latest.data.properties[snakeKey];
    },
    metricHistory() {
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.versions) return [];
      const key = this.selectedMetric.name.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
      return this.speckleData.versions
        .map(v => v.data?.properties?.[key])
        .filter(v => typeof v === 'number' && !isNaN(v));
    },
    selectedFilterConfig() {
      const m = this.selectedMetric;
      if (!m || !m.filter) return null;
      return {
        key: `properties.${m.filter}`,
        label: m.label,
        unit: m.unit,
        left: m.left,
        right: m.right,
        benchmark: m.benchmark
      };
    }
  },
  methods: {
    onSelectKPI(name) {
      this.selectedKPI = name;
    }
  }
    ,
    mounted() {
  const { title, subtitle, statusIcon, statusLabel, statusDescription, statusValue,  kpiStatus, kpisOnTargetPercent } = useWorkspaceUI();
  title.value = uiText.TABS.metrics.title;
  subtitle.value = uiText.TABS.metrics.subtitle;
  statusIcon.value = uiText.TABS.metrics.statusIcon;
  statusLabel.value = uiText.TABS.metrics.statusLabel;
  statusDescription.value = uiText.TABS.metrics.statusDescription;
  kpiStatus.value = this.kpiStatus();
  statusValue.value = kpisOnTargetPercent.value;

  this.$watch(
    () => this.kpiStatus(),
    (newVal) => {
      kpiStatus.value = newVal;
      statusValue.value = kpisOnTargetPercent.value;
    },
    { immediate: true, deep: true }
  );
}
};
</script>

<style scoped>
.metrics-top-row {
  display: flex;
  flex-direction: row;
  gap: var(--space-md);
  width: 100%;
  flex: 0 0 auto;
}
.metrics-top-row > * {
  flex: 1 1 0%;
  min-width: 0;
}

.metrics-action-required-card {
  flex: 1 1 0%;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
 .viewer-container.aspect {
   aspect-ratio: 16 / 9;
   width: 100%;
   min-height: 120px;
 }
.metrics-main {
  display: flex;
  flex: 1 1 auto;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  align-items: stretch;
  min-height: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
}
.metrics-left.metrics-col {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
}
.metrics-right.metrics-col {
  display: flex;
  flex-direction: column;
  flex: 1.5 1.5 0%;
  min-height: 0;
}
.metrics-left-stack {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
}
.metrics-global-score-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.metrics-action-required-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.speckle-tower-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-md);
  flex: 1 1 0%;
  min-height: 0;
}
.metrics-explorer-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 0%;
  min-height: 0;
  overflow: hidden;
}
.metrics-explorer-card .card-title {
  margin-bottom: var(--space-sm);
}
.speckle-viewer-card {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-body);
  color: #888;
}
.speckle-viewer-card.viewer-container.aspect {
  width: 100%;
}
.metrics-right-stack {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  gap: 1rem;
}
.metrics-kpis-wrapper {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  min-height: 0;
  max-height: 30%;
  overflow: auto;
}
.metrics-detail-wrapper {
  display: flex;
  flex: 1 1 0%;
  gap: var(--space-md);
  min-height: 0;
  overflow: hidden;
}
.metrics-detail-left {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.metrics-detail-right {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
