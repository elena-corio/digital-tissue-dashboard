<template>
  <div ref="viewerContainer" class="speckle-viewer-container" @mousemove="onMouseMove">
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
    </div>
    <div
      v-if="selectedProperties && props.filterConfig"
      class="pie-thumbnail-tooltip"
      :style="{ left: mouseX + 8 + 'px', top: mouseY + 8 + 'px' }"
    >
      <span class="pie-thumbnail-value">{{ infoValue }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Viewer, DefaultViewerParams, SpeckleLoader, UrlHelper, CameraController, SelectionExtension, FilteringExtension, ViewerEvent } from '@speckle/viewer';
import { computed } from 'vue';
const props = defineProps({
  modelUrls: { type: Array, required: true },
  authToken: { type: String, default: '' },
  filterConfig: { type: Object, default: null }
});

const emit = defineEmits(['viewer-ready', 'model-loaded', 'error', 'object-clicked']);

const viewerContainer = ref(null);
const error = ref(null);
let viewer = null;
let filtering = null;
const selectedProperties = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);

// Mouse move handler for info tag
function onMouseMove(e) {
  const rect = viewerContainer.value?.getBoundingClientRect();
  if (rect) {
    mouseX.value = e.clientX - rect.left;
    mouseY.value = e.clientY - rect.top;
  }
}

// Info label and value for floating tag
const infoLabel = computed(() => {
  if (!props.filterConfig) return '';
  const key = props.filterConfig.key;
  if (key === 'tower') return 'Tower';
  if (key === 'program') return 'Program';
  if (key === 'material') return 'Material';
  return key.charAt(0).toUpperCase() + key.slice(1);
});
const infoValue = computed(() => {
  if (!selectedProperties.value || !props.filterConfig) return '—';
  const key = props.filterConfig.key;
  let val;
  if (key === 'tower') {
    // Try both 'tower' and 'cluster_id' properties
    val = selectedProperties.value.tower || selectedProperties.value.cluster_id;
    if (!val) return '—';
    return `T${val}`;
  }
  val = selectedProperties.value[key];
  if (!val) return '—';
  // For program, remove 'Program' prefix if present (e.g., 'ProgramLIVING' -> 'Living')
  if (key === 'program' && typeof val === 'string') {
    val = val.replace(/^Program/i, '');
    val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  }
  return val;
});

// Bar colors for towers (same as DataBarChart)
const BAR_COLORS = [
  '#3b479f', // var(--blue-100)
  '#4697e3', // var(--light-blue-100)
  '#e7882f', // var(--orange-100)
  '#f0b43a'  // var(--yellow-100)
];

const initViewer = async () => {
  try {
    error.value = null;
    await nextTick();
    if (!viewerContainer.value) return;
    const params = DefaultViewerParams;
    params.showStats = false;
    params.verbose = false;
    viewer = new Viewer(viewerContainer.value, params);
    await viewer.init();
    const cameraController = viewer.createExtension(CameraController);
    cameraController.enabled = true;
    const selection = viewer.createExtension(SelectionExtension);
    selection.enabled = true;
    filtering = viewer.createExtension(FilteringExtension);
    filtering.enabled = true;
    viewer.on(ViewerEvent.ObjectClicked, (selectionData) => {
      if (selectionData && selectionData.hits?.length > 0) {
        const raw = selectionData.hits[0].node.model.raw;
        selectedProperties.value = raw?.properties ?? null;
        emit('object-clicked', raw?.properties ?? null);
      } else {
        selectedProperties.value = null;
        emit('object-clicked', null);
      }
    });
    emit('viewer-ready', viewer);
    for (const url of props.modelUrls) {
      await loadModel(url);
    }
    await applyColorFilter(props.filterConfig);
  } catch (err) {
    error.value = `Failed to initialize viewer: ${err.message}`;
    emit('error', err);
    console.error('Speckle Viewer Error:', err);
  }
};

const loadModel = async (url) => {
  try {
    if (!viewer) return;
    const urls = await UrlHelper.getResourceUrls(url, props.authToken || undefined);
    for (const resourceUrl of urls) {
      const loader = new SpeckleLoader(viewer.getWorldTree(), resourceUrl, props.authToken || undefined);
      await viewer.loadObject(loader, true);
    }
    emit('model-loaded', url);
  } catch (err) {
    error.value = `Failed to load model: ${err.message}`;
    emit('error', err);
  }
};

// Apply categorical coloring by property (tower/program/material)
const applyColorFilter = async (config) => {
  if (!viewer || !filtering || !config || !config.key) {
    if (filtering) filtering.removeUserObjectColors();
    return;
  }
  const propName = config.key;
  const tree = viewer.getWorldTree();
  const allNodes = tree.findAll((node) => node.model?.raw?.properties !== undefined);

  // Build color mapping (case-insensitive)
  const valueToColor = {};
  (config.values || []).forEach((val, idx) => {
    valueToColor[String(val).toUpperCase()] = (config.colors ? config.colors[idx % config.colors.length] : BAR_COLORS[idx % BAR_COLORS.length]);
  });

  // For program filtering: isolate only objects with a matching program property
  if (propName === 'program') {
    const programSet = new Set((config.values || []).map(v => String(v).toUpperCase()));
    const matchingNodes = allNodes.filter(node => {
      const props = node.model?.raw?.properties;
      const val = props && props.hasOwnProperty('program') ? String(props['program']).toUpperCase() : undefined;
      return val && programSet.has(val);
    });
    filtering.isolateObjects(matchingNodes.map(node => node.model.id));
    // Also apply coloring to the matching nodes
    const groups = {};
    for (const node of matchingNodes) {
      const props = node.model?.raw?.properties;
      let val = undefined;
      if (props && Object.prototype.hasOwnProperty.call(props, propName)) {
        val = props[propName];
      }
      const hasValue = val !== undefined && val !== null && String(val).trim() !== '';
      let color = 'rgba(255,255,255,0)'; // fully transparent white by default
      if (hasValue) {
        const normVal = String(val).toUpperCase();
        color = valueToColor[normVal] || color;
      }
      if (!groups[color]) groups[color] = [];
      groups[color].push(node.model.id);
    }
    filtering.setUserObjectColors(
      Object.entries(groups).map(([color, objectIds]) => ({ objectIds, color }))
    );
  } else {
    // Assign color or transparent
    const groups = {};
    for (const node of allNodes) {
      const props = node.model?.raw?.properties;
      let val = undefined;
      if (props && Object.prototype.hasOwnProperty.call(props, propName)) {
        val = props[propName];
      }
      const hasValue = val !== undefined && val !== null && String(val).trim() !== '';
      let color = 'rgba(255,255,255,0)'; // fully transparent white by default
      if (hasValue) {
        const normVal = String(val).toUpperCase();
        color = valueToColor[normVal] || color;
      }
      if (!groups[color]) groups[color] = [];
      groups[color].push(node.model.id);
    }
    filtering.setUserObjectColors(
      Object.entries(groups).map(([color, objectIds]) => ({ objectIds, color }))
    );
  }
};

onMounted(initViewer);

// Re-apply color filter if filterConfig changes
watch(() => props.filterConfig, (newConfig) => {
  applyColorFilter(newConfig);
});

watch(() => props.modelUrls, (newUrls) => {
  if (viewer && newUrls) {
    for (const url of newUrls) {
      loadModel(url);
    }
    // Re-apply color filter after loading
    applyColorFilter(props.filterConfig);
  }
});
</script>

<style scoped>
.speckle-viewer-container {
  width: 100%;
  background: white;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.error-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.9);
  color: #e9268c;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 10;
}
.object-info-tag {
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  background: #ffffff;
  border-radius: var(--radius-md);
  padding: var(--space-xs) var(--space-sm);
  box-shadow: var(--shadow-card);
  pointer-events: none;
  white-space: nowrap;
  min-width: 120px;
  top: 0;
  left: 0;
}
.object-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xs) 0;
  font-size: var(--font-size-body, 1rem);
  gap: var(--space-sm, 0.5rem);
}
.object-info-tag-label {
  font-weight: 600;
  color: var(--navy-100, #222);
}
.object-info-tag-value {
  color: var(--navy-100, #222);
}
/* Floating tooltip for pie chart sector (copied from ProgramPieChart.vue) */
.pie-thumbnail-tooltip {
  position: absolute;
  z-index: 9999;
  pointer-events: none;
  background: var(--card-bg, #fff);
  transition: left 0.08s, top 0.08s;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--space-xs) var(--space-sm);
  width: fit-content;
}
.pie-thumbnail-value {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
  white-space: nowrap;
}
</style>
