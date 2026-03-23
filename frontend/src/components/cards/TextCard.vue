<template>
  <div class="card text-card">
    <ul class="card-list">
      <li v-for="(item, index) in items" :key="index" class="card-list-item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.text-card {
  padding: var(--space-lg);
  color: var(--navy-100);
  width: 100%;
}

.card-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  color: var(--navy-100);
  text-align: center;
}

.card-list-item {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-sm);
}

.card-list-item:last-child {
  margin-bottom: 0;
}
</style>
