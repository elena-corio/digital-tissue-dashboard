
<template>
  <div class="workspace-root">
    <div class="workspace-header">
      <HeaderBar />
    </div>
    <div class="workspace-title-row">
      <div class="workspace-title-block">
        <h2 class="h2">{{ title }}</h2>
        <div class="subtitle">{{ subtitle }}</div>
      </div>
      <div class="workspace-status-indicator">
        <StatusIndicator
          :icon="statusIcon"
          :label="statusLabel"
          :description="statusDescription"
          :value="statusValue"
        />
      </div>
    </div>
    <div class="workspace-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/workspace/HeaderBar.vue';
import StatusIndicator from '../components/workspace/StatusIndicator.vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';

export default {
  name: 'Workspace',
  components: {
    HeaderBar,
    StatusIndicator
  },
  setup() {
    const {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue
    } = useWorkspaceUI();
    return {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue
    };
  }
};
</script>

<style scoped>
.workspace-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--grey-50);
}
.workspace-title-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--space-xs);
}
.workspace-title-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: var(--space-md);
  gap: var(--space-lg);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
}
.workspace-content {
  flex: 1;
}
</style>