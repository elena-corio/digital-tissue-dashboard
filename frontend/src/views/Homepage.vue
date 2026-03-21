<template>
  <div class="page-container homepage-center">
    <div class="homepage-content">
      <h1>{{ uiText.HOMEPAGE.title }}</h1>
      <h3>{{ uiText.HOMEPAGE.description }}</h3>
      <div class="button-group">
        <button
          class="btn get-started-btn"
          @click="handleGetStarted"
        >
          {{ uiText.HOMEPAGE.getStarted }}
        </button>
        
      </div>
    </div>
  </div>
</template>

<script setup>
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

.button-group {
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-md);
}

.get-started-btn.btn-disabled {
  background: var(--fucsia-50);
  color: white;
  cursor: pointer;
}
</style>