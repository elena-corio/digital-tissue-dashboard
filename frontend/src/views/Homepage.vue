
<template>
  <Header />
  <div class="page-container homepage-center">
    <CircleGridBackground />
    <div class="homepage-content homepage-content-centered">
      <h1 v-html="uiText.HOMEPAGE.title"></h1>
      <h3>{{ uiText.HOMEPAGE.subtitle }}</h3>
      <button
        class="btn get-started-btn"
        @click="handleGetStarted"
      >
        {{ uiText.HOMEPAGE.getStarted }}
      </button>
    </div>
  </div>
  <div class="homepage-scroll-content">
    <div class="h3 homepage-desc-center">{{ uiText.HOMEPAGE.description }}</div>
    <AboutSection />
    <CreditsSection />
  </div>
</template>

<script setup>

import Header from '@/components/homepage/Header.vue'
import CircleGridBackground from '@/components/homepage/CircleGridBackground.vue'
import AboutSection from '@/components/homepage/AboutSection.vue'
import CreditsSection from '@/components/homepage/CreditsSection.vue'
import * as uiText from '@/uiText.js'
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
  position: relative;
  width: 100vw;
  height: 700px;
  min-height: 400px;
  overflow: hidden;
  margin-top: 64px;
}
.homepage-scroll-content {
  width: 100vw;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
}
.homepage-desc-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 200px;
  margin-top: 120px;
  margin-bottom: 120px;
  margin-left: 50vw;
  margin-right: 50vw;
  max-width: 500px;
}
.homepage-content-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  gap: var(--space-md);
}
.get-started-btn {
    font-size: var(--font-size-body);
    border-radius: var(--radius-sm);
    background-color: var(--light-blue-100);
    color: white;
    font-weight: bold;
}

.get-started-btn:hover {
  background-color: var(--light-blue-50);
  color: var(--navy-100);
}
</style>