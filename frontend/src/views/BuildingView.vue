
<template>
  <div class="buildingview-grid">
    <!-- Left Column: 1/3 width -->
    <div class="left-col">
      <div class="card" style="margin-bottom: 1rem;">
        <BuildingInfoCard
          :name="buildingName"
          :number-of-floors="numberOfFloors"
          :number-of-towers="numberOfTowers"
          :gross-floor-area="grossFloorArea"
        />
      </div>
      <div class="card card-flex-fill card-flex-center">
        <BuildingChart v-model="selectedChart" />
      </div>
    </div>
    <!-- Right Column: 2/3 width -->
    <div class="right-col">
      <div class="card card-16-9-aspect">
        <div class="aspect-ratio-box">
           <SpeckleViewer :model-urls="modelUrls" :auth-token="speckleToken" :filter-config="filterConfig" />

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
import BuildingChart from '../components/building/BuildingChart.vue';
import BuildingViewerPlaceholder from '../components/building/BuildingViewerPlaceholder.vue';
import BuildingToggleRow from '../components/building/BuildingToggleRow.vue';
import { BUILDING } from '../uiText.js';
import { useSpeckleData } from '../composables/useSpeckleData';
import { speckleModels, speckleToken } from '../config/speckleConfig.js';
import SpeckleViewer from '../components/building/SpeckleViewer.vue';
import { ref, computed } from 'vue';
import { programPalette } from '../components/building/programPalette.js';
// Chart selection state (sync with BuildingChart)
const selectedChart = ref('data');

// Tower values and color order (matching DataBarChart)
const towerValues = ['01', '02', '03', '04'];
const barColors = ['#3b479f', '#4697e3', '#e7882f', '#f0b43a'];

// Compute unique, sorted program categories from model data
const { data: speckleData } = useSpeckleData();
const programCategories = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  const allElements = latest.data.elements.flatMap(cluster => Array.isArray(cluster.elements) ? cluster.elements : []);
  const unique = Array.from(new Set(allElements.map(el => el?.properties?.program || 'Unknown')));
  // Sort alphabetically, move 'Unknown' to end if present
  const filtered = unique.filter(v => v !== 'Unknown').sort((a, b) => a.localeCompare(b));
  if (unique.includes('Unknown')) filtered.push('Unknown');
  return filtered;
});

// filterConfig for SpeckleViewer: color by 'tower', 'program', or 'material' depending on chart
const structureData = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return [];
  // Aggregate all materialtype.* properties from all clusters
  const materialCounts = {};
  let total = 0;
  latest.data.elements.forEach(cluster => {
    if (cluster && cluster.properties) {
      Object.keys(cluster.properties).forEach(key => {
        if (key.startsWith('materialtype.')) {
          const mat = key.split('.')[1];
          const val = Number(cluster.properties[key]) || 0;
          if (val > 0) {
            materialCounts[mat] = (materialCounts[mat] || 0) + val;
            total += val;
          }
        }
      });
    }
  });
  // Convert to array with color
  const barColors = ['#3b479f', '#bdbdbd', '#e7882f', '#f0b43a'];
  return Object.entries(materialCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value], idx) => {
      let color = barColors[idx % barColors.length];
      if (label.toLowerCase() === 'concrete') color = '#3b479f'; // blue
      else if (label.toLowerCase() === 'steel') color = '#bdbdbd'; // grey
      else if (label.toLowerCase() === 'glass') color = '#7fd8f5'; // light blue
      return {
        label,
        value,
        color
      };
    });
});

const filterConfig = computed(() => {
  if (selectedChart.value === 'data') {
    return {
      key: 'tower',
      values: towerValues,
      colors: barColors
    };
  } else if (selectedChart.value === 'program') {
    return {
      key: 'program',
      values: programCategories.value,
      colors: programPalette
    };
  } else if (selectedChart.value === 'structure') {
    // Use material names and colors from structureData
    const materials = structureData.value.map(d => d.label);
    const colors = structureData.value.map(d => d.color);
    return {
      key: 'material',
      values: materials,
      colors
    };
  }
  return null;
});
const props = defineProps({
  tissueExpansion: { type: Number, required: false },
});
const projectId = speckleModels.model.projectId;
const modelIds = [
  speckleModels.model.commonModelId,
  speckleModels.model.t01ModelId,
  speckleModels.model.t02ModelId,
  speckleModels.model.t03ModelId,
  speckleModels.model.t04ModelId
];
const modelUrls = modelIds.map(
  id => `https://app.speckle.systems/projects/${projectId}/models/${id}`
);
const buildingName = computed(() => BUILDING?.buildingName || 'Hyperbuilding 03');
const numberOfFloors = computed(() => {
  const latest = speckleData.value?.latest;
  if (!latest?.data?.elements) return 0;
  return latest.data.elements.reduce((sum, cluster) => sum + (cluster.elements?.length || 0), 0);
});
const numberOfTowers = 4;
const grossFloorArea = computed(() => {
  const latest = speckleData.value?.latest;
  const gfa = latest?.data?.properties?.gross_floor_area;
  return typeof gfa === 'string' ? parseFloat(gfa) : gfa || 0;
});

const { title, subtitle, statusIcon, statusLabel, statusDescription, statusValue } = useWorkspaceUI();
onMounted(() => {
  title.value = TABS.building.title;
  subtitle.value = TABS.building.subtitle;
  statusIcon.value = TABS.building.statusIcon;
  statusLabel.value = TABS.building.statusLabel;
  statusDescription.value = TABS.building.statusDescription;
  statusValue.value = props.tissueExpansion ?? 0;
});
</script>


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
         

.workspace-status-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
</style>