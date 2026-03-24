<template>
  <div class="dashboard-main">
    <!-- Left Column -->
    <section class="dashboard-left dashboard-col">
      <div class="dashboard-left-stack">
        <div class="tissue-organ-wrapper">
          <TissueCanvas />
          <OrganSelector class="dashboard-organs" />
        </div>
      </div>
    </section>
    <!-- Right Column -->
    <section class="dashboard-right dashboard-col">
      <div class="dashboard-right-stack">
        <div class="dashboard-vitality-wrapper">
          <VitalityCard />
        </div>
        <div class="dashboard-detail-wrapper">
          <div class="dashboard-detail-left">
            <TeamList />
          </div>
          <div class="dashboard-detail-right">
            <GrowthPhases />
            <IssueFound :lastUpdate="latestUpdate" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { TABS } from '../uiText.js';
import { useSpeckleData } from '../composables/useSpeckleData';
import TissueCanvas from '../components/dashboard/TissueCanvas.vue';
import OrganSelector from '../components/dashboard/OrganSelector.vue';
import VitalityCard from '../components/dashboard/VitalityCard.vue';
import GrowthPhases from '../components/dashboard/GrowthPhases.vue';
import IssueFound from '../components/dashboard/LastUpdate.vue';
import TeamList from '../components/dashboard/TeamList.vue';

export default {
  name: 'DashboardView',
  components: {
    TissueCanvas,
    OrganSelector,
    VitalityCard,
    GrowthPhases,
    IssueFound,
    TeamList
  },
  setup() {
    const {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue
    } = useWorkspaceUI();
    const { data: speckleData } = useSpeckleData();
    // Compute latest update date from speckleData
    const latestUpdate = computed(() => {
      const latest = speckleData.value?.latest;
      // Try createdAt, fallback to null
      return latest?.createdAt || null;
    });
    onMounted(() => {
      title.value = TABS.overview.title;
      subtitle.value = TABS.overview.subtitle;
      statusIcon.value = TABS.overview.statusIcon;
      statusLabel.value = TABS.overview.statusLabel;
      statusDescription.value = TABS.overview.statusDescription;
      statusValue.value = 80; // Example value, replace with real data if available
    });
    return { latestUpdate };
  }
};
</script>

<style scoped>


.dashboard-main {
  display: flex;
  flex: 1 1 auto;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  align-items: stretch;
  min-height: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
}
.dashboard-left.dashboard-col {
  display: flex;
  flex-direction: column;
  flex: 2 2 0%;
    min-height: 0;
  }
.dashboard-right.dashboard-col {
  display: flex;
  flex-direction: column;
  flex: 3 3 0%;
  min-height: 0;
}
.dashboard-left-stack {
  display: flex;
  flex-direction: column;
 flex: 1 1 0%;
  min-height: 0;
}
.dashboard-right-stack {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
  gap: var(--space-md);
}
.dashboard-vitality-wrapper {
  display: flex;
   flex: 0 0 auto;
  flex-direction: column;
  min-height: 0;
}
.dashboard-detail-wrapper {
  display: flex;
  flex: 1 1 0%;
  gap: var(--space-md);
  min-height: 0;
  overflow: hidden;
   margin-bottom: var(--space-lg);
}
.dashboard-detail-left {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.dashboard-detail-right {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  min-height: 0;
}

.tissue-organ-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-height: 0;
 gap: var(--space-md);
   margin-bottom: var(--space-lg);
}
</style>
