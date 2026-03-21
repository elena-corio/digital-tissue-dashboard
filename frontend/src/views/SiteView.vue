<template>
  <div class="site-placeholder">Site content placeholder</div>
</template>

<script>
import { onMounted } from 'vue';
import { useWorkspaceUI } from '../composables/useWorkspaceUI.js';
import { TABS } from '../uitext.js';

export default {
  name: 'SiteView',
  setup() {
    const {
      title,
      subtitle,
      statusIcon,
      statusLabel,
      statusDescription,
      statusValue
    } = useWorkspaceUI();
    onMounted(() => {
      title.value = TABS.site.title;
      subtitle.value = TABS.site.subtitle;
      statusIcon.value = TABS.site.statusIcon;
      statusLabel.value = TABS.site.statusLabel;
      statusDescription.value = TABS.site.statusDescription;
      statusValue.value = 70; // Example value, replace with real data if available
    });
  }
};
</script>

<style scoped>
.site-placeholder {
  text-align: center;
  color: #aaa;
  font-size: 1.5rem;
  margin-top: 2rem;
}
</style>