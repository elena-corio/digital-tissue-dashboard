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
  font-weight: var(--font-weight-medium);
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
    position: relative;
  }

  .card-list-item:not(:last-child)::after {
    content: "";
    display: block;
    margin: 12px auto 0 auto;
    width: 12%;
    border-bottom: 2px solid var(--light-blue-100);
  }

.card-list-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
</style>
