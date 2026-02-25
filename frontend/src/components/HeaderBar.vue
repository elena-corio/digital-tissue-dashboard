<template>
  <header class="header-bar dashboard-header">
    <div class="header-left">
      <h3 class="header-title h3">
        <span class="digital">digital</span>.<span class="tissue">tissue</span>
      </h3>
    </div>
    <NavTabs :tabs="uitext.HEADER.nav" v-model="activeTab" />
    <div class="header-right">
      <div class="avatar-circle">
        {{ uitext.HEADER.avatarPlaceholder }}
      </div>
      <div class="user-info">
        <div class="user-name">{{ uitext.HEADER.userName }}</div>
        <div class="user-role">{{ uitext.HEADER.userRole }}</div>
      </div>
      <div class="dropdown-menu">
        <span class="dropdown-chevron">﹀</span>
        <!-- Dropdown placeholder -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import * as uitext from '../uitext.js'
import NavTabs from './NavTabs.vue'
const activeTab = ref(uitext.HEADER.nav[0])
</script>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--grey-50);
  padding: var(--space-md) var(--space-lg);
  /* No shadow or border for seamless look */
}
.header-left {
  flex: 1 1 0%;
}
.header-title {
  color: var(--navy-100);
}
.header-title .digital {
  font-weight: var(--font-weight-regular);
}
.header-title .tissue {
  font-weight: var(--font-weight-bold);
}
.header-right {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  justify-content: flex-end;
}
.avatar-circle {
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
  background-color: white;
  border: 1.5px solid var(--grey-100);
  /* No shadow */
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-name {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
}
.user-role {
  font-size: var(--font-size-caption);
  color: var(--navy-50);
}
.dropdown-menu {
  position: relative;
}
.dropdown-chevron {
  font-size: 1.1rem;
  color: var(--navy-100);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
