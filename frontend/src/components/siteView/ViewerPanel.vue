<template>
  <div class="viewer-container aspect">

    <SpeckleViewer 
      ref="viewerRef"
      :model-urls="modelLinks"
      :key="modelLinks"
      :show-stats="true"
      :verbose="true"
      height="auto"
      @viewer-ready="onViewerReady"
      @model-loaded="onModelLoaded"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import SpeckleViewer from './SpeckleViewer.vue';
import PromptBar from './PromptBar.vue';
import ButtonBar from './ButtonBar.vue';
import IconButton from './IconButton.vue';

const props = defineProps({
  modelIds: {
    type: Array,
    required: true
  },
  projectId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelIds', 'viewer-ready', 'model-loaded', 'error', 'measure', 'section', 'filter']);

const viewerRef = ref(null);

const modelLinks =computed(() =>
  (props.modelIds || []).map(id => `https://app.speckle.systems/projects/${props.projectId}/models/${id}`)
)

const onViewerReady = (viewer) => {
  emit('viewer-ready', viewer);
};

const onModelLoaded = (url) => {
  emit('model-loaded', url);
};

const onError = (error) => {
  console.error('❌ Error:', error);
  emit('error', error);
};

defineExpose({ viewerRef });
</script>

<style scoped>
.viewer-container.aspect {
  aspect-ratio: 16 / 9;
  width: 100%;
  min-width: 0;
  min-height: 0;
  max-width: 100vw;
  max-height: 100vh;
  position: relative;
  background: transparent;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}

.button-bar-fixed {
  position: absolute;
  top: 120px;
  left: 32px;
  z-index: 10;
  width: auto;
  height: auto;
  pointer-events: none;
}

.button-bar-fixed > * {
  pointer-events: auto;
}

.prompt-bar-fixed {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 11;
  width: 340px;
  pointer-events: none;
}

.prompt-bar-fixed > * {
  pointer-events: auto;
}
</style>
