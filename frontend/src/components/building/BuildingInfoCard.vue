
<template>
  <div class="card-title">Building Info</div>
  <ul class="building-info-list">
    <li class="building-info-list-item"><span class="info-label">Name</span> <span class="info-value">{{ name }}</span></li>
    <li class="building-info-list-item"><span class="info-label">Number of Floors</span> <span class="info-value">{{ numberOfFloors }} floors</span></li>
    <li class="building-info-list-item"><span class="info-label">Number of Towers</span> <span class="info-value">{{ numberOfTowers }} towers</span></li>
    <li class="building-info-list-item"><span class="info-label">Gross Floor Area</span> <span class="info-value">{{ grossFloorArea.toLocaleString() }} m²</span></li>
  </ul>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  numberOfFloors: { type: Number, required: true },
  numberOfTowers: { type: Number, required: true },
  grossFloorArea: { type: Number, required: true }
});
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
    justify-content: space-between;
    align-items: center;
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--grey-100);
    font-size: var(--font-size-body);
  }
  .building-info-list-item:last-child {
    border-bottom: none;
  }
  .info-label {
    font-weight: var(--font-weight-medium);
    color: var(--navy-100);
  }
  .info-value {
    font-size: var(--font-size-caption);
    color: var(--navy-50);
    font-weight: var(--font-weight-regular);
  }
</style>
