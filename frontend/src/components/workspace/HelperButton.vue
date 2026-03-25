<template>
  <div class="helper-btn-wrapper">
    <button class="helper-avatar-btn" @click="toggleCard" :aria-label="showCard ? 'Hide help' : 'Show help'">
      <span class="helper-avatar-icon">?</span>
    </button>
    <div v-if="showCard" class="helper-card card">
      <div class="helper-card-title">Workspace Hints</div>
      <div v-if="currentTab">
        <div class="helper-hint-body body">
          <span v-for="(line, idx) in formattedHint" :key="idx">
            {{ line }}<br v-if="idx !== formattedHint.length - 1" />
          </span>
        </div>
      </div>
      <div v-else>
        <em>No hint available for this tab.</em>
      </div>
      <button class="helper-close" @click="toggleCard">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { TABS } from '../../uiText.js';

const showCard = ref(false);
const toggleCard = () => { showCard.value = !showCard.value; };

const route = useRoute();
const currentTabKey = computed(() => {
  if (!route.name) return null;
  const name = route.name.toString().toLowerCase();
  return Object.keys(TABS).find(key => key.toLowerCase() === name) || null;
});
const currentTab = computed(() => {
  const key = currentTabKey.value;
  return key ? TABS[key] : null;
});

// Support splitting on \n or |
const formattedHint = computed(() => {
  if (!currentTab.value) return [];
  const hint = currentTab.value.hint || currentTab.value.subtitle || '';
  // Split on either \n or |
  return hint.split(/\n|\|/).map(s => s.trim()).filter(Boolean);
});
</script>

<style scoped>
.helper-btn-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}
/* Match avatar-circle style from HeaderBar.vue */
.helper-avatar-btn {
  width: 40px;
  height: 40px;
  background: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-bold);
  color: var(--navy-100);
  background-color: var(--grey-50);
  border: 1.5px solid var(--grey-100);
  cursor: pointer;
  outline: none;
  margin-left: 12px;
  transition: background 0.2s;
}
.helper-avatar-btn:hover {
  background:white;
}
.helper-avatar-icon {
  font-weight: bold;
  font-family: Arial, sans-serif;
  font-size: var(--font-size-h5);
  color: var(--navy-100);
}
.helper-card {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 260px;
  border: 2px solid var(--light-blue-100);
  z-index: 100;
}
.helper-card-title {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: var(--light-blue-100);
}
.helper-hints-list {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
}
.helper-hints-list li {
  margin-bottom: 8px;
  font-size: 0.98rem;
}
.helper-close {
  background: none;
  border: none;
  color: var(--navy-50);
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 6px;
  float: right;
}
.helper-close:hover {
  color: var(--light-blue-100);
}
</style>
