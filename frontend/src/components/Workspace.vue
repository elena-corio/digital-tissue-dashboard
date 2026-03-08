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
      <slot />
    </div>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue';
import StatusIndicator from './StatusIndicator.vue';

import * as uitext from '../uitext.js';

export default {
  name: 'Workspace',
  components: {
    HeaderBar,
    StatusIndicator
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    statusIcon: {
      type: String,
      default: ''
    },
    statusLabel: {
      type: String,
      default: ''
    },
    statusDescription: {
      type: String,
      default: ''
    },
    statusValue: {
      type: Number,
      default: 80
    }
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