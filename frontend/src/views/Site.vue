<script setup>
import { uiText } from '@/config/uiText.js'
import ViewerPanel from '@/components/viewer/ViewerPanel.vue'
import { viewerModels } from '@/config/modelConfig.js'
import { ref } from 'vue';

const projectId = ref(viewerModels.site.projectId);
const modelIds = ref([viewerModels.site.contextModelId, viewerModels.site.hb03ModelId]);
function toggleModel(id) {
  if (modelIds.value.includes(id)) {
    modelIds.value = modelIds.value.filter(mid => mid !== id);
  } else {
    modelIds.value = [...modelIds.value, id];
  }
}
</script>

<template>
	<div class="site-container">
		<div class="site-content">
            <h2 class="site-title">{{ uiText.pages.workspace.site.title }}</h2>
            <h3 class="site-subtitle">{{ uiText.pages.workspace.site.subtitle }}</h3>
			<div class="viewer-wrapper">
				<ViewerPanel v-model:modelIds="modelIds" :projectId="projectId" />
			</div>
            <div class="toggle-buttons">
              <button
                v-for="(id, idx) in [viewerModels.site.hb01ModelId, viewerModels.site.hb02ModelId, viewerModels.site.hb03ModelId]"
                :key="id"
                :class="['btn', 'toggle-btn', { active: modelIds.includes(id) }]"
                @click="toggleModel(id)"
              >
                HB0{{ idx + 1 }}
              </button>
            </div>
            <div class="model-info-cards">
              <!-- ...existing code... -->
            </div>
		</div>
	</div>
</template>

<style scoped>
.site-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 280px);
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
}
.site-content {
	width: 100%;
	text-align: center;
}
.site-subtitle {
	margin-bottom: var(--space-md);
}
.viewer-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 75%;
	margin: 0 auto;
}
.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-md);
}
.toggle-btn {
  background-color: var(--light-blue-50);
  border: none;
  border-radius: var(--radius-md);
  color: var(--navy-blue-100);
  transition: background 0.2s, color 0.2s;
}
.toggle-btn.active {
  background-color: var(--light-blue-100);
  color: white;
}
.toggle-btn:hover {
  background-color: var(--light-blue-100);
  color: white;
}
</style>
