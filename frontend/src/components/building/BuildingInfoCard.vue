<template>
  <div class="card-title">Building Info</div>
  <ul class="building-info-list">
    <li class="building-info-list-item">Placeholder info 1</li>
    <li class="building-info-list-item">Placeholder info 2</li>
    <li class="building-info-list-item">Placeholder info 3</li>
  </ul>
</template>

<script setup>
// Placeholder only
</script>

<style scoped>
.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
  margin-bottom: var(--space-sm);
}
.building-info-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.building-info-list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--grey-100);
  font-size: var(--font-size-body);
}
.building-info-list-item:last-child {
  border-bottom: none;
}
</style>
