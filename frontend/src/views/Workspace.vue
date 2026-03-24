
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
          :value="statusValue"
        />
      </div>
    </div>
    <div class="workspace-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/workspace/HeaderBar.vue';
import StatusIndicator from '../components/workspace/StatusIndicator.vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { useSpeckleData } from '../composables/useSpeckleData';
import { onMounted, watch } from 'vue';
import * as uiText from '../uiText.js';

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
      kpisOnTargetPercent
    } = useWorkspaceUI();
    const { data: speckleData, loading, error, kpiStatus: getKpiStatus } = useSpeckleData();

    // Set header/status on mount
    onMounted(() => {
      title.value = uiText.TABS.metrics.title;
      subtitle.value = uiText.TABS.metrics.subtitle;
      statusIcon.value = uiText.TABS.metrics.statusIcon;
      statusLabel.value = uiText.TABS.metrics.statusLabel;
      statusDescription.value = uiText.TABS.metrics.statusDescription;
      // Set initial kpiStatus if data is already loaded
      if (speckleData.value) {
        kpiStatus.value = getKpiStatus();
        statusValue.value = kpisOnTargetPercent.value;
      }
    });

    // Watch for speckleData changes and update kpiStatus and statusValue
    watch(
      () => speckleData.value,
      (newVal) => {
        if (newVal) {
          kpiStatus.value = getKpiStatus();
          statusValue.value = kpisOnTargetPercent.value;
        }
      },
      { immediate: true, deep: true }
    );

    return {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue,
      speckleData,
      loading,
      error
    };
  }
};
</script>

<style scoped>
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