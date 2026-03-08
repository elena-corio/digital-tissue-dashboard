<template>
  <Workspace
    :title="uiText.site.title"
    :subtitle="uiText.site.subtitle"
    :statusIcon="uiText.site.statusIcon"
    :statusText="uiText.site.statusText"
  >
    <div class="site-placeholder">Site content placeholder</div>
  </Workspace>
</template>

<script>
import Workspace from '../components/Workspace.vue';
import uiText from '../uitext.js';

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