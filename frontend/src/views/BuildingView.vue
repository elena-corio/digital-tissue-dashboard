
<template>
  <div class="buildingview-grid">
    <!-- Left Column: 1/3 width -->
    <div class="left-col">
      <div class="card" style="margin-bottom: 1rem;">
        <BuildingInfoCard />
      </div>
      <div class="card card-flex-fill card-flex-center">
        <BuildingChartPlaceholder />
      </div>
    </div>
    <!-- Right Column: 2/3 width -->
    <div class="right-col">
      <div class="card card-16-9-aspect">
        <div class="aspect-ratio-box">
          <BuildingViewerPlaceholder />
        </div>
      </div>
      <BuildingToggleRow />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { TABS } from '../uiText.js';
import BuildingInfoCard from '../components/building/BuildingInfoCard.vue';
import BuildingChartPlaceholder from '../components/building/BuildingChartPlaceholder.vue';
import BuildingViewerPlaceholder from '../components/building/BuildingViewerPlaceholder.vue';
import BuildingToggleRow from '../components/building/BuildingToggleRow.vue';

const { title, subtitle, statusIcon, statusLabel, statusDescription, statusValue } = useWorkspaceUI();
onMounted(() => {
  title.value = TABS.building.title;
  subtitle.value = TABS.building.subtitle;
  statusIcon.value = TABS.building.statusIcon;
  statusLabel.value = TABS.building.statusLabel;
  statusDescription.value = TABS.building.statusDescription;
  statusValue.value = 0;
});
</script>
/* Workspace title row styles (copied from Workspace.vue) */
.workspace-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: var(--space-lg);
  margin-right: var(--space-lg);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-md);
}
.workspace-title-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}
.subtitle {
  font-size: 1.1rem;
  color: var(--navy-50, #888);
  margin-top: 0.25rem;
}
.workspace-status-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

<style scoped>

/* Copy layout styles from SiteView for perfect match */

.buildingview-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-md);
  width: 100%;
  align-items: stretch;
  margin-top: var(--space-lg);
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
  min-height: 0;
  margin-bottom: var(--space-lg);
}
.left-col {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-xs);
  min-height: 0;
}
.right-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  min-height: 0;
}
.card {
  background: #fff;
}
.card-16-9-aspect {
  width: 100%;
  max-height: 70vh;
  display: block;
  position: relative;
  padding: 0;
  background: #fff;
}
.aspect-ratio-box {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--grey-10);
  border-radius: var(--radius-md);
}
.card-flex-fill {
  flex: 1 1 0%;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-flex-center {
  justify-content: center;
  align-items: center;
}

</style>