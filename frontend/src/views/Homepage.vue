
<template>
  <Header />
  <div class="page-container homepage-center">
    <CircleGridBackground />
    <div class="homepage-content homepage-content-centered">
      <h1 class="homepage-title">
        A <span class="light-blue">living</span> map of<br>your project's cells
      </h1>
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
    <div class="homepage-desc-block">
      <div class="homepage-desc-title">REAL-TIME PERFORMANCE ANALYTICS</div>
      <div class="homepage-desc-center">{{ uiText.HOMEPAGE.description }}</div>
    </div>
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
.homepage-title .light-blue {
  color: var(--light-blue-100, #4fc3f7);
}
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
.homepage-desc-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 48px auto 32px auto;
}
.homepage-desc-title {
  font-size: var(--font-size-h4);
  color: var(--navy-50);
  margin-bottom: 24px;
  margin-top: 120px;
  letter-spacing: 0.05em;
}
.homepage-desc-center {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-medium);
  color: var(--navy-100);
  margin-bottom: 120px;
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