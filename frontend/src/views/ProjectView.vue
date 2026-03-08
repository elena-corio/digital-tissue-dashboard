<template>
  <Workspace
    :title="uiText.TABS.project.title"
    :subtitle="uiText.TABS.project.subtitle"
    :statusIcon="uiText.TABS.project.statusIcon"
    :statusText="uiText.TABS.project.statusText"
  >
    <div class="project-placeholder">Project content placeholder</div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import * as uiText from '../uitext.js';

export default {
  name: 'ProjectView',
  components: { Workspace },
  data() {
    return { uiText };
  }
};
</script>

<style scoped>
.project-placeholder {
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  margin-top: 2rem;
}
</style>