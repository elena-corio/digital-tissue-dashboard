<template>
  <header class="header-bar">
    <div class="header-left">
      <h3 class="header-title h3">
        <span class="digital">digital</span>.<span class="tissue">tissue</span>
      </h3>
    </div>
    <NavTabs :tabs="navTabs" />
    <div class="header-right">
      <div class="avatar-circle">
        {{ uitext.HEADER.avatarPlaceholder }}
      </div>
      <div class="user-info">
        <div class="user-name">{{ uitext.HEADER.userName }}</div>
        <div class="user-role">{{ uitext.HEADER.userRole }}</div>
      </div>
      <div class="dropdown-menu" @mouseleave="showDropdown = false">
        <span class="dropdown-chevron" @click="toggleDropdown">﹀</span>
        <div v-if="showDropdown" class="dropdown-list">
          <button class="dropdown-item" @click="handleSignOut">Sign out</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClerk } from '../composables/useClerk.js'
import * as uitext from '../uitext.js'
import NavTabs from './NavTabs.vue'

const navTabs = [
  { label: 'Overview', route: '/workspace/overview', name: 'Overview' },
  { label: 'Site', route: '/workspace/site', name: 'Site' },
  { label: 'Project', route: '/workspace/project', name: 'Project' },
  { label: 'Metrics', route: '/workspace/metrics', name: 'Metrics' }
];

const showDropdown = ref(false)
const router = useRouter()
const { signOut } = useClerk()

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

async function handleSignOut() {
  await signOut()
  showDropdown.value = false
  router.push({ path: '/sign-in' })
}
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
  user-select: none;
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
.dropdown-list {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid var(--grey-100);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-width: 120px;
  z-index: 10;
}
.dropdown-item {
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  text-align: left;
  font-size: 1rem;
  color: var(--navy-100);
  cursor: pointer;
  transition: background 0.15s;
}
.dropdown-item:hover {
  background: var(--grey-50);
}
</style>
