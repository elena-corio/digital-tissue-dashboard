<template>
  <div class="tower-selector-placeholder">
    <button v-for="tower in towers" :key="tower" class="tower-btn">{{ tower }}</button>
  </div>
</template>

<script>
export default {
  name: 'TowerSelector',
  data() {
    return {
      towers: ['Tower 1', 'Tower 2', 'Tower 3', 'Tower 4'],
    };
  },
};
</script>

<style scoped>
.tower-selector-placeholder {
  display: flex;
  gap: 0.5rem;
}
.tower-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem 1.2rem;
  font-size: 1.15rem;
  height: 3.2rem;
  cursor: pointer;
}
</style>
