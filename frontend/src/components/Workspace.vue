<template>
  <div class="workspace-container">
    <HeaderBar />
    <div class="workspace-header">
      <div class="workspace-title">
        <h1>{{ title }}</h1>
        <h2 v-if="subtitle">{{ subtitle }}</h2>
      </div>
      <StatusIndicator :icon="statusIcon" :text="statusText" />
    </div>
    <div class="workspace-content">
      <slot />
    </div>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue';
import StatusIndicator from './StatusIndicator.vue';

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
    statusText: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.workspace-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.workspace-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.workspace-title h1 {
  margin: 0;
  font-size: 2rem;
}
.workspace-title h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #888;
}
.workspace-content {
  flex: 1;
  padding: 2rem;
}
</style>