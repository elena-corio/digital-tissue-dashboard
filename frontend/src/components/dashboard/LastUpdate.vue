<template>
  <div :class="['card', 'last-update-card', messageClass]">
    <div class="card-title">{{ updates.title }}</div>
    <div class="last-update-row">
      <span class="last-update-label">Last update</span>
      <span class="last-update-value">{{ updates.lastUpdate }}</span>
    </div>
    <div class="last-update-divider"></div>
    <div class="last-update-message">{{ message }}</div>
  </div>
</template>
<script setup>
import { UPDATES } from '../../uiText.js';

const updates = UPDATES;

function isMoreThan24HoursAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const oneDayMs = 24 * 60 * 60 * 1000;
  return diffMs > oneDayMs;
}

const isOld = isMoreThan24HoursAgo(updates.lastUpdate);
const message = isOld ? updates.issueFound : updates.allGood;
const messageClass = isOld ? 'warning' : 'success';
</script>

<style scoped>
.last-update-card {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  transition: box-shadow 0.2s;
  gap: var(--space-md);
}
.success {
  background: color-mix(in srgb, var(--color-success) 20%, transparent);
  border-color: var(--color-success);
}
.warning {
  background: color-mix(in srgb, var(--color-error) 20%, transparent);
  border-color: var(--color-error);
}
.last-update-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
}
.last-update-label {
  font-size: var(--font-size-body);
  color: var(--navy-100);
  text-align: left;
}
.last-update-value {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  color: var(--navy-50);
  text-align: right;
}
.last-update-divider {
  width: 100%;
  border-bottom: 1px solid var(--navy-50);
  margin: 0.5rem 0;
}
.last-update-message {
  font-size: var(--font-size-caption);
  margin-top: 0.5rem;
  border-radius: var(--radius-md);
  color: var(--navy-100);
  background: none;
}
</style>