<template>
  <div class="project-placeholder">Project content placeholder</div>
</template>

<script>

import { onMounted } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { TABS } from '../uiText.js';

export default {
  name: 'ProjectView',
  props: {
    kpiStatus: Array,
    kpisOnTargetPercent: Number
  },
  setup(props) {
    const {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue
    } = useWorkspaceUI();
    onMounted(() => {
      title.value = TABS.project.title;
      subtitle.value = TABS.project.subtitle;
      statusIcon.value = TABS.project.statusIcon;
      statusLabel.value = TABS.project.statusLabel;
      statusDescription.value = TABS.project.statusDescription;
      statusValue.value = props.kpisOnTargetPercent;
    });
    // ...existing code...
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