<template>
  <Workspace
    :title="uiText.TABS.metrics.title"
    :subtitle="uiText.TABS.metrics.subtitle"
    :statusIcon="uiText.TABS.metrics.statusIcon"
    :statusLabel="uiText.TABS.metrics.statusLabel"
    :statusDescription="uiText.TABS.metrics.statusDescription"
  >
    <div class="metrics-main">
      <!-- Left Column -->
      <section class="metrics-left metrics-col">
        <div class="metrics-left-stack">
          <div class="speckle-tower-wrapper">
            <!-- Global Score + Action Required Row -->
            <div class="metrics-top-row">
              <GlobalScore :selectedKPI="selectedKPI" />
              <ActionRequired :selectedKPI="selectedKPI" />
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
            <div class="metrics-toggles-center">
              <TowerSelector />
            </div>
          </div>
        </div>
      </section>
      <!-- Right Column -->
      <section class="metrics-right metrics-col">
        <div class="metrics-right-stack">
          <div class="metrics-kpis-wrapper">
            <KPIsOverview @selectKPI="onSelectKPI" :selectedKPI="selectedKPI" />
          </div>
          <div class="metrics-detail-wrapper">
            <div class="metrics-detail-left">
              <VersionMetrics :selectedKPI="selectedKPI" />
            </div>
            <div class="metrics-detail-right">
              <TowerMetrics :selectedKPI="selectedKPI" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import TowerSelector from '../components/metrics/TowerSelector.vue';
import KPIsOverview from '../components/metrics/KPIsOverview.vue';
import TowerMetrics from '../components/metrics/TowerMetrics.vue';
import VersionMetrics from '../components/metrics/VersionMetrics.vue';
import ActionRequired from '../components/metrics/ActionRequired.vue';
import GlobalScore from '../components/metrics/GlobalScore.vue';
import ViewerPanel from '../components/metrics/ViewerPanel.vue';
import { speckleModels, speckleToken } from '../config/speckleModel.js';
import * as uiText from '../uitext.js';
import { METRICS } from '../benchmarks.js';

export default {
  name: 'MetricsView',
components: {
  Workspace,
  TowerSelector,
  KPIsOverview,
  TowerMetrics,
  VersionMetrics,
  ActionRequired,
  GlobalScore,
  ViewerPanel,
},
  data() {
    // Default to first KPI metric
    const firstKPI = uiText.KPIS.kpis[0]?.metrics[0]?.name || null;
    return {
      uiText,
      selectedKPI: firstKPI,
      projectId: speckleModels.metrics.projectId,
      inputModelId: [speckleModels.metrics.modelId],
      speckleToken,
      globalScore: 8.0 // Placeholder, update with actual calculation if needed
    };
  },
  computed: {
    selectedFilterConfig() {
      for (const section of uiText.KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === this.selectedKPI && metric.filter) {
            const benchmark = METRICS[metric.name];
            return {
              key: `properties.${metric.filter}`,
              label: metric.label,
              unit: metric.unit,
              left: benchmark?.left,
              right: benchmark?.right,
              benchmark: benchmark?.benchmark
            };
          }
        }
      }
      return null;
    }
  },
  methods: {
    onSelectKPI(name) {
      this.selectedKPI = name;
    },
    getKpiLabel(name) {
      for (const section of uiText.KPIS.kpis) {
        for (const metric of section.metrics) {
          if (metric.name === name) {
            return metric.label;
          }
        }
      }
      return name;
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
  /* Center toggles container */
  .metrics-toggles-center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-md);
}
.metrics-explorer-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  margin-bottom: var(--space-lg);
}
.metrics-detail-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.metrics-detail-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
