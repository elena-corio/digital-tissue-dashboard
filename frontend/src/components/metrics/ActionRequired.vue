<template>
  <div class="action-required-placeholder card">Action Required: {{ selectedKPI || 'None' }}</div>
</template>

<script>
export default {
  name: 'ActionRequired',
  props: {
    selectedKPI: String
  }
};
</script>

<style scoped>
.action-required-placeholder {
  text-align: center;
  color: #666;
}
</style>
