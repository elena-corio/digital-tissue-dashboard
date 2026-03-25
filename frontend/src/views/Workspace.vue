<template>
  <div class="workspace-root">
    <div class="workspace-header">
      <HeaderBar />
    </div>
    <div class="workspace-title-row">
      <div class="workspace-title-block">
        <h2 class="h2">{{ title }}</h2>
        <div class="subtitle">{{ subtitle }}</div>
      </div>
      <div class="workspace-status-indicator">
        <StatusIndicator
          :icon="statusIcon"
          :label="statusLabel"
          :description="statusDescription"
          :value="loading || statusValue == null || isNaN(statusValue) ? 0 : statusValue"
        />
      </div>
    </div>
    <div class="workspace-content">
      <div v-if="loading" class="workspace-loading">
        <div class="spinner"></div>
        <p>Loading workspace data...</p>
      </div>
      <div v-else-if="error" class="workspace-error">
        <p>Error loading data: {{ error.message }}</p>
      </div>
      <div v-else>
        <router-view
          :tissueExpansion="tissueExpansion"
          :kpisOnTargetPercent="kpisOnTargetPercent"
          :bodyBalance="bodyBalance"
          :title="title"
          :subtitle="subtitle"
          :statusIcon="statusIcon"
          :statusLabel="statusLabel"
          :statusDescription="statusDescription"
          :statusValue="statusValue"
          :latestUpdate="latestUpdate"
          :kpiStatus="kpiStatus" 
        />
      </div>
    </div>
  </div>
</template>

<script>

import HeaderBar from '../components/workspace/HeaderBar.vue';
import StatusIndicator from '../components/workspace/StatusIndicator.vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { useSpeckleData } from '../composables/useSpeckleData';
import { watch, computed } from 'vue';
import { METRICS } from '../benchmarks.js';
import { TABS, SITE } from '../uiText.js';
    import { useRoute } from 'vue-router';



export default {
  name: 'Workspace',
  components: {
    HeaderBar,
    StatusIndicator
  },
  setup() {
    const {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue,
      kpiStatus,
    } = useWorkspaceUI();
    // Fetch data at the parent level
    const { data: speckleData, loading, error, kpiStatus: getKpiStatus } = useSpeckleData();

    // Compute metrics based on fetched data
    const tissueExpansion = computed(() => {
      const latest = speckleData.value?.latest;
      const properties = latest?.data?.properties;
      console.log('DEBUG tissueExpansion:', { latest, properties });
      const gfaRaw = properties?.gross_floor_area;
      const gfa = typeof gfaRaw === 'string' ? parseFloat(gfaRaw) : gfaRaw;
      const target = 1000000;
      if (!gfa || !target || isNaN(gfa)) return 0;
      return Math.round((gfa / target) * 100);
    });

    function toSnakeCase(str) {
      return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    function calculateKPIStatus(properties) {
      if (!properties) return [];
      const result = [];
      for (const [metricKey, { left, right, benchmark }] of Object.entries(METRICS)) {
        const snakeKey = toSnakeCase(metricKey);
        const value = properties[snakeKey];
        if (typeof value !== 'number' || isNaN(value)) {
          result.push({ name: metricKey, value: undefined, onTarget: false });
          continue;
        }
        let onTarget = false;
        if (left < right) {
          onTarget = value >= benchmark;
        } else {
          onTarget = value <= benchmark;
        }
        result.push({ name: metricKey, value, onTarget });
      }
      return result;
    }
    const kpisOnTargetPercent = computed(() => {
      const latest = speckleData.value?.latest;
      const properties = latest?.data?.properties;
      console.log('DEBUG kpisOnTargetPercent:', { latest, properties });
      const kpis = calculateKPIStatus(properties);
      if (!kpis || !kpis.length) return 0;
      let onTargetCount = 0;
      let total = 0;
      for (const [metricKey, { left, right, benchmark }] of Object.entries(METRICS)) {
        const kpi = kpis.find(k => k.name === metricKey);
        if (!kpi || typeof kpi.value !== 'number' || isNaN(kpi.value)) continue;
        let onTarget = false;
        if (left < right) {
          onTarget = kpi.value >= benchmark;
        } else {
          onTarget = kpi.value <= benchmark;
        }
        if (onTarget) onTargetCount++;
        total++;
      }
      if (total === 0) return 0;
      return Math.round((onTargetCount / total) * 100);
    });

    // Replace bodyBalance with percent of HB03
    // Pass raw fraction (0-1) for HB03
    const bodyBalance = computed(() => {
      const totalArea = SITE.hypersArea.hb01 + SITE.hypersArea.hb02 + SITE.hypersArea.hb03;
      if (!totalArea) return 0;
      return SITE.hypersArea.hb03 / totalArea;
    });

    // Always unwrap kpiStatus if it's a ref
    const kpiStatusUnwrapped = computed(() => {
      return kpiStatus && typeof kpiStatus.value !== 'undefined' ? kpiStatus.value : kpiStatus;
    });

    // Watch for speckleData changes and update kpiStatus in useWorkspaceUI
    watch(
      () => speckleData.value?.latest?.data?.properties,
      (properties) => {
        if (properties) {
          kpiStatus.value = calculateKPIStatus(properties);
        }
      },
      { immediate: true }
    );

    // Watch route and update workspace UI state for each tab
    const route = useRoute();
    watch(
      () => route.name,
      (name) => {
        if (name === 'Site') {
          title.value = TABS.site.title;
          subtitle.value = TABS.site.subtitle;
          statusIcon.value = TABS.site.statusIcon;
          statusLabel.value = TABS.site.statusLabel;
          statusDescription.value = TABS.site.statusDescription;
          statusValue.value = bodyBalance.value;
        } else if (name === 'Dashboard' || name === 'Overview') {
          title.value = TABS.overview.title;
          subtitle.value = TABS.overview.subtitle;
          statusIcon.value = TABS.overview.statusIcon;
          statusLabel.value = TABS.overview.statusLabel;
          statusDescription.value = TABS.overview.statusDescription;
          statusValue.value = Math.round((bodyBalance.value + tissueExpansion.value + kpisOnTargetPercent.value) / 3);
        }
        // Add more tabs as needed
      },
      { immediate: true }
    );

    // Compute latest update date from speckleData
    const latestUpdate = computed(() => {
      const latest = speckleData.value?.latest;
      return latest?.createdAt || null;
    });

    return {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue,
      speckleData,
      loading,
      error,
      tissueExpansion,
      kpisOnTargetPercent,
      bodyBalance,
      latestUpdate,
      kpiStatus: kpiStatusUnwrapped
    };
  }
};
</script>

<style scoped>
  .workspace-loading {
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
.workspace-error {
  color: red;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.workspace-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--grey-50);
}
.workspace-title-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-xs);
}
.workspace-title-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: var(--space-md);
  gap: var(--space-lg);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
}
.workspace-content {
  flex: 1;
}
</style>