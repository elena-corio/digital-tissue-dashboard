<template>
  <header class="header-bar">
    <div class="header-left">
      <h3 class="header-title h3">
        <span class="digital">digital</span>.<span class="tissue">tissue</span>
      </h3>
    </div>
    <NavTabs :tabs="navTabs" />
    <div class="header-right">
      <div class="avatar-dropdown-wrapper">
        <div class="avatar-circle" >
          {{ userInitials }}
        </div>
      </div>
      <div class="user-info">
        <div class="user-name">{{ userName }}</div>
        <div class="user-role">{{ userRole }}</div>
      </div>
       <span class="dropdown-chevron" @click="toggleDropdown" tabindex="0" aria-haspopup="true" :aria-expanded="showDropdown" @keydown.enter="toggleDropdown">﹀</span>
      <div class="dropdown-menu" v-if="showDropdown">
        <div class="dropdown-list">
          <button class="btn dropdown-item" @click="handleSignOut">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClerk } from '../../composables/useClerk.js'
import * as uiText from '../../uiText.js'
import NavTabs from './NavTabs.vue'

const navTabs = [
  { label: 'Overview', route: '/workspace/overview', name: 'Overview' },
  { label: 'Site', route: '/workspace/site', name: 'Site' },
  { label: 'Project', route: '/workspace/project', name: 'Project' },
  { label: 'Metrics', route: '/workspace/metrics', name: 'Metrics' }
];

const showDropdown = ref(false)
const router = useRouter()
const { signOut, user } = useClerk()


const userName = computed(() => {
  if (user.value && (user.value.firstName || user.value.lastName)) {
    return `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  }
  return uiText.HEADER.userName
})

const userRole = computed(() => {
  if (user.value && (user.value.firstName || user.value.lastName)) {
    const fullName = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim().toLowerCase();
    const member = uiText.TEAM.members.find(m => m.name.toLowerCase() === fullName);
    return member ? member.role : 'Visitor';
  }
  return 'Visitor';
})

const userInitials = computed(() => {
  if (user.value && (user.value.firstName || user.value.lastName)) {
    const first = user.value.firstName ? user.value.firstName[0] : ''
    const last = user.value.lastName ? user.value.lastName[0] : ''
    return (first + last).toUpperCase() || uiText.HEADER.avatarPlaceholder
  }
  return uiText.HEADER.avatarPlaceholder
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown(e) {
  // Close dropdown if click is outside avatar or dropdown
  if (!e.target.closest('.dropdown-chevron') && !e.target.closest('.dropdown-menu')) {
    showDropdown.value = false
  }
}

// Listen for outside clicks
if (typeof window !== 'undefined') {
  window.addEventListener('click', closeDropdown)
}

async function handleSignOut() {
  await signOut()
  showDropdown.value = false
  router.push({ path: '/' })
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
.avatar-dropdown-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
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
  cursor: pointer;
  outline: none;
}
.dropdown-chevron {
  font-size: 1.1rem;
  color: var(--navy-100);
  background: transparent;
  border: none;
  padding: 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
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
  border-radius: 6px;
  min-width: 120px;
  z-index: 10;
}
.dropdown-item {
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-lg);
    color: var(--navy-100);
    font-weight: bold;
    font-size: var(--font-size-body);
}
.dropdown-item:hover {
  background: var(--grey-50);
}
</style>
