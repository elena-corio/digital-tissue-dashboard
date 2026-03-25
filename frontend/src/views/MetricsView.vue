<template>
  <div v-if="loading" class="metrics-loading">
    <div class="spinner"></div>
    <p>Loading Speckle data...</p>
  </div>
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
          <div class="metrics-explorer-card card" style="position:relative;">
            <div class="card-title" style="position:relative;">
              <span v-if="selectedKPI">3D Viewer </span>
              <ViewerLegend v-if="legendItems && legendItems.length" :items="legendItems" />

            </div>
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
import ViewerLegend from '../components/metrics/ViewerLegend.vue';
import { useSpeckleData } from '../composables/useSpeckleData';
import { speckleModels, speckleToken } from '../config/speckleConfig.js';
import * as uiText from '../uiText.js';
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
    ViewerLegend
  },
  props: {
    kpiStatus: Array,
    kpisOnTargetPercent: Number,
    calculateKPIStatus: Function
  },

  computed: {
    legendItems() {
      const metric = this.selectedMetric;
      if (!metric) return [];
      // Categorical (program): show color for each category
      if (metric.filter === 'program') {
        // Use the same palette as in SpeckleViewer
        const palette = [
          '#4697e3', '#e7882f', '#f0b43a', '#6ecb8a', '#c65fa0',
          '#5bb8d4', '#e06060', '#a3c96e', '#b07cd6', '#f2c96e'
        ];
        // Collect unique program names from latest data
        const elements = this.speckleData?.latest?.data?.elements;
        if (!Array.isArray(elements) || elements.length === 0) return [];
        const programs = [...new Set(elements.map(e => e?.properties?.program).filter(Boolean))];
        return programs.map((prog, i) => ({ color: palette[i % palette.length], label: prog }));
      } else {
        // Numeric: show min, benchmark, max
        const left = metric.left;
        const right = metric.right;
        const benchmark = metric.benchmark;
        // Use same colors as in SpeckleViewer
        const ERROR_COLOR = '#e7882f';
        const SUCCESS_COLOR = '#4697e3';
        const items = [];
        if (typeof left === 'number') {
          items.push({ color: ERROR_COLOR, label: left.toFixed(2) });
        } else if (left !== undefined) {
          items.push({ color: ERROR_COLOR, label: left });
        }
        if (typeof benchmark === 'number') {
          // Interpolate color for benchmark
          const t = (typeof left === 'number' && typeof right === 'number') ? Math.max(0, Math.min(1, (benchmark - left) / (right - left))) : 0.5;
          const lerpColor = (hex1, hex2, t) => {
            const r1 = parseInt(hex1.slice(1,3),16), g1 = parseInt(hex1.slice(3,5),16), b1 = parseInt(hex1.slice(5,7),16);
            const r2 = parseInt(hex2.slice(1,3),16), g2 = parseInt(hex2.slice(3,5),16), b2 = parseInt(hex2.slice(5,7),16);
            const r = Math.round(r1+(r2-r1)*t), g = Math.round(g1+(g2-g1)*t), b = Math.round(b1+(b2-b1)*t);
            return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
          };
          items.push({ color: lerpColor(ERROR_COLOR, SUCCESS_COLOR, t), label: benchmark.toFixed(2) });
        }
        if (typeof right === 'number') {
          items.push({ color: SUCCESS_COLOR, label: right.toFixed(2) });
        } else if (right !== undefined) {
          items.push({ color: SUCCESS_COLOR, label: right });
        }
        return items;
      }
    },
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
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.latest || !this.speckleData.latest.data) return undefined;
      if (!this.speckleData.latest.data.properties) return undefined;
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
      refresh
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
      if (!this.selectedMetric || !this.speckleData || !this.speckleData.latest || !this.speckleData.latest.data) return undefined;
      if (!this.speckleData.latest.data.properties) return undefined;
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
  },
  mounted() {
    const { title, subtitle, statusIcon, statusLabel, statusDescription, statusValue } = useWorkspaceUI();
    title.value = uiText.TABS.metrics.title;
    subtitle.value = uiText.TABS.metrics.subtitle;
    statusIcon.value = uiText.TABS.metrics.statusIcon;
    statusLabel.value = uiText.TABS.metrics.statusLabel;
    statusDescription.value = uiText.TABS.metrics.statusDescription;
    statusValue.value = this.kpisOnTargetPercent;
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('legendItems:', this.legendItems);
      // eslint-disable-next-line no-console
      console.log('selectedMetric:', this.selectedMetric);
      // eslint-disable-next-line no-console
      console.log('elements:', this.speckleData?.latest?.data?.elements);
    }
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

.metrics-loading, .metrics-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: var(--navy-100);
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4697e3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
