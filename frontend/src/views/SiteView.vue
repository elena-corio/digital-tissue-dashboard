
<template>
  <div class="siteview-grid">
    <!-- Left Column: 2/3 width -->
    <div class="left-col">
      <div class="card card-16-9">
        <SiteViewer :modelUrls="activeModelUrls" :authToken="speckleToken" />
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
    <!-- Right Column: 1/3 width -->
    <div class="right-col">
      <div class="card" v-for="n in 3" :key="'rcard'+n" style="margin-bottom: 1rem;">
        <div class="card-title">Card {{ n }}</div>
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
.siteview-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-md);
  width: 100%;
  align-items: flex-start;
  margin-top: var(--space-lg);
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
  min-height: 0;
}
.left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  min-height: 0;
}
.card-16-9 {
  aspect-ratio: 16 / 9;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.toggle-row {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-start;
}
.right-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-height: 0;
}
</style>