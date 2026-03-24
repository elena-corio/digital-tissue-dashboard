<template>
  <div ref="viewerContainer" class="speckle-viewer-container">
    <!-- Shows "Loading 3D model..." while initializing -->
    <div v-if="loading" class="loading-overlay">
      <p>Loading 3D model...</p>
    </div>
    <!-- Shows error message if something fails -->
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { 
  Viewer, 
  DefaultViewerParams, 
  SpeckleLoader, 
  UrlHelper, 
  CameraController, 
  SelectionExtension, 
  MeasurementsExtension, 
  SectionTool, 
  FilteringExtension
} from '@speckle/viewer';

const props = defineProps({
  modelUrls: { type: Array, required: true },  // URL to the Speckle model
  height: { type: String, default: '600px' },  // Container height
  showStats: { type: Boolean, default: false }, // Show FPS/performance stats
  verbose: { type: Boolean, default: false }    // Console logging
});

const emit = defineEmits(['viewer-ready', 'model-loaded', 'error']);

const viewerContainer = ref(null);  // Reference to the DOM element
const loading = ref(true);          // Loading state
const error = ref(null);            // Error message
let viewer = null;                  // Speckle Viewer instance (not reactive)

const initViewer = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!viewerContainer.value) return; // Wait for DOM to be ready

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

    // Create (but do not enable) advanced extensions for later UI control
    const measurements = viewer.createExtension(MeasurementsExtension);
    measurements.enabled = false;
    const sectionTool = viewer.createExtension(SectionTool);
    sectionTool.enabled = false;
    const filtering = viewer.createExtension(FilteringExtension);
    filtering.enabled = false;

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
    const urls = await UrlHelper.getResourceUrls(url);

    // Load each resource (a model might have multiple files)
    for (const resourceUrl of urls) {
      // Create a loader for this specific resource
      const loader = new SpeckleLoader(viewer.getWorldTree(), resourceUrl);
      // Load and display the geometry
      await viewer.loadObject(loader, true);
    }

    emit('model-loaded', url);
    loading.value = false;
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