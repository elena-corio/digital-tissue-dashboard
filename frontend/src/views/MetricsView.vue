<template>
  <Workspace
    :title="uiText.TABS.metrics.title"
    :subtitle="uiText.TABS.metrics.subtitle"
    :statusIcon="uiText.TABS.metrics.statusIcon"
    :statusLabel="uiText.TABS.metrics.statusLabel"
    :statusDescription="uiText.TABS.metrics.statusDescription"
  >
    <div class="metrics-placeholder">Metrics content placeholder</div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import * as uiText from '../uitext.js';

export default {
  name: 'MetricsView',
  components: { Workspace },
  data() {
    return { uiText };
  }
};
</script>

<style scoped>
.metrics-placeholder {
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  margin-top: 2rem;
}
</style>