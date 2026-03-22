<template>
  <Header />
  <div class="page-container homepage-center">
    <div class="homepage-content">
      <h1>{{ uiText.HOMEPAGE.title }}</h1>
      <h2>{{ uiText.HOMEPAGE.description }}</h2>
        <button
          class="btn get-started-btn"
          @click="handleGetStarted"
        >
          {{ uiText.HOMEPAGE.getStarted }}
        </button>
    </div>
  </div>
</template>

<script setup>

import Header from '@/components/Header.vue'
import * as uiText from '@/uitext.js'
import { useRouter } from 'vue-router'
import { useClerk } from '@/composables/useClerk.js'

const router = useRouter()
const { isSignedIn } = useClerk()

function handleGetStarted() {
  if (isSignedIn.value) {
    router.push('/workspace')
  } else {
    router.push({ path: '/sign-in', query: { redirect: '/workspace' } })
  }
}
</script>

<style scoped>
.page-container.homepage-center {
  padding: var(--space-lg);

}

.homepage-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
}
.get-started-btn {
    font-size: var(--font-size-body);
    border-radius: var(--radius-sm);
    background-color: var(--fucsia-50);
    color: var(--navy-100);
    font-weight: bold
}

.get-started-btn:hover {
  background-color: var(--fucsia-100);
  color: white
}
</style>