<template>
  <Workspace
    :title="uiText.metrics.title"
    :subtitle="uiText.metrics.subtitle"
    :statusIcon="uiText.metrics.statusIcon"
    :statusText="uiText.metrics.statusText"
  >
    <div class="metrics-placeholder">Metrics content placeholder</div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import uiText from '../uitext.js';

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