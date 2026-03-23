
<template>
  <div class="siteview-grid">
    <!-- Left Column: 1/3 width -->
    <div class="left-col">
      <div class="card" style="margin-bottom: 1rem;">
        <SiteInfoList />
      </div>
      <div class="card card-flex-fill card-flex-center">
        <SitePlanView />
      </div>


    
    </div>
    <!-- Right Column: 2/3 width -->
    <div class="right-col">
      <div class="card card-16-9-aspect">
        <div class="aspect-ratio-box">
          <SiteViewer :modelUrls="activeModelUrls" :authToken="speckleToken" />
        </div>
      </div>
      <div class="toggle-row">
        <ToggleButton
          label="HB1"
          :selected="toggleStates[0]"
          borderColor="var(--yellow-100)"
          @update:selected="toggleStates[0] = !toggleStates[0]"
        />
        <ToggleButton
          label="HB2"
          :selected="toggleStates[1]"
          borderColor="var(--fucsia-100)"
          @update:selected="toggleStates[1] = !toggleStates[1]"
        />
        <ToggleButton
          label="HB3"
          :selected="toggleStates[2]"
          borderColor="var(--light-blue-100)"
          @update:selected="toggleStates[2] = !toggleStates[2]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { TABS } from '../uiText.js';
import ToggleButton from '../components/workspace/ToggleButton.vue';
import SiteViewer from '../components/siteView/SiteViewer.vue';
import SiteInfoList from '../components/siteView/SiteInfoList.vue';
import SitePlanView from '../components/siteView/SitePlanView.vue';
import { speckleModels, speckleServerUrl, speckleToken } from '../config/speckleConfig.js';

const toggleStates = ref([false, false, true]);

// Compose model URLs for toggled models
const activeModelUrls = computed(() => {
  const urls = [];
  // Always show context model
  urls.push(`${speckleServerUrl}/projects/${speckleModels.site.projectId}/models/${speckleModels.site.contextModelId}`);
  if (toggleStates.value[0]) {
    urls.push(`${speckleServerUrl}/projects/${speckleModels.site.projectId}/models/${speckleModels.site.hb01ModelId}`);
  }
  if (toggleStates.value[1]) {
    urls.push(`${speckleServerUrl}/projects/${speckleModels.site.projectId}/models/${speckleModels.site.hb02ModelId}`);
  }
  if (toggleStates.value[2]) {
    urls.push(`${speckleServerUrl}/projects/${speckleModels.site.projectId}/models/${speckleModels.site.hb03ModelId}`);
  }
  return urls;
});

const {
  title,
  subtitle,
  statusIcon,
  statusLabel,
  statusDescription,
  statusValue
} = useWorkspaceUI();
onMounted(() => {
  title.value = TABS.site.title;
  subtitle.value = TABS.site.subtitle;
  statusIcon.value = TABS.site.statusIcon;
  statusLabel.value = TABS.site.statusLabel;
  statusDescription.value = TABS.site.statusDescription;
  statusValue.value = 70; // Example value, replace with real data if available
});
</script>

<style scoped>
/* Remove duplicate .siteview-grid rule */
.card-16-9-aspect {
  width: 100%;
  display: block;
  position: relative;
  padding: 0;
}
.aspect-ratio-box {
  width: 100%;
  padding-top: 56.25%; /* 16:9 ratio */
  position: relative;
}
.siteview-grid {
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

@media (min-width: 1200px) {
  .siteview-grid {
    margin-bottom: 3rem;
  }
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
.card-16-9 {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.toggle-row {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
}
.card-flex-fill {
  flex: 1 1 0%;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
/* Center content in the flex-fill card */
.card-flex-center {
  justify-content: center;
  align-items: center;
}
.placeholder-text {
  color: var(--navy-50, #888);
  font-size: 1.1rem;
  opacity: 0.7;
  text-align: center;
}
.svg-plot-img {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
</style>