<template>
  <Workspace
    :title="uiText.TABS.site.title"
    :subtitle="uiText.TABS.site.subtitle"
    :statusIcon="uiText.TABS.site.statusIcon"
    :statusLabel="uiText.TABS.site.statusLabel"
    :statusDescription="uiText.TABS.site.statusDescription"
  >
    <div class="site-placeholder">Site content placeholder</div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import * as uiText from '../uitext.js';

export default {
  name: 'SiteView',
  components: { Workspace },
  data() {
    return { uiText };
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