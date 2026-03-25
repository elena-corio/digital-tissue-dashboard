<template>
  <div ref="viewerContainer" class="speckle-viewer-container">
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { normalize } from '../../utils/normalize.js';
import { 
  Viewer, 
  DefaultViewerParams, 
  SpeckleLoader, 
  UrlHelper, 
  CameraController, 
  SelectionExtension,
  FilteringExtension,
  ViewerEvent
} from '@speckle/viewer';

const props = defineProps({
  modelUrls: { type: Array, required: true },  // URL to the Speckle model
  height: { type: String, default: '600px' },  // Container height
  showStats: { type: Boolean, default: false }, // Show FPS/performance stats
  verbose: { type: Boolean, default: false },    // Console logging
  authToken: { type: String, default: '' },      // Speckle personal access token
  filterConfig: { type: Object, default: null }  // { key, left, right } for color mapping
});

const emit = defineEmits(['viewer-ready', 'model-loaded', 'error', 'object-clicked']);

const viewerContainer = ref(null);  // Reference to the DOM element
const loading = ref(true);          // Loading state
const error = ref(null);            // Error message
let viewer = null;                  // Speckle Viewer instance (not reactive)
let filtering = null;               // FilteringExtension instance

const initViewer = async () => {
  try {
    loading.value = true;
    error.value = null;

    await nextTick(); // Ensure DOM is ready
    if (!viewerContainer.value) {
      console.warn('SpeckleViewer: viewerContainer ref is not ready. Initialization skipped.');
      loading.value = false;
      return;
    }

    // Configure viewer params
    const params = DefaultViewerParams;
    params.showStats = false;
    params.verbose = props.verbose;

    // Create Viewer instance
    viewer = new Viewer(viewerContainer.value, params);
    // Initialize the viewer
    await viewer.init();

    // Add extensions (advanced setup)

    // Create and enable core extensions
    const cameraController = viewer.createExtension(CameraController);
    cameraController.enabled = true;
    const selection = viewer.createExtension(SelectionExtension);
    selection.enabled = true;

    filtering = viewer.createExtension(FilteringExtension);
    filtering.enabled = true;

    // Listen for object clicks
    viewer.on(ViewerEvent.ObjectClicked, (selectionData) => {
      if (selectionData && selectionData.hits?.length > 0) {
        const raw = selectionData.hits[0].node.model.raw;
        emit('object-clicked', raw?.properties ?? null);
      } else {
        emit('object-clicked', null);
      }
    });

    emit('viewer-ready', viewer); // Tell parent viewer is ready

    // Load the model
    //Note: cannot use await inside forEach loop, so we use a regular for loop
    for (const url of props.modelUrls) {
      await loadModel(url);
    }

    loading.value = false;
  } catch (err) {
    // Handle any errors
    error.value = `Failed to initialize viewer: ${err.message}`;
    loading.value = false;
    emit('error', err);
    console.error('Speckle Viewer Error:', err);
  }
};

const loadModel = async (url) => {
  try {
    if (!viewer) return;

    loading.value = true;

    // Get resource URLs from the project/model URL
    const urls = await UrlHelper.getResourceUrls(url, props.authToken || undefined);

    // Load each resource (a model might have multiple files)
    for (const resourceUrl of urls) {
      // Create a loader for this specific resource
      const loader = new SpeckleLoader(viewer.getWorldTree(), resourceUrl, props.authToken || undefined);
      // Load and display the geometry
      await viewer.loadObject(loader, true);
    }

    emit('model-loaded', url);
    loading.value = false;
    await applyColorFilter(props.filterConfig);
  } catch (err) {
    error.value = `Failed to load model: ${err.message}`;
    loading.value = false;
    emit('error', err);

  }
};

// Watch for URL changes - reload model if URL prop changes
watch(() => props.modelUrls, (newUrls) => {
  if (viewer && newUrls) {
    for (const url of newUrls) {
      loadModel(url);
    }
  }
});

// ── Color helpers ──────────────────────────────────────────────
const ERROR_COLOR   = '#e7882f';
const SUCCESS_COLOR = '#4697e3';
const CATEGORICAL_PALETTE = [
  '#4697e3', '#e7882f', '#f0b43a', '#6ecb8a', '#c65fa0',
  '#5bb8d4', '#e06060', '#a3c96e', '#b07cd6', '#f2c96e'
];

const lerpColor = (hex1, hex2, t) => {
  const r1 = parseInt(hex1.slice(1,3),16), g1 = parseInt(hex1.slice(3,5),16), b1 = parseInt(hex1.slice(5,7),16);
  const r2 = parseInt(hex2.slice(1,3),16), g2 = parseInt(hex2.slice(3,5),16), b2 = parseInt(hex2.slice(5,7),16);
  const r = Math.round(r1+(r2-r1)*t), g = Math.round(g1+(g2-g1)*t), b = Math.round(b1+(b2-b1)*t);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
};

// Watch for filterConfig changes - apply color filter
const applyColorFilter = async (config) => {
  if (!viewer || !filtering) return;
  if (!config) {
    filtering.removeUserObjectColors();
    return;
  }

  const { key, left, right, benchmark } = config;
  const propName = key.startsWith('properties.') ? key.slice('properties.'.length) : key;

  // Build a tighter range: ±50% of the full span around the benchmark
  // This makes small real-world differences visible while keeping absolute meaning
  let clampedLeft = left;
  let clampedRight = right;
  if (benchmark !== undefined && left !== undefined && right !== undefined) {
    const span = Math.abs(right - left);
    const half = span * 0.5;
    if (left < right) {
      clampedLeft  = Math.max(left,  benchmark - half);
      clampedRight = Math.min(right, benchmark + half);
    } else {
      // inverted (e.g. greenSpaceDistance: left=500, right=0)
      clampedLeft  = Math.min(left,  benchmark + half);
      clampedRight = Math.max(right, benchmark - half);
    }
  }

  // Determine property type from viewer
  const properties = await viewer.getObjectProperties();
  const propInfo = properties.find(p => p.key === key);
  if (!propInfo) {
    console.warn(`[SpeckleViewer] Property "${key}" not found in model.`);
    filtering.removeUserObjectColors();
    return;
  }

  // Walk world tree and collect values per object
  const tree = viewer.getWorldTree();
  const nodes = tree.findAll((node) => node.model?.raw?.properties !== undefined);

  if (propInfo.type === 'string') {
    // Categorical: assign palette color per unique value
    const valueToColor = {};
    let colorIndex = 0;
    const groups = {};
    for (const node of nodes) {
      const val = node.model.raw.properties?.[propName];
      if (val === undefined || val === null) continue;
      const strVal = String(val);
      if (!valueToColor[strVal]) {
        valueToColor[strVal] = CATEGORICAL_PALETTE[colorIndex % CATEGORICAL_PALETTE.length];
        colorIndex++;
      }
      const color = valueToColor[strVal];
      if (!groups[color]) groups[color] = [];
      groups[color].push(node.model.id);
    }
    filtering.setUserObjectColors(
      Object.entries(groups).map(([color, objectIds]) => ({ objectIds, color }))
    );
  } else {
    // Numeric: gradient from error to success using normalize (handles inverted benchmarks)
    const groups = {};
    for (const node of nodes) {
      let val = node.model.raw.properties?.[propName];
      if (val === undefined || val === null) continue;
      // Use rounded value for color assignment
      val = Math.round(val * 1000) / 1000; // round to 3 decimals
      const t = Math.max(0, Math.min(1, normalize(val, clampedLeft, clampedRight)));
      const color = lerpColor(ERROR_COLOR, SUCCESS_COLOR, t);
      if (!groups[color]) groups[color] = [];
      groups[color].push(node.model.id);
    }
    filtering.setUserObjectColors(
      Object.entries(groups).map(([color, objectIds]) => ({ objectIds, color }))
    );
  }
};

watch(() => props.filterConfig, async (config) => {
  await applyColorFilter(config);
});

// When component mounts - initialize viewer
onMounted(() => {
  initViewer();
});

// When component unmounts - clean up WebGL resources
onUnmounted(() => {
  if (viewer) {
    viewer.dispose(); // Release GPU memory, remove event listeners
    viewer = null;
  }
});

// Expose viewer instance for parent components
defineExpose({
  viewer,
  loadModel
});
</script>

<style scoped>
.speckle-viewer-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  position: relative;
  background-color: var(--color-background-alt);
  overflow: hidden;
  box-sizing: border-box;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-overlay);
  color: white;
  z-index: 10;
  font-size: 16px;
}

.error-overlay {
  background-color: var(--color-error);
}
</style>