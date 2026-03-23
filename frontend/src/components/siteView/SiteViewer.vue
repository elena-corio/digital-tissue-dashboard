<template>
  <div ref="viewerContainer" class="speckle-viewer-container">
    <!-- Shows "Loading 3D model..." while initializing -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading 3D model...</p>
    </div>
    <!-- Shows error message if something fails -->
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
    </div>
    <div v-if="!loading && !error && !modelsLoaded" class="debug-info" style="color:orange;position:absolute;top:10px;left:10px;z-index:20;">
      <p>No models loaded.</p>
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
  verbose: { type: Boolean, default: false },   // Console logging
  authToken: { type: String, default: '' }      // Speckle personal access token
});

const emit = defineEmits(['viewer-ready', 'model-loaded', 'error']);

const viewerContainer = ref(null);  // Reference to the DOM element
const loading = ref(true);          // Loading state
const error = ref(null);            // Error message
const modelsLoaded = ref(false);    // Track if any model loaded
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
    modelsLoaded.value = false;
    for (const url of props.modelUrls) {
      console.log('[SiteViewer] Loading model URL:', url, 'Token:', props.authToken ? '***' + props.authToken.slice(-4) : 'none');
      await loadModel(url);
    }
    // Check if any geometry is loaded
    if (viewer) {
      const worldTree = viewer.getWorldTree ? viewer.getWorldTree() : null;
      if (worldTree && worldTree.children && worldTree.children.length > 0) {
        console.log('[SiteViewer] Geometry loaded:', worldTree.children.length, 'root children');
      } else {
        console.warn('[SiteViewer] No geometry loaded in world tree.');
      }
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

    // Get resource URLs from the project/model URL, with authToken
    const urls = await UrlHelper.getResourceUrls(url, props.authToken || undefined);

    // Load each resource (a model might have multiple files)
    for (const resourceUrl of urls) {
      // Create a loader for this specific resource, with authToken
      const loader = new SpeckleLoader(viewer.getWorldTree(), resourceUrl, props.authToken || undefined);
      // Load and display the geometry
      await viewer.loadObject(loader, true);
    }

    emit('model-loaded', url);
    modelsLoaded.value = true;
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
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
/* Spinner styles */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--blue-100, #3b479f);
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
</style>