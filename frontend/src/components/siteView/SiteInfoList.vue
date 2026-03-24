<template>
    <div class="card-title">Site Info</div>
    <ul class="site-info-list">
      <li class="site-info-list-item"><span class="site-info-label">City</span><span class="site-info-value">{{ site.city }}</span></li>
      <li class="site-info-list-item"><span class="site-info-label">Address</span><span class="site-info-value">{{ site.address }}</span></li>
      <li class="site-info-list-item"><span class="site-info-label">Coordinates</span><span class="site-info-value">{{ site.coordinates.latitude }}, {{ site.coordinates.longitude }}</span></li>
      <li class="site-info-list-item"><span class="site-info-label">Site Area</span><span class="site-info-value">{{ site.siteArea.toLocaleString() }} m²</span></li>
    </ul>
  </template>

<script setup>
import { SITE as site } from '../../uiText.js';
</script>

<style scoped>
.site-info-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.site-info-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--grey-100);
  font-size: var(--font-size-body);
}
.site-info-list-item:last-child {
  border-bottom: none;
}
.site-info-label {
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
.site-info-value {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
  font-weight: var(--font-weight-regular);
}
</style>
