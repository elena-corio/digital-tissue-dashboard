<template>
  <div ref="viewerContainer" class="speckle-viewer-container">
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Viewer, DefaultViewerParams, SpeckleLoader, UrlHelper, CameraController, SelectionExtension, FilteringExtension, ViewerEvent } from '@speckle/viewer';

const props = defineProps({
  modelUrls: { type: Array, required: true },
  authToken: { type: String, default: '' }
});

const emit = defineEmits(['viewer-ready', 'model-loaded', 'error', 'object-clicked']);

const viewerContainer = ref(null);
const error = ref(null);
let viewer = null;
let filtering = null;

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
        emit('object-clicked', raw?.properties ?? null);
      } else {
        emit('object-clicked', null);
      }
    });
    emit('viewer-ready', viewer);
    for (const url of props.modelUrls) {
      await loadModel(url);
    }
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

onMounted(initViewer);

watch(() => props.modelUrls, (newUrls) => {
  if (viewer && newUrls) {
    for (const url of newUrls) {
      loadModel(url);
    }
  }
});
</script>

<style scoped>
.speckle-viewer-container {
  width: 100%;
  height: 600px;
  background: #f8f9fa;
  position: relative;
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
</style>
