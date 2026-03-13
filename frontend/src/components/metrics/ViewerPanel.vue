<template>
  <div class="viewer-panel-root">
  <div class="viewer-container aspect" @mousemove="onMouseMove">
    <SpeckleViewer 
      ref="viewerRef"
      :model-urls="modelLinks"
      :key="modelLinks"
      :auth-token="props.authToken"
      :filter-config="props.filterConfig"
      :show-stats="false"
      :verbose="false"
      @viewer-ready="onViewerReady"
      @model-loaded="onModelLoaded"
      @error="onError"
      @object-clicked="onObjectClicked"
    />
    <!-- Selected object info tag, follows cursor -->
    <div
      v-if="selectedProperties && props.filterConfig"
      class="object-info-tag"
      :style="{ left: mouseX + 14 + 'px', top: mouseY + 14 + 'px' }"
    >
      <span class="object-info-tag-label">{{ filterLabel }}</span>
      <span class="object-info-tag-value">{{ selectedProperties[props.filterConfig.key.replace('properties.', '')] ?? '—' }} {{ props.filterConfig.unit }}</span>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SpeckleViewer from './SpeckleViewer.vue';


const props = defineProps({
  modelIds: {
    type: Array,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    default: ''
  },
  filterConfig: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelIds', 'viewer-ready', 'model-loaded', 'error', 'measure', 'section', 'filter']);

const viewerRef = ref(null);
const selectedProperties = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);

const onMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
};
const modelLinks = computed(() =>
  (props.modelIds || []).map(id => `https://app.speckle.systems/projects/${props.projectId}/models/${id}`)
);

const filterLabel = computed(() => {
  if (!props.filterConfig?.key) return '';
  const key = props.filterConfig.key.replace('properties.', '');
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
});

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

const onObjectClicked = (properties) => {
  selectedProperties.value = properties;
};

defineExpose({ viewerRef });
</script>

<style scoped>
.viewer-panel-root {
  flex: 1 1 0%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.viewer-container.aspect {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 100%;
  min-width: 0;
  position: relative;
  background: transparent;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  box-shadow: var(--shadow-card);
  border-radius: var(--radius-md);
}

.object-info-tag {
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  pointer-events: none;
  white-space: nowrap;
}

.object-info-tag-label {
  color: var(--navy-50);
  font-weight: 500;
}

.object-info-tag-value {
  color: var(--navy-100);
  font-weight: 700;
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
